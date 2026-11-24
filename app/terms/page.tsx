import type { Metadata } from "next";
import { LegalPage, NoticeLink } from "@/components/legal/LegalDocument";
import { isRevisionInEffect } from "@/lib/legal-revision";
import { LEGAL_REVISION, OG_COMMON, SITE } from "@/lib/site";
import { Terms20261123 } from "./_versions/2026-11-23";
import { Terms20261224 } from "./_versions/2026-12-24";

export const metadata: Metadata = {
  title: "이용약관",
  description: "포메 서비스 이용약관",
  alternates: { canonical: "/terms" },
  openGraph: { ...OG_COMMON, url: "/terms" },
};

// 시행 시각이 지나면 다시 만들 때 새 판으로 바뀐다. 정적 빌드만 두면 다음 배포 전까지 지금 판이 남는다
export const revalidate = 300;

const FOOTER_LINKS = [
  { href: "/", label: `${SITE.appName} 홈으로` },
  { href: SITE.privacyPath, label: "개인정보처리방침" },
];

export default function TermsPage() {
  if (isRevisionInEffect(new Date(), LEGAL_REVISION.effectiveAt)) {
    return (
      <LegalPage
        title="이용약관"
        dateLine={`시행일: ${LEGAL_REVISION.effectiveDate}`}
        footerLinks={FOOTER_LINKS}
      >
        <Terms20261224 />
      </LegalPage>
    );
  }

  return (
    <LegalPage
      title="이용약관"
      dateLine={`시행일: ${LEGAL_REVISION.previousEffectiveDate}`}
      notice={
        <>
          {LEGAL_REVISION.effectiveDate}부터 바뀌어요.{" "}
          <NoticeLink href={LEGAL_REVISION.noticePath}>공지 보기</NoticeLink>
        </>
      }
      footerLinks={FOOTER_LINKS}
    >
      <Terms20261123 />
    </LegalPage>
  );
}
