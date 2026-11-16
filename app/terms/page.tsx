import type { Metadata } from "next";
import { LegalPage, NoticeLink } from "@/components/legal/LegalDocument";
import { LEGAL_REVISION, OG_COMMON, SITE } from "@/lib/site";
import { Terms20261114 } from "./_versions/2026-11-14";

export const metadata: Metadata = {
  title: "이용약관",
  description: "포메 서비스 이용약관",
  alternates: { canonical: "/terms" },
  openGraph: { ...OG_COMMON, url: "/terms" },
};

export default function TermsPage() {
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
      footerLinks={[
        { href: "/", label: `${SITE.appName} 홈으로` },
        { href: SITE.privacyPath, label: "개인정보처리방침" },
      ]}
    >
      <Terms20261114 />
    </LegalPage>
  );
}
