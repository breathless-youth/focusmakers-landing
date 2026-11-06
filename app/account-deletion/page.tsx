import type { Metadata } from "next";
import Link from "next/link";
import { OG_COMMON, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "계정 삭제 안내",
  description: "포메 계정과 데이터를 삭제하는 방법",
  alternates: { canonical: SITE.accountDeletionPath },
  openGraph: { ...OG_COMMON, url: SITE.accountDeletionPath },
};

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

export default function AccountDeletionPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 md:py-24">
      <header className="mb-12 space-y-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {SITE.appName} ({SITE.appNameKo})
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          계정 삭제 안내
        </h1>
        <p className="text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {SITE.teamName}이 운영하는 {SITE.appName} 앱의 계정과 데이터를
          삭제하는 방법입니다. 소셜 로그인한 계정은 앱에서 직접 지울 수 있고,
          로그인하지 않고 썼거나 앱을 쓸 수 없다면 이메일로 요청할 수
          있습니다.
        </p>
      </header>

      <div className="space-y-10">
        <Section title="앱에서 삭제하기">
          <p>
            소셜 로그인한 계정은 앱의 설정 &gt; 계정 &gt; 계정 삭제를 누르면
            바로 삭제됩니다. Apple로 로그인한 계정은 삭제하기 전에 Apple
            로그인을 한 번 더 요청합니다. 로그인하지 않고 썼다면 앱에 계정
            메뉴가 없으므로 아래처럼 이메일로 요청해 주세요.
          </p>
        </Section>

        <Section title="앱 없이 이메일로 요청하기">
          <p>
            로그인하지 않고 썼거나, 앱을 지웠거나 기기를 잃어버려 앱에서
            삭제할 수 없다면{" "}
            <a
              href={`mailto:${SITE.supportEmail}?subject=${encodeURIComponent("계정 삭제 요청")}`}
              className="underline underline-offset-4"
            >
              {SITE.supportEmail}
            </a>
            으로 삭제를 요청해 주세요. 메일 제목은 &ldquo;계정 삭제
            요청&rdquo;으로 하고, 본문에는 계정을 찾는 데 필요한 아래 내용을
            적어 주세요.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>로그인한 소셜 서비스: Google, 카카오, Apple 중 하나</li>
            <li>Google이나 카카오로 로그인했다면 그 계정의 이메일 주소</li>
            <li>
              Apple로 로그인했거나 로그인하지 않고 썼다면 앱에서 쓰던 닉네임
            </li>
          </ul>
          <p>
            비밀번호는 보내지 마세요. 팀은 어떤 경우에도 비밀번호를 묻지
            않습니다. 계정을 확인하기 어려우면 본인 확인을 위해 몇 가지를 더
            여쭐 수 있습니다.
          </p>
          <p>
            요청을 받은 날부터 10일 안에 삭제하고, 처리 결과를 메일로 알려
            드립니다.
          </p>
        </Section>

        <Section title="삭제되는 정보">
          <p>계정을 삭제하면 아래 정보가 서버에서 바로, 영구히 삭제됩니다.</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>계정, 프로필 정보, 프로필 사진</li>
            <li>로그인 수단, 소셜 계정의 고유 식별 번호, 이메일</li>
            <li>공부 기록과 통계, 랭킹 기록</li>
            <li>과목과 플래너</li>
            <li>
              그룹 가입과 가입 신청 기록. 내가 만든 그룹은 가장 먼저 가입한 다른
              멤버에게 넘어가고, 다른 멤버가 없으면 그룹이 닫힙니다.
            </li>
            <li>차단 목록</li>
            <li>신고와 문의 내역, 알림</li>
            <li>서버의 이용 통계 분석 정보</li>
            <li>푸시 알림 토큰과 로그인 유지 정보</li>
          </ul>
          <p>
            Apple로 로그인한 계정은 Apple에 로그인 권한 해제를 요청하고,
            카카오로 로그인한 계정은 카카오와의 연결을 끊습니다.
          </p>
        </Section>

        <Section title="삭제한 뒤에도 남는 정보">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              삭제하기 전에 발급된 접속 인증 정보는 만료될 때까지 최대 30분
              동안 유효할 수 있습니다.
            </li>
            <li>서버 백업본에 남은 정보는 최대 7일 안에 삭제됩니다.</li>
            <li>
              프로필 사진은 사진을 빠르게 보여 주기 위한 전송 캐시에 최대
              1시간 동안 남을 수 있습니다.
            </li>
            <li>
              Amplitude, Google, Meta, Airbridge 같은 외부 분석 업체가 직접
              가진 기록은 이 삭제로 지워지지 않으며, 개인정보처리방침 8번과
              9번 항목에 적은 각 업체의 보유 기간에 따라 처리됩니다.
            </li>
            <li>
              법령에 보존 의무가 있는 정보는 그 법령이 정한 기간 동안
              보관합니다.
            </li>
          </ul>
          <p>
            자세한 내용은{" "}
            <Link
              href={SITE.privacyPath}
              className="underline underline-offset-4"
            >
              개인정보처리방침
            </Link>
            에서 볼 수 있습니다.
          </p>
        </Section>
      </div>

      <footer className="mt-16 flex flex-wrap items-center gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <Link href="/" className="underline underline-offset-4">
          {SITE.appName} 홈으로
        </Link>
        <Link href={SITE.privacyPath} className="underline underline-offset-4">
          개인정보처리방침
        </Link>
        <Link href="/support" className="underline underline-offset-4">
          고객지원
        </Link>
      </footer>
    </main>
  );
}
