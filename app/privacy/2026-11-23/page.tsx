import type { Metadata } from "next";
import { LegalPage, NoticeLink } from "@/components/legal/LegalDocument";
import { LEGAL_REVISION, OG_COMMON, SITE } from "@/lib/site";
import { Privacy20261123 } from "../_versions/2026-11-23";

export const metadata: Metadata = {
  title: `개인정보처리방침 (${LEGAL_REVISION.effectiveDate} 시행)`,
  description: `포메 개인정보처리방침. ${LEGAL_REVISION.effectiveDate}부터 적용됩니다.`,
  alternates: { canonical: LEGAL_REVISION.privacyPath },
  openGraph: { ...OG_COMMON, url: LEGAL_REVISION.privacyPath },
};

export default function NextPrivacyPage() {
  return (
    <LegalPage
      title="개인정보처리방침"
      dateLine={`시행일: ${LEGAL_REVISION.effectiveDate}`}
      notice={
        <>
          이 판은 {LEGAL_REVISION.effectiveDate}부터 적용됩니다.{" "}
          <NoticeLink href={LEGAL_REVISION.noticePath}>개정 공지 보기</NoticeLink>
          {" · "}
          <NoticeLink href={LEGAL_REVISION.previousPrivacyPath}>
            이전 판 보기
          </NoticeLink>
        </>
      }
      footerLinks={[
        { href: "/", label: `${SITE.appName} 홈으로` },
        { href: LEGAL_REVISION.termsPath, label: "이용약관" },
      ]}
    >
      <Privacy20261123 />
    </LegalPage>
  );
}
