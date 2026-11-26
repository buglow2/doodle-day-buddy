import React, { useState, useMemo, useEffect } from 'react';
import { loadEvents, loadDdays, addEvent, deleteEvent, addDday, deleteDday, importFromPcBackup, getAll, setAll, loadMemos, setMemo, loadFeedback, loadPcMemos, COLORS } from './data.js';
import { buildReminders, scheduleReminders, webNotifyToday, askWebPermission, isNativeApp } from './remind.js';
import { scheduleEventAlarm } from './notify.js';
import { currentUser, signIn, signUp, signOut, pull, push, subscribe } from './sync.js';
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
  const [cur, setCur] = useState(new Date());
  const [addDate, setAddDate] = useState(todayStr());
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');
  const refresh = () => { setEvents(loadEvents()); setDdays(loadDdays()); setMemos(loadMemos()); setFeedback(loadFeedback()); setPcMemos(loadPcMemos()); };
  const reminders = useMemo(() => buildReminders(ddays, events, feedback, 30), [ddays, events, feedback]);
  useEffect(() => { const t = setTimeout(() => { scheduleReminders(reminders); webNotifyToday(reminders[todayStr()] || []); }, 800); return () => clearTimeout(t); }, [reminders]);

  // 로그인돼 있으면 클라우드에서 내려받아 합치기 + 실시간 구독
  useEffect(() => {
    let unsub = () => {};
    (async () => {
      const u = await currentUser();
      setUser(u);
      if (u) {
        const cloud = await pull();
        if (cloud) { setAll(cloud); refresh(); }
        unsub = subscribe(d => { setAll(d); refresh(); });
      }
    })();
    return () => { try { unsub(); } catch {} };
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
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{todayStr()} ({WD[new Date().getDay()]}){syncMsg ? ' · ' + syncMsg : ''}</div>
        </div>
        <button onClick={() => setShowShare(true)} title="일정 공유" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#e5e7eb', borderRadius: 999, padding: '6px 11px', fontSize: 12, cursor: 'pointer' }}>📤 공유</button>
        <button onClick={() => user ? onSignOut() : setShowAuth(true)} style={{
          background: user ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)', border: '1px solid ' + (user ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.2)'),
          color: user ? '#86efac' : '#e5e7eb', borderRadius: 999, padding: '6px 12px', fontSize: 12, cursor: 'pointer'
        }}>{user ? '☁' : '☁ 로그인'}</button>
      </header>
      {showAuth && <AuthPanel onClose={() => setShowAuth(false)} onAuthed={onAuthed} />}
      {showShare && <SharePanel evByDate={evByDate} onClose={() => setShowShare(false)} />}

      <main style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {tab === 'today' && <Today evByDate={evByDate} ddays={ddays} reminders={reminders} feedback={feedback} onDel={id => { deleteEvent(id); refresh(); pushCloud(); }} />}
        {tab === 'month' && <Month cur={cur} setCur={setCur} evByDate={evByDate} memos={memos} pcMemos={pcMemos} feedback={feedback} reminders={reminders}
          onDel={id => { deleteEvent(id); refresh(); pushCloud(); }}
          onAddDay={ds => { setAddDate(ds); setTab('add'); }}
          onMemo={(ds, txt) => { setMemo(ds, txt); setMemos(loadMemos()); pushCloud(); }} />}
        {tab === 'add' && <AddEvent initialDate={addDate} onAdd={(ev, time) => { const it = addEvent(ev); if (time) scheduleEventAlarm(it, time); refresh(); pushCloud(); setTab('month'); }} onImport={txt => { if (importFromPcBackup(txt)) { refresh(); pushCloud(); } }} />}
        {tab === 'dday' && <Dday ddays={ddays} onAdd={dd => { addDday(dd); refresh(); pushCloud(); }} onDel={id => { deleteDday(id); refresh(); pushCloud(); }} />}
        {tab === 'ledger' && <Ledger events={events} />}
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

