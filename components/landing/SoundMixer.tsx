"use client";

import { useEffect, useRef, useState } from "react";
import {
  BirdIcon,
  CampfireIcon,
  CloudRainIcon,
  CoffeeIcon,
  MusicNotesIcon,
  WavesIcon,
  type Icon,
} from "@phosphor-icons/react";
import { SOUNDS, type SoundId } from "@/lib/landing";

const ICONS: Record<SoundId, Icon> = {
  rain: CloudRainIcon,
  waves: WavesIcon,
  birds: BirdIcon,
  bonfire: CampfireIcon,
  cafe: CoffeeIcon,
  lofi: MusicNotesIcon,
};

/**
 * 배경음 미리 듣기
 *
 * 누르면 켜지고 여러 개를 함께 들을 수 있다.
 * 음원은 누른 것만 받아 오고, 탭을 떠나면 모두 끈다.
 */
export function SoundMixer() {
  const [playing, setPlaying] = useState<SoundId[]>([]);
  const players = useRef(new Map<SoundId, HTMLAudioElement>());

  const stop = (id: SoundId) => {
    players.current.get(id)?.pause();
    setPlaying((list) => list.filter((item) => item !== id));
  };

  const toggle = (id: SoundId) => {
    if (playing.includes(id)) {
      stop(id);
      return;
    }
    let audio = players.current.get(id);
    if (!audio) {
      audio = new Audio(`/landing/sound/${id}.mp3`);
      audio.loop = true;
      audio.volume = 0.6;
      players.current.set(id, audio);
    }
    setPlaying((list) => [...list, id]);
    // 브라우저가 재생을 막으면 버튼을 꺼진 모습으로 되돌린다
    audio.play().catch(() => stop(id));
  };

  const stopAll = () => {
    players.current.forEach((audio) => audio.pause());
    setPlaying([]);
  };

  useEffect(() => {
    const all = players.current;
    const onHide = () => {
      if (!document.hidden) return;
      all.forEach((audio) => audio.pause());
      setPlaying([]);
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      all.forEach((audio) => audio.pause());
    };
  }, []);

  return (
    <div className="mixer">
      <p className="mixer__label">
        <span>여섯 가지를 먼저 들어 보세요. 눌러서 섞을 수 있어요.</span>
        {playing.length > 0 && (
          <button className="mixer__off" type="button" onClick={stopAll}>
            모두 끄기
          </button>
        )}
      </p>
      <div className="mixer__grid">
        {SOUNDS.map(({ id, label }) => {
          const on = playing.includes(id);
          const SoundIcon = ICONS[id];
          return (
            <button
              key={id}
              className={`snd${on ? " is-on" : ""}`}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(id)}
            >
              <SoundIcon aria-hidden="true" />
              <span className="snd__row">
                <span className="snd__name">{label}</span>
                <i className="eq" aria-hidden="true">
                  <b />
                  <b />
                  <b />
                </i>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
