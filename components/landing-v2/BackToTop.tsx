"use client";

import { useEffect, useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";

/**
 * 히어로를 지나면 나타나는 맨 위로 버튼 — v2 시안의 showTop 동작.
 * IntersectionObserver는 백그라운드 탭에서 콜백이 밀려 스크롤 리스너로 판정한다.
 * (판정 기준은 시안과 같다: 히어로 섹션이 화면에서 벗어나면 표시)
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero");
    const threshold = () =>
      hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;

    const onScroll = () => setVisible(window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }
      className="animate-top-in fixed right-6 bottom-6 z-50 flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full bg-white text-[#6B7684] shadow-[0_0_0_1px_#E5E8EB,0_10px_24px_rgba(25,31,40,.16)] transition-transform hover:-translate-y-0.5 active:scale-[.92]"
    >
      <CaretDownIcon size={14} weight="bold" className="rotate-180" />
    </button>
  );
}
