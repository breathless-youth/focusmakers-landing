/**
 * 조명 아래 자리
 *
 * 공부방, 꾸미기, 마지막 구간이 같은 자리 그림을 쓴다.
 * 앉은 캐릭터는 children으로, 이름표는 caption으로 받는다.
 */
export function Seat({
  empty = false,
  me = false,
  caption,
  onClick,
  children,
}: {
  /** 아무도 앉지 않은 자리. 조명이 꺼져 있고 점선 자리가 보인다 */
  empty?: boolean;
  /** 방문자가 앉은 자리 */
  me?: boolean;
  caption?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <figure
      className={`seat${empty ? " seat--empty" : ""}${me ? " seat--me" : ""}`}
      onClick={onClick}
    >
      <span className="seat__lamp" aria-hidden="true" />
      <div className="seat__stage">
        <span className="seat__cone" aria-hidden="true" />
        {empty ? <span className="seat__ghost" aria-hidden="true" /> : children}
      </div>
      {caption && <figcaption className="seat__cap">{caption}</figcaption>}
    </figure>
  );
}
