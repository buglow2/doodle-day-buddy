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

// 클라우드에서 내 데이터 가져오기 → { events, ddays } 또는 null
export async function pull() {
  const u = await currentUser();
  if (!u) return null;
  const { data, error } = await sb.from('user_sync').select('data,updated_at').eq('user_id', u.id).maybeSingle();
  if (error) return null;
  return (data && data.data) || { events: [], ddays: [] };
}

// 클라우드에 내 데이터 저장
export async function push(payload) {
  const u = await currentUser();
  if (!u) return false;
  const { error } = await sb.from('user_sync').upsert({
    user_id: u.id,
    data: { events: payload.events || [], ddays: payload.ddays || [] },
    updated_at: new Date().toISOString()
  }, { onConflict: 'user_id' });
  return !error;
}

// 다른 기기에서 바뀌면 자동으로 알려줌 (실시간)
export function subscribe(onChange) {
  let ch = null;
  (async () => {
    const u = await currentUser();
    if (!u) return;
    ch = sb.channel('user_sync_' + u.id)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_sync', filter: 'user_id=eq.' + u.id }, payload => {
        try { const d = payload.new && payload.new.data; if (d) onChange(d); } catch {}
      })
      .subscribe();
  })();
  return () => { try { ch && sb.removeChannel(ch); } catch {} };
}
