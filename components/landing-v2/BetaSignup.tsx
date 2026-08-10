"use client";

import { useId, useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { ANDROID_BETA_CLOSED, BETA_SEATS, betaCopy } from "@/lib/beta";
import { trackEmailSignup, trackPlatformSelect } from "@/lib/analytics";
import { useBeta } from "./BetaContext";
import { Confetti } from "./Confetti";
import { StoreLink } from "./StoreLink";

/**
 * 최종 CTA의 베타 신청 카드.
 *
 * iPhone은 정식 출시라 이메일 없이 App Store로 바로 보낸다. 이메일 폼은 Android
 * 전용이고, 그래서 선착순 문구도 폼 안에만 있다. 저장은 브라우저가 직접 하지
 * 않고 /api/beta/signup 이 맡는다 — 서버에서 이메일을 다시 검증하고
 * 레이트리밋을 걸기 위해서다.
 */

const PILL =
  "flex h-[46px] flex-1 cursor-pointer items-center justify-center rounded-xl px-2 text-[14.5px] font-semibold whitespace-nowrap transition-all active:scale-[.97]";
const PILL_ON =
  "bg-[#E8F3FF] text-[#1B64DA] shadow-[inset_0_0_0_1.5px_#1B64DA]";
const PILL_OFF = "bg-white text-[#6B7684] shadow-[inset_0_0_0_1px_#E5E8EB]";

const CTA =
  "flex items-center justify-center rounded-[14px] bg-[#1B64DA] font-bold text-white shadow-[0_6px_18px_rgba(27,100,218,.28)] transition-colors hover:bg-[#1957C2] active:scale-[.97]";

/** gmail.com 오타. 자판 배열·한 글자 누락에서 반복적으로 나오는 것들만 담는다.
 *  googlemail.com 은 Gmail 의 정식 별칭이라 여기 넣지 않는다 */
const GMAIL_TYPOS = new Set([
  "gmial.com",
  "gmai.com",
  "gmail.co",
  "gmail.con",
  "gmail.cm",
  "gmaill.com",
  "gamil.com",
  "gnail.com",
  "g-mail.com",
]);

/** Google 계정으로 쓰이는 일이 드문 도메인.
 *
 *  **차단이 아니라 경고용이다.** Google 계정은 Gmail 주소가 아니어도 만들 수
 *  있고(회사 Workspace 계정, 네이버·아웃룩 주소로 만든 계정 등) 그것들도 전부
 *  유효한 Play 테스터 계정이다. 도메인으로 막으면 정상 사용자를 튕겨낸다 */
const RARELY_GOOGLE_DOMAINS = new Set([
  "naver.com",
  "daum.net",
  "hanmail.net",
  "nate.com",
  "kakao.com",
  "icloud.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "yahoo.co.kr",
]);

/**
 * 입력된 주소가 Play 테스터 계정으로 부적절해 보이면 경고 문구를 돌려준다.
 *
 * Play 비공개 테스트는 **Play 스토어에 로그인된 Google 계정**에만 초대가 닿는다.
 * 그런데 이 조건은 `#how`·FAQ 에만 있고 폼에는 없어서, `#apply` 로 직행하는
 * CTA 를 탄 사용자는 조건을 못 보고 아무 주소나 적는다. 그 결과를 여기서 잡는다.
 */
function domainWarning(email: string): string | null {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return null;
  if (GMAIL_TYPOS.has(domain)) return "혹시 gmail.com 을 잘못 입력하셨나요?";
  if (RARELY_GOOGLE_DOMAINS.has(domain))
    return "Google 계정 이메일이 맞나요? Play 스토어에 로그인된 계정이라야 초대가 전달돼요.";
  return null;
}

export function BetaSignup() {
  const emailId = useId();
  const agreeId = useId();
  const errorId = useId();
  const warnId = useId();
  const { platform, setPlatform } = useBeta();

  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  /** 도메인 경고를 한 번 보여줬는지. 경고는 막지 않고 "한 번 더 누르기"만
   *  요구한다 — 비-Gmail Google 계정이 정상이라 차단하면 안 되기 때문이다 */
  const [warnSeen, setWarnSeen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [saved, setSaved] = useState<{ email: string; platform: string } | null>(
    null,
  );

  const copy = betaCopy();
  /** iPhone은 늘 App Store 직행 — 아래 폼은 Android 만 본다 */
  const ios = platform === "ios";
  /** 입력 중에도 바로 보여준다 — 제출까지 기다리면 이미 되돌아보기 늦다 */
  const warning = domainWarning(email);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const value = email.trim();
    if (!value) return setError("이메일 주소를 입력해 주세요");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return setError("이메일 주소 형식을 확인해 주세요");
    if (!agree) return setError("개인정보 수집·이용에 동의해 주세요");

    // 의심스러운 도메인이면 한 번만 잡아 세운다. 두 번째 제출은 그대로 통과 —
    // 목적은 오타·습관적 입력을 되돌아보게 하는 것이지 거르는 게 아니다
    if (domainWarning(value) && !warnSeen) {
      setWarnSeen(true);
      setError("");
      return;
    }

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
    // 이 폼은 Android 에만 열린다
    setSaved({ email: value, platform: "Android(Google Play)" });
    trackEmailSignup(platform, ANDROID_BETA_CLOSED);
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
          {/* 완료 화면은 early return 하는 별개 JSX라 아래 폼에 붙인 마스킹이
              여기까지 닿지 않는다. 그런데 하필 여기가 입력한 이메일을 그대로
              찍는 유일한 자리다 — input 이 아니라 일반 텍스트여서 세션 녹화의
              자동 보호(입력값 치환)도 받지 못한다. 주소만 따로 가린다 */}
          <b className="text-[#191F28]" data-hj-suppress data-cs-mask>
            {saved.email}
          </b>{" "}
          주소로 {saved.platform} 참여 안내를 보내드릴게요.
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
              // 이미 선택된 탭을 다시 눌러도 상태는 그대로다.
              // 계측도 실제로 바뀔 때만 보내야 전환 수가 부풀지 않는다
              if (p === platform) return;
              setPlatform(p);
              trackPlatformSelect(p, "apply");
            }}
            className={`${PILL} ${platform === p ? PILL_ON : PILL_OFF}`}
          >
            {p === "ios" ? "iPhone" : "Android"}
          </button>
        ))}
      </div>

      {ios ? (
        <>
          <StoreLink
            location="apply"
            className={`${CTA} h-[54px] text-[16.5px]`}
          >
            App Store에서 무료로 받기
          </StoreLink>
          <span className="text-center text-[12.5px] text-[#8B95A1]">
            지금은 모든 기능을 무료로 사용할 수 있습니다.
          </span>
        </>
      ) : (
        // 세션 녹화에서 이 영역을 통째로 가린다. 태그가 Contentsquare 로
        // 넘어갔지만 어느 쪽 리더가 붙든 걸리도록 두 속성을 다 붙인다
        <form
          onSubmit={handleSubmit}
          noValidate
          data-hj-suppress
          data-cs-mask
          className="flex flex-col gap-3"
        >
          {/* 조건을 입력 지점에 둔다. `#how` 에도 같은 안내가 있지만 헤더·히어로
              CTA 가 전부 `#apply` 로 직행해서 그 섹션을 건너뛴다 — 그래서 아무
              주소나 적힌 신청이 쌓였다. placeholder 만으로는 포커스하면 사라져
              부족하고, 스크린리더에도 조건이 전달되지 않아 라벨로 올린다 */}
          <label
            htmlFor={emailId}
            className="px-0.5 text-left text-[13px] leading-[19px] font-semibold break-keep text-[#4E5968]"
          >
            Google Play에 로그인된{" "}
            <span className="text-[#1B64DA]">Google 계정</span> 이메일
          </label>

          <div className="flex gap-2">
            <input
              id={emailId}
              type="email"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : warning ? warnId : undefined}
              autoComplete="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                // 주소가 바뀌면 경고도 처음부터 — 다른 의심 도메인으로 고쳐
                // 넣었는데 이전 확인이 그대로 통과되면 안 된다
                setWarnSeen(false);
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
            <span
              id={errorId}
              role="alert"
              className="text-left text-[13px] text-[#F04452]"
            >
              {error}
            </span>
          )}

          {/* 경고는 오류가 아니다 — 색도 역할도 분리한다. 제출을 한 번 막은
              뒤에는(warnSeen) 다음 행동을 알려줘야 사용자가 멈추지 않는다 */}
          {!error && warning && (
            <span
              id={warnId}
              role="status"
              className="text-left text-[13px] leading-[19px] break-keep text-[#B54708]"
            >
              {warning}
              {warnSeen && " 맞다면 버튼을 한 번 더 눌러주세요."}
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
            {ANDROID_BETA_CLOSED
              ? "1차 모집이 마감돼 대기 명단으로 등록돼요"
              : `선착순 ${BETA_SEATS}명 · 신청 즉시 안내 메일을 보내드려요`}
          </span>
        </form>
      )}
    </div>
  );
}
