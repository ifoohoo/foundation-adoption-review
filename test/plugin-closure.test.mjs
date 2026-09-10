import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AGENT_PLUGIN_MANIFEST_PATH = "plugin.json";
const AGENT_PLUGIN_SCHEMA = "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json";
const AGENT_PLUGIN_NAME = /^(?!.*(?:--|\.\.))[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/;
const AGENT_PLUGIN_FIELDS = Object.freeze([
  "$schema",
  "name",
  "version",
  "description",
  "author",
  "license",
]);
const AGENT_PLUGIN_AUTHOR_FIELDS = Object.freeze(["email", "name", "url"]);
const MANIFEST_PATHS = Object.freeze([
  ".claude-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".kimi-plugin/plugin.json",
  ".qoder-plugin/plugin.json",
]);

function agentPluginProblems({ packageJson, manifest }) {
  if (!manifest) return [`${AGENT_PLUGIN_MANIFEST_PATH}:missing`];

  const problems = [];
  const expected = {
    $schema: AGENT_PLUGIN_SCHEMA,
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    license: packageJson.license,
  };
  for (const [field, value] of Object.entries(expected)) {
    if (!Object.hasOwn(manifest, field) || JSON.stringify(manifest[field]) !== JSON.stringify(value)) {
      problems.push(`${AGENT_PLUGIN_MANIFEST_PATH}:${field}`);
    }
  }
  if (
    typeof manifest.name !== "string"
    || manifest.name.length < 1
    || manifest.name.length > 64
    || !AGENT_PLUGIN_NAME.test(manifest.name)
  ) {
    problems.push(`${AGENT_PLUGIN_MANIFEST_PATH}:name`);
  }
  for (const field of ["version", "description", "license"]) {
    if (typeof manifest[field] !== "string") {
      problems.push(`${AGENT_PLUGIN_MANIFEST_PATH}:${field}`);
    }
  }
  const author = manifest.author;
  if (author === null || typeof author !== "object" || Array.isArray(author)) {
    problems.push(`${AGENT_PLUGIN_MANIFEST_PATH}:author`);
  } else {
    if (Object.keys(author).some((field) => !AGENT_PLUGIN_AUTHOR_FIELDS.includes(field))) {
      problems.push(`${AGENT_PLUGIN_MANIFEST_PATH}:author`);
    }
    if (Object.values(author).some((value) => typeof value !== "string")) {
      problems.push(`${AGENT_PLUGIN_MANIFEST_PATH}:author`);
    }
  }
  if (Object.hasOwn(manifest, "skills")) problems.push(`${AGENT_PLUGIN_MANIFEST_PATH}:skills`);
  if (JSON.stringify(Object.keys(manifest).sort()) !== JSON.stringify([...AGENT_PLUGIN_FIELDS].sort())) {
    problems.push(`${AGENT_PLUGIN_MANIFEST_PATH}:fields`);
  }
  return problems;
}

function manifestProblems({ packageJson, manifests, skillDirectories, skillFiles }) {
  const problems = [];
  const expectedIdentity = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    license: packageJson.license,
  };
  const expectedKeywords = manifests[".claude-plugin/plugin.json"]?.keywords;

  for (const manifestPath of MANIFEST_PATHS) {
    const manifest = manifests[manifestPath];
    if (!manifest) {
      problems.push(`${manifestPath}:missing`);
      continue;
    }
    for (const [field, expected] of Object.entries(expectedIdentity)) {
      if (!Object.hasOwn(manifest, field) || JSON.stringify(manifest[field]) !== JSON.stringify(expected)) {
        problems.push(`${manifestPath}:${field}`);
      }
    }
    if (JSON.stringify(manifest.keywords) !== JSON.stringify(expectedKeywords)) {
      problems.push(`${manifestPath}:keywords`);
    }
    if (manifest.skills !== "./skills/") problems.push(`${manifestPath}:skills`);
  }

  if (JSON.stringify(skillDirectories) !== JSON.stringify(["foundation-adoption-review"])) {
    problems.push("skills:directories");
  }
  if (JSON.stringify(skillFiles) !== JSON.stringify(["SKILL.md"])) problems.push("skills:files");
  return problems;
}

