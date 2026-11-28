# FocusMakers 랜딩

포메(FocusMakers) 서비스 랜딩 페이지. Next.js App Router + Tailwind CSS v4.

메인 랜딩은 2026년 11월 개편안(AI 타이머 · 몰입 환경 · 같이 공부)을 구현한 것이다.
구간 문구는 `app/page.tsx`, 캐릭터·리뷰·별점 같은 내용은 `lib/landing.ts`,
스타일은 `app/landing.css`에 있다.

## 실행

```bash
npm install
npm run dev
```

랜딩은 환경변수 없이 뜬다. 신청 API(`app/api/beta/signup`)를 로컬에서 돌릴
때만 환경변수가 필요하다.

```bash
cp .env.example .env.local   # 값을 채운 뒤 dev 재시작
```

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 서빙 |
| `npm run lint` | ESLint |
| `npm test` | 약관·방침 판 전환 시각 검사 (`scripts/*.test.mjs`, Node 22.6 이상) |

## 구조

```
app/
  page.tsx            랜딩 (서버 컴포넌트, 구간 조립과 문구)
  landing.css         랜딩 전용 스타일 (모든 규칙이 .lp 아래에 있다)
  api/beta/signup/    Android 베타 신청 접수 (랜딩 폼은 내림, API 만 남음)
  privacy · terms · support
components/landing/     랜딩 구간 컴포넌트 (캐릭터·타임테이블·배경음·공부방 등)
components/landing-v2/  스토어 링크·FAQ 아코디언처럼 개편 전부터 쓰던 컴포넌트
lib/
  landing.ts          랜딩 내용 (캐릭터·리뷰·별점·공부방·타임테이블 예시)
  beta.tsx            FAQ와 스토어 플랫폼 타입
  site.ts             서비스 상수 (도메인·문의처·스토어 주소)
  supabase-admin.ts   서버 전용 Supabase 클라이언트
  notify.ts           Slack 알림
  rate-limit.ts       IP 레이트리밋
supabase/migrations/  DB 스키마
```

랜딩에 쓰는 그림·영상·음원은 `public/landing/`에 있다. 배경음 여섯 개는 앱에 실린
CC0 음원과 같은 파일이고, 누른 것만 받아 온다.

별점(`lib/landing.ts`의 `RATINGS`)과 리뷰는 스토어 화면에서 직접 확인한 값만 적는다.

## 스토어 링크

iPhone·Android 모두 정식 출시라 모든 CTA 가 스토어로 직행한다. 주소는
`lib/site.ts` 의 `appStoreUrl` · `playStoreUrl` 두 값이고, 둘 다 랜딩 유입을
구분하는 캠페인 파라미터(App Store `ct`, Google Play `referrer` UTM)를 달고 있다.

Android 베타 신청 폼은 내렸다. 기존 신청자 데이터가 남아 있어 신청 API 와
`beta_testers` 테이블은 그대로 둔다.

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

`supabase/migrations/` 를 번호 순서대로 Supabase SQL Editor 에 붙여넣어 실행한다.
새 DB 는 `0001` 만 실행하면 되고, `0002` 는 `0001` 초판을 이미 돌린 DB 를
고치는 패치라 건너뛴다.

`beta_testers` 는 RLS 를 켜고 정책을 하나도 만들지 않았다 — 브라우저에 나가는
키로는 읽기도 쓰기도 안 되고, 서버 라우트가 secret 키로만 쓴다.
선착순 번호는 `beta_testers_ranked` 뷰가 `create_time` 순서로 계산한다.

컬럼 이름은 Google [AIP](https://google.aip.dev) 를 따른다 — 타임스탬프는
`_time` 접미사(AIP-142), 생성 시각은 `create_time`(AIP-148), 생애주기는
`status` 가 아니라 `state`(AIP-216), 약어 금지(AIP-140).

### 초대 대상 뽑기

```sql
select seat_number, email, create_time
from beta_testers_ranked
where platform = 'android' and state = 'pending'
order by seat_number
limit 20;
```

초대를 보냈으면 상태를 갱신한다.

```sql
update beta_testers
set state = 'invited', invite_time = now()
where email in ('a@example.com', 'b@example.com');
```

## 배포

Vercel. `main` 에 머지되면 프로덕션, PR 은 프리뷰로 나간다.
