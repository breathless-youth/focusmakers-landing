import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // 커스텀 도메인 연결 전에 홍보에 쓰인 기본 주소 → 정식 도메인.
        source: "/:path*",
        has: [{ type: "host", value: "focusmakers-landing.vercel.app" }],
        destination: "https://focusmakers.app/:path*",
        permanent: true,
      },
      {
        // 인스타그램 프로필 링크 → UTM 붙여서 랜딩으로
        source: "/ig",
        destination:
          "/?utm_source=instagram&utm_medium=social&utm_campaign=profile_link",
        // 캠페인 파라미터를 갈아끼울 수 있게 307(비영구)로 둔다
        permanent: false,
      },
      {
        // 메타 광고 링크 → Apple 캠페인 링크(pt·ct)로. 앱스토어는 UTM 을 읽지 않고
        // App Analytics 의 "소스 > 캠페인" 이 pt·ct 로 유입을 집계한다
        source: "/ios",
        destination:
          "https://apps.apple.com/app/apple-store/id6797220287?pt=129235193&ct=meta_ads&mt=8",
        // 캠페인 파라미터를 갈아끼울 수 있게 307(비영구)로 둔다
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
