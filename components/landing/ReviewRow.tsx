"use client";

import { StarIcon } from "@phosphor-icons/react";
import { useMotionOk } from "./motion";

/** 한 묶음이 끊기지 않고 흐르려면 같은 묶음이 화면 폭의 두 배를 넘게 이어져야 한다 */
const COPIES = 4;

const STARS = [0, 1, 2, 3, 4];

/**
 * 옆으로 흐르는 리뷰 한 줄
 *
 * 서버가 보낸 화면에는 리뷰가 한 번씩만 있고, 화면이 뜬 뒤에 같은 묶음을 이어 붙여 흐르게 한다.
 * 움직임 줄이기를 켠 기기에서는 이어 붙이지 않고 옆으로 밀어서 본다.
 */
export function ReviewRow({
  reviews,
  reverse = false,
}: {
  reviews: string[];
  reverse?: boolean;
}) {
  const flowing = useMotionOk();
  const copies = flowing ? COPIES : 1;

  return (
    <div
      className={`flow${reverse ? " flow--rev" : ""}${flowing ? " is-loop" : ""}`}
    >
      <div className="flow__track">
        {Array.from({ length: copies }, (_, copy) =>
          reviews.map((text, index) => (
            <article
              key={`${copy}-${index}`}
              className="review"
              aria-hidden={copy > 0 ? true : undefined}
            >
              <div className="review__stars" role="img" aria-label="별점 5점">
                {STARS.map((star) => (
                  <StarIcon key={star} weight="fill" aria-hidden="true" />
                ))}
              </div>
              <p>{text}</p>
            </article>
          )),
        )}
      </div>
    </div>
  );
}
