# foundation-adoption-review

`foundation-adoption-review` is the read-only diagnosis skill for deciding whether a project can reuse a published Foundation capability. It compares caller-provided capability-catalog and `adopt-plan` results, then distinguishes direct adoption, thin adaptation, candidate matches, no match, and missed existing capability.

Use this Skill when the project has a requirement but has not yet established which published Foundation mechanism fits. Use Engineering Kit's `adopt-plan` for structural inventory and its `check` entry points for static engineering findings. Use `scaffold` or `projection` only in a separately authorized write workflow. The Plugin does not add setup, quickstart, check, or repair Skills; this single Skill owns adoption diagnosis.

<!-- release-skill:capability:external-write-boundary -->

This Plugin is for skill-family maintainers and other developers who need to decide whether a proposed mechanism already exists in a published Foundation release. It reads the supplied evidence and writes nothing. It does not push, publish, install or update Foundation, invoke a host, run qualification, or decide Audit compliance.

This directory is an independent Plugin release unit inside the Foundation monorepo. It is not a fourth Foundation npm package. `package.json` is private only to prevent `npm publish`; the open-source mirror is [ifoohoo/foundation-adoption-review](https://github.com/ifoohoo/foundation-adoption-review), published with the Apache-2.0 license.

The Plugin contains one shared Skill. The root Agent Plugin manifest prepares Cursor distribution; the Claude, Codex, Kimi, and Qoder manifests point to the same `skills/` directory. CodeBuddy and WorkBuddy use the Hub's declared Claude-manifest compatibility path and remain separate host qualifications. No host receives a copied Skill.

Starting with 0.17.0, the Plugin's version number normally aligns numerically with Foundation. This is a release policy, not proof that two source trees or release units were published together. The Plugin remains an independent release unit, and the historical 0.1.0 release remains unchanged.

The Plugin reads supplied results and writes nothing. It does not install or update Foundation, invoke a host, run qualification, or decide Audit compliance.

Published, candidate, and local-source facts stay separate. A capability marked `stable` is usable only from the published Foundation version whose catalog declares it. A `candidate` entry, a candidate query match, or source code present in an unreleased workspace does not establish a published stable API. The Plugin version also does not authorize Foundation installation or upgrade; consult the relevant version's published catalog and release verification.

<!-- release-skill:capability:safe-first-command -->

## Installation

This is an open-source Plugin, not an npm package. Skill Family Hub is its current public Marketplace. The Plugin repository carries a root Agent Plugin manifest, four host manifests, and one Skill payload, but no Marketplace index. Cursor Marketplace submission and review remain separate. Add the Hub once, then install the Plugin on its supported Hub paths:

```text
# Codex
codex plugin marketplace add ifoohoo/skill-family-hub
# Then install foundation-adoption-review from the interactive /plugins browser.

# Claude
claude plugin marketplace add ifoohoo/skill-family-hub
claude plugin install foundation-adoption-review@skill-family-hub

# CodeBuddy
codebuddy plugin marketplace add ifoohoo/skill-family-hub
codebuddy plugin install foundation-adoption-review@skill-family-hub

# Qoder 1.1.30
qoder plugins marketplace add ifoohoo/skill-family-hub
qoder plugins install foundation-adoption-review@skill-family-hub
```

Kimi Code is installed through release-skill's controlled interactive flow from the frozen public Plugin repository and exact 0.22.0 tag. Its Hub registration and gate are verified separately, and the host path runs only after that Hub update completes. WorkBuddy uses its desktop plugin marketplace and the same Hub `codebuddy` distribution surface, but its installation, discovery, and invocation results must be checked separately from CodeBuddy. Qoder uses the Hub's `qoder` distribution surface; installation, discovery, source binding, Skill loading, and one read-only invocation require their own checks on Qoder CLI 1.1.30.

These host checks run only after the release is published, verified, and accepted by the Hub. The post-verification step creates a frozen existing-entry update proposal for the Hub's independent process to ingest, validate, and publish. The repository's current source state does not by itself prove Marketplace availability.

## Minimal use

Call `foundation-adoption-review` with the evidence that the diagnosis needs. The caller must provide the published Foundation version, a `capability-catalog` query result, and an `adopt-plan` result. Keep the request read-only:

```text
Help me run foundation-adoption-review for this proposal.
I will provide:
- the published Foundation version;
- the capability-catalog query result;
- the adopt-plan result.
Do not modify files, install or update anything, invoke a host, run qualification, or decide Audit compliance.
```

The diagnosis reads the supplied fields, including capability entry points, side effects, failure semantics, caller-owned responsibilities, and the plan's write set and conflicts. It does not run `adopt-plan` or `check` itself. A normal answer identifies the smallest public entry point, the caller-owned thin adaptation, and facts that remain unknown; it does not claim comprehensive cross-language or cross-host governance.

Foundation's ordinary engineering checks are static: they inspect declarations, configuration, and files without running target Skills, business scripts, or hooks. Their findings are meaningful only within the selected policy's scope. Existing Foundation-style version and entry assumptions are not universal rules for a single package, an independently versioned unit, a non-npm source, or every language and host.

## When something fails

If installation or diagnosis fails, report the error and stop. A person should check GitHub access, the Marketplace entry and version, and whether all three inputs are complete. Do not repair the installation or inputs automatically.

After a result is available, handle the next step manually by capability ID and the smallest adoption path in the report. Qualification and Audit decisions are separate reviews.

Run the local closure test during authorized Plugin development with:

```bash
pnpm test
```

This test verifies the Plugin's closure, manifests, README release wording, and frozen Skill bytes. It does not execute the target project, judge the diagnosis answer, qualify a host, or prove Foundation adoption. Those conclusions require their respective consumer checks and reviews.
