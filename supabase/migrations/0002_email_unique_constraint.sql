-- 0001 초판을 이미 실행한 DB 를 고치는 패치. 여러 번 돌려도 안전하다.
--
-- 문제: 0001 초판이 유니크를 lower(email) 식 인덱스로 걸었는데, ON CONFLICT 는
-- 식 인덱스를 추론하지 못해 신청 upsert 가 42P10 으로 전부 실패했다.
--
-- 주의: 0001 은 `create table if not exists` 라서, 정의를 고친 0001 을 기존
-- DB 에 다시 돌려도 아무 일도 일어나지 않는다. 반드시 이 파일을 실행해야 한다.
--
-- 해결: 라우트가 어차피 소문자로 정규화해 저장하므로 컬럼에 직접 unique 를
-- 걸고, CHECK 로 대소문자 혼입을 막아 같은 보장을 유지한다.

-- 혹시 대소문자 섞여 들어간 값이 있으면 먼저 정규화한다.
-- (정규화 후 중복이 생기면 아래 unique 추가가 실패하므로 그때는 수동 정리)
update public.beta_testers
set email = lower(email)
where email <> lower(email);

-- 이미 있으면 넘어간다 (중복 실행 대비)
do $$
begin
  alter table public.beta_testers
    add constraint beta_testers_email_key unique (email);
exception
  when duplicate_table or duplicate_object then
    raise notice 'beta_testers_email_key 이미 있음 — 건너뜀';
end $$;

do $$
begin
  alter table public.beta_testers
    add constraint beta_testers_email_lowercase check (email = lower(email));
exception
  when duplicate_object then
    raise notice 'beta_testers_email_lowercase 이미 있음 — 건너뜀';
end $$;

-- 컬럼 unique 가 대소문자 무시 보장을 이미 하므로 식 인덱스는 뺀다
drop index if exists public.beta_testers_email_lower_key;

-- PostgREST 스키마 캐시 갱신
notify pgrst, 'reload schema';

-- ── 확인 ────────────────────────────────────────────────────────────
-- email 에 unique 가 걸렸는지. 한 행이라도 나와야 정상이다.
select conname, pg_get_constraintdef(oid) as definition
from pg_constraint
where conrelid = 'public.beta_testers'::regclass
  and contype = 'u';
