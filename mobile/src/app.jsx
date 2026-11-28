import React, { useState, useMemo, useEffect } from 'react';
import { loadEvents, loadDdays, addEvent, deleteEvent, addDday, deleteDday, importFromPcBackup, getAll, setAll, loadMemos, setMemo, loadFeedback, loadPcMemos, loadTimers, loadAlarms, loadTSound, COLORS } from './data.js';
import { Browser } from '@capacitor/browser';
import { checkUpdate, applyWebNow, installApk, noteApplied, isNative, WEB_VERSION } from './update.js';
import { buildReminders, scheduleReminders, scheduleTimers, scheduleBriefFallback, webNotifyToday, askWebPermission, isNativeApp } from './remind.js';
import { loadBriefCfg, saveBriefCfg, pushBriefCfg, setRemCache, fetchBrief, fetchNews, briefStatus, fmtN, IDX_ALL, FX_ALL, NEWS_ALL, FX_SYM, newsCatsOf } from './brief.js';
import { scheduleEventAlarm } from './notify.js';
import { currentUser, signIn, signUp, signOut, pull, push, subscribe, onAuth } from './sync.js';
import { lunarText, lunarShort, holidayName } from './kcal.js';
import { ddayInfo, ddayLabel, ddayKindText } from './dday.js';

const WD = ['일', '월', '화', '수', '목', '금', '토'];
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayStr = () => ymd(new Date());

function daysBetween(a, b) {
  const A = new Date(a + 'T00:00:00'), B = new Date(b + 'T00:00:00');
  return Math.round((A - B) / 86400000);
}

export default function App() {
  const [tab, setTab] = useState('today');
  const [events, setEvents] = useState(loadEvents());
  const [ddays, setDdays] = useState(loadDdays());
  const [memos, setMemos] = useState(loadMemos());
  const [feedback, setFeedback] = useState(loadFeedback());
  const [pcMemos, setPcMemos] = useState(loadPcMemos());
  const [timers, setTimers] = useState(loadTimers());
  const [alarms, setAlarms] = useState(loadAlarms());
  const [tsound, setTsound] = useState(loadTSound());
  useEffect(() => { scheduleTimers(timers, alarms, tsound); }, [JSON.stringify(timers), JSON.stringify(alarms), tsound]);
  const [cur, setCur] = useState(new Date());
  const [addDate, setAddDate] = useState(todayStr());
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');
  const refresh = () => { setEvents(loadEvents()); setDdays(loadDdays()); setMemos(loadMemos()); setFeedback(loadFeedback()); setPcMemos(loadPcMemos()); setTimers(loadTimers()); setAlarms(loadAlarms()); setTsound(loadTSound()); };
  const reminders = useMemo(() => buildReminders(ddays, events, feedback, 30), [ddays, events, feedback]);
  const [briefTick, setBriefTick] = useState(0);
  useEffect(() => { const h = () => setBriefTick(t => t + 1); window.addEventListener('mp-brief-cfg', h); return () => window.removeEventListener('mp-brief-cfg', h); }, []);
  // 알림은 아침 브리핑 시간(기본 6:30) 한 번으로 합침: 브리핑 켜짐 → 브리핑 알림 안에 D-Day·일정·피드백을 함께 / 꺼짐 → 같은 시간에 따로 예약
  useEffect(() => { const t = setTimeout(() => { setRemCache(reminders); const bc = loadBriefCfg(); if (bc.on) { pushBriefCfg(bc); scheduleReminders({}, bc.time); scheduleBriefFallback(reminders, bc.time); } else { scheduleBriefFallback(null); scheduleReminders(reminders, bc.time); } webNotifyToday(reminders[todayStr()] || []); }, 800); return () => clearTimeout(t); }, [reminders, briefTick]);

  // 로그인돼 있으면 클라우드에서 내려받아 합치기 + 실시간 구독
  // 자동 로그인: 저장된 세션을 바로 쓰고, 나중에 복원돼도(인터넷 늦게 연결 등) 자동으로 동기화 시작
  useEffect(() => {
    let unsub = () => {}; let started = false;
    const start = async (u) => { if (!u || started) return; started = true; setUser(u); const cloud = await pull(); if (cloud) { setAll(cloud); refresh(); } unsub = subscribe(d => { setAll(d); refresh(); }); };
    (async () => { const u = await currentUser(); if (u) start(u); })();
    const off = onAuth((u, ev) => { if (u) start(u); else if (ev === 'SIGNED_OUT') { setUser(null); started = false; try { unsub(); } catch {} } });
    return () => { try { unsub(); } catch {} off(); };
  }, []);

  // 변경 후 클라우드에 올리기 (로그인 시)
  const pushCloud = async () => {
    if (!(await currentUser())) return;
    setSyncMsg('동기화 중…');
    const ok = await push(getAll());
    setSyncMsg(ok ? '동기화됨 ✓' : '동기화 실패');
    setTimeout(() => setSyncMsg(''), 1500);
  };

  const onAuthed = async (u) => {
    setUser(u); setShowAuth(false);
    const cloud = await pull();
    if (cloud && ((cloud.events || []).length || (cloud.ddays || []).length)) {
      setAll(cloud); refresh();          // 클라우드에 데이터가 있으면 그걸로
    } else {
      await push(getAll());              // 없으면 지금 폰 데이터를 올림
    }
    subscribe(d => { setAll(d); refresh(); });
  };
  const onSignOut = async () => { await signOut(); setUser(null); };

  const evByDate = useMemo(() => {
    const m = {};
    events.filter(e => e.amount === undefined).forEach(e => { (m[e.date] = m[e.date] || []).push(e); });
    return m;
  }, [events]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 16px', paddingTop: 'max(14px, env(safe-area-inset-top))', background: '#111827', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 20 }}>📅 MomentPlan</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{todayStr()} ({WD[new Date().getDay()]}){syncMsg ? ' · ' + syncMsg : ''} · <span onClick={() => window.dispatchEvent(new Event('mp-check-update'))} title="눌러서 업데이트 확인" style={{ textDecoration: 'underline', cursor: 'pointer' }}>v{WEB_VERSION}</span></div>
        </div>
        <button onClick={() => setShowShare(true)} title="일정 공유" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#e5e7eb', borderRadius: 999, padding: '6px 11px', fontSize: 12, cursor: 'pointer' }}>📤 공유</button>
        <button onClick={() => user ? (window.confirm('로그아웃할까요? (로그아웃하면 다음에 다시 로그인해야 해요)') && onSignOut()) : setShowAuth(true)} style={{
          background: user ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)', border: '1px solid ' + (user ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.2)'),
          color: user ? '#86efac' : '#e5e7eb', borderRadius: 999, padding: '6px 12px', fontSize: 12, cursor: 'pointer'
        }}>{user ? '☁' : '☁ 로그인'}</button>
      </header>
      <UpdateBanner />
      {showAuth && <AuthPanel onClose={() => setShowAuth(false)} onAuthed={onAuthed} />}
      {showShare && <SharePanel evByDate={evByDate} onClose={() => setShowShare(false)} />}

      <main style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {tab === 'today' && <Today evByDate={evByDate} ddays={ddays} reminders={reminders} feedback={feedback} timers={timers} alarms={alarms} tsound={tsound} onDel={id => { deleteEvent(id); refresh(); pushCloud(); }} />}
        {tab === 'month' && <Month cur={cur} setCur={setCur} evByDate={evByDate} memos={memos} pcMemos={pcMemos} feedback={feedback} reminders={reminders}
          onDel={id => { deleteEvent(id); refresh(); pushCloud(); }}
          onAddDay={ds => { setAddDate(ds); setTab('add'); }}
          onMemo={(ds, txt) => { setMemo(ds, txt); setMemos(loadMemos()); pushCloud(); }} />}
        {tab === 'add' && <AddEvent initialDate={addDate} onAdd={(ev, time) => { const it = addEvent(ev); if (time) scheduleEventAlarm(it, time); refresh(); pushCloud(); setTab('month'); }} onImport={txt => { if (importFromPcBackup(txt)) { refresh(); pushCloud(); } }} />}
        {tab === 'dday' && <Dday ddays={ddays} onAdd={dd => { addDday(dd); refresh(); pushCloud(); }} onDel={id => { deleteDday(id); refresh(); pushCloud(); }} />}
        {tab === 'ledger' && <Ledger events={events} user={user} onLogin={() => setShowAuth(true)} />}
      </main>

      <nav style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#111827', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {[['today', '오늘', '📌'], ['month', '달력', '🗓'], ['ledger', '가계부', '💰'], ['dday', 'D-Day', '⏳'], ['add', '추가', '➕']].map(t => (
          <button key={t[0]} onClick={() => setTab(t[0])} style={{
            flex: 1, padding: '10px 0 12px', background: 'transparent', border: 'none',
            color: tab === t[0] ? '#60a5fa' : 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer'
          }}>
            <div style={{ fontSize: 20 }}>{t[2]}</div>{t[1]}
          </button>
        ))}
      </nav>
    </div>
  );
}

