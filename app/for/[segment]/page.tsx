import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroVisualCard, SectionView } from "@/components/b2b/Sections";
import { PilotForm } from "@/components/b2b/PilotForm";
import {
  B2B_AFFILIATION,
  B2B_CONSENT,
  B2B_TEAM,
  SEGMENT_IDS,
  findSegment,
} from "@/lib/b2b";
import { BUSINESS, OG_COMMON, SITE } from "@/lib/site";
import "../b2b.css";

/**
 * 기관용 랜딩. 제휴 제안 메일에서 업종별 주소(/for/online 등)로 들어온다.
 *
 * 검색 유입용 페이지가 아니라 메일을 받은 담당자만 보는 페이지라서 색인을 막고
 * 사이트맵에도 넣지 않는다. 공개 검색에 내놓기로 하면 robots 값과 사이트맵을 함께 바꾼다.
 */

/** 정해 둔 업종 말고는 404로 보낸다 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SEGMENT_IDS.map((segment) => ({ segment }));
}

type Props = { params: Promise<{ segment: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment } = await params;
  const s = findSegment(segment);
  if (!s) return {};
  const path = `/for/${s.id}`;
  return {
    // 사이트 공통 제목 틀이 뒤에 다른 서비스 표기를 붙이지 않도록 통째로 정한다
    title: { absolute: `${s.name} 기관용 | 포커스 메이커스` },
    description: s.description,
    alternates: { canonical: path },
    openGraph: { ...OG_COMMON, url: path },
    robots: { index: false, follow: false },
  };
}

const BUSINESS_ROWS: [string, string][] = [
  ["상호", BUSINESS.name],
  ["대표자", BUSINESS.representative],
  ["사업자등록번호", BUSINESS.registrationNumber],
  ["통신판매업 신고번호", BUSINESS.mailOrderNumber],
  ["주소", BUSINESS.address],
  ["문의", SITE.supportEmail],
];

export default async function B2bPage({ params }: Props) {
  const { segment } = await params;
  const s = findSegment(segment);
  if (!s) notFound();

  // 리뷰가 적을 때 두 줄로 나누면 줄마다 카드가 모자라 흐름이 끊겨 보인다
  const reviewRows =
    B2B_TEAM.reviews.length > 6
      ? [0, 1].map((k) => B2B_TEAM.reviews.filter((_, i) => i % 2 === k))
      : [B2B_TEAM.reviews];

  return (
    <div className="b2b">
      <header className="b2b-top">
        <div className="b2b-top-in">
          <Link href="/" className="b2b-brand">
            포커스 메이커스<span>기관용</span>
          </Link>
          <a href="#apply" className="btn btn-primary btn-sm">
            무료 시범 신청
          </a>
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <div className="copy">
            <span className="tag">{s.hero.tag}</span>
            <h1>
              {s.hero.h.map((line, i) => (
                <span key={i}>
                  {line.map((part, j) =>
                    typeof part === "string" ? part : <em key={j}>{part.em}</em>,
                  )}
                </span>
              ))}
            </h1>
            <p>{s.hero.sub}</p>
            <div className="ctas">
              <a href="#apply" className="btn btn-primary">
                {s.hero.cta}
              </a>
              <a href="#pilot" className="btn btn-ghost">
                시범 운영 방법 보기
              </a>
            </div>
          </div>
          <HeroVisualCard v={s.hero.vis} />
        </section>

        {s.flow.map((x, i) => (
          <SectionView key={i} x={x} />
        ))}

        <section className="steps" id="pilot">
          <span className="tag">비용 없이 시작</span>
          <h2>2주 무료 시범 운영은 이렇게 진행돼요</h2>
          <div className="grid-3">
            {s.steps.map(([title, body], i) => (
              <div className="step" key={title}>
                <span className="n">{i + 1}단계</span>
                <b>{title}</b>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <p className="after">
            2주 동안은 비용이 없습니다. 끝난 뒤 계속 쓸지, 어떤 조건으로 쓸지는 결과를 함께 보고
            정합니다.
          </p>
        </section>

        <section className="team">
          <span className="tag">만드는 사람들</span>
          <h2>{B2B_TEAM.h}</h2>
          <p>{B2B_TEAM.p}</p>
          <div className="badges">
            {B2B_TEAM.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          {B2B_TEAM.facts.length > 0 && (
            <div className="facts">
              {B2B_TEAM.facts.map((fact) => (
                <div key={fact.label}>
                  <b>{fact.value}</b>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
          )}
          {B2B_TEAM.reviews.length > 0 && (
            <div className="reviews">
              <span className="tag">사용자 리뷰</span>
              {reviewRows.map((row, k) => (
                <div className="marquee" key={k}>
                  <div className={k ? "track rev" : "track"}>
                    {/* 끊김 없이 흐르도록 같은 묶음을 두 번 잇는다. 뒤 묶음은 읽기 도구에서 숨긴다 */}
                    {[...row, ...row].map((review, i) => (
                      <div className="rv" key={i} aria-hidden={i >= row.length}>
                        <span className="stars" aria-label="별점 5점">
                          ★★★★★
                        </span>
                        <p>{review.text}</p>
                        <div className="by">
                          <span>{review.by}</span>
                          <span>{review.store}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="apply" id="apply">
          <h2>2주 무료 시범 운영 신청</h2>
          <PilotForm
            segment={s.id}
            orgLabel={s.form.orgLabel}
            orgPlaceholder={s.form.orgPlaceholder}
            sizeLabel={s.form.sizeLabel}
            sizePlaceholder={s.form.sizePlaceholder}
            consentText={B2B_CONSENT}
          />
        </section>

        <footer className="biz">
          <div className="biz-links">
            <b>포커스 메이커스(FocusMakers)</b>
            <Link href="/terms">이용약관</Link>
            <Link href={SITE.privacyPath}>개인정보처리방침</Link>
            <a href={`mailto:${SITE.supportEmail}`}>문의</a>
          </div>
          <div className="biz-info">
            {BUSINESS_ROWS.map(([label, value]) => (
              <span key={label}>
                {label} {value}
              </span>
            ))}
          </div>
          <div className="biz-aff">
            {B2B_AFFILIATION.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
