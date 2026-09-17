// 음력 날짜 + 한국 공휴일 (연도별 자동 계산) — 권한 불필요
import KoreanLunarCalendar from 'korean-lunar-calendar';

const cal = new KoreanLunarCalendar();
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function lunarText(dateStr) {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    cal.setSolarDate(y, m, d);
    const l = cal.getLunarCalendar();
    return '음력 ' + l.month + '.' + l.day + (l.intercalation ? '(윤)' : '');
  } catch { return ''; }
}

export function lunarShort(dateStr) {
  try { const [y, m, d] = dateStr.split('-').map(Number); cal.setSolarDate(y, m, d); const l = cal.getLunarCalendar(); return l.month + '.' + l.day; }
  catch { return ''; }
}
function lunarToSolar(y, m, d) {
  try { cal.setLunarDate(y, m, d, false); const s = cal.getSolarCalendar(); return new Date(s.year, s.month - 1, s.day); }
  catch { return null; }
}
const addDays = (dt, n) => { const x = new Date(dt); x.setDate(x.getDate() + n); return x; };

const _cache = {};
function buildYear(year) {
  const map = {};
  const put = (dt, name) => { if (dt) map[ymd(dt)] = name; };
  // 고정 양력
  put(new Date(year, 0, 1), '신정');
  put(new Date(year, 2, 1), '삼일절');
  put(new Date(year, 4, 5), '어린이날');
  put(new Date(year, 5, 6), '현충일');
  put(new Date(year, 7, 15), '광복절');
  put(new Date(year, 9, 3), '개천절');
  put(new Date(year, 9, 9), '한글날');
  put(new Date(year, 11, 25), '성탄절');
  // 음력
  const seol = lunarToSolar(year, 1, 1);
  if (seol) { put(addDays(seol, -1), '설날'); put(seol, '설날'); put(addDays(seol, 1), '설날'); }
  const chu = lunarToSolar(year, 8, 15);
  if (chu) { put(addDays(chu, -1), '추석'); put(chu, '추석'); put(addDays(chu, 1), '추석'); }
  put(lunarToSolar(year, 4, 8), '부처님오신날');
  // 대체공휴일 (현충일·신정 제외, 토/일 겹치면 다음 평일)
  const eligible = ['삼일절', '어린이날', '광복절', '개천절', '한글날', '성탄절', '부처님오신날', '설날', '추석'];
  Object.keys({ ...map }).forEach(k => {
    if (!eligible.includes(map[k])) return;
    const dt = new Date(k + 'T00:00:00'); const dow = dt.getDay();
    if (dow === 0 || dow === 6) {
      let x = addDays(dt, 1);
      while (map[ymd(x)] || x.getDay() === 0 || x.getDay() === 6) x = addDays(x, 1);
      if (!map[ymd(x)]) map[ymd(x)] = '대체공휴일';
    }
  });
  return map;
}

export function holidayName(dateStr) {
  const y = +dateStr.slice(0, 4);
  if (!_cache[y]) _cache[y] = buildYear(y);
  return _cache[y][dateStr] || null;
}
