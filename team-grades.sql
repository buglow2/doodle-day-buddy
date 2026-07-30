-- ═══════════════════════════════════════════════════════════════
--  MomentPlan — 팀 등급(권한) 체계 SQL
--  · 멤버를 1~5 단계로 분류 (숫자 낮을수록 권한 높음, 상위는 하위 포함)
--  · 단계 이름과 각 단계 권한을 관리자가 관리창에서 편집 (grade_config)
--  · 소유자는 항상 최고권한(모든 cap) 고정 — 설정이 어떻든 잠기지 않음
--  ※ team-sharing-setup.sql 이 먼저 실행돼 있어야 합니다.
--  ※ Supabase → SQL Editor → Run. RLS 는 끄지 마세요.
-- ═══════════════════════════════════════════════════════════════

-- ── 1. 컬럼 추가 ──
alter table public.teams        add column if not exists grade_config jsonb;
alter table public.team_members add column if not exists level int;

-- ── 2. 기본 등급표 (grade_config 가 비어 있을 때 사용) ──
--  cap 종류: view(항상) / share(공유) / event(일정게재) / announce(공지게재) / manage(등급·설정관리)
create or replace function public.default_grade_config()
returns jsonb language sql immutable as $$
  select '[
   {"lvl":1,"name":"운영자",   "share":true, "event":true, "announce":true, "manage":true},
   {"lvl":2,"name":"공지 담당", "share":true, "event":true, "announce":true, "manage":false},
   {"lvl":3,"name":"일정 담당", "share":true, "event":true, "announce":false,"manage":false},
   {"lvl":4,"name":"공유 가능", "share":true, "event":false,"announce":false,"manage":false},
   {"lvl":5,"name":"보기 전용", "share":false,"event":false,"announce":false,"manage":false}
  ]'::jsonb
$$;

