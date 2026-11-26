# CLAUDE.md — MomentPlan(Doodle Day Buddy) 작업 메모

사용자: buglow. 한국어로 답변. 코딩 지식 적으므로 용어는 풀어서 설명. 기술 제약 있으면 착수 전에 먼저 물어볼 것.

## 제품 방향 (요약)
- 올인원 업무 다이어리: 이미지편집(PPT급)·표(엑셀/한글급)·메모·가계부·D-Day·캘린더를 한 앱에서.
- 핸드폰 연동(알림·가계부 조회), 회사 공동사용(팀 공유·쓰기/편집 권한 분리)이 최종 목표.
- 참고 프로그램(엑셀·한글·PPT)의 동작·습성까지 세밀히 재현. UX/UI 직관성 우선.

## ★★ 팝업·툴팁 규칙 (사용자 반복 지적 — 절대 다시 지적받지 말 것)
- 툴팁·설명창·드롭다운·색 선택 등 **떠 있는 창은 절대 패널/창 안에 갇히면 안 됨**(패널 overflow에 잘림). 반드시 `document.body`로 포털(`Rr.createPortal`) + `position:fixed` + 화면 경계 안으로 위치 보정.
- 이미 있는 도구 사용: `DDBPortalPop`(부모 요소 기준 자동 배치·아래 공간 부족하면 위로·`up`/`matchW` 옵션) 또는 `ddbFloatPos(anchorEl,w,minH)`. 새로 `className:"absolute top-full …"` 팝업 만들지 말 것.
- v516에서 AI메모 ⓘ·색 팔레트·메모/할일/Do 색 선택·이미지편집 드롭다운·배속 선택을 포털로 전환. 남은 후보: 1342xxx `vm` 호버 목록(bottom-full, 애니메이션형) — 다음에 같이 점검.

