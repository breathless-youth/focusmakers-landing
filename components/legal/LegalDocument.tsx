import Link from "next/link";
import { BUSINESS, SITE } from "@/lib/site";

/**
 * 약관·방침·공지 페이지의 공통 틀
 *
 * 판마다 본문만 다르고 머리말·꼬리말은 같아서 한곳에 둔다.
 * notice는 머리말 위에 한 줄 안내와 링크를 띄울 때만 넘긴다.
 */
export function LegalPage({
  title,
  dateLine,
  notice,
  footerLinks,
  children,
}: {
  title: string;
  dateLine: React.ReactNode;
  notice?: React.ReactNode;
  footerLinks: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 md:py-24">
      {notice && (
        <p className="mb-10 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          {notice}
        </p>
      )}
      <header className="mb-12 space-y-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {SITE.appName} ({SITE.appNameKo})
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{dateLine}</p>
      </header>

      <div className="space-y-10">{children}</div>

      <footer className="mt-16 flex flex-wrap items-center gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="underline underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </footer>
    </main>
  );
}

export function NoticeLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="font-medium underline underline-offset-4">
      {children}
    </Link>
  );
}

/** 약관의 조. 제목을 `제n조 (제목)`으로 그린다. */
export function Article({
  no,
  title,
  children,
}: {
  no: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">
        제{no}조 ({title})
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

/** 방침의 항목. 제목을 `n. 제목`으로 그린다. */
export function Clause({
  no,
  title,
  children,
}: {
  no: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">
        {no}. {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

export function Table({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr
              key={k}
              className="border-b border-zinc-200 last:border-0 dark:border-zinc-800"
            >
              <td className="w-40 shrink-0 py-2.5 pr-4 align-top font-medium text-zinc-800 dark:text-zinc-200">
                {k}
              </td>
              <td className="py-2.5 text-zinc-600 dark:text-zinc-400">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * 전자상거래법 제10조가 표시하게 한 사업자 정보 표
 *
 * 빈 값이 공개 화면에 나가면 표시 의무를 어기게 되므로 프로덕션 빌드를 멈춘다.
 * 로컬과 프리뷰 빌드는 그대로 통과시켜 다른 확인을 막지 않는다.
 */
export function BusinessInfoTable() {
  const rows: [string, string][] = [
    ["상호", BUSINESS.name],
    ["대표자", BUSINESS.representative],
    ["사업장 주소", BUSINESS.address],
    ["사업자등록번호", BUSINESS.registrationNumber],
    ["통신판매업 신고번호", BUSINESS.mailOrderNumber],
    ["전화번호", BUSINESS.phone],
    ["이메일", SITE.supportEmail],
  ];
  const missing = rows.filter(([, v]) => v.trim() === "").map(([k]) => k);
  if (missing.length > 0 && process.env.VERCEL_ENV === "production") {
    throw new Error(`사업자 정보가 비어 있습니다: ${missing.join(", ")}`);
  }
  return <Table rows={rows} />;
}
