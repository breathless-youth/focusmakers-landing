import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { BackToTop } from "@/components/landing-v2/BackToTop";
import { CountUp } from "@/components/landing-v2/CountUp";
import { FaqAccordion } from "@/components/landing-v2/FaqAccordion";
import { HeaderCta } from "@/components/landing-v2/HeaderCta";
import { RecordsPhone, ResultPhone } from "@/components/landing-v2/PhoneMockups";
import { Reveal } from "@/components/landing-v2/Reveal";
import {
  SessionPhones,
  SimpleModePhone,
} from "@/components/landing-v2/SessionPhones";
import { StoreBadges } from "@/components/landing-v2/StoreBadges";
import {
  BETA_FAQS,
  FEATURE_ROWS,
  HERO_STATS,
  INSIGHT_ROWS,
} from "@/lib/beta";
import { APP_DESCRIPTION } from "@/lib/content";
import { OG_COMMON, SITE } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "카메라가 공부를 인식해, 집중하는 동안만 타이머가 흐르는 공부 타이머 포메. 순공시간과 집중률이 자동으로 기록돼요. iPhone은 App Store, Android는 Google Play에서 바로 받을 수 있어요.",
  alternates: { canonical: "/" },
  openGraph: { ...OG_COMMON, url: "/" },
};

/** narrowHidden: 350px 아래에서는 CTA 버튼이 들어갈 자리가 모자란다.
 *  로고 옆 "포메"를 좁은 화면에서 숨기는 것과 같은 이유로 이 항목을 접는다 */
const NAV: { href: string; label: string; narrowHidden?: boolean }[] = [
  { href: "#preview", label: "주요 기능" },
  { href: "#faq", label: "FAQ", narrowHidden: true },
];

const FOOTER_LINKS = [
  { href: "/terms", label: "이용약관" },
  { href: SITE.privacyPath, label: "개인정보처리방침" },
  { href: "/support", label: "문의" },
];

function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: SITE.appName,
      operatingSystem: "iOS, Android",
      applicationCategory: "EducationalApplication",
      description: APP_DESCRIPTION,
      url: SITE.siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      // 화면에 보이는 FAQ와 같은 목록을 넣는다
      mainEntity: BETA_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** 기능별 화면 한 줄 — 카피와 목업을 좌우로 놓고 줄마다 방향을 바꾼다 */
