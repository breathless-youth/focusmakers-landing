"use client";

/* 고르는 버튼의 작은 그림도 이미 줄여 둔 webp라 next/image의 변환을 거치지 않는다 */
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import {
  CHARACTERS,
  CHARACTER_ORDER,
  characterImage,
  type CharacterId,
  type Look,
} from "@/lib/landing";
import { Fig } from "./Fig";
import { Seat } from "./Seat";

const LOOKS: { id: Look; label: string }[] = [
  { id: "plain", label: "기본" },
  { id: "dressed", label: "꾸민 모습" },
];

/**
 * 꾸미기 구간
 *
 * 캐릭터를 고르고 기본 모습과 꾸민 모습을 바꿔 본다.
 * 구간 제목과 설명은 children으로 받아 고르는 버튼 위에 둔다.
 */
export function DressRoom({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<CharacterId>("timi");
  const [look, setLook] = useState<Look>("dressed");

  return (
    <div className="wrap dress">
      <div className="dress__text">
        {children}
        <div className="seg" role="group" aria-label="꾸민 모습 보기">
          {LOOKS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={look === item.id}
              onClick={() => setLook(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="picker" role="group" aria-label="캐릭터 고르기">
          {CHARACTER_ORDER.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={id === item}
              onClick={() => setId(item)}
            >
              <img
                src={characterImage(item, "plain", "idle")}
                alt=""
                width={720}
                height={720}
                loading="lazy"
                decoding="async"
              />
              {CHARACTERS[item].name}
            </button>
          ))}
        </div>
      </div>
      <div className="dress__stage">
        <Seat
          caption={
            <span className="seat__time" aria-live="polite">
              {CHARACTERS[id].name}
            </span>
          }
        >
          <Fig id={id} look={look} className="seat__who" />
        </Seat>
      </div>
    </div>
  );
}
