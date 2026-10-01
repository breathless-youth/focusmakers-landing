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
export type CtaLocation = "header" | "hero" | "download";

/** 다운로드 섹션으로 보내는 앵커 CTA */
export function trackCtaClick(location: CtaLocation, label: string) {
  track("cta_click", { location, label });
}

/**
 * 스토어로 이탈 — 실질 전환. iPhone 은 app_store_open, Android 는
 * play_store_open 으로 나눠 보낸다.
 * iOS 정식 출시 전에는 같은 자리에서 testflight_open 을, Android 정식 출시
 * 전에는 android_email_signup 을 보냈다. 링크가 향하는 곳이 달라졌으니 이름도
 * 바꾼다 — GA4 보고서에서 두 기간이 섞이면 안 된다.
 */
export function trackStoreOpen(location: CtaLocation, platform: Platform) {
  track(platform === "ios" ? "app_store_open" : "play_store_open", {
    location,
  });
}
