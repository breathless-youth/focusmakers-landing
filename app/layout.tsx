import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Hotjar } from "@/components/landing-v2/Hotjar";
import { OG_COMMON, SITE } from "@/lib/site";
import { APP_DESCRIPTION } from "@/lib/content";
/**
 * 유니코드 범위별로 쪼갠 Pretendard. 화면에 실제로 쓰인 범위의 조각만 받는다.
 * 단일 파일(2MB)을 preload 하던 예전 방식은 저속 회선에서 본문이 최종 글꼴로
 * 다시 그려지는 시점을 통째로 밀어내 LCP 를 잡아먹었다.
 */
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

/**
 * 로컬 개발과 Vercel 프리뷰 트래픽이 GA4 에 섞이지 않게 한다.
 * 프리뷰도 NODE_ENV 는 production 이라 VERCEL_ENV 로 한 번 더 거른다.
 * 서버 컴포넌트에서 읽으므로 NEXT_PUBLIC_ 접두사가 필요 없다.
 */
const analyticsEnabled = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: "포메(FocusMakers) - 순공, 집중, 타이머",
    template: "%s | 포메",
  },
  description: `${APP_DESCRIPTION}, 포메. 순공 타이머 · 공부 기록 · 집중률 통계.`,
  // title·description·image 는 위 값에서 자동으로 채워진다.
  // og:url 과 canonical 은 경로마다 달라 각 page.tsx 가 따로 지정한다
  openGraph: OG_COMMON,
  verification: { google: "xRqpt0m4IE3GDMerGzseX4vDlIh_SzOajWpOseylsRY" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full antialiased motion-safe:scroll-smooth"
    >
      <body className="min-h-full flex flex-col">{children}</body>
      {analyticsEnabled && <GoogleAnalytics gaId={SITE.gaMeasurementId} />}
      {analyticsEnabled && SITE.hotjarTagId && (
        <Hotjar tagId={SITE.hotjarTagId} />
      )}
    </html>
  );
}
