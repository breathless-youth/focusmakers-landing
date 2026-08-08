"use client";

import { trackStoreOpen, type CtaLocation } from "@/lib/analytics";
import { SITE } from "@/lib/site";

/**
 * App Store 로 나가는 링크 + 이탈 계측.
 *
 * 히어로·참여 방법·신청 카드 세 자리가 같은 주소를 쓰므로 href 와 rel 을 한곳에
 * 모아 둔다. page.tsx 는 서버 컴포넌트여서 onClick 을 달 수 없어 CtaLink 와
 * 같은 이유로 래퍼가 필요하다.
 */
export function StoreLink({
  location,
  className,
  children,
}: {
  location: CtaLocation;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={SITE.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackStoreOpen(location)}
    >
      {children}
    </a>
  );
}