function EvRow({ e, onDel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 8 }}>
      <span style={{ width: 10, height: 10, borderRadius: 999, background: e.customColor || COLORS[e.color] || '#3b82f6', flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 15 }}>{e.title}</span>
      <button onClick={() => onDel(e.id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 16 }}>✕</button>
    </div>
  );
}

function Today({ evByDate, ddays, reminders, feedback, timers, alarms, tsound, onDel }) {
  const t = todayStr();
  const list = evByDate[t] || [];
  const todayRem = (reminders && reminders[t]) || [];
  const soon = Object.keys(reminders || {}).filter(ds => ds > t).sort().slice(0, 7).flatMap(ds => reminders[ds].filter(x => x.kind !== 'feedback').map(x => ({ ...x, ds })));
  const openFb = (feedback || []).filter(f => f && !f.isDismissed && !f.completedAt);
  const [perm, setPerm] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'unsupported');
  const upcomingDd = ddays.map(d => ({ ...d, left: ddayInfo(d).left })).filter(d => d.left >= 0).sort((a, b) => a.left - b.left).slice(0, 5);
  const SEC = {
    timers: ((timers || []).length + (alarms || []).length) ? <><div style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.45)', borderRadius: 12, padding: '10px 12px', marginBottom: 14 }}>
        <b style={{ fontSize: 14, color: '#fca5a5' }}>⏱ PC 타이머·알람 {tsound ? '🔔' : '🔕'}</b>
        {timers.slice().sort((a, b) => a.at - b.at).map(x => <div key={x.id} style={{ fontSize: 13, color: '#fee2e2', marginTop: 4 }}>⏱ {new Date(x.at).toTimeString().slice(0, 5)} · {x.label}</div>)}
        {(alarms || []).map(x => <div key={x.id} style={{ fontSize: 13, color: '#fee2e2', marginTop: 4 }}>⏰ {(x.days || []).length >= 7 ? '매일' : x.days.map(d => '일월화수목금토'[d]).join('·')} {x.hm} · {x.label}</div>)}
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{isNativeApp() ? '그 시각에 이 폰에서도 알림이 울려요.' : '알림은 설치형 앱에서만 울려요 (웹은 목록만).'}</div>
      </div></> : null,
    remind: <><div style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.40)', borderRadius: 12, padding: '10px 12px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <b style={{ flex: 1, fontSize: 14, color: '#fcd34d' }}>🔔 오늘 알림 {todayRem.length ? '(' + todayRem.length + ')' : ''}</b>
          {!isNativeApp() && perm !== 'granted' && perm !== 'unsupported' ? <button onClick={async () => setPerm(await askWebPermission())} style={{ background: 'rgba(245,158,11,0.25)', border: '1px solid rgba(245,158,11,0.6)', color: '#fde68a', borderRadius: 8, padding: '3px 8px', fontSize: 11 }}>알림 허용</button> : null}
        </div>
        {todayRem.length ? todayRem.map((x, i) => <div key={i} style={{ fontSize: 14, color: '#fef3c7', padding: '3px 0', lineHeight: 1.45 }}>{x.icon} {x.text}</div>) : <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>오늘은 챙길 알림이 없어요.</div>}
        {soon.length ? <div style={{ marginTop: 8, borderTop: '1px solid rgba(245,158,11,0.25)', paddingTop: 6 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginBottom: 3 }}>다가오는 알림</div>
          {soon.slice(0, 6).map((x, i) => <div key={i} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.88)', padding: '2px 0' }}><span style={{ color: '#fcd34d', marginRight: 6 }}>{x.ds.slice(5).replace('-', '/')}</span>{x.icon} {x.text}</div>)}
        </div> : null}
        <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{isNativeApp() ? '매일 아침 ' + loadBriefCfg().time + ' 브리핑 알림에 함께 들어가요.' : '웹으로 쓰는 중: 앱을 열 때 알려드려요. (앱 설치형은 꺼져 있어도 알림)'}</div>
      </div></>,
    brief: <BriefCard />,
    feedback: openFb.length ? <>
        <h3 style={{ margin: '4px 0 8px', fontSize: 15, color: '#c4b5fd' }}>💬 확인할 피드백 ({openFb.length})</h3>
        {openFb.slice(0, 8).map(f => <div key={f.id} style={{ display: 'flex', gap: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 6, fontSize: 14 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: f.color && f.color[0] === '#' ? f.color : '#a78bfa', marginTop: 6, flexShrink: 0 }} /><span style={{ flex: 1, whiteSpace: 'pre-wrap' }}>{f.content}</span><span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>{String(f.createdAt || '').slice(5, 10).replace('-', '/')}</span></div>)}
      </> : null,
    events: <><h3 style={{ margin: '4px 0 10px', fontSize: 15, color: '#93c5fd' }}>오늘 일정 ({list.length})</h3>
      {list.length ? list.map(e => <EvRow key={e.id} e={e} onDel={onDel} />) : <Empty>오늘 일정이 없어요.</Empty>}</>,
    dday: upcomingDd.length > 0 ? <>
        <h3 style={{ margin: '18px 0 10px', fontSize: 15, color: '#fca5a5' }}>다가오는 D-Day</h3>
        {upcomingDd.map(d => (
          <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 8 }}>
            <span style={{ flex: 1 }}>{d.title}</span>
            <b style={{ color: '#f59e0b' }}>{ddayLabel(d.left)}</b>
          </div>
        ))}
      </> : null,
  };
  const DEF_ORDER = ['timers', 'remind', 'brief', 'feedback', 'events', 'dday'];
  const [order, setOrder] = useState(() => { try { const o = JSON.parse(localStorage.getItem('mp_today_order') || 'null'); if (Array.isArray(o)) return o.filter(k => DEF_ORDER.includes(k)).concat(DEF_ORDER.filter(k => !o.includes(k))); } catch {} return DEF_ORDER; });
  const visible = order.filter(k => SEC[k]);
  const reorder = vis => { const next = vis.concat(order.filter(k => !vis.includes(k))); setOrder(next); try { localStorage.setItem('mp_today_order', JSON.stringify(next)); } catch {} };
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
        {lunarText(t)}{holidayName(t) ? ' · ' : ''}<span style={{ color: '#fca5a5' }}>{holidayName(t) || ''}</span>
        <span style={{ float: 'right', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>칸을 1초 누르고 끌면 순서 변경</span>
      </div>
      <HoldSort items={visible} onChange={reorder} render={k => <div style={{ marginBottom: 4 }}>{SEC[k]}</div>} label={k => ({ timers: '⏱ PC 타이머·알람', remind: '🔔 오늘 알림', brief: '☀️ 아침 브리핑', feedback: '💬 확인할 피드백', events: '📅 오늘 일정', dday: '⏳ 다가오는 D-Day' })[k]} />
    </div>
  );
}

