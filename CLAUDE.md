# CLAUDE.md — MomentPlan(Doodle Day Buddy) 작업 메모

사용자: buglow. 한국어로 답변. 코딩 지식 적으므로 용어는 풀어서 설명. 기술 제약 있으면 착수 전에 먼저 물어볼 것.

## 제품 방향 (요약)
- 올인원 업무 다이어리: 이미지편집(PPT급)·표(엑셀/한글급)·메모·가계부·D-Day·캘린더를 한 앱에서.
- 핸드폰 연동(알림·가계부 조회), 회사 공동사용(팀 공유·쓰기/편집 권한 분리)이 최종 목표.
- 참고 프로그램(엑셀·한글·PPT)의 동작·습성까지 세밀히 재현. UX/UI 직관성 우선.

## 구조
- 렌더러: `src/legacy/app.js` 단일 파일(~1.8만 줄, 역추출 압축코드 → 변수명 단일문자). 빌드 `vite`.
- 표: `@fortune-sheet/react`(FortuneSheet). 이미지편집: `fabric.js`(전역 `window.fabric`, 코드상 `fab`). React=`O`, jsx=`o.jsx/o.jsxs`, createPortal=`Rr`.
- 모바일: `mobile/`(Capacitor). 클라우드: Supabase(`user_data` upsert 동기화 + 팀/RLS). 배포: GitHub Actions `build.yml` → 릴리스에 설치파일 첨부.

## 빌드·배포 절차
1. `src/legacy/app.js` 수정 → `node --check` **그리고 반드시 `esbuild` 파싱 체크**(node는 통과해도 rollup/vite가 거부하는 구문 있음).
2. `/tmp/bp`에서 `vite build`(세션 경계마다 /tmp/bp 초기화됨 → src/config 복사 후 `npm install` 재실행).
3. dist를 `$R/dist` **와** `$R/electron-app/dist` 양쪽에 복사.
4. 버전은 **3곳 동시** 갱신: `const DDB_VERSION`("1.00.XX"), 마커 `children: "v4XX"`, `electron-app/package.json` version("1.0.XX", 앞자리 0 금지).
5. git commit. push는 사용자가 GitHub Desktop에서(샌드박스엔 깃 인증 없음). CI 실패(Server Error)는 대개 일시적 → Re-run.

