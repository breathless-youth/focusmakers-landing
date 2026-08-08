export const SITE = {
  appName: "포메",
  appNameKo: "Pome",
  teamName: "숨 벅찬 청년들",
  supportEmail: "breathless.youth@gmail.com",
  privacyPath: "/privacy",
  // GA4 측정 ID. 페이지 소스에 그대로 실리는 공개 값이라 환경변수로 빼지 않는다
  gaMeasurementId: "G-RFCX9MHMYR",
  // 커스텀 도메인 없이 Vercel 기본 도메인을 정식 URL로 사용하기로 확정 (2026-07-26)
  siteUrl: "https://pages-nextjs-liart.vercel.app",
  // TODO: 스토어 등록 후 실제 URL로 교체
  appStoreUrl: null as string | null,
  playStoreUrl: null as string | null,
} as const;
