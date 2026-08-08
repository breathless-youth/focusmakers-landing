import "server-only";

/**
 * 신청이 들어오면 Slack Incoming Webhook 으로 알린다.
 * 80석 한정이고 Play Console 초대가 수동이라, 대시보드를 계속 보지 않아도
 * 되도록 알림을 붙였다.
 *
 * SLACK_WEBHOOK_URL 이 없으면 조용히 넘어간다 — 알림은 부가 기능이라
 * 실패해도 신청 접수 자체를 막지 않는다.
 */

export async function notifySignup(input: {
  email: string;
  platform: "android" | "ios";
  isWaitlist: boolean;
  seatNo: number | null;
}) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;

  const device = input.platform === "android" ? "Android" : "iPhone";
  const kind = input.isWaitlist ? "대기 명단" : "베타 테스터";
  const seat = input.seatNo === null ? "" : ` · ${input.seatNo}번째`;

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: `새 ${kind} 신청 — ${input.email} (${device})${seat}`,
      }),
      // 알림 때문에 응답이 늦어지지 않게 짧게 끊는다
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // 알림 실패는 신청 접수에 영향을 주지 않는다
  }
}
