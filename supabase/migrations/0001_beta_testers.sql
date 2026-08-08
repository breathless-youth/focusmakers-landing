-- 베타 테스터 신청 (app/api/beta/signup/route.ts 가 쓴다).
-- Supabase 대시보드 > SQL Editor 에 그대로 붙여넣어 실행한다.
--
-- iPhone 은 TestFlight 링크로 바로 설치돼서 이메일을 받지 않는다.
-- 실질적으로 쌓이는 건 Android 신청과, 모집 마감 후의 대기 명단이다.
--
-- 컬럼 이름은 Google API Improvement Proposals 를 따른다:
--   AIP-140 lower_snake_case, 약어 금지
--   AIP-142 타임스탬프는 _time 접미사
--   AIP-148 생성 시각은 create_time
--   AIP-216 리소스 생애주기는 status 가 아니라 state

create table if not exists public.beta_testers (
  id uuid primary key default gen_random_uuid(),
  create_time timestamptz not null default now(),

  -- 라우트가 항상 소문자로 정규화해 저장하므로 컬럼에 직접 unique 를 건다.
  -- lower(email) 식 인덱스로 잡으면 ON CONFLICT 추론이 안 된다 —
  -- PostgREST 의 on_conflict 는 컬럼명만 받아서 식을 지정할 방법이 없다(42P10).
  -- 대소문자 섞인 값이 다른 경로로 들어오지 못하게 CHECK 로 막아,
  -- unique(email) 이 unique(lower(email)) 과 같은 보장을 하게 한다.
  email text not null unique check (email = lower(email)),
  -- 'android' | 'ios'. 체크로 묶어 오타가 들어오지 않게 한다
  platform text not null check (platform in ('android', 'ios')),
  -- 1차 모집 마감 후 들어온 신청(대기 명단)인지. lib/beta.tsx 의 BETA_CLOSED
  is_waitlisted boolean not null default false,

  -- 초대 진행 상태. Play Console 초대가 수동이라 여기서 관리한다
  state text not null default 'pending'
    check (state in ('pending', 'invited', 'joined', 'rejected')),
  invite_time timestamptz,

  -- 유입 분석용. 없을 수 있다
  referrer text,
  user_agent text
);

-- 선착순 정렬과 상태별 조회
create index if not exists beta_testers_create_time_idx
  on public.beta_testers (create_time);
create index if not exists beta_testers_state_idx
  on public.beta_testers (state);

-- RLS 를 켜고 정책은 하나도 만들지 않는다.
-- 브라우저에 나가는 키(anon/publishable)로는 읽기도 쓰기도 안 된다.
-- 신청은 서버 라우트가 secret 키로만 쓴다.
alter table public.beta_testers enable row level security;

-- 선착순 번호. create_time 순서로 매기며, 초대 대상을 고를 때 쓴다.
-- 컬럼으로 박으면 삭제·복구 시 어긋나므로 뷰로 계산한다.
--
-- security_invoker = true 가 중요하다. 뷰는 기본적으로 "소유자 권한"으로
-- 실행돼서 밑에 깔린 테이블의 RLS 를 우회한다 — 그대로 두면 public 스키마의
-- 뷰가 PostgREST 로 노출되면서 anon 이 신청자 전체를 읽을 수 있다.
-- invoker 로 바꾸면 조회한 역할의 RLS 가 적용돼 anon 에게는 0행이 된다.
create or replace view public.beta_testers_ranked
  with (security_invoker = true) as
  select
    t.*,
    row_number() over (order by t.create_time) as seat_number
  from public.beta_testers t;

-- PostgREST 로 아예 안 보이게 접근 자체를 회수한다 (security_invoker 와
-- 이중 방어). 대시보드/secret 키 조회에는 영향 없다.
revoke all on public.beta_testers_ranked from anon, authenticated;
revoke all on public.beta_testers from anon, authenticated;
