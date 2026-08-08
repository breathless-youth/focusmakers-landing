-- 0001 을 이미 실행한 DB 를 고치는 패치.
-- 새로 만드는 DB 는 0001 만 실행하면 되고 이 파일은 건너뛴다.
--
-- 문제: 0001 초판이 유니크를 lower(email) 식 인덱스로 걸었는데,
-- ON CONFLICT 는 식 인덱스를 추론하지 못한다. PostgREST 의 on_conflict 는
-- 컬럼명만 받아 lower(email) 을 지정할 방법도 없어서, 신청 upsert 가
-- 42P10 "no unique or exclusion constraint matching the ON CONFLICT
-- specification" 으로 전부 실패했다.
--
-- 해결: 라우트가 어차피 소문자로 정규화해 저장하므로 컬럼에 직접 unique 를
-- 걸고, CHECK 로 대소문자 혼입을 막아 같은 보장을 유지한다.

-- 혹시 대소문자 섞여 들어간 값이 있으면 먼저 정규화한다.
-- (중복이 생기면 아래 unique 추가에서 걸리므로 그때는 수동으로 정리한다)
update public.beta_testers
set email = lower(email)
where email <> lower(email);

alter table public.beta_testers
  add constraint beta_testers_email_key unique (email);

alter table public.beta_testers
  add constraint beta_testers_email_lowercase check (email = lower(email));

-- 컬럼 unique 가 대소문자 무시 보장을 이미 하므로 식 인덱스는 뺀다
drop index if exists public.beta_testers_email_lower_key;
