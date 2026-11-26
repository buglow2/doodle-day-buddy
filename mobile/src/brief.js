// 아침 브리핑(지수·환율·뉴스 제목) — 앱 화면 카드용 + 백그라운드 알림 설정 전달
// 설치형 앱: CapacitorHttp가 켜져 있어 모든 자료를 가져옴 / 웹: 브라우저 보안(CORS) 때문에 환율만 가져올 수 있음
export const IDX_ALL = ['KOSPI', 'KOSDAQ', 'S&P500', 'NASDAQ', 'DOW', 'NIKKEI'];
export const FX_ALL = ['USD', 'JPY', 'EUR', 'CNY'];
export const NEWS_ALL = ['종합', '경제', 'IT·과학', '세계'];
const IDX = { KOSPI: '^KS11', KOSDAQ: '^KQ11', 'S&P500': '^GSPC', NASDAQ: '^IXIC', DOW: '^DJI', NIKKEI: '^N225' };
const NEWS = { '종합': 'https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko', '경제': 'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=ko&gl=KR&ceid=KR:ko', 'IT·과학': 'https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=ko&gl=KR&ceid=KR:ko', '세계': 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=ko&gl=KR&ceid=KR:ko' };
export const FX_SYM = { USD: '$', JPY: '¥100', EUR: '€', CNY: '元' };
const KEY = 'mp_brief_cfg';
export const DEF_CFG = { on: true, time: '06:30', idx: ['KOSPI', 'KOSDAQ', 'S&P500', 'NASDAQ'], fx: ['USD', 'JPY', 'EUR'], news: '경제' };
export function loadBriefCfg() { try { return { ...DEF_CFG, ...(JSON.parse(localStorage.getItem(KEY) || 'null') || {}) }; } catch { return { ...DEF_CFG }; } }
export function saveBriefCfg(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {} pushBriefCfg(c); try { window.dispatchEvent(new Event('mp-brief-cfg')); } catch {} }
function getBR() { try { const C = window.Capacitor; if (!C || !C.isNativePlatform || !C.isNativePlatform()) return null; return (C.Plugins && C.Plugins.BackgroundRunner) || null; } catch { return null; } }
export function setRemCache(map) { try { localStorage.setItem('mp_rem_cache', JSON.stringify(map || {})); } catch {} }
function remCache() { try { return JSON.parse(localStorage.getItem('mp_rem_cache') || '{}'); } catch { return {}; } }
export async function pushBriefCfg(c) { const br = getBR(); if (!br) return false; c = { ...c, rem: remCache() }; try { try { if (c && c.on && br.requestPermissions) await br.requestPermissions({ apis: ['notifications'] }); } catch {} await br.dispatchEvent({ label: 'com.momentplan.brief', event: 'config', details: c }); return true; } catch { return false; } }
export async function fetchIdx(name) { const r = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(IDX[name]) + '?range=5d&interval=1d'); const j = await r.json(); const R0 = j.chart.result[0], m = R0.meta; const cl = ((((R0.indicators || {}).quote || [])[0] || {}).close || []).filter(x => x != null); const p = m.regularMarketPrice != null ? m.regularMarketPrice : cl[cl.length - 1]; const pc = cl.length >= 2 ? (Math.abs(cl[cl.length - 1] - p) < 1e-9 ? cl[cl.length - 2] : cl[cl.length - 1]) : (m.previousClose || m.chartPreviousClose); return { name, p, ch: pc ? (p - pc) / pc * 100 : null, t: m.regularMarketTime ? new Date(m.regularMarketTime * 1000) : null }; }
export async function fetchFx(list) { const r = await fetch('https://open.er-api.com/v6/latest/USD'); const j = await r.json(); const k = j.rates.KRW; const map = { USD: k, JPY: k / j.rates.JPY * 100, EUR: k / j.rates.EUR, CNY: k / j.rates.CNY }; return { at: j.time_last_update_utc, list: list.map(c => ({ c, v: map[c] })) }; }
export async function fetchNews(cat) { const r = await fetch(NEWS[cat] || NEWS['종합']); const t = await r.text(); const out = []; const re = /<item>[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<link>([\s\S]*?)<\/link>/g; let m; while ((m = re.exec(t)) && out.length < 5) out.push({ t: m[1].replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'"), u: m[2].trim() }); return out; }
export async function fetchBrief(cfg) {
  const res = { idx: [], fx: null, news: [], errs: [] };
  await Promise.all([
    Promise.all((cfg.idx || []).map(n => fetchIdx(n).catch(() => null))).then(a => { res.idx = a.filter(Boolean); if ((cfg.idx || []).length && !res.idx.length) res.errs.push('지수'); }),
    (cfg.fx || []).length ? fetchFx(cfg.fx).then(f => { res.fx = f; }).catch(() => res.errs.push('환율')) : null,
    cfg.news ? fetchNews(cfg.news).then(n => { res.news = n; }).catch(() => res.errs.push('뉴스')) : null
  ]);
  return res;
}
export const fmtN = n => n == null || isNaN(n) ? '-' : Number(n).toLocaleString('ko-KR', { maximumFractionDigits: n >= 100 ? 1 : 2 });
