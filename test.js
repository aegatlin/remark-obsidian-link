import assert from "node:assert/strict";
import { test } from "node:test";
import { remark } from "remark";
import { remarkObsidianLink } from "./dist/index.js";

test("removes links with no opts", () => {
  const pre = (mdString) => remark().processSync(mdString).toString();
  const post = (mdString) =>
    remark().use(remarkObsidianLink).processSync(mdString).toString();

  assert.deepEqual(post("[[Wiki Link]]"), pre("Wiki Link"));
  assert.deepEqual(post("[[Wiki Link|Alias]]"), pre("Alias"));
  assert.deepEqual(post("[[#Internal Link]]"), pre("#Internal Link"));
  assert.deepEqual(post("[[#Internal Link | Alias]]"), pre("Alias"));
  assert.deepEqual(post("[[#^block]]"), pre("#^block"));
  assert.deepEqual(post("[[#^block|Alias]]"), pre("Alias"));
  assert.deepEqual(post("[[Other#Header]]"), pre("Other#Header"));
  assert.deepEqual(post("[[Other#Header|Alias]]"), pre("Alias"));
  assert.deepEqual(post("[[Other#^block]]"), pre("Other#^block"));
  assert.deepEqual(post("[[Other#^block|Alias]]"), pre("Alias"));
});

test("removes links with opts.toLink", () => {
  const pre = (mdString) => remark().processSync(mdString).toString();

  const post = (mdString) =>
    remark()
      .use(remarkObsidianLink, {
        toLink: () => ({ value: "Odd", uri: "/odd" }),
      })
      .processSync(mdString)
      .toString();

  assert.deepEqual(post("[[Wiki Link]]"), pre("[Odd](/odd)"));
  assert.deepEqual(post("[[Wiki Link|Alias]]"), pre("[Odd](/odd)"));
});
