"use client";

import { BETA_CLOSED, HOW_STEPS, TESTFLIGHT_URL } from "@/lib/beta";
import { useBeta } from "./BetaContext";

/**
 * "참여 방법" 섹션 — iPhone / Android 탭과 기기별 3단계 안내.
 * iPhone은 TestFlight 링크로 바로, Android는 신청 폼으로 넘긴다.
 */

const TAB =
  "flex h-[42px] cursor-pointer items-center rounded-[10px] px-[26px] text-[14.5px] transition-all active:scale-[.97]";
const TAB_ON = "bg-white font-bold text-[#191F28] shadow-[0_1px_4px_rgba(25,31,40,.1),inset_0_0_0_1px_#E5E8EB]";
const TAB_OFF = "bg-transparent font-semibold text-[#6B7684]";

export function PlatformGuide() {
  const { platform, setPlatform, detected } = useBeta();
  const ios = platform === "ios";

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-4">
      <div
        role="group"
        aria-label="기기 선택"
        className="flex gap-1.5 rounded-[14px] bg-[#F9FAFB] p-[5px] shadow-[inset_0_0_0_1px_#E5E8EB]"
      >
        {(["ios", "android"] as const).map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={platform === p}
            onClick={() => setPlatform(p)}
            className={`${TAB} ${platform === p ? TAB_ON : TAB_OFF}`}
          >
            {p === "ios" ? "iPhone" : "Android"}
          </button>
        ))}
      </div>

      {detected && (
        <p className="text-[13px] break-keep text-[#8B95A1]">
          지금 보고 계신 기기가 {detected === "android" ? "Android" : "iPhone"}라{" "}
          {detected === "android" ? "Android" : "iPhone"} 절차를 먼저 보여드려요
        </p>
      )}

      <div className="w-full rounded-[20px] bg-[#F9FAFB] px-[26px] pt-2 pb-[26px] shadow-[inset_0_0_0_1px_#E5E8EB]">
        {HOW_STEPS[platform].map((s, i) => (
          <div
            key={s.title}
            className={`flex items-center gap-3.5 py-[15px] ${
              i === 0 ? "pt-[18px]" : "border-t border-[#EFF1F3]"
            }`}
          >
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#E8F3FF] text-[13px] font-bold text-[#1B64DA]">
              {i + 1}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-medium break-keep">
                {s.title}
              </span>
              <span className="text-[13px] leading-[19px] text-[#8B95A1]">
                {s.desc}
              </span>
            </div>
          </div>
        ))}

        {ios && !BETA_CLOSED ? (
          <a
            href={TESTFLIGHT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#1B64DA] text-[15px] font-bold text-white shadow-[0_6px_18px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2] active:scale-[.97]"
          >
            TestFlight에서 바로 설치하기
          </a>
        ) : (
          <a
            href="#apply"
            className="mt-1.5 flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#1B64DA] text-[15px] font-bold text-white shadow-[0_6px_18px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2] active:scale-[.97]"
          >
            이메일로 테스터 등록하기
          </a>
        )}
      </div>
    </div>
  );
}
