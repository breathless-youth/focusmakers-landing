-- 로파이 공부방 컨셉 검증용 사전신청 (public/lofi/ 정적 페이지가 쓴다).
-- Supabase 대시보드 > SQL Editor 에 그대로 붙여넣어 실행한다.
--
-- beta_testers 와 달리 서버 라우트 없이 브라우저가 anon(publishable) 키로 바로 넣는다.
-- 그래서 anon 에게 insert 정책 하나만 열고, select 정책은 만들지 않아 목록은 읽을 수 없다.
-- 컬럼 이름은 0001 과 같이 AIP 를 따른다 (생성 시각 create_time).

create table if not exists public.lofi_waitlist (
  id            bigint generated always as identity primary key,
  create_time   timestamptz not null default now(),
  contact_type  text not null check (contact_type in ('email', 'phone')),
  contact       text not null check (char_length(contact) between 5 and 254),
  consent       boolean not null default false check (consent = true),
  scene         text,           -- 신청 직전에 고른 공간 (window / cafe / library / room)
  sound_on      boolean,        -- 소리를 켜봤는지
  variant       text,           -- 랜딩 버전 (config.js 의 LANDING_VARIANT)
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,           -- 광고 소재 구분용으로 쓰기 좋아요
  utm_term      text,
  referrer      text,
  user_agent    text
);

-- 같은 연락처는 한 번만
create unique index if not exists lofi_waitlist_contact_uniq
  on public.lofi_waitlist (contact_type, contact);

-- 보안: 익명 방문자는 '추가'만 가능, 목록 조회·수정·삭제는 불가
alter table public.lofi_waitlist enable row level security;

drop policy if exists "anon can insert lofi_waitlist" on public.lofi_waitlist;
create policy "anon can insert lofi_waitlist"
  on public.lofi_waitlist for insert
  to anon
  with check (consent = true);

-- (select 정책을 만들지 않으므로 anon 키로는 신청 목록을 읽을 수 없어요.
--  신청 목록은 대시보드 Table Editor 나 아래 쿼리로 확인하세요.)


-- ───────── 결과 확인용 쿼리 ─────────

-- 소재(utm_content)별 신청 수
-- select utm_content, count(*) from public.lofi_waitlist group by 1 order by 2 desc;

-- 이메일 vs 전화번호 비율
-- select contact_type, count(*) from public.lofi_waitlist group by 1;

-- 소리를 켜본 사람의 신청 비중
-- select sound_on, count(*) from public.lofi_waitlist group by 1;
