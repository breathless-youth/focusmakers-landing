import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-mono text-sm text-zinc-400">404</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zinc-500">
        주소가 바뀌었거나 삭제된 페이지예요.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-transform active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
