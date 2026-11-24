import type { Metadata } from "next";
import { LegalPage, NoticeLink } from "@/components/legal/LegalDocument";
import {
  LEGAL_REVISION,
  LEGAL_REVISION_20261123,
  OG_COMMON,
  SITE,
} from "@/lib/site";
import { Terms20261123 } from "../_versions/2026-11-23";

export const metadata: Metadata = {
  title: `이용약관 (${LEGAL_REVISION.previousEffectiveDate} 시행)`,
  description: `포메 서비스 이용약관. ${LEGAL_REVISION.previousEffectiveDate}부터 ${LEGAL_REVISION.previousLastDate}까지 적용됩니다.`,
  alternates: { canonical: LEGAL_REVISION.previousTermsPath },
  openGraph: { ...OG_COMMON, url: LEGAL_REVISION.previousTermsPath },
};

export default function Terms20261123Page() {
  return (
    <LegalPage
      title="이용약관"
      dateLine={`시행일: ${LEGAL_REVISION.previousEffectiveDate} · 적용 기간: ${LEGAL_REVISION.previousEffectiveDate}부터 ${LEGAL_REVISION.previousLastDate}까지`}
      notice={
        <>
          이 판은 {LEGAL_REVISION.previousLastDate}까지 적용됩니다.{" "}
          <NoticeLink href={LEGAL_REVISION.termsPath}>
            {LEGAL_REVISION.effectiveDate}부터 적용되는 약관 보기
          </NoticeLink>
          {" · "}
          <NoticeLink href={LEGAL_REVISION_20261123.previousTermsPath}>
            이전 판 보기
          </NoticeLink>
        </>
      }
      footerLinks={[
        { href: "/", label: `${SITE.appName} 홈으로` },
        { href: SITE.privacyPath, label: "개인정보처리방침" },
      ]}
    >
      <Terms20261123 />
    </LegalPage>
  );
}
