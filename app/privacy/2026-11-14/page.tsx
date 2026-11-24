import type { Metadata } from "next";
import { LegalPage, NoticeLink } from "@/components/legal/LegalDocument";
import { LEGAL_REVISION_20261123, OG_COMMON, SITE } from "@/lib/site";
import { Privacy20261114 } from "../_versions/2026-11-14";

export const metadata: Metadata = {
  title: `개인정보처리방침 (${LEGAL_REVISION_20261123.previousEffectiveDate} 시행)`,
  description: `포메 개인정보처리방침 이전 판. ${LEGAL_REVISION_20261123.previousEffectiveDate}부터 ${LEGAL_REVISION_20261123.previousLastDate}까지 적용됩니다.`,
  alternates: { canonical: LEGAL_REVISION_20261123.previousPrivacyPath },
  openGraph: { ...OG_COMMON, url: LEGAL_REVISION_20261123.previousPrivacyPath },
};

export default function PreviousPrivacyPage() {
  return (
    <LegalPage
      title="개인정보처리방침"
      dateLine={`시행일: ${LEGAL_REVISION_20261123.previousEffectiveDate} · 적용 기간: ${LEGAL_REVISION_20261123.previousEffectiveDate}부터 ${LEGAL_REVISION_20261123.previousLastDate}까지`}
      notice={
        <>
          이 판은 {LEGAL_REVISION_20261123.previousLastDate}까지 적용됩니다.{" "}
          <NoticeLink href={LEGAL_REVISION_20261123.privacyPath}>
            {LEGAL_REVISION_20261123.effectiveDate}부터 적용되는 방침 보기
          </NoticeLink>
        </>
      }
      footerLinks={[{ href: "/", label: `${SITE.appName} 홈으로` }]}
    >
      <Privacy20261114 />
    </LegalPage>
  );
}
