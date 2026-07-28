-- ═══════════════════════════════════════════════════════════════
--  두들 데이 버디 — 판매용 Supabase 설정 SQL (통합본)
--  사용법: Supabase 대시보드 → SQL Editor → New query → 전체 붙여넣기 → Run
--  (여러 번 실행해도 안전)
-- ═══════════════════════════════════════════════════════════════

-- ── 1. 사용자 데이터 테이블 ──
create table if not exists public.user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb,
  updated_at timestamptz default now()
);

-- ── 2. 라이선스 테이블 ──
create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  license_key text unique not null,
  status text not null default 'unused' check (status in ('unused','active','revoked')),
  user_id uuid references auth.users(id),
  email text,
  activated_at timestamptz,
  note text,
  created_at timestamptz default now()
);

-- ── 3. 최신 버전 게시판 (업데이트 알림용) ──
create table if not exists public.app_meta (
  id int primary key default 1,
  latest_version text,
  download_url text,
  notes text,
  updated_at timestamptz default now()
);

-- ── 4. RLS 켜기 ──
alter table public.user_data enable row level security;
alter table public.licenses enable row level security;
alter table public.app_meta enable row level security;

-- ── 5. 헬퍼: 유효 라이선스 보유 여부 ──
create or replace function public.has_active_license()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from licenses where user_id = auth.uid() and status = 'active')
$$;
revoke execute on function public.has_active_license() from public, anon;
grant execute on function public.has_active_license() to authenticated;

-- ── 6. 보안 규칙 ──
drop policy if exists "own_select" on public.user_data;
create policy "own_select" on public.user_data for select using (auth.uid() = user_id);
drop policy if exists "own_insert" on public.user_data;
create policy "own_insert" on public.user_data for insert with check (auth.uid() = user_id and public.has_active_license());
drop policy if exists "own_update" on public.user_data;
create policy "own_update" on public.user_data for update using (auth.uid() = user_id and public.has_active_license());
drop policy if exists "own_delete" on public.user_data;
create policy "own_delete" on public.user_data for delete using (auth.uid() = user_id);

drop policy if exists "own_license_select" on public.licenses;
create policy "own_license_select" on public.licenses for select using (auth.uid() = user_id);

drop policy if exists "anyone_read" on public.app_meta;
create policy "anyone_read" on public.app_meta for select using (true);

-- ── 7. 라이선스 활성화 (앱이 자동 호출) ──
create or replace function public.activate_license(p_key text)
returns text language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if auth.uid() is null then return 'NOT_SIGNED_IN'; end if;
  if exists(select 1 from licenses where user_id = auth.uid() and status = 'active') then return 'ALREADY_ACTIVE'; end if;
  select id into v_id from licenses where license_key = trim(p_key) and status = 'unused' limit 1;
  if v_id is null then return 'INVALID_KEY'; end if;
  update licenses set status='active', user_id=auth.uid(),
    email=(select email from auth.users where id=auth.uid()), activated_at=now() where id=v_id;
  return 'OK';
end $$;
revoke execute on function public.activate_license(text) from public, anon;
grant execute on function public.activate_license(text) to authenticated;

-- ── 8. 라이선스 키 발급 (관리자용) ──
create or replace function public.generate_licenses(n int default 1)
returns setof text language plpgsql security definer set search_path = public as $$
declare i int; k text;
begin
  for i in 1..n loop
    k := 'DDB-' || upper(substr(md5(random()::text),1,4)) || '-' || upper(substr(md5(random()::text),1,4))
        || '-' || upper(substr(md5(random()::text),1,4)) || '-' || upper(substr(md5(random()::text),1,4));
    insert into licenses(license_key) values (k);
    return next k;
  end loop;
end $$;
revoke execute on function public.generate_licenses(int) from public, anon, authenticated;

-- ── 9. 버전 게시판 초기값 ──
insert into public.app_meta (id, latest_version, download_url, notes)
values (1, '0.90.0', '', '') on conflict (id) do nothing;

-- ═══════════════════════════════════════════════════════════════
--  관리 명령 모음 (필요할 때 한 줄씩 실행)
-- ═══════════════════════════════════════════════════════════════
-- 키 10개 발급:      select public.generate_licenses(10);
-- 발급된 키 목록:    select license_key, status, email, activated_at from licenses order by created_at desc;
-- 환불 시 키 정지:   update licenses set status='revoked' where license_key='DDB-XXXX-XXXX-XXXX-XXXX';
-- 새 버전 알림 게시: update app_meta set latest_version='0.91.0', download_url='다운로드주소', notes='수정내용', updated_at=now() where id=1;
-- 사용자 수 확인:    select count(*) from auth.users;
-- 저장 용량 큰 순:   select user_id, pg_column_size(data)/1024 as kb from user_data order by kb desc limit 20;