function FeatureRow({
  index,
  reverse = false,
  wide = false,
  children,
}: {
  index: number;
  reverse?: boolean;
  wide?: boolean;
  children: React.ReactNode;
}) {
  const row = FEATURE_ROWS[index];
  return (
    <Reveal
      className={`mx-auto grid w-full items-center gap-10 md:grid-cols-2 ${
        wide ? "max-w-[980px]" : "max-w-[880px]"
      }`}
    >
      <div
        className={`flex max-w-[440px] flex-col gap-3.5 justify-self-center ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <h3 className="text-[22px] leading-[1.25] font-bold tracking-[-0.5px] break-keep md:text-[28px]">
          {row.title}
        </h3>
        <p className="text-[15.5px] leading-6 text-pretty break-keep text-[#6B7684]">
          {row.body}
        </p>
        <div className="mt-1 flex flex-col gap-2">
          {row.bullets.map((b) => (
            <span
              key={b.term}
              className="text-sm leading-[21px] break-keep text-[#6B7684]"
            >
              <b className="font-semibold text-[#191F28]">{b.term}</b> · {b.desc}
            </span>
          ))}
        </div>
      </div>
      {/* min-w-0 이 없으면 그리드 아이템 기본값(min-width:auto)이라 칸이 목업의
          자연 폭 아래로 줄지 않는다. SessionPhones 는 바로 이 칸을 재서 축소
          비율을 정하므로, 칸이 안 줄면 측정값도 안 줄어 좁은 화면에서 가로
          스크롤이 남는다 — 줄이는 쪽으로 순환이 끊기지 않는다 */}
      <div className={`flex min-w-0 justify-center ${reverse ? "md:order-1" : ""}`}>
        {children}
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className="w-full bg-white text-[#191F28]">
      <JsonLd />

      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/[.86] shadow-[0_1px_0_#EFF1F3] backdrop-blur-[12px]">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-3 px-3.5 md:px-5">
          <div className="flex min-w-0 flex-none items-baseline gap-[9px]">
            <a
              href="#top"
              className="text-[18px] font-bold tracking-[-0.2px] whitespace-nowrap text-[#191F28] transition-colors hover:text-[#1B64DA]"
            >
              FocusMakers
            </a>
            <span className="text-[13px] whitespace-nowrap text-[#6B7684] max-[600px]:hidden">
              포메
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-3 md:gap-5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`text-sm font-medium whitespace-nowrap text-[#6B7684] transition-colors hover:text-[#1B64DA] ${
                  n.narrowHidden ? "max-[350px]:hidden" : ""
                }`}
              >
                {n.label}
              </a>
            ))}
            <HeaderCta />
          </div>
        </div>
      </header>

      <main id="top">
        {/* 히어로 — id는 BackToTop이 화면 이탈을 감지하는 기준 */}
        <section id="hero" className="px-5 pt-[88px] pb-[72px]">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
            <h1 className="text-[30px] leading-[1.3] font-bold tracking-[-1px] text-balance break-keep md:text-[46px]">
              당신이
              <br />
              <span className="text-[#1B64DA]">가장 집중을 잘하는 시간</span>은
              <br />
              언제인가요?
            </h1>
            <p className="max-w-[460px] text-[17px] leading-[26px] text-pretty break-keep text-[#6B7684]">
              집중 패턴을 발견하고,
              <br />더 나은 공부 습관을 만들어보세요.
            </p>
            <div className="flex flex-col items-center gap-3">
              <StoreBadges location="hero" />
              <span className="text-[13px] text-[#6B7684]">
                iOS · Android 정식 출시
              </span>
            </div>

            <dl className="mt-6 grid w-full max-w-[640px] grid-cols-3 gap-4 border-t border-[#EFF1F3] pt-7">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <dd
                    className={`m-0 tabular-nums ${
                      s.accent
                        ? "text-[30px] font-extrabold tracking-[-0.5px] text-[#1B64DA] md:text-[38px]"
                        : "text-[22px] font-bold tracking-[-0.5px] md:text-[30px]"
                    }`}
                  >
                    {s.countUp ? <CountUp value={s.value} /> : s.value}
                  </dd>
                  <dt className="text-[12.5px] text-[#6B7684]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 문제 제기 */}
        <section className="px-5 py-[72px]">
          <Reveal className="mx-auto flex max-w-[640px] flex-col items-center gap-9 text-center">
            <h2 className="text-2xl leading-[1.35] font-bold tracking-[-0.5px] break-keep md:text-[32px]">
              오늘 8시간 공부했다면,
              <br />
              실제로 집중한 시간은 얼마나 될까요?
            </h2>
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-[34px] font-bold tracking-[-1px] text-[#8B95A1] tabular-nums line-through decoration-[#D1D6DB] decoration-[3px] md:text-5xl">
                8h 12m
              </span>
              <CaretDownIcon size={16} className="text-[#8B95A1]" />
              <span className="text-[42px] font-extrabold tracking-[-1.5px] text-[#1B64DA] tabular-nums md:text-[60px]">
                <CountUp value="5h 37m" />
              </span>
              <span className="text-[13px] font-semibold text-[#1B64DA]">
                실제 집중시간
              </span>
            </div>
            <p className="max-w-[440px] text-[15.5px] leading-6 text-pretty break-keep text-[#6B7684]">
              기존 공부 타이머는 정직한 공부시간을 알려주지 않습니다.
            </p>
          </Reveal>
        </section>

        {/* 기능별 화면 */}
        <section
          id="preview"
          className="scroll-mt-[72px] px-5 pt-[88px] pb-20"
        >
          <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
            <Reveal className="flex flex-col items-center gap-2.5 text-center">
              <h2 className="text-[26px] leading-[1.3] font-bold tracking-[-0.5px] break-keep md:text-[34px]">
                포메와 함께 공부하세요.
                <br />
                집중한 시간은 자동으로 기록됩니다.
              </h2>
              <p className="text-base break-keep text-[#6B7684]">
                앱 화면 그대로 가져왔어요.
              </p>
            </Reveal>

            <div className="mt-4 flex flex-col gap-20">
              <FeatureRow index={0} wide>
                <SessionPhones />
              </FeatureRow>

              <FeatureRow index={1} reverse>
                <ResultPhone />
              </FeatureRow>

              <FeatureRow index={2}>
                <SimpleModePhone />
              </FeatureRow>

              <FeatureRow index={3} reverse>
                <RecordsPhone />
              </FeatureRow>
            </div>
          </div>
        </section>

        {/* 인사이트 */}
        <section className="px-5 pt-2 pb-[88px]">
          <Reveal className="mx-auto flex max-w-[640px] flex-col gap-7">
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-[26px] leading-[1.3] font-bold tracking-[-0.5px] break-keep md:text-[34px]">
                기록이 쌓이면,
                <br />
                나의 공부 습관이 보입니다.
              </h2>
              <span className="rounded-full bg-[#E8F3FF] px-3 py-1 text-xs font-semibold text-[#1B64DA]">
                집중 리포트 · 업데이트 예정
              </span>
            </div>
            <dl className="m-0 rounded-[20px] bg-[#F9FAFB] px-[22px] py-1.5 shadow-[inset_0_0_0_1px_#E5E8EB]">
              {INSIGHT_ROWS.map((r, i) => (
                <div
                  key={r.label}
                  className={`flex items-center justify-between gap-4 py-4 ${
                    i < INSIGHT_ROWS.length - 1
                      ? "border-b border-[#EFF1F3]"
                      : ""
                  }`}
                >
                  <dt className="text-[14.5px] break-keep text-[#6B7684]">
                    {r.label}
                  </dt>
                  <dd className="m-0 text-[15px] font-bold whitespace-nowrap tabular-nums">
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-center text-[15.5px] leading-6 break-keep text-[#6B7684]">
              내가 언제, 얼마나 집중하는지 객관적으로 알아보세요.
            </p>
          </Reveal>

          {/* 소셜 스터디 */}
          <Reveal className="mx-auto mt-8 flex max-w-[920px] flex-wrap items-center justify-center gap-8 rounded-[40px] bg-[#101419] px-7 py-10 md:gap-[72px] md:px-16 md:py-16">
            <div className="flex min-w-0 flex-1 basis-[340px] flex-col items-start gap-4">
              <span className="rounded-full bg-[#1B64DA] px-3.5 py-1.5 text-[13px] font-semibold text-white">
                NEW
              </span>
              <h2 className="text-[28px] font-bold tracking-[-0.8px] text-white md:text-[38px]">
                친구/스터디원과 함께 공부
              </h2>
              <p className="max-w-[560px] text-[15.5px] leading-[1.62] text-pretty break-keep text-white/[.78] md:text-[17px]">
                연구로 입증된 &lsquo;바디 더블링&rsquo; 효과로 함께 순공시간을
                늘려요.
                <br />
                스터디 그룹을 만들어 서로의 스트릭을 응원하세요.
              </p>
            </div>
            <div className="flex-none">
              <div className="w-[210px] overflow-hidden rounded-[34px] shadow-[0_30px_80px_rgba(27,100,218,.28),0_8px_24px_rgba(0,0,0,.45)] md:w-[248px] md:rounded-[40px]">
                <Image
                  src="/pome/social-study.webp"
                  alt="함께 공부하는 스터디원 목록 화면"
                  width={510}
                  height={1069}
                  sizes="248px"
                  className="block w-full"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-[72px] px-5 py-[88px]">
          <Reveal className="mx-auto flex max-w-[720px] flex-col gap-6">
            <h2 className="text-center text-[26px] font-bold tracking-[-0.5px] md:text-[34px]">
              자주 묻는 질문
            </h2>
            <FaqAccordion items={BETA_FAQS} />
          </Reveal>
        </section>

        {/* 다운로드 — 데스크톱 헤더 CTA 가 여기로 온다 */}
        <section
          id="download"
          className="scroll-mt-[88px] px-5 pb-[88px]"
        >
          {/* 시안(v3)은 카드 없이 회색 띠에 바로 올리지만, 흰 페이지 끝에서 회색이
              갑자기 나오는 게 어색해 배경은 흰색으로 두고 테두리 없는 카드의
              푸른 그림자로만 구분한다. 위 여백은 FAQ 섹션의 아래 여백이 맡는다 */}
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 rounded-3xl bg-white px-6 py-9 text-center shadow-[0_20px_50px_rgba(27,100,218,.16),0_4px_14px_rgba(27,100,218,.08)] md:px-12 md:py-13">
            <Image
              src="/pome/mascot-cta.webp"
              alt="공책에 필기하는 포메 마스코트"
              width={470}
              height={512}
              sizes="78px"
              className="block h-[84px] w-auto"
            />
            <h2 className="text-[26px] leading-[1.28] font-bold tracking-[-0.8px] break-keep md:text-4xl">
              지금 바로 <span className="text-[#1B64DA]">순공시간을</span>{" "}
              측정해보세요.
            </h2>
            <p className="text-[15.5px] break-keep text-[#6B7684]">
              iPhone과 Android 모두 지원해요.
            </p>
            <div className="mt-2">
              <StoreBadges location="download" />
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-[#EFF1F3] px-5 pt-9 pb-14">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-6 md:flex-row md:items-start md:justify-between md:gap-4">
          <div className="flex flex-col items-center gap-1.5 md:items-start">
            <span className="text-base font-bold">FocusMakers</span>
            <span className="text-[13px] text-[#6B7684]">
              포메 · 순공시간 자동 측정
            </span>
          </div>
          <nav
            aria-label="약관 및 문의"
            className="flex items-center gap-6 md:pt-0.5"
          >
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13.5px] text-[#6B7684] transition-colors hover:text-[#191F28]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-1.5 md:items-end">
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="text-[13px] text-[#6B7684] transition-colors hover:text-[#191F28]"
            >
              문의 {SITE.supportEmail}
            </a>
            <span className="text-xs text-[#6B7684]">© 2026 FocusMakers</span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
