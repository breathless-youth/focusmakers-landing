import {
  CalendarBlankIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  GearSixIcon,
  HouseIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { IOSStatusBar, PhoneFrame, PhoneScaler } from "./PhoneFrame";

/**
 * 기능별 화면 2·4행 목업 — v2 시안의 402×874pt 화면을 그대로 옮긴 것.
 * 수치·문구는 시안에서 온 값이라 임의로 바꾸지 않는다.
 */

/** 2톤 불꽃 — 연속 학습 스트릭 카드용 */
function Flame() {
  return (
    <span
      className="relative block h-11 w-[38px] shrink-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        width="25.52"
        height="40.7"
        viewBox="0 0 25.52 40.7"
        className="absolute top-[1.65px] left-[6.24px]"
      >
        <path
          d="M 12.76 0 C 13.64 5.72 11.22 9.02 7.7 12.54 C 3.96 16.28 0 19.91 0 26.07 C 0 34.54 5.61 40.7 12.76 40.7 C 19.91 40.7 25.52 34.54 25.52 26.07 C 25.52 21.12 23.32 17.16 20.57 13.75 C 19.58 15.51 18.48 16.72 16.94 17.71 C 17.27 10.56 15.29 4.07 12.76 0 Z"
          fill="#FF9E1B"
        />
      </svg>
      <svg
        width="15.4"
        height="20.9"
        viewBox="0 0 15.4 20.9"
        className="absolute top-[21.45px] left-[11.3px]"
      >
        <path
          d="M 7.7 20.9 C 3.3 20.9 0 17.6 0 13.2 C 0 9.68 1.98 7.48 4.07 5.39 C 5.61 3.85 7.04 2.31 7.7 0 C 10.56 2.64 15.4 7.04 15.4 13.2 C 15.4 17.6 12.1 20.9 7.7 20.9 Z"
          fill="#FFD262"
        />
      </svg>
    </span>
  );
}

/** 공부 결과 — 타임라인과 비집중 내역 */
export function ResultPhone({ width = 262 }: { width?: number }) {
  const timeline: [number, boolean][] = [
    [20, true],
    [4, false],
    [18, true],
    [3, false],
    [14, true],
    [6, false],
    [12, true],
    [2, false],
    [16, true],
    [5, false],
  ];
  const events = [
    ["자리 이탈", "2회"],
    ["휴대폰 사용", "2회"],
    ["기기 조작", "1회"],
    ["화면 꺼짐", "1회"],
  ];

  return (
    <PhoneScaler width={width}>
      <PhoneFrame className="bg-white">
        <IOSStatusBar theme="light" />

        <div className="flex w-full items-center justify-between px-5 pt-2">
          <span className="w-9" />
          <span className="text-[17px] font-bold">공부 결과</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F4F6] text-[#6B7684]">
            <XIcon size={12} weight="bold" />
          </span>
        </div>

        <div className="flex w-full flex-col px-5 pt-2.5">
          <span className="mt-3.5 text-sm leading-[17px] font-medium text-[#6B7684]">
            순공시간
          </span>
          <div className="mt-0.5 flex items-baseline gap-2.5">
            <span className="text-[40px] leading-[48px] font-bold tracking-[-1px]">
              1시간 24분
            </span>
            <span className="rounded-full bg-[#E8F3FF] px-[9px] py-[3px] text-xs leading-[14px] font-semibold text-[#1B64DA]">
              80% 집중
            </span>
          </div>
          <span className="mt-1 text-[13px] leading-4 text-[#8B95A1]">
            총 공부 1시간 45분 · 21:03 – 22:48
          </span>

          <div className="mt-[22px] rounded-2xl bg-[#F9FAFB] p-4">
            <span className="text-[13px] leading-4 font-semibold">공부 타임라인</span>
            <div className="mt-3 flex h-3.5 overflow-hidden rounded-full">
              {timeline.map(([w, focus], i) => (
                <span
                  key={i}
                  style={{
                    width: `${w}%`,
                    background: focus ? "#1B64DA" : "#FF8A00",
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] leading-[13px] text-[#8B95A1] tabular-nums">
              <span>21:03</span>
              <span>22:48</span>
            </div>
            <div className="mt-2.5 flex gap-3.5 text-xs leading-[14px] text-[#6B7684]">
              <span className="flex items-center gap-[5px]">
                <i className="h-1.5 w-1.5 rounded-full bg-[#1B64DA]" />
                집중
              </span>
              <span className="flex items-center gap-[5px]">
                <i className="h-1.5 w-1.5 rounded-full bg-[#FF8A00]" />
                비집중
              </span>
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-[#F9FAFB] px-4 py-1">
            <div className="pt-[13px] pb-[9px] text-[13px] leading-4 font-semibold">
              비집중 21분
            </div>
            {events.map(([label, count]) => (
              <div
                key={label}
                className="flex items-center justify-between border-t border-[#EFF1F3] py-[11px]"
              >
                <span className="flex items-center gap-2 text-sm leading-[17px]">
                  <i className="h-[7px] w-[7px] rounded-full bg-[#FF8A00]" />
                  {label}
                </span>
                <span className="flex items-center gap-[5px] text-[13px] leading-4 text-[#6B7684]">
                  {count}
                  <CaretDownIcon size={9} className="text-[#8B95A1]" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1" />
        <div className="w-full px-5 pb-11">
          <div className="flex h-14 items-center justify-center rounded-2xl bg-[#1B64DA] text-[17px] font-bold text-white">
            확인
          </div>
        </div>
      </PhoneFrame>
    </PhoneScaler>
  );
}

/** 기록 — 스트릭 · 캘린더 · 학습 요약 · 공부 기록 */
export function RecordsPhone({ width = 262 }: { width?: number }) {
  const week = ["일", "월", "화", "수", "목", "금"];
  const summary = [
    ["순공시간", "4시간 18분", true],
    ["총 공부 시간", "5시간 40분", false],
    ["집중률", "76%", false],
    ["공부 횟수", "3회", false],
  ] as const;
  const sessions = [
    {
      net: "1시간 38분",
      when: "08:55 – 11:02 · 총 2시간 7분",
      rate: "77%",
      tags: ["자리 이탈 2회", "휴대폰 1회"],
    },
    {
      net: "1시간 12분",
      when: "13:10 – 14:40 · 총 1시간 30분",
      rate: "80%",
      tags: ["자리 이탈 1회"],
    },
  ];

  // 2026년 7월은 수요일 시작 — 앞 3칸을 비우고 5주치만 그린다
  const cells = [
    ...Array.from({ length: 3 }, () => null),
    ...Array.from({ length: 31 }, (_, i) => i + 1),
  ].slice(0, 35);

  return (
    <PhoneScaler width={width}>
      {/* 시안 그대로 874pt 화면 — 내용이 넘치면 잘리고, 탭 바가 하얀 페이드와 함께
          그 위를 덮어 스크롤 중인 화면처럼 보인다 */}
      <PhoneFrame className="bg-white">
        <IOSStatusBar theme="light" />

        <div className="w-full px-5 pt-3.5">
          <span className="text-[26px] leading-[34px] font-bold">기록</span>
        </div>

        <div className="flex w-full flex-col gap-3 px-5 pt-3.5">
          {/* 연속 학습 스트릭 */}
          <div className="flex flex-col gap-4 rounded-[20px] bg-[#F9FAFB] p-[18px] shadow-[inset_0_0_0_1px_#E5E8EB]">
            <div className="flex items-center gap-3">
              <Flame />
              <div className="flex flex-col gap-0.5">
                <span className="text-[17px] leading-5 font-bold">12일 연속 공부 중</span>
                <span className="text-[12.5px] leading-[15px] text-[#6B7684]">
                  내일도 10분만 하면 이어져요
                </span>
              </div>
            </div>
            <div className="flex justify-between px-1">
              {week.map((d) => (
                <div key={d} className="flex flex-col items-center gap-[5px]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B64DA] text-white">
                    <CheckIcon size={13} weight="bold" />
                  </span>
                  <span className="text-[11px] leading-[13px] text-[#8B95A1]">{d}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-[5px]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B64DA] shadow-[0_0_0_2px_#F9FAFB,0_0_0_3.5px_#1B64DA]">
                  <span className="text-[11px] font-bold text-white">25</span>
                </span>
                <span className="text-[11px] leading-[13px] font-semibold text-[#1B64DA]">
                  토
                </span>
              </div>
            </div>
          </div>

          {/* 캘린더 */}
          <div className="rounded-[20px] bg-[#F9FAFB] px-3 pt-3 pb-2 shadow-[inset_0_0_0_1px_#E5E8EB]">
            <div className="flex items-center justify-between px-1.5">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#F2F4F6] text-[#6B7684]">
                <CaretLeftIcon size={11} weight="bold" />
              </span>
              <span className="text-base leading-[19px] font-bold">2026년 7월</span>
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#F2F4F6] text-[#D1D6DB]">
                <CaretRightIcon size={11} weight="bold" />
              </span>
            </div>
            <div className="mt-2 flex">
              {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                <span
                  key={d}
                  className="w-[14.28%] text-center text-xs leading-[14px] text-[#8B95A1]"
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="mt-0.5 flex flex-wrap">
              {cells.map((d, i) => {
                const studied = d !== null && d >= 14 && d < 24;
                let tone = "text-[#6B7684]";
                if (d === 25) tone = "bg-[#1B64DA] text-white font-bold";
                else if (d === 24)
                  tone = "bg-[#E8F3FF] text-[#1B64DA] font-bold";
                else if (d !== null && d > 25) tone = "text-[#D1D6DB]";
                return (
                  <div
                    key={i}
                    className="flex h-[33px] w-[14.28%] flex-col items-center justify-center gap-0.5"
                  >
                    <span
                      className={`flex h-[22px] w-[22px] items-center justify-center rounded-full text-xs tabular-nums ${tone}`}
                    >
                      {d ?? ""}
                    </span>
                    <span
                      className={`h-1 w-1 rounded-full ${
                        studied ? "bg-[#1B64DA]" : "bg-transparent"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 학습 요약 */}
          <span className="mt-1 px-0.5 text-base leading-[19px] font-bold">
            7월 24일 학습 요약
          </span>
          <div className="grid grid-cols-2 gap-2">
            {summary.map(([label, value, accent]) => (
              <div
                key={label}
                className="flex flex-col gap-0.5 rounded-[14px] bg-[#F9FAFB] px-3.5 py-[13px] shadow-[inset_0_0_0_1px_#E5E8EB]"
              >
                <span className="text-xs leading-[14px] text-[#8B95A1]">{label}</span>
                <span
                  className={`text-lg leading-[22px] font-bold ${accent ? "text-[#1B64DA]" : ""}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* 공부 기록 */}
          <div className="mt-1.5 flex items-center justify-between px-0.5">
            <span className="text-base leading-[19px] font-bold">공부 기록</span>
            <span className="flex items-center gap-1 text-[12.5px] leading-[15px] font-medium text-[#6B7684]">
              최신순
              <CaretDownIcon size={9} />
            </span>
          </div>
          <div className="rounded-2xl bg-[#F9FAFB] px-4 py-0.5 shadow-[inset_0_0_0_1px_#E5E8EB]">
            {sessions.map((s, i) => (
              <div
                key={s.net}
                className={`py-3.5 ${i === 0 ? "border-b border-[#EFF1F3]" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[17px] leading-5 font-bold">{s.net}</span>
                    <span className="text-[12.5px] leading-[15px] text-[#8B95A1] tabular-nums">
                      {s.when}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end gap-px">
                      <span className="text-[11px] leading-[13px] font-medium text-[#8B95A1]">
                        집중률
                      </span>
                      <span className="text-xl leading-6 font-bold text-[#1B64DA]">
                        {s.rate}
                      </span>
                    </div>
                    <CaretRightIcon size={11} className="text-[#8B95A1]" />
                  </div>
                </div>
                <div className="mt-[9px] flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 rounded-full bg-[#FFF4E5] px-[9px] py-[3px] text-[11.5px] leading-[14px] font-medium text-[#B36100]"
                    >
                      <i className="h-[5px] w-[5px] rounded-full bg-[#FF8A00]" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 탭 바 */}
        <div className="absolute right-0 bottom-0 left-0 shadow-[0_-8px_16px_rgba(255,255,255,.9)]">
          <div className="flex h-[77px] w-full bg-white px-6 pt-2.5 pb-[26px]">
            {[
              { Icon: HouseIcon, label: "홈", active: false },
              { Icon: CalendarBlankIcon, label: "기록", active: true },
              { Icon: GearSixIcon, label: "설정", active: false },
            ].map(({ Icon, label, active }) => (
              <div key={label} className="flex flex-1 justify-center">
                <div
                  className={`flex flex-col items-center gap-[3px] py-0.5 ${
                    active ? "text-[#1B64DA]" : "text-[#8B95A1]"
                  }`}
                >
                  <Icon size={24} weight={active ? "fill" : "regular"} />
                  <span
                    className={`text-[11px] leading-[13px] ${
                      active ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </PhoneScaler>
  );
}
