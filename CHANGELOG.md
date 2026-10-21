# Changelog

<!-- release-skill:changelog:start version=0.27.1 locale=en baseline=sha256:e5f585b4e557dd574bc2cf609308333e66718d66bae0f28587408477800f5c96 -->
## [0.27.1] - 2026-10-21

Foundation Adoption Review 0.27.1 moves in lockstep with the four release units and adds no Skill behavior or shared runtime API. Published 0.27.0 is unchanged.

### Changed

- No new capability. The plugin is republished at 0.27.1 so the four release units keep one version coordinate.

### Upgrade Notes

Install this plugin at exactly 0.27.1 with the three Foundation npm packages. The engineering-kit compatibility fix is in that npm release, not a new plugin command. This note does not replace post-publish verification.
<!-- release-skill:changelog:end version=0.27.1 locale=en -->


<!-- release-skill:changelog:start version=0.27.0 locale=en baseline=sha256:eba47858c68dcf036633b5de870c59edfccb648896ae073b367c20f480c08469 -->
## [0.27.0] - 2026-10-21

Foundation Adoption Review 0.27.0 advances in lockstep with the four release units and updates `foundation-initialize` routing plus the capability catalog so nonempty first registration uses `skill-family-kit check register-existing`. Relock still never seeds. It adds no shared runtime API.

### Changed

- Route nonempty targets that lack the three official closed-world documents to `skill-family-kit check register-existing`. Relock still never seeds. Empty targets still use `scaffold`. Nonempty targets that already have a legal registry still start with read-only `adopt-plan`.
- Record `foundation.kit.register-existing` in the capability catalog from 0.27.0. Catalog overlay fields stay with the existing catalog contract.
- Update the package coordinate and managed version projections. Published 0.26.0 functionality is not reimplemented.

### Upgrade Notes

Pin the three Foundation npm packages and the independent Plugin to exactly 0.27.0. Consume the actual officially published public interfaces and sources. Completing first nonempty registration or catalog routing does not mean formal adoption or initialization is complete. This note does not replace post-publish verification or formal consumer acceptance.
<!-- release-skill:changelog:end version=0.27.0 locale=en -->


<!-- release-skill:changelog:start version=0.26.0 locale=en baseline=sha256:29637adae9f2e24a07d413daab0ef73bf317b00b970843638869f18d3fae414f -->
## [0.26.0] - 2026-10-17

Foundation Adoption Review 0.26.0 advances only in lockstep with the four release units. It adds no Skill behavior or shared runtime API.

### Changed

- Update only the version and managed projections. Retain the initialization recommendations and authoritative routing guidance accepted in 0.25.0. Reading a manifest or completing routing does not mean formal adoption is complete.

### Upgrade Notes

Pin the three Foundation npm packages and the independent Plugin to exactly 0.26.0. Consumers should use the actual officially published public interfaces and sources. This note does not replace post-publish verification or formal consumer acceptance, or claim either is complete.
<!-- release-skill:changelog:end version=0.26.0 locale=en -->


<!-- release-skill:changelog:start version=0.25.0 locale=en baseline=sha256:3d9c786c8339566ef64c9bc357e73e6da12cb936def0e2921b547f8d44a81480 -->
## [0.25.0] - 2026-10-15

Foundation Adoption Review 0.25.0 keeps the four release units in lockstep and includes the accepted initialization recommendation and authority-routing guidance. It adds no shared runtime API.

### Changed

- Clarify that artifact recommendations consume the published artifact-graph/project-artifact-profiles entry and hand actual adoption to artifact-chain-bootstrap. Preserve existing project extensions and keep recommendations separate from adoption.
- When the published catalog is unavailable, pause only catalog-dependent recommendations and continue unrelated initialization steps. Do not copy catalog arrays or claim formal consumption from candidate interfaces.
- Update the package coordinate and managed version projections. The original 0.24.1 release notes and frozen payload remain unchanged.

### Upgrade Notes

