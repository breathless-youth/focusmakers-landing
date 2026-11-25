"use client";

import { useState, type FormEvent } from "react";
import { trackB2bApply } from "@/lib/analytics";

/**
 * 20분 미팅 신청 폼. /api/b2b/apply 로 보낸다.
 * 메일 링크에 붙인 utm_* 값을 함께 보내 어느 업종·어느 메일에서 온 신청인지 남긴다.
 */

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "err"; message: string };

export function PilotForm({
  segment,
  orgLabel,
  orgPlaceholder,
  sizeLabel,
  sizePlaceholder,
  consentText,
}: {
  segment: string;
  orgLabel: string;
  orgPlaceholder: string;
  sizeLabel: string;
  sizePlaceholder: string;
  consentText: string;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = new URLSearchParams(window.location.search);
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/b2b/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          segment,
          organization: form.get("organization"),
          headcount: form.get("headcount"),
          contact: form.get("contact"),
          consent: form.get("consent") === "on",
          utmSource: query.get("utm_source"),
          utmMedium: query.get("utm_medium"),
          utmCampaign: query.get("utm_campaign"),
          utmContent: query.get("utm_content"),
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;
      if (!response.ok || !result?.ok) {
        setStatus({
          kind: "err",
          message: result?.message ?? "신청을 보내지 못했어요. 잠시 후 다시 시도해 주세요.",
        });
        return;
      }
      trackB2bApply(segment);
      setStatus({ kind: "ok" });
    } catch {
      setStatus({ kind: "err", message: "신청을 보내지 못했어요. 연결을 확인해 주세요." });
    }
  }

  if (status.kind === "ok") {
    return (
      <p className="form-msg ok" role="status">
        미팅 신청이 접수됐어요. 영업일 기준 이틀 안에 남겨 주신 연락처로 일정을 여쭙겠습니다.
      </p>
    );
  }

  return (
    <form className="apply-form" onSubmit={onSubmit}>
      <div className="form">
        <label>
          {orgLabel}
          <input name="organization" placeholder={orgPlaceholder} required maxLength={100} />
        </label>
        <label>
          {sizeLabel}
          <input
            name="headcount"
            inputMode="numeric"
            placeholder={sizePlaceholder}
            maxLength={20}
          />
        </label>
        <label>
          연락처 (이메일 또는 전화)
          <input name="contact" placeholder="담당자 연락처" required maxLength={100} />
        </label>
        <button className="btn btn-primary" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "보내는 중" : "20분 미팅 신청"}
        </button>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>{consentText} 동의합니다.</span>
      </label>
      {status.kind === "err" && (
        <p className="form-msg err" role="alert">
          {status.message}
        </p>
      )}
    </form>
  );
}
