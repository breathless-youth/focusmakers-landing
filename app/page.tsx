import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { BackToTop } from "@/components/landing-v2/BackToTop";
import { FaqAccordion } from "@/components/landing-v2/FaqAccordion";
import { HeaderCta } from "@/components/landing-v2/HeaderCta";
import { StoreBadges } from "@/components/landing-v2/StoreBadges";
import { DressRoom } from "@/components/landing/DressRoom";
import { Fig } from "@/components/landing/Fig";
import { FinalCta } from "@/components/landing/FinalCta";
import { ReviewRow } from "@/components/landing/ReviewRow";
import { RoomCard } from "@/components/landing/RoomCard";
import { SessionPhone } from "@/components/landing/SessionPhone";
import { SoundMixer } from "@/components/landing/SoundMixer";
import { TimerBackgrounds } from "@/components/landing/TimerBackgrounds";
import { Timetable } from "@/components/landing/Timetable";
import { BETA_FAQS } from "@/lib/beta";
import { APP_DESCRIPTION } from "@/lib/content";
import { characterImage, RATINGS, REVIEW_ROWS } from "@/lib/landing";
import { OG_COMMON, SITE } from "@/lib/site";
import "./landing.css";

export const metadata: Metadata = {
  description:
    "AI 타이머가 순공시간을 재고, 타이머 배경과 배경음으로 공부 화면이 몰입하는 공간이 되는 공부 타이머 포커스메이커스. 공개 그룹에서 같이 공부하고, 공부한 만큼 캐릭터를 꾸며요. iPhone은 App Store, Android는 Google Play에서 받을 수 있어요.",
  alternates: { canonical: "/" },
  openGraph: { ...OG_COMMON, url: "/" },
};

const NAV = [
  { href: "#timer", label: "AI 타이머" },
  { href: "#space", label: "몰입 환경" },
  { href: "#together", label: "같이 공부" },
];

const MORE = [
  {
    title: "플래너",
    body: "과목별 할 일을 적고 하루를 타임테이블로 돌아봐요.",
  },
  { title: "기록", body: "일간·주간 순공시간과 집중률을 모아 봐요." },
  { title: "랭킹", body: "일간·주간·월간 순위에서 메달을 받아요." },
];