## 요청 추적 (★매 보고 끝에 이 목록을 사용자에게 보여주고 갱신할 것 — 사용자 지시)
보고 형식: ①이번에 한 것 ②아직 못 한 요청 ③사용자가 문제라고 한 것의 처리 상태 ④답이 필요한 질문. 1~2줄 요약 금지. 사용자가 다 안 읽고 다음 지시할 수 있으므로 미완료는 매번 다시 보여준다.
- [완료·push대기] 팝업이 창 안에 갇혀 잘리는 문제 → 화면 전체 기준으로 뜨게(포털) 전환 (v516)
- [완료·push대기] AI메모 ⓘ = 클릭 팝업(규칙 7개 정리·기호 바로 변경·버튼으로 명령 넣기, 넣으면 '내용' 자리 선택돼 바로 입력) (v515)
- [완료·push대기] 표 창 가장자리 8방향 크기조절(커서 표시)+우하단 손잡이 강조 (v515)
- [완료·push대기] 표 창 닫기: 안 고쳤으면 바로 닫힘, 고쳤으면 '표 N' 새 탭 저장(원본 유지) (v515)
- [완료·push대기] 표 탭 끌면 바로 위(~90px)에 🗑 버리기 칸 + 메모 폴더 칸, 버리면 8초 '되돌리기' (v515) — 실제 마우스 끌기는 실기 확인 필요
- [완료·push대기] 디자인 관련 설정 전부 '🎨 디자인' 탭으로 통합(스킨·요일색·기능버튼 모양·글꼴/크기·패널) (v514)
- [완료·push대기] AI메모 자동정리: 빈 줄(엔터 2번)로 나눈 묶음=일정 1개, 첫 줄=제목·나머지=일정 메모. '지금 정리' 버튼도 같은 규칙(~~·!! 포함) (v514)
- [완료·push대기] 메모 창 열 때 항상 전부 접힌 목록 (v514)
- [완료·push대기] 메모/표 끌어서 상단 바에 놓기→버튼 생성, 버튼=보기 전용 팝업+✏수정 (v513)
- [완료·설치확인 필요] 메모 Enter/→/← 그 자리 펼치기·접기 (v511)
- [실기 확인 중] 앱 안 업데이트 설치(SmartScreen 회피) (v512, v518 앱측·v519 서버측 타이밍 수정) — v515→1.0.79 알림에서 첫 실제 테스트 요청함. v517: 알림 문구를 OS별 파일목록 대신 "앱이 직접 설치" 안내로 변경, 실패 사유 표시
- [완료·push대기] 도킹 메모창 기본 높이 340px(약 8줄)·끌어서 바꾼 높이를 이 기기에 저장(`ddb_slot_h`, 재시작해도 유지)·하단 손잡이 굵게/보이게 (v520)
- [완료·push대기] 읽기전용 팝업에서 마우스 올리면 "⠿ 이동" 버튼이 끼어들어 글 위치가 밀리던 문제 → 읽기전용엔 안 뜸, 편집모드에선 겹쳐 떠서 안 밀림 (v520)
- [완료·push대기] 메모 작성칸에서 Esc → 쓰던 글 저장하고 목록으로 (v521)
- [완료·화면확인 필요] 작업일지 스킨을 모든 창(data-ddb-panel)·대화상자·팝업으로 확장(CSS, 가계부 파랑/빨강 테두리는 유지) (v521)
- [완료·push대기] 표 탭 끌 때 휴지통은 항상 탭 위(아래로 끌다 실수 삭제 방지), 메모 폴더는 아래 (v521)
- [완료·push대기] 이미지편집: 도형 선택 후 +/- = 선 굵기(그룹·다중선택 포함), 이미지·글자만 크기 (v521)
- [완료·push대기] 달력 제목 좁을 때 줄바꿈 안 되게(한 줄·말줄임) (v521)
- [완료·push대기] 가계부 하단 입금/출금/전체 호버 목록도 포털로(창 안에 안 갇힘) (v521)
- [완료·push대기] 가계부 소분류(subCategory) 입력칸+자동완성(이전 입력값), 엑셀 내보내기 소분류 열 (v521)
- [완료·실기 확인 필요] 셀 서식 대화상자 엑셀식 전면 재작성(v522): 표시형식 보기·범주별 옵션·사용자 지정, 맞춤 8/5종+방향 다이얼, 글꼴 목록·미리보기, 테두리 선 모양 그림·미리보기·클릭 적용, 채우기 팔레트+무늬 18종
- [완료·실기 확인 필요] 1단계: 표 리본 [홈]/[페이지 레이아웃] 탭 + 페이지 레이아웃(여백·방향·크기·인쇄영역·나누기·인쇄제목·크기조정·시트옵션) + 새 인쇄 화면(엑셀 파일→인쇄식)·페이지 설정 대화상자 (v523)
- [완료·실기 확인 필요] 2단계: 홈 탭 엑셀 배치 재구성(클립보드·글꼴·맞춤·표시형식·스타일·셀·편집, 분할단추·메뉴 18종, 서식 복사, 자동합계, 채우기, 지우기, 찾기/바꾸기, 빠른 실행 💾↶↷) (v524)
- [완료·실기 확인 필요] 3단계(v525): 조건부 서식(셀 강조 6종·상위/하위 4종·색조 5종(정적)·규칙 지우기·규칙 관리자), 표 서식 9종(머리글·줄무늬·테두리), 화면 페이지 나누기 점선, 인쇄 머리글/바닥글(페이지 번호·날짜·표 이름)
- [완료·배포 필요(deploy.bat)] 폰: D-Day 미리 알림(7·3·1일 전·당일)+🔔알림일정+피드백 메모 알림, 음력 매년(isLunar), 100일 단위(countUp), 오늘 탭 알림 카드·피드백 목록, 달력에 PC 메모·피드백·D-Day 점 표시 (v526/모바일)
- [완료·push대기] PC D-Day도 음력(isLunar) 실제 계산(이전엔 음력 날짜를 양력으로 계산하던 버그)·100일 단위 옵션 (v526)
- [완료·APK 빌드 성공(v1.0.92), 폰 설치·알림 실기 확인 필요] 휴대폰 설치형 앱(APK) 자동 빌드(build.yml android 잡) + 아침 브리핑(지수·환율·뉴스 제목, 정한 시각 이후 15분 주기 백그라운드 확인 → 알림 1회) (v527)
- [완료·push대기] 색조 = 규칙 저장(page.scales) + 값 바뀌면 1.5초 안에 자동 재칠 (v526)
- [완료·v521 보호장치] 로그인 없이 시작 시 기존 데이터를 `ddb_autobak_v1`에 보관 + 설정→백업·복구에 "🛟 되돌리기", 빈 상태는 파일 백업 안 함. (원래 설계: 로컬 데이터는 (자동로그인+세션 있음) 또는 restore_once 일 때만 불러옴(679xxx `Ef`). 세션 만료 상태로 켜면 빈 상태로 시작 → 저장(Hv)이 기존 로컬 데이터를 덮을 수 있음. 데이터 유실 사례와 연관 가능성.
- [완료·실기 확인 필요] AI메모 문단 → 기능 보내기(v530): 헤더 '⇄ 보내기' 또는 왼쪽 색 띠에 0.45초 마우스 → 왼쪽 서랍(💬피드백·✅할 일·📋Do!·⏱타이머) + 문단 카드. 단추를 문단에 끌기 / 문단 1초 눌러 단추로 끌기 / 문단 오른쪽 클릭 메뉴. 보낸 문단은 AI메모에서 항상 빠짐
- [완료·실기 확인 필요] 화면 구석 타이머 시계(v530): 기본 우하단, 현재 시각+가장 가까운 타이머 남은 시간, 30분 전부터 노랑→주황→빨강, 0초 팝업·소리·데스크톱 알림·5분 뒤 다시. 클릭=목록/새 타이머, 오른쪽 클릭=설정(위치·현재시각·색 시작 10/30/60분·소리·📱휴대폰에도 알림·숨기기)
- [완료·APK 재빌드 필요] 폰: '휴대폰에도 알림' 켠 PC 타이머를 동기화로 받아 그 시각 LocalNotification 예약 + 오늘 탭 '⏱ PC 타이머' 카드. 한계: 폰 앱이 동기화(열기)된 뒤에 예약됨 → 진짜 실시간 푸시는 FCM(보류)
- [완료·실기 확인 필요] 퀵커맨드(v531): 이름 '⚡ 퀵커맨드'. 단추 위 오른쪽 클릭=설정(단추 보이기/숨기기·순서(1초 눌러 끌기)·여는 곳 2개 켜기/끄기·타이머 빠른 시간 편집). 여는 곳 = ①AI메모 왼쪽 색 띠/⚡ 단추 ②화면 맨 왼쪽 끝 서랍(마우스 대거나 문단 끌고 오면 나옴) — 사용자가 둘 다 써 보고 하나 끌 예정
- [완료·실기 확인 필요] 타이머 창(v531): ⏱ 타이머(빠른 시간 사용자 편집·N분 뒤·시:분 한 번) / ⏰ 알람(시:분+매일·평일·주말·요일 반복). 시계 목록에서 알람 켜기/끄기·삭제, 시계 1초 눌러 끌기로 구석 이동, 폰 알림 🔔소리/🔕무음 선택
- [보류] 보안 단계(공개 배포 저장소·PAT·CI 전환·난독화·법적 문서·Private 전환), Microsoft Store(MSIX), 폰 푸시(FCM), 팀 권한
- 결정됨: 표 닫기 시 수정분은 항상 새 탭(덮어쓰기 안 함). Ctrl+S도 새 탭.
- 결정됨: 일반 메모창(AI메모 외)은 작성 내용 통째로 메모 1개(현행 유지). 스킨 등 모든 디자인 설정은 '디자인' 탭에.

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

## ★ 위치 바꾸기 공통 규칙 (사용자 지정 — 앞으로 모든 기능에 동일 적용)
- 무엇이든 순서/위치 바꾸기 = **1초 누르기 → 끌면 놓일 자리를 점선으로 미리보기 → 놓으면 그 자리로 이동**. 짧게 누르면 그냥 클릭. 목록·단추 순서는 `DDBHoldSort`(items/render/onChange/horizontal) 재사용, 자유 위치(구석 등)는 같은 흐름으로 직접(예: DDBTimerClock onDown + 점선 고스트).
- 설정은 그 단추/물건 위에서 오른쪽 클릭으로 연다(퀵커맨드·시계 공통).

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
- **업데이트 SmartScreen 경고 대책(v512)**: 경고 원인=브라우저로 받은 설치파일에 붙는 '인터넷에서 받은 파일' 표시(MOTW). UP9 "업데이트 설치" 버튼이 Electron이면 `ddbNative.updateInstall(url)`→main.js `ddb-update-install`이 Node https로 직접 다운로드(`ddbDownloadFile`, github/githubusercontent만 허용, 리다이렉트 추적, .part→rename) 후 `설치파일 --updated /S --force-run` 실행+app.quit. 진행률은 `ddb-update-progress`. 실패 시 브라우저 폴백. 웹(run.bat)엔 ddbNative 없음→기존대로 브라우저. 이 기능이 든 버전을 한 번은 수동 설치해야 그 다음부터 적용. 근본 해결은 코드서명(OV 인증서) 또는 Microsoft Store(MSIX, 개인 등록 무료) — Azure Artifact Signing은 개인=미국·캐나다만.
- 설정창 탭(i4): 달력·기능·🎨디자인·언어·사생활·피드백·잠금·단축키. '글꼴·크기'·'패널' 탭은 디자인으로 합침(`x === "design"` 블록 3개 연속 렌더). 디자인 관련 새 설정은 무조건 디자인 탭에 넣을 것(사용자: 애매하게 나누면 찾기 힘듦).
- 테스트로 앱 재시작 흉내낼 때 localStorage에 `restore_once_v1`='1' 넣어야 저장 데이터를 불러옴(비로그인이면 기본값으로 시작하는 설계).
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
- 표 창 수정여부: DDBLibGrid가 열린 뒤 0.9초 시점 셀값·서식 서명(baseSig)과 비교 → `window.__ddbTblDirty()`, 새 탭 저장 `window.__ddbTblSaveNew()`. 탭 이름은 `ddbNextTblName`(최대 번호+1). Tailwind `cursor-*-resize` 클래스는 빌드 CSS에 없을 수 있음 → 커서는 인라인 style로.
- AI메모 삽입 버튼: DDBDocEditor가 줄 끝 공백을 지움 → "기호 " 뒤에 자리표시 글("알림 내용")을 넣고 그 부분을 선택해 바로 덮어쓰게 함. 피드백 판정은 기호로 시작하기만 하면 됨(공백 불필요).
- **업데이트 알림 타이밍 버그(v518 수정)**: CI가 Release 껍데기를 먼저 만들고 설치파일은 몇~10분 뒤 첨부 → 그 사이 앱이 "새 버전"을 감지하면 exe가 없어 릴리스 페이지(브라우저)로 보냄. 이제 UP9는 내 OS용 설치파일이 첨부된 경우에만 알림, 없으면 4분마다 재확인(평소 1시간마다). Electron에선 exe 아닌 주소로 브라우저 열지 않음.
- **근본 해결(v519, build.yml)**: 릴리스를 처음엔 prerelease(시험판)로 만들고, 설치파일 첨부 후 마지막 `publish` 잡이 `gh release edit --prerelease=false --latest`로 공개. releases/latest는 시험판을 안 보여주므로 **이미 설치된 옛 버전 앱도** 빈 릴리스를 못 봄. app_meta 갱신(bumpmeta)도 publish 뒤로.
- **도킹 창 높이**: 상태의 `panel.slotH`는 클라우드 동기화로 옛 값에 덮일 수 있음 → 기기 로컬 `ddb_slot_h`(키: 메모="m:"+memoTabId, 그 외 "t:"+type)를 우선 사용(`ddbSlotH`). 높이 미지정 메모 창은 `DDB_SLOT_MINH`(340). 사용자: 창 기본 크기 작아서 매번 늘리는 것 극혐 — 새 창/패널 기본 크기는 넉넉하게, 바꾼 크기는 항상 기억.
- 마우스 올렸을 때 나타나는 버튼(이동 등)은 절대 글 사이에 끼워 넣지 말 것(레이아웃 밀림) → absolute로 겹쳐 띄우고, 읽기전용에선 아예 숨김.
- **셀 서식(DDBCellFmtDialog, v522)**: 확인 누를 때 바뀐 항목만 적용(dirty). 테두리는 border-none 후 남은 선 재적용. 무늬 채우기 = bg에 "ddbpat:무늬:무늬색:배경색" 저장 + CanvasRenderingContext2D.fillStyle setter 패치(ddbInstallPatternFill)로 캔버스 무늬 변환. FortuneSheet 지원 한계: 들여쓰기·셀에 맞춤·위/아래 첨자·시트보호는 미지원(대화상자에 "미지원" 표시), 채우기/양쪽/균등 정렬은 근사 표시+안내. tb 자동줄바꿈 = "2"(문자). 회전 rt 0~180(음수각=90-각), 세로쓰기 tr "3". 미리보기 검증: 대화상자만 esbuild로 묶은 하네스(/tmp/bp/h) + jsdom.
- **표 인쇄(v523)**: `ddbBuildPrint(sheet,page,opt)`가 FortuneSheet 시트(data·config.merge/borderInfo/columnlen/rowlen/숨김)를 페이지별 HTML로 변환(열·행 분할, 반복 행/열, 수동 나누기, 배율·맞춤, 가운데 맞춤, 눈금선/머리글 인쇄). 인쇄는 숨은 iframe + @page size. 페이지 설정은 표 탭 객체 `tables[i].page`에 저장(ddb_tables). 화면 눈금선/머리글 보기는 `wbRef.setContext`. 리본 메뉴는 DDBPortalPop. 아이콘은 엑셀 그림 복제 금지 → 직접 그린 SVG(`ddbIco`). Ctrl+P = 인쇄 화면.
- **표 리본 버튼 무반응 근본원인(v524)**: FortuneSheet `getSelection()`이 한 칸 선택 시 row/column 끝값이 비어(null) 올 수 있음 → setCellFormatByRange 루프가 0회 → 아무 일도 안 일어남. `sel()`이 항상 `ddbNormSel`로 [시작,끝] 채워 반환하도록 수정. 새 서식 코드도 반드시 sel() 경유.
- 홈 리본 메뉴는 `HM[키]`(렌더마다 채움) → `lmenuItems`가 먼저 HM을 봄. 큰 단추(LBigRaw)는 본체=실행, ▼=메뉴(엑셀 분할 단추).
- **FortuneSheet ref에는 setContext가 없음**(내부 훅 전용) → 시트/컨텍스트 값 변경은 `wbRef.current.applyOp([{op:"add", id: 시트id(없으면 ctx 루트), path:[...], value}])`. 조건부 서식 = 시트의 `luckysheet_conditionformat_save`(type "default" 규칙만 신뢰; FortuneSheet의 dataBar/colorGradation 계산 코드는 버그 → 색조는 정적 칠하기로 대체, 데이터 막대 미지원). 인쇄 시 조건부 서식은 `ddbCFMap`으로 직접 계산. 페이지 나누기 점선 = `ddbBuildPrint(...,{breaksOnly})` 좌표 + `.luckysheet-scrollbar-x/y` 스크롤값으로 그리드 위에 겹쳐 그림.
- **D-Day 공통 규칙**: PC `ddbDdInfo`(app.js) = 폰 `ddayInfo`(mobile/src/dday.js). 음력=`isLunar`(date의 월·일을 음력으로 보고 해마다 양력 변환, korean-lunar-calendar), 100일 단위=`countUp`(시작일=1일째). PC는 라이브러리를 비동기 로드(`PT()`→`window.__ddbLunarCls`). 폰 알림은 `mobile/src/remind.js`(설치형 앱=LocalNotifications 30일치 9시 예약, 웹=열 때 카드+알림 1회). 폰은 PC의 memoTabs·feedbackMemos를 보기 전용으로 받아옴(sync.js pcExtras) — push 때 절대 덮어쓰지 않음.
- **안드로이드 APK(v527)**: android/ 폴더는 저장소에 안 넣고 CI에서 `npx cap add android`로 매번 생성 → 매니페스트에 POST_NOTIFICATIONS·SCHEDULE_EXACT_ALARM sed 추가 → `assembleDebug`. 서명은 `mobile/android-signing/debug.keystore`(alias androiddebugkey/pw android)를 ~/.android에 복사해 고정(업데이트 설치 가능). ⚠️공개 저장소에 키 있음 → 보안 단계 때 GitHub Secret으로 옮길 것. 아침 브리핑: `mobile/public/runners/background.js`(Background Runner, 15분 간격, CapacitorKV에 설정·발송일 저장) + 앱 카드 `src/brief.js`(CapacitorHttp로 CORS 우회; 웹은 환율만). 자료: Yahoo chart API(비공식·지연), open.er-api.com(환율, 하루 1회 갱신), Google News RSS(제목만). android 잡은 publish의 needs에 포함(첨부가 publish 뒤에 되면 prerelease로 되돌려지는 문제 방지).
- CI 실패 원인 확인법: 저장소가 공개라 `https://api.github.com/repos/buglow2/doodle-day-buddy/actions/runs?per_page=1` → `/runs/<id>/jobs`(어느 잡·단계 실패) → `/check-runs/<job id>/annotations`를 web_fetch로 직접 볼 수 있음(로그 원문은 인증 필요). Capacitor 8 CLI는 Node 22+ 필요(android 잡 node 22). bumpmeta는 `if: always() && publish 성공`(다른 잡 실패 시 건너뛰던 문제).
- **폰 알림 하나로(사용자 결정)**: 아침 6:30 한 번. 브리핑 켜짐 → 백그라운드 브리핑 알림 본문 맨 앞에 그날 D-Day·🔔일정·피드백(`cfg.rem` = 앱이 `mp_rem_cache`로 넘김), 별도 LocalNotifications 예약은 취소. 브리핑 꺼짐 → 같은 시각에 LocalNotifications로 따로. android 잡: setup-android + sdkmanager(API 36), 실패 시 로그 요약을 `::error` 주석으로 출력(annotations API로 원인 확인 가능).
- **퀵커맨드·알람(v531)**: `settings.quickCmd={order,hidden,stripOn,edgeOn,presets}`(`ddbQcCfg`/`ddbSetQc`), `settings.alarms=[{id,label,hm,days(0=일),on}]`(`ddbAlarmNext`, 울린 기록 localStorage `ddb_alarm_fired`), 폰 무음=`timerClock.phoneSound`. 서랍↔카드 연결은 window 이벤트(`ddb-qc-dragstart/dragend/open/run/chunkdrag`), 서랍 단추 끌기 시작하면 AI메모가 자동으로 퀵커맨드 화면으로. 폰: pcExtras가 timerClock.phone 켜졌을 때만 timers·alarms·tsound 전달, 알람은 LocalNotifications `schedule.on{weekday(일=1),hour,minute}` 반복, 소리/무음은 채널 `mp_timer_snd`/`mp_timer_mute`(importance 5/2).
- **타이머(v530)**: `settings.timers=[{id,label,at,phone}]`(동기화됨), 시계 설정 `settings.timerClock={pos,showNow,warnMin,sound,phone,hidden}`. `DDBTimerClock`(렌더목록 DDBAnnivBanner 옆)·`DDBTimerPick`·`DDBAiSendMode`·`ddbAiChunks/ddbAiRemoveChunk`. 폰은 sync.js pcExtras→timers, remind.js `scheduleTimers`(id 7800000~). 검증 하네스: aitimer 코드+스텁을 esbuild로 묶어 jsdom(/tmp/bp/h2), drop 이벤트에 dataTransfer 직접 붙여 테스트.
- APK 빌드 필수 수정: ①setup-android 액션 쓰지 말고 러너 기본 SDK(`$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager`) ②`android/app/build.gradle` flatDir에 `../../node_modules/@capacitor/background-runner/android/src/main/libs` 추가(없으면 "Could not find :android-js-engine-release:").
