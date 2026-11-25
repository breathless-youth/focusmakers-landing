import { NextResponse } from "next/server";
import { SEGMENT_IDS } from "@/lib/b2b";
import { notifyB2bLead } from "@/lib/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * 기관용 랜딩의 도입 문의 접수.
 *
 * 베타 신청 라우트와 같은 이유로 브라우저가 DB에 직접 쓰지 않는다 —
 * 서버에서 값을 다시 검증하고, IP 레이트리밋을 걸고, secret 키를 숨긴다.
 * b2b_leads 에는 anon 정책이 없어 이 경로 외에는 못 쓴다.
 */

/** 서버리스 인스턴스 메모리를 레이트리밋에 쓰므로 정적 최적화를 막는다 */
export const dynamic = "force-dynamic";

function bad(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

/** 앞뒤 공백을 떼고 길이를 자른다. 문자열이 아니거나 비어 있으면 null */
function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    console.error("[b2b/apply] SUPABASE_URL / SUPABASE_SECRET_KEY 미설정");
    return bad("신청을 처리할 수 없어요. 잠시 후 다시 시도해 주세요.", 503);
  }

  const ip = clientIp(request.headers);
  const limited = rateLimit(`b2b-apply:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, message: "요청이 너무 잦아요. 잠시 후 다시 시도해 주세요." },
      { status: 429, headers: { "retry-after": String(limited.retryAfterSec) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = ((await request.json()) ?? {}) as Record<string, unknown>;
  } catch {
    return bad("요청을 이해하지 못했어요.", 400);
  }

  const segment = text(body.segment, 40);
  const organization = text(body.organization, 100);
  const contact = text(body.contact, 100);

  if (!segment || !SEGMENT_IDS.includes(segment)) {
    return bad("페이지를 새로 고친 뒤 다시 시도해 주세요.", 400);
  }
  if (!organization) return bad("기관 이름을 적어 주세요.", 400);
  if (!contact) return bad("연락받을 이메일이나 전화번호를 적어 주세요.", 400);
  if (body.consent !== true) return bad("개인정보 수집에 동의해 주세요.", 400);

  const lead = {
    segment,
    organization,
    headcount: text(body.headcount, 20),
    contact,
    utm_source: text(body.utmSource, 100),
    utm_medium: text(body.utmMedium, 100),
    utm_campaign: text(body.utmCampaign, 100),
    utm_content: text(body.utmContent, 100),
    referrer: request.headers.get("referer"),
    user_agent: request.headers.get("user-agent"),
  };

  const { error } = await supabaseAdmin.from("b2b_leads").insert(lead);
  if (error) {
    console.error("[b2b/apply] insert 실패", error);
    return bad("신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.", 500);
  }

  await notifyB2bLead(lead);

  return NextResponse.json({ ok: true });
}
