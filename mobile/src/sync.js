// PC 앱과 같은 Supabase 프로젝트에 연결 (같은 계정 = 같은 데이터)
import { createClient } from '@supabase/supabase-js';

const SUPA_URL = 'https://hqeukjoalmcpmjuslxmm.supabase.co';
const SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZXVram9hbG1jcG1qdXNseG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNTQ5MTUsImV4cCI6MjEwMDczMDkxNX0.f4tlaie_OcXDpzyrizcicLC2KFWYMDbchrof2ibUGQk';

export const sb = createClient(SUPA_URL, SUPA_ANON, {
  auth: { persistSession: true, autoRefreshToken: true }
});

export async function currentUser() {
  try { const { data } = await sb.auth.getUser(); return (data && data.user) || null; } catch { return null; }
}

export async function signIn(email, password) {
  return sb.auth.signInWithPassword({ email: email.trim(), password });
}
export async function signUp(email, password) {
  return sb.auth.signUp({ email: email.trim(), password });
}
export async function signOut() { try { await sb.auth.signOut(); } catch {} }

// PC 앱이 쓰는 기존 테이블 (전체 상태가 data 안에 들어있고, 일정은 data.events / data.ddays)
const TABLE = 'user_data';

// 클라우드에서 내 데이터 가져오기 → { events, ddays }
export async function pull() {
  const u = await currentUser();
  if (!u) return null;
  const { data, error } = await sb.from(TABLE).select('data').eq('user_id', u.id).maybeSingle();
  if (error) return null;
  const d = (data && data.data) || {};
  return { events: d.events || [], ddays: d.ddays || [], memos: d.mobileMemos || {} };
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
  full.events = payload.events || [];
  full.ddays = payload.ddays || [];
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
        try { const d = payload.new && payload.new.data; if (d) onChange({ events: d.events || [], ddays: d.ddays || [], memos: d.mobileMemos || {} }); } catch {}
      })
      .subscribe();
  })();
  return () => { try { ch && sb.removeChannel(ch); } catch {} };
}
