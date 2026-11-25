-- 기관용 랜딩(/for/[업종])의 무료 시범 운영 신청 (app/api/b2b/apply/route.ts 가 쓴다).
-- Supabase 대시보드 > SQL Editor 에 그대로 붙여넣어 실행한다. 여러 번 돌려도 안전하다.
--
-- 컬럼 이름 규칙은 0001_beta_testers.sql 과 같다 (AIP-140·142·148·216).

create table if not exists public.b2b_leads (
  id uuid primary key default gen_random_uuid(),
  create_time timestamptz not null default now(),

  -- lib/b2b.ts 의 업종 id (online, campus, onlinecare, …).
  -- 업종을 늘릴 때마다 DB 를 고치지 않도록 체크 제약은 걸지 않고 라우트에서 검증한다
  segment text not null,
  organization text not null,
  -- "40", "40명", "약 100" 처럼 자유롭게 적으므로 숫자로 받지 않는다
  headcount text,
  -- 이메일 또는 전화. 담당자가 편한 쪽을 적는다
  contact text not null,

  -- 상담 진행 상태. 대시보드에서 손으로 바꾼다
  state text not null default 'new'
    check (state in ('new', 'contacted', 'meeting', 'pilot', 'contract', 'dropped')),
  note text,

  -- 어느 메일·어느 업종 링크에서 왔는지. 메일 링크에 붙인 값이 그대로 들어온다
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  referrer text,
  user_agent text
);

create index if not exists b2b_leads_create_time_idx
  on public.b2b_leads (create_time);
create index if not exists b2b_leads_segment_idx
  on public.b2b_leads (segment);

-- RLS 를 켜고 정책은 하나도 만들지 않는다. 신청은 서버 라우트가 secret 키로만 쓴다.
alter table public.b2b_leads enable row level security;
revoke all on public.b2b_leads from anon, authenticated;
