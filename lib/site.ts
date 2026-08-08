/**
 * 정식 URL. Vercel 이 프로덕션 도메인을 자동으로 넣어 주므로 커스텀 도메인을
 * 붙여도 코드를 고칠 필요가 없다. sitemap·robots·canonical·OG 이미지가 이 값을
 * 쓰기 때문에 틀리면 검색엔진이 엉뚱한 주소를 정본으로 인식한다.
 */
const PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://focusmakers-landing.vercel.app";

export const SITE = {
  appName: "포메",
  appNameKo: "Pome",
  teamName: "숨 벅찬 청년들",
  supportEmail: "breathless.youth@gmail.com",
  privacyPath: "/privacy",
  // GA4 측정 ID. 페이지 소스에 그대로 실리는 공개 값이라 환경변수로 빼지 않는다
  gaMeasurementId: "G-RFCX9MHMYR",
  // Hotjar(Contentsquare) 태그 ID. 페이지 소스에 실리는 공개 값이다.
  // 빈 문자열이면 스크립트를 심지 않는다
  hotjarTagId: "886e521c1d612",
  siteUrl: PRODUCTION_URL,
  // TODO: 스토어 등록 후 실제 URL로 교체
  appStoreUrl: null as string | null,
  playStoreUrl: null as string | null,
} as const;
