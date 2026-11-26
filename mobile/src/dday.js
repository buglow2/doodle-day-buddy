// PC에서 설정한 D-Day 종류(기념일/반복/한번)를 그대로 해석해서
// 다음 발생일까지 D-일, 몇 번째(나이·납부회차) 등을 계산
import KoreanLunarCalendar from 'korean-lunar-calendar';
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today0 = () => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; };
const diffDays = (target) => Math.round((target - today0()) / 86400000);

function mkYear(Y, m, d) { // 2/29은 평년이면 3/1
  const leap = (Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0;
  return (m === 2 && d === 29 && !leap) ? new Date(Y, 2, 1) : new Date(Y, m - 1, d);
}
function mkMonth(Y, M, d) { const last = new Date(Y, M + 1, 0).getDate(); return new Date(Y, M, Math.min(d, last)); }

export function ddayLabel(left) {
  return left === 0 ? 'D-DAY' : left > 0 ? 'D-' + left : 'D+' + (-left);
}

// dd: { date:'YYYY-MM-DD', type?:'anniversary'|'repeat', isYearly?, repeatUnit? }
export function ddayInfo(dd) {
  const [y, m, d] = String(dd.date).split('-').map(Number);
  const t = today0();
  const yearly = () => {
    let Y = t.getFullYear(); let occ = mkYear(Y, m, d); occ.setHours(0, 0, 0, 0);
    if (occ < t) { Y++; occ = mkYear(Y, m, d); occ.setHours(0, 0, 0, 0); }
    return { left: diffDays(occ), nth: Y - y, next: ymd(occ), nthLabel: (Y - y) + '번째' };
  };
  const monthly = () => {
    let Y = t.getFullYear(), M = t.getMonth();
    let occ = mkMonth(Y, M, d); occ.setHours(0, 0, 0, 0);
    if (occ < t) { M++; if (M > 11) { M = 0; Y++; } occ = mkMonth(Y, M, d); occ.setHours(0, 0, 0, 0); }
    const nth = (Y - y) * 12 + (M - (m - 1)) + 1; // 시작월부터 회차
    return { left: diffDays(occ), nth: Math.max(1, nth), next: ymd(occ), nthLabel: Math.max(1, nth) + '회차' };
  };
  // 음력 매년 (PC와 같은 필드: isLunar) — dd.date의 월·일을 음력으로 보고 해마다 양력으로 바꿈
  const lunarYearly = () => {
    for (let Y = t.getFullYear() - 1; Y <= t.getFullYear() + 1; Y++) { const occ = lunarToSolar(Y, m, d); if (occ && occ >= t) return { left: diffDays(occ), nth: Y - y, next: ymd(occ), nthLabel: (Y - y) + '번째', lunar: true }; }
    return yearly();
  };
  // 100일 단위 (만난 날·아기 출생일): 시작일=1일째, 다음 100일 배수까지
  const countUp = () => {
    const start = new Date(y, m - 1, d); start.setHours(0, 0, 0, 0); const days = -diffDays(start) + 1;
    if (days < 1) return { left: diffDays(start), nth: 0, next: dd.date, nthLabel: '' };
    const ms = days % 100 === 0 ? days : Math.ceil(days / 100) * 100; const left = ms - days; const nx = new Date(t); nx.setDate(t.getDate() + left);
    return { left, nth: days, next: ymd(nx), nthLabel: days + '일째', milestone: ms };
  };
  const once = () => { const occ = new Date(y, m - 1, d); occ.setHours(0, 0, 0, 0); return { left: diffDays(occ), nth: 0, next: dd.date, nthLabel: '' }; };

  if (dd.countUp) return countUp();
  if (dd.type === 'anniversary') return dd.isYearly === false ? once() : (dd.isLunar ? lunarYearly() : yearly());
  if (dd.type === 'repeat') {
    if (dd.repeatUnit === 'monthly') return monthly();
    if (dd.repeatUnit === 'yearly') return yearly();
    // daily/weekly 등은 단순 표시
    return { left: 0, nth: 0, next: ymd(t), nthLabel: dd.repeatUnit === 'daily' ? '매일' : dd.repeatUnit === 'weekly' ? '매주' : '반복' };
  }
  return once(); // 종류 없으면 한 번
}

export function ddayKindText(dd) {
  if (dd.countUp) return '100일 단위';
  if (dd.type === 'anniversary' && dd.isLunar && dd.isYearly !== false) return '매년·음력';
  if (dd.type === 'anniversary') return dd.isYearly === false ? '한 번' : '매년';
  if (dd.type === 'repeat') return { daily: '매일', weekly: '매주', monthly: '매월', yearly: '매년' }[dd.repeatUnit] || '반복';
  return '한 번';
}

const _lc = new KoreanLunarCalendar();
export function lunarToSolar(Y, M, D) {
  try { let ok = _lc.setLunarDate(Y, M, D, false); if (!ok && D === 30) ok = _lc.setLunarDate(Y, M, 29, false); if (!ok) return null; const s = _lc.getSolarCalendar(); const r = new Date(s.year, s.month - 1, s.day); r.setHours(0, 0, 0, 0); return r; } catch { return null; }
}
