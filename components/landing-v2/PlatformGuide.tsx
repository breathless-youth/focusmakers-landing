"use client";

import { HOW_STEPS } from "@/lib/beta";
import { trackCtaClick, trackPlatformSelect } from "@/lib/analytics";
import { useBeta } from "./BetaContext";
import { StoreLink } from "./StoreLink";

/**
 * "참여 방법" 섹션 — iPhone / Android 탭과 기기별 3단계 안내.
 * iPhone은 App Store로 바로, Android는 신청 폼으로 넘긴다.
 * iOS 는 정식 출시라 Android 모집 상태와 무관하게 늘 스토어 버튼을 띄운다.
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
            onClick={() => {
              // 이미 선택된 탭을 다시 눌러도 상태는 그대로다.
              // 계측도 실제로 바뀔 때만 보내야 전환 수가 부풀지 않는다
              if (p === platform) return;
              setPlatform(p);
              trackPlatformSelect(p, "how");
            }}
            className={`${TAB} ${platform === p ? TAB_ON : TAB_OFF}`}
          >
            {p === "ios" ? "iPhone" : "Android"}
          </button>
        ))}
      </div>

      {detected && (
        <p className="text-[13px] break-keep text-[#6B7684]">
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
              <span className="text-[13px] leading-[19px] text-[#6B7684]">
                {s.desc}
              </span>
            </div>
          </div>
        ))}

        {ios ? (
          <StoreLink
            location="how"
            className="mt-1.5 flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#1B64DA] text-[15px] font-bold text-white shadow-[0_6px_18px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2] active:scale-[.97]"
          >
            App Store에서 무료로 받기
          </StoreLink>
        ) : (
          <a
            href="#apply"
            onClick={() => trackCtaClick("how", "how_email_signup")}
            className="mt-1.5 flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#1B64DA] text-[15px] font-bold text-white shadow-[0_6px_18px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2] active:scale-[.97]"
          >
            이메일로 테스터 등록하기
          </a>
        )}
      </div>
    </div>
  );
}
