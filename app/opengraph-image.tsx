import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// 링크 공유 시 미리보기 이미지 (빌드 타임 정적 생성)
export const alt = "포메 | 순공 시간을 증명하는 공부 타이머";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const bold = await readFile(
    path.join(
      process.cwd(),
      "node_modules/pretendard/dist/public/static/Pretendard-Bold.otf",
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 96px",
          backgroundImage: "linear-gradient(135deg, #0b1120 0%, #14264d 100%)",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 44, color: "#7dd3fc" }}>
            포메
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 64,
              lineHeight: 1.25,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            <span>앉아 있던 시간 말고,</span>
            <span>공부한 시간.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 28,
              color: "#94a3b8",
            }}
          >
            AI가 잰 순공 시간만 기록하는 공부 타이머
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "48px 56px",
            borderRadius: 32,
            border: "1px solid rgba(125, 211, 252, 0.25)",
            backgroundColor: "rgba(125, 211, 252, 0.06)",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#64748b" }}>
            순공 시간
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 88,
              color: "#7dd3fc",
              letterSpacing: "-0.02em",
            }}
          >
            01:24:08
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Pretendard", data: bold, weight: 700 }],
    },
  );
}