function Today({ evByDate, ddays, reminders, feedback, onDel }) {
  const t = todayStr();
  const list = evByDate[t] || [];
  const todayRem = (reminders && reminders[t]) || [];
  const soon = Object.keys(reminders || {}).filter(ds => ds > t).sort().slice(0, 7).flatMap(ds => reminders[ds].filter(x => x.kind !== 'feedback').map(x => ({ ...x, ds })));
  const openFb = (feedback || []).filter(f => f && !f.isDismissed && !f.completedAt);
  const [perm, setPerm] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'unsupported');
  const upcomingDd = ddays.map(d => ({ ...d, left: ddayInfo(d).left })).filter(d => d.left >= 0).sort((a, b) => a.left - b.left).slice(0, 5);
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
        {lunarText(t)}{holidayName(t) ? ' · ' : ''}<span style={{ color: '#fca5a5' }}>{holidayName(t) || ''}</span>
      </div>
      <div style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.40)', borderRadius: 12, padding: '10px 12px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <b style={{ flex: 1, fontSize: 14, color: '#fcd34d' }}>🔔 오늘 알림 {todayRem.length ? '(' + todayRem.length + ')' : ''}</b>
          {!isNativeApp() && perm !== 'granted' && perm !== 'unsupported' ? <button onClick={async () => setPerm(await askWebPermission())} style={{ background: 'rgba(245,158,11,0.25)', border: '1px solid rgba(245,158,11,0.6)', color: '#fde68a', borderRadius: 8, padding: '3px 8px', fontSize: 11 }}>알림 허용</button> : null}
        </div>
        {todayRem.length ? todayRem.map((x, i) => <div key={i} style={{ fontSize: 14, color: '#fef3c7', padding: '3px 0', lineHeight: 1.45 }}>{x.icon} {x.text}</div>) : <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>오늘은 챙길 알림이 없어요.</div>}
        {soon.length ? <div style={{ marginTop: 8, borderTop: '1px solid rgba(245,158,11,0.25)', paddingTop: 6 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginBottom: 3 }}>다가오는 알림</div>
          {soon.slice(0, 6).map((x, i) => <div key={i} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.88)', padding: '2px 0' }}><span style={{ color: '#fcd34d', marginRight: 6 }}>{x.ds.slice(5).replace('-', '/')}</span>{x.icon} {x.text}</div>)}
        </div> : null}
        <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{isNativeApp() ? '매일 아침 9시에 폰 알림으로도 알려드려요.' : '웹으로 쓰는 중: 앱을 열 때 알려드려요. (앱 설치형은 꺼져 있어도 알림)'}</div>
      </div>
      {openFb.length ? <>
        <h3 style={{ margin: '4px 0 8px', fontSize: 15, color: '#c4b5fd' }}>💬 확인할 피드백 ({openFb.length})</h3>
        {openFb.slice(0, 8).map(f => <div key={f.id} style={{ display: 'flex', gap: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 6, fontSize: 14 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: f.color && f.color[0] === '#' ? f.color : '#a78bfa', marginTop: 6, flexShrink: 0 }} /><span style={{ flex: 1, whiteSpace: 'pre-wrap' }}>{f.content}</span><span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>{String(f.createdAt || '').slice(5, 10).replace('-', '/')}</span></div>)}
      </> : null}
      <h3 style={{ margin: '4px 0 10px', fontSize: 15, color: '#93c5fd' }}>오늘 일정 ({list.length})</h3>
      {list.length ? list.map(e => <EvRow key={e.id} e={e} onDel={onDel} />) : <Empty>오늘 일정이 없어요.</Empty>}
      {upcomingDd.length > 0 && <>
        <h3 style={{ margin: '18px 0 10px', fontSize: 15, color: '#fca5a5' }}>다가오는 D-Day</h3>
        {upcomingDd.map(d => (
          <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 8 }}>
            <span style={{ flex: 1 }}>{d.title}</span>
            <b style={{ color: '#f59e0b' }}>{ddayLabel(d.left)}</b>
          </div>
        ))}
      </>}
    </div>
  );
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
  const [kind, setKind] = useState('once'); // once | yearly | lunar | monthly | hundred
  const list = ddays.map(d => ({ d, info: ddayInfo(d), kindTxt: ddayKindText(d) }))
    .sort((a, b) => a.info.left - b.info.left);
  const add = () => {
    if (!title.trim()) return;
    const base = { title: title.trim(), date };
    if (kind === 'yearly') onAdd({ ...base, type: 'anniversary', isYearly: true });
    else if (kind === 'lunar') onAdd({ ...base, type: 'anniversary', isYearly: true, isLunar: true });
    else if (kind === 'hundred') onAdd({ ...base, type: 'anniversary', isYearly: false, countUp: true });
    else if (kind === 'monthly') onAdd({ ...base, type: 'repeat', repeatUnit: 'monthly' });
    else onAdd({ ...base, type: 'anniversary', isYearly: false });
    setTitle('');
  };
  return (
    <div style={{ padding: 16 }}>
      <h3 style={{ marginTop: 4, fontSize: 16 }}>D-Day</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 시험 / 엄마 생신 / 보험료" style={{ ...inp }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...inp, marginBottom: 0, flex: 1 }} />
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {[['once', '한 번'], ['yearly', '매년'], ['lunar', '매년 음력'], ['monthly', '매월'], ['hundred', '100일 단위']].map(k => (
          <button key={k[0]} onClick={() => setKind(k[0])} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: '1px solid ' + (kind === k[0] ? '#60a5fa' : 'rgba(255,255,255,0.15)'), background: kind === k[0] ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 12, cursor: 'pointer' }}>{k[1]}</button>
        ))}
      </div>
      <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginBottom: 10, lineHeight: 1.5 }}>{kind === 'lunar' ? '🌙 위 날짜를 음력 생일로 보고, 해마다 양력 날짜로 바꿔서 알려드려요. (예: 음력 3월 5일 → 날짜칸에 그 해-03-05)' : kind === 'hundred' ? '💯 만난 날·출생일을 넣으면 100일·200일·…·1000일을 자동으로 세요. (시작일 = 1일째)' : kind === 'monthly' ? '💳 매월 같은 날 (카드값·보험료 등)' : kind === 'yearly' ? '🎂 매년 같은 양력 날짜' : '📌 한 번만 (시험·마감 등)'} · 7일·3일·1일 전과 당일에 알려드려요.</div>
      <button disabled={!title.trim()} onClick={add} style={{ ...bigBtn, marginBottom: 16, opacity: title.trim() ? 1 : 0.4 }}>＋ D-Day 추가</button>
      {list.length ? list.map(({ d, info, kindTxt }) => {
        const past = info.left < 0;
        return (
          <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.title}</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '1px 6px', flexShrink: 0 }}>{kindTxt}</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                {info.next && info.next !== d.date ? '다음 ' + info.next.slice(5).replace('-', '.') : d.date}
                {info.nthLabel && /[0-9]/.test(info.nthLabel) ? ' · ' + info.nthLabel : ''}{info.milestone ? ' · ' + info.milestone + '일까지' : ''}{d.isLunar ? ' · 음력 ' + Number(String(d.date).slice(5, 7)) + '.' + Number(String(d.date).slice(8, 10)) : ''}
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
      }) : <Empty>등록된 D-Day가 없어요.</Empty>}
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

function Ledger({ events }) {
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
      }) : <Empty>이 달의 가계부 내역이 없어요.</Empty>}
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
