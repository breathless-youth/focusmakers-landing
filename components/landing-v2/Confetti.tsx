"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * 신청 완료 순간의 색종이 한 번. 마운트되면서 터지고 스스로 사라진다.
 *
 * 라이브러리를 쓰지 않고 motion 으로 직접 그린다 — 조각 30개짜리라
 * 의존성을 늘릴 만큼은 아니고, 색을 DS 팔레트에 맞추기도 쉽다.
 *
 * 성공 화면은 제출 이후에만 렌더되므로 SSR 을 타지 않는다.
 * 그래서 조각 좌표를 난수로 잡아도 하이드레이션이 어긋나지 않는다.
 */

const COLORS = [
  "#1B64DA", // brand
  "#4593FC",
  "#64A8FF",
  "#FF9E1B", // 비집중 계열 주황 — 파랑만 쓰면 심심하다
  "#FF8A00",
  "#12B76A", // success
];

const COUNT = 30;

type Piece = {
  dx: number;
  dy: number;
  fall: number;
  spin: number;
  size: number;
  color: string;
  round: boolean;
  duration: number;
  delay: number;
};

function makePieces(): Piece[] {
  return Array.from({ length: COUNT }, (_, i) => {
    // 360도로 고르게 퍼뜨리되 조금씩 흔들어 기계적으로 보이지 않게 한다
    const angle = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const distance = 58 + Math.random() * 86;
    return {
      dx: Math.cos(angle) * distance,
      // 위로 조금 더 뻗게 눌러 준다
      dy: Math.sin(angle) * distance * 0.82,
      fall: 46 + Math.random() * 70,
      spin: (Math.random() - 0.5) * 620,
      size: 6 + Math.random() * 5,
      color: COLORS[i % COLORS.length],
      round: i % 3 === 0,
      duration: 1.1 + Math.random() * 0.5,
      delay: Math.random() * 0.09,
    };
  });
}

export function Confetti() {
  const reduce = useReducedMotion();
  // 마운트 시 한 번만 뽑는다 — 리렌더마다 조각이 튀지 않게
  const [pieces] = useState(makePieces);

  if (reduce) return null;

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-0 w-0"
    >
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.42,
            borderRadius: p.round ? "50%" : 1,
            background: p.color,
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
          animate={{
            x: [0, p.dx * 0.72, p.dx],
            y: [0, p.dy * 0.72, p.dy + p.fall],
            scale: [0, 1, 1, 0.9],
            opacity: [0, 1, 1, 0],
            rotate: [0, p.spin],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.22, 0.68, 1],
          }}
        />
      ))}
    </span>
  );
}