## 배운 점 (반복 금지)
- app.js 편집 후 node --check만 믿지 말 것 — `esbuild.transformSync`로도 파싱 확인(IIFE/맵 괄호 짝 실수를 node는 통과시킴).
- FortuneSheet 테두리: config.borderInfo 직접수정+리로드는 반영 안 됨 → 네이티브 `wbRef.getCellFormat`… 즉 `setCellFormat(row,col,"bd",{borderType,color,style,range})` 사용(즉시 반영).
- FortuneSheet 저장 시 입력 중인 셀 미확정 문제 → `getAllSheets()` 전에 `document.activeElement.blur()`로 강제 확정.
- 표 저장은 "현재 내용으로 새 탭 추가"가 사용자가 원하는 방식(눈에 보이게). 닫기 확인창(예/아니오)은 유지.
- 표 기본 우클릭 메뉴는 `cellContextMenu:[]`,`headerContextMenu:[]`로 끄고 커스텀 메뉴를 onContextMenu로 표시.
- 커스텀 메뉴/대화상자 배경은 불투명. 엑셀식 메뉴는 흰 배경·어두운 글씨.
- **[대비 규칙·반복지적]** 어두운 배경 패널에서는 글씨 대비를 충분히. 섹션/라벨에 `text-white/45`·`/50`·`/55` 같은 낮은 불투명도 쓰지 말 것(흐릿함). 라벨은 최소 `text-white/80`, 본문 `text-white/85` 이상. 새 패널/대화상자 만들 때마다 배경색 대비 글씨가 읽히는지 반드시 확인. (예: 이미지편집 '도형 서식' 패널에서 반복 지적됨)
- UX/UI 통일(심미적사용성·제이콥·피츠): 전역 톤은 `src/legacy/app.css` 맨끝 `DDB-UX-TUNE` 블록(버튼 전환·:focus-visible 링·스크롤바 통일·::selection·disabled 흐림). 상단 툴바(calBtnOrder)·TileBar는 사용자가 순서변경/숨김 가능 → 고정 구분선 금지(재배치 시 어긋남). 메뉴 묶음(힉·밀러)은 기능추가/창추가 메뉴 그룹헤더로. 대화상자 CTA(폰 레스토프)는 주요=bg-blue-500, 보조=bg-white/10 관례 유지.
- 스킨: `settings.uiSkin`(기본default/classic·modern·minimal + 신규 workshop·midnight). 선택 UI 2곳(447353·1353052). `DDBAnnivBanner`가 `document.documentElement`에 `data-ddbskin` 지정. app.css 끝 `DDB-SKINS` 블록이 스킨별로 파랑 유틸(.bg-blue-*/.text-blue-*/.border-blue-*/.ring/.accent) → 악센트 변수(--sk 황동/청록)로 치환+배경 글로우. 전체 레이아웃 리스킨은 인라인 색 하드코딩이라 위험 → 악센트+배경만 테마화(색 스킨). 깊은 레이아웃안은 목업 momentplan_design_v2(황동/슬레이트 작업일지)로 별도. **workshop 스킨 달력 리디자인 적용**: 달력 그리드에 `ddbc-grid`, 요일행에 `ddbc-dow` 훅 클래스 부착(998376·965172) → app.css `DDB-SKIN workshop 달력` 블록이 따뜻한 슬레이트 패널+황동 요일선/격자/hover로 치환. 레이아웃 전면 리라이트는 안 함(CSS만, 안전·opt-in).
- 'frontend-design' 플러그인 설치됨(스킬 `frontend-design:frontend-design`). 'UI/UX Pro Max'는 디렉토리에 없음 → 2번째 스킨은 자체 디자인(미드나잇).
- 통화 서식은 `₩#,##0`(¤는 깨진 기호로 보임). 정렬 아이콘은 화살표 말고 "문단 줄 정렬" SVG가 직관적.
- 버그 제보 시 먼저 사용자가 **어느 버전(v4XX)** 을 보는지 확인 — 구버전(캐시/미배포) 때문인 경우 많음. 로컬 테스트는 run.bat(=dist 서빙) + Ctrl+Shift+R.
- `ddb_tables`(독립 표 창)·메모 입력 등 localStorage 전용 데이터는 Supabase 동기화 대상에 넣어야 다른 기기에서 보임(`_tbl`,`_ps`,`_fb`처럼 upsert data에 추가 + 로드 시 복원).
- 큰 신규기능은 구현 전에 문제점·대안 먼저 제시(사용자 조건). 테스트만으로 완료하지 말고 화면/동작 확인.
- 가계부 색상 통일: 입금(+)=파랑, 출금(-)=빨강(일반 가계부 앱 관례). 선택 pill·요약 카드·금액입력 테두리 모두 동일 규칙 유지.
- 가계부 요약은 얇은 한 줄 대신 대시보드 카드 4개(입금합계·출금합계·순수지·총건수)로 표시. 금액유형 선택은 2줄 카드(아이콘+이름), 비활성에도 테두리 상시 표시해 한눈에 구분.
- Tailwind CDN(`cdn.tailwindcss.com`)은 프리뷰 패널에서 네트워크 차단으로 로드 안 됨 → 목업 검증은 인라인 CSS로 작성해야 레이아웃이 제대로 보임.
- 모바일(`mobile/`)은 PC와 달리 깔끔한 일반 React(app.jsx 등). 빌드체크: `esbuild src/app.jsx --loader:.jsx=jsx` → `vite build`. 배포는 사용자가 `mobile/deploy.bat`(= `npm run build` + `surge dist momentplan-buglow-2026.surge.sh`) 실행. PC식 3곳 버전표기는 모바일엔 해당 없음.
- 모바일은 `amount` 있는 이벤트(가계부)를 달력에서 숨김(app.jsx evByDate 필터). 가계부 탭(월별 조회 전용) 추가함 — 입력·수정은 PC에서, 폰은 조회만(동기화 충돌 방지).
- '그날 일기' 관련 데이터원 3종: ⑴`ddbLogAct(kind,detail)`→localStorage `ddb_act_<날짜>`(메모·tool·일정·할일·검색·image), 날짜별 칸 분리라 조회 빠름, 보관 370일(기존 7.7일서 늘림), 동기화 안 됨, `DDBTimelinePanel`("🕒 오늘 활동")이 표시(날짜 ◀▶ 365일). ⑵`state.aiDaily[날짜]={tables,images}` 썸네일(최대30), 동기화됨, `DDBMemoOverview`(메모 상세)가 digDay로 표시. 메모상세 '일기'는 `sel==="aimemo"`일 때만 뜨는 날짜 strip(2×2: 📌일정·📊표·🖼이미지·🕒그날 한 일). 열 때 sel 기본=aimemo로 설정해 바로 일기가 보이게 함. '그날 한 일' 칸은 ddb_act 로그(todo/tool/search/memo/image)+그날 가계부(events amount)를 시각순 통합 표시, 이미지는 썸네일. 이미지 저장 시: 작은 썸네일(≤150px)→aiDaily(동기화)+ddbLogAct("image")마커, **큰 미리보기(≤1280px jpeg0.62)→`ddb_imgbig_<날짜>`(localStorage, 비동기, 60/일, 370일 보관)**. 라이트박스는 big 우선, 없으면 썸네일. ⚠️aiDaily는 state라 동기화됨+날짜 prune 없음 → 큰이미지 절대 넣지 말 것(용량 폭증). 라이트박스는 background-size:contain으로 화면 채움(작은 원본은 soft). 구버전 저장분은 big 없어서 soft.
- `DDBTileBar`=상단 색색 버튼 바 = 핀고정 D-Day(ddays의 pinTop)+창추가 기능(settings.quickActions). '창추가/기능추가' 메뉴는 494542 근처 — 그룹 헤더(🔎검색/🛠도구/📌바로가기)로 정리함. 바 타일은 셀기반 드래그 재배치(0.7s 롱프레스)라 강제 정렬 금지(레이아웃 깨짐) — 사용자가 직접 배치. D-Day 남은일수 계산은 `ddbPinInfo(dd)`(isYearly 처리).
- 우측 세로탭 '창 추가' 메뉴(1709xxx): 버그였음 — 메뉴 폭을 버튼(세로탭~45px) 폭에 맞추고 위로 열려 거의 안 보였음. 폭 224px 고정+화면 안 보정+아래로 열림+그룹 헤더로 수정.
- 생일·기념일 배너 `DDBAnnivBanner`(렌더목록에 mount): ddays 전체를 ddbPinInfo로 계산, `settings.annivNotify={daysBefore(기본7),daily(기본true)}`, 상단중앙 고정, localStorage `ddb_anniv_dismiss`로 그날 닫기.
- 메모 패널(`jw`, 1076xxx): 기본 모드 "list"(목록 먼저). 항목 펼치기(Enter/→/Ctrl+→)는 `setFocusId`(읽기뷰, 커서 없음)로 — 이전엔 하단 작성칸 편집모드로 점프해 커서 깜빡/꼬임. 읽기뷰 헤더에 ✏ 수정 버튼(편집 진입). **qT 단일클릭=펼치기(onToggleExpand, 읽기·커서없음), 더블클릭=편집**(R함수의 setTimeout을 u(!0)→i()로 변경). jw 키: →=펼치기(expanded=true), ←=접기, Enter=solo focusId. 이전엔 클릭이 200ms 뒤 u(!0) 편집진입→커서 깜빡 민원. **근본원인(v510 수정)**: qT 텍스트 읽기분기가 첫줄 `k`만 렌더하고 본문 `E`를 아예 안 그렸음 → 펼쳐도 변화 없음. 이제 `b && T`면 본문 읽기전용 표시, 접힘+본문있음이면 "⌄ 펼치기", Enter는 자동 펼침 후 읽기뷰.
- 메모 키 동작(v511 확정): Enter·→·←는 **목록 안에서 그 자리 펼치기/접기**(Enter=토글). 별도 읽기화면(← 목록으로/수정)으로 넘기지 말 것 — 사용자가 "이상한 동작"이라 함. 편집은 더블클릭·수정버튼.
- **자체 검증(사용자 도움 불필요)**: /tmp/bp에서 `vite.iife.mjs`(format iife, inlineDynamicImports, outDir dist-iife)로 빌드 → index.html script를 `defer`로 → 같은 bash 호출 안에서 `python3 -m http.server 8080 &` + jsdom 스크립트(/tmp/memotest2.cjs: 새 메모→네이티브 setter→Ctrl+Enter→목록→keydown 디스패치→textContent 판정). jsdom은 type=module 실행 못 함.
- **실동작 검증 방법(필수)**: 사용자가 run.bat 실행 → 내장 브라우저(mcp__Claude_Browser)로 http://localhost:8080 열기(별도 프로필·비로그인이라 실데이터 안전) → 테스트 메모는 textarea에 네이티브 setter+input 이벤트로 넣고 Ctrl+Enter → 클릭/키 후 `document.body.innerText`·`activeElement`로 판정. 코드만 보고 "고쳤다" 하지 말 것. 샌드박스 playwright는 네트워크 차단으로 불가. 탐색기는 click 티어라 run.bat 직접 실행 불가. 메모 패널 기본크기 380×820, `ddb_memo_wh`에 크기 저장(Td 효과)·복원(ddbMemoWH, 생성 5곳).
- 국가별 공휴일: 설정 → "🎌 공휴일 표시" 체크 → "나라(공휴일)" 드롭다운(`settings.holidays.country`, `DDB_COUNTRIES`, `ddbLoadHolidays`→`window.__ddbHolMap`). 달력 셀(996172)이 __ddbHolMap로 공휴일명 표시. **설정 '🌐 언어' 탭에도 나라 선택 드롭다운 추가**(접근성). 언어↔나라 매핑 `DDB_REGION`(lang→{hol,locale,hour12,weekStart}). `ddbSetLang(l)`=DDB_LANG+localStorage"ddb_lang"+"ddb-lang"이벤트(리로드 없음). 첫 실행 국가선택 모달 `DDBCountrySetup`(렌더목록): localStorage "ddb_setup_done" 없으면 표시(기존 데이터 있으면 조용히 플래그만), 선택 시 holidays.country+언어 설정. 기본 한국(ko).
- 달력 칸 일정 넘침: `_evCap`(calRowH>0이면 높이맞춤, 아니면 4) 초과 시 `be.slice`로 접고 "+N개 더" 칩 → 클릭하면 그날 팝업(`he`/state `te`) 전체 표시. 칸 996700 근처.
- AI 자동정리(`DDBAiFlusher`)는 'AI메모' 탭(id "aimemo")에만 작동 → 캘린더/알림/피드백 연동. 일반 카테고리 탭은 작성 패널 열려있을 때 정오에 초안을 그 탭 items로 자동저장(`persistDraft` 노ун 타이머)+닫을 때 저장. ai메모=캘린더, 일반메모=그 카테고리에 차곡차곡.
