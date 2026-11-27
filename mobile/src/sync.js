// PC 앱과 같은 Supabase 프로젝트에 연결 (같은 계정 = 같은 데이터)
import { createClient } from '@supabase/supabase-js';

const SUPA_URL = 'https://hqeukjoalmcpmjuslxmm.supabase.co';
const SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZXVram9hbG1jcG1qdXNseG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNTQ5MTUsImV4cCI6MjEwMDczMDkxNX0.f4tlaie_OcXDpzyrizcicLC2KFWYMDbchrof2ibUGQk';

export const sb = createClient(SUPA_URL, SUPA_ANON, {
  auth: { persistSession: true, autoRefreshToken: true }
});

// 자동 로그인: 폰에 저장된 로그인 정보(세션)를 먼저 확인 → 인터넷이 늦게 붙어도 로그아웃으로 보이지 않음
// (예전엔 매번 서버에 물어봐서(getUser) 앱 켤 때 인터넷이 잠깐 안 되면 '로그인 필요'로 보였음)
export async function currentUser() {
  try { const { data } = await sb.auth.getSession(); if (data && data.session && data.session.user) return data.session.user; } catch {}
  try { const { data } = await sb.auth.getUser(); return (data && data.user) || null; } catch { return null; }
}
// 로그인 상태가 바뀌면(저장된 세션 복원·토큰 갱신 포함) 알려줌
export function onAuth(cb) { try { const { data } = sb.auth.onAuthStateChange((ev, session) => cb(session ? session.user : null, ev)); return () => { try { data.subscription.unsubscribe(); } catch {} }; } catch { return () => {}; } }

export async function signIn(email, password) {
  return sb.auth.signInWithPassword({ email: email.trim(), password });
}
export async function signUp(email, password) {
  return sb.auth.signUp({ email: email.trim(), password });
}
export async function signOut() { try { await sb.auth.signOut(); } catch {} }

// PC 앱이 쓰는 기존 테이블 (전체 상태가 data 안에 들어있고, 일정은 data.events / data.ddays)
const TABLE = 'user_data';

// PC 메모(메모 탭 항목)·피드백 메모는 폰에서 '보기 전용'으로 가져옴 (용량 줄이려고 앞부분만)
function pcExtras(d) {
  const pcMemos = [];
  (d.memoTabs || []).forEach(t => { if (!t || t.id === 'calendar') return; (t.items || []).forEach(it => { if (!it || !it.createdAt) return; const c = String(it.content || ''); pcMemos.push({ id: it.id, tab: t.title || '', color: t.color || '#a78bfa', createdAt: it.createdAt, text: c.slice(0, 400) }); }); });
  pcMemos.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const feedback = (d.feedbackMemos || []).map(f => ({ id: f.id, content: String(f.content || '').slice(0, 300), createdAt: f.createdAt, isDismissed: f.isDismissed, completedAt: f.completedAt, color: f.color, tabTitle: f.tabTitle }));
  // PC 시계 타이머 중 '휴대폰에도 알림' 켠 것 (앞으로 울릴 것만)
  const now = Date.now();
  const st = d.settings || {}; const tc = st.timerClock || {};
  const timers = tc.phone ? (st.timers || []).filter(t => t && !t.done && t.at > now).map(t => ({ id: t.id, label: String(t.label || '타이머').slice(0, 120), at: t.at })) : [];
  const alarms = tc.phone ? (st.alarms || []).filter(a => a && a.on && /^\d{1,2}:\d{2}$/.test(a.hm || '') && (a.days || []).length).map(a => ({ id: a.id, label: String(a.label || '알람').slice(0, 120), hm: a.hm, days: a.days })) : [];
  return { pcMemos: pcMemos.slice(0, 800), feedback, timers, alarms, tsound: tc.phoneSound !== false };
}


// 클라우드에서 내 데이터 가져오기 → { events, ddays }
export async function pull() {
  const u = await currentUser();
  if (!u) return null;
  const { data, error } = await sb.from(TABLE).select('data').eq('user_id', u.id).maybeSingle();
  if (error) return null;
  const d = (data && data.data) || {};
  return { events: d.events || [], ddays: d.ddays || [], memos: d.mobileMemos || {}, ...pcExtras(d) };
}

// 클라우드에 저장 — PC의 다른 데이터는 건드리지 않게 전체를 불러와 events/ddays만 갱신
export async function push(payload) {
  const u = await currentUser();
  if (!u) return false;
  let full = {};
  try {
    const { data } = await sb.from(TABLE).select('data').eq('user_id', u.id).maybeSingle();
    full = (data && data.data) || {};
  } catch {}
  // ⚠️ 통째로 덮어쓰지 않고 합치기: 클라우드(PC가 올린 최신) + 폰에서 추가·수정한 것 − 폰에서 지운 것
  //    (예전엔 폰 목록으로 덮어써서, 폰이 오래된 목록이면 PC에서 새로 쓴 일정이 지워질 위험이 있었음)
  const del = new Set(payload.deleted || []);
  const merge = (cloud, phone) => { const m = new Map(); (cloud || []).forEach(x => { if (x && x.id && !del.has(x.id)) m.set(x.id, x); }); (phone || []).forEach(x => { if (x && x.id && !del.has(x.id)) m.set(x.id, { ...(m.get(x.id) || {}), ...x }); }); return [...m.values()]; };
  full.events = merge(full.events, payload.events);
  full.ddays = merge(full.ddays, payload.ddays);
  full.mobileMemos = payload.memos || {};
  const { error } = await sb.from(TABLE).upsert({
    user_id: u.id, data: full, updated_at: new Date().toISOString()
  }, { onConflict: 'user_id' });
  return !error;
}

// 다른 기기(PC)에서 바뀌면 자동 반영 (실시간)
export function subscribe(onChange) {
  let ch = null;
  (async () => {
    const u = await currentUser();
    if (!u) return;
    ch = sb.channel('user_data_' + u.id)
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE, filter: 'user_id=eq.' + u.id }, payload => {
        try { const d = payload.new && payload.new.data; if (d) onChange({ events: d.events || [], ddays: d.ddays || [], memos: d.mobileMemos || {}, ...pcExtras(d) }); } catch {}
      })
      .subscribe();
  })();
  return () => { try { ch && sb.removeChannel(ch); } catch {} };
}