// ★공통 규칙(PC와 같음): 1초 누르기 → 끌면 놓일 자리를 점선으로 미리보기 → 놓으면 그 자리로. 짧게 누르면 그냥 누르기.
function HoldSort({ items, render, onChange, label }) {
  // 1초 누르면 '순서 바꾸기 모드': 모든 칸이 제목 한 줄(ROW px)로 작게 접힘 → 손가락을 한 칸 높이만큼만 움직여도 자리 이동.
  // ⚠️ 손가락이 처음 닿은 요소를 DOM에서 빼면 폰이 이후 움직임·떼기 신호를 앱에 안 줌 → 끄는 칸의 원래 내용은 높이 0으로 숨겨 남겨 둠.
  const ROW = 54;
  const [drag, setDrag] = useState(null);
  const refs = React.useRef({}); const box = React.useRef(null); const tm = React.useRef(null); const st = React.useRef(null); const idle = React.useRef(null);
  const itemsRef = React.useRef(items); itemsRef.current = items; const cbRef = React.useRef(onChange); cbRef.current = onChange;
  const pt = e => (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e;
  const finish = (commit) => { const s = st.current; clearTimeout(tm.current); clearTimeout(idle.current); st.current = null; if (s && s.detach) s.detach(); if (s && s.armed) { setDrag(null); if (commit && s.to != null && s.to !== s.i) { const arr = itemsRef.current.slice(); const [x] = arr.splice(s.i, 1); arr.splice(s.to, 0, x); cbRef.current(arr); } } };
  const mv = e => { const s = st.current; if (!s) return; const p = pt(e);
    if (!s.armed) { if (Math.abs(p.clientY - s.sy) + Math.abs(p.clientX - s.sx) > 10) finish(false); return; }
    if (e.cancelable) e.preventDefault(); clearTimeout(idle.current); idle.current = setTimeout(() => finish(false), 6000);
    // 처음 누른 칸의 작은 줄이 손가락 아래에 있다고 보고, 움직인 거리 ÷ 줄 높이 만큼 자리 이동
    const n = itemsRef.current.length; const to = Math.max(0, Math.min(n - 1, s.i + Math.round((p.clientY - s.sy) / ROW))); s.to = to; setDrag(d => d && { ...d, y: p.clientY, to }); };
  const up = () => finish(true);
  const down = k => e => { if (e.button) return; const p = (e.touches && e.touches[0]) || e; finish(false); const el = e.currentTarget;
    const s = { k, sx: p.clientX, sy: p.clientY, armed: false };
    const opt = { passive: false };
    const targets = [document, el];
    targets.forEach(t => { t.addEventListener('touchmove', mv, opt); t.addEventListener('touchend', up); t.addEventListener('touchcancel', up); t.addEventListener('mousemove', mv); t.addEventListener('mouseup', up); });
    s.detach = () => targets.forEach(t => { t.removeEventListener('touchmove', mv, opt); t.removeEventListener('touchend', up); t.removeEventListener('touchcancel', up); t.removeEventListener('mousemove', mv); t.removeEventListener('mouseup', up); });
    st.current = s;
    tm.current = setTimeout(() => { const s2 = st.current; if (!s2 || s2 !== s) return; const its = itemsRef.current; const i = its.indexOf(k); if (i < 0) return finish(false); const r = box.current ? box.current.getBoundingClientRect() : { left: 0, width: window.innerWidth }; try { navigator.vibrate && navigator.vibrate(30); } catch {} Object.assign(s, { armed: true, i, to: i }); idle.current = setTimeout(() => finish(false), 6000); setDrag({ k, i, to: i, y: s.sy, w: r.width, x: r.left }); }, 1000); };
  useEffect(() => () => finish(false), []);
  // 접힌 모드에서 처음 누른 칸의 줄이 손가락 위치에 오도록 목록을 그만큼 내려 줌(위쪽 여백)
  const [pad, setPad] = useState(0);
  React.useLayoutEffect(() => { if (!drag) { setPad(0); return; } if (pad) return; try { const r = box.current.getBoundingClientRect(); const want = drag.y - ROW / 2 - drag.i * ROW; setPad(Math.max(0, want - r.top)); } catch {} }, [!!drag]);
  const lab = k => (label ? label(k) : k);
  const rowSt = { height: ROW - 8, marginBottom: 8, display: 'flex', alignItems: 'center', padding: '0 14px', borderRadius: 12, fontSize: 15, fontWeight: 700, boxSizing: 'border-box' };
  let seq = items.map(k => ({ k }));
  if (drag) { const others = items.filter(k => k !== drag.k).map(k => ({ k })); others.splice(drag.to, 0, { ph: true }); seq = others; seq.splice(Math.min(drag.i, seq.length), 0, { k: drag.k, hidden: true }); }
  return <div ref={box} onContextMenu={e => { if (st.current) e.preventDefault(); }}>
    {drag ? <div style={{ height: pad }} /> : null}
    {/* 같은 key의 같은 div를 계속 쓰므로 끄는 칸(hidden)의 원래 내용은 DOM에서 안 빠지고 숨기기만 됨 → 손가락 신호 유지 */}
    {seq.map(v => v.ph ? <div key="ph" style={{ ...rowSt, border: '2px dashed #fbbf24', background: 'rgba(251,191,36,0.12)' }} />
      : <div key={v.k} ref={el => { refs.current[v.k] = el; }} onTouchStart={drag ? undefined : down(v.k)} onMouseDown={drag ? undefined : down(v.k)} style={v.hidden ? { height: 0, overflow: 'hidden', opacity: 0 } : drag ? { ...rowSt, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#e5e7eb' } : { WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'auto' }}>{v.hidden || !drag ? render(v.k) : lab(v.k)}</div>)}
    {drag ? <div style={{ ...rowSt, position: 'fixed', left: drag.x, top: drag.y - ROW / 2, width: drag.w, pointerEvents: 'none', zIndex: 9999, opacity: 0.95, transform: 'scale(1.03)', boxShadow: '0 12px 30px rgba(0,0,0,0.6)', background: '#1f2937', border: '1px solid #fbbf24', color: '#fde68a', marginBottom: 0, justifyContent: 'space-between' }}><span>{lab(drag.k)}</span><span style={{ fontSize: 12, fontWeight: 400 }}>↕ 놓을 곳에서 손 떼기</span></div> : null}
  </div>;
}

function Month({ cur, setCur, evByDate, memos, pcMemos, feedback, reminders, onDel, onAddDay, onMemo }) {
  const pcByDate = useMemo(() => { const m = {}; (pcMemos || []).forEach(x => { const ds = ymd(new Date(x.createdAt)); (m[ds] = m[ds] || []).push(x); }); (feedback || []).forEach(f => { if (!f || !f.createdAt) return; const ds = ymd(new Date(f.createdAt)); (m[ds] = m[ds] || []).push({ id: 'fb-' + f.id, tab: '피드백', color: '#a78bfa', text: f.content, fb: true, done: f.isDismissed || f.completedAt }); }); return m; }, [pcMemos, feedback]);
  const y = cur.getFullYear(), m = cur.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(first); start.setDate(1 - first.getDay());
  const cells = Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
  const [sel, setSel] = useState(todayStr());
  const selList = evByDate[sel] || [];
  const [memo, setMemoText] = useState((memos && memos[sel]) || '');
  useEffect(() => { setMemoText((memos && memos[sel]) || ''); }, [sel, memos]);
  const selDate = new Date(sel + 'T00:00:00');
  const selWd = WD[selDate.getDay()];
  const selHol = holidayName(sel);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 위: 작은 달력 */}
      <div style={{ flexShrink: 0, padding: '8px 10px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px 8px' }}>
          <button onClick={() => setCur(new Date(y, m - 1, 1))} style={navBtn}>‹</button>
          <b style={{ fontSize: 16 }}>{y}년 {m + 1}월</b>
          <button onClick={() => setCur(new Date(y, m + 1, 1))} style={navBtn}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
          {WD.map((w, i) => <div key={w} style={{ textAlign: 'center', fontSize: 10, color: i === 0 ? '#fca5a5' : i === 6 ? '#93c5fd' : 'rgba(255,255,255,0.4)' }}>{w}</div>)}
          {cells.map((d, i) => {
            const ds = ymd(d), inMonth = d.getMonth() === m, has = (evByDate[ds] || []).length, hasMemo = memos && memos[ds], hasPc = (pcByDate[ds] || []).length, hasRem = (reminders && reminders[ds] || []).some(x => x.kind === 'dday'), isToday = ds === todayStr(), isSel = ds === sel;
            const hol = holidayName(ds), dow = d.getDay();
            const col = !inMonth ? 'rgba(255,255,255,0.22)' : (hol || dow === 0) ? '#fca5a5' : dow === 6 ? '#93c5fd' : '#e5e7eb';
            return (
              <button key={i} onClick={() => setSel(ds)} style={{
                height: 46, border: isSel ? '2px solid #60a5fa' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 7, background: isToday ? 'rgba(96,165,250,0.18)' : 'transparent',
                color: col, fontSize: 13, position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: 0
              }}>
                <span style={{ lineHeight: 1.1 }}>{d.getDate()}</span>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.32)', lineHeight: 1.1 }}>{lunarShort(ds)}</span>
                <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
                  {has ? <span style={{ width: 4, height: 4, borderRadius: 999, background: '#38bdf8' }} /> : null}
                  {hasMemo ? <span style={{ width: 4, height: 4, borderRadius: 999, background: '#fbbf24' }} /> : null}
                  {hasPc ? <span style={{ width: 4, height: 4, borderRadius: 999, background: '#c084fc' }} /> : null}
                  {hasRem ? <span style={{ width: 4, height: 4, borderRadius: 999, background: '#f87171' }} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 아래: 넓은 상세 영역 (선택한 날) */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
          <b style={{ fontSize: 20 }}>{selDate.getMonth() + 1}월 {selDate.getDate()}일</b>
          <span style={{ color: selHol || selDate.getDay() === 0 ? '#fca5a5' : selDate.getDay() === 6 ? '#93c5fd' : 'rgba(255,255,255,0.6)', fontSize: 14 }}>{selWd}요일</span>
        </div>
        {selHol ? <div style={{ fontSize: 12, color: '#fca5a5', marginBottom: 10 }}>{selHol}</div> : <div style={{ height: 4 }} />}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: selList.length ? 6 : 0 }}>
          <span style={{ fontSize: 13, color: '#93c5fd', fontWeight: 700 }}>일정{selList.length ? ' (' + selList.length + ')' : ''}</span>
          <button onClick={() => onAddDay(sel)} style={{ background: 'rgba(59,130,246,0.25)', border: '1px solid rgba(96,165,250,0.5)', color: '#bfdbfe', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>＋ 이 날 일정</button>
        </div>
        {selList.length ? selList.map(e => <EvRow key={e.id} e={e} onDel={onDel} />) : null}
        {(reminders && reminders[sel] || []).filter(x => x.kind !== 'feedback').map((x, i) => <div key={'r' + i} style={{ fontSize: 13, color: '#fde68a', padding: '6px 10px', background: 'rgba(245,158,11,0.10)', borderRadius: 8, marginBottom: 6 }}>{x.icon} {x.text}</div>)}
        {(pcByDate[sel] || []).length ? <>
          <div style={{ fontSize: 13, color: '#c4b5fd', fontWeight: 700, margin: '10px 0 6px' }}>PC에서 쓴 메모 ({pcByDate[sel].length})</div>
          {pcByDate[sel].map(x => <details key={x.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 6, padding: '8px 12px', borderLeft: '3px solid ' + (x.color && x.color[0] === '#' ? x.color : '#a78bfa'), opacity: x.done ? 0.55 : 1 }}>
            <summary style={{ fontSize: 14, cursor: 'pointer', listStyle: 'none' }}><span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.7)', marginRight: 6 }}>{x.fb ? '💬 피드백' : '📝 ' + x.tab}</span>{String(x.text || '').split('\n')[0].slice(0, 60) || '(빈 메모)'}</summary>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: 'rgba(255,255,255,0.88)', marginTop: 6, lineHeight: 1.55 }}>{String(x.text || '').split('\n').slice(1).join('\n')}</div>
          </details>)}
        </> : null}

        <div style={{ fontSize: 13, color: '#fbbf24', fontWeight: 700, margin: '10px 0 6px' }}>메모</div>
        <textarea value={memo} onChange={e => setMemoText(e.target.value)} onBlur={() => onMemo(sel, memo)}
          placeholder="이 날의 메모… (자동 저장·동기화)"
          style={{ width: '100%', minHeight: 120, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontSize: 14, padding: 12, resize: 'none', outline: 'none', lineHeight: 1.6 }} />
      </div>
    </div>
  );
}

function AddEvent({ initialDate, onAdd, onImport }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(initialDate || todayStr());
  const [color, setColor] = useState('blue');
  const [alarm, setAlarm] = useState(false);
  const [time, setTime] = useState('09:00');
  const [imp, setImp] = useState('');
  return (
    <div style={{ padding: 16 }}>
      <h3 style={{ marginTop: 4, fontSize: 16 }}>일정 추가</h3>
      <label style={lbl}>내용</label>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 3시 거래처 미팅" style={inp} />
      <label style={lbl}>날짜</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inp} />
      <label style={lbl}>색상</label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {Object.keys(COLORS).map(k => (
          <button key={k} onClick={() => setColor(k)} style={{ width: 30, height: 30, borderRadius: 999, background: COLORS[k], border: color === k ? '3px solid #fff' : '2px solid transparent', cursor: 'pointer' }} />
        ))}
      </div>
      <label style={{ ...lbl, display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={alarm} onChange={e => setAlarm(e.target.checked)} /> 알림 받기
      </label>
      {alarm && <input type="time" value={time} onChange={e => setTime(e.target.value)} style={inp} />}
      <button disabled={!title.trim()} onClick={() => onAdd({ title: title.trim(), date, color }, alarm ? time : null)} style={{ ...bigBtn, opacity: title.trim() ? 1 : 0.4 }}>＋ 추가하기</button>

      <div style={{ marginTop: 26, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14 }}>
        <label style={lbl}>PC 백업 붙여넣기 (임시 동기화)</label>
        <textarea value={imp} onChange={e => setImp(e.target.value)} placeholder="PC 버전 '백업 저장'의 JSON을 붙여넣으면 일정을 가져옵니다" rows={3} style={{ ...inp, resize: 'none' }} />
        <button onClick={() => { onImport(imp); setImp(''); }} style={{ ...bigBtn, background: 'rgba(255,255,255,0.1)' }}>가져오기</button>
      </div>
    </div>
  );
}

function Dday({ ddays, onAdd, onDel }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(todayStr());
  const [kind, setKind] = useState('once'); // 새로 만들 D-Day의 반복 방식: once | yearly | lunar | monthly | hundred
  const [filter, setFilter] = useState('all'); // 목록 보기 종류(탭)
  const [adding, setAdding] = useState(false);
  const kindOf = d => d.countUp ? 'hundred' : d.isLunar ? 'lunar' : d.type === 'repeat' ? 'monthly' : (d.type === 'anniversary' && d.isYearly !== false) ? 'yearly' : 'once';
  const list = ddays.map(d => ({ d, info: ddayInfo(d), kindTxt: ddayKindText(d), k: kindOf(d) }))
    .sort((a, b) => a.info.left - b.info.left);
  const shown = filter === 'all' ? list : list.filter(x => x.k === filter);
  const KINDS = [['once', '한 번'], ['yearly', '매년'], ['lunar', '매년 음력'], ['monthly', '매월'], ['hundred', '100일 단위']];
  const add = () => {
    if (!title.trim()) return;
    const base = { title: title.trim(), date };
    if (kind === 'yearly') onAdd({ ...base, type: 'anniversary', isYearly: true });
    else if (kind === 'lunar') onAdd({ ...base, type: 'anniversary', isYearly: true, isLunar: true });
    else if (kind === 'hundred') onAdd({ ...base, type: 'anniversary', isYearly: false, countUp: true });
    else if (kind === 'monthly') onAdd({ ...base, type: 'repeat', repeatUnit: 'monthly' });
    else onAdd({ ...base, type: 'anniversary', isYearly: false });
    setTitle(''); setAdding(false); setFilter('all');
  };
  const tabBtn = (on) => ({ flexShrink: 0, padding: '6px 11px', borderRadius: 999, border: '1px solid ' + (on ? '#60a5fa' : 'rgba(255,255,255,0.2)'), background: on ? 'rgba(59,130,246,0.3)' : 'transparent', color: '#fff', fontSize: 13 });
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 16, flex: 1 }}>D-Day <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{list.length}개</span></h3>
        <button onClick={() => setAdding(v => !v)} style={{ background: adding ? 'rgba(255,255,255,0.12)' : '#3b82f6', border: 'none', color: '#fff', borderRadius: 999, padding: '7px 14px', fontSize: 14, fontWeight: 700 }}>{adding ? '닫기' : '＋ 추가'}</button>
      </div>
      {adding ? <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(96,165,250,0.35)', borderRadius: 12, padding: 12, marginBottom: 14 }}>
        <input autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="이름 (예: 시험 / 엄마 생신 / 보험료)" style={{ ...inp }} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...inp }} />
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 6 }}>반복 방식</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          {KINDS.map(k => <button key={k[0]} onClick={() => setKind(k[0])} style={{ flex: '1 0 28%', padding: '8px 0', borderRadius: 8, border: '1px solid ' + (kind === k[0] ? '#60a5fa' : 'rgba(255,255,255,0.15)'), background: kind === k[0] ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 13 }}>{k[1]}</button>)}
        </div>
        <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginBottom: 10, lineHeight: 1.5 }}>{kind === 'lunar' ? '🌙 위 날짜를 음력 생일로 보고, 해마다 양력 날짜로 바꿔서 알려드려요. (예: 음력 3월 5일 → 날짜칸에 그 해-03-05)' : kind === 'hundred' ? '💯 만난 날·출생일을 넣으면 100일·200일·…·1000일을 자동으로 세요. (시작일 = 1일째)' : kind === 'monthly' ? '💳 매월 같은 날 (카드값·보험료 등)' : kind === 'yearly' ? '🎂 매년 같은 양력 날짜' : '📌 한 번만 (시험·마감 등)'} · 7일·3일·1일 전과 당일에 알려드려요.</div>
        {kind === 'lunar' && date ? (() => { try { const r = ddayInfo({ date, type: 'anniversary', isYearly: true, isLunar: true }); return <div style={{ fontSize: 13, color: '#c7d2fe', marginBottom: 10 }}>🌙 음력 {Number(date.slice(5, 7))}월 {Number(date.slice(8, 10))}일 → 다가오는 날: 양력 {r.next ? r.next.replace(/-0?/g, '.').replace(/^(\d+)\./, '$1.') : '-'} ({ddayLabel(r.left)})</div>; } catch { return null; } })() : null}
        <button disabled={!title.trim()} onClick={add} style={{ ...bigBtn, marginBottom: 0, opacity: title.trim() ? 1 : 0.4 }}>{title.trim() ? '＋ D-Day 저장' : '이름을 먼저 입력하세요'}</button>
      </div> : null}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 12, paddingBottom: 2 }}>
        {[['all', '전체']].concat(KINDS).map(k => { const n = k[0] === 'all' ? list.length : list.filter(x => x.k === k[0]).length; return <button key={k[0]} onClick={() => setFilter(k[0])} style={tabBtn(filter === k[0])}>{k[1]} {n}</button>; })}
      </div>
      {shown.length ? shown.map(({ d, info, kindTxt }) => {
        const past = info.left < 0;
        return (
          <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.title}</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '1px 6px', flexShrink: 0 }}>{kindTxt}</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                {d.isLunar ? '음 ' + Number(String(d.date).slice(5, 7)) + '.' + Number(String(d.date).slice(8, 10)) + (info.next ? ' (양 ' + Number(info.next.slice(5, 7)) + '.' + Number(info.next.slice(8, 10)) + ')' : '') : (info.next && info.next !== d.date ? '다음 ' + info.next.slice(5).replace('-', '.') : d.date)}
                {info.nthLabel && /[0-9]/.test(info.nthLabel) ? ' · ' + info.nthLabel : ''}{info.milestone ? ' · ' + info.milestone + '일까지' : ''}
              </div>
            </div>
            {info.nthLabel && /[0-9]/.test(info.nthLabel) ? <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#e5e7eb', lineHeight: 1 }}>{info.nth}</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{info.nthLabel.replace(/[0-9]+/, '')}</div>
            </div> : null}
            <b style={{ color: past ? 'rgba(255,255,255,0.35)' : '#f59e0b', fontSize: 16, flexShrink: 0, minWidth: 56, textAlign: 'right' }}>{ddayLabel(info.left)}</b>
            <button onClick={() => onDel(d.id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 16, flexShrink: 0 }}>✕</button>
          </div>
        );
      }) : <Empty>{filter === 'all' ? '등록된 D-Day가 없어요. 위 ＋ 추가를 눌러 만들어 보세요.' : '이 종류의 D-Day가 없어요.'}</Empty>}
    </div>
  );
}

