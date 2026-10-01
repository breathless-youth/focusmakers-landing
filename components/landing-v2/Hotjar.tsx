import Script from "next/script";

/**
 * Hotjar — 히트맵과 세션 녹화.
 *
 * Hotjar 가 Contentsquare 에 인수되면서 태그가 t.contentsquare.net 에서
 * 서빙되는 통합 스크립트로 바뀌었다. 예전 hjid 기반 인라인 스니펫이 아니라
 * 외부 스크립트 한 줄이다.
 *
 * 원본 스니펫의 defer 대신 next/script 의 afterInteractive 를 쓴다 —
 * 하이드레이션 이후에 로드돼 첫 페인트를 막지 않는다.
 *
 * 녹화는 개인정보 노출 위험이 GA4 보다 크다. 입력 폼을 다시 붙일 때는
 * data-hj-suppress · data-cs-mask 로 가려야 한다.
 */
export function Hotjar({ tagId }: { tagId: string }) {
  return (
    <Script
      id="hotjar"
      src={`https://t.contentsquare.net/uxa/${tagId}.js`}
      strategy="afterInteractive"
    />
  );
}
