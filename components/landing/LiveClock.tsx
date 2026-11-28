"use client";

import { useSyncExternalStore } from "react";

/**
 * 화면에서 1초씩 올라가는 공부 시간
 *
 * 시계가 여러 개라 타이머 하나를 같이 쓴다.
 * 탭이 뒤에 있는 동안 타이머가 밀려도 지난 시간은 실제 시각으로 계산한다.
 */

let elapsed = 0;
let startedAt = 0;
let ticker: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();

function subscribe(onTick: () => void) {
  listeners.add(onTick);
  if (!ticker) {
    startedAt = Date.now() - elapsed * 1000;
    ticker = setInterval(() => {
      elapsed = Math.floor((Date.now() - startedAt) / 1000);
      listeners.forEach((listener) => listener());
    }, 1000);
  }
  return () => {
    listeners.delete(onTick);
    if (listeners.size === 0) {
      clearInterval(ticker);
      ticker = undefined;
    }
  };
}

const snapshot = () => elapsed;
const serverSnapshot = () => 0;

/** 페이지를 연 뒤 지난 초. 이벤트 핸들러에서 지금 시점을 기록할 때 쓴다 */
export const elapsedNow = () => elapsed;

const two = (value: number) => String(value).padStart(2, "0");

export function LiveClock({
  base,
  since = 0,
  pad = false,
  className,
}: {
  /** 처음에 보여 줄 시간(초) */
  base: number;
  /** 이 시계가 돌기 시작한 시점. elapsedNow()로 받은 값을 넘긴다 */
  since?: number;
  /** 시를 두 자리로 채운다 */
  pad?: boolean;
  className?: string;
}) {
  const now = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const total = base + Math.max(0, now - since);
  const hours = Math.floor(total / 3600);
  return (
    <span className={className}>
      {pad ? two(hours) : hours}:{two(Math.floor((total % 3600) / 60))}:
      {two(total % 60)}
    </span>
  );
}
