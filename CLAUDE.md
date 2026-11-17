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
- 통화 서식은 `₩#,##0`(¤는 깨진 기호로 보임). 정렬 아이콘은 화살표 말고 "문단 줄 정렬" SVG가 직관적.
- 버그 제보 시 먼저 사용자가 **어느 버전(v4XX)** 을 보는지 확인 — 구버전(캐시/미배포) 때문인 경우 많음. 로컬 테스트는 run.bat(=dist 서빙) + Ctrl+Shift+R.
- `ddb_tables`(독립 표 창)·메모 입력 등 localStorage 전용 데이터는 Supabase 동기화 대상에 넣어야 다른 기기에서 보임(`_tbl`,`_ps`,`_fb`처럼 upsert data에 추가 + 로드 시 복원).
- 큰 신규기능은 구현 전에 문제점·대안 먼저 제시(사용자 조건). 테스트만으로 완료하지 말고 화면/동작 확인.
