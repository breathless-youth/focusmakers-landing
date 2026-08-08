"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * 뷰포트에 들어오면 0부터 목표값까지 세어 올라가는 숫자.
 *
 * "4h 52m" 처럼 숫자와 단위가 섞인 값을 통째로 넘기면 숫자 부분만 골라
 * 각각 카운트업하고 단위는 그대로 둔다. 부르는 쪽에서 쪼갤 필요가 없다.
 *
 *   <CountUp value="4h 52m" />  →  0h 0m … 4h 52m
 *   <CountUp value="76%" />     →  0% … 76%
 *
 * 처음에는 목표값 그대로 그린다. 0 으로 시작하면 JS 가 돌지 않는 환경에서
 * "0h 0m 집중시간" 같은 틀린 값이 남기 때문이다. 애니메이션이 시작되면
 * 첫 프레임이 0 을 써서 자연스럽게 0 부터 올라간다.
 *
 * 자릿수가 늘며 폭이 출렁이지 않도록 부르는 쪽에서 tabular-nums 를 준다.
 */

const NUMBER = /\d+/g;

export function CountUp({
  value,
  duration = 1.4,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const targets = value.match(NUMBER)?.map(Number) ?? [];
  const [shown, setShown] = useState<number[]>(targets);

  useEffect(() => {
    if (!inView || reduce || targets.length === 0) return;

    // 숫자가 여러 개면(4h 52m) 같은 시간에 끝나도록 각각 돌린다.
    // 첫 onUpdate 가 0 을 넣어 주므로 여기서 따로 0 으로 되돌리지 않는다
    const controls = targets.map((to, i) =>
      animate(0, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) =>
          setShown((prev) => {
            const next = [...prev];
            next[i] = Math.round(v);
            return next;
          }),
      }),
    );
    return () => controls.forEach((c) => c.stop());
    // targets 는 value 에서 파생된다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration]);

  let i = 0;
  const text = value.replace(NUMBER, () => String(shown[i++] ?? 0));

  return (
    <span ref={ref} className={className}>
      {/* 스크린리더에는 올라가는 중간값 대신 완성된 값만 읽힌다 */}
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
