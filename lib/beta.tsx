/**
 * 베타 모집(랜딩 v2) 전용 설정과 문구.
 * lib/content.ts 는 intro/* 시안 10종이 공유하므로 건드리지 않고, 메인 랜딩이
 * 쓰는 모집 관련 값만 여기 모아 둔다.
 */

/** 1차 모집이 마감되면 true. 헤더·히어로·CTA 문구가 대기 명단 버전으로 바뀌고,
 *  iPhone도 TestFlight 직행 대신 이메일 폼을 쓴다. */
export const BETA_CLOSED = false;

/** 이메일 신청 없이 바로 설치되는 TestFlight 초대 링크 */
export const TESTFLIGHT_URL = "https://testflight.apple.com/join/kVUwhS61";

/** 1차 모집 마감 시각(KST). 신청 폼 아래 D-day 문구 계산에 쓴다 */
export const BETA_DEADLINE = "2026-08-16T23:59:59+09:00";

/** 선착순 모집 인원 */
export const BETA_SEATS = 80;

export type Platform = "ios" | "android";

/** 히어로 하단 지표 3종 */
export const HERO_STATS: { label: string; value: string; accent?: boolean }[] = [
  { label: "총 공부시간", value: "6h 24m" },
  { label: "집중시간", value: "4h 52m", accent: true },
  { label: "집중률", value: "76%" },
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

/** 베타 참여자 혜택 3단계 */
export const BENEFITS: {
  step: string;
  eyebrow: string;
  title: string;
  desc: string;
  last?: boolean;
}[] = [
  {
    step: "1",
    eyebrow: "오늘 신청하면",
    title: "바로 무료 체험 시작",
    desc: `8.16까지 모든 기능이 무료예요 · 선착순 ${BETA_SEATS}명`,
  },
  {
    step: "2",
    eyebrow: "베타가 끝나도",
    title: "기록은 그대로 유지",
    desc: "쌓은 순공시간과 스트릭이 정식 버전으로 이어져요",
  },
  {
    step: "3",
    eyebrow: "정식 출시 후 · 참여자 전원",
    title: "프리미엄 1년 무료",
    desc: "약 15만원 상당 · 소셜 스터디 무제한 참여와 집중 리포트 포함",
    last: true,
  },
];

/** 참여 방법 — 기기별 3단계 */
export const HOW_STEPS: Record<Platform, { title: string; desc: string }[]> = {
  ios: [
    { title: "App Store에서 TestFlight 앱을 설치해요", desc: "무료 앱이에요" },
    {
      title: "아래 버튼으로 TestFlight 초대를 열어요",
      desc: "이메일 신청 없이 링크로 바로 참여돼요",
    },
    {
      title: "TestFlight에서 FocusMakers를 설치하고 시작해요",
      desc: "별도 승인 대기 없이 바로 설치돼요",
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

/** 메인 랜딩 FAQ — 베타 모집 기준으로 다시 쓴 6문항 */
export const BETA_FAQS: { q: string; a: string }[] = [
  {
    q: "정말 무료인가요?",
    a: "베타 기간(8월 7일 – 16일) 동안 모든 기능이 무료로 체험 가능합니다.",
  },
  {
    q: "카메라 영상이 저장되나요?",
    a: "저장되지 않습니다. 영상은 기기 안에서 분석에만 쓰이며, 공부 시간 등 최소한의 정보만 텍스트로 남습니다.",
  },
  {
    q: "어떤 기기에서 쓸 수 있나요?",
    a: "iPhone은 TestFlight 링크로 이메일 신청 없이 바로 설치할 수 있습니다. Android는 Google Play 비공개 테스트로, 이메일 작성 후 신청해주시면 최대 12시간 내 초대 링크를 전달드립니다.",
  },
  {
    q: "자리를 비우면 어떻게 되나요?",
    a: "자리 이탈이 감지되면 측정이 잠시 멈춥니다. 돌아오면 별도 조작없이 자동으로 다시 측정됩니다.",
  },
  {
    q: "베타 체험이 끝나면 기록은 사라지나요?",
    a: "기록은 그대로 유지됩니다. 정식 출시 후에도 이어서 사용할 수 있으며, 베타 참여자 전원에게 출시 후 사용 가능한 프리미엄 1년 이용권을 드립니다.",
  },
  {
    q: "선착순이 마감되면 체험이 어려운가요?",
    a: "대기 명단에 등록해 두시면 자리가 나는 대로 순서대로 안내해 드립니다.",
  },
];

/** 모집 상태에 따라 갈리는 문구 모음 */
export function betaCopy(closed = BETA_CLOSED) {
  return {
    headerCta: closed ? "대기 명단 등록" : "무료 체험 하기",
    heroCta: closed ? "대기 명단 등록하기" : "무료로 베타 체험하기 →",
    badge: closed
      ? "베타 1차 모집 마감 · 대기 명단 운영 중"
      : `베타 서비스 무료 체험 · 8.7 – 8.16 · 선착순 ${BETA_SEATS}명`,
    ctaSub: closed
      ? "자리가 나면 등록 순서대로 안내해드려요"
      : "기종에 맞는 방법으로 테스트할 수 있어요.",
    submitLabel: closed ? "대기 명단 등록" : "테스터 등록",
  };
}

/** 마감까지 남은 일수. 지났으면 0 */
export function daysLeft(deadline = BETA_DEADLINE) {
  const ms = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