test("plugin closure contains one skill, four host manifests, and one Agent Plugin manifest", async () => {
  const packageJson = JSON.parse(await readFile(path.join(PACKAGE_ROOT, "package.json"), "utf8"));
  const agentPluginManifest = JSON.parse(
    await readFile(path.join(PACKAGE_ROOT, AGENT_PLUGIN_MANIFEST_PATH), "utf8"),
  );
  const manifests = Object.fromEntries(await Promise.all(MANIFEST_PATHS.map(async (manifestPath) => [
    manifestPath,
    JSON.parse(await readFile(path.join(PACKAGE_ROOT, manifestPath), "utf8")),
  ])));
  const codex = manifests[".codex-plugin/plugin.json"];
  const claude = manifests[".claude-plugin/plugin.json"];
  const kimi = manifests[".kimi-plugin/plugin.json"];
  const qoder = manifests[".qoder-plugin/plugin.json"];
  const readme = await readFile(path.join(PACKAGE_ROOT, "README.md"), "utf8");
  const readmeZh = await readFile(path.join(PACKAGE_ROOT, "README.zh-CN.md"), "utf8");
  const changelog = await readFile(path.join(PACKAGE_ROOT, "CHANGELOG.md"), "utf8");
  const changelogZh = await readFile(path.join(PACKAGE_ROOT, "CHANGELOG.zh-CN.md"), "utf8");
  const releaseNotes010 = await readFile(path.join(PACKAGE_ROOT, "release-notes/0.1.0.yaml"), "utf8");
  const releaseNotes017 = await readFile(path.join(PACKAGE_ROOT, "release-notes/0.17.0.yaml"), "utf8");
  const releaseNotes0192 = await readFile(path.join(PACKAGE_ROOT, "release-notes/0.19.2.yaml"), "utf8");
  const releaseNotes0193 = await readFile(path.join(PACKAGE_ROOT, "release-notes/0.19.3.yaml"), "utf8");

  assert.equal(packageJson.name, "foundation-adoption-review");
  assert.equal(packageJson.version, "0.20.0");
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
  for (const source of [changelog, changelogZh, releaseNotes017, releaseNotes0192, releaseNotes0193]) {
    assert.ok(source.includes("Skill Family Hub"), "release documentation must name Skill Family Hub");
    assert.equal(source.includes("ifoohoo/release-skill"), false, "release documentation must not restore the obsolete Marketplace");
  }
  assert.equal(releaseNotes010.includes("Skill Family Hub"), false, "0.1.0 release notes must remain historical");
  assert.doesNotMatch(releaseNotes010, /\bVERIFIED\b/, "0.1.0 release notes must not claim verification");
  for (const relative of [
    ".claude-plugin/marketplace.json",
    ".agents/plugins/marketplace.json",
    ".codebuddy-plugin/marketplace.json",
    ".codebuddy-plugin/plugin.json",
    ".workbuddy-plugin/plugin.json",
    "kimi-marketplace.json",
  ]) {
    await assert.rejects(access(path.join(PACKAGE_ROOT, relative)), { code: "ENOENT" });
  }
  for (const field of ["exports", "bin", "files", "dependencies", "devDependencies"]) {
    assert.equal(Object.hasOwn(packageJson, field), false, `package.json must not declare ${field}`);
  }
  const skillDirectories = await readdir(path.join(PACKAGE_ROOT, "skills"));
  const skillFiles = await readdir(path.join(PACKAGE_ROOT, "skills/foundation-adoption-review"));
  assert.deepEqual(manifestProblems({ packageJson, manifests, skillDirectories, skillFiles }), []);
  assert.deepEqual(agentPluginProblems({ packageJson, manifest: agentPluginManifest }), []);
  assert.equal(Object.hasOwn(claude, "interface"), false);
  assert.equal(Object.hasOwn(kimi, "interface"), false);
  assert.equal(Object.hasOwn(qoder, "interface"), false);
  assert.ok(Object.hasOwn(codex, "interface"));

  const expectedHashes = new Map([
    [".codex-plugin/plugin.json", "d758b63e553370b66733d7f9aadc498a26143b2f482b665a32d41395632a2e92"],
    [".claude-plugin/plugin.json", "1899ab5402379e2902cd194968094d435b17fa7b136d8c58d59bf5482f8bec9d"],
    [".kimi-plugin/plugin.json", "1899ab5402379e2902cd194968094d435b17fa7b136d8c58d59bf5482f8bec9d"],
    [".qoder-plugin/plugin.json", "1899ab5402379e2902cd194968094d435b17fa7b136d8c58d59bf5482f8bec9d"],
    ["skills/foundation-adoption-review/SKILL.md", "60af0cff92e4ae1fbfdf4805d12ec6bbde23bbf781a2b73fee587e25c792a61f"],
    ["release-notes/0.1.0.yaml", "642a997262dda1db5d50129276504da5775d2446fad9238adcdf5cb1ca0d422f"],
  ]);
  for (const [relativePath, expected] of expectedHashes) {
    const bytes = await readFile(path.join(PACKAGE_ROOT, relativePath));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expected, relativePath);
  }
});

