-- ═══════════════════════════════════════════════════════════════
--  MomentPlan — Supabase 자동 유지(keep-alive)용 함수
--  · 무료 플랜은 7일간 DB 활동이 없으면 프로젝트가 "일시정지"됩니다.
--  · 이 함수를 하루 한 번 호출하면 DB 활동으로 기록되어 정지되지 않습니다.
--  · anon(공개) 키로 호출 가능하지만, DB의 어떤 데이터도 노출하지 않습니다(현재 시각만 반환).
--  사용: Supabase → SQL Editor → 아래 전체 붙여넣고 Run.
-- ═══════════════════════════════════════════════════════════════

create or replace function public.keepalive()
returns text
language sql
security definer
set search_path = public
as $$
  select 'ok ' || now()::text;
$$;

revoke execute on function public.keepalive() from public;
grant   execute on function public.keepalive() to anon, authenticated;
