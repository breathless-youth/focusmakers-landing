import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용 Supabase 클라이언트.
 *
 * secret 키는 RLS 를 우회하므로 절대 클라이언트로 새면 안 된다.
 * 맨 위 "server-only" 가 클라이언트 컴포넌트에서 import 하는 순간 빌드를
 * 깨뜨려 준다 — 런타임까지 가지 않는다.
 *
 * beta_testers 테이블은 RLS 만 켜 두고 정책을 하나도 만들지 않았다.
 * 즉 이 클라이언트(secret 키) 외에는 읽기도 쓰기도 불가능하다.
 * (supabase/migrations/0001_beta_testers.sql 참고)
 */

const url = process.env.SUPABASE_URL;

// Supabase 가 API 키 이름을 바꾸는 중이다 — 새 프로젝트는 대시보드에
// "secret"(sb_secret_…), 예전 프로젝트는 "service_role"(eyJ…) 로 뜬다.
// 둘 다 RLS 를 우회하므로 어느 이름으로 넣어도 받는다.
const secretKey =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * 환경변수가 없으면 null. 라우트에서 503 으로 처리한다 —
 * 빌드 타임에 던지면 키 없이도 돌아가야 하는 프리뷰·CI 빌드가 깨진다.
 */
export const supabaseAdmin =
  url && secretKey
    ? createClient(url, secretKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

export type BetaTester = {
  email: string;
  platform: "android" | "ios";
  is_waitlisted: boolean;
  referrer: string | null;
  user_agent: string | null;
};
