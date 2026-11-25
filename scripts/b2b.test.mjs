// 기관용 랜딩 내용 검사. `npm test`로 돈다.
import assert from "node:assert/strict";
import { test } from "node:test";
import { SEGMENTS } from "../lib/b2b.ts";

test("업종 id는 겹치지 않고 주소에 쓸 수 있는 글자만 쓴다", () => {
  const ids = SEGMENTS.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z]+$/);
});

test("모든 업종은 출처가 달린 근거 3개로 시작한다", () => {
  for (const s of SEGMENTS) {
    const first = s.flow[0];
    assert.equal(first.t, "proof", `${s.id}의 첫 섹션`);
    assert.equal(first.items.length, 3, `${s.id}의 근거 개수`);
    for (const [figure, text, source] of first.items) {
      assert.ok(figure && text && source, `${s.id}의 근거에 빈 칸이 있다`);
    }
  }
});

test("모든 업종은 미팅, 화면 정하기, 직접 써 보기 순서의 3단계를 갖는다", () => {
  for (const s of SEGMENTS) {
    assert.deepEqual(
      s.steps.map(([title]) => title),
      ["20분 미팅", "필요한 화면 함께 정하기", "원하시면 시범 운영"],
      s.id,
    );
  }
});

test("첫 화면 버튼은 도입 문의로 통일한다", () => {
  for (const s of SEGMENTS) assert.equal(s.hero.cta, "도입 문의", s.id);
});

test("2주 무료 운영을 약속하지 않는다", () => {
  // 기관용 기능이 아직 없어 당장 운영을 약속할 수 없다
  assert.doesNotMatch(JSON.stringify(SEGMENTS), /2주 (무료|동안)|무료 (시범|운영)/);
});

test("영상이 서버로 전송되지 않는다고 쓰지 않는다", () => {
  // 그룹 공부방은 참여자끼리 영상이 직접 오간다. 단정하는 문장은 사실과 다르다
  const all = JSON.stringify(SEGMENTS);
  assert.doesNotMatch(all, /영상(은|이)[^"]{0,12}(전송되지|저장되지) 않/);
});

test("AI 정확도를 약속하는 표현과 '최초'를 쓰지 않는다", () => {
  const all = JSON.stringify(SEGMENTS);
  assert.doesNotMatch(all, /정확(하게|히)|최초|100% 감지/);
});
