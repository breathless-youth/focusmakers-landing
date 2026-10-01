/**
 * 메인 랜딩 전용 문구.
 * lib/content.ts 는 intro/* 시안 10종이 공유하므로 건드리지 않고, 메인 랜딩이
 * 쓰는 값만 여기 모아 둔다.
 *
 * 파일·식별자 이름의 beta 는 Android 비공개 테스트 모집 시절의 흔적이다.
 */

/** 랜딩의 신청 폼은 내렸고, 남겨 둔 신청 API(app/api/beta/signup)만 이 값을
 *  읽는다. API 를 지울 때 함께 지운다 */
export const ANDROID_BETA_CLOSED = false;

export type Platform = "ios" | "android";

/** 히어로 하단 지표 3종.
 *  countUp 은 뷰포트 진입 시 0부터 세어 올릴 값 — 총 공부시간은 "앉아있던
 *  시간"이라 강조 대상이 아니어서 그대로 둔다. */
export const HERO_STATS: {
  label: string;
  value: string;
  accent?: boolean;
  countUp?: boolean;
}[] = [
  { label: "총 공부시간", value: "6h 24m" },
  { label: "집중시간", value: "4h 52m", accent: true, countUp: true },
  { label: "집중률", value: "76%", countUp: true },
];

/** 기능별 화면 섹션의 카피. 목업은 페이지에서 직접 조립한다 */
export type FeatureRow = {
  title: React.ReactNode;
  body: React.ReactNode;
  bullets: { term: string; desc: string }[];
};

export const FEATURE_ROWS: FeatureRow[] = [
  {
    title: (
      <>
        공부할 때만
        <br />
        작동하는 AI 타이머
      </>
    ),
    body: "카메라가 공부를 인식해, 집중하는 동안만 타이머가 흘러요.",
    bullets: [
      { term: "자동 시작 · 재개", desc: "자동으로 측정돼요" },
      { term: "순공시간", desc: "초 단위로 정확하게 쌓여요" },
    ],
  },
  {
    title: (
      <>
        타임라인을 통한
        <br />
        순공시간 확인
      </>
    ),
    body: "순공시간과 집중률, 방해 요인까지 한눈에 보여요.",
    bullets: [
      { term: "공부 타임라인", desc: "집중한 구간이 한눈에 보여요" },
      { term: "집중 방해 요인", desc: "언제, 얼마나 흐트러졌는지 남아요" },
    ],
  },
  {
    title: "심플 모드로 집중력 UP!",
    body: (
      <>
        내 모습이 화면에 보이지 않아
        <br />
        시선 분산 없이 집중할 수 있어요.
      </>
    ),
    bullets: [
      { term: "간단한 조작", desc: "탭 한 번으로 켜고 꺼요" },
      { term: "측정 유지", desc: "화면만 어둡게 유지되고 순공시간은 계속 측정돼요" },
    ],
  },
  {
    title: (
      <>
        끊기지 않는
        <br />
        연속 학습으로 습관 만들기
      </>
    ),
    body: "매일의 순공시간이 스트릭과 캘린더로 쌓여요.",
    bullets: [
      { term: "연속 학습 스트릭", desc: "하루 최소 10분이면 이어져요" },
      { term: "집중률", desc: "얼마나 집중했는지 %로 남아요" },
    ],
  },
];

/** 집중 리포트 미리보기 — 업데이트 예정 */
export const INSIGHT_ROWS: { label: string; value: React.ReactNode }[] = [
  {
    label: "가장 집중이 잘 되는 시간",
    value: (
      <>
        오전 09:00 – 11:00 <span className="text-[#1B64DA]">· 89%</span>
      </>
    ),
  },
  { label: "평균 집중 지속시간", value: "47분" },
  { label: "집중력이 떨어지는 시간", value: "오후 14:00 – 15:00" },
  {
    label: "이번 주 집중시간",
    value: (
      <>
        28시간 32분 <span className="text-[#12B76A]">+14%</span>
      </>
    ),
  },
];

/** 메인 랜딩 FAQ */
export const BETA_FAQS: { q: string; a: string }[] = [
  {
    q: "무료인가요?",
    a: "앱 다운로드와 기본 기능은 무료로 사용할 수 있습니다. 요금제 관련 안내는 앱 내에서 확인하실 수 있습니다.",
  },
  {
    q: "카메라 영상이 저장되나요?",
    a: "저장되지 않습니다. 영상은 기기 안에서 분석에만 쓰이며, 공부 시간 등 최소한의 정보만 텍스트로 기록됩니다.",
  },
  {
    q: "어떤 기기에서 쓸 수 있나요?",
    a: "iPhone과 Android를 모두 지원하며, 태블릿에서도 사용할 수 있습니다.\niOS는 App Store, Android는 Google Play에서 설치할 수 있습니다.",
  },
  {
    q: "자리를 비우면 어떻게 되나요?",
    a: "자리 이탈이 감지되면 측정이 잠시 멈춥니다. 돌아오면 별도 조작없이 자동으로 다시 측정됩니다.",
  },
  {
    q: "친구와 함께 공부하려면 어떻게 하나요?",
    a: "앱에서 스터디 그룹을 만들거나 초대 코드로 참여하면 함께 순공시간을 쌓을 수 있습니다.",
  },
  {
    q: "집중 리포트는 언제 나오나요?",
    a: "주간·월간 집중 패턴을 분석하는 리포트는 다음 업데이트에서 제공할 예정입니다.",
  },
];
