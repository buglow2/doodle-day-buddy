/* ============================================================
   doodle-day-buddy v9 복원본 (빌드 번들에서 역추출한 검증된 코드)
   - 변수명은 압축 당시 이름 그대로입니다. 동작은 v9와 동일합니다.
   - 외부 라이브러리 참조만 아래 import로 연결했습니다.
============================================================ */
import * as O from 'react';
import * as Rr from 'react-dom';
import * as o from 'react/jsx-runtime';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import { CircleAlert as Ec, Trash2 as Gr, TriangleAlert as Of, Maximize2 as Ql, Square as Rf, RefreshCw as Sc, ChevronDown as Si, Plus as Vr, X as Zt, Info as aT, CircleCheckBig as ad, Download as am, Upload as au, UserPlus as bT, Settings2 as bw, LoaderCircle as cT, Search as cd, Pause as dT, CalendarDays as eT, Pencil as fT, Shuffle as gT, Cloud as gw, Menu as hT, KeyRound as iT, Minus as id, Landmark as im, ChevronUp as jf, Wallet as kT, List as lT, Pin as ld, Sparkles as lm, Repeat as mT, ExternalLink as nT, Link as oT, Music as od, Settings as om, Repeat1 as pT, CloudOff as rT, SquareCheckBig as rl, Eye as sT, Calculator as sd, BookOpen as sm, Check as su, Calendar as tT, ChevronLeft as tl, LogIn as uT, SkipBack as vT, EyeOff as vw, SkipForward as wT, GripVertical as ww, Play as xT, Table2 as yT, LogOut as yw, PanelLeft as F0, PanelRight as I0 , ChevronRight as $n } from 'lucide-react';
const F2 = O;
const fw = createClient;
const f2 = XLSX.utils, _d = XLSX.read, Gw = XLSX.SSF;
const _p = new Date,
    Hl = {
        events: [],
        ddays: [],
        memoTabs: [{
            id: "calendar",
            title: "일정",
            color: "#64b5f6",
            items: []
        }, {
            id: "memo-1",
            title: "메모 1",
            color: "#f48fb1",
            items: []
        }, {
            id: "memo-2",
            title: "메모 2",
            color: "#ef5350",
            items: []
        }, {
            id: "memo-3",
            title: "메모 3",
            color: "#42a5f5",
            items: []
        }, {
            id: "memo-4",
            title: "메모 4",
            color: "#66bb6a",
            items: []
        }, {
            id: "memo-5",
            title: "메모 5",
            color: "#ab47bc",
            items: []
        }],
        activeTab: "calendar",
        currentYear: _p.getFullYear(),
        currentMonth: _p.getMonth() + 1,
        fontSize: 10,
        panels: [{
            id: "panel-memo-1",
            type: "memo",
            memoTabId: "memo-3",
            slot: "left",
            order: 0,
            floatX: 20,
            floatY: 80,
            floatW: 220,
            floatH: 400,
            minimized: !1,
            zIndex: 1
        }, {
            id: "panel-cal",
            type: "calendar",
            slot: "right",
            order: 0,
            floatX: 100,
            floatY: 80,
            floatW: 650,
            floatH: 520,
            minimized: !1,
            zIndex: 1
        }, {
            id: "panel-dday",
            type: "dday",
            slot: "right",
            order: 1,
            floatX: 760,
            floatY: 80,
            floatW: 240,
            floatH: 480,
            minimized: !1,
            zIndex: 1
        }],
        settings: {
            fontFamily: "Noto Sans KR",
            panelBgOpacity: 15,
            textColor: "#ffffff",
            panelColor: "#ffffff",
            backgroundType: "gradient",
            backgroundIndex: 0,
            backgroundSolidColor: "#1a1a2e",
            calHeaderFontSize: 18,
            calDateFontSize: 12
        },
        privacy: {
            enabled: !1,
            idleHours: 0,
            idleMinutes: 1,
            idleSeconds: 0,
            fadeOpacity: 5
        },
        topZIndex: 10,
        loans: [],
        savings: []
    },
    Ef = "doodle_day_buddy_v1";

function ddbHasSession() {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i) || "";
            if (k.startsWith("sb-") && k.endsWith("-auth-token")) return !0
        }
    } catch {}
    return !1
}

let DDB_LANG = localStorage.getItem("ddb_lang") || "ko";

function ddbSetLang(l) {
    DDB_LANG = l, localStorage.setItem("ddb_lang", l), window.dispatchEvent(new CustomEvent("ddb-lang"))
}
const DDB_I18N = {
    en: {"월 이동":"Go to month","날짜 클릭 · 0.5초 누르고 드래그로 여러 개 · 다른 달로 옮겨도 유지":"Click a date · hold 0.5s & drag for many · kept across months","이미지로 내보내기":"Export as image","텍스트로 내보내기":"Export as text","ics로 내보내기":"Export as .ics","달력에서 날짜를 클릭해 선택하세요":"Click dates on the calendar to select","달력에서 날짜 클릭 · ":"Click dates on the calendar · "," 선택됨":" selected","월·날짜를 골라 이미지·표·ics로 공유":"Pick month & days, share as image/table/ics","일정 공유 — 월 선택":"Share schedule — pick month","월을 고르면 그 달로 이동, 날짜를 눌러 선택하세요":"Pick a month, then click days to select","일 선택됨":" days selected","일 · 공유 형식":" days · format","텍스트(표) 복사":"Copy text (table)","파일 저장":"file","표 복사됨! 엑셀에 붙여넣기(Ctrl+V)":"Table copied! Paste into Excel (Ctrl+V)","ics 파일을 저장했습니다":"Saved the .ics file","패널 캐릭터 스킨":"Panel character skin","이전 내 배경으로 되돌리기":"Restore my previous background","이 색 일정":"Events of this color","날짜 ↑":"Date ↑","날짜 ↓":"Date ↓","이름 ↑":"Name ↑","이름 ↓":"Name ↓","해당 색 일정이 없습니다":"No events of this color","보기 방식 (캐러셀/기본)":"View mode (carousel/basic)","←→ 칸 이동 · Enter 들어가기 · 안에서 ↑↓ 이동 · → 펼치기 · ← 접기 · Esc 뒤로":"←→ move column · Enter open · inside: ↑↓ move · → expand · ← collapse · Esc back","크기 조절":"Resize","(빈 메모)":"(empty)","텍스트 필터":"Text filter","색깔 필터":"Color filter","메모 내용 검색":"Search memo content","필터 초기화":"Reset filters","↑↓ 이동 · → 펼치기 · ← 접기 · Enter 편집 · Esc 뒤로":"↑↓ move · → expand · ← collapse · Enter edit · Esc back","메모 상세":"Memo overview","Tab으로 메모 이동":"Move between memos with Tab","체크한 메모끼리 Tab 키로 이동. 각 메모 제목줄의 체크박스로 선택":"Tab cycles only checked memos. Select via the checkbox on each memo's title bar.","Tab 이동에 포함":"Include in Tab cycle","달력 헤더 버튼 표시":"Calendar header buttons","사생활 잠금":"Privacy lock","상세보기":"Detail view","팀":"Team","다운로드 링크가 아직 준비되지 않았습니다. 관리자에게 문의하세요.":"The download link isn't ready yet. Please contact your admin.","정규 좌석":"Paid seats","보기 전용(무료)":"View-only (free)","최하 등급(5)은 보기 전용·무료로 고정됩니다.":"The lowest level (5) is fixed to view-only and free.","단계":"Lv","이름":"Name","공유":"Share","관리":"Manage","등급 설정":"Grade settings","등급 설정 저장":"Save grades","등급 설정을 저장했습니다.":"Grade settings saved.","숫자 낮을수록 권한 높음. 소유자는 항상 전권입니다.":"Lower number = higher permission. The owner always has full rights.","공유 권한이 없습니다.":"You don't have share permission.","권한이 없습니다.":"No permission.","잘못된 등급입니다.":"Invalid level.","소유자 등급은 바꿀 수 없습니다.":"The owner's level can't be changed.","설정 형식이 올바르지 않습니다.":"Invalid settings format.","올리는 중…":"Uploading…","이미지":"Image","제거":"Remove","이미지 공지 10캐시 차감":"Image notice: 10 cash","캐시":"cash","캐시가 부족합니다.":"Not enough cash.","필요":"Need","이미지는 5MB 이하만 가능합니다.":"Images must be 5MB or less.","팀 멤버가 아닙니다.":"You are not a team member.","금액이 올바르지 않습니다.":"Invalid amount.","공지":"Notice","팀 공지":"Team notice","공지 올리기":"Post notice","팀원에게 보낼 공지를 입력하세요":"Write a notice for your team","등록된 공지가 없습니다.":"No notices yet.","공지 내용을 입력하세요.":"Please enter the notice.","이 공지를 삭제할까요?":"Delete this notice?","다음에 이 창을 띄우지 않습니다":"Don't show this again","확인":"OK","공지를 올릴 권한이 없습니다.":"You don't have permission to post notices.","내용이 비어 있습니다.":"The content is empty.","미완료":"Incomplete","건":" items","숨김":"Hidden","💰입금":"💰 Income","💸출금":"💸 Expense","완료 시각":"Completion time","완료 숨기기":"Hide completed","메모":"Memo","오늘":"Today","동기화":"Sync","탭 추가":"Add tab","창 추가":"Add window","✏️ 입력":"✏️ Input","거치식":"Grace period","달력 보기":"Show calendar","달력 숨기기":"Hide calendar","대기 중":"Waiting","동기화 오류":"Sync error","동기화 중...":"Syncing...","드래그해서 순서 변경":"Drag to reorder","로그인":"Log in","마이너스통장":"Overdraft account","만기일시":"Bullet repayment","매년":"Yearly","매월":"Monthly","매일":"Daily","매주":"Weekly","미완료":"Incomplete","원금균등":"Equal principal","원리금균등":"Equal payment","저장하기":"Save","처리 중...":"Processing...","추가하기":"Add","회원가입":"Sign up","💹 펀드":"💹 Fund","📊 미리보기":"📊 Preview","● 기타(1회성)":"● Other (one-time)","건수":"Count","기간":"Period","기타(1회성)":"Other (one-time)","비율(%)":"Ratio (%)","입금 합계":"Total income","제목":"Title","총 건수":"Total count","출금 합계":"Total expense"," 입력 (API key 아님)":" entry (not API key)","Supabase 대시보드 → Settings → API →":"Supabase Dashboard → Settings → API →","Supabase 미설정":"Supabase not set","Supabase 설정 변경":"Change Supabase settings","Supabase 설정의 anon 키를 확인하세요 (service key 사용 불가)":"Check the anon key in Supabase settings (service key not allowed)","Supabase가 설정되지 않았습니다":"Supabase is not configured","☁ 동기화 상태":"☁ Sync status","☁ 클라우드 동기화 설정":"☁ Cloud sync setup","☁ 클라우드 로그인":"☁ Cloud login","⚠ service_role 키입니다. anon 키를 입력하세요.":"⚠ This is a service_role key. Enter the anon key.","가입 완료! 이메일 인증 후 로그인하세요.":"Signed up! Verify your email, then log in.","동기화 중":"Syncing","동기화됨":"Synced","라이선스 키가 유효하지 않습니다. 클라우드 동기화가 제한됩니다.":"Invalid license key. Cloud sync is restricted.","라이선스 키를 입력하세요 (구매 시 전달됩니다)":"Enter your license key (provided at purchase)","로그인 필요":"Login required","를 복사하세요.":" — copy it.","마지막 동기화":"Last synced","비밀번호가 일치하지 않습니다":"Passwords do not match","비밀번호는 6자 이상이어야 합니다":"Password must be 6+ characters","아이디(이메일) 저장":"Save ID (email)","에서 무료 계정 생성 후 키를 복사하세요":"create a free account there and copy the key","이메일 + ":"Email + ","이메일 또는 비밀번호가 틀렸습니다":"Wrong email or password","이메일 인증이 필요합니다. 메일함을 확인하세요":"Email verification required. Check your inbox","이메일과 비밀번호를 입력하세요":"Enter email and password","이미 등록된 이메일입니다":"Email already registered","자동 로그인 (끄면 다음 실행 때 로그아웃 상태로 시작)":"Auto login (off = start logged out next time)","자동 로그인 (다음 실행 시 자동으로 로그인)":"Auto login (log in automatically next time)","잘못된 키 형식입니다":"Invalid key format","지금 동기화":"Sync now"," (은행)":" (Bank)","② 미리보기":"② Preview","가져오기 (":"Import (","건)":")","건) — ":") — ","건의 거래내역이 달력에 추가되었습니다.":" transactions were added to the calendar.","기준날짜 기준으로 잔액 역산":"Back-calculate balance from base date","당근거래 ":"Carrot deals ","메모 (입출금 내역에 표시됩니다)":"Memo (shown in transactions)","반복거래 ":"Recurring ","원본 적요: ":"Original memo: ","원본: ":"Original: ","토스뱅크":"Toss Bank","🏦 은행 연동 키워드 ":"🏦 Bank keywords ","🏧 은행":"🏧 Bank","📦 가져오기 기록 (":"📦 Import history (","🔄 반복거래 (":"🔄 Recurring (","🥕 당근거래 (1회성, ":"🥕 Carrot deals (one-time, ","🥕 당근거래 — 1회성 (":"🥕 Carrot deals — one-time (","일정 공유 (.ics)":"Share schedule (.ics)","일정 받기 (.ics)":"Import schedule (.ics)","일정을 .ics 파일로 내보내 카톡·메일로 공유":"Export events as .ics to share via chat/email",".ics 파일에서 일정 가져오기 (중복 제외)":"Import events from an .ics file (skips duplicates)","내보낼 일정이 없습니다.":"No events to export.","개 일정을 가져왔습니다.":" event(s) imported.","개 중복 제외":" duplicates skipped","올바른 일정 파일(.ics)이 아닙니다.":"Not a valid schedule file (.ics).","나":"me","날짜와 제목을 입력하세요.":"Enter a date and title.","내 달력에 복사":"Copy to my calendar","내 달력에 복사했습니다.":"Copied to your calendar.","내 팀":"My teams","멤버":"Members","명":"","복사":"Copy","뷰어":"Viewer","소유자는 팀을 삭제해야 나갈 수 있습니다.":"The owner must delete the team to leave.","소유자만 할 수 있습니다.":"Only the owner can do this.","아직 팀이 없습니다.":"No teams yet.","이 멤버를 내보낼까요?":"Remove this member?","이 팀에서 나갈까요?":"Leave this team?","일정 제목":"Event title","재발급":"Regenerate","참여":"Join","참여 코드":"Join code","참여 코드 6자리":"6-digit join code","참여 코드가 올바르지 않습니다.":"Invalid join code.","추가":"Add","코드로 참여":"Join by code","코드를 복사했습니다.":"Code copied.","클라우드가 설정되지 않았습니다.":"Cloud is not configured.","팀 공유는 로그인이 필요합니다. 먼저 상단의 동기화 버튼에서 로그인하세요.":"Team sharing requires login. Log in via the sync button at the top first.","팀 나가기":"Leave team","팀 달력":"Team calendar","팀 만들기":"Create team","팀 목록":"Team list","팀 삭제":"Delete team","팀 이름 (예: 마케팅팀)":"Team name (e.g. Marketing)","팀 이름을 입력하세요.":"Enter a team name.","팀 일정":"Team events","팀 일정이 없습니다.":"No team events.","팀을 만들려면 라이선스가 필요합니다.":"A license is required to create a team.","팀을 삭제하면 모든 팀 일정이 사라집니다. 삭제할까요?":"Deleting the team removes all its events. Delete?","편집자":"Editor","회사·팀원과 일정을 공유합니다":"Share your schedule with your company/team","소유자":"Owner","지역 변경":"Change region","표 크기 선택":"Pick table size","끝으로 갈수록 칸이 늘어납니다":"Cells grow as you reach the edge","팀 달력 보기":"View team calendar","개인 달력 보기":"View personal calendar","보기 전용입니다 (편집 권한 없음)":"View only (no edit permission)","이 날 일정 공유":"Share this day","일정 없음":"No events","이미지 복사":"Copy image","텍스트 복사":"Copy text","이미지 복사됨! 카톡에 붙여넣기(Ctrl+V)":"Image copied! Paste it (Ctrl+V)","텍스트 복사됨! 카톡에 붙여넣기(Ctrl+V)":"Text copied! Paste it (Ctrl+V)","이미지 복사 실패 — 텍스트로 시도하세요":"Image copy failed — try text","복사 실패":"Copy failed","팀 달력만 사용":"Use team calendar only","개인 달력 없이 팀 달력으로 시작합니다 (회사용)":"Start with the team calendar, no personal (for companies)","팀 보기 시 팀 선택 창 표시":"Show team picker when switching to team view","여러 팀을 자주 바꿀 때 켜세요. 끄면 마지막 팀을 바로 엽니다":"Turn on if you switch teams often. Off = open the last team directly","팀 선택":"Select team","팀 전환":"Switch team","👥 팀 이름":"👥 Team name","진행중":"In progress","개":"","년":"","목록":"List","새 메모":"New memo","메모 키보드 조작":"Memo keyboard navigation","입력칸: ESC 후 1.5초 내 Backspace → 목록 · 목록: ↑↓ 선택, Ctrl+→ 열기, Ctrl+← 나가기":"Input: ESC then Backspace within 1.5s → list · List: ↑↓ select, Ctrl+→ open, Ctrl+← exit","입력: Ctrl+← 또는 ESC후 Backspace → 목록 · 목록: ↑↓ 선택, → 열기, ← 접기, Enter 편집":"Input: Ctrl+← or ESC+Backspace → list · List: ↑↓ select, → open, ← close, Enter edit","테마":"Theme","(무료)":"(free)","부산 갈매기":"Busan Seagull","정글 악어":"Jungle Croc","팀 관리":"Team settings","이 달 일정 공유":"Share this month","일정 공유":"Share schedule","엑셀로 내보내기":"Export to Excel","엑셀 파일을 저장했습니다":"Excel file saved","% 표시":"% shown","(1초 길게 누르면 📌 피드백 메모)":"(hold 1s for 📌 feedback memo)","(1초 이상 올리면 설명)":"(hover 1s+ for details)","(service key 아님)":"(not service key)","(변경 시 추가)":"(add on change)","(선택)":"(optional)","(클릭 수정)":"(click to edit)","+ 대출":"+ Loan","+ 적금·펀드":"+ Savings/Fund",".xlsx 파일 지원":".xlsx files supported","2026년 5월":"May 2026","2글자":"2 chars","CSV로 내보내기 (Excel에서 열기 가능)":"Export CSV (opens in Excel)","D-Day 창의 대출·적금 추가 버튼 모양을 고릅니다":"Choose the loan/savings add-button style in the D-Day panel","Do! 리스트":"Do! List","Do! 리스트 — 할 일을 적어두고 달력 날짜로 드래그":"Do! List — note tasks and drag onto a calendar date","JSON 파일로 데이터 가져오기":"Import data from a JSON file","anon (공개키)":"anon (public key)","service_role(비밀키)는 절대 사용 금지.":"Never use service_role (secret key).","v66: React 에러 발생":"v66: A React error occurred","• KB국민은행, 신한은행 등 — 추후 지원 예정":"• KB, Shinhan, etc. — coming soon","• 토스뱅크 — 엑셀 거래내역 (.xlsx)":"• Toss Bank — Excel transactions (.xlsx)","※ 간단한 화면 잠금용입니다. 비밀번호를 잊으면 로그아웃(초기화) 후 다시 로그인해야 합니다.":"※ Simple screen lock. If you forget the password, log out (reset) and log in again.","※ 월주는 양력 근사 계산 (절기 미반영)":"※ Month pillar is a solar approximation (solar terms not applied)","→ 다른 날짜 또는 같은 날 일정 위에 놓기(순서 변경)":"→ Drop on another date, or on an event same-day (reorder)","→ 역산 금리":"→ Implied rate","⏩ 배속":"⏩ Speed","▲ 입금":"▲ Income","▼ 출금":"▼ Expense","☀️ 양력":"☀️ Solar","☀️ 양력 기준":"☀️ Solar-based","☑ 할 일":"☑ To-do","⚡ 상극: 목↔토 화↔금 토↔수 금↔목 수↔화":"⚡ Conflict: Wood↔Earth Fire↔Metal Earth↔Water Metal↔Wood Water↔Fire","✓ 금리가 적용되었습니다. 저장하려면 대출 수정에서 저장하세요.":"✓ Rate applied. Save it in Edit Loan to keep.","✓ 지원 형식":"✓ Supported formats","✕ 초기화":"✕ Reset","⭐ D-Day 창":"⭐ D-Day panel","「곡 추가하기」를 눌러 노래를 추가하세요":"Press “Add song” to add music","가계부":"Ledger","가계부 열기":"Open ledger","가나다":"Abc","가져오기":"Import","가져오기 완료!":"Import complete!","가져온 은행 거래내역이 없습니다.":"No imported bank transactions.","거래 분류 수정":"Edit transaction category","거래 종류별 이름 / 카테고리 / 색상 설정 (다음 가져오기에도 자동 적용됩니다)":"Set name / category / color per transaction type (auto-applied on next import)","거치기간 (개월)":"Grace period (months)","건너뛰기":"Skip","검색 결과 없음":"No results","검색어 입력 또는 색상 필터 선택":"Enter a search term or pick a color filter","경과 기간별 알림 임계값":"Alert thresholds by elapsed days","경과 일수 이상이면 해당 색상·아이콘으로 표시됩니다.":"Shown with that color/icon once elapsed days are reached.","계산 기록":"History","계산기":"Calculator","계산상 납입금":"Calculated payment","계좌 가져오기":"Import Bank","국가":"Country","권장: 32×32 ~ 64×64 픽셀, PNG(투명 배경) — 최대 100KB":"Recommended: 32×32 ~ 64×64 px, PNG (transparent) — max 100KB","글씨 색상":"Text color","글씨 크기 (앱 전체)":"Font size (whole app)","글씨체":"Font","금리":"Rate","금리 변경 이력":"Rate change history","금리 이력 없음":"No rate history","금액":"Amount","금액 (선택)":"Amount (optional)","금액 유형":"Amount type","금액 입력 (원)":"Enter amount (KRW)","금액 입력 시 금리가 자동 계산됩니다":"Rate is auto-calculated when you enter an amount","금액·기간·금리를 입력하면 납입 스케줄이 표시됩니다.":"Enter amount, term and rate to see the payment schedule.","기간 (개월)":"Term (months)","기간별 색상:":"Colors by period:","기념일":"Anniversary","기념일 · 반복일정":"Anniversaries · Recurring","기념일 이름 (예: 아내 생일)":"Anniversary name (e.g. Wife's birthday)","기록 없음":"No records","기본값":"Default","기존 금리":"Current rate","기준날짜":"Base date","기준잔액 (원)":"Base balance (KRW)","기준잔액 직접 설정":"Set base balance manually","나중에":"Later","날씨 불러오는 중...":"Loading weather...","날씨 정보를 불러올 수 없습니다 (인터넷 확인)":"Couldn't load weather (check internet)","날짜":"Date","날짜 범위 필터":"Date range filter","납부일":"Pay day","납입":"Deposit","납입 월":"Deposit month","납입금":"Deposit","납입기간 (개월)":"Deposit term (months)","납입액":"Deposit amount","납입액·기간·이율을 입력하면 예상 결과가 표시됩니다.":"Enter deposit, term and rate to see projected results.","납입일":"Deposit day","내보내기":"Export","내역":"Details","내역 없음":"No records","내용":"Content","네이버페이충전 +100,000":"NaverPay top-up +100,000","년도":"Year","누적액":"Accumulated","다운로드":"Download","닫기":"Close","달력":"Calendar","달력 글씨 크기":"Calendar font size","달력 버튼 단축키":"Calendar button hotkeys","달력 색상":"Calendar colors","달력 작게":"Shrink calendar","달력 크게 (창보다 커지면 스크롤로 봅니다)":"Enlarge calendar (scroll if bigger than window)","달력 표시 설정":"Calendar display settings","달력의 각 일정 오른쪽에 삭제 버튼이 생깁니다":"A delete button appears at the right of each event","달력이 분리 중입니다":"Detaching calendar","대출 / 적금·펀드":"Loans / Savings·Funds","대출 시작일":"Loan start date","대출 연결 (선택)":"Link loan (optional)","대출 이름":"Loan name","대출 추가":"Add loan","대출·적금 추가 버튼 표시":"Loan/savings add-button display","대출금액 (원)":"Loan amount (KRW)","대출납입":"Loan payment","데이터를 JSON 파일로 내보내기":"Export data as a JSON file","도시":"City","드래그로 입력칸 크기 조절":"Drag to resize input area","드래그하여 창 크기 조절":"Drag to resize the window","등록된 대출 / 적금·펀드가 없습니다":"No loans / savings registered","라이선스 키 (구매 시 전달)":"License key (sent at purchase)","로 저장됩니다":"will be saved","로그아웃":"Logout","로그인됨":"Signed in","리셋":"Reset","만기 수령액":"Maturity payout","만기 예상액":"Projected maturity","만들기":"Create","맞춤":"Fit","매년 반복 (생일 등)":"Repeat yearly (birthdays, etc.)","매월 납부하는 날 (비우면 시작일 기준)":"Monthly payment day (blank = start date)","매월 납입하는 날 (비우면 시작일 기준)":"Monthly deposit day (blank = start date)","메뉴":"Menu","메모 (선택)":"Memo (optional)","메모 1":"Memo 1","메모 2":"Memo 2","메모 3":"Memo 3","메모 4":"Memo 4","메모 5":"Memo 5","메모가 없습니다":"No memos","모든 데이터 초기화":"Reset all data","미리보기":"Preview","미완료 할 일":"Open tasks","반복":"Repeat","반복 O":"Repeat ✓","반복 X":"Repeat ✗","반복 일정":"Recurring","배경색":"Background color","배경화면":"Wallpaper","분 후":"min later","분석하기 ✨":"Analyze ✨","비밀번호":"Password","비밀번호 (6자 이상)":"Password (6+ chars)","비밀번호 입력":"Enter password","비밀번호 확인":"Confirm password","비밀번호가 올바르지 않습니다":"Incorrect password","비활성 타이머":"Idle timer","빨간색":"Red","사생활 모드":"Privacy mode","사용자 지정 색상":"Custom color","사주팔자 (四柱八字)":"Four Pillars (四柱八字)","삭제":"Delete","상단 버튼 크기":"Top button size","상세보기 (전체 D-Day 목록)":"Details (full D-Day list)","새 폴더 이름 입력 후 Enter":"Type a new folder name and press Enter","색상":"Color","색상 선택":"Pick color","색상:":"Color:","생년월일시를 입력하면 사주팔자와 음양오행을 분석합니다":"Enter birth date/time to analyze the Four Pillars and Five Elements","생년월일을 입력하고 분석하기를 눌러주세요":"Enter your birth date and press Analyze","선택 안함":"None","선택한 월에 거래 없음":"No transactions in the selected month","설정":"Settings","성을 포함한 한글 이름을 두 글자 이상 입력하세요":"Enter a Korean name (with surname), 2+ characters","소리오행 흐름":"Sound-element flow","수기납입 → 금리 자동계산":"Manual payment → auto rate calc","수정":"Edit","순서 변경 중 — 빈 곳 클릭 시 종료":"Reordering — click empty space to finish","순서 변경 중 — 빈 곳 클릭하면 종료":"Reordering — click empty space to finish","순수지":"Net","숨기기":"Hide","숫자 키로 입력 — shift 모드 (예: 2026 입력 후 2 누르면 0262)":"Type with number keys — shift mode (e.g. after 2026, pressing 2 gives 0262)","시간 미입력 시 시주 생략":"Hour pillar skipped if time is blank","시작 일수":"Start day","시작일":"Start date","실제 납입금액 (원)":"Actual payment (KRW)","실제 납입한 금액을 입력하면 해당 달의 금리를 역산해서 그 이후 납입 스케줄을 다시 계산합니다.":"Enter the actual amount paid to back-calculate that month's rate and recompute the following schedule.","아이콘":"Icon","알림 아이콘 이미지":"Alert icon image","언어":"Language","없음":"None","엑셀 원본 잔액":"Excel original balance","엑셀 파일을 여기에 드롭하거나 클릭하여 선택":"Drop an Excel file here or click to select","역산 결과":"Back-calc result","역산 금리":"Implied rate","연결 안 함":"Not linked","연도":"Year","예: 1,000,000":"e.g. 1,000,000","예: 1,520,000":"e.g. 1,520,000","예: 10, 6, 12":"e.g. 10, 6, 12","예: 12":"e.g. 12","예: SKT, 카드연회비, 통신비...":"e.g. SKT, card fee, phone bill...","예: 洪吉童":"e.g. 洪吉童","예: 홍길동":"e.g. Hong Gildong","예상 이자":"Expected interest","오늘로":"Today","오디오 URL 또는 YouTube 링크":"Audio URL or YouTube link","오른쪽에 고정":"Dock right","오른쪽으로":"Move right","오행 분포 (陰陽五行)":"Element distribution (陰陽五行)","오행 상생·상극 (五行相生相剋)":"Element generation/conflict (五行相生相剋)","올해로":"This year","완료":"Done","완료 시간":"Completed at","완료 항목 삭제":"Delete completed","완료 항목 전체 삭제":"Delete all completed","완료한 일":"Completed","완료한 할 일이 없습니다":"No completed tasks","왼쪽에 고정":"Dock left","왼쪽으로":"Move left","운세":"Fortune","원금":"Principal","월":"Month","월 납입액 (원)":"Monthly deposit (KRW)","유형":"Type","유효한 금액을 입력해주세요":"Please enter a valid amount","은행":"Bank","은행 거래내역 가져오기":"Import bank transactions","은행 거래내역 가져오기에서 이 키워드와 일치하는 항목이 있으면, 같은 달 이 반복일정을 자동으로 숨겨 중복을 방지합니다.":"If an imported bank transaction matches this keyword, this recurring item is auto-hidden that month to avoid duplicates.","음양오행 이론 기반 · 재미로 보는 운세입니다 🙂":"Based on Yin-Yang Five Elements · just for fun 🙂","이 버전 알림 다시 보지 않기":"Don't show this version again","이 색상의 용도 이름 — 이 창에서만 표시됩니다":"Label for this color — shown only in this window","이 색상의 용도 이름 입력 (최대 2글자)":"Name this color's use (max 2 chars)","이 시기엔 중요한 결정을 서두르지 마세요":"Don't rush big decisions in this period","이 폴더에 넣을 곡 선택하기":"Select songs to add to this folder","이름 (한글, 성 포함)":"Name (Korean, with surname)","이메일":"Email","이미지 선택":"Choose image","이미지 없음":"No image","이미지를 선택하면 배경으로 적용됩니다":"Selecting an image applies it as the background","이자":"Interest","일":"Day","일 이상":"days or more","일요일 색상 구분":"Highlight Sundays","일정":"Events","일정 내용 미리보기":"Event preview","일정 삭제":"Delete event","일정 시간 조작 없으면 화면이 투명해집니다":"Screen fades when idle for the set time","일정, 메모, D-Day 검색...":"Search events, memos, D-Day...","일정으로":"To event","입금":"Income","입력칸을 클릭한 뒤 원하는 키(조합키 가능: Ctrl/Alt/Shift+키)를 누르면 저장됩니다. Backspace로 삭제. 달력 창이 열려 있을 때 작동하며, 글자 입력 중에는 무시됩니다.":"Click a field then press a key (combos OK: Ctrl/Alt/Shift). Backspace to clear. Works when the calendar is open; ignored while typing.","작성 시간":"Created at","잔액":"Balance","잔액 표시 기준":"Balance display basis","잠금 비밀번호":"Lock password","잠금 해제":"Unlock","잠금화면 배경":"Lock screen background","재생바":"Player","재생바 접기 (1:재생바 숨김 → 2:배속 숨김 → 3:최소 → 4:전체)":"Collapse player (1: hide bar → 2: hide speed → 3: minimal → 4: full)","저사양 PC에서는 꺼두는 것을 권장합니다":"Recommended off on low-spec PCs","저장":"Save","저장하고 로그인":"Save and log in","저장하면 같은 원본 적요의 기존 이벤트도 모두 업데이트됩니다.":"Saving also updates all existing events with the same original memo.","적금 · 펀드":"Savings · Fund","적금·펀드 추가":"Add savings/fund","적금납입":"Savings deposit","적요":"Memo","전체":"All","전체 삭제":"Delete all","제목 (URL 입력 후 자동 완성)":"Title (auto-filled after URL)","종료일":"End date","주황":"Orange","중복 (체크로 강제 추가)":"Duplicate (check to force add)","중요한 약속·새 시작에 좋은 날입니다":"A good day for key appointments and fresh starts","지남":"passed","지우기":"Clear","직접 조절":"Manual","진행중인 일":"In progress","진행중인 할 일이 없습니다":"No tasks in progress","창 배경 투명도":"Window background opacity","창 열기":"Open window","찾기":"Search","철학관 원리 기반 · 재미로 보는 사주입니다 🙏":"Based on traditional Saju principles · just for fun 🙏","초기화":"Reset","총 납입액":"Total deposits","최근 6년 연별 요약":"Yearly summary (last 6 years)","출금":"Expense","출금 내역 없음":"No expenses","출금 합계":"Total expenses","취소":"Cancel","카테고리":"Category","커스텀 색상":"Custom color","클릭 즉시 저장 | 엑셀 복붙 지원":"Saves on click | Excel paste supported","클릭 후 키 입력":"Click then press a key","태어난 시간 (선택 — 시주 계산에 사용)":"Birth time (optional — used for hour pillar)","탭 삭제":"Delete tab","토요일 색상 구분":"Highlight Saturdays","투명도":"Opacity","파란색":"Blue","팝업으로":"To popup","패널 내용 영역 미리보기":"Panel content preview","패널 미리보기":"Panel preview","패널 배경 기준색":"Panel base color","패널 배경 투명도":"Panel background opacity","패널 배경색 기준":"Panel background base","패널 투명도 / 색상":"Panel opacity / color","폴더 만들기 — 곡 목록에서 각 곡의 폴더를 지정할 수 있습니다":"Create a folder — assign each song to a folder in the list","폴더 지정":"Assign folder","표 삽입":"Insert table","표시 방식":"Display mode","표시 설정":"Display settings","표시 위치":"Position","표시 이름":"Display name","피드백 등록!":"Feedback saved!","피드백 메모 등록":"Add feedback memo","피드백 알림에 쓸 이미지를 직접 올릴 수 있습니다.":"You can upload your own image for feedback alerts.","한자 표기 (선택)":"Hanja (optional)","한자 획수 (선택 — 글자별 획수를 쉼표로. 비우면 한글 획수로 계산)":"Hanja strokes (optional — per char, comma-separated; blank uses Hangul strokes)","할 일":"To-do","할 일 입력 후 Enter":"Type a task and press Enter","할 일을 입력해 블록을 만들고, 클릭해서 체크한 뒤 달력 날짜로 드래그하세요. 체크된 블록이 한꺼번에 들어갑니다.":"Type a task to make a block, click to check it, then drag onto a date. Checked blocks are added together.","합계":"Total","항목":"Item","항목이 없습니다":"No items","행운 색":"Lucky color","행운 숫자":"Lucky number","현재":"Now","현재 금리":"Current rate","현재 적용중":"Currently applied","현재 표시 년월":"Displayed month","화면에 맞추기":"Fit to screen","화면이 잠겨 있습니다":"Screen is locked","활성 피드백이 없습니다.":"No active feedback.","🌙 음력":"🌙 Lunar","🌙 입력한 날짜를 음력으로 저장합니다.":"🌙 Save the entered date as lunar.","🎵 음악":"🎵 Music","🎵 재생바":"🎵 Player","🎵 재생바 창":"🎵 Player window","🏦 대출":"🏦 Loan","🏦 대출 추가":"🏦 Add loan","💰 가계부":"💰 Ledger","💰 입출금 현황":"💰 Cash flow","📅 달력":"📅 Calendar","📅 달력 패널":"📅 Calendar panel","📅 헤더":"📅 Header","📈 적금":"📈 Savings","📈 적금·펀드 추가":"📈 Add savings/fund","📊 출금 분석":"📊 Expense analysis","📋 상세 정보":"📋 Details","📋 할 일 목록":"📋 To-do list","📜 사주와 이름의 궁합":"📜 Saju & name compatibility","📜 원장 종합 분석 — 오행 생극(生剋)으로 본 오늘":"📜 Master's reading — today via element generation/conflict","📝 내용":"📝 Content","📝 메모":"📝 Memo","📥 내보내기":"📥 Export","🔄 상생: 목→화→토→금→수→목":"🔄 Generation: Wood→Fire→Earth→Metal→Water→Wood","🔐 지금 잠그기":"🔐 Lock now","🔢 계산기":"🔢 Calculator","🔢 계산기 창":"🔢 Calculator window","🔢 날짜":"🔢 Date","🔮 운세":"🔮 Fortune","🔮 운세 창":"🔮 Fortune window","🔮 운세·사주":"🔮 Fortune·Saju","🖊️ 수기납입 입력 → 금리 자동계산":"🖊️ Enter manual payment → auto rate calc"},
    ja: {"월 이동":"月を移動","날짜 클릭 · 0.5초 누르고 드래그로 여러 개 · 다른 달로 옮겨도 유지":"日付クリック · 0.5秒長押しでドラッグ選択 · 月をまたいでも保持","이미지로 내보내기":"画像で書き出し","텍스트로 내보내기":"テキストで書き出し","ics로 내보내기":"icsで書き出し","달력에서 날짜를 클릭해 선택하세요":"カレンダーで日付をクリックして選択","달력에서 날짜 클릭 · ":"カレンダーで日付をクリック · "," 선택됨":" 選択","월·날짜를 골라 이미지·표·ics로 공유":"月と日を選んで画像・表・icsで共有","일정 공유 — 월 선택":"予定共有 — 月を選択","월을 고르면 그 달로 이동, 날짜를 눌러 선택하세요":"月を選ぶと移動し、日付をクリックして選択","일 선택됨":"日 選択","일 · 공유 형식":"日 · 形式","텍스트(표) 복사":"テキスト(表)コピー","파일 저장":"ファイル保存","표 복사됨! 엑셀에 붙여넣기(Ctrl+V)":"表をコピー！Excelに貼り付け(Ctrl+V)","ics 파일을 저장했습니다":"icsファイルを保存しました","패널 캐릭터 스킨":"パネルキャラスキン","이전 내 배경으로 되돌리기":"以前の自分の背景に戻す","이 색 일정":"この色の予定","날짜 ↑":"日付 ↑","날짜 ↓":"日付 ↓","이름 ↑":"名前 ↑","이름 ↓":"名前 ↓","해당 색 일정이 없습니다":"この色の予定はありません","보기 방식 (캐러셀/기본)":"表示方式（カルーセル/基本）","←→ 칸 이동 · Enter 들어가기 · 안에서 ↑↓ 이동 · → 펼치기 · ← 접기 · Esc 뒤로":"←→ 列移動 · Enter 開く · 中で ↑↓ 移動 · → 展開 · ← 折りたたむ · Esc 戻る","크기 조절":"サイズ変更","(빈 메모)":"(空メモ)","텍스트 필터":"テキスト絞り込み","색깔 필터":"色で絞り込み","메모 내용 검색":"メモ内容を検索","필터 초기화":"フィルターをリセット","↑↓ 이동 · → 펼치기 · ← 접기 · Enter 편집 · Esc 뒤로":"↑↓ 移動 · → 展開 · ← 折りたたむ · Enter 編集 · Esc 戻る","메모 상세":"メモ詳細","Tab으로 메모 이동":"Tabでメモ移動","체크한 메모끼리 Tab 키로 이동. 각 메모 제목줄의 체크박스로 선택":"チェックしたメモ間をTabで移動。各メモのタイトル欄のチェックで選択。","Tab 이동에 포함":"Tab移動に含める","달력 헤더 버튼 표시":"カレンダーヘッダーのボタン表示","사생활 잠금":"プライバシーロック","상세보기":"詳細表示","팀":"チーム","다운로드 링크가 아직 준비되지 않았습니다. 관리자에게 문의하세요.":"ダウンロードリンクはまだ準備されていません。管理者にお問い合わせください。","정규 좌석":"有料席","보기 전용(무료)":"閲覧のみ(無料)","최하 등급(5)은 보기 전용·무료로 고정됩니다.":"最下等級(5)は閲覧のみ・無料に固定されます。","단계":"段階","이름":"名前","공유":"共有","관리":"管理","등급 설정":"等級設定","등급 설정 저장":"等級を保存","등급 설정을 저장했습니다.":"等級設定を保存しました。","숫자 낮을수록 권한 높음. 소유자는 항상 전권입니다.":"数字が小さいほど権限が高い。オーナーは常に全権です。","공유 권한이 없습니다.":"共有権限がありません。","권한이 없습니다.":"権限がありません。","잘못된 등급입니다.":"無効な等級です。","소유자 등급은 바꿀 수 없습니다.":"オーナーの等級は変更できません。","설정 형식이 올바르지 않습니다.":"設定形式が正しくありません。","올리는 중…":"アップロード中…","이미지":"画像","제거":"削除","이미지 공지 10캐시 차감":"画像お知らせ：10キャッシュ","캐시":"キャッシュ","캐시가 부족합니다.":"キャッシュが不足しています。","필요":"必要","이미지는 5MB 이하만 가능합니다.":"画像は5MB以下のみ可能です。","팀 멤버가 아닙니다.":"チームメンバーではありません。","금액이 올바르지 않습니다.":"金額が正しくありません。","공지":"お知らせ","팀 공지":"チームお知らせ","공지 올리기":"お知らせを投稿","팀원에게 보낼 공지를 입력하세요":"チームへのお知らせを入力","등록된 공지가 없습니다.":"お知らせはありません。","공지 내용을 입력하세요.":"お知らせを入力してください。","이 공지를 삭제할까요?":"このお知らせを削除しますか？","다음에 이 창을 띄우지 않습니다":"次回からこの画面を表示しない","확인":"確認","공지를 올릴 권한이 없습니다.":"お知らせを投稿する権限がありません。","내용이 비어 있습니다.":"内容が空です。","미완료":"未完了","건":"件","숨김":"非表示","💰입금":"💰入金","💸출금":"💸出金","완료 시각":"完了時刻","완료 숨기기":"完了を隠す","메모":"メモ","오늘":"今日","동기화":"同期","탭 추가":"タブ追加","창 추가":"ウィンドウ追加","✏️ 입력":"✏️ 入力","거치식":"据置式","달력 보기":"カレンダー表示","달력 숨기기":"カレンダー非表示","대기 중":"待機中","동기화 오류":"同期エラー","동기화 중...":"同期中...","드래그해서 순서 변경":"ドラッグで並べ替え","로그인":"ログイン","마이너스통장":"マイナス口座","만기일시":"満期一括","매년":"毎年","매월":"毎月","매일":"毎日","매주":"毎週","미완료":"未完了","원금균등":"元金均等","원리금균등":"元利均等","저장하기":"保存する","처리 중...":"処理中...","추가하기":"追加する","회원가입":"新規登録","💹 펀드":"💹 ファンド","📊 미리보기":"📊 プレビュー","● 기타(1회성)":"● その他(1回性)","건수":"件数","기간":"期間","기타(1회성)":"その他(1回性)","비율(%)":"割合(%)","입금 합계":"入金合計","제목":"タイトル","총 건수":"総件数","출금 합계":"出金合計"," 입력 (API key 아님)":" 入力 (API keyではない)","Supabase 대시보드 → Settings → API →":"Supabase ダッシュボード → Settings → API →","Supabase 미설정":"Supabase 未設定","Supabase 설정 변경":"Supabase 設定変更","Supabase 설정의 anon 키를 확인하세요 (service key 사용 불가)":"Supabase設定のanonキーを確認してください（service key使用不可）","Supabase가 설정되지 않았습니다":"Supabaseが設定されていません","☁ 동기화 상태":"☁ 同期状態","☁ 클라우드 동기화 설정":"☁ クラウド同期設定","☁ 클라우드 로그인":"☁ クラウドログイン","⚠ service_role 키입니다. anon 키를 입력하세요.":"⚠ service_roleキーです。anonキーを入力してください。","가입 완료! 이메일 인증 후 로그인하세요.":"登録完了！メール認証後にログインしてください。","동기화 중":"同期中","동기화됨":"同期済み","라이선스 키가 유효하지 않습니다. 클라우드 동기화가 제한됩니다.":"ライセンスキーが無効です。クラウド同期が制限されます。","라이선스 키를 입력하세요 (구매 시 전달됩니다)":"ライセンスキーを入力してください（購入時にお渡し）","로그인 필요":"ログインが必要","를 복사하세요.":" をコピーしてください。","마지막 동기화":"最終同期","비밀번호가 일치하지 않습니다":"パスワードが一致しません","비밀번호는 6자 이상이어야 합니다":"パスワードは6文字以上必要です","아이디(이메일) 저장":"ID（メール）を保存","에서 무료 계정 생성 후 키를 복사하세요":"で無料アカウントを作成しキーをコピーしてください","이메일 + ":"メール + ","이메일 또는 비밀번호가 틀렸습니다":"メールまたはパスワードが違います","이메일 인증이 필요합니다. 메일함을 확인하세요":"メール認証が必要です。受信箱を確認してください","이메일과 비밀번호를 입력하세요":"メールとパスワードを入力してください","이미 등록된 이메일입니다":"既に登録済みのメールです","자동 로그인 (끄면 다음 실행 때 로그아웃 상태로 시작)":"自動ログイン（オフで次回ログアウト状態から開始）","자동 로그인 (다음 실행 시 자동으로 로그인)":"自動ログイン（次回起動時に自動ログイン）","잘못된 키 형식입니다":"キーの形式が正しくありません","지금 동기화":"今すぐ同期"," (은행)":" (銀行)","② 미리보기":"② プレビュー","가져오기 (":"取込 (","건)":"件)","건) — ":"件) — ","건의 거래내역이 달력에 추가되었습니다.":"件の取引明細がカレンダーに追加されました。","기준날짜 기준으로 잔액 역산":"基準日から残高を逆算","당근거래 ":"中古取引 ","메모 (입출금 내역에 표시됩니다)":"メモ（入出金明細に表示されます）","반복거래 ":"繰返取引 ","원본 적요: ":"元の摘要: ","원본: ":"元: ","토스뱅크":"トスバンク","🏦 은행 연동 키워드 ":"🏦 銀行連携キーワード ","🏧 은행":"🏧 銀行","📦 가져오기 기록 (":"📦 取込履歴 (","🔄 반복거래 (":"🔄 繰返取引 (","🥕 당근거래 (1회성, ":"🥕 中古取引 (1回性, ","🥕 당근거래 — 1회성 (":"🥕 中古取引 — 1回性 (","일정 공유 (.ics)":"予定を共有 (.ics)","일정 받기 (.ics)":"予定を取込 (.ics)","일정을 .ics 파일로 내보내 카톡·메일로 공유":"予定を.icsで書き出しチャット・メールで共有",".ics 파일에서 일정 가져오기 (중복 제외)":".icsファイルから予定を取込（重複除外）","내보낼 일정이 없습니다.":"書き出す予定がありません。","개 일정을 가져왔습니다.":"件の予定を取り込みました。","개 중복 제외":"件の重複を除外","올바른 일정 파일(.ics)이 아닙니다.":"正しい予定ファイル(.ics)ではありません。","나":"自分","날짜와 제목을 입력하세요.":"日付とタイトルを入力してください。","내 달력에 복사":"自分のカレンダーにコピー","내 달력에 복사했습니다.":"自分のカレンダーにコピーしました。","내 팀":"マイチーム","멤버":"メンバー","명":"名","복사":"コピー","뷰어":"閲覧者","소유자는 팀을 삭제해야 나갈 수 있습니다.":"オーナーはチームを削除しないと退出できません。","소유자만 할 수 있습니다.":"オーナーのみ可能です。","아직 팀이 없습니다.":"まだチームがありません。","이 멤버를 내보낼까요?":"このメンバーを外しますか？","이 팀에서 나갈까요?":"このチームから退出しますか？","일정 제목":"予定タイトル","재발급":"再発行","참여":"参加","참여 코드":"参加コード","참여 코드 6자리":"参加コード6桁","참여 코드가 올바르지 않습니다.":"参加コードが正しくありません。","추가":"追加","코드로 참여":"コードで参加","코드를 복사했습니다.":"コードをコピーしました。","클라우드가 설정되지 않았습니다.":"クラウドが設定されていません。","팀 공유는 로그인이 필요합니다. 먼저 상단의 동기화 버튼에서 로그인하세요.":"チーム共有にはログインが必要です。まず上部の同期ボタンからログインしてください。","팀 나가기":"チームを退出","팀 달력":"チームカレンダー","팀 만들기":"チーム作成","팀 목록":"チーム一覧","팀 삭제":"チーム削除","팀 이름 (예: 마케팅팀)":"チーム名（例: マーケティング）","팀 이름을 입력하세요.":"チーム名を入力してください。","팀 일정":"チーム予定","팀 일정이 없습니다.":"チーム予定がありません。","팀을 만들려면 라이선스가 필요합니다.":"チーム作成にはライセンスが必要です。","팀을 삭제하면 모든 팀 일정이 사라집니다. 삭제할까요?":"チームを削除すると全ての予定が消えます。削除しますか？","편집자":"編集者","회사·팀원과 일정을 공유합니다":"会社・チームと予定を共有します","소유자":"オーナー","지역 변경":"地域を変更","표 크기 선택":"表のサイズを選択","끝으로 갈수록 칸이 늘어납니다":"端に近づくとマスが増えます","팀 달력 보기":"チームカレンダー表示","개인 달력 보기":"個人カレンダー表示","보기 전용입니다 (편집 권한 없음)":"閲覧のみ（編集権限なし）","이 날 일정 공유":"この日の予定を共有","일정 없음":"予定なし","이미지 복사":"画像をコピー","텍스트 복사":"テキストをコピー","이미지 복사됨! 카톡에 붙여넣기(Ctrl+V)":"画像をコピー！貼り付け(Ctrl+V)","텍스트 복사됨! 카톡에 붙여넣기(Ctrl+V)":"テキストをコピー！貼り付け(Ctrl+V)","이미지 복사 실패 — 텍스트로 시도하세요":"画像コピー失敗 — テキストでお試しを","복사 실패":"コピー失敗","팀 달력만 사용":"チームカレンダーのみ使用","개인 달력 없이 팀 달력으로 시작합니다 (회사용)":"個人カレンダーなしでチームカレンダーで開始（会社用）","팀 보기 시 팀 선택 창 표시":"チーム表示時にチーム選択画面を表示","여러 팀을 자주 바꿀 때 켜세요. 끄면 마지막 팀을 바로 엽니다":"複数チームを頻繁に切り替える場合オン。オフで最後のチームを直接開く","팀 선택":"チーム選択","팀 전환":"チーム切替","👥 팀 이름":"👥 チーム名","진행중":"進行中","개":"件","년":"年","목록":"一覧","새 메모":"新規メモ","메모 키보드 조작":"メモのキーボード操作","입력칸: ESC 후 1.5초 내 Backspace → 목록 · 목록: ↑↓ 선택, Ctrl+→ 열기, Ctrl+← 나가기":"入力: ESC後1.5秒以内にBackspace → 一覧 · 一覧: ↑↓選択, Ctrl+→開く, Ctrl+←戻る","입력: Ctrl+← 또는 ESC후 Backspace → 목록 · 목록: ↑↓ 선택, → 열기, ← 접기, Enter 편집":"入力: Ctrl+← またはESC後Backspace → 一覧 · 一覧: ↑↓選択, →開く, ←閉じる, Enter編集","테마":"テーマ","(무료)":"(無料)","부산 갈매기":"釜山カモメ","정글 악어":"ジャングルワニ","팀 관리":"チーム管理","이 달 일정 공유":"今月の予定を共有","일정 공유":"予定を共有","엑셀로 내보내기":"Excelに書き出し","엑셀 파일을 저장했습니다":"Excelファイルを保存しました","% 표시":"% 表示","(1초 길게 누르면 📌 피드백 메모)":"(1秒長押しで📌フィードバックメモ)","(1초 이상 올리면 설명)":"(1秒以上ホバーで説明)","(service key 아님)":"(service keyではない)","(변경 시 추가)":"(変更時に追加)","(선택)":"(任意)","(클릭 수정)":"(クリックで編集)","+ 대출":"+ ローン","+ 적금·펀드":"+ 積立・ファンド",".xlsx 파일 지원":".xlsxファイル対応","2026년 5월":"2026年5月","2글자":"2文字","CSV로 내보내기 (Excel에서 열기 가능)":"CSVで書き出し（Excelで開けます）","D-Day 창의 대출·적금 추가 버튼 모양을 고릅니다":"D-Day欄のローン・積立追加ボタンの形を選びます","Do! 리스트":"Do! リスト","Do! 리스트 — 할 일을 적어두고 달력 날짜로 드래그":"Do! リスト — タスクを書いてカレンダーへドラッグ","JSON 파일로 데이터 가져오기":"JSONファイルからデータを取り込み","anon (공개키)":"anon（公開キー）","service_role(비밀키)는 절대 사용 금지.":"service_role（秘密キー）は絶対に使用禁止。","v66: React 에러 발생":"v66: Reactエラー発生","• KB국민은행, 신한은행 등 — 추후 지원 예정":"• KB国民銀行、新韓銀行など — 今後対応予定","• 토스뱅크 — 엑셀 거래내역 (.xlsx)":"• トスバンク — Excel取引明細（.xlsx）","※ 간단한 화면 잠금용입니다. 비밀번호를 잊으면 로그아웃(초기화) 후 다시 로그인해야 합니다.":"※ 簡易画面ロック用です。パスワードを忘れた場合はログアウト（初期化）後に再ログインが必要です。","※ 월주는 양력 근사 계산 (절기 미반영)":"※ 月柱は太陽暦の近似計算（節気は未反映）","→ 다른 날짜 또는 같은 날 일정 위에 놓기(순서 변경)":"→ 別の日、または同じ日の予定の上に置く（並べ替え）","→ 역산 금리":"→ 逆算金利","⏩ 배속":"⏩ 速度","▲ 입금":"▲ 入金","▼ 출금":"▼ 出金","☀️ 양력":"☀️ 太陽暦","☀️ 양력 기준":"☀️ 太陽暦基準","☑ 할 일":"☑ タスク","⚡ 상극: 목↔토 화↔금 토↔수 금↔목 수↔화":"⚡ 相剋: 木↔土 火↔金 土↔水 金↔木 水↔火","✓ 금리가 적용되었습니다. 저장하려면 대출 수정에서 저장하세요.":"✓ 金利が適用されました。保存するにはローン編集で保存してください。","✓ 지원 형식":"✓ 対応形式","✕ 초기화":"✕ リセット","⭐ D-Day 창":"⭐ D-Day欄","「곡 추가하기」를 눌러 노래를 추가하세요":"「曲を追加」を押して曲を追加してください","가계부":"家計簿","가계부 열기":"家計簿を開く","가나다":"あいう","가져오기":"取込","가져오기 완료!":"取込完了！","가져온 은행 거래내역이 없습니다.":"取り込んだ銀行取引明細がありません。","거래 분류 수정":"取引分類の編集","거래 종류별 이름 / 카테고리 / 색상 설정 (다음 가져오기에도 자동 적용됩니다)":"取引種別ごとの名前／カテゴリ／色を設定（次回取込にも自動適用）","거치기간 (개월)":"据置期間（ヶ月）","건너뛰기":"スキップ","검색 결과 없음":"検索結果なし","검색어 입력 또는 색상 필터 선택":"検索語を入力、または色フィルターを選択","경과 기간별 알림 임계값":"経過期間別の通知しきい値","경과 일수 이상이면 해당 색상·아이콘으로 표시됩니다.":"経過日数を超えると、その色・アイコンで表示されます。","계산 기록":"計算履歴","계산기":"電卓","계산상 납입금":"計算上の返済額","계좌 가져오기":"口座取込","국가":"国","권장: 32×32 ~ 64×64 픽셀, PNG(투명 배경) — 최대 100KB":"推奨: 32×32〜64×64ピクセル、PNG（透明背景）— 最大100KB","글씨 색상":"文字色","글씨 크기 (앱 전체)":"文字サイズ（アプリ全体）","글씨체":"フォント","금리":"金利","금리 변경 이력":"金利変更履歴","금리 이력 없음":"金利履歴なし","금액":"金額","금액 (선택)":"金額（任意）","금액 유형":"金額タイプ","금액 입력 (원)":"金額入力（ウォン）","금액 입력 시 금리가 자동 계산됩니다":"金額を入力すると金利が自動計算されます","금액·기간·금리를 입력하면 납입 스케줄이 표시됩니다.":"金額・期間・金利を入力すると返済スケジュールが表示されます。","기간 (개월)":"期間（ヶ月）","기간별 색상:":"期間別の色:","기념일":"記念日","기념일 · 반복일정":"記念日・繰返予定","기념일 이름 (예: 아내 생일)":"記念日の名前（例: 妻の誕生日）","기록 없음":"記録なし","기본값":"既定値","기존 금리":"現在の金利","기준날짜":"基準日","기준잔액 (원)":"基準残高（ウォン）","기준잔액 직접 설정":"基準残高を手動設定","나중에":"あとで","날씨 불러오는 중...":"天気を読み込み中...","날씨 정보를 불러올 수 없습니다 (인터넷 확인)":"天気情報を取得できません（インターネットを確認）","날짜":"日付","날짜 범위 필터":"日付範囲フィルター","납부일":"支払日","납입":"入金","납입 월":"入金月","납입금":"入金額","납입기간 (개월)":"積立期間（ヶ月）","납입액":"積立額","납입액·기간·이율을 입력하면 예상 결과가 표시됩니다.":"積立額・期間・利率を入力すると予想結果が表示されます。","납입일":"積立日","내보내기":"書出","내역":"明細","내역 없음":"明細なし","내용":"内容","네이버페이충전 +100,000":"NaverPayチャージ +100,000","년도":"年","누적액":"累計額","다운로드":"ダウンロード","닫기":"閉じる","달력":"カレンダー","달력 글씨 크기":"カレンダー文字サイズ","달력 버튼 단축키":"カレンダーボタンのショートカット","달력 색상":"カレンダーの色","달력 작게":"カレンダーを縮小","달력 크게 (창보다 커지면 스크롤로 봅니다)":"カレンダーを拡大（ウィンドウより大きい時はスクロール）","달력 표시 설정":"カレンダー表示設定","달력의 각 일정 오른쪽에 삭제 버튼이 생깁니다":"各予定の右側に削除ボタンが表示されます","달력이 분리 중입니다":"カレンダーを分離中","대출 / 적금·펀드":"ローン / 積立・ファンド","대출 시작일":"ローン開始日","대출 연결 (선택)":"ローンと連携（任意）","대출 이름":"ローン名","대출 추가":"ローン追加","대출·적금 추가 버튼 표시":"ローン・積立追加ボタンの表示","대출금액 (원)":"ローン金額（ウォン）","대출납입":"ローン返済","데이터를 JSON 파일로 내보내기":"データをJSONファイルに書き出し","도시":"都市","드래그로 입력칸 크기 조절":"ドラッグで入力欄のサイズ調整","드래그하여 창 크기 조절":"ドラッグでウィンドウのサイズ調整","등록된 대출 / 적금·펀드가 없습니다":"登録されたローン／積立がありません","라이선스 키 (구매 시 전달)":"ライセンスキー（購入時にお渡し）","로 저장됩니다":"として保存されます","로그아웃":"ログアウト","로그인됨":"ログイン済み","리셋":"リセット","만기 수령액":"満期受取額","만기 예상액":"満期予想額","만들기":"作成","맞춤":"フィット","매년 반복 (생일 등)":"毎年繰返（誕生日など）","매월 납부하는 날 (비우면 시작일 기준)":"毎月の支払日（空欄なら開始日基準）","매월 납입하는 날 (비우면 시작일 기준)":"毎月の積立日（空欄なら開始日基準）","메뉴":"メニュー","메모 (선택)":"メモ（任意）","메모 1":"メモ 1","메모 2":"メモ 2","메모 3":"メモ 3","메모 4":"メモ 4","메모 5":"メモ 5","메모가 없습니다":"メモがありません","모든 데이터 초기화":"全データを初期化","미리보기":"プレビュー","미완료 할 일":"未完了タスク","반복":"繰返","반복 O":"繰返 ✓","반복 X":"繰返 ✗","반복 일정":"繰返予定","배경색":"背景色","배경화면":"壁紙","분 후":"分後","분석하기 ✨":"分析する ✨","비밀번호":"パスワード","비밀번호 (6자 이상)":"パスワード（6文字以上）","비밀번호 입력":"パスワード入力","비밀번호 확인":"パスワード確認","비밀번호가 올바르지 않습니다":"パスワードが正しくありません","비활성 타이머":"待機タイマー","빨간색":"赤","사생활 모드":"プライバシーモード","사용자 지정 색상":"カスタム色","사주팔자 (四柱八字)":"四柱推命（四柱八字）","삭제":"削除","상단 버튼 크기":"上部ボタンのサイズ","상세보기 (전체 D-Day 목록)":"詳細（D-Day全一覧）","새 폴더 이름 입력 후 Enter":"新規フォルダ名を入力してEnter","색상":"色","색상 선택":"色を選択","색상:":"色:","생년월일시를 입력하면 사주팔자와 음양오행을 분석합니다":"生年月日時を入力すると四柱推命と陰陽五行を分析します","생년월일을 입력하고 분석하기를 눌러주세요":"生年月日を入力して分析するを押してください","선택 안함":"なし","선택한 월에 거래 없음":"選択した月に取引なし","설정":"設定","성을 포함한 한글 이름을 두 글자 이상 입력하세요":"姓を含むハングル氏名を2文字以上入力してください","소리오행 흐름":"音の五行の流れ","수기납입 → 금리 자동계산":"手入力返済 → 金利自動計算","수정":"編集","순서 변경 중 — 빈 곳 클릭 시 종료":"並べ替え中 — 空白をクリックで終了","순서 변경 중 — 빈 곳 클릭하면 종료":"並べ替え中 — 空白をクリックで終了","순수지":"純収支","숨기기":"非表示","숫자 키로 입력 — shift 모드 (예: 2026 입력 후 2 누르면 0262)":"数字キーで入力 — shiftモード（例: 2026入力後に2で0262）","시간 미입력 시 시주 생략":"時刻未入力の場合は時柱を省略","시작 일수":"開始日数","시작일":"開始日","실제 납입금액 (원)":"実際の返済額（ウォン）","실제 납입한 금액을 입력하면 해당 달의 금리를 역산해서 그 이후 납입 스케줄을 다시 계산합니다.":"実際に返済した額を入力すると、その月の金利を逆算し、以降のスケジュールを再計算します。","아이콘":"アイコン","알림 아이콘 이미지":"通知アイコン画像","언어":"言語","없음":"なし","엑셀 원본 잔액":"Excel元の残高","엑셀 파일을 여기에 드롭하거나 클릭하여 선택":"Excelファイルをここにドロップ、またはクリックで選択","역산 결과":"逆算結果","역산 금리":"逆算金利","연결 안 함":"連携しない","연도":"年","예: 1,000,000":"例: 1,000,000","예: 1,520,000":"例: 1,520,000","예: 10, 6, 12":"例: 10, 6, 12","예: 12":"例: 12","예: SKT, 카드연회비, 통신비...":"例: SKT、カード年会費、通信費...","예: 洪吉童":"例: 洪吉童","예: 홍길동":"例: 홍길동","예상 이자":"予想利息","오늘로":"今日に","오디오 URL 또는 YouTube 링크":"オーディオURLまたはYouTubeリンク","오른쪽에 고정":"右に固定","오른쪽으로":"右へ","오행 분포 (陰陽五行)":"五行の分布（陰陽五行）","오행 상생·상극 (五行相生相剋)":"五行の相生・相剋（五行相生相剋）","올해로":"今年に","완료":"完了","완료 시간":"完了時刻","완료 항목 삭제":"完了項目を削除","완료 항목 전체 삭제":"完了項目をすべて削除","완료한 일":"完了したタスク","완료한 할 일이 없습니다":"完了したタスクがありません","왼쪽에 고정":"左に固定","왼쪽으로":"左へ","운세":"占い","원금":"元金","월":"月","월 납입액 (원)":"月額積立（ウォン）","유형":"タイプ","유효한 금액을 입력해주세요":"有効な金額を入力してください","은행":"銀行","은행 거래내역 가져오기":"銀行取引明細を取り込み","은행 거래내역 가져오기에서 이 키워드와 일치하는 항목이 있으면, 같은 달 이 반복일정을 자동으로 숨겨 중복을 방지합니다.":"銀行取引の取込でこのキーワードに一致する項目があれば、同じ月のこの繰返予定を自動的に隠して重複を防ぎます。","음양오행 이론 기반 · 재미로 보는 운세입니다 🙂":"陰陽五行理論に基づく・娯楽用の占いです 🙂","이 버전 알림 다시 보지 않기":"このバージョンの通知を再表示しない","이 색상의 용도 이름 — 이 창에서만 표시됩니다":"この色の用途名 — この画面のみ表示","이 색상의 용도 이름 입력 (최대 2글자)":"この色の用途名を入力（最大2文字）","이 시기엔 중요한 결정을 서두르지 마세요":"この時期は重要な決断を急がないでください","이 폴더에 넣을 곡 선택하기":"このフォルダに入れる曲を選択","이름 (한글, 성 포함)":"氏名（ハングル、姓を含む）","이메일":"メール","이미지 선택":"画像を選択","이미지 없음":"画像なし","이미지를 선택하면 배경으로 적용됩니다":"画像を選択すると背景に適用されます","이자":"利息","일":"日","일 이상":"日以上","일요일 색상 구분":"日曜を色分け","일정":"予定","일정 내용 미리보기":"予定内容のプレビュー","일정 삭제":"予定を削除","일정 시간 조작 없으면 화면이 투명해집니다":"一定時間操作がないと画面が透明になります","일정, 메모, D-Day 검색...":"予定・メモ・D-Dayを検索...","일정으로":"予定に","입금":"入金","입력칸을 클릭한 뒤 원하는 키(조합키 가능: Ctrl/Alt/Shift+키)를 누르면 저장됩니다. Backspace로 삭제. 달력 창이 열려 있을 때 작동하며, 글자 입력 중에는 무시됩니다.":"入力欄をクリックしてキー（Ctrl/Alt/Shift+キーの組合せ可）を押すと保存。Backspaceで削除。カレンダーが開いている時に動作し、文字入力中は無視されます。","작성 시간":"作成時刻","잔액":"残高","잔액 표시 기준":"残高表示の基準","잠금 비밀번호":"ロックパスワード","잠금 해제":"ロック解除","잠금화면 배경":"ロック画面の背景","재생바":"プレーヤー","재생바 접기 (1:재생바 숨김 → 2:배속 숨김 → 3:최소 → 4:전체)":"プレーヤーを折りたたむ（1:バー非表示→2:速度非表示→3:最小→4:全体）","저사양 PC에서는 꺼두는 것을 권장합니다":"低スペックPCではオフを推奨します","저장":"保存","저장하고 로그인":"保存してログイン","저장하면 같은 원본 적요의 기존 이벤트도 모두 업데이트됩니다.":"保存すると同じ元摘要の既存イベントもすべて更新されます。","적금 · 펀드":"積立・ファンド","적금·펀드 추가":"積立・ファンド追加","적금납입":"積立入金","적요":"摘要","전체":"全体","전체 삭제":"全て削除","제목 (URL 입력 후 자동 완성)":"タイトル（URL入力後に自動補完）","종료일":"終了日","주황":"オレンジ","중복 (체크로 강제 추가)":"重複（チェックで強制追加）","중요한 약속·새 시작에 좋은 날입니다":"重要な約束や新しい始まりに良い日です","지남":"経過","지우기":"消去","직접 조절":"手動調整","진행중인 일":"進行中","진행중인 할 일이 없습니다":"進行中のタスクがありません","창 배경 투명도":"ウィンドウ背景の透明度","창 열기":"ウィンドウを開く","찾기":"検索","철학관 원리 기반 · 재미로 보는 사주입니다 🙏":"四柱の原理に基づく・娯楽用の占いです 🙏","초기화":"リセット","총 납입액":"総積立額","최근 6년 연별 요약":"直近6年の年別サマリー","출금":"出金","출금 내역 없음":"出金明細なし","출금 합계":"出金合計","취소":"キャンセル","카테고리":"カテゴリ","커스텀 색상":"カスタム色","클릭 즉시 저장 | 엑셀 복붙 지원":"クリックで即保存 | Excel貼付対応","클릭 후 키 입력":"クリック後にキー入力","태어난 시간 (선택 — 시주 계산에 사용)":"生まれた時刻（任意 — 時柱の計算に使用）","탭 삭제":"タブ削除","토요일 색상 구분":"土曜を色分け","투명도":"透明度","파란색":"青","팝업으로":"ポップアップに","패널 내용 영역 미리보기":"パネル内容領域のプレビュー","패널 미리보기":"パネルプレビュー","패널 배경 기준색":"パネル背景の基準色","패널 배경 투명도":"パネル背景の透明度","패널 배경색 기준":"パネル背景色の基準","패널 투명도 / 색상":"パネルの透明度／色","폴더 만들기 — 곡 목록에서 각 곡의 폴더를 지정할 수 있습니다":"フォルダ作成 — 曲一覧で各曲のフォルダを指定できます","폴더 지정":"フォルダ指定","표 삽입":"表を挿入","표시 방식":"表示方式","표시 설정":"表示設定","표시 위치":"表示位置","표시 이름":"表示名","피드백 등록!":"フィードバック登録！","피드백 메모 등록":"フィードバックメモ登録","피드백 알림에 쓸 이미지를 직접 올릴 수 있습니다.":"フィードバック通知用の画像を自分でアップロードできます。","한자 표기 (선택)":"漢字表記（任意）","한자 획수 (선택 — 글자별 획수를 쉼표로. 비우면 한글 획수로 계산)":"漢字の画数（任意 — 文字ごとにカンマ区切り。空欄ならハングル画数で計算）","할 일":"タスク","할 일 입력 후 Enter":"タスクを入力してEnter","할 일을 입력해 블록을 만들고, 클릭해서 체크한 뒤 달력 날짜로 드래그하세요. 체크된 블록이 한꺼번에 들어갑니다.":"タスクを入力してブロックを作り、クリックでチェックしてカレンダーへドラッグ。チェックしたブロックがまとめて入ります。","합계":"合計","항목":"項目","항목이 없습니다":"項目がありません","행운 색":"ラッキーカラー","행운 숫자":"ラッキーナンバー","현재":"現在","현재 금리":"現在の金利","현재 적용중":"現在適用中","현재 표시 년월":"表示中の年月","화면에 맞추기":"画面に合わせる","화면이 잠겨 있습니다":"画面がロックされています","활성 피드백이 없습니다.":"アクティブなフィードバックがありません。","🌙 음력":"🌙 旧暦","🌙 입력한 날짜를 음력으로 저장합니다.":"🌙 入力した日付を旧暦で保存します。","🎵 음악":"🎵 音楽","🎵 재생바":"🎵 プレーヤー","🎵 재생바 창":"🎵 プレーヤー画面","🏦 대출":"🏦 ローン","🏦 대출 추가":"🏦 ローン追加","💰 가계부":"💰 家計簿","💰 입출금 현황":"💰 入出金状況","📅 달력":"📅 カレンダー","📅 달력 패널":"📅 カレンダーパネル","📅 헤더":"📅 ヘッダー","📈 적금":"📈 積立","📈 적금·펀드 추가":"📈 積立・ファンド追加","📊 출금 분석":"📊 出金分析","📋 상세 정보":"📋 詳細情報","📋 할 일 목록":"📋 タスク一覧","📜 사주와 이름의 궁합":"📜 四柱と名前の相性","📜 원장 종합 분석 — 오행 생극(生剋)으로 본 오늘":"📜 総合鑑定 — 五行の生剋で見る今日","📝 내용":"📝 内容","📝 메모":"📝 メモ","📥 내보내기":"📥 書き出し","🔄 상생: 목→화→토→금→수→목":"🔄 相生: 木→火→土→金→水→木","🔐 지금 잠그기":"🔐 今すぐロック","🔢 계산기":"🔢 電卓","🔢 계산기 창":"🔢 電卓画面","🔢 날짜":"🔢 日付","🔮 운세":"🔮 占い","🔮 운세 창":"🔮 占い画面","🔮 운세·사주":"🔮 占い・四柱","🖊️ 수기납입 입력 → 금리 자동계산":"🖊️ 手入力返済 → 金利自動計算"},
    zh: {"월 이동":"跳转月份","날짜 클릭 · 0.5초 누르고 드래그로 여러 개 · 다른 달로 옮겨도 유지":"点击日期 · 长按0.5秒拖动多选 · 跨月保留","이미지로 내보내기":"导出为图片","텍스트로 내보내기":"导出为文本","ics로 내보내기":"导出为ics","달력에서 날짜를 클릭해 선택하세요":"在日历上点击日期选择","달력에서 날짜 클릭 · ":"在日历上点击日期 · "," 선택됨":" 已选","월·날짜를 골라 이미지·표·ics로 공유":"选择月份和日期，以图片/表格/ics分享","일정 공유 — 월 선택":"分享日程 — 选择月份","월을 고르면 그 달로 이동, 날짜를 눌러 선택하세요":"选择月份后点击日期选择","일 선택됨":"天已选","일 · 공유 형식":"天 · 格式","텍스트(표) 복사":"复制文本(表格)","파일 저장":"保存文件","표 복사됨! 엑셀에 붙여넣기(Ctrl+V)":"表格已复制！粘贴到Excel(Ctrl+V)","ics 파일을 저장했습니다":"已保存ics文件","패널 캐릭터 스킨":"面板角色皮肤","이전 내 배경으로 되돌리기":"恢复我之前的背景","이 색 일정":"此颜色的日程","날짜 ↑":"日期 ↑","날짜 ↓":"日期 ↓","이름 ↑":"名称 ↑","이름 ↓":"名称 ↓","해당 색 일정이 없습니다":"没有此颜色的日程","보기 방식 (캐러셀/기본)":"显示方式（轮播/基础）","←→ 칸 이동 · Enter 들어가기 · 안에서 ↑↓ 이동 · → 펼치기 · ← 접기 · Esc 뒤로":"←→ 移动列 · Enter 进入 · 内部 ↑↓ 移动 · → 展开 · ← 收起 · Esc 返回","크기 조절":"调整大小","(빈 메모)":"(空备忘录)","텍스트 필터":"文本筛选","색깔 필터":"颜色筛选","메모 내용 검색":"搜索备忘录内容","필터 초기화":"重置筛选","↑↓ 이동 · → 펼치기 · ← 접기 · Enter 편집 · Esc 뒤로":"↑↓ 移动 · → 展开 · ← 收起 · Enter 编辑 · Esc 返回","메모 상세":"备忘录总览","Tab으로 메모 이동":"用Tab在备忘录间切换","체크한 메모끼리 Tab 키로 이동. 각 메모 제목줄의 체크박스로 선택":"Tab仅在勾选的备忘录间切换。用各备忘录标题栏的复选框选择。","Tab 이동에 포함":"加入Tab切换","달력 헤더 버튼 표시":"日历标题栏按钮","사생활 잠금":"隐私锁","상세보기":"详细视图","팀":"团队","다운로드 링크가 아직 준비되지 않았습니다. 관리자에게 문의하세요.":"下载链接尚未准备好。请联系管理员。","정규 좌석":"正式席位","보기 전용(무료)":"仅查看(免费)","최하 등급(5)은 보기 전용·무료로 고정됩니다.":"最低等级(5)固定为仅查看且免费。","단계":"级","이름":"名称","공유":"分享","관리":"管理","등급 설정":"等级设置","등급 설정 저장":"保存等级","등급 설정을 저장했습니다.":"已保存等级设置。","숫자 낮을수록 권한 높음. 소유자는 항상 전권입니다.":"数字越小权限越高。所有者始终拥有全部权限。","공유 권한이 없습니다.":"没有分享权限。","권한이 없습니다.":"没有权限。","잘못된 등급입니다.":"无效等级。","소유자 등급은 바꿀 수 없습니다.":"无法更改所有者等级。","설정 형식이 올바르지 않습니다.":"设置格式无效。","올리는 중…":"上传中…","이미지":"图片","제거":"移除","이미지 공지 10캐시 차감":"图片公告：扣10现金","캐시":"现金","캐시가 부족합니다.":"现金不足。","필요":"需要","이미지는 5MB 이하만 가능합니다.":"图片需5MB以内。","팀 멤버가 아닙니다.":"你不是团队成员。","금액이 올바르지 않습니다.":"金额无效。","공지":"公告","팀 공지":"团队公告","공지 올리기":"发布公告","팀원에게 보낼 공지를 입력하세요":"输入给团队的公告","등록된 공지가 없습니다.":"暂无公告。","공지 내용을 입력하세요.":"请输入公告内容。","이 공지를 삭제할까요?":"删除此公告？","다음에 이 창을 띄우지 않습니다":"下次不再显示","확인":"确定","공지를 올릴 권한이 없습니다.":"你没有发布公告的权限。","내용이 비어 있습니다.":"内容为空。","미완료":"未完成","건":"笔","숨김":"隐藏","💰입금":"💰收入","💸출금":"💸支出","완료 시각":"完成时刻","완료 숨기기":"隐藏已完成","메모":"备注","오늘":"今天","동기화":"同步","탭 추가":"添加标签","창 추가":"添加窗口","✏️ 입력":"✏️ 输入","거치식":"宽限式","달력 보기":"显示日历","달력 숨기기":"隐藏日历","대기 중":"等待中","동기화 오류":"同步错误","동기화 중...":"同步中...","드래그해서 순서 변경":"拖动重新排序","로그인":"登录","마이너스통장":"透支账户","만기일시":"到期一次性","매년":"每年","매월":"每月","매일":"每天","매주":"每周","미완료":"未完成","원금균등":"等额本金","원리금균등":"等额本息","저장하기":"保存","처리 중...":"处理中...","추가하기":"添加","회원가입":"注册","💹 펀드":"💹 基金","📊 미리보기":"📊 预览","● 기타(1회성)":"● 其他(一次性)","건수":"笔数","기간":"期间","기타(1회성)":"其他(一次性)","비율(%)":"比例(%)","입금 합계":"收入合计","제목":"标题","총 건수":"总笔数","출금 합계":"支出合计"," 입력 (API key 아님)":" 输入 (非API key)","Supabase 대시보드 → Settings → API →":"Supabase 仪表板 → Settings → API →","Supabase 미설정":"Supabase 未设置","Supabase 설정 변경":"更改 Supabase 设置","Supabase 설정의 anon 키를 확인하세요 (service key 사용 불가)":"请检查 Supabase 设置中的 anon 密钥（不可使用 service key）","Supabase가 설정되지 않았습니다":"Supabase 未配置","☁ 동기화 상태":"☁ 同步状态","☁ 클라우드 동기화 설정":"☁ 云同步设置","☁ 클라우드 로그인":"☁ 云登录","⚠ service_role 키입니다. anon 키를 입력하세요.":"⚠ 这是 service_role 密钥。请输入 anon 密钥。","가입 완료! 이메일 인증 후 로그인하세요.":"注册完成！请验证邮箱后登录。","동기화 중":"同步中","동기화됨":"已同步","라이선스 키가 유효하지 않습니다. 클라우드 동기화가 제한됩니다.":"许可证密钥无效。云同步受限。","라이선스 키를 입력하세요 (구매 시 전달됩니다)":"请输入许可证密钥（购买时提供）","로그인 필요":"需要登录","를 복사하세요.":" 复制它。","마지막 동기화":"上次同步","비밀번호가 일치하지 않습니다":"密码不一致","비밀번호는 6자 이상이어야 합니다":"密码需6位以上","아이디(이메일) 저장":"保存账号(邮箱)","에서 무료 계정 생성 후 키를 복사하세요":"在此创建免费账户并复制密钥","이메일 + ":"邮箱 + ","이메일 또는 비밀번호가 틀렸습니다":"邮箱或密码错误","이메일 인증이 필요합니다. 메일함을 확인하세요":"需要邮箱验证。请查看收件箱","이메일과 비밀번호를 입력하세요":"请输入邮箱和密码","이미 등록된 이메일입니다":"该邮箱已注册","자동 로그인 (끄면 다음 실행 때 로그아웃 상태로 시작)":"自动登录（关闭则下次以登出状态启动）","자동 로그인 (다음 실행 시 자동으로 로그인)":"自动登录（下次运行时自动登录）","잘못된 키 형식입니다":"密钥格式无效","지금 동기화":"立即同步"," (은행)":" (银行)","② 미리보기":"② 预览","가져오기 (":"导入 (","건)":"笔)","건) — ":"笔) — ","건의 거래내역이 달력에 추가되었습니다.":"笔交易明细已添加到日历。","기준날짜 기준으로 잔액 역산":"以基准日期反推余额","당근거래 ":"二手交易 ","메모 (입출금 내역에 표시됩니다)":"备注（显示在收支明细中）","반복거래 ":"重复交易 ","원본 적요: ":"原始摘要: ","원본: ":"原始: ","토스뱅크":"Toss银行","🏦 은행 연동 키워드 ":"🏦 银行关联关键词 ","🏧 은행":"🏧 银行","📦 가져오기 기록 (":"📦 导入记录 (","🔄 반복거래 (":"🔄 重复交易 (","🥕 당근거래 (1회성, ":"🥕 二手交易 (一次性, ","🥕 당근거래 — 1회성 (":"🥕 二手交易 — 一次性 (","일정 공유 (.ics)":"共享日程 (.ics)","일정 받기 (.ics)":"导入日程 (.ics)","일정을 .ics 파일로 내보내 카톡·메일로 공유":"将日程导出为.ics，通过聊天/邮件分享",".ics 파일에서 일정 가져오기 (중복 제외)":"从.ics文件导入日程（跳过重复）","내보낼 일정이 없습니다.":"没有可导出的日程。","개 일정을 가져왔습니다.":"个日程已导入。","개 중복 제외":"个重复已跳过","올바른 일정 파일(.ics)이 아닙니다.":"不是有效的日程文件(.ics)。","나":"我","날짜와 제목을 입력하세요.":"请输入日期和标题。","내 달력에 복사":"复制到我的日历","내 달력에 복사했습니다.":"已复制到我的日历。","내 팀":"我的团队","멤버":"成员","명":"人","복사":"复制","뷰어":"查看者","소유자는 팀을 삭제해야 나갈 수 있습니다.":"所有者需删除团队才能退出。","소유자만 할 수 있습니다.":"仅所有者可操作。","아직 팀이 없습니다.":"还没有团队。","이 멤버를 내보낼까요?":"移除该成员？","이 팀에서 나갈까요?":"退出该团队？","일정 제목":"日程标题","재발급":"重新生成","참여":"加入","참여 코드":"加入码","참여 코드 6자리":"6位加入码","참여 코드가 올바르지 않습니다.":"加入码不正确。","추가":"添加","코드로 참여":"用码加入","코드를 복사했습니다.":"已复制加入码。","클라우드가 설정되지 않았습니다.":"云端未配置。","팀 공유는 로그인이 필요합니다. 먼저 상단의 동기화 버튼에서 로그인하세요.":"团队共享需要登录。请先通过顶部的同步按钮登录。","팀 나가기":"退出团队","팀 달력":"团队日历","팀 만들기":"创建团队","팀 목록":"团队列表","팀 삭제":"删除团队","팀 이름 (예: 마케팅팀)":"团队名称（例: 市场部）","팀 이름을 입력하세요.":"请输入团队名称。","팀 일정":"团队日程","팀 일정이 없습니다.":"没有团队日程。","팀을 만들려면 라이선스가 필요합니다.":"创建团队需要许可证。","팀을 삭제하면 모든 팀 일정이 사라집니다. 삭제할까요?":"删除团队将清除所有团队日程。要删除吗？","편집자":"编辑者","회사·팀원과 일정을 공유합니다":"与公司/团队共享日程","소유자":"所有者","지역 변경":"更改地区","표 크기 선택":"选择表格大小","끝으로 갈수록 칸이 늘어납니다":"到达边缘时格子会增加","팀 달력 보기":"查看团队日历","개인 달력 보기":"查看个人日历","보기 전용입니다 (편집 권한 없음)":"仅查看（无编辑权限）","이 날 일정 공유":"分享当天日程","일정 없음":"无日程","이미지 복사":"复制图片","텍스트 복사":"复制文本","이미지 복사됨! 카톡에 붙여넣기(Ctrl+V)":"已复制图片！粘贴(Ctrl+V)","텍스트 복사됨! 카톡에 붙여넣기(Ctrl+V)":"已复制文本！粘贴(Ctrl+V)","이미지 복사 실패 — 텍스트로 시도하세요":"图片复制失败 — 请试试文本","복사 실패":"复制失败","팀 달력만 사용":"仅使用团队日历","개인 달력 없이 팀 달력으로 시작합니다 (회사용)":"不用个人日历，以团队日历启动（公司用）","팀 보기 시 팀 선택 창 표시":"切换到团队视图时显示团队选择","여러 팀을 자주 바꿀 때 켜세요. 끄면 마지막 팀을 바로 엽니다":"经常切换团队时开启。关闭则直接打开上次的团队","팀 선택":"选择团队","팀 전환":"切换团队","👥 팀 이름":"👥 团队名","진행중":"进行中","개":"个","년":"年","목록":"列表","새 메모":"新建备注","메모 키보드 조작":"备注键盘操作","입력칸: ESC 후 1.5초 내 Backspace → 목록 · 목록: ↑↓ 선택, Ctrl+→ 열기, Ctrl+← 나가기":"输入框: ESC后1.5秒内按Backspace → 列表 · 列表: ↑↓选择, Ctrl+→打开, Ctrl+←退出","입력: Ctrl+← 또는 ESC후 Backspace → 목록 · 목록: ↑↓ 선택, → 열기, ← 접기, Enter 편집":"输入: Ctrl+← 或 ESC后Backspace → 列表 · 列表: ↑↓选择, →打开, ←关闭, Enter编辑","테마":"主题","(무료)":"(免费)","부산 갈매기":"釜山海鸥","정글 악어":"丛林鳄鱼","팀 관리":"团队管理","이 달 일정 공유":"分享本月日程","일정 공유":"分享日程","엑셀로 내보내기":"导出到Excel","엑셀 파일을 저장했습니다":"已保存Excel文件","% 표시":"% 显示","(1초 길게 누르면 📌 피드백 메모)":"(长按1秒📌反馈备注)","(1초 이상 올리면 설명)":"(悬停1秒以上显示说明)","(service key 아님)":"(非service key)","(변경 시 추가)":"(变更时添加)","(선택)":"(可选)","(클릭 수정)":"(点击编辑)","+ 대출":"+ 贷款","+ 적금·펀드":"+ 存款·基金",".xlsx 파일 지원":"支持.xlsx文件","2026년 5월":"2026年5月","2글자":"2字","CSV로 내보내기 (Excel에서 열기 가능)":"导出CSV（可用Excel打开）","D-Day 창의 대출·적금 추가 버튼 모양을 고릅니다":"选择D-Day栏贷款·存款添加按钮的样式","Do! 리스트":"Do! 清单","Do! 리스트 — 할 일을 적어두고 달력 날짜로 드래그":"Do! 清单 — 记下待办并拖到日历日期","JSON 파일로 데이터 가져오기":"从JSON文件导入数据","anon (공개키)":"anon（公钥）","service_role(비밀키)는 절대 사용 금지.":"绝对禁止使用service_role（密钥）。","v66: React 에러 발생":"v66: 发生React错误","• KB국민은행, 신한은행 등 — 추후 지원 예정":"• KB国民银行、新韩银行等 — 后续支持","• 토스뱅크 — 엑셀 거래내역 (.xlsx)":"• Toss银行 — Excel交易明细（.xlsx）","※ 간단한 화면 잠금용입니다. 비밀번호를 잊으면 로그아웃(초기화) 후 다시 로그인해야 합니다.":"※ 用于简单锁屏。忘记密码需登出（重置）后重新登录。","※ 월주는 양력 근사 계산 (절기 미반영)":"※ 月柱为阳历近似计算（未含节气）","→ 다른 날짜 또는 같은 날 일정 위에 놓기(순서 변경)":"→ 放到其他日期或同一天的日程上（重新排序）","→ 역산 금리":"→ 反推利率","⏩ 배속":"⏩ 倍速","▲ 입금":"▲ 收入","▼ 출금":"▼ 支出","☀️ 양력":"☀️ 阳历","☀️ 양력 기준":"☀️ 阳历基准","☑ 할 일":"☑ 待办","⚡ 상극: 목↔토 화↔금 토↔수 금↔목 수↔화":"⚡ 相克: 木↔土 火↔金 土↔水 金↔木 水↔火","✓ 금리가 적용되었습니다. 저장하려면 대출 수정에서 저장하세요.":"✓ 利率已应用。如需保存请在编辑贷款中保存。","✓ 지원 형식":"✓ 支持格式","✕ 초기화":"✕ 重置","⭐ D-Day 창":"⭐ D-Day栏","「곡 추가하기」를 눌러 노래를 추가하세요":"点击「添加歌曲」来添加音乐","가계부":"记账本","가계부 열기":"打开记账本","가나다":"拼音","가져오기":"导入","가져오기 완료!":"导入完成！","가져온 은행 거래내역이 없습니다.":"没有已导入的银行交易明细。","거래 분류 수정":"编辑交易分类","거래 종류별 이름 / 카테고리 / 색상 설정 (다음 가져오기에도 자동 적용됩니다)":"按交易类型设置名称／类别／颜色（下次导入也自动应用）","거치기간 (개월)":"宽限期（月）","건너뛰기":"跳过","검색 결과 없음":"无搜索结果","검색어 입력 또는 색상 필터 선택":"输入搜索词或选择颜色筛选","경과 기간별 알림 임계값":"按经过天数的提醒阈值","경과 일수 이상이면 해당 색상·아이콘으로 표시됩니다.":"超过经过天数后以该颜色·图标显示。","계산 기록":"计算记录","계산기":"计算器","계산상 납입금":"计算的还款额","계좌 가져오기":"导入账户","국가":"国家","권장: 32×32 ~ 64×64 픽셀, PNG(투명 배경) — 최대 100KB":"推荐: 32×32~64×64像素、PNG（透明背景）— 最大100KB","글씨 색상":"文字颜色","글씨 크기 (앱 전체)":"字体大小（全应用）","글씨체":"字体","금리":"利率","금리 변경 이력":"利率变更记录","금리 이력 없음":"无利率记录","금액":"金额","금액 (선택)":"金额（可选）","금액 유형":"金额类型","금액 입력 (원)":"输入金额（韩元）","금액 입력 시 금리가 자동 계산됩니다":"输入金额后自动计算利率","금액·기간·금리를 입력하면 납입 스케줄이 표시됩니다.":"输入金额·期限·利率后显示还款计划。","기간 (개월)":"期限（月）","기간별 색상:":"按期间的颜色:","기념일":"纪念日","기념일 · 반복일정":"纪念日·重复日程","기념일 이름 (예: 아내 생일)":"纪念日名称（例: 妻子生日）","기록 없음":"无记录","기본값":"默认值","기존 금리":"当前利率","기준날짜":"基准日期","기준잔액 (원)":"基准余额（韩元）","기준잔액 직접 설정":"手动设置基准余额","나중에":"稍后","날씨 불러오는 중...":"正在加载天气...","날씨 정보를 불러올 수 없습니다 (인터넷 확인)":"无法加载天气信息（请检查网络）","날짜":"日期","날짜 범위 필터":"日期范围筛选","납부일":"缴费日","납입":"存入","납입 월":"存入月份","납입금":"存入额","납입기간 (개월)":"存入期限（月）","납입액":"存入金额","납입액·기간·이율을 입력하면 예상 결과가 표시됩니다.":"输入存入额·期限·利率后显示预估结果。","납입일":"存入日","내보내기":"导出","내역":"明细","내역 없음":"无明细","내용":"内容","네이버페이충전 +100,000":"NaverPay充值 +100,000","년도":"年份","누적액":"累计额","다운로드":"下载","닫기":"关闭","달력":"日历","달력 글씨 크기":"日历字体大小","달력 버튼 단축키":"日历按钮快捷键","달력 색상":"日历颜色","달력 작게":"缩小日历","달력 크게 (창보다 커지면 스크롤로 봅니다)":"放大日历（超过窗口时可滚动查看）","달력 표시 설정":"日历显示设置","달력의 각 일정 오른쪽에 삭제 버튼이 생깁니다":"每个日程右侧会出现删除按钮","달력이 분리 중입니다":"正在分离日历","대출 / 적금·펀드":"贷款 / 存款·基金","대출 시작일":"贷款开始日","대출 연결 (선택)":"关联贷款（可选）","대출 이름":"贷款名称","대출 추가":"添加贷款","대출·적금 추가 버튼 표시":"贷款·存款添加按钮显示","대출금액 (원)":"贷款金额（韩元）","대출납입":"贷款还款","데이터를 JSON 파일로 내보내기":"将数据导出为JSON文件","도시":"城市","드래그로 입력칸 크기 조절":"拖动调整输入框大小","드래그하여 창 크기 조절":"拖动调整窗口大小","등록된 대출 / 적금·펀드가 없습니다":"没有已登记的贷款／存款","라이선스 키 (구매 시 전달)":"许可证密钥（购买时提供）","로 저장됩니다":"将被保存","로그아웃":"登出","로그인됨":"已登录","리셋":"重置","만기 수령액":"到期领取额","만기 예상액":"到期预估额","만들기":"创建","맞춤":"适应","매년 반복 (생일 등)":"每年重复（生日等）","매월 납부하는 날 (비우면 시작일 기준)":"每月缴费日（留空则以开始日为准）","매월 납입하는 날 (비우면 시작일 기준)":"每月存入日（留空则以开始日为准）","메뉴":"菜单","메모 (선택)":"备注（可选）","메모 1":"备注 1","메모 2":"备注 2","메모 3":"备注 3","메모 4":"备注 4","메모 5":"备注 5","메모가 없습니다":"没有备注","모든 데이터 초기화":"重置所有数据","미리보기":"预览","미완료 할 일":"未完成待办","반복":"重复","반복 O":"重复 ✓","반복 X":"重复 ✗","반복 일정":"重复日程","배경색":"背景色","배경화면":"壁纸","분 후":"分钟后","분석하기 ✨":"分析 ✨","비밀번호":"密码","비밀번호 (6자 이상)":"密码（6位以上）","비밀번호 입력":"输入密码","비밀번호 확인":"确认密码","비밀번호가 올바르지 않습니다":"密码不正确","비활성 타이머":"闲置计时器","빨간색":"红色","사생활 모드":"隐私模式","사용자 지정 색상":"自定义颜色","사주팔자 (四柱八字)":"四柱八字","삭제":"删除","상단 버튼 크기":"顶部按钮大小","상세보기 (전체 D-Day 목록)":"详情（全部D-Day列表）","새 폴더 이름 입력 후 Enter":"输入新文件夹名后按Enter","색상":"颜色","색상 선택":"选择颜色","색상:":"颜色:","생년월일시를 입력하면 사주팔자와 음양오행을 분석합니다":"输入出生年月日时后分析四柱八字与阴阳五行","생년월일을 입력하고 분석하기를 눌러주세요":"请输入出生日期并点击分析","선택 안함":"不选","선택한 월에 거래 없음":"所选月份无交易","설정":"设置","성을 포함한 한글 이름을 두 글자 이상 입력하세요":"请输入含姓氏的韩文姓名，2字以上","소리오행 흐름":"声音五行流向","수기납입 → 금리 자동계산":"手动还款 → 利率自动计算","수정":"编辑","순서 변경 중 — 빈 곳 클릭 시 종료":"排序中 — 点击空白处结束","순서 변경 중 — 빈 곳 클릭하면 종료":"排序中 — 点击空白处结束","순수지":"净收支","숨기기":"隐藏","숫자 키로 입력 — shift 모드 (예: 2026 입력 후 2 누르면 0262)":"用数字键输入 — shift模式（例: 输入2026后按2得0262）","시간 미입력 시 시주 생략":"未输入时刻则省略时柱","시작 일수":"起始天数","시작일":"开始日","실제 납입금액 (원)":"实际还款额（韩元）","실제 납입한 금액을 입력하면 해당 달의 금리를 역산해서 그 이후 납입 스케줄을 다시 계산합니다.":"输入实际还款额后反推当月利率，并重新计算之后的还款计划。","아이콘":"图标","알림 아이콘 이미지":"提醒图标图片","언어":"语言","없음":"无","엑셀 원본 잔액":"Excel原始余额","엑셀 파일을 여기에 드롭하거나 클릭하여 선택":"将Excel文件拖到此处或点击选择","역산 결과":"反推结果","역산 금리":"反推利率","연결 안 함":"不关联","연도":"年份","예: 1,000,000":"例: 1,000,000","예: 1,520,000":"例: 1,520,000","예: 10, 6, 12":"例: 10, 6, 12","예: 12":"例: 12","예: SKT, 카드연회비, 통신비...":"例: SKT、信用卡年费、通信费...","예: 洪吉童":"例: 洪吉童","예: 홍길동":"例: 홍길동","예상 이자":"预估利息","오늘로":"至今天","오디오 URL 또는 YouTube 링크":"音频URL或YouTube链接","오른쪽에 고정":"固定在右侧","오른쪽으로":"向右","오행 분포 (陰陽五行)":"五行分布（阴阳五行）","오행 상생·상극 (五行相生相剋)":"五行相生·相克（五行相生相克）","올해로":"至今年","완료":"完成","완료 시간":"完成时间","완료 항목 삭제":"删除已完成项","완료 항목 전체 삭제":"删除全部已完成项","완료한 일":"已完成","완료한 할 일이 없습니다":"没有已完成的待办","왼쪽에 고정":"固定在左侧","왼쪽으로":"向左","운세":"运势","원금":"本金","월":"月","월 납입액 (원)":"每月存入额（韩元）","유형":"类型","유효한 금액을 입력해주세요":"请输入有效金额","은행":"银行","은행 거래내역 가져오기":"导入银行交易明细","은행 거래내역 가져오기에서 이 키워드와 일치하는 항목이 있으면, 같은 달 이 반복일정을 자동으로 숨겨 중복을 방지합니다.":"在导入银行交易时若有与此关键词匹配的项目，则自动隐藏当月该重复日程以避免重复。","음양오행 이론 기반 · 재미로 보는 운세입니다 🙂":"基于阴阳五行理论·娱乐性运势 🙂","이 버전 알림 다시 보지 않기":"不再显示此版本通知","이 색상의 용도 이름 — 이 창에서만 표시됩니다":"此颜色的用途名 — 仅在此窗口显示","이 색상의 용도 이름 입력 (최대 2글자)":"输入此颜色的用途名（最多2字）","이 시기엔 중요한 결정을 서두르지 마세요":"此时期请勿仓促做重要决定","이 폴더에 넣을 곡 선택하기":"选择要放入此文件夹的歌曲","이름 (한글, 성 포함)":"姓名（韩文，含姓氏）","이메일":"邮箱","이미지 선택":"选择图片","이미지 없음":"无图片","이미지를 선택하면 배경으로 적용됩니다":"选择图片后将应用为背景","이자":"利息","일":"日","일 이상":"天以上","일요일 색상 구분":"区分周日颜色","일정":"日程","일정 내용 미리보기":"日程内容预览","일정 삭제":"删除日程","일정 시간 조작 없으면 화면이 투명해집니다":"一段时间无操作后画面变透明","일정, 메모, D-Day 검색...":"搜索日程、备注、D-Day...","일정으로":"至日程","입금":"收入","입력칸을 클릭한 뒤 원하는 키(조합키 가능: Ctrl/Alt/Shift+키)를 누르면 저장됩니다. Backspace로 삭제. 달력 창이 열려 있을 때 작동하며, 글자 입력 중에는 무시됩니다.":"点击输入框后按下所需键（可组合: Ctrl/Alt/Shift+键）即保存。Backspace删除。仅在日历打开时生效，输入文字时忽略。","작성 시간":"创建时间","잔액":"余额","잔액 표시 기준":"余额显示基准","잠금 비밀번호":"锁定密码","잠금 해제":"解锁","잠금화면 배경":"锁屏背景","재생바":"播放器","재생바 접기 (1:재생바 숨김 → 2:배속 숨김 → 3:최소 → 4:전체)":"折叠播放器（1:隐藏栏→2:隐藏倍速→3:最小→4:完整）","저사양 PC에서는 꺼두는 것을 권장합니다":"低配置PC建议关闭","저장":"保存","저장하고 로그인":"保存并登录","저장하면 같은 원본 적요의 기존 이벤트도 모두 업데이트됩니다.":"保存后相同原始摘要的现有事件也会全部更新。","적금 · 펀드":"存款·基金","적금·펀드 추가":"添加存款·基金","적금납입":"存款存入","적요":"摘要","전체":"全部","전체 삭제":"全部删除","제목 (URL 입력 후 자동 완성)":"标题（输入URL后自动补全）","종료일":"结束日","주황":"橙色","중복 (체크로 강제 추가)":"重复（勾选强制添加）","중요한 약속·새 시작에 좋은 날입니다":"适合重要约定和新开始的日子","지남":"已过","지우기":"清除","직접 조절":"手动调整","진행중인 일":"进行中","진행중인 할 일이 없습니다":"没有进行中的待办","창 배경 투명도":"窗口背景透明度","창 열기":"打开窗口","찾기":"搜索","철학관 원리 기반 · 재미로 보는 사주입니다 🙏":"基于命理原理·娱乐性四柱 🙏","초기화":"重置","총 납입액":"总存入额","최근 6년 연별 요약":"近6年年度汇总","출금":"支出","출금 내역 없음":"无支出明细","출금 합계":"支出合计","취소":"取消","카테고리":"类别","커스텀 색상":"自定义颜色","클릭 즉시 저장 | 엑셀 복붙 지원":"点击即存 | 支持Excel粘贴","클릭 후 키 입력":"点击后按键","태어난 시간 (선택 — 시주 계산에 사용)":"出生时刻（可选 — 用于时柱计算）","탭 삭제":"删除标签","토요일 색상 구분":"区分周六颜色","투명도":"透明度","파란색":"蓝色","팝업으로":"以弹窗","패널 내용 영역 미리보기":"面板内容区域预览","패널 미리보기":"面板预览","패널 배경 기준색":"面板背景基准色","패널 배경 투명도":"面板背景透明度","패널 배경색 기준":"面板背景色基准","패널 투명도 / 색상":"面板透明度／颜色","폴더 만들기 — 곡 목록에서 각 곡의 폴더를 지정할 수 있습니다":"创建文件夹 — 可在歌曲列表中为每首歌指定文件夹","폴더 지정":"指定文件夹","표 삽입":"插入表格","표시 방식":"显示方式","표시 설정":"显示设置","표시 위치":"显示位置","표시 이름":"显示名称","피드백 등록!":"反馈已登记！","피드백 메모 등록":"登记反馈备注","피드백 알림에 쓸 이미지를 직접 올릴 수 있습니다.":"可自行上传用于反馈提醒的图片。","한자 표기 (선택)":"汉字标注（可选）","한자 획수 (선택 — 글자별 획수를 쉼표로. 비우면 한글 획수로 계산)":"汉字笔画数（可选 — 每字用逗号分隔。留空则按韩文笔画计算）","할 일":"待办","할 일 입력 후 Enter":"输入待办后按Enter","할 일을 입력해 블록을 만들고, 클릭해서 체크한 뒤 달력 날짜로 드래그하세요. 체크된 블록이 한꺼번에 들어갑니다.":"输入待办创建方块，点击勾选后拖到日历日期。勾选的方块会一起放入。","합계":"合计","항목":"项目","항목이 없습니다":"没有项目","행운 색":"幸运色","행운 숫자":"幸运数字","현재":"当前","현재 금리":"当前利率","현재 적용중":"当前应用中","현재 표시 년월":"当前显示年月","화면에 맞추기":"适应屏幕","화면이 잠겨 있습니다":"屏幕已锁定","활성 피드백이 없습니다.":"没有活动的反馈。","🌙 음력":"🌙 农历","🌙 입력한 날짜를 음력으로 저장합니다.":"🌙 将输入的日期以农历保存。","🎵 음악":"🎵 音乐","🎵 재생바":"🎵 播放器","🎵 재생바 창":"🎵 播放器窗口","🏦 대출":"🏦 贷款","🏦 대출 추가":"🏦 添加贷款","💰 가계부":"💰 记账本","💰 입출금 현황":"💰 收支状况","📅 달력":"📅 日历","📅 달력 패널":"📅 日历面板","📅 헤더":"📅 页眉","📈 적금":"📈 存款","📈 적금·펀드 추가":"📈 添加存款·基金","📊 출금 분석":"📊 支出分析","📋 상세 정보":"📋 详细信息","📋 할 일 목록":"📋 待办列表","📜 사주와 이름의 궁합":"📜 四柱与姓名的契合","📜 원장 종합 분석 — 오행 생극(生剋)으로 본 오늘":"📜 综合分析 — 以五行生克看今日","📝 내용":"📝 内容","📝 메모":"📝 备注","📥 내보내기":"📥 导出","🔄 상생: 목→화→토→금→수→목":"🔄 相生: 木→火→土→金→水→木","🔐 지금 잠그기":"🔐 立即锁定","🔢 계산기":"🔢 计算器","🔢 계산기 창":"🔢 计算器窗口","🔢 날짜":"🔢 日期","🔮 운세":"🔮 运势","🔮 운세 창":"🔮 运势窗口","🔮 운세·사주":"🔮 运势·四柱","🖊️ 수기납입 입력 → 금리 자동계산":"🖊️ 手动还款输入 → 利率自动计算"},
    zhTW: {"월 이동":"跳轉月份","날짜 클릭 · 0.5초 누르고 드래그로 여러 개 · 다른 달로 옮겨도 유지":"點擊日期 · 長按0.5秒拖曳多選 · 跨月保留","이미지로 내보내기":"匯出為圖片","텍스트로 내보내기":"匯出為文字","ics로 내보내기":"匯出為ics","달력에서 날짜를 클릭해 선택하세요":"在日曆上點擊日期選擇","달력에서 날짜 클릭 · ":"在日曆上點擊日期 · "," 선택됨":" 已選","월·날짜를 골라 이미지·표·ics로 공유":"選擇月份與日期，以圖片/表格/ics分享","일정 공유 — 월 선택":"分享日程 — 選擇月份","월을 고르면 그 달로 이동, 날짜를 눌러 선택하세요":"選擇月份後點擊日期選擇","일 선택됨":"天已選","일 · 공유 형식":"天 · 格式","텍스트(표) 복사":"複製文字(表格)","파일 저장":"儲存檔案","표 복사됨! 엑셀에 붙여넣기(Ctrl+V)":"表格已複製！貼到Excel(Ctrl+V)","ics 파일을 저장했습니다":"已儲存ics檔案","패널 캐릭터 스킨":"面板角色皮膚","이전 내 배경으로 되돌리기":"還原我先前的背景","이 색 일정":"此顏色的日程","날짜 ↑":"日期 ↑","날짜 ↓":"日期 ↓","이름 ↑":"名稱 ↑","이름 ↓":"名稱 ↓","해당 색 일정이 없습니다":"沒有此顏色的日程","보기 방식 (캐러셀/기본)":"顯示方式（輪播/基本）","←→ 칸 이동 · Enter 들어가기 · 안에서 ↑↓ 이동 · → 펼치기 · ← 접기 · Esc 뒤로":"←→ 移動欄 · Enter 進入 · 內部 ↑↓ 移動 · → 展開 · ← 收合 · Esc 返回","크기 조절":"調整大小","(빈 메모)":"(空備忘錄)","텍스트 필터":"文字篩選","색깔 필터":"顏色篩選","메모 내용 검색":"搜尋備忘錄內容","필터 초기화":"重設篩選","↑↓ 이동 · → 펼치기 · ← 접기 · Enter 편집 · Esc 뒤로":"↑↓ 移動 · → 展開 · ← 收合 · Enter 編輯 · Esc 返回","메모 상세":"備忘錄總覽","Tab으로 메모 이동":"用Tab在備忘錄間切換","체크한 메모끼리 Tab 키로 이동. 각 메모 제목줄의 체크박스로 선택":"Tab僅在勾選的備忘錄間切換。用各備忘錄標題列的核取方塊選擇。","Tab 이동에 포함":"加入Tab切換","달력 헤더 버튼 표시":"日曆標題列按鈕","사생활 잠금":"隱私鎖","상세보기":"詳細檢視","팀":"團隊","다운로드 링크가 아직 준비되지 않았습니다. 관리자에게 문의하세요.":"下載連結尚未準備好。請聯絡管理員。","정규 좌석":"正式席位","보기 전용(무료)":"僅檢視(免費)","최하 등급(5)은 보기 전용·무료로 고정됩니다.":"最低等級(5)固定為僅檢視且免費。","단계":"級","이름":"名稱","공유":"分享","관리":"管理","등급 설정":"等級設定","등급 설정 저장":"儲存等級","등급 설정을 저장했습니다.":"已儲存等級設定。","숫자 낮을수록 권한 높음. 소유자는 항상 전권입니다.":"數字越小權限越高。擁有者始終擁有全部權限。","공유 권한이 없습니다.":"沒有分享權限。","권한이 없습니다.":"沒有權限。","잘못된 등급입니다.":"無效等級。","소유자 등급은 바꿀 수 없습니다.":"無法變更擁有者等級。","설정 형식이 올바르지 않습니다.":"設定格式無效。","올리는 중…":"上傳中…","이미지":"圖片","제거":"移除","이미지 공지 10캐시 차감":"圖片公告：扣10現金","캐시":"現金","캐시가 부족합니다.":"現金不足。","필요":"需要","이미지는 5MB 이하만 가능합니다.":"圖片需5MB以內。","팀 멤버가 아닙니다.":"你不是團隊成員。","금액이 올바르지 않습니다.":"金額無效。","공지":"公告","팀 공지":"團隊公告","공지 올리기":"發佈公告","팀원에게 보낼 공지를 입력하세요":"輸入給團隊的公告","등록된 공지가 없습니다.":"尚無公告。","공지 내용을 입력하세요.":"請輸入公告內容。","이 공지를 삭제할까요?":"刪除此公告？","다음에 이 창을 띄우지 않습니다":"下次不再顯示","확인":"確定","공지를 올릴 권한이 없습니다.":"你沒有發佈公告的權限。","내용이 비어 있습니다.":"內容為空。","미완료":"未完成","건":"筆","숨김":"隱藏","💰입금":"💰收入","💸출금":"💸支出","완료 시각":"完成時刻","완료 숨기기":"隱藏已完成","메모":"備註","오늘":"今天","동기화":"同步","탭 추가":"新增分頁","창 추가":"新增視窗","✏️ 입력":"✏️ 輸入","거치식":"寬限式","달력 보기":"顯示日曆","달력 숨기기":"隱藏日曆","대기 중":"等待中","동기화 오류":"同步錯誤","동기화 중...":"同步中...","드래그해서 순서 변경":"拖曳重新排序","로그인":"登入","마이너스통장":"透支帳戶","만기일시":"到期一次","매년":"每年","매월":"每月","매일":"每天","매주":"每週","미완료":"未完成","원금균등":"等額本金","원리금균등":"等額本息","저장하기":"儲存","처리 중...":"處理中...","추가하기":"新增","회원가입":"註冊","💹 펀드":"💹 基金","📊 미리보기":"📊 預覽","● 기타(1회성)":"● 其他(一次性)","건수":"筆數","기간":"期間","기타(1회성)":"其他(一次性)","비율(%)":"比例(%)","입금 합계":"收入合計","제목":"標題","총 건수":"總筆數","출금 합계":"支出合計"," 입력 (API key 아님)":" 輸入 (非API key)","Supabase 대시보드 → Settings → API →":"Supabase 儀表板 → Settings → API →","Supabase 미설정":"Supabase 未設定","Supabase 설정 변경":"變更 Supabase 設定","Supabase 설정의 anon 키를 확인하세요 (service key 사용 불가)":"請檢查 Supabase 設定中的 anon 金鑰（不可使用 service key）","Supabase가 설정되지 않았습니다":"Supabase 未設定","☁ 동기화 상태":"☁ 同步狀態","☁ 클라우드 동기화 설정":"☁ 雲端同步設定","☁ 클라우드 로그인":"☁ 雲端登入","⚠ service_role 키입니다. anon 키를 입력하세요.":"⚠ 這是 service_role 金鑰。請輸入 anon 金鑰。","가입 완료! 이메일 인증 후 로그인하세요.":"註冊完成！請驗證信箱後登入。","동기화 중":"同步中","동기화됨":"已同步","라이선스 키가 유효하지 않습니다. 클라우드 동기화가 제한됩니다.":"授權金鑰無效。雲端同步受限。","라이선스 키를 입력하세요 (구매 시 전달됩니다)":"請輸入授權金鑰（購買時提供）","로그인 필요":"需要登入","를 복사하세요.":" 複製它。","마지막 동기화":"上次同步","비밀번호가 일치하지 않습니다":"密碼不一致","비밀번호는 6자 이상이어야 합니다":"密碼需6位以上","아이디(이메일) 저장":"儲存帳號(信箱)","에서 무료 계정 생성 후 키를 복사하세요":"在此建立免費帳戶並複製金鑰","이메일 + ":"信箱 + ","이메일 또는 비밀번호가 틀렸습니다":"信箱或密碼錯誤","이메일 인증이 필요합니다. 메일함을 확인하세요":"需要信箱驗證。請查看收件匣","이메일과 비밀번호를 입력하세요":"請輸入信箱和密碼","이미 등록된 이메일입니다":"該信箱已註冊","자동 로그인 (끄면 다음 실행 때 로그아웃 상태로 시작)":"自動登入（關閉則下次以登出狀態啟動）","자동 로그인 (다음 실행 시 자동으로 로그인)":"自動登入（下次執行時自動登入）","잘못된 키 형식입니다":"金鑰格式無效","지금 동기화":"立即同步"," (은행)":" (銀行)","② 미리보기":"② 預覽","가져오기 (":"匯入 (","건)":"筆)","건) — ":"筆) — ","건의 거래내역이 달력에 추가되었습니다.":"筆交易明細已新增到日曆。","기준날짜 기준으로 잔액 역산":"以基準日期反推餘額","당근거래 ":"二手交易 ","메모 (입출금 내역에 표시됩니다)":"備註（顯示在收支明細中）","반복거래 ":"重複交易 ","원본 적요: ":"原始摘要: ","원본: ":"原始: ","토스뱅크":"Toss銀行","🏦 은행 연동 키워드 ":"🏦 銀行連動關鍵字 ","🏧 은행":"🏧 銀行","📦 가져오기 기록 (":"📦 匯入記錄 (","🔄 반복거래 (":"🔄 重複交易 (","🥕 당근거래 (1회성, ":"🥕 二手交易 (一次性, ","🥕 당근거래 — 1회성 (":"🥕 二手交易 — 一次性 (","일정 공유 (.ics)":"分享行程 (.ics)","일정 받기 (.ics)":"匯入行程 (.ics)","일정을 .ics 파일로 내보내 카톡·메일로 공유":"將行程匯出為.ics，透過聊天/郵件分享",".ics 파일에서 일정 가져오기 (중복 제외)":"從.ics檔案匯入行程（跳過重複）","내보낼 일정이 없습니다.":"沒有可匯出的行程。","개 일정을 가져왔습니다.":"個行程已匯入。","개 중복 제외":"個重複已跳過","올바른 일정 파일(.ics)이 아닙니다.":"不是有效的行程檔案(.ics)。","나":"我","날짜와 제목을 입력하세요.":"請輸入日期和標題。","내 달력에 복사":"複製到我的日曆","내 달력에 복사했습니다.":"已複製到我的日曆。","내 팀":"我的團隊","멤버":"成員","명":"人","복사":"複製","뷰어":"檢視者","소유자는 팀을 삭제해야 나갈 수 있습니다.":"擁有者需刪除團隊才能退出。","소유자만 할 수 있습니다.":"僅擁有者可操作。","아직 팀이 없습니다.":"還沒有團隊。","이 멤버를 내보낼까요?":"移除該成員？","이 팀에서 나갈까요?":"退出該團隊？","일정 제목":"行程標題","재발급":"重新產生","참여":"加入","참여 코드":"加入碼","참여 코드 6자리":"6位加入碼","참여 코드가 올바르지 않습니다.":"加入碼不正確。","추가":"新增","코드로 참여":"用碼加入","코드를 복사했습니다.":"已複製加入碼。","클라우드가 설정되지 않았습니다.":"雲端未設定。","팀 공유는 로그인이 필요합니다. 먼저 상단의 동기화 버튼에서 로그인하세요.":"團隊共享需要登入。請先透過頂部的同步按鈕登入。","팀 나가기":"退出團隊","팀 달력":"團隊日曆","팀 만들기":"建立團隊","팀 목록":"團隊列表","팀 삭제":"刪除團隊","팀 이름 (예: 마케팅팀)":"團隊名稱（例: 行銷部）","팀 이름을 입력하세요.":"請輸入團隊名稱。","팀 일정":"團隊行程","팀 일정이 없습니다.":"沒有團隊行程。","팀을 만들려면 라이선스가 필요합니다.":"建立團隊需要授權。","팀을 삭제하면 모든 팀 일정이 사라집니다. 삭제할까요?":"刪除團隊將清除所有團隊行程。要刪除嗎？","편집자":"編輯者","회사·팀원과 일정을 공유합니다":"與公司/團隊共享行程","소유자":"擁有者","지역 변경":"變更地區","표 크기 선택":"選擇表格大小","끝으로 갈수록 칸이 늘어납니다":"到達邊緣時格子會增加","팀 달력 보기":"檢視團隊日曆","개인 달력 보기":"檢視個人日曆","보기 전용입니다 (편집 권한 없음)":"僅檢視（無編輯權限）","이 날 일정 공유":"分享當天行程","일정 없음":"無行程","이미지 복사":"複製圖片","텍스트 복사":"複製文字","이미지 복사됨! 카톡에 붙여넣기(Ctrl+V)":"已複製圖片！貼上(Ctrl+V)","텍스트 복사됨! 카톡에 붙여넣기(Ctrl+V)":"已複製文字！貼上(Ctrl+V)","이미지 복사 실패 — 텍스트로 시도하세요":"圖片複製失敗 — 請試試文字","복사 실패":"複製失敗","팀 달력만 사용":"僅使用團隊日曆","개인 달력 없이 팀 달력으로 시작합니다 (회사용)":"不用個人日曆，以團隊日曆啟動（公司用）","팀 보기 시 팀 선택 창 표시":"切換到團隊檢視時顯示團隊選擇","여러 팀을 자주 바꿀 때 켜세요. 끄면 마지막 팀을 바로 엽니다":"經常切換團隊時開啟。關閉則直接開啟上次的團隊","팀 선택":"選擇團隊","팀 전환":"切換團隊","👥 팀 이름":"👥 團隊名","진행중":"進行中","개":"個","년":"年","목록":"列表","새 메모":"新增備註","메모 키보드 조작":"備註鍵盤操作","입력칸: ESC 후 1.5초 내 Backspace → 목록 · 목록: ↑↓ 선택, Ctrl+→ 열기, Ctrl+← 나가기":"輸入框: ESC後1.5秒內按Backspace → 列表 · 列表: ↑↓選擇, Ctrl+→開啟, Ctrl+←退出","입력: Ctrl+← 또는 ESC후 Backspace → 목록 · 목록: ↑↓ 선택, → 열기, ← 접기, Enter 편집":"輸入: Ctrl+← 或 ESC後Backspace → 列表 · 列表: ↑↓選擇, →開啟, ←關閉, Enter編輯","테마":"主題","(무료)":"(免費)","부산 갈매기":"釜山海鷗","정글 악어":"叢林鱷魚","팀 관리":"團隊管理","이 달 일정 공유":"分享本月行程","일정 공유":"分享行程","엑셀로 내보내기":"匯出到Excel","엑셀 파일을 저장했습니다":"已儲存Excel檔案","% 표시":"% 顯示","(1초 길게 누르면 📌 피드백 메모)":"(長按1秒📌反饋備註)","(1초 이상 올리면 설명)":"(懸停1秒以上顯示說明)","(service key 아님)":"(非service key)","(변경 시 추가)":"(變更時新增)","(선택)":"(可選)","(클릭 수정)":"(點選編輯)","+ 대출":"+ 貸款","+ 적금·펀드":"+ 存款·基金",".xlsx 파일 지원":"支援.xlsx檔案","2026년 5월":"2026年5月","2글자":"2字","CSV로 내보내기 (Excel에서 열기 가능)":"匯出CSV（可用Excel開啟）","D-Day 창의 대출·적금 추가 버튼 모양을 고릅니다":"選擇D-Day欄貸款·存款新增按鈕的樣式","Do! 리스트":"Do! 清單","Do! 리스트 — 할 일을 적어두고 달력 날짜로 드래그":"Do! 清單 — 記下待辦並拖到日曆日期","JSON 파일로 데이터 가져오기":"從JSON檔案匯入資料","anon (공개키)":"anon（公鑰）","service_role(비밀키)는 절대 사용 금지.":"絕對禁止使用service_role（金鑰）。","v66: React 에러 발생":"v66: 發生React錯誤","• KB국민은행, 신한은행 등 — 추후 지원 예정":"• KB國民銀行、新韓銀行等 — 後續支援","• 토스뱅크 — 엑셀 거래내역 (.xlsx)":"• Toss銀行 — Excel交易明細（.xlsx）","※ 간단한 화면 잠금용입니다. 비밀번호를 잊으면 로그아웃(초기화) 후 다시 로그인해야 합니다.":"※ 用於簡單鎖屏。忘記密碼需登出（重置）後重新登入。","※ 월주는 양력 근사 계산 (절기 미반영)":"※ 月柱為陽曆近似計算（未含節氣）","→ 다른 날짜 또는 같은 날 일정 위에 놓기(순서 변경)":"→ 放到其他日期或同一天的日程上（重新排序）","→ 역산 금리":"→ 反推利率","⏩ 배속":"⏩ 倍速","▲ 입금":"▲ 收入","▼ 출금":"▼ 支出","☀️ 양력":"☀️ 陽曆","☀️ 양력 기준":"☀️ 陽曆基準","☑ 할 일":"☑ 待辦","⚡ 상극: 목↔토 화↔금 토↔수 금↔목 수↔화":"⚡ 相剋: 木↔土 火↔金 土↔水 金↔木 水↔火","✓ 금리가 적용되었습니다. 저장하려면 대출 수정에서 저장하세요.":"✓ 利率已應用。如需儲存請在編輯貸款中儲存。","✓ 지원 형식":"✓ 支援格式","✕ 초기화":"✕ 重置","⭐ D-Day 창":"⭐ D-Day欄","「곡 추가하기」를 눌러 노래를 추가하세요":"點選「新增歌曲」來新增音樂","가계부":"記賬本","가계부 열기":"開啟記賬本","가나다":"拼音","가져오기":"匯入","가져오기 완료!":"匯入完成！","가져온 은행 거래내역이 없습니다.":"沒有已匯入的銀行交易明細。","거래 분류 수정":"編輯交易分類","거래 종류별 이름 / 카테고리 / 색상 설정 (다음 가져오기에도 자동 적용됩니다)":"按交易型別設定名稱／類別／顏色（下次匯入也自動應用）","거치기간 (개월)":"寬限期（月）","건너뛰기":"跳過","검색 결과 없음":"無搜尋結果","검색어 입력 또는 색상 필터 선택":"輸入搜尋詞或選擇顏色篩選","경과 기간별 알림 임계값":"按經過天數的提醒閾值","경과 일수 이상이면 해당 색상·아이콘으로 표시됩니다.":"超過經過天數後以該顏色·圖示顯示。","계산 기록":"計算記錄","계산기":"計算器","계산상 납입금":"計算的還款額","계좌 가져오기":"匯入賬戶","국가":"國家","권장: 32×32 ~ 64×64 픽셀, PNG(투명 배경) — 최대 100KB":"推薦: 32×32~64×64畫素、PNG（透明背景）— 最大100KB","글씨 색상":"文字顏色","글씨 크기 (앱 전체)":"字型大小（全應用）","글씨체":"字型","금리":"利率","금리 변경 이력":"利率變更記錄","금리 이력 없음":"無利率記錄","금액":"金額","금액 (선택)":"金額（可選）","금액 유형":"金額型別","금액 입력 (원)":"輸入金額（韓元）","금액 입력 시 금리가 자동 계산됩니다":"輸入金額後自動計算利率","금액·기간·금리를 입력하면 납입 스케줄이 표시됩니다.":"輸入金額·期限·利率後顯示還款計劃。","기간 (개월)":"期限（月）","기간별 색상:":"按期間的顏色:","기념일":"紀念日","기념일 · 반복일정":"紀念日·重複日程","기념일 이름 (예: 아내 생일)":"紀念日名稱（例: 妻子生日）","기록 없음":"無記錄","기본값":"預設值","기존 금리":"當前利率","기준날짜":"基準日期","기준잔액 (원)":"基準餘額（韓元）","기준잔액 직접 설정":"手動設定基準餘額","나중에":"稍後","날씨 불러오는 중...":"正在載入天氣...","날씨 정보를 불러올 수 없습니다 (인터넷 확인)":"無法載入天氣資訊（請檢查網路）","날짜":"日期","날짜 범위 필터":"日期範圍篩選","납부일":"繳費日","납입":"存入","납입 월":"存入月份","납입금":"存入額","납입기간 (개월)":"存入期限（月）","납입액":"存入金額","납입액·기간·이율을 입력하면 예상 결과가 표시됩니다.":"輸入存入額·期限·利率後顯示預估結果。","납입일":"存入日","내보내기":"匯出","내역":"明細","내역 없음":"無明細","내용":"內容","네이버페이충전 +100,000":"NaverPay充值 +100,000","년도":"年份","누적액":"累計額","다운로드":"下載","닫기":"關閉","달력":"日曆","달력 글씨 크기":"日曆字型大小","달력 버튼 단축키":"日曆按鈕快捷鍵","달력 색상":"日曆顏色","달력 작게":"縮小日曆","달력 크게 (창보다 커지면 스크롤로 봅니다)":"放大日曆（超過視窗時可滾動檢視）","달력 표시 설정":"日曆顯示設定","달력의 각 일정 오른쪽에 삭제 버튼이 생깁니다":"每個日程右側會出現刪除按鈕","달력이 분리 중입니다":"正在分離日曆","대출 / 적금·펀드":"貸款 / 存款·基金","대출 시작일":"貸款開始日","대출 연결 (선택)":"關聯貸款（可選）","대출 이름":"貸款名稱","대출 추가":"新增貸款","대출·적금 추가 버튼 표시":"貸款·存款新增按鈕顯示","대출금액 (원)":"貸款金額（韓元）","대출납입":"貸款還款","데이터를 JSON 파일로 내보내기":"將資料匯出為JSON檔案","도시":"城市","드래그로 입력칸 크기 조절":"拖動調整輸入框大小","드래그하여 창 크기 조절":"拖動調整視窗大小","등록된 대출 / 적금·펀드가 없습니다":"沒有已登記的貸款／存款","라이선스 키 (구매 시 전달)":"許可證金鑰（購買時提供）","로 저장됩니다":"將被儲存","로그아웃":"登出","로그인됨":"已登入","리셋":"重置","만기 수령액":"到期領取額","만기 예상액":"到期預估額","만들기":"建立","맞춤":"適應","매년 반복 (생일 등)":"每年重複（生日等）","매월 납부하는 날 (비우면 시작일 기준)":"每月繳費日（留空則以開始日為準）","매월 납입하는 날 (비우면 시작일 기준)":"每月存入日（留空則以開始日為準）","메뉴":"選單","메모 (선택)":"備註（可選）","메모 1":"備註 1","메모 2":"備註 2","메모 3":"備註 3","메모 4":"備註 4","메모 5":"備註 5","메모가 없습니다":"沒有備註","모든 데이터 초기화":"重置所有資料","미리보기":"預覽","미완료 할 일":"未完成待辦","반복":"重複","반복 O":"重複 ✓","반복 X":"重複 ✗","반복 일정":"重複日程","배경색":"背景色","배경화면":"桌布","분 후":"分鐘後","분석하기 ✨":"分析 ✨","비밀번호":"密碼","비밀번호 (6자 이상)":"密碼（6位以上）","비밀번호 입력":"輸入密碼","비밀번호 확인":"確認密碼","비밀번호가 올바르지 않습니다":"密碼不正確","비활성 타이머":"閒置計時器","빨간색":"紅色","사생활 모드":"隱私模式","사용자 지정 색상":"自定義顏色","사주팔자 (四柱八字)":"四柱八字","삭제":"刪除","상단 버튼 크기":"頂部按鈕大小","상세보기 (전체 D-Day 목록)":"詳情（全部D-Day列表）","새 폴더 이름 입력 후 Enter":"輸入新資料夾名後按Enter","색상":"顏色","색상 선택":"選擇顏色","색상:":"顏色:","생년월일시를 입력하면 사주팔자와 음양오행을 분석합니다":"輸入出生年月日時後分析四柱八字與陰陽五行","생년월일을 입력하고 분석하기를 눌러주세요":"請輸入出生日期並點選分析","선택 안함":"不選","선택한 월에 거래 없음":"所選月份無交易","설정":"設定","성을 포함한 한글 이름을 두 글자 이상 입력하세요":"請輸入含姓氏的韓文姓名，2字以上","소리오행 흐름":"聲音五行流向","수기납입 → 금리 자동계산":"手動還款 → 利率自動計算","수정":"編輯","순서 변경 중 — 빈 곳 클릭 시 종료":"排序中 — 點選空白處結束","순서 변경 중 — 빈 곳 클릭하면 종료":"排序中 — 點選空白處結束","순수지":"淨收支","숨기기":"隱藏","숫자 키로 입력 — shift 모드 (예: 2026 입력 후 2 누르면 0262)":"用數字鍵輸入 — shift模式（例: 輸入2026後按2得0262）","시간 미입력 시 시주 생략":"未輸入時刻則省略時柱","시작 일수":"起始天數","시작일":"開始日","실제 납입금액 (원)":"實際還款額（韓元）","실제 납입한 금액을 입력하면 해당 달의 금리를 역산해서 그 이후 납입 스케줄을 다시 계산합니다.":"輸入實際還款額後反推當月利率，並重新計算之後的還款計劃。","아이콘":"圖示","알림 아이콘 이미지":"提醒圖示圖片","언어":"語言","없음":"無","엑셀 원본 잔액":"Excel原始餘額","엑셀 파일을 여기에 드롭하거나 클릭하여 선택":"將Excel檔案拖到此處或點選選擇","역산 결과":"反推結果","역산 금리":"反推利率","연결 안 함":"不關聯","연도":"年份","예: 1,000,000":"例: 1,000,000","예: 1,520,000":"例: 1,520,000","예: 10, 6, 12":"例: 10, 6, 12","예: 12":"例: 12","예: SKT, 카드연회비, 통신비...":"例: SKT、信用卡年費、通訊費...","예: 洪吉童":"例: 洪吉童","예: 홍길동":"例: 홍길동","예상 이자":"預估利息","오늘로":"至今天","오디오 URL 또는 YouTube 링크":"音訊URL或YouTube連結","오른쪽에 고정":"固定在右側","오른쪽으로":"向右","오행 분포 (陰陽五行)":"五行分佈（陰陽五行）","오행 상생·상극 (五行相生相剋)":"五行相生·相剋（五行相生相剋）","올해로":"至今年","완료":"完成","완료 시간":"完成時間","완료 항목 삭제":"刪除已完成項","완료 항목 전체 삭제":"刪除全部已完成項","완료한 일":"已完成","완료한 할 일이 없습니다":"沒有已完成的待辦","왼쪽에 고정":"固定在左側","왼쪽으로":"向左","운세":"運勢","원금":"本金","월":"月","월 납입액 (원)":"每月存入額（韓元）","유형":"型別","유효한 금액을 입력해주세요":"請輸入有效金額","은행":"銀行","은행 거래내역 가져오기":"匯入銀行交易明細","은행 거래내역 가져오기에서 이 키워드와 일치하는 항목이 있으면, 같은 달 이 반복일정을 자동으로 숨겨 중복을 방지합니다.":"在匯入銀行交易時若有與此關鍵詞匹配的專案，則自動隱藏當月該重複日程以避免重複。","음양오행 이론 기반 · 재미로 보는 운세입니다 🙂":"基於陰陽五行理論·娛樂性運勢 🙂","이 버전 알림 다시 보지 않기":"不再顯示此版本通知","이 색상의 용도 이름 — 이 창에서만 표시됩니다":"此顏色的用途名 — 僅在此視窗顯示","이 색상의 용도 이름 입력 (최대 2글자)":"輸入此顏色的用途名（最多2字）","이 시기엔 중요한 결정을 서두르지 마세요":"此時期請勿倉促做重要決定","이 폴더에 넣을 곡 선택하기":"選擇要放入此資料夾的歌曲","이름 (한글, 성 포함)":"姓名（韓文，含姓氏）","이메일":"郵箱","이미지 선택":"選擇圖片","이미지 없음":"無圖片","이미지를 선택하면 배경으로 적용됩니다":"選擇圖片後將應用為背景","이자":"利息","일":"日","일 이상":"天以上","일요일 색상 구분":"區分週日顏色","일정":"日程","일정 내용 미리보기":"日程內容預覽","일정 삭제":"刪除日程","일정 시간 조작 없으면 화면이 투명해집니다":"一段時間無操作後畫面變透明","일정, 메모, D-Day 검색...":"搜尋日程、備註、D-Day...","일정으로":"至日程","입금":"收入","입력칸을 클릭한 뒤 원하는 키(조합키 가능: Ctrl/Alt/Shift+키)를 누르면 저장됩니다. Backspace로 삭제. 달력 창이 열려 있을 때 작동하며, 글자 입력 중에는 무시됩니다.":"點選輸入框後按下所需鍵（可組合: Ctrl/Alt/Shift+鍵）即儲存。Backspace刪除。僅在日曆開啟時生效，輸入文字時忽略。","작성 시간":"建立時間","잔액":"餘額","잔액 표시 기준":"餘額顯示基準","잠금 비밀번호":"鎖定密碼","잠금 해제":"解鎖","잠금화면 배경":"鎖屏背景","재생바":"播放器","재생바 접기 (1:재생바 숨김 → 2:배속 숨김 → 3:최소 → 4:전체)":"摺疊播放器（1:隱藏欄→2:隱藏倍速→3:最小→4:完整）","저사양 PC에서는 꺼두는 것을 권장합니다":"低配置PC建議關閉","저장":"儲存","저장하고 로그인":"儲存並登入","저장하면 같은 원본 적요의 기존 이벤트도 모두 업데이트됩니다.":"儲存後相同原始摘要的現有事件也會全部更新。","적금 · 펀드":"存款·基金","적금·펀드 추가":"新增存款·基金","적금납입":"存款存入","적요":"摘要","전체":"全部","전체 삭제":"全部刪除","제목 (URL 입력 후 자동 완성)":"標題（輸入URL後自動補全）","종료일":"結束日","주황":"橙色","중복 (체크로 강제 추가)":"重複（勾選強制新增）","중요한 약속·새 시작에 좋은 날입니다":"適合重要約定和新開始的日子","지남":"已過","지우기":"清除","직접 조절":"手動調整","진행중인 일":"進行中","진행중인 할 일이 없습니다":"沒有進行中的待辦","창 배경 투명도":"視窗背景透明度","창 열기":"開啟視窗","찾기":"搜尋","철학관 원리 기반 · 재미로 보는 사주입니다 🙏":"基於命理原理·娛樂性四柱 🙏","초기화":"重置","총 납입액":"總存入額","최근 6년 연별 요약":"近6年年度彙總","출금":"支出","출금 내역 없음":"無支出明細","출금 합계":"支出合計","취소":"取消","카테고리":"類別","커스텀 색상":"自定義顏色","클릭 즉시 저장 | 엑셀 복붙 지원":"點選即存 | 支援Excel貼上","클릭 후 키 입력":"點選後按鍵","태어난 시간 (선택 — 시주 계산에 사용)":"出生時刻（可選 — 用於時柱計算）","탭 삭제":"刪除標籤","토요일 색상 구분":"區分週六顏色","투명도":"透明度","파란색":"藍色","팝업으로":"以彈窗","패널 내용 영역 미리보기":"面板內容區域預覽","패널 미리보기":"面板預覽","패널 배경 기준색":"面板背景基準色","패널 배경 투명도":"面板背景透明度","패널 배경색 기준":"面板背景色基準","패널 투명도 / 색상":"面板透明度／顏色","폴더 만들기 — 곡 목록에서 각 곡의 폴더를 지정할 수 있습니다":"建立資料夾 — 可在歌曲列表中為每首歌指定資料夾","폴더 지정":"指定資料夾","표 삽입":"插入表格","표시 방식":"顯示方式","표시 설정":"顯示設定","표시 위치":"顯示位置","표시 이름":"顯示名稱","피드백 등록!":"反饋已登記！","피드백 메모 등록":"登記反饋備註","피드백 알림에 쓸 이미지를 직접 올릴 수 있습니다.":"可自行上傳用於反饋提醒的圖片。","한자 표기 (선택)":"漢字標註（可選）","한자 획수 (선택 — 글자별 획수를 쉼표로. 비우면 한글 획수로 계산)":"漢字筆畫數（可選 — 每字用逗號分隔。留空則按韓文筆畫計算）","할 일":"待辦","할 일 입력 후 Enter":"輸入待辦後按Enter","할 일을 입력해 블록을 만들고, 클릭해서 체크한 뒤 달력 날짜로 드래그하세요. 체크된 블록이 한꺼번에 들어갑니다.":"輸入待辦建立方塊，點選勾選後拖到日曆日期。勾選的方塊會一起放入。","합계":"合計","항목":"專案","항목이 없습니다":"沒有專案","행운 색":"幸運色","행운 숫자":"幸運數字","현재":"當前","현재 금리":"當前利率","현재 적용중":"當前應用中","현재 표시 년월":"當前顯示年月","화면에 맞추기":"適應螢幕","화면이 잠겨 있습니다":"螢幕已鎖定","활성 피드백이 없습니다.":"沒有活動的反饋。","🌙 음력":"🌙 農曆","🌙 입력한 날짜를 음력으로 저장합니다.":"🌙 將輸入的日期以農曆儲存。","🎵 음악":"🎵 音樂","🎵 재생바":"🎵 播放器","🎵 재생바 창":"🎵 播放器視窗","🏦 대출":"🏦 貸款","🏦 대출 추가":"🏦 新增貸款","💰 가계부":"💰 記賬本","💰 입출금 현황":"💰 收支狀況","📅 달력":"📅 日曆","📅 달력 패널":"📅 日曆面板","📅 헤더":"📅 頁首","📈 적금":"📈 存款","📈 적금·펀드 추가":"📈 新增存款·基金","📊 출금 분석":"📊 支出分析","📋 상세 정보":"📋 詳細資訊","📋 할 일 목록":"📋 待辦列表","📜 사주와 이름의 궁합":"📜 四柱與姓名的契合","📜 원장 종합 분석 — 오행 생극(生剋)으로 본 오늘":"📜 綜合分析 — 以五行生剋看今日","📝 내용":"📝 內容","📝 메모":"📝 備註","📥 내보내기":"📥 匯出","🔄 상생: 목→화→토→금→수→목":"🔄 相生: 木→火→土→金→水→木","🔐 지금 잠그기":"🔐 立即鎖定","🔢 계산기":"🔢 計算器","🔢 계산기 창":"🔢 計算器視窗","🔢 날짜":"🔢 日期","🔮 운세":"🔮 運勢","🔮 운세 창":"🔮 運勢視窗","🔮 운세·사주":"🔮 運勢·四柱","🖊️ 수기납입 입력 → 금리 자동계산":"🖊️ 手動還款輸入 → 利率自動計算"},
    de: {"월 이동":"Monat wechseln","날짜 클릭 · 0.5초 누르고 드래그로 여러 개 · 다른 달로 옮겨도 유지":"Datum klicken · 0,5s halten & ziehen · monatsübergreifend","이미지로 내보내기":"Als Bild exportieren","텍스트로 내보내기":"Als Text exportieren","ics로 내보내기":"Als .ics exportieren","달력에서 날짜를 클릭해 선택하세요":"Tage im Kalender anklicken","달력에서 날짜 클릭 · ":"Tage im Kalender anklicken · "," 선택됨":" gewählt","월·날짜를 골라 이미지·표·ics로 공유":"Monat & Tage wählen, als Bild/Tabelle/ICS teilen","일정 공유 — 월 선택":"Termine teilen — Monat wählen","월을 고르면 그 달로 이동, 날짜를 눌러 선택하세요":"Monat wählen, dann Tage anklicken","일 선택됨":" Tage gewählt","일 · 공유 형식":" Tage · Format","텍스트(표) 복사":"Text (Tabelle) kopieren","파일 저장":"Datei","표 복사됨! 엑셀에 붙여넣기(Ctrl+V)":"Tabelle kopiert! In Excel einfügen (Strg+V)","ics 파일을 저장했습니다":"ICS-Datei gespeichert","패널 캐릭터 스킨":"Panel-Charakter-Skin","이전 내 배경으로 되돌리기":"Vorheriges Hintergrundbild wiederherstellen","이 색 일정":"Termine dieser Farbe","날짜 ↑":"Datum ↑","날짜 ↓":"Datum ↓","이름 ↑":"Name ↑","이름 ↓":"Name ↓","해당 색 일정이 없습니다":"Keine Termine dieser Farbe","보기 방식 (캐러셀/기본)":"Ansicht (Karussell/Basis)","←→ 칸 이동 · Enter 들어가기 · 안에서 ↑↓ 이동 · → 펼치기 · ← 접기 · Esc 뒤로":"←→ Spalte · Enter öffnen · innen ↑↓ · → auf · ← zu · Esc zurück","크기 조절":"Größe ändern","(빈 메모)":"(leer)","텍스트 필터":"Textfilter","색깔 필터":"Farbfilter","메모 내용 검색":"Memo-Inhalt suchen","필터 초기화":"Filter zurücksetzen","↑↓ 이동 · → 펼치기 · ← 접기 · Enter 편집 · Esc 뒤로":"↑↓ Bewegen · → Öffnen · ← Schließen · Enter Bearbeiten · Esc Zurück","메모 상세":"Memo-Übersicht","Tab으로 메모 이동":"Mit Tab zwischen Memos wechseln","체크한 메모끼리 Tab 키로 이동. 각 메모 제목줄의 체크박스로 선택":"Tab wechselt nur zwischen markierten Memos. Auswahl über das Kästchen in der Titelzeile.","Tab 이동에 포함":"In Tab-Wechsel einbeziehen","달력 헤더 버튼 표시":"Kalender-Kopfzeilen-Schaltflächen","사생활 잠금":"Datenschutzsperre","상세보기":"Detailansicht","팀":"Team","다운로드 링크가 아직 준비되지 않았습니다. 관리자에게 문의하세요.":"Der Download-Link ist noch nicht bereit. Bitte an den Administrator wenden.","정규 좌석":"Bezahlte Plätze","보기 전용(무료)":"Nur Ansicht (gratis)","최하 등급(5)은 보기 전용·무료로 고정됩니다.":"Die unterste Stufe (5) ist auf Nur-Ansicht und gratis festgelegt.","단계":"Stufe","이름":"Name","공유":"Teilen","관리":"Verwalten","등급 설정":"Stufen-Einstellungen","등급 설정 저장":"Stufen speichern","등급 설정을 저장했습니다.":"Stufen gespeichert.","숫자 낮을수록 권한 높음. 소유자는 항상 전권입니다.":"Kleinere Zahl = mehr Rechte. Der Eigentümer hat immer alle Rechte.","공유 권한이 없습니다.":"Keine Freigabeberechtigung.","권한이 없습니다.":"Keine Berechtigung.","잘못된 등급입니다.":"Ungültige Stufe.","소유자 등급은 바꿀 수 없습니다.":"Eigentümer-Stufe unveränderbar.","설정 형식이 올바르지 않습니다.":"Ungültiges Format.","올리는 중…":"Wird hochgeladen…","이미지":"Bild","제거":"Entfernen","이미지 공지 10캐시 차감":"Bild-Ankündigung: 10 Cash","캐시":"Cash","캐시가 부족합니다.":"Nicht genug Cash.","필요":"Benötigt","이미지는 5MB 이하만 가능합니다.":"Bilder max. 5 MB.","팀 멤버가 아닙니다.":"Kein Teammitglied.","금액이 올바르지 않습니다.":"Ungültiger Betrag.","확인":"OK","공지":"Ankündigung","팀 공지":"Team-Ankündigung","공지 올리기":"Ankündigung posten","팀원에게 보낼 공지를 입력하세요":"Ankündigung für das Team eingeben","등록된 공지가 없습니다.":"Noch keine Ankündigungen.","공지 내용을 입력하세요.":"Bitte Ankündigung eingeben.","이 공지를 삭제할까요?":"Diese Ankündigung löschen?","다음에 이 창을 띄우지 않습니다":"Nicht mehr anzeigen","공지를 올릴 권한이 없습니다.":"Keine Berechtigung zum Posten.","내용이 비어 있습니다.":"Der Inhalt ist leer.","미완료":"Offen","건":" Einträge","숨김":"Ausgeblendet","💰입금":"💰 Einnahme","💸출금":"💸 Ausgabe","완료 시각":"Abschlusszeit","완료 숨기기":"Erledigte ausblenden","메모":"Notiz","오늘":"Heute","동기화":"Sync","탭 추가":"Tab hinzufügen","창 추가":"Fenster hinzufügen","✏️ 입력":"✏️ Eingabe","거치식":"Tilgungsfrei","달력 보기":"Kalender zeigen","달력 숨기기":"Kalender ausblenden","대기 중":"Wartet","동기화 오류":"Sync-Fehler","동기화 중...":"Synchronisiert...","드래그해서 순서 변경":"Ziehen zum Umsortieren","로그인":"Anmelden","마이너스통장":"Dispokredit","만기일시":"Endfällig","매년":"Jährlich","매월":"Monatlich","매일":"Täglich","매주":"Wöchentlich","미완료":"Offen","원금균등":"Gleiche Tilgung","원리금균등":"Annuität","저장하기":"Speichern","처리 중...":"Wird verarbeitet...","추가하기":"Hinzufügen","회원가입":"Registrieren","💹 펀드":"💹 Fonds","📊 미리보기":"📊 Vorschau","● 기타(1회성)":"● Sonstige (einmalig)","건수":"Anzahl","기간":"Zeitraum","기타(1회성)":"Sonstige (einmalig)","비율(%)":"Anteil (%)","입금 합계":"Summe Einnahmen","제목":"Titel","총 건수":"Gesamtanzahl","출금 합계":"Summe Ausgaben"," 입력 (API key 아님)":" Eingabe (kein API-Key)","Supabase 대시보드 → Settings → API →":"Supabase-Dashboard → Settings → API →","Supabase 미설정":"Supabase nicht eingerichtet","Supabase 설정 변경":"Supabase-Einstellungen ändern","Supabase 설정의 anon 키를 확인하세요 (service key 사용 불가)":"Prüfen Sie den anon-Schlüssel in den Supabase-Einstellungen (service key nicht erlaubt)","Supabase가 설정되지 않았습니다":"Supabase ist nicht konfiguriert","☁ 동기화 상태":"☁ Sync-Status","☁ 클라우드 동기화 설정":"☁ Cloud-Sync einrichten","☁ 클라우드 로그인":"☁ Cloud-Anmeldung","⚠ service_role 키입니다. anon 키를 입력하세요.":"⚠ Das ist ein service_role-Schlüssel. Geben Sie den anon-Schlüssel ein.","가입 완료! 이메일 인증 후 로그인하세요.":"Registriert! Bestätigen Sie Ihre E-Mail und melden Sie sich an.","동기화 중":"Synchronisiert","동기화됨":"Synchronisiert","라이선스 키가 유효하지 않습니다. 클라우드 동기화가 제한됩니다.":"Ungültiger Lizenzschlüssel. Cloud-Sync ist eingeschränkt.","라이선스 키를 입력하세요 (구매 시 전달됩니다)":"Lizenzschlüssel eingeben (beim Kauf erhalten)","로그인 필요":"Anmeldung erforderlich","를 복사하세요.":" kopieren.","마지막 동기화":"Zuletzt synchronisiert","비밀번호가 일치하지 않습니다":"Passwörter stimmen nicht überein","비밀번호는 6자 이상이어야 합니다":"Passwort muss mind. 6 Zeichen haben","아이디(이메일) 저장":"ID (E-Mail) speichern","에서 무료 계정 생성 후 키를 복사하세요":"dort ein kostenloses Konto erstellen und den Schlüssel kopieren","이메일 + ":"E-Mail + ","이메일 또는 비밀번호가 틀렸습니다":"E-Mail oder Passwort falsch","이메일 인증이 필요합니다. 메일함을 확인하세요":"E-Mail-Bestätigung erforderlich. Prüfen Sie Ihr Postfach","이메일과 비밀번호를 입력하세요":"E-Mail und Passwort eingeben","이미 등록된 이메일입니다":"E-Mail bereits registriert","자동 로그인 (끄면 다음 실행 때 로그아웃 상태로 시작)":"Auto-Login (aus = nächstes Mal abgemeldet starten)","자동 로그인 (다음 실행 시 자동으로 로그인)":"Auto-Login (nächstes Mal automatisch anmelden)","잘못된 키 형식입니다":"Ungültiges Schlüsselformat","지금 동기화":"Jetzt synchronisieren"," (은행)":" (Bank)","② 미리보기":"② Vorschau","가져오기 (":"Import (","건)":")","건) — ":") — ","건의 거래내역이 달력에 추가되었습니다.":" Transaktionen wurden zum Kalender hinzugefügt.","기준날짜 기준으로 잔액 역산":"Saldo ab Basisdatum zurückrechnen","당근거래 ":"Gebrauchtkäufe ","메모 (입출금 내역에 표시됩니다)":"Notiz (in Transaktionen angezeigt)","반복거래 ":"Wiederkehrend ","원본 적요: ":"Originalvermerk: ","원본: ":"Original: ","토스뱅크":"Toss Bank","🏦 은행 연동 키워드 ":"🏦 Bank-Stichwörter ","🏧 은행":"🏧 Bank","📦 가져오기 기록 (":"📦 Import-Verlauf (","🔄 반복거래 (":"🔄 Wiederkehrend (","🥕 당근거래 (1회성, ":"🥕 Gebrauchtkäufe (einmalig, ","🥕 당근거래 — 1회성 (":"🥕 Gebrauchtkäufe — einmalig (","일정 공유 (.ics)":"Termine teilen (.ics)","일정 받기 (.ics)":"Termine importieren (.ics)","일정을 .ics 파일로 내보내 카톡·메일로 공유":"Termine als .ics exportieren und per Chat/E-Mail teilen",".ics 파일에서 일정 가져오기 (중복 제외)":"Termine aus einer .ics-Datei importieren (Duplikate übersprungen)","내보낼 일정이 없습니다.":"Keine Termine zum Exportieren.","개 일정을 가져왔습니다.":" Termin(e) importiert.","개 중복 제외":" Duplikate übersprungen","올바른 일정 파일(.ics)이 아닙니다.":"Keine gültige Termindatei (.ics).","나":"ich","날짜와 제목을 입력하세요.":"Datum und Titel eingeben.","내 달력에 복사":"In meinen Kalender kopieren","내 달력에 복사했습니다.":"In deinen Kalender kopiert.","내 팀":"Meine Teams","멤버":"Mitglieder","명":"","복사":"Kopieren","뷰어":"Betrachter","소유자는 팀을 삭제해야 나갈 수 있습니다.":"Der Eigentümer muss das Team löschen, um es zu verlassen.","소유자만 할 수 있습니다.":"Nur der Eigentümer kann das.","아직 팀이 없습니다.":"Noch keine Teams.","이 멤버를 내보낼까요?":"Dieses Mitglied entfernen?","이 팀에서 나갈까요?":"Dieses Team verlassen?","일정 제목":"Termintitel","재발급":"Neu erzeugen","참여":"Beitreten","참여 코드":"Beitrittscode","참여 코드 6자리":"6-stelliger Code","참여 코드가 올바르지 않습니다.":"Ungültiger Beitrittscode.","추가":"Hinzufügen","코드로 참여":"Mit Code beitreten","코드를 복사했습니다.":"Code kopiert.","클라우드가 설정되지 않았습니다.":"Cloud ist nicht eingerichtet.","팀 공유는 로그인이 필요합니다. 먼저 상단의 동기화 버튼에서 로그인하세요.":"Team-Freigabe erfordert Anmeldung. Melde dich zuerst über die Sync-Schaltfläche oben an.","팀 나가기":"Team verlassen","팀 달력":"Team-Kalender","팀 만들기":"Team erstellen","팀 목록":"Teamliste","팀 삭제":"Team löschen","팀 이름 (예: 마케팅팀)":"Teamname (z. B. Marketing)","팀 이름을 입력하세요.":"Teamnamen eingeben.","팀 일정":"Team-Termine","팀 일정이 없습니다.":"Keine Team-Termine.","팀을 만들려면 라이선스가 필요합니다.":"Zum Erstellen eines Teams ist eine Lizenz erforderlich.","팀을 삭제하면 모든 팀 일정이 사라집니다. 삭제할까요?":"Beim Löschen des Teams werden alle Termine entfernt. Löschen?","편집자":"Bearbeiter","회사·팀원과 일정을 공유합니다":"Termine mit Firma/Team teilen","소유자":"Eigentümer","지역 변경":"Region ändern","표 크기 선택":"Tabellengröße wählen","끝으로 갈수록 칸이 늘어납니다":"Zellen wachsen am Rand","팀 달력 보기":"Team-Kalender ansehen","개인 달력 보기":"Persönlichen Kalender ansehen","보기 전용입니다 (편집 권한 없음)":"Nur Ansicht (keine Bearbeitung)","이 날 일정 공유":"Diesen Tag teilen","일정 없음":"Keine Termine","이미지 복사":"Bild kopieren","텍스트 복사":"Text kopieren","이미지 복사됨! 카톡에 붙여넣기(Ctrl+V)":"Bild kopiert! Einfügen (Strg+V)","텍스트 복사됨! 카톡에 붙여넣기(Ctrl+V)":"Text kopiert! Einfügen (Strg+V)","이미지 복사 실패 — 텍스트로 시도하세요":"Bildkopie fehlgeschlagen — Text versuchen","복사 실패":"Kopieren fehlgeschlagen","팀 달력만 사용":"Nur Team-Kalender verwenden","개인 달력 없이 팀 달력으로 시작합니다 (회사용)":"Ohne persönlichen Kalender mit dem Team-Kalender starten (für Firmen)","팀 보기 시 팀 선택 창 표시":"Team-Auswahl beim Wechsel zur Team-Ansicht anzeigen","여러 팀을 자주 바꿀 때 켜세요. 끄면 마지막 팀을 바로 엽니다":"Aktivieren, wenn Sie oft wechseln. Aus = letztes Team direkt öffnen","팀 선택":"Team wählen","팀 전환":"Team wechseln","👥 팀 이름":"👥 Teamname","진행중":"Laufend","개":"","년":"","목록":"Liste","새 메모":"Neue Notiz","메모 키보드 조작":"Notiz-Tastatursteuerung","입력칸: ESC 후 1.5초 내 Backspace → 목록 · 목록: ↑↓ 선택, Ctrl+→ 열기, Ctrl+← 나가기":"Eingabe: ESC dann Backspace in 1,5s → Liste · Liste: ↑↓ wählen, Strg+→ öffnen, Strg+← zurück","입력: Ctrl+← 또는 ESC후 Backspace → 목록 · 목록: ↑↓ 선택, → 열기, ← 접기, Enter 편집":"Eingabe: Strg+← oder ESC+Backspace → Liste · Liste: ↑↓ wählen, → öffnen, ← schließen, Enter bearbeiten","테마":"Thema","(무료)":"(gratis)","부산 갈매기":"Busan-Möwe","정글 악어":"Dschungel-Krokodil","팀 관리":"Team-Einstellungen","이 달 일정 공유":"Diesen Monat teilen","일정 공유":"Termine teilen","엑셀로 내보내기":"Nach Excel exportieren","엑셀 파일을 저장했습니다":"Excel-Datei gespeichert","% 표시":"% anzeigen","(1초 길게 누르면 📌 피드백 메모)":"(1 Sek. halten für 📌 Feedback-Notiz)","(1초 이상 올리면 설명)":"(1 Sek.+ schweben für Details)","(service key 아님)":"(kein Service Key)","(변경 시 추가)":"(bei Änderung hinzufügen)","(선택)":"(optional)","(클릭 수정)":"(zum Bearbeiten klicken)","+ 대출":"+ Kredit","+ 적금·펀드":"+ Sparen/Fonds",".xlsx 파일 지원":".xlsx-Dateien unterstützt","2026년 5월":"Mai 2026","2글자":"2 Zeichen","CSV로 내보내기 (Excel에서 열기 가능)":"Als CSV exportieren (in Excel öffenbar)","D-Day 창의 대출·적금 추가 버튼 모양을 고릅니다":"Stil der Kredit-/Spar-Hinzufügen-Schaltfläche im D-Day-Panel wählen","Do! 리스트":"Do!-Liste","Do! 리스트 — 할 일을 적어두고 달력 날짜로 드래그":"Do!-Liste — Aufgaben notieren und auf ein Datum ziehen","JSON 파일로 데이터 가져오기":"Daten aus JSON-Datei importieren","anon (공개키)":"anon (öffentlicher Schlüssel)","service_role(비밀키)는 절대 사용 금지.":"service_role (geheimer Schlüssel) niemals verwenden.","v66: React 에러 발생":"v66: React-Fehler aufgetreten","• KB국민은행, 신한은행 등 — 추후 지원 예정":"• KB, Shinhan usw. — bald verfügbar","• 토스뱅크 — 엑셀 거래내역 (.xlsx)":"• Toss Bank — Excel-Umsätze (.xlsx)","※ 간단한 화면 잠금용입니다. 비밀번호를 잊으면 로그아웃(초기화) 후 다시 로그인해야 합니다.":"※ Einfache Bildschirmsperre. Bei vergessenem Passwort abmelden (zurücksetzen) und neu anmelden.","※ 월주는 양력 근사 계산 (절기 미반영)":"※ Monatssäule als Solar-Näherung (ohne Solarterme)","→ 다른 날짜 또는 같은 날 일정 위에 놓기(순서 변경)":"→ Auf ein anderes Datum oder einen Termin am selben Tag ablegen (neu ordnen)","→ 역산 금리":"→ Impliziter Zins","⏩ 배속":"⏩ Tempo","▲ 입금":"▲ Einnahme","▼ 출금":"▼ Ausgabe","☀️ 양력":"☀️ Solar","☀️ 양력 기준":"☀️ Solar-Basis","☑ 할 일":"☑ Aufgabe","⚡ 상극: 목↔토 화↔금 토↔수 금↔목 수↔화":"⚡ Konflikt: Holz↔Erde Feuer↔Metall Erde↔Wasser Metall↔Holz Wasser↔Feuer","✓ 금리가 적용되었습니다. 저장하려면 대출 수정에서 저장하세요.":"✓ Zins angewendet. Zum Speichern in „Kredit bearbeiten“ speichern.","✓ 지원 형식":"✓ Unterstützte Formate","✕ 초기화":"✕ Zurücksetzen","⭐ D-Day 창":"⭐ D-Day-Panel","「곡 추가하기」를 눌러 노래를 추가하세요":"„Song hinzufügen“ drücken, um Musik hinzuzufügen","가계부":"Haushaltsbuch","가계부 열기":"Haushaltsbuch öffnen","가나다":"ABC","가져오기":"Import","가져오기 완료!":"Import abgeschlossen!","가져온 은행 거래내역이 없습니다.":"Keine importierten Bankumsätze.","거래 분류 수정":"Transaktionskategorie bearbeiten","거래 종류별 이름 / 카테고리 / 색상 설정 (다음 가져오기에도 자동 적용됩니다)":"Name / Kategorie / Farbe je Transaktionstyp festlegen (wird beim nächsten Import automatisch übernommen)","거치기간 (개월)":"Karenzzeit (Monate)","건너뛰기":"Überspringen","검색 결과 없음":"Keine Ergebnisse","검색어 입력 또는 색상 필터 선택":"Suchbegriff eingeben oder Farbfilter wählen","경과 기간별 알림 임계값":"Benachrichtigungsschwellen nach verstrichenen Tagen","경과 일수 이상이면 해당 색상·아이콘으로 표시됩니다.":"Ab den verstrichenen Tagen wird die Farbe/das Symbol angezeigt.","계산 기록":"Verlauf","계산기":"Rechner","계산상 납입금":"Berechnete Rate","계좌 가져오기":"Bank importieren","국가":"Land","권장: 32×32 ~ 64×64 픽셀, PNG(투명 배경) — 최대 100KB":"Empfohlen: 32×32 – 64×64 px, PNG (transparent) — max. 100 KB","글씨 색상":"Textfarbe","글씨 크기 (앱 전체)":"Schriftgröße (ganze App)","글씨체":"Schriftart","금리":"Zins","금리 변경 이력":"Zinsänderungsverlauf","금리 이력 없음":"Kein Zinsverlauf","금액":"Betrag","금액 (선택)":"Betrag (optional)","금액 유형":"Betragstyp","금액 입력 (원)":"Betrag eingeben (KRW)","금액 입력 시 금리가 자동 계산됩니다":"Bei Betragseingabe wird der Zins automatisch berechnet","금액·기간·금리를 입력하면 납입 스케줄이 표시됩니다.":"Betrag, Laufzeit und Zins eingeben, um den Zahlungsplan anzuzeigen.","기간 (개월)":"Laufzeit (Monate)","기간별 색상:":"Farben nach Zeitraum:","기념일":"Jahrestag","기념일 · 반복일정":"Jahrestage · Wiederkehrend","기념일 이름 (예: 아내 생일)":"Name des Jahrestags (z. B. Geburtstag der Frau)","기록 없음":"Keine Einträge","기본값":"Standard","기존 금리":"Aktueller Zins","기준날짜":"Basisdatum","기준잔액 (원)":"Basissaldo (KRW)","기준잔액 직접 설정":"Basissaldo manuell festlegen","나중에":"Später","날씨 불러오는 중...":"Wetter wird geladen...","날씨 정보를 불러올 수 없습니다 (인터넷 확인)":"Wetter konnte nicht geladen werden (Internet prüfen)","날짜":"Datum","날짜 범위 필터":"Datumsbereichsfilter","납부일":"Zahltag","납입":"Einzahlung","납입 월":"Einzahlungsmonat","납입금":"Einzahlung","납입기간 (개월)":"Sparlaufzeit (Monate)","납입액":"Sparbetrag","납입액·기간·이율을 입력하면 예상 결과가 표시됩니다.":"Sparbetrag, Laufzeit und Zins eingeben, um die Prognose anzuzeigen.","납입일":"Spartag","내보내기":"Export","내역":"Details","내역 없음":"Keine Einträge","내용":"Inhalt","네이버페이충전 +100,000":"NaverPay-Aufladung +100.000","년도":"Jahr","누적액":"Kumuliert","다운로드":"Download","닫기":"Schließen","달력":"Kalender","달력 글씨 크기":"Kalender-Schriftgröße","달력 버튼 단축키":"Kalender-Tastenkürzel","달력 색상":"Kalenderfarben","달력 작게":"Kalender verkleinern","달력 크게 (창보다 커지면 스크롤로 봅니다)":"Kalender vergrößern (bei Überschreiten des Fensters scrollen)","달력 표시 설정":"Kalenderanzeige-Einstellungen","달력의 각 일정 오른쪽에 삭제 버튼이 생깁니다":"Rechts an jedem Termin erscheint eine Löschen-Schaltfläche","달력이 분리 중입니다":"Kalender wird abgetrennt","대출 / 적금·펀드":"Kredite / Sparen·Fonds","대출 시작일":"Kreditbeginn","대출 연결 (선택)":"Kredit verknüpfen (optional)","대출 이름":"Kreditname","대출 추가":"Kredit hinzufügen","대출·적금 추가 버튼 표시":"Anzeige der Kredit-/Spar-Hinzufügen-Schaltfläche","대출금액 (원)":"Kreditbetrag (KRW)","대출납입":"Kreditzahlung","데이터를 JSON 파일로 내보내기":"Daten als JSON-Datei exportieren","도시":"Stadt","드래그로 입력칸 크기 조절":"Eingabefeld durch Ziehen anpassen","드래그하여 창 크기 조절":"Fenstergröße durch Ziehen anpassen","등록된 대출 / 적금·펀드가 없습니다":"Keine Kredite / Sparpläne registriert","라이선스 키 (구매 시 전달)":"Lizenzschlüssel (beim Kauf erhalten)","로 저장됩니다":"wird gespeichert","로그아웃":"Abmelden","로그인됨":"Angemeldet","리셋":"Zurücksetzen","만기 수령액":"Auszahlung bei Fälligkeit","만기 예상액":"Voraussichtl. Fälligkeitsbetrag","만들기":"Erstellen","맞춤":"Anpassen","매년 반복 (생일 등)":"Jährlich wiederholen (Geburtstage usw.)","매월 납부하는 날 (비우면 시작일 기준)":"Monatlicher Zahltag (leer = Startdatum)","매월 납입하는 날 (비우면 시작일 기준)":"Monatlicher Spartag (leer = Startdatum)","메뉴":"Menü","메모 (선택)":"Notiz (optional)","메모 1":"Notiz 1","메모 2":"Notiz 2","메모 3":"Notiz 3","메모 4":"Notiz 4","메모 5":"Notiz 5","메모가 없습니다":"Keine Notizen","모든 데이터 초기화":"Alle Daten zurücksetzen","미리보기":"Vorschau","미완료 할 일":"Offene Aufgaben","반복":"Wiederholen","반복 O":"Wiederh. ✓","반복 X":"Wiederh. ✗","반복 일정":"Wiederkehrend","배경색":"Hintergrundfarbe","배경화면":"Hintergrundbild","분 후":"Min. später","분석하기 ✨":"Analysieren ✨","비밀번호":"Passwort","비밀번호 (6자 이상)":"Passwort (6+ Zeichen)","비밀번호 입력":"Passwort eingeben","비밀번호 확인":"Passwort bestätigen","비밀번호가 올바르지 않습니다":"Falsches Passwort","비활성 타이머":"Leerlauf-Timer","빨간색":"Rot","사생활 모드":"Privatsphäre-Modus","사용자 지정 색상":"Eigene Farbe","사주팔자 (四柱八字)":"Vier Säulen (四柱八字)","삭제":"Löschen","상단 버튼 크기":"Größe der oberen Schaltflächen","상세보기 (전체 D-Day 목록)":"Details (gesamte D-Day-Liste)","새 폴더 이름 입력 후 Enter":"Neuen Ordnernamen eingeben und Enter","색상":"Farbe","색상 선택":"Farbe wählen","색상:":"Farbe:","생년월일시를 입력하면 사주팔자와 음양오행을 분석합니다":"Geburtsdatum/-zeit eingeben, um Vier Säulen und Fünf Elemente zu analysieren","생년월일을 입력하고 분석하기를 눌러주세요":"Geburtsdatum eingeben und Analysieren drücken","선택 안함":"Keine","선택한 월에 거래 없음":"Keine Transaktionen im gewählten Monat","설정":"Einstellungen","성을 포함한 한글 이름을 두 글자 이상 입력하세요":"Koreanischen Namen (mit Nachname), 2+ Zeichen eingeben","소리오행 흐름":"Klang-Element-Fluss","수기납입 → 금리 자동계산":"Manuelle Zahlung → automatische Zinsberechnung","수정":"Bearbeiten","순서 변경 중 — 빈 곳 클릭 시 종료":"Neu ordnen — leere Fläche klicken zum Beenden","순서 변경 중 — 빈 곳 클릭하면 종료":"Neu ordnen — leere Fläche klicken zum Beenden","순수지":"Netto","숨기기":"Ausblenden","숫자 키로 입력 — shift 모드 (예: 2026 입력 후 2 누르면 0262)":"Mit Zifferntasten eingeben — Shift-Modus (z. B. nach 2026 ergibt 2 dann 0262)","시간 미입력 시 시주 생략":"Ohne Zeitangabe wird die Stundensäule ausgelassen","시작 일수":"Starttag","시작일":"Startdatum","실제 납입금액 (원)":"Tatsächliche Zahlung (KRW)","실제 납입한 금액을 입력하면 해당 달의 금리를 역산해서 그 이후 납입 스케줄을 다시 계산합니다.":"Bei Eingabe des tatsächlich gezahlten Betrags wird der Zins des Monats zurückgerechnet und der weitere Plan neu berechnet.","아이콘":"Symbol","알림 아이콘 이미지":"Benachrichtigungssymbol-Bild","언어":"Sprache","없음":"Keine","엑셀 원본 잔액":"Excel-Originalsaldo","엑셀 파일을 여기에 드롭하거나 클릭하여 선택":"Excel-Datei hierher ziehen oder klicken zum Auswählen","역산 결과":"Rückrechnungsergebnis","역산 금리":"Impliziter Zins","연결 안 함":"Nicht verknüpft","연도":"Jahr","예: 1,000,000":"z. B. 1.000.000","예: 1,520,000":"z. B. 1.520.000","예: 10, 6, 12":"z. B. 10, 6, 12","예: 12":"z. B. 12","예: SKT, 카드연회비, 통신비...":"z. B. SKT, Kartengebühr, Telefonrechnung...","예: 洪吉童":"z. B. 洪吉童","예: 홍길동":"z. B. Hong Gildong","예상 이자":"Erwartete Zinsen","오늘로":"Heute","오디오 URL 또는 YouTube 링크":"Audio-URL oder YouTube-Link","오른쪽에 고정":"Rechts andocken","오른쪽으로":"Nach rechts","오행 분포 (陰陽五行)":"Elementverteilung (陰陽五行)","오행 상생·상극 (五行相生相剋)":"Element-Erzeugung/-Konflikt (五行相生相剋)","올해로":"Dieses Jahr","완료":"Fertig","완료 시간":"Abgeschlossen am","완료 항목 삭제":"Erledigte löschen","완료 항목 전체 삭제":"Alle erledigten löschen","완료한 일":"Erledigt","완료한 할 일이 없습니다":"Keine erledigten Aufgaben","왼쪽에 고정":"Links andocken","왼쪽으로":"Nach links","운세":"Horoskop","원금":"Kapital","월":"Monat","월 납입액 (원)":"Monatliche Sparrate (KRW)","유형":"Typ","유효한 금액을 입력해주세요":"Bitte einen gültigen Betrag eingeben","은행":"Bank","은행 거래내역 가져오기":"Bankumsätze importieren","은행 거래내역 가져오기에서 이 키워드와 일치하는 항목이 있으면, 같은 달 이 반복일정을 자동으로 숨겨 중복을 방지합니다.":"Wenn ein importierter Bankumsatz diesem Stichwort entspricht, wird dieser wiederkehrende Termin im selben Monat automatisch ausgeblendet, um Duplikate zu vermeiden.","음양오행 이론 기반 · 재미로 보는 운세입니다 🙂":"Basierend auf Yin-Yang-Fünf-Elementen · nur zum Spaß 🙂","이 버전 알림 다시 보지 않기":"Diese Version nicht mehr anzeigen","이 색상의 용도 이름 — 이 창에서만 표시됩니다":"Bezeichnung für diese Farbe — nur in diesem Fenster sichtbar","이 색상의 용도 이름 입력 (최대 2글자)":"Verwendung dieser Farbe benennen (max. 2 Zeichen)","이 시기엔 중요한 결정을 서두르지 마세요":"Treffen Sie in dieser Zeit keine übereilten wichtigen Entscheidungen","이 폴더에 넣을 곡 선택하기":"Songs für diesen Ordner auswählen","이름 (한글, 성 포함)":"Name (Koreanisch, mit Nachname)","이메일":"E-Mail","이미지 선택":"Bild wählen","이미지 없음":"Kein Bild","이미지를 선택하면 배경으로 적용됩니다":"Ein gewähltes Bild wird als Hintergrund übernommen","이자":"Zinsen","일":"Tag","일 이상":"Tage oder mehr","일요일 색상 구분":"Sonntage hervorheben","일정":"Termine","일정 내용 미리보기":"Terminvorschau","일정 삭제":"Termin löschen","일정 시간 조작 없으면 화면이 투명해집니다":"Ohne Aktivität wird der Bildschirm transparent","일정, 메모, D-Day 검색...":"Termine, Notizen, D-Day suchen...","일정으로":"Zum Termin","입금":"Einnahme","입력칸을 클릭한 뒤 원하는 키(조합키 가능: Ctrl/Alt/Shift+키)를 누르면 저장됩니다. Backspace로 삭제. 달력 창이 열려 있을 때 작동하며, 글자 입력 중에는 무시됩니다.":"Feld anklicken und Taste drücken (Kombis möglich: Strg/Alt/Umschalt). Rücktaste zum Löschen. Funktioniert bei geöffnetem Kalender; beim Tippen ignoriert.","작성 시간":"Erstellt am","잔액":"Saldo","잔액 표시 기준":"Basis der Saldoanzeige","잠금 비밀번호":"Sperr-Passwort","잠금 해제":"Entsperren","잠금화면 배경":"Sperrbildschirm-Hintergrund","재생바":"Player","재생바 접기 (1:재생바 숨김 → 2:배속 숨김 → 3:최소 → 4:전체)":"Player einklappen (1: Leiste aus → 2: Tempo aus → 3: minimal → 4: voll)","저사양 PC에서는 꺼두는 것을 권장합니다":"Auf schwachen PCs besser deaktivieren","저장":"Speichern","저장하고 로그인":"Speichern und anmelden","저장하면 같은 원본 적요의 기존 이벤트도 모두 업데이트됩니다.":"Beim Speichern werden auch alle vorhandenen Einträge mit demselben Originalvermerk aktualisiert.","적금 · 펀드":"Sparen · Fonds","적금·펀드 추가":"Sparen/Fonds hinzufügen","적금납입":"Spareinzahlung","적요":"Vermerk","전체":"Alle","전체 삭제":"Alle löschen","제목 (URL 입력 후 자동 완성)":"Titel (nach URL-Eingabe automatisch)","종료일":"Enddatum","주황":"Orange","중복 (체크로 강제 추가)":"Duplikat (ankreuzen zum Erzwingen)","중요한 약속·새 시작에 좋은 날입니다":"Ein guter Tag für wichtige Termine und Neuanfänge","지남":"vergangen","지우기":"Löschen","직접 조절":"Manuell","진행중인 일":"In Bearbeitung","진행중인 할 일이 없습니다":"Keine laufenden Aufgaben","창 배경 투명도":"Fensterhintergrund-Transparenz","창 열기":"Fenster öffnen","찾기":"Suchen","철학관 원리 기반 · 재미로 보는 사주입니다 🙏":"Basierend auf traditionellen Saju-Prinzipien · nur zum Spaß 🙏","초기화":"Zurücksetzen","총 납입액":"Gesamteinzahlungen","최근 6년 연별 요약":"Jahresübersicht (letzte 6 Jahre)","출금":"Ausgabe","출금 내역 없음":"Keine Ausgaben","출금 합계":"Summe der Ausgaben","취소":"Abbrechen","카테고리":"Kategorie","커스텀 색상":"Eigene Farbe","클릭 즉시 저장 | 엑셀 복붙 지원":"Speichert beim Klick | Excel-Einfügen unterstützt","클릭 후 키 입력":"Klicken, dann Taste drücken","태어난 시간 (선택 — 시주 계산에 사용)":"Geburtszeit (optional — für Stundensäule)","탭 삭제":"Tab löschen","토요일 색상 구분":"Samstage hervorheben","투명도":"Transparenz","파란색":"Blau","팝업으로":"Als Pop-up","패널 내용 영역 미리보기":"Vorschau des Panel-Inhalts","패널 미리보기":"Panel-Vorschau","패널 배경 기준색":"Panel-Grundfarbe","패널 배경 투명도":"Panel-Hintergrund-Transparenz","패널 배경색 기준":"Panel-Hintergrundbasis","패널 투명도 / 색상":"Panel-Transparenz / Farbe","폴더 만들기 — 곡 목록에서 각 곡의 폴더를 지정할 수 있습니다":"Ordner erstellen — in der Songliste jedem Song einen Ordner zuweisen","폴더 지정":"Ordner zuweisen","표 삽입":"Tabelle einfügen","표시 방식":"Anzeigemodus","표시 설정":"Anzeigeeinstellungen","표시 위치":"Position","표시 이름":"Anzeigename","피드백 등록!":"Feedback gespeichert!","피드백 메모 등록":"Feedback-Notiz hinzufügen","피드백 알림에 쓸 이미지를 직접 올릴 수 있습니다.":"Sie können ein eigenes Bild für Feedback-Hinweise hochladen.","한자 표기 (선택)":"Hanja (optional)","한자 획수 (선택 — 글자별 획수를 쉼표로. 비우면 한글 획수로 계산)":"Hanja-Striche (optional — je Zeichen, kommagetrennt; leer nutzt Hangul-Striche)","할 일":"Aufgabe","할 일 입력 후 Enter":"Aufgabe eingeben und Enter","할 일을 입력해 블록을 만들고, 클릭해서 체크한 뒤 달력 날짜로 드래그하세요. 체크된 블록이 한꺼번에 들어갑니다.":"Aufgabe eingeben, um einen Block zu erstellen, anklicken zum Markieren und auf ein Datum ziehen. Markierte Blöcke werden gemeinsam eingefügt.","합계":"Summe","항목":"Position","항목이 없습니다":"Keine Einträge","행운 색":"Glücksfarbe","행운 숫자":"Glückszahl","현재":"Jetzt","현재 금리":"Aktueller Zins","현재 적용중":"Derzeit aktiv","현재 표시 년월":"Angezeigter Monat","화면에 맞추기":"An Bildschirm anpassen","화면이 잠겨 있습니다":"Bildschirm ist gesperrt","활성 피드백이 없습니다.":"Kein aktives Feedback.","🌙 음력":"🌙 Mondkalender","🌙 입력한 날짜를 음력으로 저장합니다.":"🌙 Das eingegebene Datum wird als Monddatum gespeichert.","🎵 음악":"🎵 Musik","🎵 재생바":"🎵 Player","🎵 재생바 창":"🎵 Player-Fenster","🏦 대출":"🏦 Kredit","🏦 대출 추가":"🏦 Kredit hinzufügen","💰 가계부":"💰 Haushaltsbuch","💰 입출금 현황":"💰 Cashflow","📅 달력":"📅 Kalender","📅 달력 패널":"📅 Kalender-Panel","📅 헤더":"📅 Kopfzeile","📈 적금":"📈 Sparen","📈 적금·펀드 추가":"📈 Sparen/Fonds hinzufügen","📊 출금 분석":"📊 Ausgabenanalyse","📋 상세 정보":"📋 Details","📋 할 일 목록":"📋 Aufgabenliste","📜 사주와 이름의 궁합":"📜 Saju & Namensharmonie","📜 원장 종합 분석 — 오행 생극(生剋)으로 본 오늘":"📜 Gesamtdeutung — heute nach Element-Erzeugung/-Konflikt","📝 내용":"📝 Inhalt","📝 메모":"📝 Notiz","📥 내보내기":"📥 Export","🔄 상생: 목→화→토→금→수→목":"🔄 Erzeugung: Holz→Feuer→Erde→Metall→Wasser→Holz","🔐 지금 잠그기":"🔐 Jetzt sperren","🔢 계산기":"🔢 Rechner","🔢 계산기 창":"🔢 Rechner-Fenster","🔢 날짜":"🔢 Datum","🔮 운세":"🔮 Horoskop","🔮 운세 창":"🔮 Horoskop-Fenster","🔮 운세·사주":"🔮 Horoskop·Saju","🖊️ 수기납입 입력 → 금리 자동계산":"🖊️ Manuelle Zahlung eingeben → automatische Zinsberechnung"},
    es: {"월 이동":"Ir al mes","날짜 클릭 · 0.5초 누르고 드래그로 여러 개 · 다른 달로 옮겨도 유지":"Clic en fecha · mantén 0,5s y arrastra · se conserva entre meses","이미지로 내보내기":"Exportar como imagen","텍스트로 내보내기":"Exportar como texto","ics로 내보내기":"Exportar como .ics","달력에서 날짜를 클릭해 선택하세요":"Haz clic en las fechas del calendario","달력에서 날짜 클릭 · ":"Haz clic en fechas · "," 선택됨":" sel.","월·날짜를 골라 이미지·표·ics로 공유":"Elige mes y días; comparte como imagen/tabla/ics","일정 공유 — 월 선택":"Compartir — elige mes","월을 고르면 그 달로 이동, 날짜를 눌러 선택하세요":"Elige un mes y haz clic en los días","일 선택됨":" días","일 · 공유 형식":" días · formato","텍스트(표) 복사":"Copiar texto (tabla)","파일 저장":"guardar","표 복사됨! 엑셀에 붙여넣기(Ctrl+V)":"¡Tabla copiada! Pega en Excel (Ctrl+V)","ics 파일을 저장했습니다":"Archivo .ics guardado","패널 캐릭터 스킨":"Skin de personaje del panel","이전 내 배경으로 되돌리기":"Restaurar mi fondo anterior","이 색 일정":"Eventos de este color","날짜 ↑":"Fecha ↑","날짜 ↓":"Fecha ↓","이름 ↑":"Nombre ↑","이름 ↓":"Nombre ↓","해당 색 일정이 없습니다":"Sin eventos de este color","보기 방식 (캐러셀/기본)":"Modo (carrusel/básico)","←→ 칸 이동 · Enter 들어가기 · 안에서 ↑↓ 이동 · → 펼치기 · ← 접기 · Esc 뒤로":"←→ columna · Enter abrir · dentro ↑↓ · → abrir · ← cerrar · Esc atrás","크기 조절":"Redimensionar","(빈 메모)":"(vacío)","텍스트 필터":"Filtro de texto","색깔 필터":"Filtro de color","메모 내용 검색":"Buscar en las notas","필터 초기화":"Restablecer filtros","↑↓ 이동 · → 펼치기 · ← 접기 · Enter 편집 · Esc 뒤로":"↑↓ mover · → abrir · ← cerrar · Enter editar · Esc atrás","메모 상세":"Vista de notas","Tab으로 메모 이동":"Cambiar de nota con Tab","체크한 메모끼리 Tab 키로 이동. 각 메모 제목줄의 체크박스로 선택":"Tab recorre solo las notas marcadas. Selecciona con la casilla en la barra de título.","Tab 이동에 포함":"Incluir en el ciclo Tab","달력 헤더 버튼 표시":"Botones del encabezado del calendario","사생활 잠금":"Bloqueo de privacidad","상세보기":"Vista detallada","팀":"Equipo","다운로드 링크가 아직 준비되지 않았습니다. 관리자에게 문의하세요.":"El enlace de descarga aún no está listo. Contacta al administrador.","정규 좌석":"Asientos de pago","보기 전용(무료)":"Solo ver (gratis)","최하 등급(5)은 보기 전용·무료로 고정됩니다.":"El nivel más bajo (5) queda fijo en solo ver y gratis.","단계":"Nivel","이름":"Nombre","공유":"Compartir","관리":"Gestionar","등급 설정":"Config. de niveles","등급 설정 저장":"Guardar niveles","등급 설정을 저장했습니다.":"Niveles guardados.","숫자 낮을수록 권한 높음. 소유자는 항상 전권입니다.":"Menor número = más permisos. El propietario siempre tiene todos.","공유 권한이 없습니다.":"Sin permiso para compartir.","권한이 없습니다.":"Sin permiso.","잘못된 등급입니다.":"Nivel no válido.","소유자 등급은 바꿀 수 없습니다.":"No se puede cambiar el nivel del propietario.","설정 형식이 올바르지 않습니다.":"Formato no válido.","올리는 중…":"Subiendo…","이미지":"Imagen","제거":"Quitar","이미지 공지 10캐시 차감":"Aviso con imagen: 10","캐시":"saldo","캐시가 부족합니다.":"Saldo insuficiente.","필요":"Necesario","이미지는 5MB 이하만 가능합니다.":"Máx. 5 MB por imagen.","팀 멤버가 아닙니다.":"No eres miembro del equipo.","금액이 올바르지 않습니다.":"Importe no válido.","공지":"Aviso","팀 공지":"Aviso del equipo","공지 올리기":"Publicar aviso","팀원에게 보낼 공지를 입력하세요":"Escribe un aviso para el equipo","등록된 공지가 없습니다.":"Aún no hay avisos.","공지 내용을 입력하세요.":"Introduce el aviso.","이 공지를 삭제할까요?":"¿Eliminar este aviso?","다음에 이 창을 띄우지 않습니다":"No mostrar de nuevo","확인":"Aceptar","공지를 올릴 권한이 없습니다.":"No tienes permiso para publicar.","내용이 비어 있습니다.":"El contenido está vacío.","미완료":"Incompletas","건":" ítems","숨김":"Ocultas","💰입금":"💰 Ingreso","💸출금":"💸 Gasto","완료 시각":"Hora de finalización","완료 숨기기":"Ocultar completadas","메모":"Nota","오늘":"Hoy","동기화":"Sinc.","탭 추가":"Añadir pestaña","창 추가":"Añadir ventana","✏️ 입력":"✏️ Entrada","거치식":"Con carencia","달력 보기":"Ver calendario","달력 숨기기":"Ocultar calendario","대기 중":"En espera","동기화 오류":"Error de sinc.","동기화 중...":"Sincronizando...","드래그해서 순서 변경":"Arrastra para reordenar","로그인":"Iniciar sesión","마이너스통장":"Cuenta en descubierto","만기일시":"Pago al vencimiento","매년":"Anual","매월":"Mensual","매일":"Diario","매주":"Semanal","미완료":"Incompletas","원금균등":"Capital constante","원리금균등":"Cuota constante","저장하기":"Guardar","처리 중...":"Procesando...","추가하기":"Añadir","회원가입":"Registrarse","💹 펀드":"💹 Fondo","📊 미리보기":"📊 Vista previa","● 기타(1회성)":"● Otros (única vez)","건수":"Cantidad","기간":"Periodo","기타(1회성)":"Otros (única vez)","비율(%)":"Proporción (%)","입금 합계":"Total ingresos","제목":"Título","총 건수":"Total","출금 합계":"Total gastos"," 입력 (API key 아님)":" entrada (no API key)","Supabase 대시보드 → Settings → API →":"Panel de Supabase → Settings → API →","Supabase 미설정":"Supabase sin configurar","Supabase 설정 변경":"Cambiar ajustes de Supabase","Supabase 설정의 anon 키를 확인하세요 (service key 사용 불가)":"Verifica la clave anon en los ajustes de Supabase (service key no permitida)","Supabase가 설정되지 않았습니다":"Supabase no está configurado","☁ 동기화 상태":"☁ Estado de sinc.","☁ 클라우드 동기화 설정":"☁ Configurar sinc. en la nube","☁ 클라우드 로그인":"☁ Inicio de sesión en la nube","⚠ service_role 키입니다. anon 키를 입력하세요.":"⚠ Esta es una clave service_role. Introduce la clave anon.","가입 완료! 이메일 인증 후 로그인하세요.":"¡Registrado! Verifica tu correo e inicia sesión.","동기화 중":"Sincronizando","동기화됨":"Sincronizado","라이선스 키가 유효하지 않습니다. 클라우드 동기화가 제한됩니다.":"Clave de licencia no válida. La sinc. en la nube está restringida.","라이선스 키를 입력하세요 (구매 시 전달됩니다)":"Introduce tu clave de licencia (se entrega al comprar)","로그인 필요":"Requiere iniciar sesión","를 복사하세요.":" cópiala.","마지막 동기화":"Última sinc.","비밀번호가 일치하지 않습니다":"Las contraseñas no coinciden","비밀번호는 6자 이상이어야 합니다":"La contraseña debe tener 6+ caracteres","아이디(이메일) 저장":"Guardar ID (correo)","에서 무료 계정 생성 후 키를 복사하세요":"crea una cuenta gratis allí y copia la clave","이메일 + ":"Correo + ","이메일 또는 비밀번호가 틀렸습니다":"Correo o contraseña incorrectos","이메일 인증이 필요합니다. 메일함을 확인하세요":"Se requiere verificar el correo. Revisa tu bandeja","이메일과 비밀번호를 입력하세요":"Introduce correo y contraseña","이미 등록된 이메일입니다":"Correo ya registrado","자동 로그인 (끄면 다음 실행 때 로그아웃 상태로 시작)":"Inicio automático (apagado = iniciar sin sesión la próxima vez)","자동 로그인 (다음 실행 시 자동으로 로그인)":"Inicio automático (iniciar sesión la próxima vez)","잘못된 키 형식입니다":"Formato de clave no válido","지금 동기화":"Sincronizar ahora"," (은행)":" (Banco)","② 미리보기":"② Vista previa","가져오기 (":"Importar (","건)":")","건) — ":") — ","건의 거래내역이 달력에 추가되었습니다.":" transacciones se añadieron al calendario.","기준날짜 기준으로 잔액 역산":"Recalcular saldo desde la fecha base","당근거래 ":"Compraventa ","메모 (입출금 내역에 표시됩니다)":"Nota (se muestra en los movimientos)","반복거래 ":"Recurrentes ","원본 적요: ":"Concepto original: ","원본: ":"Original: ","토스뱅크":"Toss Bank","🏦 은행 연동 키워드 ":"🏦 Palabras clave del banco ","🏧 은행":"🏧 Banco","📦 가져오기 기록 (":"📦 Historial de importación (","🔄 반복거래 (":"🔄 Recurrentes (","🥕 당근거래 (1회성, ":"🥕 Compraventa (única vez, ","🥕 당근거래 — 1회성 (":"🥕 Compraventa — única vez (","일정 공유 (.ics)":"Compartir agenda (.ics)","일정 받기 (.ics)":"Importar agenda (.ics)","일정을 .ics 파일로 내보내 카톡·메일로 공유":"Exporta eventos como .ics para compartir por chat/correo",".ics 파일에서 일정 가져오기 (중복 제외)":"Importa eventos de un archivo .ics (omite duplicados)","내보낼 일정이 없습니다.":"No hay eventos para exportar.","개 일정을 가져왔습니다.":" evento(s) importado(s).","개 중복 제외":" duplicados omitidos","올바른 일정 파일(.ics)이 아닙니다.":"No es un archivo de agenda válido (.ics).","나":"yo","날짜와 제목을 입력하세요.":"Introduce fecha y título.","내 달력에 복사":"Copiar a mi calendario","내 달력에 복사했습니다.":"Copiado a tu calendario.","내 팀":"Mis equipos","멤버":"Miembros","명":"","복사":"Copiar","뷰어":"Lector","소유자는 팀을 삭제해야 나갈 수 있습니다.":"El propietario debe eliminar el equipo para salir.","소유자만 할 수 있습니다.":"Solo el propietario puede hacerlo.","아직 팀이 없습니다.":"Aún no hay equipos.","이 멤버를 내보낼까요?":"¿Quitar a este miembro?","이 팀에서 나갈까요?":"¿Salir de este equipo?","일정 제목":"Título del evento","재발급":"Regenerar","참여":"Unirse","참여 코드":"Código","참여 코드 6자리":"Código de 6 dígitos","참여 코드가 올바르지 않습니다.":"Código no válido.","추가":"Añadir","코드로 참여":"Unirse con código","코드를 복사했습니다.":"Código copiado.","클라우드가 설정되지 않았습니다.":"La nube no está configurada.","팀 공유는 로그인이 필요합니다. 먼저 상단의 동기화 버튼에서 로그인하세요.":"Compartir en equipo requiere iniciar sesión. Inicia sesión primero con el botón de sincronización de arriba.","팀 나가기":"Salir del equipo","팀 달력":"Calendario de equipo","팀 만들기":"Crear equipo","팀 목록":"Lista de equipos","팀 삭제":"Eliminar equipo","팀 이름 (예: 마케팅팀)":"Nombre del equipo (p. ej. Marketing)","팀 이름을 입력하세요.":"Introduce un nombre de equipo.","팀 일정":"Eventos del equipo","팀 일정이 없습니다.":"No hay eventos del equipo.","팀을 만들려면 라이선스가 필요합니다.":"Se requiere licencia para crear un equipo.","팀을 삭제하면 모든 팀 일정이 사라집니다. 삭제할까요?":"Eliminar el equipo borra todos sus eventos. ¿Eliminar?","편집자":"Editor","회사·팀원과 일정을 공유합니다":"Comparte tu agenda con tu empresa/equipo","소유자":"Propietario","지역 변경":"Cambiar región","표 크기 선택":"Elige el tamaño de la tabla","끝으로 갈수록 칸이 늘어납니다":"Las celdas crecen al llegar al borde","팀 달력 보기":"Ver calendario de equipo","개인 달력 보기":"Ver calendario personal","보기 전용입니다 (편집 권한 없음)":"Solo lectura (sin permiso de edición)","이 날 일정 공유":"Compartir este día","일정 없음":"Sin eventos","이미지 복사":"Copiar imagen","텍스트 복사":"Copiar texto","이미지 복사됨! 카톡에 붙여넣기(Ctrl+V)":"¡Imagen copiada! Pega (Ctrl+V)","텍스트 복사됨! 카톡에 붙여넣기(Ctrl+V)":"¡Texto copiado! Pega (Ctrl+V)","이미지 복사 실패 — 텍스트로 시도하세요":"Error al copiar imagen — prueba texto","복사 실패":"Error al copiar","팀 달력만 사용":"Usar solo calendario de equipo","개인 달력 없이 팀 달력으로 시작합니다 (회사용)":"Empieza con el calendario de equipo, sin personal (para empresas)","팀 보기 시 팀 선택 창 표시":"Mostrar selección de equipo al cambiar a vista de equipo","여러 팀을 자주 바꿀 때 켜세요. 끄면 마지막 팀을 바로 엽니다":"Actívalo si cambias de equipo a menudo. Apagado = abre el último equipo","팀 선택":"Seleccionar equipo","팀 전환":"Cambiar equipo","👥 팀 이름":"👥 Nombre de equipo","진행중":"En curso","개":"","년":"","목록":"Lista","새 메모":"Nueva nota","메모 키보드 조작":"Navegación de notas por teclado","입력칸: ESC 후 1.5초 내 Backspace → 목록 · 목록: ↑↓ 선택, Ctrl+→ 열기, Ctrl+← 나가기":"Entrada: ESC y Backspace en 1,5s → lista · Lista: ↑↓ seleccionar, Ctrl+→ abrir, Ctrl+← salir","입력: Ctrl+← 또는 ESC후 Backspace → 목록 · 목록: ↑↓ 선택, → 열기, ← 접기, Enter 편집":"Entrada: Ctrl+← o ESC+Backspace → lista · Lista: ↑↓ seleccionar, → abrir, ← cerrar, Enter editar","테마":"Tema","(무료)":"(gratis)","부산 갈매기":"Gaviota de Busan","정글 악어":"Cocodrilo de la jungla","팀 관리":"Ajustes del equipo","이 달 일정 공유":"Compartir este mes","일정 공유":"Compartir agenda","엑셀로 내보내기":"Exportar a Excel","엑셀 파일을 저장했습니다":"Archivo Excel guardado","% 표시":"Mostrar %","(1초 길게 누르면 📌 피드백 메모)":"(mantén 1 s para 📌 nota de comentario)","(1초 이상 올리면 설명)":"(pasa 1 s+ para ver detalles)","(service key 아님)":"(no es service key)","(변경 시 추가)":"(añadir al cambiar)","(선택)":"(opcional)","(클릭 수정)":"(clic para editar)","+ 대출":"+ Préstamo","+ 적금·펀드":"+ Ahorro/Fondo",".xlsx 파일 지원":"Compatible con .xlsx","2026년 5월":"Mayo de 2026","2글자":"2 caract.","CSV로 내보내기 (Excel에서 열기 가능)":"Exportar CSV (se abre en Excel)","D-Day 창의 대출·적금 추가 버튼 모양을 고릅니다":"Elige el estilo del botón de añadir préstamo/ahorro en el panel D-Day","Do! 리스트":"Lista Do!","Do! 리스트 — 할 일을 적어두고 달력 날짜로 드래그":"Lista Do! — anota tareas y arrástralas a una fecha","JSON 파일로 데이터 가져오기":"Importar datos desde un archivo JSON","anon (공개키)":"anon (clave pública)","service_role(비밀키)는 절대 사용 금지.":"Nunca uses service_role (clave secreta).","v66: React 에러 발생":"v66: Error de React","• KB국민은행, 신한은행 등 — 추후 지원 예정":"• KB, Shinhan, etc. — próximamente","• 토스뱅크 — 엑셀 거래내역 (.xlsx)":"• Toss Bank — movimientos en Excel (.xlsx)","※ 간단한 화면 잠금용입니다. 비밀번호를 잊으면 로그아웃(초기화) 후 다시 로그인해야 합니다.":"※ Bloqueo de pantalla simple. Si olvidas la contraseña, cierra sesión (restablecer) e inicia sesión de nuevo.","※ 월주는 양력 근사 계산 (절기 미반영)":"※ El pilar mensual es una aproximación solar (sin términos solares)","→ 다른 날짜 또는 같은 날 일정 위에 놓기(순서 변경)":"→ Suelta en otra fecha o sobre un evento del mismo día (reordenar)","→ 역산 금리":"→ Tasa implícita","⏩ 배속":"⏩ Velocidad","▲ 입금":"▲ Ingreso","▼ 출금":"▼ Gasto","☀️ 양력":"☀️ Solar","☀️ 양력 기준":"☀️ Base solar","☑ 할 일":"☑ Tarea","⚡ 상극: 목↔토 화↔금 토↔수 금↔목 수↔화":"⚡ Conflicto: Madera↔Tierra Fuego↔Metal Tierra↔Agua Metal↔Madera Agua↔Fuego","✓ 금리가 적용되었습니다. 저장하려면 대출 수정에서 저장하세요.":"✓ Tasa aplicada. Para guardarla, hazlo en Editar préstamo.","✓ 지원 형식":"✓ Formatos compatibles","✕ 초기화":"✕ Restablecer","⭐ D-Day 창":"⭐ Panel D-Day","「곡 추가하기」를 눌러 노래를 추가하세요":"Pulsa «Añadir canción» para agregar música","가계부":"Contabilidad","가계부 열기":"Abrir contabilidad","가나다":"ABC","가져오기":"Importar","가져오기 완료!":"¡Importación completa!","가져온 은행 거래내역이 없습니다.":"No hay movimientos bancarios importados.","거래 분류 수정":"Editar categoría de transacción","거래 종류별 이름 / 카테고리 / 색상 설정 (다음 가져오기에도 자동 적용됩니다)":"Configura nombre / categoría / color por tipo de transacción (se aplica automáticamente en la próxima importación)","거치기간 (개월)":"Periodo de carencia (meses)","건너뛰기":"Omitir","검색 결과 없음":"Sin resultados","검색어 입력 또는 색상 필터 선택":"Escribe un término o elige un filtro de color","경과 기간별 알림 임계값":"Umbrales de aviso por días transcurridos","경과 일수 이상이면 해당 색상·아이콘으로 표시됩니다.":"Al alcanzar los días transcurridos se muestra con ese color/icono.","계산 기록":"Historial","계산기":"Calculadora","계산상 납입금":"Pago calculado","계좌 가져오기":"Importar banco","국가":"País","권장: 32×32 ~ 64×64 픽셀, PNG(투명 배경) — 최대 100KB":"Recomendado: 32×32 a 64×64 px, PNG (transparente) — máx. 100 KB","글씨 색상":"Color del texto","글씨 크기 (앱 전체)":"Tamaño de fuente (toda la app)","글씨체":"Fuente","금리":"Tasa","금리 변경 이력":"Historial de cambios de tasa","금리 이력 없음":"Sin historial de tasa","금액":"Importe","금액 (선택)":"Importe (opcional)","금액 유형":"Tipo de importe","금액 입력 (원)":"Introducir importe (KRW)","금액 입력 시 금리가 자동 계산됩니다":"La tasa se calcula automáticamente al introducir el importe","금액·기간·금리를 입력하면 납입 스케줄이 표시됩니다.":"Introduce importe, plazo y tasa para ver el calendario de pagos.","기간 (개월)":"Plazo (meses)","기간별 색상:":"Colores por periodo:","기념일":"Aniversario","기념일 · 반복일정":"Aniversarios · Recurrentes","기념일 이름 (예: 아내 생일)":"Nombre del aniversario (p. ej. cumpleaños de la esposa)","기록 없음":"Sin registros","기본값":"Predeterminado","기존 금리":"Tasa actual","기준날짜":"Fecha base","기준잔액 (원)":"Saldo base (KRW)","기준잔액 직접 설정":"Definir saldo base manualmente","나중에":"Más tarde","날씨 불러오는 중...":"Cargando el clima...","날씨 정보를 불러올 수 없습니다 (인터넷 확인)":"No se pudo cargar el clima (revisa internet)","날짜":"Fecha","날짜 범위 필터":"Filtro por rango de fechas","납부일":"Día de pago","납입":"Aporte","납입 월":"Mes de aporte","납입금":"Aporte","납입기간 (개월)":"Plazo de ahorro (meses)","납입액":"Importe de ahorro","납입액·기간·이율을 입력하면 예상 결과가 표시됩니다.":"Introduce aporte, plazo y tasa para ver el resultado estimado.","납입일":"Día de aporte","내보내기":"Exportar","내역":"Detalles","내역 없음":"Sin registros","내용":"Contenido","네이버페이충전 +100,000":"Recarga NaverPay +100.000","년도":"Año","누적액":"Acumulado","다운로드":"Descargar","닫기":"Cerrar","달력":"Calendario","달력 글씨 크기":"Tamaño de fuente del calendario","달력 버튼 단축키":"Atajos de botones del calendario","달력 색상":"Colores del calendario","달력 작게":"Reducir calendario","달력 크게 (창보다 커지면 스크롤로 봅니다)":"Ampliar calendario (si supera la ventana, se desplaza)","달력 표시 설정":"Ajustes de visualización del calendario","달력의 각 일정 오른쪽에 삭제 버튼이 생깁니다":"Aparece un botón de eliminar a la derecha de cada evento","달력이 분리 중입니다":"Separando el calendario","대출 / 적금·펀드":"Préstamos / Ahorro·Fondos","대출 시작일":"Fecha de inicio del préstamo","대출 연결 (선택)":"Vincular préstamo (opcional)","대출 이름":"Nombre del préstamo","대출 추가":"Añadir préstamo","대출·적금 추가 버튼 표시":"Mostrar botón de añadir préstamo/ahorro","대출금액 (원)":"Importe del préstamo (KRW)","대출납입":"Pago de préstamo","데이터를 JSON 파일로 내보내기":"Exportar datos como archivo JSON","도시":"Ciudad","드래그로 입력칸 크기 조절":"Arrastra para ajustar el campo de entrada","드래그하여 창 크기 조절":"Arrastra para ajustar el tamaño de la ventana","등록된 대출 / 적금·펀드가 없습니다":"No hay préstamos / ahorros registrados","라이선스 키 (구매 시 전달)":"Clave de licencia (se entrega al comprar)","로 저장됩니다":"se guardará","로그아웃":"Cerrar sesión","로그인됨":"Sesión iniciada","리셋":"Restablecer","만기 수령액":"Importe al vencimiento","만기 예상액":"Importe estimado al vencimiento","만들기":"Crear","맞춤":"Ajustar","매년 반복 (생일 등)":"Repetir cada año (cumpleaños, etc.)","매월 납부하는 날 (비우면 시작일 기준)":"Día de pago mensual (vacío = fecha de inicio)","매월 납입하는 날 (비우면 시작일 기준)":"Día de aporte mensual (vacío = fecha de inicio)","메뉴":"Menú","메모 (선택)":"Nota (opcional)","메모 1":"Nota 1","메모 2":"Nota 2","메모 3":"Nota 3","메모 4":"Nota 4","메모 5":"Nota 5","메모가 없습니다":"Sin notas","모든 데이터 초기화":"Restablecer todos los datos","미리보기":"Vista previa","미완료 할 일":"Tareas pendientes","반복":"Repetir","반복 O":"Repetir ✓","반복 X":"Repetir ✗","반복 일정":"Recurrentes","배경색":"Color de fondo","배경화면":"Fondo de pantalla","분 후":"min después","분석하기 ✨":"Analizar ✨","비밀번호":"Contraseña","비밀번호 (6자 이상)":"Contraseña (6+ caracteres)","비밀번호 입력":"Introducir contraseña","비밀번호 확인":"Confirmar contraseña","비밀번호가 올바르지 않습니다":"Contraseña incorrecta","비활성 타이머":"Temporizador de inactividad","빨간색":"Rojo","사생활 모드":"Modo privado","사용자 지정 색상":"Color personalizado","사주팔자 (四柱八字)":"Cuatro Pilares (四柱八字)","삭제":"Eliminar","상단 버튼 크기":"Tamaño de botones superiores","상세보기 (전체 D-Day 목록)":"Detalles (lista completa de D-Day)","새 폴더 이름 입력 후 Enter":"Escribe el nombre de la carpeta y pulsa Enter","색상":"Color","색상 선택":"Elegir color","색상:":"Color:","생년월일시를 입력하면 사주팔자와 음양오행을 분석합니다":"Introduce fecha y hora de nacimiento para analizar los Cuatro Pilares y los Cinco Elementos","생년월일을 입력하고 분석하기를 눌러주세요":"Introduce tu fecha de nacimiento y pulsa Analizar","선택 안함":"Ninguno","선택한 월에 거래 없음":"Sin transacciones en el mes seleccionado","설정":"Ajustes","성을 포함한 한글 이름을 두 글자 이상 입력하세요":"Introduce un nombre coreano (con apellido), 2+ caracteres","소리오행 흐름":"Flujo de elementos del sonido","수기납입 → 금리 자동계산":"Pago manual → cálculo automático de tasa","수정":"Editar","순서 변경 중 — 빈 곳 클릭 시 종료":"Reordenando — haz clic en un espacio vacío para terminar","순서 변경 중 — 빈 곳 클릭하면 종료":"Reordenando — haz clic en un espacio vacío para terminar","순수지":"Neto","숨기기":"Ocultar","숫자 키로 입력 — shift 모드 (예: 2026 입력 후 2 누르면 0262)":"Introduce con teclas numéricas — modo shift (p. ej. tras 2026, pulsar 2 da 0262)","시간 미입력 시 시주 생략":"Si no se indica la hora, se omite el pilar horario","시작 일수":"Día de inicio","시작일":"Fecha de inicio","실제 납입금액 (원)":"Pago real (KRW)","실제 납입한 금액을 입력하면 해당 달의 금리를 역산해서 그 이후 납입 스케줄을 다시 계산합니다.":"Al introducir el importe realmente pagado, se recalcula la tasa de ese mes y el calendario posterior.","아이콘":"Icono","알림 아이콘 이미지":"Imagen del icono de aviso","언어":"Idioma","없음":"Ninguno","엑셀 원본 잔액":"Saldo original de Excel","엑셀 파일을 여기에 드롭하거나 클릭하여 선택":"Arrastra el archivo Excel aquí o haz clic para elegir","역산 결과":"Resultado del cálculo inverso","역산 금리":"Tasa implícita","연결 안 함":"Sin vincular","연도":"Año","예: 1,000,000":"p. ej. 1.000.000","예: 1,520,000":"p. ej. 1.520.000","예: 10, 6, 12":"p. ej. 10, 6, 12","예: 12":"p. ej. 12","예: SKT, 카드연회비, 통신비...":"p. ej. SKT, cuota de tarjeta, teléfono...","예: 洪吉童":"p. ej. 洪吉童","예: 홍길동":"p. ej. Hong Gildong","예상 이자":"Interés estimado","오늘로":"Hoy","오디오 URL 또는 YouTube 링크":"URL de audio o enlace de YouTube","오른쪽에 고정":"Fijar a la derecha","오른쪽으로":"A la derecha","오행 분포 (陰陽五行)":"Distribución de elementos (陰陽五行)","오행 상생·상극 (五行相生相剋)":"Generación/conflicto de elementos (五行相生相剋)","올해로":"Este año","완료":"Hecho","완료 시간":"Completado a las","완료 항목 삭제":"Eliminar completadas","완료 항목 전체 삭제":"Eliminar todas las completadas","완료한 일":"Completadas","완료한 할 일이 없습니다":"No hay tareas completadas","왼쪽에 고정":"Fijar a la izquierda","왼쪽으로":"A la izquierda","운세":"Horóscopo","원금":"Capital","월":"Mes","월 납입액 (원)":"Aporte mensual (KRW)","유형":"Tipo","유효한 금액을 입력해주세요":"Introduce un importe válido","은행":"Banco","은행 거래내역 가져오기":"Importar movimientos bancarios","은행 거래내역 가져오기에서 이 키워드와 일치하는 항목이 있으면, 같은 달 이 반복일정을 자동으로 숨겨 중복을 방지합니다.":"Si un movimiento bancario importado coincide con esta palabra clave, este evento recurrente se oculta ese mes automáticamente para evitar duplicados.","음양오행 이론 기반 · 재미로 보는 운세입니다 🙂":"Basado en la teoría Yin-Yang de los Cinco Elementos · solo por diversión 🙂","이 버전 알림 다시 보지 않기":"No volver a mostrar esta versión","이 색상의 용도 이름 — 이 창에서만 표시됩니다":"Nombre de uso de este color — solo se muestra en esta ventana","이 색상의 용도 이름 입력 (최대 2글자)":"Nombra el uso de este color (máx. 2 caracteres)","이 시기엔 중요한 결정을 서두르지 마세요":"No apresures decisiones importantes en este periodo","이 폴더에 넣을 곡 선택하기":"Selecciona canciones para esta carpeta","이름 (한글, 성 포함)":"Nombre (coreano, con apellido)","이메일":"Correo","이미지 선택":"Elegir imagen","이미지 없음":"Sin imagen","이미지를 선택하면 배경으로 적용됩니다":"Al elegir una imagen se aplica como fondo","이자":"Interés","일":"Día","일 이상":"días o más","일요일 색상 구분":"Resaltar domingos","일정":"Eventos","일정 내용 미리보기":"Vista previa del evento","일정 삭제":"Eliminar evento","일정 시간 조작 없으면 화면이 투명해집니다":"La pantalla se vuelve transparente tras el tiempo de inactividad","일정, 메모, D-Day 검색...":"Buscar eventos, notas, D-Day...","일정으로":"A evento","입금":"Ingreso","입력칸을 클릭한 뒤 원하는 키(조합키 가능: Ctrl/Alt/Shift+키)를 누르면 저장됩니다. Backspace로 삭제. 달력 창이 열려 있을 때 작동하며, 글자 입력 중에는 무시됩니다.":"Haz clic en el campo y pulsa una tecla (combinaciones: Ctrl/Alt/Mayús). Retroceso para borrar. Funciona con el calendario abierto; se ignora al escribir.","작성 시간":"Creado a las","잔액":"Saldo","잔액 표시 기준":"Base de visualización del saldo","잠금 비밀번호":"Contraseña de bloqueo","잠금 해제":"Desbloquear","잠금화면 배경":"Fondo de pantalla de bloqueo","재생바":"Reproductor","재생바 접기 (1:재생바 숨김 → 2:배속 숨김 → 3:최소 → 4:전체)":"Contraer reproductor (1: ocultar barra → 2: ocultar velocidad → 3: mínimo → 4: completo)","저사양 PC에서는 꺼두는 것을 권장합니다":"Se recomienda desactivarlo en equipos de gama baja","저장":"Guardar","저장하고 로그인":"Guardar e iniciar sesión","저장하면 같은 원본 적요의 기존 이벤트도 모두 업데이트됩니다.":"Al guardar, también se actualizan todos los eventos existentes con el mismo concepto original.","적금 · 펀드":"Ahorro · Fondo","적금·펀드 추가":"Añadir ahorro/fondo","적금납입":"Aporte de ahorro","적요":"Concepto","전체":"Todo","전체 삭제":"Eliminar todo","제목 (URL 입력 후 자동 완성)":"Título (autocompletado tras la URL)","종료일":"Fecha de fin","주황":"Naranja","중복 (체크로 강제 추가)":"Duplicado (marcar para forzar)","중요한 약속·새 시작에 좋은 날입니다":"Un buen día para citas importantes y nuevos comienzos","지남":"pasado","지우기":"Borrar","직접 조절":"Manual","진행중인 일":"En curso","진행중인 할 일이 없습니다":"No hay tareas en curso","창 배경 투명도":"Transparencia del fondo de la ventana","창 열기":"Abrir ventana","찾기":"Buscar","철학관 원리 기반 · 재미로 보는 사주입니다 🙏":"Basado en principios tradicionales de Saju · solo por diversión 🙏","초기화":"Restablecer","총 납입액":"Total de aportes","최근 6년 연별 요약":"Resumen anual (últimos 6 años)","출금":"Gasto","출금 내역 없음":"Sin gastos","출금 합계":"Total de gastos","취소":"Cancelar","카테고리":"Categoría","커스텀 색상":"Color personalizado","클릭 즉시 저장 | 엑셀 복붙 지원":"Guarda al hacer clic | Admite pegar desde Excel","클릭 후 키 입력":"Haz clic y pulsa una tecla","태어난 시간 (선택 — 시주 계산에 사용)":"Hora de nacimiento (opcional — para el pilar horario)","탭 삭제":"Eliminar pestaña","토요일 색상 구분":"Resaltar sábados","투명도":"Transparencia","파란색":"Azul","팝업으로":"Como ventana emergente","패널 내용 영역 미리보기":"Vista previa del contenido del panel","패널 미리보기":"Vista previa del panel","패널 배경 기준색":"Color base del panel","패널 배경 투명도":"Transparencia del fondo del panel","패널 배경색 기준":"Base del color de fondo del panel","패널 투명도 / 색상":"Transparencia / color del panel","폴더 만들기 — 곡 목록에서 각 곡의 폴더를 지정할 수 있습니다":"Crear carpeta — asigna una carpeta a cada canción en la lista","폴더 지정":"Asignar carpeta","표 삽입":"Insertar tabla","표시 방식":"Modo de visualización","표시 설정":"Ajustes de visualización","표시 위치":"Posición","표시 이름":"Nombre visible","피드백 등록!":"¡Comentario guardado!","피드백 메모 등록":"Añadir nota de comentario","피드백 알림에 쓸 이미지를 직접 올릴 수 있습니다.":"Puedes subir tu propia imagen para los avisos de comentarios.","한자 표기 (선택)":"Hanja (opcional)","한자 획수 (선택 — 글자별 획수를 쉼표로. 비우면 한글 획수로 계산)":"Trazos de hanja (opcional — por carácter, separados por comas; vacío usa trazos de hangul)","할 일":"Tarea","할 일 입력 후 Enter":"Escribe una tarea y pulsa Enter","할 일을 입력해 블록을 만들고, 클릭해서 체크한 뒤 달력 날짜로 드래그하세요. 체크된 블록이 한꺼번에 들어갑니다.":"Escribe una tarea para crear un bloque, haz clic para marcarlo y arrástralo a una fecha. Los bloques marcados se añaden juntos.","합계":"Total","항목":"Elemento","항목이 없습니다":"No hay elementos","행운 색":"Color de la suerte","행운 숫자":"Número de la suerte","현재":"Ahora","현재 금리":"Tasa actual","현재 적용중":"Aplicado actualmente","현재 표시 년월":"Mes mostrado","화면에 맞추기":"Ajustar a la pantalla","화면이 잠겨 있습니다":"La pantalla está bloqueada","활성 피드백이 없습니다.":"No hay comentarios activos.","🌙 음력":"🌙 Lunar","🌙 입력한 날짜를 음력으로 저장합니다.":"🌙 Guarda la fecha introducida como lunar.","🎵 음악":"🎵 Música","🎵 재생바":"🎵 Reproductor","🎵 재생바 창":"🎵 Ventana del reproductor","🏦 대출":"🏦 Préstamo","🏦 대출 추가":"🏦 Añadir préstamo","💰 가계부":"💰 Contabilidad","💰 입출금 현황":"💰 Flujo de caja","📅 달력":"📅 Calendario","📅 달력 패널":"📅 Panel de calendario","📅 헤더":"📅 Encabezado","📈 적금":"📈 Ahorro","📈 적금·펀드 추가":"📈 Añadir ahorro/fondo","📊 출금 분석":"📊 Análisis de gastos","📋 상세 정보":"📋 Detalles","📋 할 일 목록":"📋 Lista de tareas","📜 사주와 이름의 궁합":"📜 Compatibilidad de Saju y nombre","📜 원장 종합 분석 — 오행 생극(生剋)으로 본 오늘":"📜 Lectura completa — hoy según generación/conflicto de elementos","📝 내용":"📝 Contenido","📝 메모":"📝 Nota","📥 내보내기":"📥 Exportar","🔄 상생: 목→화→토→금→수→목":"🔄 Generación: Madera→Fuego→Tierra→Metal→Agua→Madera","🔐 지금 잠그기":"🔐 Bloquear ahora","🔢 계산기":"🔢 Calculadora","🔢 계산기 창":"🔢 Ventana de calculadora","🔢 날짜":"🔢 Fecha","🔮 운세":"🔮 Horóscopo","🔮 운세 창":"🔮 Ventana de horóscopo","🔮 운세·사주":"🔮 Horóscopo·Saju","🖊️ 수기납입 입력 → 금리 자동계산":"🖊️ Introducir pago manual → cálculo automático de tasa"}
};

function DDBTR(k) {
    if (DDB_LANG === "ko") return k;
    const d = DDB_I18N[DDB_LANG];
    return d && d[k] || k
}

function ddbTeamDelEvent(id) { const c = $a(), tc = window.__ddbTeamCtx; if (c && tc && tc.meta && tc.caps && tc.caps.event) c.from("team_events").delete().eq("id", id).then(() => {}, () => {}) }

function ddbDayText(dateStr, events, label) {
    const p = String(dateStr).split("-"), head = (label ? label + " " : "") + `${p[0]}.${p[1]}.${p[2]}`;
    const evs = (events || []).filter(e => e && e.amount === void 0);
    const lines = ["\u{1F4C5} " + head];
    if (!evs.length) lines.push("\u00b7 " + DDBTR("일정 없음"));
    else evs.forEach(e => lines.push("\u00b7 " + (e.title || "")));
    return lines.join("\n");
}
async function ddbCopyText(txt) { try { await navigator.clipboard.writeText(txt); return !0 } catch { return !1 } }
async function ddbDayImageBlob(dateStr, events, label) {
    const p = String(dateStr).split("-"), evs = (events || []).filter(e => e && e.amount === void 0);
    const W = 380, pad = 18, lh = 30, headH = 54, W2 = 2;
    const H = pad * 2 + headH + Math.max(1, evs.length) * lh + 6;
    const cv = document.createElement("canvas"); cv.width = W * W2; cv.height = H * W2;
    const g = cv.getContext("2d"); g.scale(W2, W2);
    const grd = g.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, "#1e293b"); grd.addColorStop(1, "#0f172a");
    g.fillStyle = grd; g.fillRect(0, 0, W, H);
    g.fillStyle = "#ffffff"; g.font = "bold 20px system-ui,sans-serif";
    g.fillText("\u{1F4C5} " + (label ? label + "  " : "") + `${p[0]}.${p[1]}.${p[2]}`, pad, pad + 22);
    g.strokeStyle = "rgba(255,255,255,0.18)"; g.lineWidth = 1; g.beginPath(); g.moveTo(pad, pad + headH - 8); g.lineTo(W - pad, pad + headH - 8); g.stroke();
    g.font = "16px system-ui,sans-serif"; let yy = pad + headH + 14;
    if (!evs.length) { g.fillStyle = "rgba(255,255,255,0.45)"; g.fillText(DDBTR("일정 없음"), pad, yy); }
    else evs.forEach(e => { const c = e.customColor || "#93c5fd"; g.fillStyle = c; g.fillText("\u25CF", pad, yy); g.fillStyle = "#e2e8f0"; let t = e.title || ""; if (t.length > 30) t = t.slice(0, 29) + "\u2026"; g.fillText(t, pad + 18, yy); yy += lh; });
    g.fillStyle = "rgba(255,255,255,0.28)"; g.font = "11px system-ui,sans-serif"; g.fillText("MomentPlan", W - pad - 78, H - 10);
    return await new Promise(res => cv.toBlob(b => res(b), "image/png"));
}
async function ddbCopyImage(dateStr, events, label) { try { const b = await ddbDayImageBlob(dateStr, events, label); await navigator.clipboard.write([new ClipboardItem({ "image/png": b })]); return !0 } catch { return !1 } }
function ddbMonthEvents(events, y, m) { const pre = y + "-" + String(m).padStart(2, "0"); return (events || []).filter(e => e && e.amount === void 0 && String(e.date || "").startsWith(pre)).slice().sort((a, b) => (a.date || "").localeCompare(b.date || "")) }
function ddbDragH(get,set){return {drag(e){if(e.target.closest&&(e.target.closest("button")||e.target.closest("input")||e.target.closest("textarea")||e.target.closest("select")))return;e.preventDefault();var g=get(),sx=e.clientX,sy=e.clientY,ox=g.x,oy=g.y;var mm=ev=>set(p=>({...p,x:ox+(ev.clientX-sx),y:Math.max(0,oy+(ev.clientY-sy))})),mu=()=>{document.removeEventListener("mousemove",mm);document.removeEventListener("mouseup",mu)};document.addEventListener("mousemove",mm);document.addEventListener("mouseup",mu)},resize(e){e.preventDefault();e.stopPropagation();var g=get(),sx=e.clientX,sy=e.clientY,ow=g.w,oh=g.h;var mm=ev=>set(p=>({...p,w:Math.max(240,ow+(ev.clientX-sx)),h:Math.max(160,oh+(ev.clientY-sy))})),mu=()=>{document.removeEventListener("mousemove",mm);document.removeEventListener("mouseup",mu)};document.addEventListener("mousemove",mm);document.addEventListener("mouseup",mu)}}}
function ddbRzHandle(onR){return o.jsx("div",{onMouseDown:onR,className:"absolute bottom-0 right-0 cursor-nwse-resize",style:{width:16,height:16,zIndex:9},children:o.jsx("div",{style:{position:"absolute",right:3,bottom:3,width:7,height:7,borderRight:"2px solid rgba(255,255,255,0.4)",borderBottom:"2px solid rgba(255,255,255,0.4)"}})})}
function ddbWinDefault(w,hr){var W=(typeof window!=="undefined"?window:{innerWidth:1200,innerHeight:800});return {x:Math.round((W.innerWidth-w)/2),y:Math.round(W.innerHeight*0.07),w:w,h:Math.round(W.innerHeight*hr)}}
function ddbHexDist(a,b){const p=h=>{h=(h||"").replace("#","");return [parseInt(h.slice(0,2),16)||0,parseInt(h.slice(2,4),16)||0,parseInt(h.slice(4,6),16)||0]};const x=p(a),y=p(b);return Math.abs(x[0]-y[0])+Math.abs(x[1]-y[1])+Math.abs(x[2]-y[2])}
function ddbAnnDate(s){try{const d=new Date(s),p=n=>String(n).padStart(2,"0");return p(d.getMonth()+1)+"."+p(d.getDate())+" "+p(d.getHours())+":"+p(d.getMinutes())}catch{return""}}
function ddbMonthText(y, m, events, label) { const evs = ddbMonthEvents(events, y, m), L = ["\u{1F4C5} " + (label ? label + " " : "") + y + "." + String(m).padStart(2, "0")]; if (!evs.length) L.push("\u00b7 " + DDBTR("일정 없음")); else evs.forEach(e => { const d = (e.date || "").slice(8); L.push(d + "\uC77C  " + (e.title || "")) }); return L.join("\n") }
async function ddbMonthImageBlob(y, m, events, label) { const evs = ddbMonthEvents(events, y, m), W = 420, pad = 20, lh = 28, headH = 56, W2 = 2; const rows = evs.length || 1; const H = pad * 2 + headH + rows * lh + 6; const cv = document.createElement("canvas"); cv.width = W * W2; cv.height = H * W2; const g = cv.getContext("2d"); g.scale(W2, W2); const grd = g.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, "#1e293b"); grd.addColorStop(1, "#0f172a"); g.fillStyle = grd; g.fillRect(0, 0, W, H); g.fillStyle = "#fff"; g.font = "bold 21px system-ui,sans-serif"; g.fillText("\u{1F4C5} " + (label ? label + "  " : "") + y + "\uB144 " + m + "\uC6D4", pad, pad + 24); g.strokeStyle = "rgba(255,255,255,0.18)"; g.beginPath(); g.moveTo(pad, pad + headH - 8); g.lineTo(W - pad, pad + headH - 8); g.stroke(); g.font = "15px system-ui,sans-serif"; let yy = pad + headH + 12; if (!evs.length) { g.fillStyle = "rgba(255,255,255,0.45)"; g.fillText(DDBTR("일정 없음"), pad, yy) } else evs.forEach(e => { const c = e.customColor || "#93c5fd"; g.fillStyle = c; g.font = "bold 14px system-ui,sans-serif"; g.fillText((e.date || "").slice(8) + "\uC77C", pad, yy); g.fillStyle = "#e2e8f0"; g.font = "15px system-ui,sans-serif"; let t = e.title || ""; if (t.length > 26) t = t.slice(0, 25) + "\u2026"; g.fillText(t, pad + 44, yy); yy += lh }); g.fillStyle = "rgba(255,255,255,0.28)"; g.font = "11px system-ui,sans-serif"; g.fillText("MomentPlan", W - pad - 78, H - 10); return await new Promise(res => cv.toBlob(res, "image/png")) }
function ddbMonthXlsx(y, m, events, label) { const evs = ddbMonthEvents(events, y, m); const rows = [[DDBTR("날짜"), DDBTR("제목"), DDBTR("메모")]]; evs.forEach(e => rows.push([e.date || "", e.title || "", e.memo || ""])); const ws = XLSX.utils.aoa_to_sheet(rows); ws["!cols"] = [{ wch: 12 }, { wch: 30 }, { wch: 30 }]; const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, (label || "") + y + "-" + String(m).padStart(2, "0")); XLSX.writeFile(wb, "MomentPlan-" + y + "-" + String(m).padStart(2, "0") + ".xlsx") }


function ddbSelDayEvents(events, date){ return (events||[]).filter(e=>e&&e.amount===void 0&&e.date===date); }
function ddbSelText(dates, events){
  const sorted=dates.slice().sort();
  const lines=[];
  sorted.forEach(d=>{ lines.push(d); ddbSelDayEvents(events,d).forEach(e=>lines.push(e.title||"")); });
  return lines.join("\n");
}
async function ddbSelImageBlob(dates, events, label){
  const sorted=dates.slice().sort();
  const cols=sorted.map(d=>({d, evs:ddbSelDayEvents(events,d)}));
  const maxR=Math.max(1,...cols.map(c=>c.evs.length));
  const colW=176, pad=16, headH=40, lh=26, W2=2;
  const W=pad*2+colW*Math.max(1,cols.length);
  const H=pad*2+headH+maxR*lh+18;
  const cv=document.createElement("canvas"); cv.width=W*W2; cv.height=H*W2; const g=cv.getContext("2d"); g.scale(W2,W2);
  const grd=g.createLinearGradient(0,0,0,H); grd.addColorStop(0,"#1e293b"); grd.addColorStop(1,"#0f172a"); g.fillStyle=grd; g.fillRect(0,0,W,H);
  if(label){ g.fillStyle="rgba(255,255,255,0.5)"; g.font="12px system-ui,sans-serif"; g.fillText(label, pad, 12); }
  cols.forEach((c,ci)=>{ const x=pad+ci*colW;
    if(ci>0){ g.strokeStyle="rgba(255,255,255,0.08)"; g.beginPath(); g.moveTo(x,pad+6); g.lineTo(x,H-pad); g.stroke(); }
    g.fillStyle="#93c5fd"; g.font="bold 15px system-ui,sans-serif"; g.fillText(c.d.slice(5).replace("-","/")+"("+c.evs.length+")", x+8, pad+24);
    g.strokeStyle="rgba(255,255,255,0.15)"; g.beginPath(); g.moveTo(x+6,pad+headH-4); g.lineTo(x+colW-6,pad+headH-4); g.stroke();
    g.font="13px system-ui,sans-serif";
    c.evs.forEach((e,ri)=>{ const yy=pad+headH+16+ri*lh; g.fillStyle=e.customColor||qt[e.color]||"#93c5fd"; g.fillText("\u25CF",x+8,yy); g.fillStyle="#e2e8f0"; let t=e.title||""; if(t.length>15)t=t.slice(0,14)+"\u2026"; g.fillText(t,x+22,yy); });
  });
  g.fillStyle="rgba(255,255,255,0.28)"; g.font="11px system-ui,sans-serif"; g.fillText("MomentPlan", W-pad-78, H-8);
  return await new Promise(res=>cv.toBlob(b=>res(b),"image/png"));
}
function ddbSelIcs(dates, events){
  const set=new Set(dates), pad=n=>String(n).padStart(2,"0");
  const evs=(events||[]).filter(e=>e&&e.amount===void 0&&set.has(e.date));
  const nd=d=>{const dt=new Date(d+"T00:00:00"); dt.setDate(dt.getDate()+1); return ""+dt.getFullYear()+pad(dt.getMonth()+1)+pad(dt.getDate());};
  const esc=t=>String(t||"").replace(/[\r\n]+/g," ").replace(/,/g,"\\,").replace(/;/g,"\\;");
  let out=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//MomentPlan//KR//EN","CALSCALE:GREGORIAN"];
  evs.forEach((e,i)=>{ out.push("BEGIN:VEVENT","UID:mp-"+(e.id||i)+"-"+Date.now()+"@momentplan","DTSTART;VALUE=DATE:"+String(e.date).replace(/-/g,""),"DTEND;VALUE=DATE:"+nd(e.date),"SUMMARY:"+esc(e.title)); if(e.memo) out.push("DESCRIPTION:"+esc(e.memo)); out.push("END:VEVENT"); });
  out.push("END:VCALENDAR");
  return out.join("\r\n");
}
function ddbDownloadIcs(text, name){ try{ const blob=new Blob([text],{type:"text/calendar;charset=utf-8"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=(name||"schedule")+".ics"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500); return true }catch{ return false } }
const DDB_MNAMES = { en:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], de:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"], es:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"] };
function ddbMLabel(mm){ return DDB_MNAMES[DDB_LANG] ? DDB_MNAMES[DDB_LANG][mm-1] : (DDB_LANG==="ja"||DDB_LANG==="zh"||DDB_LANG==="zhTW") ? mm+"月" : mm+"월"; }
function ddbYLabel(y){ return y + (DDB_LANG==="ja"||DDB_LANG==="zh"||DDB_LANG==="zhTW" ? "年" : DDB_LANG==="ko" ? "년" : ""); }
// 일정 공유 선택상태를 모든 달력(fd) 인스턴스가 공유 — 창 중복 방지 + 달 넘겨도 선택 유지
const DDBShareStore = {
  sel: null,
  geo: (function(){ try { const v=JSON.parse(localStorage.getItem("ddb_share_geo")||"null"); if(v&&typeof v.x==="number") return v; } catch{} return {x:24, y:Math.round((typeof window!=="undefined"?window.innerHeight:700)*0.32), w:244, h:220}; })(),
  owner: 0, seq: 0, owners: new Set(), ls: new Set(),
  sub(f){ this.ls.add(f); return ()=>this.ls.delete(f); },
  emit(){ this.ls.forEach(f=>{ try{ f(); }catch{} }); },
  setSel(v){ this.sel = typeof v==="function" ? v(this.sel) : v; this.emit(); },
  setGeo(v){ this.geo = typeof v==="function" ? v(this.geo) : v; try{ localStorage.setItem("ddb_share_geo", JSON.stringify(this.geo)); }catch{} this.emit(); },
  claim(){ const id=++this.seq; this.owners.add(id); if(!this.owner) this.owner=id; this.emit(); return id; },
  release(id){ this.owners.delete(id); if(this.owner===id){ this.owner=this.owners.values().next().value||0; this.emit(); } }
};
function ddbTT(t) { return t === "일정" || t === "메모" || /^메모 [1-5]$/.test(t) ? DDBTR(t) : t }
function WTA() {
  const a = { ko: ["일","월","화","수","목","금","토"], en: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], ja: ["日","月","火","水","木","金","土"], zh: ["日","一","二","三","四","五","六"], zhTW: ["日","一","二","三","四","五","六"], de: ["So","Mo","Di","Mi","Do","Fr","Sa"], es: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"] };
  return a[DDB_LANG] || a.ko;
}
function ddbYM(y, m) {
  const M = { en: ["January","February","March","April","May","June","July","August","September","October","November","December"], de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"], es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"] };
  switch (DDB_LANG) {
    case "ja": case "zh": case "zhTW": return y + "年" + m + "月";
    case "en": return M.en[m-1] + " " + y;
    case "de": return M.de[m-1] + " " + y;
    case "es": return M.es[m-1] + " de " + y;
    default: return y + "년 " + m + "월";
  }
}

function ddbICSEsc(v) { return String(v == null ? "" : v).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n") }
function ddbICSUnesc(v) { return String(v == null ? "" : v).replace(/\\n/gi, "\n").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\") }
function ddbICSDayStr(d) { return String(d).replace(/-/g, "") }
function ddbICSAddDay(d, n) { const t = new Date(d + "T00:00:00"); t.setDate(t.getDate() + (n || 1)); return t.getFullYear() + String(t.getMonth() + 1).padStart(2, "0") + String(t.getDate()).padStart(2, "0") }
function ddbICSStamp() { const t = new Date(); const p = x => String(x).padStart(2, "0"); return t.getUTCFullYear() + p(t.getUTCMonth() + 1) + p(t.getUTCDate()) + "T" + p(t.getUTCHours()) + p(t.getUTCMinutes()) + p(t.getUTCSeconds()) + "Z" }
function ddbEventsToICS(events) {
    const stamp = ddbICSStamp();
    const L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//MomentPlan//Schedule//KO", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
    for (const e of events || []) {
        if (!e || !e.date) continue;
        const uid = (e.id || ("ev-" + Math.random().toString(36).slice(2))) + "@momentplan";
        L.push("BEGIN:VEVENT", "UID:" + uid, "DTSTAMP:" + stamp,
            "DTSTART;VALUE=DATE:" + ddbICSDayStr(e.date),
            "DTEND;VALUE=DATE:" + ddbICSAddDay(e.endDate || e.date, 1),
            "SUMMARY:" + ddbICSEsc(e.title || ""));
        if (e.memo) L.push("DESCRIPTION:" + ddbICSEsc(e.memo));
        L.push("END:VEVENT")
    }
    L.push("END:VCALENDAR");
    return L.join("\r\n")
}
function ddbICSParseDay(v) { const m = String(v).match(/(\d{4})(\d{2})(\d{2})/); return m ? m[1] + "-" + m[2] + "-" + m[3] : null }
function ddbICSToEvents(text) {
    const raw = String(text || "").replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
    const lines = raw.split("\n");
    const out = []; let cur = null;
    for (const ln of lines) {
        const t = ln.trim();
        if (t === "BEGIN:VEVENT") { cur = {}; continue }
        if (t === "END:VEVENT") { if (cur && cur.date) out.push(cur); cur = null; continue }
        if (!cur) continue;
        const ci = ln.indexOf(":"); if (ci < 0) continue;
        const base = ln.slice(0, ci).split(";")[0].toUpperCase();
        const val = ln.slice(ci + 1);
        if (base === "SUMMARY") cur.title = ddbICSUnesc(val);
        else if (base === "DESCRIPTION") cur.memo = ddbICSUnesc(val);
        else if (base === "DTSTART") cur.date = ddbICSParseDay(val);
        else if (base === "DTEND") cur._end = ddbICSParseDay(val)
    }
    return out.map(e => {
        let endDate = void 0;
        if (e._end) { const back = ddbICSAddDay(e._end, -1); const bs = back.slice(0, 4) + "-" + back.slice(4, 6) + "-" + back.slice(6, 8); if (bs > e.date) endDate = bs }
        return { id: "ev-ics-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7), title: e.title || "(no title)", date: e.date, endDate, color: "blue", isAllDay: !0, memo: e.memo || void 0 }
    })
}

function DDBMemoOverview() {
    const { state: t } = vt();
    const [open, setOpen] = O.useState(!1);
    const [sel, setSel] = O.useState(null);
    const [kbIdx, setKbIdx] = O.useState(0);
    const [edit, setEdit] = O.useState(null);
    const [ftext, setFtext] = O.useState("");
    const [fon, setFon] = O.useState(!1);
    const [csel, setCsel] = O.useState([]);
    const [con, setCon] = O.useState(!1);
    const [carousel, setCarousel] = O.useState(!0);
    const [cadx, setCadx] = O.useState(0);
    const [evSort, setEvSort] = O.useState("date-asc");
    const [itemIdx, setItemIdx] = O.useState(0);
    const [exp, setExp] = O.useState([]);
    const boxRef = O.useRef(null);
    const [win, setWin] = O.useState(() => { const W = (typeof window !== "undefined" ? window : { innerWidth: 1280, innerHeight: 800 }); return { x: Math.round(W.innerWidth * 0.03), y: Math.round(W.innerHeight * 0.06), w: Math.round(W.innerWidth * 0.94), h: Math.round(W.innerHeight * 0.88) }; });
    function startDrag(e) { if (e.target.closest && (e.target.closest("button") || e.target.closest("input"))) return; e.preventDefault(); const sx = e.clientX, sy = e.clientY, ox = win.x, oy = win.y; function mm(ev) { setWin(w => ({ ...w, x: ox + (ev.clientX - sx), y: Math.max(0, oy + (ev.clientY - sy)) })); } function mu() { document.removeEventListener("mousemove", mm); document.removeEventListener("mouseup", mu); } document.addEventListener("mousemove", mm); document.addEventListener("mouseup", mu); }
    function startResize(e) { e.preventDefault(); e.stopPropagation(); const sx = e.clientX, sy = e.clientY, ow = win.w, oh = win.h; function mm(ev) { setWin(w => ({ ...w, w: Math.max(360, ow + (ev.clientX - sx)), h: Math.max(240, oh + (ev.clientY - sy)) })); } function mu() { document.removeEventListener("mousemove", mm); document.removeEventListener("mouseup", mu); } document.addEventListener("mousemove", mm); document.addEventListener("mouseup", mu); }
    const allTabs = t.memoTabs || [];
    const _q = ftext.trim().toLowerCase();
    const _mi = it => ((it && it.content) || "").toLowerCase().includes(_q);
    const tabs = allTabs.filter(tb => {
        const colorOk = !csel.length || csel.includes(tb.color);
        const textOk = !_q || (ddbTT(tb.title) || "").toLowerCase().includes(_q) || (tb.items || []).some(_mi);
        return colorOk && textOk;
    });
    const carActive = carousel && !_q && !csel.length;
    const _evhex = e => (qt[e.color] || e.customColor || "#8899aa");
    const colorEvents = csel.length ? (t.events || []).filter(e => e && e.amount === void 0 && e.date && csel.some(c => ddbHexDist(_evhex(e), c) < 90)) : [];
    const sortedEv = colorEvents.slice().sort((a, b) => { const da = a.date || "", db = b.date || "", na = a.title || "", nb = b.title || ""; if (evSort === "date-asc") return da.localeCompare(db); if (evSort === "date-desc") return db.localeCompare(da); if (evSort === "name-asc") return na.localeCompare(nb); return nb.localeCompare(na); });
    O.useEffect(() => {
        const openH = () => { const nn = (t.memoTabs || []).length, CP = nn <= 12 ? 5 : 3; setOpen(!0); setSel(null); setEdit(null); setKbIdx(0); setCadx(((CP - 1) / 2) * nn); setItemIdx(0); setExp([]); setFtext(""); setCsel([]); setFon(!1); setCon(!1); };
        window.addEventListener("ddb-memo-overview", openH);
        function onKey(e) {
            const st = t.settings || {};
            if (e.key !== "Tab" || !st.memoTabCycle) return;
            const el = document.activeElement;
            const cur = el && el.getAttribute && el.getAttribute("data-ddb-memo");
            if (!cur) return;
            const inc = Array.isArray(st.memoCycleIds) ? st.memoCycleIds : null;
            let list = [...document.querySelectorAll("[data-ddb-memo]")].map(nd => nd.getAttribute("data-ddb-memo"));
            if (inc) list = list.filter(id => inc.includes(id));
            list = list.filter((id, ix) => list.indexOf(id) === ix);
            if (list.length < 2) return;
            const ix = list.indexOf(cur);
            if (ix < 0) return;
            e.preventDefault();
            const nid = list[(ix + (e.shiftKey ? -1 : 1) + list.length) % list.length];
            const tg = document.querySelector('[data-ddb-memo="' + nid + '"]');
            tg && tg.focus();
        }
        window.addEventListener("keydown", onKey, !0);
        return () => { window.removeEventListener("ddb-memo-overview", openH); window.removeEventListener("keydown", onKey, !0); };
    }, [t.settings]);
    O.useEffect(() => {
        if (!open) return;
        function nav(e) {
            const box = boxRef.current, ae = document.activeElement;
            const editing = box && ae && box.contains(ae) && (ae.tagName === "TEXTAREA" || ae.tagName === "INPUT");
            if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); if (editing) { ae.blur(); setEdit(null); } else if (edit) setEdit(null); else if (sel) setSel(null); else setOpen(!1); return; }
            if (editing) return;
            if (sel && !edit) {
                const cur = allTabs.find(z => z.id === sel);
                const its = cur ? (_q ? (cur.items || []).filter(_mi) : (cur.items || [])) : [];
                const m = its.length;
                if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) { e.preventDefault(); const it = its[itemIdx]; if (it && it.content && navigator.clipboard) navigator.clipboard.writeText(it.content); return; }
                if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); if (m) setItemIdx(i => (i + (e.key === "ArrowDown" ? 1 : -1) + m) % m); }
                else if (e.key === "ArrowRight") { e.preventDefault(); const it = its[itemIdx]; if (it) setExp(a => a.includes(it.id) ? a : [...a, it.id]); }
                else if (e.key === "ArrowLeft") { e.preventDefault(); const it = its[itemIdx]; if (it && exp.includes(it.id)) setExp(a => a.filter(x => x !== it.id)); else setSel(null); }
                else if (e.key === "Enter") { e.preventDefault(); setEdit(sel); setTimeout(() => { const el = boxRef.current && boxRef.current.querySelector('[data-ddb-memo="' + sel + '"]'); el && el.focus(); }, 60); }
                return;
            }
            const n = tabs.length; if (!n) return;
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); const d = e.key === "ArrowRight" ? 1 : -1; setKbIdx(i => (i + d + n) % n); if (carActive) { const COPIES = n <= 12 ? 5 : 3, L = COPIES * n, COLW = 228; let na = cadx + d, adj = 0; if (na < n) { na += n; adj = n * COLW; } else if (na >= L - n) { na -= n; adj = -n * COLW; } setCadx(na); if (adj) { const bx = boxRef.current; if (bx) bx.scrollLeft += adj; } } }
            else if (e.key === "Enter") { e.preventDefault(); const id = (tabs[kbIdx] || {}).id; if (id) { setEdit(null); setSel(id); setItemIdx(0); setExp([]); } }
        }
        window.addEventListener("keydown", nav, !0);
        return () => window.removeEventListener("keydown", nav, !0);
    }, [open, sel, edit, kbIdx, cadx, carousel, ftext, csel, itemIdx, exp, tabs]);
    O.useEffect(() => {
        if (!open) return;
        const box = boxRef.current; if (!box) return;
        const doCenter = () => { const col = box.querySelector('[data-ovactive="1"]'); if (!col) return; if (box.scrollTo && col.getBoundingClientRect) { const cr = box.getBoundingClientRect(), tr = col.getBoundingClientRect(); const delta = (tr.left + tr.width / 2) - (cr.left + cr.width / 2); if (Math.abs(delta) > 1) box.scrollTo({ left: box.scrollLeft + delta, behavior: "smooth" }); } else if (col.scrollIntoView) { col.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); } };
        doCenter(); const t1 = setTimeout(doCenter, 60), t2 = setTimeout(doCenter, 230);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [kbIdx, cadx, sel, edit, open, carousel, ftext, csel, tabs]);
    O.useEffect(() => { if (kbIdx >= tabs.length) setKbIdx(0); }, [tabs.length]);
    O.useEffect(() => { const n = tabs.length; if (carActive && n) { const CP = n <= 12 ? 5 : 3; setCadx(((CP - 1) / 2) * n + ((kbIdx % n + n) % n)); } }, [carActive]);
    O.useEffect(() => { if (!open || !sel) return; const box = boxRef.current; if (!box) return; const el = box.querySelector('[data-ovitem="' + itemIdx + '"]'); el && el.scrollIntoView && el.scrollIntoView({ block: "nearest" }); }, [itemIdx, sel, open]);
    if (!open) return null;
    return Rr.createPortal(o.jsxs(o.Fragment, { children: [
        o.jsx("div", { className: "fixed inset-0", style: { zIndex: 2147483000, backgroundColor: "rgba(0,0,0,0.55)" }, onClick: () => setOpen(!1) }),
        o.jsxs("div", { className: "fixed rounded-2xl shadow-2xl flex flex-col", style: { zIndex: 2147483001, left: win.x, top: win.y, width: win.w, height: win.h, backgroundColor: "#0f1420", border: "1px solid rgba(255,255,255,0.14)" }, children: [
            o.jsxs("div", { onMouseDown: startDrag, style: { cursor: "grab" }, className: "flex items-center gap-2 px-4 py-2.5 border-b border-white/10 flex-shrink-0", children: [
                o.jsxs("span", { className: "text-white font-semibold text-sm", children: ["\u{1F5C2} " + DDBTR("메모 상세"), o.jsx("span", { className: "text-white/35 text-[11px] font-normal ml-2", children: DDBTR("←→ 칸 이동 · Enter 들어가기 · 안에서 ↑↓ 이동 · → 펼치기 · ← 접기 · Esc 뒤로") })] }),
                o.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    o.jsx("button", { onClick: () => setFon(v => !v), title: DDBTR("텍스트 필터"), className: "px-2 py-0.5 rounded text-sm cursor-pointer border " + ((fon || ftext.trim()) ? "bg-blue-500/30 border-blue-400/50 text-white" : "bg-white/5 border-white/15 text-white/60"), children: "\u{1F50D}" }),
                    o.jsx("button", { onClick: () => setCon(v => !v), title: DDBTR("색깔 필터"), className: "px-2 py-0.5 rounded text-sm cursor-pointer border " + ((con || csel.length) ? "bg-blue-500/30 border-blue-400/50 text-white" : "bg-white/5 border-white/15 text-white/60"), children: "\u{1F3A8}" }),
                    o.jsx("button", { onClick: () => setCarousel(v => !v), title: DDBTR("보기 방식 (캐러셀/기본)"), className: "px-2 py-0.5 rounded text-sm cursor-pointer border " + (carousel ? "bg-blue-500/30 border-blue-400/50 text-white" : "bg-white/5 border-white/15 text-white/60"), children: carousel ? "\u{1F3A0}" : "▦" })
                ] }), o.jsx("button", { className: "text-white/50 hover:text-white text-lg leading-none cursor-pointer bg-transparent border-none ml-auto", onClick: () => setOpen(!1), children: "\u2715" })
            ] }),
            (fon || con) && o.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 border-b border-white/10 flex-shrink-0 flex-wrap", children: [
                fon && o.jsx("input", { autoFocus: !0, value: ftext, onChange: e => setFtext(e.target.value), placeholder: DDBTR("메모 내용 검색"), className: "bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs w-56 outline-none" }),
                con && o.jsx("div", { className: "flex items-center gap-1", children: [...new Set(allTabs.map(z => z.color))].map(col => o.jsx("button", { onClick: () => setCsel(a => a.includes(col) ? a.filter(x => x !== col) : [...a, col]), className: "w-5 h-5 rounded-full border-2 cursor-pointer", style: { backgroundColor: col || "#8899aa", borderColor: csel.includes(col) ? "#ffffff" : "transparent" } }, col)) }),
                (ftext.trim() || csel.length) && o.jsx("button", { onClick: () => { setFtext(""); setCsel([]); }, className: "text-white/50 text-xs underline cursor-pointer bg-transparent border-none", children: DDBTR("필터 초기화") })
            ] }),
            o.jsx("div", { ref: boxRef, className: "flex-1 flex items-start gap-2 p-3 overflow-x-auto overflow-y-auto", children: (() => {
                const n = tabs.length;
                if (!n) return o.jsx("div", { className: "text-white/30 text-sm p-4", children: DDBTR("메모가 없습니다") });
                const mkCol = (tb, ix, isActive, k, ai) => {
                    const isSel = isActive && sel === tb.id;
                    const isEdit = isActive && edit === tb.id;
                    const isOpen = isSel || isEdit;
                    return o.jsxs("div", { "data-ovactive": isActive ? "1" : "0", className: "flex flex-col rounded-xl overflow-hidden flex-shrink-0 transition-opacity duration-200", style: { width: isOpen ? "min(560px, 80vw)" : "220px", height: isOpen ? "78vh" : "auto", border: (isActive ? "2px solid " : "1px solid ") + (tb.color || "#8899aa") + (isActive ? "" : "55"), boxShadow: isActive ? "0 0 0 2px " + (tb.color || "#8899aa") + "55" : "none", backgroundColor: "rgba(255,255,255,0.03)", opacity: isActive ? 1 : (carousel ? 0.6 : 1) }, children: [
                        o.jsxs("button", { onClick: () => { setKbIdx(ix); if (carActive) setCadx(ai); setEdit(null); setSel(isSel ? null : tb.id); setItemIdx(0); setExp([]); }, className: "flex items-center gap-1.5 px-3 py-2 cursor-pointer bg-transparent text-left w-full" + (isOpen ? " border-b" : ""), style: { borderColor: "rgba(255,255,255,0.08)" }, children: [
                            o.jsx("span", { className: "w-2.5 h-2.5 rounded-full flex-shrink-0", style: { backgroundColor: tb.color || "#8899aa" } }),
                            o.jsx("span", { className: "text-white/90 text-sm font-medium flex-1 truncate", children: ddbTT(tb.title) }),
                            o.jsx("span", { className: "text-white/35 text-[10px]", children: (tb.items || []).length })
                        ] }),
                        isEdit ? o.jsx("div", { className: "flex-1 min-h-0", children: o.jsx(jw, { tabId: tb.id }) })
                        : isSel ? o.jsx("div", { className: "flex-1 overflow-y-auto p-2 flex flex-col gap-1", children: (() => { const its = _q ? (tb.items || []).filter(_mi) : (tb.items || []); return its.length === 0 ? o.jsx("div", { className: "text-white/30 text-xs p-2", children: DDBTR("메모가 없습니다") }) : its.map((it, ii) => { const isExp = exp.includes(it.id); const isHiI = ii === itemIdx; const first = (it.content || "").split("\n")[0] || DDBTR("(빈 메모)"); return o.jsx("div", { "data-ovitem": ii, onClick: () => { setItemIdx(ii); setExp(a => a.includes(it.id) ? a.filter(x => x !== it.id) : [...a, it.id]); }, className: "text-xs rounded px-2 py-1.5 whitespace-pre-wrap break-words cursor-pointer text-white/85 " + (isHiI ? "bg-white/15 ring-1 ring-white/40" : "bg-white/5 hover:bg-white/10"), title: isExp ? "" : (it.content || "").slice(0, 200), children: isExp ? (it.content || "") : first }, it.id); }); })() })
                        : null
                    ] }, k);
                };
                const ak = ((kbIdx % n + n) % n);
                if (carActive) {
                    const COPIES = n <= 12 ? 5 : 3;
                    const out = [];
                    for (let cp = 0; cp < COPIES; cp++) for (let ix = 0; ix < n; ix++) { const arrIdx = cp * n + ix; out.push(mkCol(tabs[ix], ix, arrIdx === cadx, "c" + arrIdx, arrIdx)); }
                    return out;
                }
                const spacer = key => o.jsx("div", { className: "flex-shrink-0", style: { width: "max(0px, 50% - 280px)", flexShrink: 0 } }, key);
                const opened = sel || edit;
                return [opened && spacer("sp0"), ...tabs.map((tb, ix) => mkCol(tb, ix, ix === ak, "m" + ix, ix)), csel.length && o.jsxs("div", { className: "flex flex-col rounded-xl overflow-hidden flex-shrink-0", style: { width: "320px", height: "78vh", border: "1px dashed rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.03)" }, children: [
                    o.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 border-b border-white/10 flex-shrink-0", children: [
                        o.jsx("span", { className: "text-white/90 text-sm font-medium flex-1", children: "\u{1F4C5} " + DDBTR("이 색 일정") }),
                        o.jsxs("select", { value: evSort, onChange: e => setEvSort(e.target.value), className: "bg-white/10 text-white text-xs rounded px-1 py-0.5 border border-white/20 outline-none", children: [
                            o.jsx("option", { value: "date-asc", children: DDBTR("날짜 ↑") }),
                            o.jsx("option", { value: "date-desc", children: DDBTR("날짜 ↓") }),
                            o.jsx("option", { value: "name-asc", children: DDBTR("이름 ↑") }),
                            o.jsx("option", { value: "name-desc", children: DDBTR("이름 ↓") })
                        ] })
                    ] }),
                    o.jsx("div", { className: "flex-1 overflow-y-auto p-2 flex flex-col gap-1", children: sortedEv.length === 0 ? o.jsx("div", { className: "text-white/30 text-xs p-2", children: DDBTR("해당 색 일정이 없습니다") })
                        : sortedEv.map(e => o.jsxs("div", { className: "text-xs bg-white/5 rounded px-2 py-1.5 flex items-center gap-2", children: [
                            o.jsx("span", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { backgroundColor: qt[e.color] || e.customColor || "#8899aa" } }),
                            o.jsx("span", { className: "text-white/45 font-mono text-[10px] flex-shrink-0", children: e.date }),
                            o.jsx("span", { className: "text-white/85 flex-1 truncate", children: e.title })
                        ] }, e.id)) })
                ] }, "evcol"), opened && spacer("sp1")];
            })() }),
            o.jsx("div", { onMouseDown: startResize, title: DDBTR("크기 조절"), className: "absolute bottom-0 right-0 cursor-nwse-resize", style: { width: 20, height: 20, zIndex: 6 }, children: o.jsx("div", { style: { position: "absolute", right: 4, bottom: 4, width: 9, height: 9, borderRight: "2px solid rgba(255,255,255,0.45)", borderBottom: "2px solid rgba(255,255,255,0.45)" } }) })
        ] })
    ] }), document.body);
}

function DDBAnnounceModal() {
    const [items, setItems] = O.useState([]);
    const [dontShow, setDontShow] = O.useState(!1);
    const [anGeo, setAnGeo] = O.useState(() => ddbWinDefault(384, 0.7));
    const _andh = ddbDragH(() => anGeo, setAnGeo);
    const { user } = pw();
    function readDismissed() { try { return JSON.parse(localStorage.getItem("ddb_ann_dismissed") || "[]") } catch { return [] } }
    async function check() {
        const c = $a(); if (!c || !user) return;
        let tm = null; try { tm = JSON.parse(localStorage.getItem("ddb_active_team") || "null") } catch {}
        if (!tm || !tm.team_id) return;
        try {
            const { data } = await c.rpc("list_announcements", { p_team: tm.team_id });
            const arr = Array.isArray(data) ? data : JSON.parse(data || "[]");
            const dis = readDismissed();
            const fresh = arr.filter(a => !a.is_mine && dis.indexOf(a.id) < 0);
            if (fresh.length) { setItems(fresh); setDontShow(!1) }
        } catch {}
    }
    O.useEffect(() => {
        check();
        const h = () => check();
        window.addEventListener("ddb-team-active", h);
        window.addEventListener("ddb-ann-refresh", h);
        const iv = setInterval(check, 12e4);
        return () => { window.removeEventListener("ddb-team-active", h); window.removeEventListener("ddb-ann-refresh", h); clearInterval(iv) };
    }, [user]);
    if (!items.length) return null;
    function close() {
        if (dontShow) { try { const dis = readDismissed(), ids = items.map(a => a.id); localStorage.setItem("ddb_ann_dismissed", JSON.stringify(dis.concat(ids.filter(x => dis.indexOf(x) < 0)))) } catch {} }
        setItems([]);
    }
    return Rr.createPortal(o.jsxs(o.Fragment, { children: [
        o.jsx("div", { className: "fixed inset-0 bg-black/50", style: { zIndex: 2147483646 }, onClick: close }),
        o.jsxs("div", { className: "fixed rounded-2xl shadow-2xl max-w-[95vw] flex flex-col overflow-hidden", style: { zIndex: 2147483647, left: anGeo.x, top: anGeo.y, width: anGeo.w, height: anGeo.h, backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.12)" }, children: [
            o.jsx("div", { onMouseDown: _andh.drag, style: { cursor: "grab" }, className: "px-4 py-3 border-b border-white/10 text-white font-semibold select-none flex-shrink-0", children: "\u{1F4E2} " + DDBTR("팀 공지") }),
            o.jsx("div", { className: "p-4 flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto", children: items.map(an => o.jsxs("div", { className: "bg-white/6 rounded-lg px-3 py-2", children: [
                an.body && o.jsx("div", { className: "text-white/95 text-sm whitespace-pre-wrap break-words leading-relaxed", children: an.body }),
                an.image_url && o.jsx("img", { src: an.image_url, className: "mt-2 w-full rounded-lg border border-white/10" }),
                o.jsx("div", { className: "text-white/35 text-[11px] mt-1", children: (an.author_email || "") + " · " + ddbAnnDate(an.created_at) })
            ] }, an.id)) }),
            o.jsxs("label", { className: "flex items-center gap-2 px-4 pb-2 text-white/60 text-xs cursor-pointer select-none", children: [
                o.jsx("input", { type: "checkbox", checked: dontShow, onChange: e => setDontShow(e.target.checked) }),
                DDBTR("다음에 이 창을 띄우지 않습니다")
            ] }),
            o.jsx("div", { className: "px-4 pb-4", children: o.jsx("button", { className: "w-full py-2 rounded-lg bg-blue-500 text-white text-sm font-medium cursor-pointer border-none", onClick: close, children: DDBTR("확인") }) }),
            ddbRzHandle(_andh.resize)
        ] })
    ] }), document.body);
}

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
    const [tmGeo, setTmGeo] = O.useState(() => ddbWinDefault(384, 0.82));
    const _tmdh = ddbDragH(() => tmGeo, setTmGeo);
    const [anns, setAnns] = O.useState([]);
    const [annBody, setAnnBody] = O.useState("");
    const [annImg, setAnnImg] = O.useState("");
    const [annImgUp, setAnnImgUp] = O.useState(!1);
    const [wallet, setWallet] = O.useState(null);
    const [teamCfg, setTeamCfg] = O.useState(null);
    const [showCfg, setShowCfg] = O.useState(!1);
    const [cfgDraft, setCfgDraft] = O.useState([]);

    O.useEffect(() => {
        const h = () => { setOpen(!0), setErr(""), setView("list"), refreshTeams(); };
        return window.addEventListener("ddb-team-open", h), () => window.removeEventListener("ddb-team-open", h);
    }, []);

    function cli() { return $a(); }
    async function refreshTeams() {
        const c = cli(); if (!c || !user) return;
        setBusy(!0);
        try {
            const { data } = await c.rpc("my_teams");
            const list = Array.isArray(data) ? data : JSON.parse(data || "[]");
            setTeams(list);
            try { const cur = JSON.parse(localStorage.getItem("ddb_active_team") || "null"); if (cur && cur.team_id && !list.some(z => z.team_id === cur.team_id)) { localStorage.removeItem("ddb_active_team"); window.dispatchEvent(new CustomEvent("ddb-team-active")); } } catch { }
        }
        catch (e) { setErr(String(e && e.message || e)); }
        finally { setBusy(!1); }
    }
    function rpcErrMsg(k) {
        const m = { NO_LICENSE: DDBTR("팀을 만들려면 라이선스가 필요합니다."), INVALID_CODE: DDBTR("참여 코드가 올바르지 않습니다."), NOT_OWNER: DDBTR("소유자만 할 수 있습니다."), OWNER_MUST_DELETE: DDBTR("소유자는 팀을 삭제해야 나갈 수 있습니다."), EMPTY_NAME: DDBTR("팀 이름을 입력하세요."), NOT_EDITOR: DDBTR("공지를 올릴 권한이 없습니다."), EMPTY: DDBTR("내용이 비어 있습니다."), NO_CASH: DDBTR("캐시가 부족합니다."), NOT_MEMBER: DDBTR("팀 멤버가 아닙니다."), BAD_AMOUNT: DDBTR("금액이 올바르지 않습니다."), NO_MANAGE: DDBTR("권한이 없습니다."), BAD_LEVEL: DDBTR("잘못된 등급입니다."), OWNER_FIXED: DDBTR("소유자 등급은 바꿀 수 없습니다."), BAD_CONFIG: DDBTR("설정 형식이 올바르지 않습니다.") };
        return m[k] || k;
    }
    async function doCreate() {
        const c = cli(); if (!c) return;
        setBusy(!0); setErr("");
        try {
            const { data, error } = await c.rpc("create_team", { p_name: nm.trim() });
            if (error) { setErr(error.message || String(error)); return; }
            const r = typeof data === "string" ? JSON.parse(data) : data;
            if (!r || !r.ok) { setErr(rpcErrMsg(r && r.error)); return; }
            setNm(""); await refreshTeams(); openTeam({ team_id: r.team_id, name: r.name, code: r.code, role: "editor", is_owner: !0, member_count: 1 });
        } catch (e) { setErr(String(e && e.message || e)); } finally { setBusy(!1); }
    }
    async function doJoin() {
        const c = cli(); if (!c) return;
        setBusy(!0); setErr("");
        try {
            const { data, error } = await c.rpc("join_team", { p_code: code.trim() });
            if (error) { setErr(error.message || String(error)); return; }
            const r = typeof data === "string" ? JSON.parse(data) : data;
            if (!r || !r.ok) { setErr(rpcErrMsg(r && r.error)); return; }
            setCode(""); await refreshTeams();
            const t = { team_id: r.team_id, name: r.name, role: r.role || "editor", is_owner: !1 };
            openTeam(t);
        } catch (e) { setErr(String(e && e.message || e)); } finally { setBusy(!1); }
    }
    async function openTeam(t) {
        setSel(t); setView("team"); setErr("");
        try { localStorage.setItem("ddb_active_team", JSON.stringify({ team_id: t.team_id, name: t.name, role: t.role, is_owner: t.is_owner })); window.dispatchEvent(new CustomEvent("ddb-team-active")) } catch {}
        await loadMembers(t); await loadEvents(t); await loadAnns(t); await loadWallet(t); await loadCfg(t); subscribe(t);
    }
    async function loadMembers(t) {
        const c = cli(); if (!c) return;
        try { const { data } = await c.rpc("team_member_list", { p_team: t.team_id }); setMembers(Array.isArray(data) ? data : JSON.parse(data || "[]")); } catch { }
    }
    async function loadEvents(t) {
        const c = cli(); if (!c) return;
        try { const { data } = await c.from("team_events").select("id,data,created_by").eq("team_id", t.team_id); setTevents((data || []).map(r => ({ id: r.id, ...r.data }))); } catch { }
    }
    async function loadAnns(t) {
        const c = cli(); if (!c || !t) return;
        try { const { data } = await c.rpc("list_announcements", { p_team: t.team_id }); setAnns(Array.isArray(data) ? data : JSON.parse(data || "[]")); } catch { }
    }
    async function postAnn() {
        const c = cli(); if (!c || !sel) return;
        if (!annBody.trim() && !annImg) { setErr(DDBTR("\uacf5\uc9c0 \ub0b4\uc6a9\uc744 \uc785\ub825\ud558\uc138\uc694.")); return; }
        setBusy(!0); setErr("");
        try {
            const { data, error } = await c.rpc("post_announcement", { p_team: sel.team_id, p_body: annBody.trim(), p_image: annImg || null });
            if (error) { setErr(error.message || String(error)); return; }
            const r = typeof data === "string" ? JSON.parse(data) : data;
            if (!r || !r.ok) { setErr(rpcErrMsg(r && r.error)); return; }
            setAnnBody(""); setAnnImg(""); await loadAnns(sel); await loadWallet(sel); window.dispatchEvent(new CustomEvent("ddb-ann-refresh"));
        } catch (e) { setErr(String(e && e.message || e)); } finally { setBusy(!1); }
    }
    async function loadWallet(t) {
        const c = cli(); if (!c || !t) return;
        try { const { data } = await c.rpc("wallet_balance", { p_team: t.team_id }); const r = typeof data === "string" ? JSON.parse(data) : data; setWallet(r && r.ok ? r.balance : null); } catch { }
    }
    async function uploadAnnImg(file) {
        const c = cli(); if (!c || !sel || !file) return;
        if (file.size > 5 * 1024 * 1024) { setErr(DDBTR("이미지는 5MB 이하만 가능합니다.")); return; }
        setAnnImgUp(!0); setErr("");
        try {
            const ext = (file.name.split(".").pop() || "png").toLowerCase();
            const path = sel.team_id + "/" + Date.now() + "-" + Math.random().toString(36).slice(2) + "." + ext;
            const { error } = await c.storage.from("team-images").upload(path, file, { contentType: file.type || "image/png", upsert: !1 });
            if (error) { setErr(error.message || String(error)); return; }
            const { data: pub } = c.storage.from("team-images").getPublicUrl(path);
            setAnnImg(pub && pub.publicUrl || "");
        } catch (e) { setErr(String(e && e.message || e)); } finally { setAnnImgUp(!1); }
    }
    async function delAnn(id) {
        const c = cli(); if (!c) return;
        if (!confirm(DDBTR("\uc774 \uacf5\uc9c0\ub97c \uc0ad\uc81c\ud560\uae4c\uc694?"))) return;
        try { await c.rpc("delete_announcement", { p_id: id }); await loadAnns(sel); } catch (e) { setErr(String(e && e.message || e)); }
    }
    function subscribe(t) {
        const c = cli(); if (!c) return;
        if (chanRef.current) { try { c.removeChannel(chanRef.current); } catch { } chanRef.current = null; }
        try {
            const ch = c.channel("teamev-" + t.team_id + "-" + Math.random().toString(36).slice(2)).on("postgres_changes", { event: "*", schema: "public", table: "team_events", filter: "team_id=eq." + t.team_id }, () => loadEvents(t)).subscribe();
            chanRef.current = ch;
        } catch { }
    }
    O.useEffect(() => () => { const c = cli(); if (c && chanRef.current) try { c.removeChannel(chanRef.current); } catch { } }, []);

    function capsFromCfg(r) { const caps = { view: !0, share: !1, event: !1, announce: !1, manage: !1 }; if (!r) return caps; if (r.is_owner) { caps.share = caps.event = caps.announce = caps.manage = !0; return caps; } const e = (r.config || []).find(x => Number(x.lvl) === Number(r.my_level)); if (e) ["share", "event", "announce", "manage"].forEach(k => caps[k] = !!e[k]); return caps; }
    async function loadCfg(t) {
        const c = cli(); if (!c || !t) return;
        try {
            const { data } = await c.rpc("get_team_config", { p_team: t.team_id });
            const r = typeof data === "string" ? JSON.parse(data) : data;
            setTeamCfg(r && r.ok ? r : null);
            if (r && r.ok) { try { const cur = JSON.parse(localStorage.getItem("ddb_active_team") || "null"); if (cur && cur.team_id === t.team_id) { cur.caps = capsFromCfg(r); cur.level = r.my_level; localStorage.setItem("ddb_active_team", JSON.stringify(cur)); window.dispatchEvent(new CustomEvent("ddb-team-active")); } } catch { } }
        } catch { }
    }
    function myCap(cap) { if (cap === "view") return !0; if (!teamCfg) return !1; if (teamCfg.is_owner) return !0; const e = (teamCfg.config || []).find(x => Number(x.lvl) === Number(teamCfg.my_level)); return !!(e && e[cap]); }
    function lvlName(lv) { const e = ((teamCfg && teamCfg.config) || []).find(x => Number(x.lvl) === Number(lv)); return (e && e.name) || (lv + DDBTR("단계")); }
    function updCfg(ix, key, val) { setCfgDraft(d => { const n = d.map(r => ({ ...r })); n[ix][key] = val; return n; }); }
    async function saveCfg() {
        const c = cli(); if (!c || !sel) return;
        setBusy(!0); setErr("");
        try {
            const norm = cfgDraft.map(r => Number(r.lvl) === 1 ? { ...r, share: !0, event: !0, announce: !0, manage: !0 } : Number(r.lvl) === 5 ? { ...r, share: !1, event: !1, announce: !1, manage: !1 } : r);
            const { data } = await c.rpc("set_team_config", { p_team: sel.team_id, p_config: norm });
            const r = typeof data === "string" ? JSON.parse(data) : data;
            if (r && !r.ok) { setErr(rpcErrMsg(r.error)); return; }
            await loadCfg(sel); await loadMembers(sel); setShowCfg(!1); setErr(DDBTR("등급 설정을 저장했습니다."));
        } catch (e) { setErr(String(e && e.message || e)); } finally { setBusy(!1); }
    }
    async function setLevel(uid, lv) {
        const c = cli(); if (!c || !sel) return;
        try { const { data } = await c.rpc("set_member_level", { p_team: sel.team_id, p_user: uid, p_level: Number(lv) }); const r = typeof data === "string" ? JSON.parse(data) : data; if (r && !r.ok) { setErr(rpcErrMsg(r.error)); return; } await loadMembers(sel); } catch (e) { setErr(String(e && e.message || e)); }
    }
    const canEdit = myCap("event");
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
        return o.jsxs("div", { onMouseDown: _tmdh.drag, style: { cursor: "grab" }, className: "flex items-center justify-between px-4 py-3 border-b border-white/10 select-none flex-shrink-0", children: [
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
        o.jsxs("div", { className: "border-t border-white/10 pt-3", children: [
            o.jsxs("div", { className: "text-white/60 text-xs mb-1.5", children: ["\u{1F4E2} ", DDBTR("공지")] }),
            myCap("announce") && o.jsxs("div", { className: "flex flex-col gap-1.5 mb-2", children: [
                o.jsx("textarea", { className: inputCls + " resize-none h-16", placeholder: DDBTR("팀원에게 보낼 공지를 입력하세요"), value: annBody, onChange: e => setAnnBody(e.target.value) }),
                o.jsxs("div", { className: "flex items-center gap-2", children: [
                    o.jsxs("label", { className: "text-xs px-2 py-1 rounded bg-white/10 text-white/80 cursor-pointer border border-white/15 whitespace-nowrap", children: [
                        annImgUp ? DDBTR("올리는 중…") : "📎 " + DDBTR("이미지"),
                        o.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: e => { const f = e.target.files && e.target.files[0]; if (f) uploadAnnImg(f); e.target.value = ""; } })
                    ] }),
                    annImg && o.jsx("img", { src: annImg, className: "h-8 w-8 rounded object-cover border border-white/20" }),
                    annImg && o.jsx("button", { className: "text-red-400 text-xs cursor-pointer bg-transparent border-none", onClick: () => setAnnImg(""), children: DDBTR("제거") }),
                    annImg && DDB_CASH_ON && o.jsx("span", { className: "text-white/35 text-[11px] ml-auto", children: DDBTR("이미지 공지 10캐시 차감") })
                ] }),
                o.jsxs("div", { className: "flex items-center gap-2", children: [
                    DDB_CASH_ON && wallet != null && o.jsxs("span", { className: "text-emerald-300/80 text-[11px]", children: ["💳 ", DDBTR("잔액"), ": ", wallet, " ", DDBTR("캐시")] }),
                    o.jsx("button", { className: btnP + " bg-amber-500 text-white ml-auto", disabled: busy || annImgUp, onClick: postAnn, children: DDBTR("공지 올리기") })
                ] })
            ] }),
            o.jsx("div", { className: "flex flex-col gap-1 max-h-40 overflow-y-auto", children: anns.length === 0 ? o.jsx("div", { className: "text-white/40 text-sm py-1", children: DDBTR("등록된 공지가 없습니다.") })
                : anns.map(an => o.jsxs("div", { className: "bg-white/5 rounded px-2 py-1.5 flex items-start gap-2", children: [
                    o.jsxs("div", { className: "flex-1 min-w-0", children: [
                        an.body && o.jsx("div", { className: "text-white/90 text-sm whitespace-pre-wrap break-words", children: an.body }),
                        an.image_url && o.jsx("img", { src: an.image_url, className: "mt-1 max-h-40 rounded-lg border border-white/10 cursor-pointer", onClick: () => window.open(an.image_url, "_blank") }),
                        o.jsx("div", { className: "text-white/35 text-[11px] mt-0.5", children: (an.author_email || "") + " · " + ddbAnnDate(an.created_at) })
                    ] }),
                    (an.is_mine || sel.is_owner) && o.jsx("button", { className: "text-red-400 text-xs cursor-pointer bg-transparent border-none flex-none", onClick: () => delAnn(an.id), children: "✕" })
                ] }, an.id)) })
        ] }),
        o.jsxs("div", { children: [
            o.jsx("div", { className: "text-white/60 text-xs mb-1.5", children: DDBTR("멤버") }),
            o.jsx("div", { className: "flex flex-col gap-1", children: members.map(m => o.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                o.jsx("span", { className: "text-white/85 truncate flex-1", children: (m.email || "?") + (m.is_me ? " (" + DDBTR("나") + ")" : "") }),
                m.is_owner ? o.jsx("span", { className: "text-amber-300/80 text-xs whitespace-nowrap", children: "★ " + lvlName(1) })
                : (teamCfg && teamCfg.can_manage) ? o.jsxs(o.Fragment, { children: [
                    o.jsx("select", { className: "bg-white/10 text-white text-xs rounded px-1 py-0.5 border border-white/20", value: m.level, onChange: e => setLevel(m.user_id, e.target.value), children: [1, 2, 3, 4, 5].map(lv => o.jsx("option", { value: lv, children: lv + ". " + lvlName(lv) }, lv)) }),
                    o.jsx("button", { className: "text-red-400 text-xs cursor-pointer bg-transparent border-none", onClick: () => kick(m.user_id), children: DDBTR("내보내기") })
                ] })
                : o.jsx("span", { className: "text-white/40 text-xs whitespace-nowrap", children: lvlName(m.level) })
            ] }, m.user_id)) })
        ] }),
        (teamCfg && teamCfg.can_manage) && o.jsxs("div", { className: "border-t border-white/10 pt-3", children: [
            o.jsxs("button", { className: "text-white/60 text-xs mb-1.5 cursor-pointer bg-transparent border-none flex items-center gap-1", onClick: () => { if (!showCfg && teamCfg) setCfgDraft(JSON.parse(JSON.stringify(teamCfg.config || []))); setShowCfg(!showCfg); }, children: ["⚙ ", DDBTR("등급 설정"), " ", showCfg ? "▲" : "▼"] }),
            showCfg && o.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                o.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-white/40 px-0.5", children: [
                    o.jsx("span", { className: "w-5", children: "#" }),
                    o.jsx("span", { className: "flex-1", children: DDBTR("이름") }),
                    o.jsx("span", { className: "w-7 text-center", children: DDBTR("공유") }),
                    o.jsx("span", { className: "w-7 text-center", children: DDBTR("일정") }),
                    o.jsx("span", { className: "w-7 text-center", children: DDBTR("공지") }),
                    o.jsx("span", { className: "w-7 text-center", children: DDBTR("관리") })
                ] }),
                cfgDraft.map((row, ix) => o.jsxs("div", { className: "flex items-center gap-1", children: [
                    o.jsx("span", { className: "w-5 text-white/50 text-xs", children: row.lvl }),
                    o.jsx("input", { className: "flex-1 bg-white/10 border border-white/20 rounded px-1.5 py-1 text-white text-xs outline-none", value: row.name || "", onChange: e => updCfg(ix, "name", e.target.value) }),
                    ["share", "event", "announce", "manage"].map(cap => o.jsx("input", { type: "checkbox", className: "w-7", checked: Number(row.lvl) === 1 ? !0 : Number(row.lvl) === 5 ? !1 : !!row[cap], disabled: Number(row.lvl) === 1 || Number(row.lvl) === 5, onChange: e => updCfg(ix, cap, e.target.checked) }, cap))
                ] }, row.lvl)),
                o.jsx("div", { className: "text-[11px] text-emerald-300/70 px-0.5", children: (() => { const cfg = (teamCfg && teamCfg.config) || []; const paid = members.filter(m => { if (m.is_owner) return !0; const e = cfg.find(x => Number(x.lvl) === Number(m.level)); return !!(e && (e.share || e.event || e.announce || e.manage)); }).length; const free = members.length - paid; return "\u{1F4BA} " + DDBTR("정규 좌석") + ": " + paid + DDBTR("명") + " \u00b7 " + DDBTR("보기 전용(무료)") + ": " + free + DDBTR("명"); })() }),
                o.jsx("div", { className: "text-[10px] text-white/35 px-0.5 leading-snug", children: DDBTR("최하 등급(5)은 보기 전용·무료로 고정됩니다.") }),
                o.jsx("div", { className: "text-[10px] text-white/35 px-0.5 leading-snug", children: DDBTR("숫자 낮을수록 권한 높음. 소유자는 항상 전권입니다.") }),
                o.jsx("button", { className: btnP + " bg-indigo-500 text-white self-end", disabled: busy, onClick: saveCfg, children: DDBTR("등급 설정 저장") })
            ] })
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
        o.jsxs("div", { ref: boxRef, className: "fixed z-[9999] rounded-2xl shadow-2xl max-w-[95vw] flex flex-col overflow-hidden", style: { left: tmGeo.x, top: tmGeo.y, width: tmGeo.w, height: tmGeo.h, backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.18)" }, children: [
            header("👥 " + DDBTR("팀 달력")),
            o.jsx("div", { className: "flex-1 min-h-0 overflow-y-auto", children: body }),
            ddbRzHandle(_tmdh.resize)
        ] })
    ] }), document.body);
}

function ddbAutoLoginOn() {
    return localStorage.getItem("auto_login_v1") === "1"
}

function zv() {
    // 복원 조건: (1) 백업 가져오기 직후 1회, (2) 자동 로그인 켜짐 + 로그인 세션 존재
    // 그 외에는 항상 빈 상태로 시작 (비로그인 = 빈 데이터)
    try {
        const once = localStorage.getItem("restore_once_v1") === "1";
        once && localStorage.removeItem("restore_once_v1");
        if (once || (ddbAutoLoginOn() && ddbHasSession())) {
            const raw = localStorage.getItem(Ef);
            if (raw) {
                const p = JSON.parse(raw);
                delete p._ps, delete p._fb;
                return { ...Hl, ...p }
            }
        }
    } catch {}
    return Hl
}

function Hv(e) {
    try {
        localStorage.setItem(Ef, JSON.stringify(e))
    } catch {}
}

function Vk() {
    localStorage.removeItem(Ef)
}

function Gk(e, t) {
    switch (t.type) {
        case "SET_MONTH":
            return {
                ...e, currentYear: t.year, currentMonth: t.month
            };
        case "SET_ACTIVE_TAB":
            return {
                ...e, activeTab: t.id
            };
        case "SET_FONT_SIZE":
            return {
                ...e, fontSize: t.size
            };
        case "ADD_EVENT":
            return {
                ...e, events: [...e.events, t.event]
            };
        case "UPDATE_EVENT":
            return {
                ...e, events: e.events.map(r => r.id === t.event.id ? t.event : r)
            };
        case "DELETE_EVENT":
            return {
                ...e, events: e.events.filter(r => r.id !== t.id)
            };
        case "ADD_DDAY":
            return {
                ...e, ddays: [...e.ddays, t.dday]
            };
        case "UPDATE_DDAY":
            return {
                ...e, ddays: e.ddays.map(r => r.id === t.dday.id ? t.dday : r)
            };
        case "DELETE_DDAY":
            return {
                ...e, ddays: e.ddays.filter(r => r.id !== t.id)
            };
        case "ADD_MEMO_ITEM":
            return {
                ...e, memoTabs: e.memoTabs.map(r => r.id === t.tabId ? {
                    ...r,
                    items: [t.item, ...r.items]
                } : r)
            };
        case "UPDATE_MEMO_ITEM":
            return {
                ...e, memoTabs: e.memoTabs.map(r => r.id === t.tabId ? {
                    ...r,
                    items: r.items.map(n => n.id === t.item.id ? t.item : n)
                } : r)
            };
        case "DELETE_MEMO_ITEM":
            return {
                ...e, memoTabs: e.memoTabs.map(r => r.id === t.tabId ? {
                    ...r,
                    items: r.items.filter(n => n.id !== t.itemId)
                } : r)
            };
        case "ADD_MEMO_TAB":
            return {
                ...e, memoTabs: [...e.memoTabs, t.tab]
            };
        case "UPDATE_MEMO_TAB":
            return {
                ...e, memoTabs: e.memoTabs.map(r => r.id === t.tab.id ? t.tab : r)
            };
        case "DELETE_MEMO_TAB":
            return {
                ...e, memoTabs: e.memoTabs.filter(r => r.id !== t.id), activeTab: e.activeTab === t.id ? "calendar" : e.activeTab
            };
        case "SET_PANEL_SLOT": {
            const r = e.panels.filter(s => s.id !== t.id && s.slot === t.slot),
                n = t.order !== void 0 ? t.order : r.length;
            return {
                ...e,
                panels: e.panels.map(s => s.id === t.id ? {
                    ...s,
                    slot: t.slot,
                    order: n
                } : s)
            }
        }
        case "FLOAT_PANEL":
            return {
                ...e, panels: e.panels.map(r => r.id === t.id ? {
                    ...r,
                    slot: "float",
                    floatX: t.x,
                    floatY: t.y
                } : r)
            };
        case "RESIZE_PANEL":
            return {
                ...e, panels: e.panels.map(r => r.id === t.id ? {
                    ...r,
                    floatW: t.width,
                    floatH: t.height,
                    ...t.x !== void 0 ? {
                        floatX: t.x
                    } : {},
                    ...t.y !== void 0 ? {
                        floatY: t.y
                    } : {}
                } : r)
            };
        case "RESIZE_PANEL_H":
            return {
                ...e, panels: e.panels.map(r => r.id === t.id ? {
                    ...r,
                    slotH: t.height
                } : r)
            };
        case "MINIMIZE_PANEL":
            return {
                ...e, panels: e.panels.map(r => r.id === t.id ? {
                    ...r,
                    minimized: t.minimized
                } : r)
            };
        case "BRING_FRONT": {
            const r = e.topZIndex + 1;
            return {
                ...e,
                topZIndex: r,
                panels: e.panels.map(n => n.id === t.id ? {
                    ...n,
                    zIndex: r
                } : n)
            }
        }
        case "ADD_PANEL":
            return {
                ...e, panels: [...e.panels, t.panel]
            };
        case "REMOVE_PANEL":
            return {
                ...e, panels: e.panels.filter(r => r.id !== t.id)
            };
        case "UPDATE_SETTINGS":
            return {
                ...e, settings: {
                    ...e.settings,
                    ...t.settings
                }
            };
        case "UPDATE_PRIVACY":
            return {
                ...e, privacy: {
                    ...e.privacy,
                    ...t.privacy
                }
            };
        case "ADD_LOAN":
            return {
                ...e, loans: [...e.loans || [], t.loan]
            };
        case "UPDATE_LOAN":
            return {
                ...e, loans: (e.loans || []).map(r => r.id === t.loan.id ? t.loan : r)
            };
        case "DELETE_LOAN":
            return {
                ...e, loans: (e.loans || []).filter(r => r.id !== t.id)
            };
        case "ADD_SAVINGS":
            return {
                ...e, savings: [...e.savings || [], t.entry]
            };
        case "UPDATE_SAVINGS":
            return {
                ...e, savings: (e.savings || []).map(r => r.id === t.entry.id ? t.entry : r)
            };
        case "DELETE_SAVINGS":
            return {
                ...e, savings: (e.savings || []).filter(r => r.id !== t.id)
            };
        case "BATCH_ADD_EVENTS":
            return {
                ...e, events: [...e.events, ...t.events]
            };
        case "UPSERT_BANK_ALIAS":
            return {
                ...e, bankAliases: {
                    ...e.bankAliases ?? {},
                    [t.key]: t.alias
                }
            };
        case "DELETE_BANK_BATCH":
            return {
                ...e, events: e.events.filter(r => !r.bankTx || r.bankTx.importedAt !== t.batchId)
            };
        case "BULK_UPDATE_BANK_ALIAS": {
            const r = e.events.map(n => !n.bankTx || n.bankTx.originalMemo !== t.key ? n : {
                ...n,
                title: t.alias.displayName,
                color: t.alias.color
            });
            return {
                ...e,
                events: r,
                bankAliases: {
                    ...e.bankAliases ?? {},
                    [t.key]: t.alias
                }
            }
        }
        case "ADD_FEEDBACK_MEMO":
            return {
                ...e, feedbackMemos: [...e.feedbackMemos ?? [], t.memo]
            };
        case "COMPLETE_FEEDBACK_MEMO":
            return {
                ...e, feedbackMemos: (e.feedbackMemos ?? []).map(r => r.id === t.id ? {
                    ...r,
                    completedAt: new Date().toISOString(),
                    isDismissed: !0
                } : r)
            };
        case "DISMISS_FEEDBACK_MEMO":
            return {
                ...e, feedbackMemos: (e.feedbackMemos ?? []).map(r => r.id === t.id ? {
                    ...r,
                    isDismissed: !0
                } : r)
            };
        case "ADD_TODO":
            return {
                ...e, todos: [...e.todos ?? [], t.todo]
            };
        case "UPDATE_TODO":
            return {
                ...e, todos: (e.todos ?? []).map(r => r.id === t.todo.id ? t.todo : r)
            };
        case "DELETE_TODO":
            return {
                ...e, todos: (e.todos ?? []).filter(r => r.id !== t.id)
            };
        case "TOGGLE_TODO":
            return {
                ...e, todos: (e.todos ?? []).map(r => r.id === t.id ? {
                    ...r,
                    completedAt: r.completedAt ? null : new Date().toISOString()
                } : r)
            };
        case "REORDER_TODO": {
            const r = new Map((e.todos ?? []).map(s => [s.id, s])),
                n = t.ids.map((s, a) => ({
                    ...r.get(s),
                    order: a
                }));
            return {
                ...e,
                todos: n
            }
        }
        case "ADD_DODO":
            return {
                ...e, dodos: [...e.dodos ?? [], t.item]
            };
        case "TOGGLE_DODO":
            return {
                ...e, dodos: (e.dodos ?? []).map(r => r.id === t.id ? {
                    ...r,
                    checked: !r.checked
                } : r)
            };
        case "DELETE_DODO":
            return {
                ...e, dodos: (e.dodos ?? []).filter(r => r.id !== t.id)
            };
        case "MOVE_EVENT_NEAR": {
            const r = e.events.find(s => s.id === t.id);
            if (!r) return e;
            const n = e.events.filter(s => s.id !== t.id);
            let a = n.findIndex(s => s.id === t.targetId);
            if (a === -1) return e;
            t.after && (a += 1), n.splice(a, 0, r);
            return {
                ...e, events: n
            }
        }
        case "RESET":
            return zv();
        case "LOAD_FROM_CLOUD": {
            const {
                currentYear: r,
                currentMonth: n
            } = e;
            return {
                ...t.state,
                currentYear: r,
                currentMonth: n
            }
        }
        default:
            return e
    }
}
const Wv = O.createContext(null);

function Kk({
    children: e
}) {
    const [t, r] = O.useReducer(Gk, void 0, zv);
    O.useEffect(() => {
        Hv(t)
    }, [t]);
    const n = O.useCallback((i, l) => r({
            type: "SET_MONTH",
            year: i,
            month: l
        }), []),
        s = O.useCallback(i => r({
            type: "SET_ACTIVE_TAB",
            id: i
        }), []),
        a = O.useCallback(i => r({
            type: "SET_FONT_SIZE",
            size: i
        }), []);
    return o.jsx(Wv.Provider, {
        value: {
            state: t,
            dispatch: r,
            goToMonth: n,
            setActiveTab: s,
            setFontSize: a
        },
        children: e
    })
}

function vt() {
    const e = O.useContext(Wv);
    if (!e) throw new Error("useAppContext must be used inside AppProvider");
    return e
}
/* ─────────────────────────────────────────────────
   판매용 Supabase 내장 설정
   아래 두 값을 채우면: 고객은 아무 설정 없이 이메일 가입만 하면 됩니다.
   (Supabase 대시보드 → Settings → API → Project URL / anon public key)
   비워두면: 기존처럼 설정 화면에서 직접 입력하는 방식으로 작동합니다.
──────────────────────────────────────────────── */
const DDB_VERSION = "0.97.22";
const DDB_CASH_ON = !1;
const DDB_EMBED = {
    url: "https://hqeukjoalmcpmjuslxmm.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZXVram9hbG1jcG1qdXNseG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNTQ5MTUsImV4cCI6MjEwMDczMDkxNX0.f4tlaie_OcXDpzyrizcicLC2KFWYMDbchrof2ibUGQk"
};
const DDB_EMBEDDED = () => DDB_EMBED.url.startsWith("https://") && DDB_EMBED.anonKey.length > 20;
const Nf = "supabase_config_v1";

function Cf() {
    var e, t;
    if (DDB_EMBEDDED()) return DDB_EMBED;
    try {
        const r = localStorage.getItem(Nf);
        if (!r) return null;
        const n = JSON.parse(r);
        return (e = n.url) != null && e.startsWith("https://") && ((t = n.anonKey) == null ? void 0 : t.length) > 20 ? n : null
    } catch {
        return null
    }
}
let ca = null;

function $a() {
    if (ca) return ca;
    const e = Cf();
    return e ? (ca = fw(e.url, e.anonKey, {
        auth: {
            persistSession: !0,
            autoRefreshToken: !0
        }
    }), ca) : null
}

function Af() {
    return Cf() !== null
}

function YS(e, t) {
    const r = {
        url: e.trim(),
        anonKey: t.trim()
    };
    return localStorage.setItem(Nf, JSON.stringify(r)), ca = fw(r.url, r.anonKey, {
        auth: {
            persistSession: !0,
            autoRefreshToken: !0
        }
    }), ca
}

function nm() {
    localStorage.removeItem(Nf), ca = null
}

function XS() {
    var e;
    return ((e = Cf()) == null ? void 0 : e.url) ?? ""
}
const xw = O.createContext(null);

async function im9(E) {
    const L = localStorage.getItem("ddb_pending_license");
    if (!L) return;
    try {
        const {
            data: r
        } = await E.rpc("activate_license", {
            p_key: L.trim()
        });
        (r === "OK" || r === "ALREADY_ACTIVE") && localStorage.removeItem("ddb_pending_license"), r === "INVALID_KEY" && (localStorage.removeItem("ddb_pending_license"), alert(DDBTR("라이선스 키가 유효하지 않습니다. 클라우드 동기화가 제한됩니다.")))
    } catch {}
}

function qS({
    children: e
}) {
    const {
        state: t,
        dispatch: r
    } = vt(), [n, s] = O.useState(null), [a, i] = O.useState(!1), [l, c] = O.useState("idle"), [u, h] = O.useState(null), d = O.useRef(null), f = O.useRef(null), x = O.useRef(!0);
    O.useEffect(() => {
        if (!Af()) return;
        const _ = $a();
        if (!_) return;
        if (!ddbAutoLoginOn()) {
            _.auth.signOut();
            return
        }
        _.auth.getSession().then(({
            data: {
                session: E
            }
        }) => {
            E != null && E.user && (s(E.user), f.current = E.user, p(E.user.id))
        });
        const {
            data: {
                subscription: k
            }
        } = _.auth.onAuthStateChange((E, b) => {
            const T = (b == null ? void 0 : b.user) ?? null;
            s(T), f.current = T
        });
        return () => k.unsubscribe()
    }, []), O.useEffect(() => {
        if (!f.current || x.current) {
            x.current = !1;
            return
        }
        return d.current && clearTimeout(d.current), d.current = setTimeout(() => {
            m()
        }, 3e3), () => {
            d.current && clearTimeout(d.current)
        }
    }, [t]);
    const p = O.useCallback(async _ => {
            const k = $a();
            if (k) {
                c("syncing");
                await im9(k);
                try {
                    const {
                        data: E,
                        error: b
                    } = await k.from("user_data").select("data").eq("user_id", _).single();
                    if (b && b.code !== "PGRST116") throw b;
                    E != null && E.data && Object.keys(E.data).length > 0 && (r({
                        type: "LOAD_FROM_CLOUD",
                        state: E.data
                    }), E.data._ps && localStorage.setItem("player-songs", JSON.stringify(E.data._ps)), E.data._fb != null && localStorage.setItem("fortune-birth", E.data._fb)), c("synced"), h(new Date().toLocaleTimeString("ko-KR"))
                } catch (E) {
                    console.error("cloud load error:", E), c("error")
                }
            }
        }, [r]),
        m = O.useCallback(async () => {
            const _ = $a();
            if (!(!_ || !f.current)) {
                c("syncing");
                try {
                    const {
                        error: k
                    } = await _.from("user_data").upsert({
                        user_id: f.current.id,
                        data: {
                            ...t,
                            _ps: JSON.parse(localStorage.getItem("player-songs") ?? "[]"),
                            _fb: localStorage.getItem("fortune-birth") ?? ""
                        },
                        updated_at: new Date().toISOString()
                    }, {
                        onConflict: "user_id"
                    });
                    if (k) throw k;
                    c("synced"), h(new Date().toLocaleTimeString("ko-KR"))
                } catch (k) {
                    console.error("cloud upload error:", k), c("error")
                }
            }
        }, [t]),
        y = O.useCallback(async (_, k) => {
            const E = $a();
            if (!E) return DDBTR("Supabase가 설정되지 않았습니다");
            i(!0);
            try {
                const {
                    data: b,
                    error: T
                } = await E.auth.signInWithPassword({
                    email: _,
                    password: k
                });
                return T ? T.message : (b.user && (s(b.user), f.current = b.user, x.current = !0, await p(b.user.id)), null)
            } finally {
                i(!1)
            }
        }, [p]),
        w = O.useCallback(async (_, k, L9) => {
            const E = $a();
            if (!E) return DDBTR("Supabase가 설정되지 않았습니다");
            i(!0);
            try {
                const {
                    data: b,
                    error: T
                } = await E.auth.signUp({
                    email: _,
                    password: k
                });
                if (T) return T.message;
                return L9 && localStorage.setItem("ddb_pending_license", L9), b.user && b.session && (s(b.user), f.current = b.user, await im9(E), await m()), null
            } finally {
                i(!1)
            }
        }, [m]),
        v = O.useCallback(async () => {
            const _ = $a();
            _ && (d.current && clearTimeout(d.current), await _.auth.signOut(), Vk(), localStorage.removeItem("player-songs"), localStorage.removeItem("fortune-birth"), localStorage.removeItem("calc-history"), window.location.reload())
        }, []),
        g = O.useCallback(async () => {
            f.current && await m()
        }, [m]);
    return o.jsx(xw.Provider, {
        value: {
            user: n,
            loading: a,
            syncStatus: l,
            lastSynced: u,
            login: y,
            register: w,
            logout: v,
            forcSync: g
        },
        children: e
    })
}

function pw() {
    const e = O.useContext(xw);
    if (!e) throw new Error("useAuth must be inside AuthProvider");
    return e
}
function _T(e) {
    try {
        const t = e.split(".");
        if (t.length !== 3) return !1;
        const r = t[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(r)).role === "service_role"
    } catch {
        return !1
    }
}
const ro = {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.09)",
        border: "1px solid rgba(255,255,255,0.22)",
        borderRadius: "8px",
        padding: "8px 12px",
        color: "white",
        fontSize: "13px",
        outline: "none",
        boxSizing: "border-box"
    },
    ET = {
        ...ro,
        fontFamily: "monospace",
        fontSize: "11px"
    };

function ST({
    open: e,
    onClose: t
}) {
    var q, U;
    const {
        user: r,
        loading: n,
        syncStatus: s,
        lastSynced: a,
        login: i,
        register: l,
        logout: c,
        forcSync: u
    } = pw(), [h, d] = O.useState("auth"), [f, x] = O.useState("login"), [p, m] = O.useState(() => localStorage.getItem("saved_email") ?? ""), [y, w] = O.useState(""), [v, g] = O.useState(""), [_, k] = O.useState(""), [E, b] = O.useState(""), [T, A] = O.useState(""), [H, F] = O.useState(""), [R, K] = O.useState(""), [Lk, Lq] = O.useState(""), se = O.useRef(null);
    O.useEffect(() => {
        if (e) {
            if (r) {
                d("account");
                return
            }
            if (!Af()) {
                A(XS()), d("setup");
                return
            }
            d("auth")
        }
    }, [e, r]);
    const z = O.useRef({
        dragging: !1,
        ox: 0,
        oy: 0
    });

    function G(B) {
        const W = se.current;
        if (!W) return;
        const te = W.getBoundingClientRect();
        z.current = {
            dragging: !0,
            ox: B.clientX - te.left,
            oy: B.clientY - te.top
        };
        const he = ue => {
                !z.current.dragging || !W || (W.style.left = `${ue.clientX-z.current.ox}px`, W.style.top = `${ue.clientY-z.current.oy}px`, W.style.transform = "none")
            },
            ne = () => {
                z.current.dragging = !1, window.removeEventListener("mousemove", he), window.removeEventListener("mouseup", ne)
            };
        window.addEventListener("mousemove", he), window.addEventListener("mouseup", ne)
    }
    if (!e) return null;
    const re = o.jsxs("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            },
            children: [o.jsxs("p", {
                style: {
                    color: "rgba(255,255,255,0.50)",
                    fontSize: "12px",
                    lineHeight: "1.6",
                    margin: 0
                },
                children: [DDBTR("Supabase 대시보드 → Settings → API →"), o.jsx("br", {}), o.jsx("strong", {
                    style: {
                        color: "rgba(255,255,255,0.70)"
                    },
                    children: DDBTR("anon (공개키)")
                }), DDBTR("를 복사하세요."), o.jsx("br", {}), o.jsx("span", {
                    style: {
                        color: "rgba(255,100,100,0.80)"
                    },
                    children: DDBTR("service_role(비밀키)는 절대 사용 금지.")
                })]
            }), o.jsxs("div", {
                children: [o.jsx("label", {
                    style: {
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "11px",
                        display: "block",
                        marginBottom: "4px"
                    },
                    children: "Project URL"
                }), o.jsx("input", {
                    style: ro,
                    placeholder: "https://xxxxxxxx.supabase.co",
                    value: T,
                    onChange: B => A(B.target.value)
                })]
            }), o.jsxs("div", {
                children: [o.jsxs("label", {
                    style: {
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "11px",
                        display: "block",
                        marginBottom: "4px"
                    },
                    children: ["anon public key ", o.jsx("span", {
                        style: {
                            color: "rgba(255,180,0,0.80)",
                            fontSize: "10px"
                        },
                        children: DDBTR("(service key 아님)")
                    })]
                }), o.jsx("input", {
                    style: ET,
                    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    value: H,
                    onChange: B => {
                        const W = B.target.value;
                        F(W), _T(W) ? K(DDBTR("⚠ service_role 키입니다. anon 키를 입력하세요.")) : K("")
                    }
                }), R && o.jsxs("p", {
                    style: {
                        color: "rgba(255,80,80,0.90)",
                        fontSize: "11px",
                        marginTop: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                    },
                    children: [o.jsx(Ec, {
                        size: 11
                    }), " ", R]
                })]
            }), _ && o.jsx("p", {
                style: {
                    color: "rgba(255,80,80,0.90)",
                    fontSize: "12px"
                },
                children: _
            }), o.jsx("button", {
                style: {
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: !T.startsWith("https://") || H.length < 20 || R ? "rgba(59,130,246,0.35)" : "rgb(59,130,246)",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "none"
                },
                disabled: !T.startsWith("https://") || H.length < 20 || !!R,
                onClick: () => {
                    try {
                        YS(T, H), k(""), d("auth")
                    } catch {
                        k(DDBTR("잘못된 키 형식입니다"))
                    }
                },
                children: DDBTR("저장하고 로그인")
            }), o.jsxs("p", {
                style: {
                    textAlign: "center",
                    color: "rgba(255,255,255,0.30)",
                    fontSize: "10px"
                },
                children: [o.jsx("a", {
                    style: {
                        textDecoration: "underline",
                        cursor: "pointer"
                    },
                    onClick: () => {
                        var B;
                        return (B = window.open) == null ? void 0 : B.call(window, "https://supabase.com/dashboard", "_blank")
                    },
                    children: "supabase.com"
                }), " ", DDBTR("에서 무료 계정 생성 후 키를 복사하세요")]
            })]
        }),
        Y = o.jsxs("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            },
            children: [o.jsx("div", {
                style: {
                    display: "flex",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.18)"
                },
                children: ["login", "register"].map(B => o.jsx("button", {
                    style: {
                        flex: 1,
                        padding: "6px 0",
                        fontSize: "13px",
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: f === B ? "rgb(59,130,246)" : "transparent",
                        color: f === B ? "white" : "rgba(255,255,255,0.50)"
                    },
                    onClick: () => {
                        x(B), k(""), b("")
                    },
                    children: B === "login" ? DDBTR("로그인") : DDBTR("회원가입")
                }, B))
            }), o.jsxs("p", {
                style: {
                    color: "rgba(255,200,80,0.80)",
                    fontSize: "11px",
                    margin: 0
                },
                children: [o.jsx(iT, {
                    size: 11,
                    style: {
                        display: "inline",
                        marginRight: "3px",
                        verticalAlign: "middle"
                    }
                }), DDBTR("이메일 + "), o.jsx("strong", {
                    children: DDBTR("비밀번호")
                }), DDBTR(" 입력 (API key 아님)")]
            }), o.jsx("input", {
                style: ro,
                type: "email",
                placeholder: DDBTR("이메일"),
                value: p,
                onChange: B => {
                    m(B.target.value), k(""), localStorage.getItem("saved_email_opt") === "1" && localStorage.setItem("saved_email", B.target.value)
                }
            }), o.jsxs("label", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    marginTop: "-2px"
                },
                children: [o.jsx("input", {
                    type: "checkbox",
                    defaultChecked: localStorage.getItem("saved_email_opt") === "1",
                    onChange: B => {
                        localStorage.setItem("saved_email_opt", B.target.checked ? "1" : "0"), B.target.checked ? localStorage.setItem("saved_email", p) : localStorage.removeItem("saved_email")
                    }
                }), DDBTR("아이디(이메일) 저장")]
            }), o.jsx("input", {
                style: ro,
                type: "password",
                placeholder: DDBTR("비밀번호 (6자 이상)"),
                value: y,
                onChange: B => {
                    w(B.target.value), k("")
                },
                onKeyDown: B => {
                    B.key === "Enter" && f === "login" && ce()
                }
            }), f === "register" && o.jsx("input", {
                style: ro,
                type: "password",
                placeholder: DDBTR("비밀번호 확인"),
                value: v,
                onChange: B => {
                    g(B.target.value), k("")
                },
                onKeyDown: B => {
                    B.key === "Enter" && ce()
                }
            }), f === "register" && DDB_EMBEDDED() && o.jsx("input", {
                style: ro,
                type: "text",
                placeholder: DDBTR("라이선스 키 (구매 시 전달)"),
                value: Lk,
                onChange: B => {
                    Lq(B.target.value), k("")
                },
                onKeyDown: B => {
                    B.key === "Enter" && ce()
                }
            }), _ && o.jsxs("p", {
                style: {
                    color: "rgba(255,80,80,0.90)",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                },
                children: [o.jsx(Ec, {
                    size: 12
                }), _]
            }), E && o.jsxs("p", {
                style: {
                    color: "rgba(80,220,80,0.90)",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                },
                children: [o.jsx(ad, {
                    size: 12
                }), E]
            }), o.jsxs("label", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.65)",
                    cursor: "pointer"
                },
                children: [o.jsx("input", {
                    type: "checkbox",
                    defaultChecked: ddbAutoLoginOn(),
                    onChange: B => localStorage.setItem("auto_login_v1", B.target.checked ? "1" : "0")
                }), DDBTR("자동 로그인 (다음 실행 시 자동으로 로그인)")]
            }), o.jsxs("button", {
                style: {
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: n ? "rgba(59,130,246,0.40)" : "rgb(59,130,246)",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                },
                disabled: n,
                onClick: ce,
                children: [n ? o.jsx(Sc, {
                    size: 14,
                    style: {
                        animation: "spin 1s linear infinite"
                    }
                }) : f === "login" ? o.jsx(uT, {
                    size: 14
                }) : o.jsx(bT, {
                    size: 14
                }), n ? DDBTR("처리 중...") : f === "login" ? DDBTR("로그인") : DDBTR("회원가입")]
            }), o.jsx("button", {
                style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.30)",
                    fontSize: "11px",
                    textDecoration: "underline",
                    padding: "0"
                },
                onClick: () => {
                    nm(), d("setup"), k("")
                },
                children: DDB_EMBEDDED() ? "" : DDBTR("Supabase 설정 변경")
            })]
        }),
        M = {
            idle: o.jsx(gw, {
                size: 14,
                style: {
                    color: "rgba(255,255,255,0.40)"
                }
            }),
            syncing: o.jsx(Sc, {
                size: 14,
                style: {
                    color: "rgb(96,165,250)",
                    animation: "spin 1s linear infinite"
                }
            }),
            synced: o.jsx(ad, {
                size: 14,
                style: {
                    color: "rgb(74,222,128)"
                }
            }),
            error: o.jsx(Ec, {
                size: 14,
                style: {
                    color: "rgb(248,113,113)"
                }
            })
        } [s],
        X = o.jsxs("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            },
            children: [o.jsxs("div", {
                style: {
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                },
                children: [o.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    },
                    children: [o.jsx("div", {
                        style: {
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "rgb(59,130,246)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "14px",
                            flexShrink: 0
                        },
                        children: ((U = (q = r == null ? void 0 : r.email) == null ? void 0 : q[0]) == null ? void 0 : U.toUpperCase()) ?? "?"
                    }), o.jsxs("div", {
                        style: {
                            overflow: "hidden"
                        },
                        children: [o.jsx("p", {
                            style: {
                                color: "white",
                                fontSize: "13px",
                                fontWeight: 500,
                                margin: 0,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxWidth: "180px"
                            },
                            children: r == null ? void 0 : r.email
                        }), o.jsx("p", {
                            style: {
                                color: "rgba(255,255,255,0.40)",
                                fontSize: "10px",
                                margin: 0
                            },
                            children: DDBTR("로그인됨")
                        })]
                    })]
                }), o.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.50)"
                    },
                    children: [M, o.jsx("span", {
                        children: s === "syncing" ? DDBTR("동기화 중...") : s === "synced" ? `${DDBTR("마지막 동기화")}: ${a}` : s === "error" ? DDBTR("동기화 오류") : DDBTR("대기 중")
                    })]
                })]
            }), o.jsxs("label", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.65)",
                    cursor: "pointer"
                },
                children: [o.jsx("input", {
                    type: "checkbox",
                    defaultChecked: ddbAutoLoginOn(),
                    onChange: B => localStorage.setItem("auto_login_v1", B.target.checked ? "1" : "0")
                }), DDBTR("자동 로그인 (끄면 다음 실행 때 로그아웃 상태로 시작)")]
            }), o.jsxs("button", {
                style: {
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.80)",
                    fontSize: "13px",
                    cursor: "pointer",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                },
                onClick: () => {
                    u()
                },
                disabled: s === "syncing",
                children: [o.jsx(Sc, {
                    size: 14
                }), " "+DDBTR("지금 동기화")]
            }), o.jsxs("button", {
                style: {
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.50)",
                    fontSize: "13px",
                    cursor: "pointer",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                },
                onClick: () => {
                    DDB_EMBEDDED() || (nm(), d("setup"))
                },
                children: [DDB_EMBEDDED() ? null : o.jsx(bw, {
                    size: 14
                }), DDB_EMBEDDED() ? "" : " "+DDBTR("Supabase 설정 변경")]
            }), o.jsxs("button", {
                style: {
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(239,68,68,0.12)",
                    color: "rgb(248,113,113)",
                    fontSize: "13px",
                    cursor: "pointer",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                },
                onClick: async () => {
                    await c(), t()
                },
                children: [o.jsx(yw, {
                    size: 14
                }), " "+DDBTR("로그아웃")]
            })]
        });
    async function ce() {
        if (!p || !y) {
            k(DDBTR("이메일과 비밀번호를 입력하세요"));
            return
        }
        if (f === "register" && y !== v) {
            k(DDBTR("비밀번호가 일치하지 않습니다"));
            return
        }
        if (f === "register" && y.length < 6) {
            k(DDBTR("비밀번호는 6자 이상이어야 합니다"));
            return
        }
        if (f === "register" && DDB_EMBEDDED() && !Lk.trim()) {
            k(DDBTR("라이선스 키를 입력하세요 (구매 시 전달됩니다)"));
            return
        }
        const W = await (f === "login" ? i(p, y) : l(p, y, Lk.trim()));
        if (W) {
            const te = W.includes("Invalid login") ? DDBTR("이메일 또는 비밀번호가 틀렸습니다") : W.includes("already registered") ? DDBTR("이미 등록된 이메일입니다") : W.includes("confirm") ? DDBTR("이메일 인증이 필요합니다. 메일함을 확인하세요") : W.includes("Forbidden") || W.includes("secret") ? DDBTR("Supabase 설정의 anon 키를 확인하세요 (service key 사용 불가)") : W;
            k(te)
        } else f === "register" && b(DDBTR("가입 완료! 이메일 인증 후 로그인하세요."))
    }
    const j = {
        setup: DDBTR("☁ 클라우드 동기화 설정"),
        auth: DDBTR("☁ 클라우드 로그인"),
        account: DDBTR("☁ 동기화 상태")
    };
    return Rr.createPortal(o.jsxs(o.Fragment, {
        children: [o.jsx("div", {
            className: "fixed inset-0 z-[9990]",
            onClick: t
        }), o.jsxs("div", {
            ref: se,
            className: "fixed z-[9999] rounded-2xl shadow-2xl w-80",
            style: {
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "#111827",
                border: "1px solid rgba(255,255,255,0.18)"
            },
            children: [o.jsxs("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.10)",
                    cursor: "move",
                    userSelect: "none"
                },
                onMouseDown: G,
                children: [o.jsx("span", {
                    style: {
                        color: "rgba(255,255,255,0.80)",
                        fontSize: "13px",
                        fontWeight: 500
                    },
                    children: j[h]
                }), o.jsx("button", {
                    style: {
                        color: "rgba(255,255,255,0.40)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center"
                    },
                    onMouseOver: B => B.currentTarget.style.backgroundColor = "rgba(255,255,255,0.10)",
                    onMouseOut: B => B.currentTarget.style.backgroundColor = "transparent",
                    onClick: t,
                    children: o.jsx(Zt, {
                        size: 14
                    })
                })]
            }), o.jsx("div", {
                style: {
                    padding: "16px"
                },
                children: h === "setup" ? re : h === "auth" ? Y : X
            })]
        })]
    }), document.body)
}

function TT({
    onClick: e
}) {
    var i;
    const {
        user: t,
        syncStatus: r
    } = pw(), n = Af(), s = n ? t ? r === "syncing" ? o.jsx(Sc, {
        size: 15,
        className: "text-blue-400 animate-spin"
    }) : r === "error" ? o.jsx(Ec, {
        size: 15,
        className: "text-red-400"
    }) : o.jsx(ad, {
        size: 15,
        className: "text-green-400"
    }) : o.jsx(gw, {
        size: 15,
        className: "text-white/70"
    }) : o.jsx(rT, {
        size: 15,
        className: "text-white/60"
    }), a = n ? t ? r === "synced" ? DDBTR("동기화됨") : r === "syncing" ? DDBTR("동기화 중") : r === "error" ? DDBTR("동기화 오류") : DDBTR("대기 중") : DDBTR("로그인 필요") : DDBTR("Supabase 미설정");
    return o.jsxs("button", {
        title: a,
        onClick: e,
        className: "flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white/80 hover:bg-white/20 transition-colors whitespace-nowrap",
        children: [s, o.jsx("span", {
            className: "hidden md:inline",
            children: t ? (i = t.email) == null ? void 0 : i.split("@")[0] : DDBTR("동기화")
        })]
    })
}

function Ft(e = 8) {
    return Math.random().toString(36).slice(2, 2 + e)
}
const NT = ["#f48fb1", "#ef5350", "#ff9800", "#ffd54f", "#66bb6a", "#42a5f5", "#ab47bc", "#80cbc4"];

function CT(e) {
    return {
        title: e.split(`
`)[0]
    }
}

function AT() {
    const {
        state: e,
        dispatch: t
    } = vt(), r = (e.todos ?? []).slice().sort((F, R) => F.order - R.order), n = e.settings.todoCols ?? {
        showOrder: !1,
        showCompletedAt: !1,
        showCreatedAt: !1
    }, [s, a] = O.useState(!1), [i, l] = O.useState(""), [c, u] = O.useState("#42a5f5"), [h, d] = O.useState(!1), [f, x] = O.useState(null), [p, m] = O.useState(""), [y, w] = O.useState(null), v = O.useRef(null), g = n.hideCompleted ? r.filter(F => !F.completedAt) : r, _ = r.filter(F => !F.completedAt);

    function k() {
        const F = i.trim();
        if (!F) return;
        const R = {
            id: Ft(),
            content: F,
            color: c,
            createdAt: new Date().toISOString(),
            completedAt: null,
            order: r.length
        };
        t({
            type: "ADD_TODO",
            todo: R
        }), l("")
    }

    function E(F) {
        t({
            type: "UPDATE_TODO",
            todo: {
                ...F,
                content: p
            }
        }), x(null)
    }

    function b(F) {
        v.current = F
    }

    function T(F, R) {
        F.preventDefault(), w(R)
    }

    function A(F) {
        if (w(null), !v.current || v.current === F) return;
        const R = r.map(z => z.id),
            K = R.indexOf(v.current),
            se = R.indexOf(F);
        R.splice(K, 1), R.splice(se, 0, v.current), t({
            type: "REORDER_TODO",
            ids: R
        }), v.current = null
    }

    function H(F) {
        t({
            type: "UPDATE_SETTINGS",
            settings: {
                todoCols: {
                    ...n,
                    [F]: !n[F]
                }
            }
        })
    }
    return o.jsxs("div", {
        className: "flex flex-col h-full overflow-hidden min-h-0 text-xs",
        children: [o.jsxs("div", {
            className: "flex items-center justify-between px-3 py-1.5 border-b border-white/10 flex-shrink-0 bg-white/3",
            children: [o.jsxs("span", {
                className: "text-white/50",
                children: [DDBTR("미완료")+" ", o.jsx("span", {
                    className: "text-blue-300 font-semibold",
                    children: _.length
                }), "개"]
            }), o.jsx("button", {
                onClick: () => a(F => !F),
                className: `p-1 rounded transition-colors ${s?"bg-white/20 text-white":"text-white/40 hover:text-white/80"}`,
                children: o.jsx(bw, {
                    size: 13
                })
            })]
        }), s && o.jsxs("div", {
            className: "px-3 py-2 border-b border-white/10 bg-white/5 flex-shrink-0",
            children: [o.jsx("p", {
                className: "text-white/50 mb-2 text-[10px]",
                children: DDBTR("표시 설정")
            }), o.jsx("div", {
                className: "flex gap-2 flex-wrap",
                children: [
                    ["showOrder", "순서번호"],
                    ["showCreatedAt", "생성 시각"],
                    ["showCompletedAt", DDBTR("완료 시각")],
                    ["hideCompleted", DDBTR("완료 숨기기")]
                ].map(([F, R]) => o.jsx("button", {
                    onClick: () => H(F),
                    className: `px-2 py-0.5 rounded-full border text-[10px] transition-colors ${n[F]?"bg-blue-500/30 border-blue-400/60 text-blue-200":"border-white/20 text-white/40"}`,
                    children: R
                }, F))
            })]
        }), o.jsxs("div", {
            className: "px-3 py-2 border-b border-white/10 flex-shrink-0 relative",
            children: [h && o.jsxs("div", {
                className: "absolute bottom-full left-0 mb-1 px-2.5 py-2 bg-gray-900 border border-white/25 rounded-lg flex gap-1.5 flex-wrap shadow-2xl z-50",
                style: {
                    minWidth: 196
                },
                children: [NT.map(F => o.jsx("button", {
                    onClick: () => {
                        u(F), d(!1)
                    },
                    className: "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 " + (c === F ? "border-white scale-110" : "border-transparent"),
                    style: {
                        backgroundColor: F
                    }
                }, F)), o.jsx("input", {
                    type: "color",
                    value: c,
                    onChange: F => u(F.target.value),
                    className: "w-6 h-6 cursor-pointer rounded border-0 bg-transparent",
                    title: DDBTR("커스텀 색상")
                })]
            }), o.jsxs("div", {
                className: "flex items-center gap-2",
                children: [o.jsx("button", {
                    className: "w-5 h-5 rounded-full border-2 border-white/40 flex-shrink-0 transition-transform hover:scale-110",
                    style: {
                        backgroundColor: c
                    },
                    onClick: () => d(F => !F),
                    title: DDBTR("색상 선택")
                }), o.jsx("input", {
                    value: i,
                    onChange: F => l(F.target.value),
                    onKeyDown: F => {
                        F.key === "Enter" && (F.preventDefault(), k())
                    },
                    placeholder: DDBTR("할 일 입력 후 Enter"),
                    className: "flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white/80 placeholder-white/25 focus:outline-none focus:border-blue-400/40 min-w-0",
                    style: {
                        fontSize: 11
                    }
                }), o.jsx("button", {
                    onClick: k,
                    disabled: !i.trim(),
                    className: "px-2.5 py-1.5 bg-blue-500/80 hover:bg-blue-500 rounded-lg text-white disabled:opacity-30 transition-colors flex-shrink-0",
                    children: o.jsx(Vr, {
                        size: 13
                    })
                })]
            })]
        }), o.jsxs("div", {
            className: "flex-1 overflow-y-auto thin-scroll px-2 py-1 min-h-0",
            children: [g.map((F, R) => {
                const {
                    title: K
                } = CT(F.content), se = !!F.completedAt, z = f === F.id;
                return o.jsxs("div", {
                    draggable: !0,
                    onDragStart: () => b(F.id),
                    onDragOver: G => T(G, F.id),
                    onDrop: () => A(F.id),
                    onDragEnd: () => w(null),
                    className: "flex items-center gap-1 px-1.5 py-1 rounded-lg mb-0.5 border transition-all " + (y === F.id ? "border-blue-400/60 bg-blue-500/10 " : se ? "border-white/5 bg-white/2 " : "border-white/8 bg-white/3 hover:bg-white/7 "),
                    style: {
                        opacity: se ? .45 : 1
                    },
                    children: [o.jsx("div", {
                        className: "cursor-grab text-white/20 hover:text-white/50 flex-shrink-0",
                        children: o.jsx(ww, {
                            size: 10
                        })
                    }), n.showOrder && o.jsxs("span", {
                        className: "text-white/25 text-[9px] flex-shrink-0",
                        children: ["#", R + 1]
                    }), o.jsx("button", {
                        onClick: () => t({
                            type: "TOGGLE_TODO",
                            id: F.id
                        }),
                        className: "flex-shrink-0",
                        style: {
                            color: F.color
                        },
                        children: se ? o.jsx(rl, {
                            size: 12
                        }) : o.jsx(Rf, {
                            size: 12
                        })
                    }), z ? o.jsx("input", {
                        autoFocus: !0,
                        value: p,
                        onChange: G => m(G.target.value),
                        onBlur: () => E(F),
                        onKeyDown: G => {
                            G.key === "Escape" && x(null), G.key === "Enter" && E(F)
                        },
                        className: "flex-1 bg-transparent text-white/90 focus:outline-none min-w-0",
                        style: {
                            fontSize: 11
                        }
                    }) : o.jsx("span", {
                        onDoubleClick: () => {
                            x(F.id), m(F.content)
                        },
                        className: "flex-1 truncate cursor-text min-w-0 " + (se ? "line-through text-white/40" : "font-semibold"),
                        style: {
                            color: se ? void 0 : F.color,
                            fontSize: 11
                        },
                        children: K
                    }), n.showCreatedAt && !z && o.jsx("span", {
                        className: "text-white/20 text-[9px] flex-shrink-0 ml-1",
                        children: (() => {
                            const G = new Date(F.createdAt);
                            return `${String(G.getMonth()+1).padStart(2,"0")}.${String(G.getDate()).padStart(2,"0")}`
                        })()
                    }), n.showCompletedAt && se && !z && o.jsx("span", {
                        className: "text-green-400/50 text-[9px] flex-shrink-0 ml-1",
                        children: F.completedAt ? (() => {
                            const G = new Date(F.completedAt);
                            return `${String(G.getMonth()+1).padStart(2,"0")}.${String(G.getDate()).padStart(2,"0")}`
                        })() : ""
                    }), o.jsx("button", {
                        onClick: () => t({
                            type: "DELETE_TODO",
                            id: F.id
                        }),
                        className: "text-white/20 hover:text-red-300 flex-shrink-0",
                        children: o.jsx(Gr, {
                            size: 10
                        })
                    })]
                }, F.id)
            }), r.some(F => F.completedAt) && !n.hideCompleted && o.jsx("button", {
                onClick: () => r.filter(F => F.completedAt).forEach(F => t({
                    type: "DELETE_TODO",
                    id: F.id
                })),
                className: "w-full py-1 mt-1 text-white/20 hover:text-white/50 hover:bg-white/5 rounded text-[10px] transition-colors",
                children: DDBTR("완료 항목 삭제")
            })]
        })]
    })
}

function cm(e) {
    if (!e) return "—";
    const t = new Date(e),
        r = String(t.getMonth() + 1).padStart(2, "0"),
        n = String(t.getDate()).padStart(2, "0"),
        s = String(t.getHours()).padStart(2, "0"),
        a = String(t.getMinutes()).padStart(2, "0");
    return `${r}.${n} ${s}:${a}`
}

function jT() {
    const {
        state: e,
        dispatch: t
    } = vt(), r = (e.todos ?? []).slice().sort((u, h) => u.order - h.order), [n, s] = O.useState("all"), a = r.filter(u => !u.completedAt), i = r.filter(u => u.completedAt), l = n === "all" ? r : n === "incomplete" ? a : i, c = r.length > 0 ? Math.round(i.length / r.length * 100) : 0;
    return o.jsxs("div", {
        className: "flex flex-col h-full overflow-hidden min-h-0 text-xs",
        children: [o.jsxs("div", {
            className: "px-3 py-2 border-b border-white/10 flex-shrink-0 bg-white/3",
            children: [o.jsxs("div", {
                className: "flex items-center gap-3 mb-1.5",
                children: [o.jsxs("span", {
                    className: "text-white/50",
                    children: [DDBTR("전체")+" ", o.jsx("span", {
                        className: "text-white/80 font-semibold",
                        children: r.length
                    })]
                }), o.jsxs("span", {
                    className: "text-blue-300",
                    children: [DDBTR("미완료")+" ", o.jsx("span", {
                        className: "font-semibold",
                        children: a.length
                    })]
                }), o.jsxs("span", {
                    className: "text-green-300",
                    children: [DDBTR("완료")+" ", o.jsx("span", {
                        className: "font-semibold",
                        children: i.length
                    })]
                }), o.jsxs("span", {
                    className: "text-white/30 text-[10px] ml-auto",
                    children: [c, "%"]
                })]
            }), o.jsx("div", {
                className: "h-1 bg-white/10 rounded-full overflow-hidden",
                children: o.jsx("div", {
                    className: "h-full bg-green-400/70 rounded-full transition-all",
                    style: {
                        width: `${c}%`
                    }
                })
            })]
        }), o.jsx("div", {
            className: "flex border-b border-white/10 flex-shrink-0",
            children: [
                ["all", DDBTR("전체"), r.length],
                ["incomplete", DDBTR("미완료"), a.length],
                ["complete", DDBTR("완료"), i.length]
            ].map(([u, h, d]) => o.jsxs("button", {
                onClick: () => s(u),
                className: "flex-1 py-1.5 text-[11px] transition-colors " + (n === u ? "text-blue-300 border-b-2 border-blue-400 -mb-px" : "text-white/40 hover:text-white/70"),
                children: [h, d > 0 && o.jsx("span", {
                    className: `ml-1 text-[9px] ${n===u?"text-blue-300/70":"text-white/25"}`,
                    children: d
                })]
            }, u))
        }), o.jsxs("div", {
            className: "flex-1 overflow-y-auto thin-scroll min-h-0",
            children: [l.length === 0 && o.jsx("p", {
                className: "text-white/20 text-center py-6",
                children: DDBTR("항목이 없습니다")
            }), o.jsx("table", {
                className: "w-full border-collapse",
                children: o.jsx("tbody", {
                    children: l.map((u, h) => {
                        const d = u.content.split(`
`)[0],
                            f = !!u.completedAt;
                        return o.jsxs("tr", {
                            className: "border-b border-white/5 transition-colors " + (f ? "opacity-50" : "hover:bg-white/5"),
                            children: [o.jsx("td", {
                                className: "pl-3 pr-1 py-1.5 text-white/30 text-[10px] w-7 text-right select-none",
                                children: h + 1
                            }), o.jsx("td", {
                                className: "px-1 py-1.5 w-4",
                                children: o.jsx("span", {
                                    className: "w-2 h-2 rounded-full inline-block flex-shrink-0",
                                    style: {
                                        backgroundColor: u.color
                                    }
                                })
                            }), o.jsx("td", {
                                className: "px-1 py-1.5 w-5",
                                children: o.jsx("button", {
                                    onClick: () => t({
                                        type: "TOGGLE_TODO",
                                        id: u.id
                                    }),
                                    style: {
                                        color: u.color
                                    },
                                    children: f ? o.jsx(rl, {
                                        size: 13
                                    }) : o.jsx(Rf, {
                                        size: 13
                                    })
                                })
                            }), o.jsx("td", {
                                className: "px-1 py-1.5 max-w-0",
                                children: o.jsx("span", {
                                    className: "block truncate " + (f ? "line-through text-white/40" : "text-white/85"),
                                    style: {
                                        fontSize: 11
                                    },
                                    children: d
                                })
                            }), o.jsx("td", {
                                className: "px-2 py-1.5 text-white/25 text-[9px] whitespace-nowrap",
                                children: cm(f ? u.completedAt : u.createdAt)
                            }), o.jsx("td", {
                                className: "pr-2 py-1.5 w-6",
                                children: o.jsx("button", {
                                    onClick: () => t({
                                        type: "DELETE_TODO",
                                        id: u.id
                                    }),
                                    className: "text-white/15 hover:text-red-300 transition-colors",
                                    children: o.jsx(Gr, {
                                        size: 10
                                    })
                                })
                            })]
                        }, u.id)
                    })
                })
            }), n !== "incomplete" && i.length > 0 && o.jsx("button", {
                onClick: () => i.forEach(u => t({
                    type: "DELETE_TODO",
                    id: u.id
                })),
                className: "w-full py-1.5 mt-1 text-white/25 hover:text-white/50 hover:bg-white/5 text-[10px] transition-colors",
                children: DDBTR("완료 항목 전체 삭제")
            })]
        })]
    })
}

function um({
    onSearch: e,
    onSettings: t,
    onLedger: r,
    onBankImport: n,
    onAuth: s
}) {
    const {
        state: a,
        setFontSize: i,
        dispatch: l
    } = vt(), [c, u] = O.useState(!1), h = O.useRef(null);

    function d(k, E, b) {
        const T = a.panels.find(A => A.type === k);
        l(T ? {
            type: "REMOVE_PANEL",
            id: T.id
        } : {
            type: "ADD_PANEL",
            panel: {
                id: `panel-${k}-${Ft()}`,
                type: k,
                slot: "float",
                order: 0,
                floatX: 200,
                floatY: 100,
                floatW: E,
                floatH: b,
                minimized: !1,
                zIndex: a.topZIndex + 1
            }
        })
    }

    function f() {
        const k = JSON.stringify({ ...a, _ps: JSON.parse(localStorage.getItem("player-songs") ?? "[]"), _fb: localStorage.getItem("fortune-birth") ?? "" }, null, 2),
            E = new Blob([k], {
                type: "application/json"
            }),
            b = URL.createObjectURL(E),
            T = document.createElement("a");
        T.href = b, T.download = `doodle-day-buddy-backup-${new Date().toISOString().slice(0,10)}.json`, T.click(), URL.revokeObjectURL(b)
    }

    function fICSExp() {
        const evs = a.events || [];
        if (!evs.length) { alert(DDBTR("내보낼 일정이 없습니다.")); return }
        const ics = ddbEventsToICS(evs),
            blob = new Blob(["﻿" + ics], { type: "text/calendar;charset=utf-8" }),
            url = URL.createObjectURL(blob),
            A2 = document.createElement("a");
        A2.href = url, A2.download = `MomentPlan-${new Date().toISOString().slice(0,10)}.ics`, A2.click(), URL.revokeObjectURL(url)
    }

    function fICSImp() {
        const inp = document.createElement("input");
        inp.type = "file", inp.accept = ".ics,text/calendar";
        inp.onchange = () => {
            const F = inp.files && inp.files[0];
            if (!F) return;
            const r = new FileReader;
            r.onload = A2 => {
                try {
                    const evs = ddbICSToEvents((A2.target || {}).result);
                    const ex = a.events || [],
                        seen = new Set(ex.map(x => x.date + "|" + (x.title || "")));
                    const addList = []; let dup = 0;
                    for (const ev of evs) {
                        const key = ev.date + "|" + (ev.title || "");
                        if (seen.has(key)) { dup++; continue }
                        seen.add(key), addList.push(ev)
                    }
                    if (addList.length) l({ type: "BATCH_ADD_EVENTS", events: addList });
                    alert(addList.length + DDBTR("개 일정을 가져왔습니다.") + (dup ? " (" + dup + DDBTR("개 중복 제외") + ")" : ""))
                } catch (err) { alert(DDBTR("올바른 일정 파일(.ics)이 아닙니다.")) }
            }, r.readAsText(F)
        }, inp.click()
    }

    function x(k) {
        var T;
        const E = (T = k.target.files) == null ? void 0 : T[0];
        if (!E) return;
        const b = new FileReader;
        b.onload = A => {
            var H;
            try {
                const F = JSON.parse((H = A.target) == null ? void 0 : H.result);
                F._ps && localStorage.setItem("player-songs", JSON.stringify(F._ps)), F._fb != null && localStorage.setItem("fortune-birth", F._fb), Hv(F), localStorage.setItem("restore_once_v1", "1"), window.location.reload()
            } catch {
                alert("올바른 JSON 파일이 아닙니다.")
            }
        }, b.readAsText(E), k.target.value = ""
    }

    function p() {
        confirm(`모든 데이터를 초기화하시겠습니까?
(달력 일정, 메모, D-Day 등 모두 삭제됩니다)`) && (Vk(), localStorage.removeItem("player-songs"), localStorage.removeItem("fortune-birth"), localStorage.removeItem("calc-history"), (() => {
            const _ = $a();
            _ ? _.auth.signOut().finally(() => window.location.reload()) : window.location.reload()
        })())
    }
    const m = "flex items-center gap-1 px-2 py-1 rounded font-medium text-white/90 hover:bg-white/20 transition-colors whitespace-nowrap",
        y = a.panels.some(k => k.type === "calculator"),
        w = a.panels.some(k => k.type === "fortune"),
        v = a.panels.some(k => k.type === "player"),
        g = a.settings.showCalGrid ?? !0;
    const [Mo, Bo] = O.useState(!1),
        [Eo, So] = O.useState(!1),
        Io = O.useRef(null),
        Po = O.useRef(null);
    O.useEffect(() => {
        if (!Eo) return;
        const S = D => {
            D.target && D.target.closest && D.target.closest("[data-ddbnav]") || So(!1)
        };
        return document.addEventListener("mousedown", S), () => document.removeEventListener("mousedown", S)
    }, [Eo]);

    function _() {
        const k = a.panels.find(E => E.type === "calendar");
        k ? k.slot === "float" ? (l({
            type: "SET_PANEL_SLOT",
            id: k.id,
            slot: "center"
        }), l({
            type: "UPDATE_SETTINGS",
            settings: {
                showCalGrid: !0
            }
        })) : l({
            type: "UPDATE_SETTINGS",
            settings: {
                showCalGrid: !g
            }
        }) : (l({
            type: "ADD_PANEL",
            panel: {
                id: `panel-calendar-${Ft()}`,
                type: "calendar",
                slot: "center",
                order: 0,
                floatX: 80,
                floatY: 60,
                floatW: 700,
                floatH: 500,
                minimized: !1,
                zIndex: a.topZIndex + 1
            }
        }), l({
            type: "UPDATE_SETTINGS",
            settings: {
                showCalGrid: !0
            }
        }))
    }
    return o.jsxs(o.Fragment, {
        children: [o.jsx("input", {
            ref: h,
            type: "file",
            accept: ".json",
            className: "hidden",
            onChange: x
        }), o.jsxs("header", {
            className: "hidden md:flex items-center gap-1 px-3 py-1.5 bg-black/40 backdrop-blur-sm border-b border-white/10 flex-wrap",
            style: {
                fontSize: a.settings.topBtnSize ?? 12
            },
            children: [o.jsxs("button", {
                onClick: t,
                className: m,
                children: [o.jsx(om, {
                    size: 14
                }), " " + DDBTR("설정")]
            }), o.jsxs("button", {
                onClick: e,
                className: m,
                children: [o.jsx(cd, {
                    size: 14
                }), " " + DDBTR("찾기")]
            }), o.jsxs("div", {
                className: "flex items-center gap-1 bg-white/10 rounded px-2 py-1",
                children: [o.jsx("button", {
                    onClick: () => i(Math.max(8, a.fontSize - 1)),
                    className: "text-white/80 hover:text-white",
                    children: o.jsx(id, {
                        size: 12
                    })
                }), o.jsxs("span", {
                    className: "text-white/90 w-10 text-center",
                    style: { fontSize: 12 },
                    children: [a.fontSize, "pt"]
                }), o.jsx("button", {
                    onClick: () => i(Math.min(60, a.fontSize + 1)),
                    className: "text-white/80 hover:text-white",
                    children: o.jsx(Vr, {
                        size: 12
                    })
                })]
            }), o.jsx("div", {
                className: "flex-1"
            }), o.jsx("span", {
                className: "text-white/40 text-[10px] px-2 select-none font-mono",
                children: "v159"
            }), (() => {
                const S = [{
                    k: "cal",
                    icon: o.jsx(eT, { size: 14 }),
                    label: " " + DDBTR("달력"),
                    title: g ? "달력 끄기" : "달력 켜기",
                    act: _,
                    on: g
                }, {
                    k: "ledger",
                    icon: o.jsx(sm, { size: 14 }),
                    label: " " + DDBTR("가계부"),
                    title: DDBTR("가계부 열기"),
                    act: r
                }, {
                    k: "bank",
                    icon: o.jsx(im, { size: 14 }),
                    label: " " + DDBTR("계좌 가져오기"),
                    title: DDBTR("은행 거래내역 가져오기"),
                    act: n
                }, {
                    k: "calc",
                    icon: o.jsx(sd, { size: 14 }),
                    label: " " + DDBTR("계산기"),
                    title: y ? "계산기 닫기" : "계산기 열기",
                    act: () => d("calculator", 240, 420),
                    on: y
                }, {
                    k: "fortune",
                    icon: o.jsx(lm, { size: 14 }),
                    label: " " + DDBTR("운세"),
                    title: w ? "운세 닫기" : "운세 열기",
                    act: () => d("fortune", 260, 480),
                    on: w
                }, {
                    k: "player",
                    icon: o.jsx(od, { size: 14 }),
                    label: " " + DDBTR("재생바"),
                    title: v ? "재생바 닫기" : "재생바 열기",
                    act: () => d("player", 280, 500),
                    on: v
                }, {
                    k: "imp",
                    icon: o.jsx(am, { size: 14 }),
                    label: " " + DDBTR("가져오기"),
                    title: DDBTR("JSON 파일로 데이터 가져오기"),
                    act: () => {
                        var Q;
                        (Q = h.current) == null || Q.click()
                    }
                }, {
                    k: "exp",
                    icon: o.jsx(au, { size: 14 }),
                    label: " " + DDBTR("내보내기"),
                    title: DDBTR("데이터를 JSON 파일로 내보내기"),
                    act: f
                }, {
                    k: "ics-exp",
                    icon: o.jsx(au, { size: 14 }),
                    label: " " + DDBTR("일정 공유"),
                    title: DDBTR("월·날짜를 골라 이미지·표·ics로 공유"),
                    act: () => window.dispatchEvent(new CustomEvent("ddb-open-share"))
                }, {
                    k: "ics-imp",
                    icon: o.jsx(am, { size: 14 }),
                    label: " " + DDBTR("일정 받기 (.ics)"),
                    title: DDBTR(".ics 파일에서 일정 가져오기 (중복 제외)"),
                    act: fICSImp
                }, {
                    k: "team",
                    icon: o.jsx(am, { size: 14 }),
                    label: " " + DDBTR("팀 달력"),
                    title: DDBTR("회사·팀원과 일정을 공유합니다"),
                    act: () => window.dispatchEvent(new CustomEvent("ddb-team-open"))
                }, {
                    k: "logout",
                    icon: o.jsx(yw, { size: 14 }),
                    label: " " + DDBTR("로그아웃"),
                    title: DDBTR("모든 데이터 초기화"),
                    act: p,
                    danger: !0
                }],
                    D = a.settings.navOrder ?? [],
                    J = [...S].sort((Q, ee) => {
                        const Z = D.indexOf(Q.k),
                            pe = D.indexOf(ee.k);
                        return (Z === -1 ? 99 : Z) - (pe === -1 ? 99 : pe)
                    }),
                    le = (Q, ee) => {
                        const Z = J.map(pe => pe.k),
                            pe = Z.indexOf(Q);
                        Z.splice(pe, 1), Z.splice(ee, 0, Q), l({
                            type: "UPDATE_SETTINGS",
                            settings: {
                                navOrder: Z
                            }
                        })
                    };
                return o.jsxs(o.Fragment, {
                    children: [Mo && o.jsx("div", {
                        "data-ddbnav": "1",
                        className: "flex items-center gap-1 flex-wrap",
                        children: J.map((Q, ee) => o.jsxs("button", {
                            draggable: Eo,
                            onDragStart: () => {
                                Po.current = Q.k
                            },
                            onDragOver: Z => {
                                Z.preventDefault(), Po.current && Po.current !== Q.k && le(Po.current, ee)
                            },
                            onDragEnd: () => {
                                Po.current = null
                            },
                            onMouseDown: () => {
                                clearTimeout(Io.current), Io.current = setTimeout(() => So(!0), 1e3)
                            },
                            onMouseUp: () => clearTimeout(Io.current),
                            onMouseLeave: () => clearTimeout(Io.current),
                            onClick: Z => {
                                if (Eo) {
                                    Z.preventDefault();
                                    return
                                }
                                Q.act()
                            },
                            title: Eo ? DDBTR("드래그해서 순서 변경") : Q.title,
                            className: m + (Q.on ? " bg-white/20 text-white" : "") + (Q.danger ? " text-red-300 hover:bg-red-400/20" : "") + (Eo ? " ring-1 ring-amber-400/80 cursor-move" : ""),
                            children: [Q.icon, Q.label]
                        }, Q.k))
                    }), Eo && o.jsx("span", {
                        className: "text-amber-300 text-[10px] px-1 whitespace-nowrap",
                        children: DDBTR("순서 변경 중 — 빈 곳 클릭하면 종료")
                    }), o.jsxs("button", {
                        "data-ddbnav": "1",
                        onClick: () => {
                            Bo(Q => !Q), So(!1)
                        },
                        className: m + (Mo ? " bg-white/20 text-white" : ""),
                        title: Mo ? "메뉴 접기" : "메뉴 펼치기",
                        children: [o.jsx(hT, { size: 14 }), " " + DDBTR("메뉴")]
                    })]
                })
            })(), o.jsx(TT, {
                onClick: s
            })]
        }), o.jsxs("header", {
            className: "flex md:hidden items-center justify-between px-3 py-2 bg-black/50 backdrop-blur-sm border-b border-white/10",
            children: [o.jsxs("div", {
                className: "flex items-center gap-2",
                children: [o.jsx("button", {
                    onClick: t,
                    className: "text-white/80 hover:text-white",
                    children: o.jsx(om, {
                        size: 18
                    })
                }), o.jsx("button", {
                    onClick: e,
                    className: "text-white/80 hover:text-white",
                    children: o.jsx(cd, {
                        size: 18
                    })
                }), o.jsxs("div", {
                    className: "flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5",
                    children: [o.jsx("button", {
                        onClick: () => i(Math.max(8, a.fontSize - 1)),
                        className: "text-white/80",
                        children: o.jsx(id, {
                            size: 11
                        })
                    }), o.jsxs("span", {
                        className: "text-xs text-white/90 w-8 text-center",
                        children: [a.fontSize, "pt"]
                    }), o.jsx("button", {
                        onClick: () => i(Math.min(60, a.fontSize + 1)),
                        className: "text-white/80",
                        children: o.jsx(Vr, {
                            size: 11
                        })
                    })]
                })]
            }), o.jsx("button", {
                onClick: () => u(!c),
                className: "text-white/80 hover:text-white",
                children: c ? o.jsx(Zt, {
                    size: 20
                }) : o.jsx(hT, {
                    size: 20
                })
            })]
        }), c && o.jsx("div", {
            className: "md:hidden bg-black/70 backdrop-blur-md border-b border-white/10 px-4 py-3 grid grid-cols-3 gap-2",
            children: [{
                icon: o.jsx(sd, {
                    size: 14
                }),
                label: "계산기",
                action: () => {
                    d("calculator", 240, 420), u(!1)
                }
            }, {
                icon: o.jsx(lm, {
                    size: 14
                }),
                label: "운세",
                action: () => {
                    d("fortune", 260, 480), u(!1)
                }
            }, {
                icon: o.jsx(od, {
                    size: 14
                }),
                label: "재생바",
                action: () => {
                    d("player", 280, 500), u(!1)
                }
            }, {
                icon: o.jsx(am, {
                    size: 14
                }),
                label: "가져오기",
                action: () => {
                    var k;
                    (k = h.current) == null || k.click(), u(!1)
                }
            }, {
                icon: o.jsx(au, {
                    size: 14
                }),
                label: "내보내기",
                action: () => {
                    f(), u(!1)
                }
            }, {
                icon: o.jsx(sm, {
                    size: 14
                }),
                label: "가계부",
                action: () => {
                    r(), u(!1)
                }
            }, {
                icon: o.jsx(im, {
                    size: 14
                }),
                label: "계좌 가져오기",
                action: () => {
                    n(), u(!1)
                }
            }, {
                icon: o.jsx($n, {
                    size: 14
                }),
                label: "설정",
                action: () => {
                    t(), u(!1)
                }
            }].map(({
                icon: k,
                label: E,
                action: b
            }) => o.jsxs("button", {
                className: "flex items-center justify-center gap-1 px-2 py-1.5 rounded text-xs text-white/80 bg-white/10 hover:bg-white/20",
                onClick: b,
                children: [k, o.jsx("span", {
                    children: E
                })]
            }, E))
        })]
    })
}
const RT = ["#f48fb1", "#ef5350", "#42a5f5", "#66bb6a", "#ab47bc", "#ff7043", "#ffb300", "#26a69a", "#90a4ae"];

function hm({
    onTodo: e
}) {
    var re;
    const {
        state: t,
        setActiveTab: r,
        dispatch: n
    } = vt(), {
        memoTabs: s,
        activeTab: a
    } = t, [i, l] = O.useState(null), [c, u] = O.useState(""), [h, d] = O.useState(""), f = O.useRef(null), [x, p] = O.useState(!1), [m, y] = O.useState(null), [w, v] = O.useState(!1), g = O.useRef(), _ = O.useRef(null), k = O.useRef(!1), E = O.useRef(!1);

    function b(Y) {
        const M = window.innerWidth / 2,
            X = Y.clientX >= M - 25 && Y.clientX <= M + 25 && Y.clientY >= 4 && Y.clientY <= 54;
        k.current = X, v(X)
    }

    function T() {
        _.current && k.current && n({
            type: "DELETE_MEMO_TAB",
            id: _.current
        }), p(!1), y(null), v(!1), _.current = null, k.current = !1, setTimeout(() => {
            E.current = !1
        }, 50), window.removeEventListener("mousemove", b), window.removeEventListener("mouseup", T)
    }

    function A(Y) {
        clearTimeout(g.current), g.current = setTimeout(() => {
            E.current = !0, _.current = Y, p(!0), y(Y), window.addEventListener("mousemove", b), window.addEventListener("mouseup", T)
        }, 1e3)
    }

    function H() {
        clearTimeout(g.current)
    }

    function F(Y, M) {
        M.stopPropagation(), n({
            type: "DELETE_MEMO_TAB",
            id: Y
        })
    }

    function R(Y, M) {
        M.stopPropagation(), l(Y.id), u(Y.title), d(Y.color), setTimeout(() => {
            var X;
            return (X = f.current) == null ? void 0 : X.focus()
        }, 50)
    }

    function K() {
        if (!i || !c.trim()) {
            l(null);
            return
        }
        const Y = s.find(M => M.id === i);
        Y && n({
            type: "UPDATE_MEMO_TAB",
            tab: {
                ...Y,
                title: c.trim(),
                color: h
            }
        }), l(null)
    }

    function se() {
        const Y = {
            id: `memo-${Ft()}`,
            title: `메모 ${s.length}`,
            color: "#90a4ae",
            items: []
        };
        n({
            type: "ADD_MEMO_TAB",
            tab: Y
        }), r(Y.id)
    }

    function z(Y) {
        const M = t.panels.find(ce => ce.type === "memo" && ce.memoTabId === Y);
        if (M) {
            n({
                type: "BRING_FRONT",
                id: M.id
            });
            return
        }
        const X = {
            id: `panel-memo-${Ft()}`,
            type: "memo",
            memoTabId: Y,
            slot: "left",
            order: t.panels.filter(ce => ce.slot === "left").length,
            floatX: 20 + Math.random() * 60,
            floatY: 80 + Math.random() * 40,
            floatW: 220,
            floatH: 400,
            minimized: !1,
            zIndex: t.topZIndex + 1
        };
        n({
            type: "ADD_PANEL",
            panel: X
        })
    }
    const G = ((re = t.todos) == null ? void 0 : re.filter(Y => !Y.completedAt).length) ?? 0;
    return o.jsxs(o.Fragment, {
        children: [o.jsxs("nav", {
            className: "flex items-center gap-1 px-2 py-1.5 bg-black/30 backdrop-blur-sm border-b border-white/10 overflow-x-auto scrollbar-hide",
            children: [s.filter(Y => Y.id !== "calendar").map(Y => {
                const M = a === Y.id,
                    X = Y.id === "calendar";
                return i === Y.id ? o.jsxs("div", {
                    className: "flex items-center gap-1 bg-black/40 rounded-full px-2 py-0.5 border border-white/20",
                    children: [o.jsx("input", {
                        ref: f,
                        value: c,
                        onChange: j => u(j.target.value),
                        onKeyDown: j => {
                            j.key === "Enter" && K(), j.key === "Escape" && l(null)
                        },
                        className: "bg-transparent text-white text-xs w-24 focus:outline-none"
                    }), o.jsx("div", {
                        className: "flex gap-0.5",
                        children: RT.map(j => o.jsx("button", {
                            onClick: () => d(j),
                            className: "w-3.5 h-3.5 rounded-full transition-transform " + (h === j ? "scale-125 ring-1 ring-white" : ""),
                            style: {
                                backgroundColor: j
                            }
                        }, j))
                    }), o.jsx("button", {
                        onClick: K,
                        className: "text-green-400 hover:text-green-300",
                        children: o.jsx(su, {
                            size: 12
                        })
                    }), o.jsx("button", {
                        onClick: () => l(null),
                        className: "text-white/40 hover:text-white",
                        children: o.jsx(Zt, {
                            size: 12
                        })
                    })]
                }, Y.id) : o.jsxs("div", {
                    className: "group relative flex items-center flex-shrink-0",
                    children: [o.jsxs("button", {
                        onClick: () => {
                            E.current || (r(Y.id), z(Y.id))
                        },
                        onMouseDown: () => {
                            X || A(Y.id)
                        },
                        onMouseUp: H,
                        onMouseLeave: H,
                        className: "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all select-none " + (M ? "text-white shadow-lg scale-105" : "text-white/70 hover:text-white hover:bg-white/15"),
                        style: M ? {
                            backgroundColor: Y.color,
                            boxShadow: `0 2px 8px ${Y.color}88`
                        } : {},
                        children: [X && o.jsx(tT, {
                            size: 11
                        }), o.jsx("span", {
                            className: "w-2 h-2 rounded-full",
                            style: {
                                backgroundColor: M ? "white" : Y.color
                            }
                        }), Y.title]
                    }), !X && o.jsxs("div", {
                        className: "hidden group-hover:flex items-center absolute -top-0.5 -right-0.5 gap-0.5",
                        children: [o.jsx("button", {
                            onClick: j => R(Y, j),
                            className: "bg-black/60 rounded-full p-0.5 text-white/60 hover:text-white",
                            children: o.jsx(fT, {
                                size: 9
                            })
                        }), o.jsx("button", {
                            onClick: () => z(Y.id),
                            className: "bg-black/60 rounded-full p-0.5 text-white/60 hover:text-white",
                            title: DDBTR("창 열기"),
                            children: o.jsx(Vr, {
                                size: 9
                            })
                        }), o.jsx("button", {
                            onClick: j => F(Y.id, j),
                            className: "bg-black/60 rounded-full p-0.5 text-white/60 hover:text-red-400",
                            title: DDBTR("탭 삭제"),
                            children: o.jsx(Zt, {
                                size: 9
                            })
                        })]
                    })]
                }, Y.id)
            }), o.jsxs("button", {
                onClick: se,
                className: "flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors",
                children: [o.jsx(Vr, {
                    size: 11
                }), " "+DDBTR("탭 추가")]
            }), o.jsxs("button", {
                onClick: e,
                title: "to do list",
                className: "flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-white/70 hover:text-white hover:bg-blue-500/20 transition-colors border border-white/15 hover:border-blue-400/40",
                children: [o.jsx(rl, {
                    size: 13,
                    className: "text-blue-400"
                }), o.jsx("span", {
                    children: DDBTR("할 일")
                }), G > 0 && o.jsx("span", {
                    className: "bg-blue-500 text-white text-[9px] rounded-full px-1 min-w-[14px] text-center leading-[14px]",
                    children: G
                })]
            }), t.settings.weather && t.settings.weather.on && t.settings.weather.pos === "top" && o.jsxs(o.Fragment, {
                children: [o.jsx("div", { className: "flex-1 min-w-[8px]" }), o.jsx("div", {
                    className: "flex-shrink-0 max-w-[52%]",
                    children: o.jsx(WX, { country: t.settings.weather.country || "kr", city: t.settings.weather.city || "seoul", compact: !0 })
                })]
            })]
        }), x && Rr.createPortal(o.jsx("div", {
            style: {
                position: "fixed",
                top: 8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 50,
                height: 50,
                zIndex: 9999,
                pointerEvents: "none"
            },
            className: "flex items-center justify-center rounded-2xl border-2 transition-all duration-150 " + (w ? "bg-red-500 border-red-300 scale-125 shadow-[0_0_20px_rgba(239,68,68,0.7)]" : "bg-gray-900/90 border-red-400/60"),
            children: o.jsx(Gr, {
                size: 22,
                className: w ? "text-white" : "text-red-400/80"
            })
        }), document.body)]
    })
}
const kw = ["결제", "소비", "이체", "수입", "저축", "기타"],
    iu = [{
        minDays: 15,
        emoji: "❕",
        color: "#ff3b30"
    }, {
        minDays: 8,
        emoji: "❕",
        color: "#ff9500"
    }, {
        minDays: 4,
        emoji: "❕",
        color: "#ffd93d"
    }, {
        minDays: 1,
        emoji: "❕",
        color: "#6bcb77"
    }];

function ud(e) {
    const [t, r, n] = e.split("-").map(Number);
    return new Date(t, r - 1, n)
}

function _w(e) {
    const t = e.getFullYear(),
        r = String(e.getMonth() + 1).padStart(2, "0"),
        n = String(e.getDate()).padStart(2, "0");
    return `${t}-${r}-${n}`
}

function hd(e) {
    const t = new Date;
    t.setHours(0, 0, 0, 0);
    const r = ud(e);
    return r.setHours(0, 0, 0, 0), Math.round((r.getTime() - t.getTime()) / 864e5)
}

function dd(e, t) {
    return new Date(e, t, 0).getDate()
}

function OT(e, t) {
    return new Date(e, t - 1, 1).getDay()
}

function Df(e, t, r) {
    return r ? e >= t && e <= r : e === t
}

function Ff(e, t, r) {
    if (t < e || r.endDate && t > r.endDate) return !1;
    const n = ud(e),
        s = ud(t),
        a = Math.round((s.getTime() - n.getTime()) / 864e5);
    switch (r.type) {
        case "daily":
            return a % r.interval === 0;
        case "weekly":
            return a % (7 * r.interval) === 0;
        case "monthly":
            return ((s.getFullYear() - n.getFullYear()) * 12 + (s.getMonth() - n.getMonth())) % r.interval === 0 && s.getDate() === n.getDate();
        case "yearly":
            return (s.getFullYear() - n.getFullYear()) % r.interval === 0 && s.getMonth() === n.getMonth() && s.getDate() === n.getDate();
        default:
            return !1
    }
}
const qt = {
        pink: "#f48fb1",
        green: "#4caf50",
        blue: "#42a5f5",
        yellow: "#ffb300",
        purple: "#ab47bc",
        orange: "#ff7043",
        red: "#ef5350",
        teal: "#26a69a"
    },
    DT = "modulepreload",
    FT = function(e, t) {
        return new URL(e, t).href
    },
    dm = {},
    IT = function(t, r, n) {
        let s = Promise.resolve();
        if (r && r.length > 0) {
            const i = document.getElementsByTagName("link"),
                l = document.querySelector("meta[property=csp-nonce]"),
                c = (l == null ? void 0 : l.nonce) || (l == null ? void 0 : l.getAttribute("nonce"));
            s = Promise.allSettled(r.map(u => {
                if (u = FT(u, n), u in dm) return;
                dm[u] = !0;
                const h = u.endsWith(".css"),
                    d = h ? '[rel="stylesheet"]' : "";
                if (!!n)
                    for (let p = i.length - 1; p >= 0; p--) {
                        const m = i[p];
                        if (m.href === u && (!h || m.rel === "stylesheet")) return
                    } else if (document.querySelector(`link[href="${u}"]${d}`)) return;
                const x = document.createElement("link");
                if (x.rel = h ? "stylesheet" : DT, h || (x.as = "script"), x.crossOrigin = "", x.href = u, c && x.setAttribute("nonce", c), document.head.appendChild(x), h) return new Promise((p, m) => {
                    x.addEventListener("load", p), x.addEventListener("error", () => m(new Error(`Unable to preload CSS for ${u}`)))
                })
            }))
        }

        function a(i) {
            const l = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (l.payload = i, window.dispatchEvent(l), !l.defaultPrevented) throw i
        }
        return s.then(i => {
            for (const l of i || []) l.status === "rejected" && a(l.reason);
            return t().catch(a)
        })
    };
let Zl = null;
async function PT() {
    if (!Zl) try {
        const e = await import("korean-lunar-calendar");
        Zl = e.default || e
    } catch {
        Zl = null
    }
    return Zl
}
const no = new Map;
async function Ew(e, t, r) {
    const n = `${e}-${t}-${r}`;
    if (no.has(n)) return no.get(n);
    try {
        const s = await PT();
        if (!s) throw new Error("library not available");
        const a = new s;
        a.setSolarDate(e, t, r);
        const i = a.getLunarCalendar(),
            l = i.month,
            c = i.day,
            h = `(${i.intercalation?"윤":""}${l}.${c})`;
        return no.set(n, h), h
    } catch {
        const s = MT(e, t, r);
        return no.set(n, s), s
    }
}

function Sw(e, t, r) {
    return no.get(`${e}-${t}-${r}`) ?? ""
}
async function P0(e, t) {
    const r = new Date(e, t, 0).getDate(),
        n = [];
    for (let s = 1; s <= r; s++) n.push(Ew(e, t, s));
    await Promise.all(n)
}

function MT(e, t, r) {
    const n = new Date(2e3, 0, 1).getTime(),
        s = 11,
        a = 25,
        i = 29.53058867,
        c = (new Date(e, t - 1, r).getTime() - n) / 864e5,
        u = a - 1 + c,
        h = Math.floor(u / i),
        d = Math.floor(u - h * i) + 1,
        f = (s - 1 + h) % 12 + 1,
        x = Math.max(1, Math.min(30, Math.round(d)));
    return `(${f}.${x})`
}

function us(e, t) {
    var s;
    const r = [...e].sort((a, i) => a.fromDate.localeCompare(i.fromDate));
    let n = ((s = r[0]) == null ? void 0 : s.rate) ?? 0;
    for (const a of r)
        if (a.fromDate <= t) n = a.rate;
        else break;
    return n
}

function Tw(e, t) {
    const [r, n] = e.split("-").map(Number), s = new Date(r, n - 1 + t, 1);
    return s.getFullYear() + "-" + String(s.getMonth() + 1).padStart(2, "0")
}

function da(e) {
    const t = e.startDate.slice(0, 7),
        r = [];
    let n = e.principal;
    const s = e.termMonths;
    for (let a = 0; a < s; a++) {
        const i = Tw(t, a),
            l = us(e.rateHistory, i),
            c = l / 100 / 12;
        let u = 0,
            h = 0,
            d = 0;
        if (e.method === "equal-payment")
            if (c === 0) u = Math.round(n / (s - a)), h = u, d = 0;
            else {
                const f = s - a;
                u = Math.round(n * c * Math.pow(1 + c, f) / (Math.pow(1 + c, f) - 1)), d = Math.round(n * c), h = u - d
            }
        else if (e.method === "equal-principal") h = Math.round(e.principal / s), d = Math.round(n * c), u = h + d;
        else if (e.method === "graduated") {
            const f = s - a,
                x = c > 0 ? n * c * Math.pow(1 + c, f) / (Math.pow(1 + c, f) - 1) : n / f,
                p = Math.pow(1.05, Math.floor(a / 12));
            u = Math.round(x * .85 * p), d = Math.round(n * c), h = Math.max(0, u - d)
        } else if (e.method === "bullet") d = Math.round(n * c), h = a === s - 1 ? n : 0, u = h + d;
        else if (e.method === "revolving") d = Math.round(n * c), h = a === s - 1 ? n : 0, u = a === s - 1 ? h : d;
        else if (e.method === "grace") {
            const g = Math.max(0, Math.min(e.graceMonths || 0, s - 1));
            if (a < g) d = Math.round(n * c), h = 0, u = d;
            else {
                const f = s - a;
                c === 0 ? (u = Math.round(n / f), h = u, d = 0) : (u = Math.round(n * c * Math.pow(1 + c, f) / (Math.pow(1 + c, f) - 1)), d = Math.round(n * c), h = u - d)
            }
        }
        n = Math.max(0, n - h), r.push({
            month: i,
            payment: u,
            principal: h,
            interest: d,
            balance: n,
            rate: l
        })
    }
    return r
}

function bo(e) {
    const t = e.startDate.slice(0, 7),
        r = [];
    let n = 0;
    for (let s = 0; s < e.termMonths; s++) {
        const a = Tw(t, s),
            i = us(e.rateHistory, a),
            l = i / 100 / 12;
        n += e.monthlyAmount;
        const c = Math.round(n * l);
        n += c, r.push({
            month: a,
            deposit: e.monthlyAmount,
            interest: c,
            accumulated: n,
            rate: i
        })
    }
    return r
}

function LT(e, t) {
    return da(e).find(n => n.month === t) ?? null
}

function BT(e, t) {
    return bo(e).find(n => n.month === t) ?? null
}

function nl(e, t, r) {
    var y;
    const n = e.startDate.slice(0, 7),
        [s, a] = n.split("-").map(Number),
        [i, l] = t.split("-").map(Number),
        c = (i - s) * 12 + (l - a);
    if (c < 0 || c >= e.termMonths) return us(e.rateHistory, t);
    const u = da(e),
        h = c === 0 ? e.principal : ((y = u[c - 1]) == null ? void 0 : y.balance) ?? e.principal,
        d = e.termMonths - c;
    if (h <= 0 || d <= 0) return us(e.rateHistory, t);
    if (e.method === "equal-principal") {
        const w = e.principal / e.termMonths,
            v = (r - w) / h;
        return Math.max(0, Math.round(v * 12 * 1e4) / 100)
    }
    if (e.method === "bullet" && c < e.termMonths - 1) {
        const w = r / h;
        return Math.max(0, Math.round(w * 12 * 1e4) / 100)
    }
    const f = e.method === "graduated" ? Math.pow(1.05, Math.floor(c / 12)) : 1,
        x = e.method === "graduated" ? r / (.85 * f) : r;
    let p = 0,
        m = 60;
    for (let w = 0; w < 80; w++) {
        const v = (p + m) / 2,
            g = v / 100 / 12;
        (g < 1e-4 ? h / d : h * g * Math.pow(1 + g, d) / (Math.pow(1 + g, d) - 1)) < x ? p = v : m = v
    }
    return Math.round((p + m) / 2 * 100) / 100
}

function Oi(e = 500) {
    const [t, r] = O.useState(null), [sz, szS] = O.useState(null), n = O.useRef(null), s = O.useRef(null), rz = O.useRef(null);
    O.useEffect(() => {
        function l(u) {
            n.current && r({
                x: n.current.px + u.clientX - n.current.sx,
                y: Math.max(0, n.current.py + u.clientY - n.current.sy)
            }), rz.current && szS({
                w: Math.max(280, rz.current.pw + u.clientX - rz.current.sx),
                h: Math.max(180, rz.current.ph + u.clientY - rz.current.sy)
            })
        }

        function c() {
            n.current = null, rz.current = null
        }
        return window.addEventListener("mousemove", l), window.addEventListener("mouseup", c), () => {
            window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", c)
        }
    }, []);

    function a(l) {
        var u;
        l.preventDefault();
        const c = (u = s.current) == null ? void 0 : u.getBoundingClientRect();
        c && (t || r({
            x: c.left,
            y: c.top
        }), n.current = {
            sx: l.clientX,
            sy: l.clientY,
            px: (t == null ? void 0 : t.x) ?? c.left,
            py: (t == null ? void 0 : t.y) ?? c.top
        })
    }

    function rzD(l) {
        var u;
        l.preventDefault(), l.stopPropagation();
        const c = (u = s.current) == null ? void 0 : u.getBoundingClientRect();
        c && (t || r({
            x: c.left,
            y: c.top
        }), rz.current = {
            sx: l.clientX,
            sy: l.clientY,
            pw: (sz == null ? void 0 : sz.w) ?? c.width,
            ph: (sz == null ? void 0 : sz.h) ?? c.height
        })
    }
    const szStyle = sz ? {
        width: sz.w,
        height: sz.h,
        maxHeight: "none"
    } : {};
    return {
        style: t ? {
            position: "fixed",
            left: t.x,
            top: t.y,
            zIndex: e,
            ...szStyle
        } : {
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: e,
            ...szStyle
        },
        elRef: s,
        onHeaderMouseDown: a,
        resizeHandle: o.jsx("div", {
            onMouseDown: rzD,
            title: DDBTR("드래그하여 창 크기 조절"),
            style: {
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 18,
                height: 18,
                cursor: "nwse-resize",
                zIndex: e + 1,
                borderRight: "2px solid rgba(255,255,255,0.35)",
                borderBottom: "2px solid rgba(255,255,255,0.35)",
                borderBottomRightRadius: 8
            }
        })
    }
}
const UT = ["pink", "green", "blue", "yellow", "purple", "orange", "red", "teal"],
    $T = {
        "equal-payment": {
            label: DDBTR("원리금균등"),
            short: DDBTR("원리금균등"),
            desc: "매월 동일한 금액(원금+이자)을 납입합니다. 초기에 이자 비중이 높고 후반에 원금 비중이 높아집니다. 주택담보대출에 가장 많이 사용됩니다."
        },
        "equal-principal": {
            label: DDBTR("원금균등"),
            short: DDBTR("원금균등"),
            desc: "매월 원금을 동일하게 납입하고 이자는 잔액에 따라 감소합니다. 초기 납입액이 높지만 총 이자가 원리금균등보다 적습니다."
        },
        graduated: {
            label: "체증식분할",
            short: "체증식",
            desc: "초기에 납입액이 낮고 시간이 지남에 따라 납입액이 늘어납니다. 소득이 증가할 것으로 예상될 때 유리합니다."
        },
        bullet: {
            label: DDBTR("만기일시"),
            short: DDBTR("만기일시"),
            desc: "대출 기간 동안 이자만 납입하고 만기에 원금 전액을 상환합니다. 월 납입 부담은 적지만 만기 상환 부담이 큽니다."
        },
        revolving: {
            label: DDBTR("마이너스통장"),
            short: "마이너스",
            desc: "한도 대출. 사용 잔액에 대해 매월 이자만 정산하고, 원금은 만기(또는 수시)에 상환합니다. 마이너스통장·한도대출에 해당합니다."
        },
        grace: {
            label: DDBTR("거치식"),
            short: DDBTR("거치식"),
            desc: "거치기간 동안 이자만 납입하다가, 거치 종료 후 남은 원금을 원리금균등으로 상환합니다."
        }
    },
    ea = e => new Intl.NumberFormat("ko-KR").format(Math.round(e));

function If({
    loan: e,
    onClose: t
}) {
    const {
        dispatch: r
    } = vt(), {
        style: n,
        elRef: s,
        onHeaderMouseDown: a,
        resizeHandle: RZ
    } = Oi(550), [i, l] = O.useState((e == null ? void 0 : e.title) ?? "주택담보대출"), [c, u] = O.useState(e != null && e.principal ? String(e.principal) : ""), [h, d] = O.useState(e != null && e.termMonths ? String(e.termMonths) : ""), [f, x] = O.useState((e == null ? void 0 : e.startDate) ?? new Date().toISOString().slice(0, 10)), [p, m] = O.useState((e == null ? void 0 : e.method) ?? "equal-payment"), [Lk2, Lk2S] = O.useState((e == null ? void 0 : e.loanKind) ?? "mortgage"), [Gm, GmS] = O.useState((e == null ? void 0 : e.graceMonths) ? String(e.graceMonths) : ""), [Pd, PdS] = O.useState((e == null ? void 0 : e.payDay) ?? ""), [y, w] = O.useState((e == null ? void 0 : e.color) ?? "blue"), [v, g] = O.useState((e == null ? void 0 : e.memo) ?? ""), [_, k] = O.useState(e != null && e.rateHistory.length ? e.rateHistory : [{
        fromDate: new Date().toISOString().slice(0, 7),
        rate: 0
    }]), [E, b] = O.useState(null), T = O.useRef(), [A, H] = O.useState("input"), [F, R] = O.useState(() => new Date().toISOString().slice(0, 7)), [K, se] = O.useState(""), [z, G] = O.useState("");

    function re(de, el) {
        const rc = el && el.getBoundingClientRect();
        T.current = setTimeout(() => b({ id: de, rc }), 1e3)
    }

    function Y() {
        clearTimeout(T.current), b(null)
    }

    function M() {
        var Te, xe;
        const de = ((Te = _[_.length - 1]) == null ? void 0 : Te.fromDate) ?? new Date().toISOString().slice(0, 7),
            [N, V] = de.split("-").map(Number),
            ae = new Date(N, V, 1),
            ve = ae.getFullYear() + "-" + String(ae.getMonth() + 1).padStart(2, "0");
        k([..._, {
            fromDate: ve,
            rate: ((xe = _[_.length - 1]) == null ? void 0 : xe.rate) ?? 0
        }])
    }

    function X(de, N, V) {
        k(_.map((ae, ve) => ve === de ? {
            ...ae,
            [N]: N === "rate" ? Number(V) : V
        } : ae))
    }

    function ce(de) {
        _.length <= 1 || k(_.filter((N, V) => V !== de))
    }
    const j = i.trim() && Number(c) > 0 && Number(h) > 0 && _.length > 0,
        q = j ? {
            id: (e == null ? void 0 : e.id) ?? "_preview",
            title: i,
            principal: Number(c),
            termMonths: Number(h),
            startDate: f,
            payDay: Pd ? Number(Pd) : void 0,
            method: p,
            rateHistory: _,
            color: y,
            memo: v
        } : null,
        U = q ? da(q) : [],
        B = U.reduce((de, N) => de + N.interest, 0),
        W = U.reduce((de, N) => de + N.payment, 0),
        te = O.useMemo(() => {
            if (!q || !K || !F) return null;
            const de = Number(K);
            if (!de || de <= 0) return null;
            const N = us(_, F);
            try {
                const V = nl(q, F, de),
                    ae = U.find(ve => ve.month === F);
                return {
                    currentRate: N,
                    implied: V,
                    calcPayment: (ae == null ? void 0 : ae.payment) ?? 0
                }
            } catch {
                return null
            }
        }, [q, K, F, _, U]);

    function he() {
        if (!te) return;
        const {
            implied: de
        } = te, ae = [..._.find(ve => ve.fromDate === F) ? _.map(ve => ve.fromDate === F ? {
            ...ve,
            rate: de
        } : ve) : [..._, {
            fromDate: F,
            rate: de
        }]].sort((ve, Te) => ve.fromDate.localeCompare(Te.fromDate));
        k(ae), G(`${F}부터 ${de}% 적용됨`), se(""), setTimeout(() => G(""), 3e3)
    }

    function ne() {
        if (!j) return;
        const de = {
            id: (e == null ? void 0 : e.id) ?? Ft(),
            title: i,
            principal: Number(c),
            termMonths: Number(h),
            startDate: f,
            payDay: Pd ? Number(Pd) : void 0,
            method: p,
            loanKind: Lk2,
            graceMonths: p === "grace" && Gm ? Number(Gm) : void 0,
            rateHistory: _,
            color: y,
            memo: v || void 0
        };
        r({
            type: e ? "UPDATE_LOAN" : "ADD_LOAN",
            loan: de
        }), t()
    }
    const ue = "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400 placeholder-white/30";
    return o.jsxs("div", {
        ref: s,
        className: "bg-gray-950 border border-white/20 rounded-2xl w-[420px] shadow-2xl max-h-[90vh] flex flex-col",
        style: n,
        children: [RZ, o.jsxs("div", {
            className: "flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0 cursor-grab active:cursor-grabbing select-none",
            onMouseDown: a,
            children: [o.jsxs("h3", {
                className: "text-white font-semibold",
                children: ["🏦 ", e ? "대출 수정" : "대출 추가"]
            }), o.jsxs("div", {
                className: "flex gap-2",
                onMouseDown: de => de.stopPropagation(),
                children: [o.jsx("button", {
                    onClick: () => H(A === "input" ? "preview" : "input"),
                    className: "px-3 py-1 rounded-lg text-xs bg-white/10 text-white/70 hover:bg-white/20",
                    children: A === "input" ? DDBTR("📊 미리보기") : DDBTR("✏️ 입력")
                }), o.jsx("button", {
                    onClick: t,
                    className: "text-white/50 hover:text-white",
                    children: o.jsx(Zt, {
                        size: 18
                    })
                })]
            })]
        }), o.jsxs("div", {
            className: "overflow-y-auto flex-1 px-4 py-4 thin-scroll",
            children: [A === "input" && o.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [o.jsx("div", {
                    className: "grid grid-cols-2 gap-1.5",
                    children: [{
                        k: "mortgage",
                        t: "🏠 주택담보대출",
                        m: "equal-payment"
                    }, {
                        k: "general",
                        t: "💳 일반대출",
                        m: "bullet"
                    }].map(kd => o.jsx("button", {
                        onClick: () => {
                            Lk2S(kd.k);
                            const cur = [kd.k === "mortgage" ? ["equal-payment", "equal-principal", "graduated"] : ["equal-payment", "bullet", "equal-principal"]][0];
                            cur.includes(p) || m(kd.m);
                            (!i || i === "주택담보대출" || i === "일반대출") && l(kd.k === "mortgage" ? "주택담보대출" : "일반대출")
                        },
                        className: "py-2 rounded-lg text-sm font-medium border transition-colors " + (Lk2 === kd.k ? "bg-blue-500/30 border-blue-400 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"),
                        children: kd.t
                    }, kd.k))
                }), o.jsx("input", {
                    value: i,
                    onChange: de => l(de.target.value),
                    placeholder: DDBTR("대출 이름"),
                    className: ue
                }), o.jsxs("div", {
                    className: "flex gap-2",
                    children: [o.jsxs("div", {
                        className: "flex-1",
                        children: [o.jsx("label", {
                            className: "text-white/50 text-xs mb-1 block",
                            children: DDBTR("대출금액 (원)")
                        }), o.jsx("input", {
                            type: "number",
                            value: c,
                            onChange: de => u(de.target.value),
                            placeholder: "300000000",
                            className: ue
                        })]
                    }), o.jsxs("div", {
                        className: "flex-1",
                        children: [o.jsx("label", {
                            className: "text-white/50 text-xs mb-1 block",
                            children: DDBTR("기간 (개월)")
                        }), o.jsx("input", {
                            type: "number",
                            value: h,
                            onChange: de => d(de.target.value),
                            placeholder: "360",
                            className: ue
                        })]
                    })]
                }), o.jsxs("div", {
                    children: [o.jsx("label", {
                        className: "text-white/50 text-xs mb-1 block",
                        children: DDBTR("대출 시작일")
                    }), o.jsxs("div", {
                        className: "flex gap-2",
                        children: [o.jsx("input", {
                            type: "date",
                            value: f,
                            onChange: de => x(de.target.value),
                            className: ue + " flex-1"
                        }), o.jsxs("div", {
                            className: "flex-shrink-0 flex items-center gap-1",
                            children: [o.jsx("span", {
                                className: "text-white/40 text-[10px] whitespace-nowrap",
                                children: DDBTR("납부일")
                            }), o.jsx("input", {
                                type: "number",
                                min: 1,
                                max: 31,
                                placeholder: DDBTR("일"),
                                value: Pd,
                                onChange: de => PdS(de.target.value.slice(0, 2)),
                                title: DDBTR("매월 납부하는 날 (비우면 시작일 기준)"),
                                className: ue,
                                style: { width: 64 }
                            })]
                        })]
                    })]
                }), o.jsxs("div", {
                    children: [o.jsxs("label", {
                        className: "text-white/50 text-xs mb-1.5 block",
                        children: ["상환방법 ", o.jsx("span", {
                            className: "text-white/30",
                            children: DDBTR("(1초 이상 올리면 설명)")
                        })]
                    }), o.jsx("div", {
                        className: "grid grid-cols-3 gap-1.5 relative",
                        children: (Lk2 === "mortgage" ? ["equal-payment", "equal-principal", "grace", "graduated"] : ["equal-payment", "equal-principal", "bullet", "revolving", "grace", "graduated"]).map(de => [de, $T[de]]).map(([de, N]) => o.jsxs("div", {
                            className: "relative",
                            children: [o.jsx("button", {
                                onClick: () => m(de),
                                onMouseEnter: ev => re(de, ev.currentTarget),
                                onMouseLeave: Y,
                                className: "w-full py-2 px-1 rounded-lg text-[11px] font-medium transition-colors text-center leading-tight whitespace-nowrap " + (p === de ? "bg-blue-500 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"),
                                children: N.short
                            }), E && E.id === de && E.rc && Rr.createPortal(o.jsxs("div", {
                                style: {
                                    position: "fixed",
                                    left: Math.min(window.innerWidth - 116, Math.max(116, E.rc.left + E.rc.width / 2)),
                                    top: E.rc.top - 8,
                                    transform: "translate(-50%, -100%)",
                                    zIndex: 99999,
                                    width: 216
                                },
                                className: "bg-gray-800 border border-white/20 rounded-xl p-3 shadow-2xl pointer-events-none",
                                children: [o.jsx("p", {
                                    className: "text-white font-semibold text-xs mb-1",
                                    children: N.label
                                }), o.jsx("p", {
                                    className: "text-white/70 text-xs leading-relaxed",
                                    children: N.desc
                                })]
                            }), document.body)]
                        }, de))
                    }), p === "grace" && o.jsxs("div", {
                        className: "mt-2 flex items-center gap-2",
                        children: [o.jsx("label", {
                            className: "text-white/50 text-xs flex-shrink-0",
                            children: DDBTR("거치기간 (개월)")
                        }), o.jsx("input", {
                            type: "number",
                            min: 0,
                            value: Gm,
                            onChange: de => GmS(de.target.value),
                            placeholder: DDBTR("예: 12"),
                            className: ue
                        })]
                    })]
                }), o.jsxs("div", {
                    children: [o.jsxs("div", {
                        className: "flex items-center justify-between mb-1.5",
                        children: [o.jsxs("label", {
                            className: "text-white/50 text-xs",
                            children: ["금리 이력 ", o.jsx("span", {
                                className: "text-white/30",
                                children: DDBTR("(변경 시 추가)")
                            })]
                        }), o.jsxs("button", {
                            onClick: M,
                            className: "flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300",
                            children: [o.jsx(Vr, {
                                size: 12
                            }), " 금리변경 추가"]
                        })]
                    }), o.jsx("div", {
                        className: "flex flex-col gap-1.5",
                        children: _.map((de, N) => o.jsxs("div", {
                            className: "flex gap-2 items-center",
                            children: [o.jsx("input", {
                                type: "month",
                                value: de.fromDate,
                                onChange: V => X(N, "fromDate", V.target.value),
                                className: "flex-1 bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none"
                            }), o.jsx("input", {
                                type: "number",
                                value: de.rate,
                                onChange: V => X(N, "rate", V.target.value),
                                step: "0.01",
                                placeholder: "3.5",
                                className: "w-20 bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none"
                            }), o.jsx("span", {
                                className: "text-white/40 text-xs",
                                children: "%"
                            }), _.length > 1 && o.jsx("button", {
                                onClick: () => ce(N),
                                className: "text-red-400 hover:text-red-300",
                                children: o.jsx(Zt, {
                                    size: 12
                                })
                            })]
                        }, N))
                    })]
                }), o.jsxs("div", {
                    children: [o.jsx("label", {
                        className: "text-white/50 text-xs mb-1.5 block",
                        children: DDBTR("색상")
                    }), o.jsx("div", {
                        className: "flex gap-2 flex-wrap",
                        children: UT.map(de => o.jsx("button", {
                            onClick: () => w(de),
                            className: "w-7 h-7 rounded-full transition-transform " + (y === de ? "scale-125 ring-2 ring-white" : "hover:scale-110"),
                            style: {
                                backgroundColor: qt[de]
                            }
                        }, de))
                    })]
                }), o.jsx("textarea", {
                    value: v,
                    onChange: de => g(de.target.value),
                    placeholder: DDBTR("메모 (선택)"),
                    rows: 2,
                    className: "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 text-sm resize-none focus:outline-none"
                })]
            }), A === "preview" && (j ? o.jsxs("div", {
                className: "flex flex-col gap-4",
                children: [o.jsxs("div", {
                    className: "bg-amber-400/8 border border-amber-400/25 rounded-2xl p-4",
                    children: [o.jsxs("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [o.jsx(sd, {
                            size: 14,
                            className: "text-amber-400"
                        }), o.jsx("span", {
                            className: "text-amber-300 text-sm font-semibold",
                            children: DDBTR("수기납입 → 금리 자동계산")
                        })]
                    }), o.jsx("p", {
                        className: "text-white/40 text-xs mb-3 leading-relaxed",
                        children: DDBTR("실제 납입한 금액을 입력하면 해당 달의 금리를 역산해서 그 이후 납입 스케줄을 다시 계산합니다.")
                    }), o.jsxs("div", {
                        className: "flex gap-2 mb-2",
                        children: [o.jsxs("div", {
                            className: "flex-1",
                            children: [o.jsx("label", {
                                className: "text-white/40 text-xs mb-1 block",
                                children: DDBTR("납입 월")
                            }), o.jsx("input", {
                                type: "month",
                                value: F,
                                onChange: de => R(de.target.value),
                                className: "w-full bg-white/10 border border-amber-400/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                            })]
                        }), o.jsxs("div", {
                            className: "flex-1",
                            children: [o.jsx("label", {
                                className: "text-white/40 text-xs mb-1 block",
                                children: DDBTR("실제 납입금액 (원)")
                            }), o.jsx("input", {
                                type: "number",
                                value: K,
                                onChange: de => {
                                    se(de.target.value), G("")
                                },
                                placeholder: DDBTR("예: 1,520,000"),
                                className: "w-full bg-white/10 border border-amber-400/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400 placeholder-white/20"
                            })]
                        })]
                    }), te && o.jsxs("div", {
                        className: "bg-black/30 rounded-xl px-3 py-2.5 mb-2.5 flex flex-col gap-1",
                        children: [o.jsxs("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [o.jsx("span", {
                                className: "text-white/50",
                                children: DDBTR("계산상 납입금")
                            }), o.jsxs("span", {
                                className: "text-white/70",
                                children: [ea(te.calcPayment), "원"]
                            })]
                        }), o.jsxs("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [o.jsx("span", {
                                className: "text-white/50",
                                children: DDBTR("기존 금리")
                            }), o.jsxs("span", {
                                className: "text-white/70",
                                children: [te.currentRate, "%"]
                            })]
                        }), o.jsxs("div", {
                            className: "flex items-center gap-2 mt-0.5",
                            children: [o.jsx("div", {
                                className: "flex-1 h-px bg-amber-400/20"
                            }), o.jsx("span", {
                                className: "text-amber-300/60 text-[10px]",
                                children: DDBTR("역산 결과")
                            }), o.jsx("div", {
                                className: "flex-1 h-px bg-amber-400/20"
                            })]
                        }), o.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [o.jsx("span", {
                                className: "text-amber-300 text-sm font-bold",
                                children: DDBTR("역산 금리")
                            }), o.jsxs("span", {
                                className: "text-amber-200 text-xl font-bold",
                                children: [te.implied, "%"]
                            })]
                        }), o.jsxs("p", {
                            className: "text-white/30 text-[10px] mt-0.5",
                            children: [F, "부터 이 금리로 스케줄이 재계산됩니다"]
                        })]
                    }), !te && K && o.jsx("p", {
                        className: "text-white/30 text-xs mb-2",
                        children: DDBTR("유효한 금액을 입력해주세요")
                    }), o.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [o.jsx("button", {
                            onClick: he,
                            disabled: !te,
                            className: "flex-1 py-2 rounded-xl bg-amber-500/70 text-white text-sm font-medium hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
                            children: te ? `${te.implied}% 금리로 적용` : "금리 적용"
                        }), z && o.jsx("span", {
                            className: "text-green-400 text-xs font-medium animate-pulse",
                            children: z
                        })]
                    })]
                }), o.jsx("div", {
                    className: "grid grid-cols-3 gap-2",
                    children: [{
                        label: "총 납입액",
                        val: ea(W) + "원",
                        cls: "text-white"
                    }, {
                        label: "총 이자",
                        val: ea(B) + "원",
                        cls: "text-red-300"
                    }, {
                        label: "이자율",
                        val: (B / Number(c) * 100).toFixed(1) + "%",
                        cls: "text-amber-300"
                    }].map(({
                        label: de,
                        val: N,
                        cls: V
                    }) => o.jsxs("div", {
                        className: "bg-white/8 rounded-xl p-3 text-center",
                        children: [o.jsx("p", {
                            className: "text-white/40 text-xs mb-1",
                            children: de
                        }), o.jsx("p", {
                            className: `font-semibold text-sm ${V}`,
                            children: N
                        })]
                    }, de))
                }), _.length > 1 && o.jsx("div", {
                    className: "flex gap-1.5 flex-wrap",
                    children: [..._].sort((de, N) => de.fromDate.localeCompare(N.fromDate)).map((de, N) => o.jsxs("div", {
                        className: "flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 rounded-lg px-2.5 py-1",
                        children: [o.jsx("span", {
                            className: "text-white/40 text-[10px]",
                            children: de.fromDate
                        }), o.jsxs("span", {
                            className: "text-amber-300 text-xs font-bold",
                            children: [de.rate, "%"]
                        })]
                    }, N))
                }), o.jsxs("div", {
                    children: [o.jsxs("p", {
                        className: "text-white/30 text-xs mb-1.5",
                        children: ["납입 스케줄 — 금리 변경 월은 ", o.jsx("span", {
                            className: "text-amber-300",
                            children: DDBTR("주황")
                        }), " 표시"]
                    }), o.jsxs("div", {
                        className: "flex text-white/30 text-[10px] px-1 mb-0.5 gap-1",
                        children: [o.jsx("span", {
                            className: "w-16",
                            children: DDBTR("월")
                        }), o.jsx("span", {
                            className: "flex-1 text-right",
                            children: DDBTR("납입액")
                        }), o.jsx("span", {
                            className: "w-16 text-right",
                            children: DDBTR("원금")
                        }), o.jsx("span", {
                            className: "w-16 text-right",
                            children: DDBTR("이자")
                        }), o.jsx("span", {
                            className: "w-20 text-right",
                            children: DDBTR("잔액")
                        }), o.jsx("span", {
                            className: "w-10 text-right text-amber-300/60",
                            children: DDBTR("금리")
                        })]
                    }), o.jsx("div", {
                        className: "max-h-64 overflow-y-auto thin-scroll",
                        children: U.map((de, N) => {
                            const V = N > 0 && de.rate !== U[N - 1].rate;
                            return o.jsxs("div", {
                                className: "flex text-xs px-1 py-1.5 border-b border-white/5 hover:bg-white/5 gap-1 " + (V ? "border-t-2 border-t-amber-400/40 bg-amber-400/5" : ""),
                                children: [o.jsxs("span", {
                                    className: "w-16 text-white/60",
                                    children: [de.month.slice(5), "월"]
                                }), o.jsx("span", {
                                    className: "flex-1 text-right text-white font-medium",
                                    children: ea(de.payment)
                                }), o.jsx("span", {
                                    className: "w-16 text-right text-blue-300",
                                    children: ea(de.principal)
                                }), o.jsx("span", {
                                    className: "w-16 text-right text-red-300",
                                    children: ea(de.interest)
                                }), o.jsx("span", {
                                    className: "w-20 text-right text-white/40",
                                    children: ea(de.balance)
                                }), o.jsxs("span", {
                                    className: "w-10 text-right font-bold " + (V ? "text-amber-300" : "text-amber-300/30"),
                                    children: [de.rate, "%"]
                                })]
                            }, N)
                        })
                    })]
                })]
            }) : o.jsx("p", {
                className: "text-white/40 text-sm text-center py-8",
                children: DDBTR("금액·기간·금리를 입력하면 납입 스케줄이 표시됩니다.")
            }))]
        }), o.jsxs("div", {
            className: "flex gap-2 px-4 pb-4 flex-shrink-0 border-t border-white/5 pt-3",
            children: [e && o.jsxs("button", {
                onClick: () => {
                    r({
                        type: "DELETE_LOAN",
                        id: e.id
                    }), t()
                },
                className: "flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-sm",
                children: [o.jsx(Gr, {
                    size: 14
                }), " 삭제"]
            }), o.jsx("button", {
                onClick: t,
                className: "flex-1 py-2 rounded-lg bg-white/10 text-white/70 text-sm",
                children: DDBTR("취소")
            }), o.jsx("button", {
                onClick: ne,
                disabled: !j,
                className: "flex-1 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 disabled:opacity-40 text-sm font-medium",
                children: e ? DDBTR("저장하기") : DDBTR("추가하기")
            })]
        })]
    })
}
const zT = ["pink", "green", "blue", "yellow", "purple", "orange", "red", "teal"],
    za = e => new Intl.NumberFormat("ko-KR").format(Math.round(e));

function Pf({
    entry: e,
    onClose: t
}) {
    var M;
    const {
        dispatch: r
    } = vt(), {
        style: n,
        elRef: s,
        onHeaderMouseDown: a,
        resizeHandle: RZ
    } = Oi(550), [i, l] = O.useState((e == null ? void 0 : e.title) ?? ""), [c, u] = O.useState((e == null ? void 0 : e.subtype) ?? "savings"), [h, d] = O.useState(e != null && e.monthlyAmount ? String(e.monthlyAmount) : ""), [f, x] = O.useState(e != null && e.termMonths ? String(e.termMonths) : ""), [p, m] = O.useState((e == null ? void 0 : e.startDate) ?? new Date().toISOString().slice(0, 10)), [y, w] = O.useState((e == null ? void 0 : e.color) ?? "green"), [Pd, PdS] = O.useState((e == null ? void 0 : e.payDay) ?? ""), [v, g] = O.useState((e == null ? void 0 : e.memo) ?? ""), [_, k] = O.useState(e != null && e.rateHistory.length ? e.rateHistory : [{
        fromDate: new Date().toISOString().slice(0, 7),
        rate: 0
    }]), [E, b] = O.useState("input");

    function T() {
        const X = _[_.length - 1],
            [ce, j] = ((X == null ? void 0 : X.fromDate) ?? new Date().toISOString().slice(0, 7)).split("-").map(Number),
            q = new Date(ce, j, 1),
            U = q.getFullYear() + "-" + String(q.getMonth() + 1).padStart(2, "0");
        k([..._, {
            fromDate: U,
            rate: (X == null ? void 0 : X.rate) ?? 0
        }])
    }

    function A(X, ce, j) {
        k(_.map((q, U) => U === X ? {
            ...q,
            [ce]: ce === "rate" ? Number(j) : j
        } : q))
    }

    function H(X) {
        _.length <= 1 || k(_.filter((ce, j) => j !== X))
    }
    const F = i.trim() && Number(h) > 0 && Number(f) > 0,
        R = F ? {
            id: (e == null ? void 0 : e.id) ?? "_preview",
            monthlyAmount: Number(h),
            termMonths: Number(f),
            startDate: p,
            rateHistory: _
        } : null,
        K = R ? bo(R) : [],
        se = K.reduce((X, ce) => X + ce.deposit, 0),
        z = K.reduce((X, ce) => X + ce.interest, 0),
        G = ((M = K[K.length - 1]) == null ? void 0 : M.accumulated) ?? 0;

    function re() {
        if (!F) return;
        const X = {
            id: (e == null ? void 0 : e.id) ?? Ft(),
            title: i,
            subtype: c,
            monthlyAmount: Number(h),
            termMonths: Number(f),
            startDate: p,
            payDay: Pd ? Number(Pd) : void 0,
            rateHistory: _,
            color: y,
            memo: v || void 0
        };
        r({
            type: e ? "UPDATE_SAVINGS" : "ADD_SAVINGS",
            entry: X
        }), t()
    }
    const Y = "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400 placeholder-white/30";
    return o.jsxs("div", {
        ref: s,
        className: "bg-gray-950 border border-white/20 rounded-2xl w-[420px] shadow-2xl max-h-[90vh] flex flex-col",
        style: n,
        children: [RZ, o.jsxs("div", {
            className: "flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0 cursor-grab active:cursor-grabbing select-none",
            onMouseDown: a,
            children: [o.jsxs("h3", {
                className: "text-white font-semibold",
                children: [c === "savings" ? "📈 적금" : DDBTR("💹 펀드"), " ", e ? "수정" : "추가"]
            }), o.jsxs("div", {
                className: "flex gap-2",
                onMouseDown: X => X.stopPropagation(),
                children: [o.jsx("button", {
                    onClick: () => b(E === "input" ? "preview" : "input"),
                    className: "px-3 py-1 rounded-lg text-xs bg-white/10 text-white/70 hover:bg-white/20",
                    children: E === "input" ? DDBTR("📊 미리보기") : DDBTR("✏️ 입력")
                }), o.jsx("button", {
                    onClick: t,
                    className: "text-white/50 hover:text-white",
                    children: o.jsx(Zt, {
                        size: 18
                    })
                })]
            })]
        }), o.jsx("div", {
            className: "overflow-y-auto flex-1 px-4 py-4",
            children: E === "input" ? o.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [o.jsx("div", {
                    className: "flex gap-2",
                    children: ["savings", "fund"].map(X => o.jsx("button", {
                        onClick: () => u(X),
                        className: "flex-1 py-2 rounded-lg text-sm font-medium transition-colors " + (c === X ? X === "savings" ? "bg-emerald-500 text-white" : "bg-purple-500 text-white" : "bg-white/10 text-white/50 hover:bg-white/20"),
                        children: X === "savings" ? "📈 적금" : DDBTR("💹 펀드")
                    }, X))
                }), o.jsx("input", {
                    value: i,
                    onChange: X => l(X.target.value),
                    placeholder: c === "savings" ? "예: 청약저축" : "예: 미국S&P500 ETF",
                    className: Y
                }), o.jsxs("div", {
                    className: "flex gap-2",
                    children: [o.jsxs("div", {
                        className: "flex-1",
                        children: [o.jsx("label", {
                            className: "text-white/50 text-xs mb-1 block",
                            children: DDBTR("월 납입액 (원)")
                        }), o.jsx("input", {
                            type: "number",
                            value: h,
                            onChange: X => d(X.target.value),
                            placeholder: "300000",
                            className: Y
                        })]
                    }), o.jsxs("div", {
                        className: "flex-1",
                        children: [o.jsx("label", {
                            className: "text-white/50 text-xs mb-1 block",
                            children: DDBTR("납입기간 (개월)")
                        }), o.jsx("input", {
                            type: "number",
                            value: f,
                            onChange: X => x(X.target.value),
                            placeholder: "24",
                            className: Y
                        })]
                    })]
                }), o.jsxs("div", {
                    className: "flex gap-2",
                    children: [o.jsxs("div", {
                        className: "flex-1",
                        children: [o.jsx("label", {
                            className: "text-white/50 text-xs mb-1 block",
                            children: DDBTR("시작일")
                        }), o.jsx("input", {
                            type: "date",
                            value: p,
                            onChange: X => m(X.target.value),
                            className: Y
                        })]
                    }), o.jsxs("div", {
                        className: "flex-shrink-0",
                        style: { width: 92 },
                        children: [o.jsx("label", {
                            className: "text-white/50 text-xs mb-1 block",
                            children: DDBTR("납입일")
                        }), o.jsx("input", {
                            type: "number",
                            min: 1,
                            max: 31,
                            placeholder: DDBTR("일"),
                            value: Pd,
                            onChange: X => PdS(X.target.value.slice(0, 2)),
                            title: DDBTR("매월 납입하는 날 (비우면 시작일 기준)"),
                            className: Y
                        })]
                    })]
                }), o.jsxs("div", {
                    children: [o.jsxs("div", {
                        className: "flex items-center justify-between mb-1.5",
                        children: [o.jsxs("label", {
                            className: "text-white/50 text-xs",
                            children: [c === "savings" ? "이율" : "예상 수익률", " 이력"]
                        }), o.jsxs("button", {
                            onClick: T,
                            className: "flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300",
                            children: [o.jsx(Vr, {
                                size: 12
                            }), " 변경 추가"]
                        })]
                    }), o.jsx("div", {
                        className: "flex flex-col gap-1.5",
                        children: _.map((X, ce) => o.jsxs("div", {
                            className: "flex gap-2 items-center",
                            children: [o.jsx("input", {
                                type: "month",
                                value: X.fromDate,
                                onChange: j => A(ce, "fromDate", j.target.value),
                                className: "flex-1 bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none"
                            }), o.jsx("input", {
                                type: "number",
                                value: X.rate,
                                onChange: j => A(ce, "rate", j.target.value),
                                step: "0.01",
                                placeholder: "3.5",
                                className: "w-20 bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none"
                            }), o.jsx("span", {
                                className: "text-white/40 text-xs",
                                children: "%"
                            }), _.length > 1 && o.jsx("button", {
                                onClick: () => H(ce),
                                className: "text-red-400 hover:text-red-300",
                                children: o.jsx(Zt, {
                                    size: 12
                                })
                            })]
                        }, ce))
                    })]
                }), o.jsxs("div", {
                    children: [o.jsx("label", {
                        className: "text-white/50 text-xs mb-1.5 block",
                        children: DDBTR("색상")
                    }), o.jsx("div", {
                        className: "flex gap-2 flex-wrap",
                        children: zT.map(X => o.jsx("button", {
                            onClick: () => w(X),
                            className: "w-7 h-7 rounded-full transition-transform " + (y === X ? "scale-125 ring-2 ring-white" : "hover:scale-110"),
                            style: {
                                backgroundColor: qt[X]
                            }
                        }, X))
                    })]
                }), o.jsx("textarea", {
                    value: v,
                    onChange: X => g(X.target.value),
                    placeholder: DDBTR("메모 (선택)"),
                    rows: 2,
                    className: "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 text-sm resize-none focus:outline-none"
                })]
            }) : o.jsx("div", {
                children: F ? o.jsxs(o.Fragment, {
                    children: [o.jsxs("div", {
                        className: "grid grid-cols-3 gap-2 mb-3",
                        children: [o.jsxs("div", {
                            className: "bg-white/10 rounded-xl p-3 text-center",
                            children: [o.jsx("p", {
                                className: "text-white/50 text-xs mb-1",
                                children: DDBTR("총 납입액")
                            }), o.jsxs("p", {
                                className: "text-white font-semibold text-sm",
                                children: [za(se), "원"]
                            })]
                        }), o.jsxs("div", {
                            className: "bg-white/10 rounded-xl p-3 text-center",
                            children: [o.jsx("p", {
                                className: "text-white/50 text-xs mb-1",
                                children: DDBTR("예상 이자")
                            }), o.jsxs("p", {
                                className: "text-emerald-300 font-semibold text-sm",
                                children: [za(z), "원"]
                            })]
                        }), o.jsxs("div", {
                            className: "bg-white/10 rounded-xl p-3 text-center",
                            children: [o.jsx("p", {
                                className: "text-white/50 text-xs mb-1",
                                children: DDBTR("만기 예상액")
                            }), o.jsxs("p", {
                                className: "text-yellow-300 font-semibold text-sm",
                                children: [za(G), "원"]
                            })]
                        })]
                    }), o.jsxs("div", {
                        className: "flex text-white/40 text-xs px-1 mb-1",
                        children: [o.jsx("span", {
                            className: "w-16",
                            children: DDBTR("월")
                        }), o.jsx("span", {
                            className: "flex-1 text-right",
                            children: DDBTR("납입액")
                        }), o.jsx("span", {
                            className: "w-20 text-right",
                            children: DDBTR("이자")
                        }), o.jsx("span", {
                            className: "w-24 text-right",
                            children: DDBTR("누적액")
                        })]
                    }), o.jsx("div", {
                        className: "max-h-64 overflow-y-auto thin-scroll",
                        children: K.map((X, ce) => o.jsxs("div", {
                            className: "flex text-xs px-1 py-1 border-b border-white/5 hover:bg-white/5",
                            children: [o.jsxs("span", {
                                className: "w-16 text-white/60",
                                children: [X.month.slice(5), "월"]
                            }), o.jsx("span", {
                                className: "flex-1 text-right text-white",
                                children: za(X.deposit)
                            }), o.jsx("span", {
                                className: "w-20 text-right text-emerald-300",
                                children: za(X.interest)
                            }), o.jsx("span", {
                                className: "w-24 text-right text-yellow-300",
                                children: za(X.accumulated)
                            })]
                        }, ce))
                    })]
                }) : o.jsx("p", {
                    className: "text-white/40 text-sm text-center py-8",
                    children: DDBTR("납입액·기간·이율을 입력하면 예상 결과가 표시됩니다.")
                })
            })
        }), o.jsxs("div", {
            className: "flex gap-2 px-4 pb-4 flex-shrink-0",
            children: [e && o.jsxs("button", {
                onClick: () => {
                    r({
                        type: "DELETE_SAVINGS",
                        id: e.id
                    }), t()
                },
                className: "flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-sm",
                children: [o.jsx(Gr, {
                    size: 14
                }), " 삭제"]
            }), o.jsx("button", {
                onClick: t,
                className: "flex-1 py-2 rounded-lg bg-white/10 text-white/70 text-sm",
                children: DDBTR("취소")
            }), o.jsx("button", {
                onClick: re,
                disabled: !F,
                className: "flex-1 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 disabled:opacity-40 text-sm font-medium",
                children: e ? DDBTR("저장하기") : DDBTR("추가하기")
            })]
        })]
    })
}
const HT = ["pink", "green", "blue", "yellow", "purple", "orange", "red", "teal"];

function Nw({
    date: e,
    initialEndDate: t,
    event: r,
    onClose: n
}) {
    var Me, Fe;
    const {
        state: s,
        dispatch: a
    } = vt(), {
        style: i,
        elRef: l,
        onHeaderMouseDown: c,
        resizeHandle: RZ
    } = Oi(550), u = s.loans || [], [h, d] = O.useState((r == null ? void 0 : r.title) ?? ""), [f, x] = O.useState((r == null ? void 0 : r.date) ?? e), [p, m] = O.useState((r == null ? void 0 : r.endDate) ?? t ?? ""), [y, w] = O.useState((r == null ? void 0 : r.color) ?? "blue"), [v, g] = O.useState((r == null ? void 0 : r.customColor) ?? ""), _ = O.useRef(null), k = (r == null ? void 0 : r.amount) === void 0 ? "none" : r.amount >= 0 ? "income" : "expense", [E, b] = O.useState(k), [T, A] = O.useState((r == null ? void 0 : r.amount) !== void 0 ? String(Math.abs(r.amount)) : ""), [H, F] = O.useState((r == null ? void 0 : r.memo) ?? ""), [epc, epcSet] = O.useState(null), [etx, etxSet] = O.useState(""), [R, K] = O.useState(!!(r != null && r.repeat)), [se, z] = O.useState(((Me = r == null ? void 0 : r.repeat) == null ? void 0 : Me.type) ?? "monthly"), [G, re] = O.useState((r == null ? void 0 : r.bankKeyword) ?? ""), [Y, M] = O.useState((r == null ? void 0 : r.linkedLoanId) ?? ""), [X, ce] = O.useState(!1), [j, q] = O.useState(!1), [U, B] = O.useState(!1), W = O.useRef(), te = ((Fe = s.settings) == null ? void 0 : Fe.feedbackThresholds) ?? iu;

    function he(me) {
        clearTimeout(W.current), W.current = setTimeout(() => {
            w(me), g(""), B(!0)
        }, 1e3)
    }

    function ne() {
        clearTimeout(W.current)
    }

    function ue() {
        const me = [h.trim(), H.trim()].filter(Boolean).join(`
`);
        if (!me) return;
        const vId = Ft(),
            oe = {
                id: Ft(),
                content: me,
                color: V,
                tabTitle: "달력 일정",
                createdAt: new Date().toISOString(),
                isDismissed: !1,
                eventId: vId
            };
        a({
            type: "ADD_EVENT",
            event: {
                id: vId,
                title: h.trim() || me.split(`
`)[0].slice(0, 20),
                date: f,
                endDate: p || void 0,
                color: y,
                customColor: v || void 0,
                isAllDay: !0,
                memo: H || void 0
            }
        }), a({
            type: "ADD_FEEDBACK_MEMO",
            memo: oe
        }), n()
    }
    O.useEffect(() => {
        function me(oe) {
            oe.key === "Escape" && n()
        }
        return window.addEventListener("keydown", me), () => window.removeEventListener("keydown", me)
    }, [n]);
    const de = E === "income" || E === "expense",
        N = h.trim() || de && (T || H.trim()),
        V = v || qt[y],
        ae = O.useMemo(() => {
            if (E !== "expense" || !Y || !T) return null;
            const me = u.find(Ne => Ne.id === Y);
            if (!me) return null;
            const oe = f.slice(0, 7),
                fe = us(me.rateHistory, oe);
            try {
                const Ne = nl(me, oe, Number(T));
                return {
                    currentRate: fe,
                    implied: Ne
                }
            } catch {
                return null
            }
        }, [E, Y, T, f, u]);

    function ve() {
        if (!N) return;
        let me;
        if (E === "income" && T ? me = Math.abs(Number(T)) : E === "expense" && T && (me = -Math.abs(Number(T))), E === "expense" && Y && T) {
            const fe = u.find(Ne => Ne.id === Y);
            if (fe) {
                const Ne = f.slice(0, 7),
                    We = nl(fe, Ne, Number(T)),
                    Je = us(fe.rateHistory, Ne);
                if (Math.abs(We - Je) > .001) {
                    const Gt = [...fe.rateHistory.filter(nr => nr.fromDate !== Ne), {
                        fromDate: Ne,
                        rate: We
                    }].sort((nr, nt) => nr.fromDate.localeCompare(nt.fromDate));
                    a({
                        type: "UPDATE_LOAN",
                        loan: {
                            ...fe,
                            rateHistory: Gt
                        }
                    })
                }
            }
        }
        const oe = {
            id: (r == null ? void 0 : r.id) ?? Ft(),
            title: h.trim(),
            date: f,
            endDate: p || void 0,
            color: y,
            customColor: v || void 0,
            isAllDay: !0,
            amount: me,
            memo: H || void 0,
            repeat: R ? {
                type: se,
                interval: 1
            } : void 0,
            bankKeyword: R && G.trim() ? G.trim() : void 0,
            linkedLoanId: E === "expense" && Y ? Y : void 0
        };
        const _tc = window.__ddbTeamCtx;
        if (_tc && _tc.on) {
            if (!(_tc.caps && _tc.caps.event)) { alert(DDBTR("보기 전용입니다 (편집 권한 없음)")); return }
            const _cli = $a();
            if (_cli && _tc.meta) {
                const _d = { title: oe.title, date: oe.date, endDate: oe.endDate, color: oe.color, customColor: oe.customColor, isAllDay: !0, memo: oe.memo };
                (r && r.id ? _cli.from("team_events").update({ data: _d, updated_at: new Date().toISOString() }).eq("id", r.id) : _cli.from("team_events").insert({ team_id: _tc.meta.team_id, data: _d, created_by: _tc.uid })).then(() => {}, () => {})
            }
            n(); return
        }
        a({
            type: r ? "UPDATE_EVENT" : "ADD_EVENT",
            event: oe
        }), n()
    }
    const Te = "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400 placeholder-white/30",
        xe = [{
            key: "none",
            label: "없음",
            active: "bg-white/20 text-white"
        }, {
            key: "income",
            label: DDBTR("💰입금"),
            active: "bg-red-400/80 text-white"
        }, {
            key: "expense",
            label: DDBTR("💸출금"),
            active: "bg-blue-400/80 text-white"
        }, {
            key: "loan",
            label: "🏦대출",
            active: "bg-amber-500/80 text-white"
        }, {
            key: "savings",
            label: "📈적금·펀드",
            active: "bg-emerald-500/80 text-white"
        }];
    return X ? o.jsx(If, {
        loan: null,
        onClose: () => {
            ce(!1), n()
        }
    }) : j ? o.jsx(Pf, {
        entry: null,
        onClose: () => {
            q(!1), n()
        }
    }) : o.jsxs("div", {
        ref: l,
        className: "bg-gray-950 border border-white/20 rounded-2xl w-80 shadow-2xl",
        style: i,
        children: [RZ, o.jsxs("div", {
            className: "flex items-center justify-between px-4 py-3 border-b border-white/10 cursor-grab active:cursor-grabbing select-none",
            onMouseDown: c,
            children: [U ? o.jsxs("div", {
                className: "flex items-center gap-2",
                children: [o.jsx(ld, {
                    size: 14,
                    className: "text-amber-400"
                }), o.jsx("h3", {
                    className: "text-amber-300 font-semibold text-sm",
                    children: DDBTR("피드백 메모 등록")
                })]
            }) : o.jsx("h3", {
                className: "text-white font-semibold",
                children: r ? "일정 수정" : "일정 추가"
            }), o.jsxs("div", {
                className: "flex items-center gap-1",
                onMouseDown: me => me.stopPropagation(),
                children: [U && o.jsx("button", {
                    onClick: () => B(!1),
                    className: "text-white/40 hover:text-white/80 text-xs px-2 py-1 rounded bg-white/10",
                    children: DDBTR("일정으로")
                }), o.jsx("button", {
                    onClick: n,
                    className: "text-white/50 hover:text-white",
                    children: o.jsx(Zt, {
                        size: 18
                    })
                })]
            })]
        }), o.jsxs("div", {
            className: "px-4 py-4 flex flex-col gap-3",
            children: [o.jsx("input", {
                autoFocus: !0,
                value: h,
                onChange: me => d(me.target.value),
                placeholder: de ? "일정 제목 (선택)" : "일정 제목",
                className: Te
            }), o.jsxs("div", {
                className: "flex gap-2",
                children: [o.jsxs("div", {
                    className: "flex-1",
                    children: [o.jsx("label", {
                        className: "text-white/50 text-xs mb-1 block",
                        children: DDBTR("시작일")
                    }), o.jsx("input", {
                        type: "date",
                        value: f,
                        onChange: me => x(me.target.value),
                        className: Te
                    })]
                }), o.jsxs("div", {
                    className: "flex-1",
                    children: [o.jsx("label", {
                        className: "text-white/50 text-xs mb-1 block",
                        children: DDBTR("종료일")
                    }), o.jsx("input", {
                        type: "date",
                        value: p,
                        onChange: me => m(me.target.value),
                        className: Te
                    })]
                })]
            }), o.jsxs("div", {
                children: [o.jsx("label", {
                    className: "text-white/50 text-xs mb-1.5 block",
                    children: DDBTR("금액 유형")
                }), o.jsx("div", {
                    className: "flex gap-1",
                    children: xe.map(me => o.jsx("button", {
                        onClick: () => {
                            if (me.key === "loan") {
                                ce(!0);
                                return
                            }
                            if (me.key === "savings") {
                                q(!0);
                                return
                            }
                            b(me.key), me.key !== "expense" && M("")
                        },
                        className: "flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate px-0.5 " + (E === me.key ? me.active : "bg-white/10 text-white/50 hover:bg-white/15"),
                        children: me.label
                    }, me.key))
                }), de && o.jsx("input", {
                    type: "number",
                    value: T,
                    onChange: me => A(me.target.value),
                    placeholder: DDBTR("금액 입력 (원)"),
                    className: Te + " mt-2 " + (E === "income" ? "border-red-300/50" : "border-blue-300/50")
                }), E === "expense" && u.length > 0 && o.jsxs("div", {
                    className: "mt-2 bg-amber-400/5 border border-amber-400/20 rounded-xl px-3 py-2.5",
                    children: [o.jsxs("div", {
                        className: "flex items-center gap-1.5 mb-1.5",
                        children: [o.jsx(oT, {
                            size: 11,
                            className: "text-amber-400"
                        }), o.jsx("span", {
                            className: "text-amber-300 text-xs font-medium",
                            children: DDBTR("대출 연결 (선택)")
                        })]
                    }), o.jsxs("select", {
                        value: Y,
                        onChange: me => M(me.target.value),
                        className: "w-full bg-white/10 border border-amber-400/20 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400",
                        children: [o.jsx("option", {
                            value: "",
                            style: {
                                backgroundColor: "#1e293b",
                                color: "white"
                            },
                            children: DDBTR("연결 안 함")
                        }), u.map(me => o.jsxs("option", {
                            value: me.id,
                            style: {
                                backgroundColor: "#1e293b",
                                color: "white"
                            },
                            children: [ddbTT(me.title), " (", me.principal.toLocaleString(), "원)"]
                        }, me.id))]
                    }), ae && o.jsx("div", {
                        className: "mt-2 text-xs",
                        children: Math.abs(ae.implied - ae.currentRate) < .001 ? o.jsxs("p", {
                            className: "text-white/40",
                            children: ["현재 금리 ", ae.currentRate, "%와 동일"]
                        }) : o.jsxs("div", {
                            className: "flex items-center gap-2 flex-wrap",
                            children: [o.jsxs("span", {
                                className: "text-white/50",
                                children: ["기존 ", ae.currentRate, "%"]
                            }), o.jsx("span", {
                                className: "text-amber-300",
                                children: DDBTR("→ 역산 금리")
                            }), o.jsxs("span", {
                                className: "text-amber-200 font-bold text-sm",
                                children: [ae.implied, "%"]
                            }), o.jsx("span", {
                                className: "text-white/30",
                                children: DDBTR("로 저장됩니다")
                            })]
                        })
                    }), Y && !T && o.jsx("p", {
                        className: "text-white/30 text-xs mt-1",
                        children: DDBTR("금액 입력 시 금리가 자동 계산됩니다")
                    })]
                })]
            }), o.jsxs("div", {
                children: [o.jsxs("label", {
                    className: "text-white/50 text-xs mb-1.5 block",
                    children: ["색상", !U && o.jsx("span", {
                        className: "text-white/30 ml-2",
                        children: DDBTR("(1초 길게 누르면 📌 피드백 메모)")
                    })]
                }), U && o.jsxs("div", {
                    className: "mb-2 px-2 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/25 flex items-center gap-2 flex-wrap",
                    children: [o.jsx("span", {
                        className: "text-amber-300/70 text-[10px]",
                        children: DDBTR("기간별 색상:")
                    }), [...te].sort((me, oe) => me.minDays - oe.minDays).map((me, oe) => o.jsxs("span", {
                        className: "text-[10px] font-medium",
                        style: {
                            color: me.color
                        },
                        children: [me.emoji, " ", me.minDays, "일+"]
                    }, oe))]
                }), o.jsxs("div", {
                    className: "flex gap-x-3 gap-y-2 flex-wrap items-start pt-1",
                    children: [HT.map(me => {
                        const Lbx = (s.settings.colorLabels ?? {})[me];
                        return o.jsxs("div", {
                            className: "relative group flex flex-col items-center",
                            children: [o.jsx("button", {
                                onClick: () => {
                                    w(me), g("")
                                },
                                onMouseDown: () => he(me),
                                onMouseUp: ne,
                                onMouseLeave: ne,
                                className: "w-7 h-7 rounded-full transition-transform select-none " + (y === me && !v ? "scale-125 ring-2 ring-white" : "hover:scale-110") + (U ? " ring-offset-1 ring-offset-gray-950" : ""),
                                style: {
                                    backgroundColor: qt[me]
                                }
                            }), o.jsx("button", {
                                onClick: Ne => {
                                    Ne.stopPropagation(), epcSet(me), etxSet(Lbx ?? "")
                                },
                                className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black/80 text-white/90 hidden group-hover:flex items-center justify-center hover:bg-black z-10",
                                title: DDBTR("이 색상의 용도 이름 입력 (최대 2글자)"),
                                children: o.jsx(fT, {
                                    size: 9
                                })
                            }), o.jsx("span", {
                                className: "text-[10px] leading-none mt-2 font-bold h-3",
                                style: {
                                    color: qt[me]
                                },
                                children: Lbx ?? ""
                            })]
                        }, me)
                    }), o.jsx("button", {
                        onClick: () => {
                            var me;
                            return (me = _.current) == null ? void 0 : me.click()
                        },
                        className: "w-7 h-7 rounded-full border-2 transition-transform flex items-center justify-center " + (v ? "scale-125 ring-2 ring-white border-transparent" : "border-dashed border-white/40 hover:border-white/70"),
                        style: v ? {
                            backgroundColor: v
                        } : {
                            background: "conic-gradient(red,yellow,lime,cyan,blue,magenta,red)"
                        },
                        title: DDBTR("사용자 지정 색상"),
                        children: !v && o.jsx("span", {
                            style: {
                                fontSize: 10,
                                color: "white",
                                textShadow: "0 0 3px #000"
                            },
                            children: "+"
                        })
                    }), o.jsx("input", {
                        ref: _,
                        type: "color",
                        value: v || "#ffffff",
                        onChange: me => g(me.target.value),
                        className: "sr-only",
                        tabIndex: -1
                    }), v && o.jsx("button", {
                        onClick: () => g(""),
                        className: "text-white/40 text-xs hover:text-white/80",
                        children: DDBTR("✕ 초기화")
                    })]
                }), epc && o.jsxs("div", {
                    className: "flex items-center gap-2 mt-2 bg-white/5 border border-white/15 rounded-lg px-2 py-1.5",
                    children: [o.jsx("span", {
                        className: "w-4 h-4 rounded-full flex-shrink-0",
                        style: {
                            backgroundColor: qt[epc]
                        }
                    }), o.jsx("input", {
                        autoFocus: !0,
                        value: etx,
                        maxLength: 2,
                        placeholder: DDBTR("2글자"),
                        onChange: me => etxSet(me.target.value.slice(0, 2)),
                        onKeyDown: me => {
                            me.key === "Enter" && (a({
                                type: "UPDATE_SETTINGS",
                                settings: {
                                    colorLabels: {
                                        ...s.settings.colorLabels ?? {},
                                        [epc]: etx.trim()
                                    }
                                }
                            }), epcSet(null))
                        },
                        className: "w-16 bg-white/10 border border-white/20 rounded px-2 py-1 text-center text-sm text-white focus:outline-none focus:border-blue-400"
                    }), o.jsx("button", {
                        onClick: () => {
                            a({
                                type: "UPDATE_SETTINGS",
                                settings: {
                                    colorLabels: {
                                        ...s.settings.colorLabels ?? {},
                                        [epc]: etx.trim()
                                    }
                                }
                            }), epcSet(null)
                        },
                        className: "px-2 py-1 rounded bg-blue-500/30 text-blue-200 text-xs hover:bg-blue-500/50",
                        children: DDBTR("저장")
                    }), o.jsx("button", {
                        onClick: () => epcSet(null),
                        className: "px-2 py-1 rounded bg-white/10 text-white/50 text-xs hover:bg-white/20",
                        children: DDBTR("취소")
                    }), o.jsx("span", {
                        className: "text-white/30 text-[10px]",
                        children: DDBTR("이 색상의 용도 이름 — 이 창에서만 표시됩니다")
                    })]
                })]
            }), o.jsxs("div", {
                className: "flex flex-col gap-2",
                children: [o.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [o.jsxs("label", {
                        className: "flex items-center gap-2 cursor-pointer",
                        children: [o.jsx("input", {
                            type: "checkbox",
                            checked: R,
                            onChange: me => K(me.target.checked),
                            className: "accent-blue-400"
                        }), o.jsx("span", {
                            className: "text-white/70 text-sm",
                            children: DDBTR("반복")
                        })]
                    }), R && o.jsx("div", {
                        className: "flex gap-1 flex-1",
                        children: ["daily", "weekly", "monthly", "yearly"].map(me => o.jsx("button", {
                            type: "button",
                            onClick: () => z(me),
                            className: "flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors " + (se === me ? "bg-blue-500/80 text-white" : "bg-white/10 text-white/50 hover:bg-white/20"),
                            children: me === "daily" ? DDBTR("매일") : me === "weekly" ? DDBTR("매주") : me === "monthly" ? DDBTR("매월") : DDBTR("매년")
                        }, me))
                    })]
                }), R && o.jsxs("div", {
                    className: "bg-blue-400/5 border border-blue-400/20 rounded-xl px-3 py-2.5",
                    children: [o.jsxs("label", {
                        className: "text-blue-300/80 text-xs mb-1.5 block",
                        children: [DDBTR("🏦 은행 연동 키워드 "), o.jsx("span", {
                            className: "text-white/30",
                            children: DDBTR("(선택)")
                        })]
                    }), o.jsx("input", {
                        value: G,
                        onChange: me => re(me.target.value),
                        placeholder: DDBTR("예: SKT, 카드연회비, 통신비..."),
                        className: "w-full bg-white/10 border border-blue-400/20 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-blue-400 placeholder-white/25"
                    }), o.jsx("p", {
                        className: "text-white/30 text-[10px] mt-1",
                        children: DDBTR("은행 거래내역 가져오기에서 이 키워드와 일치하는 항목이 있으면, 같은 달 이 반복일정을 자동으로 숨겨 중복을 방지합니다.")
                    })]
                })]
            }), o.jsx("textarea", {
                value: H,
                onChange: me => F(me.target.value),
                placeholder: de ? DDBTR("메모 (입출금 내역에 표시됩니다)") : "메모 (선택)",
                rows: 2,
                className: "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 text-sm resize-none focus:outline-none"
            })]
        }), o.jsxs("div", {
            className: "flex gap-2 px-4 pb-4",
            children: [!U && r && o.jsxs("button", {
                onClick: () => {
                    (() => { const tc = window.__ddbTeamCtx; if (tc && tc.on) { if (tc.role !== "editor") { alert(DDBTR("보기 전용입니다 (편집 권한 없음)")); return } ddbTeamDelEvent(r.id); n(); return } a({ type: "DELETE_EVENT", id: r.id }), n() })()
                },
                className: "flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-sm",
                children: [o.jsx(Gr, {
                    size: 14
                }), " 삭제"]
            }), o.jsx("button", {
                onClick: n,
                className: "flex-1 py-2 rounded-lg bg-white/10 text-white/70 text-sm",
                children: DDBTR("취소")
            }), U ? o.jsxs("button", {
                onClick: ue,
                disabled: !h.trim() && !H.trim(),
                className: "flex-1 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-400 disabled:opacity-40 text-sm font-medium flex items-center justify-center gap-1.5",
                children: [o.jsx(ld, {
                    size: 13
                }), " 피드백 등록"]
            }) : o.jsx("button", {
                onClick: ve,
                disabled: !N,
                className: "flex-1 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 disabled:opacity-40 text-sm font-medium",
                children: DDBTR("저장")
            })]
        })]
    })
}
const DDB_THEMES = [{ key: "seagull", name: "부산 갈매기", url: "data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20viewBox%3D%220%200%20680%20420%22%20preserveAspectRatio%3D%22xMidYMid%20slice%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22sky%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238fdcff%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e8f9ff%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22sea%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%233fb0e6%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230b6aa6%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22680%22%20height%3D%22420%22%20fill%3D%22url%28%23sky%29%22%2F%3E%3Ccircle%20cx%3D%22565%22%20cy%3D%2288%22%20r%3D%2246%22%20fill%3D%22%23fff3b0%22%2F%3E%3Ccircle%20cx%3D%22565%22%20cy%3D%2288%22%20r%3D%2260%22%20fill%3D%22%23fff3b0%22%20opacity%3D%220.35%22%2F%3E%3Cellipse%20cx%3D%22120%22%20cy%3D%2295%22%20rx%3D%2260%22%20ry%3D%2226%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.9%22%2F%3E%3Cellipse%20cx%3D%22165%22%20cy%3D%2280%22%20rx%3D%2242%22%20ry%3D%2222%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.9%22%2F%3E%3Cellipse%20cx%3D%22430%22%20cy%3D%2260%22%20rx%3D%2248%22%20ry%3D%2220%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.8%22%2F%3E%3Cellipse%20cx%3D%22470%22%20cy%3D%2272%22%20rx%3D%2234%22%20ry%3D%2216%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M0%20250%20Q170%20220%20340%20250%20T680%20250%20V420%20H0%20Z%22%20fill%3D%22url%28%23sea%29%22%2F%3E%3Cpath%20d%3D%22M0%20262%20Q120%20246%20250%20262%20T520%20262%20T680%20262%22%20fill%3D%22none%22%20stroke%3D%22%23bfeaff%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.7%22%2F%3E%3Cpath%20d%3D%22M60%20300%20Q170%20286%20300%20300%20T560%20300%20T740%20300%22%20fill%3D%22none%22%20stroke%3D%22%23d6f2ff%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M0%20345%20Q160%20330%20330%20345%20T680%20345%22%20fill%3D%22none%22%20stroke%3D%22%23eaf9ff%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.5%22%2F%3E%3Cg%20transform%3D%22translate%28150%20250%29%22%3E%3Cellipse%20cx%3D%220%22%20cy%3D%2226%22%20rx%3D%2234%22%20ry%3D%229%22%20fill%3D%22%2306507f%22%20opacity%3D%220.25%22%2F%3E%3Cpath%20d%3D%22M-70%20-34%20Q-40%20-60%20-20%20-30%20Q-8%20-46%204%20-30%22%20fill%3D%22none%22%20stroke%3D%22%235b6b7a%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M70%20-34%20Q40%20-60%2020%20-30%20Q8%20-46%20-4%20-30%22%20fill%3D%22none%22%20stroke%3D%22%235b6b7a%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%2F%3E%3Cellipse%20cx%3D%220%22%20cy%3D%220%22%20rx%3D%2242%22%20ry%3D%2234%22%20fill%3D%22%23ffffff%22%2F%3E%3Ccircle%20cx%3D%220%22%20cy%3D%22-30%22%20r%3D%2227%22%20fill%3D%22%23ffffff%22%2F%3E%3Cellipse%20cx%3D%22-9%22%20cy%3D%22-32%22%20rx%3D%225%22%20ry%3D%226%22%20fill%3D%22%232b3b47%22%2F%3E%3Cellipse%20cx%3D%2211%22%20cy%3D%22-32%22%20rx%3D%225%22%20ry%3D%226%22%20fill%3D%22%232b3b47%22%2F%3E%3Ccircle%20cx%3D%22-7.5%22%20cy%3D%22-34%22%20r%3D%221.6%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2212.5%22%20cy%3D%22-34%22%20r%3D%221.6%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22-17%22%20cy%3D%22-23%22%20r%3D%225%22%20fill%3D%22%23ffc7c7%22%20opacity%3D%220.8%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%22-23%22%20r%3D%225%22%20fill%3D%22%23ffc7c7%22%20opacity%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M-1%20-24%20L14%20-18%20L-1%20-13%20Z%22%20fill%3D%22%23ff9e3d%22%2F%3E%3Cpath%20d%3D%22M-14%2030%20l-6%208%20M-6%2032%20l-4%209%22%20stroke%3D%22%23ff9e3d%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate%28500%20150%29%20scale%280.5%29%22%3E%3Cpath%20d%3D%22M-60%20-20%20Q-30%20-46%20-12%20-18%20Q0%20-34%2012%20-18%20Q30%20-46%2060%20-20%22%20fill%3D%22none%22%20stroke%3D%22%237c8a98%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%2F%3E%3Cellipse%20cx%3D%220%22%20cy%3D%226%22%20rx%3D%2230%22%20ry%3D%2224%22%20fill%3D%22%23ffffff%22%2F%3E%3Ccircle%20cx%3D%220%22%20cy%3D%22-20%22%20r%3D%2219%22%20fill%3D%22%23ffffff%22%2F%3E%3Ccircle%20cx%3D%22-6%22%20cy%3D%22-22%22%20r%3D%223.4%22%20fill%3D%22%232b3b47%22%2F%3E%3Ccircle%20cx%3D%227%22%20cy%3D%22-22%22%20r%3D%223.4%22%20fill%3D%22%232b3b47%22%2F%3E%3Cpath%20d%3D%22M0%20-16%20L11%20-11%20L0%20-7%20Z%22%20fill%3D%22%23ff9e3d%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E" }, { key: "croc", name: "정글 악어", url: "data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20viewBox%3D%220%200%20680%20420%22%20preserveAspectRatio%3D%22xMidYMid%20slice%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22jsky%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23d8f7c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23eafff0%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22water%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2357c7c0%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232a9a97%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22680%22%20height%3D%22420%22%20fill%3D%22url%28%23jsky%29%22%2F%3E%3Ccircle%20cx%3D%22120%22%20cy%3D%2280%22%20r%3D%2252%22%20fill%3D%22%23fff6bf%22%20opacity%3D%220.7%22%2F%3E%3Cpath%20d%3D%22M-10%200%20Q40%2060%2020%20120%20Q70%20100%2060%20170%20Q100%20150%2090%20210%20L-10%20210%20Z%22%20fill%3D%22%235fae4e%22%20opacity%3D%220.55%22%2F%3E%3Cpath%20d%3D%22M690%200%20Q640%2070%20665%20130%20Q610%20110%20620%20185%20Q575%20165%20585%20225%20L690%20225%20Z%22%20fill%3D%22%234f9f43%22%20opacity%3D%220.55%22%2F%3E%3Cg%20fill%3D%22%233f8f39%22%20opacity%3D%220.9%22%3E%3Cpath%20d%3D%22M40%2040%20Q100%2010%20150%2045%20Q120%2070%2080%2060%20Q60%2080%2040%2060%20Z%22%2F%3E%3Cpath%20d%3D%22M560%2030%20Q620%205%20660%2045%20Q630%2068%20590%2058%20Q575%2078%20560%2055%20Z%22%2F%3E%3C%2Fg%3E%3Cg%20stroke%3D%22%2369b85a%22%20stroke-width%3D%229%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%20opacity%3D%220.85%22%3E%3Cpath%20d%3D%22M120%20210%20Q100%20150%20130%20110%22%2F%3E%3Cpath%20d%3D%22M120%20150%20Q150%20140%20175%20155%22%2F%3E%3Cpath%20d%3D%22M120%20175%20Q95%20168%2072%20182%22%2F%3E%3C%2Fg%3E%3Cellipse%20cx%3D%22130%22%20cy%3D%22112%22%20rx%3D%2226%22%20ry%3D%2214%22%20fill%3D%22%237fd06e%22%20transform%3D%22rotate%28-30%20130%20112%29%22%2F%3E%3Cellipse%20cx%3D%22170%22%20cy%3D%22150%22%20rx%3D%2222%22%20ry%3D%2212%22%20fill%3D%22%237fd06e%22%20transform%3D%22rotate%2820%20170%20150%29%22%2F%3E%3Cellipse%20cx%3D%2278%22%20cy%3D%22182%22%20rx%3D%2222%22%20ry%3D%2212%22%20fill%3D%22%237fd06e%22%20transform%3D%22rotate%28-20%2078%20182%29%22%2F%3E%3Cpath%20d%3D%22M0%20300%20Q170%20280%20340%20300%20T680%20300%20V420%20H0%20Z%22%20fill%3D%22url%28%23water%29%22%2F%3E%3Cpath%20d%3D%22M0%20316%20Q140%20302%20280%20316%20T680%20316%22%20fill%3D%22none%22%20stroke%3D%22%23b7f0ec%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M40%20352%20Q180%20340%20320%20352%20T680%20352%22%20fill%3D%22none%22%20stroke%3D%22%23d8fbf8%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.5%22%2F%3E%3Cg%20transform%3D%22translate%28340%20250%29%22%3E%3Cellipse%20cx%3D%220%22%20cy%3D%2266%22%20rx%3D%22150%22%20ry%3D%2218%22%20fill%3D%22%231f7a77%22%20opacity%3D%220.3%22%2F%3E%3Cpath%20d%3D%22M118%2030%20Q150%2020%20176%2034%20Q152%2044%20150%2054%20Q168%2058%20176%2070%20Q150%2074%20148%2084%20Q120%2078%20110%2060%20Z%22%20fill%3D%22%2379c85f%22%2F%3E%3Cellipse%20cx%3D%220%22%20cy%3D%2234%22%20rx%3D%2296%22%20ry%3D%2240%22%20fill%3D%22%238ad46f%22%2F%3E%3Cpath%20d%3D%22M-96%2034%20Q-96%20-2%20-60%20-2%20L-40%20-2%20Q-30%2034%20-60%2044%20Q-96%2044%20-96%2034%20Z%22%20fill%3D%22%238ad46f%22%2F%3E%3Cellipse%20cx%3D%22-118%22%20cy%3D%2220%22%20rx%3D%2246%22%20ry%3D%2226%22%20fill%3D%22%238ad46f%22%2F%3E%3Cpath%20d%3D%22M-150%2030%20L-95%2022%20L-150%2040%20Z%22%20fill%3D%22%238ad46f%22%2F%3E%3Cg%20fill%3D%22%23f7fff2%22%3E%3Cpath%20d%3D%22M-150%2033%20l7%20-6%206%206%206%20-6%206%206%206%20-6%206%206%20z%22%2F%3E%3C%2Fg%3E%3Cellipse%20cx%3D%22-128%22%20cy%3D%22-2%22%20rx%3D%2215%22%20ry%3D%2216%22%20fill%3D%22%23ffffff%22%2F%3E%3Cellipse%20cx%3D%22-100%22%20cy%3D%22-4%22%20rx%3D%2215%22%20ry%3D%2216%22%20fill%3D%22%23ffffff%22%2F%3E%3Ccircle%20cx%3D%22-125%22%20cy%3D%220%22%20r%3D%226.5%22%20fill%3D%22%2325402a%22%2F%3E%3Ccircle%20cx%3D%22-103%22%20cy%3D%22-1%22%20r%3D%226.5%22%20fill%3D%22%2325402a%22%2F%3E%3Ccircle%20cx%3D%22-127%22%20cy%3D%22-2%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22-105%22%20cy%3D%22-3%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22-138%22%20cy%3D%2224%22%20r%3D%224.5%22%20fill%3D%22%233ba0a0%22%2F%3E%3Ccircle%20cx%3D%22-136%22%20cy%3D%2224%22%20r%3D%221.6%22%20fill%3D%22%231f2a2a%22%2F%3E%3Ccircle%20cx%3D%22-118%22%20cy%3D%2226%22%20r%3D%224.5%22%20fill%3D%22%233ba0a0%22%2F%3E%3Ccircle%20cx%3D%22-116%22%20cy%3D%2226%22%20r%3D%221.6%22%20fill%3D%22%231f2a2a%22%2F%3E%3Cpath%20d%3D%22M-118%2034%20Q-90%2046%20-62%2034%22%20fill%3D%22none%22%20stroke%3D%22%233c7a3a%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%3Cg%20fill%3D%22%235fa84a%22%3E%3Cpath%20d%3D%22M-20%20-6%20l8%20-12%208%2012%20z%22%2F%3E%3Cpath%20d%3D%22M12%20-8%20l8%20-12%208%2012%20z%22%2F%3E%3Cpath%20d%3D%22M44%20-6%20l8%20-12%208%2012%20z%22%2F%3E%3Cpath%20d%3D%22M76%200%20l7%20-10%207%2010%20z%22%2F%3E%3C%2Fg%3E%3Cellipse%20cx%3D%2260%22%20cy%3D%2266%22%20rx%3D%2215%22%20ry%3D%229%22%20fill%3D%22%236fbf57%22%2F%3E%3Cellipse%20cx%3D%2220%22%20cy%3D%2270%22%20rx%3D%2215%22%20ry%3D%229%22%20fill%3D%22%236fbf57%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E" }];
const DDB_SKINS = {"amazon1": {"name": "아마존", "map": {"calendar": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2294%22%20rx%3D%2254%22%20ry%3D%2230%22%20fill%3D%22%237cb342%22%2F%3E%3Cpath%20d%3D%22M22%2096%20l10%20-8%206%208%208%20-8%206%208%208%20-8%206%208%208%20-8%206%208%208%20-8%206%208%2010%20-8%22%20fill%3D%22%23fff%22%20opacity%3D%220.95%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2266%22%20rx%3D%2246%22%20ry%3D%2232%22%20fill%3D%22%238bc34a%22%2F%3E%3Cellipse%20cx%3D%2246%22%20cy%3D%2240%22%20rx%3D%2213%22%20ry%3D%2214%22%20fill%3D%22%238bc34a%22%2F%3E%3Cellipse%20cx%3D%2294%22%20cy%3D%2240%22%20rx%3D%2213%22%20ry%3D%2214%22%20fill%3D%22%238bc34a%22%2F%3E%3Ccircle%20cx%3D%2246%22%20cy%3D%2240%22%20r%3D%227%22%20fill%3D%22%232e2e2e%22%2F%3E%3Ccircle%20cx%3D%2294%22%20cy%3D%2240%22%20r%3D%227%22%20fill%3D%22%232e2e2e%22%2F%3E%3Ccircle%20cx%3D%2248%22%20cy%3D%2238%22%20r%3D%222.5%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2296%22%20cy%3D%2238%22%20r%3D%222.5%22%20fill%3D%22%23fff%22%2F%3E%3Cellipse%20cx%3D%2258%22%20cy%3D%2292%22%20rx%3D%223%22%20ry%3D%224%22%20fill%3D%22%234a5d23%22%2F%3E%3Cellipse%20cx%3D%2282%22%20cy%3D%2292%22%20rx%3D%223%22%20ry%3D%224%22%20fill%3D%22%234a5d23%22%2F%3E%3Cpath%20d%3D%22M55%2078%20Q70%2084%2085%2078%22%20stroke%3D%22%234a5d23%22%20stroke-width%3D%223%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E", "memo-1": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2246%22%20cy%3D%2248%22%20rx%3D%2213%22%20ry%3D%2214%22%20fill%3D%22%23a67c52%22%2F%3E%3Cellipse%20cx%3D%2294%22%20cy%3D%2248%22%20rx%3D%2213%22%20ry%3D%2214%22%20fill%3D%22%23a67c52%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2282%22%20rx%3D%2250%22%20ry%3D%2246%22%20fill%3D%22%23c49a6c%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%22100%22%20rx%3D%2234%22%20ry%3D%2223%22%20fill%3D%22%23dcbd91%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2292%22%20rx%3D%2211%22%20ry%3D%227.5%22%20fill%3D%22%235a4632%22%2F%3E%3Cpath%20d%3D%22M60%20106%20Q70%20114%2080%20106%22%20stroke%3D%22%235a4632%22%20stroke-width%3D%223%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2252%22%20cy%3D%2276%22%20r%3D%227%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2288%22%20cy%3D%2276%22%20r%3D%227%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2254%22%20cy%3D%2274%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2290%22%20cy%3D%2274%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Cg%20stroke%3D%22%234a3728%22%20stroke-width%3D%222.5%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%2252%22%20cy%3D%2276%22%20r%3D%2212%22%2F%3E%3Ccircle%20cx%3D%2288%22%20cy%3D%2276%22%20r%3D%2212%22%2F%3E%3Cline%20x1%3D%2264%22%20y1%3D%2276%22%20x2%3D%2276%22%20y2%3D%2276%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E", "memo-2": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2246%22%20cy%3D%2248%22%20rx%3D%2213%22%20ry%3D%2214%22%20fill%3D%22%23a67c52%22%2F%3E%3Cellipse%20cx%3D%2294%22%20cy%3D%2248%22%20rx%3D%2213%22%20ry%3D%2214%22%20fill%3D%22%23a67c52%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2282%22%20rx%3D%2250%22%20ry%3D%2246%22%20fill%3D%22%23c49a6c%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%22100%22%20rx%3D%2234%22%20ry%3D%2223%22%20fill%3D%22%23dcbd91%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2292%22%20rx%3D%2211%22%20ry%3D%227.5%22%20fill%3D%22%235a4632%22%2F%3E%3Cpath%20d%3D%22M60%20106%20Q70%20114%2080%20106%22%20stroke%3D%22%235a4632%22%20stroke-width%3D%223%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2252%22%20cy%3D%2276%22%20r%3D%227%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2288%22%20cy%3D%2276%22%20r%3D%227%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2254%22%20cy%3D%2274%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2290%22%20cy%3D%2274%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Cg%20stroke%3D%22%233b2b1a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%3E%3Cline%20x1%3D%2245%22%20y1%3D%2270%22%20x2%3D%2241%22%20y2%3D%2266%22%2F%3E%3Cline%20x1%3D%2252%22%20y1%3D%2268%22%20x2%3D%2252%22%20y2%3D%2263%22%2F%3E%3Cline%20x1%3D%2295%22%20y1%3D%2270%22%20x2%3D%2299%22%20y2%3D%2266%22%2F%3E%3Cline%20x1%3D%2288%22%20y1%3D%2268%22%20x2%3D%2288%22%20y2%3D%2263%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate%28101%2C40%29%22%3E%3Ccircle%20r%3D%225%22%20fill%3D%22%23ef5da8%22%2F%3E%3Ccircle%20cx%3D%22-7%22%20cy%3D%220%22%20r%3D%224%22%20fill%3D%22%23f48fb1%22%2F%3E%3Ccircle%20cx%3D%227%22%20cy%3D%220%22%20r%3D%224%22%20fill%3D%22%23f48fb1%22%2F%3E%3Ccircle%20cx%3D%220%22%20cy%3D%22-7%22%20r%3D%224%22%20fill%3D%22%23f48fb1%22%2F%3E%3Ccircle%20cx%3D%220%22%20cy%3D%227%22%20r%3D%224%22%20fill%3D%22%23f48fb1%22%2F%3E%3Ccircle%20r%3D%223%22%20fill%3D%22%23ffd54f%22%2F%3E%3C%2Fg%3E%3Cellipse%20cx%3D%2240%22%20cy%3D%2290%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%23f48fb1%22%20opacity%3D%220.5%22%2F%3E%3Cellipse%20cx%3D%22100%22%20cy%3D%2290%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%23f48fb1%22%20opacity%3D%220.5%22%2F%3E%3C%2Fsvg%3E", "memo-3": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2252%22%20cy%3D%2256%22%20rx%3D%2210%22%20ry%3D%2211%22%20fill%3D%22%23c39b6f%22%2F%3E%3Cellipse%20cx%3D%2288%22%20cy%3D%2256%22%20rx%3D%2210%22%20ry%3D%2211%22%20fill%3D%22%23c39b6f%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2284%22%20rx%3D%2240%22%20ry%3D%2238%22%20fill%3D%22%23e0c199%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2298%22%20rx%3D%2227%22%20ry%3D%2218%22%20fill%3D%22%23f0dcbb%22%2F%3E%3Ccircle%20cx%3D%2256%22%20cy%3D%2280%22%20r%3D%226%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2284%22%20cy%3D%2280%22%20r%3D%226%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2258%22%20cy%3D%2278%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2286%22%20cy%3D%2278%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2293%22%20rx%3D%228%22%20ry%3D%225.5%22%20fill%3D%22%237a5c3e%22%2F%3E%3Cellipse%20cx%3D%2249%22%20cy%3D%2290%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%23f8a5c2%22%20opacity%3D%220.6%22%2F%3E%3Cellipse%20cx%3D%2291%22%20cy%3D%2290%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%23f8a5c2%22%20opacity%3D%220.6%22%2F%3E%3C%2Fsvg%3E", "memo-4": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2266%22%20cy%3D%2296%22%20rx%3D%2234%22%20ry%3D%2226%22%20fill%3D%22%23fdfdff%22%2F%3E%3Cpath%20d%3D%22M60%2078%20Q54%2046%2066%2034%22%20stroke%3D%22%23fdfdff%22%20stroke-width%3D%2215%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2270%22%20cy%3D%2230%22%20r%3D%2215%22%20fill%3D%22%23fdfdff%22%2F%3E%3Cpath%20d%3D%22M83%2030%20l16%204%20-16%205%20z%22%20fill%3D%22%23ff9800%22%2F%3E%3Ccircle%20cx%3D%2272%22%20cy%3D%2227%22%20r%3D%224%22%20fill%3D%22%232e2e2e%22%2F%3E%3Ccircle%20cx%3D%2273.5%22%20cy%3D%2225.5%22%20r%3D%221.5%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M84%2034%20q10%20-3%2016%202%22%20stroke%3D%22%23ffd54f%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20opacity%3D%220.7%22%2F%3E%3Cline%20x1%3D%2260%22%20y1%3D%22120%22%20x2%3D%2258%22%20y2%3D%22134%22%20stroke%3D%22%23ffb300%22%20stroke-width%3D%223%22%2F%3E%3Cline%20x1%3D%2274%22%20y1%3D%22120%22%20x2%3D%2276%22%20y2%3D%22134%22%20stroke%3D%22%23ffb300%22%20stroke-width%3D%223%22%2F%3E%3Cellipse%20cx%3D%2284%22%20cy%3D%2298%22%20rx%3D%2214%22%20ry%3D%2218%22%20fill%3D%22%23f4f4f8%22%2F%3E%3C%2Fsvg%3E", "memo-5": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2294%22%20rx%3D%2254%22%20ry%3D%2230%22%20fill%3D%22%237cb342%22%2F%3E%3Cpath%20d%3D%22M22%2096%20l10%20-8%206%208%208%20-8%206%208%208%20-8%206%208%208%20-8%206%208%208%20-8%206%208%2010%20-8%22%20fill%3D%22%23fff%22%20opacity%3D%220.95%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2266%22%20rx%3D%2246%22%20ry%3D%2232%22%20fill%3D%22%238bc34a%22%2F%3E%3Cellipse%20cx%3D%2246%22%20cy%3D%2240%22%20rx%3D%2213%22%20ry%3D%2214%22%20fill%3D%22%238bc34a%22%2F%3E%3Cellipse%20cx%3D%2294%22%20cy%3D%2240%22%20rx%3D%2213%22%20ry%3D%2214%22%20fill%3D%22%238bc34a%22%2F%3E%3Ccircle%20cx%3D%2246%22%20cy%3D%2240%22%20r%3D%227%22%20fill%3D%22%232e2e2e%22%2F%3E%3Ccircle%20cx%3D%2294%22%20cy%3D%2240%22%20r%3D%227%22%20fill%3D%22%232e2e2e%22%2F%3E%3Ccircle%20cx%3D%2248%22%20cy%3D%2238%22%20r%3D%222.5%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2296%22%20cy%3D%2238%22%20r%3D%222.5%22%20fill%3D%22%23fff%22%2F%3E%3Cellipse%20cx%3D%2258%22%20cy%3D%2292%22%20rx%3D%223%22%20ry%3D%224%22%20fill%3D%22%234a5d23%22%2F%3E%3Cellipse%20cx%3D%2282%22%20cy%3D%2292%22%20rx%3D%223%22%20ry%3D%224%22%20fill%3D%22%234a5d23%22%2F%3E%3Cpath%20d%3D%22M55%2078%20Q70%2084%2085%2078%22%20stroke%3D%22%234a5d23%22%20stroke-width%3D%223%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E", "dday": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2266%22%20cy%3D%2296%22%20rx%3D%2234%22%20ry%3D%2226%22%20fill%3D%22%23fdfdff%22%2F%3E%3Cpath%20d%3D%22M60%2078%20Q54%2046%2066%2034%22%20stroke%3D%22%23fdfdff%22%20stroke-width%3D%2215%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2270%22%20cy%3D%2230%22%20r%3D%2215%22%20fill%3D%22%23fdfdff%22%2F%3E%3Cpath%20d%3D%22M83%2030%20l16%204%20-16%205%20z%22%20fill%3D%22%23ff9800%22%2F%3E%3Ccircle%20cx%3D%2272%22%20cy%3D%2227%22%20r%3D%224%22%20fill%3D%22%232e2e2e%22%2F%3E%3Ccircle%20cx%3D%2273.5%22%20cy%3D%2225.5%22%20r%3D%221.5%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M84%2034%20q10%20-3%2016%202%22%20stroke%3D%22%23ffd54f%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20opacity%3D%220.7%22%2F%3E%3Cline%20x1%3D%2260%22%20y1%3D%22120%22%20x2%3D%2258%22%20y2%3D%22134%22%20stroke%3D%22%23ffb300%22%20stroke-width%3D%223%22%2F%3E%3Cline%20x1%3D%2274%22%20y1%3D%22120%22%20x2%3D%2276%22%20y2%3D%22134%22%20stroke%3D%22%23ffb300%22%20stroke-width%3D%223%22%2F%3E%3Cellipse%20cx%3D%2284%22%20cy%3D%2298%22%20rx%3D%2214%22%20ry%3D%2218%22%20fill%3D%22%23f4f4f8%22%2F%3E%3C%2Fsvg%3E", "todo": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2252%22%20cy%3D%2256%22%20rx%3D%2210%22%20ry%3D%2211%22%20fill%3D%22%23c39b6f%22%2F%3E%3Cellipse%20cx%3D%2288%22%20cy%3D%2256%22%20rx%3D%2210%22%20ry%3D%2211%22%20fill%3D%22%23c39b6f%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2284%22%20rx%3D%2240%22%20ry%3D%2238%22%20fill%3D%22%23e0c199%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2298%22%20rx%3D%2227%22%20ry%3D%2218%22%20fill%3D%22%23f0dcbb%22%2F%3E%3Ccircle%20cx%3D%2256%22%20cy%3D%2280%22%20r%3D%226%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2284%22%20cy%3D%2280%22%20r%3D%226%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2258%22%20cy%3D%2278%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2286%22%20cy%3D%2278%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2293%22%20rx%3D%228%22%20ry%3D%225.5%22%20fill%3D%22%237a5c3e%22%2F%3E%3Cellipse%20cx%3D%2249%22%20cy%3D%2290%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%23f8a5c2%22%20opacity%3D%220.6%22%2F%3E%3Cellipse%20cx%3D%2291%22%20cy%3D%2290%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%23f8a5c2%22%20opacity%3D%220.6%22%2F%3E%3C%2Fsvg%3E", "todo-view": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%20140%22%3E%3Cellipse%20cx%3D%2252%22%20cy%3D%2256%22%20rx%3D%2210%22%20ry%3D%2211%22%20fill%3D%22%23c39b6f%22%2F%3E%3Cellipse%20cx%3D%2288%22%20cy%3D%2256%22%20rx%3D%2210%22%20ry%3D%2211%22%20fill%3D%22%23c39b6f%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2284%22%20rx%3D%2240%22%20ry%3D%2238%22%20fill%3D%22%23e0c199%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2298%22%20rx%3D%2227%22%20ry%3D%2218%22%20fill%3D%22%23f0dcbb%22%2F%3E%3Ccircle%20cx%3D%2256%22%20cy%3D%2280%22%20r%3D%226%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2284%22%20cy%3D%2280%22%20r%3D%226%22%20fill%3D%22%233b2b1a%22%2F%3E%3Ccircle%20cx%3D%2258%22%20cy%3D%2278%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2286%22%20cy%3D%2278%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3Cellipse%20cx%3D%2270%22%20cy%3D%2293%22%20rx%3D%228%22%20ry%3D%225.5%22%20fill%3D%22%237a5c3e%22%2F%3E%3Cellipse%20cx%3D%2249%22%20cy%3D%2290%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%23f8a5c2%22%20opacity%3D%220.6%22%2F%3E%3Cellipse%20cx%3D%2291%22%20cy%3D%2290%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%23f8a5c2%22%20opacity%3D%220.6%22%2F%3E%3C%2Fsvg%3E"}}};

const DDB_COUNTRIES = {
    kr: { n: "🇰🇷 한국", cities: {
        seoul: { n: "서울", la: 37.57, lo: 126.98 }, busan: { n: "부산", la: 35.18, lo: 129.08 }, incheon: { n: "인천", la: 37.46, lo: 126.71 }, daegu: { n: "대구", la: 35.87, lo: 128.60 }, daejeon: { n: "대전", la: 36.35, lo: 127.38 }, gwangju: { n: "광주", la: 35.16, lo: 126.85 }, ulsan: { n: "울산", la: 35.54, lo: 129.31 }, sejong: { n: "세종", la: 36.48, lo: 127.29 }, suwon: { n: "수원", la: 37.26, lo: 127.03 }, seongnam: { n: "성남", la: 37.42, lo: 127.13 }, yongin: { n: "용인", la: 37.24, lo: 127.18 }, goyang: { n: "고양", la: 37.66, lo: 126.83 }, bucheon: { n: "부천", la: 37.50, lo: 126.77 }, ansan: { n: "안산", la: 37.32, lo: 126.83 }, anyang: { n: "안양", la: 37.39, lo: 126.93 }, namyangju: { n: "남양주", la: 37.64, lo: 127.22 }, hwaseong: { n: "화성", la: 37.20, lo: 126.83 }, pyeongtaek: { n: "평택", la: 36.99, lo: 127.11 }, uijeongbu: { n: "의정부", la: 37.74, lo: 127.03 }, paju: { n: "파주", la: 37.76, lo: 126.78 }, gimpo: { n: "김포", la: 37.62, lo: 126.72 }, icheon: { n: "이천", la: 37.27, lo: 127.44 }, chuncheon: { n: "춘천", la: 37.88, lo: 127.73 }, wonju: { n: "원주", la: 37.34, lo: 127.92 }, gangneung: { n: "강릉", la: 37.75, lo: 128.90 }, cheongju: { n: "청주", la: 36.64, lo: 127.49 }, cheonan: { n: "천안", la: 36.82, lo: 127.11 }, jeonju: { n: "전주", la: 35.82, lo: 127.15 }, pohang: { n: "포항", la: 36.02, lo: 129.37 }, changwon: { n: "창원", la: 35.23, lo: 128.68 }, jeju: { n: "제주", la: 33.51, lo: 126.52 }
    } },
    us: { n: "🇺🇸 United States", cities: {
        newyork: { n: "New York", la: 40.71, lo: -74.01 }, losangeles: { n: "Los Angeles", la: 34.05, lo: -118.24 }, chicago: { n: "Chicago", la: 41.88, lo: -87.63 }, houston: { n: "Houston", la: 29.76, lo: -95.37 }, phoenix: { n: "Phoenix", la: 33.45, lo: -112.07 }, sanfrancisco: { n: "San Francisco", la: 37.77, lo: -122.42 }, seattle: { n: "Seattle", la: 47.61, lo: -122.33 }, miami: { n: "Miami", la: 25.76, lo: -80.19 }, boston: { n: "Boston", la: 42.36, lo: -71.06 }, washington: { n: "Washington DC", la: 38.90, lo: -77.04 }, lasvegas: { n: "Las Vegas", la: 36.17, lo: -115.14 }, atlanta: { n: "Atlanta", la: 33.75, lo: -84.39 }
    } },
    jp: { n: "🇯🇵 日本", cities: {
        tokyo: { n: "東京 Tokyo", la: 35.68, lo: 139.69 }, osaka: { n: "大阪 Osaka", la: 34.69, lo: 135.50 }, kyoto: { n: "京都 Kyoto", la: 35.01, lo: 135.77 }, yokohama: { n: "横浜 Yokohama", la: 35.44, lo: 139.64 }, nagoya: { n: "名古屋 Nagoya", la: 35.18, lo: 136.91 }, sapporo: { n: "札幌 Sapporo", la: 43.06, lo: 141.35 }, fukuoka: { n: "福岡 Fukuoka", la: 33.59, lo: 130.40 }, kobe: { n: "神戸 Kobe", la: 34.69, lo: 135.20 }, okinawa: { n: "沖縄 Okinawa", la: 26.21, lo: 127.68 }
    } },
    cn: { n: "🇨🇳 中国", cities: {
        beijing: { n: "北京 Beijing", la: 39.90, lo: 116.41 }, shanghai: { n: "上海 Shanghai", la: 31.23, lo: 121.47 }, guangzhou: { n: "广州 Guangzhou", la: 23.13, lo: 113.26 }, shenzhen: { n: "深圳 Shenzhen", la: 22.54, lo: 114.06 }, chengdu: { n: "成都 Chengdu", la: 30.57, lo: 104.07 }, hongkong: { n: "香港 Hong Kong", la: 22.32, lo: 114.17 }
    } },
    gb: { n: "🇬🇧 United Kingdom", cities: {
        london: { n: "London", la: 51.51, lo: -0.13 }, manchester: { n: "Manchester", la: 53.48, lo: -2.24 }, birmingham: { n: "Birmingham", la: 52.49, lo: -1.89 }, edinburgh: { n: "Edinburgh", la: 55.95, lo: -3.19 }, liverpool: { n: "Liverpool", la: 53.41, lo: -2.99 }
    } },
    de: { n: "🇩🇪 Deutschland", cities: {
        berlin: { n: "Berlin", la: 52.52, lo: 13.40 }, munich: { n: "München", la: 48.14, lo: 11.58 }, hamburg: { n: "Hamburg", la: 53.55, lo: 9.99 }, frankfurt: { n: "Frankfurt", la: 50.11, lo: 8.68 }, cologne: { n: "Köln", la: 50.94, lo: 6.96 }
    } },
    fr: { n: "🇫🇷 France", cities: {
        paris: { n: "Paris", la: 48.86, lo: 2.35 }, marseille: { n: "Marseille", la: 43.30, lo: 5.37 }, lyon: { n: "Lyon", la: 45.76, lo: 4.84 }, nice: { n: "Nice", la: 43.70, lo: 7.27 }, toulouse: { n: "Toulouse", la: 43.60, lo: 1.44 }
    } },
    vn: { n: "🇻🇳 Việt Nam", cities: {
        hanoi: { n: "Hà Nội", la: 21.03, lo: 105.85 }, hcmc: { n: "Hồ Chí Minh", la: 10.82, lo: 106.63 }, danang: { n: "Đà Nẵng", la: 16.05, lo: 108.20 }
    } },
    th: { n: "🇹🇭 ไทย", cities: {
        bangkok: { n: "Bangkok", la: 13.76, lo: 100.50 }, chiangmai: { n: "Chiang Mai", la: 18.79, lo: 98.99 }, phuket: { n: "Phuket", la: 7.88, lo: 98.39 }
    } },
    au: { n: "🇦🇺 Australia", cities: {
        sydney: { n: "Sydney", la: -33.87, lo: 151.21 }, melbourne: { n: "Melbourne", la: -37.81, lo: 144.96 }, brisbane: { n: "Brisbane", la: -27.47, lo: 153.03 }, perth: { n: "Perth", la: -31.95, lo: 115.86 }
    } }
};

function ddbCity(country, city) {
    const co = DDB_COUNTRIES[country] || DDB_COUNTRIES.kr;
    return co.cities[city] || Object.values(co.cities)[0]
}

function wxEmoji(code) {
    if (code === 0) return "☀️";
    if (code <= 2) return "🌤️";
    if (code === 3) return "☁️";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌦️";
    if (code <= 86) return "🌨️";
    return "⛈️"
}

function WX(props) {
    const city = props.city, country = props.country || "kr", [d, setD] = O.useState(null), [err, setErr] = O.useState(!1);
    const { state: wxState, dispatch: wxDispatch } = vt();
    const [pick, setPick] = O.useState(!1);
    const [pkCountry, setPkCountry] = O.useState(props.country || "kr");
    const [pickPos, setPickPos] = O.useState(null);
    const chipRef = O.useRef(null);
    function openPick() { const r = chipRef.current && chipRef.current.getBoundingClientRect(); if (r) setPickPos({ left: Math.max(8, Math.min(r.left, (window.innerWidth || 800) - 224)), top: r.bottom + 4 }); setPkCountry(country); setPick(!0); }
    function pickWeather(cc, ci) { const w = (wxState.settings && wxState.settings.weather) || {}; wxDispatch({ type: "UPDATE_SETTINGS", settings: { weather: { ...w, country: cc, city: ci } } }); setPick(!1); }
    function wxPicker() { return Rr.createPortal(o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "fixed inset-0", style: { zIndex: 2147483646 }, onClick: () => setPick(!1) }), o.jsxs("div", { className: "fixed w-56 rounded-lg shadow-2xl p-2 flex flex-col gap-2", style: { zIndex: 2147483647, left: (pickPos ? pickPos.left : 40) + "px", top: (pickPos ? pickPos.top : 40) + "px", backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.18)" }, children: [o.jsx("div", { className: "flex flex-wrap gap-1", children: Object.keys(DDB_COUNTRIES).map(ck => o.jsx("button", { className: "px-1.5 py-0.5 rounded text-[11px] cursor-pointer border-none " + (pkCountry === ck ? "bg-blue-500 text-white" : "bg-white/10 text-white/70"), onClick: () => setPkCountry(ck), children: DDB_COUNTRIES[ck].n }, ck)) }), o.jsx("div", { className: "grid grid-cols-3 gap-1 max-h-44 overflow-y-auto", children: Object.keys(DDB_COUNTRIES[pkCountry].cities).map(cik => o.jsx("button", { className: "px-1 py-1 rounded text-[11px] cursor-pointer border-none truncate " + (pkCountry === country && cik === city ? "bg-teal-600 text-white" : "bg-white/6 text-white/70 hover:bg-white/15"), onClick: () => pickWeather(pkCountry, cik), children: DDB_COUNTRIES[pkCountry].cities[cik].n }, cik)) })] })] }), document.body) }
    O.useEffect(() => {
        const c = ddbCity(country, city), key = "ddb_wx_" + country + "_" + city;
        try {
            const cached = JSON.parse(localStorage.getItem(key) || "null");
            if (cached && Date.now() - cached.t < 36e5) { setD(cached.d); return }
        } catch {}
        let live = !0;
        fetch("https://api.open-meteo.com/v1/forecast?latitude=" + c.la + "&longitude=" + c.lo + "&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7").then(r => r.json()).then(j => {
            if (!live || !j.daily) return;
            const arr = j.daily.time.map((t, i) => ({ t, c: j.daily.weather_code[i], hi: Math.round(j.daily.temperature_2m_max[i]), lo: Math.round(j.daily.temperature_2m_min[i]) }));
            setD(arr);
            try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), d: arr })) } catch {}
        }).catch(() => live && setErr(!0));
        return () => { live = !1 }
    }, [city, country]);
    if (err) return o.jsx("div", { className: "px-2 py-1 text-[10px] text-white/30 text-center flex-shrink-0", children: DDBTR("날씨 정보를 불러올 수 없습니다 (인터넷 확인)") });
    if (!d) return o.jsx("div", { className: "px-2 py-1 text-[10px] text-white/30 text-center flex-shrink-0", children: DDBTR("날씨 불러오는 중...") });
    if (props.compact) { const cinfo = ddbCity(country, city), cname = (cinfo && cinfo.n) || city; return o.jsxs("div", {
        className: "flex items-center gap-1.5 overflow-x-auto scrollbar-hide",
        children: [o.jsxs("button", { ref: chipRef, className: "flex items-center gap-0.5 flex-shrink-0 px-1.5 py-0.5 rounded hover:bg-white/15 bg-white/8 text-[10px] text-white/80 whitespace-nowrap cursor-pointer border-none", title: DDBTR("지역 변경"), onClick: () => pick ? setPick(!1) : openPick(), children: [o.jsx("span", { className: "text-[9px]", children: "📍" }), o.jsx("span", { children: cname }), o.jsx("span", { className: "text-white/40 text-[8px]", children: "▾" })] }),
        o.jsx("div", { className: "flex items-center gap-2 overflow-x-auto scrollbar-hide", children: d.map((w, i) => o.jsxs("div", {
            className: "flex items-center gap-0.5 flex-shrink-0 px-1 rounded " + (i === 0 ? "bg-white/10" : ""),
            title: w.t,
            children: [o.jsx("span", { className: "text-[9px] text-white/50", children: i === 0 ? DDBTR("오늘") : WTA()[new Date(w.t).getDay()] }), o.jsx("span", { className: "text-xs leading-none", children: wxEmoji(w.c) }), o.jsxs("span", { className: "text-[9px]", children: [o.jsxs("span", { className: "text-red-300", children: [w.hi, "°"] }), o.jsxs("span", { className: "text-blue-300", children: [w.lo] })] })]
        }, w.t)) }),
        pick && wxPicker()]
    }); }
    const cinfo2 = ddbCity(country, city), cname2 = (cinfo2 && cinfo2.n) || city;
    return o.jsxs("div", {
        className: "flex items-stretch gap-1 px-2 py-1 border-b border-white/10 flex-shrink-0 overflow-x-auto",
        children: [o.jsxs("button", { ref: chipRef, className: "flex flex-col items-center justify-center flex-shrink-0 px-1.5 rounded hover:bg-white/15 bg-white/8 text-[10px] text-white/80 whitespace-nowrap cursor-pointer border-none", title: DDBTR("지역 변경"), onClick: () => pick ? setPick(!1) : openPick(), children: [o.jsx("span", { className: "text-[11px]", children: "📍" }), o.jsx("span", { className: "text-[9px] max-w-[52px] truncate", children: cname2 })] }), pick && wxPicker(), ...d.map((w, i) => {
            const dt = new Date(w.t), wd = WTA()[dt.getDay()];
            return o.jsxs("div", {
                className: "flex flex-col items-center flex-1 min-w-[42px] rounded " + (i === 0 ? "bg-white/10" : ""),
                title: w.t,
                children: [o.jsx("span", { className: "text-[9px] text-white/50", children: i === 0 ? "오늘" : wd }), o.jsx("span", { className: "text-sm leading-none my-0.5", children: wxEmoji(w.c) }), o.jsxs("span", { className: "text-[9px] text-white/70", children: [o.jsxs("span", { className: "text-red-300", children: [w.hi, "°"] }), " ", o.jsxs("span", { className: "text-blue-300", children: [w.lo, "°"] })] })]
            }, w.t)
        })]
    })
}
const WT = ["일", "월", "화", "수", "목", "금", "토"];

function fd({
    onTodo: e
} = {}) {
    const {
        state: t,
        goToMonth: r,
        dispatch: n
    } = vt(), {
        currentYear: s,
        currentMonth: a,
        events: i,
        fontSize: l,
        settings: c
    } = t, u = c.calHeaderFontSize ?? l + 3, h = c.calDateFontSize ?? l, [d, f] = O.useState(!1), [x, p] = O.useState(null), [m, y] = O.useState(""), [w, v] = O.useState(null), [g, _] = O.useState(!1), k = c.showCalGrid ?? !0, E = () => n({
        type: "UPDATE_SETTINGS",
        settings: {
            showCalGrid: !k
        }
    }), [b, T] = O.useState(!0), [A, H] = O.useState(!1), [F, R] = O.useState(!1), [K, se] = O.useState("all"), z = (t.todos ?? []).slice().sort((S, D) => S.order - D.order), G = z.filter(S => !S.completedAt), re = z.filter(S => !!S.completedAt), Y = S => {
        if (!S) return "—";
        const D = new Date(S);
        return `${String(D.getMonth()+1).padStart(2,"0")}.${String(D.getDate()).padStart(2,"0")} ${String(D.getHours()).padStart(2,"0")}:${String(D.getMinutes()).padStart(2,"0")}`
    }, M = c.todoCols ?? {}, X = M.showOrder !== !1, ce = M.showCreatedAt !== !1, j = M.showCompletedAt !== !1, [q, U] = O.useState([new Date().getMonth() + 1]), [B, W] = O.useState({
        start: null,
        end: null
    }), [te, he] = O.useState(null), [ne, ue] = O.useState(null), de = O.useRef(), [N, V] = O.useState(null), ae = O.useRef(null), ve = O.useRef(!1), Te = O.useRef(null), xe = O.useRef(null), Me = O.useRef(), Fe = O.useRef(), [me, oe] = O.useState(!1), [fe, Ne] = O.useState(null), [We, Je] = O.useState(null), [Gt, nr] = O.useState(null), nt = O.useRef(), mr = t.feedbackMemos ?? [], Le = t.settings.feedbackThresholds ?? iu, et = mr.filter(S => !S.isDismissed).slice(0, 3), [Kt, tt] = O.useState(null), [Wo, Do_] = O.useState(!1), [Ki, Ko] = O.useState(null), [Xi, Xo] = O.useState(null), [Pv, Pw_] = O.useState(!1), [Ceo, CeoS] = O.useState(!1), It = mr.find(S => S.id === Kt) ?? null;
    const [teamOn, setTeamOn] = O.useState(!1);
    const [doGeo, setDoGeo] = O.useState(() => ({ x: (typeof window !== "undefined" ? window.innerWidth : 1200) - 300, y: 88, w: 280, h: 340 }));
    const doDrag = R => { if (R.target.closest && (R.target.closest("button") || R.target.closest("input"))) return; R.preventDefault(); const sx = R.clientX, sy = R.clientY, ox = doGeo.x, oy = doGeo.y; const mm = ev => setDoGeo(g => ({ ...g, x: ox + (ev.clientX - sx), y: Math.max(0, oy + (ev.clientY - sy)) })); const mu = () => { document.removeEventListener("mousemove", mm); document.removeEventListener("mouseup", mu) }; document.addEventListener("mousemove", mm); document.addEventListener("mouseup", mu) };
    const doResize = R => { R.preventDefault(); R.stopPropagation(); const sx = R.clientX, sy = R.clientY, ow = doGeo.w, oh = doGeo.h; const mm = ev => setDoGeo(g => ({ ...g, w: Math.max(220, ow + (ev.clientX - sx)), h: Math.max(160, oh + (ev.clientY - sy)) })); const mu = () => { document.removeEventListener("mousemove", mm); document.removeEventListener("mouseup", mu) }; document.addEventListener("mousemove", mm); document.addEventListener("mouseup", mu) };
    const [msGeo, setMsGeo] = O.useState(() => ({ x: Math.round(((typeof window !== "undefined" ? window.innerWidth : 1200) - 300) / 2), y: 120, w: 300, h: 250 }));
    const _msdh = ddbDragH(() => msGeo, setMsGeo);
    const [teamEv, setTeamEv] = O.useState([]);
    const [teamMeta, setTeamMeta] = O.useState(() => { try { return JSON.parse(localStorage.getItem("ddb_active_team") || "null") } catch { return null } });
    const { user: ddbAuthUser } = pw();
    const [shareDay, setShareDay] = O.useState(null);
    const [shareToast, setShareToast] = O.useState("");
    const [monShare, setMonShare] = O.useState(!1);
    const [, _shForce] = O.useReducer(x => x + 1, 0);
    const _shOwnerId = O.useRef(0);
    O.useEffect(() => { const un = DDBShareStore.sub(_shForce); _shOwnerId.current = DDBShareStore.claim(); return () => { un(); DDBShareStore.release(_shOwnerId.current); }; }, []);
    const shareSel = DDBShareStore.sel;
    const setShareSel = v => DDBShareStore.setSel(v);
    const shGeo = DDBShareStore.geo;
    const setShGeo = v => DDBShareStore.setGeo(v);
    const _iAmShareOwner = DDBShareStore.owner === _shOwnerId.current;
    const _shdh = ddbDragH(() => shGeo, setShGeo);
    const _shPaint = O.useRef(false);
    const _shTimer = O.useRef(null);
    const [navYear, setNavYear] = O.useState(() => new Date().getFullYear());
    O.useEffect(() => { const up = () => { clearTimeout(_shTimer.current); _shPaint.current = false; }; document.addEventListener("mouseup", up); return () => document.removeEventListener("mouseup", up); }, []);
    O.useEffect(() => { const h = () => setShareSel([]); window.addEventListener("ddb-open-share", h); return () => window.removeEventListener("ddb-open-share", h); }, []);
    const [teamPick, setTeamPick] = O.useState(null);
    function ddbActivateTeam(tm) { const mm = { team_id: tm.team_id, name: tm.name, role: tm.role, is_owner: tm.is_owner, level: tm.level, caps: tm.caps }; try { localStorage.setItem("ddb_active_team", JSON.stringify(mm)) } catch {} setTeamMeta(mm); window.dispatchEvent(new CustomEvent("ddb-team-active")) }
    async function ddbTeamToggle() {
        const teamOnly = !!t.settings.teamOnly, wasOn = teamOn;
        if (wasOn && !teamOnly) { setTeamOn(!1); return }
        const cc = $a();
        if (!cc || !ddbAuthUser) { window.dispatchEvent(new CustomEvent("ddb-team-open")); return }
        let list = [];
        try { const { data } = await cc.rpc("my_teams"); list = Array.isArray(data) ? data : JSON.parse(data || "[]") } catch {}
        if (!list.length) { window.dispatchEvent(new CustomEvent("ddb-team-open")); return }
        if (list.length === 1) { ddbActivateTeam(list[0]); setTeamOn(!0); return }
        if (t.settings.teamAlwaysPick) { setTeamPick(list); return }
        if (wasOn) { const ix = teamMeta ? list.findIndex(z => z.team_id === teamMeta.team_id) : -1; ddbActivateTeam(list[(ix + 1) % list.length]); setTeamOn(!0); return }
        if (teamMeta && list.some(z => z.team_id === teamMeta.team_id)) { setTeamOn(!0); return }
        ddbActivateTeam(list[0]); setTeamOn(!0)
    }
    O.useEffect(() => { if (t.settings.teamOnly && teamMeta && !teamOn) setTeamOn(!0) }, []);
    O.useEffect(() => { window.__ddbUID = ddbAuthUser && ddbAuthUser.id; window.__ddbTeamCtx = { on: teamOn, meta: teamMeta, role: teamMeta && teamMeta.role, caps: teamMeta && teamMeta.caps, uid: ddbAuthUser && ddbAuthUser.id } }, [teamOn, teamMeta, ddbAuthUser]);
    async function ddbLoadTeamEv() { const cc = $a(); if (!cc || !teamMeta) { setTeamEv([]); return } try { const { data } = await cc.from("team_events").select("id,data").eq("team_id", teamMeta.team_id); setTeamEv((data || []).map(rr => ({ id: rr.id, ...rr.data, _team: 1 }))) } catch { setTeamEv([]) } }
    O.useEffect(() => { const hh = () => { try { const m = JSON.parse(localStorage.getItem("ddb_active_team") || "null"); setTeamMeta(m); if (!m) setTeamOn(!1) } catch {} }; return window.addEventListener("ddb-team-active", hh), () => window.removeEventListener("ddb-team-active", hh) }, []);
    O.useEffect(() => { teamOn && ddbLoadTeamEv() }, [teamOn, teamMeta]);
    O.useEffect(() => { if (!teamOn || !teamMeta) return; const cc = $a(); if (!cc) return; const ch = cc.channel("cal-team-" + teamMeta.team_id + "-" + Math.random().toString(36).slice(2)).on("postgres_changes", { event: "*", schema: "public", table: "team_events", filter: "team_id=eq." + teamMeta.team_id }, () => ddbLoadTeamEv()).subscribe(); return () => { try { cc.removeChannel(ch) } catch {} } }, [teamOn, teamMeta]);

    function xs(S) {
        const D = Math.max(0, Math.floor((Date.now() - new Date(S.createdAt).getTime()) / 864e5)),
            J = [...Le].sort((le, Q) => Q.minDays - le.minDays);
        return J.find(le => D >= le.minDays) ?? J[J.length - 1]
    }

    function Ra(S) {
        return Math.max(0, Math.floor((Date.now() - new Date(S.createdAt).getTime()) / 864e5))
    }
    O.useEffect(() => {
        function S(D) {
            D.key === "Escape" && he(null)
        }
        return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S)
    }, []), O.useEffect(() => {
        f(!1), P0(s, a).then(() => f(!0));
        const S = a === 1 ? {
                y: s - 1,
                m: 12
            } : {
                y: s,
                m: a - 1
            },
            D = a === 12 ? {
                y: s + 1,
                m: 1
            } : {
                y: s,
                m: a + 1
            };
        P0(S.y, S.m), P0(D.y, D.m)
    }, [s, a]), O.useEffect(() => {
        function S() {
            if (!ae.current) return;
            const D = ve.current,
                J = Te.current,
                le = xe.current;
            if (ae.current = null, ve.current = !1, Te.current = null, xe.current = null, W({
                    start: null,
                    end: null
                }), clearTimeout(Me.current), D && J && le) {
                const [Q, ee] = J <= le ? [J, le] : [le, J];
                p(Q), y(Q === ee ? "" : ee), v(null), _(!0)
            }
        }
        return window.addEventListener("mouseup", S), () => window.removeEventListener("mouseup", S)
    }, []);
    const finEvents = O.useMemo(() => {
        const out = [], LL = t.loans || [], SS = t.savings || [];
        for (let mm = 1; mm <= 12; mm++) {
            const ym = `${s}-${String(mm).padStart(2,"0")}`;
            LL.forEach(xx => {
                const sc = LT(xx, ym);
                if (sc) {
                    const dd = Math.min(28, xx.payDay || Number((xx.startDate || "").slice(8, 10)) || 1);
                    out.push({ id: xx.id + "@" + ym, date: `${ym}-${String(dd).padStart(2,"0")}`, title: xx.title, color: xx.color, isAllDay: !0, amount: -sc.payment, memo: `납부 ${fn(sc.payment)}원 · 잔액 ${fn(sc.balance)}원`, _loanId: xx.id })
                }
            });
            SS.forEach(xx => {
                const sc = BT(xx, ym);
                if (sc) {
                    const dd = Math.min(28, xx.payDay || Number((xx.startDate || "").slice(8, 10)) || 1);
                    out.push({ id: xx.id + "@" + ym, date: `${ym}-${String(dd).padStart(2,"0")}`, title: (xx.subtype === "savings" ? "📈" : "💹") + " " + xx.title, color: xx.color, isAllDay: !0, amount: -sc.deposit, memo: `납입 ${fn(sc.deposit)}원 · 누적 ${fn(sc.accumulated)}원`, _savingsId: xx.id })
                }
            })
        }
        return out
    }, [t.loans, t.savings, s]);
    const qs = O.useCallback(dt => teamOn ? teamEv.filter(D => Df(dt, D.date, D.endDate)) : [...i.filter(D => D.repeat ? Ff(D.date, dt, D.repeat) : Df(dt, D.date, D.endDate)), ...finEvents.filter(fe => fe.date === dt)], [i, finEvents, teamOn, teamEv]),
        Oa = O.useCallback((S, D) => !S.endDate || S.date === S.endDate ? "single" : D === S.date ? "start" : D === S.endDate ? "end" : "middle", []);

    function Ii() {
        a === 1 ? r(s - 1, 12) : r(s, a - 1)
    }

    function Pi() {
        a === 12 ? r(s + 1, 1) : r(s, a + 1)
    }
    const zu = dd(s, a),
        Sl = OT(s, a),
        Da = _w(new Date),
        Hu = dd(s, a === 1 ? 12 : a - 1),
        [Wu, Vu] = a === 1 ? [s - 1, 12] : [s, a - 1],
        [Gu, Ku] = a === 12 ? [s + 1, 1] : [s, a + 1],
        Gn = [];
    for (let S = 0; S < Sl; S++) Gn.push({
        day: Hu - Sl + S + 1,
        year: Wu,
        month: Vu,
        isPadding: !0,
        padDir: "prev"
    });
    for (let S = 1; S <= zu; S++) Gn.push({
        day: S,
        year: s,
        month: a,
        isPadding: !1
    });
    const Yu = Gn.length % 7 === 0 ? 0 : 7 - Gn.length % 7;
    for (let S = 0; S < Yu; S++) Gn.push({
        day: S + 1,
        year: Gu,
        month: Ku,
        isPadding: !0,
        padDir: "next"
    });
    const Xu = Gn.length / 7;

    function Mi(S) {
        return `${S.year}-${String(S.month).padStart(2,"0")}-${String(S.day).padStart(2,"0")}`
    }

    function qu(S) {
        const {
            start: D,
            end: J
        } = B;
        if (!D || !J) return !1;
        const [le, Q] = D <= J ? [D, J] : [J, D];
        return S >= le && S <= Q
    }

    function Ju(S) {
        ae.current = S, Te.current = S, xe.current = S, ve.current = !1
    }

    function Qu(S) {
        ae.current && (S !== ae.current && (ve.current = !0), ve.current && (xe.current = S, W({
            start: Te.current,
            end: S
        })))
    }

    function C(S, D) {
        if (!ae.current) return;
        const J = ve.current,
            le = Te.current ?? S,
            Q = S;
        if (ae.current = null, ve.current = !1, Te.current = null, xe.current = null, W({
                start: null,
                end: null
            }), clearTimeout(Me.current), J) {
            const [Z, pe] = le <= Q ? [le, Q] : [Q, le];
            p(Z), y(Z === pe ? "" : pe)
        } else p(S), y("");
        v(null);
        const ee = i.filter(Z => Z.bankTx ? !1 : Z.date === S || Z.endDate && Z.date <= S && Z.endDate >= S);
        if (!J && ee.length >= 10) {
            alert(`하루에 일정은 최대 10개까지 작성할 수 있습니다.
기존 일정을 눌러 수정하거나, 일정 수정 창의 휴지통 버튼으로 삭제하세요.`);
            return
        }
        _(!0)
    }

    function L(S) {
        clearTimeout(Me.current), Me.current = setTimeout(() => {
            S === "prev" ? Ii() : Pi()
        }, 1e3)
    }

    function I() {
        clearTimeout(Me.current)
    }

    function P(S, D) {
        if (S && (S._loanId || S._savingsId)) {
            alert("대출·적금·펀드 항목은 오른쪽 D-Day 창의 목록에서 눌러 수정하세요.");
            return
        }
        v(S), p(D), y(""), _(!0)
    }

    function Dq(S) {
        const D = t.dodos ?? [],
            J = window.__ddbDodoDrag;
        window.__ddbDodoDrag = null;
        const le = D.filter(Q => Q.checked || Q.id === J);
        le.forEach(Q => {
            n({
                type: "ADD_EVENT",
                event: {
                    id: `ev-${Ft()}`,
                    title: Q.text,
                    date: S,
                    color: "blue",
                    isAllDay: !0
                }
            }), (c.dodoAutoDelete ?? !1) && n({
                type: "DELETE_DODO",
                id: Q.id
            })
        })
    }
    function Sh(S, D) {
        const J = new Date(S);
        return J.setDate(J.getDate() + D), `${J.getFullYear()}-${String(J.getMonth()+1).padStart(2,"0")}-${String(J.getDate()).padStart(2,"0")}`
    }

    function Mq(S) {
        const D = Ki;
        if (Ko(null), Xo(null), !D || D.from === S) return;
        const J = D.ev,
            le = Math.round((new Date(S).getTime() - new Date(D.from).getTime()) / 864e5);
        if (!le) return;
        n({
            type: "UPDATE_EVENT",
            event: {
                ...J,
                date: Sh(J.date, le),
                endDate: J.endDate ? Sh(J.endDate, le) : void 0
            }
        })
    }
    O.useEffect(() => {
        if (!Ki) return;
        const S = () => {
            Ko(null), Xo(null)
        };
        return window.addEventListener("mouseup", S), () => window.removeEventListener("mouseup", S)
    }, [Ki]);
    O.useEffect(() => {
        if (!Ceo) return;
        const S = D => {
            D.target && D.target.closest && D.target.closest("[data-ddbcal]") || CeoS(!1)
        };
        return document.addEventListener("mousedown", S), () => document.removeEventListener("mousedown", S)
    }, [Ceo]);
    O.useEffect(() => {
        function S(D) {
            const J = D.target;
            if (J && (J.tagName === "INPUT" || J.tagName === "TEXTAREA" || J.tagName === "SELECT" || J.isContentEditable)) return;
            if (["control", "alt", "shift", "meta"].includes(D.key.toLowerCase())) return;
            const le = (D.ctrlKey ? "ctrl+" : "") + (D.altKey ? "alt+" : "") + (D.shiftKey ? "shift+" : "") + D.key.toLowerCase(),
                Q = window.__ddbHK ?? {},
                ee = Object.keys(Q).find(Z => Q[Z] === le);
            if (!ee) return;
            const pe = (window.__ddbCACT ?? []).find(Z => Z.k === ee);
            pe && (D.preventDefault(), pe.act())
        }
        if (window.__ddbHKBound) return;
        window.__ddbHKBound = !0, window.addEventListener("keydown", S)
    }, []);
    window.__ddbHK = c.calHotkeys ?? {};
    return o.jsxs("div", {
        className: "flex flex-col h-full bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden select-none relative",
        onMouseMove: Ki ? S => Xo({
            x: S.clientX,
            y: S.clientY
        }) : void 0,
        children: [o.jsxs("div", {
            className: "flex items-center justify-between px-2 py-1.5 border-b border-white/10 flex-shrink-0 gap-1",
            children: [o.jsxs("div", {
                className: "flex items-center",
                style: {
                    flex: 2,
                    minWidth: 0
                },
                children: [(() => {
                    const tc = (t.todos ?? []).filter(td => !td.completedAt).length;
                    return o.jsxs("span", {
                        className: "flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-200 text-[10px] font-semibold flex-shrink-0 mr-1",
                        title: DDBTR("미완료 할 일"),
                        children: [o.jsx(rl, { size: 10 }), tc]
                    })
                })(), o.jsx("button", {
                    onClick: Ii,
                    className: "text-white/70 hover:text-white p-1 rounded hover:bg-white/10",
                    children: o.jsx(tl, {
                        size: 16
                    })
                }), o.jsxs("h2", {
                    className: "text-white font-bold flex-1 text-center",
                    style: {
                        fontSize: u
                    },
                    children: [teamOn && teamMeta && o.jsxs("span", { children: [o.jsxs("button", { onClick: () => window.dispatchEvent(new CustomEvent("ddb-team-open")), title: DDBTR("팀 관리"), className: "text-indigo-300 font-semibold hover:text-indigo-200 cursor-pointer bg-transparent border-none p-0", style: { fontSize: (c.teamNameFontSize ?? 18) }, children: ["\u{1F465} ", teamMeta.name] }), o.jsx("span", { className: "text-white/30 mx-2", style: { fontSize: (c.teamNameFontSize ?? 18) }, children: "\u00b7" })] }), o.jsx("span", { onClick: () => { setNavYear(s); setMonShare(!0) }, className: "cursor-pointer hover:text-white/70", title: DDBTR("월 이동"), children: ddbYM(s, a) })]
                }), o.jsx("button", {
                    onClick: Pi,
                    className: "text-white/70 hover:text-white p-1 rounded hover:bg-white/10",
                    children: o.jsx($n, {
                        size: 16
                    })
                })]
            }), et.length > 0 && o.jsx("div", {
                className: "flex gap-0.5 flex-shrink-0",
                children: et.map(S => {
                    const D = xs(S);
                    return o.jsx("button", {
                        onClick: () => tt(J => J === S.id ? null : S.id),
                        className: "text-[14px] px-0.5 hover:scale-125 transition-transform leading-none",
                        style: {
                            color: D.color,
                            filter: `drop-shadow(0 0 4px ${D.color}88)`
                        },
                        title: `${S.tabTitle}: ${S.content.slice(0,30)}${S.content.length>30?"…":""} (${Ra(S)}일 경과)`,
                        children: t.settings.feedbackIcon ? o.jsx("img", {
                            src: t.settings.feedbackIcon,
                            className: "w-4 h-4 object-contain inline-block align-middle"
                        }) : D.emoji
                    }, S.id)
                })
            }), o.jsxs("div", {
                className: "flex gap-0.5 ml-1 items-center justify-end",
                style: {
                    flex: 1
                },
                children: [Pv && o.jsxs("div", {
                    className: "flex items-center gap-1 mr-1 bg-white/10 border border-white/15 rounded px-1.5 py-0.5 flex-shrink-0",
                    onMouseDown: () => {
                        clearTimeout(window.__ddbPvT), window.__ddbPvT = setTimeout(() => Pw_(!1), 3e4)
                    },
                    children: [o.jsx("span", {
                        className: "text-white/50 text-[9px]",
                        children: DDBTR("투명도")
                    }), o.jsx("input", {
                        type: "number",
                        min: 0,
                        max: 95,
                        value: t.privacy.fadeOpacity,
                        onChange: S => n({
                            type: "UPDATE_PRIVACY",
                            privacy: {
                                fadeOpacity: Math.max(0, Math.min(95, Number(S.target.value) || 0))
                            }
                        }),
                        className: "w-10 bg-white/10 rounded px-1 text-[10px] text-white text-center focus:outline-none"
                    }), o.jsx("span", {
                        className: "text-white/50 text-[9px]",
                        children: "%"
                    }), o.jsx("input", {
                        type: "number",
                        min: 0,
                        max: 180,
                        value: t.privacy.idleMinutes,
                        onChange: S => n({
                            type: "UPDATE_PRIVACY",
                            privacy: {
                                idleMinutes: Math.max(0, Number(S.target.value) || 0)
                            }
                        }),
                        className: "w-9 bg-white/10 rounded px-1 text-[10px] text-white text-center focus:outline-none"
                    }), o.jsx("span", {
                        className: "text-white/50 text-[9px]",
                        children: DDBTR("분 후")
                    })]
                }), (() => {
                const q7 = [{
                    k: "lock",
                    title: t.privacy.enabled ? "사생활 보호 끄기" : "사생활 보호 켜기 — 설정한 시간 동안 자리를 비우면 화면이 투명해지고, 클릭하면 돌아옵니다",
                    cls: `px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors border flex-shrink-0 ${t.privacy.enabled?"bg-purple-500/30 text-purple-200 border-purple-400/50":"text-white/30 hover:text-white/60 border-white/10"}`,
                    body: "🔒",
                    act: () => {
                        const S = !t.privacy.enabled;
                        n({
                            type: "UPDATE_PRIVACY",
                            privacy: {
                                enabled: S
                            }
                        }), Pw_(S), clearTimeout(window.__ddbPvT), S && (window.__ddbPvT = setTimeout(() => Pw_(!1), 3e4))
                    }
                }, {
                    k: "do",
                    title: DDBTR("Do! 리스트 — 할 일을 적어두고 달력 날짜로 드래그"),
                    cls: `px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors border ${Wo?"bg-yellow-400/30 text-yellow-200 border-yellow-400/50":"text-yellow-300/60 hover:text-yellow-200 border-yellow-400/25 hover:bg-yellow-400/15"}`,
                    body: "Do!",
                    act: () => Do_(S => !S)
                }, {
                    k: "cal",
                    title: k ? DDBTR("달력 숨기기") : DDBTR("달력 보기"),
                    cls: `px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${(k&&!A&&!F)?"bg-blue-500/30 text-blue-300 border border-blue-500/40":"text-white/30 hover:text-white/60 border border-white/10"}`,
                    body: "📅",
                    act: () => {
                        A || F ? (H(!1), R(!1), k || E()) : E()
                    }
                }, {
                    k: "ledger",
                    title: b ? "가계부 숨기기" : "가계부 보기",
                    cls: `px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${(b&&!A&&!F)?"bg-green-500/30 text-green-300 border border-green-500/40":"text-white/30 hover:text-white/60 border border-white/10"}`,
                    body: "💰",
                    act: () => T(S => !S)
                }, {
                    k: "detail",
                    title: A ? DDBTR("달력 보기") : "가계부(상세보기)",
                    cls: `px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${A?"bg-amber-500/30 text-amber-300 border border-amber-500/40":"text-white/30 hover:text-white/60 border border-white/10"}`,
                    body: "📋",
                    act: () => {
                        H(S => !S), R(!1)
                    }
                }, {
                    k: "todo",
                    title: F ? DDBTR("달력 보기") : "할 일 목록",
                    cls: `px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors flex items-center gap-0.5 border ${F?"bg-blue-500/30 text-blue-300 border-blue-400/40":"text-white/30 hover:text-blue-300 hover:bg-blue-500/20 border-white/10 hover:border-blue-400/40"}`,
                    body: o.jsx(rl, {
                        size: 11
                    }),
                    act: () => {
                        R(S => !S), H(!1)
                    }
                }, {
                    k: "team",
                    title: t.settings.teamOnly ? DDBTR("팀 전환") : (teamOn ? DDBTR("개인 달력 보기") : DDBTR("팀 달력 보기")),
                    cls: `px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors border ${teamOn?"bg-indigo-500/40 text-indigo-100 border-indigo-400/60":"text-white/30 hover:text-white/60 border-white/10"}`,
                    body: "\u{1F465}",
                    act: () => ddbTeamToggle()
                }, {
                    k: "memodetail",
                    title: DDBTR("메모 상세"),
                    cls: "px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors border border-white/15 text-white/60 hover:bg-white/10",
                    body: "\u{1F5C2}",
                    act: () => window.dispatchEvent(new CustomEvent("ddb-memo-overview"))
                }];
                const ddbExtraAct = [...["1", "2", "3", "4", "5"].map(nn => ({ k: "memo" + nn, act: () => { const tid = "memo-" + nn, ex = (t.panels || []).find(A => A.type === "memo" && A.memoTabId === tid); n(ex ? { type: "REMOVE_PANEL", id: ex.id } : { type: "ADD_PANEL", panel: { id: `panel-memo-${Ft()}`, type: "memo", memoTabId: tid, slot: "float", order: 0, floatX: 120 + Number(nn) * 26, floatY: 90 + Number(nn) * 26, floatW: 240, floatH: 400, minimized: !1, zIndex: (t.topZIndex || 10) + 1 } }) } })), { k: "calc", act: () => { const ex = (t.panels || []).find(A => A.type === "calculator"); n(ex ? { type: "REMOVE_PANEL", id: ex.id } : { type: "ADD_PANEL", panel: { id: `panel-calculator-${Ft()}`, type: "calculator", slot: "float", order: 0, floatX: 200, floatY: 100, floatW: 240, floatH: 420, minimized: !1, zIndex: (t.topZIndex || 10) + 1 } }) } }, { k: "playNext", act: () => { window.__ddbPlayerCtl && window.__ddbPlayerCtl.next() } }, { k: "playPrev", act: () => { window.__ddbPlayerCtl && window.__ddbPlayerCtl.prev() } }, { k: "playToggle", act: () => { window.__ddbPlayerCtl && window.__ddbPlayerCtl.toggle() } }];
                window.__ddbCACT = [...q7, ...ddbExtraAct];
                const e7 = c.calBtnOrder ?? [],
                    r7 = [...q7].filter(S => !((c.calBtnHidden) || []).includes(S.k)).sort((S, D) => {
                        const J = e7.indexOf(S.k),
                            le = e7.indexOf(D.k);
                        return (J === -1 ? 99 : J) - (le === -1 ? 99 : le)
                    }),
                    n7 = (S, D) => {
                        const J = r7.map(le => le.k),
                            le = J.indexOf(S);
                        J.splice(le, 1), J.splice(D, 0, S), n({
                            type: "UPDATE_SETTINGS",
                            settings: {
                                calBtnOrder: J
                            }
                        })
                    };
                return o.jsxs(o.Fragment, {
                    children: [Ceo && o.jsx("span", {
                        className: "text-amber-300 text-[9px] whitespace-nowrap",
                        children: DDBTR("순서 변경 중 — 빈 곳 클릭 시 종료")
                    }), r7.map((S, D) => o.jsx("button", {
                        "data-ddbcal": "1",
                        draggable: Ceo,
                        onDragStart: () => {
                            window.__ddbCDrag = S.k
                        },
                        onDragOver: J => {
                            J.preventDefault(), window.__ddbCDrag && window.__ddbCDrag !== S.k && n7(window.__ddbCDrag, D)
                        },
                        onDragEnd: () => {
                            window.__ddbCDrag = null
                        },
                        onMouseDown: () => {
                            clearTimeout(window.__ddbCLP), window.__ddbCLP = setTimeout(() => CeoS(!0), 1e3)
                        },
                        onMouseUp: () => clearTimeout(window.__ddbCLP),
                        onMouseLeave: () => clearTimeout(window.__ddbCLP),
                        onClick: J => {
                            if (Ceo) {
                                J.preventDefault();
                                return
                            }
                            S.act()
                        },
                        title: Ceo ? DDBTR("드래그해서 순서 변경") : S.title,
                        className: S.cls + (Ceo ? " ring-1 ring-amber-400/80 cursor-move" : ""),
                        children: S.body
                    }, S.k))]
                })
            })()]
            })]
        }), Wo && o.jsxs("div", {
            className: "fixed rounded-lg border border-yellow-400/40 shadow-2xl p-2 flex flex-col gap-1.5",
            style: {
                backgroundColor: "rgba(26,22,40,0.97)", left: doGeo.x, top: doGeo.y, width: doGeo.w, height: doGeo.h, zIndex: 2147483200
            },
            children: [o.jsxs("div", {
                onMouseDown: doDrag, style: { cursor: "grab" },
                className: "flex items-center justify-between select-none",
                children: [o.jsx("span", {
                    className: "text-yellow-300 text-xs font-bold",
                    children: DDBTR("Do! 리스트")
                }), o.jsx("button", {
                    onClick: () => Do_(!1),
                    className: "text-white/40 hover:text-white",
                    children: o.jsx(Zt, {
                        size: 12
                    })
                })]
            }), o.jsx("input", {
                placeholder: DDBTR("할 일 입력 후 Enter"),
                className: "w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white placeholder-white/30 focus:outline-none focus:border-yellow-400",
                onKeyDown: S => {
                    S.key === "Enter" && S.currentTarget.value.trim() && (n({
                        type: "ADD_DODO",
                        item: {
                            id: `dodo-${Ft()}`,
                            text: S.currentTarget.value.trim(),
                            checked: !1
                        }
                    }), S.currentTarget.value = "")
                }
            }), o.jsx("div", {
                className: "flex flex-col gap-1 flex-1 min-h-0 overflow-y-auto",
                style: {
                    scrollbarWidth: "thin"
                },
                children: (t.dodos ?? []).length === 0 ? o.jsx("p", {
                    className: "text-white/25 text-[10px] text-center py-2 leading-relaxed",
                    children: DDBTR("할 일을 입력해 블록을 만들고, 클릭해서 체크한 뒤 달력 날짜로 드래그하세요. 체크된 블록이 한꺼번에 들어갑니다.")
                }) : (t.dodos ?? []).map(S => o.jsxs("div", {
                    draggable: !0,
                    onDragStart: D => {
                        window.__ddbDodoDrag = S.id, D.dataTransfer.effectAllowed = "copy"
                    },
                    onDragEnd: () => {
                        window.__ddbDodoDrag = null
                    },
                    onClick: () => n({
                        type: "TOGGLE_DODO",
                        id: S.id
                    }),
                    className: "flex items-center gap-1.5 px-2 py-1 rounded cursor-grab text-xs select-none border transition-colors " + (S.checked ? "bg-yellow-400/20 border-yellow-400/50 text-yellow-100" : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"),
                    children: [o.jsx("span", {
                        className: "flex-shrink-0",
                        children: S.checked ? "☑" : "☐"
                    }), o.jsx("span", {
                        className: "flex-1 min-w-0 truncate",
                        children: S.text
                    }), o.jsx("button", {
                        onClick: D => {
                            D.stopPropagation(), n({
                                type: "DELETE_DODO",
                                id: S.id
                            })
                        },
                        className: "text-white/25 hover:text-red-300 flex-shrink-0",
                        children: o.jsx(Zt, {
                            size: 10
                        })
                    })]
                }, S.id))
            }), o.jsxs("label", {
                className: "flex items-center gap-1.5 text-[10px] text-white/50 cursor-pointer border-t border-white/10 pt-1.5",
                children: [o.jsx("input", {
                    type: "checkbox",
                    checked: c.dodoAutoDelete ?? !1,
                    onChange: S => n({
                        type: "UPDATE_SETTINGS",
                        settings: {
                            dodoAutoDelete: S.target.checked
                        }
                    })
                }), "날짜에 넣으면 목록에서 삭제"]
            }), o.jsx("div", { onMouseDown: doResize, className: "absolute bottom-0 right-0 cursor-nwse-resize", style: { width: 16, height: 16 }, children: o.jsx("div", { style: { position: "absolute", right: 3, bottom: 3, width: 7, height: 7, borderRight: "2px solid rgba(255,255,255,0.4)", borderBottom: "2px solid rgba(255,255,255,0.4)" } }) })]
        }), Ki && Rr.createPortal(o.jsxs("div", {
            className: "pointer-events-none px-2 py-1 rounded-full text-xs text-white shadow-xl flex items-center gap-1",
            style: {
                position: "fixed",
                zIndex: 9999,
                left: (Xi ? Xi.x : 0) + 6,
                top: (Xi ? Xi.y : 0) + 16,
                backgroundColor: Ki.ev.customColor || qt[Ki.ev.color] || "#3b82f6"
            },
            children: [Ki.ev.title, o.jsx("span", {
                className: "opacity-75 text-[9px]",
                children: DDBTR("→ 다른 날짜 또는 같은 날 일정 위에 놓기(순서 변경)")
            })]
        }), document.body), !A && !F && (c.weather && c.weather.on) && c.weather.pos !== "top" && o.jsx(WX, {
            country: (c.weather && c.weather.country) || "kr",
            city: (c.weather && c.weather.city) || "seoul"
        }), !A && !F && o.jsx("div", {
            className: "grid grid-cols-7 border-b border-white/10 flex-shrink-0",
            children: WTA().map((S, D) => o.jsx("div", {
                className: "text-center py-1.5 text-xs font-semibold " + (D === 0 ? "text-red-300" : D === 6 ? "text-blue-300" : "text-white/70"),
                children: S
            }, S))
        }), A && !F && (() => {
            const S = [...i.filter(ie => ie.amount !== void 0 && ie.date.startsWith(`${s}-`)), ...finEvents].sort((ie, ke) => ie.date.localeCompare(ke.date)),
                D = q.length === 0 ? S : S.filter(ie => q.includes(Number(ie.date.slice(5, 7)))),
                J = new Map,
                le = [];
            D.filter(ie => ie.bankTx).forEach(ie => {
                const ke = ie.date.slice(0, 7);
                J.has(ke) || J.set(ke, []), J.get(ke).push(((ie.title ?? "") + " " + (ie.memo ?? "")).toLowerCase()), ie.amount !== void 0 && le.push({
                    date: ie.date,
                    amount: Math.abs(ie.amount)
                })
            });

            function Q(ie) {
                if (!ie.repeat || !ie.amount || ie.bankTx) return !1;
                const ke = Math.abs(ie.amount);
                if (ke < 1e3) return !1;
                const Re = new Date(ie.date).getTime();
                return le.some(Pe => Math.abs(new Date(Pe.date).getTime() - Re) / 864e5 > 7 ? !1 : Math.abs(Pe.amount - ke) / ke <= .1)
            }
            const ee = D.filter(ie => {
                    if (ie.bankKeyword && ie.repeat) {
                        const ke = ie.date.slice(0, 7),
                            Re = ie.bankKeyword.toLowerCase();
                        if ((J.get(ke) ?? []).some(Yt => Yt.includes(Re))) return !1
                    }
                    return !Q(ie)
                }),
                Z = ee.filter(ie => (ie.amount ?? 0) > 0),
                pe = ee.filter(ie => (ie.amount ?? 0) < 0),
                be = Z.reduce((ie, ke) => ie + (ke.amount ?? 0), 0),
                ye = pe.reduce((ie, ke) => ie + Math.abs(ke.amount ?? 0), 0),
                ge = ["#6366f1", "#f43f5e", "#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#8b5cf6", "#14b8a6", "#f97316", "#a855f7"],
                Se = "#6b7280",
                Oe = new Map,
                Ge = [];
            pe.forEach(ie => {
                let ke = ie.title;
                const Re = ke.indexOf(":");
                Re > 0 && Re <= 10 && (ke = ke.slice(0, Re).trim()), ke.includes("이체") && (ke = "계좌이체"), Oe.has(ke) || Oe.set(ke, {
                    evts: [],
                    total: 0
                });
                const Pe = Oe.get(ke);
                Pe.evts.push(ie), Pe.total += Math.abs(ie.amount ?? 0)
            });
            const ze = [];
            Oe.forEach(({
                evts: ie,
                total: ke
            }, Re) => ze.push({
                name: Re,
                evts: ie,
                total: ke,
                color: ""
            })), ze.sort((ie, ke) => ke.total - ie.total), ze.length > 8 && ze.splice(8).forEach(ie => ie.evts.forEach(ke => Ge.push({
                name: ie.name,
                amount: Math.abs(ke.amount ?? 0)
            }))), ze.forEach((ie, ke) => {
                ie.color = ge[ke % ge.length]
            });
            const Qe = Ge.reduce((ie, ke) => ie + ke.amount, 0),
                wt = 90,
                _e = 90,
                $e = 62,
                st = 34;
            let cn = -Math.PI / 2;
            const gr = [...ze.map(ie => ({
                    key: ie.name,
                    amt: ie.total,
                    color: ie.color
                })), ...Qe > 0 ? [{
                    key: "기타",
                    amt: Qe,
                    color: Se
                }] : []].map(ie => {
                    const ke = ye > 0 ? ie.amt / ye : 0,
                        Re = cn,
                        Pe = cn + ke * 2 * Math.PI,
                        Yt = (Re + Pe) / 2;
                    cn = Pe;
                    const ms = Math.cos(Re),
                        Js = Math.sin(Re),
                        gs = Math.cos(Pe),
                        Fa = Math.sin(Pe),
                        rt = ke > .5 ? 1 : 0,
                        Nr = ke >= .999 ? `M ${wt+$e} ${_e} A ${$e} ${$e} 0 1 1 ${wt-$e} ${_e} A ${$e} ${$e} 0 1 1 ${wt+$e} ${_e} L ${wt+st} ${_e} A ${st} ${st} 0 1 0 ${wt-st} ${_e} A ${st} ${st} 0 1 0 ${wt+st} ${_e} Z` : [`M ${wt+$e*ms} ${_e+$e*Js}`, `A ${$e} ${$e} 0 ${rt} 1 ${wt+$e*gs} ${_e+$e*Fa}`, `L ${wt+st*gs} ${_e+st*Fa}`, `A ${st} ${st} 0 ${rt} 0 ${wt+st*ms} ${_e+st*Js}`, "Z"].join(" "),
                        Ia = Math.round(ke * 100),
                        Rn = Ia < 5 ? 20 : 12,
                        Ct = Ia < 5 ? 27 : 18;
                    return {
                        path: Nr,
                        color: ie.color,
                        key: ie.key,
                        amt: ie.amt,
                        pct: Ia,
                        mid: Yt,
                        lx1: wt + $e * Math.cos(Yt),
                        ly1: _e + $e * Math.sin(Yt),
                        lx2: wt + ($e + Rn) * Math.cos(Yt),
                        ly2: _e + ($e + Rn) * Math.sin(Yt),
                        tx: wt + ($e + Ct) * Math.cos(Yt),
                        ty: _e + ($e + Ct) * Math.sin(Yt)
                    }
                }),
                ps = (() => {
                    if (!fe) return [];
                    if (fe === "기타") return Ge.sort((ke, Re) => Re.amount - ke.amount).map(ke => ({
                        name: ke.name,
                        amount: ke.amount,
                        ev: null
                    }));
                    const ie = ze.find(ke => ke.name === fe);
                    return ie ? [...ie.evts].sort((ke, Re) => Math.abs(Re.amount ?? 0) - Math.abs(ke.amount ?? 0)).map(ke => ({
                        name: ke.title,
                        amount: Math.abs(ke.amount ?? 0),
                        ev: ke
                    })) : []
                })(),
                Zu = be + ye,
                e0 = Zu > 0 ? be / Zu : .5,
                An = 90,
                jn = 75,
                Pr = 50,
                Mr = 28,
                ux = -Math.PI / 2 + e0 * 2 * Math.PI;

            function hx(ie, ke, Re) {
                const Pe = Math.cos(ie),
                    Yt = Math.sin(ie),
                    ms = Math.cos(ke),
                    Js = Math.sin(ke),
                    gs = Re > .5 ? 1 : 0;
                return Re >= .999 ? `M ${An+Pr} ${jn} A ${Pr} ${Pr} 0 1 1 ${An-Pr} ${jn} A ${Pr} ${Pr} 0 1 1 ${An+Pr} ${jn} L ${An+Mr} ${jn} A ${Mr} ${Mr} 0 1 0 ${An-Mr} ${jn} A ${Mr} ${Mr} 0 1 0 ${An+Mr} ${jn} Z` : Re <= .001 ? "" : [`M ${An+Pr*Pe} ${jn+Pr*Yt}`, `A ${Pr} ${Pr} 0 ${gs} 1 ${An+Pr*ms} ${jn+Pr*Js}`, `L ${An+Mr*ms} ${jn+Mr*Js}`, `A ${Mr} ${Mr} 0 ${gs} 0 ${An+Mr*Pe} ${jn+Mr*Yt}`, "Z"].join(" ")
            }
            const dx = hx(-Math.PI / 2, ux, e0),
                fx = hx(ux, -Math.PI / 2 + 2 * Math.PI, 1 - e0),
                un = be - ye;
            return o.jsxs("div", {
                className: "flex flex-col flex-1 overflow-hidden min-h-0",
                children: [o.jsxs("div", {
                    className: "flex flex-wrap gap-1 px-2 py-1.5 border-b border-white/10 flex-shrink-0",
                    children: [o.jsx("button", {
                        onClick: () => U(q.length === 12 ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
                        className: `px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors border ${q.length===12?"bg-amber-500/40 text-amber-200 border-amber-400/50":"bg-white/5 text-white/40 border-white/10 hover:bg-white/10"}`,
                        children: DDBTR("전체")
                    }), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(ie => o.jsxs("button", {
                        onClick: () => U(ke => ke.includes(ie) ? ke.filter(Re => Re !== ie) : [...ke, ie].sort((Re, Pe) => Re - Pe)),
                        className: `px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors border ${q.includes(ie)?"bg-amber-500/40 text-amber-200 border-amber-400/50":"bg-white/5 text-white/40 border-white/10 hover:bg-white/10"}`,
                        children: [ie, "월"]
                    }, ie))]
                }), o.jsxs("div", {
                    className: "flex gap-2 px-3 py-1 border-b border-white/10 text-xs flex-shrink-0 items-center",
                    children: [o.jsxs("span", {
                        className: "text-blue-300",
                        children: ["+", be.toLocaleString()]
                    }), o.jsx("span", {
                        className: "text-white/20",
                        children: "|"
                    }), o.jsxs("span", {
                        className: "text-red-300",
                        children: ["-", ye.toLocaleString()]
                    }), o.jsx("span", {
                        className: "text-white/20",
                        children: "|"
                    }), o.jsxs("span", {
                        className: un >= 0 ? "text-green-300" : "text-red-300",
                        children: ["순 ", un >= 0 ? "+" : "", un.toLocaleString()]
                    }), o.jsxs("span", {
                        className: "text-white/30",
                        children: [ee.length, DDBTR("건")]
                    }), o.jsx("button", {
                        onClick: () => {
                            const ie = rt => rt,
                                ke = () => ie(["", "", "", "", ""]),
                                Re = rt => rt.toLocaleString(),
                                Pe = [];
                            if (Pe.push(ie(["[가계부 요약]", "", "", "", ""])), Pe.push(ie([DDBTR("기간"), `${s}년 ${q.join(", ")}월`, "", "", ""])), Pe.push(ie([DDBTR("입금 합계"), `+${Re(be)}원`, "", "", ""])), Pe.push(ie([DDBTR("출금 합계"), `-${Re(ye)}원`, "", "", ""])), Pe.push(ie([DDBTR("순수지"), `${un>=0?"+":""}${Re(un)}원`, "", "", ""])), Pe.push(ie([DDBTR("총 건수"), `${ee.length}건`, "", "", ""])), Pe.push(ke()), ze.length > 0 || Qe > 0) {
                                if (Pe.push(ie(["[출금 카테고리 분석]", "", "", "", ""])), Pe.push(ie([DDBTR("카테고리"), DDBTR("건수"), DDBTR("금액"), DDBTR("비율(%)"), ""])), ze.forEach(rt => {
                                        const Nr = ye > 0 ? (rt.total / ye * 100).toFixed(1) + "%" : "0%";
                                        Pe.push(ie([rt.name, rt.evts.length + DDBTR("건"), Re(rt.total) + "원", Nr, ""]))
                                    }), Qe > 0) {
                                    const rt = ye > 0 ? (Qe / ye * 100).toFixed(1) + "%" : "0%";
                                    Pe.push(ie([DDBTR("기타(1회성)"), Ge.length + DDBTR("건"), Re(Qe) + "원", rt, ""]))
                                }
                                Pe.push(ke())
                            }
                            if (ze.length > 0 || Qe > 0) {
                                Pe.push(ie(["[출금 상세 - 카테고리별]", "", "", "", ""]));
                                const rt = ie([DDBTR("날짜"), DDBTR("제목"), DDBTR("금액"), DDBTR("메모"), ""]);
                                if (ze.forEach(Nr => {
                                        Pe.push(ke()), Pe.push(ie([`● ${Nr.name}`, `${Nr.evts.length}건`, `${Re(Nr.total)}원`, "", ""])), Pe.push(rt), [...Nr.evts].sort((Rn, Ct) => Rn.date.localeCompare(Ct.date)).forEach(Rn => {
                                            Pe.push(ie([Rn.date, Rn.title, Re(Math.abs(Rn.amount ?? 0)) + "원", Rn.memo ?? "", ""]))
                                        })
                                    }), Qe > 0) {
                                    Pe.push(ke()), Pe.push(ie([DDBTR("● 기타(1회성)"), `${Ge.length}건`, `${Re(Qe)}원`, "", ""])), Pe.push(rt);
                                    const Nr = Ct => {
                                            const Li = Ct.indexOf(":");
                                            let t0 = Li > 0 && Li <= 10 ? Ct.slice(0, Li).trim() : Ct;
                                            return t0.includes("이체") && (t0 = "계좌이체"), t0
                                        },
                                        Ia = new Set(ze.map(Ct => Ct.name));
                                    ee.filter(Ct => (Ct.amount ?? 0) < 0 && !Ia.has(Nr(Ct.title))).sort((Ct, Li) => Ct.date.localeCompare(Li.date)).forEach(Ct => {
                                        Pe.push(ie([Ct.date, Ct.title, Re(Math.abs(Ct.amount ?? 0)) + "원", Ct.memo ?? "", ""]))
                                    })
                                }
                                Pe.push(ke())
                            }
                            const Yt = ee.filter(rt => (rt.amount ?? 0) > 0).sort((rt, Nr) => rt.date.localeCompare(Nr.date));
                            Yt.length > 0 && (Pe.push(ie([`[입금 상세]  ${Yt.length}건  +${Re(be)}원`, "", "", "", ""])), Pe.push(ie([DDBTR("날짜"), DDBTR("제목"), DDBTR("금액"), DDBTR("메모"), ""])), Yt.forEach(rt => {
                                Pe.push(ie([rt.date, rt.title, "+" + Re(rt.amount ?? 0) + "원", rt.memo ?? "", ""]))
                            }));
                            const ms = Pe.map(rt => rt.map(Nr => `"${String(Nr).replace(/"/g,'""')}"`).join(",")).join(`\r
`),
                                Js = new Blob(["\uFEFF" + ms], {
                                    type: "text/csv;charset=utf-8;"
                                }),
                                gs = URL.createObjectURL(Js),
                                Fa = document.createElement("a");
                            Fa.href = gs, Fa.download = `가계부_${s}년_${q.join("_")}월.csv`, Fa.click(), URL.revokeObjectURL(gs)
                        },
                        className: "ml-auto px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors",
                        title: DDBTR("CSV로 내보내기 (Excel에서 열기 가능)"),
                        children: DDBTR("📥 내보내기")
                    })]
                }), o.jsxs("div", {
                    className: "flex flex-1 overflow-hidden min-h-0",
                    children: [o.jsx("div", {
                        className: "w-[30%] flex flex-col border-r border-white/10 overflow-y-auto min-h-0 px-2 py-2",
                        style: {
                            scrollbarWidth: "thin"
                        },
                        children: ye > 0 && gr.length > 0 ? o.jsxs(o.Fragment, {
                            children: [o.jsxs("div", {
                                className: "flex items-center justify-between mb-1 flex-shrink-0",
                                children: [o.jsx("p", {
                                    className: "text-[10px] text-white/40",
                                    children: DDBTR("📊 출금 분석")
                                }), o.jsx("button", {
                                    onClick: () => oe(ie => !ie),
                                    className: `text-[10px] px-2 py-0.5 rounded-full transition-colors ${me?"bg-blue-500/70 text-white":"bg-white/10 text-white/40 hover:bg-white/20"}`,
                                    children: DDBTR("% 표시")
                                })]
                            }), o.jsx("div", {
                                className: "flex justify-center flex-shrink-0",
                                children: o.jsxs("svg", {
                                    width: "140",
                                    height: "140",
                                    viewBox: "0 0 180 180",
                                    children: [gr.map((ie, ke) => o.jsx("path", {
                                        d: ie.path,
                                        fill: ie.color,
                                        opacity: fe === null ? .88 : fe === ie.key ? 1 : .3,
                                        className: "transition-opacity cursor-pointer",
                                        onMouseEnter: Re => {
                                            clearTimeout(nt.current), Ne(ie.key), Je({
                                                x: Re.clientX,
                                                y: Re.clientY
                                            })
                                        },
                                        onMouseMove: Re => Je({
                                            x: Re.clientX,
                                            y: Re.clientY
                                        }),
                                        onMouseLeave: () => {
                                            nt.current = setTimeout(() => {
                                                Ne(null), Je(null)
                                            }, 150)
                                        }
                                    }, ke)), me && gr.map((ie, ke) => o.jsxs("g", {
                                        pointerEvents: "none",
                                        children: [o.jsx("line", {
                                            x1: ie.lx1,
                                            y1: ie.ly1,
                                            x2: ie.lx2,
                                            y2: ie.ly2,
                                            stroke: ie.color,
                                            strokeWidth: "0.9",
                                            opacity: "0.7"
                                        }), o.jsxs("text", {
                                            x: ie.tx,
                                            y: ie.ty,
                                            fontSize: "7.5",
                                            fill: ie.color,
                                            opacity: "0.9",
                                            textAnchor: Math.cos(ie.mid) > 0 ? "start" : "end",
                                            dominantBaseline: "middle",
                                            children: [ie.pct, "%"]
                                        })]
                                    }, `lbl-${ke}`)), o.jsx("text", {
                                        x: "90",
                                        y: "84",
                                        textAnchor: "middle",
                                        fontSize: "8",
                                        fill: "rgba(255,255,255,0.35)",
                                        children: DDBTR("출금 합계")
                                    }), o.jsx("text", {
                                        x: "90",
                                        y: "98",
                                        textAnchor: "middle",
                                        fontSize: "11",
                                        fill: "rgba(255,255,255,0.78)",
                                        fontWeight: "bold",
                                        children: ye >= 1e4 ? `${(ye/1e4).toFixed(0)}만원` : `${ye.toLocaleString()}원`
                                    })]
                                })
                            }), o.jsx("div", {
                                className: "flex-1 space-y-0.5",
                                children: gr.map(ie => {
                                    var ke;
                                    return o.jsxs("div", {
                                        className: `flex items-center gap-1.5 text-[11px] rounded px-1.5 py-1 cursor-default transition-colors ${fe===ie.key?"bg-white/15":"hover:bg-white/8"}`,
                                        onMouseEnter: Re => {
                                            clearTimeout(nt.current), Ne(ie.key), Je({
                                                x: Re.clientX,
                                                y: Re.clientY
                                            })
                                        },
                                        onMouseMove: Re => Je({
                                            x: Re.clientX,
                                            y: Re.clientY
                                        }),
                                        onMouseLeave: () => {
                                            nt.current = setTimeout(() => {
                                                Ne(null), Je(null)
                                            }, 150)
                                        },
                                        children: [o.jsx("div", {
                                            className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                                            style: {
                                                backgroundColor: ie.color
                                            }
                                        }), o.jsx("span", {
                                            className: "text-white/75 flex-1 truncate",
                                            children: ie.key
                                        }), o.jsxs("span", {
                                            className: "text-white/30 tabular-nums flex-shrink-0 text-[10px] mr-1",
                                            children: [ie.key === "기타" ? Ge.length : ((ke = ze.find(Re => Re.name === ie.key)) == null ? void 0 : ke.evts.length) ?? 0, DDBTR("건")]
                                        }), o.jsxs("span", {
                                            className: "text-white/50 tabular-nums flex-shrink-0",
                                            children: [ie.amt.toLocaleString(), "원"]
                                        })]
                                    }, ie.key)
                                })
                            }), We && fe && ps.length > 0 && Rr.createPortal(o.jsxs("div", {
                                className: "fixed z-[9999] bg-gray-900/95 border border-white/20 rounded-xl p-3 shadow-2xl backdrop-blur-sm",
                                style: {
                                    left: Math.min(We.x + 14, window.innerWidth - 254),
                                    top: Math.max(8, Math.min(We.y - 20, window.innerHeight - 220)),
                                    maxWidth: 240
                                },
                                onMouseEnter: () => clearTimeout(nt.current),
                                onMouseLeave: () => {
                                    Ne(null), Je(null)
                                },
                                children: [o.jsxs("p", {
                                    className: "text-[10px] text-white/40 mb-1.5 font-medium",
                                    children: [fe, " · ", ps.length, "건", ps.some(ie => ie.ev) && o.jsx("span", {
                                        className: "ml-1 text-white/25",
                                        children: DDBTR("(클릭 수정)")
                                    })]
                                }), o.jsx("div", {
                                    className: "space-y-0.5 max-h-40 overflow-y-auto",
                                    style: {
                                        scrollbarWidth: "thin"
                                    },
                                    children: ps.map((ie, ke) => o.jsxs("div", {
                                        className: "flex items-center text-[11px] gap-2 rounded px-1 py-0.5 transition-colors " + (ie.ev ? "cursor-pointer hover:bg-white/15" : ""),
                                        onClick: () => {
                                            ie.ev && (Ne(null), Je(null), v(ie.ev), p(ie.ev.date), y(""), _(!0))
                                        },
                                        children: [ie.ev && o.jsx("span", {
                                            className: "text-white/30 tabular-nums flex-shrink-0 text-[10px]",
                                            children: ie.ev.date.slice(5).replace("-", "/")
                                        }), o.jsx("span", {
                                            className: "text-white/70 truncate flex-1",
                                            children: ie.name
                                        }), o.jsxs("span", {
                                            className: "text-red-300 tabular-nums flex-shrink-0",
                                            children: ["-", ie.amount.toLocaleString()]
                                        })]
                                    }, ke))
                                }), o.jsxs("div", {
                                    className: "flex justify-between text-[10px] border-t border-white/10 mt-2 pt-1.5",
                                    children: [o.jsx("span", {
                                        className: "text-white/30",
                                        children: DDBTR("합계")
                                    }), o.jsxs("span", {
                                        className: "text-red-200 font-bold tabular-nums",
                                        children: ["-", ps.reduce((ie, ke) => ie + ke.amount, 0).toLocaleString(), "원"]
                                    })]
                                })]
                            }), document.body)]
                        }) : o.jsx("p", {
                            className: "text-white/25 text-xs text-center py-8",
                            children: DDBTR("출금 내역 없음")
                        })
                    }), o.jsxs("div", {
                        className: "w-[70%] flex flex-col overflow-hidden min-h-0 px-2 py-2",
                        children: [Zu > 0 && o.jsxs("div", {
                            className: "flex-shrink-0",
                            children: [o.jsx("p", {
                                className: "text-[10px] text-white/40 mb-1",
                                children: DDBTR("💰 입출금 현황")
                            }), o.jsx("div", {
                                className: "flex justify-center",
                                children: o.jsxs("svg", {
                                    width: "130",
                                    height: "120",
                                    viewBox: "0 0 180 150",
                                    children: [dx && o.jsx("path", {
                                        d: dx,
                                        fill: "#0ea5e9",
                                        opacity: "0.82"
                                    }), fx && o.jsx("path", {
                                        d: fx,
                                        fill: "#f43f5e",
                                        opacity: "0.82"
                                    }), o.jsx("text", {
                                        x: "90",
                                        y: "69",
                                        textAnchor: "middle",
                                        fontSize: "7.5",
                                        fill: "rgba(255,255,255,0.35)",
                                        children: DDBTR("순수지")
                                    }), o.jsxs("text", {
                                        x: "90",
                                        y: "82",
                                        textAnchor: "middle",
                                        fontSize: "10",
                                        fill: un >= 0 ? "#4ade80" : "#f87171",
                                        fontWeight: "bold",
                                        children: [un >= 0 ? "+" : "", un >= 1e4 || un <= -1e4 ? `${Math.round(un/1e4)}만원` : un.toLocaleString() + "원"]
                                    })]
                                })
                            }), o.jsxs("div", {
                                className: "flex gap-1.5 mb-2",
                                children: [o.jsxs("div", {
                                    className: "flex-1 bg-blue-500/15 rounded-lg px-2 py-1.5 text-center",
                                    children: [o.jsxs("div", {
                                        className: "text-blue-300 font-bold text-[12px]",
                                        children: ["+", be >= 1e4 ? `${(be/1e4).toFixed(0)}만` : be.toLocaleString()]
                                    }), o.jsxs("div", {
                                        className: "text-white/30 text-[9px]",
                                        children: [DDBTR("입금")+" ", Z.length, DDBTR("건")]
                                    })]
                                }), o.jsxs("div", {
                                    className: "flex-1 bg-red-500/15 rounded-lg px-2 py-1.5 text-center",
                                    children: [o.jsxs("div", {
                                        className: "text-red-300 font-bold text-[12px]",
                                        children: ["-", ye >= 1e4 ? `${(ye/1e4).toFixed(0)}만` : ye.toLocaleString()]
                                    }), o.jsxs("div", {
                                        className: "text-white/30 text-[9px]",
                                        children: [DDBTR("출금")+" ", pe.length, DDBTR("건")]
                                    })]
                                })]
                            })]
                        }), ee.length > 0 ? o.jsxs("div", {
                            className: "flex flex-1 gap-0 overflow-hidden min-h-0",
                            children: [o.jsxs("div", {
                                className: "flex-1 flex flex-col overflow-hidden min-h-0 border-r border-white/10",
                                children: [o.jsx("p", {
                                    className: "text-[10px] text-blue-300/80 font-medium px-1 py-0.5 flex-shrink-0 border-b border-white/5",
                                    children: DDBTR("▲ 입금")
                                }), o.jsx("div", {
                                    className: "flex-1 overflow-y-auto",
                                    style: {
                                        scrollbarWidth: "thin"
                                    },
                                    children: Z.length === 0 ? o.jsx("p", {
                                        className: "text-white/20 text-[10px] px-1 py-3 text-center",
                                        children: DDBTR("없음")
                                    }) : o.jsx("div", {
                                        className: "grid grid-cols-2",
                                        children: Z.map(ie => {
                                            const ke = ie.date.slice(5, 7).replace(/^0/, ""),
                                                Re = ie.date.slice(8).replace(/^0/, ""),
                                                Pe = ie.amount ?? 0;
                                            return o.jsxs("div", {
                                                className: "px-1 py-1 border-b border-white/5 border-r border-white/5 hover:bg-white/8 cursor-pointer transition-colors",
                                                onClick: () => {
                                                    v(ie), p(ie.date), y(""), _(!0)
                                                },
                                                children: [o.jsxs("div", {
                                                    className: "flex items-center gap-1 text-[10px]",
                                                    children: [o.jsxs("span", {
                                                        className: "text-white/30 tabular-nums flex-shrink-0",
                                                        children: [ke, "/", Re]
                                                    }), o.jsxs("span", {
                                                        className: "text-blue-300 font-bold tabular-nums flex-shrink-0 text-[9px]",
                                                        children: ["+", Pe.toLocaleString()]
                                                    })]
                                                }), o.jsx("div", {
                                                    className: "text-white/60 text-[10px] truncate leading-tight",
                                                    children: ddbTT(ie.title)
                                                })]
                                            }, ie.id)
                                        })
                                    })
                                })]
                            }), o.jsxs("div", {
                                className: "flex-1 flex flex-col overflow-hidden min-h-0",
                                children: [o.jsx("p", {
                                    className: "text-[10px] text-red-300/80 font-medium px-1 py-0.5 flex-shrink-0 border-b border-white/5",
                                    children: DDBTR("▼ 출금")
                                }), o.jsx("div", {
                                    className: "flex-1 overflow-y-auto",
                                    style: {
                                        scrollbarWidth: "thin"
                                    },
                                    children: pe.length === 0 ? o.jsx("p", {
                                        className: "text-white/20 text-[10px] px-1 py-3 text-center",
                                        children: DDBTR("없음")
                                    }) : o.jsx("div", {
                                        className: "grid grid-cols-2",
                                        children: pe.map(ie => {
                                            const ke = ie.date.slice(5, 7).replace(/^0/, ""),
                                                Re = ie.date.slice(8).replace(/^0/, ""),
                                                Pe = Math.abs(ie.amount ?? 0);
                                            return o.jsxs("div", {
                                                className: "px-1 py-1 border-b border-white/5 border-r border-white/5 hover:bg-white/8 cursor-pointer transition-colors",
                                                onClick: () => {
                                                    v(ie), p(ie.date), y(""), _(!0)
                                                },
                                                children: [o.jsxs("div", {
                                                    className: "flex items-center gap-1 text-[10px]",
                                                    children: [o.jsxs("span", {
                                                        className: "text-white/30 tabular-nums flex-shrink-0",
                                                        children: [ke, "/", Re]
                                                    }), o.jsxs("span", {
                                                        className: "text-red-300 font-bold tabular-nums flex-shrink-0 text-[9px]",
                                                        children: ["-", Pe.toLocaleString()]
                                                    })]
                                                }), o.jsx("div", {
                                                    className: "text-white/60 text-[10px] truncate leading-tight",
                                                    children: ddbTT(ie.title)
                                                })]
                                            }, ie.id)
                                        })
                                    })
                                })]
                            })]
                        }) : o.jsx("p", {
                            className: "text-white/25 text-xs text-center py-8",
                            children: DDBTR("선택한 월에 거래 없음")
                        })]
                    })]
                })]
            })
        })(), !A && !F && (() => {
            const __big = (c.calRowH ?? 0) > 0, __grid = o.jsx("div", {
            className: "grid grid-cols-7 " + (__big ? "" : "flex-1 min-h-0 overflow-hidden"),
            style: __big ? {
                gridTemplateColumns: "repeat(7, 1fr)",
                gridAutoRows: (c.calRowH) + "px",
                paddingBottom: 48
            } : {
                gridTemplateRows: `repeat(${Xu}, minmax(0, 1fr))`
            },
            children: Gn.map((S, D) => {
                const J = Mi(S),
                    le = D % 7,
                    Q = !S.isPadding && J === Da,
                    ee = d && !S.isPadding ? Sw(S.year, S.month, S.day) : "",
                    Z = S.isPadding ? [] : qs(J),
                    pe = Z.filter(_e => _e.amount !== void 0 && _e.bankTx);
                Z.filter(_e => _e.amount !== void 0);
                const be = Z.filter(_e => _e.amount === void 0),
                    ye = Z.filter(_e => (_e.amount ?? 0) > 0 && !_e.bankTx),
                    ge = Z.filter(_e => (_e.amount ?? 0) < 0 && !_e.bankTx),
                    Se = pe.filter(_e => (_e.amount ?? 0) > 0),
                    Oe = pe.filter(_e => (_e.amount ?? 0) < 0);
                Se.reduce((_e, $e) => _e + ($e.amount ?? 0), 0), Oe.reduce((_e, $e) => _e + Math.abs($e.amount ?? 0), 0);
                const Ge = Z.filter(_e => !_e.bankTx && _e.amount === void 0),
                    ze = Ge.length === 1,
                    Qe = ze ? Ge[0].customColor || (qt[Ge[0].color] ?? "#999") : null,
                    wt = !S.isPadding && qu(J);
                return o.jsxs("div", {
                    className: (shareSel && shareSel.includes(J) ? "ring-2 ring-blue-400 ring-inset z-10 " : "") + "group relative border-r border-b border-white/5 overflow-hidden p-1 transition-all flex flex-col " + (S.isPadding ? "opacity-40 cursor-default " : "cursor-pointer hover:bg-white/[0.09] hover:shadow-[inset_0_2px_5px_rgba(0,0,0,0.45)] ") + (Q ? "ring-1 ring-inset ring-blue-400/60 " : "") + (wt ? "ring-1 ring-inset ring-purple-400/70 " : ""),
                    style: wt ? {
                        backgroundColor: "rgba(147,112,219,0.25)"
                    } : Qe ? {
                        backgroundColor: Qe + "44"
                    } : Q ? {
                        backgroundColor: "rgba(255,255,255,0.08)"
                    } : {},
                    onMouseDownCapture: shareSel && !S.isPadding ? _e => { _e.stopPropagation(); _e.preventDefault(); setShareSel(a2 => a2.includes(J) ? a2.filter(x => x !== J) : [...a2, J]); clearTimeout(_shTimer.current); _shPaint.current = false; _shTimer.current = setTimeout(() => { _shPaint.current = true; }, 500); } : void 0,
                    onDragOver: S.isPadding ? void 0 : _e => {
                        window.__ddbDodoDrag && _e.preventDefault()
                    },
                    onDrop: S.isPadding ? void 0 : _e => {
                        window.__ddbDodoDrag && (_e.preventDefault(), Dq(J))
                    },
                    onMouseDown: S.isPadding ? void 0 : () => {
                        Ju(J), clearTimeout(Fe.current), he(null)
                    },
                    onMouseEnter: _e => {
                        if (shareSel && _shPaint.current && !S.isPadding) { setShareSel(a2 => a2.includes(J) ? a2 : [...a2, J]); }
                        if (!S.isPadding && (Qu(J), Z.length > 0)) {
                            clearTimeout(Fe.current);
                            const $e = _e.currentTarget.getBoundingClientRect();
                            Fe.current = setTimeout(() => {
                                he({
                                    dateStr: J,
                                    events: Z,
                                    rect: $e
                                })
                            }, 500)
                        }
                        S.isPadding && S.padDir && L(S.padDir)
                    },
                    onMouseLeave: () => {
                        S.isPadding ? I() : (clearTimeout(Fe.current), Fe.current = setTimeout(() => he(null), 150))
                    },
                    onMouseUp: S.isPadding ? void 0 : _e => {
                        if (shareSel) return;
                        if (Ki) {
                            Mq(J);
                            return
                        }
                        C(J, _e)
                    },
                    children: [(shareSel && shareSel.includes(J)) && o.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { zIndex: 8, backgroundColor: "rgba(59,130,246,0.30)", boxShadow: "inset 0 0 0 3px #3b82f6" } }), !S.isPadding && o.jsx("button", {
                        className: "absolute top-0.5 right-0.5 z-20 w-4 h-4 rounded bg-black/40 hover:bg-indigo-500/80 text-white/70 hover:text-white text-[10px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer",
                        title: DDBTR("이 날 일정 공유"),
                        onClick: _e => { _e.stopPropagation(); if (teamOn && !(teamMeta && teamMeta.caps && teamMeta.caps.share)) { setShareToast(DDBTR("공유 권한이 없습니다.")); setTimeout(() => setShareToast(""), 2200); return } const rc = _e.currentTarget.getBoundingClientRect(); setShareDay({ date: J, events: Z, left: rc.right, top: rc.bottom, label: teamOn && teamMeta ? teamMeta.name : "" }) }
                    }), o.jsxs("div", {
                        className: "flex items-start gap-0.5 flex-wrap",
                        children: [o.jsx("span", {
                            className: "text-xs font-medium leading-none flex-shrink-0 " + (Q ? "bg-blue-400 text-white rounded-full w-5 h-5 flex items-center justify-center" : S.isPadding ? "text-white/30" : le === 0 ? "text-red-300" : le === 6 ? "text-blue-300" : "text-white/80"),
                            style: {
                                fontSize: Q ? void 0 : h
                            },
                            children: S.day
                        }), ee && !Q && !S.isPadding && o.jsx("span", {
                            className: "text-white/35 leading-tight flex-shrink-0",
                            style: {
                                fontSize: Math.max(7, h - 2),
                                marginTop: "1px"
                            },
                            children: ee
                        }), !b && ye.length > 0 && o.jsx("span", {
                            className: "text-red-200 bg-red-400/30 rounded text-[9px] px-0.5 leading-4 flex-shrink-0 font-bold cursor-pointer hover:bg-red-400/50",
                            onMouseDown: _e => _e.stopPropagation(),
                            onMouseUp: _e => _e.stopPropagation(),
                            onClick: _e => {
                                _e.stopPropagation(), P(ye[0], J)
                            },
                            children: `+${ye.length>1?ye.length:""}`
                        }), !b && ge.length > 0 && o.jsx("span", {
                            className: "text-blue-200 bg-blue-400/30 rounded text-[9px] px-0.5 leading-4 flex-shrink-0 font-bold cursor-pointer hover:bg-blue-400/50",
                            onMouseDown: _e => _e.stopPropagation(),
                            onMouseUp: _e => _e.stopPropagation(),
                            onClick: _e => {
                                _e.stopPropagation(), P(ge[0], J)
                            },
                            children: `-${ge.length>1?ge.length:""}`
                        })]
                    }), b && !S.isPadding && (ye.length > 0 || ge.length > 0 || pe.length > 0) && o.jsx("div", {
                        className: "flex flex-col mt-0.5 gap-px",
                        children: [...ye, ...ge, ...pe].map(_e => {
                            var Et;
                            const $e = _e.amount ?? 0,
                                st = Math.abs($e).toLocaleString().length + (((Et = _e.title) == null ? void 0 : Et.length) ?? 0),
                                cn = Math.max(4, st > 18 ? l - 4 : st > 12 ? l - 3 : l - 2);
                            return o.jsxs("div", {
                                className: "flex items-baseline gap-0.5 overflow-hidden leading-tight cursor-pointer hover:bg-white/10 rounded",
                                style: {
                                    fontSize: cn
                                },
                                onMouseDown: gr => gr.stopPropagation(),
                                onMouseUp: gr => gr.stopPropagation(),
                                onClick: gr => {
                                    gr.stopPropagation(), P(_e, J)
                                },
                                onMouseEnter: gr => {
                                    clearTimeout(de.current), clearTimeout(Fe.current);
                                    const ps = gr.currentTarget.getBoundingClientRect();
                                    ue({
                                        ev: _e,
                                        dateStr: J,
                                        x: ps.right + 4,
                                        y: ps.top
                                    })
                                },
                                onMouseLeave: () => {
                                    ue(null)
                                },
                                children: [o.jsxs("span", {
                                    className: `flex-shrink-0 font-semibold tabular-nums ${$e>=0?"text-teal-300":"text-rose-300"}`,
                                    children: [$e >= 0 ? "+" : "-", Math.abs($e).toLocaleString()]
                                }), _e.title && o.jsx("span", {
                                    className: "text-white/55 min-w-0 overflow-hidden whitespace-nowrap",
                                    style: {
                                        textOverflow: "ellipsis",
                                        overflow: "hidden"
                                    },
                                    title: _e.title,
                                    children: ddbTT(_e.title)
                                })]
                            }, _e.id)
                        })
                    }), k && !S.isPadding && o.jsx("div", {
                        className: "mt-0.5 flex flex-col gap-0.5 flex-1 min-h-0 " + ((c.calRowH ?? 0) > 0 ? "overflow-hidden" : "overflow-y-auto"),
                        style: {
                            scrollbarWidth: "thin",
                            scrollbarColor: "rgba(255,255,255,0.15) transparent"
                        },
                        children: be.map(_e => {
                            const $e = Oa(_e, J),
                                st = _e.customColor || (qt[_e.color] ?? "#999"),
                                cn = $e === "start" || $e === "single";
                            return o.jsx("div", {
                                className: "flex items-center text-white text-xs leading-none py-0.5 overflow-hidden cursor-pointer transition-all hover:brightness-125 hover:shadow-md active:brightness-150 whitespace-nowrap " + ($e === "start" ? "rounded-l-full pl-2" : $e === "end" ? "rounded-r-full pl-1" : $e === "middle" ? "pl-1" : "rounded-full px-2"),
                                style: {
                                    backgroundColor: st,
                                    fontSize: Math.max(8, l - 1),
                                    opacity: ze ? .85 : .9,
                                    textOverflow: "ellipsis"
                                },
                                onMouseDown: Et => {
                                    Et.stopPropagation(), clearTimeout(window.__ddbLP);
                                    const Ns = {
                                        x: Et.clientX,
                                        y: Et.clientY
                                    };
                                    _e.bankTx || _e._loanId || _e._savingsId || (window.__ddbLP = setTimeout(() => {
                                        _e.repeat ? alert("반복 일정은 드래그로 이동할 수 없습니다. 일정을 눌러 날짜를 수정하세요.") : (window.__ddbMoved = !0, Ko({
                                            ev: _e,
                                            from: J
                                        }), Xo(Ns))
                                    }, 500))
                                },
                                onMouseUp: Et => {
                                    if (Et.stopPropagation(), clearTimeout(window.__ddbLP), !Ki) return;
                                    if (Ki.from === J && Ki.ev.id !== _e.id) {
                                        const g0 = i.findIndex(Q2 => Q2.id === Ki.ev.id),
                                            g1 = i.findIndex(Q2 => Q2.id === _e.id);
                                        n({
                                            type: "MOVE_EVENT_NEAR",
                                            id: Ki.ev.id,
                                            targetId: _e.id,
                                            after: g0 < g1
                                        }), Ko(null), Xo(null), window.__ddbMoved = !0;
                                        return
                                    }
                                    Mq(J)
                                },
                                onClick: Et => {
                                    if (Et.stopPropagation(), window.__ddbMoved) {
                                        window.__ddbMoved = !1;
                                        return
                                    }
                                    v(_e), p(J), y(""), _(!0)
                                },
                                onMouseEnter: Et => {
                                    clearTimeout(de.current), clearTimeout(Fe.current);
                                    const gr = Et.currentTarget.getBoundingClientRect();
                                    ue({
                                        ev: _e,
                                        dateStr: J,
                                        x: gr.right + 4,
                                        y: gr.top
                                    })
                                },
                                onMouseLeave: () => {
                                    ue(null)
                                },
                                children: cn ? o.jsxs(o.Fragment, {
                                    children: [o.jsx("span", {
                                        className: "flex-1 min-w-0 overflow-hidden",
                                        style: { textOverflow: "ellipsis" },
                                        children: ddbTT(_e.title)
                                    }), (() => {
                                        const Fq = mr.find(Q2 => !Q2.isDismissed && Q2.eventId === _e.id);
                                        return Fq ? o.jsx("span", {
                                            className: "ml-1 font-bold inline-flex items-center flex-shrink-0",
                                            style: {
                                                color: xs(Fq).color,
                                                textShadow: "0 0 3px rgba(0,0,0,0.8)"
                                            },
                                            children: t.settings.feedbackIcon ? o.jsx("img", {
                                                src: t.settings.feedbackIcon,
                                                className: "w-3 h-3 object-contain inline-block align-middle"
                                            }) : xs(Fq).emoji
                                        }) : null
                                    })(), c.quickDelete && cn && !_e.bankTx && o.jsx("button", {
                                        onMouseDown: gr => gr.stopPropagation(),
                                        onMouseUp: gr => gr.stopPropagation(),
                                        onClick: gr => {
                                            gr.stopPropagation(), teamOn ? ddbTeamDelEvent(_e.id) : n({
                                                type: "DELETE_EVENT",
                                                id: _e.id
                                            })
                                        },
                                        title: DDBTR("일정 삭제"),
                                        className: "ml-auto flex-shrink-0 inline-flex items-center rounded-full hover:bg-black/40 px-0.5 pr-1 align-middle",
                                        style: {
                                            color: "rgba(255,255,255,0.85)"
                                        },
                                        children: o.jsx(Gr, {
                                            size: Math.max(9, l - 3)
                                        })
                                    })]
                                }) : " "
                            }, _e.id + J)
                        })
                    })]
                }, `${J}-${D}`)
            })
        });
            return __big ? o.jsx("div", {
                className: "flex-1 min-h-0 overflow-y-auto thin-scroll",
                "data-calscroll": "1",
                style: {
                    maxHeight: "calc(100vh - 120px)"
                },
                children: __grid
            }) : __grid
        })(), F && o.jsxs(o.Fragment, { children: [(() => {
                const _tot = z.length, _done = re.length, _pct = _tot ? Math.round(_done / _tot * 100) : 0;
                const _mDone = re.filter(x => { const d = new Date(x.completedAt); return d.getFullYear() === s && d.getMonth() + 1 === a }).length;
                const _yDone = re.filter(x => new Date(x.completedAt).getFullYear() === s).length;
                return o.jsxs("div", { className: "flex items-center gap-4 px-4 py-2 border-b border-white/10 flex-shrink-0", style: { background: "rgba(255,255,255,0.04)" }, children: [o.jsxs("div", { className: "relative flex-shrink-0", style: { width: 52, height: 52 }, children: [o.jsxs("svg", { width: 52, height: 52, viewBox: "0 0 36 36", children: [o.jsx("circle", { cx: 18, cy: 18, r: 15.9155, fill: "none", stroke: "rgba(255,255,255,0.12)", strokeWidth: 3.6 }), o.jsx("circle", { cx: 18, cy: 18, r: 15.9155, fill: "none", stroke: "#4ade80", strokeWidth: 3.6, strokeDasharray: _pct + ", 100", strokeLinecap: "round", transform: "rotate(-90 18 18)" })] }), o.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-white text-[11px] font-bold", children: _pct + "%" })] }), o.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0", children: [o.jsxs("div", { className: "text-white/80 text-xs", children: [DDBTR("완료"), " ", o.jsx("b", { className: "text-green-300", children: _done }), " / ", _tot, "  ", o.jsxs("span", { className: "text-blue-300/70", children: ["(", DDBTR("진행중"), " ", G.length, ")"] })] }), o.jsxs("div", { className: "text-white/45 text-[11px]", children: [s, DDBTR("년"), " ", a, DDBTR("월") + " " + DDBTR("완료") + " ", o.jsx("b", { className: "text-green-300/90", children: _mDone }), DDBTR("개"), "  \u00b7  ", s, DDBTR("년") + " " + DDBTR("완료") + " ", o.jsx("b", { className: "text-green-300/90", children: _yDone }), DDBTR("개")] })] })] })
            })(), o.jsxs("div", {
            className: "flex-1 flex min-h-0 overflow-hidden",
            children: [o.jsxs("div", {
                className: "flex-1 flex flex-col min-h-0 border-r border-white/10",
                children: [o.jsxs("div", {
                    className: "flex items-center gap-2 px-3 py-1.5 border-b border-white/10 flex-shrink-0",
                    style: {
                        background: "rgba(59,130,246,0.08)"
                    },
                    children: [o.jsx("span", {
                        className: "text-blue-300 text-[11px] font-semibold",
                        children: DDBTR("진행중인 일")
                    }), o.jsxs("span", {
                        className: "text-blue-300/50 text-[10px]",
                        children: [G.length, "개"]
                    })]
                }), o.jsx("div", {
                    className: "flex-1 overflow-y-auto min-h-0",
                    children: G.length === 0 ? o.jsx("p", {
                        className: "text-white/20 text-center py-8 text-xs",
                        children: DDBTR("진행중인 할 일이 없습니다")
                    }) : o.jsxs("table", {
                        className: "w-full border-collapse text-xs",
                        children: [o.jsx("thead", {
                            children: o.jsxs("tr", {
                                className: "border-b border-white/10 text-white/25 text-[10px]",
                                children: [X && o.jsx("th", {
                                    className: "py-1 pl-2 text-right w-7 font-normal",
                                    children: "#"
                                }), o.jsx("th", {
                                    className: "py-1 px-1 text-left font-normal",
                                    children: DDBTR("내용")
                                }), ce && o.jsx("th", {
                                    className: "py-1 px-1 font-normal whitespace-nowrap",
                                    children: DDBTR("작성 시간")
                                }), j && o.jsx("th", {
                                    className: "py-1 px-1 font-normal whitespace-nowrap",
                                    children: DDBTR("완료 시간")
                                }), o.jsx("th", {
                                    className: "py-1 px-1 w-5"
                                })]
                            })
                        }), o.jsx("tbody", {
                            children: G.map((S, D) => o.jsxs("tr", {
                                className: "border-b border-white/5 hover:bg-white/5",
                                children: [X && o.jsx("td", {
                                    className: "pl-2 pr-1 py-1 text-white/25 text-right text-[10px]",
                                    children: D + 1
                                }), o.jsx("td", {
                                    className: "px-1 py-1",
                                    children: o.jsxs("div", {
                                        className: "flex items-center gap-1.5 min-w-0",
                                        children: [o.jsx("span", {
                                            className: "w-2 h-2 rounded-full flex-shrink-0",
                                            style: {
                                                backgroundColor: S.color
                                            }
                                        }), o.jsx("button", {
                                            onClick: () => n({
                                                type: "TOGGLE_TODO",
                                                id: S.id
                                            }),
                                            style: {
                                                color: S.color
                                            },
                                            className: "flex-shrink-0",
                                            children: o.jsx(Rf, {
                                                size: 11
                                            })
                                        }), o.jsx("span", {
                                            className: "truncate text-[11px] text-white/85",
                                            children: S.content.split(`
`)[0]
                                        })]
                                    })
                                }), ce && o.jsx("td", {
                                    className: "px-1 py-1 text-white/30 text-center text-[10px] whitespace-nowrap",
                                    children: Y(S.createdAt)
                                }), j && o.jsx("td", {
                                    className: "px-1 py-1 text-white/20 text-center text-[10px]",
                                    children: "—"
                                }), o.jsx("td", {
                                    className: "px-1 py-1",
                                    children: o.jsx("button", {
                                        onClick: () => n({
                                            type: "DELETE_TODO",
                                            id: S.id
                                        }),
                                        className: "text-white/15 hover:text-red-300",
                                        children: o.jsx(Gr, {
                                            size: 10
                                        })
                                    })
                                })]
                            }, S.id))
                        })]
                    })
                })]
            }), o.jsxs("div", {
                className: "flex-1 flex flex-col min-h-0",
                children: [o.jsxs("div", {
                    className: "flex items-center gap-2 px-3 py-1.5 border-b border-white/10 flex-shrink-0",
                    style: {
                        background: "rgba(34,197,94,0.08)"
                    },
                    children: [o.jsx("span", {
                        className: "text-green-300 text-[11px] font-semibold",
                        children: DDBTR("완료한 일")
                    }), o.jsxs("span", {
                        className: "text-green-300/50 text-[10px]",
                        children: [re.length, "개"]
                    }), re.length > 0 && o.jsx("button", {
                        onClick: () => re.forEach(S => n({
                            type: "DELETE_TODO",
                            id: S.id
                        })),
                        className: "ml-auto text-white/20 hover:text-red-300 text-[10px]",
                        children: DDBTR("전체 삭제")
                    })]
                }), o.jsx("div", {
                    className: "flex-1 overflow-y-auto min-h-0",
                    children: re.length === 0 ? o.jsx("p", {
                        className: "text-white/20 text-center py-8 text-xs",
                        children: DDBTR("완료한 할 일이 없습니다")
                    }) : o.jsxs("table", {
                        className: "w-full border-collapse text-xs",
                        children: [o.jsx("thead", {
                            children: o.jsxs("tr", {
                                className: "border-b border-white/10 text-white/25 text-[10px]",
                                children: [X && o.jsx("th", {
                                    className: "py-1 pl-2 text-right w-7 font-normal",
                                    children: "#"
                                }), o.jsx("th", {
                                    className: "py-1 px-1 text-left font-normal",
                                    children: DDBTR("내용")
                                }), ce && o.jsx("th", {
                                    className: "py-1 px-1 font-normal whitespace-nowrap",
                                    children: DDBTR("작성 시간")
                                }), j && o.jsx("th", {
                                    className: "py-1 px-1 font-normal whitespace-nowrap",
                                    children: DDBTR("완료 시간")
                                }), o.jsx("th", {
                                    className: "py-1 px-1 w-5"
                                })]
                            })
                        }), o.jsx("tbody", {
                            children: re.map((S, D) => o.jsxs("tr", {
                                className: "border-b border-white/5 opacity-50",
                                children: [X && o.jsx("td", {
                                    className: "pl-2 pr-1 py-1 text-white/25 text-right text-[10px]",
                                    children: D + 1
                                }), o.jsx("td", {
                                    className: "px-1 py-1",
                                    children: o.jsxs("div", {
                                        className: "flex items-center gap-1.5 min-w-0",
                                        children: [o.jsx("span", {
                                            className: "w-2 h-2 rounded-full flex-shrink-0",
                                            style: {
                                                backgroundColor: S.color
                                            }
                                        }), o.jsx("button", {
                                            onClick: () => n({
                                                type: "TOGGLE_TODO",
                                                id: S.id
                                            }),
                                            style: {
                                                color: S.color
                                            },
                                            className: "flex-shrink-0",
                                            children: o.jsx(rl, {
                                                size: 11
                                            })
                                        }), o.jsx("span", {
                                            className: "truncate text-[11px] line-through text-white/40",
                                            children: S.content.split(`
`)[0]
                                        })]
                                    })
                                }), ce && o.jsx("td", {
                                    className: "px-1 py-1 text-white/30 text-center text-[10px] whitespace-nowrap",
                                    children: Y(S.createdAt)
                                }), j && o.jsx("td", {
                                    className: "px-1 py-1 text-green-400/50 text-center text-[10px] whitespace-nowrap",
                                    children: Y(S.completedAt)
                                }), o.jsx("td", {
                                    className: "px-1 py-1",
                                    children: o.jsx("button", {
                                        onClick: () => n({
                                            type: "DELETE_TODO",
                                            id: S.id
                                        }),
                                        className: "text-white/15 hover:text-red-300",
                                        children: o.jsx(Gr, {
                                            size: 10
                                        })
                                    })
                                })]
                            }, S.id))
                        })]
                    })
                })]
            })]
        })] }), ne && Rr.createPortal(o.jsxs("div", {
            style: {
                position: "fixed",
                left: Math.min(ne.x, window.innerWidth - 250),
                top: Math.max(8, Math.min(ne.y, window.innerHeight - 180)),
                zIndex: 700,
                maxWidth: 240,
                pointerEvents: "none"
            },
            className: "bg-gray-950/98 backdrop-blur-sm border border-white/25 rounded-xl shadow-2xl py-2.5 px-3 flex flex-col gap-1.5",
            children: [o.jsx("p", {
                className: "text-white/35 text-[10px] leading-none",
                children: ne.dateStr
            }), o.jsx("p", {
                className: "text-white text-xs font-medium leading-snug whitespace-pre-wrap break-words",
                children: ne.ev.title || "(제목 없음)"
            }), ne.ev.amount !== void 0 && o.jsxs("p", {
                className: `text-xs font-semibold tabular-nums ${ne.ev.amount>=0?"text-teal-300":"text-rose-300"}`,
                children: [ne.ev.amount >= 0 ? "+" : "", ne.ev.amount.toLocaleString(), "원", ne.ev.bankTx ? DDBTR(" (은행)") : ""]
            }), ne.ev.memo && o.jsx("p", {
                className: "text-white/55 text-[11px] leading-snug whitespace-pre-wrap break-words border-t border-white/10 pt-1.5 mt-0.5",
                children: ne.ev.memo
            })]
        }), document.body), te && Rr.createPortal(o.jsxs("div", {
            style: {
                position: "fixed",
                left: Math.min(te.rect.right + 6, window.innerWidth - 280),
                top: Math.max(8, Math.min(te.rect.top, window.innerHeight - 300)),
                zIndex: 600,
                maxWidth: 270,
                minWidth: 190
            },
            className: "bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl py-2 px-1",
            onMouseEnter: () => clearTimeout(Fe.current),
            onMouseLeave: () => {
                he(null), nr(null)
            },
            children: [o.jsx("p", {
                className: "text-white/40 text-[10px] px-2 mb-1",
                children: te.dateStr
            }), te.events.map(S => {
                const D = S.amount !== void 0,
                    J = S.customColor || qt[S.color] || "#999",
                    le = D ? (S.amount >= 0 ? "+" : "") + S.amount.toLocaleString() + "원" + (S.bankTx ? DDBTR(" (은행)") : "") : "";
                return o.jsxs("div", {
                    className: "flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-colors " + (Gt === S.id ? "bg-white/15" : "hover:bg-white/10"),
                    onMouseEnter: () => nr(S.id),
                    onMouseLeave: () => nr(null),
                    onClick: () => {
                        D ? P(S, te.dateStr) : (v(S), p(te.dateStr), y(""), _(!0)), he(null)
                    },
                    children: [o.jsx("span", {
                        className: "w-2 h-2 rounded-full flex-shrink-0",
                        style: {
                            backgroundColor: J
                        }
                    }), o.jsx("span", {
                        className: "flex-1 truncate " + (D && S.amount >= 0 ? "text-green-300" : D ? "text-red-300" : "text-white/85"),
                        style: {
                            fontSize: 11
                        },
                        children: ddbTT(S.title)
                    }), D && o.jsx("span", {
                        className: "text-[10px] font-mono " + (S.amount >= 0 ? "text-green-300" : "text-red-300"),
                        children: le
                    })]
                }, S.id)
            })]
        }), document.body), N && Rr.createPortal(o.jsx("div", {
            style: {
                position: "fixed",
                inset: 0,
                zIndex: 900
            },
            className: "flex items-center justify-center",
            onClick: () => V(null),
            children: o.jsxs("div", {
                className: "bg-gray-900 border border-white/20 rounded-xl shadow-2xl p-5 min-w-[260px]",
                onClick: S => S.stopPropagation(),
                children: [o.jsxs("p", {
                    className: "text-white/80 text-sm mb-1",
                    children: [N.dateStr, " 날짜의 일정 삭제"]
                }), o.jsxs("p", {
                    className: "text-white/40 text-xs mb-4",
                    children: [qs(N.dateStr).length, "개 항목이 삭제됩니다."]
                }), o.jsxs("div", {
                    className: "flex gap-2",
                    children: [o.jsx("button", {
                        onClick: () => V(null),
                        className: "flex-1 py-1.5 rounded-lg text-xs bg-white/10 text-white/70 hover:bg-white/20",
                        children: DDBTR("취소")
                    }), o.jsx("button", {
                        onClick: () => {
                            qs(N.dateStr).forEach(S => teamOn ? ddbTeamDelEvent(S.id) : n({
                                type: "DELETE_EVENT",
                                id: S.id
                            })), V(null)
                        },
                        className: "flex-1 py-1.5 rounded-lg text-xs bg-red-500/70 text-white hover:bg-red-500",
                        children: DDBTR("삭제")
                    })]
                })]
            })
        }), document.body), It && Rr.createPortal(o.jsx("div", {
            style: {
                position: "fixed",
                inset: 0,
                zIndex: 800
            },
            onClick: () => tt(null),
            children: o.jsxs("div", {
                style: {
                    position: "absolute",
                    top: 60,
                    left: "50%",
                    transform: "translateX(-50%)",
                    maxWidth: 360,
                    width: "90%"
                },
                className: "bg-gray-900/98 border border-white/20 rounded-2xl shadow-2xl p-4",
                onClick: S => S.stopPropagation(),
                children: [o.jsxs("div", {
                    className: "flex items-center gap-2 mb-3",
                    children: [o.jsx("span", {
                        className: "w-3 h-3 rounded-full flex-shrink-0",
                        style: {
                            backgroundColor: It.color
                        }
                    }), o.jsx("span", {
                        className: "text-white/60 text-xs",
                        children: It.tabTitle
                    }), o.jsx("button", {
                        onClick: () => tt(null),
                        className: "ml-auto text-white/30 hover:text-white/80",
                        children: "✕"
                    })]
                }), o.jsx("p", {
                    className: "text-white/90 text-sm leading-relaxed whitespace-pre-wrap",
                    children: It.content
                }), o.jsxs("div", {
                    className: "flex items-center gap-2 mt-3 pt-3 border-t border-white/10",
                    children: [o.jsx("span", {
                        className: "text-[18px]",
                        style: {
                            color: xs(It).color
                        },
                        children: t.settings.feedbackIcon ? o.jsx("img", {
                            src: t.settings.feedbackIcon,
                            className: "w-5 h-5 object-contain inline-block"
                        }) : xs(It).emoji
                    }), o.jsxs("p", {
                        className: "text-white/70 text-xs",
                        children: [Ra(It), "일 경과"]
                    }), o.jsxs("div", {
                        className: "ml-auto flex gap-2",
                        children: [o.jsx("button", {
                            onClick: () => {
                                n({
                                    type: "DISMISS_FEEDBACK_MEMO",
                                    id: It.id
                                }), tt(null)
                            },
                            className: "px-3 py-1 rounded-lg text-xs bg-white/10 text-white/70 hover:bg-white/20",
                            children: DDBTR("숨기기")
                        }), o.jsx("button", {
                            onClick: () => {
                                n({
                                    type: "COMPLETE_FEEDBACK_MEMO",
                                    id: It.id
                                }), tt(null)
                            },
                            className: "px-3 py-1 rounded-lg text-xs bg-green-500/70 text-white hover:bg-green-500",
                            children: DDBTR("완료")
                        })]
                    })]
                })]
            })
        }), document.body), teamPick && Rr.createPortal(o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "fixed inset-0", style: { zIndex: 2147483646, backgroundColor: "rgba(0,0,0,0.4)" }, onClick: () => setTeamPick(null) }), o.jsxs("div", { className: "fixed rounded-xl shadow-2xl p-3 flex flex-col gap-2 w-72 max-w-[90vw]", style: { zIndex: 2147483647, left: "50%", top: "50%", transform: "translate(-50%,-50%)", backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.18)" }, children: [o.jsx("div", { className: "text-white/80 text-sm font-semibold px-1", children: DDBTR("팀 선택") }), o.jsx("div", { className: "flex flex-col gap-1 max-h-72 overflow-y-auto", children: teamPick.map(tm => o.jsxs("button", { className: "flex items-center justify-between px-3 py-2 rounded bg-white/6 hover:bg-white/12 text-left cursor-pointer border-none w-full", onClick: () => { ddbActivateTeam(tm); setTeamOn(!0); setTeamPick(null) }, children: [o.jsxs("span", { className: "text-white text-sm", children: ["\u{1F465} ", tm.name] }), o.jsxs("span", { className: "text-white/40 text-xs", children: [tm.is_owner ? DDBTR("소유자") : tm.role === "editor" ? DDBTR("편집자") : DDBTR("뷰어"), " \u00b7 ", tm.member_count, DDBTR("명")] })] }, tm.team_id)) }), o.jsx("button", { className: "text-white/40 text-xs py-1 cursor-pointer bg-transparent border-none", onClick: () => setTeamPick(null), children: DDBTR("취소") })] })] }), document.body), _iAmShareOwner && shareSel !== null && Rr.createPortal(o.jsxs("div", { className: "fixed rounded-2xl shadow-2xl flex flex-col overflow-hidden", style: { zIndex: 2147483647, left: shGeo.x, top: shGeo.y, width: 244, backgroundColor: "rgba(17,24,39,0.98)", border: "2px solid rgba(96,165,250,0.75)" }, children: [o.jsxs("div", { onMouseDown: _shdh.drag, style: { cursor: "grab" }, className: "flex items-center justify-between px-3 py-2 bg-blue-600/30 select-none flex-shrink-0", children: [o.jsxs("span", { className: "text-white text-xs font-bold", children: ["\u{1F4C5} " + DDBTR("일정 공유") + " \u00b7 ", o.jsx("b", { className: "text-blue-300", children: shareSel.length }), DDBTR("일")] }), o.jsx("button", { onClick: () => setShareSel(null), className: "text-white/50 hover:text-white text-base leading-none cursor-pointer bg-transparent border-none", children: "\u2715" })] }), o.jsxs("div", { className: "px-2 pb-2 pt-2 flex flex-col gap-1.5", children: [o.jsx("div", { className: "text-white/40 text-[10px] px-1 leading-tight", children: DDBTR("날짜 클릭 · 0.5초 누르고 드래그로 여러 개 · 다른 달로 옮겨도 유지") }), o.jsx("button", { onClick: async () => { if (!shareSel.length) return; const lb = teamOn && teamMeta ? teamMeta.name : ""; let ok = !1; try { const b = await ddbSelImageBlob(shareSel, teamOn ? teamEv : i, lb); await navigator.clipboard.write([new ClipboardItem({ "image/png": b })]); ok = !0 } catch {} setShareSel(null); setShareToast(ok ? DDBTR("이미지 복사됨! 카톡에 붙여넣기(Ctrl+V)") : DDBTR("이미지 복사 실패 \u2014 텍스트로 시도하세요")); setTimeout(() => setShareToast(""), 2600); }, className: "w-full text-left px-3 py-2 rounded-lg text-sm text-white/90 bg-white/10 hover:bg-white/20 cursor-pointer border-none transition-colors" + (shareSel.length ? "" : " opacity-40 pointer-events-none"), children: "\u{1F5BC} " + DDBTR("이미지로 내보내기") }), o.jsx("button", { onClick: async () => { if (!shareSel.length) return; let ok = !1; try { await navigator.clipboard.writeText(ddbSelText(shareSel, teamOn ? teamEv : i)); ok = !0 } catch {} setShareSel(null); setShareToast(ok ? DDBTR("표 복사됨! 엑셀에 붙여넣기(Ctrl+V)") : DDBTR("복사 실패")); setTimeout(() => setShareToast(""), 2600); }, className: "w-full text-left px-3 py-2 rounded-lg text-sm text-white/90 bg-white/10 hover:bg-white/20 cursor-pointer border-none transition-colors" + (shareSel.length ? "" : " opacity-40 pointer-events-none"), children: "\u{1F4CB} " + DDBTR("텍스트로 내보내기") }), o.jsx("button", { onClick: () => { if (!shareSel.length) return; try { ddbDownloadIcs(ddbSelIcs(shareSel, teamOn ? teamEv : i), "MomentPlan-" + s + "-" + a); } catch {} setShareSel(null); setShareToast(DDBTR("ics 파일을 저장했습니다")); setTimeout(() => setShareToast(""), 2600); }, className: "w-full text-left px-3 py-2 rounded-lg text-sm text-white/90 bg-white/10 hover:bg-white/20 cursor-pointer border-none transition-colors" + (shareSel.length ? "" : " opacity-40 pointer-events-none"), children: "\u{1F4C6} " + DDBTR("ics로 내보내기") })] })] }), document.body), monShare && Rr.createPortal(o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "fixed inset-0", style: { zIndex: 2147483646, backgroundColor: "rgba(0,0,0,0.4)" }, onClick: () => setMonShare(!1) }), o.jsxs("div", { className: "fixed rounded-2xl shadow-2xl p-3", style: { zIndex: 2147483647, left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 300, backgroundColor: "rgba(17,24,39,0.98)", border: "2px solid rgba(96,165,250,0.6)" }, children: [o.jsxs("div", { className: "flex items-center justify-between mb-3", children: [o.jsx("button", { onClick: () => setNavYear(y => y - 1), className: "text-white/70 hover:text-white text-xl px-3 py-1 cursor-pointer bg-transparent border-none", children: "‹" }), o.jsx("span", { className: "text-white font-bold text-base", children: ddbYLabel(navYear) }), o.jsx("button", { onClick: () => setNavYear(y => y + 1), className: "text-white/70 hover:text-white text-xl px-3 py-1 cursor-pointer bg-transparent border-none", children: "›" })] }), o.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(mm => o.jsx("button", { onClick: () => { r(navYear, mm); setMonShare(!1) }, className: "py-2.5 rounded-lg text-sm cursor-pointer border-none transition-colors " + (navYear === s && mm === a ? "bg-blue-600 text-white font-bold" : "bg-white/10 text-white/85 hover:bg-white/20"), children: ddbMLabel(mm) }, mm)) })] })] }), document.body), shareDay && Rr.createPortal(o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "fixed inset-0", style: { zIndex: 2147483646 }, onClick: () => setShareDay(null) }), o.jsxs("div", { className: "fixed rounded-lg shadow-2xl p-1.5 flex flex-col gap-0.5", style: { zIndex: 2147483647, left: Math.max(8, Math.min(shareDay.left - 150, (window.innerWidth || 800) - 170)) + "px", top: (shareDay.top + 4) + "px", backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.18)", minWidth: "162px" }, children: [o.jsx("div", { className: "text-white/45 text-[10px] px-1.5 pb-1", children: shareDay.date }), o.jsx("button", { className: "text-left px-2 py-1.5 rounded text-xs text-white/90 hover:bg-white/10 cursor-pointer border-none bg-transparent", onClick: async () => { const ok = await ddbCopyImage(shareDay.date, shareDay.events, shareDay.label); setShareToast(ok ? DDBTR("이미지 복사됨! 카톡에 붙여넣기(Ctrl+V)") : DDBTR("이미지 복사 실패 — 텍스트로 시도하세요")); setShareDay(null); setTimeout(() => setShareToast(""), 2600) }, children: "🖼 " + DDBTR("이미지 복사") }), o.jsx("button", { className: "text-left px-2 py-1.5 rounded text-xs text-white/90 hover:bg-white/10 cursor-pointer border-none bg-transparent", onClick: async () => { const ok = await ddbCopyText(ddbDayText(shareDay.date, shareDay.events, shareDay.label)); setShareToast(ok ? DDBTR("텍스트 복사됨! 카톡에 붙여넣기(Ctrl+V)") : DDBTR("복사 실패")); setShareDay(null); setTimeout(() => setShareToast(""), 2600) }, children: "📋 " + DDBTR("텍스트 복사") })] })] }), document.body), shareToast && Rr.createPortal(o.jsx("div", { className: "fixed left-1/2 bottom-10 px-4 py-2 rounded-lg text-white text-sm shadow-2xl", style: { zIndex: 2147483647, transform: "translateX(-50%)", backgroundColor: "rgba(30,41,59,0.97)", border: "1px solid rgba(255,255,255,0.22)" }, children: shareToast }), document.body), g && Rr.createPortal(o.jsx(Nw, {
            date: x ?? "",
            initialEndDate: m || void 0,
            event: w,
            onClose: () => {
                _(!1), v(null)
            }
        }), document.body)]
    })
}

function VT(e, t) {
    const n = "| " + Array.from({
            length: t
        }, (i, l) => `열${l+1}`).join(" | ") + " |",
        s = "|" + Array(t).fill("------").join("|") + "|",
        a = "| " + Array(t).fill("     ").join(" | ") + " |";
    return [n, s, ...Array(e - 1).fill(a)].join(`
`) + `
`
}

function GT(e) {
    const t = e.trim().split(`
`).map(l => l.trim()).filter(l => l.length > 0);
    if (t.length < 2) return null;
    const r = t[0];
    if (!r.startsWith("|") || !r.endsWith("|")) return null;
    const isSep = l => { const c = (l.startsWith("|") && l.endsWith("|") ? l.slice(1, -1) : l); return /-/.test(c) && /^[-:\s|]+$/.test(c) };
    if (!t.slice(1).some(isSep)) return null;
    const i = l => { const c = l.trim(); return (c.startsWith("|") && c.endsWith("|") ? c.slice(1, -1) : c).split("|").map(h => h.trim()) };
    return { headers: i(r), rows: t.slice(1).filter(l => !isSep(l)).map(i) }
}

function ddbIsSepLine(l) { const c = l.trim().replace(/^\||\|$/g, ""); return /-/.test(c) && /^[-:\s|]+$/.test(c) }
function ddbStripSep(md) { return String(md || "").split("\n").filter(l => !ddbIsSepLine(l)).join("\n") }
function ddbEnsureSep(md) { const lines = String(md || "").split("\n").filter(l => l.trim().length > 0); if (lines.length < 1) return md; const h = lines[0].trim(); if (!(h.startsWith("|") && h.endsWith("|"))) return md; if (lines.length >= 2 && ddbIsSepLine(lines[1])) return lines.join("\n"); const n = Math.max(1, h.split("|").length - 2); const sep = "|" + Array(n).fill("------").join("|") + "|"; return [lines[0], sep, ...lines.slice(1).filter(l => !ddbIsSepLine(l))].join("\n") }
function KT(e) {
    const t = e.trim().split(`
`).filter(i => i.trim());
    if (t.length < 1 || !t.some(i => i.includes("	"))) return null;
    const r = t.map(i => i.split("	").map(l => l.trim())),
        n = Math.max(...r.map(i => i.length)),
        s = i => "| " + [...i, ...Array(Math.max(0, n - i.length)).fill("")].map(c => c.replace(/\|/g, "\\|") || " ").join(" | ") + " |",
        a = "|" + Array(n).fill("------").join("|") + "|";
    return r.length === 1 ? [s(r[0]), a, s(Array(n).fill(""))].join(`
`) + `
` : [s(r[0]), a, ...r.slice(1).map(s)].join(`
`) + `
`
}

function YT(e) {
    try {
        const t = document.createElement("div");
        t.innerHTML = e;
        const r = t.querySelector("table");
        if (!r) return null;
        const n = [];
        if (r.querySelectorAll("tr").forEach(l => {
                const c = [];
                l.querySelectorAll("th,td").forEach(u => {
                    c.push((u.textContent ?? "").trim().replace(/\|/g, "\\|"))
                }), c.length > 0 && n.push(c)
            }), n.length < 1) return null;
        const s = Math.max(...n.map(l => l.length)),
            a = l => "| " + [...l, ...Array(Math.max(0, s - l.length)).fill("")].map(u => u || " ").join(" | ") + " |",
            i = "|" + Array(s).fill("------").join("|") + "|";
        return n.length === 1 ? [a(n[0]), i, a(Array(s).fill(""))].join(`
`) + `
` : [a(n[0]), i, ...n.slice(1).map(a)].join(`
`) + `
`
    } catch {
        return null
    }
}
const Cw = 74,
    Aw = 74,
    fm = 40,
    xm = 600;

function M0(e) {
    try {
        const t = localStorage.getItem(`memo-resize-${e}`);
        if (t) return JSON.parse(t)
    } catch {}
    return {
        input: Cw,
        list: Aw
    }
}

function XT(e, t, r) {
    try {
        localStorage.setItem(`memo-resize-${e}`, JSON.stringify({
            input: t,
            list: r
        }))
    } catch {}
}

function jw({
    tabId: e
} = {}) {
    const {
        state: t,
        dispatch: r
    } = vt(), {
        memoTabs: n,
        activeTab: s
    } = t, a = e ?? s, i = n.find(R => R.id === a), [l, c] = O.useState(""), u = O.useRef(null), ml = O.useRef(null), [h, d] = O.useState(!1), [f, x] = O.useState([0, 0]), p = O.useRef(null), [m, y] = O.useState(() => M0(a ?? "").input), [w, v] = O.useState(() => M0(a ?? "").list); const [mo, setMo] = O.useState("input"); const [selIdx, setSelIdx] = O.useState(0); const escRef = O.useRef(0); const [editId, setEditId] = O.useState(null);
    O.useEffect(() => {
        if (!a) return;
        const R = M0(a);
        y(R.input), v(R.list)
    }, [a]), O.useEffect(() => {
        a && XT(a, m, w)
    }, [a, m, w]), O.useEffect(() => {
        if (!h) return;

        function R(K) {
            p.current && !p.current.contains(K.target) && d(!1)
        }
        return document.addEventListener("mousedown", R), () => document.removeEventListener("mousedown", R)
    }, [h]);

    function g(R, K) {
        if (!i) return;
        const se = VT(R, K);
        r({
            type: "ADD_MEMO_ITEM",
            tabId: i.id,
            item: {
                id: Ft(),
                content: se.trim(),
                createdAt: new Date().toISOString()
            }
        }), d(!1), setTimeout(() => ml.current && (ml.current.scrollTop = 0), 30)
    }

    function _(R) {
        const K = R.clipboardData.getData("text/html"),
            se = R.clipboardData.getData("text/plain");
        let z = null;
        K && (z = YT(K)), !z && se.includes("	") && (z = KT(se)), z && (R.preventDefault(), i && r({
            type: "ADD_MEMO_ITEM",
            tabId: i.id,
            item: {
                id: Ft(),
                content: z.trim(),
                createdAt: new Date().toISOString()
            }
        }), setTimeout(() => ml.current && (ml.current.scrollTop = 0), 30))
    }
    const k = O.useRef({
            dragging: !1,
            startY: 0,
            startH: 0
        }),
        E = O.useCallback(R => {
            R.preventDefault(), k.current = {
                dragging: !0,
                startY: R.clientY,
                startH: m
            };

            function K(z) {
                k.current.dragging && y(Math.max(fm, Math.min(xm, k.current.startH + z.clientY - k.current.startY)))
            }

            function se() {
                k.current.dragging = !1, window.removeEventListener("mousemove", K), window.removeEventListener("mouseup", se)
            }
            window.addEventListener("mousemove", K), window.addEventListener("mouseup", se)
        }, [m]),
        b = O.useRef({
            dragging: !1,
            startY: 0,
            startH: 0
        }),
        T = O.useCallback(R => {
            R.preventDefault(), b.current = {
                dragging: !0,
                startY: R.clientY,
                startH: w
            };

            function K(z) {
                b.current.dragging && v(Math.max(fm, Math.min(xm, b.current.startH + z.clientY - b.current.startY)))
            }

            function se() {
                b.current.dragging = !1, window.removeEventListener("mousemove", K), window.removeEventListener("mouseup", se)
            }
            window.addEventListener("mousemove", K), window.addEventListener("mouseup", se)
        }, [w]);
    if (!i || a === "calendar") return o.jsxs("div", {
        className: "flex items-center justify-center text-white/20 text-xs p-4 text-center",
        style: {
            height: Cw + Aw + 16
        },
        children: ["탭을 선택하거나", o.jsx("br", {}), "위 탭 + 버튼으로 창을 열어보세요"]
    });
    const A = [...i.items].sort((R, K) => (K.pinned ? 1 : 0) - (R.pinned ? 1 : 0));
    function onListKey(R) {
        if (!t.settings.memoKbdNav || !A.length) return;
        const ix = Math.min(selIdx, A.length - 1), it = A[ix];
        if (R.key === "ArrowDown") { R.preventDefault(); setSelIdx(v => Math.min(A.length - 1, v + 1)) }
        else if (R.key === "ArrowUp") { R.preventDefault(); setSelIdx(v => Math.max(0, v - 1)) }
        else if (R.key === "ArrowRight") { R.preventDefault(); it && !it.expanded && r({ type: "UPDATE_MEMO_ITEM", tabId: i.id, item: { ...it, expanded: !0 } }) }
        else if (R.key === "ArrowLeft") { R.preventDefault(); it && it.expanded && r({ type: "UPDATE_MEMO_ITEM", tabId: i.id, item: { ...it, expanded: !1 } }) }
        else if (R.key === "Enter") { R.preventDefault(); if (it) { c(it.content); setEditId(it.id); setMo("input"); setTimeout(() => u.current && u.current.focus(), 20) } }
    }
    O.useEffect(() => { if (mo === "list" && t.settings.memoKbdNav && ml.current) { ml.current.focus(); const el = ml.current.querySelector('[data-midx="' + Math.min(selIdx, Math.max(0, A.length - 1)) + '"]'); el && el.scrollIntoView({ block: "nearest" }) } }, [mo, selIdx]);

    function H() {
        var R;
        if (!l.trim()) return;
        if (editId) { const it = i.items.find(z => z.id === editId); it && r({ type: "UPDATE_MEMO_ITEM", tabId: i.id, item: { ...it, content: l.trim() } }); setEditId(null); c(""); setSelIdx(0); setMo("list"); return }
        r({ type: "ADD_MEMO_ITEM", tabId: i.id, item: { id: Ft(), content: l.trim(), createdAt: new Date().toISOString() } }), c(""), (R = u.current) == null || R.focus()
    }

    function F(R) {
        const K = {
            id: Ft(),
            content: R.content,
            color: i.color,
            tabTitle: i.title,
            createdAt: new Date().toISOString(),
            isDismissed: !1
        };
        r({
            type: "ADD_FEEDBACK_MEMO",
            memo: K
        })
    }
    return o.jsxs("div", {
        className: "flex flex-col h-full min-h-0",
        children: [(mo === "input") && o.jsxs("div", {
            className: "flex-1 flex flex-col overflow-hidden min-h-0",
            children: [o.jsxs("div", {
                className: "px-2 pt-2 flex-1 flex flex-col min-h-0",
                children: [o.jsxs("div", {
                    className: "flex items-center gap-1 mb-1 flex-shrink-0",
                    children: [o.jsx("span", {
                        className: "w-2 h-2 rounded-full flex-shrink-0",
                        style: {
                            backgroundColor: i.color
                        }
                    }), o.jsx("span", {
                        className: "text-white/60 text-xs font-medium flex-1",
                        children: ddbTT(i.title)
                    }), o.jsxs("div", {
                        ref: p,
                        className: "relative",
                        children: [o.jsx("button", {
                            onClick: () => d(R => !R),
                            title: DDBTR("표 삽입"),
                            className: `p-0.5 rounded transition-colors ${h?"text-white/80 bg-white/15":"text-white/30 hover:text-white/80 hover:bg-white/10"}`,
                            children: o.jsx(yT, {
                                size: 12
                            })
                        }), h && (() => {
                            const _gc = Math.min(12, Math.max(6, (f[1] || 0) + 2)),
                                _gr = Math.min(20, Math.max(6, (f[0] || 0) + 2)),
                                _rect = p.current ? p.current.getBoundingClientRect() : null,
                                _gw = _gc * 22 + 16,
                                _left = _rect ? Math.max(8, Math.min(_rect.right - _gw, (window.innerWidth || 800) - _gw - 8)) : 100,
                                _top = _rect ? _rect.bottom + 6 : 100;
                            return Rr.createPortal(o.jsxs(o.Fragment, {
                                children: [o.jsx("div", { className: "fixed inset-0", style: { zIndex: 2147483646 }, onClick: () => { d(!1), x([0, 0]) } }),
                                o.jsxs("div", {
                                    className: "fixed bg-[#1e1e2e] border border-white/20 rounded-lg p-2 shadow-2xl",
                                    style: { zIndex: 2147483647, left: _left + "px", top: _top + "px" },
                                    onMouseLeave: () => x([0, 0]),
                                    children: [o.jsx("p", { className: "text-white/60 text-[11px] mb-1.5 text-center font-medium", children: f[0] > 0 ? `${f[0]} \u00d7 ${f[1]}` : DDBTR("표 크기 선택") }),
                                    o.jsx("div", { className: "grid gap-0.5", style: { gridTemplateColumns: `repeat(${_gc},1fr)` }, children: Array.from({ length: _gc * _gr }, (R, K) => {
                                        const z = K % _gc + 1, se = Math.floor(K / _gc) + 1, G = se <= f[0] && z <= f[1];
                                        return o.jsx("div", { className: `w-5 h-5 rounded-sm border cursor-pointer transition-colors ${G?"bg-blue-500/60 border-blue-400/80":"bg-white/5 border-white/15 hover:bg-white/15"}`, onMouseEnter: () => x([se, z]), onClick: () => g(se, z) }, K)
                                    }) }),
                                    o.jsx("p", { className: "text-white/25 text-[9px] mt-1.5 text-center", children: DDBTR("끝으로 갈수록 칸이 늘어납니다") })]
                                })]
                            }), document.body)
                        })()]
                    })]
                }), o.jsx("textarea", {
                    ref: u,
                    "data-ddb-memo": a,
                    value: l,
                    onChange: R => c(R.target.value),
                    onKeyDown: R => {
                        if (R.key === "Enter" && (R.ctrlKey || R.metaKey)) return H();
                        if (t.settings.memoKbdNav) { if ((R.ctrlKey || R.metaKey) && R.key === "ArrowLeft") { R.preventDefault(); setSelIdx(0); setMo("list") } else if (R.key === "Escape") escRef.current = Date.now(); else if (R.key === "Backspace" && Date.now() - escRef.current < 1500) { R.preventDefault(); escRef.current = 0; setSelIdx(0); setMo("list") } }
                    },
                    onPaste: _,
                    placeholder: `내용 입력 (Ctrl+Enter 추가)
엑셀/웹 표 붙여넣기 → 자동 저장`,
                    className: "flex-1 w-full bg-transparent text-white/80 placeholder-white/25 text-xs resize-none focus:outline-none min-h-0",
                    style: {
                        fontSize: Math.max(10, t.fontSize - 1)
                    }
                })]
            }), o.jsxs("div", {
                className: "px-2 pb-1 flex-shrink-0 flex items-center gap-1",
                children: [o.jsxs("button", {
                    onClick: H,
                    disabled: !l.trim(),
                    className: "flex-1 py-0.5 text-xs text-white/40 hover:text-white hover:bg-white/10 rounded disabled:opacity-30 flex items-center justify-center gap-1 transition-colors",
                    children: [o.jsx(Vr, {
                        size: 10
                    }), editId ? " 저장 (Ctrl+Enter)" : " 추가 (Ctrl+Enter)"]
                }), o.jsxs("button", {
                    onClick: () => { setSelIdx(0); setMo("list") },
                    className: "px-2 py-0.5 text-xs text-white/50 hover:text-white bg-white/8 hover:bg-white/15 rounded flex items-center gap-1 whitespace-nowrap border-none cursor-pointer",
                    children: ["📋 ", DDBTR("목록")]
                })]
            })]
        }), (!1) && o.jsx("div", {
            onMouseDown: E,
            className: "flex-shrink-0 h-2 border-y border-white/10 bg-white/5 hover:bg-white/15 cursor-row-resize flex items-center justify-center transition-colors",
            title: DDBTR("드래그로 입력칸 크기 조절"),
            children: o.jsx("div", {
                className: "w-8 h-0.5 rounded-full bg-white/20"
            })
        }), (mo === "list") && o.jsxs("div", {
            className: "flex items-center gap-1 px-2 py-1.5 border-b border-white/10 flex-shrink-0",
            children: [o.jsx("span", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { backgroundColor: i.color } }), o.jsx("span", { className: "text-white/60 text-xs font-medium flex-1", children: ddbTT(i.title) }), o.jsxs("button", { onClick: () => { setEditId(null); c(""); setMo("input") }, className: "px-2 py-0.5 rounded text-[11px] bg-blue-500/25 text-blue-200 hover:bg-blue-500/40 border-none cursor-pointer whitespace-nowrap", children: ["\u270F\uFE0F ", DDBTR("새 메모")] })]
        }), (mo === "list") && o.jsxs("div", {
            ref: ml,
            tabIndex: 0,
            onKeyDown: onListKey,
            style: { outline: "none" },
            className: "overflow-y-auto thin-scroll px-2 py-1 flex flex-col gap-1 flex-1 min-h-0",
            children: [A.length === 0 && o.jsx("p", {
                className: "text-white/20 text-xs text-center mt-3",
                children: DDBTR("메모가 없습니다")
            }), A.map((R, _mi) => o.jsx("div", { "data-midx": _mi, className: (t.settings.memoKbdNav && _mi === selIdx) ? "rounded-lg ring-2 ring-blue-400/60" : "", children: o.jsx(qT, {
                item: R,
                fontSize: t.fontSize,
                tabColor: i.color,
                onDelete: () => r({
                    type: "DELETE_MEMO_ITEM",
                    tabId: i.id,
                    itemId: R.id
                }),
                onTogglePin: () => r({
                    type: "UPDATE_MEMO_ITEM",
                    tabId: i.id,
                    item: {
                        ...R,
                        pinned: !R.pinned
                    }
                }),
                onUpdate: K => r({
                    type: "UPDATE_MEMO_ITEM",
                    tabId: i.id,
                    item: {
                        ...R,
                        content: K
                    }
                }),
                onToggleExpand: () => r({
                    type: "UPDATE_MEMO_ITEM",
                    tabId: i.id,
                    item: {
                        ...R,
                        expanded: !R.expanded
                    }
                }),
                onFeedback: () => F(R)
            }) }, R.id))]
        })]
    })
}

function qT({
    item: e,
    fontSize: t,
    tabColor: r,
    onDelete: n,
    onTogglePin: s,
    onUpdate: a,
    onToggleExpand: i,
    onFeedback: l
}) {
    const [c, u] = O.useState(!1), [h, d] = O.useState(e.content), f = O.useRef(), x = O.useRef(!1), [p, m] = O.useState(!1), [y, w] = O.useState(!1), v = O.useRef(), g = c ? null : GT(e.content), _ = e.content.split(`
`), k = _[0], E = _.slice(1).join(`
`).trim(), b = E.length > 0, T = !!e.expanded;

    function A() {
        h.trim() && a(ddbEnsureSep(h.trim())), u(!1)
    }

    function H() {}

    function F() {
        clearTimeout(f.current), m(!1)
    }

    function R() {
        if (x.current) {
            x.current = !1;
            return
        }
        c || (clearTimeout(v.current), v.current = setTimeout(() => {
            g ? (u(!0), d(ddbStripSep(e.content))) : b ? i() : (u(!0), d(e.content))
        }, 200))
    }

    function K() {
        clearTimeout(v.current), u(!0), d(e.content)
    }
    const se = {
            border: "1px solid rgba(255,255,255,0.35)",
            minWidth: "52px",
            padding: "4px 8px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
        },
        z = {
            ...se,
            background: "rgba(255,255,255,0.12)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.90)",
            fontSize: "11px"
        },
        G = {
            ...se,
            color: "rgba(255,255,255,0.70)",
            fontSize: "11px"
        };
    return o.jsxs("div", {
        className: "group relative rounded-lg px-2 py-1.5 border transition-all flex-shrink-0 select-none " + (e.pinned ? "bg-yellow-400/10 border-yellow-400/30" : "bg-white/5 border-white/10 hover:bg-white/10"),
        style: p ? {
            borderColor: r,
            boxShadow: `0 0 0 1px ${r}50`
        } : void 0,
        onMouseDown: H,
        onMouseUp: F,
        onMouseLeave: F,
        onClick: R,
        onDoubleClick: K,
        children: [c ? o.jsx("textarea", {
            autoFocus: !0,
            value: h,
            onChange: re => d(re.target.value),
            onBlur: A,
            onKeyDown: re => {
                re.key === "Escape" && u(!1)
            },
            rows: Math.max(4, h.split(`
`).length + 1),
            className: "w-full bg-transparent text-white/90 text-xs resize-none focus:outline-none font-mono",
            style: {
                fontSize: Math.max(10, t - 1)
            }
        }) : g ? o.jsx("div", {
            className: "thin-scroll",
            style: {
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "240px",
                maxWidth: "100%",
                paddingRight: "28px"
            },
            children: o.jsxs("table", {
                style: {
                    borderCollapse: "collapse",
                    width: "auto",
                    minWidth: "100%"
                },
                children: [o.jsx("thead", {
                    children: o.jsx("tr", {
                        children: g.headers.map((re, Y) => o.jsx("th", {
                            style: z,
                            children: re || "-"
                        }, Y))
                    })
                }), o.jsx("tbody", {
                    children: g.rows.map((re, Y) => o.jsx("tr", {
                        style: {
                            background: Y % 2 === 1 ? "rgba(255,255,255,0.04)" : "transparent"
                        },
                        children: re.map((M, X) => o.jsx("td", {
                            style: G,
                            children: M || " "
                        }, X))
                    }, Y))
                })]
            })
        }) : o.jsxs("div", {
            className: "pr-10",
            children: [o.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [b && o.jsx("span", {
                    className: "text-white/35 text-[8px] flex-shrink-0 leading-none",
                    children: T ? "v" : ">"
                }), o.jsx("p", {
                    className: "text-white font-bold leading-snug flex-1 break-all",
                    style: {
                        fontSize: Math.max(11, t)
                    },
                    children: k
                })]
            }), b && T && o.jsx("p", {
                className: "text-white/50 whitespace-pre-wrap leading-relaxed mt-1 pl-3.5 border-l border-white/10",
                style: {
                    fontSize: Math.max(9, t - 2)
                },
                children: E
            })]
        }), o.jsxs("div", {
            className: "absolute top-1 right-1 hidden group-hover:flex gap-0.5 z-10",
            children: [o.jsx("button", {
                onClick: re => {
                    re.stopPropagation(), s()
                },
                className: "p-0.5 rounded " + (e.pinned ? "text-yellow-400" : "text-white/40 hover:text-white"),
                children: o.jsx(ld, {
                    size: 11
                })
            }), o.jsx("button", {
                onClick: re => {
                    re.stopPropagation(), n()
                },
                className: "p-0.5 rounded text-white/40 hover:text-red-300",
                children: o.jsx(Gr, {
                    size: 11
                })
            })]
        }), p && o.jsx("div", {
            className: "absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden",
            children: o.jsx("div", {
                className: "h-full animate-[longPressBar_1.5s_linear_forwards]",
                style: {
                    backgroundColor: r
                }
            })
        }), y && o.jsx("div", {
            className: "absolute inset-0 flex items-center justify-center rounded-lg pointer-events-none",
            style: {
                backgroundColor: `${r}dd`,
                zIndex: 10
            },
            children: o.jsx("span", {
                className: "text-white text-xs font-bold drop-shadow",
                children: DDBTR("피드백 등록!")
            })
        })]
    })
}
const JT = ["pink", "green", "blue", "yellow", "purple", "orange", "red", "teal"];

function QT({
    item: e,
    onClose: t
}) {
    const {
        dispatch: r
    } = vt(), {
        style: n,
        elRef: s,
        onHeaderMouseDown: a,
        resizeHandle: RZ
    } = Oi(550), [i, l] = O.useState((e == null ? void 0 : e.title) ?? ""), [c, u] = O.useState((e == null ? void 0 : e.date) ?? ""), [h, d] = O.useState((e == null ? void 0 : e.color) ?? "pink"), [f, x] = O.useState((e == null ? void 0 : e.type) ?? "anniversary"), [p, m] = O.useState((e == null ? void 0 : e.repeatUnit) ?? "monthly"), [y, w] = O.useState((e == null ? void 0 : e.isYearly) ?? !1), [v, g] = O.useState((e == null ? void 0 : e.isLunar) ?? !1), [_, k] = O.useState((e == null ? void 0 : e.hidden) ?? !1), E = e == null ? void 0 : e.amount, b = E === void 0 ? "none" : E >= 0 ? "income" : "expense", [T, A] = O.useState(b), [H, F] = O.useState(E !== void 0 ? String(Math.abs(E)) : "");
    O.useEffect(() => {
        function z(G) {
            G.key === "Escape" && t()
        }
        return window.addEventListener("keydown", z), () => window.removeEventListener("keydown", z)
    }, [t]);

    function R() {
        if (!i.trim() || !c) return;
        let z;
        T === "income" && H ? z = Math.abs(Number(H)) : T === "expense" && H && (z = -Math.abs(Number(H)));
        const G = {
            id: (e == null ? void 0 : e.id) ?? Ft(),
            title: i.trim(),
            date: c,
            color: h,
            type: f,
            repeatUnit: f === "repeat" ? p : void 0,
            isYearly: f === "anniversary" ? y : void 0,
            isLunar: v || void 0,
            amount: z,
            hidden: _ || void 0
        };
        r({
            type: e ? "UPDATE_DDAY" : "ADD_DDAY",
            dday: G
        }), t()
    }

    function K() {
        e && r({
            type: "DELETE_DDAY",
            id: e.id
        }), t()
    }
    const se = "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400";
    return o.jsxs("div", {
        ref: s,
        className: "bg-gray-950 border border-white/20 rounded-2xl w-80 shadow-2xl",
        style: n,
        children: [RZ, o.jsxs("div", {
            className: "flex items-center justify-between px-4 py-3 border-b border-white/10 cursor-grab active:cursor-grabbing select-none",
            onMouseDown: a,
            children: [o.jsx("h3", {
                className: "text-white font-semibold",
                children: e ? "D-Day 수정" : "D-Day 추가"
            }), o.jsx("button", {
                onClick: t,
                className: "text-white/50 hover:text-white",
                onMouseDown: z => z.stopPropagation(),
                children: o.jsx(Zt, {
                    size: 18
                })
            })]
        }), o.jsxs("div", {
            className: "px-4 py-4 flex flex-col gap-3",
            children: [o.jsx("input", {
                autoFocus: !0,
                value: i,
                onChange: z => l(z.target.value),
                placeholder: DDBTR("기념일 이름 (예: 아내 생일)"),
                className: se + " placeholder-white/30"
            }), o.jsxs("div", {
                children: [o.jsx("label", {
                    className: "text-white/50 text-xs mb-1 block",
                    children: DDBTR("날짜")
                }), o.jsxs("div", {
                    className: "flex gap-1 mb-1.5",
                    children: [o.jsx("button", {
                        onClick: () => g(!1),
                        className: "flex-1 py-1 rounded-lg text-xs font-medium transition-colors " + (v ? "bg-white/10 text-white/50 hover:bg-white/15" : "bg-blue-500/70 text-white"),
                        children: DDBTR("☀️ 양력")
                    }), o.jsx("button", {
                        onClick: () => g(!0),
                        className: "flex-1 py-1 rounded-lg text-xs font-medium transition-colors " + (v ? "bg-indigo-500/70 text-white" : "bg-white/10 text-white/50 hover:bg-white/15"),
                        children: DDBTR("🌙 음력")
                    })]
                }), o.jsx("input", {
                    type: "date",
                    value: c,
                    onChange: z => u(z.target.value),
                    className: se
                }), v ? o.jsx("p", {
                    className: "text-indigo-300/60 text-[10px] mt-1",
                    children: DDBTR("🌙 입력한 날짜를 음력으로 저장합니다.")
                }) : o.jsx("p", {
                    className: "text-white/25 text-[10px] mt-1",
                    children: DDBTR("☀️ 양력 기준")
                })]
            }), o.jsx("div", {
                className: "flex gap-2",
                children: ["anniversary", "repeat"].map(z => o.jsx("button", {
                    onClick: () => x(z),
                    className: "flex-1 py-1.5 rounded-lg text-sm transition-colors " + (f === z ? "bg-blue-500 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"),
                    children: z === "anniversary" ? "🗓 D-Day 기념일" : "🔁 반복 일정"
                }, z))
            }), f === "anniversary" && o.jsxs("div", {
                children: [o.jsx("label", {
                    className: "text-white/50 text-xs mb-1.5 block",
                    children: DDBTR("매년 반복 (생일 등)")
                }), o.jsxs("div", {
                    className: "flex gap-2",
                    children: [o.jsx("button", {
                        onClick: () => w(!0),
                        className: "flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors " + (y ? "bg-emerald-500 text-white" : "bg-white/10 text-white/50 hover:bg-white/20"),
                        children: DDBTR("반복 O")
                    }), o.jsx("button", {
                        onClick: () => w(!1),
                        className: "flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors " + (y ? "bg-white/10 text-white/50 hover:bg-white/20" : "bg-slate-600 text-white"),
                        children: DDBTR("반복 X")
                    })]
                })]
            }), f === "repeat" && o.jsx("div", {
                className: "flex gap-1",
                children: ["daily", "weekly", "monthly", "yearly"].map(z => o.jsx("button", {
                    onClick: () => m(z),
                    className: "flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors " + (p === z ? "bg-blue-500/80 text-white" : "bg-white/10 text-white/50 hover:bg-white/15"),
                    children: z === "daily" ? DDBTR("매일") : z === "weekly" ? DDBTR("매주") : z === "monthly" ? DDBTR("매월") : DDBTR("매년")
                }, z))
            }), o.jsxs("div", {
                children: [o.jsx("label", {
                    className: "text-white/50 text-xs mb-1.5 block",
                    children: DDBTR("금액 (선택)")
                }), o.jsx("div", {
                    className: "flex gap-1 mb-2",
                    children: ["none", "income", "expense"].map(z => o.jsx("button", {
                        onClick: () => A(z),
                        className: "flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors " + (T === z ? z === "income" ? "bg-red-300/80 text-white" : z === "expense" ? "bg-blue-300/80 text-white" : "bg-white/20 text-white" : "bg-white/10 text-white/50 hover:bg-white/15"),
                        children: z === "none" ? "없음" : z === "income" ? "💰 입금" : "💸 출금"
                    }, z))
                }), T !== "none" && o.jsx("input", {
                    type: "number",
                    value: H,
                    onChange: z => F(z.target.value),
                    placeholder: DDBTR("금액 입력 (원)"),
                    className: se + (T === "income" ? " border-red-300/50" : " border-blue-300/50")
                })]
            }), o.jsxs("div", {
                children: [o.jsx("label", {
                    className: "text-white/50 text-xs mb-1.5 block",
                    children: DDBTR("색상")
                }), o.jsx("div", {
                    className: "flex gap-2 flex-wrap",
                    children: JT.map(z => o.jsx("button", {
                        onClick: () => d(z),
                        className: "w-7 h-7 rounded-full transition-transform " + (h === z ? "scale-125 ring-2 ring-white" : "hover:scale-110"),
                        style: {
                            backgroundColor: qt[z]
                        }
                    }, z))
                })]
            })]
        }), o.jsxs("div", {
            className: "flex gap-2 px-4 pb-4",
            children: [e && o.jsxs("button", {
                onClick: K,
                className: "flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-sm",
                children: [o.jsx(Gr, {
                    size: 14
                }), " 삭제"]
            }), o.jsx("button", {
                onClick: () => k(!_),
                title: _ ? "알림 표시 켜기" : "알림에서 숨기기",
                className: "px-3 py-2 rounded-lg text-sm flex items-center gap-1 " + (_ ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30" : "bg-white/10 text-white/50 hover:bg-white/20"),
                children: _ ? o.jsx(vw, {
                    size: 14
                }) : o.jsx(sT, {
                    size: 14
                })
            }), o.jsx("button", {
                onClick: t,
                className: "flex-1 py-2 rounded-lg bg-white/10 text-white/70 text-sm",
                children: DDBTR("취소")
            }), o.jsx("button", {
                onClick: R,
                disabled: !i.trim() || !c,
                className: "flex-1 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 disabled:opacity-40 text-sm font-medium",
                children: DDBTR("저장")
            })]
        })]
    })
}

function pm(e) {
    const [t, r, n] = e.split("-").map(Number), s = new Date;
    s.setHours(0, 0, 0, 0);
    const a = _w(s);
    let i = s.getFullYear();
    const l = String(r).padStart(2, "0"),
        c = String(n).padStart(2, "0");

    function u(d) {
        const f = d % 4 === 0 && d % 100 !== 0 || d % 400 === 0;
        return r === 2 && n === 29 && !f ? `${d}-03-01` : `${d}-${l}-${c}`
    }
    let h = u(i);
    return h < a && (i++, h = u(i)), {
        dateStr: h,
        daysLeft: hd(h),
        nth: i - t
    }
}

function mm(e) {
    return e === 0 ? "D-Day" : e > 0 ? `D-${e}` : `D+${Math.abs(e)}`
}

function ZT(e) {
    const [t, r, n] = e.split("-").map(Number), s = Sw(t, r, n);
    return s ? `음력 ${s.replace(/[()]/g,"")}` : ""
}

function e4(e) {
    if (e.isLunar) {
        const t = e.date.split("-");
        return `음력 ${Number(t[1])}.${Number(t[2])}`
    }
    return ZT(e.date)
}
const Yi = 3;

function Rw() {
    const {
        state: e,
        dispatch: t
    } = vt(), {
        ddays: r
    } = e, n = (e.events || []).filter(oe => oe.repeat && !oe.bankTx), s = e.loans || [], a = e.savings || [], [i, l] = O.useState(!1), [c, u] = O.useState(null), [h, d] = O.useState(!1), [f, x] = O.useState(!1), [p, m] = O.useState(null), [y, w] = O.useState(null), [v, g] = O.useState(!1), [_, k] = O.useState(!1), [E, b] = O.useState(null), [T, A] = O.useState(!1), [H, F] = O.useState(!0), [R, K] = O.useState(0), [se, z] = O.useState(!1), [G, re] = O.useState("all"), Y = O.useRef(null), M = O.useRef(!1);

    function X(oe) {
        const fe = oe.currentTarget;
        Y.current = {
            el: fe,
            x: oe.pageX,
            scrollLeft: fe.scrollLeft
        }, M.current = !1
    }

    function ce(oe) {
        if (!Y.current || Y.current.el !== oe.currentTarget) return;
        const fe = oe.pageX - Y.current.x;
        Math.abs(fe) > 3 && (M.current = !0), Y.current.el.scrollLeft = Y.current.scrollLeft - fe
    }

    function j() {
        Y.current = null
    }

    function q(oe, fe) {
        if (M.current) {
            oe.preventDefault();
            return
        }
        Fe(fe)
    }
    const U = O.useRef(null),
        B = O.useRef(!1);

    function W(oe) {
        const fe = oe.currentTarget;
        U.current = {
            el: fe,
            x: oe.pageX,
            scrollLeft: fe.scrollLeft
        }, B.current = !1
    }

    function te(oe) {
        if (!U.current || U.current.el !== oe.currentTarget) return;
        const fe = oe.pageX - U.current.x;
        Math.abs(fe) > 3 && (B.current = !0), U.current.el.scrollLeft = U.current.scrollLeft - fe
    }

    function he() {
        U.current = null
    }

    function ne(oe, fe) {
        if (B.current) {
            oe.preventDefault();
            return
        }
        Fe(fe)
    }
    O.useEffect(() => {
        if (r.length === 0) return;
        const oe = [...new Set(r.map(fe => fe.date))];
        Promise.all(oe.map(fe => {
            const [Ne, We, Je] = fe.split("-").map(Number);
            return Ew(Ne, We, Je)
        })).then(() => x(!0))
    }, [r]);
    const ue = O.useMemo(() => r.filter(oe => oe.type === "anniversary").map(oe => {
            if (oe.isYearly) {
                const fe = pm(oe.date);
                return {
                    ...oe,
                    daysLeft: fe.daysLeft,
                    nth: fe.nth,
                    nextDate: fe.dateStr
                }
            } else return {
                ...oe,
                daysLeft: hd(oe.date),
                nth: 0,
                nextDate: oe.date
            }
        }).sort((oe, fe) => {
            const Ne = oe.daysLeft < 0 ? 99999 + Math.abs(oe.daysLeft) : oe.daysLeft,
                We = fe.daysLeft < 0 ? 99999 + Math.abs(fe.daysLeft) : fe.daysLeft;
            return Ne - We
        }), [r]),
        de = O.useMemo(() => ue.filter(oe => !oe.hidden), [ue]),
        N = O.useMemo(() => ue.filter(oe => oe.hidden), [ue]),
        V = Math.max(1, Math.ceil(de.length / Yi)),
        ae = Math.min(R, V - 1),
        ve = de.slice(ae * Yi, (ae + 1) * Yi),
        Te = O.useMemo(() => r.filter(oe => oe.type === "repeat"), [r]),
        xe = O.useMemo(() => ["yearly", "monthly", "weekly", "daily"].map(fe => ({
            unit: fe,
            label: fe === "monthly" ? DDBTR("매월") : fe === "yearly" ? DDBTR("매년") : fe === "weekly" ? DDBTR("매주") : DDBTR("매일"),
            ddayItems: Te.filter(Ne => (Ne.repeatUnit ?? "monthly") === fe),
            calItems: n.filter(Ne => {
                var We;
                return ((We = Ne.repeat) == null ? void 0 : We.type) === fe
            })
        })).filter(fe => fe.ddayItems.length > 0 || fe.calItems.length > 0), [Te, n]);

    function Me() {
        u(null), l(!0)
    }

    function Fe(oe) {
        u(oe), l(!0)
    }
    const me = O.useMemo(() => r.filter(oe => G === "anniversary" ? oe.type === "anniversary" : G === "repeat" ? oe.type === "repeat" : G === "hidden" ? oe.hidden : !0).map(oe => {
        if (oe.type === "anniversary") {
            const fe = oe.isYearly ? pm(oe.date) : {
                daysLeft: hd(oe.date),
                nth: 0,
                dateStr: oe.date
            };
            return {
                ...oe,
                daysLeft: fe.daysLeft,
                nth: fe.nth
            }
        }
        return {
            ...oe,
            daysLeft: 0,
            nth: 0
        }
    }), [r, G]);
    return o.jsxs(o.Fragment, {
        children: [o.jsxs("aside", {
            className: `flex flex-col h-full min-h-0 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 ${h?"w-8":"w-full"}`,
            children: [o.jsxs("div", {
                className: "flex items-center justify-between px-3 py-2 border-b border-white/10 flex-shrink-0",
                children: [!h && o.jsx("span", {
                    className: "text-white/80 text-xs font-semibold",
                    children: DDBTR("기념일 · 반복일정")
                }), o.jsxs("div", {
                    className: "flex items-center gap-1 ml-auto",
                    children: [!h && o.jsxs(o.Fragment, {
                        children: [(e.settings.finBtnMode ?? "icon") !== "text" && o.jsx("button", {
                            onClick: () => { m(null), g(!0) },
                            title: DDBTR("대출 추가"),
                            className: "p-0.5 rounded hover:bg-white/10 transition-colors",
                            children: o.jsxs("svg", {
                                width: 17,
                                height: 17,
                                viewBox: "0 0 24 24",
                                fill: "none",
                                children: [o.jsx("rect", {
                                    x: 2,
                                    y: 7,
                                    width: 16,
                                    height: 11,
                                    rx: 2,
                                    fill: "#93c5fd",
                                    stroke: "#1e3a8a",
                                    strokeWidth: 1.4
                                }), o.jsx("circle", {
                                    cx: 10,
                                    cy: 12.5,
                                    r: 3,
                                    fill: "#f87171",
                                    stroke: "#1e3a8a",
                                    strokeWidth: 1.4
                                }), o.jsx("path", {
                                    d: "M4 20.5h6M4 20.5l2-2M4 20.5l2 2",
                                    stroke: "#ef4444",
                                    strokeWidth: 1.6,
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                })]
                            })
                        }), (e.settings.finBtnMode ?? "icon") !== "text" && o.jsx("button", {
                            onClick: () => { w(null), k(!0) },
                            title: DDBTR("적금·펀드 추가"),
                            className: "p-0.5 rounded hover:bg-white/10 transition-colors",
                            children: o.jsxs("svg", {
                                width: 17,
                                height: 17,
                                viewBox: "0 0 24 24",
                                fill: "none",
                                children: [o.jsx("path", {
                                    d: "M4 13c0-3 2.5-5 6-5s6 2 6 5c0 1.6-.8 3-2 4v2h-2v-1.5h-4V19H6v-2c-.7-.5-1.2-1.2-1.5-2H3.5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z",
                                    fill: "#86efac",
                                    stroke: "#14532d",
                                    strokeWidth: 1.3,
                                    strokeLinejoin: "round"
                                }), o.jsx("circle", {
                                    cx: 7,
                                    cy: 12,
                                    r: .9,
                                    fill: "#14532d"
                                }), o.jsx("path", {
                                    d: "M10 8V6.5M8.5 7l3 0",
                                    stroke: "#14532d",
                                    strokeWidth: 1.2,
                                    strokeLinecap: "round"
                                }), o.jsx("circle", {
                                    cx: 17.5,
                                    cy: 8,
                                    r: 3,
                                    fill: "#bbf7d0",
                                    stroke: "#14532d",
                                    strokeWidth: 1.2
                                }), o.jsx("text", {
                                    x: 17.5,
                                    y: 9.6,
                                    fontSize: 4,
                                    fill: "#14532d",
                                    textAnchor: "middle",
                                    fontWeight: "bold",
                                    children: "₩"
                                })]
                            })
                        }), o.jsx("button", {
                            onClick: () => z(!se),
                            title: DDBTR("상세보기 (전체 D-Day 목록)"),
                            className: "text-white/60 hover:text-white p-0.5 rounded hover:bg-white/10 " + (se ? "text-amber-300 bg-amber-400/15" : ""),
                            children: o.jsx(lT, {
                                size: 13
                            })
                        }), o.jsx("button", {
                            onClick: Me,
                            className: "text-white/60 hover:text-white p-0.5 rounded hover:bg-white/10",
                            children: o.jsx(Vr, {
                                size: 14
                            })
                        })]
                    })]
                })]
            }), !h && o.jsxs("div", {
                className: "flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-3 min-h-0",
                style: {
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,255,255,0.35) transparent"
                },
                children: [se && o.jsxs("section", {
                    children: [o.jsx("div", {
                        className: "flex gap-1 mb-2",
                        children: ["all", "anniversary", "repeat", "hidden"].map(oe => o.jsx("button", {
                            onClick: () => re(oe),
                            className: "flex-1 py-1 rounded-lg text-[10px] font-medium transition-colors " + (G === oe ? "bg-white/20 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"),
                            children: oe === "all" ? DDBTR("전체") : oe === "anniversary" ? DDBTR("기념일") : oe === "repeat" ? DDBTR("반복") : DDBTR("숨김")
                        }, oe))
                    }), o.jsxs("div", {
                        className: "flex flex-col gap-1",
                        children: [me.length === 0 && o.jsx("p", {
                            className: "text-white/30 text-xs text-center py-3",
                            children: DDBTR("없음")
                        }), me.map(oe => {
                            const fe = qt[oe.color] ?? "#999";
                            return o.jsxs("button", {
                                onClick: () => Fe(oe),
                                className: "flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 transition-colors text-left w-full",
                                style: {
                                    borderLeft: `3px solid ${fe}`
                                },
                                children: [o.jsxs("div", {
                                    className: "flex-1 min-w-0",
                                    children: [o.jsxs("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [o.jsx("span", {
                                            className: "text-[11px] font-bold",
                                            style: {
                                                color: fe
                                            },
                                            children: oe.type === "anniversary" ? mm(oe.daysLeft) : oe.repeatUnit ? {
                                                daily: DDBTR("매일"),
                                                weekly: DDBTR("매주"),
                                                monthly: DDBTR("매월"),
                                                yearly: DDBTR("매년")
                                            } [oe.repeatUnit] : "반복"
                                        }), oe.hidden && o.jsx(vw, {
                                            size: 9,
                                            className: "text-amber-400/70 flex-shrink-0"
                                        })]
                                    }), o.jsx("div", {
                                        className: "text-white/80 text-[11px] truncate",
                                        children: ddbTT(oe.title)
                                    })]
                                }), o.jsx("span", {
                                    className: "text-white/30 text-[9px] flex-shrink-0",
                                    children: oe.date.slice(5).replace("-", ".")
                                })]
                            }, oe.id)
                        })]
                    }), o.jsx("div", {
                        className: "border-b border-white/10 mt-2"
                    })]
                }), !se && o.jsxs("section", {
                    children: [o.jsxs("div", {
                        className: "flex items-center justify-between mb-1.5",
                        children: [o.jsxs("div", {
                            className: "flex items-center gap-1",
                            children: [o.jsx("span", {
                                className: "text-white/50 text-xs",
                                children: DDBTR("기념일")
                            }), N.length > 0 && o.jsxs("span", {
                                className: "text-[9px] text-amber-400/60 bg-amber-400/10 px-1 rounded-full",
                                children: [N.length, "숨김"]
                            })]
                        }), o.jsx("button", {
                            onClick: () => F(!H),
                            className: "text-white/40 hover:text-white/70 p-0.5 rounded",
                            title: H ? "기념일 접기" : "기념일 펼치기",
                            children: H ? o.jsx(jf, {
                                size: 11
                            }) : o.jsx(Si, {
                                size: 11
                            })
                        })]
                    }), H ? de.length === 0 ? o.jsx("p", {
                        className: "text-white/30 text-xs text-center py-2",
                        children: DDBTR("없음")
                    }) : o.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [o.jsx("button", {
                            onClick: () => K(oe => Math.max(0, oe - 1)),
                            disabled: ae === 0,
                            className: "text-white/30 hover:text-white/70 disabled:opacity-20 flex-shrink-0 p-0.5",
                            children: o.jsx(tl, {
                                size: 12
                            })
                        }), o.jsxs("div", {
                            className: "flex-1 grid grid-cols-3 gap-1",
                            children: [ve.map(oe => {
                                const fe = qt[oe.color] ?? "#999",
                                    Ne = oe.daysLeft < 0,
                                    We = oe.date.slice(5).replace("-", "."),
                                    Je = e4(oe),
                                    Gt = Je ? ` (${Je.replace("음력 ","음")})` : "";
                                return o.jsxs("button", {
                                    onClick: () => Fe(oe),
                                    className: "rounded-lg px-2 py-1.5 hover:bg-white/10 transition-colors text-left",
                                    style: {
                                        borderLeft: `3px solid ${fe}`
                                    },
                                    children: [o.jsxs("div", {
                                        className: "flex items-center gap-1 mb-0.5 flex-wrap",
                                        children: [o.jsx("span", {
                                            className: "text-xs font-bold leading-none",
                                            style: {
                                                color: fe
                                            },
                                            children: mm(oe.daysLeft)
                                        }), oe.isYearly && oe.nth > 0 && o.jsxs("span", {
                                            className: "text-[9px] px-1 rounded-full bg-white/15 text-white/50 leading-tight",
                                            children: [oe.nth, "번째"]
                                        }), !oe.isYearly && Ne && o.jsx("span", {
                                            className: "text-[9px] text-white/25",
                                            children: DDBTR("지남")
                                        })]
                                    }), o.jsx("div", {
                                        className: "text-white/80 text-[11px] truncate font-medium",
                                        children: ddbTT(oe.title)
                                    }), o.jsxs("div", {
                                        className: "text-white/35 text-[9px] mt-0.5 truncate",
                                        children: [We, Gt]
                                    })]
                                }, oe.id)
                            }), ve.length < Yi && Array.from({
                                length: Yi - ve.length
                            }).map((oe, fe) => o.jsx("div", {}, `empty-${fe}`))]
                        }), o.jsx("button", {
                            onClick: () => K(oe => Math.min(V - 1, oe + 1)),
                            disabled: ae >= V - 1,
                            className: "text-white/30 hover:text-white/70 disabled:opacity-20 flex-shrink-0 p-0.5",
                            children: o.jsx($n, {
                                size: 12
                            })
                        })]
                    }) : o.jsx("div", {
                        className: "flex gap-1 overflow-x-auto",
                        style: {
                            scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.35) transparent", paddingBottom: "3px",
                            cursor: "grab",
                            userSelect: "none"
                        },
                        onMouseDown: X,
                        onMouseMove: ce,
                        onMouseUp: j,
                        onMouseLeave: j,
                        children: de.length === 0 ? o.jsx("span", {
                            className: "text-white/30 text-[10px]",
                            children: DDBTR("없음")
                        }) : de.map(oe => {
                            const fe = qt[oe.color] ?? "#999";
                            return o.jsx("button", {
                                onClick: Ne => q(Ne, oe),
                                className: "flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium transition-all hover:brightness-110",
                                style: {
                                    backgroundColor: fe + "33",
                                    color: fe,
                                    border: `1px solid ${fe}55`
                                },
                                children: ddbTT(oe.title)
                            }, oe.id)
                        })
                    }), H && V > 1 && o.jsx("div", {
                        className: "flex justify-center gap-1 mt-1.5",
                        children: Array.from({
                            length: V
                        }).map((oe, fe) => o.jsx("button", {
                            onClick: () => K(fe),
                            className: "w-1.5 h-1.5 rounded-full transition-colors " + (fe === ae ? "bg-white/60" : "bg-white/20 hover:bg-white/40")
                        }, fe))
                    })]
                }), xe.length > 0 && o.jsxs("section", {
                    children: [o.jsx("div", {
                        className: "mb-1.5",
                        children: o.jsx("span", {
                            className: "text-white/50 text-xs",
                            children: DDBTR("반복 일정")
                        })
                    }), o.jsx("div", {
                        className: "flex flex-col gap-1.5",
                        children: xe.map(oe => o.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [o.jsx("span", {
                                className: "text-white/30 text-[9px] flex-shrink-0 w-6 text-right",
                                children: oe.label
                            }), o.jsxs("div", {
                                className: "flex gap-1 overflow-x-auto flex-1",
                                style: {
                                    scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.35) transparent", paddingBottom: "3px",
                                    cursor: "grab",
                                    userSelect: "none"
                                },
                                onMouseDown: W,
                                onMouseMove: te,
                                onMouseUp: he,
                                onMouseLeave: he,
                                children: [oe.ddayItems.map(fe => {
                                    const Ne = qt[fe.color] ?? "#999";
                                    return o.jsx("button", {
                                        onClick: We => ne(We, fe),
                                        className: "flex-shrink-0 rounded-full px-2.5 py-0.5 text-white text-[11px] font-medium hover:brightness-110 transition-all whitespace-nowrap",
                                        style: {
                                            backgroundColor: Ne + "cc"
                                        },
                                        children: ddbTT(fe.title)
                                    }, fe.id)
                                }), oe.calItems.map(fe => {
                                    const Ne = fe.customColor || (qt[fe.color] ?? "#999");
                                    return o.jsx("button", {
                                        onClick: () => {
                                            b(fe), A(!0)
                                        },
                                        className: "flex-shrink-0 rounded-full px-2.5 py-0.5 text-white text-[11px] font-medium hover:brightness-110 transition-all whitespace-nowrap",
                                        style: {
                                            backgroundColor: Ne + "cc"
                                        },
                                        children: ddbTT(fe.title)
                                    }, fe.id)
                                })]
                            })]
                        }, oe.unit))
                    })]
                }), (s.length > 0 || a.length > 0) && o.jsxs("div", {
                    className: "mt-3 border-t border-white/10 pt-3",
                    children: [o.jsxs("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [o.jsx("span", {
                            className: "text-white/50 text-xs",
                            children: DDBTR("대출 / 적금·펀드")
                        }), ["text", "both"].includes(e.settings.finBtnMode ?? "icon") && o.jsxs("div", {
                            className: "flex gap-1",
                            children: [o.jsx("button", {
                                onClick: () => { m(null), g(!0) },
                                className: "text-amber-400 hover:text-amber-300 text-[11px] px-2 py-0.5 rounded bg-amber-400/10",
                                children: DDBTR("+ 대출")
                            }), o.jsx("button", {
                                onClick: () => { w(null), k(!0) },
                                className: "text-emerald-400 hover:text-emerald-300 text-[11px] px-2 py-0.5 rounded bg-emerald-400/10",
                                children: DDBTR("+ 적금·펀드")
                            })]
                        })]
                    }), s.map(oe => o.jsxs("button", {
                        onClick: () => { m(oe), g(!0) },
                        className: "flex items-center gap-2 rounded-lg px-3 py-2 text-white text-xs font-medium hover:brightness-110 transition-all w-full text-left mb-1",
                        style: {
                            backgroundColor: (qt[oe.color] ?? "#999") + "cc"
                        },
                        children: [o.jsx("span", {
                            children: oe.loanKind === "general" ? "💳" : "🏠"
                        }), o.jsx("span", {
                            className: "flex-1 truncate",
                            children: ddbTT(oe.title)
                        }), o.jsxs("span", {
                            className: "text-white/60 text-[10px]",
                            children: [oe.termMonths, "개월"]
                        })]
                    }, oe.id)), a.map(oe => o.jsxs("button", {
                        onClick: () => { w(oe), k(!0) },
                        className: "flex items-center gap-2 rounded-lg px-3 py-2 text-white text-xs font-medium hover:brightness-110 transition-all w-full text-left mb-1",
                        style: {
                            backgroundColor: (qt[oe.color] ?? "#999") + "cc"
                        },
                        children: [o.jsx("span", {
                            children: oe.subtype === "savings" ? "📈" : "💹"
                        }), o.jsx("span", {
                            className: "flex-1 truncate",
                            children: ddbTT(oe.title)
                        }), o.jsxs("span", {
                            className: "text-white/60 text-[10px]",
                            children: [oe.termMonths, "개월"]
                        })]
                    }, oe.id))]
                }), s.length === 0 && a.length === 0 && o.jsxs("div", {
                    className: "mt-3 border-t border-white/10 pt-2 flex gap-1",
                    children: [o.jsx("button", {
                        onClick: () => g(!0),
                        className: "flex-1 text-amber-400/70 hover:text-amber-300 text-[11px] py-1.5 rounded bg-amber-400/5 border border-amber-400/20",
                        children: DDBTR("🏦 대출 추가")
                    }), o.jsx("button", {
                        onClick: () => k(!0),
                        className: "flex-1 text-emerald-400/70 hover:text-emerald-300 text-[11px] py-1.5 rounded bg-emerald-400/5 border border-emerald-400/20",
                        children: DDBTR("📈 적금·펀드 추가")
                    })]
                })]
            })]
        }), i && Rr.createPortal(o.jsx(QT, {
            item: c,
            onClose: () => l(!1)
        }), document.body), v && Rr.createPortal(o.jsx(If, {
            loan: p,
            onClose: () => {
                g(!1), m(null)
            }
        }), document.body), _ && Rr.createPortal(o.jsx(Pf, {
            entry: y,
            onClose: () => {
                k(!1), w(null)
            }
        }), document.body), T && E && Rr.createPortal(o.jsx(Nw, {
            date: E.date,
            event: E,
            onClose: () => {
                A(!1), b(null)
            }
        }), document.body)]
    })
}
const fn = e => new Intl.NumberFormat("ko-KR").format(Math.round(e));

function gm(e, t) {
    const [r, n] = e.split("-").map(Number), s = new Date(r, n - 1 + t, 1);
    return s.getFullYear() + "-" + String(s.getMonth() + 1).padStart(2, "0")
}

function t4(e) {
    return e.title ? e.title : e.memo ? e.memo : e.amount !== void 0 && e.amount >= 0 ? "입금" : "출금"
}

function vm({
    calendarWidth: e
}) {
    const {
        state: t,
        dispatch: r
    } = vt(), {
        events: n,
        loans: s,
        savings: a,
        currentYear: i,
        currentMonth: l
    } = t, [c, u] = O.useState(null), [h, d] = O.useState(null), [f, x] = O.useState(null), [p, m] = O.useState(null), y = O.useRef(), [w, v] = O.useState(""), [g, _] = O.useState(""), [k, E] = O.useState(!1), b = `${i}-${String(l).padStart(2,"0")}`, T = O.useMemo(() => {
        const z = [],
            G = [],
            re = new Set,
            Y = dd(i, l);
        for (let M = 1; M <= Y; M++) {
            const X = `${i}-${String(l).padStart(2,"0")}-${String(M).padStart(2,"0")}`;
            n.forEach(ce => {
                if (ce.amount === void 0 || !(ce.repeat ? Ff(ce.date, X, ce.repeat) : Df(X, ce.date, ce.endDate))) return;
                const q = ce.id + X;
                re.has(q) || (re.add(q), ce.amount >= 0 ? z.push({
                    ...ce,
                    date: X
                }) : G.push({
                    ...ce,
                    date: X
                }))
            })
        }
        return (s || []).forEach(M => {
            const X = LT(M, b);
            X && G.push({
                id: M.id,
                title: M.title,
                date: `${b}-01`,
                color: M.color,
                isAllDay: !0,
                amount: -X.payment,
                memo: `(${fn(X.payment)}/${fn(M.principal)}) 잔액 ${fn(X.balance)}원 | 원금 ${fn(X.principal)}원 이자 ${fn(X.interest)}원`,
                _loanId: M.id
            })
        }), (a || []).forEach(M => {
            const X = BT(M, b);
            X && G.push({
                id: M.id,
                title: `${M.subtype==="savings"?"📈":"💹"} ${M.title}`,
                date: `${b}-01`,
                color: M.color,
                isAllDay: !0,
                amount: -X.deposit,
                memo: `이자 +${fn(X.interest)}원 / 누적 ${fn(X.accumulated)}원`,
                _savingsId: M.id
            })
        }), {
            income: {
                count: z.length,
                total: z.reduce((M, X) => M + (X.amount || 0), 0),
                items: z
            },
            expense: {
                count: G.length,
                total: Math.abs(G.reduce((M, X) => M + (X.amount || 0), 0)),
                items: G
            }
        }
    }, [n, s, a, i, l, b]);

    function A(z) {
        clearTimeout(y.current), u(z)
    }

    function H() {
        y.current = setTimeout(() => {
            u(null), d(null)
        }, 1500)
    }

    function F(z) {
        (h == null ? void 0 : h.id) === z.id && (h == null ? void 0 : h.date) === z.date ? d(null) : (d(z), z._loanId && (v(b), _(""), E(!1)))
    }

    function R() {
        if (!(h != null && h._loanId) || !g || !w) return;
        const z = (s || []).find(M => M.id === h._loanId);
        if (!z) return;
        const G = Number(g);
        if (!G || G <= 0) return;
        const re = nl(z, w, G),
            Y = [...z.rateHistory.filter(M => M.fromDate !== w), {
                fromDate: w,
                rate: re
            }].sort((M, X) => M.fromDate.localeCompare(X.fromDate));
        r({
            type: "UPDATE_LOAN",
            loan: {
                ...z,
                rateHistory: Y
            }
        }), _(""), E(!0), setTimeout(() => E(!1), 2500)
    }
    const K = O.useMemo(() => {
            if (!(h != null && h._loanId) || !w) return null;
            const z = (s || []).find(X => X.id === h._loanId);
            if (!z) return null;
            const re = da(z).find(X => X.month === w),
                Y = us(z.rateHistory, w),
                M = g && Number(g) > 0 ? (() => {
                    try {
                        return nl(z, w, Number(g))
                    } catch {
                        return null
                    }
                })() : null;
            return {
                entry: re,
                currentRate: Y,
                implied: M
            }
        }, [h, w, g, s]),
        se = [{
            key: "income",
            label: DDBTR("입금"),
            color: "bg-red-400/30 text-red-200",
            count: T.income.count,
            total: T.income.total,
            items: T.income.items
        }, {
            key: "expense",
            label: DDBTR("출금"),
            color: "bg-blue-400/30 text-blue-200",
            count: T.expense.count,
            total: T.expense.total,
            items: T.expense.items
        }, {
            key: "all",
            label: DDBTR("전체"),
            color: "bg-yellow-400/30 text-yellow-200",
            count: T.income.count + T.expense.count,
            total: T.income.total - T.expense.total,
            items: [...T.income.items, ...T.expense.items]
        }];
    return o.jsxs(o.Fragment, {
        children: [f && o.jsx(If, {
            loan: f,
            onClose: () => x(null)
        }), p && o.jsx(Pf, {
            entry: p,
            onClose: () => m(null)
        }), o.jsx("div", {
            className: "flex-shrink-0",
            style: e ? {
                width: e
            } : {},
            children: o.jsx("div", {
                className: "grid grid-cols-3 border-t border-white/10 relative",
                children: se.map(z => o.jsxs("div", {
                    className: "relative",
                    onMouseEnter: () => A(z.key),
                    onMouseLeave: H,
                    children: [o.jsx("div", {
                        className: "absolute bottom-full left-0 right-0 bg-gray-900/95 border border-white/15 rounded-t-lg overflow-hidden transition-all duration-300 " + (c === z.key ? "max-h-96 opacity-100" : "max-h-0 opacity-0"),
                        onMouseEnter: () => clearTimeout(y.current),
                        children: o.jsxs("div", {
                            className: "px-3 py-2 overflow-y-auto max-h-[22rem] thin-scroll",
                            children: [z.items.length === 0 ? o.jsx("p", {
                                className: "text-white/30 text-xs text-center py-2",
                                children: DDBTR("내역 없음")
                            }) : z.items.map((G, re) => {
                                const Y = !!G._loanId,
                                    M = !!G._savingsId;
                                return o.jsxs("div", {
                                    onClick: () => F(G),
                                    className: "flex items-center justify-between py-1.5 px-1 border-b border-white/5 last:border-0 cursor-pointer rounded transition-colors " + ((h == null ? void 0 : h.id) === G.id && (h == null ? void 0 : h.date) === G.date ? "bg-white/15" : "hover:bg-white/10"),
                                    children: [o.jsxs("span", {
                                        className: "text-white/70 text-xs truncate flex-1",
                                        children: [Y && o.jsx("span", {
                                            className: "text-amber-400 mr-1",
                                            children: "🏦"
                                        }), M && o.jsx("span", {
                                            className: "text-emerald-400 mr-1"
                                        }), t4(G)]
                                    }), o.jsxs("span", {
                                        className: "text-xs ml-2 font-medium " + ((G.amount || 0) >= 0 ? "text-red-300" : "text-blue-300"),
                                        children: [(G.amount || 0) >= 0 ? "+" : "", fn(G.amount || 0), "원"]
                                    }), !Y && !M && o.jsx("span", {
                                        className: "text-white/30 text-xs ml-2",
                                        children: G.date.slice(5)
                                    })]
                                }, re)
                            }), h && z.items.some(G => G.id === h.id && G.date === h.date) && o.jsxs("div", {
                                className: "mt-2 rounded-xl bg-white/8 border border-white/15 text-xs overflow-hidden",
                                children: [o.jsxs("div", {
                                    className: "flex items-center justify-between px-3 py-2 border-b border-white/10",
                                    children: [o.jsx("span", {
                                        className: "text-white/60 font-medium text-[11px]",
                                        children: DDBTR("📋 상세 정보")
                                    }), o.jsxs("div", {
                                        className: "flex gap-2 items-center",
                                        children: [h._loanId && o.jsx("button", {
                                            onClick: () => {
                                                const G = (s || []).find(re => re.id === h._loanId);
                                                G && x(G)
                                            },
                                            className: "text-amber-400 text-[10px] hover:text-amber-300 px-1.5 py-0.5 rounded bg-amber-400/10",
                                            children: DDBTR("수정")
                                        }), h._savingsId && o.jsx("button", {
                                            onClick: () => {
                                                const G = (a || []).find(re => re.id === h._savingsId);
                                                G && m(G)
                                            },
                                            className: "text-emerald-400 text-[10px] hover:text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-400/10",
                                            children: DDBTR("수정")
                                        }), o.jsx("button", {
                                            onClick: () => d(null),
                                            className: "text-white/30 hover:text-white/70 text-[10px]",
                                            children: "✕"
                                        })]
                                    })]
                                }), o.jsxs("div", {
                                    className: "px-3 py-2 space-y-1",
                                    children: [ddbTT(h.title) && o.jsxs("div", {
                                        className: "flex gap-2",
                                        children: [o.jsx("span", {
                                            className: "text-white/40 w-10 flex-shrink-0",
                                            children: DDBTR("항목")
                                        }), o.jsx("span", {
                                            className: "text-white/80",
                                            children: ddbTT(h.title)
                                        })]
                                    }), o.jsxs("div", {
                                        className: "flex gap-2",
                                        children: [o.jsx("span", {
                                            className: "text-white/40 w-10 flex-shrink-0",
                                            children: DDBTR("금액")
                                        }), o.jsxs("span", {
                                            className: (h.amount || 0) >= 0 ? "text-red-300" : "text-blue-300",
                                            children: [(h.amount || 0) >= 0 ? "+" : "", fn(h.amount || 0), "원"]
                                        })]
                                    }), h.memo && o.jsxs("div", {
                                        className: "flex gap-2 items-start",
                                        children: [o.jsx("span", {
                                            className: "text-white/40 w-10 flex-shrink-0",
                                            children: DDBTR("내역")
                                        }), o.jsx("span", {
                                            className: "text-white/60 break-all leading-relaxed",
                                            children: h.memo
                                        })]
                                    })]
                                }), h._loanId && o.jsxs("div", {
                                    className: "border-t border-amber-400/20 bg-amber-400/5 px-3 py-3",
                                    children: [o.jsx("p", {
                                        className: "text-amber-300/80 text-[10px] font-medium mb-2.5",
                                        children: DDBTR("🖊️ 수기납입 입력 → 금리 자동계산")
                                    }), o.jsxs("div", {
                                        className: "flex items-center gap-1 mb-2.5",
                                        children: [o.jsx("button", {
                                            onClick: () => {
                                                v(G => gm(G, -1)), _(""), E(!1)
                                            },
                                            className: "w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white flex-shrink-0",
                                            children: o.jsx(tl, {
                                                size: 13
                                            })
                                        }), o.jsxs("div", {
                                            className: "flex-1 text-center",
                                            children: [o.jsx("span", {
                                                className: "text-white font-bold text-sm",
                                                children: w
                                            }), (K == null ? void 0 : K.entry) && o.jsxs("span", {
                                                className: "text-white/30 text-[10px] ml-1.5",
                                                children: ["계산: ", fn(K.entry.payment), "원"]
                                            })]
                                        }), o.jsx("button", {
                                            onClick: () => {
                                                v(G => gm(G, 1)), _(""), E(!1)
                                            },
                                            className: "w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white flex-shrink-0",
                                            children: o.jsx($n, {
                                                size: 13
                                            })
                                        })]
                                    }), o.jsxs("div", {
                                        className: "flex gap-1.5 items-center",
                                        children: [o.jsx("input", {
                                            type: "number",
                                            value: g,
                                            onChange: G => {
                                                _(G.target.value), E(!1)
                                            },
                                            placeholder: DDBTR("실제 납입금액 (원)"),
                                            className: "flex-1 bg-white/10 border border-amber-400/30 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400 placeholder-white/20"
                                        }), o.jsx("button", {
                                            onClick: R,
                                            disabled: !g || !Number(g),
                                            className: "w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0 " + (k ? "bg-green-500/60 text-green-200" : "bg-amber-500/70 text-white hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"),
                                            children: k ? o.jsx(su, {
                                                size: 14
                                            }) : o.jsx("span", {
                                                className: "text-xs font-bold",
                                                children: "↵"
                                            })
                                        })]
                                    }), (K == null ? void 0 : K.implied) != null && g && o.jsxs("div", {
                                        className: "mt-2 flex items-center justify-between bg-black/20 rounded-lg px-2.5 py-1.5",
                                        children: [o.jsxs("span", {
                                            className: "text-white/40 text-[10px]",
                                            children: ["기존 ", K.currentRate, "% →"]
                                        }), o.jsxs("span", {
                                            className: "text-amber-200 font-bold text-sm",
                                            children: [K.implied, "%"]
                                        }), o.jsxs("span", {
                                            className: "text-white/30 text-[10px]",
                                            children: [w, "부터 적용"]
                                        })]
                                    }), k && o.jsx("p", {
                                        className: "text-green-400 text-[10px] mt-1.5 text-center",
                                        children: DDBTR("✓ 금리가 적용되었습니다. 저장하려면 대출 수정에서 저장하세요.")
                                    })]
                                })]
                            })]
                        })
                    }), o.jsxs("div", {
                        className: "flex items-center justify-center gap-1.5 py-2 text-xs cursor-default " + z.color,
                        children: [o.jsx("span", {
                            className: "font-semibold",
                            children: z.label
                        }), o.jsxs("span", {
                            children: [z.count, DDBTR("건")]
                        }), z.total !== 0 && o.jsxs("span", {
                            className: "opacity-70",
                            children: ["(", fn(Math.abs(z.total)), "원)"]
                        })]
                    })]
                }, z.key))
            })
        })]
    })
}
const r4 = ["pink", "red", "orange", "yellow", "green", "teal", "blue", "purple"];

function n4({
    onClose: e
}) {
    const {
        state: t
    } = vt(), [r, n] = O.useState(""), [s, a] = O.useState(null), [i, l] = O.useState("all"), c = O.useMemo(() => {
        const h = r.toLowerCase().trim(),
            d = t.events.filter(m => {
                const y = !h || m.title.toLowerCase().includes(h) || (m.memo ?? "").toLowerCase().includes(h),
                    w = !s || m.color === s;
                return y && w
            }).map(m => ({
                type: "일정",
                title: m.title,
                sub: m.date,
                color: m.color
            })),
            f = t.ddays.filter(m => {
                const y = !h || m.title.toLowerCase().includes(h),
                    w = !s || m.color === s;
                return y && w
            }).map(m => ({
                type: "D-Day",
                title: m.title,
                sub: m.date,
                color: m.color
            })),
            x = t.memoTabs.flatMap(m => m.items.filter(y => !h || y.content.toLowerCase().includes(h)).map(y => ({
                type: "메모",
                title: y.content.slice(0, 40),
                sub: m.title,
                color: "teal"
            }))),
            p = [...d, ...f, ...x];
        return i === "all" ? p : p.filter(m => m.type === i)
    }, [r, s, i, t]), u = s || i !== "all";
    return o.jsx("div", {
        className: "fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-16",
        onClick: e,
        children: o.jsxs("div", {
            className: "bg-gray-900/95 border border-white/20 rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in",
            onClick: h => h.stopPropagation(),
            children: [o.jsxs("div", {
                className: "flex items-center gap-2 px-4 py-3 border-b border-white/10",
                children: [o.jsx(cd, {
                    size: 16,
                    className: "text-white/50"
                }), o.jsx("input", {
                    autoFocus: !0,
                    value: r,
                    onChange: h => n(h.target.value),
                    placeholder: DDBTR("일정, 메모, D-Day 검색..."),
                    className: "flex-1 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none"
                }), (r || u) && o.jsx("button", {
                    onClick: () => {
                        n(""), a(null), l("all")
                    },
                    className: "text-white/40 hover:text-white text-xs px-1.5 py-0.5 rounded bg-white/10",
                    children: DDBTR("초기화")
                }), o.jsx("button", {
                    onClick: e,
                    className: "text-white/50 hover:text-white",
                    children: o.jsx(Zt, {
                        size: 16
                    })
                })]
            }), o.jsxs("div", {
                className: "flex items-center gap-2 px-3 py-2 border-b border-white/5 flex-wrap",
                children: [o.jsx("div", {
                    className: "flex gap-1",
                    children: ["all", "일정", "D-Day", "메모"].map(h => o.jsx("button", {
                        onClick: () => l(h),
                        className: "px-2 py-0.5 rounded-full text-xs transition-colors " + (i === h ? "bg-white/20 text-white" : "text-white/40 hover:text-white hover:bg-white/10"),
                        children: h === "all" ? DDBTR("전체") : h
                    }, h))
                }), o.jsx("div", {
                    className: "w-px h-4 bg-white/20"
                }), o.jsxs("div", {
                    className: "flex gap-1 items-center",
                    children: [o.jsx("span", {
                        className: "text-white/30 text-xs",
                        children: DDBTR("색상:")
                    }), r4.map(h => o.jsx("button", {
                        onClick: () => a(s === h ? null : h),
                        style: {
                            backgroundColor: qt[h]
                        },
                        className: "w-4 h-4 rounded-full transition-transform flex-shrink-0 " + (s === h ? "scale-125 ring-2 ring-white" : "hover:scale-110 opacity-70 hover:opacity-100")
                    }, h))]
                })]
            }), o.jsxs("div", {
                className: "max-h-72 overflow-y-auto thin-scroll divide-y divide-white/5",
                children: [c.length === 0 && (r || u) && o.jsx("p", {
                    className: "text-white/30 text-sm text-center py-8",
                    children: DDBTR("검색 결과 없음")
                }), !r && !u && o.jsx("p", {
                    className: "text-white/20 text-xs text-center py-6",
                    children: DDBTR("검색어 입력 또는 색상 필터 선택")
                }), c.map((h, d) => o.jsxs("div", {
                    className: "flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 cursor-pointer",
                    children: [o.jsx("span", {
                        className: "w-1.5 h-8 rounded-full flex-shrink-0",
                        style: {
                            backgroundColor: qt[h.color] ?? "#999"
                        }
                    }), o.jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [o.jsx("p", {
                            className: "text-white/80 text-sm truncate",
                            children: ddbTT(h.title)
                        }), o.jsxs("p", {
                            className: "text-white/40 text-xs",
                            children: [h.type, " · ", h.sub]
                        })]
                    })]
                }, d))]
            }), c.length > 0 && o.jsxs("div", {
                className: "px-4 py-2 text-white/30 text-xs border-t border-white/5",
                children: [c.length, "개 결과"]
            })]
        })
    })
}
const s4 = [{
        label: "Noto Sans KR",
        value: "'Noto Sans KR', sans-serif"
    }, {
        label: "나눔고딕",
        value: "'Nanum Gothic', sans-serif"
    }, {
        label: "나눔명조",
        value: "'Nanum Myeongjo', serif"
    }, {
        label: "블랙한산스",
        value: "'Black Han Sans', sans-serif"
    }, {
        label: "주아",
        value: "'Jua', sans-serif"
    }, {
        label: "도현",
        value: "'Do Hyeon', sans-serif"
    }, {
        label: "감자꽃",
        value: "'Gamja Flower', cursive"
    }],
    a4 = [{
        label: "다크",
        value: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)"
    }, {
        label: "오션",
        value: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)"
    }, {
        label: "숲",
        value: "linear-gradient(135deg,#134e5e,#1a2a1a,#0d3b2a)"
    }, {
        label: "선셋",
        value: "linear-gradient(135deg,#1a1a2e,#6b2d6b,#2d1b44)"
    }, {
        label: "오로라",
        value: "linear-gradient(135deg,#0a3d2a,#0d4a5c,#1a1a3e)"
    }, {
        label: "차콜",
        value: "linear-gradient(135deg,#1c1c1c,#2d2d2d,#1a1a1a)"
    }],
    i4 = [{
        id: "calendar",
        label: "📅 달력"
    }, {
        id: "design",
        label: "🎨 디자인"
    }, {
        id: "lang",
        label: "🌐 언어"
    }, {
        id: "font",
        label: "✍️ 글꼴·크기"
    }, {
        id: "panel",
        label: "🪟 패널"
    }, {
        id: "privacy",
        label: "🔒 사생활"
    }, {
        id: "feedback",
        label: "⏰ 피드백"
    }, {
        id: "lock",
        label: "🔐 잠금화면"
    }, {
        id: "hotkey",
        label: "⌨ 단축키"
    }],
    o4 = Array.from({
        length: 12
    }, (e, t) => t + 1),
    l4 = Array.from({
        length: 30
    }, (e, t) => 2020 + t);

function c4({
    onClose: e
}) {
    const {
        state: t,
        dispatch: r,
        goToMonth: n,
        setFontSize: s
    } = vt(), {
        style: a,
        elRef: i,
        onHeaderMouseDown: l,
        resizeHandle: RZ
    } = Oi(300), {
        settings: c,
        privacy: u,
        fontSize: h,
        currentYear: d,
        currentMonth: f
    } = t, [x, p] = O.useState("calendar"), m = O.useRef(null);

    function y(k, E) {
        r({
            type: "UPDATE_SETTINGS",
            settings: {
                [k]: E
            }
        })
    }

    function w(k, E) {
        r({
            type: "UPDATE_PRIVACY",
            privacy: {
                [k]: E
            }
        })
    }

    function v(k) {
        var T;
        const E = (T = k.target.files) == null ? void 0 : T[0];
        if (!E) return;
        if (E.size > 1048576) {
            alert(`배경 이미지는 1MB 이하만 사용할 수 있습니다.
(클라우드 동기화 용량 보호를 위한 제한입니다. 이미지를 압축해 주세요)`);
            k.target.value = "";
            return
        }
        const b = new FileReader;
        b.onload = A => {
            var H;
            y("backgroundType", "image"), y("backgroundImage", (H = A.target) == null ? void 0 : H.result)
        }, b.readAsDataURL(E)
    }
    const g = "bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-blue-400 w-16 text-center",
        _ = "flex items-center justify-between py-2 border-b border-white/5";
    return o.jsxs("div", {
        ref: i,
        className: "bg-gray-950 border border-white/20 rounded-2xl w-[420px] shadow-2xl max-h-[90vh] flex flex-col",
        style: a,
        children: [RZ, o.jsxs("div", {
            className: "flex items-start gap-1 px-3 py-2 border-b border-white/10 flex-shrink-0 cursor-grab active:cursor-grabbing select-none",
            onMouseDown: l,
            children: [o.jsx("div", {
                className: "flex flex-wrap gap-1 flex-1",
                children: i4.map(k => o.jsx("button", {
                    onClick: () => p(k.id),
                    onMouseDown: E => E.stopPropagation(),
                    className: "px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors " + (x === k.id ? "bg-blue-500/80 text-white" : "text-white/50 hover:text-white hover:bg-white/10"),
                    children: k.label
                }, k.id))
            }), o.jsx("button", {
                onClick: e,
                onMouseDown: k => k.stopPropagation(),
                className: "text-white/40 hover:text-white flex-shrink-0 p-1",
                children: o.jsx(Zt, {
                    size: 16
                })
            })]
        }), o.jsxs("div", {
            className: "flex-1 overflow-y-auto thin-scroll px-4 py-4 flex flex-col gap-4",
            children: [x === "calendar" && o.jsxs(o.Fragment, {
                children: [o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-3 uppercase tracking-wide",
                        children: DDBTR("현재 표시 년월")
                    }), o.jsxs("div", {
                        className: "flex gap-3 items-center bg-white/5 rounded-xl px-4 py-3",
                        children: [o.jsxs("div", {
                            className: "flex flex-col items-center gap-1",
                            children: [o.jsx("label", {
                                className: "text-white/40 text-xs",
                                children: DDBTR("년도")
                            }), o.jsx("select", {
                                value: d,
                                onChange: k => n(Number(k.target.value), f),
                                className: "bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none",
                                children: l4.map(k => o.jsxs("option", {
                                    value: k,
                                    style: {
                                        backgroundColor: "#1e293b",
                                        color: "white"
                                    },
                                    children: [k, "년"]
                                }, k))
                            })]
                        }), o.jsxs("div", {
                            className: "flex flex-col items-center gap-1",
                            children: [o.jsx("label", {
                                className: "text-white/40 text-xs",
                                children: DDBTR("월")
                            }), o.jsx("select", {
                                value: f,
                                onChange: k => n(d, Number(k.target.value)),
                                className: "bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none",
                                children: o4.map(k => o.jsxs("option", {
                                    value: k,
                                    style: {
                                        backgroundColor: "#1e293b",
                                        color: "white"
                                    },
                                    children: [k, "월"]
                                }, k))
                            })]
                        }), o.jsx("button", {
                            onClick: () => {
                                const k = new Date;
                                n(k.getFullYear(), k.getMonth() + 1)
                            },
                            className: "mt-4 px-3 py-1.5 rounded-lg text-xs bg-blue-500/30 text-blue-300 hover:bg-blue-500/50 border border-blue-400/30",
                            children: DDBTR("오늘로")
                        })]
                    })]
                }), o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-3 uppercase tracking-wide",
                        children: DDBTR("달력 표시 설정")
                    }), o.jsxs("div", {
                        className: "bg-white/5 rounded-xl px-4 py-2",
                        children: [o.jsxs("div", {
                            className: _,
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("토요일 색상 구분")
                            }), o.jsx("span", {
                                className: "text-blue-300 text-xs bg-blue-400/10 px-2 py-0.5 rounded",
                                children: DDBTR("파란색")
                            })]
                        }), o.jsxs("div", {
                            className: _,
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("일요일 색상 구분")
                            }), o.jsx("span", {
                                className: "text-red-300 text-xs bg-red-400/10 px-2 py-0.5 rounded",
                                children: DDBTR("빨간색")
                            })]
                        }), o.jsxs("label", {
                            className: _ + " border-0 cursor-pointer",
                            children: [o.jsxs("span", {
                                className: "text-white/70 text-sm",
                                children: ["일정에 빠른 삭제(🗑) 버튼 표시", o.jsx("span", {
                                    className: "block text-white/35 text-[10px]",
                                    children: DDBTR("달력의 각 일정 오른쪽에 삭제 버튼이 생깁니다")
                                })]
                            }), o.jsx("input", {
                                type: "checkbox",
                                checked: !!c.quickDelete,
                                onChange: k => y("quickDelete", k.target.checked),
                                className: "w-4 h-4 flex-shrink-0"
                            })]
                        }), o.jsxs("label", {
                            className: _ + " border-0 cursor-pointer",
                            children: [o.jsxs("span", {
                                className: "text-white/70 text-sm",
                                children: [DDBTR("팀 달력만 사용"), o.jsx("span", { className: "block text-white/35 text-[10px]", children: DDBTR("개인 달력 없이 팀 달력으로 시작합니다 (회사용)") })]
                            }), o.jsx("input", {
                                type: "checkbox",
                                checked: !!c.teamOnly,
                                onChange: k => y("teamOnly", k.target.checked),
                                className: "w-4 h-4 flex-shrink-0"
                            })]
                        }), o.jsxs("label", {
                            className: _ + " border-0 cursor-pointer",
                            children: [o.jsxs("span", {
                                className: "text-white/70 text-sm",
                                children: [DDBTR("팀 보기 시 팀 선택 창 표시"), o.jsx("span", { className: "block text-white/35 text-[10px]", children: DDBTR("여러 팀을 자주 바꿀 때 켜세요. 끄면 마지막 팀을 바로 엽니다") })]
                            }), o.jsx("input", {
                                type: "checkbox",
                                checked: !!c.teamAlwaysPick,
                                onChange: k => y("teamAlwaysPick", k.target.checked),
                                className: "w-4 h-4 flex-shrink-0"
                            })]
                        }), o.jsxs("label", {
                            className: _ + " border-0 cursor-pointer",
                            children: [o.jsxs("span", {
                                className: "text-white/70 text-sm",
                                children: [DDBTR("메모 키보드 조작"), o.jsx("span", { className: "block text-white/35 text-[10px]", children: DDBTR("입력: Ctrl+← 또는 ESC후 Backspace → 목록 · 목록: ↑↓ 선택, → 열기, ← 접기, Enter 편집") })]
                            }), o.jsx("input", {
                                type: "checkbox",
                                checked: !!c.memoKbdNav,
                                onChange: k => y("memoKbdNav", k.target.checked),
                                className: "w-4 h-4 flex-shrink-0"
                            })]
                        }),
                        o.jsxs("label", { className: _ + " border-0 cursor-pointer", children: [o.jsxs("span", { className: "text-white/70 text-sm", children: [DDBTR("Tab으로 메모 이동"), o.jsx("span", { className: "block text-white/35 text-[10px]", children: DDBTR("체크한 메모끼리 Tab 키로 이동. 각 메모 제목줄의 체크박스로 선택") })] }), o.jsx("input", { type: "checkbox", checked: !!c.memoTabCycle, onChange: k => y("memoTabCycle", k.target.checked), className: "w-4 h-4 flex-shrink-0" })] }),
                        o.jsxs("div", { className: "border-0 py-1.5", children: [o.jsx("div", { className: "text-white/70 text-sm mb-1.5", children: DDBTR("달력 헤더 버튼 표시") }), o.jsx("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1", children: [{ k: "lock", n: DDBTR("사생활 잠금") }, { k: "do", n: DDBTR("Do! 리스트") }, { k: "cal", n: DDBTR("달력 보기") }, { k: "ledger", n: DDBTR("가계부") }, { k: "detail", n: DDBTR("상세보기") }, { k: "todo", n: DDBTR("할 일") }, { k: "team", n: DDBTR("팀") }, { k: "memodetail", n: DDBTR("메모 상세") }].map(bt => o.jsxs("label", { className: "flex items-center gap-2 cursor-pointer text-white/60 text-xs", children: [o.jsx("input", { type: "checkbox", checked: !((c.calBtnHidden) || []).includes(bt.k), onChange: k => { const cur = Array.isArray(c.calBtnHidden) ? c.calBtnHidden.slice() : []; const nx = k.target.checked ? cur.filter(z => z !== bt.k) : (cur.includes(bt.k) ? cur : [...cur, bt.k]); y("calBtnHidden", nx); }, className: "w-3.5 h-3.5 flex-shrink-0" }), bt.n] }, bt.k)) })] }), o.jsxs("label", {
                            className: _ + " border-0 cursor-pointer",
                            children: [o.jsxs("span", {
                                className: "text-white/70 text-sm",
                                children: ["날씨 표시 (달력 상단 7일 예보)", o.jsx("span", {
                                    className: "block text-white/35 text-[10px]",
                                    children: DDBTR("저사양 PC에서는 꺼두는 것을 권장합니다")
                                })]
                            }), o.jsx("input", {
                                type: "checkbox",
                                checked: !!(c.weather && c.weather.on),
                                onChange: k => y("weather", { ...c.weather ?? {}, on: k.target.checked }),
                                className: "w-4 h-4 flex-shrink-0"
                            })]
                        }), (c.weather && c.weather.on) && o.jsxs("div", {
                            className: _ + " border-0",
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("국가")
                            }), o.jsx("select", {
                                value: (c.weather && c.weather.country) || "kr",
                                onChange: k => {
                                    const co = k.target.value, fc = Object.keys(DDB_COUNTRIES[co].cities)[0];
                                    y("weather", { ...c.weather ?? {}, country: co, city: fc })
                                },
                                className: "bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none",
                                children: Object.keys(DDB_COUNTRIES).map(ck => o.jsx("option", {
                                    value: ck,
                                    style: { backgroundColor: "#1e293b", color: "white" },
                                    children: DDB_COUNTRIES[ck].n
                                }, ck))
                            })]
                        }), (c.weather && c.weather.on) && o.jsxs("div", {
                            className: _ + " border-0",
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("도시")
                            }), o.jsx("select", {
                                value: (c.weather && c.weather.city) || "seoul",
                                onChange: k => y("weather", { ...c.weather ?? {}, city: k.target.value }),
                                className: "bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none",
                                children: Object.keys(DDB_COUNTRIES[(c.weather && c.weather.country) || "kr"].cities).map(ck => o.jsx("option", {
                                    value: ck,
                                    style: { backgroundColor: "#1e293b", color: "white" },
                                    children: DDB_COUNTRIES[(c.weather && c.weather.country) || "kr"].cities[ck].n
                                }, ck))
                            })]
                        }), (c.weather && c.weather.on) && o.jsxs("div", {
                            className: _ + " border-0",
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("표시 위치")
                            }), o.jsx("select", {
                                value: (c.weather && c.weather.pos) || "cal",
                                onChange: k => y("weather", { ...c.weather ?? {}, pos: k.target.value }),
                                className: "bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none",
                                children: [["cal", "달력 상단"], ["top", "화면 상단바"]].map(pp => o.jsx("option", {
                                    value: pp[0],
                                    style: { backgroundColor: "#1e293b", color: "white" },
                                    children: pp[1]
                                }, pp[0]))
                            })]
                        })]
                    })]
                })]
            }), x === "lang" && o.jsxs(o.Fragment, { children: [o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("언어") + " / Language"
                    }), o.jsx("div", {
                        className: "grid grid-cols-2 gap-1.5 mb-1",
                        children: [["ko", "한국어"], ["en", "English"], ["ja", "日本語"], ["zh", "简体中文"], ["zhTW", "繁體中文"], ["de", "Deutsch"], ["es", "Español"]].map(lg => o.jsx("button", {
                            onClick: () => ddbSetLang(lg[0]),
                            className: "py-2 rounded-lg text-sm border transition-colors " + (DDB_LANG === lg[0] ? "bg-blue-500/30 border-blue-400 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"),
                            children: lg[1]
                        }, lg[0]))
                    }), o.jsx("p", {
                        className: "text-white/30 text-[10px] mb-1",
                        children: DDB_LANG === "ko" ? "※ 영어는 주요 화면부터 순차 적용 중입니다." : "* English is being applied screen by screen."
                    })]
                })] }), x === "design" && o.jsxs(o.Fragment, {
                children: [o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("대출·적금 추가 버튼 표시")
                    }), o.jsx("div", {
                        className: "grid grid-cols-3 gap-1.5 mb-1",
                        children: [{
                            k: "icon",
                            t: "아이콘만"
                        }, {
                            k: "both",
                            t: "아이콘+버튼"
                        }, {
                            k: "text",
                            t: "버튼만"
                        }].map(k => o.jsx("button", {
                            onClick: () => y("finBtnMode", k.k),
                            className: "py-2 rounded-lg text-xs border transition-colors " + ((c.finBtnMode ?? "icon") === k.k ? "bg-blue-500/30 border-blue-400 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"),
                            children: k.t
                        }, k.k))
                    }), o.jsx("p", {
                        className: "text-white/30 text-[10px] mb-1",
                        children: DDBTR("D-Day 창의 대출·적금 추가 버튼 모양을 고릅니다")
                    })]
                }), o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("배경화면")
                    }), o.jsx("div", {
                        className: "flex gap-1.5 mb-3 flex-wrap",
                        children: ["gradient", "solid", "image"].map(k => o.jsx("button", {
                            onClick: () => y("backgroundType", k),
                            className: "px-2.5 py-1 rounded-lg text-xs border transition-colors " + (c.backgroundType === k ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"),
                            children: k === "gradient" ? "🌈 그라디언트" : k === "solid" ? "🎨 단색" : "🖼️ 이미지"
                        }, k))
                    }), o.jsxs("div", {
                        className: "mb-3",
                        children: [o.jsxs("p", { className: "text-white/50 text-[11px] mb-1.5 flex items-center gap-1", children: ["\u{1F3A8} ", DDBTR("테마"), o.jsx("span", { className: "text-green-300/80", children: DDBTR("(무료)") })] }), o.jsx("div", { className: "grid grid-cols-2 gap-2", children: DDB_THEMES.map(th => o.jsx("button", {
                            onClick: () => { const _cb = c.backgroundImage; if (_cb && !DDB_THEMES.some(z => z.url === _cb)) y("savedBg", _cb); y("backgroundType", "image"); y("backgroundImage", th.url); },
                            className: "relative h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer " + (c.backgroundType === "image" && c.backgroundImage === th.url ? "border-blue-400" : "border-white/15 hover:border-white/40"),
                            style: { backgroundImage: `url("${th.url}")`, backgroundSize: "cover", backgroundPosition: "center" },
                            children: o.jsx("span", { className: "absolute bottom-0 left-0 right-0 text-[10px] text-white text-center py-0.5", style: { background: "rgba(0,0,0,0.45)" }, children: th.name })
                        }, th.key)) })]
                    }), c.savedBg && o.jsxs("button", { onClick: () => { y("backgroundType", "image"); y("backgroundImage", c.savedBg); }, className: "mb-3 flex items-center gap-2 px-3 py-2 bg-white/8 rounded-lg text-white/70 hover:bg-white/15 text-xs w-full", children: [o.jsx("img", { src: c.savedBg, className: "w-9 h-6 rounded object-cover flex-shrink-0" }), o.jsx("span", { children: DDBTR("이전 내 배경으로 되돌리기") })] }), o.jsxs("div", { className: "mb-3", children: [o.jsx("p", { className: "text-white/50 text-[11px] mb-1.5", children: "\u{1F40A} " + DDBTR("패널 캐릭터 스킨") }), o.jsx("div", { className: "grid grid-cols-2 gap-2", children: [{ k: "", n: DDBTR("없음") }].concat(Object.keys(DDB_SKINS).map(sk => ({ k: sk, n: DDB_SKINS[sk].name }))).map(opt => o.jsx("button", { onClick: () => y("panelSkin", opt.k), className: "px-2.5 py-2 rounded-lg text-xs border transition-colors " + ((c.panelSkin || "") === opt.k ? "bg-indigo-500/30 border-indigo-400/70 text-white" : "bg-white/5 border-white/15 text-white/60"), children: opt.n }, opt.k || "none")) })] }),
                    c.backgroundType === "gradient" && o.jsx("div", {
                        className: "grid grid-cols-3 gap-2",
                        children: a4.map((k, E) => o.jsxs("button", {
                            onClick: () => y("backgroundIndex", E),
                            style: {
                                background: k.value
                            },
                            className: "h-14 rounded-lg border-2 transition-all text-white/80 text-xs " + (c.backgroundIndex === E ? "border-white scale-105" : "border-transparent hover:border-white/40"),
                            children: [c.backgroundIndex === E && "✓ ", k.label]
                        }, E))
                    }), c.backgroundType === "solid" && o.jsxs("div", {
                        className: "flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3",
                        children: [o.jsx("span", {
                            className: "text-white/60 text-sm",
                            children: DDBTR("배경색")
                        }), o.jsx("input", {
                            type: "color",
                            value: c.backgroundSolidColor,
                            onChange: k => y("backgroundSolidColor", k.target.value),
                            className: "w-8 h-8 rounded cursor-pointer"
                        }), o.jsx("span", {
                            className: "text-white/40 text-xs",
                            children: c.backgroundSolidColor
                        })]
                    }), c.backgroundType === "image" && o.jsxs("div", {
                        className: "flex flex-col gap-2",
                        children: [o.jsxs("button", {
                            onClick: () => {
                                var k;
                                return (k = m.current) == null ? void 0 : k.click()
                            },
                            className: "flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/15 text-sm",
                            children: [o.jsx(au, {
                                size: 14
                            }), " 이미지 선택"]
                        }), o.jsx("input", {
                            ref: m,
                            type: "file",
                            accept: "image/*",
                            className: "hidden",
                            onChange: v
                        }), c.backgroundImage ? o.jsxs("div", {
                            className: "relative rounded-lg overflow-hidden h-24",
                            children: [o.jsx("img", {
                                src: c.backgroundImage,
                                className: "w-full h-full object-cover",
                                alt: "배경"
                            }), o.jsx("button", {
                                onClick: () => {
                                    y("backgroundImage", ""), y("backgroundType", "gradient")
                                },
                                className: "absolute top-1 right-1 bg-black/60 rounded-full p-0.5 text-white",
                                children: o.jsx(Zt, {
                                    size: 12
                                })
                            })]
                        }) : o.jsx("p", {
                            className: "text-white/30 text-xs",
                            children: DDBTR("이미지를 선택하면 배경으로 적용됩니다")
                        })]
                    })]
                }), o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("색상")
                    }), o.jsxs("div", {
                        className: "bg-white/5 rounded-xl px-4 py-2 flex flex-col gap-1",
                        children: [o.jsxs("div", {
                            className: _,
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("글씨 색상")
                            }), o.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [o.jsx("input", {
                                    type: "color",
                                    value: c.textColor,
                                    onChange: k => y("textColor", k.target.value),
                                    className: "w-7 h-7 rounded cursor-pointer"
                                }), o.jsx("span", {
                                    className: "text-white/40 text-xs",
                                    children: c.textColor
                                })]
                            })]
                        }), o.jsxs("div", {
                            className: _,
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("패널 배경색 기준")
                            }), o.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [o.jsx("input", {
                                    type: "color",
                                    value: c.panelColor || "#ffffff",
                                    onChange: k => y("panelColor", k.target.value),
                                    className: "w-7 h-7 rounded cursor-pointer"
                                }), o.jsx("span", {
                                    className: "text-white/40 text-xs",
                                    children: c.panelColor || "#ffffff"
                                })]
                            })]
                        }), o.jsxs("div", {
                            className: _ + " border-0",
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("창 배경 투명도")
                            }), o.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [o.jsx("input", {
                                    type: "range",
                                    min: 0,
                                    max: 80,
                                    value: c.panelBgOpacity,
                                    onChange: k => y("panelBgOpacity", Number(k.target.value)),
                                    className: "w-28 accent-blue-400"
                                }), o.jsxs("span", {
                                    className: "text-white/40 text-xs w-8",
                                    children: [c.panelBgOpacity, "%"]
                                })]
                            })]
                        })]
                    })]
                })]
            }), x === "font" && o.jsxs(o.Fragment, {
                children: [o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("글씨체")
                    }), o.jsx("div", {
                        className: "grid grid-cols-2 gap-1.5",
                        children: s4.map(k => o.jsxs("button", {
                            onClick: () => y("fontFamily", k.value),
                            style: {
                                fontFamily: k.value
                            },
                            className: "px-3 py-2 rounded-lg text-sm border transition-colors text-left " + (c.fontFamily === k.value ? "bg-blue-500/30 border-blue-400 text-white" : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"),
                            children: [k.label, " ", o.jsx("span", {
                                className: "text-xs opacity-60",
                                children: DDBTR("가나다")
                            })]
                        }, k.value))
                    })]
                }), o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("글씨 크기 (앱 전체)")
                    }), o.jsx("div", {
                        className: "grid grid-cols-4 gap-1.5 mb-2",
                        children: [{
                            l: "20대",
                            v: 14,
                            e: "🧑"
                        }, {
                            l: "30대",
                            v: 22,
                            e: "🧔"
                        }, {
                            l: "40대",
                            v: 32,
                            e: "👨‍🦱"
                        }, {
                            l: "50대",
                            v: 44,
                            e: "🧓"
                        }].map(k => o.jsxs("button", {
                            onClick: () => r({
                                type: "SET_FONT_SIZE",
                                size: k.v
                            }),
                            className: "flex flex-col items-center py-2 rounded-lg border transition-colors " + (t.fontSize === k.v ? "bg-blue-500/30 border-blue-400 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"),
                            children: [o.jsx("span", {
                                style: {
                                    fontSize: 18
                                },
                                children: k.e
                            }), o.jsx("span", {
                                className: "text-[11px] mt-0.5",
                                children: k.l
                            })]
                        }, k.l))
                    }), o.jsxs("div", {
                        className: "flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2",
                        children: [o.jsx("span", {
                            className: "text-white/60 text-xs flex-shrink-0 w-16",
                            children: DDBTR("직접 조절")
                        }), o.jsx("button", {
                            onClick: () => r({
                                type: "SET_FONT_SIZE",
                                size: Math.max(8, t.fontSize - 1)
                            }),
                            className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 font-bold flex-shrink-0",
                            children: "−"
                        }), o.jsx("input", {
                            type: "range",
                            min: 8,
                            max: 60,
                            value: t.fontSize,
                            onChange: k => r({
                                type: "SET_FONT_SIZE",
                                size: Number(k.target.value)
                            }),
                            className: "flex-1 accent-blue-400"
                        }), o.jsx("button", {
                            onClick: () => r({
                                type: "SET_FONT_SIZE",
                                size: Math.min(60, t.fontSize + 1)
                            }),
                            className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 font-bold flex-shrink-0",
                            children: "+"
                        }), o.jsxs("span", {
                            className: "text-blue-300/70 text-xs w-9 text-right flex-shrink-0",
                            children: [t.fontSize, "pt"]
                        })]
                    })]
                }), o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("상단 버튼 크기")
                    }), o.jsxs("div", {
                        className: "flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2",
                        children: [o.jsx("button", {
                            onClick: () => y("topBtnSize", Math.max(11, (c.topBtnSize ?? 12) - 1)),
                            className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 font-bold flex-shrink-0",
                            children: "−"
                        }), o.jsx("input", {
                            type: "range",
                            min: 11,
                            max: 60,
                            value: c.topBtnSize ?? 12,
                            onChange: k => y("topBtnSize", Number(k.target.value)),
                            className: "flex-1 accent-purple-400"
                        }), o.jsx("button", {
                            onClick: () => y("topBtnSize", Math.min(60, (c.topBtnSize ?? 12) + 1)),
                            className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 font-bold flex-shrink-0",
                            children: "+"
                        }), o.jsxs("span", {
                            className: "text-purple-300/70 text-xs w-9 text-right flex-shrink-0",
                            children: [c.topBtnSize ?? 12, "px"]
                        })]
                    })]
                }), o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("달력 글씨 크기")
                    }), o.jsxs("div", {
                        className: "bg-white/5 rounded-xl px-4 py-3 flex flex-col gap-3",
                        children: [(() => {
                            const k = c.calHeaderFontSize ?? 18;
                            return o.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [o.jsx("span", {
                                    className: "text-green-300 text-xs w-20 flex-shrink-0",
                                    children: DDBTR("📅 헤더")
                                }), o.jsx("button", {
                                    onClick: () => y("calHeaderFontSize", Math.max(10, k - 1)),
                                    className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-base font-bold flex-shrink-0",
                                    children: "−"
                                }), o.jsx("input", {
                                    type: "range",
                                    min: 10,
                                    max: 60,
                                    value: k,
                                    onChange: E => y("calHeaderFontSize", Number(E.target.value)),
                                    className: "flex-1 accent-green-400"
                                }), o.jsx("button", {
                                    onClick: () => y("calHeaderFontSize", Math.min(32, k + 1)),
                                    className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-base font-bold flex-shrink-0",
                                    children: "+"
                                }), o.jsxs("span", {
                                    className: "text-green-300/70 text-xs w-8 text-right flex-shrink-0",
                                    children: [k, "px"]
                                })]
                            })
                        })(), (() => {
                            const k = c.teamNameFontSize ?? 18;
                            return o.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [o.jsx("span", {
                                    className: "text-indigo-300 text-xs w-20 flex-shrink-0",
                                    children: DDBTR("👥 팀 이름")
                                }), o.jsx("button", {
                                    onClick: () => y("teamNameFontSize", Math.max(10, k - 1)),
                                    className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-base font-bold flex-shrink-0",
                                    children: "−"
                                }), o.jsx("input", {
                                    type: "range",
                                    min: 10,
                                    max: 60,
                                    value: k,
                                    onChange: E => y("teamNameFontSize", Number(E.target.value)),
                                    className: "flex-1 accent-indigo-400"
                                }), o.jsx("button", {
                                    onClick: () => y("teamNameFontSize", Math.min(60, k + 1)),
                                    className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-base font-bold flex-shrink-0",
                                    children: "+"
                                }), o.jsxs("span", {
                                    className: "text-indigo-300/70 text-xs w-8 text-right flex-shrink-0",
                                    children: [k, "px"]
                                })]
                            })
                        })(), (() => {
                            const k = c.calDateFontSize ?? 12;
                            return o.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [o.jsx("span", {
                                    className: "text-sky-300 text-xs w-20 flex-shrink-0",
                                    children: DDBTR("🔢 날짜")
                                }), o.jsx("button", {
                                    onClick: () => y("calDateFontSize", Math.max(6, k - 1)),
                                    className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-base font-bold flex-shrink-0",
                                    children: "−"
                                }), o.jsx("input", {
                                    type: "range",
                                    min: 6,
                                    max: 60,
                                    value: k,
                                    onChange: E => y("calDateFontSize", Number(E.target.value)),
                                    className: "flex-1 accent-sky-400"
                                }), o.jsx("button", {
                                    onClick: () => y("calDateFontSize", Math.min(24, k + 1)),
                                    className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-base font-bold flex-shrink-0",
                                    children: "+"
                                }), o.jsxs("span", {
                                    className: "text-sky-300/70 text-xs w-8 text-right flex-shrink-0",
                                    children: [k, "px"]
                                })]
                            })
                        })(), o.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [o.jsx("span", {
                                className: "text-yellow-300 text-xs w-20 flex-shrink-0",
                                children: DDBTR("📝 내용")
                            }), o.jsx("button", {
                                onClick: () => s(Math.max(6, h - 1)),
                                className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-base font-bold flex-shrink-0",
                                children: "−"
                            }), o.jsx("input", {
                                type: "range",
                                min: 6,
                                max: 60,
                                value: h,
                                onChange: k => s(Number(k.target.value)),
                                className: "flex-1 accent-yellow-400"
                            }), o.jsx("button", {
                                onClick: () => s(Math.min(18, h + 1)),
                                className: "w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 text-base font-bold flex-shrink-0",
                                children: "+"
                            }), o.jsxs("span", {
                                className: "text-yellow-300/70 text-xs w-8 text-right flex-shrink-0",
                                children: [h, "px"]
                            })]
                        }), o.jsxs("div", {
                            className: "bg-white/10 rounded-lg px-3 py-2 flex flex-col gap-1",
                            children: [o.jsx("span", {
                                className: "text-green-300 font-bold",
                                style: {
                                    fontSize: c.calHeaderFontSize ?? 18
                                },
                                children: DDBTR("2026년 5월")
                            }), o.jsxs("div", {
                                className: "flex items-baseline gap-2",
                                children: [o.jsx("span", {
                                    className: "text-sky-300 font-medium",
                                    style: {
                                        fontSize: c.calDateFontSize ?? 12
                                    },
                                    children: "13"
                                }), o.jsx("span", {
                                    className: "text-white/70",
                                    style: {
                                        fontSize: h
                                    },
                                    children: DDBTR("네이버페이충전 +100,000")
                                })]
                            })]
                        })]
                    })]
                })]
            }), x === "panel" && o.jsxs(o.Fragment, {
                children: [o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("패널 투명도 / 색상")
                    }), o.jsxs("div", {
                        className: "bg-white/5 rounded-xl px-4 py-2 flex flex-col gap-1",
                        children: [o.jsxs("div", {
                            className: _,
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("패널 배경 투명도")
                            }), o.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [o.jsx("input", {
                                    type: "range",
                                    min: 0,
                                    max: 80,
                                    value: c.panelBgOpacity,
                                    onChange: k => y("panelBgOpacity", Number(k.target.value)),
                                    className: "w-28 accent-blue-400"
                                }), o.jsxs("span", {
                                    className: "text-white/40 text-xs w-8",
                                    children: [c.panelBgOpacity, "%"]
                                })]
                            })]
                        }), o.jsxs("div", {
                            className: _ + " border-0",
                            children: [o.jsx("span", {
                                className: "text-white/70 text-sm",
                                children: DDBTR("패널 배경 기준색")
                            }), o.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [o.jsx("input", {
                                    type: "color",
                                    value: c.panelColor || "#ffffff",
                                    onChange: k => y("panelColor", k.target.value),
                                    className: "w-7 h-7 rounded cursor-pointer"
                                }), o.jsx("button", {
                                    onClick: () => y("panelColor", "#ffffff"),
                                    className: "text-white/30 text-xs hover:text-white/60",
                                    children: DDBTR("리셋")
                                })]
                            })]
                        })]
                    })]
                }), o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("패널 미리보기")
                    }), o.jsxs("div", {
                        className: "rounded-xl overflow-hidden border border-white/10",
                        children: [o.jsxs("div", {
                            className: "px-3 py-2 border-b border-white/10 flex items-center gap-2",
                            style: {
                                backgroundColor: `${c.panelColor||"#ffffff"}${Math.round(c.panelBgOpacity/100*255).toString(16).padStart(2,"0")}`
                            },
                            children: [o.jsx("div", {
                                className: "w-2 h-2 rounded-full bg-blue-400"
                            }), o.jsx("span", {
                                className: "text-white text-xs",
                                children: DDBTR("📅 달력 패널")
                            })]
                        }), o.jsx("div", {
                            className: "px-3 py-3 text-white/50 text-xs",
                            style: {
                                backgroundColor: `${c.panelColor||"#ffffff"}${Math.round(c.panelBgOpacity/100*255*.6).toString(16).padStart(2,"0")}`
                            },
                            children: DDBTR("패널 내용 영역 미리보기")
                        })]
                    })]
                })]
            }), x === "hotkey" && (() => {
                const K9 = c.calHotkeys ?? {},
                    N9 = [{
                        k: "lock",
                        l: "🔒 사생활 보호"
                    }, {
                        k: "do",
                        l: "Do! 리스트"
                    }, {
                        k: "cal",
                        l: "📅 달력 보기"
                    }, {
                        k: "ledger",
                        l: "💰 가계부 보기"
                    }, {
                        k: "detail",
                        l: "📋 상세보기 (월 필터)"
                    }, {
                        k: "todo",
                        l: "☑ 할 일 목록"
                    }, {
                        k: "memo1",
                        l: "📝 메모 1"
                    }, {
                        k: "memo2",
                        l: "📝 메모 2"
                    }, {
                        k: "memo3",
                        l: "📝 메모 3"
                    }, {
                        k: "memo4",
                        l: "📝 메모 4"
                    }, {
                        k: "memo5",
                        l: "📝 메모 5"
                    }, {
                        k: "calc",
                        l: "🔢 계산기"
                    }, {
                        k: "team",
                        l: "👥 팀 달력"
                    }, {
                        k: "playNext",
                        l: "⏭ 다음곡"
                    }, {
                        k: "playPrev",
                        l: "⏮ 이전곡"
                    }, {
                        k: "playToggle",
                        l: "⏯ 재생/정지"
                    }];
                return o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("달력 버튼 단축키")
                    }), o.jsx("p", {
                        className: "text-white/30 text-[10px] mb-3",
                        children: DDBTR("입력칸을 클릭한 뒤 원하는 키(조합키 가능: Ctrl/Alt/Shift+키)를 누르면 저장됩니다. Backspace로 삭제. 달력 창이 열려 있을 때 작동하며, 글자 입력 중에는 무시됩니다.")
                    }), o.jsx("div", {
                        className: "flex flex-col gap-2",
                        children: N9.map(K => o.jsxs("div", {
                            className: "flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2",
                            children: [o.jsx("span", {
                                className: "text-white/70 text-xs flex-1",
                                children: K.l
                            }), o.jsx("input", {
                                readOnly: !0,
                                value: K9[K.k] ?? "",
                                placeholder: DDBTR("클릭 후 키 입력"),
                                onKeyDown: se => {
                                    if (se.preventDefault(), se.key === "Backspace" || se.key === "Delete") {
                                        const z = {
                                            ...K9
                                        };
                                        delete z[K.k], y("calHotkeys", z);
                                        return
                                    }
                                    if (["control", "alt", "shift", "meta", "escape"].includes(se.key.toLowerCase())) return;
                                    const z = (se.ctrlKey ? "ctrl+" : "") + (se.altKey ? "alt+" : "") + (se.shiftKey ? "shift+" : "") + se.key.toLowerCase(),
                                        G = Object.keys(K9).find(re => K9[re] === z && re !== K.k);
                                    if (G) {
                                        alert("이미 다른 버튼에 지정된 키입니다.");
                                        return
                                    }
                                    y("calHotkeys", {
                                        ...K9,
                                        [K.k]: z
                                    })
                                },
                                className: "w-32 bg-white/10 border border-white/15 rounded-lg px-2 py-1.5 text-center text-xs text-amber-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                            })]
                        }, K.k))
                    })]
                })
            })(), x === "lock" && o.jsxs(o.Fragment, {
                children: [o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("잠금 비밀번호")
                    }), o.jsxs("div", {
                        className: "flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 mb-2",
                        children: [o.jsx("input", {
                            type: "password",
                            value: c.lockPassword ?? "",
                            onChange: K => y("lockPassword", K.target.value),
                            placeholder: DDBTR("비밀번호 입력"),
                            className: "flex-1 bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-400"
                        }), c.lockPassword && o.jsx("button", {
                            onClick: () => y("lockPassword", void 0),
                            className: "px-2 py-1.5 rounded-lg text-xs bg-white/10 text-white/50 hover:bg-white/20",
                            children: DDBTR("지우기")
                        })]
                    }), o.jsx("p", {
                        className: "text-white/30 text-[10px] mb-4",
                        children: DDBTR("※ 간단한 화면 잠금용입니다. 비밀번호를 잊으면 로그아웃(초기화) 후 다시 로그인해야 합니다.")
                    }), o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("잠금화면 배경")
                    }), o.jsx("div", {
                        className: "flex gap-1.5 mb-2",
                        children: [{
                            k: "gradient",
                            l: "그라데이션"
                        }, {
                            k: "solid",
                            l: "단색"
                        }, {
                            k: "image",
                            l: "이미지"
                        }].map(K => o.jsx("button", {
                            onClick: () => y("lockBg", {
                                ...c.lockBg ?? {},
                                type: K.k
                            }),
                            className: "flex-1 py-1.5 rounded-lg text-xs transition-colors " + (((c.lockBg ?? {}).type ?? "gradient") === K.k ? "bg-blue-500/40 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"),
                            children: K.l
                        }, K.k))
                    }), ((c.lockBg ?? {}).type ?? "gradient") === "solid" && o.jsxs("div", {
                        className: "flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 mb-2",
                        children: [o.jsx("span", {
                            className: "text-white/50 text-xs",
                            children: DDBTR("배경색")
                        }), o.jsx("input", {
                            type: "color",
                            value: (c.lockBg ?? {}).color ?? "#0f172a",
                            onChange: K => y("lockBg", {
                                ...c.lockBg ?? {},
                                type: "solid",
                                color: K.target.value
                            }),
                            className: "w-10 h-7 rounded cursor-pointer bg-transparent border border-white/20"
                        })]
                    }), ((c.lockBg ?? {}).type ?? "gradient") === "image" && o.jsxs("div", {
                        className: "flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 mb-2",
                        children: [(c.lockBg ?? {}).image ? o.jsx("img", {
                            src: (c.lockBg ?? {}).image,
                            className: "w-14 h-9 object-cover rounded"
                        }) : o.jsx("span", {
                            className: "text-white/30 text-[10px]",
                            children: DDBTR("이미지 없음")
                        }), o.jsx("input", {
                            type: "file",
                            accept: "image/*",
                            id: "ddb-lockbg-file",
                            className: "hidden",
                            onChange: K => {
                                var G;
                                const se = (G = K.target.files) == null ? void 0 : G[0];
                                if (!se) return;
                                if (se.size > 512e3) {
                                    alert("이미지가 너무 큽니다. 500KB 이하로 줄여주세요.");
                                    K.target.value = "";
                                    return
                                }
                                const z = new FileReader;
                                z.onload = re => {
                                    var Y;
                                    y("lockBg", {
                                        ...c.lockBg ?? {},
                                        type: "image",
                                        image: (Y = re.target) == null ? void 0 : Y.result
                                    })
                                }, z.readAsDataURL(se), K.target.value = ""
                            }
                        }), o.jsx("button", {
                            onClick: () => {
                                var K;
                                return (K = document.getElementById("ddb-lockbg-file")) == null ? void 0 : K.click()
                            },
                            className: "ml-auto px-2.5 py-1.5 rounded-lg text-xs bg-blue-500/30 text-blue-200 hover:bg-blue-500/50",
                            children: DDBTR("이미지 선택")
                        })]
                    }), o.jsx("button", {
                        onClick: () => {
                            if (!c.lockPassword) {
                                alert("먼저 잠금 비밀번호를 입력하세요.");
                                return
                            }
                            localStorage.setItem("ddb_locked", "1"), window.dispatchEvent(new CustomEvent("ddb-lock")), e()
                        },
                        className: "w-full mt-2 py-2 rounded-xl bg-purple-500/30 text-purple-200 hover:bg-purple-500/50 text-sm font-medium",
                        children: DDBTR("🔐 지금 잠그기")
                    })]
                })]
            }), x === "privacy" && o.jsxs(o.Fragment, {
                children: [o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-3 uppercase tracking-wide",
                        children: DDBTR("사생활 모드")
                    }), o.jsxs("div", {
                        className: "flex items-center justify-between bg-white/5 rounded-xl px-4 py-3",
                        children: [o.jsxs("div", {
                            children: [o.jsx("p", {
                                className: "text-white text-sm font-medium",
                                children: DDBTR("사생활 모드")
                            }), o.jsx("p", {
                                className: "text-white/40 text-xs mt-0.5",
                                children: DDBTR("일정 시간 조작 없으면 화면이 투명해집니다")
                            })]
                        }), o.jsx("button", {
                            onClick: () => w("enabled", !u.enabled),
                            className: "relative w-12 h-6 rounded-full transition-colors " + (u.enabled ? "bg-purple-500" : "bg-white/20"),
                            children: o.jsx("span", {
                                className: "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all " + (u.enabled ? "left-7" : "left-1")
                            })
                        })]
                    })]
                }), o.jsxs("section", {
                    className: u.enabled ? "" : "opacity-40 pointer-events-none",
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("표시 방식")
                    }), o.jsx("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [{
                            k: "opacity",
                            t: "투명하게",
                            d: "내용이 흐려집니다"
                        }, {
                            k: "background",
                            t: "배경만 보이기",
                            d: "설정한 배경으로 덮습니다"
                        }].map(k => o.jsxs("button", {
                            onClick: () => w("mode", k.k),
                            className: "text-left px-3 py-2 rounded-xl border transition-colors " + ((u.mode ?? "opacity") === k.k ? "bg-purple-500/30 border-purple-400 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"),
                            children: [o.jsx("p", {
                                className: "text-sm font-medium",
                                children: k.t
                            }), o.jsx("p", {
                                className: "text-[10px] text-white/40 mt-0.5",
                                children: k.d
                            })]
                        }, k.k))
                    })]
                }), o.jsxs("section", {
                    className: u.enabled ? "" : "opacity-40 pointer-events-none",
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("비활성 타이머")
                    }), o.jsx("div", {
                        className: "flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3",
                        children: [
                            ["idleHours", 23, "시간"],
                            ["idleMinutes", 59, "분"],
                            ["idleSeconds", 59, "초"]
                        ].map(([k, E, b]) => o.jsxs("div", {
                            className: "flex flex-col items-center gap-1",
                            children: [o.jsx("input", {
                                type: "number",
                                min: 0,
                                max: E,
                                value: u[k],
                                onChange: T => w(k, Math.max(0, Math.min(E, Number(T.target.value)))),
                                className: g
                            }), o.jsx("span", {
                                className: "text-white/40 text-xs",
                                children: b
                            })]
                        }, k))
                    })]
                }), o.jsxs("section", {
                    className: u.enabled ? "" : "opacity-40 pointer-events-none",
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("투명도")
                    }), o.jsxs("div", {
                        className: "flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3",
                        children: [o.jsx("input", {
                            type: "range",
                            min: 1,
                            max: 50,
                            value: u.fadeOpacity,
                            onChange: k => w("fadeOpacity", Number(k.target.value)),
                            className: "flex-1 accent-purple-400"
                        }), o.jsxs("span", {
                            className: "text-white/60 text-sm w-10 text-right",
                            children: [u.fadeOpacity, "%"]
                        })]
                    })]
                }), u.enabled && o.jsxs("section", {
                    children: [o.jsx("h4", {
                        className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                        children: DDBTR("미리보기")
                    }), o.jsx("div", {
                        className: "relative h-16 bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl overflow-hidden",
                        children: o.jsx("div", {
                            className: "absolute inset-0 flex items-center justify-center",
                            style: {
                                opacity: u.fadeOpacity / 100
                            },
                            children: o.jsx("div", {
                                className: "bg-black/60 rounded-lg px-4 py-2 text-white text-sm",
                                children: DDBTR("일정 내용 미리보기")
                            })
                        })
                    })]
                })]
            }), x === "feedback" && (() => {
                const k = c.feedbackThresholds ?? iu,
                    E = t.feedbackMemos ?? [],
                    b = E.filter(K => !K.isDismissed),
                    T = E.filter(K => K.isDismissed && K.completedAt);

                function A(K, se) {
                    const G = [...k].sort((re, Y) => re.minDays - Y.minDays).map((re, Y) => Y === K ? {
                        ...re,
                        ...se
                    } : re);
                    y("feedbackThresholds", G)
                }

                function H() {
                    y("feedbackThresholds", [...k, {
                        minDays: 1,
                        emoji: "❕",
                        color: "#ffffff"
                    }])
                }

                function F(K) {
                    if (k.length <= 1) return;
                    const se = [...k].sort((z, G) => z.minDays - G.minDays);
                    y("feedbackThresholds", se.filter((z, G) => G !== K))
                }

                function R() {
                    y("feedbackThresholds", iu)
                }
                return o.jsxs(o.Fragment, {
                    children: [o.jsxs("section", {
                        children: [o.jsx("h4", {
                            className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                            children: DDBTR("알림 아이콘 이미지")
                        }), o.jsxs("div", {
                            className: "flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 mb-4",
                            children: [c.feedbackIcon ? o.jsx("img", {
                                src: c.feedbackIcon,
                                className: "w-8 h-8 object-contain rounded bg-black/30 p-0.5"
                            }) : o.jsx("span", {
                                className: "text-[18px]",
                                children: "❗"
                            }), o.jsxs("div", {
                                className: "flex-1",
                                children: [o.jsx("p", {
                                    className: "text-white/60 text-[11px]",
                                    children: DDBTR("피드백 알림에 쓸 이미지를 직접 올릴 수 있습니다.")
                                }), o.jsx("p", {
                                    className: "text-white/30 text-[10px]",
                                    children: DDBTR("권장: 32×32 ~ 64×64 픽셀, PNG(투명 배경) — 최대 100KB")
                                })]
                            }), o.jsx("input", {
                                type: "file",
                                accept: "image/*",
                                id: "ddb-fbicon-file",
                                className: "hidden",
                                onChange: K => {
                                    var G;
                                    const se = (G = K.target.files) == null ? void 0 : G[0];
                                    if (!se) return;
                                    if (se.size > 102400) {
                                        alert("이미지가 너무 큽니다. 100KB 이하로 줄여주세요. (권장 32×32~64×64 픽셀)");
                                        K.target.value = "";
                                        return
                                    }
                                    const z = new FileReader;
                                    z.onload = re => {
                                        var Y;
                                        y("feedbackIcon", (Y = re.target) == null ? void 0 : Y.result)
                                    }, z.readAsDataURL(se), K.target.value = ""
                                }
                            }), o.jsx("button", {
                                onClick: () => {
                                    var K;
                                    return (K = document.getElementById("ddb-fbicon-file")) == null ? void 0 : K.click()
                                },
                                className: "px-2.5 py-1.5 rounded-lg text-xs bg-blue-500/30 text-blue-200 hover:bg-blue-500/50",
                                children: DDBTR("이미지 선택")
                            }), c.feedbackIcon && o.jsx("button", {
                                onClick: () => y("feedbackIcon", void 0),
                                className: "px-2 py-1.5 rounded-lg text-xs bg-white/10 text-white/50 hover:bg-white/20",
                                children: DDBTR("기본값")
                            })]
                        }), o.jsx("h4", {
                            className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                            children: DDBTR("경과 기간별 알림 임계값")
                        }), o.jsx("p", {
                            className: "text-white/30 text-[10px] mb-3",
                            children: DDBTR("경과 일수 이상이면 해당 색상·아이콘으로 표시됩니다.")
                        }), o.jsx("div", {
                            className: "flex flex-col gap-2",
                            children: [...k].sort((K, se) => K.minDays - se.minDays).map((K, se) => o.jsxs("div", {
                                className: "flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2",
                                children: [o.jsx("span", {
                                    className: "text-[18px] w-7 text-center leading-none",
                                    style: {
                                        color: K.color
                                    },
                                    children: K.emoji
                                }), o.jsxs("div", {
                                    className: "flex flex-col gap-1 flex-1 min-w-0",
                                    children: [o.jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [o.jsx("span", {
                                            className: "text-white/50 text-[10px] w-12 flex-shrink-0",
                                            children: DDBTR("시작 일수")
                                        }), o.jsx("input", {
                                            type: "number",
                                            min: 0,
                                            max: 999,
                                            value: K.minDays,
                                            onChange: z => A(se, {
                                                minDays: Number(z.target.value)
                                            }),
                                            className: "w-14 bg-white/10 border border-white/20 rounded px-2 py-0.5 text-white text-xs focus:outline-none"
                                        }), o.jsx("span", {
                                            className: "text-white/30 text-[10px]",
                                            children: DDBTR("일 이상")
                                        })]
                                    }), o.jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [o.jsx("span", {
                                            className: "text-white/50 text-[10px] w-12 flex-shrink-0",
                                            children: DDBTR("아이콘")
                                        }), o.jsx("input", {
                                            type: "text",
                                            value: K.emoji,
                                            maxLength: 4,
                                            onChange: z => A(se, {
                                                emoji: z.target.value
                                            }),
                                            className: "w-12 bg-white/10 border border-white/20 rounded px-2 py-0.5 text-white text-xs focus:outline-none text-center"
                                        }), o.jsx("span", {
                                            className: "text-white/50 text-[10px]",
                                            children: DDBTR("색상")
                                        }), o.jsx("input", {
                                            type: "color",
                                            value: K.color,
                                            onChange: z => A(se, {
                                                color: z.target.value
                                            }),
                                            className: "w-7 h-6 rounded cursor-pointer bg-transparent border-0"
                                        })]
                                    })]
                                }), o.jsx("button", {
                                    onClick: () => F(se),
                                    className: "text-white/30 hover:text-red-400 flex-shrink-0",
                                    children: o.jsx(Gr, {
                                        size: 13
                                    })
                                })]
                            }, se))
                        }), o.jsxs("div", {
                            className: "flex gap-2 mt-2",
                            children: [o.jsxs("button", {
                                onClick: H,
                                className: "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs transition-colors",
                                children: [o.jsx(Vr, {
                                    size: 11
                                }), " 추가"]
                            }), o.jsx("button", {
                                onClick: R,
                                className: "px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 text-xs transition-colors",
                                children: DDBTR("초기화")
                            })]
                        })]
                    }), o.jsxs("section", {
                        children: [o.jsxs("h4", {
                            className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                            children: ["활성 피드백 (", b.length, "개)"]
                        }), b.length === 0 && o.jsx("p", {
                            className: "text-white/20 text-xs",
                            children: DDBTR("활성 피드백이 없습니다.")
                        }), o.jsx("div", {
                            className: "flex flex-col gap-1.5",
                            children: b.map(K => {
                                const se = Math.floor((Date.now() - new Date(K.createdAt).getTime()) / 864e5),
                                    z = [...k].sort((re, Y) => Y.minDays - re.minDays),
                                    G = z.find(re => se >= re.minDays) ?? z[z.length - 1];
                                return o.jsxs("div", {
                                    className: "flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2",
                                    children: [o.jsx("span", {
                                        className: "text-[14px]",
                                        style: {
                                            color: G.color
                                        },
                                        children: G.emoji
                                    }), o.jsxs("div", {
                                        className: "flex-1 min-w-0",
                                        children: [o.jsx("p", {
                                            className: "text-white/80 text-xs truncate",
                                            children: K.content
                                        }), o.jsxs("p", {
                                            className: "text-white/30 text-[10px]",
                                            children: [K.tabTitle, " · ", se, "일 경과"]
                                        })]
                                    }), o.jsxs("div", {
                                        className: "flex gap-1 flex-shrink-0",
                                        children: [o.jsx("button", {
                                            onClick: () => r({
                                                type: "COMPLETE_FEEDBACK_MEMO",
                                                id: K.id
                                            }),
                                            className: "text-green-400/70 hover:text-green-300 text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 hover:bg-green-500/20",
                                            children: DDBTR("완료")
                                        }), o.jsx("button", {
                                            onClick: () => r({
                                                type: "DISMISS_FEEDBACK_MEMO",
                                                id: K.id
                                            }),
                                            className: "text-white/30 hover:text-white/60",
                                            children: o.jsx(Zt, {
                                                size: 11
                                            })
                                        })]
                                    })]
                                }, K.id)
                            })
                        })]
                    }), T.length > 0 && o.jsxs("section", {
                        children: [o.jsxs("h4", {
                            className: "text-white/40 text-xs mb-2 uppercase tracking-wide",
                            children: ["완료 이력 (", T.length, "개)"]
                        }), o.jsx("div", {
                            className: "flex flex-col gap-1",
                            children: T.map(K => {
                                const se = K.completedAt ? Math.floor((new Date(K.completedAt).getTime() - new Date(K.createdAt).getTime()) / 864e5) : 0;
                                return o.jsxs("div", {
                                    className: "flex items-center gap-2 bg-white/5 rounded-xl px-3 py-1.5 opacity-60",
                                    children: [o.jsx("span", {
                                        className: "text-green-400 text-xs",
                                        children: "✅"
                                    }), o.jsxs("div", {
                                        className: "flex-1 min-w-0",
                                        children: [o.jsx("p", {
                                            className: "text-white/70 text-xs truncate",
                                            children: K.content
                                        }), o.jsxs("p", {
                                            className: "text-white/30 text-[10px]",
                                            children: [K.tabTitle, " · ", se, "일 만에 완료"]
                                        })]
                                    })]
                                }, K.id)
                            })
                        })]
                    })]
                })
            })()]
        }), o.jsx("div", {
            className: "px-4 pb-4 flex-shrink-0",
            children: o.jsx("button", {
                onClick: e,
                className: "w-full py-2 rounded-xl bg-white/10 border border-white/20 text-white/60 hover:bg-white/15 hover:text-white transition-colors text-sm font-medium",
                children: DDBTR("닫기")
            })
        })]
    })
}
const ut = e => Math.abs(e).toLocaleString("ko-KR");

function wm(e, t, r) {
    const n = `${t}-${String(r).padStart(2,"0")}`,
        s = new Date(t, r, 0).getDate(),
        a = new Set,
        i = [];
    for (let l = 1; l <= s; l++) {
        const c = `${n}-${String(l).padStart(2,"0")}`;
        for (const u of e) {
            if (u.amount === void 0 || a.has(u.id)) continue;
            (u.repeat ? Ff(u.date, c, u.repeat) : Df(c, u.date, u.endDate)) && (a.add(u.id), i.push(u))
        }
    }
    return i
}

function u4({
    onClose: e
}) {
    const {
        state: t
    } = vt(), {
        events: r,
        loans: n,
        savings: s,
        currentYear: a,
        currentMonth: i
    } = t, [l, c] = O.useState("monthly"), [u, h] = O.useState(a), [d, f] = O.useState(null), x = O.useMemo(() => Array.from({
        length: 12
    }, (v, g) => {
        const _ = g + 1,
            k = `${u}-${String(_).padStart(2,"0")}`,
            E = wm(r, u, _),
            b = E.filter(R => (R.amount ?? 0) > 0).reduce((R, K) => R + K.amount, 0),
            T = E.filter(R => (R.amount ?? 0) < 0 && !R.linkedLoanId).reduce((R, K) => R + Math.abs(K.amount), 0),
            A = n.reduce((R, K) => {
                const se = da(K).find(z => z.month === k);
                return R + ((se == null ? void 0 : se.payment) ?? 0)
            }, 0),
            H = s.reduce((R, K) => {
                const se = bo(K).find(z => z.month === k);
                return R + ((se == null ? void 0 : se.deposit) ?? 0)
            }, 0),
            F = b - T - A - H;
        return {
            month: _,
            ym: k,
            income: b,
            expense: T,
            loanPay: A,
            svPay: H,
            net: F
        }
    }), [r, n, s, u]), p = O.useMemo(() => ({
        income: x.slice(0, a === u ? i : 12).reduce((v, g) => v + g.income, 0),
        expense: x.slice(0, a === u ? i : 12).reduce((v, g) => v + g.expense, 0),
        loanPay: x.slice(0, a === u ? i : 12).reduce((v, g) => v + g.loanPay, 0),
        svPay: x.slice(0, a === u ? i : 12).reduce((v, g) => v + g.svPay, 0),
        net: x.slice(0, a === u ? i : 12).reduce((v, g) => v + g.net, 0)
    }), [x, a, i, u]), m = O.useMemo(() => Array.from({
        length: 6
    }, (g, _) => a - 3 + _).map(g => {
        let _ = 0,
            k = 0,
            E = 0,
            b = 0;
        for (let T = 1; T <= 12; T++) {
            const A = `${g}-${String(T).padStart(2,"0")}`,
                H = wm(r, g, T);
            _ += H.filter(F => (F.amount ?? 0) > 0).reduce((F, R) => F + R.amount, 0), k += H.filter(F => (F.amount ?? 0) < 0 && !F.linkedLoanId).reduce((F, R) => F + Math.abs(R.amount), 0), E += n.reduce((F, R) => {
                var K;
                return F + (((K = da(R).find(se => se.month === A)) == null ? void 0 : K.payment) ?? 0)
            }, 0), b += s.reduce((F, R) => {
                var K;
                return F + (((K = bo(R).find(se => se.month === A)) == null ? void 0 : K.deposit) ?? 0)
            }, 0)
        }
        return {
            year: g,
            income: _,
            expense: k,
            loanPay: E,
            svPay: b,
            net: _ - k - E - b
        }
    }), [r, n, s, a]), y = "pb-2 text-left text-white/40 font-normal", w = "py-1.5 text-right";
    return o.jsx("div", {
        className: "fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
        onClick: e,
        children: o.jsxs("div", {
            className: "bg-gray-950 border border-white/20 rounded-2xl w-full max-w-3xl shadow-2xl max-h-[92vh] flex flex-col",
            onClick: v => v.stopPropagation(),
            children: [o.jsxs("div", {
                className: "flex items-center gap-2 px-4 py-3 border-b border-white/10 flex-shrink-0",
                children: [o.jsx(kT, {
                    size: 18,
                    className: "text-green-400"
                }), o.jsx("span", {
                    className: "text-white font-bold",
                    children: DDBTR("가계부")
                }), o.jsx("div", {
                    className: "flex gap-1 ml-3",
                    children: ["monthly", "yearly", "loans", "bank"].map(v => o.jsx("button", {
                        onClick: () => c(v),
                        className: "px-3 py-1 rounded-lg text-xs font-medium transition-colors " + (l === v ? "bg-green-500/70 text-white" : "text-white/50 hover:text-white hover:bg-white/10"),
                        children: v === "monthly" ? "📅 월별" : v === "yearly" ? "📊 연별" : v === "loans" ? "🏦 대출·적금" : DDBTR("🏧 은행")
                    }, v))
                }), o.jsx("button", {
                    onClick: e,
                    className: "ml-auto text-white/40 hover:text-white p-1",
                    children: o.jsx(Zt, {
                        size: 16
                    })
                })]
            }), o.jsxs("div", {
                className: "flex-1 overflow-y-auto thin-scroll p-4 min-h-0",
                children: [l === "monthly" && o.jsxs("div", {
                    children: [o.jsxs("div", {
                        className: "flex items-center gap-3 mb-4",
                        children: [o.jsx("button", {
                            onClick: () => h(v => v - 1),
                            className: "text-white/50 hover:text-white p-1 rounded hover:bg-white/10",
                            children: o.jsx(tl, {
                                size: 16
                            })
                        }), o.jsxs("span", {
                            className: "text-white font-bold text-base",
                            children: [u, "년"]
                        }), o.jsx("button", {
                            onClick: () => h(v => v + 1),
                            className: "text-white/50 hover:text-white p-1 rounded hover:bg-white/10",
                            children: o.jsx($n, {
                                size: 16
                            })
                        }), u !== a && o.jsx("button", {
                            onClick: () => h(a),
                            className: "text-blue-400 text-xs hover:text-blue-300 ml-1",
                            children: DDBTR("올해로")
                        })]
                    }), o.jsx("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5",
                        children: [{
                            label: "입금 합계",
                            val: p.income,
                            cls: "text-red-300"
                        }, {
                            label: "출금 합계",
                            val: p.expense,
                            cls: "text-blue-300"
                        }, {
                            label: "대출 납입",
                            val: p.loanPay,
                            cls: "text-amber-300"
                        }, {
                            label: "순수지",
                            val: p.net,
                            cls: p.net >= 0 ? "text-green-300" : "text-red-300"
                        }].map(({
                            label: v,
                            val: g,
                            cls: _
                        }) => o.jsxs("div", {
                            className: "bg-white/5 rounded-xl px-3 py-2.5 text-center",
                            children: [o.jsx("div", {
                                className: "text-white/40 text-[10px] mb-0.5",
                                children: v
                            }), o.jsx("div", {
                                className: `font-bold text-sm ${_}`,
                                children: g !== 0 ? (g < 0 ? "-" : "") + ut(g) : "-"
                            })]
                        }, v))
                    }), o.jsx("div", {
                        className: "overflow-x-auto",
                        children: o.jsxs("table", {
                            className: "w-full text-xs border-separate border-spacing-y-0",
                            children: [o.jsx("thead", {
                                children: o.jsxs("tr", {
                                    children: [o.jsx("th", {
                                        className: y + " w-12",
                                        children: DDBTR("월")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-red-300/70",
                                        children: DDBTR("입금")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-blue-300/70",
                                        children: DDBTR("출금")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-amber-300/70",
                                        children: DDBTR("대출납입")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-emerald-300/70",
                                        children: DDBTR("적금납입")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-green-300/70",
                                        children: DDBTR("순수지")
                                    })]
                                })
                            }), o.jsx("tbody", {
                                children: x.map(({
                                    month: v,
                                    ym: g,
                                    income: _,
                                    expense: k,
                                    loanPay: E,
                                    svPay: b,
                                    net: T
                                }) => {
                                    const A = u === a && v === i;
                                    return o.jsxs("tr", {
                                        className: "border-b border-white/5 hover:bg-white/5 transition-colors " + (A ? "bg-blue-500/10 ring-1 ring-inset ring-blue-400/20" : ""),
                                        children: [o.jsxs("td", {
                                            className: "py-2 text-white/70 font-medium",
                                            children: [v, "월", A ? " ◀" : ""]
                                        }), o.jsx("td", {
                                            className: w + " text-red-300",
                                            children: _ > 0 ? ut(_) : o.jsx("span", {
                                                className: "text-white/20",
                                                children: "-"
                                            })
                                        }), o.jsx("td", {
                                            className: w + " text-blue-300",
                                            children: k > 0 ? ut(k) : o.jsx("span", {
                                                className: "text-white/20",
                                                children: "-"
                                            })
                                        }), o.jsx("td", {
                                            className: w + " text-amber-300",
                                            children: E > 0 ? ut(E) : o.jsx("span", {
                                                className: "text-white/20",
                                                children: "-"
                                            })
                                        }), o.jsx("td", {
                                            className: w + " text-emerald-300",
                                            children: b > 0 ? ut(b) : o.jsx("span", {
                                                className: "text-white/20",
                                                children: "-"
                                            })
                                        }), o.jsx("td", {
                                            className: w + " font-bold " + (T > 0 ? "text-green-300" : T < 0 ? "text-red-300" : "text-white/20"),
                                            children: T !== 0 ? (T > 0 ? "+" : "-") + ut(T) : "-"
                                        })]
                                    }, g)
                                })
                            })]
                        })
                    })]
                }), l === "yearly" && o.jsxs("div", {
                    children: [o.jsx("h3", {
                        className: "text-white/40 text-xs mb-4 uppercase tracking-wide",
                        children: DDBTR("최근 6년 연별 요약")
                    }), o.jsx("div", {
                        className: "overflow-x-auto",
                        children: o.jsxs("table", {
                            className: "w-full text-xs",
                            children: [o.jsx("thead", {
                                children: o.jsxs("tr", {
                                    children: [o.jsx("th", {
                                        className: y + " w-16",
                                        children: DDBTR("연도")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-red-300/70",
                                        children: DDBTR("입금")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-blue-300/70",
                                        children: DDBTR("출금")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-amber-300/70",
                                        children: DDBTR("대출납입")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-emerald-300/70",
                                        children: DDBTR("적금납입")
                                    }), o.jsx("th", {
                                        className: y + " text-right text-green-300/70",
                                        children: DDBTR("순수지")
                                    })]
                                })
                            }), o.jsx("tbody", {
                                children: m.map(({
                                    year: v,
                                    income: g,
                                    expense: _,
                                    loanPay: k,
                                    svPay: E,
                                    net: b
                                }) => o.jsxs("tr", {
                                    className: "border-b border-white/5 hover:bg-white/5 " + (v === a ? "bg-blue-500/8" : ""),
                                    children: [o.jsxs("td", {
                                        className: "py-2.5 text-white font-bold",
                                        children: [v, v === a ? o.jsx("span", {
                                            className: "text-blue-400 text-[10px] ml-1",
                                            children: DDBTR("현재")
                                        }) : ""]
                                    }), o.jsx("td", {
                                        className: w + " text-red-300",
                                        children: g > 0 ? ut(g) : o.jsx("span", {
                                            className: "text-white/20",
                                            children: "-"
                                        })
                                    }), o.jsx("td", {
                                        className: w + " text-blue-300",
                                        children: _ > 0 ? ut(_) : o.jsx("span", {
                                            className: "text-white/20",
                                            children: "-"
                                        })
                                    }), o.jsx("td", {
                                        className: w + " text-amber-300",
                                        children: k > 0 ? ut(k) : o.jsx("span", {
                                            className: "text-white/20",
                                            children: "-"
                                        })
                                    }), o.jsx("td", {
                                        className: w + " text-emerald-300",
                                        children: E > 0 ? ut(E) : o.jsx("span", {
                                            className: "text-white/20",
                                            children: "-"
                                        })
                                    }), o.jsx("td", {
                                        className: w + " font-bold " + (b > 0 ? "text-green-300" : b < 0 ? "text-red-300" : "text-white/20"),
                                        children: b !== 0 ? (b > 0 ? "+" : "-") + ut(b) : "-"
                                    })]
                                }, v))
                            })]
                        })
                    })]
                }), l === "loans" && o.jsxs("div", {
                    className: "flex flex-col gap-4",
                    children: [n.length === 0 && s.length === 0 && o.jsx("p", {
                        className: "text-white/30 text-center py-12 text-sm",
                        children: DDBTR("등록된 대출 / 적금·펀드가 없습니다")
                    }), n.map(v => {
                        const g = da(v),
                            _ = d === v.id,
                            k = [...v.rateHistory].sort((T, A) => T.fromDate.localeCompare(A.fromDate)),
                            E = g.reduce((T, A) => T + A.interest, 0),
                            b = g.filter(T => T.month <= `${a}-${String(i).padStart(2,"0")}`).length;
                        return o.jsxs("div", {
                            className: "bg-white/5 rounded-2xl overflow-hidden border border-white/5",
                            children: [o.jsxs("button", {
                                className: "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors",
                                onClick: () => f(_ ? null : v.id),
                                children: [o.jsx("span", {
                                    className: "text-2xl",
                                    children: "🏦"
                                }), o.jsxs("div", {
                                    className: "flex-1 text-left",
                                    children: [o.jsx("div", {
                                        className: "text-white font-bold",
                                        children: ddbTT(v.title)
                                    }), o.jsxs("div", {
                                        className: "text-white/40 text-xs mt-0.5",
                                        children: [ut(v.principal), "원 · ", v.termMonths, "개월 · ", v.startDate.slice(0, 7), " 시작"]
                                    })]
                                }), o.jsxs("div", {
                                    className: "text-right mr-2",
                                    children: [o.jsxs("div", {
                                        className: "text-amber-300 font-bold",
                                        children: [us(v.rateHistory, `${a}-${String(i).padStart(2,"0")}`), "%"]
                                    }), o.jsx("div", {
                                        className: "text-white/30 text-[10px]",
                                        children: DDBTR("현재 금리")
                                    })]
                                }), _ ? o.jsx(Si, {
                                    size: 14,
                                    className: "text-white/30"
                                }) : o.jsx($n, {
                                    size: 14,
                                    className: "text-white/30"
                                })]
                            }), _ && o.jsxs("div", {
                                className: "px-4 pb-4 flex flex-col gap-5 border-t border-white/5 pt-4",
                                children: [o.jsx("div", {
                                    className: "grid grid-cols-3 gap-2",
                                    children: [{
                                        label: "진행",
                                        val: `${b}/${v.termMonths}개월`
                                    }, {
                                        label: "잔여",
                                        val: `${v.termMonths-b}개월`
                                    }, {
                                        label: "예상 총이자",
                                        val: ut(E) + "원"
                                    }].map(({
                                        label: T,
                                        val: A
                                    }) => o.jsxs("div", {
                                        className: "bg-white/5 rounded-xl px-3 py-2 text-center",
                                        children: [o.jsx("div", {
                                            className: "text-white/40 text-[10px] mb-0.5",
                                            children: T
                                        }), o.jsx("div", {
                                            className: "text-white text-xs font-bold",
                                            children: A
                                        })]
                                    }, T))
                                }), o.jsxs("div", {
                                    children: [o.jsx("h4", {
                                        className: "text-white/40 text-[10px] uppercase tracking-wide mb-2",
                                        children: DDBTR("금리 변경 이력")
                                    }), o.jsx("div", {
                                        className: "flex flex-col gap-1.5",
                                        children: k.map((T, A) => {
                                            const H = k[A + 1],
                                                F = !H || H.fromDate > `${a}-${String(i).padStart(2,"0")}`;
                                            return o.jsxs("div", {
                                                className: "flex items-center gap-3 rounded-xl px-3 py-2 " + (F ? "bg-amber-400/10 border border-amber-400/20" : "bg-white/5"),
                                                children: [o.jsx("div", {
                                                    className: "w-2 h-2 rounded-full flex-shrink-0 " + (F ? "bg-amber-400" : "bg-white/30")
                                                }), o.jsx("span", {
                                                    className: "text-white/60 text-xs",
                                                    children: T.fromDate
                                                }), o.jsxs("span", {
                                                    className: "font-bold text-sm " + (F ? "text-amber-300" : "text-white/60"),
                                                    children: [T.rate, "%"]
                                                }), H ? o.jsxs("span", {
                                                    className: "text-white/25 text-[10px] ml-auto",
                                                    children: ["~ ", H.fromDate, " 전까지"]
                                                }) : o.jsx("span", {
                                                    className: "text-amber-400/60 text-[10px] ml-auto font-medium",
                                                    children: DDBTR("현재 적용중")
                                                })]
                                            }, A)
                                        })
                                    }), k.length === 0 && o.jsx("p", {
                                        className: "text-white/30 text-xs",
                                        children: DDBTR("금리 이력 없음")
                                    })]
                                }), o.jsxs("div", {
                                    children: [o.jsxs("h4", {
                                        className: "text-white/40 text-[10px] uppercase tracking-wide mb-2",
                                        children: ["납입 스케줄 (", g.length, "개월)"]
                                    }), o.jsx("div", {
                                        className: "max-h-56 overflow-y-auto thin-scroll",
                                        children: o.jsxs("table", {
                                            className: "w-full text-xs",
                                            children: [o.jsx("thead", {
                                                className: "sticky top-0 bg-gray-900",
                                                children: o.jsxs("tr", {
                                                    className: "text-white/30",
                                                    children: [o.jsx("th", {
                                                        className: "py-1 text-left font-normal",
                                                        children: DDBTR("월")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal",
                                                        children: DDBTR("납입금")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal text-blue-300/60",
                                                        children: DDBTR("원금")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal text-red-300/60",
                                                        children: DDBTR("이자")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal",
                                                        children: DDBTR("잔액")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal text-amber-300/60",
                                                        children: DDBTR("금리")
                                                    })]
                                                })
                                            }), o.jsx("tbody", {
                                                children: g.map((T, A) => {
                                                    const H = T.month <= `${a}-${String(i).padStart(2,"0")}`,
                                                        F = A > 0 && T.rate !== g[A - 1].rate;
                                                    return o.jsxs("tr", {
                                                        className: "border-b border-white/5 " + (F ? "border-t-2 border-t-amber-400/40 " : "") + (H ? "opacity-50" : ""),
                                                        children: [o.jsx("td", {
                                                            className: "py-1 text-white/70",
                                                            children: T.month
                                                        }), o.jsx("td", {
                                                            className: "py-1 text-right text-white",
                                                            children: ut(T.payment)
                                                        }), o.jsx("td", {
                                                            className: "py-1 text-right text-blue-300",
                                                            children: ut(T.principal)
                                                        }), o.jsx("td", {
                                                            className: "py-1 text-right text-red-300",
                                                            children: ut(T.interest)
                                                        }), o.jsx("td", {
                                                            className: "py-1 text-right text-white/50",
                                                            children: ut(T.balance)
                                                        }), o.jsxs("td", {
                                                            className: "py-1 text-right font-bold " + (F ? "text-amber-300" : "text-amber-300/50"),
                                                            children: [T.rate, "%"]
                                                        })]
                                                    }, T.month)
                                                })
                                            })]
                                        })
                                    })]
                                })]
                            })]
                        }, v.id)
                    }), s.length > 0 && o.jsxs("div", {
                        children: [o.jsx("h3", {
                            className: "text-white/40 text-xs uppercase tracking-wide mb-3",
                            children: DDBTR("적금 · 펀드")
                        }), s.map(v => {
                            var T;
                            const g = bo(v),
                                _ = g.reduce((A, H) => A + H.deposit, 0),
                                k = g.reduce((A, H) => A + H.interest, 0),
                                E = ((T = g[g.length - 1]) == null ? void 0 : T.accumulated) ?? 0,
                                b = d === v.id;
                            return o.jsxs("div", {
                                className: "bg-white/5 rounded-2xl border border-white/5 overflow-hidden mb-2",
                                children: [o.jsxs("button", {
                                    className: "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5",
                                    onClick: () => f(b ? null : v.id),
                                    children: [o.jsx("span", {
                                        className: "text-2xl",
                                        children: v.subtype === "savings" ? "📈" : "💹"
                                    }), o.jsxs("div", {
                                        className: "flex-1 text-left",
                                        children: [o.jsx("div", {
                                            className: "text-white font-bold",
                                            children: ddbTT(v.title)
                                        }), o.jsxs("div", {
                                            className: "text-white/40 text-xs mt-0.5",
                                            children: [ut(v.monthlyAmount), "원/월 × ", v.termMonths, "개월"]
                                        })]
                                    }), o.jsxs("div", {
                                        className: "text-right mr-2",
                                        children: [o.jsxs("div", {
                                            className: "text-emerald-300 font-bold",
                                            children: [ut(E), "원"]
                                        }), o.jsx("div", {
                                            className: "text-white/30 text-[10px]",
                                            children: DDBTR("만기 수령액")
                                        })]
                                    }), b ? o.jsx(Si, {
                                        size: 14,
                                        className: "text-white/30"
                                    }) : o.jsx($n, {
                                        size: 14,
                                        className: "text-white/30"
                                    })]
                                }), b && o.jsxs("div", {
                                    className: "px-4 pb-4 border-t border-white/5 pt-3",
                                    children: [o.jsx("div", {
                                        className: "grid grid-cols-3 gap-2 mb-3",
                                        children: [{
                                            label: "총 납입",
                                            val: ut(_) + "원"
                                        }, {
                                            label: "이자 합계",
                                            val: ut(k) + "원"
                                        }, {
                                            label: "만기수령",
                                            val: ut(E) + "원"
                                        }].map(({
                                            label: A,
                                            val: H
                                        }) => o.jsxs("div", {
                                            className: "bg-white/5 rounded-xl px-2 py-2 text-center",
                                            children: [o.jsx("div", {
                                                className: "text-white/40 text-[10px] mb-0.5",
                                                children: A
                                            }), o.jsx("div", {
                                                className: "text-emerald-300 text-xs font-bold",
                                                children: H
                                            })]
                                        }, A))
                                    }), o.jsx("div", {
                                        className: "max-h-44 overflow-y-auto thin-scroll",
                                        children: o.jsxs("table", {
                                            className: "w-full text-xs",
                                            children: [o.jsx("thead", {
                                                className: "sticky top-0 bg-gray-900",
                                                children: o.jsxs("tr", {
                                                    className: "text-white/30",
                                                    children: [o.jsx("th", {
                                                        className: "py-1 text-left font-normal",
                                                        children: DDBTR("월")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal",
                                                        children: DDBTR("납입")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal text-emerald-300/60",
                                                        children: DDBTR("이자")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal",
                                                        children: DDBTR("누적액")
                                                    }), o.jsx("th", {
                                                        className: "py-1 text-right font-normal text-amber-300/60",
                                                        children: DDBTR("금리")
                                                    })]
                                                })
                                            }), o.jsx("tbody", {
                                                children: g.map(A => o.jsxs("tr", {
                                                    className: "border-b border-white/5",
                                                    children: [o.jsx("td", {
                                                        className: "py-1 text-white/60",
                                                        children: A.month
                                                    }), o.jsx("td", {
                                                        className: "py-1 text-right text-white/80",
                                                        children: ut(A.deposit)
                                                    }), o.jsx("td", {
                                                        className: "py-1 text-right text-emerald-300",
                                                        children: ut(A.interest)
                                                    }), o.jsx("td", {
                                                        className: "py-1 text-right text-white",
                                                        children: ut(A.accumulated)
                                                    }), o.jsxs("td", {
                                                        className: "py-1 text-right text-amber-300/60",
                                                        children: [A.rate, "%"]
                                                    })]
                                                }, A.month))
                                            })]
                                        })
                                    })]
                                })]
                            }, v.id)
                        })]
                    })]
                }), l === "bank" && o.jsx(d4, {
                    events: r
                })]
            }), o.jsx("div", {
                className: "px-4 pb-4 flex-shrink-0",
                children: o.jsx("button", {
                    onClick: e,
                    className: "w-full py-2 rounded-xl bg-white/10 text-white/70 text-sm hover:bg-white/20",
                    children: DDBTR("닫기")
                })
            })]
        })
    })
}
const h4 = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500",
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500"
};

function d4({
    events: e
}) {
    var N;
    const {
        state: t,
        dispatch: r
    } = vt(), n = t.bankAliases ?? {}, s = e.filter(V => V.bankTx), [a, i] = O.useState(!0), [l, c] = O.useState(""), [u, h] = O.useState(""), [d, f] = O.useState(!1), [x, p] = O.useState(!1), [m, y] = O.useState(null), [w, v] = O.useState({
        displayName: "",
        category: "기타",
        color: "blue"
    }), [g, _] = O.useState(null), [k, E] = O.useState(null), b = O.useMemo(() => {
        const V = new Map;
        return s.forEach(ae => {
            const ve = ae.date.slice(0, 7);
            V.has(ve) || V.set(ve, []), V.get(ve).push(ae)
        }), Array.from(V.entries()).sort((ae, ve) => ve[0].localeCompare(ae[0]))
    }, [s]), T = O.useMemo(() => {
        const V = new Map;
        return s.forEach(ae => {
            const ve = ae.bankTx.importedAt;
            V.has(ve) || V.set(ve, []), V.get(ve).push(ae)
        }), Array.from(V.entries()).sort((ae, ve) => ve[0].localeCompare(ae[0]))
    }, [s]), A = b.map(([V]) => V), H = O.useMemo(() => [...new Set(A.map(V => V.slice(0, 4)))].sort((V, ae) => ae.localeCompare(V)), [A]), F = u || H[0] || "", R = A.filter(V => V.startsWith(F)), K = l && l.startsWith(F) ? l : "", se = K || `${F}년 전체`, z = K ? ((N = b.find(([V]) => V === K)) == null ? void 0 : N[1]) ?? [] : s.filter(V => V.date.startsWith(F)), G = z.filter(V => {
        var ae;
        return !((ae = V.bankTx) != null && ae.isEtc)
    }), re = z.filter(V => {
        var ae;
        return (ae = V.bankTx) == null ? void 0 : ae.isEtc
    }), Y = z.filter(V => (V.amount ?? 0) > 0).reduce((V, ae) => V + (ae.amount ?? 0), 0), M = z.filter(V => (V.amount ?? 0) < 0).reduce((V, ae) => V + Math.abs(ae.amount ?? 0), 0), X = ["#6366f1", "#f43f5e", "#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#8b5cf6", "#14b8a6", "#f97316", "#a855f7"], ce = "#6b7280", j = O.useMemo(() => {
        const V = new Map;
        z.filter(xe => (xe.amount ?? 0) < 0).forEach(xe => {
            var oe, fe;
            const Me = ((oe = xe.bankTx) == null ? void 0 : oe.originalMemo) ?? xe.title,
                Fe = ((fe = n[Me]) == null ? void 0 : fe.displayName) ?? Me;
            V.has(Fe) || V.set(Fe, {
                events: [],
                total: 0
            });
            const me = V.get(Fe);
            me.events.push(xe), me.total += Math.abs(xe.amount ?? 0)
        });
        const ae = [],
            ve = [];
        V.forEach(({
            events: xe,
            total: Me
        }, Fe) => {
            xe.length >= 2 ? ae.push({
                name: Fe,
                events: xe,
                total: Me,
                color: ""
            }) : xe.forEach(me => ve.push({
                name: Fe,
                amount: Math.abs(me.amount ?? 0)
            }))
        }), ae.sort((xe, Me) => Me.total - xe.total), ae.forEach((xe, Me) => {
            xe.color = X[Me % X.length]
        });
        const Te = ve.reduce((xe, Me) => xe + Me.amount, 0);
        return {
            named: ae,
            etcList: ve,
            etcTotal: Te
        }
    }, [z, n]), q = j.named.reduce((V, ae) => V + ae.total, 0) + j.etcTotal, U = O.useMemo(() => {
        if (!g) return [];
        if (g === "기타") return j.etcList.sort((ae, ve) => ve.amount - ae.amount).map(ae => ({
            name: ae.name,
            amount: ae.amount
        }));
        const V = j.named.find(ae => ae.name === g);
        return V ? [...V.events].sort((ae, ve) => Math.abs(ve.amount ?? 0) - Math.abs(ae.amount ?? 0)).map(ae => ({
            name: V.name,
            amount: Math.abs(ae.amount ?? 0)
        })) : []
    }, [g, j]), B = V => Math.abs(V).toLocaleString(), W = V => V >= 0 ? `+${V.toLocaleString()}` : `-${Math.abs(V).toLocaleString()}`, te = {
        toss: DDBTR("토스뱅크"),
        kb: "KB국민",
        shinhan: "신한",
        hana: "하나",
        nh: "NH농협",
        unknown: "은행"
    };

    function he(V) {
        const ae = n[V];
        v({
            displayName: (ae == null ? void 0 : ae.displayName) ?? V,
            category: (ae == null ? void 0 : ae.category) ?? "기타",
            color: (ae == null ? void 0 : ae.color) ?? "blue"
        }), y(V)
    }

    function ne() {
        m && (r({
            type: "BULK_UPDATE_BANK_ALIAS",
            key: m,
            alias: {
                displayName: w.displayName,
                category: w.category,
                color: w.color
            }
        }), y(null))
    }

    function ue() {
        let xe = -Math.PI / 2;
        return [...j.named.map(Fe => ({
            key: Fe.name,
            amt: Fe.total,
            color: Fe.color
        })), ...j.etcTotal > 0 ? [{
            key: "기타",
            amt: j.etcTotal,
            color: ce
        }] : []].map(Fe => {
            const me = q > 0 ? Fe.amt / q : 0,
                oe = xe,
                fe = xe + me * 2 * Math.PI,
                Ne = (oe + fe) / 2;
            xe = fe;
            const We = Math.cos(oe),
                Je = Math.sin(oe),
                Gt = Math.cos(fe),
                nr = Math.sin(fe),
                nt = me > .5 ? 1 : 0,
                mr = me >= .999 ? "M 132 80 A 52 52 0 1 1 28 80 A 52 52 0 1 1 132 80 L 108 80 A 28 28 0 1 0 52 80 A 28 28 0 1 0 108 80 Z" : [`M ${80+52*We} ${80+52*Je}`, `A 52 52 0 ${nt} 1 ${80+52*Gt} ${80+52*nr}`, `L ${80+28*Gt} ${80+28*nr}`, `A 28 28 0 ${nt} 0 ${80+28*We} ${80+28*Je}`, "Z"].join(" "),
                Le = Math.round(me * 100),
                et = Le < 5 ? 20 : 11,
                Kt = Le < 5 ? 27 : 16,
                tt = 80 + 52 * Math.cos(Ne),
                It = 80 + 52 * Math.sin(Ne),
                xs = 80 + (52 + et) * Math.cos(Ne),
                Ra = 80 + (52 + et) * Math.sin(Ne),
                qs = 80 + (52 + Kt) * Math.cos(Ne),
                Oa = 80 + (52 + Kt) * Math.sin(Ne);
            return {
                path: mr,
                color: Fe.color,
                key: Fe.key,
                amt: Fe.amt,
                pct: Le,
                mid: Ne,
                lx1: tt,
                ly1: It,
                lx2: xs,
                ly2: Ra,
                tx: qs,
                ty: Oa
            }
        })
    }
    const de = ue();
    return s.length === 0 ? o.jsxs("div", {
        className: "flex flex-col items-center justify-center py-16 text-center gap-3",
        children: [o.jsx(Of, {
            size: 36,
            className: "text-white/20"
        }), o.jsx("p", {
            className: "text-white/40 text-sm",
            children: DDBTR("가져온 은행 거래내역이 없습니다.")
        }), o.jsx("p", {
            className: "text-white/25 text-xs",
            children: '상단 "계좌 가져오기" 버튼으로 엑셀 파일을 불러오세요.'
        })]
    }) : o.jsxs("div", {
        className: "space-y-3",
        children: [o.jsxs("div", {
            className: "bg-white/5 rounded-lg overflow-hidden",
            children: [o.jsxs("button", {
                onClick: () => f(V => !V),
                className: "w-full flex items-center justify-between px-3 py-2 text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors",
                children: [o.jsxs("span", {
                    children: [DDBTR("📦 가져오기 기록 ("), T.length, "회)"]
                }), d ? o.jsx(Si, {
                    size: 12
                }) : o.jsx($n, {
                    size: 12
                })]
            }), d && o.jsx("div", {
                className: "border-t border-white/10",
                children: T.map(([V, ae]) => o.jsxs("div", {
                    className: "flex items-center justify-between px-3 py-2 border-b border-white/5 last:border-0 text-xs",
                    children: [o.jsxs("div", {
                        children: [o.jsx("span", {
                            className: "text-white/70",
                            children: new Date(V).toLocaleString("ko-KR", {
                                dateStyle: "short",
                                timeStyle: "short"
                            })
                        }), o.jsxs("span", {
                            className: "text-white/30 ml-2",
                            children: [ae.length, DDBTR("건")]
                        })]
                    }), o.jsx("button", {
                        onClick: () => {
                            confirm(`${new Date(V).toLocaleString("ko-KR",{dateStyle:"short",timeStyle:"short"})} 가져온 ${ae.length}건을 모두 삭제할까요?`) && r({
                                type: "DELETE_BANK_BATCH",
                                batchId: V
                            })
                        },
                        className: "text-red-400/70 hover:text-red-400 text-[10px] px-2 py-0.5 rounded border border-red-400/30 hover:border-red-400/60 transition-colors",
                        children: DDBTR("삭제")
                    })]
                }, V))
            })]
        }), H.length > 1 && o.jsx("div", {
            className: "flex items-center gap-1 flex-wrap",
            children: H.map(V => o.jsxs("button", {
                onClick: () => {
                    h(V === F ? "" : V), c("")
                },
                className: `px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors
                ${V===F?"bg-emerald-600 text-white":"bg-white/10 text-white/40 hover:bg-white/20"}`,
                children: [V, "년"]
            }, V))
        }), o.jsxs("div", {
            className: "flex items-center gap-1 flex-wrap",
            children: [o.jsx("button", {
                onClick: () => c(""),
                className: `px-2.5 py-1 rounded-full text-xs font-medium transition-colors
            ${K?"bg-white/10 text-white/40 hover:bg-white/20":"bg-blue-600 text-white"}`,
                children: DDBTR("전체")
            }), R.map(V => o.jsxs("button", {
                onClick: () => c(V === K ? "" : V),
                className: `px-2.5 py-1 rounded-full text-xs font-medium transition-colors
              ${V===K?"bg-blue-500 text-white":"bg-white/10 text-white/50 hover:bg-white/20"}`,
                children: [V.slice(5), "월"]
            }, V))]
        }), K && o.jsxs("div", {
            className: "flex gap-3 text-xs",
            children: [o.jsxs("div", {
                className: "bg-blue-500/10 rounded-lg px-3 py-2 flex-1 text-center",
                children: [o.jsxs("div", {
                    className: "text-blue-400 font-bold",
                    children: ["+", B(Y)]
                }), o.jsx("div", {
                    className: "text-white/40",
                    children: DDBTR("입금")
                })]
            }), o.jsxs("div", {
                className: "bg-red-500/10 rounded-lg px-3 py-2 flex-1 text-center",
                children: [o.jsxs("div", {
                    className: "text-red-400 font-bold",
                    children: ["-", B(M)]
                }), o.jsx("div", {
                    className: "text-white/40",
                    children: DDBTR("출금")
                })]
            }), o.jsxs("div", {
                className: `rounded-lg px-3 py-2 flex-1 text-center ${Y-M>=0?"bg-green-500/10":"bg-red-500/10"}`,
                children: [o.jsx("div", {
                    className: `font-bold ${Y-M>=0?"text-green-400":"text-red-400"}`,
                    children: W(Y - M)
                }), o.jsx("div", {
                    className: "text-white/40",
                    children: DDBTR("순수지")
                })]
            })]
        }), q > 0 && de.length > 0 && o.jsxs("div", {
            className: "bg-white/5 rounded-xl p-4",
            children: [o.jsxs("div", {
                className: "flex items-center justify-between mb-3",
                children: [o.jsxs("p", {
                    className: "text-[11px] text-white/50",
                    children: ["📊 ", se, " 출금 분석"]
                }), o.jsx("button", {
                    onClick: () => p(V => !V),
                    className: `text-[10px] px-2.5 py-0.5 rounded-full transition-colors font-medium
                ${x?"bg-blue-500/70 text-white":"bg-white/10 text-white/40 hover:bg-white/20"}`,
                    children: DDBTR("% 표시")
                })]
            }), o.jsx("div", {
                className: "flex justify-center mb-4",
                children: o.jsxs("svg", {
                    width: "200",
                    height: "200",
                    viewBox: "0 0 160 160",
                    className: "cursor-pointer",
                    children: [de.map((V, ae) => o.jsx("path", {
                        d: V.path,
                        fill: V.color,
                        opacity: g === null ? .88 : g === V.key ? 1 : .3,
                        className: "transition-opacity",
                        onMouseEnter: ve => {
                            _(V.key), E({
                                x: ve.clientX,
                                y: ve.clientY
                            })
                        },
                        onMouseMove: ve => E({
                            x: ve.clientX,
                            y: ve.clientY
                        }),
                        onMouseLeave: () => {
                            _(null), E(null)
                        },
                        onClick: () => {
                            var Te;
                            if (V.key === "기타") return;
                            const ve = j.named.find(xe => xe.name === V.key);
                            ve && ve.events[0] && he(((Te = ve.events[0].bankTx) == null ? void 0 : Te.originalMemo) ?? ve.events[0].title)
                        }
                    }, ae)), x && de.map((V, ae) => o.jsxs("g", {
                        pointerEvents: "none",
                        children: [o.jsx("line", {
                            x1: V.lx1,
                            y1: V.ly1,
                            x2: V.lx2,
                            y2: V.ly2,
                            stroke: V.color,
                            strokeWidth: "0.8",
                            opacity: "0.7"
                        }), o.jsxs("text", {
                            x: V.tx,
                            y: V.ty,
                            fontSize: "7",
                            fill: V.color,
                            opacity: "0.9",
                            textAnchor: Math.cos(V.mid) > 0 ? "start" : "end",
                            dominantBaseline: "middle",
                            children: [V.pct, "%"]
                        })]
                    }, `lbl-${ae}`)), o.jsx("text", {
                        x: "80",
                        y: "75",
                        textAnchor: "middle",
                        fontSize: "8",
                        fill: "rgba(255,255,255,0.35)",
                        children: DDBTR("출금 합계")
                    }), o.jsx("text", {
                        x: "80",
                        y: "90",
                        textAnchor: "middle",
                        fontSize: "10",
                        fill: "rgba(255,255,255,0.75)",
                        fontWeight: "bold",
                        children: q >= 1e4 ? `${(q/1e4).toFixed(0)}만원` : `${q.toLocaleString()}원`
                    })]
                })
            }), o.jsx("div", {
                className: "space-y-1",
                children: de.map(V => o.jsxs("div", {
                    className: `flex items-center gap-2 text-xs rounded-lg px-2 py-1.5 cursor-default transition-colors
                  ${g===V.key?"bg-white/15":"hover:bg-white/8"}`,
                    onMouseEnter: ae => {
                        _(V.key), E({
                            x: ae.clientX,
                            y: ae.clientY
                        })
                    },
                    onMouseMove: ae => E({
                        x: ae.clientX,
                        y: ae.clientY
                    }),
                    onMouseLeave: () => {
                        _(null), E(null)
                    },
                    children: [o.jsx("div", {
                        className: "w-3 h-3 rounded-full flex-shrink-0",
                        style: {
                            backgroundColor: V.color
                        }
                    }), o.jsx("span", {
                        className: "text-white/80 flex-1 truncate",
                        children: V.key
                    }), o.jsxs("span", {
                        className: "text-white/55 tabular-nums flex-shrink-0",
                        children: [V.amt.toLocaleString(), "원"]
                    })]
                }, V.key))
            })]
        }), k && g && U.length > 0 && Rr.createPortal(o.jsxs("div", {
            className: "fixed z-[9999] bg-gray-900/95 border border-white/20 rounded-xl p-3 shadow-2xl pointer-events-none backdrop-blur-sm",
            style: {
                left: Math.min(k.x + 14, window.innerWidth - 254),
                top: Math.max(8, Math.min(k.y - 20, window.innerHeight - 220)),
                maxWidth: 240
            },
            children: [o.jsxs("p", {
                className: "text-[10px] text-white/40 mb-1.5 font-medium",
                children: [g, " · ", U.length, DDBTR("건")]
            }), o.jsx("div", {
                className: "space-y-0.5 max-h-40 overflow-y-auto",
                style: {
                    scrollbarWidth: "thin"
                },
                children: U.map((V, ae) => o.jsxs("div", {
                    className: "flex justify-between items-center text-[11px] gap-3",
                    children: [o.jsx("span", {
                        className: "text-white/70 truncate",
                        children: V.name
                    }), o.jsxs("span", {
                        className: "text-red-300 tabular-nums flex-shrink-0",
                        children: ["-", V.amount.toLocaleString()]
                    })]
                }, ae))
            }), o.jsxs("div", {
                className: "flex justify-between text-[10px] border-t border-white/10 mt-2 pt-1.5",
                children: [o.jsx("span", {
                    className: "text-white/30",
                    children: DDBTR("합계")
                }), o.jsxs("span", {
                    className: "text-red-200 font-bold tabular-nums",
                    children: ["-", U.reduce((V, ae) => V + ae.amount, 0).toLocaleString(), "원"]
                })]
            })]
        }), document.body), G.length > 0 && o.jsxs("div", {
            children: [o.jsxs("p", {
                className: "text-xs font-medium text-white/50 mb-1.5",
                children: [DDBTR("🔄 반복거래 ("), G.length, DDBTR("건)")]
            }), o.jsx(ym, {
                events: G,
                sourceLabel: te,
                bankAliases: n,
                onEditAlias: he
            })]
        }), re.length > 0 && o.jsxs("div", {
            children: [o.jsxs("button", {
                onClick: () => i(V => !V),
                className: "flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white/80 transition-colors mb-1.5",
                children: [a ? o.jsx(Si, {
                    size: 12
                }) : o.jsx($n, {
                    size: 12
                }), DDBTR("🥕 당근거래 — 1회성 ("), re.length, DDBTR("건)")]
            }), a && o.jsx(ym, {
                events: re,
                sourceLabel: te,
                bankAliases: n,
                onEditAlias: he
            })]
        }), m !== null && o.jsx("div", {
            className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4",
            onClick: V => V.target === V.currentTarget && y(null),
            children: o.jsxs("div", {
                className: "bg-gray-900 rounded-xl border border-white/20 p-5 w-72 space-y-3 shadow-2xl",
                children: [o.jsx("p", {
                    className: "text-white font-semibold text-sm",
                    children: DDBTR("거래 분류 수정")
                }), o.jsxs("p", {
                    className: "text-white/30 text-[10px] truncate",
                    children: [DDBTR("원본 적요: "), m]
                }), o.jsxs("div", {
                    className: "space-y-1",
                    children: [o.jsx("label", {
                        className: "text-[10px] text-white/40",
                        children: DDBTR("표시 이름")
                    }), o.jsx("input", {
                        type: "text",
                        value: w.displayName,
                        onChange: V => v(ae => ({
                            ...ae,
                            displayName: V.target.value
                        })),
                        className: "w-full bg-gray-800 border border-white/20 rounded px-3 py-1.5 text-sm text-white focus:border-blue-400 outline-none"
                    })]
                }), o.jsxs("div", {
                    className: "space-y-1",
                    children: [o.jsx("label", {
                        className: "text-[10px] text-white/40",
                        children: DDBTR("카테고리")
                    }), o.jsx("select", {
                        value: w.category,
                        onChange: V => v(ae => ({
                            ...ae,
                            category: V.target.value
                        })),
                        className: "w-full bg-gray-800 border border-white/20 rounded px-3 py-1.5 text-sm text-white",
                        children: kw.map(V => o.jsx("option", {
                            value: V,
                            style: {
                                backgroundColor: "#1e293b",
                                color: "white"
                            },
                            children: V
                        }, V))
                    })]
                }), o.jsxs("div", {
                    className: "space-y-1",
                    children: [o.jsx("label", {
                        className: "text-[10px] text-white/40",
                        children: DDBTR("달력 색상")
                    }), o.jsx("div", {
                        className: "flex gap-1.5",
                        children: ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"].map(V => o.jsx("button", {
                            onClick: () => v(ae => ({
                                ...ae,
                                color: V
                            })),
                            className: `w-6 h-6 rounded-full ${h4[V]} transition-transform
                      ${w.color===V?"ring-2 ring-white scale-110":"opacity-50 hover:opacity-90"}`
                        }, V))
                    })]
                }), o.jsx("p", {
                    className: "text-[10px] text-white/30",
                    children: DDBTR("저장하면 같은 원본 적요의 기존 이벤트도 모두 업데이트됩니다.")
                }), o.jsxs("div", {
                    className: "flex gap-2 justify-end pt-1",
                    children: [o.jsx("button", {
                        onClick: () => y(null),
                        className: "text-white/50 hover:text-white text-sm px-3 py-1.5 transition-colors",
                        children: DDBTR("취소")
                    }), o.jsx("button", {
                        onClick: ne,
                        className: "bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-1.5 rounded-lg transition-colors",
                        children: DDBTR("저장")
                    })]
                })]
            })
        })]
    })
}

function ym({
    events: e,
    sourceLabel: t,
    bankAliases: r,
    onEditAlias: n
}) {
    const s = [...e].sort((p, m) => p.date.localeCompare(m.date)),
        [a, i] = O.useState({
            date: 46,
            title: 170,
            cat: 46,
            amt: 90,
            src: 54
        }),
        l = O.useRef(null);

    function c(p, m) {
        p.preventDefault(), l.current = {
            col: m,
            startX: p.clientX,
            startW: a[m]
        };
        const y = v => {
                if (!l.current) return;
                const g = Math.max(32, l.current.startW + (v.clientX - l.current.startX));
                i(_ => ({
                    ..._,
                    [l.current.col]: g
                }))
            },
            w = () => {
                l.current = null, window.removeEventListener("mousemove", y), window.removeEventListener("mouseup", w)
            };
        window.addEventListener("mousemove", y), window.addEventListener("mouseup", w)
    }
    const u = {
            결제: "#6366f1",
            소비: "#f43f5e",
            이체: "#0ea5e9",
            수입: "#22c55e",
            저축: "#f59e0b",
            기타: "#6b7280"
        },
        h = Object.values(a).reduce((p, m) => p + m, 0),
        d = ["date", "title", "cat", "amt", "src"],
        f = {
            date: "날짜",
            title: DDBTR("내역"),
            cat: "분류",
            amt: "금액",
            src: "은행"
        },
        x = {
            date: "left",
            title: "left",
            cat: "left",
            amt: "right",
            src: "left"
        };
    return o.jsx("div", {
        className: "overflow-x-auto rounded-lg",
        style: {
            maxWidth: "100%"
        },
        children: o.jsxs("table", {
            className: "text-xs border-collapse",
            style: {
                width: h,
                tableLayout: "fixed"
            },
            children: [o.jsx("thead", {
                children: o.jsx("tr", {
                    className: "border-b border-white/10",
                    children: d.map(p => o.jsxs("th", {
                        className: "relative select-none py-1 text-white/30 font-normal",
                        style: {
                            width: a[p],
                            textAlign: x[p]
                        },
                        children: [f[p], o.jsx("div", {
                            className: "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-white/20 active:bg-blue-400/50",
                            onMouseDown: m => c(m, p)
                        })]
                    }, p))
                })
            }), o.jsx("tbody", {
                children: s.map(p => {
                    var _, k;
                    const m = ((_ = p.bankTx) == null ? void 0 : _.originalMemo) ?? p.title,
                        y = r[m],
                        w = (y == null ? void 0 : y.category) ?? "기타",
                        v = ((k = p.bankTx) == null ? void 0 : k.source) ?? "unknown",
                        g = p.amount ?? 0;
                    return o.jsxs("tr", {
                        className: "border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer",
                        onClick: () => n(m),
                        children: [o.jsx("td", {
                            className: "py-1 text-white/40 tabular-nums truncate",
                            style: {
                                width: a.date
                            },
                            children: p.date.slice(5).replace("-", "/")
                        }), o.jsx("td", {
                            className: "py-1 truncate",
                            style: {
                                width: a.title
                            },
                            children: o.jsx("span", {
                                className: "text-white/75",
                                children: ddbTT(p.title)
                            })
                        }), o.jsx("td", {
                            className: "py-1",
                            style: {
                                width: a.cat
                            },
                            children: o.jsx("span", {
                                className: "text-[10px] px-1 py-0.5 rounded",
                                style: {
                                    backgroundColor: (u[w] ?? "#6b7280") + "33",
                                    color: u[w] ?? "#9ca3af"
                                },
                                children: w
                            })
                        }), o.jsx("td", {
                            className: "py-1 text-right tabular-nums",
                            style: {
                                width: a.amt
                            },
                            children: o.jsxs("span", {
                                className: g >= 0 ? "text-teal-400" : "text-rose-400",
                                children: [g >= 0 ? "+" : "-", Math.abs(g).toLocaleString()]
                            })
                        }), o.jsx("td", {
                            className: "py-1 text-white/30 truncate pl-2",
                            style: {
                                width: a.src
                            },
                            children: t[v] ?? v
                        })]
                    }, p.id)
                })
            })]
        })
    })
}
const pO = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500",
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500"
};

function mO(e, t) {
    return t > 0 ? "blue" : "red"
}

function gO(e) {
    return e.replace(/\./g, "-").slice(0, 10)
}

function vO(e) {
    const t = e.join("|").toLowerCase();
    return t.includes("토스") ? "toss" : t.includes("kb") || t.includes("국민") ? "kb" : t.includes("신한") ? "shinhan" : t.includes("하나") ? "hana" : t.includes("농협") ? "nh" : "unknown"
}

function wO(e) {
    const t = r => String(r).padStart(2, "0");
    return `${e.getFullYear()}.${t(e.getMonth()+1)}.${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}:${t(e.getSeconds())}`
}

function Y0(e) {
    if (!e) return "";
    if (e instanceof Date) return wO(e);
    const t = String(e).trim();
    if (/^\d{4}\.\d{2}\.\d{2}/.test(t)) return t;
    const r = Number(t);
    if (!isNaN(r) && r > 4e4 && r < 6e4) try {
        const n = Gw.parse_date_code(r, {
            date1904: !1
        });
        if (n) {
            const s = a => String(a).padStart(2, "0");
            return `${n.y}.${s(n.m)}.${s(n.d)} ${s(n.H)}:${s(n.M)}:${s(n.S)}`
        }
    } catch {}
    return t
}

function X0({
    value: e,
    onChange: t,
    className: r
}) {
    const n = c => (c || "").replace(/\D/g, "").padStart(8, "0").slice(-8),
        s = c => `${c.slice(0,4)}-${c.slice(4,6)}-${c.slice(6,8)}`,
        a = c => c === "00000000" ? "" : s(c),
        i = n(e),
        l = c => {
            c.key >= "0" && c.key <= "9" ? (c.preventDefault(), t(a(i.slice(1) + c.key))) : c.key === "Backspace" ? (c.preventDefault(), t(e ? a("0" + i.slice(0, 7)) : "")) : c.key === "Delete" && (c.preventDefault(), t(""))
        };
    return o.jsx("input", {
        type: "text",
        value: e ? s(i) : "",
        placeholder: "YYYY-MM-DD",
        onChange: () => {},
        onKeyDown: l,
        className: r
    })
}

function x2(e) {
    const t = e.Sheets[e.SheetNames[0]],
        r = f2.sheet_to_json(t, {
            header: 1,
            defval: "",
            raw: !0
        });
    if (!r.length) return [];
    const n = d => String(d ?? "").replace(/[ 　​﻿]+/g, " ").trim();
    let s = {},
        a = -1;
    const i = (d, f) => f.some(x => d === x || d.includes(x));
    let l = !1;
    for (let d = 0; d < Math.min(20, r.length); d++) {
        const f = r[d].map(n);
        if (f.some(p => i(p, ["거래일시", "거래일", "날짜", "일시", "일자"])) && (l = f.some(p => i(p, ["보낸분", "받는분"])), f.forEach((p, m) => {
                i(p, ["거래일시", "거래일", "날짜", "일시", "일자"]) && s.datetime === void 0 && (s.datetime = m), l ? (i(p, ["보낸분", "받는분"]) && s.memo === void 0 && (s.memo = m), i(p, ["적요", "거래내역", "내역", "내용"]) && s.txType === void 0 && (s.txType = m), i(p, ["거래점", "거래기관", "기관"]) && s.institution === void 0 && (s.institution = m)) : (i(p, ["거래내역", "내역", "내용", "적요"]) && s.memo === void 0 && (s.memo = m), i(p, ["거래유형", "거래구분", "유형", "구분"]) && s.txType === void 0 && (s.txType = m), i(p, ["거래기관", "기관", "상대방"]) && s.institution === void 0 && (s.institution = m)), i(p, ["계좌번호", "계좌"]) && s.accountNo === void 0 && (s.accountNo = m), i(p, ["입금"]) && !i(p, ["잔액", "잔고"]) && s.deposit === void 0 && (s.deposit = m), i(p, ["출금"]) && !i(p, ["잔액", "잔고"]) && s.withdrawal === void 0 && (s.withdrawal = m), i(p, ["거래금액", "거래액"]) && s.amount === void 0 && (s.amount = m), i(p, ["잔액", "잔고", "거래후잔액"]) && s.balance === void 0 && (s.balance = m), p === "금액" && s.amount === void 0 && s.balance === void 0 && (s.amount = m), i(p, ["메모", "비고"]) && s.note === void 0 && (s.note = m)
            }), s.datetime !== void 0)) {
            a = d;
            break
        }
    }
    const c = a >= 0 ? a + 1 : 9,
        u = s.datetime === void 0,
        h = [];
    for (let d = c; d < r.length; d++) {
        const f = r[d];
        let x = "";
        if (!u && s.datetime !== void 0 ? x = Y0(f[s.datetime]) : (x = Y0(f[1]), (!x || x.length < 8) && (x = Y0(f[0]))), !x || x.length < 8) continue;
        let p = 0;
        if (s.deposit !== void 0 || s.withdrawal !== void 0) {
            const k = Number(f[s.deposit ?? -1]) || 0,
                E = Number(f[s.withdrawal ?? -1]) || 0;
            p = k !== 0 ? k : -E
        } else if (s.amount !== void 0) p = Number(f[s.amount]) || 0;
        else {
            const k = Number(f[5]),
                E = Number(f[6]) || 0,
                b = Number(f[7]) || 0;
            k !== 0 ? (s.balance !== void 0 && Number(f[s.balance]), k < 0 || E === 0 && b > k * 10 ? p = k : p = k !== 0 ? k : -E) : p = E !== 0 ? E : -b
        }
        const m = (k, E) => s[k] !== void 0 ? f[s[k]] : f[E],
            y = s.balance,
            w = y !== void 0 ? Number(f[y]) || 0 : Number(f[7]) || Number(f[8]) || 0,
            v = l ? 2 : 1,
            g = l ? 1 : 2,
            _ = l ? 7 : 3;
        h.push({
            datetime: x,
            memo: String(m("memo", v) ?? "").trim(),
            txType: String(m("txType", g) ?? "").trim(),
            institution: String(m("institution", _) ?? "").trim(),
            accountNo: String(m("accountNo", 4) ?? "").trim(),
            amount: p,
            balance: w,
            note: String(m("note", 9) ?? "").trim()
        })
    }
    return h
}

function yO(e) {
    return x2(e)
}

function bO({
    checked: e,
    indeterminate: t,
    onChange: r
}) {
    const n = O.useRef(null);
    return O.useEffect(() => {
        n.current && (n.current.indeterminate = t)
    }, [t]), o.jsx("input", {
        ref: n,
        type: "checkbox",
        checked: e,
        onChange: s => r(s.target.checked),
        className: "accent-blue-400 cursor-pointer"
    })
}

function kO({
    onClose: e
}) {
    const {
        style: t,
        elRef: r,
        onHeaderMouseDown: n,
        resizeHandle: RZ
    } = Oi(200), {
        state: s,
        dispatch: a
    } = vt(), i = s.bankAliases ?? {}, [l, c] = O.useState("upload"), [u, h] = O.useState("toss"), [d, f] = O.useState([]), [x, p] = O.useState("excel"), [m, y] = O.useState(""), [w, v] = O.useState(""), [g, _] = O.useState(!1), [k, E] = O.useState(!1), b = O.useRef(null), [T, A] = O.useState(""), [H, F] = O.useState(""), [R, K] = O.useState({}), se = O.useCallback(W => {
        if (!W.name.endsWith(".xlsx") && !W.name.endsWith(".xls")) {
            alert(".xlsx 또는 .xls 파일만 지원합니다.");
            return
        }
        const te = new FileReader;
        te.onload = he => {
            var ne;
            try {
                const ue = new Uint8Array((ne = he.target) == null ? void 0 : ne.result),
                    de = _d(ue, {
                        type: "array",
                        cellDates: !0
                    }),
                    N = de.Sheets[de.SheetNames[0]],
                    ae = f2.sheet_to_json(N, {
                        header: 1,
                        defval: ""
                    }).slice(0, 12).flat().map(String),
                    ve = vO(ae);
                h(ve);
                let Te = ve === "toss" || ve === "unknown" ? x2(de) : yO(de);
                if (Te.length === 0) {
                    alert(`거래 데이터를 찾을 수 없습니다.
현재 지원 형식: 토스뱅크, KB국민은행`);
                    return
                }
                const xe = new Map;
                Te.forEach(fe => {
                    const Ne = fe.memo;
                    xe.set(Ne, (xe.get(Ne) || 0) + 1)
                });
                const Me = new Set(s.events.map(fe => `${fe.date}|${fe.amount??""}|${fe.title}`)),
                    Fe = Te.map(fe => {
                        const Ne = gO(fe.datetime),
                            We = `${Ne}|${fe.amount}|${fe.memo}`,
                            Je = Me.has(We);
                        return {
                            parsed: fe,
                            date: Ne,
                            isDuplicate: Je,
                            isEtc: (xe.get(fe.memo) || 0) === 1,
                            selected: !Je
                        }
                    }),
                    me = {};
                new Set(Fe.map(fe => fe.parsed.memo).filter(Boolean)).forEach(fe => {
                    const Ne = i[fe];
                    me[fe] = {
                        displayName: (Ne == null ? void 0 : Ne.displayName) ?? fe,
                        category: (Ne == null ? void 0 : Ne.category) ?? "기타",
                        color: (Ne == null ? void 0 : Ne.color) ?? "red"
                    }
                }), K(me), f(Fe), c("preview")
            } catch (ue) {
                console.error(ue), alert("파일 파싱 중 오류가 발생했습니다.")
            }
        }, te.readAsArrayBuffer(W)
    }, [s.events, i]);

    function z(W) {
        const te = parseFloat(m.replace(/,/g, "")) || 0,
            he = w || "0000-00-00",
            ne = [...W].sort((V, ae) => V.date.localeCompare(ae.date)),
            ue = ne.findIndex(V => V.date >= he);
        let de = te;
        const N = new Map;
        for (let V = ue >= 0 ? ue : 0; V < ne.length; V++) de += ne[V].parsed.amount, N.set(V, de);
        de = te;
        for (let V = (ue >= 0 ? ue : 0) - 1; V >= 0; V--) de -= ne[V].parsed.amount, N.set(V, de);
        return W.map(V => {
            const ae = ne.findIndex(ve => ve === V);
            return {
                ...V,
                calcBalance: N.get(ae)
            }
        })
    }
    const G = d.filter(W => !(T && W.date < T || H && W.date > H)),
        re = x === "custom" && m ? z(G) : G,
        Y = re.filter(W => W.selected).length,
        M = re.filter(W => W.isDuplicate).length,
        X = re.filter(W => W.isEtc),
        ce = re.filter(W => !W.isEtc),
        j = Array.from(new Set(ce.map(W => W.parsed.memo))).map(W => {
            var ne;
            const te = ce.filter(ue => ue.parsed.memo === W).length,
                he = ((ne = ce.find(ue => ue.parsed.memo === W)) == null ? void 0 : ne.parsed.institution) ?? "";
            return {
                memo: W,
                inst: he,
                count: te
            }
        });

    function q(W) {
        const te = new Set(G.map(he => he.parsed.datetime));
        f(he => he.map(ne => te.has(ne.parsed.datetime) ? {
            ...ne,
            selected: W
        } : ne))
    }

    function U(W) {
        f(te => te.map(he => he.parsed.datetime === W ? {
            ...he,
            selected: !he.selected
        } : he))
    }

    function B() {
        const W = new Date().toISOString(),
            te = re.filter(ne => ne.selected);
        Object.entries(R).forEach(([ne, ue]) => {
            if (ue.displayName && ue.displayName !== ne) {
                const de = {
                    displayName: ue.displayName,
                    category: ue.category,
                    color: ue.color
                };
                a({
                    type: "UPSERT_BANK_ALIAS",
                    key: ne,
                    alias: de
                })
            }
        });
        const he = te.map(ne => {
            const ue = R[ne.parsed.memo],
                de = ne.isEtc ? "orange" : (ue == null ? void 0 : ue.color) ?? mO(ne.parsed.txType, ne.parsed.amount),
                N = ne.isEtc ? `당근거래: ${(ue==null?void 0:ue.displayName)||ne.parsed.memo||ne.parsed.txType}` : (ue == null ? void 0 : ue.displayName) || ne.parsed.memo || ne.parsed.txType,
                V = {
                    source: u,
                    institution: ne.parsed.institution,
                    txType: ne.parsed.txType,
                    accountNo: ne.parsed.accountNo || void 0,
                    balanceAfter: x === "excel" ? ne.parsed.balance : void 0,
                    customBalance: x === "custom" ? ne.calcBalance : void 0,
                    isEtc: ne.isEtc,
                    originalMemo: ne.parsed.memo,
                    importedAt: W
                };
            return {
                id: `bank-${Ft()}`,
                title: N,
                date: ne.date,
                color: de,
                isAllDay: !0,
                amount: ne.parsed.amount,
                memo: [ne.parsed.institution, ne.parsed.accountNo, ne.parsed.note].filter(Boolean).join(" | ") || void 0,
                bankTx: V
            }
        });
        a({
            type: "BATCH_ADD_EVENTS",
            events: he
        }), c("done")
    }
    return o.jsxs("div", {
        ref: r,
        className: "bg-gray-950 border border-white/10 rounded-xl shadow-2xl w-[780px] max-h-[90vh] flex flex-col",
        style: t,
        children: [RZ, o.jsxs("div", {
            className: "flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0 cursor-grab active:cursor-grabbing select-none",
            onMouseDown: n,
            children: [o.jsxs("div", {
                className: "flex items-center gap-3",
                onMouseDown: W => W.stopPropagation(),
                children: [o.jsx("span", {
                    className: "text-white font-semibold",
                    children: DDBTR("은행 거래내역 가져오기")
                }), o.jsx("div", {
                    className: "flex items-center gap-1 text-xs text-white/50",
                    children: ["upload", "preview", "done"].map((W, te) => o.jsxs("span", {
                        className: "flex items-center gap-1",
                        children: [te > 0 && o.jsx("span", {
                            className: "text-white/20",
                            children: "›"
                        }), o.jsx("span", {
                            className: l === W ? "text-blue-400 font-bold" : "",
                            children: W === "upload" ? "① 파일" : W === "preview" ? DDBTR("② 미리보기") : "③ 완료"
                        })]
                    }, W))
                })]
            }), o.jsx("button", {
                onClick: e,
                onMouseDown: W => W.stopPropagation(),
                className: "text-white/50 hover:text-white transition-colors",
                children: o.jsx(Zt, {
                    size: 18
                })
            })]
        }), o.jsxs("div", {
            className: "flex-1 overflow-auto",
            children: [l === "upload" && o.jsxs("div", {
                className: "p-6 flex flex-col items-center gap-4",
                children: [o.jsxs("div", {
                    className: `w-full border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
                  ${g?"border-blue-400 bg-blue-400/10":"border-white/20 hover:border-white/40 hover:bg-white/5"}`,
                    onDragOver: W => {
                        W.preventDefault(), _(!0)
                    },
                    onDragLeave: () => _(!1),
                    onDrop: W => {
                        W.preventDefault(), _(!1);
                        const te = W.dataTransfer.files[0];
                        te && se(te)
                    },
                    onClick: () => {
                        var W;
                        return (W = b.current) == null ? void 0 : W.click()
                    },
                    children: [o.jsx(au, {
                        size: 40,
                        className: "mx-auto mb-3 text-white/40"
                    }), o.jsx("p", {
                        className: "text-white/70 font-medium",
                        children: DDBTR("엑셀 파일을 여기에 드롭하거나 클릭하여 선택")
                    }), o.jsx("p", {
                        className: "text-white/40 text-xs mt-1",
                        children: DDBTR(".xlsx 파일 지원")
                    })]
                }), o.jsx("input", {
                    ref: b,
                    type: "file",
                    accept: ".xlsx,.xls",
                    className: "hidden",
                    onChange: W => {
                        var he;
                        const te = (he = W.target.files) == null ? void 0 : he[0];
                        te && se(te), W.target.value = ""
                    }
                }), o.jsxs("div", {
                    className: "w-full bg-white/5 rounded-lg p-3 text-xs text-white/50 space-y-1",
                    children: [o.jsx("p", {
                        className: "font-medium text-white/70 mb-1",
                        children: DDBTR("✓ 지원 형식")
                    }), o.jsx("p", {
                        children: DDBTR("• 토스뱅크 — 엑셀 거래내역 (.xlsx)")
                    }), o.jsx("p", {
                        className: "text-white/30",
                        children: DDBTR("• KB국민은행, 신한은행 등 — 추후 지원 예정")
                    })]
                })]
            }), l === "preview" && o.jsxs("div", {
                className: "flex flex-col gap-3 p-4",
                children: [o.jsxs("div", {
                    className: "flex flex-wrap gap-2 text-xs",
                    children: [o.jsxs("span", {
                        className: "bg-white/10 rounded px-2 py-1 text-white/70",
                        children: ["총 ", o.jsx("b", {
                            className: "text-white",
                            children: d.length
                        }), DDBTR("건")]
                    }), o.jsxs("span", {
                        className: "bg-green-500/15 rounded px-2 py-1 text-green-400",
                        children: ["선택됨 ", o.jsx("b", {
                            children: Y
                        }), DDBTR("건")]
                    }), M > 0 && o.jsxs("span", {
                        className: "bg-amber-500/15 rounded px-2 py-1 text-amber-400",
                        children: [o.jsx(Of, {
                            size: 10,
                            className: "inline mr-1"
                        }), "중복 ", o.jsx("b", {
                            children: M
                        }), "건 (기본 미선택, 체크로 강제 추가 가능)"]
                    }), o.jsxs("span", {
                        className: "bg-purple-500/10 rounded px-2 py-1 text-purple-300",
                        children: [DDBTR("반복거래 "), o.jsx("b", {
                            children: ce.length
                        }), DDBTR("건")]
                    }), o.jsxs("span", {
                        className: "bg-orange-500/10 rounded px-2 py-1 text-orange-300",
                        children: [DDBTR("당근거래 "), o.jsx("b", {
                            children: X.length
                        }), DDBTR("건")]
                    })]
                }), o.jsxs("div", {
                    className: "bg-white/5 rounded-lg p-3 space-y-2",
                    children: [o.jsx("p", {
                        className: "text-xs font-medium text-white/70",
                        children: DDBTR("날짜 범위 필터")
                    }), o.jsx("p", {
                        className: "text-[10px] text-white/30",
                        children: DDBTR("숫자 키로 입력 — shift 모드 (예: 2026 입력 후 2 누르면 0262)")
                    }), o.jsxs("div", {
                        className: "flex flex-wrap gap-2 items-center text-xs",
                        children: [o.jsxs("div", {
                            className: "flex flex-col gap-1",
                            children: [o.jsx("label", {
                                className: "text-[10px] text-white/40",
                                children: DDBTR("시작일")
                            }), o.jsx(X0, {
                                value: T,
                                onChange: A,
                                className: "bg-gray-800 border border-white/20 rounded px-2 py-1 text-xs text-white w-36 focus:border-blue-400 outline-none cursor-text"
                            })]
                        }), o.jsx("span", {
                            className: "text-white/30 mt-4",
                            children: "~"
                        }), o.jsxs("div", {
                            className: "flex flex-col gap-1",
                            children: [o.jsx("label", {
                                className: "text-[10px] text-white/40",
                                children: DDBTR("종료일")
                            }), o.jsx(X0, {
                                value: H,
                                onChange: F,
                                className: "bg-gray-800 border border-white/20 rounded px-2 py-1 text-xs text-white w-36 focus:border-blue-400 outline-none cursor-text"
                            })]
                        }), (T || H) && o.jsx("button", {
                            onClick: () => {
                                A(""), F("")
                            },
                            className: "mt-4 text-[10px] text-white/40 hover:text-white/70 underline",
                            children: DDBTR("초기화")
                        }), o.jsxs("span", {
                            className: "mt-4 text-[10px] text-white/30",
                            children: ["현재 ", G.length, "건 표시 (전체 ", d.length, DDBTR("건)")]
                        })]
                    })]
                }), o.jsxs("div", {
                    className: "bg-white/5 rounded-lg p-3 space-y-2",
                    children: [o.jsx("p", {
                        className: "text-xs font-medium text-white/70",
                        children: DDBTR("잔액 표시 기준")
                    }), o.jsxs("div", {
                        className: "flex gap-4 text-xs",
                        children: [o.jsxs("label", {
                            className: "flex items-center gap-2 cursor-pointer",
                            children: [o.jsx("input", {
                                type: "radio",
                                checked: x === "excel",
                                onChange: () => p("excel"),
                                className: "accent-blue-400"
                            }), o.jsx("span", {
                                className: "text-white/80",
                                children: DDBTR("엑셀 원본 잔액")
                            })]
                        }), o.jsxs("label", {
                            className: "flex items-center gap-2 cursor-pointer",
                            children: [o.jsx("input", {
                                type: "radio",
                                checked: x === "custom",
                                onChange: () => p("custom"),
                                className: "accent-blue-400"
                            }), o.jsx("span", {
                                className: "text-white/80",
                                children: DDBTR("기준잔액 직접 설정")
                            })]
                        })]
                    }), x === "custom" && o.jsxs("div", {
                        className: "flex gap-2 mt-1 flex-wrap",
                        children: [o.jsxs("div", {
                            className: "flex flex-col gap-1",
                            children: [o.jsx("label", {
                                className: "text-[10px] text-white/40",
                                children: DDBTR("기준날짜")
                            }), o.jsx(X0, {
                                value: w,
                                onChange: v,
                                className: "bg-gray-800 border border-white/20 rounded px-2 py-1 text-xs text-white w-36 focus:border-blue-400 outline-none cursor-text"
                            })]
                        }), o.jsxs("div", {
                            className: "flex flex-col gap-1",
                            children: [o.jsx("label", {
                                className: "text-[10px] text-white/40",
                                children: DDBTR("기준잔액 (원)")
                            }), o.jsx("input", {
                                type: "text",
                                placeholder: DDBTR("예: 1,000,000"),
                                value: m,
                                onChange: W => y(W.target.value),
                                className: "bg-gray-800 border border-white/20 rounded px-2 py-1 text-xs text-white w-36"
                            })]
                        }), o.jsx("div", {
                            className: "flex items-end",
                            children: o.jsxs("span", {
                                className: "text-[10px] text-white/30 pb-1.5",
                                children: [o.jsx(aT, {
                                    size: 10,
                                    className: "inline mr-1"
                                }), DDBTR("기준날짜 기준으로 잔액 역산")]
                            })
                        })]
                    })]
                }), (() => {
                    const W = Y === re.length && re.length > 0,
                        te = Y > 0 && !W;
                    return o.jsxs("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [o.jsxs("label", {
                            className: "flex items-center gap-2 cursor-pointer text-white/60 hover:text-white",
                            children: [o.jsx(bO, {
                                checked: W,
                                indeterminate: te,
                                onChange: he => q(he)
                            }), "전체 선택/해제 (중복 포함)"]
                        }), o.jsxs("span", {
                            className: "text-white/30",
                            children: [u === "toss" ? DDBTR("토스뱅크") : u, " 형식"]
                        })]
                    })
                })(), ce.length > 0 && o.jsxs("div", {
                    className: "space-y-2",
                    children: [o.jsxs("p", {
                        className: "text-xs font-medium text-white/50 px-1",
                        children: [DDBTR("🔄 반복거래 ("), ce.length, DDBTR("건)")]
                    }), j.length > 0 && o.jsxs("div", {
                        className: "bg-white/5 rounded-lg p-3 space-y-2",
                        children: [o.jsx("p", {
                            className: "text-[10px] text-white/40",
                            children: DDBTR("거래 종류별 이름 / 카테고리 / 색상 설정 (다음 가져오기에도 자동 적용됩니다)")
                        }), j.map(W => {
                            const te = R[W.memo] ?? {
                                displayName: W.memo,
                                category: "기타",
                                color: "red"
                            };
                            return o.jsxs("div", {
                                className: "border-t border-white/10 pt-2 first:border-0 first:pt-0 space-y-1",
                                children: [o.jsxs("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: [o.jsxs("span", {
                                        className: "text-[10px] text-white/40 min-w-[90px] truncate",
                                        title: W.memo,
                                        children: [DDBTR("원본: "), W.memo || W.inst, " (", W.count, DDBTR("건)")]
                                    }), o.jsx("input", {
                                        type: "text",
                                        value: te.displayName,
                                        placeholder: DDBTR("표시 이름"),
                                        onChange: he => K(ne => ({
                                            ...ne,
                                            [W.memo]: {
                                                ...te,
                                                displayName: he.target.value
                                            }
                                        })),
                                        className: "flex-1 min-w-[100px] bg-gray-800 border border-white/20 rounded px-2 py-0.5 text-xs text-white"
                                    }), o.jsx("select", {
                                        value: te.category,
                                        onChange: he => K(ne => ({
                                            ...ne,
                                            [W.memo]: {
                                                ...te,
                                                category: he.target.value
                                            }
                                        })),
                                        className: "bg-gray-800 border border-white/20 rounded px-1.5 py-0.5 text-xs text-white",
                                        children: kw.map(he => o.jsx("option", {
                                            value: he,
                                            style: {
                                                backgroundColor: "#1e293b",
                                                color: "white"
                                            },
                                            children: he
                                        }, he))
                                    })]
                                }), o.jsx("div", {
                                    className: "flex gap-1",
                                    children: ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"].map(he => o.jsx("button", {
                                        title: he,
                                        onClick: () => K(ne => ({
                                            ...ne,
                                            [W.memo]: {
                                                ...te,
                                                color: he
                                            }
                                        })),
                                        className: `w-5 h-5 rounded-full ${pO[he]} transition-transform
                                    ${te.color===he?"ring-2 ring-white scale-110":"opacity-50 hover:opacity-90"}`
                                    }, he))
                                })]
                            }, W.memo)
                        })]
                    }), o.jsx(E1, {
                        rows: ce,
                        balanceMode: x,
                        aliasInputs: R,
                        onToggle: W => U(W)
                    })]
                }), X.length > 0 && o.jsxs("div", {
                    children: [o.jsxs("button", {
                        onClick: () => E(W => !W),
                        className: "flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white/80 transition-colors mb-1 px-1",
                        children: [k ? o.jsx(jf, {
                            size: 12
                        }) : o.jsx(Si, {
                            size: 12
                        }), DDBTR("🥕 당근거래 (1회성, "), X.length, DDBTR("건) — "), k ? "접기" : "펼치기"]
                    }), k && o.jsx(E1, {
                        rows: X,
                        balanceMode: x,
                        aliasInputs: R,
                        onToggle: W => U(W)
                    })]
                })]
            }), l === "done" && o.jsxs("div", {
                className: "p-12 flex flex-col items-center gap-4 text-center",
                children: [o.jsx("div", {
                    className: "w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center",
                    children: o.jsx(su, {
                        size: 32,
                        className: "text-green-400"
                    })
                }), o.jsx("p", {
                    className: "text-white font-semibold text-lg",
                    children: DDBTR("가져오기 완료!")
                }), o.jsxs("p", {
                    className: "text-white/60 text-sm",
                    children: [Y, DDBTR("건의 거래내역이 달력에 추가되었습니다.")]
                }), o.jsxs("p", {
                    className: "text-white/40 text-xs",
                    children: ["가계부 패널 → ", o.jsx("b", {
                        children: DDBTR("은행")
                    }), " 탭에서 배치 관리 및 확인 가능합니다."]
                })]
            })]
        }), o.jsx("div", {
            className: "flex items-center justify-between px-4 py-3 border-t border-white/10 flex-shrink-0",
            children: l === "done" ? o.jsx("div", {
                className: "flex-1 flex justify-center",
                children: o.jsx("button", {
                    onClick: e,
                    className: "bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors",
                    children: DDBTR("닫기")
                })
            }) : o.jsxs(o.Fragment, {
                children: [o.jsx("button", {
                    onClick: e,
                    className: "text-white/50 hover:text-white text-sm transition-colors px-3 py-2",
                    children: DDBTR("취소")
                }), l === "preview" && o.jsxs("button", {
                    onClick: B,
                    disabled: Y === 0,
                    className: "bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2",
                    children: [o.jsx(su, {
                        size: 14
                    }), DDBTR("가져오기 ("), Y, DDBTR("건)")]
                })]
            })
        })]
    })
}

function E1({
    rows: e,
    balanceMode: t,
    aliasInputs: r,
    onToggle: n
}) {
    const s = i => {
            const l = Math.abs(i).toLocaleString();
            return i >= 0 ? `+${l}` : `-${l}`
        },
        a = i => i != null ? i.toLocaleString() : "-";
    return o.jsx("div", {
        className: "overflow-x-auto rounded-lg border border-white/10",
        children: o.jsxs("table", {
            className: "w-full text-xs",
            children: [o.jsx("thead", {
                children: o.jsxs("tr", {
                    className: "bg-white/5 text-white/50",
                    children: [o.jsx("th", {
                        className: "px-2 py-1.5 text-center w-8"
                    }), o.jsx("th", {
                        className: "px-2 py-1.5 text-left",
                        children: DDBTR("날짜")
                    }), o.jsx("th", {
                        className: "px-2 py-1.5 text-left",
                        children: DDBTR("적요")
                    }), o.jsx("th", {
                        className: "px-2 py-1.5 text-left",
                        children: DDBTR("유형")
                    }), o.jsx("th", {
                        className: "px-2 py-1.5 text-right",
                        children: DDBTR("금액")
                    }), o.jsx("th", {
                        className: "px-2 py-1.5 text-right",
                        children: DDBTR("잔액")
                    })]
                })
            }), o.jsx("tbody", {
                children: e.map(i => {
                    const l = t === "custom" ? i.calcBalance : i.parsed.balance,
                        c = r[i.parsed.memo],
                        u = (c == null ? void 0 : c.displayName) || i.parsed.memo;
                    return o.jsxs("tr", {
                        className: `border-t border-white/5 transition-colors
                  ${i.isDuplicate&&!i.selected?"opacity-40 bg-amber-900/10 hover:opacity-60":i.selected?"bg-white/3 hover:bg-white/5":"opacity-50 hover:opacity-70 hover:bg-white/3"}`,
                        children: [o.jsx("td", {
                            className: "px-2 py-1.5 text-center",
                            children: o.jsxs("div", {
                                className: "flex items-center justify-center gap-0.5",
                                children: [i.isDuplicate && o.jsx("span", {
                                    title: DDBTR("중복 (체크로 강제 추가)"),
                                    children: o.jsx(Of, {
                                        size: 8,
                                        className: "text-amber-400 flex-shrink-0"
                                    })
                                }), o.jsx("input", {
                                    type: "checkbox",
                                    checked: i.selected,
                                    onChange: () => n(i.parsed.datetime),
                                    className: "accent-blue-400 cursor-pointer"
                                })]
                            })
                        }), o.jsx("td", {
                            className: "px-2 py-1.5 text-white/60 whitespace-nowrap",
                            children: i.date
                        }), o.jsxs("td", {
                            className: "px-2 py-1.5 text-white/90 max-w-[160px] truncate",
                            title: i.parsed.memo,
                            children: [i.isEtc && o.jsx("span", {
                                className: "text-orange-400 mr-1 text-[9px]",
                                children: "🥕"
                            }), u !== i.parsed.memo ? o.jsxs(o.Fragment, {
                                children: [o.jsx("span", {
                                    children: u
                                }), o.jsxs("span", {
                                    className: "text-white/25 ml-1 text-[9px]",
                                    children: ["(", i.parsed.memo, ")"]
                                })]
                            }) : i.parsed.memo || "-", i.parsed.institution && o.jsxs("span", {
                                className: "text-white/30 ml-1",
                                children: ["(", i.parsed.institution, ")"]
                            })]
                        }), o.jsx("td", {
                            className: "px-2 py-1.5 text-white/40",
                            children: i.parsed.txType
                        }), o.jsx("td", {
                            className: `px-2 py-1.5 text-right font-medium tabular-nums whitespace-nowrap
                  ${i.parsed.amount>=0?"text-blue-400":"text-red-400"}`,
                            children: s(i.parsed.amount)
                        }), o.jsx("td", {
                            className: "px-2 py-1.5 text-right text-white/40 tabular-nums whitespace-nowrap",
                            children: a(l)
                        })]
                    }, i.parsed.datetime)
                })
            })]
        })
    })
}
const _O = 8,
    ot = {
        active: !1,
        potentialDrag: !1,
        panelId: "",
        startX: 0,
        startY: 0,
        origX: 0,
        origY: 0
    },
    at = {
        active: !1,
        corner: "",
        panelId: "",
        startX: 0,
        startY: 0,
        origW: 0,
        origH: 0,
        origX: 0,
        origY: 0
    };
let Sd = null;

function q0(e) {
    Sd = e
}

function Td({
    panel: e,
    title: t,
    colorDot: r,
    children: n
}) {
    const {
        dispatch: s,
        state: St
    } = vt(), a = e.slot === "float", i = O.useRef(null);

    function l(m) {
        m.target.closest("button") || (m.preventDefault(), e.slot === "float" ? (console.log("[DDB DRAG] float mousedown", e.id, "at", m.clientX, m.clientY), s({
            type: "BRING_FRONT",
            id: e.id
        }), Object.assign(ot, {
            active: !0,
            potentialDrag: !1,
            panelId: e.id,
            startX: m.clientX,
            startY: m.clientY,
            origX: e.floatX,
            origY: e.floatY
        }), console.log("[DDB DRAG] gDrag set:", JSON.stringify(ot))) : (console.log("[DDB DRAG] slotted potentialDrag", e.id, "slot:", e.slot), Object.assign(ot, {
            active: !1,
            potentialDrag: !0,
            panelId: e.id,
            startX: m.clientX,
            startY: m.clientY,
            origX: e.floatX,
            origY: e.floatY
        })))
    }

    function c(m, y) {
        var v;
        m.preventDefault(), m.stopPropagation(), a && s({
            type: "BRING_FRONT",
            id: e.id
        });
        const w = ((v = i.current) == null ? void 0 : v.getBoundingClientRect().height) ?? (a ? e.floatH : e.slotH ?? 200);
        Object.assign(at, {
            active: !0,
            corner: y,
            panelId: e.id,
            startX: m.clientX,
            startY: m.clientY,
            origW: e.floatW,
            origH: w,
            origX: e.floatX,
            origY: e.floatY
        })
    }
    const u = () => s({
            type: "SET_PANEL_SLOT",
            id: e.id,
            slot: "left"
        }),
        h = () => s({
            type: "SET_PANEL_SLOT",
            id: e.id,
            slot: "right"
        }),
        d = () => {
            s({
                type: "FLOAT_PANEL",
                id: e.id,
                x: e.floatX || 200,
                y: e.floatY || 100
            }), s({
                type: "BRING_FRONT",
                id: e.id
            })
        },
        f = ["nw", "sw", "se"],
        x = {
            nw: "top-0 left-0 cursor-nw-resize",
            sw: "bottom-0 left-0 cursor-sw-resize",
            se: "bottom-0 right-0 cursor-se-resize"
        },
        p = a ? {
            position: "fixed",
            left: e.floatX,
            top: e.floatY,
            width: e.floatW,
            height: e.minimized ? "auto" : e.floatH,
            zIndex: e.zIndex,
            minWidth: 160,
            minHeight: 40
        } : {
            position: "relative",
            width: "100%",
            height: "100%",
            ...e.slotH && !e.minimized ? {
                height: e.slotH
            } : {}
        };
    return o.jsxs("div", {
        ref: i,
        style: p,
        className: "relative flex flex-col rounded-lg overflow-hidden border border-white/15 bg-black/30 backdrop-blur-sm shadow-xl",
        onMouseDown: () => a && s({
            type: "BRING_FRONT",
            id: e.id
        }),
        children: [o.jsxs("div", {
            onMouseDown: l,
            className: "flex items-center gap-1.5 px-2 py-1.5 bg-black/40 border-b border-white/10 select-none flex-shrink-0",
            style: {
                cursor: "grab"
            },
            children: [o.jsx(ww, {
                size: 12,
                className: "text-white/30"
            }), r && o.jsx("span", {
                className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                style: {
                    backgroundColor: r
                }
            }), (e.type === "memo" && St.settings.memoTabCycle) && o.jsx("input", { type: "checkbox", onMouseDown: m => m.stopPropagation(), onClick: m => m.stopPropagation(), checked: !Array.isArray(St.settings.memoCycleIds) || St.settings.memoCycleIds.includes(e.memoTabId), onChange: () => { let cur = Array.isArray(St.settings.memoCycleIds) ? St.settings.memoCycleIds.slice() : (St.memoTabs || []).map(z => z.id); cur = cur.includes(e.memoTabId) ? cur.filter(z => z !== e.memoTabId) : [...cur, e.memoTabId]; s({ type: "UPDATE_SETTINGS", settings: { memoCycleIds: cur } }); }, title: DDBTR("Tab 이동에 포함"), className: "w-3 h-3 flex-shrink-0 cursor-pointer" }), o.jsx("span", {
                className: "text-white/80 text-xs font-medium flex-1 truncate",
                children: t
            }), o.jsxs("div", {
                className: "flex items-center gap-0.5 ml-1",
                children: [e.type === "calendar" && o.jsxs(o.Fragment, {
                    children: [o.jsx("button", {
                        onMouseDown: m => m.stopPropagation(),
                        onClick: () => s({ type: "UPDATE_SETTINGS", settings: { calRowH: Math.max(0, (St.settings.calRowH ?? 0) === 0 ? 0 : St.settings.calRowH - 24) } }),
                        title: DDBTR("달력 작게"),
                        className: "px-1 text-white/40 hover:text-white rounded hover:bg-white/10 text-xs font-bold",
                        children: "－"
                    }), o.jsx("button", {
                        onMouseDown: m => m.stopPropagation(),
                        onClick: () => s({ type: "UPDATE_SETTINGS", settings: { calRowH: ((St.settings.calRowH ?? 0) === 0 ? 96 : St.settings.calRowH) + 24 } }),
                        title: DDBTR("달력 크게 (창보다 커지면 스크롤로 봅니다)"),
                        className: "px-1 text-white/40 hover:text-white rounded hover:bg-white/10 text-xs font-bold",
                        children: "＋"
                    }), (St.settings.calRowH ?? 0) > 0 && o.jsx("button", {
                        onMouseDown: m => m.stopPropagation(),
                        onClick: () => s({ type: "UPDATE_SETTINGS", settings: { calRowH: 0 } }),
                        title: DDBTR("화면에 맞추기"),
                        className: "px-1 text-white/40 hover:text-white rounded hover:bg-white/10 text-[10px]",
                        children: DDBTR("맞춤")
                    })]
                }), a ? o.jsxs(o.Fragment, {
                    children: [o.jsx("button", {
                        onClick: u,
                        title: DDBTR("왼쪽에 고정"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(F0, {
                            size: 11
                        })
                    }), o.jsx("button", {
                        onClick: h,
                        title: DDBTR("오른쪽에 고정"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(I0, {
                            size: 11
                        })
                    })]
                }) : e.slot === "left" ? o.jsxs(o.Fragment, {
                    children: [o.jsx("button", {
                        onClick: h,
                        title: DDBTR("오른쪽으로"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(I0, {
                            size: 11
                        })
                    }), o.jsx("button", {
                        onClick: d,
                        title: DDBTR("팝업으로"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(Ql, {
                            size: 11
                        })
                    })]
                }) : e.slot === "right" ? o.jsxs(o.Fragment, {
                    children: [o.jsx("button", {
                        onClick: u,
                        title: DDBTR("왼쪽으로"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(F0, {
                            size: 11
                        })
                    }), o.jsx("button", {
                        onClick: d,
                        title: DDBTR("팝업으로"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(Ql, {
                            size: 11
                        })
                    })]
                }) : e.slot === "center" ? o.jsxs(o.Fragment, {
                    children: [o.jsx("button", {
                        onClick: u,
                        title: DDBTR("왼쪽으로"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(F0, {
                            size: 11
                        })
                    }), o.jsx("button", {
                        onClick: h,
                        title: DDBTR("오른쪽으로"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(I0, {
                            size: 11
                        })
                    }), o.jsx("button", {
                        onClick: d,
                        title: DDBTR("팝업으로"),
                        className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                        children: o.jsx(Ql, {
                            size: 11
                        })
                    })]
                }) : o.jsx("button", {
                    onClick: d,
                    title: DDBTR("팝업으로"),
                    className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                    children: o.jsx(Ql, {
                        size: 11
                    })
                }), o.jsx("button", {
                    onClick: () => s({
                        type: "MINIMIZE_PANEL",
                        id: e.id,
                        minimized: !e.minimized
                    }),
                    className: "p-0.5 text-white/40 hover:text-white rounded hover:bg-white/10",
                    children: o.jsx(id, {
                        size: 11
                    })
                }), o.jsx("button", {
                    onClick: () => s({
                        type: "REMOVE_PANEL",
                        id: e.id
                    }),
                    className: "p-0.5 text-white/40 hover:text-red-300 rounded hover:bg-white/10",
                    children: o.jsx(Zt, {
                        size: 11
                    })
                })]
            })]
        }), !e.minimized && o.jsx("div", {
            className: "flex-1 overflow-hidden min-h-0",
            children: n
        }), (() => { const _sk = St.settings.panelSkin && DDB_SKINS[St.settings.panelSkin]; const _u = _sk && _sk.map[e.type === "memo" ? e.memoTabId : e.type]; return _u ? o.jsx("img", { src: _u, alt: "", className: "absolute pointer-events-none select-none", style: { bottom: 2, right: 4, width: 66, height: 66, opacity: 0.92, zIndex: 5 } }) : null; })(), !e.minimized && o.jsx("div", {
            onMouseDown: m => c(m, "s"),
            className: "absolute bottom-0 left-6 right-6 h-[3px] cursor-s-resize z-30 group",
            children: o.jsx("div", {
                className: "w-8 h-0.5 rounded-full bg-white/0 group-hover:bg-white/40 transition-colors mx-auto mt-0.5"
            })
        }), a && !e.minimized && f.map(m => o.jsx("div", {
            onMouseDown: y => c(y, m),
            className: ["absolute w-2.5 h-2.5", x[m]].join(" "),
            style: {
                zIndex: 20
            },
            children: o.jsxs("svg", {
                width: "8",
                height: "8",
                viewBox: "0 0 8 8",
                style: {
                    position: "absolute",
                    bottom: m.includes("s") ? 1 : void 0,
                    top: m.includes("n") ? 1 : void 0,
                    right: m.includes("e") ? 1 : void 0,
                    left: m.includes("w") ? 1 : void 0,
                    opacity: .4
                },
                children: [m === "se" && o.jsx("polygon", {
                    points: "8,0 8,8 0,8",
                    fill: "white"
                }), m === "sw" && o.jsx("polygon", {
                    points: "0,0 8,8 0,8",
                    fill: "white"
                }), m === "ne" && o.jsx("polygon", {
                    points: "0,0 8,0 8,8",
                    fill: "white"
                }), m === "nw" && o.jsx("polygon", {
                    points: "0,0 8,0 0,8",
                    fill: "white"
                })]
            })
        }, m))]
    })
}

function EO(e, t) {
    const [r, n] = O.useState(!1), s = O.useRef(), c = O.useRef(!1);
    return O.useEffect(() => {
        if (!t || e <= 0) {
            n(!1), c.current = !1;
            return
        }

        function a(ev) {
            if (c.current && ev && ev.type !== "mousedown") return;
            c.current = !1, n(!1), clearTimeout(s.current), s.current = setTimeout(() => {
                c.current = !0, n(!0)
            }, e)
        }
        const i = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "wheel"];
        return i.forEach(l => window.addEventListener(l, a, {
            passive: !0
        })), a(), () => {
            i.forEach(l => window.removeEventListener(l, a)), clearTimeout(s.current)
        }
    }, [e, t]), r
}

function SO({
    children: e
}) {
    const {
        state: t
    } = vt(), {
        privacy: r,
        settings: st
    } = t, n = (r.idleHours * 3600 + r.idleMinutes * 60 + r.idleSeconds) * 1e3, idle = EO(n, r.enabled && n > 0), mode = r.mode ?? "opacity", bg = st.backgroundType === "image" && st.backgroundImage ? {
        backgroundImage: `url(${st.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    } : st.backgroundType === "solid" ? {
        background: st.backgroundSolidColor
    } : {
        background: C1[st.backgroundIndex % C1.length]
    };
    return o.jsxs("div", {
        style: {
            width: "100%",
            height: "100%",
            position: "relative"
        },
        children: [o.jsx("div", {
            style: {
                opacity: idle && mode === "opacity" ? r.fadeOpacity / 100 : 1,
                transition: "opacity 1.5s ease",
                width: "100%",
                height: "100%"
            },
            children: e
        }), idle && mode === "background" && o.jsx("div", {
            style: {
                position: "fixed",
                inset: 0,
                zIndex: 99990,
                transition: "opacity 1s ease",
                ...bg
            }
        })]
    })
}

function TO() {
    const [e, t] = O.useState("0"), [r, n] = O.useState(""), [s, a] = O.useState(!1), [i, l] = O.useState(() => {
        try {
            return JSON.parse(localStorage.getItem("calc-history") ?? "[]")
        } catch {
            return []
        }
    }), c = O.useRef(null);

    function u(b) {
        l(b), localStorage.setItem("calc-history", JSON.stringify(b.slice(0, 50)))
    }

    function h(b) {
        if (s) {
            t(b), n(b), a(!1);
            return
        }
        if (e === "0" && b !== ".") t(b), n(T => T === "0" ? b : T.slice(0, -1) + b);
        else {
            if (b === "." && e.includes(".")) return;
            t(T => T + b), n(T => T + b)
        }
    }

    function d(b) {
        a(!1);
        const T = r.slice(-1);
        ["+", "-", "×", "÷", "*", "/"].includes(T) ? n(A => A.slice(0, -1) + b) : n(A => A + b), t(b)
    }

    function f() {
        if (r) try {
            const b = r.replace(/×/g, "*").replace(/÷/g, "/"),
                T = Function('"use strict"; return (' + b + ")")(),
                A = Number.isFinite(T) ? String(parseFloat(T.toFixed(10))) : "오류";
            u([{
                expr: r,
                result: A
            }, ...i].slice(0, 50)), t(A), n(A), a(!0)
        } catch {
            t("오류"), n("")
        }
    }

    function x() {
        t("0"), n(""), a(!1)
    }

    function p() {
        if (s) {
            x();
            return
        }
        if (r.length <= 1) t("0"), n("");
        else {
            const b = r.slice(0, -1);
            n(b), t(b.slice(-1) || "0")
        }
    }

    function m() {
        try {
            const b = parseFloat(e) / 100;
            t(String(b)), n(T => T.slice(0, -e.length) + b)
        } catch {}
    }

    function y() {
        if (e === "0") return;
        const b = String(-parseFloat(e));
        t(b), n(T => {
            const A = Math.max(T.lastIndexOf("+"), T.lastIndexOf("-"), T.lastIndexOf("×"), T.lastIndexOf("÷"));
            return A >= 0 ? T.slice(0, A + 1) + b : b
        })
    }
    O.useEffect(() => {
        function b(T) {
            T.key >= "0" && T.key <= "9" ? h(T.key) : T.key === "." ? h(".") : T.key === "+" ? d("+") : T.key === "-" ? d("-") : T.key === "*" ? d("×") : T.key === "/" ? (T.preventDefault(), d("÷")) : T.key === "Enter" || T.key === "=" ? f() : T.key === "Backspace" ? p() : T.key === "Escape" ? x() : T.key === "%" && m()
        }
        return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b)
    });
    const w = "flex items-center justify-center rounded-xl text-sm font-medium h-10 transition-all active:scale-95 select-none cursor-pointer",
        v = w + " bg-white/10 text-white hover:bg-white/20",
        g = w + " bg-blue-500/40 text-blue-200 hover:bg-blue-500/60",
        _ = w + " bg-blue-500 text-white hover:bg-blue-400 col-span-1",
        k = w + " bg-white/5 text-white/60 hover:bg-white/15",
        E = [
            ["C", k, x],
            ["±", k, y],
            ["%", k, m],
            ["÷", g, () => d("÷")],
            ["7", v, () => h("7")],
            ["8", v, () => h("8")],
            ["9", v, () => h("9")],
            ["×", g, () => d("×")],
            ["4", v, () => h("4")],
            ["5", v, () => h("5")],
            ["6", v, () => h("6")],
            ["-", g, () => d("-")],
            ["1", v, () => h("1")],
            ["2", v, () => h("2")],
            ["3", v, () => h("3")],
            ["+", g, () => d("+")],
            ["0", v + " col-span-2", () => h("0")],
            [".", v, () => h(".")],
            ["=", _, f]
        ];
    return o.jsxs("div", {
        ref: c,
        className: "flex flex-col h-full select-none",
        children: [o.jsxs("div", {
            className: "px-3 py-2 bg-black/30 flex-shrink-0",
            children: [o.jsx("div", {
                className: "text-white/40 text-xs h-4 truncate text-right",
                children: r || "0"
            }), o.jsx("div", {
                className: "text-white text-2xl font-light text-right truncate leading-tight",
                children: e
            })]
        }), o.jsx("div", {
            className: "grid grid-cols-4 gap-1 p-2 flex-shrink-0",
            children: E.map(([b, T, A]) => o.jsx("button", {
                className: T,
                onClick: A,
                children: b
            }, b + T))
        }), o.jsxs("div", {
            className: "flex-1 overflow-y-auto thin-scroll min-h-0 border-t border-white/10",
            children: [o.jsxs("div", {
                className: "flex items-center justify-between px-3 py-1.5 flex-shrink-0",
                children: [o.jsx("span", {
                    className: "text-white/40 text-xs",
                    children: DDBTR("계산 기록")
                }), i.length > 0 && o.jsx("button", {
                    onClick: () => u([]),
                    className: "text-white/30 hover:text-white",
                    children: o.jsx(Gr, {
                        size: 11
                    })
                })]
            }), i.length === 0 && o.jsx("p", {
                className: "text-white/20 text-xs text-center py-4",
                children: DDBTR("기록 없음")
            }), i.map((b, T) => o.jsxs("div", {
                onClick: () => {
                    t(b.expr), n(b.expr), a(!1)
                },
                className: "flex items-center justify-between px-3 py-1 hover:bg-white/5 cursor-pointer border-b border-white/5",
                children: [o.jsx("span", {
                    className: "text-white/40 text-xs truncate flex-1",
                    children: b.expr
                }), o.jsxs("span", {
                    className: "text-white/80 text-xs ml-2 flex-shrink-0",
                    children: ["= ", b.result]
                })]
            }, T))]
        })]
    })
}
const NO = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"],
    Nd = ["목", "목", "화", "화", "토", "토", "금", "금", "수", "수"],
    CO = ["양", "음", "양", "음", "양", "음", "양", "음", "양", "음"],
    AO = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"],
    p2 = ["수", "토", "목", "목", "토", "화", "화", "토", "금", "금", "토", "수"],
    jO = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"],
    ys = {
        목: "#4ade80",
        화: "#f87171",
        토: "#fbbf24",
        금: "#94a3b8",
        수: "#60a5fa"
    },
    cc = {
        목: "🌳",
        화: "🔥",
        토: "⛰️",
        금: "🥇",
        수: "💧"
    },
    RO = {
        목: "화",
        화: "토",
        토: "금",
        금: "수",
        수: "목"
    },
    OO = {
        목: "토",
        화: "금",
        토: "수",
        금: "목",
        수: "화"
    },
    DO = {
        목: {
            personality: "인자하고 창의적, 성장 지향적",
            career: "교육·예술·의료·기획",
            advice: "유연성을 기르고 협력하세요"
        },
        화: {
            personality: "열정적, 사교적, 직관이 강함",
            career: "방송·요식업·영업·예술",
            advice: "충동을 조절하고 지속력을 키우세요"
        },
        토: {
            personality: "신뢰감 있고 안정적, 중재자 기질",
            career: "부동산·농업·행정·중개업",
            advice: "변화를 두려워하지 마세요"
        },
        금: {
            personality: "원칙적, 결단력 있고 의리 강함",
            career: "법조·군경·금융·IT",
            advice: "고집보다 소통을 늘려보세요"
        },
        수: {
            personality: "지혜롭고 적응력이 높음, 철학적",
            career: "연구·철학·여행·물류",
            advice: "방향성을 명확히 정하세요"
        }
    };

function FO(e) {
    const t = ((e - 4) % 10 + 10) % 10,
        r = ((e - 4) % 12 + 12) % 12;
    return {
        cg: t,
        jj: r
    }
}

function IO(e, t) {
    const r = t === 1 || t === 12 ? 1 : t,
        n = ((e - 4) % 10 + 10) % 10,
        s = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0][n],
        a = (r - 2 + 12) % 12;
    return {
        cg: (s + a) % 10,
        jj: r
    }
}

function PO(e, t, r) {
    const n = new Date(1900, 0, 1),
        s = new Date(e, t - 1, r),
        a = Math.round((s.getTime() - n.getTime()) / 864e5),
        i = (a % 10 + 10) % 10,
        l = ((a + 11) % 12 + 12) % 12;
    return {
        cg: i,
        jj: l
    }
}

function MO(e, t) {
    const r = t === 23 ? 0 : Math.floor((t + 1) / 2) % 12;
    return {
        cg: ([0, 2, 4, 6, 8, 0, 2, 4, 6, 8][e] + r) % 10,
        jj: r
    }
}

function LO(e) {
    const t = {
        목: 0,
        화: 0,
        토: 0,
        금: 0,
        수: 0
    };
    for (const {
            cg: i,
            jj: l
        }
        of e) t[Nd[i]]++, t[p2[l]]++;
    const r = Object.keys(t).sort((i, l) => t[l] - t[i]),
        n = r[0],
        s = r[r.length - 1],
        a = RO[s];
    return {
        count: t,
        dominant: n,
        weak: s,
        yongshin: a
    }
}
const BO = {
        목: ["새로운 시작에 좋은 기운이 흐릅니다. 계획한 일을 실행에 옮기세요.", "창의력이 넘치는 날. 아이디어를 메모해두면 좋습니다.", "성장과 변화의 기운이 강합니다. 배움에 투자하는 것이 길합니다."],
        화: ["열정이 넘치는 하루. 사람들을 만나고 소통하면 길합니다.", "직관이 강해지는 날. 마음이 이끄는 대로 과감히 나아가세요.", "밝고 따뜻한 기운이 주변을 감쌉니다. 표현을 아끼지 마세요."],
        토: ["안정과 신뢰의 기운이 흐릅니다. 꾸준함이 결실을 맺습니다.", "중심을 잡고 나아가는 날. 중요한 결정은 신중히 하세요.", "믿을 수 있는 사람과의 인연이 빛나는 날입니다."],
        금: ["의지력이 강해지는 날. 오래 미뤄온 일을 마무리하기 좋습니다.", "원칙을 지키면 주변의 신뢰를 얻습니다. 정직이 최선입니다.", "결단의 순간이 찾아옵니다. 명확한 선택이 도움이 됩니다."],
        수: ["지혜로운 판단이 빛나는 날. 깊이 생각한 후 행동하세요.", "적응력이 높아지는 날. 변화하는 상황에 유연하게 대처하세요.", "내면의 목소리에 귀 기울이세요. 직관이 정답을 알고 있습니다."]
    },
    UO = {
        목: ["초록", "청록", "연두"],
        화: ["빨강", "주황", "보라"],
        토: ["노랑", "황토", "베이지"],
        금: ["흰색", "은색", "회색"],
        수: ["검정", "파랑", "남색"]
    };

function J0(e) {
    let t = e >>> 0;
    return () => (t = Math.imul(t ^ t >>> 17, 73244475), t = Math.imul(t ^ t >>> 13, 2603236959), t ^= t >>> 16, (t >>> 0) / 4294967295)
}

function Q0(e) {
    let t = 2166136261;
    for (let r = 0; r < e.length; r++) t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
    return t >>> 0
}

function $O({
    count: e
}) {
    return o.jsx("div", {
        className: "flex gap-0.5",
        children: [1, 2, 3, 4, 5].map(t => o.jsx("span", {
            className: "text-sm " + (t <= e ? "text-yellow-400" : "text-white/20"),
            children: "★"
        }, t))
    })
}
const S1 = [{
    key: "overall",
    label: "전체운",
    emoji: "🌟"
}, {
    key: "love",
    label: "애정운",
    emoji: "💕"
}, {
    key: "money",
    label: "금전운",
    emoji: "💰"
}, {
    key: "health",
    label: "건강운",
    emoji: "💪"
}, {
    key: "work",
    label: "직장운",
    emoji: "💼"
}];

const XJ_T = {
    비겁: {
        core: "비겁(比劫)의 기운이 강하게 들어온다. 자아와 주체성이 솟구쳐 경쟁심과 추진력이 커지는 반면, 고집과 독선으로 흐르기 쉽다. 재물을 두고 다투는 형국이니 동업·금전 거래에는 신중해야 한다.",
        biz: "오늘은 재성을 극하는 날이다. 공동 투자·동업 제안·보증은 단호히 보류하라. 다만 혼자 힘으로 밀어붙이는 협상이나 단독 결정에는 힘이 실린다. 지출 관리에 특히 유의할 것.",
        rel: "주변과 기 싸움이 벌어지기 쉽다. 형제·동료·친구와의 사소한 언쟁이 자존심 대결로 번질 수 있으니, 오늘만큼은 한발 물러서는 것이 이기는 길이다.",
        motto: "오늘의 적은 밖이 아니라 내 고집이다 — 양보가 곧 실리다."
    },
    식상: {
        core: "식상(食傷)의 기운이 유입된다. 표현력과 아이디어가 샘솟고 몸이 먼저 움직이는 날이다. 다만 상관의 기운이 짙어지면 윗사람에 대한 반발심과 설화(舌禍)를 부르니 말을 아껴야 한다.",
        biz: "기획·제안·발표에는 더없이 좋은 날이다. 새로운 수익 구조를 구상하기에 길하나, 관성을 거스르는 기운이라 상사·기관을 상대로 한 무리한 승부수는 금물이다.",
        rel: "재치 있는 언변이 빛나지만, 지나치면 가벼워 보인다. 특히 직장 상사나 어른 앞에서의 직언은 오늘은 화를 부른다. 들어주는 비율을 7, 말하는 비율을 3으로 지켜라.",
        motto: "혀끝의 재주를 아끼는 것이 오늘 최고의 재테크다."
    },
    재성: {
        core: "재성(財星)의 기운이 문을 두드린다. 재물과 성과에 대한 감각이 예민해지고 현실적 판단력이 서는 날이다. 다만 일간이 신약하면 재다신약(財多身弱)의 형국이 되어 욕심이 화를 부른다.",
        biz: "수익과 직결되는 실무·계약 검토에 길하다. 가격 협상, 미수금 회수, 자산 점검에 좋은 기운이나, '확실해 보이는' 단기 투자 제안일수록 오늘은 한 번 더 의심하라. 큰돈은 움직이지 말 것.",
        rel: "이해관계가 얽힌 만남이 많아진다. 베풀면 배로 돌아오는 날이니 밥값을 아끼지 마라. 단, 돈 문제로 가족과 얼굴 붉힐 수 있으니 가정 내 금전 이야기는 피하라.",
        motto: "작은 이익에 밝은 자가 큰 이익을 놓친다 — 오늘은 길게 보라."
    },
    관성: {
        core: "관성(官星)의 기운이 일간을 누른다. 책임과 규율의 무게가 어깨에 실리는 날로, 편관(칠살)이 동하면 압박감과 돌발 변수가 생긴다. 원칙을 지키는 자에게는 오히려 명예가 따른다.",
        biz: "관(官)은 곧 직장과 명예다. 인사·평가·관공서 업무에 중요한 하루이니 서류와 절차를 빈틈없이 하라. 규정을 어기는 편법은 오늘 반드시 꼬리를 밟힌다. 신규 투자보다 리스크 관리가 우선이다.",
        rel: "윗사람의 눈에 띄는 날이다. 성실함을 보이면 신임을 얻지만, 지각·실언 하나도 크게 기록된다. 아랫사람에게는 권위보다 절제된 언행으로 대하라.",
        motto: "오늘은 튀는 자가 아니라 바른 자가 이긴다."
    },
    인성: {
        core: "인성(印星)의 기운이 일간을 생조한다. 학문·문서·직관의 별이 비추니 머리가 맑고 흡수력이 좋아지는 날이다. 다만 생각이 많아져 실행이 늦어지는 것이 병이다.",
        biz: "계약서·문서에 도장 찍기 좋은 기운이다. 배움과 자격, 인허가 관련 일에 길하다. 단 인성이 식상을 누르니 새 아이디어의 출시·공개는 하루 미루고, 검토와 보완에 집중하라.",
        rel: "귀인의 조언이 들어오는 날이다. 어른·스승·선배의 말에 답이 있으니 자존심 세우지 말고 물어라. 베푸는 것보다 받아들이는 자세가 복을 부른다.",
        motto: "오늘 얻은 지식 한 줄이 내일의 재물 한 짐보다 무겁다."
    }
}, XJ_H = {
    목: "간담(肝膽)과 신경계",
    화: "심장·혈압과 눈",
    토: "위장·소화기",
    금: "폐·호흡기와 피부",
    수: "신장·방광과 뼈"
};

function XJ9(c, l) {
    const D = new Date(l),
        td = PO(D.getFullYear(), D.getMonth() + 1, D.getDate()),
        di = c.day.cg,
        de = Nd[di],
        dy = CO[di],
        te = Nd[td.cg],
        ty = CO[td.cg],
        tb = AO[td.jj],
        be = p2[td.jj];
    let grp, ss;
    te === de ? (grp = "비겁", ss = ty === dy ? "비견" : "겁재") : RO[de] === te ? (grp = "식상", ss = ty === dy ? "식신" : "상관") : OO[de] === te ? (grp = "재성", ss = ty === dy ? "편재" : "정재") : OO[te] === de ? (grp = "관성", ss = ty === dy ? "편관" : "정관") : (grp = "인성", ss = ty === dy ? "편인" : "정인");
    const CH = { 자: "오", 축: "미", 인: "신", 묘: "유", 진: "술", 사: "해", 오: "자", 미: "축", 신: "인", 유: "묘", 술: "진", 해: "사" },
        HP = { 자: "축", 축: "자", 인: "해", 해: "인", 묘: "술", 술: "묘", 진: "유", 유: "진", 사: "신", 신: "사", 오: "미", 미: "오" },
        HE = { 자: "미", 미: "자", 축: "오", 오: "축", 인: "사", 사: "인", 묘: "진", 진: "묘", 신: "해", 해: "신", 유: "술", 술: "유" },
        HY = [["인", "사"], ["사", "신"], ["인", "신"], ["축", "술"], ["술", "미"], ["축", "미"], ["자", "묘"]],
        ps = c.hour ? [c.year, c.month, c.day, c.hour] : [c.year, c.month, c.day],
        pn = ["연지", "월지", "일지", "시지"],
        rel = [];
    ps.forEach((x, i) => {
        const b = AO[x.jj];
        CH[tb] === b ? rel.push(`${pn[i]} ${b}와 오늘의 ${tb}가 충(沖)을 이룬다`) : HP[tb] === b ? rel.push(`${pn[i]} ${b}와 오늘의 ${tb}가 합(合)을 이룬다`) : HE[tb] === b ? rel.push(`${pn[i]} ${b}와 오늘의 ${tb}가 해(害)를 이룬다`) : (HY.some(q => q.includes(tb) && q.includes(b) && tb !== b) || tb === b && ["진", "오", "유", "해"].includes(tb)) && rel.push(`${pn[i]} ${b}와 오늘의 ${tb}가 형(刑)을 이룬다`)
    });
    const hasC = rel.some(x => x.includes("충")),
        hasH = rel.some(x => x.includes("합")),
        hasX = rel.some(x => x.includes("형") || x.includes("해")),
        rw = te === de ? `오늘의 천간 ${NO[td.cg]}(${te})은 일간 ${NO[di]}(${de})과 같은 ${de} 기운으로 어깨를 나란히 하는 형국` : RO[de] === te ? `일간 ${NO[di]}(${de})이 오늘의 천간 ${NO[td.cg]}(${te})을 생(生)하여 기운을 내어주는 형국` : OO[de] === te ? `일간 ${NO[di]}(${de})이 오늘의 천간 ${NO[td.cg]}(${te})을 극(剋)하여 재물을 취하려는 형국` : OO[te] === de ? `오늘의 천간 ${NO[td.cg]}(${te})이 일간 ${NO[di]}(${de})을 극(剋)하여 다스리려는 형국` : `오늘의 천간 ${NO[td.cg]}(${te})이 일간 ${NO[di]}(${de})을 생(生)하여 힘을 실어주는 형국`,
        T = XJ_T[grp];
    return {
        ss: ss,
        grp: grp,
        ilzin: `오늘의 일진은 ${NO[td.cg]}${tb}일, 천간은 ${te}(${ty}), 지지는 ${tb}(${be})다. ${rw}으로, 일간에게 ${ss}(${grp})이 되는 날이다. ` + (rel.length ? rel.join(", ") + ". " + (hasC ? "충이 동하면 이동·변동수가 크고 예정에 없던 일이 끼어드니 일정에 여유를 두어라. " : "") + (hasH ? "합이 드니 인연과 협력에는 순풍이 분다. " : "") + (hasX ? "형·해가 걸리니 구설과 관재, 사소한 마찰을 조심하라. " : "") : "지지 간의 형충파해는 크게 동하지 않아 바탕은 평온한 날이다."),
        core: T.core,
        biz: T.biz + (hasC ? " 오늘은 충이 겹치니 계약 서명·큰 이동은 가급적 오전을 피하라." : ""),
        rel2: T.rel + (hasH ? " 합의 기운이 있어 오래 못 본 인연이나 귀인의 연락이 닿기 쉽다." : ""),
        hp: `오늘의 지지 ${tb}는 ${be} 기운이라 ${XJ_H[be]}에 부담이 실린다. ` + (be === c.ohaeng.weak ? `사주에서 약한 ${c.ohaeng.weak} 기운을 건드리는 날이니 무리한 일정은 금물이다. ` : "") + (hasC || hasX ? "충·형이 동하는 날은 낙상·접촉 사고 등 잔사고 수가 있으니 운전과 계단을 조심하라." : "과로만 피하면 컨디션은 무난하다."),
        motto: T.motto
    }
}

const NM_CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
    NM_CHO_S = [2, 4, 2, 3, 6, 5, 4, 4, 8, 2, 4, 1, 3, 6, 4, 3, 4, 4, 3],
    NM_JUNG_S = [2, 3, 3, 4, 2, 3, 3, 4, 2, 4, 5, 3, 3, 2, 4, 5, 3, 3, 1, 2, 1],
    NM_CHO_E = ["목", "목", "화", "화", "화", "화", "수", "수", "수", "금", "금", "토", "금", "금", "금", "목", "화", "수", "토"],
    NM_GOOD = {
        1: "태초격", 3: "명예격", 5: "성공격", 6: "계승격", 7: "독립격", 8: "발달격", 11: "신성격", 13: "지모격", 15: "통솔격", 16: "덕망격", 17: "건창격", 18: "발전격", 21: "두령격", 23: "공명격", 24: "입신격", 25: "안전격", 29: "성공격", 31: "융창격", 32: "순풍격", 33: "승천격", 35: "평안격", 37: "인덕격", 39: "장성격", 41: "대공격", 45: "현달격", 47: "출세격", 48: "유덕격", 52: "승진격", 57: "노력격", 61: "영화격", 63: "순성격", 65: "흥가격", 67: "천복격", 68: "명지격", 81: "환원격"
    },
    NM_HALF = {
        27: "대인격", 30: "부몽격", 38: "문예격", 51: "길흉격", 53: "내허격", 58: "선곤격", 71: "만달격", 73: "평복격", 75: "정수격"
    },
    NM_BAD = {
        2: "분리격", 4: "부정격", 9: "궁박격", 10: "공허격", 12: "박약격", 14: "이산격", 19: "고난격", 20: "허망격", 22: "중절격", 26: "변괴격", 28: "파란격", 34: "파멸격", 36: "의협격", 40: "무상격", 42: "고행격", 43: "미혹격", 44: "마장격", 46: "미운격", 49: "은퇴격", 50: "부몽격", 54: "무공격", 55: "미달격", 56: "한탄격", 59: "실의격", 60: "동요격", 62: "고독격", 64: "봉상격", 66: "우매격", 69: "종말격", 70: "적막격", 72: "상반격", 74: "우매격", 76: "선곤격", 77: "전후격", 78: "선길격", 79: "종극격", 80: "종결격"
    };

function NM_D(e) {
    const t = e.charCodeAt(0) - 44032;
    if (t < 0 || t > 11171) return null;
    const r = Math.floor(t / 588),
        n = Math.floor(t % 588 / 28),
        s = t % 28,
        a = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
        i = { "": 0, "ㄱ": 2, "ㄲ": 4, "ㄳ": 4, "ㄴ": 2, "ㄵ": 5, "ㄶ": 5, "ㄷ": 3, "ㄹ": 5, "ㄺ": 7, "ㄻ": 9, "ㄼ": 9, "ㄽ": 7, "ㄾ": 9, "ㄿ": 9, "ㅀ": 8, "ㅁ": 4, "ㅂ": 4, "ㅄ": 6, "ㅅ": 2, "ㅆ": 4, "ㅇ": 1, "ㅈ": 3, "ㅊ": 4, "ㅋ": 3, "ㅌ": 4, "ㅍ": 4, "ㅎ": 3 };
    return {
        cho: NM_CHO[r],
        el: NM_CHO_E[r],
        strokes: NM_CHO_S[r] + NM_JUNG_S[n] + i[a[s]]
    }
}

function NM_81(e) {
    let t = e;
    for (; t > 81;) t -= 80;
    return NM_GOOD[t] ? { n: t, g: "길", t: NM_GOOD[t] } : NM_HALF[t] ? { n: t, g: "반길", t: NM_HALF[t] } : { n: t, g: "흉", t: NM_BAD[t] ?? "험난격" }
}

function NM_A(e, t, r) {
    const n = [...e.replace(/\s/g, "")];
    if (n.length < 2) return null;
    const s = n.map(NM_D);
    if (s.some(v => !v)) return null;
    const a = t && t.length === n.length && t.every(v => v > 0) ? t : s.map(v => v.strokes),
        i = a[0],
        l = a.slice(1),
        c = l.reduce((v, g) => v + g, 0),
        u = NM_81(c),
        h = NM_81(i + l[0]),
        d = NM_81(i + (l.length > 1 ? l[l.length - 1] : 1)),
        f = NM_81(a.reduce((v, g) => v + g, 0)),
        x = s.map(v => v.el),
        p = [];
    for (let v = 0; v < x.length - 1; v++) {
        const g = x[v], _ = x[v + 1];
        RO[g] === _ || RO[_] === g ? p.push({ a: g, b: _, r: "상생(相生)", g: "길" }) : g === _ ? p.push({ a: g, b: _, r: "비화(比和)", g: "중" }) : p.push({ a: g, b: _, r: "상극(相剋)", g: "흉" })
    }
    const m = [u, h, d, f].filter(v => v.g === "길").length,
        y = p.filter(v => v.g === "길").length,
        w = Math.max(1, Math.min(5, 1 + m + (y >= p.length ? 1 : 0) - (p.some(v => v.g === "흉") ? 1 : 0)));
    let b = "";
    if (r) {
        const v = r.ohaeng.yongshin, g = r.ohaeng.weak, _ = r.ohaeng.dominant;
        b = x.includes(v) ? `이름의 소리오행에 사주의 용신(用神)인 ${v} 기운이 들어 있다. 이름이 사주의 허한 곳을 메워주는 좋은 배합이니, 이름을 불러줄수록 부족한 기운이 채워지는 형국이다. ` : x.includes(g) ? `이름의 소리오행에 사주에서 가장 약한 ${g} 기운이 담겨 있다. 이름이 사주의 결핍을 직접 보완하니 나쁘지 않은 배합이다. ` : `이름의 소리오행(${x.join("·")})이 사주의 용신 ${v} 기운을 직접 품고 있지는 않다. 다만 이름은 부르는 소리로 작용하니, 호(號)나 예명에 ${v} 기운의 초성을 쓰면 부족함을 채울 수 있다. `;
        x.includes(_) && (b += `한편 이름에 사주에서 이미 왕한 ${_} 기운이 겹치니, 강한 것이 더 강해지는 배합이라 매사 과유불급을 새겨야 한다.`)
    }
    return {
        chars: n.map((v, g) => ({ ch: v, cho: s[g].cho, el: x[g], st: a[g] })),
        won: u, hyung: h, yi: d, jung: f, flow: p, score: w, saju: b,
        usedHanja: a !== s.map(v => v.strokes)
    }
}
function zO() {
    const e = (() => {
            try {
                return JSON.parse(localStorage.getItem("fortune-birth") ?? "null")
            } catch {
                return null
            }
        })(),
        [t, r] = O.useState(e ?? {
            year: "",
            month: "",
            day: "",
            hour: ""
        }),
        [n, s] = O.useState(!e),
        [a, i] = O.useState("today"),
        [nm, nmS] = O.useState(() => {
            try {
                return JSON.parse(localStorage.getItem("fortune-name") ?? "null") ?? {
                    n: "",
                    h: "",
                    s: ""
                }
            } catch {
                return {
                    n: "",
                    h: "",
                    s: ""
                }
            }
        }),
        l = new Date().toISOString().slice(0, 10),
        c = O.useMemo(() => {
            const x = Number(t.year),
                p = Number(t.month),
                m = Number(t.day);
            if (!x || !p || !m) return null;
            const y = FO(x),
                w = IO(x, p),
                v = PO(x, p, m),
                g = t.hour !== "" ? MO(v.cg, Number(t.hour)) : null,
                k = LO(g ? [y, w, v, g] : [y, w, v]);
            return {
                year: y,
                month: w,
                day: v,
                hour: g,
                ohaeng: k
            }
        }, [t]),
        u = O.useMemo(() => {
            if (!c) return null;
            const x = Q0(t.year + t.month + t.day + t.hour + l),
                p = J0(x),
                m = g => Math.min(5, Math.floor(p() * (5 - g + 1)) + g),
                y = c.ohaeng.dominant,
                w = BO[y],
                v = UO[y];
            return {
                overall: m(1),
                love: m(1),
                money: m(1),
                health: m(2),
                work: m(1),
                message: w[Math.floor(p() * w.length)],
                luckyColor: v[Math.floor(p() * v.length)],
                luckyNumber: Math.floor(p() * 30) + 1
            }
        }, [c, l, t]),
        h = O.useMemo(() => {
            if (!c) return null;
            const x = new Date,
                p = x.getFullYear(),
                m = x.getMonth() + 1,
                y = new Date(p, m, 0).getDate(),
                w = {
                    1: "목",
                    2: "목",
                    3: "화",
                    4: "화",
                    5: "토",
                    6: "토",
                    7: "금",
                    8: "금",
                    9: "수",
                    10: "수",
                    11: "목",
                    12: "수"
                },
                v = c.ohaeng.dominant,
                g = [];
            for (let R = 1; R <= 12; R++) {
                const K = w[R];
                OO[K] === v && g.push(R)
            }
            const _ = Q0(t.year + t.month + t.day + t.hour + String(p)),
                k = J0(_);
            for (; g.length < 2;) {
                const R = 1 + Math.floor(k() * 12);
                g.includes(R) || g.push(R)
            }
            g.sort((R, K) => R - K);
            const E = g.slice(0, 3),
                b = Q0(t.year + t.month + t.day + t.hour + String(p) + String(m)),
                T = J0(b),
                A = [],
                H = 3 + Math.floor(T() * 3);
            let F = 0;
            for (; A.length < H && F < 200;) {
                F++;
                const R = 1 + Math.floor(T() * y);
                A.includes(R) || A.push(R)
            }
            return A.sort((R, K) => R - K), {
                cautionMonths: E,
                luckyDays: A,
                month: m,
                year: p
            }
        }, [c, t]);

    function d() {
        localStorage.setItem("fortune-birth", JSON.stringify(t)), s(!1)
    }
    const f = "bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-yellow-400 w-full";
    return o.jsxs("div", {
        className: "flex flex-col h-full",
        children: [o.jsxs("div", {
            className: "px-3 py-2 bg-black/20 border-b border-white/10 flex-shrink-0 flex items-center justify-between",
            children: [o.jsxs("div", {
                children: [o.jsx("span", {
                    className: "text-yellow-300 font-medium text-sm",
                    children: DDBTR("🔮 운세·사주")
                }), o.jsx("p", {
                    className: "text-white/40 text-xs",
                    children: l
                })]
            }), o.jsx("button", {
                onClick: () => s(x => !x),
                className: "text-white/40 hover:text-white text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/15",
                children: n ? "← 결과 보기" : "정보 수정"
            })]
        }), n && o.jsxs("div", {
            className: "px-3 py-3 flex flex-col gap-3 flex-shrink-0",
            children: [o.jsx("p", {
                className: "text-white/60 text-xs",
                children: DDBTR("생년월일시를 입력하면 사주팔자와 음양오행을 분석합니다")
            }), o.jsxs("div", {
                className: "grid grid-cols-3 gap-2",
                children: [o.jsxs("div", {
                    children: [o.jsx("label", {
                        className: "text-white/50 text-xs mb-1 block",
                        children: DDBTR("년도")
                    }), o.jsx("input", {
                        type: "number",
                        placeholder: "1990",
                        id: "ddb-fo-y",
                        value: t.year,
                        onChange: x => {
                            const q9 = x.target.value.slice(0, 4);
                            r(p => ({
                                ...p,
                                year: q9
                            })), q9.length === 4 && setTimeout(() => {
                                var w9;
                                return (w9 = document.getElementById("ddb-fo-m")) == null ? void 0 : w9.focus()
                            }, 0)
                        },
                        className: f
                    })]
                }), o.jsxs("div", {
                    children: [o.jsx("label", {
                        className: "text-white/50 text-xs mb-1 block",
                        children: DDBTR("월")
                    }), o.jsx("input", {
                        type: "number",
                        placeholder: "1",
                        min: 1,
                        max: 12,
                        id: "ddb-fo-m",
                        value: t.month,
                        onChange: x => {
                            const q9 = x.target.value.slice(0, 2);
                            r(p => ({
                                ...p,
                                month: q9
                            })), q9.length === 2 && setTimeout(() => {
                                var w9;
                                return (w9 = document.getElementById("ddb-fo-d")) == null ? void 0 : w9.focus()
                            }, 0)
                        },
                        className: f
                    })]
                }), o.jsxs("div", {
                    children: [o.jsx("label", {
                        className: "text-white/50 text-xs mb-1 block",
                        children: DDBTR("일")
                    }), o.jsx("input", {
                        type: "number",
                        placeholder: "1",
                        min: 1,
                        max: 31,
                        id: "ddb-fo-d",
                        value: t.day,
                        onChange: x => {
                            const q9 = x.target.value.slice(0, 2);
                            r(p => ({
                                ...p,
                                day: q9
                            })), q9.length === 2 && setTimeout(() => {
                                var w9;
                                return (w9 = document.getElementById("ddb-fo-h")) == null ? void 0 : w9.focus()
                            }, 0)
                        },
                        className: f
                    })]
                })]
            }), o.jsxs("div", {
                children: [o.jsx("label", {
                    className: "text-white/50 text-xs mb-1 block",
                    children: DDBTR("태어난 시간 (선택 — 시주 계산에 사용)")
                }), o.jsxs("select", {
                    id: "ddb-fo-h",
                    value: t.hour,
                    onChange: x => r(p => ({
                        ...p,
                        hour: x.target.value
                    })),
                    className: "bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-yellow-400 w-full",
                    children: [o.jsx("option", {
                        value: "",
                        children: DDBTR("선택 안함")
                    }), Array.from({
                        length: 24
                    }, (x, p) => o.jsxs("option", {
                        value: String(p),
                        children: [String(p).padStart(2, "0"), "시"]
                    }, p))]
                })]
            }), o.jsx("button", {
                onClick: d,
                disabled: !t.year || !t.month || !t.day,
                className: "w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg text-sm hover:bg-yellow-400 disabled:opacity-40 transition-colors",
                children: DDBTR("분석하기 ✨")
            })]
        }), !n && c && o.jsxs(o.Fragment, {
            children: [o.jsx("div", {
                className: "flex gap-1 px-3 py-2 border-b border-white/10 flex-shrink-0",
                children: ["today", "saju", "name"].map(x => o.jsx("button", {
                    onClick: () => i(x),
                    className: "flex-1 py-1.5 text-xs font-medium rounded transition-colors " + (a === x ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40" : "text-white/40 hover:text-white/70"),
                    children: x === "today" ? "🌟 오늘 운세" : x === "saju" ? "☯ 사주·오행" : "📛 이름 풀이"
                }, x))
            }), o.jsxs("div", {
                className: "flex-1 overflow-y-auto thin-scroll",
                children: [a === "today" && u && o.jsxs("div", {
                    className: "flex flex-col gap-2 px-3 py-3",
                    children: [o.jsxs("div", {
                        className: "bg-yellow-400/10 border border-yellow-400/30 rounded-xl px-3 py-2 flex items-center gap-3",
                        children: [o.jsx("span", {
                            className: "text-2xl",
                            children: cc[c.ohaeng.dominant]
                        }), o.jsxs("div", {
                            children: [o.jsxs("p", {
                                className: "text-yellow-300 text-xs font-medium",
                                children: [jO[c.year.jj], "띠 · ", Nd[c.day.cg], "일간"]
                            }), o.jsxs("p", {
                                className: "text-white/40 text-[10px]",
                                children: ["주오행: ", c.ohaeng.dominant, " 기운이 강함"]
                            })]
                        })]
                    }), o.jsx("div", {
                        className: "bg-white/5 rounded-xl px-3 py-2.5",
                        children: o.jsx("p", {
                            className: "text-white/80 text-xs leading-relaxed",
                            children: u.message
                        })
                    }), (() => {
                        const x = XJ9(c, l),
                            p = (m, y) => o.jsxs("div", {
                                children: [o.jsx("p", {
                                    className: "text-yellow-200/80 text-[10px] font-bold mb-0.5",
                                    children: m
                                }), o.jsx("p", {
                                    className: "text-white/70 text-[11px] leading-relaxed",
                                    children: y
                                })]
                            }, m);
                        return o.jsxs("div", {
                            className: "bg-gradient-to-b from-amber-500/10 to-white/5 border border-amber-400/20 rounded-xl px-3 py-2.5 flex flex-col gap-2",
                            children: [o.jsx("p", {
                                className: "text-amber-300 text-[11px] font-bold",
                                children: DDBTR("📜 원장 종합 분석 — 오행 생극(生剋)으로 본 오늘")
                            }), p("1. 일진(日辰) 분석", x.ilzin), p(`2. 핵심 기운 — ${x.ss}(${x.grp})`, x.core), p("3. 비즈니스·재물", x.biz), p("4. 인간관계·처세", x.rel2), p("5. 건강·컨디션", x.hp), o.jsxs("p", {
                                className: "text-amber-200 text-[11px] font-semibold border-t border-amber-400/20 pt-2",
                                children: ["💬 오늘의 처세 한 마디 — ", x.motto]
                            })]
                        })
                    })(), o.jsx("div", {
                        className: "bg-white/5 rounded-xl overflow-hidden",
                        children: S1.map((x, p) => o.jsxs("div", {
                            className: "flex items-center justify-between px-3 py-1.5 " + (p < S1.length - 1 ? "border-b border-white/5" : ""),
                            children: [o.jsxs("span", {
                                className: "text-white/70 text-xs",
                                children: [x.emoji, " ", x.label]
                            }), o.jsx($O, {
                                count: u[x.key]
                            })]
                        }, x.key))
                    }), o.jsxs("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [o.jsxs("div", {
                            className: "bg-white/5 rounded-xl p-2 text-center",
                            children: [o.jsx("p", {
                                className: "text-white/40 text-[10px]",
                                children: DDBTR("행운 색")
                            }), o.jsxs("p", {
                                className: "text-white/80 text-xs font-medium mt-0.5",
                                children: ["🎨 ", u.luckyColor]
                            })]
                        }), o.jsxs("div", {
                            className: "bg-white/5 rounded-xl p-2 text-center",
                            children: [o.jsx("p", {
                                className: "text-white/40 text-[10px]",
                                children: DDBTR("행운 숫자")
                            }), o.jsxs("p", {
                                className: "text-white/80 text-xs font-medium mt-0.5",
                                children: ["🔢 ", u.luckyNumber]
                            })]
                        })]
                    }), h && o.jsxs("div", {
                        className: "bg-red-500/10 border border-red-500/20 rounded-xl p-2.5",
                        children: [o.jsxs("p", {
                            className: "text-red-300/80 text-[10px] font-medium mb-1.5",
                            children: ["⚠️ ", h.year, "년 주의 시기"]
                        }), o.jsx("div", {
                            className: "flex gap-1.5 flex-wrap",
                            children: h.cautionMonths.map(x => o.jsxs("span", {
                                className: "text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-200/80",
                                children: [x, "월"]
                            }, x))
                        }), o.jsx("p", {
                            className: "text-white/30 text-[9px] mt-1.5",
                            children: DDBTR("이 시기엔 중요한 결정을 서두르지 마세요")
                        })]
                    }), h && o.jsxs("div", {
                        className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5",
                        children: [o.jsxs("p", {
                            className: "text-emerald-300/80 text-[10px] font-medium mb-1.5",
                            children: ["✨ ", h.month, "월 길일 (吉日)"]
                        }), o.jsx("div", {
                            className: "flex gap-1.5 flex-wrap",
                            children: h.luckyDays.map(x => o.jsxs("span", {
                                className: "text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200/80",
                                children: [x, "일"]
                            }, x))
                        }), o.jsx("p", {
                            className: "text-white/30 text-[9px] mt-1.5",
                            children: DDBTR("중요한 약속·새 시작에 좋은 날입니다")
                        })]
                    }), o.jsx("p", {
                        className: "text-white/20 text-[10px] text-center",
                        children: DDBTR("음양오행 이론 기반 · 재미로 보는 운세입니다 🙂")
                    })]
                }), a === "name" && (() => {
                    const x = nm.s.trim() ? nm.s.split(/[,\s]+/).map(Number).filter(Boolean) : null,
                        p = nm.n.trim().length >= 2 ? NM_A(nm.n.trim(), x, c) : null,
                        m = (y, w, v) => o.jsxs("div", {
                            className: "flex items-center justify-between px-3 py-1.5 " + (v ? "border-b border-white/5" : ""),
                            children: [o.jsx("span", {
                                className: "text-white/70 text-xs",
                                children: y
                            }), o.jsxs("span", {
                                className: "text-[11px] font-medium " + (w.g === "길" ? "text-emerald-300" : w.g === "반길" ? "text-amber-300" : "text-rose-300"),
                                children: [w.n, "수 · ", w.t, " (", w.g, ")"]
                            })]
                        }, y);
                    return o.jsxs("div", {
                        className: "flex flex-col gap-2 px-3 py-3",
                        children: [o.jsxs("div", {
                            className: "bg-white/5 rounded-xl px-3 py-2.5 flex flex-col gap-1.5",
                            children: [o.jsx("p", {
                                className: "text-white/50 text-[10px]",
                                children: DDBTR("이름 (한글, 성 포함)")
                            }), o.jsx("input", {
                                value: nm.n,
                                onChange: y => {
                                    const w = {
                                        ...nm,
                                        n: y.target.value
                                    };
                                    nmS(w), localStorage.setItem("fortune-name", JSON.stringify(w))
                                },
                                placeholder: DDBTR("예: 홍길동"),
                                className: "bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-yellow-400"
                            }), o.jsx("p", {
                                className: "text-white/50 text-[10px]",
                                children: DDBTR("한자 표기 (선택)")
                            }), o.jsx("input", {
                                value: nm.h,
                                onChange: y => {
                                    const w = {
                                        ...nm,
                                        h: y.target.value
                                    };
                                    nmS(w), localStorage.setItem("fortune-name", JSON.stringify(w))
                                },
                                placeholder: DDBTR("예: 洪吉童"),
                                className: "bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-yellow-400"
                            }), o.jsx("p", {
                                className: "text-white/50 text-[10px]",
                                children: DDBTR("한자 획수 (선택 — 글자별 획수를 쉼표로. 비우면 한글 획수로 계산)")
                            }), o.jsx("input", {
                                value: nm.s,
                                onChange: y => {
                                    const w = {
                                        ...nm,
                                        s: y.target.value
                                    };
                                    nmS(w), localStorage.setItem("fortune-name", JSON.stringify(w))
                                },
                                placeholder: DDBTR("예: 10, 6, 12"),
                                className: "bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-yellow-400"
                            })]
                        }), !p && o.jsx("p", {
                            className: "text-white/30 text-xs text-center py-4",
                            children: DDBTR("성을 포함한 한글 이름을 두 글자 이상 입력하세요")
                        }), p && o.jsxs(o.Fragment, {
                            children: [o.jsxs("div", {
                                className: "bg-yellow-400/10 border border-yellow-400/30 rounded-xl px-3 py-2 flex items-center gap-3",
                                children: [o.jsx("div", {
                                    className: "flex gap-1.5",
                                    children: p.chars.map((y, w) => o.jsxs("div", {
                                        className: "flex flex-col items-center bg-white/10 rounded-lg px-2 py-1",
                                        children: [o.jsxs("span", {
                                            className: "text-white text-sm font-bold",
                                            children: [y.ch, nm.h.trim().length === p.chars.length ? `(${[...nm.h.trim()][w]})` : ""]
                                        }), o.jsxs("span", {
                                            className: "text-[9px]",
                                            style: {
                                                color: ys[y.el]
                                            },
                                            children: [cc[y.el], y.el, " · ", y.st, "획"]
                                        })]
                                    }, w))
                                }), o.jsx($O, {
                                    count: p.score
                                })]
                            }), o.jsxs("div", {
                                className: "bg-white/5 rounded-xl overflow-hidden",
                                children: [m("원격(元格) · 초년운", p.won, !0), m("형격(亨格) · 중년·주운", p.hyung, !0), m("이격(利格) · 대인·말년", p.yi, !0), m("정격(貞格) · 총운", p.jung, !1)]
                            }), o.jsxs("div", {
                                className: "bg-white/5 rounded-xl px-3 py-2.5",
                                children: [o.jsx("p", {
                                    className: "text-yellow-200/80 text-[10px] font-bold mb-1",
                                    children: DDBTR("소리오행 흐름")
                                }), o.jsx("p", {
                                    className: "text-white/70 text-[11px] leading-relaxed",
                                    children: p.flow.map(y => `${y.a}→${y.b} ${y.r}${y.g==="길"?"으로 기운이 순행하고":y.g==="중"?"로 기운이 나란하며":"으로 기운이 부딪히고"}`).join(", ") + "있다. " + (p.flow.every(y => y.g !== "흉") ? "소리의 배합이 서로를 살리는 구조라 부를수록 복이 쌓이는 이름이다." : "상극이 끼어 있으니 이름만으로는 다소 마찰이 있는 배합이다. 아호(雅號)나 별칭으로 보완하는 것도 방법이다.")
                                })]
                            }), c && p.saju && o.jsxs("div", {
                                className: "bg-gradient-to-b from-amber-500/10 to-white/5 border border-amber-400/20 rounded-xl px-3 py-2.5",
                                children: [o.jsx("p", {
                                    className: "text-amber-300 text-[11px] font-bold mb-1",
                                    children: DDBTR("📜 사주와 이름의 궁합")
                                }), o.jsx("p", {
                                    className: "text-white/70 text-[11px] leading-relaxed",
                                    children: p.saju
                                })]
                            }), o.jsx("p", {
                                className: "text-white/25 text-[9px] leading-relaxed",
                                children: p.usedHanja ? "※ 입력하신 한자 획수(원획) 기준 81수리 계산입니다." : "※ 한글 획수 기준 계산입니다. 정통 성명학은 한자 원획 기준이므로, 한자 획수를 입력하면 더 정확합니다."
                            })]
                        })]
                    })
                })(), a === "saju" && o.jsxs("div", {
                    className: "flex flex-col gap-2 px-3 py-3",
                    children: [o.jsxs("div", {
                        children: [o.jsx("p", {
                            className: "text-white/50 text-[10px] mb-1.5",
                            children: DDBTR("사주팔자 (四柱八字)")
                        }), o.jsx("div", {
                            className: "grid gap-1 " + (c.hour ? "grid-cols-4" : "grid-cols-3"),
                            children: [{
                                label: "연주(年)",
                                pillar: c.year
                            }, {
                                label: "월주(月)",
                                pillar: c.month
                            }, {
                                label: "일주(日)",
                                pillar: c.day
                            }, ...c.hour ? [{
                                label: "시주(時)",
                                pillar: c.hour
                            }] : []].map(({
                                label: x,
                                pillar: p
                            }) => {
                                const m = Nd[p.cg],
                                    y = p2[p.jj];
                                return o.jsxs("div", {
                                    className: "bg-white/5 rounded-lg p-1.5 text-center border border-white/10",
                                    children: [o.jsx("p", {
                                        className: "text-white/30 text-[9px] mb-1",
                                        children: x
                                    }), o.jsxs("div", {
                                        className: "flex flex-col items-center gap-0.5",
                                        children: [o.jsx("span", {
                                            className: "text-sm font-bold",
                                            style: {
                                                color: ys[m]
                                            },
                                            children: NO[p.cg]
                                        }), o.jsxs("span", {
                                            className: "text-[10px] text-white/30",
                                            children: [m, "·", CO[p.cg]]
                                        }), o.jsx("div", {
                                            className: "w-full h-px bg-white/10 my-0.5"
                                        }), o.jsx("span", {
                                            className: "text-sm font-bold",
                                            style: {
                                                color: ys[y]
                                            },
                                            children: AO[p.jj]
                                        }), o.jsx("span", {
                                            className: "text-[10px] text-white/30",
                                            children: y
                                        })]
                                    })]
                                }, x)
                            })
                        }), !c.hour && o.jsx("p", {
                            className: "text-white/20 text-[9px] mt-1 text-center",
                            children: DDBTR("시간 미입력 시 시주 생략")
                        }), o.jsx("p", {
                            className: "text-white/20 text-[9px] mt-0.5 text-center",
                            children: DDBTR("※ 월주는 양력 근사 계산 (절기 미반영)")
                        })]
                    }), o.jsxs("div", {
                        children: [o.jsx("p", {
                            className: "text-white/50 text-[10px] mb-1.5",
                            children: DDBTR("오행 분포 (陰陽五行)")
                        }), o.jsx("div", {
                            className: "flex flex-col gap-1",
                            children: ["목", "화", "토", "금", "수"].map(x => {
                                const p = c.hour ? 8 : 6,
                                    m = c.ohaeng.count[x],
                                    y = Math.round(m / p * 100);
                                return o.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [o.jsxs("span", {
                                        className: "text-xs w-10 text-right",
                                        style: {
                                            color: ys[x]
                                        },
                                        children: [cc[x], " ", x]
                                    }), o.jsx("div", {
                                        className: "flex-1 h-3 bg-white/10 rounded-full overflow-hidden",
                                        children: o.jsx("div", {
                                            className: "h-full rounded-full transition-all",
                                            style: {
                                                width: `${y}%`,
                                                backgroundColor: ys[x],
                                                opacity: .8
                                            }
                                        })
                                    }), o.jsxs("span", {
                                        className: "text-[10px] text-white/40 w-6",
                                        children: [m, "개"]
                                    })]
                                }, x)
                            })
                        })]
                    }), o.jsx("div", {
                        className: "grid grid-cols-3 gap-1.5",
                        children: [{
                            label: "주 오행",
                            value: c.ohaeng.dominant,
                            desc: "가장 강한 기운"
                        }, {
                            label: "약 오행",
                            value: c.ohaeng.weak,
                            desc: "보충 필요"
                        }, {
                            label: "용신(用神)",
                            value: c.ohaeng.yongshin,
                            desc: "도움 되는 기운"
                        }].map(({
                            label: x,
                            value: p,
                            desc: m
                        }) => o.jsxs("div", {
                            className: "bg-white/5 rounded-lg p-2 text-center border border-white/10",
                            children: [o.jsx("p", {
                                className: "text-white/30 text-[9px]",
                                children: x
                            }), o.jsx("p", {
                                className: "text-lg",
                                style: {
                                    color: ys[p]
                                },
                                children: cc[p]
                            }), o.jsx("p", {
                                className: "text-xs font-bold",
                                style: {
                                    color: ys[p]
                                },
                                children: p
                            }), o.jsx("p", {
                                className: "text-[9px] text-white/25 mt-0.5",
                                children: m
                            })]
                        }, x))
                    }), (() => {
                        const x = c.ohaeng.dominant,
                            p = DO[x];
                        return o.jsxs("div", {
                            className: "bg-white/5 rounded-xl p-3 border-l-2",
                            style: {
                                borderColor: ys[x]
                            },
                            children: [o.jsxs("p", {
                                className: "text-xs font-medium mb-1",
                                style: {
                                    color: ys[x]
                                },
                                children: [cc[x], " ", x, "기운 사람의 특성"]
                            }), o.jsxs("p", {
                                className: "text-white/70 text-xs mb-1",
                                children: ["성격: ", p.personality]
                            }), o.jsxs("p", {
                                className: "text-white/70 text-xs mb-1",
                                children: ["적성: ", p.career]
                            }), o.jsxs("p", {
                                className: "text-white/50 text-xs",
                                children: ["조언: ", p.advice]
                            })]
                        })
                    })(), o.jsxs("div", {
                        className: "bg-white/5 rounded-xl p-2.5",
                        children: [o.jsx("p", {
                            className: "text-white/50 text-[10px] mb-1.5",
                            children: DDBTR("오행 상생·상극 (五行相生相剋)")
                        }), o.jsxs("div", {
                            className: "flex gap-3 text-[10px] text-white/40 flex-wrap",
                            children: [o.jsx("span", {
                                children: DDBTR("🔄 상생: 목→화→토→금→수→목")
                            }), o.jsx("span", {
                                children: DDBTR("⚡ 상극: 목↔토 화↔금 토↔수 금↔목 수↔화")
                            })]
                        })]
                    }), o.jsx("p", {
                        className: "text-white/20 text-[10px] text-center",
                        children: DDBTR("철학관 원리 기반 · 재미로 보는 사주입니다 🙏")
                    })]
                })]
            }, a)]
        }), !n && !c && o.jsx("div", {
            className: "flex items-center justify-center text-white/30 text-sm py-8",
            children: DDBTR("생년월일을 입력하고 분석하기를 눌러주세요")
        })]
    })
}

function Cd(e) {
    return /youtube\.com|youtu\.be/.test(e)
}

function HO(e) {
    const t = e.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/);
    return t ? t[1] : null
}

function T1(e) {
    return !isFinite(e) || isNaN(e) || e < 0 ? "0:00" : `${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,"0")}`
}
async function WO(e) {
    if (Cd(e)) try {
        const t = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(e)}&format=json`);
        if (t.ok) return (await t.json()).title ?? ""
    } catch {}
    try {
        const r = new URL(e).pathname.split("/").pop() ?? "";
        return decodeURIComponent(r).replace(/\.[^.]+$/, "").replace(/[-_+]/g, " ").trim() || ""
    } catch {
        return ""
    }
}
const VO = [.5, .6, .7, .8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2];

function P9() {
    if (window.__ddbPH) return window.__ddbPH;
    const e = document.createElement("div");
    e.id = "ddb-player-host", e.style.cssText = "position:fixed;left:-9999px;top:0;width:320px;height:180px;opacity:0;pointer-events:none;";
    const t = document.createElement("audio");
    e.appendChild(t);
    const r = document.createElement("div");
    return r.id = "yt-player-div", e.appendChild(r), document.body.appendChild(e), t.addEventListener("ended", () => {
        var n;
        (n = window.__ddbAH) == null || n.end()
    }), t.addEventListener("canplay", n => {
        var a;
        (a = window.__ddbAH) == null || a.canplay(n)
    }), t.addEventListener("timeupdate", n => {
        var a;
        (a = window.__ddbAH) == null || a.time(n)
    }), t.addEventListener("loadedmetadata", n => {
        var a;
        (a = window.__ddbAH) == null || a.meta(n)
    }), window.__ddbPH = {
        root: e,
        audio: t,
        ytDiv: r
    }, window.__ddbPH
}

function GO() {
    const [e, t] = O.useState(() => {
        try {
            return JSON.parse(localStorage.getItem("player-songs") ?? "[]")
        } catch {
            return []
        }
    }), [r, n] = O.useState(() => window.__ddbIdx ?? 0), [s, a] = O.useState(() => {
        const Q9 = window.__ddbPH;
        return Q9 && !Q9.audio.paused || window.__ddbYT && window.__ddbYTReady && typeof window.__ddbYT.getPlayerState == "function" && window.__ddbYT.getPlayerState() === 1 || !1
    }), [i, l] = O.useState(() => window.__ddbSpd ?? 1), [c, u] = O.useState(!1), [h, d] = O.useState(() => window.__ddbRep ?? "all"), [f, x] = O.useState(!1), [p, m] = O.useState(0), [y, w] = O.useState(0), [v, g] = O.useState(() => window.__ddbVol ?? .8), [_, k] = O.useState(!1), [E, b] = O.useState(""), [T, A] = O.useState(""), [H, F] = O.useState(!1), [pTa, pTaS] = O.useState(""), [pCmp, pCmpS] = O.useState(() => Number(localStorage.getItem("player-compact") || 0)), [vMode, vModeS] = O.useState(() => localStorage.getItem("player-volmode") || "global"), [pfl, pflS] = O.useState(() => {
        try {
            return JSON.parse(localStorage.getItem("player-folders") ?? "[]")
        } catch {
            return []
        }
    }), [pcl, pclS] = O.useState(() => {
        try {
            return JSON.parse(localStorage.getItem("player-folders-closed") ?? "{}")
        } catch {
            return {}
        }
    }), [pSel, pSelS] = O.useState(null), [pSet, pSetS] = O.useState({}), [pNf, pNfS] = O.useState(null), R = O.useRef(null), K = O.useRef(""), se = O.useRef([]), z = O.useRef(null), G = O.useRef(!1), re = O.useRef(i), Y = O.useRef(v), vMap = O.useRef(null), M = e[r] ?? null, X = M ? Cd(M.url) : !1, ce = M && X ? HO(M.url) : null;
    vMap.current || (vMap.current = (() => { try { return JSON.parse(localStorage.getItem("player-vols") || "{}") } catch { return {} } })());
    R.current || (R.current = P9().audio), z.current === null && window.__ddbYT && (z.current = window.__ddbYT, G.current = window.__ddbYTReady ?? !1), K.current === "" && window.__ddbLastUrl && (K.current = window.__ddbLastUrl), window.__ddbAH = {
        end: () => te(),
        canplay: N => ue(N),
        time: N => m(N.target.currentTime),
        meta: N => w(N.target.duration)
    };

    function j(N) {
        t(N), localStorage.setItem("player-songs", JSON.stringify(N))
    }

    function pflSave(N) {
        pflS(N), localStorage.setItem("player-folders", JSON.stringify(N))
    }

    function pclSave(N) {
        pclS(N), localStorage.setItem("player-folders-closed", JSON.stringify(N))
    }

    function pMove(N, V) {
        j(e.map(ae => ae.id === N ? {
            ...ae,
            folder: V || void 0
        } : ae))
    }

    function pReorder(N, V) {
        if (N === V) return;
        const ae = e[r] ? e[r].id : null,
            ve = e.find(Te => Te.id === N),
            Te = e.find(q9 => q9.id === V);
        if (!ve || !Te) return;
        const oi = e.findIndex(q9 => q9.id === N),
            ti = e.findIndex(q9 => q9.id === V),
            ar = e.filter(q9 => q9.id !== N),
            ni = ar.findIndex(q9 => q9.id === V),
            nv = {
                ...ve,
                folder: Te.folder
            };
        ar.splice(oi < ti ? ni + 1 : ni, 0, nv), j(ar), ae && n(ar.findIndex(q9 => q9.id === ae))
    }

    function pAssignSel() {
        const N = pSel;
        j(e.map(V => pSet[V.id] ? {
            ...V,
            folder: N
        } : V)), pSelS(null), pSetS({})
    }
    async function q(N) {
        if (b(N), !N.trim() || T.trim()) return;
        F(!0);
        const V = await WO(N.trim());
        F(!1), V && A(V)
    }

    function U() {
        if (!E.trim()) return;
        if (e.length >= 300) {
            alert("최대 300곡");
            return
        }
        const N = T.trim() || E.trim().split("/").pop() || "제목 없음";
        j([...e, {
            id: Ft(),
            url: E.trim(),
            title: N
        }]), b(""), A(""), k(!1)
    }

    function B(N) {
        const V = e.filter(ae => ae.id !== N);
        j(V), r >= V.length && n(Math.max(0, V.length - 1))
    }

    function W(N) {
        n(N), a(!0)
    }
    const te = O.useCallback(() => {
        if (e.length) {
            if (h === "one") {
                const N = R.current;
                N && (N.currentTime = 0, N.play().catch(() => {}));
                return
            }
            if (f) se.current.length || (se.current = e.map((N, V) => V).sort(() => Math.random() - .5)), n(se.current.pop());
            else {
                const N = (r + 1) % e.length;
                if (N === 0 && h === "none") {
                    a(!1);
                    return
                }
                n(N)
            }
        }
    }, [e, r, h, f]);

    function he() {
        e.length && n((r - 1 + e.length) % e.length)
    }
    O.useEffect(() => { window.__ddbPlayerCtl = { next: () => { if (e.length) { n((r + 1) % e.length); a(!0) } }, prev: () => { if (e.length) { n((r - 1 + e.length) % e.length); a(!0) } }, toggle: () => a(z => !z) }; return () => {} }, [r, e, s]);
    const ne = () => d(N => N === "none" ? "all" : N === "all" ? "one" : "none");
    O.useEffect(() => {
        const N = R.current;
        !N || !M || X || K.current !== M.url && (N.src = M.url, K.current = window.__ddbLastUrl = M.url, N.load(), m(0), w(0))
    }, [M == null ? void 0 : M.url, X]), O.useEffect(() => {
        const N = R.current;
        !N || !M || X || (s ? N.play().catch(() => a(!1)) : N.pause())
    }, [s]), O.useEffect(() => {
        if (!s || !M || X) return;
        const N = setTimeout(() => {
            var V;
            (V = R.current) == null || V.play().catch(() => a(!1))
        }, 80);
        return () => clearTimeout(N)
    }, [r]), O.useEffect(() => {
        if (!ce) return;

        function N() {
            if (z.current) {
                try {
                    window.__ddbLastVid !== ce && (window.__ddbLastVid = ce, z.current.loadVideoById(ce)), s || z.current.pauseVideo(), z.current.setVolume(Math.round(Y.current * 100)), z.current.setPlaybackRate(re.current)
                } catch {}
                return
            }
            G.current = !1, window.__ddbLastVid = ce, P9(), z.current = window.__ddbYT = new window.YT.Player("yt-player-div", {
                height: "1",
                width: "1",
                videoId: ce,
                playerVars: {
                    autoplay: s ? 1 : 0,
                    controls: 0,
                    disablekb: 1
                },
                events: {
                    onReady: V => {
                        G.current = !0, window.__ddbYTReady = !0, V.target.setVolume(Math.round(Y.current * 100)), V.target.setPlaybackRate(re.current), s && V.target.playVideo()
                    },
                    onStateChange: V => {
                        var Q9;
                        V.data === 0 && ((Q9 = window.__ddbAH) == null || Q9.end())
                    },
                    onError: () => {
                        pTaS("재생이 불가한 노래입니다 (게시자가 외부 재생을 막은 곡)"), clearTimeout(window.__ddbTErr), window.__ddbTErr = setTimeout(() => pTaS(""), 3e3), setTimeout(() => te(), 1200)
                    }
                }
            })
        }
        if (window.YT && window.YT.Player) N();
        else {
            if (!document.getElementById("yt-iframe-api")) {
                const V = document.createElement("script");
                V.id = "yt-iframe-api", V.src = "https://www.youtube.com/iframe_api", document.head.appendChild(V)
            }
            window.onYouTubeIframeAPIReady = N
        }
    }, [ce]), O.useEffect(() => {
        if (!(!X || !z.current || !G.current)) try {
            s ? z.current.playVideo() : z.current.pauseVideo()
        } catch {}
    }, [s, X]), O.useEffect(() => {
        if (Y.current = v, R.current && (R.current.volume = v), X && z.current && G.current) try {
            z.current.setVolume(Math.round(v * 100))
        } catch {}
    }, [v, X]), O.useEffect(() => {
        if (re.current = i, R.current && (R.current.playbackRate = i), X && z.current && G.current) try {
            z.current.setPlaybackRate(i)
        } catch {}
    }, [i, X]);

    function ue(N) {
        N.currentTarget.playbackRate = re.current, N.currentTarget.volume = Y.current, s && N.currentTarget.play().catch(() => {})
    }

    function de(N) {
        const V = R.current,
            ae = Number(N.target.value);
        V && isFinite(y) && y > 0 && (V.currentTime = ae, m(ae))
    }
    O.useEffect(() => {
        window.__ddbIdx = r, window.__ddbSpd = i, window.__ddbVol = v, window.__ddbRep = h
    }, [r, i, v, h]);
    O.useEffect(() => {
        localStorage.setItem("player-compact", String(pCmp)), localStorage.setItem("player-volmode", vMode)
    }, [pCmp, vMode]);
    O.useEffect(() => {
        if (vMode === "per" && M) {
            const sv = vMap.current[M.id];
            if (sv != null) {
                g(sv), Y.current = sv, R.current && (R.current.volume = sv);
                try {
                    z.current && G.current && z.current.setVolume(Math.round(sv * 100))
                } catch {}
            }
        }
    }, [r, vMode]);
    O.useEffect(() => {
        if (!X) return;
        const id = setInterval(() => {
            try {
                if (z.current && G.current && typeof z.current.getCurrentTime === "function") {
                    const cur = z.current.getCurrentTime() || 0, dur = z.current.getDuration() || 0;
                    m(cur), dur && w(dur)
                }
            } catch {}
        }, 500);
        return () => clearInterval(id)
    }, [X, r]);
    return o.jsxs("div", {
        className: "flex flex-col h-full min-h-0 relative",
        children: [pTa && o.jsx("div", {
            style: {
                position: "absolute",
                left: "50%",
                top: 8,
                transform: "translateX(-50%)",
                zIndex: 50,
                background: "rgba(220,38,38,0.95)",
                color: "#fff",
                fontSize: 11,
                padding: "6px 12px",
                borderRadius: 8,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)"
            },
            children: pTa
        }), o.jsxs("div", {
            className: "px-3 pt-2 pb-2 bg-black/20 flex-shrink-0",
            children: [pCmp < 3 && o.jsxs("div", {
                className: "flex items-center gap-2 mb-1.5",
                children: [o.jsx("div", {
                    className: "w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0",
                    children: o.jsx(od, {
                        size: 14,
                        className: "text-white/60"
                    })
                }), o.jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [o.jsx("p", {
                        className: "text-white/90 text-xs font-medium truncate",
                        children: (M == null ? void 0 : M.title) ?? "재생 목록 없음"
                    }), o.jsxs("p", {
                        className: "text-white/40 text-[10px]",
                        children: [e.length, "곡 중 ", e.length ? r + 1 : 0, "번째"]
                    })]
                }), M && X && o.jsx("a", {
                    href: M.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-white/40 hover:text-white",
                    children: o.jsx(nT, {
                        size: 13
                    })
                })]
            }), pCmp < 1 && M ? o.jsxs("div", {
                className: "mb-1.5",
                children: [o.jsx("input", {
                    type: "range",
                    min: 0,
                    max: y || 100,
                    step: .1,
                    value: p,
                    onChange: N => {
                        const ae = Number(N.target.value);
                        X ? (z.current && G.current && typeof z.current.seekTo === "function" && z.current.seekTo(ae, !0), m(ae)) : de(N)
                    },
                    className: "w-full accent-blue-400 h-1.5 cursor-pointer"
                }), o.jsxs("div", {
                    className: "flex justify-between text-white/30 text-[10px] mt-0.5",
                    children: [o.jsx("span", {
                        children: T1(p)
                    }), o.jsx("span", {
                        children: T1(y)
                    })]
                })]
            }) : !1 ? o.jsx("p", {
                className: "text-white/20 text-[10px] text-center mb-1.5",
                children: ""
            }) : null, o.jsxs("div", {
                className: "flex items-center justify-center gap-2 mb-1.5",
                children: [o.jsx("button", {
                    onClick: () => x(N => !N),
                    className: "p-1.5 rounded-lg " + (f ? "text-blue-400 bg-blue-400/20" : "text-white/40 hover:text-white hover:bg-white/10"),
                    children: o.jsx(gT, {
                        size: 13
                    })
                }), o.jsx("button", {
                    onClick: he,
                    className: "p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg",
                    children: o.jsx(vT, {
                        size: 16
                    })
                }), o.jsx("button", {
                    onClick: () => a(N => !N),
                    className: "p-2 rounded-full " + (s ? "bg-blue-500 text-white hover:bg-blue-400" : "bg-white/20 text-white hover:bg-white/30"),
                    children: s ? o.jsx(dT, {
                        size: 16
                    }) : o.jsx(xT, {
                        size: 16,
                        className: "ml-0.5"
                    })
                }), o.jsx("button", {
                    onClick: te,
                    className: "p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg",
                    children: o.jsx(wT, {
                        size: 16
                    })
                }), o.jsx("button", {
                    onClick: ne,
                    className: "p-1.5 rounded-lg " + (h !== "none" ? "text-blue-400 bg-blue-400/20" : "text-white/40 hover:text-white hover:bg-white/10"),
                    children: h === "one" ? o.jsx(pT, {
                        size: 13
                    }) : o.jsx(mT, {
                        size: 13
                    })
                })]
            }), pCmp < 2 && o.jsxs("div", {
                className: "relative mb-1.5",
                children: [o.jsxs("button", {
                    onClick: () => u(N => !N),
                    className: "w-full flex items-center justify-between px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors",
                    children: [o.jsx("span", {
                        className: "text-white/40 text-[10px]",
                        children: DDBTR("⏩ 배속")
                    }), o.jsxs("span", {
                        className: "font-mono text-[11px] text-white/90 font-medium",
                        children: [i, "×"]
                    })]
                }), c && o.jsx("div", {
                    className: "absolute bottom-full left-0 right-0 mb-1 rounded-lg z-50 shadow-2xl p-1.5",
                    style: {
                        background: "#111827",
                        border: "1px solid rgba(255,255,255,0.18)"
                    },
                    children: o.jsx("div", {
                        className: "grid grid-cols-8 gap-0.5",
                        children: VO.map(N => o.jsx("button", {
                            onClick: () => {
                                if (l(N), re.current = N, u(!1), R.current && (R.current.playbackRate = N), z.current && G.current) try {
                                    z.current.setPlaybackRate(N)
                                } catch {}
                            },
                            className: "py-0.5 rounded text-[9px] font-mono text-center transition-colors " + (i === N ? "bg-blue-500 text-white" : "text-white/50 hover:bg-white/20 hover:text-white/90"),
                            children: N
                        }, N))
                    })
                })]
            }), pCmp < 3 && o.jsxs("div", {
                className: "flex items-center gap-2",
                children: [o.jsx("span", {
                    className: "text-white/40 text-[10px]",
                    children: "🔊"
                }), o.jsx("input", {
                    type: "range",
                    min: 0,
                    max: 1,
                    step: .01,
                    value: v,
                    onChange: N => {
                        const V = Number(N.target.value);
                        if (g(V), Y.current = V, vMode === "per" && M && (vMap.current[M.id] = V, localStorage.setItem("player-vols", JSON.stringify(vMap.current))), R.current && (R.current.volume = V), z.current && G.current) try {
                            z.current.setVolume(Math.round(V * 100)), console.log("[DDB PLAYER] YT vol 적용:", Math.round(V * 100))
                        } catch (ae) {
                            console.log("[DDB PLAYER] YT vol 에러:", ae)
                        }
                    },
                    className: "flex-1 accent-blue-400 h-1.5 cursor-pointer"
                }), o.jsxs("span", {
                    className: "text-white/40 text-[10px] w-7 text-right",
                    children: [Math.round(v * 100), "%"]
                })]
            })]
        }), o.jsxs("div", {
            className: "border-t border-white/10 bg-black/10 flex-shrink-0",
            children: [o.jsxs("div", {
                className: "flex",
                children: [o.jsxs("button", {
                    onClick: () => k(N => !N),
                    className: "flex-1 flex items-center justify-center gap-1 py-1.5 text-white/40 hover:text-white hover:bg-white/5 text-xs",
                    children: [_ ? o.jsx(jf, {
                        size: 12
                    }) : o.jsx(Vr, {
                        size: 12
                    }), _ ? "닫기" : "곡 추가하기"]
                }), o.jsx("button", {
                    onClick: () => vModeS(N => N === "per" ? "global" : "per"),
                    title: vMode === "per" ? "개별 곡 볼륨 (곡마다 볼륨 기억) — 클릭 시 통상 볼륨으로" : "통상 볼륨 — 클릭 시 개별 곡 볼륨으로",
                    className: "px-2.5 py-1.5 text-xs border-l border-white/10 flex-shrink-0 " + (vMode === "per" ? "text-blue-300 hover:text-blue-200" : "text-white/40 hover:text-white/70"),
                    children: vMode === "per" ? "🎚개별" : "🔊통상"
                }), o.jsx("button", {
                    onClick: () => pCmpS(N => (N + 1) % 4),
                    title: DDBTR("재생바 접기 (1:재생바 숨김 → 2:배속 숨김 → 3:최소 → 4:전체)"),
                    className: "px-2.5 py-1.5 text-xs border-l border-white/10 flex-shrink-0 " + (pCmp > 0 ? "text-amber-300 hover:text-amber-200" : "text-white/40 hover:text-white/70"),
                    children: pCmp > 0 ? "▽" + pCmp : "▽"
                }), o.jsx("button", {
                    onClick: () => pNfS(N => N === null ? "" : null),
                    title: DDBTR("폴더 만들기 — 곡 목록에서 각 곡의 폴더를 지정할 수 있습니다"),
                    className: "px-3 py-1.5 text-amber-300/50 hover:text-amber-300 hover:bg-white/5 text-xs border-l border-white/10 flex-shrink-0",
                    children: "📁+"
                })]
            }), pNf !== null && o.jsxs("div", {
                className: "flex gap-1 px-2 pb-2 items-center",
                children: [o.jsx("input", {
                    autoFocus: !0,
                    value: pNf,
                    onChange: N => pNfS(N.target.value),
                    onKeyDown: N => {
                        if (N.key === "Enter") {
                            const V = pNf.trim();
                            if (!V) return;
                            if (pfl.includes(V)) {
                                alert("같은 이름의 폴더가 있습니다.");
                                return
                            }
                            pflSave([...pfl, V]), pNfS(null)
                        }
                        N.key === "Escape" && pNfS(null)
                    },
                    placeholder: DDBTR("새 폴더 이름 입력 후 Enter"),
                    className: "flex-1 bg-white/10 border border-amber-400/40 rounded px-2 py-1 text-white text-xs focus:outline-none placeholder-white/30"
                }), o.jsx("button", {
                    onClick: () => {
                        const V = pNf.trim();
                        if (!V) return;
                        if (pfl.includes(V)) {
                            alert("같은 이름의 폴더가 있습니다.");
                            return
                        }
                        pflSave([...pfl, V]), pNfS(null)
                    },
                    className: "px-2 py-1 bg-amber-500/70 text-black rounded text-xs font-bold hover:bg-amber-400",
                    children: DDBTR("만들기")
                }), o.jsx("button", {
                    onClick: () => pNfS(null),
                    className: "px-2 py-1 bg-white/10 text-white/50 rounded text-xs hover:bg-white/20",
                    children: DDBTR("취소")
                })]
            }), _ && o.jsxs("div", {
                className: "px-2 pb-2 space-y-1",
                children: [o.jsx("div", {
                    className: "flex gap-1",
                    children: o.jsx("input", {
                        value: E,
                        onChange: N => q(N.target.value),
                        onKeyDown: N => N.key === "Enter" && T && U(),
                        placeholder: DDBTR("오디오 URL 또는 YouTube 링크"),
                        className: "flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs focus:outline-none placeholder-white/30"
                    })
                }), o.jsxs("div", {
                    className: "flex gap-1 items-center",
                    children: [o.jsxs("div", {
                        className: "flex-1 relative",
                        children: [o.jsx("input", {
                            value: T,
                            onChange: N => A(N.target.value),
                            onKeyDown: N => N.key === "Enter" && U(),
                            placeholder: DDBTR("제목 (URL 입력 후 자동 완성)"),
                            className: "w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs focus:outline-none placeholder-white/30"
                        }), H && o.jsx(cT, {
                            size: 10,
                            className: "absolute right-2 top-1/2 -translate-y-1/2 text-white/40 animate-spin"
                        })]
                    }), o.jsxs("button", {
                        onClick: U,
                        disabled: !E.trim() || e.length >= 300,
                        className: "px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-400 disabled:opacity-40 flex items-center gap-0.5",
                        children: [o.jsx(Vr, {
                            size: 10
                        }), " 추가"]
                    })]
                }), o.jsxs("p", {
                    className: "text-white/20 text-[10px]",
                    children: [e.length, "/300곡 · YouTube 제목은 자동으로 불러옵니다"]
                })]
            })]
        }), o.jsxs("div", {
            className: "overflow-y-auto thin-scroll flex-1 min-h-0",
            style: {
                paddingBottom: 8,
                scrollbarWidth: "thin"
            },
            children: [pSel && o.jsxs("div", {
                className: "sticky top-0 z-10 flex items-center gap-2 px-2 py-1.5 bg-amber-500/20 border-b border-amber-400/40 backdrop-blur-sm",
                children: [o.jsxs("span", {
                    className: "text-amber-100 text-[10px] flex-1 truncate",
                    children: ["📁 '", pSel, "'에 넣을 곡 선택 (", Object.values(pSet).filter(Boolean).length, "곡)"]
                }), o.jsx("button", {
                    onClick: pAssignSel,
                    className: "px-2 py-0.5 rounded bg-amber-400/80 text-black text-[10px] font-bold hover:bg-amber-300",
                    children: DDBTR("완료")
                }), o.jsx("button", {
                    onClick: () => {
                        pSelS(null), pSetS({})
                    },
                    className: "px-2 py-0.5 rounded bg-white/10 text-white/60 text-[10px] hover:bg-white/20",
                    children: DDBTR("취소")
                })]
            }), e.length === 0 && o.jsx("p", {
                className: "text-white/20 text-xs text-center py-6",
                children: DDBTR("「곡 추가하기」를 눌러 노래를 추가하세요")
            }), (() => {
                const w9 = ((N, V) => o.jsxs("div", {
                draggable: !pSel,
                onDragStart: ae => {
                    window.__ddbTDrag = N.id, ae.dataTransfer.effectAllowed = "move"
                },
                onDragOver: ae => {
                    window.__ddbTDrag && window.__ddbTDrag !== N.id && (ae.preventDefault(), pReorder(window.__ddbTDrag, N.id))
                },
                onDragEnd: () => {
                    window.__ddbTDrag = null, clearTimeout(window.__ddbFHT)
                },
                className: "group flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-white/5 border-b border-white/5 " + (V === r ? "bg-white/10" : "") + (pSel && pSet[N.id] ? " bg-amber-400/10" : ""),
                onClick: () => {
                    pSel ? pSetS({
                        ...pSet,
                        [N.id]: !pSet[N.id]
                    }) : W(V)
                },
                children: [o.jsx("span", {
                    className: "text-[10px] w-5 text-center flex-shrink-0 " + (pSel ? pSet[N.id] ? "text-amber-300" : "text-white/40" : V === r ? "text-white/70" : "text-white/25"),
                    children: pSel ? pSet[N.id] ? "☑" : "☐" : V + 1
                }), o.jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [o.jsx("p", {
                        className: "text-xs truncate " + (V === r ? "text-white" : "text-white/60"),
                        children: ddbTT(N.title)
                    })]
                }), o.jsxs("div", {
                    className: "flex items-center gap-0.5 flex-shrink-0",
                    children: [V === r && s && o.jsx("span", {
                        className: "text-[10px] text-green-400 animate-pulse",
                        children: "▶"
                    }), pfl.length > 0 && o.jsxs("select", {
                        value: N.folder ?? "",
                        onClick: ae => ae.stopPropagation(),
                        onMouseDown: ae => ae.stopPropagation(),
                        onChange: ae => pMove(N.id, ae.target.value),
                        title: DDBTR("폴더 지정"),
                        className: "bg-transparent text-white/20 hover:text-amber-300 text-[10px] w-6 cursor-pointer focus:outline-none",
                        children: [o.jsx("option", {
                            value: "",
                            children: "📁—"
                        }), pfl.map(ae => o.jsx("option", {
                            value: ae,
                            children: ae
                        }, ae))]
                    }), o.jsx("button", {
                        onClick: ae => {
                            ae.stopPropagation(), B(N.id)
                        },
                        className: "p-0.5 text-white/20 hover:text-red-400 rounded",
                        children: o.jsx(Gr, {
                            size: 10
                        })
                    })]
                })]
            }, N.id)),
                    y9 = e.filter(N => !N.folder || !pfl.includes(N.folder));
                return o.jsxs(o.Fragment, {
                    children: [y9.map(N => w9(N, e.findIndex(V => V.id === N.id))), pfl.map(N => {
                        const V = e.filter(ae => ae.folder === N),
                            ae = !!pcl[N];
                        return o.jsxs("div", {
                            children: [o.jsxs("div", {
                                className: "flex items-center gap-1.5 px-2 py-1 bg-amber-400/5 border-b border-white/10 cursor-pointer select-none hover:bg-amber-400/10",
                                onClick: () => pclSave({
                                    ...pcl,
                                    [N]: !ae
                                }),
                                onDragOver: Te => {
                                    window.__ddbTDrag && (Te.preventDefault(), window.__ddbFHF !== N && (clearTimeout(window.__ddbFHT), window.__ddbFHF = N, window.__ddbFHT = setTimeout(() => {
                                        window.__ddbTDrag && pMove(window.__ddbTDrag, N), window.__ddbFHF = null
                                    }, 500)))
                                },
                                onDragLeave: () => {
                                    clearTimeout(window.__ddbFHT), window.__ddbFHF = null
                                },
                                children: [o.jsx("span", {
                                    className: "text-[10px] text-amber-300/70 w-2",
                                    children: ae ? "▸" : "▾"
                                }), o.jsxs("span", {
                                    className: "text-[11px] text-amber-200/80 flex-1 truncate",
                                    children: ["📁 ", N]
                                }), o.jsx("button", {
                                    onClick: Te => {
                                        Te.stopPropagation(), pSelS(N), pSetS({})
                                    },
                                    title: DDBTR("이 폴더에 넣을 곡 선택하기"),
                                    className: "text-amber-300/60 hover:text-amber-200 text-[11px] font-bold px-1 rounded hover:bg-white/10",
                                    children: "+"
                                }), o.jsxs("span", {
                                    className: "text-[9px] text-white/25",
                                    children: [V.length, "곡"]
                                }), o.jsx("button", {
                                    onClick: Te => {
                                        Te.stopPropagation(), confirm(`'${N}' 폴더를 삭제할까요? (곡은 폴더 밖으로 이동합니다)`) && (j(e.map(ve => ve.folder === N ? {
                                            ...ve,
                                            folder: void 0
                                        } : ve)), pflSave(pfl.filter(ve => ve !== N)))
                                    },
                                    className: "text-white/20 hover:text-red-300 p-0.5",
                                    children: o.jsx(Gr, {
                                        size: 9
                                    })
                                })]
                            }), !ae && V.map(Te => w9(Te, e.findIndex(ve => ve.id === Te.id)))]
                        }, N)
                    })]
                })
            })()]
        })]
    })
}

function m2() {
    let e = document.getElementById("ddb-snap-overlay");
    if (!e) {
        e = document.createElement("div"), e.id = "ddb-snap-overlay", e.style.cssText = "position:fixed;inset:0;z-index:99999;pointer-events:none;display:none;";
        const t = (r, n) => {
            const s = document.createElement("div");
            return s.id = r, s.style.cssText = n, s
        };
        e.appendChild(t("ddb-sn-left", "position:absolute;top:0;bottom:0;left:0;width:40px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;transition:background .15s,border .15s;")), e.appendChild(t("ddb-sn-right", "position:absolute;top:0;bottom:0;right:0;width:40px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;transition:background .15s,border .15s;")), e.appendChild(t("ddb-sn-center", "position:absolute;top:0;left:40px;right:40px;height:40px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;transition:background .15s,border .15s;")), document.body.appendChild(e)
    }
    return e
}

function N1(e) {
    const t = m2();
    t.style.display = "block";
    const r = document.getElementById("ddb-sn-left"),
        n = document.getElementById("ddb-sn-right"),
        s = document.getElementById("ddb-sn-center"),
        a = "2px dashed rgba(255,255,255,0.25)",
        i = "rgba(255,255,255,0.04)";
    r.style.border = a, r.style.background = i, r.innerHTML = '<span style="color:rgba(100,181,246,0.4);font-size:11px;writing-mode:vertical-rl;">← 왼쪽</span>', n.style.border = a, n.style.background = i, n.innerHTML = '<span style="color:rgba(248,180,0,0.4);font-size:11px;writing-mode:vertical-rl;">오른쪽 →</span>', e === "calendar" ? (s.style.border = "2px dashed rgba(167,139,250,0.25)", s.style.background = "rgba(167,139,250,0.04)", s.innerHTML = '<span style="color:rgba(167,139,250,0.4);font-size:11px;">↑ 가운데 정렬 (달력)</span>', s.style.display = "flex") : (s.style.border = "none", s.style.background = "transparent", s.innerHTML = "", s.style.display = "none")
}

function Z0(e, t) {
    if (!e) {
        const s = document.getElementById("ddb-snap-overlay");
        s && (s.style.display = "none");
        return
    }
    const r = m2();
    r.style.display = "block";
    const n = {
        left: {
            id: "ddb-sn-left",
            border: "3px dashed rgba(100,181,246,0.95)",
            bg: "rgba(100,181,246,0.20)",
            label: "← 왼쪽 정렬",
            color: "#64b5f6",
            faintLabel: '<span style="color:rgba(100,181,246,0.4);font-size:11px;writing-mode:vertical-rl;">← 왼쪽</span>',
            faintBorder: "2px dashed rgba(255,255,255,0.25)",
            faintBg: "rgba(255,255,255,0.04)"
        },
        right: {
            id: "ddb-sn-right",
            border: "3px dashed rgba(248,180,0,0.95)",
            bg: "rgba(248,180,0,0.20)",
            label: "오른쪽 정렬 →",
            color: "#f8b400",
            faintLabel: '<span style="color:rgba(248,180,0,0.4);font-size:11px;writing-mode:vertical-rl;">오른쪽 →</span>',
            faintBorder: "2px dashed rgba(255,255,255,0.25)",
            faintBg: "rgba(255,255,255,0.04)"
        },
        center: {
            id: "ddb-sn-center",
            border: "3px dashed rgba(167,139,250,0.95)",
            bg: "rgba(167,139,250,0.30)",
            label: "↕ 달력 가운데",
            color: "#a78bfa",
            faintLabel: '<span style="color:rgba(167,139,250,0.4);font-size:11px;">↑ 가운데 정렬 (달력)</span>',
            faintBorder: "2px dashed rgba(167,139,250,0.25)",
            faintBg: "rgba(167,139,250,0.04)"
        }
    };
    for (const [s, a] of Object.entries(n)) {
        const i = document.getElementById(a.id);
        if (i) {
            if (s === "center" && t !== "calendar") {
                i.style.border = "none", i.style.background = "transparent", i.innerHTML = "", i.style.display = "none";
                continue
            }
            i.style.display = "flex", s === e ? (i.style.border = a.border, i.style.background = a.bg, i.innerHTML = `<span style="color:${a.color};font-size:13px;font-weight:bold;text-shadow:0 0 10px currentColor;">${a.label}</span>`) : (i.style.border = a.faintBorder, i.style.background = a.faintBg, i.innerHTML = a.faintLabel)
        }
    }
}
const C1 = ["linear-gradient(135deg,#0f0c29,#302b63,#24243e)", "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", "linear-gradient(135deg,#134e5e,#1a2a1a,#0d3b2a)", "linear-gradient(135deg,#1a1a2e,#6b2d6b,#2d1b44)", "linear-gradient(135deg,#0a3d2a,#0d4a5c,#1a1a3e)", "linear-gradient(135deg,#1c1c1c,#2d2d2d,#1a1a1a)"];

function KO(e) {
    const {
        state: t
    } = vt();
    if (e.type === "calendar") return {
        title: DDBTR("📅 달력"),
        color: "#64b5f6"
    };
    if (e.type === "dday") return {
        title: "⭐ D-Day",
        color: "#ffd54f"
    };
    if (e.type === "calculator") return {
        title: DDBTR("🔢 계산기"),
        color: "#81c784"
    };
    if (e.type === "fortune") return {
        title: DDBTR("🔮 운세"),
        color: "#ce93d8"
    };
    if (e.type === "player") return {
        title: DDBTR("🎵 재생바"),
        color: "#f48fb1"
    };
    if (e.type === "todo") return {
        title: DDBTR("☑ 할 일"),
        color: "#42a5f5"
    };
    if (e.type === "todo-view") return {
        title: DDBTR("📋 할 일 목록"),
        color: "#26c6da"
    };
    const r = t.memoTabs.find(n => n.id === e.memoTabId);
    return {
        title: `📝 ${ddbTT((r==null?void 0:r.title)??"메모")}`,
        color: (r == null ? void 0 : r.color) ?? "#90a4ae"
    }
}

function g2({
    panel: e
}) {
    return e.type === "calendar" ? o.jsx(fd, {
        onTodo: () => {}
    }) : e.type === "dday" ? o.jsx(Rw, {}) : e.type === "calculator" ? o.jsx(TO, {}) : e.type === "fortune" ? o.jsx(zO, {}) : e.type === "player" ? o.jsx(GO, {}) : e.type === "todo" ? o.jsx(AT, {}) : e.type === "todo-view" ? o.jsx(jT, {}) : o.jsx(jw, {
        tabId: e.memoTabId
    })
}

function A1({
    panel: e
}) {
    const t = KO(e);
    return o.jsx("div", {
        className: e.slotH && !e.minimized ? "flex-shrink-0 overflow-hidden" : "flex-shrink-0",
        children: o.jsx(Td, {
            panel: e,
            title: t.title,
            colorDot: t.color,
            children: o.jsx(g2, {
                panel: e
            })
        })
    })
}

function uc({
    slot: e
}) {
    const {
        state: t,
        dispatch: r
    } = vt(), {
        panels: n,
        memoTabs: s
    } = t, [a, i] = O.useState(!1), l = O.useRef(null);
    O.useEffect(() => {
        if (!a) return;
        const d = f => {
            l.current && !l.current.contains(f.target) && i(!1)
        };
        return document.addEventListener("mousedown", d), () => document.removeEventListener("mousedown", d)
    }, [a]);

    function c(d, f, x, p) {
        const m = n.find(y => y.type === d && d !== "memo");
        r(m ? {
            type: "SET_PANEL_SLOT",
            id: m.id,
            slot: e,
            order: n.filter(y => y.slot === e && y.id !== m.id).length
        } : {
            type: "ADD_PANEL",
            panel: {
                id: f,
                type: d,
                slot: e,
                order: n.filter(y => y.slot === e).length,
                floatX: 100,
                floatY: 80,
                floatW: x,
                floatH: p,
                minimized: !1,
                zIndex: t.topZIndex + 1
            }
        }), i(!1)
    }

    function u(d) {
        const f = n.find(x => x.type === "memo" && x.memoTabId === d);
        r(f ? {
            type: "SET_PANEL_SLOT",
            id: f.id,
            slot: e,
            order: n.filter(x => x.slot === e && x.id !== f.id).length
        } : {
            type: "ADD_PANEL",
            panel: {
                id: `panel-memo-${Ft()}`,
                type: "memo",
                memoTabId: d,
                slot: e,
                order: n.filter(x => x.slot === e).length,
                floatX: 20,
                floatY: 80,
                floatW: 220,
                floatH: 400,
                minimized: !1,
                zIndex: t.topZIndex + 1
            }
        }), i(!1)
    }
    const h = t.memoTabs.filter(d => d.id !== "calendar");
    return o.jsxs("div", {
        ref: l,
        className: "relative flex-shrink-0 mt-0.5",
        children: [o.jsxs("button", {
            onClick: () => i(d => !d),
            className: "w-full flex items-center justify-center gap-1 py-1 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/10 text-xs transition-colors border border-dashed border-white/10 hover:border-white/30",
            children: [o.jsx(Vr, {
                size: 11
            }), " "+DDBTR("창 추가")]
        }), a && o.jsxs("div", {
            className: "absolute bottom-full left-0 right-0 mb-1 border border-white/25 rounded-xl shadow-2xl overflow-hidden z-50",
            style: {
                background: "#0e0e18"
            },
            children: [o.jsx("button", {
                onClick: () => c("dday", "panel-dday", 240, 480),
                className: "flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10",
                children: DDBTR("⭐ D-Day 창")
            }), o.jsx("button", {
                onClick: () => c("calculator", `panel-calc-${Ft()}`, 240, 420),
                className: "flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10",
                children: DDBTR("🔢 계산기 창")
            }), o.jsx("button", {
                onClick: () => c("fortune", `panel-fortune-${Ft()}`, 260, 480),
                className: "flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10",
                children: DDBTR("🔮 운세 창")
            }), o.jsx("button", {
                onClick: () => c("player", `panel-player-${Ft()}`, 280, 500),
                className: "flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10",
                children: DDBTR("🎵 재생바 창")
            }), o.jsx("div", {
                className: "border-t border-white/10"
            }), h.map(d => o.jsxs("button", {
                onClick: () => u(d.id),
                className: "flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10",
                children: [o.jsx("span", {
                    className: "w-2 h-2 rounded-full flex-shrink-0",
                    style: {
                        backgroundColor: d.color
                    }
                }), d.title, " 창"]
            }, d.id))]
        })]
    })
}

function YO() {
    const {
        state: e,
        dispatch: t
    } = vt(), {
        settings: r,
        panels: n
    } = e, [s, a] = O.useState(!1), [i, l] = O.useState(!1), [c, u] = O.useState(!1), [h, d] = O.useState(!1), [f, x] = O.useState(!1), [p, m] = O.useState("calendar"), [y, w] = O.useState(2), [v, g] = O.useState(2), _ = O.useRef(null), k = (G, re) => {
        G.preventDefault(), G.stopPropagation();
        const Y = G.clientX,
            M = y,
            X = v;

        function ce(q) {
            var te;
            const U = ((te = _.current) == null ? void 0 : te.getBoundingClientRect().width) ?? 1200,
                W = (q.clientX - Y) / U * 10;
            if (re === "left") {
                const he = K ? Math.min(8, 10 - v - 1) : 9;
                w(Math.max(1, Math.min(he, M + W)))
            } else {
                const he = R ? Math.min(8, 10 - y - 1) : 9;
                g(Math.max(1, Math.min(he, X - W)))
            }
        }

        function j() {
            window.removeEventListener("mousemove", ce), window.removeEventListener("mouseup", j)
        }
        window.addEventListener("mousemove", ce), window.addEventListener("mouseup", j)
    }, E = O.useRef(n);
    E.current = n, O.useEffect(() => {
        console.log("[DDB] 전역 mousemove/mouseup 리스너 등록됨");

        function G(Y) {
            var M, X;
            if (at.active) {
                const ce = E.current.find(he => he.id === at.panelId);
                if (!ce) return;
                const j = Y.clientY - at.startY;
                if (ce.slot !== "float") {
                    const he = Math.max(80, at.origH + j);
                    t({
                        type: "RESIZE_PANEL_H",
                        id: at.panelId,
                        height: he
                    });
                    return
                }
                const q = Y.clientX - at.startX;
                let U = at.origW,
                    B = at.origH,
                    W = at.origX,
                    te = at.origY;
                at.corner.includes("e") && (U = Math.max(160, at.origW + q)), at.corner.includes("s") && (B = Math.max(80, at.origH + j)), at.corner.includes("w") && (U = Math.max(160, at.origW - q), W = at.origX + (at.origW - U)), at.corner.includes("n") && (B = Math.max(80, at.origH - j), te = at.origY + (at.origH - B)), t({
                    type: "RESIZE_PANEL",
                    id: at.panelId,
                    width: U,
                    height: B,
                    x: W,
                    y: te
                });
                return
            }
            if (ot.active) {
                console.log("[DDB DRAG] move active", ot.panelId, Y.clientX, Y.clientY);
                const ce = ot.origX + (Y.clientX - ot.startX),
                    j = Math.max(0, ot.origY + (Y.clientY - ot.startY));
                t({
                    type: "FLOAT_PANEL",
                    id: ot.panelId,
                    x: ce,
                    y: j
                });
                const q = window.innerWidth,
                    U = 40,
                    B = (M = E.current.find(te => te.id === ot.panelId)) == null ? void 0 : M.type;
                let W = null;
                {
                    const Ov = document.getElementById("ddb-snap-overlay");
                    (!Ov || Ov.style.display === "none") && N1(B)
                }
                Y.clientX < U ? W = "left" : Y.clientX > q - U ? W = "right" : B === "calendar" && Y.clientY < U && (W = "center"), W !== Sd && (q0(W), W ? Z0(W, B) : N1(B));
                return
            }
            if (ot.potentialDrag) {
                const ce = Y.clientX - ot.startX,
                    j = Y.clientY - ot.startY;
                if (Math.sqrt(ce * ce + j * j) > _O) {
                    const q = Math.max(0, Y.clientX - 120),
                        U = Math.max(0, Y.clientY - 20);
                    t({
                        type: "FLOAT_PANEL",
                        id: ot.panelId,
                        x: q,
                        y: U
                    }), t({
                        type: "BRING_FRONT",
                        id: ot.panelId
                    }), Object.assign(ot, {
                        active: !0,
                        potentialDrag: !1,
                        startX: Y.clientX,
                        startY: Y.clientY,
                        origX: q,
                        origY: U
                    });
                    const B = window.innerWidth,
                        W = 40,
                        te = (X = E.current.find(ne => ne.id === ot.panelId)) == null ? void 0 : X.type;
                    N1(te);
                    let he = null;
                    Y.clientX < W ? he = "left" : Y.clientX > B - W ? he = "right" : te === "calendar" && Y.clientY < W && (he = "center"), q0(he), he && Z0(he, te)
                }
            }
        }

        function re() {
            if (ot.active) {
                const Y = Sd,
                    M = E.current.find(X => X.id === ot.panelId);
                Y === "left" ? t({
                    type: "SET_PANEL_SLOT",
                    id: ot.panelId,
                    slot: "left"
                }) : Y === "right" ? t({
                    type: "SET_PANEL_SLOT",
                    id: ot.panelId,
                    slot: "right"
                }) : Y === "center" && (M == null ? void 0 : M.type) === "calendar" && t({
                    type: "SET_PANEL_SLOT",
                    id: ot.panelId,
                    slot: "center"
                }), q0(null), Z0(null)
            }
            ot.active = !1, ot.potentialDrag = !1, ot.panelId = "", at.active = !1, at.panelId = ""
        }
        function ddbWheel(Y) {
            if (Y.ctrlKey || Y.defaultPrevented) return;
            let el = Y.target, near = null, cal = null;
            while (el && el !== document.body && el.nodeType === 1) {
                const st = getComputedStyle(el), scr = /(auto|scroll)/.test(st.overflowY) && el.scrollHeight > el.clientHeight + 2;
                if (scr) {
                    if (!near && el.clientHeight > 40) near = el;
                    if (el.dataset && el.dataset.calscroll) { cal = el; break }
                }
                el = el.parentElement
            }
            const tgt = cal || near;
            if (!tgt) return;
            Y.preventDefault(), tgt.scrollTop += Y.deltaY * 0.5
        }
        return window.addEventListener("mousemove", G), window.addEventListener("mouseup", re), window.addEventListener("wheel", ddbWheel, { passive: !1 }), () => {
            window.removeEventListener("mousemove", G), window.removeEventListener("mouseup", re), window.removeEventListener("wheel", ddbWheel)
        }
    }, []);
    const b = r.backgroundType === "image" && r.backgroundImage ? {
            backgroundImage: `url(${r.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        } : r.backgroundType === "solid" ? {
            background: r.backgroundSolidColor
        } : {
            background: C1[r.backgroundIndex % C1.length]
        },
        T = n.filter(G => G.slot === "left").sort((G, re) => G.order - re.order),
        A = n.filter(G => G.slot === "right" && G.type !== "calendar" && G.type !== "todo-view").sort((G, re) => G.order - re.order),
        H = n.filter(G => G.slot === "float" && G.type !== "todo-view"),
        F = n.find(G => G.type === "calendar" && (G.slot === "center" || G.slot === "right")) ?? null,
        R = T.length > 0,
        K = A.length > 0,
        se = (R ? y : 0) + (K ? v : 0),
        z = Math.max(1, 10 - se);
    return o.jsx(SO, {
        children: o.jsxs("div", {
            style: {
                ...b,
                fontFamily: r.fontFamily,
                color: r.textColor
            },
            className: "min-h-screen flex flex-col",
            children: [o.jsx("div", {
                className: "fixed inset-0 opacity-10 pointer-events-none",
                style: {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`
                }
            }), o.jsxs("div", {
                className: "hidden md:flex flex-col h-screen relative z-10",
                children: [o.jsx(um, {
                    onSearch: () => a(!0),
                    onSettings: () => l(!0),
                    onLedger: () => u(!0),
                    onBankImport: () => d(!0),
                    onAuth: () => x(!0)
                }), o.jsx(hm, {
                    onTodo: () => {
                        const G = e.panels.find(re => re.type === "todo");
                        t(G ? {
                            type: "BRING_FRONT",
                            id: G.id
                        } : {
                            type: "ADD_PANEL",
                            panel: {
                                id: "panel-todo-1",
                                type: "todo",
                                slot: "float",
                                order: 0,
                                floatX: Math.max(20, window.innerWidth / 2 - 320),
                                floatY: 60,
                                floatW: 640,
                                floatH: 500,
                                minimized: !1,
                                zIndex: e.topZIndex + 1
                            }
                        })
                    }
                }), o.jsxs("div", {
                    ref: _,
                    className: "flex flex-1 overflow-hidden p-1 min-h-0",
                    style: {
                        gap: 0
                    },
                    children: [R ? o.jsxs(o.Fragment, {
                        children: [o.jsxs("div", {
                            style: {
                                flex: y
                            },
                            className: "flex flex-col gap-1 overflow-y-auto min-w-0 mr-0.5",
                            children: [T.map(G => o.jsx(A1, {
                                panel: G
                            }, G.id)), o.jsx(uc, {
                                slot: "left"
                            })]
                        }), o.jsx("div", {
                            className: "flex-shrink-0 flex items-center justify-center select-none group",
                            style: {
                                width: 16,
                                cursor: "col-resize"
                            },
                            onMouseDown: G => k(G, "left"),
                            children: o.jsxs("div", {
                                className: "flex flex-col gap-[3px] group-hover:opacity-100 opacity-40 transition-opacity",
                                children: [o.jsx("div", {
                                    style: {
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    }
                                }), o.jsx("div", {
                                    style: {
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    }
                                }), o.jsx("div", {
                                    style: {
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    }
                                }), o.jsx("div", {
                                    style: {
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    }
                                })]
                            })
                        })]
                    }) : o.jsx("div", {
                        className: "w-8 flex-shrink-0",
                        children: o.jsx(uc, {
                            slot: "left"
                        })
                    }), o.jsxs("div", {
                        style: {
                            flex: z
                        },
                        className: "flex flex-col overflow-hidden min-w-0 mx-0.5",
                        children: [o.jsx("div", {
                            className: "flex-1 min-h-0",
                            children: F ? o.jsx(Td, {
                                panel: F,
                                title: DDBTR("📅 달력"),
                                colorDot: "#64b5f6",
                                children: o.jsx(fd, {
                                    onTodo: () => {}
                                })
                            }) : o.jsx("div", {
                                className: "h-full bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/20 text-sm",
                                children: DDBTR("달력이 분리 중입니다")
                            })
                        }), o.jsx(vm, {})]
                    }), K ? o.jsxs(o.Fragment, {
                        children: [o.jsx("div", {
                            className: "flex-shrink-0 flex items-center justify-center select-none group",
                            style: {
                                width: 16,
                                cursor: "col-resize"
                            },
                            onMouseDown: G => k(G, "right"),
                            children: o.jsxs("div", {
                                className: "flex flex-col gap-[3px] group-hover:opacity-100 opacity-40 transition-opacity",
                                children: [o.jsx("div", {
                                    style: {
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    }
                                }), o.jsx("div", {
                                    style: {
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    }
                                }), o.jsx("div", {
                                    style: {
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    }
                                }), o.jsx("div", {
                                    style: {
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    }
                                })]
                            })
                        }), o.jsxs("div", {
                            style: {
                                flex: v
                            },
                            className: "flex flex-col gap-1 overflow-y-auto min-w-0 ml-0.5",
                            children: [A.map(G => o.jsx(A1, {
                                panel: G
                            }, G.id)), o.jsx(uc, {
                                slot: "right"
                            })]
                        })]
                    }) : o.jsx("div", {
                        className: "w-8 flex-shrink-0",
                        children: o.jsx(uc, {
                            slot: "right"
                        })
                    })]
                })]
            }), o.jsxs("div", {
                className: "flex md:hidden flex-col h-screen relative z-10",
                children: [o.jsx(um, {
                    onSearch: () => a(!0),
                    onSettings: () => l(!0),
                    onLedger: () => u(!0),
                    onBankImport: () => d(!0),
                    onAuth: () => x(!0)
                }), o.jsx(hm, {
                    onTodo: () => {
                        const G = e.panels.find(re => re.type === "todo");
                        t(G ? {
                            type: "BRING_FRONT",
                            id: G.id
                        } : {
                            type: "ADD_PANEL",
                            panel: {
                                id: "panel-todo-1",
                                type: "todo",
                                slot: "float",
                                order: 0,
                                floatX: Math.max(20, window.innerWidth / 2 - 320),
                                floatY: 60,
                                floatW: 640,
                                floatH: 500,
                                minimized: !1,
                                zIndex: e.topZIndex + 1
                            }
                        })
                    }
                }), o.jsxs("div", {
                    className: "flex-1 overflow-hidden p-1",
                    children: [p === "calendar" && o.jsx(fd, {
                        onTodo: () => {}
                    }), p === "memo" && o.jsx("div", {
                        className: "h-full bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden",
                        children: o.jsx(jw, {})
                    }), p === "dday" && o.jsx("div", {
                        className: "h-full bg-white/10 backdrop-blur-sm rounded-lg overflow-y-auto",
                        children: o.jsx(Rw, {})
                    })]
                }), o.jsx(vm, {}), o.jsx("nav", {
                    className: "flex bg-black/60 backdrop-blur-md border-t border-white/10 safe-bottom",
                    children: [
                        ["calendar", "📅", "일정"],
                        ["memo", "📝", "메모"],
                        ["dday", "⭐", "D-Day"]
                    ].map(([G, re, Y]) => o.jsxs("button", {
                        onClick: () => m(G),
                        className: "flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors " + (p === G ? "text-blue-300" : "text-white/40 hover:text-white/70"),
                        children: [o.jsx("span", {
                            children: re
                        }), Y]
                    }, G))
                })]
            }), H.map(G => {
                const re = G.type === "calendar" ? {
                    title: DDBTR("📅 달력"),
                    color: "#64b5f6"
                } : G.type === "dday" ? {
                    title: "⭐ D-Day",
                    color: "#ffd54f"
                } : G.type === "calculator" ? {
                    title: DDBTR("🔢 계산기"),
                    color: "#81c784"
                } : G.type === "fortune" ? {
                    title: DDBTR("🔮 운세"),
                    color: "#ce93d8"
                } : G.type === "memo" ? {
                    title: DDBTR("📝 메모"),
                    color: "#f48fb1"
                } : G.type === "player" ? {
                    title: DDBTR("🎵 음악"),
                    color: "#80cbc4"
                } : G.type === "ledger" ? {
                    title: DDBTR("💰 가계부"),
                    color: "#a5d6a7"
                } : G.type === "todo" ? {
                    title: DDBTR("☑ 할 일"),
                    color: "#42a5f5"
                } : G.type === "todo-view" ? {
                    title: DDBTR("📋 할 일 목록"),
                    color: "#26c6da"
                } : G.type === "loan" ? {
                    title: DDBTR("🏦 대출"),
                    color: "#ffb74d"
                } : G.type === "savings" ? {
                    title: DDBTR("📈 적금"),
                    color: "#4fc3f7"
                } : {
                    title: "📋",
                    color: "#999"
                };
                return o.jsx(Td, {
                    panel: G,
                    title: re.title,
                    colorDot: re.color,
                    children: o.jsx(g2, {
                        panel: G
                    })
                }, G.id)
            }), s && o.jsx(n4, {
                onClose: () => a(!1)
            }), i && o.jsx(c4, {
                onClose: () => l(!1)
            }), c && o.jsx(u4, {
                onClose: () => u(!1)
            }), h && o.jsx(kO, {
                onClose: () => d(!1)
            }), o.jsx(ST, {
                open: f,
                onClose: () => x(!1)
            }), o.jsx(DDBTeamModal, {}), o.jsx(DDBAnnounceModal, {}), o.jsx(DDBMemoOverview, {})]
        })
    })
}

function UP9() {
    const [e, t] = O.useState(null);
    return O.useEffect(() => {
        const r = $a();
        if (!r) return;
        r.from("app_meta").select("latest_version,download_url,notes").eq("id", 1).single().then(({
            data: n
        }) => {
            if (!n || !n.latest_version) return;
            const s = (l, c) => {
                    const u = String(l).split(".").map(Number),
                        h = String(c).split(".").map(Number);
                    for (let d = 0; d < 3; d++) {
                        if ((u[d] ?? 0) > (h[d] ?? 0)) return 1;
                        if ((u[d] ?? 0) < (h[d] ?? 0)) return -1
                    }
                    return 0
                },
                a = localStorage.getItem("ddb_skip_ver");
            s(n.latest_version, DDB_VERSION) > 0 && a !== n.latest_version && t(n)
        }).catch(() => {})
    }, []), e ? o.jsxs("div", {
        style: {
            position: "fixed",
            right: 16,
            bottom: 16,
            zIndex: 99998,
            width: 300,
            background: "rgba(20,16,36,0.98)",
            border: "1px solid rgba(96,165,250,0.5)",
            borderRadius: 14,
            padding: "14px 16px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            gap: 8
        },
        children: [o.jsxs("p", {
            style: {
                color: "#93c5fd",
                fontSize: 13,
                fontWeight: 700,
                margin: 0
            },
            children: ["🔔 새 버전 ", e.latest_version, " 사용 가능"]
        }), e.notes && o.jsx("p", {
            style: {
                color: "rgba(255,255,255,0.65)",
                fontSize: 11,
                margin: 0,
                whiteSpace: "pre-wrap"
            },
            children: e.notes
        }), o.jsxs("div", {
            style: {
                display: "flex",
                gap: 6
            },
            children: [o.jsx("button", {
                onClick: () => {
                    const u = e.download_url;
                    if (u && /^https?:\/\//i.test(u)) window.open(u, "_blank");
                    else alert(DDBTR("다운로드 링크가 아직 준비되지 않았습니다. 관리자에게 문의하세요."));
                    t(null)
                },
                style: {
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: 8,
                    border: "none",
                    background: "rgb(59,130,246)",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer"
                },
                children: DDBTR("다운로드")
            }), o.jsx("button", {
                onClick: () => t(null),
                style: {
                    padding: "7px 10px",
                    borderRadius: 8,
                    border: "none",
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 12,
                    cursor: "pointer"
                },
                children: DDBTR("나중에")
            }), o.jsx("button", {
                onClick: () => {
                    localStorage.setItem("ddb_skip_ver", e.latest_version), t(null)
                },
                title: DDBTR("이 버전 알림 다시 보지 않기"),
                style: {
                    padding: "7px 10px",
                    borderRadius: 8,
                    border: "none",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 12,
                    cursor: "pointer"
                },
                children: DDBTR("건너뛰기")
            })]
        })]
    }) : null
}

function LKS() {
    const {
        state: e
    } = vt(), [t, r] = O.useState(() => localStorage.getItem("ddb_locked") === "1"), [n, s] = O.useState(""), [a, i] = O.useState(!1), l = e.settings.lockBg ?? {}, c = e.settings.lockPassword ?? "";
    O.useEffect(() => {
        const h = () => {
            r(!0), s(""), i(!1)
        };
        return window.addEventListener("ddb-lock", h), () => window.removeEventListener("ddb-lock", h)
    }, []);
    if (!t || !c) return null;
    const u = l.type === "image" && l.image ? {
        backgroundImage: `url(${l.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    } : l.type === "solid" ? {
        backgroundColor: l.color || "#0f172a"
    } : {
        background: "linear-gradient(135deg,#1e1b4b 0%,#0f172a 50%,#312e81 100%)"
    };

    function h() {
        n === c ? (localStorage.removeItem("ddb_locked"), r(!1), s(""), i(!1)) : (i(!0), s(""))
    }
    return o.jsx("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...u
        },
        children: o.jsxs("div", {
            style: {
                background: "rgba(0,0,0,0.55)",
                borderRadius: 16,
                padding: "28px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                minWidth: 260,
                backdropFilter: "blur(8px)"
            },
            children: [o.jsx("span", {
                style: {
                    fontSize: 34
                },
                children: "🔐"
            }), o.jsx("p", {
                style: {
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 14,
                    fontWeight: 600,
                    margin: 0
                },
                children: DDBTR("화면이 잠겨 있습니다")
            }), o.jsx("input", {
                type: "password",
                autoFocus: !0,
                value: n,
                onChange: d => {
                    s(d.target.value), i(!1)
                },
                onKeyDown: d => {
                    d.key === "Enter" && h()
                },
                placeholder: DDBTR("비밀번호"),
                style: {
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 10,
                    border: a ? "1px solid rgba(248,113,113,0.8)" : "1px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: 14,
                    textAlign: "center",
                    outline: "none",
                    boxSizing: "border-box"
                }
            }), a && o.jsx("p", {
                style: {
                    color: "rgb(248,113,113)",
                    fontSize: 11,
                    margin: 0
                },
                children: DDBTR("비밀번호가 올바르지 않습니다")
            }), o.jsx("button", {
                onClick: h,
                style: {
                    width: "100%",
                    padding: "9px 0",
                    borderRadius: 10,
                    border: "none",
                    background: "rgb(59,130,246)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer"
                },
                children: DDBTR("잠금 해제")
            })]
        })
    })
}

function XO() {
    const [, ddbLangTick] = O.useReducer(x => x + 1, 0);
    O.useEffect(() => {
        const h = () => ddbLangTick();
        return window.addEventListener("ddb-lang", h), () => window.removeEventListener("ddb-lang", h)
    }, []);
    return o.jsx(Kk, {
        children: o.jsxs(qS, {
            children: [o.jsx(YO, {}), o.jsx(LKS, {}), o.jsx(UP9, {})]
        })
    })
}
class qO extends F2.Component {
    constructor(t) {
        super(t), this.state = {
            err: null
        }
    }
    static getDerivedStateFromError(t) {
        return {
            err: t
        }
    }
    render() {
        return this.state.err ? o.jsxs("div", {
            style: {
                padding: 24,
                background: "#1a0010",
                color: "#ff6b6b",
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                fontSize: 13
            },
            children: [o.jsx("b", {
                style: {
                    fontSize: 16,
                    display: "block",
                    marginBottom: 12
                },
                children: DDBTR("v66: React 에러 발생")
            }), o.jsx("b", {
                children: "Message:"
            }), " ", this.state.err.message, `

`, o.jsx("b", {
                children: "Stack:"
            }), `
`, this.state.err.stack]
        }) : this.props.children
    }
}
export { qO as ErrorBoundary, XO as App, Kk as AppProvider, qS as AuthProvider };
