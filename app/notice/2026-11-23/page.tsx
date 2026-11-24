import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalDocument";
import { LEGAL_REVISION_20261123, OG_COMMON, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "이용약관과 개인정보처리방침 개정 안내",
  description: `${LEGAL_REVISION_20261123.effectiveDate}부터 포인트, 결제, 보상형 광고에 관한 내용이 이용약관과 개인정보처리방침에 더해집니다.`,
  alternates: { canonical: LEGAL_REVISION_20261123.noticePath },
  openGraph: { ...OG_COMMON, url: LEGAL_REVISION_20261123.noticePath },
};

type Change = { clause: string; before: string; after: string };

const TERMS_CHANGES: Change[] = [
  {
    clause: "제1조 (목적)",
    before: "운영 주체 숨 벅찬 청년들",
    after: "운영 주체 포커스메이커스",
  },
  {
    clause: "제2조 (정의)",
    before: "서비스, 이용자, 공부 기록, 기기 식별자",
    after:
      "회원, 마스코트, 꾸미기 상품, 포인트, 유료 포인트, 무료 포인트, 세트를 더함",
  },
  {
    clause: "제3조 (약관의 효력과 변경)",
    before: "시행 7일 전 공지, 불리한 변경은 30일 전 공지",
    after:
      "변경 내용과 사유를 함께 공지, 불리하거나 중대한 변경은 30일 전 공지와 앱 안 알림, 변경 전후 비교, 시행일까지 거부 의사가 없으면 동의로 본다는 점을 함께 알림, 계정 삭제로 해지하면 쓰지 않은 유료 포인트 환불",
  },
  {
    clause: "제4조 (서비스의 내용)",
    before: "서비스는 무료",
    after:
      "기본 기능은 무료, 유료 포인트 충전과 세트 구매는 유료, 포인트 기능은 회원만 이용",
  },
  {
    clause: "제8조 (이용자의 의무)",
    before: "금지 행위 5가지, 위반 시 이용 제한",
    after:
      "포인트 부정 취득과 판매·양도 금지를 더함, 위반으로 얻은 포인트 회수, 이용 제한 전 알림과 14일 안 이의 제기",
  },
  {
    clause: "제9조~제14조",
    before: "없음",
    after:
      "포인트, 유료 포인트와 무료 포인트, 꾸미기 상품과 세트, 보상형 광고, 청약철회와 환불(결제 7일 안 철회, 해지 때 수수료 10%를 뺀 환불), 스토어 환불과 포인트 회수를 새로 둠",
  },
  {
    clause: "제15조 (미성년자의 이용, 지금 제9조)",
    before: "만 14세 미만은 법정대리인 동의 필요",
    after:
      "회원 로그인은 만 14세 이상, 미성년자 결제의 취소와 취소할 수 없는 경우를 더함",
  },
  {
    clause: "제16조, 제19조 (지금 제10조, 제13조)",
    before: "개인정보 보호, 준거법과 분쟁 해결",
    after: "번호만 바뀜",
  },
  {
    clause: "제17조 (서비스의 변경과 중단, 지금 제11조)",
    before: "종료 30일 전 공지",
    after:
      "서비스나 포인트 기능을 종료하면 쓰지 않은 유료 포인트를 환불하고 30일 이상 환불 창구 운영",
  },
  {
    clause: "제18조 (면책, 지금 제12조)",
    before: "무료 서비스 면책",
    after:
      "팀의 고의 또는 중대한 과실은 면책하지 않음, 유료 상품 책임은 제10조~제15조와 법령에 따름",
  },
  {
    clause: "제20조 (사업자 정보와 문의, 지금 제14조)",
    before: "문의 이메일",
    after:
      "결제·환불 문의, 사업자 정보(상호, 대표자, 사업장 주소, 사업자등록번호, 통신판매업 신고번호, 전화번호)",
  },
];

