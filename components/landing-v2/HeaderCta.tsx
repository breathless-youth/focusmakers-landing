"use client";

import { useSyncExternalStore } from "react";
import type { Platform } from "@/lib/beta";
import { CtaLink } from "./CtaLink";
import { StoreLink } from "./StoreLink";

/**
 * 헤더 CTA — 문구와 실제 도착지를 맞추기 위해 기기별로 갈린다.
 *
 * 기기가 확실할 때만 그 기기의 스토어로 직행한다. 데스크톱은 어느 스토어인지
 * 알 수 없어 배지 두 개가 다 있는 다운로드 섹션으로 보낸다.
 *
 * 기기 추측은 useSyncExternalStore 로 읽는다 — 서버 스냅샷이 null 이라 서버는
 * 늘 앵커 버전을 그리고 하이드레이션 뒤에 스토어 버전으로 바뀐다. 서버/클라이언트
 * 렌더가 어긋나지 않고, effect 에서 setState 하지 않아도 된다.
 */

const CLASS =
  "flex h-[38px] items-center rounded-[13px] bg-[#1B64DA] px-3 text-[13.5px] font-bold whitespace-nowrap text-white transition-colors hover:bg-[#1957C2] active:scale-[.97] md:h-[42px] md:px-[18px] md:text-[14.5px]";

const LABEL = "앱 다운로드";

/** UA는 세션 중에 바뀌지 않으므로 구독할 것이 없다 */
const noopSubscribe = () => () => {};

function detectPlatform(): Platform | null {
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return null;
}

const serverPlatform = () => null;

export function HeaderCta() {
  const detected = useSyncExternalStore(
    noopSubscribe,
    detectPlatform,
    serverPlatform,
  );

  if (detected) {
    return (
      <StoreLink location="header" platform={detected} className={CLASS}>
        {LABEL}
      </StoreLink>
    );
  }

  return (
    <CtaLink
      href="#download"
      location="header"
      label="header_cta"
      className={CLASS}
    >
      {LABEL}
    </CtaLink>
  );
}
