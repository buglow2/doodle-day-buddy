import React, { useState, useMemo, useEffect } from 'react';
import { loadEvents, loadDdays, addEvent, deleteEvent, addDday, deleteDday, importFromPcBackup, getAll, setAll, loadMemos, setMemo, COLORS } from './data.js';
import { scheduleEventAlarm } from './notify.js';
import { currentUser, signIn, signUp, signOut, pull, push, subscribe } from './sync.js';
import { lunarText, holidayName } from './kcal.js';

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
  const [cur, setCur] = useState(new Date());
  const [addDate, setAddDate] = useState(todayStr());
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');
  const refresh = () => { setEvents(loadEvents()); setDdays(loadDdays()); setMemos(loadMemos()); };

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
        <button onClick={() => user ? onSignOut() : setShowAuth(true)} style={{
          background: user ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)', border: '1px solid ' + (user ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.2)'),
          color: user ? '#86efac' : '#e5e7eb', borderRadius: 999, padding: '6px 12px', fontSize: 12, cursor: 'pointer'
        }}>{user ? '☁ 연결됨' : '☁ 로그인'}</button>
      </header>
      {showAuth && <AuthPanel onClose={() => setShowAuth(false)} onAuthed={onAuthed} />}

      <main style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {tab === 'today' && <Today evByDate={evByDate} ddays={ddays} onDel={id => { deleteEvent(id); refresh(); pushCloud(); }} />}
        {tab === 'month' && <Month cur={cur} setCur={setCur} evByDate={evByDate} memos={memos}
          onDel={id => { deleteEvent(id); refresh(); pushCloud(); }}
          onAddDay={ds => { setAddDate(ds); setTab('add'); }}
          onMemo={(ds, txt) => { setMemo(ds, txt); setMemos(loadMemos()); pushCloud(); }} />}
        {tab === 'add' && <AddEvent initialDate={addDate} onAdd={(ev, time) => { const it = addEvent(ev); if (time) scheduleEventAlarm(it, time); refresh(); pushCloud(); setTab('month'); }} onImport={txt => { if (importFromPcBackup(txt)) { refresh(); pushCloud(); } }} />}
        {tab === 'dday' && <Dday ddays={ddays} onAdd={dd => { addDday(dd); refresh(); pushCloud(); }} onDel={id => { deleteDday(id); refresh(); pushCloud(); }} />}
      </main>

      <nav style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#111827', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {[['today', '오늘', '📌'], ['month', '달력', '🗓'], ['add', '추가', '➕'], ['dday', 'D-Day', '⏳']].map(t => (
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

function Today({ evByDate, ddays, onDel }) {
  const t = todayStr();
  const list = evByDate[t] || [];
  const upcomingDd = ddays.map(d => ({ ...d, left: daysBetween(d.date, t) })).filter(d => d.left >= 0).sort((a, b) => a.left - b.left).slice(0, 5);
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
        {lunarText(t)}{holidayName(t) ? ' · ' : ''}<span style={{ color: '#fca5a5' }}>{holidayName(t) || ''}</span>
      </div>
      <h3 style={{ margin: '4px 0 10px', fontSize: 15, color: '#93c5fd' }}>오늘 일정 ({list.length})</h3>
      {list.length ? list.map(e => <EvRow key={e.id} e={e} onDel={onDel} />) : <Empty>오늘 일정이 없어요.</Empty>}
      {upcomingDd.length > 0 && <>
        <h3 style={{ margin: '18px 0 10px', fontSize: 15, color: '#fca5a5' }}>다가오는 D-Day</h3>
        {upcomingDd.map(d => (
          <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 8 }}>
            <span style={{ flex: 1 }}>{d.title}</span>
            <b style={{ color: '#f59e0b' }}>{d.left === 0 ? 'D-DAY' : 'D-' + d.left}</b>
          </div>
        ))}
      </>}
    </div>
  );
}

function Month({ cur, setCur, evByDate, memos, onDel, onAddDay, onMemo }) {
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
            const ds = ymd(d), inMonth = d.getMonth() === m, has = (evByDate[ds] || []).length, hasMemo = memos && memos[ds], isToday = ds === todayStr(), isSel = ds === sel;
            const hol = holidayName(ds), dow = d.getDay();
            const col = !inMonth ? 'rgba(255,255,255,0.22)' : (hol || dow === 0) ? '#fca5a5' : dow === 6 ? '#93c5fd' : '#e5e7eb';
            return (
              <button key={i} onClick={() => setSel(ds)} style={{
                height: 38, border: isSel ? '2px solid #60a5fa' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 7, background: isToday ? 'rgba(96,165,250,0.18)' : 'transparent',
                color: col, fontSize: 13, position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0
              }}>
                {d.getDate()}
                <span style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
                  {has ? <span style={{ width: 4, height: 4, borderRadius: 999, background: '#38bdf8' }} /> : null}
                  {hasMemo ? <span style={{ width: 4, height: 4, borderRadius: 999, background: '#fbbf24' }} /> : null}
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
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>
          {lunarText(sel)}{selHol ? ' · ' : ''}<span style={{ color: '#fca5a5' }}>{selHol || ''}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: '#93c5fd', fontWeight: 700 }}>일정 ({selList.length})</span>
          <button onClick={() => onAddDay(sel)} style={{ background: 'rgba(59,130,246,0.25)', border: '1px solid rgba(96,165,250,0.5)', color: '#bfdbfe', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>＋ 이 날 일정</button>
        </div>
        {selList.length ? selList.map(e => <EvRow key={e.id} e={e} onDel={onDel} />) : <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, padding: '8px 0 14px' }}>일정 없음</div>}

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
  const t = todayStr();
  const list = ddays.map(d => ({ ...d, left: daysBetween(d.date, t) })).sort((a, b) => a.left - b.left);
  return (
    <div style={{ padding: 16 }}>
      <h3 style={{ marginTop: 4, fontSize: 16 }}>D-Day</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 시험" style={{ ...inp, marginBottom: 0, flex: 1 }} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...inp, marginBottom: 0, width: 140 }} />
      </div>
      <button disabled={!title.trim()} onClick={() => { onAdd({ title: title.trim(), date }); setTitle(''); }} style={{ ...bigBtn, marginBottom: 16, opacity: title.trim() ? 1 : 0.4 }}>＋ D-Day 추가</button>
      {list.length ? list.map(d => (
        <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15 }}>{d.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{d.date}</div>
          </div>
          <b style={{ color: d.left < 0 ? 'rgba(255,255,255,0.35)' : '#f59e0b', fontSize: 16 }}>{d.left === 0 ? 'D-DAY' : d.left > 0 ? 'D-' + d.left : 'D+' + (-d.left)}</b>
          <button onClick={() => onDel(d.id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 16 }}>✕</button>
        </div>
      )) : <Empty>등록된 D-Day가 없어요.</Empty>}
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
