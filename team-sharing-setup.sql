-- ═══════════════════════════════════════════════════════════════
--  MomentPlan — 팀 공유 설정 SQL  (별도 팀 달력 + 편집자/뷰어 권한 + 팀 코드 참여)
--  사용법: Supabase 대시보드 → SQL Editor → New query → 전체 붙여넣기 → Run
--  (여러 번 실행해도 안전. supabase-setup.sql 을 먼저 실행한 뒤 이 파일을 실행하세요.)
--
--  구조 요약
--   • teams          : 팀(회사) 정보 + 참여 코드
--   • team_members   : 누가 어느 팀에 속하고 권한이 무엇인지 (editor/viewer)
--   • team_events    : 팀 달력에 올린 공유 일정 (일정 1건 = 1행 → 여러 명 동시 편집 안전)
--   • 팀을 만든 사람 = 소유자(owner). 코드·멤버 관리 권한을 가짐. (동시에 편집자)
--   • editor = 일정 추가/수정/삭제 가능,  viewer = 보기만.
-- ═══════════════════════════════════════════════════════════════

-- ── 1. 테이블 ──
create table if not exists public.teams (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  join_code  text unique not null,
  owner_id   uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists public.team_members (
  team_id   uuid not null references public.teams(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  email     text,
  role      text not null default 'editor' check (role in ('editor','viewer')),
  joined_at timestamptz default now(),
  primary key (team_id, user_id)
);

create table if not exists public.team_events (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams(id) on delete cascade,
  data       jsonb not null,
  created_by uuid references auth.users(id),
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);
create index if not exists team_events_team_idx on public.team_events(team_id);
create index if not exists team_members_user_idx on public.team_members(user_id);

-- ── 2. RLS 켜기 ──
alter table public.teams        enable row level security;
alter table public.team_members enable row level security;
alter table public.team_events  enable row level security;

-- ── 3. 헬퍼 함수 (SECURITY DEFINER = RLS 순환참조 방지) ──
create or replace function public.is_team_member(t_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from team_members m where m.team_id = t_id and m.user_id = auth.uid())
$$;
create or replace function public.is_team_editor(t_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from team_members m
                where m.team_id = t_id and m.user_id = auth.uid() and m.role = 'editor')
$$;
create or replace function public.is_team_owner(t_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from teams t where t.id = t_id and t.owner_id = auth.uid())
$$;
revoke execute on function public.is_team_member(uuid), public.is_team_editor(uuid), public.is_team_owner(uuid) from public, anon;
grant   execute on function public.is_team_member(uuid), public.is_team_editor(uuid), public.is_team_owner(uuid) to authenticated;

-- ── 4. 보안 규칙 (정책) ──
-- teams: 멤버는 조회. 생성/수정/삭제는 아래 RPC로만.
drop policy if exists "team_select" on public.teams;
create policy "team_select" on public.teams for select using (public.is_team_member(id));

-- team_members: 같은 팀 멤버끼리 서로 보임. 쓰기는 RPC로만.
drop policy if exists "member_select" on public.team_members;
create policy "member_select" on public.team_members for select using (public.is_team_member(team_id));

-- team_events: 멤버는 조회, 편집자만 추가/수정/삭제.
drop policy if exists "tevent_select" on public.team_events;
create policy "tevent_select" on public.team_events for select using (public.is_team_member(team_id));
drop policy if exists "tevent_insert" on public.team_events;
create policy "tevent_insert" on public.team_events for insert with check (public.is_team_editor(team_id) and created_by = auth.uid());
drop policy if exists "tevent_update" on public.team_events;
create policy "tevent_update" on public.team_events for update using (public.is_team_editor(team_id));
drop policy if exists "tevent_delete" on public.team_events;
create policy "tevent_delete" on public.team_events for delete using (public.is_team_editor(team_id));

-- ── 5. 팀 만들기 (일정 데이터 라이선스 보유자만 = 회사가 결제) ──
create or replace function public.create_team(p_name text)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_code text; v_try int := 0;
begin
  if auth.uid() is null then return json_build_object('ok', false, 'error', 'NOT_SIGNED_IN'); end if;
  if not public.has_active_license() then return json_build_object('ok', false, 'error', 'NO_LICENSE'); end if;
  if coalesce(trim(p_name),'') = '' then return json_build_object('ok', false, 'error', 'EMPTY_NAME'); end if;
  -- 유니크한 6자리 코드 생성
  loop
    v_code := upper(substr(md5(gen_random_uuid()::text || clock_timestamp()::text), 1, 6));
    exit when not exists(select 1 from teams where join_code = v_code);
    v_try := v_try + 1; if v_try > 20 then return json_build_object('ok', false, 'error', 'CODE_FAIL'); end if;
  end loop;
  insert into teams(name, join_code, owner_id) values (trim(p_name), v_code, auth.uid()) returning id into v_id;
  insert into team_members(team_id, user_id, email, role)
    values (v_id, auth.uid(), (select email from auth.users where id = auth.uid()), 'editor');
  return json_build_object('ok', true, 'team_id', v_id, 'name', trim(p_name), 'code', v_code, 'role', 'editor', 'is_owner', true);
end $$;
revoke execute on function public.create_team(text) from public, anon;
grant   execute on function public.create_team(text) to authenticated;

-- ── 6. 팀 코드로 참여 (기본 권한: editor) ──
create or replace function public.join_team(p_code text)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_name text;
begin
  if auth.uid() is null then return json_build_object('ok', false, 'error', 'NOT_SIGNED_IN'); end if;
  select id, name into v_id, v_name from teams where join_code = upper(trim(p_code)) limit 1;
  if v_id is null then return json_build_object('ok', false, 'error', 'INVALID_CODE'); end if;
  if exists(select 1 from team_members where team_id = v_id and user_id = auth.uid()) then
    return json_build_object('ok', true, 'team_id', v_id, 'name', v_name, 'already', true);
  end if;
  insert into team_members(team_id, user_id, email, role)
    values (v_id, auth.uid(), (select email from auth.users where id = auth.uid()), 'editor');
  return json_build_object('ok', true, 'team_id', v_id, 'name', v_name, 'role', 'editor');
end $$;
revoke execute on function public.join_team(text) from public, anon;
grant   execute on function public.join_team(text) to authenticated;

-- ── 7. 내가 속한 팀 목록 ──
create or replace function public.my_teams()
returns json language sql stable security definer set search_path = public as $$
  select coalesce(json_agg(json_build_object(
           'team_id', t.id, 'name', t.name, 'code', t.join_code,
           'role', m.role, 'is_owner', (t.owner_id = auth.uid()),
           'member_count', (select count(*) from team_members mm where mm.team_id = t.id)
         )), '[]'::json)
  from team_members m join teams t on t.id = m.team_id
  where m.user_id = auth.uid()
$$;
revoke execute on function public.my_teams() from public, anon;
grant   execute on function public.my_teams() to authenticated;

-- ── 8. 팀 멤버 목록 (팀 멤버만 조회 가능) ──
create or replace function public.team_member_list(p_team uuid)
returns json language sql stable security definer set search_path = public as $$
  select case when public.is_team_member(p_team) then
    coalesce((select json_agg(json_build_object(
       'user_id', m.user_id, 'email', m.email, 'role', m.role,
       'is_owner', (t.owner_id = m.user_id), 'is_me', (m.user_id = auth.uid())
     ) order by (t.owner_id = m.user_id) desc, m.joined_at)
     from team_members m join teams t on t.id = m.team_id where m.team_id = p_team), '[]'::json)
  else '[]'::json end
$$;
revoke execute on function public.team_member_list(uuid) from public, anon;
grant   execute on function public.team_member_list(uuid) to authenticated;

-- ── 9. 멤버 권한 변경 (소유자만) ──
create or replace function public.set_member_role(p_team uuid, p_user uuid, p_role text)
returns json language plpgsql security definer set search_path = public as $$
begin
  if not public.is_team_owner(p_team) then return json_build_object('ok', false, 'error', 'NOT_OWNER'); end if;
  if p_role not in ('editor','viewer') then return json_build_object('ok', false, 'error', 'BAD_ROLE'); end if;
  if p_user = (select owner_id from teams where id = p_team) then
    return json_build_object('ok', false, 'error', 'OWNER_FIXED');  -- 소유자 본인 권한은 못 바꿈
  end if;
  update team_members set role = p_role where team_id = p_team and user_id = p_user;
  return json_build_object('ok', true);
end $$;
revoke execute on function public.set_member_role(uuid,uuid,text) from public, anon;
grant   execute on function public.set_member_role(uuid,uuid,text) to authenticated;

-- ── 10. 멤버 내보내기 (소유자) / 내가 나가기(본인) ──
create or replace function public.remove_member(p_team uuid, p_user uuid)
returns json language plpgsql security definer set search_path = public as $$
begin
  if p_user = auth.uid() then
    if public.is_team_owner(p_team) then return json_build_object('ok', false, 'error', 'OWNER_MUST_DELETE'); end if;
    delete from team_members where team_id = p_team and user_id = auth.uid();
    return json_build_object('ok', true, 'left', true);
  end if;
  if not public.is_team_owner(p_team) then return json_build_object('ok', false, 'error', 'NOT_OWNER'); end if;
  if p_user = (select owner_id from teams where id = p_team) then return json_build_object('ok', false, 'error', 'CANT_REMOVE_OWNER'); end if;
  delete from team_members where team_id = p_team and user_id = p_user;
  return json_build_object('ok', true);
end $$;
revoke execute on function public.remove_member(uuid,uuid) from public, anon;
grant   execute on function public.remove_member(uuid,uuid) to authenticated;

-- ── 11. 참여 코드 재발급 (소유자) ──
create or replace function public.regenerate_join_code(p_team uuid)
returns json language plpgsql security definer set search_path = public as $$
declare v_code text; v_try int := 0;
begin
  if not public.is_team_owner(p_team) then return json_build_object('ok', false, 'error', 'NOT_OWNER'); end if;
  loop
    v_code := upper(substr(md5(gen_random_uuid()::text || clock_timestamp()::text), 1, 6));
    exit when not exists(select 1 from teams where join_code = v_code);
    v_try := v_try + 1; if v_try > 20 then return json_build_object('ok', false, 'error', 'CODE_FAIL'); end if;
  end loop;
  update teams set join_code = v_code where id = p_team;
  return json_build_object('ok', true, 'code', v_code);
end $$;
revoke execute on function public.regenerate_join_code(uuid) from public, anon;
grant   execute on function public.regenerate_join_code(uuid) to authenticated;

-- ── 12. 팀 삭제 (소유자만, 모든 팀 일정도 함께 삭제) ──
create or replace function public.delete_team(p_team uuid)
returns json language plpgsql security definer set search_path = public as $$
begin
  if not public.is_team_owner(p_team) then return json_build_object('ok', false, 'error', 'NOT_OWNER'); end if;
  delete from teams where id = p_team;   -- cascade 로 members/events 함께 삭제
  return json_build_object('ok', true);
end $$;
revoke execute on function public.delete_team(uuid) from public, anon;
grant   execute on function public.delete_team(uuid) to authenticated;

-- ── 13. 실시간(Realtime) 켜기: 팀 일정이 바뀌면 즉시 반영 ──
--  (Supabase 대시보드 → Database → Replication 에서 team_events 를 켜도 됩니다)
do $$ begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and tablename='team_events') then
    execute 'alter publication supabase_realtime add table public.team_events';
  end if;
exception when others then null; end $$;

-- ═══════════════════════════════════════════════════════════════
--  관리 / 확인 명령
-- ═══════════════════════════════════════════════════════════════
-- 전체 팀 목록:        select id, name, join_code, owner_id, created_at from teams order by created_at desc;
-- 팀별 멤버 수:        select t.name, count(m.*) from teams t left join team_members m on m.team_id=t.id group by t.name;
-- 특정 팀 일정 수:     select count(*) from team_events where team_id='팀ID';
-- ⚠ 주의: service_role 키는 절대 앱/외부에 노출하지 마세요. RLS 를 끄지 마세요.
