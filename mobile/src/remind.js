// 폰 알림 모음: D-Day(7·3·1일 전·당일), 🔔 알림 일정, 피드백 메모
// - 앱(Capacitor)으로 설치된 경우: 앞으로 30일치 알림을 폰에 예약 (앱을 꺼도 울림)
// - 웹(브라우저)으로 쓰는 경우: 앱을 열 때 '오늘 알림' 카드 + (허용 시) 알림 1회
import { ddayInfo } from './dday.js';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

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

// ⚠️ 예전엔 window.Capacitor.Plugins.LocalNotifications 로 찾았는데 Capacitor 3+에선 import 안 하면 비어 있음 → 알림이 하나도 예약 안 되던 원인
function getLN() { try { return Capacitor.isNativePlatform() ? LocalNotifications : null; } catch { return null; } }
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

// PC 시계 타이머(한 번)·알람(요일 반복) → 폰 알림 예약 (설치형 앱). sound=false면 무음 채널
export async function scheduleTimers(timers, alarms = [], sound = true) {
  const ln = getLN(); if (!ln) return false;
  try {
    await ln.requestPermissions();
    try { await ln.createChannel({ id: 'mp_timer_snd', name: '타이머·알람 (소리)', importance: 5, vibration: true, visibility: 1 }); await ln.createChannel({ id: 'mp_timer_mute', name: '타이머·알람 (무음)', importance: 2, vibration: false, visibility: 1 }); } catch {}
    const ch = sound ? 'mp_timer_snd' : 'mp_timer_mute';
    let prev = []; try { prev = JSON.parse(localStorage.getItem('mp_timer_ids') || '[]'); } catch {}
    if (prev.length) { try { await ln.cancel({ notifications: prev.map(id => ({ id })) }); } catch {} }
    const now = Date.now(); let n = 0; const list = [];
    (timers || []).filter(t => t && t.at > now).slice(0, 40).forEach(t => list.push({ id: 7800000 + (n++), title: '⏱ ' + t.label, body: 'PC에서 설정한 타이머 (' + new Date(t.at).toTimeString().slice(0, 5) + ')', channelId: ch, schedule: { at: new Date(t.at), allowWhileIdle: true } }));
    (alarms || []).slice(0, 20).forEach(a => { const [h, m] = a.hm.split(':').map(Number); const body = '알람 ' + a.hm;
      if ((a.days || []).length >= 7) list.push({ id: 7800000 + (n++), title: '⏰ ' + a.label, body, channelId: ch, schedule: { on: { hour: h, minute: m }, allowWhileIdle: true } });
      else a.days.forEach(d => list.push({ id: 7800000 + (n++), title: '⏰ ' + a.label, body, channelId: ch, schedule: { on: { weekday: d + 1, hour: h, minute: m }, allowWhileIdle: true } })); });
    if (list.length) await ln.schedule({ notifications: list });
    localStorage.setItem('mp_timer_ids', JSON.stringify(list.map(x => x.id)));
    return true;
  } catch { return false; }
}

// 아침 브리핑 '안전망': 정한 시각에 확실히 울리는 예약 알림(정확한 알람)을 7일치 걸어 둠.
// 백그라운드가 뉴스·지수를 가져오면 같은 번호(880000+날짜)로 내용을 바꿔 다시 알려 줌. 백그라운드가 막혀도 이 알림은 울림.
export async function scheduleBriefFallback(map, time = '06:30') {
  const ln = getLN(); if (!ln) return false;
  try {
    let prev = []; try { prev = JSON.parse(localStorage.getItem('mp_brieffb_ids') || '[]'); } catch {}
    if (prev.length) { try { await ln.cancel({ notifications: prev.map(id => ({ id })) }); } catch {} }
    if (!map) { localStorage.setItem('mp_brieffb_ids', '[]'); return true; }
    await ln.requestPermissions();
    const [h, m] = String(time || '06:30').split(':').map(Number); const now = Date.now(); const list = [];
    for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() + i); d.setHours(isNaN(h) ? 6 : h, isNaN(m) ? 30 : m, 0, 0); if (d.getTime() <= now) continue;
      const items = (map[ymd(d)] || []); const body = items.map(x => x.icon + ' ' + x.text).concat(['📈 지수·환율·📰 뉴스는 잠시 뒤 이어서 와요 (안 오면 앱을 열어 주세요)']).join('\n');
      list.push({ id: 880000 + d.getDate(), title: '☀️ 아침 브리핑 ' + (d.getMonth() + 1) + '/' + d.getDate() + (items.length ? ' · 챙길 일 ' + items.length + '개' : ''), body, schedule: { at: d, allowWhileIdle: true } }); }
    if (list.length) await ln.schedule({ notifications: list });
    localStorage.setItem('mp_brieffb_ids', JSON.stringify(list.map(x => x.id)));
    return true;
  } catch { return false; }
}
