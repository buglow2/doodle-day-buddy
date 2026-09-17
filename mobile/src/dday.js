// PC에서 설정한 D-Day 종류(기념일/반복/한번)를 그대로 해석해서
// 다음 발생일까지 D-일, 몇 번째(나이·납부회차) 등을 계산
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
  const once = () => { const occ = new Date(y, m - 1, d); occ.setHours(0, 0, 0, 0); return { left: diffDays(occ), nth: 0, next: dd.date, nthLabel: '' }; };

  if (dd.type === 'anniversary') return dd.isYearly === false ? once() : yearly();
  if (dd.type === 'repeat') {
    if (dd.repeatUnit === 'monthly') return monthly();
    if (dd.repeatUnit === 'yearly') return yearly();
    // daily/weekly 등은 단순 표시
    return { left: 0, nth: 0, next: ymd(t), nthLabel: dd.repeatUnit === 'daily' ? '매일' : dd.repeatUnit === 'weekly' ? '매주' : '반복' };
  }
  return once(); // 종류 없으면 한 번
}

export function ddayKindText(dd) {
  if (dd.type === 'anniversary') return dd.isYearly === false ? '한 번' : '매년';
  if (dd.type === 'repeat') return { daily: '매일', weekly: '매주', monthly: '매월', yearly: '매년' }[dd.repeatUnit] || '반복';
  return '한 번';
}