function shareGrid(sel, evByDate) {
  const dates = Array.from(sel).sort();
  const cols = dates.map(ds => {
    const d = new Date(ds + 'T00:00:00');
    const label = (d.getMonth() + 1) + '월 ' + d.getDate() + '일(' + WD[d.getDay()] + ')';
    const events = (evByDate[ds] || []).map(e => (e.title || '').replace(/\t/g, ' ').replace(/\r?\n/g, ' '));
    return { ds, label, events };
  });
  const maxEv = Math.max(0, ...cols.map(c => c.events.length));
  return { cols, maxEv };
}
// 날짜를 위에서 아래로 이어서 (빠른 날짜부터) — 읽기 좋은 세로 텍스트
function gridToText(cols) {
  return cols.map(c => [c.label, ...c.events.map(t => '• ' + t)].join('\n')).join('\n\n');
}
// 엑셀/시트용 CSV (날짜=열, 일정=행) — 파일로 내보내기
function csvCell(s) { s = String(s == null ? '' : s); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function gridToCsv(cols, maxEv) {
  const lines = [cols.map(c => csvCell(c.label)).join(',')];
  for (let i = 0; i < maxEv; i++) lines.push(cols.map(c => csvCell(c.events[i] || '')).join(','));
  return '﻿' + lines.join('\r\n'); // BOM: 엑셀에서 한글 안 깨지게
}
async function shareCsv(csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  try {
    const file = new File([blob], 'momentplan.csv', { type: 'text/csv' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file] }); return '공유창을 열었어요 (엑셀·시트로 열기)'; }
  } catch (e) { if (e && e.name === 'AbortError') return ''; }
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'momentplan.csv'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  return 'CSV 파일로 저장됨 (엑셀·시트로 열기)';
}
// 캔버스 글자 줄바꿈 (한글/영문 모두, 글씨 크기 유지)
function wrapLines(g, text, maxW) {
  const chars = Array.from(String(text)); let line = ''; const out = [];
  for (const ch of chars) {
    const test = line + ch;
    if (g.measureText(test).width > maxW && line) { out.push(line); line = ch; }
    else line = test;
  }
  if (line) out.push(line);
  return out.length ? out : [''];
}
async function shareText(text) {
  try { if (navigator.share) { await navigator.share({ text }); return '공유창을 열었어요'; } } catch (e) { if (e && e.name === 'AbortError') return ''; }
  try { await navigator.clipboard.writeText(text); return '복사됐어요! 엑셀·메모에 붙여넣기 하세요.'; } catch { window.prompt('아래 내용을 복사하세요 (엑셀 붙여넣기용)', text); return ''; }
}
// 날짜를 위→아래로 이어붙인 세로 이미지 (긴 일정은 자동 줄바꿈)
function buildImageBlob(cols) {
  const S = 2, W = 400, pad = 14, headH = 30, lineH = 23, evGap = 3, dayGap = 12, titleH = 30;
  const evFont = '15px sans-serif', headFont = 'bold 15px sans-serif';
  const tmp = document.createElement('canvas').getContext('2d');
  tmp.font = evFont;
  const contentW = W - pad * 2 - 12; // 불릿 들여쓰기 감안
  // 미리 줄 계산해서 전체 높이 산출
  const blocks = cols.map(c => ({
    label: c.label,
    evs: c.events.map(t => wrapLines(tmp, t, contentW))
  }));
  let H = pad + titleH;
  blocks.forEach(b => {
    H += headH + 4;
    if (b.evs.length) b.evs.forEach(ls => { H += ls.length * lineH + evGap; });
    else H += lineH;
    H += dayGap;
  });
  H += 18;
  const cv = document.createElement('canvas'); cv.width = W * S; cv.height = H * S;
  const g = cv.getContext('2d'); g.scale(S, S);
  g.fillStyle = '#0f172a'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#e2e8f0'; g.font = 'bold 16px sans-serif';
  g.fillText('📅 일정 공유', pad, pad + 16);
  let y = pad + titleH;
  blocks.forEach(b => {
    g.fillStyle = 'rgba(96,165,250,0.20)'; g.fillRect(pad, y, W - pad * 2, headH);
    g.fillStyle = '#bfdbfe'; g.font = headFont;
    g.fillText(b.label, pad + 8, y + headH / 2 + 5);
    y += headH + 4;
    g.font = evFont;
    if (b.evs.length) {
      b.evs.forEach(ls => {
        ls.forEach((ln, li) => {
          g.fillStyle = '#e2e8f0';
          g.fillText(li === 0 ? '• ' + ln : '   ' + ln, pad + 6, y + 16);
          y += lineH;
        });
        y += evGap;
      });
    } else { g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillText('일정 없음', pad + 6, y + 16); y += lineH; }
    y += dayGap;
  });
  g.fillStyle = 'rgba(255,255,255,0.3)'; g.font = '11px sans-serif';
  g.fillText('MomentPlan', W - pad - 74, H - 8);
  return new Promise(res => cv.toBlob(b => res(b), 'image/png'));
}
async function shareImage(blob) {
  try {
    const file = new File([blob], 'momentplan.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file] }); return '공유창을 열었어요'; }
  } catch (e) { if (e && e.name === 'AbortError') return ''; }
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'momentplan.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  return '이미지를 저장했어요';
}

function SharePanel({ evByDate, onClose }) {
  const [cur, setCur] = useState(new Date());
  const [sel, setSel] = useState(() => new Set());
  const [msg, setMsg] = useState('');
  const y = cur.getFullYear(), m = cur.getMonth();
  const first = new Date(y, m, 1); const start = new Date(first); start.setDate(1 - first.getDay());
  const cells = Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
  const toggle = ds => setSel(s => { const n = new Set(s); n.has(ds) ? n.delete(ds) : n.add(ds); return n; });
  const { cols, maxEv } = shareGrid(sel, evByDate);
  const text = gridToText(cols);
  const doText = async () => { if (!cols.length) return; setMsg(await shareText(text) || ''); setTimeout(() => setMsg(''), 2500); };
  const doImage = async () => { if (!cols.length) return; setMsg('이미지 만드는 중…'); const b = await buildImageBlob(cols); setMsg(await shareImage(b) || ''); setTimeout(() => setMsg(''), 2500); };
  const doExcel = async () => { if (!cols.length) return; setMsg('CSV 만드는 중…'); setMsg(await shareCsv(gridToCsv(cols, maxEv)) || ''); setTimeout(() => setMsg(''), 3000); };
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0b0e16', zIndex: 90, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', paddingTop: 'max(12px, env(safe-area-inset-top))', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <b style={{ flex: 1, fontSize: 16 }}>📤 일정 공유</b>
        <span style={{ fontSize: 12, color: '#86efac' }}>{sel.size}일 선택{msg ? ' · ' + msg : ''}</span>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 20 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>공유할 날짜를 여러 개 탭하세요.</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px 8px' }}>
          <button onClick={() => setCur(new Date(y, m - 1, 1))} style={navBtn}>‹</button>
          <b style={{ fontSize: 16 }}>{y}년 {m + 1}월</b>
          <button onClick={() => setCur(new Date(y, m + 1, 1))} style={navBtn}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
          {WD.map((w, i) => <div key={w} style={{ textAlign: 'center', fontSize: 10, color: i === 0 ? '#fca5a5' : i === 6 ? '#93c5fd' : 'rgba(255,255,255,0.4)' }}>{w}</div>)}
          {cells.map((d, i) => {
            const ds = ymd(d), inMonth = d.getMonth() === m, has = (evByDate[ds] || []).length, isSel = sel.has(ds);
            return (
              <button key={i} onClick={() => toggle(ds)} style={{
                height: 40, border: isSel ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.08)', borderRadius: 7,
                background: isSel ? 'rgba(34,197,94,0.22)' : 'transparent', color: inMonth ? '#e5e7eb' : 'rgba(255,255,255,0.22)',
                fontSize: 13, position: 'relative', cursor: 'pointer'
              }}>
                {d.getDate()}
                {isSel ? <span style={{ position: 'absolute', top: 1, right: 3, fontSize: 10, color: '#86efac' }}>✓</span> : null}
                {has ? <span style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: 999, background: '#38bdf8' }} /> : null}
              </button>
            );
          })}
        </div>
        {cols.length > 0 && (
          <div style={{ marginTop: 14, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, overflow: 'hidden' }}>
            {cols.map(c => (
              <div key={c.ds} style={{ padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 12 }}>
                <div style={{ color: '#93c5fd', marginBottom: 2 }}>{c.label}</div>
                {c.events.length ? c.events.map((t, i) => <div key={i} style={{ color: 'rgba(255,255,255,0.85)', paddingLeft: 6 }}>• {t}</div>) : <div style={{ color: 'rgba(255,255,255,0.3)', paddingLeft: 6 }}>—</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, padding: 12, paddingBottom: 'max(12px, env(safe-area-inset-bottom))', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button disabled={!sel.size} onClick={doImage} style={{ ...shBtn, background: '#3b82f6', opacity: sel.size ? 1 : 0.4 }}>🖼 이미지</button>
        <button disabled={!sel.size} onClick={doText} style={{ ...shBtn, background: '#22c55e', color: '#04220f', opacity: sel.size ? 1 : 0.4 }}>📝 텍스트</button>
        <button disabled={!sel.size} onClick={doExcel} style={{ ...shBtn, background: '#059669', opacity: sel.size ? 1 : 0.4 }}>📊 엑셀</button>
      </div>
    </div>
  );
}

function Ledger({ events, user, onLogin }) {
  const [cur, setCur] = useState(new Date());
  const y = cur.getFullYear(), m = cur.getMonth();
  const ym = `${y}-${pad(m + 1)}`;
  const rows = useMemo(() =>
    events.filter(e => typeof e.amount === 'number' && (e.date || '').startsWith(ym))
      .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)),
    [events, ym]);
  const income = rows.filter(e => e.amount >= 0).reduce((s, e) => s + e.amount, 0);
  const expense = rows.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0);
  const net = income - expense;
  const byDate = {};
  rows.forEach(e => { (byDate[e.date] = byDate[e.date] || []).push(e); });
  const dates = Object.keys(byDate).sort();
  const won = n => n.toLocaleString();
  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <button onClick={() => setCur(new Date(y, m - 1, 1))} style={navBtn}>‹</button>
        <b style={{ fontSize: 16 }}>{y}년 {m + 1}월</b>
        <button onClick={() => setCur(new Date(y, m + 1, 1))} style={navBtn}>›</button>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1, borderRadius: 10, padding: '8px 10px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(96,165,250,0.3)' }}>
          <div style={{ fontSize: 10, color: 'rgba(147,197,253,0.8)', marginBottom: 2 }}>입금 합계</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#bfdbfe' }}>+{won(income)}<span style={{ fontSize: 10, opacity: .6, marginLeft: 1 }}>원</span></div>
        </div>
        <div style={{ flex: 1, borderRadius: 10, padding: '8px 10px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(248,113,113,0.3)' }}>
          <div style={{ fontSize: 10, color: 'rgba(252,165,165,0.8)', marginBottom: 2 }}>출금 합계</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fecaca' }}>-{won(expense)}<span style={{ fontSize: 10, opacity: .6, marginLeft: 1 }}>원</span></div>
        </div>
        <div style={{ flex: 1, borderRadius: 10, padding: '8px 10px', background: net >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.12)', border: '1px solid ' + (net >= 0 ? 'rgba(52,211,153,0.3)' : 'rgba(251,113,133,0.3)') }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>순수지</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: net >= 0 ? '#a7f3d0' : '#fda4af' }}>{net >= 0 ? '+' : '-'}{won(Math.abs(net))}<span style={{ fontSize: 10, opacity: .6, marginLeft: 1 }}>원</span></div>
        </div>
      </div>
      {dates.length ? dates.map(ds => {
        const d = new Date(ds + 'T00:00:00');
        return (
          <div key={ds} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 700, marginBottom: 5 }}>{d.getMonth() + 1}월 {d.getDate()}일 ({WD[d.getDay()]})</div>
            {byDate[ds].map(e => {
              const inc = e.amount >= 0;
              return (
                <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 6 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title || (inc ? '입금' : '출금')}</div>
                    {(e.account || e.category) ? <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{[e.category, e.account].filter(Boolean).join(' · ')}</div> : null}
                  </div>
                  <b style={{ color: inc ? '#93c5fd' : '#fca5a5', fontSize: 14, flexShrink: 0 }}>{inc ? '+' : '-'}{won(Math.abs(e.amount))}</b>
                </div>
              );
            })}
          </div>
        );
      }) : (() => { const all = events.filter(e => typeof e.amount === 'number' && e.date); const months = [...new Set(all.map(e => e.date.slice(0, 7)))].sort(); const near = months.filter(x => x < ym).pop() || months.find(x => x > ym);
        return <div style={{ textAlign: 'center', padding: '18px 8px', color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.6 }}>
          {!user ? <>로그인하면 PC 가계부 내역이 보여요.<br /><button onClick={onLogin} style={{ ...bigBtn, marginTop: 10 }}>☁ 로그인</button></>
            : all.length ? <>{m + 1}월에는 가계부 내역이 없어요. (전체 {all.length}건)<br />{near ? <button onClick={() => { const [yy, mm] = near.split('-').map(Number); setCur(new Date(yy, mm - 1, 1)); }} style={{ marginTop: 8, background: '#3b82f6', border: 'none', color: '#fff', borderRadius: 999, padding: '7px 14px', fontSize: 13 }}>가장 가까운 달 보기 ({Number(near.slice(5))}월)</button> : null}</>
            : <>PC에서 가계부를 입력하면 여기에 보여요.</>}
        </div>; })()}
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 8 }}>※ 조회 전용 — 입력·수정은 PC 앱에서 하세요.</div>
    </div>
  );
}

