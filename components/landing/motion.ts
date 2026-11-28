"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** 효과와 이벤트 핸들러 안에서 읽는다. 렌더 중에는 useMotionOk를 쓴다 */
export const motionOk = () => !window.matchMedia(QUERY).matches;

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const serverSnapshot = () => false;

/**
 * 움직임을 넣어도 되는지
 *
 * 서버와 하이드레이션 때는 false라서, 움직임은 화면이 뜬 뒤에만 켜진다.
 */
export function useMotionOk() {
  return useSyncExternalStore(subscribe, motionOk, serverSnapshot);
}

/** 끝난 CSS 애니메이션을 처음부터 다시 돌린다 */
export function replay(node: HTMLElement, name: string, ms: number) {
  node.classList.remove(name);
  // 레이아웃을 한 번 읽어야 브라우저가 클래스를 뺐다 넣은 것을 새 애니메이션으로 본다
  void node.offsetWidth;
  node.classList.add(name);
  window.setTimeout(() => node.classList.remove(name), ms);
}
