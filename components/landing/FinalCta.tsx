"use client";

import { useState } from "react";
import { StoreBadges } from "@/components/landing-v2/StoreBadges";
import { Fig } from "./Fig";
import { Seat } from "./Seat";

/**
 * 마지막 구간의 빈자리와 스토어 배지
 *
 * 스토어 배지에 다가가거나 자리를 누르면 캐릭터가 먼저 앉는다.
 * 제목과 설명은 children으로 받아 자리와 배지 사이에 둔다.
 */
export function FinalCta({ children }: { children: React.ReactNode }) {
  const [taken, setTaken] = useState(false);
  const sit = () => setTaken(true);

  return (
    <div className="wrap final__in">
      <Seat empty={!taken} onClick={sit}>
        <Fig id="timi" className="seat__who" cheerAfter={60} />
      </Seat>
      {children}
      <div onPointerEnter={sit} onFocusCapture={sit}>
        <StoreBadges location="download" />
      </div>
    </div>
  );
}