function AuthPanel({ onClose, onAuthed }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState(() => { try { return localStorage.getItem('mp_email') || ''; } catch { return ''; } });
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const go = async () => {
    if (!email.trim() || !pw) { setErr('이메일과 비밀번호를 입력하세요.'); return; }
    setBusy(true); setErr('');
    try {
      const fn = mode === 'login' ? signIn : signUp;
      const { data, error } = await fn(email, pw);
      if (error) { setErr(error.message || '실패'); setBusy(false); return; }
      // 실제 로그인 세션이 생겼는지 서버에 확인 (가짜 성공 방지)
      const u = await currentUser();
      if (!u) {
        if (mode === 'signup') setErr('이미 가입된 이메일 같아요. "로그인"으로 바꿔서 PC와 같은 비밀번호로 시도하세요. (또는 가입 확인 메일을 확인하세요)');
        else setErr('로그인 실패 — 이메일/비밀번호를 확인하세요. (PC 앱과 완전히 같아야 합니다)');
        setBusy(false); return;
      }
      try { localStorage.setItem('mp_email', email.trim()); } catch {}
      await onAuthed(u);
    } catch (e) { setErr(String(e && e.message || e)); }
    setBusy(false);
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 360, background: '#0f1420', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <b style={{ fontSize: 16 }}>☁ 클라우드 {mode === 'login' ? '로그인' : '회원가입'}</b>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 18 }}>✕</button>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>PC 앱과 <b>같은 이메일·비밀번호</b>로 로그인하면 일정이 폰에도 뜹니다. 한 번 로그인하면 <b>다음부터 자동 로그인</b>돼요.</div>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일" autoCapitalize="none" style={inp} />
        <input value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호" type="password" style={inp} />
        {err && <div style={{ color: '#fca5a5', fontSize: 12, marginBottom: 8 }}>{err}</div>}
        <button disabled={busy} onClick={go} style={{ ...bigBtn, opacity: busy ? 0.5 : 1 }}>{busy ? '처리 중…' : (mode === 'login' ? '로그인' : '회원가입')}</button>
        <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErr(''); }} style={{ width: '100%', marginTop: 8, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 12, textDecoration: 'underline' }}>
          {mode === 'login' ? '계정이 없나요? 회원가입' : '이미 계정이 있나요? 로그인'}
        </button>
      </div>
    </div>
  );
}

