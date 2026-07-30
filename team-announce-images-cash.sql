-- ═══════════════════════════════════════════════════════════════
--  MomentPlan — 공지(+이미지 첨부) + 팀 캐시(선불 충전/차감) 통합 SQL
--  ※ team-sharing-setup.sql 만 먼저 실행돼 있으면 됩니다.
--    (team-announcements.sql 을 안 돌렸어도 이 파일 하나면 완성됩니다.)
--  ※ Supabase → SQL Editor → 붙여넣고 Run.
--  ※ service_role(비밀) 키는 절대 노출 금지. RLS 는 끄지 마세요.
-- ═══════════════════════════════════════════════════════════════

-- ── 0. 공지 테이블 (없으면 생성) ──
create table if not exists public.team_announcements (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams(id) on delete cascade,
  body       text not null default '',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create index if not exists team_announcements_team_idx
  on public.team_announcements(team_id, created_at desc);
alter table public.team_announcements enable row level security;
drop policy if exists "ann_select" on public.team_announcements;
create policy "ann_select" on public.team_announcements
  for select using (public.is_team_member(team_id));

-- 공지 삭제(작성자/소유자) — 없으면 대비해 함께 정의
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

-- ── 1. 공지에 이미지 URL 컬럼 추가 ──
alter table public.team_announcements add column if not exists image_url text;

-- ── 2. 이미지 저장소(Storage) 버킷 + 접근 규칙 ──
--  team-images 버킷: 팀원(로그인)만 업로드, 링크로 열람(공개).
insert into storage.buckets (id, name, public)
values ('team-images', 'team-images', true)
on conflict (id) do nothing;

drop policy if exists "team_img_read"   on storage.objects;
drop policy if exists "team_img_upload" on storage.objects;
create policy "team_img_read" on storage.objects
  for select using (bucket_id = 'team-images');
create policy "team_img_upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'team-images');

-- ── 3. 팀 지갑(잔액) + 거래 원장(ledger) ──
create table if not exists public.team_wallets (
  team_id    uuid primary key references public.teams(id) on delete cascade,
  balance    bigint not null default 0,
  updated_at timestamptz not null default now()
);
create table if not exists public.wallet_ledger (
  id            uuid primary key default gen_random_uuid(),
  team_id       uuid not null references public.teams(id) on delete cascade,
  delta         bigint not null,          -- +충전 / -차감
  balance_after bigint not null,
  reason        text,
  created_by    uuid,
  created_at    timestamptz not null default now()
);
create index if not exists wallet_ledger_team_idx
  on public.wallet_ledger(team_id, created_at desc);

alter table public.team_wallets enable row level security;
alter table public.wallet_ledger enable row level security;
-- 직접 접근은 전부 막고(정책 없음 = 거부), 아래 RPC 로만 읽기.

-- ── 4. 잔액 조회 (팀원) ──
create or replace function public.wallet_balance(p_team uuid)
returns json language plpgsql security definer set search_path = public as $$
declare v bigint;
begin
  if not public.is_team_member(p_team) then
    return json_build_object('ok', false, 'error', 'NOT_MEMBER');
  end if;
  select balance into v from team_wallets where team_id = p_team;
  return json_build_object('ok', true, 'balance', coalesce(v, 0));
end $$;
revoke execute on function public.wallet_balance(uuid) from public, anon;
grant   execute on function public.wallet_balance(uuid) to authenticated;

-- ── 5. 최근 거래내역 (팀원) ──
create or replace function public.wallet_history(p_team uuid)
returns json language plpgsql security definer set search_path = public as $$
begin
  if not public.is_team_member(p_team) then return '[]'::json; end if;
  return coalesce((
    select json_agg(row_to_json(x)) from (
      select delta, balance_after, reason, created_at
      from wallet_ledger where team_id = p_team
      order by created_at desc limit 30
    ) x
  ), '[]'::json);
end $$;
revoke execute on function public.wallet_history(uuid) from public, anon;
grant   execute on function public.wallet_history(uuid) to authenticated;

-- ── 6. 충전 (관리자 전용) ──
--  ※ 실제 결제(PG) 연동 전까지는 관리자가 SQL 로만 충전합니다.
--    authenticated 에는 권한을 주지 않아, 사용자가 무료로 충전 불가.
create or replace function public.wallet_topup(p_team uuid, p_amount bigint, p_reason text default '충전')
returns json language plpgsql security definer set search_path = public as $$
declare v bigint;
begin
  if p_amount is null or p_amount <= 0 then
    return json_build_object('ok', false, 'error', 'BAD_AMOUNT');
  end if;
  insert into team_wallets(team_id, balance) values (p_team, p_amount)
    on conflict (team_id) do update
      set balance = team_wallets.balance + excluded.balance, updated_at = now()
    returning balance into v;
  insert into wallet_ledger(team_id, delta, balance_after, reason, created_by)
    values (p_team, p_amount, v, coalesce(p_reason, '충전'), auth.uid());
  return json_build_object('ok', true, 'balance', v);
end $$;
revoke execute on function public.wallet_topup(uuid,bigint,text) from public, anon, authenticated;

-- ── 7. 공지 게시 (이미지 첨부 + 이미지 공지 캐시 차감) ──
--  · 텍스트 공지: 무료
--  · 이미지 공지: 아래 v_cost(기본 10캐시) 차감 (잔액 부족 시 게시 취소)
--    → 가격을 바꾸려면 v_cost 숫자만 수정하세요. (0 으로 하면 무료)
create or replace function public.post_announcement(p_team uuid, p_body text, p_image text default null)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_cost bigint := 0; v_bal bigint; v_has_img boolean;
begin
  if not (public.is_team_editor(p_team) or public.is_team_owner(p_team)) then
    return json_build_object('ok', false, 'error', 'NOT_EDITOR');
  end if;
  v_has_img := (p_image is not null and length(btrim(p_image)) > 0);
  if (p_body is null or length(btrim(p_body)) = 0) and not v_has_img then
    return json_build_object('ok', false, 'error', 'EMPTY');
  end if;

  if v_has_img then v_cost := 10; end if;   -- ← 이미지 공지 단가

  if v_cost > 0 then
    select balance into v_bal from team_wallets where team_id = p_team for update;
    v_bal := coalesce(v_bal, 0);
    if v_bal < v_cost then
      return json_build_object('ok', false, 'error', 'NO_CASH', 'need', v_cost, 'balance', v_bal);
    end if;
    update team_wallets set balance = balance - v_cost, updated_at = now()
      where team_id = p_team returning balance into v_bal;
    insert into wallet_ledger(team_id, delta, balance_after, reason, created_by)
      values (p_team, -v_cost, v_bal, '이미지 공지', auth.uid());
  end if;

  insert into team_announcements(team_id, body, image_url, created_by)
    values (p_team, coalesce(btrim(p_body), ''), nullif(btrim(p_image), ''), auth.uid())
    returning id into v_id;
  return json_build_object('ok', true, 'id', v_id, 'cost', v_cost);
end $$;
revoke execute on function public.post_announcement(uuid,text,text) from public, anon;
grant   execute on function public.post_announcement(uuid,text,text) to authenticated;

-- ── 8. 공지 목록에 이미지 포함 ──
create or replace function public.list_announcements(p_team uuid)
returns json language plpgsql security definer set search_path = public as $$
begin
  if not public.is_team_member(p_team) then return '[]'::json; end if;
  return coalesce((
    select json_agg(row_to_json(x)) from (
      select a.id, a.body, a.image_url, a.created_at,
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

-- ═══════════════════════════════════════════════════════════════
--  관리(충전) 명령 — 필요할 때 SQL Editor 에서 실행
-- ═══════════════════════════════════════════════════════════════
-- 팀 목록/ID 확인:   select id, name from teams order by created_at desc;
-- 특정 팀 1000 충전:  select public.wallet_topup('팀ID'::uuid, 1000, '수동 충전');
-- 잔액 확인:          select team_id, balance from team_wallets;
-- 거래내역:           select * from wallet_ledger order by created_at desc limit 20;
