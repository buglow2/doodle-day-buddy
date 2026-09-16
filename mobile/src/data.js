// 일정 · D-Day 데이터 저장/불러오기
// PC 버전과 같은 데이터 구조(events)를 사용합니다.
// 지금은 폰 저장소(localStorage)만 씁니다. 나중에 Supabase 동기화를 붙이면 폰↔PC가 같은 일정을 봅니다.

const KEY = 'momentplan_mobile_v1';

function readAll() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null') || { events: [], ddays: [] }; }
  catch { return { events: [], ddays: [] }; }
}
function writeAll(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
  // TODO(동기화): 여기서 Supabase에 업로드하면 PC와 공유됩니다.
  // 예) supabase.from('user_events').upsert(data.events)
}

export function loadEvents() { return readAll().events || []; }
export function loadDdays() { return readAll().ddays || []; }
export function getAll() { return readAll(); }
export function setAll(data) { writeAll({ events: data.events || [], ddays: data.ddays || [] }); }

export function addEvent(ev) {
  const d = readAll();
  const item = { id: 'ev-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), isAllDay: true, color: 'blue', ...ev };
  d.events = [...(d.events || []), item];
  writeAll(d);
  return item;
}

export function deleteEvent(id) {
  const d = readAll();
  d.events = (d.events || []).filter(e => e.id !== id);
  writeAll(d);
}

export function addDday(dd) {
  const d = readAll();
  const item = { id: 'dd-' + Date.now().toString(36), ...dd };
  d.ddays = [...(d.ddays || []), item];
  writeAll(d);
  return item;
}

export function deleteDday(id) {
  const d = readAll();
  d.ddays = (d.ddays || []).filter(x => x.id !== id);
  writeAll(d);
}

// PC 백업(JSON)에서 가져오기 — PC 버전 "백업 저장"으로 받은 파일 붙여넣기용
export function importFromPcBackup(jsonText) {
  try {
    const p = JSON.parse(jsonText);
    const d = readAll();
    if (Array.isArray(p.events)) d.events = p.events;
    if (Array.isArray(p.ddays)) d.ddays = p.ddays;
    writeAll(d);
    return true;
  } catch { return false; }
}

export const COLORS = {
  red: '#ef4444', orange: '#f97316', yellow: '#eab308', green: '#22c55e',
  teal: '#14b8a6', blue: '#3b82f6', purple: '#a855f7', pink: '#ec4899'
};
