import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // lofi.focusmakers.app 루트 → 로파이 페이지. 도메인 조건이라 focusmakers.app 에는 영향 없음.
      // 루트(/)는 app/page.tsx 가 먼저 잡기 때문에 파일 확인 전에 도는 beforeFiles 에 둔다.
      beforeFiles: [
        { source: "/", has: [{ type: "host", value: "lofi.focusmakers.app" }], destination: "/lofi/index.html" },
      ],
      // 로파이 컨셉 검증용 정적 페이지 (public/lofi/). docs/lofi-landing.md 참고
      afterFiles: [{ source: "/lofi", destination: "/lofi/index.html" }],
      fallback: [],
    };
  },
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
