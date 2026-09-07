import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("plugin closure contains one skill and two host manifests", async () => {
  const packageJson = JSON.parse(await readFile(path.join(PACKAGE_ROOT, "package.json"), "utf8"));
  const codex = JSON.parse(await readFile(path.join(PACKAGE_ROOT, ".codex-plugin/plugin.json"), "utf8"));
  const claude = JSON.parse(await readFile(path.join(PACKAGE_ROOT, ".claude-plugin/plugin.json"), "utf8"));
  const readme = await readFile(path.join(PACKAGE_ROOT, "README.md"), "utf8");
  const readmeZh = await readFile(path.join(PACKAGE_ROOT, "README.zh-CN.md"), "utf8");
  const changelog = await readFile(path.join(PACKAGE_ROOT, "CHANGELOG.md"), "utf8");
  const changelogZh = await readFile(path.join(PACKAGE_ROOT, "CHANGELOG.zh-CN.md"), "utf8");
  const releaseNotes010 = await readFile(path.join(PACKAGE_ROOT, "release-notes/0.1.0.yaml"), "utf8");
  const releaseNotes017 = await readFile(path.join(PACKAGE_ROOT, "release-notes/0.17.0.yaml"), "utf8");

  assert.equal(packageJson.name, "foundation-adoption-review");
  assert.equal(packageJson.version, "0.19.1");
  assert.equal(packageJson.private, true);
  const publicMirrorBase = ["https://github", ".com/ifoohoo/foundation-adoption-review"].join("");
  assert.equal(packageJson.repository?.url, `${publicMirrorBase}.git`);
  assert.equal(packageJson.homepage, publicMirrorBase);
  assert.equal(packageJson.bugs?.url, `${publicMirrorBase}/issues`);
  const publicMirrorLink = `[ifoohoo/foundation-adoption-review](${publicMirrorBase})`;
  assert.ok(readme.includes(publicMirrorLink), "README.md must point to the frozen public mirror");
  assert.ok(readmeZh.includes(publicMirrorLink), "README.zh-CN.md must point to the frozen public mirror");
  for (const source of [readme, readmeZh]) {
    assert.ok(source.includes("ifoohoo/skill-family-hub"), "installation must use Skill Family Hub");
    assert.equal(source.includes("plugin marketplace add ifoohoo/release-skill"), false);
  }
  assert.match(readme, /published, verified, and accepted by the Hub/);
  assert.match(readmeZh, /发布完成、验证通过且 Hub 接受登记/);
  for (const source of [changelog, changelogZh, releaseNotes017]) {
    assert.ok(source.includes("Skill Family Hub"), "release documentation must name Skill Family Hub");
    assert.equal(source.includes("ifoohoo/release-skill"), false, "release documentation must not restore the obsolete Marketplace");
  }
  assert.equal(releaseNotes010.includes("Skill Family Hub"), false, "0.1.0 release notes must remain historical");
  assert.doesNotMatch(releaseNotes010, /\bVERIFIED\b/, "0.1.0 release notes must not claim verification");
  for (const relative of [
    ".claude-plugin/marketplace.json",
    ".agents/plugins/marketplace.json",
    ".codebuddy-plugin/marketplace.json",
    "kimi-marketplace.json",
  ]) {
    await assert.rejects(access(path.join(PACKAGE_ROOT, relative)), { code: "ENOENT" });
  }
  for (const field of ["exports", "bin", "files", "dependencies", "devDependencies"]) {
    assert.equal(Object.hasOwn(packageJson, field), false, `package.json must not declare ${field}`);
  }
  assert.equal(codex.name, "foundation-adoption-review");
  assert.equal(codex.version, "0.19.1");
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
    [".codex-plugin/plugin.json", "5a3d6cded9ab8dd9c95dda4b6040e351c71566b045ae63803a03684589c1cccf"],
    [".claude-plugin/plugin.json", "72e299c814b93537eb2ba83bcefc59b7906017d5bee9088267a0a6e3e5674903"],
    ["skills/foundation-adoption-review/SKILL.md", "60af0cff92e4ae1fbfdf4805d12ec6bbde23bbf781a2b73fee587e25c792a61f"],
    ["release-notes/0.1.0.yaml", "642a997262dda1db5d50129276504da5775d2446fad9238adcdf5cb1ca0d422f"],
  ]);
  for (const [relativePath, expected] of expectedHashes) {
    const bytes = await readFile(path.join(PACKAGE_ROOT, relativePath));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expected, relativePath);
  }
});
