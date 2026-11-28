# CLAUDE.md — MomentPlan(Doodle Day Buddy) 작업 메모 (요약판)

## 사용자·답변 규칙
- 사용자: buglow. **한국어로 답변.** 코딩 지식 적음 → 용어는 쉬운 말로 풀어서.
- 기술 제약이 있으면 착수 전에 먼저 물어볼 것. 큰 신규 기능은 구현 전에 문제점·대안 먼저 제시.
- 보고 형식(매 보고 끝, 1~2줄 요약 금지): **①이번에 한 것 ②아직 못 한 요청 ③사용자가 문제라고 한 것의 처리 상태 ④답이 필요한 질문.** 미완료는 매번 다시 보여준다.
- 버그 제보 시 먼저 어느 버전(v5XX)을 보는지 확인(구버전 캐시·미배포인 경우 많음).
- 코드만 보고 "고쳤다" 하지 말 것 — 화면/동작으로 확인.

## 제품 방향
- 올인원 업무 다이어리: 이미지편집(PPT급)·표(엑셀/한글급)·메모·가계부·D-Day·캘린더.
- 목표: 폰 연동(알림·가계부 조회), 회사 공동사용(팀 공유·권한 분리). 엑셀·한글·PPT 동작을 세밀히 재현, UX 직관성 우선.

## ★★ 창·팝업 규칙 (설명 없이 항상 기본 적용)
- 창(설정창·대화상자·도구창·목록창)은 반드시 `DDBFloatWin`(id,title,init,onClose): 제목줄 끌어 이동 · 가장자리 8방향 크기조절 · 화면 밖/툴바 뒤로 안 숨음 · 누르면 맨 앞 · **위치·크기 기억**(`ddb_fw_<id>`) · **Esc로 닫기**.
- 툴팁·드롭다운·색 선택 등 떠 있는 것은 패널 안에 갇히면 안 됨 → `document.body`로 포털(`Rr.createPortal`) + `position:fixed` + 화면 안 보정. 작은 메뉴는 `DDBPortalPop`(up/matchW) 또는 `ddbFloatPos(anchorEl,w,minH)`. `absolute top-full` 팝업 새로 만들지 말 것.
- 기존 창은 손댈 때 같이 전환(일괄 전환 작업은 안 함).
- 새 창/패널 기본 크기는 넉넉하게, 바꾼 크기는 항상 기억(사용자가 매우 싫어함).
- 마우스 올리면 나타나는 버튼은 글 사이에 끼우지 말 것 → absolute로 겹쳐 띄우고 읽기전용에선 숨김.
- 커스텀 메뉴/대화상자 배경은 불투명. 엑셀식 메뉴는 흰 배경·어두운 글씨.
- **대비 규칙**: 어두운 패널에서 `text-white/45~55` 금지. 라벨 최소 `/80`, 본문 `/85` 이상.

## ★ 위치 바꾸기 공통 규칙
- 순서/위치 바꾸기 = **1초 누르기 → 끌면 놓일 자리 점선 미리보기 → 놓으면 이동**. 짧게 누르면 클릭. 창 이동은 제목줄 바로 끌기(1초 누르기는 단추·항목 자리 바꿀 때만).
- 목록·단추 순서는 `DDBHoldSort`(items/render/onChange/horizontal), 자유 위치는 같은 흐름 직접 구현(예: DDBTimerClock).
- 설정은 그 단추/물건 위 오른쪽 클릭으로 연다.

## 결정된 사항
- 표 닫기 시 수정분은 항상 새 탭(덮어쓰기 안 함). Ctrl+S도 새 탭. 닫기 확인창 유지.
- 일반 메모창(AI메모 외)은 작성 내용 통째로 메모 1개.
- 디자인 관련 설정은 전부 설정창 '🎨 디자인' 탭에.
- 가계부 색: 입금(+)=파랑, 출금(-)=빨강. 통화 서식 `₩#,##0`.
- 메모 Enter·→·←는 목록 안에서 그 자리 펼치기/접기. 편집은 더블클릭·✏수정.
- 폰 알림은 아침 6:30 한 번(브리핑 알림 본문에 D-Day·일정·피드백 합침).
- 폰 가계부는 조회 전용(입력·수정은 PC).

