# MomentPlan Mobile (Android) — 준비 스캐폴드

이 폴더는 **핸드폰용 간단 버전**의 시작 뼈대입니다. PC 버전의 모든 기능이 아니라,
아래 4가지만 담는 걸 목표로 합니다.

- 등록된 **일정 확인** (월/일자별)
- **일정 입력**
- **D-Day 확인**
- **알림(로컬 알림) 내보내기**

기술 방식은 앞서 정한 대로 **하이브리드 앱(Capacitor)** 입니다.
지금 이 폴더의 화면(React)을 그대로 안드로이드 앱(APK)으로 감쌉니다.

---

## 1) 지금 바로 브라우저에서 화면 확인 (개발용)

```bash
cd mobile
npm install
npm run dev
```
→ 나오는 주소(예: http://localhost:5173)를 브라우저에서 열면 폰 크기로 미리 볼 수 있어요.
반응형이라 어떤 폰 비율이든 자동으로 맞춰집니다.

## 2) 안드로이드 앱(APK)으로 만들기

```bash
# 최초 1회만
npm install
npx cap add android

# 화면을 바꿀 때마다
npm run build
npx cap sync
npx cap open android      # Android Studio가 열립니다 → Run 버튼으로 폰/에뮬레이터 실행
```

APK 배포:
- Android Studio에서 Build → Generate Signed Bundle/APK
- 구글 플레이 올리려면 개발자 등록 1회 $25 (앞서 안내)

## 3) 알림(로컬 알림)

`src/notify.js` 가 Capacitor Local Notifications 플러그인을 사용합니다.
설치:
```bash
npm install @capacitor/local-notifications
npx cap sync
```
일정에 알림 시각을 넣으면 그 시각에 폰 알림이 뜹니다. (앱이 꺼져 있어도 예약 알림은 동작 — 단, 안드로이드 배터리 절약 정책으로 몇 분 밀릴 수 있음)

## 4) PC 데이터와 동기화 (다음 단계)

지금은 폰 자체 저장소(localStorage)에 저장합니다. **PC와 같은 데이터를 보려면**
PC 버전이 이미 쓰는 **Supabase(클라우드)** 에 일정을 같이 저장하도록 연결하면 됩니다.
`src/data.js` 안에 동기화 붙일 자리(TODO)를 표시해 두었습니다. 데이터 구조(events)는
PC 버전과 동일하게 맞춰 두어서, 나중에 클라우드만 연결하면 폰↔PC가 같은 일정을 보게 됩니다.

일정 데이터 형식(PC와 동일):
```json
{ "id": "ev-xxx", "title": "여름휴가", "date": "2026-09-01", "endDate": "2026-09-02", "color": "blue", "isAllDay": true }
```

---

## 파일 설명
- `src/app.jsx` — 폰 화면 전체 (오늘 / 달력 / 일정추가 / D-Day 탭)
- `src/data.js` — 일정·D-Day 저장/불러오기 (클라우드 동기화 붙일 자리)
- `src/notify.js` — 폰 알림 예약
- `capacitor.config.json` — 앱 이름/ID 설정
- `package.json` — 필요한 패키지 목록