const FOOTER_LINKS = [
  { href: "/terms", label: "이용약관" },
  { href: SITE.privacyPath, label: "개인정보처리방침" },
  { href: "/support", label: "문의" },
  { href: SITE.accountDeletionPath, label: "계정 삭제" },
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

/** 구간 설명 아래에 붙는 체크 목록 */
function Points({ items }: { items: string[] }) {
  return (
    <ul className="points">
      {items.map((item) => (
        <li key={item}>
          <CheckIcon weight="bold" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div className="lp">
      <JsonLd />

      <header className="top">
        <div className="wrap top__in">
          <a className="brand" href="#top">
            {/* 44px로 쓰는 작은 그림이라 next/image의 변환을 거치지 않는다 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={characterImage("timi", "plain", "idle")}
              alt=""
              width={44}
              height={44}
            />
            포커스메이커스
          </a>
          <nav className="top__nav" aria-label="구간 바로가기">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <HeaderCta />
          </nav>
        </div>
      </header>

      <main id="top">
        {/* 첫 화면. id는 BackToTop이 화면을 벗어났는지 볼 때 쓴다 */}
        <section id="hero" className="hero">
          <div className="wrap hero__in">
            <div className="hero__text">
              <h1>
                혼자 버티지 말고,
                <br />
                파트너와 몰입해요
              </h1>
              <p className="lead">
                시간은 AI 타이머가 재고, 공부 화면은 몰입하는 공간이 돼요.
                옆자리에는 같이 공부하는 사람이 있어요.
              </p>
              <StoreBadges location="hero" align="start" />
              <p className="proof">
                <span>
                  <StarIcon weight="fill" aria-hidden="true" />
                  <b>{RATINGS.appStore}</b>App Store
                </span>
                <span>
                  <StarIcon weight="fill" aria-hidden="true" />
                  <b>{RATINGS.googlePlay}</b>Google Play
                </span>
              </p>
            </div>
            <div className="desk">
              <span className="desk__cord" aria-hidden="true" />
              <span className="desk__cap" aria-hidden="true" />
              <span className="desk__cone" aria-hidden="true" />
              <span className="desk__floor" aria-hidden="true" />
              <SessionPhone className="desk__phone" />
              <Fig id="timi" className="desk__pal" cheerAfter={900} eager />
            </div>
          </div>
        </section>

        <section className="sec" id="timer">
          <div className="wrap sec__in">
            <div className="sec__text">
              <p className="tag">AI 타이머</p>
              <h2 className="h2">
                시간은
                <br />
                AI 타이머가 재요
              </h2>
              <p className="lead">
                카메라가 공부하는 모습을 기기 안에서 살펴보고, 순공시간을
                과목별 타임테이블로 쌓아 줘요.
              </p>
              <Points
                items={[
                  "자리 이탈, 휴대폰 사용, 기기 조작, 졸음을 살펴봐요",
                  "AI 분석용 원본 프레임과 얼굴 데이터는 서버로 보내지 않아요",
                ]}
              />
            </div>
            <div className="live">
              <SessionPhone />
              <Timetable />
            </div>
          </div>
        </section>

        <section className="sec sec--night" id="space">
          <div className="wrap sec__in sec__in--flip">
            <div className="sec__text">
              <p className="tag">몰입 환경</p>
              <h2 className="h2">
                공부 화면이
                <br />
                몰입하는 공간이 돼요
              </h2>
              <p className="lead">
                오래 집중하면 주의력도 지쳐요. 이럴 때 자연의 풍경과 소리가
                주의력을 다시 채워 준다는 게{" "}
                <b className="term">주의력 회복 이론</b>이에요. 그래서 타이머
                뒤에는 풍경을, 귀에는 자연의 소리를 뒀어요.
              </p>
              <Points
                items={[
                  "타이머 배경을 풀밭, 산, 비 오는 거리 같은 풍경으로 바꿔요",
                  "감시 배경은 흐트러지면 달라지고, 다시 집중하면 원래대로 돌아가요",
                  "빗소리, 파도, 모닥불 같은 배경음 16가지를 골라 섞어요",
                ]}
              />
              <SoundMixer />
            </div>
            <TimerBackgrounds />
          </div>
        </section>

        <section className="sec" id="together">
          <div className="wrap sec__in">
            <div className="sec__text">
              <p className="tag">같이 공부</p>
              <h2 className="h2">
                옆자리에
                <br />
                누군가 있어요
              </h2>
              <p className="lead">
                옆에 누가 있기만 해도 자리를 지키기 쉬워져요.{" "}
                <b className="term">바디 더블링</b>이라고 해요. 그래서 공개
                그룹에 들어가면 꾸민 캐릭터들이 한 방에 모여 같이 공부해요.
              </p>
              <Points
                items={[
                  "누가 지금 공부 중인지, 오늘 얼마나 했는지 같이 봐요",
                  "한 그룹에 최대 6명이 모여요",
                  "공부방에서 입장하기를 눌러 보세요",
                ]}
              />
            </div>
            <RoomCard />
          </div>
        </section>

        <section className="sec sec--mist" id="dress">
          <DressRoom>
            <p className="tag">포인트·꾸미기</p>
            <h2 className="h2">
              공부한 만큼
              <br />
              캐릭터를 꾸며요
            </h2>
            <p className="lead">
              공부하면 포인트가 쌓이고, 포인트로 옷과 소품을 입혀요. 공부
              시간이 쌓이면 새 캐릭터가 열려요.
            </p>
          </DressRoom>
        </section>

        <section className="wrap more" aria-label="그 밖의 기능">
          {MORE.map((item) => (
            <div key={item.title}>
              <b>{item.title}</b>
              <span>{item.body}</span>
            </div>
          ))}
        </section>

        <section className="voices" id="reviews">
          <div className="wrap voices__head">
            <h2 className="h2">먼저 써 본 사람들의 이야기</h2>
            <p className="rating">
              <StarIcon weight="fill" aria-hidden="true" />
              App Store {RATINGS.appStore} · Google Play {RATINGS.googlePlay}
            </p>
          </div>
          {REVIEW_ROWS.map((reviews, row) => (
            <ReviewRow key={row} reviews={reviews} reverse={row % 2 === 1} />
          ))}
        </section>

        <section className="faq" id="faq">
          <div className="wrap faq__in">
            <h2 className="h2">자주 묻는 질문</h2>
            <FaqAccordion items={BETA_FAQS} />
          </div>
        </section>

        {/* 받기. 데스크톱의 위 막대 버튼이 여기로 온다 */}
        <section className="final" id="download">
          <FinalCta>
            <h2 className="h2">빈자리가 하나 있어요</h2>
            <p className="lead">
              오늘 공부, 여기서 시작해요. iPhone과 Android에서 모두 쓸 수
              있어요.
            </p>
          </FinalCta>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot__in">
          <div className="foot__brand">
            <b>포커스메이커스</b>
            <span>AI 공부 타이머</span>
          </div>
          <nav className="foot__nav" aria-label="약관 및 문의">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="foot__mail">
            <a href={`mailto:${SITE.supportEmail}`}>
              문의 {SITE.supportEmail}
            </a>
            <span>© 2026 FocusMakers</span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
