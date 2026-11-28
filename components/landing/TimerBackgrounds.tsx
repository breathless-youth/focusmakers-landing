"use client";

/* 배경 그림은 폰 화면 크기로 이미 줄여 둔 파일이라 next/image의 변환을 거치지 않는다 */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { LiveClock } from "./LiveClock";
import { motionOk } from "./motion";

const BACKGROUNDS = [
  { id: "watch", tab: "감시", dwell: 11000 },
  { id: "grass", tab: "풀밭", dwell: 5200, alt: "햇빛이 드는 풀밭 배경" },
  { id: "mountain", tab: "산", dwell: 5200, alt: "안개 낀 산 배경" },
  { id: "rain", tab: "비", dwell: 5200, alt: "비 오는 거리 배경" },
] as const;

type BackgroundId = (typeof BACKGROUNDS)[number]["id"];

/** 새 배경이 다 덮일 때까지 걸리는 시간(ms). landing.css의 전환 시간보다 조금 길다 */
const COVER = 1200;

/**
 * 타이머 배경
 *
 * 감시 배경에서 풀밭, 산, 비로 차례로 넘어가고, 아래 버튼으로 바로 고를 수 있다.
 * 화면에 보이는 동안에만 넘어가고, 움직임 줄이기를 켠 기기에서는 버튼으로만 바뀐다.
 */
export function TimerBackgrounds() {
  const [current, setCurrent] = useState<BackgroundId>("watch");
  const [leaving, setLeaving] = useState<BackgroundId | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const pick = useRef<(id: BackgroundId) => void>(() => {});

  useEffect(() => {
    const node = root.current;
    const clip = video.current;
    if (!node || !clip) return;

    const auto = motionOk();
    let now: BackgroundId = "watch";
    let inView = false;
    let next = 0;
    let settle = 0;

    const show = (id: BackgroundId) => {
      const before = now;
      now = id;
      window.clearTimeout(settle);
      window.clearTimeout(next);
      // 나가는 배경은 새 배경이 다 덮을 때까지 밑에 그대로 둔다
      setLeaving(before === id ? null : before);
      setCurrent(id);
      settle = window.setTimeout(() => {
        setLeaving(null);
        if (now !== "watch") clip.pause();
      }, COVER);
      if (id === "watch" && auto) {
        clip.currentTime = 0;
        clip.play().catch(() => {});
      }
      if (inView && auto) {
        const index = BACKGROUNDS.findIndex((item) => item.id === id);
        const following = BACKGROUNDS[(index + 1) % BACKGROUNDS.length];
        next = window.setTimeout(
          () => show(following.id),
          BACKGROUNDS[index].dwell,
        );
      }
    };
    pick.current = show;

    const pause = () => {
      window.clearTimeout(next);
      clip.pause();
    };
    const watch = new IntersectionObserver(
      (entries) => {
        const seen = entries[entries.length - 1].isIntersecting;
        if (seen === inView) return;
        inView = seen;
        if (seen) show(now);
        else pause();
      },
      { threshold: 0.3 },
    );
    watch.observe(node);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (inView) show(now);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      watch.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(settle);
      pause();
    };
  }, []);

  const layer = (id: BackgroundId) =>
    `bg bg--${id}${current === id ? " is-on" : ""}${leaving === id ? " is-prev" : ""}`;

  return (
    <div ref={root} className="spaces">
      <div className="phone">
        <div className="phone__screen">
          <video
            ref={video}
            className={`fill ${layer("watch")}`}
            src="/landing/watch.mp4"
            poster="/landing/watch-poster.jpg"
            muted
            playsInline
            preload="metadata"
            aria-label="집중 상태에 맞춰 움직이는 감시 배경"
          />
          {BACKGROUNDS.map((item) =>
            item.id === "watch" ? null : (
              <div
                key={item.id}
                className={layer(item.id)}
                role="img"
                aria-label={item.alt}
              >
                <img
                  className="fill"
                  src={`/landing/bg/${item.id}.jpg`}
                  alt=""
                  width={360}
                  height={540}
                  loading="lazy"
                  decoding="async"
                />
                <i className="bg__fx" aria-hidden="true" />
              </div>
            ),
          )}
          <div className="bgui" aria-hidden="true">
            <span className="bgui__pill">순공시간 측정 중</span>
            <LiveClock className="bgui__time" base={6131} pad />
          </div>
        </div>
      </div>
      <div className="spaces__tabs" role="group" aria-label="타이머 배경 고르기">
        {BACKGROUNDS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={current === item.id}
            onClick={() => pick.current(item.id)}
          >
            {item.tab}
          </button>
        ))}
      </div>
    </div>
  );
}
