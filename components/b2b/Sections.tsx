import type { CSSProperties } from "react";
import type { HeroVisual, Noti, Section } from "@/lib/b2b";
import { LiveBoard } from "./LiveBoard";

/**
 * 기관용 랜딩의 섹션 그리기. 업종 데이터(lib/b2b.ts)의 flow 항목 하나가 섹션 하나다.
 * 화면 속 리포트·알림·표는 전부 예시 데이터라 "예시" 표시를 함께 둔다.
 */

const KEY_COLORS = ["var(--focus)", "var(--away)", "var(--phone)", "var(--line)"];
export const DEFAULT_KEYS = ["집중", "자리 비움", "폰 사용", "빈 좌석"];

function formatHours(hours: number) {
  const minutes = Math.round(hours * 60);
  return `${Math.floor(minutes / 60)}시간 ${String(minutes % 60).padStart(2, "0")}분`;
}

export function Legend({ keys, count }: { keys: string[]; count: number }) {
  return (
    <div className="legend">
      {keys.slice(0, count).map((key, i) => (
        <span key={key} style={{ "--c": KEY_COLORS[i] } as CSSProperties}>
          {key}
        </span>
      ))}
    </div>
  );
}

function Notis({ from, clock, list }: { from: string; clock: string; list: Noti[] }) {
  return (
    <div className="phone" aria-label="예시 알림">
      <div className="clock">{clock}</div>
      {list.map(([when, title, body]) => (
        <div className="noti" key={title}>
          <div className="who">
            <span>{from}</span>
            <span>{when}</span>
          </div>
          <b>{title}</b>
          <span>{body}</span>
        </div>
      ))}
    </div>
  );
}

