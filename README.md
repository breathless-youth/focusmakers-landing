# FocusMakers 랜딩

포메(FocusMakers) 서비스 랜딩 페이지. Next.js App Router + Tailwind CSS v4.

Claude Design 프로젝트 [FocusMakers Landing v2](https://claude.ai/design/p/cc6d01ad-890c-4187-9d57-1609e5fb3090?file=FocusMakers+Landing+v2.dc.html)
시안을 구현한 것으로, 카피·수치·모션 값은 시안 기준이다.

## 실행

```bash
npm install
npm run dev
```

알림·저장소를 붙이려면 환경변수가 필요하다.

```bash
cp .env.example .env.local   # 값을 채운 뒤 dev 재시작
```

> **아직 신청이 저장되지 않는다.** `app/api/beta/signup/route.ts` 가 검증과
> 알림까지만 하고 DB 쓰기 자리는 TODO 로 비어 있다. 실제 모집을 시작하기 전에
> 저장소를 연동해야 한다.

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 서빙 |
| `npm run lint` | ESLint |

## 구조

```
app/
  page.tsx            랜딩 (서버 컴포넌트, 섹션 조립)
  api/beta/signup/    베타 신청 접수 — 검증·레이트리밋·Slack 알림
  privacy · terms · support
components/landing-v2/  랜딩 전용 컴포넌트 (목업·폼·아코디언 등)
lib/
  beta.tsx            모집 설정과 섹션 카피
  site.ts             서비스 상수 (도메인·문의처)
  notify.ts           Slack 알림
  rate-limit.ts       IP 레이트리밋
```

기기 목업은 시안 좌표계(402×874pt)로 그린 뒤 컨테이너 폭에 맞춰 축소한다.
덕분에 안쪽 수치를 앱 디자인에서 그대로 옮겨 쓸 수 있다 —
`components/landing-v2/PhoneFrame.tsx` 참고.

## 베타 모집 운영

`lib/beta.tsx` 상단 값만 바꾸면 된다.

| 값 | 설명 |
| --- | --- |
| `BETA_CLOSED` | `true` 로 두면 전 기기가 대기 명단 폼으로 바뀌고 헤더·히어로·CTA 문구도 함께 전환된다 |
| `TESTFLIGHT_URL` | iPhone 이 바로 열 TestFlight 초대 링크 |
| `BETA_DEADLINE` | 신청 폼의 D-day 계산 기준 |
| `BETA_SEATS` | 선착순 인원 |

iPhone 은 TestFlight 링크로 직행하므로 이메일을 받지 않는다.
Android 신청만 DB 에 쌓인다.


## 환경변수

| 이름 | 필수 | 설명 |
| --- | --- | --- |
| `SLACK_WEBHOOK_URL` | | 신청 알림용 Incoming Webhook. 없으면 알림 없이 접수만 한다 |

서버 전용 키에는 `NEXT_PUBLIC_` 접두사를 붙이지 않는다.
Vercel 에 넣을 때는 Production 과 Preview 양쪽에 넣어야 PR 프리뷰에서도 동작한다.

## 배포

Vercel. `main` 에 머지되면 프로덕션, PR 은 프리뷰로 나간다.
