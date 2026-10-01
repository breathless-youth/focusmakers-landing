"use client";

import { trackStoreOpen, type CtaLocation } from "@/lib/analytics";
import type { Platform } from "@/lib/beta";
import { SITE } from "@/lib/site";

/**
 * App Store / Google Play 로 나가는 링크 + 이탈 계측.
 *
 * 헤더·히어로·다운로드 섹션이 같은 주소를 쓰므로 href 와 rel 을 한곳에 모아
 * 둔다. page.tsx 는 서버 컴포넌트여서 onClick 을 달 수 없어 CtaLink 와 같은
 * 이유로 래퍼가 필요하다.
 */
export function StoreLink({
  location,
  platform,
  ariaLabel,
  className,
  children,
}: {
  location: CtaLocation;
  platform: Platform;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={platform === "ios" ? SITE.appStoreUrl : SITE.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={() => trackStoreOpen(location, platform)}
    >
      {children}
    </a>
  );
}
