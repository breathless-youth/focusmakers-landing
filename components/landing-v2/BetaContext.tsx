"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { Platform } from "@/lib/beta";

/**
 * "참여 방법"과 "신청" 두 섹션이 같은 기기 선택을 공유한다.
 * 둘은 FAQ를 사이에 두고 떨어져 있어서 컨텍스트로 묶었다.
 *
 * 기기 추측은 useSyncExternalStore로 읽는다 — 서버 스냅샷은 null이라
 * 서버/클라이언트 렌더가 어긋나지 않고, effect에서 setState 하지 않아도 된다.
 */

type BetaState = {
  platform: Platform;
  setPlatform: (p: Platform) => void;
  /** User-Agent로 기기를 알아낸 경우에만 채워진다 */
  detected: Platform | null;
};

const Ctx = createContext<BetaState | null>(null);

/** UA는 세션 중에 바뀌지 않으므로 구독할 것이 없다 */
const noopSubscribe = () => () => {};

function detectPlatform(): Platform | null {
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return null;
}

const serverPlatform = () => null;

export function BetaProvider({ children }: { children: React.ReactNode }) {
  const detected = useSyncExternalStore(
    noopSubscribe,
    detectPlatform,
    serverPlatform,
  );
  // 사용자가 탭을 직접 누르면 그 선택이 UA 추측을 덮어쓴다
  const [picked, setPicked] = useState<Platform | null>(null);
  const platform = picked ?? detected ?? "ios";

  const setPlatform = useCallback((p: Platform) => setPicked(p), []);
  const value = useMemo(
    () => ({ platform, setPlatform, detected }),
    [platform, setPlatform, detected],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBeta() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useBeta는 BetaProvider 안에서만 쓸 수 있어요");
  return value;
}
