/**
 * 베타 모집(랜딩 v2) 전용 설정과 문구.
 * lib/content.ts 는 intro/* 시안 10종이 공유하므로 건드리지 않고, 메인 랜딩이
 * 쓰는 모집 관련 값만 여기 모아 둔다.
 *
 * iOS 는 App Store 정식 출시라 모집 상태와 무관하게 늘 스토어로 직행한다.
 * 그래서 아래 모집 관련 값은 전부 Android 비공개 테스트에만 걸린다.
 */

/** Android 1차 모집이 마감되면 true. 히어로 뱃지·보조 링크·신청 폼 문구가
 *  대기 명단 버전으로 바뀐다. iPhone 동선은 이 값의 영향을 받지 않는다. */
export const ANDROID_BETA_CLOSED = false;

/** Android 1차 모집 마감 시각(KST). 신청 폼 아래 D-day 문구 계산에 쓴다 */
export const BETA_DEADLINE = "2026-08-16T23:59:59+09:00";

/** Android 선착순 모집 인원 */
export const BETA_SEATS = 80;

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

/** 집중 리포트 미리보기 — 정식 출시 후 제공 */
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

/** 지금 참여하면 받는 혜택 3단계 */
export const BENEFITS: {
  step: string;
  eyebrow: string;
  title: string;
  desc: string;
  last?: boolean;
}[] = [
  {
    step: "1",
    eyebrow: "오늘 시작하면",
    title: "바로 무료로 사용",
    desc: `iPhone은 App Store에서 바로 · Android는 선착순 ${BETA_SEATS}명 모집 중`,
  },
  {
    step: "2",
    eyebrow: "지금 쌓은 기록은",
    title: "그대로 이어져요",
    desc: "순공시간과 스트릭이 이후 버전에서도 유지돼요",
  },
  {
    step: "3",
    eyebrow: "프리미엄 출시 후 · 대상자 전원",
    title: "프리미엄 1년 무료",
    desc: "8.7 – 8.16 서비스 이용자 또는 Android 테스트 참여자 · 약 15만원 상당 · 소셜 스터디와 집중 리포트 포함",
    last: true,
  },
];

/** 참여 방법 — 기기별 3단계 */
export const HOW_STEPS: Record<Platform, { title: string; desc: string }[]> = {
  ios: [
    {
      title: "App Store에서 포메를 설치해요",
      desc: "정식 출시돼 바로 내려받을 수 있어요",
    },
    {
      title: "앱을 열고 카메라 권한을 허용해요",
      desc: "영상은 저장되지 않고 기기 안에서만 분석돼요",
    },
    {
      title: "타이머를 켜면 순공시간이 쌓여요",
      desc: "회원가입 없이 바로 시작할 수 있어요",
    },
  ],
  android: [
    {
      title: "아래 폼에서 Google 계정 이메일로 신청해요",
      desc: "Play 스토어에 로그인된 계정이어야 해요",
    },
    {
      title: "테스터 등록 완료 메일을 받아요",
      desc: "등록까지 최대 12시간 걸릴 수 있어요",
    },
    {
      title: "메일 속 링크로 Google Play에서 설치해요",
      desc: "신청한 계정으로 로그인된 기기에서만 보여요",
    },
  ],
};

/** 메인 랜딩 FAQ.
 *  요금과 참여 방법은 iPhone / Android 가 서로 달라 기기별로 나눠 답한다.
 *  iPhone 설치 방법은 히어로 CTA 와 참여 방법 섹션에서 이미 답이 끝난다 */
export const BETA_FAQS: { q: string; a: string }[] = [
  {
    q: "iPhone에서도 무료인가요?",
    a: "네, 무료로 내려받아 사용할 수 있습니다. 소셜 스터디와 집중 리포트 등 프리미엄 기능은 준비되는 대로 따로 안내드립니다.",
  },
  {
    q: "Android에서는 어떻게 참여하나요?",
    a: "Google Play 비공개 테스트로 진행됩니다. Play 스토어에 로그인된 Google 계정 이메일로 신청해주시면 최대 12시간 내 초대 링크를 전달드립니다.",
  },
  {
    q: "카메라 영상이 저장되나요?",
    a: "저장되지 않습니다. 영상은 기기 안에서 분석에만 쓰이며, 공부 시간 등 최소한의 정보만 텍스트로 남습니다.",
  },
  {
    q: "자리를 비우면 어떻게 되나요?",
    a: "자리 이탈이 감지되면 측정이 잠시 멈춥니다. 돌아오면 별도 조작없이 자동으로 다시 측정됩니다.",
  },
  {
    q: "베타 체험이 끝나면 기록은 사라지나요?",
    a: "기록은 그대로 유지됩니다. 이후 버전에서도 이어서 사용할 수 있으며, 8월 7일 – 16일에 서비스를 이용하셨거나 Android 테스트에 참여하신 분께 프리미엄 1년 이용권을 드립니다.",
  },
  {
    q: "Android 선착순이 마감되면 체험이 어려운가요?",
    a: "대기 명단에 등록해 두시면 자리가 나는 대로 순서대로 안내해 드립니다. iPhone은 App Store에서 언제든 바로 설치할 수 있습니다.",
  },
];

/** 모집 상태에 따라 갈리는 문구 모음.
 *  iPhone 은 늘 App Store 로 가므로 주 CTA 문구는 여기서 갈리지 않는다 */
export function betaCopy(closed = ANDROID_BETA_CLOSED) {
  return {
    headerCta: "무료로 시작",
    heroCta: "App Store에서 무료로 받기",
    /** 히어로 주 CTA 아래 보조 링크 — Android 신청 폼으로 보낸다 */
    heroSubCta: closed
      ? "Android 대기 명단 등록하기 →"
      : "Android 베타 테스터로 참여하기 →",
    // 두 상태를 한 줄에 담아야 해서 길이가 빠듯하다. 320px 뷰포트에서 줄이
    // 접히지 않는 선이 "베타 대기 명단"까지다 — 더 늘리지 말 것
    badge: closed
      ? "iOS 정식 출시 · Android 베타 대기 명단"
      : "iOS 정식 출시 · Android 베타 모집 중",
    ctaSub: closed
      ? "iPhone은 App Store에서 바로, Android는 자리가 나면 안내해드려요."
      : "iPhone은 App Store에서 바로, Android는 베타 테스터로 참여할 수 있어요.",
    submitLabel: closed ? "대기 명단 등록" : "테스터 등록",
  };
}

/** 마감까지 남은 일수. 지났으면 0 */
export function daysLeft(deadline = BETA_DEADLINE) {
  const ms = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
