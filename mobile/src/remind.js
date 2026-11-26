// 폰 알림 모음: D-Day(7·3·1일 전·당일), 🔔 알림 일정, 피드백 메모
// - 앱(Capacitor)으로 설치된 경우: 앞으로 30일치 알림을 폰에 예약 (앱을 꺼도 울림)
// - 웹(브라우저)으로 쓰는 경우: 앱을 열 때 '오늘 알림' 카드 + (허용 시) 알림 1회
import { ddayInfo } from './dday.js';

const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const REMIND_OFFSETS = [7, 3, 1, 0];
const offTxt = o => o === 0 ? '오늘' : o === 1 ? '내일' : o + '일 전';

// 날짜별 알림 목록: { 'YYYY-MM-DD': [{icon, text, kind}] }
export function buildReminders(ddays, events, feedback, days = 30) {
  const out = {}; const t0 = new Date(); t0.setHours(0, 0, 0, 0);
  const add = (ds, it) => { (out[ds] = out[ds] || []).push(it); };
  (ddays || []).forEach(dd => {
    if (!dd || dd.hidden) return; let info; try { info = ddayInfo(dd); } catch { return; }
    if (!info || !info.next || info.left < 0) return;
    const occ = new Date(info.next + 'T00:00:00');
    REMIND_OFFSETS.forEach(o => { const when = new Date(occ); when.setDate(occ.getDate() - o); const diff = Math.round((when - t0) / 864e5); if (diff < 0 || diff > days) return;
      const what = dd.countUp && info.milestone ? dd.title + ' ' + info.milestone + '일' : dd.title + (info.nthLabel && /번째/.test(info.nthLabel) ? ' (' + info.nthLabel + ')' : '');
      add(ymd(when), { icon: o === 0 ? '🎉' : '⏰', kind: 'dday', text: (o === 0 ? '오늘은 ' + what : what + ' ' + offTxt(o)) + (dd.isLunar ? ' · 음력' : '') }); });
  });
  (events || []).forEach(ev => { if (!ev || !ev.date || ev.amount !== undefined) return; const isAlarm = /^🔔/.test(ev.title || '');
    if (!isAlarm) return; const d = new Date(ev.date + 'T00:00:00'); const diff = Math.round((d - t0) / 864e5); if (diff < 0 || diff > days) return;
    add(ev.date, { icon: '🔔', kind: 'alarm', text: String(ev.title).replace(/^🔔\s*/, '') + (ev.memo ? ' — ' + String(ev.memo).split('\n')[0] : '') }); });
  const open = (feedback || []).filter(f => f && !f.isDismissed && !f.completedAt);
  if (open.length) for (let i = 0; i <= Math.min(days, 6); i++) { const d = new Date(t0); d.setDate(t0.getDate() + i); add(ymd(d), { icon: '💬', kind: 'feedback', text: '피드백 ' + open.length + '개: ' + open.slice(0, 3).map(f => String(f.content || '').split('\n')[0].slice(0, 20)).join(' · ') + (open.length > 3 ? ' …' : '') }); }
  return out;
}

function getLN() { try { const C = window.Capacitor; if (!C || !C.isNativePlatform || !C.isNativePlatform()) return null; return (C.Plugins && C.Plugins.LocalNotifications) || null; } catch { return null; } }
export const isNativeApp = () => !!getLN();

// 설치형 앱: 앞으로 30일치를 매일 아침 9시에 예약 (기존 예약은 지우고 다시)
export async function scheduleReminders(map, time = '06:30') {
  const [hour, minute] = String(time || '06:30').split(':').map(Number);
  const ln = getLN(); if (!ln) return false;
  try {
    await ln.requestPermissions();
    let prev = []; try { prev = JSON.parse(localStorage.getItem('mp_remind_ids') || '[]'); } catch {}
    if (prev.length) { try { await ln.cancel({ notifications: prev.map(id => ({ id })) }); } catch {} }
    const list = []; let n = 0; const now = Date.now();
    Object.keys(map).sort().forEach(ds => { const [y, m, d] = ds.split('-').map(Number); const at = new Date(y, m - 1, d, isNaN(hour) ? 6 : hour, isNaN(minute) ? 30 : minute, 0); if (at.getTime() <= now) return; const items = map[ds]; const id = 7700000 + (n++);
      list.push({ id, title: items.length === 1 ? items[0].icon + ' ' + items[0].text : '📌 오늘 알림 ' + items.length + '개', body: items.map(x => x.icon + ' ' + x.text).join('\n'), schedule: { at } }); });
    if (list.length) await ln.schedule({ notifications: list.slice(0, 60) });
    localStorage.setItem('mp_remind_ids', JSON.stringify(list.map(x => x.id)));
    return true;
  } catch { return false; }
}

// 웹: 오늘 알림을 하루 1번 브라우저 알림으로 (허용한 경우)
export async function webNotifyToday(items) {
  try {
    if (!items || !items.length || typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const key = 'mp_webnotified_' + ymd(new Date()); if (localStorage.getItem(key)) return; localStorage.setItem(key, '1');
    const title = '📌 오늘 알림 ' + items.length + '개', body = items.map(x => x.icon + ' ' + x.text).join('\n');
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistration) { const reg = await navigator.serviceWorker.getRegistration(); if (reg) { reg.showNotification(title, { body }); return; } }
    new Notification(title, { body });
  } catch {}
}
export async function askWebPermission() { try { if (typeof Notification === 'undefined') return 'unsupported'; return await Notification.requestPermission(); } catch { return 'denied'; } }

// PC 시계 타이머(휴대폰에도 알림 켠 것) → 그 시각 정확히 폰 알림 예약 (설치형 앱)
export async function scheduleTimers(timers) {
  const ln = getLN(); if (!ln) return false;
  try {
    await ln.requestPermissions();
    let prev = []; try { prev = JSON.parse(localStorage.getItem('mp_timer_ids') || '[]'); } catch {}
    if (prev.length) { try { await ln.cancel({ notifications: prev.map(id => ({ id })) }); } catch {} }
    const now = Date.now();
    const list = (timers || []).filter(t => t && t.at > now).slice(0, 40).map((t, i) => ({ id: 7800000 + i, title: '⏰ ' + t.label, body: 'PC에서 설정한 타이머 (' + new Date(t.at).toTimeString().slice(0, 5) + ')', schedule: { at: new Date(t.at), allowWhileIdle: true } }));
    if (list.length) await ln.schedule({ notifications: list });
    localStorage.setItem('mp_timer_ids', JSON.stringify(list.map(x => x.id)));
    return true;
  } catch { return false; }
}
