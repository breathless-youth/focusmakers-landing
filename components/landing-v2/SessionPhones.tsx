"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CameraRotateIcon,
  PauseIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import { IOSStatusBar, PhoneFrame, PhoneScaler } from "./PhoneFrame";

/**
 * 기능별 화면 1행 — 집중 / 비집중 두 대를 나란히 보여준다.
 * 집중 쪽만 순공시간이 흐르고, 비집중 쪽은 순공은 멈춘 채 총 공부 시간만 올라간다.
 * 기기 목업은 실제 402×874pt로 그린 뒤 컨테이너 폭에 맞춰 축소한다.
 */

const BASE_NET = 1 * 3600 + 24 * 60 + 8; // 1:24:08
const BASE_TOTAL = 1 * 3600 + 45 * 60 + 12; // 1:45:12
const BASE_TOTAL_2 = 1 * 3600 + 2 * 60 + 10; // 1:02:10
const FROZEN_NET = "0:47:21"; // 비집중 중이라 멈춰 있는 순공시간

function clock(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/** 1초마다 올라가는 경과 초. reduced-motion이면 고정 */
function useTick() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [reduce]);
  return tick;
}

function StatusPill({ state }: { state: "focus" | "distract" }) {
  const focus = state === "focus";
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-[9px] backdrop-blur-[10px]"
      style={{
        background: focus ? "rgba(16,20,25,.65)" : "rgba(16,20,25,.68)",
        boxShadow: `inset 0 0 0 1px ${
          focus ? "rgba(255,255,255,.12)" : "rgba(255,158,27,.35)"
        }`,
      }}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: focus ? "#1B64DA" : "#FF8A00" }}
      />
      <span className="text-sm leading-[18px] font-medium whitespace-nowrap text-white">
        {focus ? "집중 측정 중" : "휴대폰을 사용 중인 것 같아요"}
      </span>
    </div>
  );
}

function ControlBar() {
  return (
    <div className="relative flex h-20 w-[244px] items-center justify-center gap-[22px] rounded-full bg-[rgba(22,27,34,.55)] px-6 pt-4 pb-3 backdrop-blur-[14px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
      <span className="absolute top-1.5 left-1/2 h-1 w-9 -translate-x-1/2 rounded-full bg-white/20" />
      <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/12 text-white">
        <PauseIcon size={18} weight="fill" />
      </span>
      <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/12 text-white">
        <CameraRotateIcon size={20} />
      </span>
      <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#F04452] text-white">
        <SignOutIcon size={20} />
      </span>
    </div>
  );
}

function SessionScreen({
  photo,
  alt,
  state,
  net,
  total,
  bg,
}: {
  photo: string;
  alt: string;
  state: "focus" | "distract";
  net: string;
  total: string;
  bg: string;
}) {
  return (
    <PhoneFrame>
      <div className="absolute inset-0" style={{ background: bg }} />
      <Image
        src={photo}
        alt={alt}
        width={402}
        height={874}
        sizes="240px"
        className="absolute inset-0 h-[874px] w-[402px] object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.32)_0%,rgba(0,0,0,.08)_26%,rgba(0,0,0,.3)_58%,rgba(0,0,0,.68)_100%)]" />
      <div className="relative z-10 flex h-full w-full flex-col items-center">
        <IOSStatusBar theme="dark" />
        <div
          className={`mt-3 rounded-full ${
            state === "focus" ? "animate-ring-out-blue" : "animate-ring-out-orange"
          }`}
        >
          <StatusPill state={state} />
        </div>
        <div className="flex-1" />
        <div className="flex flex-col items-center gap-1.5">
          <span
            className="text-[52px] leading-[60px] font-bold tracking-[-0.5px] tabular-nums drop-shadow-[0_1px_12px_rgba(0,0,0,.55)]"
            style={{ color: state === "focus" ? "#FFFFFF" : "rgba(255,255,255,.55)" }}
          >
            {net}
          </span>
          <span className="text-[15px] font-medium tabular-nums text-white/75 drop-shadow-[0_1px_10px_rgba(0,0,0,.55)]">
            총 {total}
          </span>
        </div>
        <div className="h-[34px]" />
        <div className="mb-[38px]">
          <ControlBar />
        </div>
      </div>
    </PhoneFrame>
  );
}

/** 심플 모드 — 카메라 화면을 끄고 숫자만 남긴다 */
export function SimpleModePhone({ width = 262 }: { width?: number }) {
  const tick = useTick();
  return (
    <PhoneScaler width={width}>
      <PhoneFrame>
        <div className="absolute inset-0 bg-[#0B0F14]" />
        <div className="animate-simple-glow pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_12px_rgba(49,130,246,.38)]" />
        <div className="relative z-10 h-full w-full">
          <IOSStatusBar theme="dark" />
          <div className="absolute top-[71px] right-0 left-0 flex justify-center">
            <div className="animate-ring-out-blue rounded-full">
              <StatusPill state="focus" />
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-[130px]">
            <span className="text-[56px] leading-[64px] font-bold tracking-[-0.5px] tabular-nums text-[#4593FC] drop-shadow-[0_0_26px_rgba(49,130,246,.5)]">
              {clock(BASE_NET + tick)}
            </span>
            <span className="mt-1.5 text-[15px] font-medium tabular-nums text-white/30">
              총 {clock(BASE_TOTAL + tick)}
            </span>
          </div>
          <div className="absolute right-0 bottom-[38px] left-0 flex justify-center">
            <ControlBar />
          </div>
        </div>
      </PhoneFrame>
    </PhoneScaler>
  );
}

export function SessionPhones() {
  const tick = useTick();
  // 두 대가 나란히 들어가야 해서 자리가 좁으면 함께 줄인다.
  // 뷰포트가 아니라 실제로 들어갈 칸(그리드 셀) 폭을 재야 중간 폭에서 칸을 넘지 않는다.
  const rowRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(220);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const available = row.offsetWidth || window.innerWidth - 40;
      setWidth(Math.min(220, Math.floor((available - 16) / 2)));
    };
    measure();
    // 칸 폭이 바뀌는 경로가 둘이라 둘 다 본다 — 그리드 재배치(ResizeObserver)와
    // 뷰포트 변화·화면 회전(resize)
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={rowRef} className="flex w-full justify-center gap-4">
      <figure className="m-0 flex flex-col items-center gap-2.5">
        <PhoneScaler width={width}>
          <SessionScreen
            photo="/pome/session-focus.webp"
            alt="공부 중인 포메를 비추는 카메라 프리뷰"
            state="focus"
            net={clock(BASE_NET + tick)}
            total={clock(BASE_TOTAL + tick)}
            bg="#1A2029"
          />
        </PhoneScaler>
        <figcaption className="text-[13px] text-[#6B7684]">
          집중 인식 — 시간이 흘러요
        </figcaption>
      </figure>

      <figure className="m-0 flex flex-col items-center gap-2.5">
        <PhoneScaler width={width}>
          <SessionScreen
            photo="/pome/session-phone.webp"
            alt="휴대폰을 보는 포메를 비추는 카메라 프리뷰"
            state="distract"
            net={FROZEN_NET}
            total={clock(BASE_TOTAL_2 + tick)}
            bg="#1E1A16"
          />
        </PhoneScaler>
        <figcaption className="text-[13px] text-[#6B7684]">
          비집중 감지 — 시간이 멈춰요
        </figcaption>
      </figure>
    </div>
  );
}
