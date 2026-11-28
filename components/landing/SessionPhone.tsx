import { LiveClock } from "./LiveClock";

/** 순공시간을 재고 있는 심플 모드 공부 화면을 담은 폰 */
export function SessionPhone({ className = "" }: { className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone__screen">
        <div
          className="sess"
          role="img"
          aria-label="순공시간을 재고 있는 심플 모드 공부 화면"
        >
          <span className="sess__pill">순공시간 측정 중</span>
          <div className="sess__mid">
            <span className="sess__sub">
              <i />
              행정법 <LiveClock base={4200} pad />
            </span>
            <LiveClock className="sess__time" base={5048} pad />
          </div>
          <span className="sess__pause">
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  );
}
