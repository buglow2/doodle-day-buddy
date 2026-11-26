// MomentPlan 아침 브리핑 — 설치형 앱(안드로이드)에서 15분마다 깨어나 정한 시간이 지났으면 1번 알림
// (Capacitor Background Runner 전용 파일: import 없이 단독 실행됨)
function kvGet(k) { try { const r = CapacitorKV.get(k); return r && typeof r === 'object' ? r.value : r; } catch (e) { return null; } }
function kvSet(k, v) { try { CapacitorKV.set(k, String(v)); } catch (e) {} }
const pad = n => String(n).padStart(2, '0');
const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const IDX = { KOSPI: '^KS11', KOSDAQ: '^KQ11', 'S&P500': '^GSPC', NASDAQ: '^IXIC', DOW: '^DJI', NIKKEI: '^N225' };
const NEWS = { '종합': 'https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko', '경제': 'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=ko&gl=KR&ceid=KR:ko', 'IT·과학': 'https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=ko&gl=KR&ceid=KR:ko', '세계': 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=ko&gl=KR&ceid=KR:ko' };
async function getIdx(name) { const r = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(IDX[name]) + '?range=5d&interval=1d'); const j = await r.json(); const R0 = j.chart.result[0], m = R0.meta; const cl = ((((R0.indicators || {}).quote || [])[0] || {}).close || []).filter(x => x != null); const p = m.regularMarketPrice != null ? m.regularMarketPrice : cl[cl.length - 1]; const pc = cl.length >= 2 ? (Math.abs(cl[cl.length - 1] - p) < 1e-9 ? cl[cl.length - 2] : cl[cl.length - 1]) : (m.previousClose || m.chartPreviousClose); return { name, p, ch: pc ? (p - pc) / pc * 100 : null }; }
async function getFx(list) { const r = await fetch('https://open.er-api.com/v6/latest/USD'); const j = await r.json(); const k = j.rates.KRW; const map = { USD: k, JPY: k / j.rates.JPY * 100, EUR: k / j.rates.EUR, CNY: k / j.rates.CNY }; return list.map(c => ({ c, v: map[c] })); }
async function getNews(cat) { const r = await fetch(NEWS[cat] || NEWS['종합']); const t = await r.text(); const out = []; const re = /<item>[\s\S]*?<title>([\s\S]*?)<\/title>/g; let m; while ((m = re.exec(t)) && out.length < 5) out.push(m[1].replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/ - [^-]+$/, '')); return out; }
const fmt = n => n == null || isNaN(n) ? '-' : Number(n).toLocaleString('ko-KR', { maximumFractionDigits: n >= 100 ? 1 : 2 });
async function buildBrief(cfg) {
  const lines = [];
  try { const ix = await Promise.all((cfg.idx || []).map(n => getIdx(n).catch(() => null))); const s = ix.filter(Boolean).map(x => x.name + ' ' + fmt(x.p) + (x.ch == null ? '' : (x.ch >= 0 ? ' ▲' : ' ▼') + Math.abs(x.ch).toFixed(1) + '%')); if (s.length) lines.push('📈 ' + s.join(' · ')); } catch (e) {}
  try { if ((cfg.fx || []).length) { const fx = await getFx(cfg.fx); lines.push('💱 ' + fx.map(x => ({ USD: '$', JPY: '¥100', EUR: '€', CNY: '元' })[x.c] + ' ' + fmt(x.v) + '원').join(' · ')); } } catch (e) {}
  try { if (cfg.news) { const n = await getNews(cfg.news); n.forEach((t, i) => lines.push((i + 1) + '. ' + t)); } } catch (e) {}
  return lines;
}
addEventListener('config', (resolve, reject, args) => { try { kvSet('brief_cfg', JSON.stringify(args || {})); resolve(); } catch (e) { reject(e); } });
addEventListener('checkIn', async (resolve, reject) => {
  try {
    let cfg = {}; try { cfg = JSON.parse(kvGet('brief_cfg') || '{}'); } catch (e) {}
    if (!cfg.on) { resolve(); return; }
    const now = new Date(); const [h, mi] = String(cfg.time || '06:30').split(':').map(Number); const at = new Date(now); at.setHours(isNaN(h) ? 6 : h, isNaN(mi) ? 30 : mi, 0, 0);
    const today = ymd(now);
    if (kvGet('brief_sent') === today || now < at || now - at > 3 * 3600 * 1000) { resolve(); return; }
    const rem = ((cfg.rem || {})[today] || []).map(x => x.icon + ' ' + x.text);
    const lines = rem.concat(await buildBrief(cfg));
    kvSet('brief_sent', today);
    kvSet('brief_last', JSON.stringify({ at: now.toISOString(), lines }));
    CapacitorNotifications.schedule([{ id: 880000 + now.getDate(), title: '☀️ 아침 브리핑 ' + (now.getMonth() + 1) + '/' + now.getDate() + (rem.length ? ' · 챙길 일 ' + rem.length + '개' : ''), body: lines.slice(0, 10).join('\n') || '오늘 자료를 가져오지 못했어요.', scheduleAt: new Date(Date.now() + 1000) }]);
    resolve();
  } catch (e) { reject(e); }
});
