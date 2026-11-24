import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalDocument";
import { LEGAL_REVISION, OG_COMMON, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "이용약관과 개인정보처리방침 개정 안내",
  description: `${LEGAL_REVISION.effectiveDate}부터 혼자 공부하는 화면에 표시하는 한 줄 광고에 관한 내용이 이용약관과 개인정보처리방침에 더해집니다.`,
  alternates: { canonical: LEGAL_REVISION.noticePath },
  openGraph: { ...OG_COMMON, url: LEGAL_REVISION.noticePath },
};

type Change = { clause: string; before: string; after: string };

const TERMS_CHANGES: Change[] = [
  {
    clause: "제12조 제목",
    before: "보상형 광고",
    after: "광고",
  },
  {
    clause: "제12조 첫 문단",
    before:
      "회원이 직접 광고 보기를 선택한 경우에만 광고를 보여 줌, 배너 광고와 전면 광고는 게재하지 않음, 공부를 측정하는 화면에는 광고를 표시하지 않음",
    after:
      "보상형 광고와, 혼자 공부하는 화면 아래쪽에 글자 한 줄로 표시하는 한 줄 광고를 보여 줌, 한 줄 광고에는 광고임을 알리는 표시를 붙임, 전면 광고와 이미지·영상 광고는 게재하지 않음, 한 줄 광고 말고는 공부를 측정하는 화면에 광고를 표시하지 않음",
  },
  {
    clause: "제12조 새 문단",
    before: "없음",
    after:
      "한 줄 광고는 맞춤형 광고로 제공하지 않음, 광고 사업자가 제공하는 한 줄 광고는 만 14세 이상임을 확인하고 로그인한 회원에게만 표시, 회원이 아닌 이용자에게는 팀의 서비스를 알리는 내용만 표시",
  },
  {
    clause: "제12조 광고 사업자 문단",
    before:
      "광고는 Google AdMob을 통해 제공, 볼 수 있는 광고가 없으면 광고 시청을 제공하지 못할 수 있음",
    after:
      "보상형 광고와 광고 사업자가 제공하는 한 줄 광고는 Google AdMob을 통해 제공, 볼 수 있는 광고가 없으면 한 줄 광고가 표시되지 않을 수 있음을 더함",
  },
  {
    clause: "제12조 끝 문단",
    before: "광고를 보지 않아도 다른 기능을 그대로 이용할 수 있음",
    after:
      "보상형 광고를 보지 않아도 다른 기능을 그대로 이용할 수 있음, 한 줄 광고를 누르지 않아도 공부 측정에는 영향이 없음",
  },
];

