/**
 * 랜딩 v2 기기 목업의 공통 껍데기.
 * 화면은 실제 402×874pt로 그린 뒤 PhoneScaler가 컨테이너 폭에 맞춰 줄인다 —
 * 덕분에 안쪽 수치를 앱 디자인에서 그대로 옮겨 쓸 수 있다.
 */

export function PhoneFrame({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // 화면 402 + 좌우 베젤 10×2 = 422. border-box라 프레임 폭에 패딩을 포함해야
    // 화면이 베젤 밖으로 삐져나가지 않는다 (시안 dc 런타임은 content-box였다)
    <div className="w-[422px] rounded-[64px] bg-[linear-gradient(150deg,#303742_0%,#101419_45%)] p-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,.16),inset_0_-1px_1px_rgba(0,0,0,.5)]">
      <div
        className={`relative flex h-[874px] w-[402px] flex-col items-center overflow-hidden rounded-[54px] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

/** 프레임 포함 402×894를 지정한 폭으로 줄여 담는 상자 */
export function PhoneScaler({
  width,
  className = "",
  children,
}: {
  width: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden drop-shadow-[0_20px_36px_rgba(25,31,40,.22)] drop-shadow-[0_4px_10px_rgba(25,31,40,.12)] ${className}`}
      style={{ width, height: Math.round((width * 894) / 422) }}
    >
      <div
        className="origin-top-left"
        style={{ transform: `scale(${width / 422})` }}
      >
        {children}
      </div>
    </div>
  );
}

export function IOSStatusBar({ theme = "light" }: { theme?: "light" | "dark" }) {
  const c = theme === "dark" ? "#FFFFFF" : "#191F28";
  return (
    <div className="relative h-[59px] w-full shrink-0" aria-hidden="true">
      <span
        className="absolute top-5 left-[42px] text-[17px] leading-[22px] font-semibold"
        style={{ color: c }}
      >
        9:41
      </span>
      <div className="absolute top-[11px] left-1/2 h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-black" />
      <svg
        width="78"
        height="14"
        viewBox="0 0 78 14"
        fill={c}
        className="absolute top-[23px] right-8"
      >
        <rect x="0" y="8" width="3.5" height="5" rx="1" />
        <rect x="5" y="6" width="3.5" height="7" rx="1" />
        <rect x="10" y="3.5" width="3.5" height="9.5" rx="1" />
        <rect x="15.5" y="1" width="3.5" height="12" rx="1" />
        <path d="M33.5 4.5a9.5 9.5 0 0 1 6.9 2.9l-1.5 1.5a7.4 7.4 0 0 0-10.8 0l-1.5-1.5a9.5 9.5 0 0 1 6.9-2.9z" />
        <path d="M33.5 8.7c1.3 0 2.5.5 3.4 1.4l-3.4 3.4-3.4-3.4a4.8 4.8 0 0 1 3.4-1.4z" />
        <rect
          x="51"
          y="1"
          width="23"
          height="12"
          rx="3.5"
          fill="none"
          stroke={c}
          strokeOpacity=".35"
        />
        <rect x="53" y="3" width="15" height="8" rx="1.5" />
        <path d="M75.5 5v4a2.2 2.2 0 0 0 0-4z" fillOpacity=".4" />
      </svg>
    </div>
  );
}
