import "server-only";

/**
 * 인스턴스 메모리에 얹은 최소 레이트리밋.
 *
 * 서버리스라 인스턴스마다 카운터가 따로 놀고 콜드스타트로 초기화된다 —
 * 분산 환경에서 정확한 제한은 아니다. 목적은 한 클라이언트가 폼을 연타하거나
 * 단순 봇이 같은 커넥션으로 밀어넣는 걸 막는 것까지다. 본격적인 방어가
 * 필요해지면 Upstash Redis 같은 외부 저장소로 옮긴다.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** 메모리가 무한히 늘지 않도록 만료된 항목을 걷어낸다 */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 } = {},
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }
  return { ok: true, retryAfterSec: 0 };
}

/** Vercel 앞단 프록시를 고려한 클라이언트 IP 추출 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
