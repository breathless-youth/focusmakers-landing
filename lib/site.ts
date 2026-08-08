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
  // iOS 정식 출시. iPhone CTA 가 전부 이 주소로 나간다.
  // 앱 이름이 바뀌어도 id 형식은 그대로 열리므로 슬러그 없이 둔다
  appStoreUrl: "https://apps.apple.com/kr/app/id6797220287",
  // Android 는 아직 Google Play 비공개 테스트라 공개 주소가 없다.
  // TODO: 정식 출시 후 실제 URL로 교체
  playStoreUrl: null as string | null,
} as const;
