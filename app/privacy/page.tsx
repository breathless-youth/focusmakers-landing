import type { Metadata } from "next";
import { LegalPage, NoticeLink } from "@/components/legal/LegalDocument";
import { LEGAL_REVISION, OG_COMMON, SITE } from "@/lib/site";
import { Privacy20261114 } from "./_versions/2026-11-14";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "포메 개인정보처리방침",
  alternates: { canonical: "/privacy" },
  openGraph: { ...OG_COMMON, url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="개인정보처리방침"
      dateLine={`시행일: ${LEGAL_REVISION.previousEffectiveDate}`}
      notice={
        <>
          {LEGAL_REVISION.effectiveDate}부터 바뀌어요.{" "}
          <NoticeLink href={LEGAL_REVISION.noticePath}>공지 보기</NoticeLink>
        </>
      }
      footerLinks={[{ href: "/", label: `${SITE.appName} 홈으로` }]}
    >
      <Privacy20261114 />
    </LegalPage>
  );
}