const PRIVACY_CHANGES: Change[] = [
  {
    clause: "도입 문단",
    before: "운영 주체 숨 벅찬 청년들",
    after: "운영 주체 포커스메이커스",
  },
  {
    clause: "1. 수집하는 정보와 수집 방법",
    before: "광고를 게재하지 않음",
    after:
      "회원이 고른 경우에만 보상형 광고(Google AdMob), 구매 및 포인트 기록, 광고 시청 기록, 팀이 직접 환불할 때의 계좌 정보를 더함",
  },
  {
    clause: "3. 수집한 정보의 이용 목적",
    before: "없음",
    after: "포인트, 인앱결제, 청약철회·환불, 보상형 광고, 거래 기록 보존을 더함",
  },
  {
    clause: "4. 보유 및 이용 기간, 5. 파기 절차 및 방법",
    before: "없음",
    after:
      "전자상거래법에 따른 거래 기록 보존 기간, 계정 삭제 때 결제·환불 기록의 분리 보관",
  },
  {
    clause: "6. 제3자 제공",
    before: "Meta SDK 안내",
    after: "Google AdMob SDK 안내를 더함",
  },
  {
    clause: "7. 처리 위탁, 8. 개인정보의 국외 이전",
    before: "없음",
    after:
      "RevenueCat 처리 위탁과 미국 이전(회원이 처음 가격 보기, 구매, 구매 복원을 할 때부터), 보상 확인을 위한 번호의 Google 전달",
  },
  {
    clause: "9. 행태정보의 수집·이용·제공 및 거부",
    before: "Meta, Airbridge",
    after: "Google AdMob의 행태정보 수집과 맞춤 광고 거부 방법을 더함",
  },
  {
    clause: "10. 이용자의 권리와 행사 방법",
    before: "없음",
    after: "포인트 기록 확인 방법을 더함",
  },
  {
    clause: "11. 만 14세 미만 아동의 개인정보",
    before: "광고를 게재하지 않음",
    after:
      "포인트, 결제, 보상형 광고는 만 14세 이상 회원만 이용, 맞춤 광고는 만 14세 이상 회원에게만 제공",
  },
  {
    clause: "12. 안전성 확보 조치",
    before: "이름과 전화번호를 요구하지 않음",
    after: "직접 환불에 필요한 계좌 정보만 예외",
  },
  {
    clause: "13. 개인정보 보호책임자",
    before: "이니셜 성명, 소속 숨 벅찬 청년들",
    after: "대표자 실명, 소속 포커스메이커스, 전화번호를 더함",
  },
  {
    clause: "15. 방침의 변경",
    before: "7일 전 공지, 중대한 변경은 30일 전 공지",
    after: "변경 전후 비교와 이전 방침 공개를 더함",
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
      dateLine={`공지일: ${LEGAL_REVISION_20261123.noticeDate} · 시행일: ${LEGAL_REVISION_20261123.effectiveDate}`}
      footerLinks={[
        { href: "/", label: `${SITE.appName} 홈으로` },
        { href: LEGAL_REVISION_20261123.termsPath, label: "바뀐 이용약관" },
        { href: LEGAL_REVISION_20261123.privacyPath, label: "바뀐 개인정보처리방침" },
      ]}
    >
      <Section title="바뀌는 이유">
        <p>
          포인트, 꾸미기 상점, 인앱결제, 보상형 광고를 새로 제공하면서
          이용약관과 개인정보처리방침을 고칩니다. 공부 측정, 통계, 소셜룸 같은
          기본 기능은 지금처럼 무료입니다.
        </p>
        <p>
          바뀐 약관과 방침은 {LEGAL_REVISION_20261123.effectiveDate}부터 적용되며, 그
          전까지는 {LEGAL_REVISION_20261123.previousEffectiveDate}에 시행한 약관과 방침이
          적용됩니다.
        </p>
      </Section>

      <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-[15px] font-medium leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        시행일인 {LEGAL_REVISION_20261123.effectiveDate}까지 거부 의사를 밝히지 않고
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
              href={LEGAL_REVISION_20261123.termsPath}
              className="underline underline-offset-4"
            >
              바뀐 이용약관 ({LEGAL_REVISION_20261123.effectiveDate} 시행)
            </Link>
          </li>
          <li>
            <Link
              href={LEGAL_REVISION_20261123.privacyPath}
              className="underline underline-offset-4"
            >
              바뀐 개인정보처리방침 ({LEGAL_REVISION_20261123.effectiveDate} 시행)
            </Link>
          </li>
          <li>
            <Link
              href={LEGAL_REVISION_20261123.previousTermsPath}
              className="underline underline-offset-4"
            >
              바뀌기 전 이용약관 ({LEGAL_REVISION_20261123.previousEffectiveDate} 시행)
            </Link>
          </li>
          <li>
            <Link
              href={LEGAL_REVISION_20261123.previousPrivacyPath}
              className="underline underline-offset-4"
            >
              바뀌기 전 개인정보처리방침 ({LEGAL_REVISION_20261123.previousEffectiveDate}{" "}
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
