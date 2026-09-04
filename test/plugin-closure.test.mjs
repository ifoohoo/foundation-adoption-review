import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("plugin closure contains one skill and two host manifests", async () => {
  const packageJson = JSON.parse(await readFile(path.join(PACKAGE_ROOT, "package.json"), "utf8"));
  const codex = JSON.parse(await readFile(path.join(PACKAGE_ROOT, ".codex-plugin/plugin.json"), "utf8"));
  const claude = JSON.parse(await readFile(path.join(PACKAGE_ROOT, ".claude-plugin/plugin.json"), "utf8"));
  const readme = await readFile(path.join(PACKAGE_ROOT, "README.md"), "utf8");
  const readmeZh = await readFile(path.join(PACKAGE_ROOT, "README.zh-CN.md"), "utf8");

  assert.equal(packageJson.name, "foundation-adoption-review");
  assert.equal(packageJson.version, "0.1.0");
  assert.equal(packageJson.private, true);
  const publicMirrorBase = ["https://github", ".com/ifoohoo/foundation-adoption-review"].join("");
  assert.equal(packageJson.repository?.url, `${publicMirrorBase}.git`);
  assert.equal(packageJson.homepage, publicMirrorBase);
  assert.equal(packageJson.bugs?.url, `${publicMirrorBase}/issues`);
  const publicMirrorLink = `[ifoohoo/foundation-adoption-review](${publicMirrorBase})`;
  assert.ok(readme.includes(publicMirrorLink), "README.md must point to the frozen public mirror");
  assert.ok(readmeZh.includes(publicMirrorLink), "README.zh-CN.md must point to the frozen public mirror");
  for (const field of ["exports", "bin", "files", "dependencies", "devDependencies"]) {
    assert.equal(Object.hasOwn(packageJson, field), false, `package.json must not declare ${field}`);
  }
  assert.equal(codex.name, "foundation-adoption-review");
  assert.equal(codex.version, "0.1.0");
  assert.equal(claude.name, codex.name);
  assert.equal(claude.version, codex.version);
  assert.equal(claude.skills, codex.skills);
  assert.equal(Object.hasOwn(claude, "interface"), false);
  assert.ok(Object.hasOwn(codex, "interface"));
  assert.deepEqual(await readdir(path.join(PACKAGE_ROOT, "skills")), ["foundation-adoption-review"]);
  assert.deepEqual(
    await readdir(path.join(PACKAGE_ROOT, "skills/foundation-adoption-review")),
    ["SKILL.md"],
  );

  const expectedHashes = new Map([
    [".codex-plugin/plugin.json", "85d326a7a4ccf6ca72d6019ffa42be96360d95e2abf6afbb036b0618c7e29391"],
    [".claude-plugin/plugin.json", "9ed3c14b2f546bfdcf9507be1d82be1cc6a02c209c3b7050a212e295dbce2884"],
    ["skills/foundation-adoption-review/SKILL.md", "11495686fbf9b0f882e9fb25881301710a85511767cfcecfb70d0c4b5ba3aac8"],
  ]);
  for (const [relativePath, expected] of expectedHashes) {
    const bytes = await readFile(path.join(PACKAGE_ROOT, relativePath));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expected, relativePath);
  }
});