const Empty = ({ children }) => <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '30px 0', fontSize: 14 }}>{children}</div>;
const lbl = { display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '10px 0 4px' };
const inp = { width: '100%', padding: '11px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 15, marginBottom: 12, outline: 'none' };
const bigBtn = { width: '100%', padding: 13, borderRadius: 12, border: 'none', background: '#3b82f6', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 6 };
const navBtn = { width: 40, height: 40, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 20, cursor: 'pointer' };
const shBtn = { flex: 1, padding: 13, borderRadius: 12, border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' };

// ===== 아침 브리핑 카드 (지수·환율·뉴스 제목) =====
function BriefCard() {
  const [cfg, setCfg] = useState(loadBriefCfg());
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [edit, setEdit] = useState(false);
  const native = isNativeApp();
  const load = async (c) => { setBusy(true); try { setData(await fetchBrief(c || cfg)); } catch { setData({ idx: [], fx: null, news: [], errs: ['전체'] }); } setBusy(false); };
  const [bst, setBst] = useState(null);
  // 뉴스 분야를 카드 안에서 바로 바꿔 보기 (알림에 넣을 분야는 🔔 표시로 따로 켜고 끔)
  const [cat, setCat] = useState(() => { try { return localStorage.getItem('mp_brief_view') || newsCatsOf(loadBriefCfg())[0] || '경제'; } catch { return '경제'; } });
  const [ncache, setNcache] = useState({}); const [nbusy, setNbusy] = useState(false);
  useEffect(() => { if (data && data.news) setNcache(c => { const n = { ...c }; data.news.forEach(g => { n[g.cat] = g.list; }); return n; }); }, [data]);
  const pickCat = async (c, force) => { setCat(c); try { localStorage.setItem('mp_brief_view', c); } catch {} if (ncache[c] && !force) return; setNbusy(true); try { const l = await fetchNews(c, cfg.newsN || 10); setNcache(x => ({ ...x, [c]: l })); } catch { setNcache(x => ({ ...x, [c]: null })); } setNbusy(false); };
  const allCats = NEWS_ALL.concat(String(cfg.keywords || '').split(/[,，]/).map(x => x.trim()).filter(Boolean).map(x => '#' + x));
  const inNoti = c => c[0] === '#' ? true : (cfg.newsCats || []).includes(c);
  const togNoti = c => { if (c[0] === '#') return; upd({ news: undefined, newsCats: inNoti(c) ? cfg.newsCats.filter(y => y !== c) : (cfg.newsCats || []).concat([c]) }); };
  useEffect(() => { pushBriefCfg(cfg); if (cfg.on) load(cfg); briefStatus().then(setBst).catch(() => {}); }, []);
  useEffect(() => { if (data && !(cat in ncache) && !(data.news || []).some(g => g.cat === cat)) pickCat(cat); }, [data]);
  const upd = o => { const c = { ...cfg, ...o }; setCfg(c); saveBriefCfg(c); };
  const tog = (k, v) => upd({ [k]: cfg[k].includes(v) ? cfg[k].filter(x => x !== v) : cfg[k].concat([v]) });
  const chip = (on, label, fn) => <button key={label} onClick={fn} style={{ padding: '4px 9px', borderRadius: 999, fontSize: 12, border: '1px solid ' + (on ? '#60a5fa' : 'rgba(255,255,255,0.25)'), background: on ? 'rgba(59,130,246,0.25)' : 'transparent', color: on ? '#dbeafe' : 'rgba(255,255,255,0.8)' }}>{label}</button>;
  return (
    <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.35)', borderRadius: 12, padding: '10px 12px', marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <b style={{ flex: 1, fontSize: 14, color: '#7dd3fc' }}>☀️ 아침 브리핑 {cfg.on ? <span onClick={() => setEdit(true)} title="눌러서 시간 바꾸기" style={{ fontSize: 11.5, color: '#e0f2fe', fontWeight: 600, marginLeft: 4, padding: '1px 7px', borderRadius: 999, border: '1px solid rgba(125,211,252,0.6)', cursor: 'pointer' }}>⏰ 매일 {cfg.time}{native ? ' 알림' : ''}</span> : <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>(꺼짐)</span>}</b>
        <button onClick={() => load()} disabled={busy} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: '#e5e7eb', borderRadius: 8, padding: '2px 8px', fontSize: 11 }}>{busy ? '…' : '↻'}</button>
        <button onClick={() => setEdit(v => !v)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: '#e5e7eb', borderRadius: 8, padding: '2px 8px', fontSize: 11 }}>⚙ 설정</button>
      </div>
      {native && cfg.on ? <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginBottom: 6 }}>{bst && !bst.err ? ('백그라운드 확인: ' + (bst.lastCheckin ? new Date(bst.lastCheckin).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '아직 없음') + (bst.sent ? ' · 마지막 발송 ' + bst.sent.slice(5).replace('-', '/') : '') + (bst.hasCfg ? '' : ' · ⚠️ 설정 미전달')) : '백그라운드 상태 확인 불가' + (bst && bst.err ? ' (' + bst.err + ')' : '')} · 안 울리면 폰 설정 → 앱 → MomentPlan → 배터리 "제한 없음"</div> : null}
      {edit ? <div style={{ fontSize: 12, color: '#e5e7eb', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={cfg.on} onChange={e => upd({ on: e.target.checked })} /> 매일 알림 받기 · 시간 <input type="time" value={cfg.time} onChange={e => e.target.value && upd({ time: e.target.value })} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 6, padding: '2px 6px' }} /></label>
        <div><div style={{ marginBottom: 4, color: 'rgba(255,255,255,0.85)' }}>주가지수</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{IDX_ALL.map(x => chip(cfg.idx.includes(x), x, () => tog('idx', x)))}</div></div>
        <div><div style={{ marginBottom: 4, color: 'rgba(255,255,255,0.85)' }}>환율 (원)</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{FX_ALL.map(x => chip(cfg.fx.includes(x), FX_SYM[x] + ' ' + x, () => tog('fx', x)))}</div></div>
        <div><div style={{ marginBottom: 4, color: 'rgba(255,255,255,0.85)' }}>뉴스 분야 (여러 개 선택 가능)</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{NEWS_ALL.map(x => chip((cfg.newsCats || []).includes(x), x, () => upd({ news: undefined, newsCats: (cfg.newsCats || []).includes(x) ? cfg.newsCats.filter(y => y !== x) : (cfg.newsCats || []).concat([x]) })))}</div></div>
        <div><div style={{ marginBottom: 4, color: 'rgba(255,255,255,0.85)' }}>관심 키워드 (쉼표로 구분 — 그 단어가 들어간 기사만)</div><input value={cfg.keywords || ''} onChange={e => upd({ keywords: e.target.value })} placeholder="예: 판금, 인벤터, 반도체" style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: 6, padding: '5px 8px', fontSize: 13 }} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: 'rgba(255,255,255,0.85)' }}>분야별 기사 수</span>{[5, 10, 20, 30].map(n => chip((cfg.newsN || 10) === n, n + '개', () => upd({ newsN: n })))}</div>
        <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{native ? '휴대폰이 15분마다 확인해서, 정한 시간이 지나면 한 번 알려줘요 (최대 30분 정도 늦을 수 있어요). 미국 증시는 한국시간 새벽 5~6시에 마감해서 6시 반이면 전날 밤 결과가 들어와요.' : '웹으로 쓰는 중이라 알림은 안 가고, 여기서 환율만 볼 수 있어요. 설치형 앱에서는 지수·뉴스까지 알림으로 와요.'} 지수는 지연된 값(보통 전날 종가)이며 참고용입니다.</div>
      </div> : null}
      {data ? <div style={{ fontSize: 13, color: '#f1f5f9', lineHeight: 1.6 }}>
        {data.idx.length ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px' }}>{data.idx.map(x => <span key={x.name}>{x.name} <b>{fmtN(x.p)}</b> <span style={{ color: x.ch == null ? '#cbd5e1' : x.ch >= 0 ? '#f87171' : '#60a5fa' }}>{x.ch == null ? '' : (x.ch >= 0 ? '▲' : '▼') + Math.abs(x.ch).toFixed(2) + '%'}</span></span>)}</div> : null}
        {data.fx ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px', marginTop: 4 }}>{data.fx.list.map(x => <span key={x.c}>{FX_SYM[x.c]} <b>{fmtN(x.v)}</b>원</span>)}</div> : null}
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', margin: '8px 0 6px', paddingBottom: 2 }}>{allCats.map(c => <button key={c} onClick={() => pickCat(c)} style={{ flexShrink: 0, padding: '5px 10px', borderRadius: 999, fontSize: 12.5, border: '1px solid ' + (cat === c ? '#38bdf8' : 'rgba(255,255,255,0.25)'), background: cat === c ? 'rgba(56,189,248,0.3)' : 'transparent', color: '#fff', fontWeight: cat === c ? 700 : 400 }}>{c.replace(/^#/, '🔎 ')}{inNoti(c) ? ' 🔔' : ''}</button>)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, marginBottom: 2 }}><b style={{ flex: 1, color: '#7dd3fc' }}>📰 {cat.replace(/^#/, '🔎 ')}</b>{cat[0] !== '#' ? <button onClick={() => togNoti(cat)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 999, padding: '2px 8px', fontSize: 11 }}>{inNoti(cat) ? '🔔 아침 알림에 포함됨' : '🔕 아침 알림에 넣기'}</button> : null}<button onClick={() => pickCat(cat, true)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 8, padding: '2px 7px', fontSize: 11 }}>{nbusy ? '…' : '↻'}</button></div>
        {nbusy && !ncache[cat] ? <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>불러오는 중…</div> : ncache[cat] ? <ol style={{ margin: '4px 0 0', paddingLeft: 20 }}>{ncache[cat].map((n, i) => <li key={i} style={{ marginBottom: 3 }}><a href={n.u} onClick={e => { e.preventDefault(); openInApp(n.u); }} rel="noreferrer" style={{ color: '#e2e8f0', textDecoration: 'none' }}>{n.t}</a></li>)}</ol> : ncache[cat] === null ? <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{native ? '뉴스를 못 가져왔어요 (인터넷 확인 후 ↻)' : '뉴스는 설치형 앱에서 보여요.'}</div> : <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>위에서 분야를 누르면 바로 보여요.</div>}
        {data.errs.length ? <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{native ? '가져오지 못함: ' + data.errs.join(', ') + ' (인터넷 확인)' : (data.errs.filter(e => e !== '환율').length ? '지수·뉴스는 설치형 앱에서 보여요.' : '')}</div> : null}
      </div> : <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{busy ? '불러오는 중…' : '↻ 를 누르면 오늘 자료를 가져와요.'}</div>}
    </div>
  );
}

