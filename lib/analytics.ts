import { sendGAEvent } from "@next/third-parties/google";
import type { Platform } from "@/lib/beta";

/**
 * GA4 커스텀 이벤트.
 *
 * 태그는 프로덕션에서만 심으므로(app/layout.tsx) 로컬·프리뷰에서는
 * dataLayer 가 없다. sendGAEvent 가 내부에서 조용히 넘어가지만,
 * 예상 못 한 예외로 클릭 핸들러가 죽지 않게 한 번 더 감싼다 —
 * 계측이 기능을 망가뜨리면 안 된다.
 *
 * 이벤트·파라미터 이름은 GA4 규칙을 따른다(snake_case, 40자 이내).
 * 파라미터를 보고서에서 쪼개 보려면 GA4 관리 > 맞춤 정의에 등록해야 한다.
 */

type Params = Record<string, string | number | boolean>;

function track(event: string, params: Params = {}) {
  try {
    sendGAEvent("event", event, params);
  } catch {
    // 계측 실패는 무시한다
  }
}

/** CTA 를 누른 위치. 어느 자리의 버튼이 실제로 먹히는지 보려고 나눈다 */
export type CtaLocation = "header" | "hero" | "how" | "apply";

/** 신청 카드·참여 방법으로 보내는 앵커 CTA */
export function trackCtaClick(location: CtaLocation, label: string) {
  track("cta_click", { location, label });
}

/**
 * App Store 로 이탈 — iPhone 쪽 실질 전환.
 * iOS 정식 출시 전에는 같은 자리에서 testflight_open 을 보냈다. 링크가 향하는
 * 곳이 달라졌으니 이름도 바꾼다 — GA4 보고서에서 두 기간이 섞이면 안 된다.
 */
export function trackStoreOpen(location: CtaLocation) {
  track("app_store_open", { location });
}

/** iPhone / Android 탭 전환. 자동 추측을 사용자가 뒤집는 비율도 보인다 */
export function trackPlatformSelect(
  platform: Platform,
  location: CtaLocation,
) {
  track("platform_select", { platform, location });
}

/**
 * 이메일 신청 완료 — Android 쪽 실질 전환.
 * iPhone 은 이메일 없이 app_store_open 으로 빠지므로 두 이벤트가 각 경로의
 * 전환을 나눠 갖는다. platform 파라미터는 남겨 둔다 — 값은 사실상 android
 * 뿐이지만, 폼이 다시 양쪽에 열릴 때 지표가 끊기지 않는다.
 */
export function trackEmailSignup(platform: Platform, isWaitlist: boolean) {
  track("android_email_signup", { platform, is_waitlist: isWaitlist });
}
