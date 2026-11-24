// 약관·방침 판 전환 시각 검사. `npm test`로 돈다.
import assert from "node:assert/strict";
import { test } from "node:test";
import { isRevisionInEffect } from "../lib/legal-revision.ts";
import { LEGAL_REVISION } from "../lib/site.ts";

test("설정한 시행 시각은 한국 시간 2026-12-24 00:00이다", () => {
  assert.equal(
    new Date(LEGAL_REVISION.effectiveAt).toISOString(),
    "2026-12-23T15:00:00.000Z",
  );
});

test("한국 시간 2026-12-23 23:59:59.999까지는 지금 판이다", () => {
  const justBefore = new Date("2026-12-23T14:59:59.999Z");
  assert.equal(isRevisionInEffect(justBefore, LEGAL_REVISION.effectiveAt), false);
});

test("한국 시간 2026-12-24 00:00부터 새 판이다", () => {
  const atSwitch = new Date("2026-12-23T15:00:00.000Z");
  assert.equal(isRevisionInEffect(atSwitch, LEGAL_REVISION.effectiveAt), true);
});

test("UTC 2026-12-24 00:00을 기다리지 않는다", () => {
  const kstMorning = new Date("2026-12-24T08:59:00+09:00");
  assert.equal(isRevisionInEffect(kstMorning, LEGAL_REVISION.effectiveAt), true);
});

test("공지 기간 중인 2026-11-24는 지금 판이다", () => {
  const noticeDay = new Date("2026-11-24T12:00:00+09:00");
  assert.equal(isRevisionInEffect(noticeDay, LEGAL_REVISION.effectiveAt), false);
});

test("시간대 없는 시각은 받지 않는다", () => {
  const now = new Date("2026-11-20T00:00:00Z");
  assert.throws(() => isRevisionInEffect(now, "2026-11-23T00:00:00"));
  assert.throws(() => isRevisionInEffect(now, "2026-11-23"));
});

test("공지일은 시행일보다 30일 이상 앞선다", () => {
  const noticeDay = new Date("2026-11-24T00:00:00+09:00");
  const days =
    (new Date(LEGAL_REVISION.effectiveAt).getTime() - noticeDay.getTime()) /
    (24 * 60 * 60 * 1000);
  assert.equal(LEGAL_REVISION.noticeDate, "2026년 11월 24일");
  assert.ok(days >= 30, `공지 기간이 ${days}일이다`);
});
