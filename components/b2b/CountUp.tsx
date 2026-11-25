"use client";

import { useEffect, useRef } from "react";

/**
 * 화면에 들어올 때 0부터 올라가는 숫자
 *
 * 서버가 그린 최종 값이 기본이라 스크립트가 없어도 숫자는 그대로 보인다.
 * 움직임 줄이기를 켠 기기에서는 올리지 않는다.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = /^([\d,.]+)(.*)$/.exec(value);
  const digits = match ? match[1] : value;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raw = digits.replace(/,/g, "");
    const target = Number(raw);
    const decimals = (raw.split(".")[1] ?? "").length;
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return digits.includes(",") ? fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : fixed;
    };
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start: number | null = null;
        const step = (time: number) => {
          start ??= time;
          const progress = Math.min(1, (time - start) / 1500);
          el.textContent = format(target * (1 - (1 - progress) ** 4));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // value가 바뀌지 않는 한 한 번만 건다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <span ref={ref}>{digits}</span>
      {suffix && <small>{suffix}</small>}
    </>
  );
}