create or replace function public.team_grade_config(p_team uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce((select grade_config from teams where id = p_team), public.default_grade_config())
$$;
revoke execute on function public.team_grade_config(uuid) from public, anon;
grant   execute on function public.team_grade_config(uuid) to authenticated;

-- ── 3. 권한 확인 헬퍼: 호출자가 이 팀에서 p_cap 권한이 있는가 ──
create or replace function public.team_cap(p_team uuid, p_cap text)
returns boolean language plpgsql stable security definer set search_path = public as $$
declare v_lvl int; v_val boolean;
begin
  if not exists(select 1 from team_members where team_id = p_team and user_id = auth.uid()) then
    return false;                                   -- 멤버 아님
  end if;
  if p_cap = 'view' then return true; end if;       -- 보기는 모든 멤버
  if exists(select 1 from teams where id = p_team and owner_id = auth.uid()) then
    return true;                                    -- 소유자는 항상 전권
  end if;
  select coalesce(level, 5) into v_lvl from team_members where team_id = p_team and user_id = auth.uid();
  select (e->>p_cap)::boolean into v_val
    from jsonb_array_elements(public.team_grade_config(p_team)) e
    where (e->>'lvl')::int = v_lvl limit 1;
  return coalesce(v_val, false);
end $$;
revoke execute on function public.team_cap(uuid,text) from public, anon;
grant   execute on function public.team_cap(uuid,text) to authenticated;

-- ── 4. 기존 권한검사(is_team_editor)를 등급의 'event' cap 으로 연결 ──
--  (team_events 의 추가/수정/삭제 RLS 가 그대로 이 함수를 씁니다)
create or replace function public.is_team_editor(t_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.team_cap(t_id, 'event')
$$;

-- ── 5. 기존 데이터 백필 (level 이 비어있는 멤버) ──
update public.team_members m set level = case
    when t.owner_id = m.user_id then 1
    when m.role = 'viewer'      then 5
    else 3 end
from public.teams t
where t.id = m.team_id and m.level is null;

-- ── 6. 멤버 등급 지정 (manage 권한 또는 소유자) ──
create or replace function public.set_member_level(p_team uuid, p_user uuid, p_level int)
returns json language plpgsql security definer set search_path = public as $$
declare v_ev boolean;
begin
  if not (public.team_cap(p_team,'manage') or public.is_team_owner(p_team)) then
    return json_build_object('ok', false, 'error', 'NO_MANAGE');
  end if;
  if p_level < 1 or p_level > 5 then
    return json_build_object('ok', false, 'error', 'BAD_LEVEL');
  end if;
  if p_user = (select owner_id from teams where id = p_team) then
    return json_build_object('ok', false, 'error', 'OWNER_FIXED');   -- 소유자 등급은 못 바꿈
  end if;
  select (e->>'event')::boolean into v_ev
    from jsonb_array_elements(public.team_grade_config(p_team)) e
    where (e->>'lvl')::int = p_level limit 1;
  update team_members
     set level = p_level,
         role  = case when coalesce(v_ev,false) then 'editor' else 'viewer' end  -- 레거시 role 동기화
   where team_id = p_team and user_id = p_user;
  return json_build_object('ok', true);
end $$;
revoke execute on function public.set_member_level(uuid,uuid,int) from public, anon;
grant   execute on function public.set_member_level(uuid,uuid,int) to authenticated;

-- ── 7. 팀 등급표 읽기 / 저장 ──
create or replace function public.get_team_config(p_team uuid)
returns json language plpgsql stable security definer set search_path = public as $$
declare v_lvl int;
begin
  if not public.is_team_member(p_team) then
    return json_build_object('ok', false, 'error', 'NOT_MEMBER');
  end if;
  select coalesce(level,5) into v_lvl from team_members where team_id = p_team and user_id = auth.uid();
  if public.is_team_owner(p_team) then v_lvl := 1; end if;
  return json_build_object('ok', true,
    'config',     public.team_grade_config(p_team),
    'my_level',   v_lvl,
    'is_owner',   public.is_team_owner(p_team),
    'can_manage', (public.team_cap(p_team,'manage') or public.is_team_owner(p_team)));
end $$;
revoke execute on function public.get_team_config(uuid) from public, anon;
grant   execute on function public.get_team_config(uuid) to authenticated;

create or replace function public.set_team_config(p_team uuid, p_config jsonb)
returns json language plpgsql security definer set search_path = public as $$
begin
  if not (public.team_cap(p_team,'manage') or public.is_team_owner(p_team)) then
    return json_build_object('ok', false, 'error', 'NO_MANAGE');
  end if;
  if jsonb_typeof(p_config) <> 'array' then
    return json_build_object('ok', false, 'error', 'BAD_CONFIG');
  end if;
  update teams set grade_config = p_config where id = p_team;
  return json_build_object('ok', true);
end $$;
revoke execute on function public.set_team_config(uuid,jsonb) from public, anon;
grant   execute on function public.set_team_config(uuid,jsonb) to authenticated;

-- ── 8. 내 팀 목록: level + 내 권한(caps) 포함 ──
create or replace function public.my_teams()
returns json language sql stable security definer set search_path = public as $$
  select coalesce(json_agg(json_build_object(
           'team_id', t.id, 'name', t.name, 'code', t.join_code,
           'role', m.role,
           'level', case when t.owner_id = auth.uid() then 1 else coalesce(m.level,5) end,
           'is_owner', (t.owner_id = auth.uid()),
           'member_count', (select count(*) from team_members mm where mm.team_id = t.id),
           'caps', json_build_object(
              'share',    public.team_cap(t.id,'share'),
              'event',    public.team_cap(t.id,'event'),
              'announce', public.team_cap(t.id,'announce'),
              'manage',   public.team_cap(t.id,'manage'))
         )), '[]'::json)
  from team_members m join teams t on t.id = m.team_id
  where m.user_id = auth.uid()
$$;
revoke execute on function public.my_teams() from public, anon;
grant   execute on function public.my_teams() to authenticated;

-- ── 9. 멤버 목록: level 포함 ──
create or replace function public.team_member_list(p_team uuid)
returns json language sql stable security definer set search_path = public as $$
  select case when public.is_team_member(p_team) then
    coalesce((select json_agg(json_build_object(
       'user_id', m.user_id, 'email', m.email, 'role', m.role,
       'level', case when t.owner_id = m.user_id then 1 else coalesce(m.level,5) end,
       'is_owner', (t.owner_id = m.user_id), 'is_me', (m.user_id = auth.uid())
     ) order by (t.owner_id = m.user_id) desc, coalesce(m.level,5), m.joined_at)
     from team_members m join teams t on t.id = m.team_id where m.team_id = p_team), '[]'::json)
  else '[]'::json end
$$;
revoke execute on function public.team_member_list(uuid) from public, anon;
grant   execute on function public.team_member_list(uuid) to authenticated;

-- ── 10. 신규 가입 기본 등급 = 5(보기 전용) ──
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
  insert into team_members(team_id, user_id, email, role, level)
    values (v_id, auth.uid(), (select email from auth.users where id = auth.uid()), 'viewer', 5);
  return json_build_object('ok', true, 'team_id', v_id, 'name', v_name, 'role', 'viewer', 'level', 5);
end $$;
revoke execute on function public.join_team(text) from public, anon;
grant   execute on function public.join_team(text) to authenticated;

-- 팀 생성 시 소유자 등급 = 1
create or replace function public.create_team(p_name text)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_code text; v_try int := 0;
begin
  if auth.uid() is null then return json_build_object('ok', false, 'error', 'NOT_SIGNED_IN'); end if;
  if not public.has_active_license() then return json_build_object('ok', false, 'error', 'NO_LICENSE'); end if;
  if coalesce(trim(p_name),'') = '' then return json_build_object('ok', false, 'error', 'EMPTY_NAME'); end if;
  loop
    v_code := upper(substr(md5(gen_random_uuid()::text || clock_timestamp()::text), 1, 6));
    exit when not exists(select 1 from teams where join_code = v_code);
    v_try := v_try + 1; if v_try > 20 then return json_build_object('ok', false, 'error', 'CODE_FAIL'); end if;
  end loop;
  insert into teams(name, join_code, owner_id) values (trim(p_name), v_code, auth.uid()) returning id into v_id;
  insert into team_members(team_id, user_id, email, role, level)
    values (v_id, auth.uid(), (select email from auth.users where id = auth.uid()), 'editor', 1);
  return json_build_object('ok', true, 'team_id', v_id, 'name', trim(p_name), 'code', v_code, 'role', 'editor', 'level', 1, 'is_owner', true);
end $$;
revoke execute on function public.create_team(text) from public, anon;
grant   execute on function public.create_team(text) to authenticated;

-- ── 11. 공지 게재: 'announce' cap 필요 (이미지 캐시 차감 로직 유지) ──
create or replace function public.post_announcement(p_team uuid, p_body text, p_image text default null)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_cost bigint := 0; v_bal bigint; v_has_img boolean;
begin
  if not public.team_cap(p_team, 'announce') then
    return json_build_object('ok', false, 'error', 'NOT_EDITOR');
  end if;
  v_has_img := (p_image is not null and length(btrim(p_image)) > 0);
  if (p_body is null or length(btrim(p_body)) = 0) and not v_has_img then
    return json_build_object('ok', false, 'error', 'EMPTY');
  end if;
  if v_has_img then v_cost := 10; end if;   -- 이미지 공지 단가
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

-- ═══════════════════════════════════════════════════════════════
--  확인 명령
-- ═══════════════════════════════════════════════════════════════
-- 등급표 보기:   select grade_config from teams where id='팀ID';
-- 멤버 등급:     select email, role, level from team_members where team_id='팀ID' order by level;
