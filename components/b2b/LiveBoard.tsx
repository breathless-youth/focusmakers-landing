"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

/**
 * 좌석·인원 현황 예시 화면. 1.5초마다 한 칸씩 상태가 바뀌어 살아 있는 화면처럼 보인다.
 * 실제 데이터가 아니라 연출이다.
 */

type CellState = "f" | "a" | "p" | "e";

const KEY_COLORS = ["var(--focus)", "var(--away)", "var(--phone)", "var(--line)"];

/** 서버와 브라우저의 첫 화면이 같아야 하므로 처음 배치는 난수 없이 정한다 */
function initialStates(n: number): CellState[] {
  return Array.from({ length: n }, (_, i) => {
    if (i % 9 === 4) return "e";
    const k = (i * 7) % 10;
    return k < 7 ? "f" : k < 9 ? "a" : "p";
  });
}

function randomState(): CellState {
  const r = Math.random();
  return r < 0.7 ? "f" : r < 0.86 ? "a" : "p";
}

export function LiveBoard({
  panel,
  time,
  n,
  cols,
  unit,
  people,
  keys,
  stats,
  feed,
}: {
  panel: string;
  time: string;
  n: number;
  cols: number;
  unit: string;
  people?: string[];
  keys: string[];
  stats: [string, string][];
  feed: [string, string][];
}) {
  const reduce = useReducedMotion();
  const [states, setStates] = useState(() => initialStates(n));

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setStates((prev) => {
        const k = Math.floor(Math.random() * prev.length);
        if (prev[k] === "e") return prev;
        const next = [...prev];
        next[k] = randomState();
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [reduce]);

  const focusing = states.filter((s) => s === "f").length;

  return (
    <div className="live">
      <div className="card">
        <div className="panel-h">
          <b>{panel}</b>
          <span>{time} · 예시 화면</span>
        </div>
        <div
          className={people ? "cells people" : "cells"}
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {states.map((s, i) => (
            <div key={i} className={`cell ${s}`}>
              {people ? people[i] : i + 1}
            </div>
          ))}
        </div>
        <div className="legend">
          {keys.slice(0, 4).map((key, i) => (
            <span key={key} style={{ "--c": KEY_COLORS[i] } as CSSProperties}>
              {key}
            </span>
          ))}
        </div>
      </div>
      <div className="card">
        {stats.map(([label, value], i) => (
          <div className="stat" key={label}>
            <span>{label}</span>
            <b style={i === 2 ? { color: "var(--focus)" } : undefined}>
              {i === 0 ? `${focusing}${unit}` : value}
            </b>
          </div>
        ))}
        <div className="feed">
          {feed.map(([at, text]) => (
            <div key={text}>
              <time>{at}</time>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
