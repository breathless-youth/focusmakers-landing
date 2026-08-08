"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * 랜딩 v2 전용 스크롤 진입 페이드업.
 * 값(14px · 0.45s · cubic-bezier(.23,1,.32,1))은 v2 시안 그대로다.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