## 구조
- 렌더러: `src/legacy/app.js` 단일 파일(~1.8만 줄, 압축코드 역추출 → 변수명 한 글자). 빌드 `vite`. 전역 톤 CSS는 `src/legacy/app.css` 끝 `DDB-UX-TUNE`·`DDB-SKINS` 블록.
- React=`O`, jsx=`o.jsx/o.jsxs`, createPortal=`Rr`.
- 표: `@fortune-sheet/react`(FortuneSheet). 이미지편집: `fabric.js`(전역 `window.fabric`, 코드상 `fab`).
- 모바일: `mobile/`(Capacitor, 일반 React `app.jsx`). 빌드체크 `esbuild src/app.jsx --loader:.jsx=jsx` → `vite build`. 웹 배포는 사용자가 `mobile/deploy.bat`. APK는 CI(build.yml android 잡).
- 클라우드: Supabase(`user_data` upsert 동기화 + 팀/RLS, 사진은 Storage `photos` 버킷). 배포: GitHub Actions `build.yml` → 릴리스(prerelease로 만들고 첨부 후 publish 잡이 공개).

## 빌드·배포 절차
1. `src/legacy/app.js` 수정 → `node --check` **그리고 반드시 `esbuild` 파싱 체크**(node는 통과해도 vite가 거부하는 구문 있음).
2. `/tmp/bp`에서 `vite build`(세션마다 초기화됨 → src/config 복사 후 `npm install`). /tmp/bp 존재 먼저 확인, 복사는 `cp … && rm … && cp …`로 묶기(dist 지워진 적 있음).
3. dist를 `$R/dist` **와** `$R/electron-app/dist` 양쪽에 복사.
4. 버전 **3곳 동시** 갱신: `const DDB_VERSION`("1.00.XX"), 마커 `children: "v5XX"`, `electron-app/package.json` version("1.0.XX", 앞자리 0 금지).
5. git commit. push는 사용자가 GitHub Desktop에서. CI 실패(Server Error)는 대개 일시적 → Re-run.
6. 폰 기능(플러그인·권한·capacitor.config)을 바꾸면 `mobile/native-since.txt`를 그 릴리스 버전으로 올릴 것(선택 기능이면 대체 동작 두고 안 올림).

## 검증 방법
- 화면 직접 검증: /tmp/bp `vite.iife.mjs`로 한 파일 빌드 → `mk.py pre.js post.js out.html` → 미리보기 스크린샷. `getAllSheets()`는 늦게 반영될 수 있음 → 판정은 화면/DOM으로.
- 실동작: 사용자가 run.bat 실행 → 내장 브라우저로 http://localhost:8080 (비로그인이라 실데이터 안전). 입력은 네이티브 setter+input 이벤트.
- 재시작 흉내 시 localStorage `restore_once_v1`='1' 필요(비로그인이면 기본값으로 시작하는 설계).
- Tailwind CDN은 미리보기에서 차단됨 → 목업은 인라인 CSS. `cursor-*-resize` 등 클래스는 빌드 CSS에 없을 수 있음 → 인라인 style.

## ⚠️ 반복 금지 핵심 주의사항 (한 줄씩)
- app.js 편집 후 node --check만 믿지 말고 `esbuild.transformSync`로도 파싱 확인.
- state 전체가 localStorage(`Ef`)에 저장·클라우드에 올라감 → state에 사진·큰 글 무한정 쌓지 말 것(10MB 넘으면 로그인 풀림·빈 화면). 새 기능이 state를 키우면 보관·한도 설계 같이.
- localStorage에 큰 데이터 금지 → 큰 그림·원본은 IndexedDB(`ddbSaveFullImg`/`ddbGetFullImg`). `aiDaily`엔 썸네일만.
- 클라우드 업로드는 반드시 pull 후에만, 빈 상태로 클라우드 덮어쓰기 금지(`pulledRef`/`cloudNRef`).
- localStorage 전용 데이터(`ddb_tables` 등)는 Supabase upsert data에 넣어야 다른 기기에 보임.
- 폰은 PC의 memoTabs·feedbackMemos를 보기 전용으로 받음 → push 때 덮어쓰지 말 것(폰 push는 합치기).
- 도킹 창 높이는 동기화되는 `panel.slotH` 말고 기기 로컬 `ddb_slot_h` 우선.
- FortuneSheet: `setCellValuesByRange`에 칸 수 다른 2차원 배열 넘기면 **앱 전체 멈춤** → 항상 직사각형.
- FortuneSheet: `getSelection()` 한 칸 선택 시 끝값 null 가능 → 서식 코드는 반드시 `sel()`(=`ddbNormSel`) 경유.
- FortuneSheet ref엔 setContext 없음 → `applyOp([{op:"add",id,path,value}])`. 테두리는 `setCellFormat(...,"bd",…)`. 저장 전 `document.activeElement.blur()`.
- FortuneSheet는 window resize 신호에만 다시 그림 → 표 창 크기 바뀌면 resize 이벤트 보냄. mergeCells는 범위 '배열'.
- 표 단축키는 FortuneSheet가 document 단계에서 먼저 받음 → **window 캡처 단계**에서 가로채고 Alt 단독 keydown도 막기. 편집 중 판정 = `.luckysheet-input-box` zIndex "19".
- 표 기본 우클릭 메뉴는 `cellContextMenu:[]`,`headerContextMenu:[]`로 끄고 커스텀 메뉴.
- 리본 아이콘은 엑셀 그림 복제 금지 → 직접 그린 SVG(`ddbIco`).
- 상단 툴바·TileBar는 사용자가 순서 바꿈 → 고정 구분선·강제 정렬 금지.
- 폰 플러그인은 반드시 `import`로 사용(`window.Capacitor.Plugins.X`로 찾으면 비어 있음 → 알림 0건이었던 치명 버그).
- 폰 터치 끌기: 터치 시작한 요소를 DOM에서 빼면 touchmove/end가 안 옴 → 숨기기만(높이 0) + 요소에도 리스너.
- 폰 업데이트(@capgo) `notifyAppReady()`를 즉시 호출(안 하면 10초 뒤 되돌림).
- APK: setup-android 액션 쓰지 말 것, flatDir에 background-runner libs 추가, 서명은 gradle `-Pandroid.injected.signing.store.file`로 직접 지정(지문 E6:AF:26…).
- `aitimer.js`(outputs)는 임시 사본 — app.js가 원본, 덮어쓰지 말 것.
- AI메모 삽입: DDBDocEditor가 줄 끝 공백을 지움 → 기호 뒤에 자리표시 글을 넣고 선택 상태로.

