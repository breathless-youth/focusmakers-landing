"use client";

import { Fragment, useEffect, useRef } from "react";
import { TIMETABLE } from "@/lib/landing";
import { motionOk } from "./motion";

/** 칸 하나가 채워지는 간격(ms). landing.css의 animation-delay와 같은 값이다 */
const STEP = 26;

const label = (minutes: number) =>
  `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;

/**
 * 오늘의 타임테이블
 *
 * 화면에 들어오면 칸이 시간 순서로 채워지고 순공시간 합계가 같이 올라간다.
 * 처음에는 다 채운 모습으로 그려 둬서, 스크립트가 돌지 않아도 틀린 값이 남지 않는다.
 */
export function Timetable() {
  const root = useRef<HTMLDivElement>(null);
  const total = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    const text = total.current;
    if (!node || !text || !motionOk()) return;

    const filled = node.querySelectorAll(".tt__cell.on").length;
    const length = filled * STEP + 300;
    let frame = 0;

    const watch = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        watch.disconnect();
        node.classList.add("play");
        const began = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - began) / length);
          text.textContent = label(
            Math.round(TIMETABLE.totalMinutes * progress),
          );
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.45 },
    );
    watch.observe(node);

    return () => {
      watch.disconnect();
      cancelAnimationFrame(frame);
      text.textContent = label(TIMETABLE.totalMinutes);
    };
  }, []);

  return (
    <div
      ref={root}
      className="tt"
      role="img"
      aria-label={`아침 7시부터 밤 10시 반까지 과목별 공부 시간이 채워진 타임테이블, 순공시간 ${label(TIMETABLE.totalMinutes)}`}
    >
      <div className="tt__head">
        <b>오늘의 타임테이블</b>
        <span>
          순공시간 <em ref={total}>{label(TIMETABLE.totalMinutes)}</em>
        </span>
      </div>
      <div className="tt__grid">
        {TIMETABLE.rows.map((row) => (
          <Fragment key={row.hour}>
            <span className="tt__hour">{row.hour}</span>
            {row.cells.map((cell, slot) =>
              cell ? (
                <span
                  key={slot}
                  className="tt__cell on"
                  style={
                    {
                      "--cs": cell.color,
                      "--i": cell.order,
                    } as React.CSSProperties
                  }
                />
              ) : (
                <span key={slot} className="tt__cell" />
              ),
            )}
          </Fragment>
        ))}
      </div>
      <div className="tt__legend">
        {TIMETABLE.legend.map((subject) => (
          <span
            key={subject.name}
            style={{ "--c": subject.color } as React.CSSProperties}
          >
            <i />
            {subject.name} {subject.total}
          </span>
        ))}
      </div>
    </div>
  );
}
