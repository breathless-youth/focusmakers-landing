import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE } from "@/lib/site";
import { APP_DESCRIPTION } from "@/lib/content";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${GeistMono.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      {analyticsEnabled && <GoogleAnalytics gaId={SITE.gaMeasurementId} />}
    </html>
  );
}
