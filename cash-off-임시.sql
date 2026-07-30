-- ═══════════════════════════════════════════════════════════════
--  MomentPlan — 캐시 기능 임시 끄기 (테스트/버그 확인용)
--  · 이미지 공지가 캐시 차감 없이 무료로 게시됩니다.
--  · 지갑(team_wallets) 데이터는 그대로 보존됩니다. 나중에 다시 켜기 가능.
--  ※ team-grades.sql 실행 후에 이 파일을 실행하세요. (Supabase → SQL Editor → Run)
--  ※ 나중에 캐시를 다시 켜려면 team-grades.sql 의 post_announcement 를 다시 실행하면 됩니다.
-- ═══════════════════════════════════════════════════════════════

create or replace function public.post_announcement(p_team uuid, p_body text, p_image text default null)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_has_img boolean;
begin
  if not public.team_cap(p_team, 'announce') then
    return json_build_object('ok', false, 'error', 'NOT_EDITOR');
  end if;
  v_has_img := (p_image is not null and length(btrim(p_image)) > 0);
  if (p_body is null or length(btrim(p_body)) = 0) and not v_has_img then
    return json_build_object('ok', false, 'error', 'EMPTY');
  end if;
  -- 캐시 차감 없음 (무료)
  insert into team_announcements(team_id, body, image_url, created_by)
    values (p_team, coalesce(btrim(p_body), ''), nullif(btrim(p_image), ''), auth.uid())
    returning id into v_id;
  return json_build_object('ok', true, 'id', v_id, 'cost', 0);
end $$;
revoke execute on function public.post_announcement(uuid,text,text) from public, anon;
grant   execute on function public.post_announcement(uuid,text,text) to authenticated;
