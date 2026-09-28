# foundation-adoption-review

<!-- release-skill:release-version: 0.23.0 -->

<!-- release-skill:managed:start id=latest-release -->
**0.23.0** (2026-09-26)

Foundation Adoption Review 0.23.0 adds `foundation-engineering-check` for a complete static engineering review and for reading an existing Foundation proof, and corrects two accepted judgment errors. This note records the local lockstep candidate; it does not claim remote publication or real-host acceptance.

**Added**

- Adds the `foundation-engineering-check` Skill. It reviews a caller-selected static scope, or reads one existing Foundation-family proof, and does not execute target Skills, business scripts, or hooks. The existing `foundation-adoption-review` Skill still only diagnoses caller-supplied material.

**Changed**

- Version comparison now separates the npm package version, the Contracts specification version, and the target release-unit version, and compares only the same object. A specification coordinate such as Contracts 1.20.0 beside package 0.22.0 is not by itself a conflict. When the object cannot be identified, the item stays `insufficient`.
- A selected entry check that has not reached entity verification because `engineering.entries` is absent, while `releaseUnits` remains valid under the published schema, is recorded as `insufficient`. The diagnostic array name `findings` or an exit code of 1 does not by itself prove a violation. A separate mandatory breach with evidence remains `findings`.
- Aligns the Plugin source, the root Agent Plugin manifest, and the four host manifests with Foundation 0.23.0.

**Upgrade Notes**

The four Foundation release units move together to 0.23.0. Remote publication, real-host verification, and Cursor Marketplace submission remain outside this note. The 0.22.0 Plugin release stays the last verified public baseline.
<!-- release-skill:managed:end id=latest-release -->

`foundation-adoption-review` is the read-only diagnosis skill for deciding whether a project can reuse a published Foundation capability. It compares caller-provided capability-catalog and `adopt-plan` results, then distinguishes direct adoption, thin adaptation, candidate matches, no match, and missed existing capability.

`foundation-engineering-check` is the complete static engineering-review Skill in the same Plugin. It reviews caller-selected engineering declarations, public capability adoption, and public call boundaries, then projects a Foundation professional conclusion. It does not run target Skills, business scripts, or hooks.

Use `foundation-adoption-review` when the project has a requirement but has not yet established which published Foundation mechanism fits. Use `foundation-engineering-check` when the target root needs a complete static engineering review, or when an existing Foundation proof must be read. Use Engineering Kit's `adopt-plan` for structural inventory and its `check` entry points for local declared findings. Use `scaffold` or `projection` only in a separately authorized write workflow. The Plugin does not add setup, quickstart, or repair Skills. Adoption diagnosis stays on `foundation-adoption-review`; that Skill still does not run `check`.

<!-- release-skill:capability:external-write-boundary -->

This Plugin is for skill-family maintainers and other developers who need to decide whether a proposed mechanism already exists in a published Foundation release. `foundation-adoption-review` reads the supplied evidence and writes nothing. `foundation-engineering-check` reads the target and creates the current review result plus one exclusive proof only at caller-explicit output locations. The Plugin does not push, publish, install or update Foundation, invoke a host, run qualification, or decide Audit compliance.

This directory is an independent Plugin release unit inside the Foundation monorepo. It is not a fourth Foundation npm package. `package.json` is private only to prevent `npm publish`; the open-source mirror is [ifoohoo/foundation-adoption-review](https://github.com/ifoohoo/foundation-adoption-review), published with the Apache-2.0 license.

The Plugin contains two shared Skills. The root Agent Plugin manifest prepares Cursor distribution; the Claude, Codex, Kimi, and Qoder manifests point to the same `skills/` directory. CodeBuddy and WorkBuddy use the Hub's declared Claude-manifest compatibility path and remain separate host qualifications. No host receives a copied Skill.

Starting with 0.17.0, the Plugin's version number normally aligns numerically with Foundation. This is a release policy, not proof that two source trees or release units were published together. The Plugin remains an independent release unit, and the historical 0.1.0 release remains unchanged.

`foundation-adoption-review` reads supplied results and writes nothing. `foundation-engineering-check` does not modify the target; it creates the review result and proof only at explicit output locations. The Plugin does not install or update Foundation, invoke a host, run qualification, or decide Audit compliance.

Published, candidate, and local-source facts stay separate. A capability marked `stable` is usable only from the published Foundation version whose catalog declares it. A `candidate` entry, a candidate query match, or source code present in an unreleased workspace does not establish a published stable API. The Plugin version also does not authorize Foundation installation or upgrade; consult the relevant version's published catalog and release verification.

<!-- release-skill:capability:safe-first-command -->

## Installation

This is an open-source Plugin, not an npm package. Skill Family Hub is its current public Marketplace. The Plugin repository carries a root Agent Plugin manifest, four host manifests, and two Skill payloads, but no Marketplace index. Cursor Marketplace submission and review remain separate. Add the Hub once, then install the Plugin on its supported Hub paths:

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

Call `foundation-adoption-review` with the evidence that the diagnosis needs. The caller must provide the published Foundation version, a `capability-catalog` query result, and an `adopt-plan` result. Keep the request read-only. For a complete static engineering review of a target root, call `foundation-engineering-check` instead and supply the target, the selected engineering scope, and any existing Foundation proof:

```text
Help me run foundation-adoption-review for this proposal.
I will provide:
- the published Foundation version;
- the capability-catalog query result;
- the adopt-plan result.
Do not modify files, install or update anything, invoke a host, run qualification, or decide Audit compliance.
```

```text
Help me run foundation-engineering-check on this project.
I will provide:
- the target root;
- the applicable engineering scope;
- an optional existing Foundation proof.
Do not run target Skills, scripts, or hooks. Do not treat declared version and entry checks as a full Foundation pass.
```

The adoption diagnosis reads the supplied fields, including capability entry points, side effects, failure semantics, caller-owned responsibilities, and the plan's write set and conflicts. It does not run `adopt-plan` or `check` itself. A normal answer identifies the smallest public entry point, the caller-owned thin adaptation, and facts that remain unknown; it does not claim comprehensive cross-language or cross-host governance. `foundation-engineering-check` may run declared version checks, entry checks, or `adopt-plan` when the selected scope needs those commands as evidence; two mechanical branches passing is not a full Foundation pass.

Foundation's ordinary engineering checks are static: they inspect declarations, configuration, and files without running target Skills, business scripts, or hooks. Their findings are meaningful only within the selected policy's scope. Existing Foundation-style version and entry assumptions are not universal rules for a single package, an independently versioned unit, a non-npm source, or every language and host.

## When something fails

If installation or diagnosis fails, report the error and stop. A person should check GitHub access, the Marketplace entry and version, and whether all three inputs are complete. Do not repair the installation or inputs automatically.

After a result is available, handle the next step manually by capability ID and the smallest adoption path in the report. Qualification and Audit decisions are separate reviews.

Run the local closure test during authorized Plugin development with:

```bash
pnpm test
```

This test verifies the Plugin's closure, manifests, README release wording, and frozen Skill bytes. It does not execute the target project, judge the diagnosis answer, qualify a host, or prove Foundation adoption. Those conclusions require their respective consumer checks and reviews.
