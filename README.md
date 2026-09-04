# foundation-adoption-review

`foundation-adoption-review` is the read-only diagnosis skill for deciding whether a project can reuse a published Foundation capability. It compares caller-provided capability-catalog and `adopt-plan` results, then distinguishes direct adoption, thin adaptation, candidate matches, no match, and missed existing capability.

<!-- release-skill:capability:external-write-boundary -->

This Plugin is for skill-family maintainers and other developers who need to decide whether a proposed mechanism already exists in a published Foundation release. It reads the supplied evidence and writes nothing. It does not push, publish, install or update Foundation, invoke a host, run qualification, or decide Audit compliance.

This directory is an independent Plugin release unit inside the Foundation monorepo. It is not a fourth Foundation npm package. `package.json` is private only to prevent `npm publish`; the open-source mirror is [ifoohoo/foundation-adoption-review](https://github.com/ifoohoo/foundation-adoption-review), published with the Apache-2.0 license.

The Plugin contains one shared Skill. Codex and Claude use their own manifests; Kimi, Qoder, WorkBuddy, and CodeBuddy consume the same Skill content through their host-specific integration paths and do not require duplicate manifests here.

The Plugin reads supplied results and writes nothing. It does not install or update Foundation, invoke a host, run qualification, or decide Audit compliance.

<!-- release-skill:capability:safe-first-command -->

## Installation

This is an open-source Plugin, not an npm package. It becomes available only after the Plugin has been published to the `release-skill` Marketplace. Install it through the host Marketplace entries:

```text
# Codex
codex plugin marketplace add ifoohoo/release-skill
codex plugin add foundation-adoption-review@release-skill

# Claude
claude plugin marketplace add ifoohoo/release-skill
claude plugin install foundation-adoption-review@release-skill
```

## Minimal use

Call `foundation-adoption-review` with the evidence that the diagnosis needs. The caller must provide the published Foundation version, a `capability-catalog` query result, and an `adopt-plan` result. Keep the request read-only:

```text
Call foundation-adoption-review for this proposal.
I will provide:
- the published Foundation version;
- the capability-catalog query result;
- the adopt-plan result.
Do not modify files, install or update anything, invoke a host, run qualification, or decide Audit compliance.
```

## When something fails

If installation or diagnosis fails, report the error and stop. A person should check GitHub access, the Marketplace entry and version, and whether all three inputs are complete. Do not repair the installation or inputs automatically.

After a result is available, handle the next step manually by capability ID and the smallest adoption path in the report. Qualification and Audit decisions are separate reviews.

Run the local closure test with:

```bash
pnpm test
```