test("plugin closure rejects missing or drifted Qoder metadata and extra Skill copies", async () => {
  const packageJson = JSON.parse(await readFile(path.join(PACKAGE_ROOT, "package.json"), "utf8"));
  const manifests = Object.fromEntries(await Promise.all(MANIFEST_PATHS.map(async (manifestPath) => [
    manifestPath,
    JSON.parse(await readFile(path.join(PACKAGE_ROOT, manifestPath), "utf8")),
  ])));
  const valid = {
    packageJson,
    manifests,
    skillDirectories: ["foundation-adoption-review"],
    skillFiles: ["SKILL.md"],
  };

  const missingQoder = structuredClone(valid);
  delete missingQoder.manifests[".qoder-plugin/plugin.json"];
  assert.ok(manifestProblems(missingQoder).includes(".qoder-plugin/plugin.json:missing"));

  const driftedIdentity = structuredClone(valid);
  driftedIdentity.manifests[".qoder-plugin/plugin.json"].version = "0.19.2";
  assert.ok(manifestProblems(driftedIdentity).includes(".qoder-plugin/plugin.json:version"));

  const escapedSkills = structuredClone(valid);
  escapedSkills.manifests[".qoder-plugin/plugin.json"].skills = "../skills/";
  assert.ok(manifestProblems(escapedSkills).includes(".qoder-plugin/plugin.json:skills"));

  const copiedSkill = structuredClone(valid);
  copiedSkill.skillDirectories.push("foundation-adoption-review-qoder");
  assert.ok(manifestProblems(copiedSkill).includes("skills:directories"));
});

test("plugin closure rejects missing or drifted Agent Plugin metadata and explicit Skill routing", async () => {
  const packageJson = JSON.parse(await readFile(path.join(PACKAGE_ROOT, "package.json"), "utf8"));
  const manifest = JSON.parse(await readFile(path.join(PACKAGE_ROOT, AGENT_PLUGIN_MANIFEST_PATH), "utf8"));

  assert.ok(agentPluginProblems({ packageJson, manifest: undefined }).includes("plugin.json:missing"));

  const driftedSchema = structuredClone(manifest);
  driftedSchema.$schema = "https://agent-plugins.org/schemas/0.9.0/plugin.schema.json";
  assert.ok(agentPluginProblems({ packageJson, manifest: driftedSchema }).includes("plugin.json:$schema"));

  const driftedIdentity = structuredClone(manifest);
  driftedIdentity.version = "0.19.2";
  assert.ok(agentPluginProblems({ packageJson, manifest: driftedIdentity }).includes("plugin.json:version"));

  for (const invalidName of [42, "", "a".repeat(65), "Uppercase", "double--dash", "double..dot", "trailing-"]) {
    const invalidIdentity = {
      packageJson: structuredClone(packageJson),
      manifest: structuredClone(manifest),
    };
    invalidIdentity.packageJson.name = invalidName;
    invalidIdentity.manifest.name = invalidName;
    assert.ok(
      agentPluginProblems(invalidIdentity).includes("plugin.json:name"),
      `synchronized invalid name must fail: ${JSON.stringify(invalidName)}`,
    );
  }

  for (const [field, value] of [
    ["version", 193],
    ["description", ["read-only"]],
    ["license", null],
  ]) {
    const invalidIdentity = {
      packageJson: structuredClone(packageJson),
      manifest: structuredClone(manifest),
    };
    invalidIdentity.packageJson[field] = value;
    invalidIdentity.manifest[field] = value;
    assert.ok(
      agentPluginProblems(invalidIdentity).includes(`plugin.json:${field}`),
      `synchronized invalid ${field} type must fail`,
    );
  }

  for (const author of [
    [],
    null,
    { name: "Foundation", company: "Example" },
    { name: 42 },
    { name: "Foundation", email: ["maintainer@example.test"] },
    { name: "Foundation", url: { href: "https://example.test" } },
  ]) {
    const invalidIdentity = {
      packageJson: structuredClone(packageJson),
      manifest: structuredClone(manifest),
    };
    invalidIdentity.packageJson.author = author;
    invalidIdentity.manifest.author = author;
    assert.ok(
      agentPluginProblems(invalidIdentity).includes("plugin.json:author"),
      `synchronized invalid author must fail: ${JSON.stringify(author)}`,
    );
  }

  const explicitSkills = structuredClone(manifest);
  explicitSkills.skills = "./skills/";
  assert.ok(agentPluginProblems({ packageJson, manifest: explicitSkills }).includes("plugin.json:skills"));

  const expandedSurface = structuredClone(manifest);
  expandedSurface.homepage = packageJson.homepage;
  assert.ok(agentPluginProblems({ packageJson, manifest: expandedSurface }).includes("plugin.json:fields"));
});
