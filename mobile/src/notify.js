// 폰 로컬 알림 예약 (Capacitor Local Notifications)
// 진짜 앱(Capacitor)에서만 동작합니다. 웹(브라우저 미리보기)에서는 조용히 건너뜁니다.
// 웹 빌드가 패키지를 찾으려다 에러 나지 않도록, import 없이 window.Capacitor 를 통해 접근합니다.

function getLN() {
  try {
    const C = (typeof window !== 'undefined') ? window.Capacitor : null;
    if (!C || !C.isNativePlatform || !C.isNativePlatform()) return null;
    return (C.Plugins && C.Plugins.LocalNotifications) || null;
  } catch { return null; }
}

// 일정 알림 예약: ev.date="YYYY-MM-DD", time="HH:MM"
export async function scheduleEventAlarm(ev, time) {
  const ln = getLN();
  if (!ln) return false; // 웹에서는 아무것도 안 함
  try {
    await ln.requestPermissions();
    const [h, m] = String(time || '09:00').split(':').map(Number);
    const [y, mo, d] = String(ev.date).split('-').map(Number);
    const at = new Date(y, mo - 1, d, h || 9, m || 0, 0);
    if (at.getTime() < Date.now()) return false;
    await ln.schedule({
      notifications: [{ id: Math.floor(Math.random() * 1e9), title: 'MomentPlan', body: ev.title || '일정 알림', schedule: { at } }]
    });
    return true;
  } catch { return false; }
}

export async function notifyNow(title, body) {
  const ln = getLN();
  if (!ln) { try { alert(title + '\n' + body); } catch {} return; }
  try {
    await ln.requestPermissions();
    await ln.schedule({ notifications: [{ id: Math.floor(Math.random() * 1e9), title, body, schedule: { at: new Date(Date.now() + 500) } }] });
  } catch {}
}
