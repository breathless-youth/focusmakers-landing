import type { Metadata } from "next";
import Link from "next/link";
import { OG_COMMON, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "고객지원",
  description: "포메 고객지원 및 자주 묻는 질문",
  alternates: { canonical: "/support" },
  openGraph: { ...OG_COMMON, url: "/support" },
};

function Faq({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <h3 className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {q}
      </h3>
      <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {a}
      </p>
    </div>
  );
}

export default function SupportPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 md:py-24">
      <header className="mb-12 space-y-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {SITE.appName} ({SITE.appNameKo})
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          고객지원
        </h1>
        <p className="text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          이용 중 궁금한 점이나 불편한 점이 있다면 아래 이메일로 문의해
          주세요.{" "}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="underline underline-offset-4"
          >
            {SITE.supportEmail}
          </a>
        </p>
      </header>

      <div className="space-y-8">
        <Faq
          q="카메라 권한을 허용하지 않아도 앱을 쓸 수 있나요?"
          a="네, 쓸 수 있습니다. 카메라 없이 수동 타이머 모드로 직접 시작·종료하며 순공시간을 측정할 수 있고, 통계와 연속 공부도 동일하게 이용할 수 있습니다. 설정에서 언제든 전환할 수 있습니다."
        />
        <Faq
          q="카메라 영상이 서버에 저장되나요?"
          a="아니요. 카메라 영상은 기기 안에서만 실시간으로 분석되며, 영상이나 사진이 저장되거나 서버로 전송되는 일은 없습니다. 서버에는 분석 결과인 상태 이벤트 기록(집중, 자리 이탈 등)만 저장됩니다."
        />
        <Faq
          q="집중 상태 측정이 잘 안 돼요."
          a="기기를 책상에 세워 얼굴이 화면 중앙에 들어오도록 배치하고, 조명이 너무 어둡거나 역광인 환경을 피해 주세요."
        />
        <Faq
          q="앱을 삭제하거나 기기를 바꾸면 기록이 사라지나요?"
          a="로그인하지 않고 쓰면 기기 식별자를 기준으로 기록을 저장하므로, 앱 삭제나 기기 변경 시 기존 기록에는 다시 접근할 수 없습니다. 소셜 로그인했다면 같은 계정으로 다시 로그인해 기존 기록을 이어서 볼 수 있습니다."
        />
        <Faq
          q="내 데이터를 전부 지우고 싶어요."
          a={
            <>
              소셜 로그인했다면 앱의 설정 &gt; 계정 &gt; 계정 삭제에서 바로
              지울 수 있습니다. 삭제하면 서버에 저장된 공부 기록과 계정 정보가
              즉시 삭제되며 되돌릴 수 없습니다. 로그인하지 않고 썼거나 앱을 쓸
              수 없다면 위 이메일로 요청해 주세요.
              자세한 방법은{" "}
              <Link
                href={SITE.accountDeletionPath}
                className="underline underline-offset-4"
              >
                계정 삭제 안내
              </Link>
              에 있습니다.
            </>
          }
        />
      </div>

      <footer className="mt-16 flex flex-wrap items-center gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <Link href="/" className="underline underline-offset-4">
          {SITE.appName} 홈으로
        </Link>
        <Link href={SITE.privacyPath} className="underline underline-offset-4">
          개인정보처리방침
        </Link>
        <Link href="/terms" className="underline underline-offset-4">
          이용약관
        </Link>
        <Link
          href={SITE.accountDeletionPath}
          className="underline underline-offset-4"
        >
          계정 삭제
        </Link>
      </footer>
    </main>
  );
}
