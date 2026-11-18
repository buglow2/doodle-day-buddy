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
- 통화 서식은 `₩#,##0`(¤는 깨진 기호로 보임). 정렬 아이콘은 화살표 말고 "문단 줄 정렬" SVG가 직관적.
- 버그 제보 시 먼저 사용자가 **어느 버전(v4XX)** 을 보는지 확인 — 구버전(캐시/미배포) 때문인 경우 많음. 로컬 테스트는 run.bat(=dist 서빙) + Ctrl+Shift+R.
- `ddb_tables`(독립 표 창)·메모 입력 등 localStorage 전용 데이터는 Supabase 동기화 대상에 넣어야 다른 기기에서 보임(`_tbl`,`_ps`,`_fb`처럼 upsert data에 추가 + 로드 시 복원).
- 큰 신규기능은 구현 전에 문제점·대안 먼저 제시(사용자 조건). 테스트만으로 완료하지 말고 화면/동작 확인.
- 가계부 색상 통일: 입금(+)=파랑, 출금(-)=빨강(일반 가계부 앱 관례). 선택 pill·요약 카드·금액입력 테두리 모두 동일 규칙 유지.
- 가계부 요약은 얇은 한 줄 대신 대시보드 카드 4개(입금합계·출금합계·순수지·총건수)로 표시. 금액유형 선택은 2줄 카드(아이콘+이름), 비활성에도 테두리 상시 표시해 한눈에 구분.
- Tailwind CDN(`cdn.tailwindcss.com`)은 프리뷰 패널에서 네트워크 차단으로 로드 안 됨 → 목업 검증은 인라인 CSS로 작성해야 레이아웃이 제대로 보임.
- 모바일(`mobile/`)은 PC와 달리 깔끔한 일반 React(app.jsx 등). 빌드체크: `esbuild src/app.jsx --loader:.jsx=jsx` → `vite build`. 배포는 사용자가 `mobile/deploy.bat`(= `npm run build` + `surge dist momentplan-buglow-2026.surge.sh`) 실행. PC식 3곳 버전표기는 모바일엔 해당 없음.
- 모바일은 `amount` 있는 이벤트(가계부)를 달력에서 숨김(app.jsx evByDate 필터). 가계부 탭(월별 조회 전용) 추가함 — 입력·수정은 PC에서, 폰은 조회만(동기화 충돌 방지).
- '그날 일기' 관련 데이터원 3종: ⑴`ddbLogAct(kind,detail)`→localStorage `ddb_act_<날짜>`(메모·tool·일정·할일·검색·image), 날짜별 칸 분리라 조회 빠름, 보관 370일(기존 7.7일서 늘림), 동기화 안 됨, `DDBTimelinePanel`("🕒 오늘 활동")이 표시(날짜 ◀▶ 365일). ⑵`state.aiDaily[날짜]={tables,images}` 썸네일(최대30), 동기화됨, `DDBMemoOverview`(메모 상세)가 digDay로 표시. 이미지 저장 시 썸네일(≤170px jpeg0.5) 생성 → aiDaily + ddbLogAct("image") 양쪽 기록. 이미지 썸네일만 용량 큼(글자는 1년치도 가벼움).
- `DDBTileBar`=상단 색색 버튼 바 = 핀고정 D-Day(ddays의 pinTop)+창추가 기능(settings.quickActions). '창추가/기능추가' 메뉴는 494542 근처. D-Day 남은일수 계산은 `ddbPinInfo(dd)`(isYearly 처리).
- 생일·기념일 배너 `DDBAnnivBanner`(렌더목록에 mount): ddays 전체를 ddbPinInfo로 계산, `settings.annivNotify={daysBefore(기본7),daily(기본true)}`, 상단중앙 고정, localStorage `ddb_anniv_dismiss`로 그날 닫기.
- AI 자동정리(`DDBAiFlusher`)는 'AI메모' 탭(id "aimemo")에만 작동 → 캘린더/알림/피드백 연동. 일반 카테고리 탭은 작성 패널 열려있을 때 정오에 초안을 그 탭 items로 자동저장(`persistDraft` 노ун 타이머)+닫을 때 저장. ai메모=캘린더, 일반메모=그 카테고리에 차곡차곡.
