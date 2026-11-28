/**
 * 메인 랜딩의 내용
 *
 * 구간 문구는 app/page.tsx에 있고, 여러 컴포넌트가 함께 읽는 값만 여기에 둔다.
 */

export type CharacterId =
  | "timi"
  | "boogi"
  | "planny"
  | "mongdang"
  | "lampy"
  | "locky"
  | "camcomy";

export type Look = "plain" | "dressed";
export type Face = "idle" | "blink" | "joy";

/** 꾸민 캐릭터 둘레에서 따로 움직이는 효과 조각. 좌표는 그림 한 변에 대한 비율이다 */
export type EffectPiece = {
  x: number;
  y: number;
  w: number;
  h: number;
  motion: "pop" | "flutter" | "float" | "twinkle" | "bob";
};

export type Character = {
  name: string;
  /** 꾸미지 않은 모습의 대체 텍스트 */
  plainAlt: string;
  /** 꾸민 모습의 대체 텍스트 */
  dressedAlt: string;
  effects: EffectPiece[];
};

export const CHARACTERS: Record<CharacterId, Character> = {
  timi: {
    name: "타이미",
    plainAlt: "스톱워치 캐릭터 타이미",
    dressedAlt: "슈퍼히어로 옷을 입은 스톱워치 캐릭터 타이미",
    effects: [
      { x: 0.1797, y: 0.1875, w: 0.0918, h: 0.1279, motion: "pop" },
      { x: 0.7559, y: 0.2266, w: 0.0908, h: 0.1289, motion: "pop" },
      { x: 0.1855, y: 0.75, w: 0.0859, h: 0.1172, motion: "pop" },
    ],
  },
  boogi: {
    name: "부기",
    plainAlt: "책 캐릭터 부기",
    dressedAlt: "학사모를 쓴 책 캐릭터 부기",
    effects: [
      { x: 0.2299, y: 0.1653, w: 0.0986, h: 0.0944, motion: "flutter" },
      { x: 0.6792, y: 0.1729, w: 0.1007, h: 0.0931, motion: "flutter" },
      { x: 0.1472, y: 0.4104, w: 0.0799, h: 0.0812, motion: "flutter" },
      { x: 0.7764, y: 0.5083, w: 0.0806, h: 0.0757, motion: "flutter" },
    ],
  },
  planny: {
    name: "플래니",
    plainAlt: "플래너 캐릭터 플래니",
    dressedAlt: "고양이 옷을 입은 플래너 캐릭터 플래니",
    effects: [
      { x: 0.1162, y: 0.1602, w: 0.1123, h: 0.1074, motion: "float" },
      { x: 0.7861, y: 0.2324, w: 0.1133, h: 0.1084, motion: "float" },
      { x: 0.7803, y: 0.7559, w: 0.1143, h: 0.1084, motion: "float" },
    ],
  },
  mongdang: {
    name: "몽당이",
    plainAlt: "연필 캐릭터 몽당이",
    dressedAlt: "꿀벌 옷을 입은 연필 캐릭터 몽당이",
    effects: [
      { x: 0.1172, y: 0.2051, w: 0.1045, h: 0.0977, motion: "float" },
      { x: 0.7891, y: 0.2998, w: 0.1191, h: 0.1113, motion: "float" },
      { x: 0.1377, y: 0.6787, w: 0.1035, h: 0.0811, motion: "float" },
    ],
  },
  lampy: {
    name: "램피",
    plainAlt: "램프 캐릭터 램피",
    dressedAlt: "잠옷 모자와 안경을 쓴 램프 캐릭터 램피",
    effects: [
      { x: 0.6167, y: 0.1646, w: 0.0771, h: 0.0729, motion: "twinkle" },
      { x: 0.2382, y: 0.1972, w: 0.0819, h: 0.0951, motion: "bob" },
      { x: 0.7646, y: 0.3431, w: 0.0562, h: 0.0549, motion: "twinkle" },
      { x: 0.1889, y: 0.5771, w: 0.0451, h: 0.0424, motion: "twinkle" },
    ],
  },
  locky: {
    name: "락키",
    plainAlt: "자물쇠 캐릭터 락키",
    dressedAlt: "왕관과 망토를 두른 자물쇠 캐릭터 락키",
    effects: [
      { x: 0.7227, y: 0.2451, w: 0.0576, h: 0.0605, motion: "twinkle" },
      { x: 0.1787, y: 0.2842, w: 0.0889, h: 0.0986, motion: "twinkle" },
      { x: 0.7988, y: 0.3711, w: 0.0537, h: 0.0566, motion: "twinkle" },
      { x: 0.166, y: 0.4492, w: 0.0498, h: 0.0527, motion: "twinkle" },
    ],
  },
  camcomy: {
    name: "캠코미",
    plainAlt: "캠코더 캐릭터 캠코미",
    dressedAlt: "베레모를 쓰고 마이크를 든 캠코더 캐릭터 캠코미",
    effects: [],
  },
};

/** 꾸미기 구간에서 고르는 순서 */
export const CHARACTER_ORDER: CharacterId[] = [
  "timi",
  "boogi",
  "planny",
  "mongdang",
  "lampy",
  "locky",
  "camcomy",
];

export const characterImage = (id: CharacterId, look: Look, face: Face) =>
  `/landing/c/${id}-${look}-${face}.webp`;

export const effectImage = (id: CharacterId) => `/landing/c/${id}-fx.webp`;

/** 스토어 별점. 스토어 화면에서 직접 확인한 값만 적는다(2026-11-28 확인) */
export const RATINGS = { appStore: "5.0", googlePlay: "4.8" } as const;