## 현재 미완료·확인 필요·보류
- **사용자 조치 필요**: 폰이 옛 APK(1.0.98 이전) → 기존 앱 삭제 후 고정 링크(`releases/latest/download/MomentPlan-Android.apk`)로 1회 설치. 그 뒤 자동 갱신.
- **실기(실제 사용) 확인 필요 — PC**: 앱 안 업데이트 설치(SmartScreen 회피, v512~519) · 표 탭 끌어 버리기(v515) · 작업일지 스킨 전체 창 적용(v521) · 셀 서식 대화상자(v522) · 표 리본 1~3단계(v523~525) · AI메모 문단 보내기·구석 타이머 시계·퀵커맨드·타이머/알람 창(v530~533) · D-Day 음력/양력 표기(v534) · 이미지 내보내기 줄바꿈(v533) · 타이머 여러 PC 중복 울림 방지(v538) · AI메모 고화질 원본·편집 화면 선명도(v543~544) · 데이터 유실 안전장치(v545~546) · 표 점선/최대화/Esc/캡처 복사(v547) · D-Day 목록 단추·사진 확대(v548) · 사진 클라우드 보관(v549) · 표 v554 일부(대부분 화면 검증됨).
- **실기 확인 필요 — 폰**: 아침 브리핑·알림(v527·v536) · PC 타이머 폰 알림(APK 재빌드 필요) · 앱 업데이트 A+B(v535) · 자동 로그인·D-Day 필터·오늘 탭 순서(v538·v542·v548) · 뉴스 맞춤 탭(APK 1.0.104).
- **배포 필요**: 폰 웹 D-Day 알림 등(v526) → `mobile/deploy.bat`.
- **점검 후보**: 1342xxx `vm` 호버 목록(bottom-full 애니메이션형) 포털 전환.
- **알려진 한계**: PC는 user_data 실시간 구독 없음(두 PC 동시 켜면 알람 둘 다 울림) · 폰 실시간 푸시는 FCM 필요.
- **보류**: 보안 단계(공개 저장소의 APK 서명 키 → GitHub Secret, PAT·CI 전환·난독화·법적 문서·Private 전환), Microsoft Store(MSIX), 폰 푸시(FCM), 팀 권한, 코드서명 인증서.

## 기록 규칙
- 작업 하나가 끝나면: CLAUDE.md에는 **미완료 항목만** 갱신(완료되면 여기서 지움), 상세 기록(무엇을·왜·어떻게, 함수명·키 이름)은 `docs/작업기록.md` 끝에 추가.
- 새로 알게 된 '반복 금지' 주의사항은 위 ⚠️ 목록에 한 줄로 추가하고 상세는 작업기록에.

자세한 과거 기록·기능별 구현 메모는 docs/작업기록.md 참고(필요할 때만 읽기).
