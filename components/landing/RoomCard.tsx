"use client";

import { useState } from "react";
import { CHARACTERS, ROOM } from "@/lib/landing";
import { Fig } from "./Fig";
import { LiveClock, elapsedNow } from "./LiveClock";
import { Seat } from "./Seat";

/**
 * 공개 그룹 공부방 예시
 *
 * 꾸민 캐릭터들이 한 방에서 공부하고 있고, 입장하기를 누르면 빈자리에 방문자의 캐릭터가 앉는다.
 */
export function RoomCard() {
  // 입장한 시점. 방문자 자리의 시계가 이때부터 0에서 올라간다
  const [joinedAt, setJoinedAt] = useState<number | null>(null);
  const joined = joinedAt !== null;
  const count = ROOM.members.length + (joined ? 1 : 0);

  return (
    <div className="roomcard">
      <div className="roomcard__head">
        <b>{ROOM.name}</b>
        <span>
          멤버 {count}/{ROOM.capacity}
        </span>
      </div>
      <div className="roomcard__sub">
        <span>오늘 멤버</span>
        <span>{count}명 공부 중</span>
      </div>
      <div className="roomcard__grid">
        {ROOM.members.map((member, index) => (
          <Seat
            key={member.name}
            caption={
              <>
                <span className="seat__name">{member.name}</span>
                <LiveClock className="seat__time" base={member.seconds} />
              </>
            }
          >
            <Fig
              id={member.character}
              className="seat__who"
              phase={index * 0.7}
            />
          </Seat>
        ))}
        {joined ? (
          <Seat
            me
            caption={
              <>
                <span className="seat__name">나</span>
                <LiveClock className="seat__time" base={0} since={joinedAt} />
              </>
            }
          >
            <Fig id={ROOM.guest} className="seat__who" cheerAfter={60} />
          </Seat>
        ) : (
          <Seat
            empty
            caption={
              <>
                <span className="seat__name">빈자리</span>
                <span className="seat__time">여기 앉아요</span>
              </>
            }
          />
        )}
      </div>
      <button
        className="btn btn--primary"
        type="button"
        onClick={() => setJoinedAt(joined ? null : elapsedNow())}
      >
        {joined ? "처음으로" : "입장하기"}
      </button>
      <span className="sr-only" aria-live="polite">
        {joined ? `${CHARACTERS[ROOM.guest].name}가 빈자리에 앉았어요` : ""}
      </span>
    </div>
  );
}
