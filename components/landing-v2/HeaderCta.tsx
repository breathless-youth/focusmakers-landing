"use client";

import { betaCopy } from "@/lib/beta";
import { useBeta } from "./BetaContext";
import { CtaLink } from "./CtaLink";
import { StoreLink } from "./StoreLink";

/**
 * 헤더 CTA — 문구와 실제 도착지를 맞추기 위해 기기별로 갈린다.
 *
 * iPhone 이 확실할 때만 App Store 로 직행한다. 데스크톱은 detected 가 null 인데,
 * 그 사람이 Android 사용자일 수도 있어 기기 선택 탭이 있는 신청 카드로 보낸다 —
 * BetaProvider 의 platform 기본값(ios)에 기대면 안 되는 이유다.
 *
 * detected 는 useSyncExternalStore 로 읽히고 서버 스냅샷이 null 이라, 서버는 늘
 * 앵커 버전을 그리고 하이드레이션 뒤에 스토어 버전으로 바뀐다.
 */

const CLASS =
  "flex h-[38px] items-center rounded-[13px] bg-[#1B64DA] px-3 text-[13.5px] font-bold whitespace-nowrap text-white transition-colors hover:bg-[#1957C2] active:scale-[.97] md:h-[42px] md:px-[18px] md:text-[14.5px]";

export function HeaderCta() {
  const { detected } = useBeta();
  const copy = betaCopy();

  if (detected === "ios") {
    return (
      <StoreLink location="header" className={CLASS}>
        {copy.headerCta}
      </StoreLink>
    );
  }

  return (
    <CtaLink
      href="#apply"
      location="header"
      label="header_cta"
      className={CLASS}
    >
      {copy.headerCta}
    </CtaLink>
  );
}
