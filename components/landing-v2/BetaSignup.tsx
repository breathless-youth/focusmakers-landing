"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import {
  BETA_CLOSED,
  BETA_SEATS,
  TESTFLIGHT_URL,
  betaCopy,
  daysLeft,
} from "@/lib/beta";
import { trackEmailSignup, trackPlatformSelect, trackTestflightOpen } from "@/lib/analytics";
import { useBeta } from "./BetaContext";
import { Confetti } from "./Confetti";

/**
 * 최종 CTA의 베타 신청 카드.
 *
 * iPhone은 이메일 없이 TestFlight 링크로 바로 보내고, Android(와 모집 마감 후
 * 전 기기)는 이메일을 받는다. 저장은 브라우저가 직접 하지 않고
 * 저장은 /api/beta/signup 이 맡는다 — 서버에서 이메일을 다시 검증하고
 * 레이트리밋을 걸기 위해서다.
 */

const PILL =
  "flex h-[46px] flex-1 cursor-pointer items-center justify-center rounded-xl px-2 text-[14.5px] font-semibold whitespace-nowrap transition-all active:scale-[.97]";
const PILL_ON =
  "bg-[#E8F3FF] text-[#1B64DA] shadow-[inset_0_0_0_1.5px_#1B64DA]";
const PILL_OFF = "bg-white text-[#6B7684] shadow-[inset_0_0_0_1px_#E5E8EB]";

const CTA =
  "flex items-center justify-center rounded-[14px] bg-[#1B64DA] font-bold text-white shadow-[0_6px_18px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2] active:scale-[.97]";

/** 남은 일수는 날짜가 바뀔 때만 달라져 구독할 것이 없다 */
const noopSubscribe = () => () => {};
const serverDday = () => null;

export function BetaSignup() {
  const emailId = useId();
  const agreeId = useId();
  const { platform, setPlatform } = useBeta();

  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [saved, setSaved] = useState<{ email: string; platform: string } | null>(
    null,
  );

  // 마감까지 남은 일수는 서버/클라이언트 시각이 갈릴 수 있어 클라이언트에서만 읽는다
  const dday = useSyncExternalStore(noopSubscribe, daysLeft, serverDday);

  const copy = betaCopy();
  const ios = platform === "ios";
  /** iPhone은 모집 중일 때만 링크 직행. 그 외에는 전부 이메일 신청 */
  const direct = ios && !BETA_CLOSED;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const value = email.trim();
    if (!value) return setError("이메일 주소를 입력해 주세요");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return setError("이메일 주소 형식을 확인해 주세요");
    if (!agree) return setError("개인정보 수집·이용에 동의해 주세요");

    setError("");
    setStatus("sending");

    let ok = false;
    let message = "신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.";
    try {
      const res = await fetch("/api/beta/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: value, platform }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;
      ok = res.ok && data?.ok === true;
      if (!ok && data?.message) message = data.message;
    } catch {
      message = "네트워크 상태를 확인하고 다시 시도해 주세요.";
    }

    if (!ok) {
      setStatus("idle");
      setError(message);
      return;
    }

    setStatus("done");
    setSaved({
      email: value,
      platform: ios ? "iPhone(TestFlight)" : "Android(Google Play)",
    });
    trackEmailSignup(platform, BETA_CLOSED);
  }

  if (status === "done" && saved) {
    return (
      <div className="mt-2 flex w-full max-w-[440px] flex-col items-center gap-2.5">
        {/* 색종이는 체크 표시를 기준으로 터진다 */}
        <span className="relative flex">
          <Confetti />
          <span className="animate-pop relative flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F3FF] text-[#1B64DA]">
            <CheckIcon size={20} weight="bold" />
          </span>
        </span>
        <span className="text-lg font-bold">신청이 접수됐어요</span>
        <span className="text-center text-[14.5px] leading-[21px] text-[#6B7684]">
          <b className="text-[#191F28]">{saved.email}</b> 주소로 {saved.platform}{" "}
          참여 안내를 보내드릴게요.
        </span>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSaved(null);
            setEmail("");
          }}
          className="cursor-pointer text-[13px] font-semibold text-[#1B64DA] underline active:opacity-60"
        >
          다른 이메일로 다시 신청하기
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2 flex w-full max-w-[440px] flex-col gap-3">
      <div className="flex gap-2">
        {(["ios", "android"] as const).map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={platform === p}
            onClick={() => {
              setPlatform(p);
              trackPlatformSelect(p, "apply");
            }}
            className={`${PILL} ${platform === p ? PILL_ON : PILL_OFF}`}
          >
            {p === "ios" ? "iPhone" : "Android"}
          </button>
        ))}
      </div>

      {direct ? (
        <>
          <a
            href={TESTFLIGHT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTestflightOpen("apply")}
            className={`${CTA} h-[54px] text-[16.5px]`}
          >
            TestFlight에서 바로 체험하기
          </a>
          <span className="text-center text-[12.5px] text-[#8B95A1]">
            이메일 신청 없이 링크로 바로 설치돼요 · 선착순 {BETA_SEATS}명
          </span>
          <span className="text-center text-[12.5px] text-[#8B95A1]">
            베타 기간 동안 무료로 사용할 수 있습니다.
          </span>
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              id={emailId}
              type="email"
              aria-label="이메일"
              aria-invalid={error ? true : undefined}
              autoComplete="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="h-[54px] min-w-0 flex-1 rounded-[14px] bg-white px-4 text-[16px] text-[#191F28] placeholder:text-[#8B95A1] shadow-[inset_0_0_0_1px_#D1D6DB] outline-none focus:shadow-[inset_0_0_0_2px_#1B64DA]"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className={`${CTA} h-[54px] px-[22px] text-[15.5px] whitespace-nowrap disabled:opacity-90`}
            >
              {status === "sending" ? "신청 중…" : copy.submitLabel}
            </button>
          </div>

          {error && (
            <span role="alert" className="text-left text-[13px] text-[#F04452]">
              {error}
            </span>
          )}

          <label
            htmlFor={agreeId}
            className="flex cursor-pointer items-start gap-2.5 px-0.5 text-left"
          >
            <input
              id={agreeId}
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                setError("");
              }}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#1B64DA]"
            />
            <span className="text-[13px] leading-[19px] break-keep text-[#6B7684]">
              개인정보 수집·이용에 동의합니다.
              <br />
              <span className="text-[11.5px] text-[#8B95A1]">
                수집 항목: 이메일 · 목적: 출시 알림 발송 · 보유: 테스터 등록 후
                즉시 파기
              </span>
            </span>
          </label>

          <span className="text-center text-[12.5px] text-[#8B95A1]">
            {BETA_CLOSED
              ? "1차 모집이 마감돼 대기 명단으로 등록돼요"
              : `선착순 ${BETA_SEATS}명${dday === null ? "" : ` · 마감까지 D-${dday}`} · 신청 즉시 안내 메일을 보내드려요`}
          </span>
        </form>
      )}
    </div>
  );
}
