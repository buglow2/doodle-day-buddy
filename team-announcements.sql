-- ═══════════════════════════════════════════════════════════════
--  MomentPlan — 팀 공지(Team Announcements) 추가 설치용 SQL
--  ※ team-sharing-setup.sql 을 먼저 실행한 프로젝트에서 "추가로" 실행하세요.
--  ※ Supabase 대시보드 → SQL Editor 에 붙여넣고 Run.
--  ※ service_role(비밀) 키는 절대 노출 금지. RLS 는 끄지 마세요.
-- ═══════════════════════════════════════════════════════════════

-- ── 1. 공지 테이블 ──
create table if not exists public.team_announcements (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams(id) on delete cascade,
  body       text not null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create index if not exists team_announcements_team_idx
  on public.team_announcements(team_id, created_at desc);

alter table public.team_announcements enable row level security;

-- 직접 접근은 막고, 아래 RPC(권한 검사 포함)로만 읽고/쓰게 함
drop policy if exists "ann_select" on public.team_announcements;
create policy "ann_select" on public.team_announcements
  for select using (public.is_team_member(team_id));

-- ── 2. 공지 게시 (편집자/소유자만) ──
create or replace function public.post_announcement(p_team uuid, p_body text)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if not (public.is_team_editor(p_team) or public.is_team_owner(p_team)) then
    return json_build_object('ok', false, 'error', 'NOT_EDITOR');
  end if;
  if p_body is null or length(btrim(p_body)) = 0 then
    return json_build_object('ok', false, 'error', 'EMPTY');
  end if;
  insert into team_announcements(team_id, body, created_by)
  values (p_team, btrim(p_body), auth.uid())
  returning id into v_id;
  return json_build_object('ok', true, 'id', v_id);
end $$;
revoke execute on function public.post_announcement(uuid,text) from public, anon;
grant   execute on function public.post_announcement(uuid,text) to authenticated;

-- ── 3. 공지 목록 (멤버만, 최근 30개) ──
create or replace function public.list_announcements(p_team uuid)
returns json language plpgsql security definer set search_path = public as $$
begin
  if not public.is_team_member(p_team) then return '[]'::json; end if;
  return coalesce((
    select json_agg(row_to_json(x)) from (
      select a.id, a.body, a.created_at,
             u.email as author_email,
             (a.created_by = auth.uid()) as is_mine
      from team_announcements a
      left join auth.users u on u.id = a.created_by
      where a.team_id = p_team
      order by a.created_at desc
      limit 30
    ) x
  ), '[]'::json);
end $$;
revoke execute on function public.list_announcements(uuid) from public, anon;
grant   execute on function public.list_announcements(uuid) to authenticated;

-- ── 4. 공지 삭제 (작성자 또는 소유자) ──
create or replace function public.delete_announcement(p_id uuid)
returns json language plpgsql security definer set search_path = public as $$
declare v_team uuid; v_author uuid;
begin
  select team_id, created_by into v_team, v_author
    from team_announcements where id = p_id;
  if v_team is null then return json_build_object('ok', false, 'error', 'NOT_FOUND'); end if;
  if v_author <> auth.uid() and not public.is_team_owner(v_team) then
    return json_build_object('ok', false, 'error', 'NOT_ALLOWED');
  end if;
  delete from team_announcements where id = p_id;
  return json_build_object('ok', true);
end $$;
revoke execute on function public.delete_announcement(uuid) from public, anon;
grant   execute on function public.delete_announcement(uuid) to authenticated;

-- ── 5. 실시간(선택): 공지가 올라오면 즉시 반영 ──
do $$ begin
  if not exists (select 1 from pg_publication_tables
                 where pubname='supabase_realtime' and tablename='team_announcements') then
    execute 'alter publication supabase_realtime add table public.team_announcements';
  end if;
exception when others then null; end $$;
