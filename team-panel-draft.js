// ═══════════════════════════════════════════════════════════════
//  MomentPlan — 팀 달력 패널 (프론트엔드 초안 / 다음 세션에 app.js 통합 예정)
//  통합 방법(다음 세션):
//   1) 이 함수 정의를 app.js 의 함수 정의 구역(예: function ddbAutoLoginOn() 앞)에 삽입
//   2) 앱 루트 렌더의 모달 마운트 구역(o.jsx(ST,{open:f,...}) 옆)에 o.jsx(DDBTeamModal,{}) 추가
//   3) 상단 메뉴 배열에 항목 추가:
//        { k:"team", icon:o.jsx(am,{size:14}), label:" "+DDBTR("팀 달력"),
//          title:DDBTR("회사·팀원과 일정을 공유합니다"),
//          act:()=>window.dispatchEvent(new CustomEvent("ddb-team-open")) }
//   4) 아래 DDBTR("...") 로 감싼 새 문구들을 6개 언어 사전(DDB_I18N)에 추가
//   5) team-sharing-setup.sql 을 Supabase SQL Editor 에서 먼저 실행
//  별칭 참고: O=React, o=jsx런타임, Rr=createPortal, $a()=Supabase클라이언트,
//            pw()=useAuth(user 포함), vt()=useAppContext(state,dispatch), DDBTR()=번역
// ═══════════════════════════════════════════════════════════════
function DDBTeamModal() {
    const [open, setOpen] = O.useState(!1);
    const { user } = pw();
    const { state: appState, dispatch: appDispatch } = vt();
    const [view, setView] = O.useState("list");
    const [teams, setTeams] = O.useState([]);
    const [sel, setSel] = O.useState(null);
    const [members, setMembers] = O.useState([]);
    const [tevents, setTevents] = O.useState([]);
    const [busy, setBusy] = O.useState(!1);
    const [err, setErr] = O.useState("");
    const [nm, setNm] = O.useState("");
    const [code, setCode] = O.useState("");
    const [evDate, setEvDate] = O.useState("");
    const [evTitle, setEvTitle] = O.useState("");
    const chanRef = O.useRef(null);
    const boxRef = O.useRef(null);

    O.useEffect(() => {
        const h = () => { setOpen(!0), setErr(""), setView("list"), refreshTeams(); };
        return window.addEventListener("ddb-team-open", h), () => window.removeEventListener("ddb-team-open", h);
    }, []);

    function cli() { return $a(); }
    async function refreshTeams() {
        const c = cli(); if (!c || !user) return;
        setBusy(!0);
        try { const { data } = await c.rpc("my_teams"); setTeams(Array.isArray(data) ? data : JSON.parse(data || "[]")); }
        catch (e) { setErr(String(e && e.message || e)); }
        finally { setBusy(!1); }
    }
    function rpcErrMsg(k) {
        const m = { NO_LICENSE: DDBTR("팀을 만들려면 라이선스가 필요합니다."), INVALID_CODE: DDBTR("참여 코드가 올바르지 않습니다."), NOT_OWNER: DDBTR("소유자만 할 수 있습니다."), OWNER_MUST_DELETE: DDBTR("소유자는 팀을 삭제해야 나갈 수 있습니다."), EMPTY_NAME: DDBTR("팀 이름을 입력하세요.") };
        return m[k] || k;
    }
    async function doCreate() {
        const c = cli(); if (!c) return;
        setBusy(!0); setErr("");
        try {
            const { data } = await c.rpc("create_team", { p_name: nm.trim() });
            const r = typeof data === "string" ? JSON.parse(data) : data;
            if (!r || !r.ok) { setErr(rpcErrMsg(r && r.error)); return; }
            setNm(""); await refreshTeams(); openTeam({ team_id: r.team_id, name: r.name, code: r.code, role: "editor", is_owner: !0, member_count: 1 });
        } catch (e) { setErr(String(e && e.message || e)); } finally { setBusy(!1); }
    }
    async function doJoin() {
        const c = cli(); if (!c) return;
        setBusy(!0); setErr("");
        try {
            const { data } = await c.rpc("join_team", { p_code: code.trim() });
            const r = typeof data === "string" ? JSON.parse(data) : data;
            if (!r || !r.ok) { setErr(rpcErrMsg(r && r.error)); return; }
            setCode(""); await refreshTeams();
            const t = { team_id: r.team_id, name: r.name, role: r.role || "editor", is_owner: !1 };
            openTeam(t);
        } catch (e) { setErr(String(e && e.message || e)); } finally { setBusy(!1); }
    }
    async function openTeam(t) {
        setSel(t); setView("team"); setErr("");
        await loadMembers(t); await loadEvents(t); subscribe(t);
    }
    async function loadMembers(t) {
        const c = cli(); if (!c) return;
        try { const { data } = await c.rpc("team_member_list", { p_team: t.team_id }); setMembers(Array.isArray(data) ? data : JSON.parse(data || "[]")); } catch { }
    }
    async function loadEvents(t) {
        const c = cli(); if (!c) return;
        try { const { data } = await c.from("team_events").select("id,data,created_by").eq("team_id", t.team_id); setTevents((data || []).map(r => ({ id: r.id, ...r.data }))); } catch { }
    }
    function subscribe(t) {
        const c = cli(); if (!c) return;
        if (chanRef.current) { try { c.removeChannel(chanRef.current); } catch { } chanRef.current = null; }
        try {
            const ch = c.channel("teamev-" + t.team_id).on("postgres_changes", { event: "*", schema: "public", table: "team_events", filter: "team_id=eq." + t.team_id }, () => loadEvents(t)).subscribe();
            chanRef.current = ch;
        } catch { }
    }
    O.useEffect(() => () => { const c = cli(); if (c && chanRef.current) try { c.removeChannel(chanRef.current); } catch { } }, []);

    const canEdit = sel && sel.role === "editor";
    async function addEvent() {
        const c = cli(); if (!c || !sel || !canEdit) return;
        if (!evDate || !evTitle.trim()) { setErr(DDBTR("날짜와 제목을 입력하세요.")); return; }
        setErr("");
        const data = { title: evTitle.trim(), date: evDate, color: "teal", isAllDay: !0 };
        try { await c.from("team_events").insert({ team_id: sel.team_id, data, created_by: user.id }); setEvTitle(""); await loadEvents(sel); } catch (e) { setErr(String(e && e.message || e)); }
    }
    async function delEvent(id) {
        const c = cli(); if (!c || !canEdit) return;
        try { await c.from("team_events").delete().eq("id", id); await loadEvents(sel); } catch (e) { setErr(String(e && e.message || e)); }
    }
    async function copyToMine(ev) {
        appDispatch({ type: "ADD_EVENT", event: { id: "ev-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), title: ev.title, date: ev.date, endDate: ev.endDate, color: "blue", isAllDay: !0, memo: ev.memo } });
        setErr(DDBTR("내 달력에 복사했습니다."));
    }
    async function changeRole(uid, role) {
        const c = cli(); if (!c || !sel) return;
        try { await c.rpc("set_member_role", { p_team: sel.team_id, p_user: uid, p_role: role }); await loadMembers(sel); } catch (e) { setErr(String(e && e.message || e)); }
    }
    async function kick(uid) {
        const c = cli(); if (!c || !sel) return;
        if (!confirm(DDBTR("이 멤버를 내보낼까요?"))) return;
        try { await c.rpc("remove_member", { p_team: sel.team_id, p_user: uid }); await loadMembers(sel); } catch (e) { setErr(String(e && e.message || e)); }
    }
    async function leave() {
        const c = cli(); if (!c || !sel) return;
        if (!confirm(DDBTR("이 팀에서 나갈까요?"))) return;
        try { const { data } = await c.rpc("remove_member", { p_team: sel.team_id, p_user: user.id }); const r = typeof data === "string" ? JSON.parse(data) : data; if (r && !r.ok) { setErr(rpcErrMsg(r.error)); return; } setSel(null); setView("list"); await refreshTeams(); } catch (e) { setErr(String(e && e.message || e)); }
    }
    async function regen() {
        const c = cli(); if (!c || !sel) return;
        try { const { data } = await c.rpc("regenerate_join_code", { p_team: sel.team_id }); const r = typeof data === "string" ? JSON.parse(data) : data; if (r && r.ok) setSel({ ...sel, code: r.code }); } catch { }
    }
    async function removeTeam() {
        const c = cli(); if (!c || !sel) return;
        if (!confirm(DDBTR("팀을 삭제하면 모든 팀 일정이 사라집니다. 삭제할까요?"))) return;
        try { await c.rpc("delete_team", { p_team: sel.team_id }); setSel(null); setView("list"); await refreshTeams(); } catch (e) { setErr(String(e && e.message || e)); }
    }
    function copyCode() { try { navigator.clipboard.writeText(sel.code); setErr(DDBTR("코드를 복사했습니다.")); } catch { } }

    if (!open) return null;
    const inputCls = "w-full px-2 py-1.5 rounded bg-white/10 border border-white/20 text-white text-sm outline-none";
    const btnP = "px-3 py-1.5 rounded text-sm font-medium cursor-pointer border-none";

    function header(title) {
        return o.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-white/10", children: [
            o.jsx("span", { className: "text-white/90 text-sm font-semibold", children: title }),
            o.jsx("button", { className: "text-white/50 hover:text-white text-lg leading-none cursor-pointer bg-transparent border-none", onClick: () => setOpen(!1), children: "✕" })
        ] });
    }

    let body;
    if (!$a()) body = o.jsx("div", { className: "p-4 text-white/70 text-sm", children: DDBTR("클라우드가 설정되지 않았습니다.") });
    else if (!user) body = o.jsx("div", { className: "p-4 text-white/70 text-sm leading-relaxed", children: DDBTR("팀 공유는 로그인이 필요합니다. 먼저 상단의 동기화 버튼에서 로그인하세요.") });
    else if (view === "list") body = o.jsxs("div", { className: "p-4 flex flex-col gap-4", children: [
        o.jsxs("div", { children: [
            o.jsx("div", { className: "text-white/60 text-xs mb-2", children: DDBTR("내 팀") }),
            teams.length === 0 ? o.jsx("div", { className: "text-white/40 text-sm py-2", children: DDBTR("아직 팀이 없습니다.") })
            : o.jsx("div", { className: "flex flex-col gap-1.5", children: teams.map(t => o.jsxs("button", { className: "flex items-center justify-between px-3 py-2 rounded bg-white/6 hover:bg-white/12 text-left cursor-pointer border-none w-full", onClick: () => openTeam(t), children: [
                o.jsxs("span", { className: "text-white text-sm", children: ["👥 ", t.name] }),
                o.jsxs("span", { className: "text-white/40 text-xs", children: [t.is_owner ? DDBTR("소유자") : t.role === "editor" ? DDBTR("편집자") : DDBTR("뷰어"), " · ", t.member_count, DDBTR("명")] })
            ] }, t.team_id)) })
        ] }),
        o.jsxs("div", { className: "flex flex-col gap-2 border-t border-white/10 pt-3", children: [
            o.jsx("div", { className: "text-white/60 text-xs", children: DDBTR("팀 만들기") }),
            o.jsxs("div", { className: "flex gap-2", children: [
                o.jsx("input", { className: inputCls, placeholder: DDBTR("팀 이름 (예: 마케팅팀)"), value: nm, onChange: e => setNm(e.target.value) }),
                o.jsx("button", { className: btnP + " bg-blue-500 text-white whitespace-nowrap", disabled: busy, onClick: doCreate, children: DDBTR("만들기") })
            ] })
        ] }),
        o.jsxs("div", { className: "flex flex-col gap-2 border-t border-white/10 pt-3", children: [
            o.jsx("div", { className: "text-white/60 text-xs", children: DDBTR("코드로 참여") }),
            o.jsxs("div", { className: "flex gap-2", children: [
                o.jsx("input", { className: inputCls + " uppercase tracking-widest", placeholder: DDBTR("참여 코드 6자리"), value: code, onChange: e => setCode(e.target.value.toUpperCase()), maxLength: 8 }),
                o.jsx("button", { className: btnP + " bg-green-600 text-white whitespace-nowrap", disabled: busy, onClick: doJoin, children: DDBTR("참여") })
            ] })
        ] }),
        err && o.jsx("div", { className: "text-amber-300 text-xs", children: err })
    ] });
    else body = o.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
        o.jsxs("button", { className: "text-white/50 text-xs self-start cursor-pointer bg-transparent border-none", onClick: () => { setView("list"); setSel(null); refreshTeams(); }, children: ["← ", DDBTR("팀 목록")] }),
        o.jsxs("div", { className: "flex items-center justify-between", children: [
            o.jsxs("span", { className: "text-white font-semibold", children: ["👥 ", sel.name] }),
            o.jsx("span", { className: "text-white/40 text-xs", children: sel.is_owner ? DDBTR("소유자") : sel.role === "editor" ? DDBTR("편집자") : DDBTR("뷰어") })
        ] }),
        o.jsxs("div", { className: "flex items-center gap-2 bg-white/6 rounded px-3 py-2", children: [
            o.jsx("span", { className: "text-white/50 text-xs", children: DDBTR("참여 코드") }),
            o.jsx("span", { className: "text-white font-mono tracking-widest text-sm", children: sel.code || "······" }),
            o.jsx("button", { className: "text-blue-300 text-xs cursor-pointer bg-transparent border-none ml-auto", onClick: copyCode, children: DDBTR("복사") }),
            sel.is_owner && o.jsx("button", { className: "text-white/40 text-xs cursor-pointer bg-transparent border-none", onClick: regen, children: DDBTR("재발급") })
        ] }),
        o.jsxs("div", { children: [
            o.jsx("div", { className: "text-white/60 text-xs mb-1.5", children: DDBTR("멤버") }),
            o.jsx("div", { className: "flex flex-col gap-1", children: members.map(m => o.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                o.jsx("span", { className: "text-white/85 truncate flex-1", children: (m.email || "?") + (m.is_me ? " (" + DDBTR("나") + ")" : "") }),
                m.is_owner ? o.jsx("span", { className: "text-amber-300/80 text-xs", children: DDBTR("소유자") })
                : sel.is_owner ? o.jsxs(o.Fragment, { children: [
                    o.jsxs("select", { className: "bg-white/10 text-white text-xs rounded px-1 py-0.5 border border-white/20", value: m.role, onChange: e => changeRole(m.user_id, e.target.value), children: [
                        o.jsx("option", { value: "editor", children: DDBTR("편집자") }),
                        o.jsx("option", { value: "viewer", children: DDBTR("뷰어") })
                    ] }),
                    o.jsx("button", { className: "text-red-400 text-xs cursor-pointer bg-transparent border-none", onClick: () => kick(m.user_id), children: DDBTR("내보내기") })
                ] })
                : o.jsx("span", { className: "text-white/40 text-xs", children: m.role === "editor" ? DDBTR("편집자") : DDBTR("뷰어") })
            ] }, m.user_id)) })
        ] }),
        o.jsxs("div", { className: "border-t border-white/10 pt-3", children: [
            o.jsxs("div", { className: "text-white/60 text-xs mb-1.5", children: ["📅 ", DDBTR("팀 일정")] }),
            canEdit && o.jsxs("div", { className: "flex gap-1.5 mb-2", children: [
                o.jsx("input", { type: "date", className: inputCls + " flex-none w-36", value: evDate, onChange: e => setEvDate(e.target.value) }),
                o.jsx("input", { className: inputCls, placeholder: DDBTR("일정 제목"), value: evTitle, onChange: e => setEvTitle(e.target.value), onKeyDown: e => e.key === "Enter" && addEvent() }),
                o.jsx("button", { className: btnP + " bg-teal-600 text-white whitespace-nowrap", onClick: addEvent, children: DDBTR("추가") })
            ] }),
            o.jsx("div", { className: "flex flex-col gap-1 max-h-52 overflow-y-auto", children: tevents.length === 0 ? o.jsx("div", { className: "text-white/40 text-sm py-1", children: DDBTR("팀 일정이 없습니다.") })
                : tevents.slice().sort((a, b) => (a.date || "").localeCompare(b.date || "")).map(ev => o.jsxs("div", { className: "flex items-center gap-2 text-sm bg-white/5 rounded px-2 py-1", children: [
                    o.jsx("span", { className: "text-white/45 text-xs font-mono", children: ev.date }),
                    o.jsx("span", { className: "text-white/90 flex-1 truncate", children: ev.title }),
                    o.jsx("button", { className: "text-blue-300 text-xs cursor-pointer bg-transparent border-none", title: DDBTR("내 달력에 복사"), onClick: () => copyToMine(ev), children: "⤓" }),
                    canEdit && o.jsx("button", { className: "text-red-400 text-xs cursor-pointer bg-transparent border-none", onClick: () => delEvent(ev.id), children: "✕" })
                ] }, ev.id)) })
        ] }),
        o.jsxs("div", { className: "flex gap-2 border-t border-white/10 pt-3", children: [
            sel.is_owner ? o.jsx("button", { className: btnP + " bg-red-500/15 text-red-300", onClick: removeTeam, children: DDBTR("팀 삭제") })
            : o.jsx("button", { className: btnP + " bg-white/10 text-white/70", onClick: leave, children: DDBTR("팀 나가기") })
        ] }),
        err && o.jsx("div", { className: "text-amber-300 text-xs", children: err })
    ] });

    return Rr.createPortal(o.jsxs(o.Fragment, { children: [
        o.jsx("div", { className: "fixed inset-0 z-[9990] bg-black/40", onClick: () => setOpen(!1) }),
        o.jsxs("div", { ref: boxRef, className: "fixed z-[9999] rounded-2xl shadow-2xl w-96 max-w-[92vw] max-h-[85vh] overflow-y-auto", style: { left: "50%", top: "50%", transform: "translate(-50%,-50%)", backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.18)" }, children: [
            header("👥 " + DDBTR("팀 달력")),
            body
        ] })
    ] }), document.body);
}