/** 스토어에 올라온 리뷰 원문. 맞춤법과 띄어쓰기도 고치지 않는다 */
export const REVIEW_ROWS: string[][] = [
  [
    "사용하기도 쉽고 순공 잘잡아줘서 친구들이랑 잘 쓰고 있어요!!",
    "처음으로 앱 리뷰 써봅니다. 시험 앞두고 집중이 너무 안되서 답답했는데 친구 추천으로 같이 썼다가 공부 중독돼버렸습니다.. 고3때 휴대폰 때문에 하루 순공시간 2시간도 못하던 의지박약인데 덕분에 공부 습관 만들어 친구와 함께 휴대폰 없이 공부 잘 하고 있어요 너무 감사합니다!!",
    "공부 집중 잘못했었는데 이 어플 쓰고나서 공부 집중 진짜 잘되요 너무 좋아요 잘쓰고있어요",
    "공부하기 좋아요! 포메 귀여워요 🙈",
  ],
  [
    "이거 쓰면서 순공 시간 많이 늘었습니다 진짜로...! 덕분에 자격증 시험도 합격했습니다! 감사합니다!! 대박나세요!",
    "작업에 집중 못하는 시간들이 많았는데, 타임랩스 키고 하니까 브이로거 된거같아서 나도 모르게 열심히 하게 돼요 ㅎㅎㅎ",
    "여러가지 공부 집중앱 사용해봤는데 돌고돌아 포메로 정착했습니다.. ㅜ 요즘 매일 친구랑 누가 더 오래 공부하나 경쟁하고 있습니다 ㅎㅎ",
  ],
];

/** 공부방 예시에 앉아 있는 멤버. seconds는 화면을 열었을 때의 오늘 공부 시간이다 */
export const ROOM = {
  name: "공무원 시험",
  capacity: 6,
  members: [
    { name: "새벽공시생", character: "lampy", seconds: 22022 },
    { name: "9급 행정 합격각", character: "timi", seconds: 18842 },
    { name: "국어 만점 가자", character: "locky", seconds: 16382 },
    { name: "행정학 마스터", character: "planny", seconds: 13742 },
    { name: "올해 꼭 붙자", character: "camcomy", seconds: 10802 },
  ],
  /** 입장하기를 누르면 빈자리에 앉는 캐릭터 */
  guest: "boogi",
} as const satisfies {
  name: string;
  capacity: number;
  members: { name: string; character: CharacterId; seconds: number }[];
  guest: CharacterId;
};

/** 들어 볼 수 있는 배경음. 앱에 실린 16가지 가운데 여섯 가지다 */
export const SOUNDS = [
  { id: "rain", label: "빗소리" },
  { id: "waves", label: "잔잔한 파도" },
  { id: "birds", label: "새소리" },
  { id: "bonfire", label: "모닥불" },
  { id: "cafe", label: "카페" },
  { id: "lofi", label: "로파이" },
] as const;

export type SoundId = (typeof SOUNDS)[number]["id"];

/* ── 타임테이블 예시 ─────────────────────────────────────────── */

const SUBJECTS = [
  { name: "국어", color: "#e5484d", total: "2시간 12분" },
  { name: "영어", color: "#f5a623", total: "2시간 20분" },
  { name: "한국사", color: "#46a758", total: "1시간 20분" },
  { name: "행정학", color: "#8e4ec6", total: "2시간 12분" },
  { name: "행정법", color: "#d6409f", total: "2시간 4분" },
] as const;

type SubjectName = (typeof SUBJECTS)[number]["name"];

const BLOCKS: [SubjectName, string, string][] = [
  ["국어", "07:10", "08:40"],
  ["영어", "08:55", "10:25"],
  ["한국사", "10:40", "12:10"],
  ["행정학", "13:20", "15:00"],
  ["행정법", "15:15", "16:45"],
  ["국어", "17:00", "18:00"],
  ["행정학", "19:30", "20:20"],
  ["행정법", "20:20", "21:10"],
  ["영어", "21:25", "22:35"],
];

const toMinutes = (text: string) => {
  const [hour, minute] = text.split(":").map(Number);
  return hour * 60 + minute;
};

/** 과목 색을 흰색과 섞어 칸에 칠할 옅은 색을 만든다 */
const soften = (hex: string, ratio = 0.34) => {
  const channel = (at: number) => {
    const value = parseInt(hex.slice(at, at + 2), 16);
    return Math.round(value * ratio + 255 * (1 - ratio));
  };
  return `rgb(${channel(1)}, ${channel(3)}, ${channel(5)})`;
};

export type TimetableCell = { color: string; order: number } | null;

/** 아침 7시부터 밤 10시대까지, 10분 한 칸씩 여섯 칸을 한 줄로 채운다 */
function buildTimetable() {
  const rows: { hour: string; cells: TimetableCell[] }[] = [];
  let order = 0;
  for (let hour = 7; hour < 23; hour++) {
    const cells: TimetableCell[] = [];
    for (let slot = 0; slot < 6; slot++) {
      const start = hour * 60 + slot * 10;
      // 10분 칸의 절반 이상을 공부했을 때만 칠한다
      const block = BLOCKS.find(
        ([, from, to]) =>
          Math.min(toMinutes(to), start + 10) -
            Math.max(toMinutes(from), start) >=
          5,
      );
      if (block) {
        const subject = SUBJECTS.find((s) => s.name === block[0])!;
        cells.push({ color: soften(subject.color), order: order++ });
      } else {
        cells.push(null);
      }
    }
    rows.push({ hour: String(hour).padStart(2, "0"), cells });
  }
  return rows;
}

export const TIMETABLE = {
  rows: buildTimetable(),
  legend: SUBJECTS,
  /** 순공시간 합계(분). 과목별 합계를 더한 값과 같아야 한다 */
  totalMinutes: 608,
} as const;
