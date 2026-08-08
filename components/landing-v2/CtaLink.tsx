"use client";

import { trackCtaClick, type CtaLocation } from "@/lib/analytics";

/**
 * 앵커 CTA + 클릭 계측.
 *
 * 헤더·히어로·참여 방법 CTA 는 전부 #apply 로 가는 앵커라, GA4 기본 수집만
 * 으로는 어느 자리에서 눌렀는지 구분할 수 없다. location 을 붙여 나눈다.
 *
 * page.tsx 는 서버 컴포넌트여서 onClick 을 달 수 없어 이 래퍼를 쓴다.
 */
export function CtaLink({
  href,
  location,
  label,
  className,
  children,
}: {
  href: string;
  location: CtaLocation;
  /** GA 에 남길 이름. 문구를 바꿔도 지표가 끊기지 않게 따로 받는다 */
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackCtaClick(location, label)}
    >
      {children}
    </a>
  );
}
