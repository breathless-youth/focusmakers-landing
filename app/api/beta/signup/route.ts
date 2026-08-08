import { NextResponse } from "next/server";
import { BETA_CLOSED, type Platform } from "@/lib/beta";
import { notifySignup } from "@/lib/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * 베타 테스터 신청 접수.
 *
 * 브라우저가 DB에 직접 쓰지 않고 이 라우트를 거친다 — 이메일을 서버에서
 * 다시 검증하고, IP 레이트리밋을 걸고, secret 키를 클라이언트에 노출하지
 * 않기 위해서다. beta_testers 에는 anon 정책이 없어 이 경로 외에는 못 쓴다.
 */

/** 서버리스 인스턴스 메모리를 레이트리밋에 쓰므로 정적 최적화를 막는다 */
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLATFORMS: Platform[] = ["android", "ios"];

function bad(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    console.error("[beta/signup] SUPABASE_URL / SUPABASE_SECRET_KEY 미설정");
    return bad("신청을 처리할 수 없어요. 잠시 후 다시 시도해 주세요.", 503);
  }

  const ip = clientIp(request.headers);
  const limited = rateLimit(`beta-signup:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, message: "요청이 너무 잦아요. 잠시 후 다시 시도해 주세요." },
      { status: 429, headers: { "retry-after": String(limited.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("요청을 이해하지 못했어요.", 400);
  }

  const { email, platform } = (body ?? {}) as {
    email?: unknown;
    platform?: unknown;
  };

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return bad("이메일 주소 형식을 확인해 주세요", 400);
  }
  if (typeof platform !== "string" || !PLATFORMS.includes(platform as Platform)) {
    return bad("기기 정보를 확인해 주세요", 400);
  }

  const normalized = email.trim().toLowerCase();

  // 같은 이메일로 다시 신청해도 에러 대신 기존 신청을 그대로 둔다.
  // onConflict 는 email unique 제약을 탄다 —
  // ignoreDuplicates 라 먼저 들어온 create_time / state 가 덮이지 않는다.
  const { error } = await supabaseAdmin.from("beta_testers").upsert(
    {
      email: normalized,
      platform: platform as Platform,
      is_waitlisted: BETA_CLOSED,
      referrer: request.headers.get("referer"),
      user_agent: request.headers.get("user-agent"),
    },
    { onConflict: "email", ignoreDuplicates: true },
  );

  if (error) {
    console.error("[beta/signup] insert 실패", error);
    return bad("신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.", 500);
  }

  // 몇 번째 신청인지 — 알림 문구에만 쓰므로 실패해도 접수를 막지 않는다
  const { count } = await supabaseAdmin
    .from("beta_testers")
    .select("*", { count: "exact", head: true });

  await notifySignup({
    email: normalized,
    platform: platform as Platform,
    isWaitlist: BETA_CLOSED,
    seatNo: count ?? null,
  });

  return NextResponse.json({ ok: true });
}
