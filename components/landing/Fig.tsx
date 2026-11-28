"use client";

/* 캐릭터 그림은 이미 작게 줄인 webp라 next/image의 변환을 거치지 않는다.
   눈 깜빡임 그림을 겹쳐 두고 바로 바꿔야 해서 주소도 고정이어야 한다 */
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef } from "react";
import {
  CHARACTERS,
  characterImage,
  effectImage,
  type CharacterId,
  type Look,
} from "@/lib/landing";
import { motionOk, replay } from "./motion";

/**
 * 살아 있는 캐릭터
 *
 * 숨을 쉬고, 가끔 눈을 깜빡이고, 꾸민 모습일 때는 둘레의 효과 조각이 따로 움직인다.
 * 포인터를 올리거나 누르면 기뻐하며 한 번 뛴다.
 * 표정과 뛰는 동작은 다시 그리지 않고 클래스만 바꾼다.
 */
export function Fig({
  id,
  look = "dressed",
  className = "",
  phase = 0,
  cheerAfter,
  eager = false,
}: {
  id: CharacterId;
  look?: Look;
  className?: string;
  /** 숨 쉬는 박자를 캐릭터마다 어긋나게 하는 값(초) */
  phase?: number;
  /** 화면에 나타난 뒤 이 시간(ms)이 지나면 한 번 기뻐한다 */
  cheerAfter?: number;
  /** 첫 화면에 보이는 캐릭터는 그림을 미루지 않고 받는다 */
  eager?: boolean;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const calm = useRef<number | undefined>(undefined);
  const shown = useRef(`${id}-${look}`);
  const character = CHARACTERS[id];

  const cheer = useCallback(() => {
    const node = root.current;
    if (!node) return;
    node.classList.add("is-joy");
    if (motionOk()) replay(node, "is-hop", 640);
    window.clearTimeout(calm.current);
    calm.current = window.setTimeout(
      () => node.classList.remove("is-joy"),
      900,
    );
  }, []);

  // 눈 깜빡임
  useEffect(() => {
    const node = root.current;
    if (!node || !motionOk()) return;
    let wait: number;
    let open: number;
    const loop = () => {
      wait = window.setTimeout(
        () => {
          node.classList.add("is-blink");
          open = window.setTimeout(() => node.classList.remove("is-blink"), 140);
          loop();
        },
        2200 + Math.random() * 3600,
      );
    };
    loop();
    return () => {
      window.clearTimeout(wait);
      window.clearTimeout(open);
      node.classList.remove("is-blink");
    };
  }, []);

  useEffect(() => {
    if (cheerAfter === undefined) return;
    const timer = window.setTimeout(cheer, cheerAfter);
    return () => window.clearTimeout(timer);
  }, [cheer, cheerAfter]);

  // 캐릭터나 차림이 바뀌면 톡 튀어나온다
  useEffect(() => {
    const key = `${id}-${look}`;
    if (shown.current === key) return;
    shown.current = key;
    if (root.current && motionOk()) replay(root.current, "is-pop", 450);
  }, [id, look]);

  useEffect(() => () => window.clearTimeout(calm.current), []);

  const loading = eager ? "eager" : "lazy";

  return (
    <span
      ref={root}
      className={`fig ${className}`}
      onPointerEnter={cheer}
      onClick={cheer}
    >
      <span
        className="fig__breath"
        style={{ "--d": `${-phase}s` } as React.CSSProperties}
      >
        {look === "dressed" && character.effects.length > 0 && (
          <span className="fig__fx" aria-hidden="true">
            {character.effects.map((piece, index) => (
              <span
                key={index}
                className={`fig__piece m-${piece.motion}`}
                style={{
                  left: `${piece.x * 100}%`,
                  top: `${piece.y * 100}%`,
                  width: `${piece.w * 100}%`,
                  height: `${piece.h * 100}%`,
                  // 효과 그림 한 장에서 이 조각이 있는 자리만 잘라 보여 준다
                  backgroundImage: `url(${effectImage(id)})`,
                  backgroundSize: `${100 / piece.w}% ${100 / piece.h}%`,
                  backgroundPosition: `${(piece.x / (1 - piece.w)) * 100}% ${(piece.y / (1 - piece.h)) * 100}%`,
                  animationDelay: `${(-0.43 * index).toFixed(2)}s`,
                }}
              />
            ))}
          </span>
        )}
        <img
          className="fig__idle"
          src={characterImage(id, look, "idle")}
          alt={look === "dressed" ? character.dressedAlt : character.plainAlt}
          width={720}
          height={720}
          loading={loading}
          decoding="async"
          fetchPriority={eager ? "high" : undefined}
        />
        <img
          className="fig__alt fig__blink"
          src={characterImage(id, look, "blink")}
          alt=""
          width={720}
          height={720}
          loading={loading}
          decoding="async"
        />
        <img
          className="fig__alt fig__joy"
          src={characterImage(id, look, "joy")}
          alt=""
          width={720}
          height={720}
          loading={loading}
          decoding="async"
        />
      </span>
    </span>
  );
}