Keep the three Foundation npm packages and the Plugin at the same exact release version. Check actual published interfaces and sources. Reading a catalog or following routing guidance does not prove project adoption or completed initialization; this note does not replace formal consumer acceptance or post-publish verification.
<!-- release-skill:changelog:end version=0.25.0 locale=en -->


<!-- release-skill:changelog:start version=0.24.1 locale=en baseline=sha256:934e40adcf1ed3cea28e37cf7eea8725d4432628c0f6fe048f7f3f485a65ee9c -->
## [0.24.1] - 2026-10-12

Foundation Adoption Review 0.24.1 corrects version-status wording in the initialization entry and public wiring reference. It adds no capability or API.

### Changed

- Replace five stale local-candidate or unpublished statements with availability since 0.24.0 and update the current status page, retaining 0.23.0 compatibility limits, actual-interface checks, and all authorization and failure boundaries.

### Upgrade Notes

Keep the three Foundation npm packages and Plugin at the same release version under the existing contract. Check the selected version's actual public interfaces and exact lockstep package sources; version numbers alone prove neither capability nor compatibility. The original 0.24.0 notes and frozen payload remain unchanged. This note does not replace post-publish verification of this version.
<!-- release-skill:changelog:end version=0.24.1 locale=en -->


<!-- release-skill:changelog:start version=0.24.0 locale=en baseline=sha256:f5db693ba8f8cae96ee81c71134b0da898a8953c97dc9fb153bc5d6e1ac79ee1 -->
## [0.24.0] - 2026-10-07

Foundation Adoption Review 0.24.0 adds foundation-initialize to turn a minimal Skill or equivalent workflow proven through real business use into a maintainable skill-family project. This note records the local lockstep candidate; it does not prove complete initialization, remote publication, or real-host acceptance.

### Added

- The initializer writes only within the caller's authorization. It separately designs Skill layers, subagent responsibilities, and session boundaries, uses the existing scaffold, host projection, and support entries, and preserves business rules and human judgment. Pure Skills, projects without scripts, and projects without npm distribution remain normal paths.

### Changed

- The existing foundation-adoption-review and foundation-engineering-check entries remain read-only. Initialization adds no Foundation mechanism package, top-level command, public Schema, release state machine, or independent audit conclusion.
- Includes the accepted 0.23.1 candidate fix: when an engineering declaration is missing before entity verification starts, only that declaration item is insufficient and reason retains the original diagnosis. Other selected professional checks continue when they can run independently. Insufficient material is not a pass, and FOUNDATION_STATIC_CLEAR must not be hand-filled.
- Initialization explicitly registers newly handwritten sources through the public entry. Tool locks require a version supporting trackedToolLocks; projections, generated files, and logs are not handwritten sources. Check the host-required frontmatter before projection; discovery alone does not prove the business flow passed.

### Upgrade Notes

All four release units move together to 0.24.0; pin the three npm packages to the exact same version. Complete business trials, valid Profile adoption, an over-capacity handoff, real human decisions, Release wiring, and consumption after official installation remain unfinished. This note and partial wiring cannot replace them. The existing 2026-10-06 observation records public version 0.23.0; this window did not query remotes again. 0.24.0 remains a local candidate.
<!-- release-skill:changelog:end version=0.24.0 locale=en -->


<!-- release-skill:changelog:start version=0.23.0 locale=en baseline=sha256:b3dc2e2319dfde98d67569ed3664aa4badb31c26a89c61735b6ba03fa0146911 -->
## [0.23.0] - 2026-09-26

Foundation Adoption Review 0.23.0 adds `foundation-engineering-check` for a complete static engineering review and for reading an existing Foundation proof, and corrects two accepted judgment errors. This note records the local lockstep candidate; it does not claim remote publication or real-host acceptance.

### Added

- Adds the `foundation-engineering-check` Skill. It reviews a caller-selected static scope, or reads one existing Foundation-family proof, and does not execute target Skills, business scripts, or hooks. The existing `foundation-adoption-review` Skill still only diagnoses caller-supplied material.

### Changed

