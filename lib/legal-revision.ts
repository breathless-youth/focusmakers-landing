/**
 * 개정판 시행 여부 판단
 *
 * 기준 시각은 시간대가 붙은 ISO 문자열로만 받는다.
 * 시간대가 없으면 Date.parse가 실행 환경의 시간대로 읽어, UTC로 도는 서버에서는 한국 시간보다 9시간 늦게 바뀐다.
 * 테스트 스크립트가 Node로 바로 읽도록 다른 모듈을 가져오지 않는다.
 */
export function isRevisionInEffect(now: Date, effectiveAt: string): boolean {
  if (!/T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(effectiveAt)) {
    throw new Error(`시행 시각에 시간대가 없습니다: ${effectiveAt}`);
  }
  const effectiveMs = Date.parse(effectiveAt);
  if (Number.isNaN(effectiveMs)) {
    throw new Error(`시행 시각을 읽을 수 없습니다: ${effectiveAt}`);
  }
  return now.getTime() >= effectiveMs;
}