// 앱 업데이트 안내 띠: ① 새 화면 받아 둠 → 지금 적용 / 다음에 열 때 자동 ② 폰 기능 바뀐 새 앱 → 업데이트(설치 한 번)
function UpdateBanner() {
  const [st, setSt] = useState(null); const [pct, setPct] = useState(null); const [err, setErr] = useState(''); const [hide, setHide] = useState(false);
  useEffect(() => {
    if (!isNative()) return; noteApplied();
    let busy = false; const run = async (manual) => { if (busy) return; busy = true; try { const r = await checkUpdate(); if (r && r.kind !== 'none') { setSt(r); setHide(false); } else if (manual === true) { setSt({ kind: 'latest' }); setHide(false); setTimeout(() => setHide(true), 2500); } } catch (e) { if (manual === true) { setSt({ kind: 'err', msg: String((e && e.message) || e) }); setHide(false); } } busy = false; };
    const mc = () => run(true); window.addEventListener('mp-check-update', mc);
    const t = setTimeout(run, 2500); const v = () => { if (document.visibilityState === 'visible') run(); };
    document.addEventListener('visibilitychange', v); const iv = setInterval(run, 3 * 3600e3);
    return () => { clearTimeout(t); clearInterval(iv); document.removeEventListener('visibilitychange', v); window.removeEventListener('mp-check-update', mc); };
  }, []);
  if (!st || hide) return null;
  if (st.kind === 'latest' || st.kind === 'err') return <div style={{ padding: '8px 14px', fontSize: 13, background: st.kind === 'err' ? 'rgba(239,68,68,0.18)' : 'rgba(34,197,94,0.16)', color: '#f1f5f9' }}>{st.kind === 'err' ? '업데이트 확인 실패: ' + st.msg : '✓ 최신 버전이에요 (v' + WEB_VERSION + ')'}</div>;
  const box = { display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', background: st.kind === 'apk' ? 'rgba(59,130,246,0.18)' : 'rgba(34,197,94,0.16)', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: '#f1f5f9' };
  const btn = (bg) => ({ background: bg, border: 'none', color: '#fff', borderRadius: 999, padding: '6px 12px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' });
  if (st.kind === 'web-ready') return (
    <div style={box}><span style={{ flex: 1 }}>✨ 새 화면(v{st.latest.version})을 받아 뒀어요. 다음에 열 때 자동 적용돼요.</span>
      <button style={btn('#16a34a')} onClick={() => applyWebNow(st.id)}>지금 적용</button>
      <button style={{ ...btn('transparent'), color: 'rgba(255,255,255,0.85)' }} onClick={() => setHide(true)}>✕</button></div>);
  return (
    <div style={{ ...box, flexWrap: 'wrap' }}><span style={{ flex: 1, minWidth: 180 }}>📲 새 앱 버전 v{st.apkVer} — 폰 기능이 바뀌어서 한 번 설치가 필요해요.{pct != null ? ' 받는 중 ' + pct + '%' : ''}</span>
      <button style={btn('#3b82f6')} disabled={pct != null && pct < 100} onClick={async () => { setErr(''); setPct(0); try { await installApk(st.latest.apkUrl, setPct); setPct(null); } catch (e) { setPct(null); setErr('설치 화면을 못 열었어요. 처음 한 번은 "이 출처 허용"(MomentPlan)을 켜 주세요. (' + ((e && e.message) || e) + ')'); } }}>{pct != null ? '받는 중…' : '업데이트'}</button>
      <button style={{ ...btn('transparent'), color: 'rgba(255,255,255,0.85)' }} onClick={() => setHide(true)}>나중에</button>
      {err ? <div style={{ width: '100%', fontSize: 12, color: '#fecaca' }}>{err}</div> : null}</div>);
}

// 뉴스·링크를 앱 안에서 열기: 설치형 앱은 앱 위에 겹쳐 뜨는 브라우저 창(크롬 맞춤 탭) → 닫기(✕)/뒤로가기 하면 바로 앱으로 돌아옴
async function openInApp(url) {
  try { if (isNative()) { await Browser.open({ url, toolbarColor: '#111827', presentationStyle: 'popover' }); return; } } catch {}
  try { window.open(url, '_blank', 'noopener'); } catch {}
}
