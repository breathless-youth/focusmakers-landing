# FocusMakers 랜딩

포메(FocusMakers) 서비스 랜딩 페이지. Next.js App Router + Tailwind CSS v4.

Claude Design 프로젝트 [FocusMakers Landing v2](https://claude.ai/design/p/cc6d01ad-890c-4187-9d57-1609e5fb3090?file=FocusMakers+Landing+v2.dc.html)
시안을 구현한 것으로, 카피·수치·모션 값은 시안 기준이다.

## 실행

```bash
npm install
npm run dev
```

베타 신청 폼을 로컬에서 확인하려면 환경변수가 필요하다.

```bash
cp .env.example .env.local   # 값을 채운 뒤 dev 재시작
```

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
  api/beta/signup/    베타 신청 접수 — Supabase 저장 + Slack 알림
  privacy · terms · support
components/landing-v2/  랜딩 전용 컴포넌트 (목업·폼·아코디언 등)
lib/
  beta.tsx            모집 설정과 섹션 카피
  site.ts             서비스 상수 (도메인·문의처)
  supabase-admin.ts   서버 전용 Supabase 클라이언트
  notify.ts           Slack 알림
  rate-limit.ts       IP 레이트리밋
supabase/migrations/  DB 스키마
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
| `SUPABASE_URL` | ○ | Project URL. 공개 값이라 `.env.example` 에 채워져 있다 |
| `SUPABASE_SECRET_KEY` | ○ | secret 키(`sb_secret_…`). 예전 프로젝트면 service_role 키도 된다 |
| `SLACK_WEBHOOK_URL` | | 신청 알림용 Incoming Webhook. 없으면 알림 없이 저장만 한다 |

secret 키는 RLS 를 우회한다. `NEXT_PUBLIC_` 접두사를 붙이지 말 것 —
`lib/supabase-admin.ts` 가 `server-only` 로 클라이언트 번들 유입을 빌드 타임에 막는다.

Vercel 에 넣을 때는 Production 과 Preview 양쪽에 넣어야 PR 프리뷰에서도 동작한다.
키가 없으면 신청 API 가 503 을 돌려주고, 랜딩의 나머지는 정상 동작한다.

## DB

`supabase/migrations/0001_beta_testers.sql` 을 Supabase SQL Editor 에 붙여넣어 실행한다.

`beta_testers` 는 RLS 를 켜고 정책을 하나도 만들지 않았다 — 브라우저에 나가는
키로는 읽기도 쓰기도 안 되고, 서버 라우트가 secret 키로만 쓴다.
선착순 번호는 `beta_testers_ranked` 뷰가 `created_at` 순서로 계산한다.

### 초대 대상 뽑기

```sql
select seat_no, email, created_at
from beta_testers_ranked
where platform = 'android' and status = 'pending'
order by seat_no
limit 20;
```

초대를 보냈으면 상태를 갱신한다.

```sql
update beta_testers
set status = 'invited', invited_at = now()
where email in ('a@example.com', 'b@example.com');
```

## 배포

Vercel. `main` 에 머지되면 프로덕션, PR 은 프리뷰로 나간다.
