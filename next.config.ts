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
    ];
  },
};

export default nextConfig;
