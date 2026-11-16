// 약관·방침 판 전환 시각 검사. `npm test`로 돈다.
import assert from "node:assert/strict";
import { test } from "node:test";
import { isRevisionInEffect } from "../lib/legal-revision.ts";
import { LEGAL_REVISION } from "../lib/site.ts";

test("설정한 시행 시각은 한국 시간 2026-11-23 00:00이다", () => {
  assert.equal(
    new Date(LEGAL_REVISION.effectiveAt).toISOString(),
    "2026-11-22T15:00:00.000Z",
  );
});

test("한국 시간 2026-11-22 23:59:59.999까지는 지금 판이다", () => {
  const justBefore = new Date("2026-11-22T14:59:59.999Z");
  assert.equal(isRevisionInEffect(justBefore, LEGAL_REVISION.effectiveAt), false);
});

test("한국 시간 2026-11-23 00:00부터 새 판이다", () => {
  const atSwitch = new Date("2026-11-22T15:00:00.000Z");
  assert.equal(isRevisionInEffect(atSwitch, LEGAL_REVISION.effectiveAt), true);
});

test("UTC 2026-11-23 00:00을 기다리지 않는다", () => {
  const kstMorning = new Date("2026-11-23T08:59:00+09:00");
  assert.equal(isRevisionInEffect(kstMorning, LEGAL_REVISION.effectiveAt), true);
});

test("공지 기간 중인 2026-11-16은 지금 판이다", () => {
  const noticeDay = new Date("2026-11-16T12:00:00+09:00");
  assert.equal(isRevisionInEffect(noticeDay, LEGAL_REVISION.effectiveAt), false);
});

test("시간대 없는 시각은 받지 않는다", () => {
  const now = new Date("2026-11-20T00:00:00Z");
  assert.throws(() => isRevisionInEffect(now, "2026-11-23T00:00:00"));
  assert.throws(() => isRevisionInEffect(now, "2026-11-23"));
});
