import { NextResponse } from "next/server";
import { BETA_CLOSED, type Platform } from "@/lib/beta";
import { notifySignup } from "@/lib/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * 베타 테스터 신청 접수.
 *
 * 브라우저가 DB에 직접 쓰지 않고 이 라우트를 거친다 — 이메일을 서버에서
 * 다시 검증하고, IP 레이트리밋을 걸고, DB 자격증명을 클라이언트에
 * 노출하지 않기 위해서다.
 *
 * TODO(저장소 연동): 지금은 검증만 하고 서버 로그에만 남긴다.
 * 아래 "신청 저장" 자리에 DB 쓰기를 붙이면 된다. 붙일 때 챙길 것:
 *   - 같은 이메일 재신청은 에러 대신 기존 신청을 살려 두기(멱등)
 *   - 이메일 유니크는 lower(email) 기준으로 (대소문자 무시)
 *   - 저장 실패 시 500 을 돌려주고 notifySignup 은 건너뛰기
 */

/** 서버리스 인스턴스 메모리를 레이트리밋에 쓰므로 정적 최적화를 막는다 */
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLATFORMS: Platform[] = ["android", "ios"];

function bad(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
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

  // ── 신청 저장 ────────────────────────────────────────────────────────
  // 저장소를 붙이기 전까지는 로그로만 남긴다. 신청이 유실되므로
  // 실제 모집을 시작하기 전에 반드시 연동해야 한다.
  console.info("[beta/signup] 접수", {
    email: normalized,
    platform,
    isWaitlist: BETA_CLOSED,
  });
  // ─────────────────────────────────────────────────────────────────────

  await notifySignup({
    email: normalized,
    platform: platform as Platform,
    isWaitlist: BETA_CLOSED,
    seatNo: null,
  });

  return NextResponse.json({ ok: true });
}
