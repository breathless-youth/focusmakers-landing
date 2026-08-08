import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { SITE } from "@/lib/site";
import { APP_DESCRIPTION } from "@/lib/content";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

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
    </html>
  );
}