function Kpis({ list }: { list: [string, string][] }) {
  return (
    <div className="kpis">
      {list.map(([value, label]) => (
        <div className="kpi" key={label}>
          <b>{value}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Head({ tag, h, lead }: { tag?: string; h: string; lead?: string }) {
  return (
    <>
      {tag && <span className="tag">{tag}</span>}
      <h2>{h}</h2>
      {lead && <p className="lead">{lead}</p>}
    </>
  );
}

function CheckList({ kind, title, items }: { kind: "yes" | "no"; title: string; items: string[] }) {
  return (
    <div className={`see ${kind}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function HeroVisualCard({ v }: { v: HeroVisual }) {
  if (v.type === "report") {
    return (
      <div className="card" aria-label="예시 리포트">
        <div className="card-top">
          <b>{v.title}</b>
          <span className="example">예시 데이터</span>
        </div>
        <div className="rows">
          {v.rows.map(([name, total, focus]) => (
            <div className="row" key={name}>
              <span className="nm">{name}</span>
              <div className="bar">
                <i style={{ width: `${(total / v.max) * 100}%` }} />
                <i style={{ width: `${(focus / v.max) * 100}%` }} />
              </div>
              <span className="num">{formatHours(focus)}</span>
            </div>
          ))}
        </div>
        <div className="legend">
          <span
            style={
              { "--c": "color-mix(in srgb, var(--accent) 28%, transparent)" } as CSSProperties
            }
          >
            {v.a}
          </span>
          <span>{v.b}</span>
        </div>
      </div>
    );
  }
  if (v.type === "phone") return <Notis from={v.from} clock={v.clock} list={v.notis} />;
  if (v.type === "cert") {
    const days = v.days.split("");
    const firstRemaining = days.length - v.remaining;
    return (
      <div className="cert" aria-label="예시 인증 카드">
        <div className="card-top">
          <b>{v.title}</b>
          <span className="example">예시</span>
        </div>
        <span className="example">
          {v.who} · 목표 {v.goal}
        </span>
        <div className="dots">
          {days.map((d, i) => (
            <i
              key={i}
              className={i >= firstRemaining ? undefined : d === "1" ? "on" : "miss"}
              title={`${i + 1}일차`}
            />
          ))}
        </div>
        <div className="card-top">
          <span className="stamp">자동 기록 · {v.done}</span>
          <span className="example">남은 {v.remaining}일</span>
        </div>
      </div>
    );
  }
  return (
    <div className="card" aria-label="예시 랭킹">
      <div className="card-top">
        <b>{v.title}</b>
        <span className="example">예시</span>
      </div>
      <div className="rank">
        {v.rows.map(([rank, name, hours, me]) => (
          <div key={rank} className={me ? "me" : undefined}>
            <b>{rank}</b>
            <span>{name}</span>
            <span className="num">{hours}</span>
          </div>
        ))}
      </div>
      <span className="example">{v.foot}</span>
    </div>
  );
}

export function SectionView({ x }: { x: Section }) {
  switch (x.t) {
    case "proof":
      return (
        <section className="sec">
          <Head tag="지금 벌어지는 일" h={x.h} />
          <div className="grid-3">
            {x.items.map(([figure, text, source]) => (
              <div className="pf" key={figure}>
                <b>{figure}</b>
                <p>{text}</p>
                <small>출처: {source}</small>
              </div>
            ))}
          </div>
        </section>
      );
    case "cmp":
      return (
        <section className="sec">
          <Head h={x.h} lead={x.lead} />
          <div className="grid-2">
            <CheckList kind="no" title={x.left[0]} items={x.left[1]} />
            <CheckList kind="yes" title={x.right[0]} items={x.right[1]} />
          </div>
        </section>
      );
    case "see":
      return (
        <section className="sec">
          <Head h={x.h} lead={x.lead} />
          <div className="grid-2">
            <CheckList kind="yes" title="보는 것" items={x.yes} />
            <CheckList kind="no" title="보지 않는 것" items={x.no} />
          </div>
        </section>
      );
    case "table":
      return (
        <section className="sec">
          <Head h={x.h} lead={x.lead} />
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  {x.head.map((h, i) => (
                    <th key={h} className={i > 0 && i < 5 ? "n" : undefined}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {x.rows.map((r) => (
                  <tr key={r[0]}>
                    <td>{r[0]}</td>
                    <td className="n">{r[1]}</td>
                    <td className="n">{r[2]}</td>
                    <td className="n">{r[3]}</td>
                    <td className="n">{r[4]}</td>
                    <td>
                      <span className={`pill ${r[5]}`}>
                        {r[5] === "ok" ? x.pill[0] : x.pill[1]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <span className="example">예시 데이터입니다</span>
        </section>
      );
    case "live":
      return (
        <section className="sec">
          <Head tag={x.tag} h={x.h} lead={x.lead} />
          <LiveBoard
            panel={x.panel}
            time={x.time}
            n={x.n}
            cols={x.cols}
            unit={x.unit}
            people={x.people}
            keys={x.keys ?? DEFAULT_KEYS}
            stats={x.stats}
            feed={x.feed}
          />
        </section>
      );
    case "day": {
      const keys = x.keys ?? DEFAULT_KEYS;
      return (
        <section className="sec">
          <Head tag={x.tag} h={x.h} />
          <div className="day">
            <div className="card">
              <div className="sum">
                {x.sum.map(([label, value], i) => (
                  <div key={label}>
                    <span>{label}</span>
                    <b style={i === 1 ? { color: "var(--accent)" } : undefined}>{value}</b>
                  </div>
                ))}
              </div>
              <div className="timeline" aria-label="예시 기록 타임라인">
                {x.pat.split("").map((c, i) => (
                  <i
                    key={i}
                    style={{
                      background:
                        c === "f" ? "var(--focus)" : c === "a" ? "var(--away)" : "var(--phone)",
                    }}
                  />
                ))}
              </div>
              <div className="tl-axis">
                {x.axis.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
              <Legend keys={keys} count={3} />
              <span className="example">예시 데이터입니다</span>
            </div>
            <Notis from={x.from} clock={x.clock} list={x.notis} />
          </div>
        </section>
      );
    }
    case "digest":
      return (
        <section className="sec">
          <Head tag={x.tag} h={x.h} />
          <div className="day">
            <div className="card">
              <Kpis list={x.kpis} />
              <span className="example">예시 데이터입니다</span>
            </div>
            <Notis from={x.from} clock={x.clock} list={x.notis} />
          </div>
        </section>
      );
    case "monthly":
      return (
        <section className="sec">
          <Head tag={x.tag} h={x.h} lead={x.lead} />
          <div className="card">
            <Kpis list={x.kpis} />
            <p className="quote">{x.comment}</p>
            <span className="example">예시 데이터입니다</span>
          </div>
        </section>
      );
    case "member":
      return (
        <section className="sec">
          <Head tag={x.tag} h={x.h} lead={x.lead} />
          <div style={{ maxWidth: 380 }}>
            <Notis from={x.from} clock={x.clock} list={x.notis} />
          </div>
        </section>
      );
    case "kpi":
      return (
        <section className="sec">
          <Head tag={x.tag} h={x.h} />
          <Kpis list={x.kpis} />
          <span className="example">예시 데이터입니다</span>
        </section>
      );
  }
}