const PRIVACY_CHANGES: Change[] = [
  {
    clause: "1. 수집하는 정보와 수집 방법",
    before:
      "회원이 직접 고른 경우에만 보상형 광고를 보여 줌, 배너 광고와 전면 광고는 게재하지 않음, 공부를 측정하는 화면에는 광고를 표시하지 않음, 광고 식별자는 회원이 보상형 광고를 볼 때 Google AdMob SDK가 수집",
    after:
      "보상형 광고와 한 줄 광고를 보여 줌, 전면 광고와 이미지·영상 광고는 게재하지 않음, 한 줄 광고는 맞춤형 광고로 제공하지 않음, Google AdMob이 제공하는 한 줄 광고는 만 14세 이상임을 확인하고 로그인한 회원에게만 표시, 광고 식별자는 회원에게 한 줄 광고를 표시할 때에도 수집",
  },
  {
    clause: "3. 수집한 정보의 이용 목적",
    before: "보상형 광고 제공과 광고 시청에 따른 포인트 지급",
    after: "한 줄 광고 제공을 더함",
  },
  {
    clause: "6. 제3자 제공, 8. 개인정보의 국외 이전",
    before: "보상형 광고를 위해 Google이 직접 수집하는 정보 안내",
    after: "보상형 광고와 한 줄 광고를 위해 Google이 직접 수집하는 정보 안내",
  },
  {
    clause: "9. 행태정보의 수집·이용·제공 및 거부",
    before:
      "Google AdMob SDK는 회원이 광고 보기를 누를 때 시작, 이용 목적은 보상형 광고 제공과 맞춤형 광고 표시, 광고를 보지 않아도 다른 기능을 그대로 이용할 수 있음",
    after:
      "회원이 혼자 공부하는 화면을 열 때에도 시작, 이용 목적에 한 줄 광고 제공을 더함, Google이 제공하는 한 줄 광고는 같은 회원에게만 맞춤형이 아닌 광고로 요청, 보상형 광고를 보지 않아도 다른 기능을 그대로 이용할 수 있음",
  },
  {
    clause: "11. 만 14세 미만 아동의 개인정보",
    before: "포인트, 결제, 보상형 광고는 만 14세 이상 회원만 이용",
    after:
      "Google이 제공하는 한 줄 광고도 만 14세 이상임을 확인하고 로그인한 회원에게만 표시",
  },
  {
    clause: "15. 방침의 변경",
    before: "이전 방침 페이지로 2026년 11월 14일 판을 안내",
    after: "이전 방침 페이지로 2026년 11월 23일 판을 안내",
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

/**
 * 변경 전후 대조표
 *
 * 세 칸 표는 휴대폰 폭에서 읽기 어려워 좁은 화면에서는 조항마다 위아래로 쌓는다.
 */
function ChangeTable({ caption, rows }: { caption: string; rows: Change[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
        {caption}
      </h3>
      <div className="hidden grid-cols-[11rem_1fr_1fr] gap-4 border-b border-zinc-200 pb-2 text-sm font-medium text-zinc-500 md:grid dark:border-zinc-800 dark:text-zinc-400">
        <span>조항</span>
        <span>바뀌기 전</span>
        <span>바뀐 뒤</span>
      </div>
      <dl className="divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
        {rows.map((row) => (
          <div
            key={row.clause}
            className="grid gap-1 py-3 md:grid-cols-[11rem_1fr_1fr] md:gap-4"
          >
            <dt className="font-medium text-zinc-800 dark:text-zinc-200">
              {row.clause}
            </dt>
            <dd>
              <span className="font-medium text-zinc-500 md:hidden">
                바뀌기 전:{" "}
              </span>
              {row.before}
            </dd>
            <dd className="text-zinc-800 dark:text-zinc-200">
              <span className="font-medium text-zinc-500 md:hidden">
                바뀐 뒤:{" "}
              </span>
              {row.after}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function LegalRevisionNoticePage() {
  return (
    <LegalPage
      title="이용약관과 개인정보처리방침 개정 안내"
      dateLine={`공지일: ${LEGAL_REVISION.noticeDate} · 시행일: ${LEGAL_REVISION.effectiveDate}`}
      footerLinks={[
        { href: "/", label: `${SITE.appName} 홈으로` },
        { href: LEGAL_REVISION.termsPath, label: "바뀐 이용약관" },
        { href: LEGAL_REVISION.privacyPath, label: "바뀐 개인정보처리방침" },
      ]}
    >
      <Section title="바뀌는 이유">
        <p>
          혼자 공부하는 화면 아래쪽에 글자 한 줄 크기의 광고를 표시하기 위해
          이용약관 제12조와 개인정보처리방침의 광고 관련 내용을 고칩니다.
          이용자에게 불리한 변경이어서 시행 30일 전에 알립니다. 공부 측정,
          통계, 소셜룸 같은 기본 기능은 지금처럼 무료입니다.
        </p>
        <p>
          바뀐 약관과 방침은 {LEGAL_REVISION.effectiveDate}부터 적용되며, 그
          전까지는 {LEGAL_REVISION.previousEffectiveDate}에 시행한 약관과 방침이
          적용됩니다.
        </p>
      </Section>

      <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-[15px] font-medium leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        시행일인 {LEGAL_REVISION.effectiveDate}까지 거부 의사를 밝히지 않고
        서비스를 계속 이용하면 바뀐 이용약관과 개인정보처리방침에 동의한 것으로
        봅니다.
      </p>

      <Section title="동의하지 않는 경우">
        <p>
          바뀐 내용에 동의하지 않으면 시행일까지{" "}
          <a
            href={`mailto:${SITE.supportEmail}?subject=${encodeURIComponent("약관·방침 개정 거부")}`}
            className="underline underline-offset-4"
          >
            {SITE.supportEmail}
          </a>
          으로 알려 주시거나, 앱의 설정 &gt; 계정 &gt; 계정 삭제에서 계정을
          삭제하여 이용계약을 해지할 수 있습니다. 로그인하지 않고 쓰는 경우에는
          앱을 삭제하여 이용을 중단할 수 있습니다.
        </p>
      </Section>

      <Section title="전문 보기">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <Link
              href={LEGAL_REVISION.termsPath}
              className="underline underline-offset-4"
            >
              바뀐 이용약관 ({LEGAL_REVISION.effectiveDate} 시행)
            </Link>
          </li>
          <li>
            <Link
              href={LEGAL_REVISION.privacyPath}
              className="underline underline-offset-4"
            >
              바뀐 개인정보처리방침 ({LEGAL_REVISION.effectiveDate} 시행)
            </Link>
          </li>
          <li>
            <Link
              href={LEGAL_REVISION.previousTermsPath}
              className="underline underline-offset-4"
            >
              바뀌기 전 이용약관 ({LEGAL_REVISION.previousEffectiveDate} 시행)
            </Link>
          </li>
          <li>
            <Link
              href={LEGAL_REVISION.previousPrivacyPath}
              className="underline underline-offset-4"
            >
              바뀌기 전 개인정보처리방침 ({LEGAL_REVISION.previousEffectiveDate}{" "}
              시행)
            </Link>
          </li>
        </ul>
      </Section>

      <Section title="주요 변경 내용">
        <p>
          아래는 조항별로 바뀌는 내용을 줄인 것입니다. 정확한 문구는 위의 전문을
          확인해 주시기 바랍니다.
        </p>
        <ChangeTable caption="이용약관" rows={TERMS_CHANGES} />
        <ChangeTable caption="개인정보처리방침" rows={PRIVACY_CHANGES} />
      </Section>

      <Section title="문의">
        <p>
          개정에 관한 문의는 {SITE.supportEmail} 로 보내 주시기 바랍니다.
        </p>
      </Section>
    </LegalPage>
  );
}