- Version comparison now separates the npm package version, the Contracts specification version, and the target release-unit version, and compares only the same object. A specification coordinate such as Contracts 1.20.0 beside package 0.22.0 is not by itself a conflict. When the object cannot be identified, the item stays `insufficient`.
- A selected entry check that has not reached entity verification because `engineering.entries` is absent, while `releaseUnits` remains valid under the published schema, is recorded as `insufficient`. The diagnostic array name `findings` or an exit code of 1 does not by itself prove a violation. A separate mandatory breach with evidence remains `findings`.
- Aligns the Plugin source, the root Agent Plugin manifest, and the four host manifests with Foundation 0.23.0.

### Upgrade Notes

The four Foundation release units move together to 0.23.0. Remote publication, real-host verification, and Cursor Marketplace submission remain outside this note. The 0.22.0 Plugin release stays the last verified public baseline.
<!-- release-skill:changelog:end version=0.23.0 locale=en -->


## [0.22.0] - 2026-09-18

- Adds no new capability: this release restores numerical lockstep with Foundation 0.22.0 across all four release units.
- Aligns the independent Plugin source, root Agent Plugin manifest, and the four host manifests with Foundation 0.22.0; the shared read-only Skill and all diagnosis semantics are unchanged.
- Moves directly from the published 0.20.0 to 0.22.0 because the previous Foundation release deliberately kept this unit unchanged, so no 0.21.0 Plugin release exists.
- Keeps Cursor Marketplace submission, Marketplace review, and local host upgrades outside this GitHub release.

## [0.20.0] - 2026-09-10

- Added the standard root `plugin.json` required to submit the public mirror as a Cursor Agent Plugin.
- Extended the verified public release closure with the Cursor manifest while retaining one shared read-only Skill and all existing host manifests.
- Aligned the independent Plugin source with Foundation 0.20.0 without changing diagnosis semantics or joining the three-package dependency chain.
- Kept Cursor Marketplace submission and review outside this GitHub release.

## [0.19.3] - 2026-09-08

- Added a Qoder manifest that points to the existing canonical read-only Skill.
- Prepared immutable Qoder distribution through Skill Family Hub while keeping installation, discovery, source binding, Skill loading, and invocation as separate post-release checks.
- Aligned the independent Plugin source candidate with Foundation 0.19.3 without changing diagnosis semantics or joining the three-package dependency chain.

## [0.19.2] - 2026-09-08

- Added the Kimi Code manifest while retaining one canonical read-only Skill.
- Extended Skill Family Hub distribution compatibility to Kimi Code and the shared CodeBuddy/WorkBuddy surface. CodeBuddy and WorkBuddy keep the Claude-manifest fallback and require separate host verification.
- Aligned the independent Plugin source candidate with Foundation 0.19.2 without changing diagnosis semantics or joining the three-package dependency chain.

## [0.19.1] - 2026-09-08

- Aligned the Plugin source candidate with the Foundation 0.19.1 patch version; its independent release authority and package boundary are unchanged.
- Verified the batch entry-point guidance through the real Skill entry with exact 0.19.0 and 0.18.0 Foundation inputs. The existing instructions covered the frozen scenarios, so no Skill change was required.

## [0.19.0] - 2026-09-07

- Aligned the Plugin's version number with Foundation 0.19.0 while preserving its independent release authority and package boundary.
- Added minimal batch entry-point selection guidance to the Skill: same-process calls keep the existing object entry; independent cross-process canonical-json requests within capacity are batch candidates; dependent, oversized, or unsupported requests keep the original path; an exact version without the entry cannot claim availability.

## [0.17.0] - 2026-09-05

- Aligned the Plugin's version number with Foundation 0.17.0 while preserving its independent release authority and package boundary.
- Made Skill Family Hub the only public Marketplace and removed the obsolete `release-skill` Marketplace dependency.
- Routed the first Hub registration through a post-verification manual onboarding handoff; the proposal inbox remains reserved for updates to an existing entry.

## [0.1.0] - 2026-09-01

- Added the read-only `foundation-adoption-review` Skill and Codex/Claude plugin manifests.
- Declared this Plugin as an independent open-source mirror release unit inside the Foundation monorepo.
