# Changelog

<!-- release-skill:changelog:start version=0.39.0 locale=en baseline=sha256:358951e8d7026e3ed995655be2d0a47319b53f9452ba0e99342d9ccdeab1ccdd -->
## [0.39.0] - 2026-11-06

Updates foundation-initialize to inventory actual provider runtime paths during initial and later onboarding, preserve source configuration and tool locks, and use the official incremental artifact registration channel without resetting lock history. Preserves confirmed original licensing, authors, adaptation contributors and unknown years.

### Changed

- Updates foundation-initialize to inventory actual provider runtime paths during initial and later onboarding, preserve source configuration and tool locks, and use the official incremental artifact registration channel without resetting lock history. Preserves confirmed original licensing, authors, adaptation contributors and unknown years.

### Upgrade Notes

Adopt all four 0.39.0 release units together and verify new entries in the exact published package. Existing default registration, MIT and Apache behavior is retained.
<!-- release-skill:changelog:end version=0.39.0 locale=en -->


<!-- release-skill:changelog:start version=0.38.0 locale=en baseline=sha256:06c8bf9fb268c05914c9cdbe7c1608bc36e9569a19370e508fc288566b469846 -->
## [0.38.0] - 2026-11-06

foundation-engineering-check adds two explicit optional scopes: "specified Skill text declaration correspondence" and "specified native projection content and resource correspondence," and extends existing fixed file reference checking to support limited leading ../ paths in raw literal, with target strictly within root. Adds fixed Schema declaration and usage chain check capability, independently verifying Markdown declaration against the actual Schema identity and required fixed version, optionally validating that Schema loading and validation in Python implementation occur before business interpretation, with JSON decoding and direct version header reading considered valid precedence; unclassifiable cases result in insufficient implementation only while preserving declaration; Kit has no dedicated CLI; Plugin invokes the API and public reader via explicit scope selection.

### Changed

- foundation-engineering-check adds two explicit optional scopes: "specified Skill text declaration correspondence" and "specified native projection content and resource correspondence," verified via real calls to runSkillSurfaceBindingCheck or runNativeProjectionCheck and corresponding CLI, with original professional-conclusion preserved and passed to the original proof reader.
- The existing fixed file reference check is extended to support limited leading ../ paths: raw literal may begin with one or more consecutive ../ followed by valid file segments separated by /, with the target strictly within root; path.posix.join is always applied regardless of baseDir value. This scope calls the existing `runStaticReferenceCheck` package-root API and reads the actual return through the public proof reader.
- Local mechanical results are used based on actual scope. The caller ensures business consistency, authority, and completeness of the selected set, and domain-level adaptation or violation judgment is the caller’s responsibility.
- Adds fixed Schema declaration and usage chain check capability, independently comparing the full $id and schemaVersion=N in Markdown against the actual required version const of the standard 2020-12 Schema. Optionally verifies in a limited, direct, unambiguous CST chain the actual Schema file used by the Python validator, the same data binding, and validation before business interpretation. JSON decoding and direct version header reading are valid precedence. Unclassifiable cases result in insufficient implementation only while preserving the declaration. Kit has no dedicated CLI. Plugin invokes the API and public reader via explicit scope selection using the exact API name runFixedSchemaUseCheck and readProfessionalProof.

### Upgrade Notes

All four units must adopt the exact 0.38.0 release version in sync, with verification required at each stage: source candidate, local testing, official channel, installation, loading, and business outcome. The caller is responsible for ensuring business consistency, authority, and completeness of the selected set; adaptation or violation judgment is the caller’s responsibility. The new fixed Schema check requires independent verification of declaration-to-Schema correspondence, optional validation of Schema loading and validation preceding business interpretation in implementation, with JSON decoding and direct version header reading considered valid precedence; unclassifiable cases result in insufficient implementation only while preserving declaration; Kit has no dedicated CLI; Plugin invokes the API and public reader via real call with explicit scope selection.
<!-- release-skill:changelog:end version=0.38.0 locale=en -->


<!-- release-skill:changelog:start version=0.37.0 locale=en baseline=sha256:e3611508de40f9d899805f9e18ba42f0e3fd1c7464e71af67d8ac0be5b6d6a3e -->
## [0.37.0] - 2026-11-05

`foundation-engineering-check` adds a mechanical scope for selected native-entry identities. It calls runNativeEntryBindingCheck or check native-entry-bindings, saves the original professional-conclusion, and lets the existing proof reader interpret local four-comparison results. Mechanical results are not filled through proof-create. Existing public-surface six-comparison and peer joint-equivalence scopes remain unchanged.

### Changed

- `foundation-engineering-check` adds a mechanical scope for selected native-entry identities. It calls runNativeEntryBindingCheck or check native-entry-bindings, saves the original professional-conclusion, and lets the existing proof reader interpret local four-comparison results. Mechanical results are not filled through proof-create. Existing public-surface six-comparison and peer joint-equivalence scopes remain unchanged.

### Upgrade Notes

Adopt all four units at 0.37.0; existing callers need no forced migration. Source candidates, local testing, or static exits cannot validate formal channels, installation, loading, or business readiness. Version 0.36.0 does not contain the new entry.
<!-- release-skill:changelog:end version=0.37.0 locale=en -->


<!-- release-skill:changelog:start version=0.36.0 locale=en baseline=sha256:95143334e4d3cd4b6dcaf337bfb2113c81c908ffb8b90be659d4e5d5177e6b02 -->
## [0.36.0] - 2026-11-03

`foundation-adoption-review` extends the existing `foundation-engineering-check` with a new mechanical scope: "selected peer adapters in common closure." It makes real calls to the new root-level API, saves full original outputs for the original reader. Mechanical results are not manually filled via `proof-create`; original outputs are stored separately per scope and not merged into a unified audit PASS. It does not assess Audit/SOURCE final state, source authority, independent resources, or platform metadata, nor does it execute targets or generators, nor does it validate release, host installation, or loading workflows.

### Changed

- `foundation-adoption-review` extends the existing `foundation-engineering-check` with a new mechanical scope: "selected peer adapters in common closure." It makes real calls to the new root-level API, saves full original outputs for the original reader. Mechanical results are not manually filled via `proof-create`; original outputs are stored separately per scope and not merged into a unified audit PASS. It does not assess Audit/SOURCE final state, source authority, independent resources, or platform metadata, nor does it execute targets or generators, nor does it validate release, host installation, or loading workflows.

### Upgrade Notes

Adopt all four units at 0.36.0; existing callers need no forced migration. Source candidates, local testing, or static exits cannot validate formal channels, installation, loading, or business readiness. The formal 0.35.0 package does not contain the new API.
<!-- release-skill:changelog:end version=0.36.0 locale=en -->


<!-- release-skill:changelog:start version=0.35.0 locale=en baseline=sha256:bd365febdc619d1c15d6efc9767e4db3ed34bff5414a221abc998a527bd252ee -->
## [0.35.0] - 2026-11-02

Version 0.35.0 adds optional nodeType to runBranchFieldCheck / check branch-fields, allowing explicit selection of direct comparisons in callbacks or object properties. Existing six-field If requests remain compatible. Exact unique positions and the existing direct-field and string-comparison grammar remain bounded. Results distinguish findings from insufficient checks without executing targets or establishing domain success or exhaustive branch coverage. Public-surface binding behavior is unchanged.

### Changed

- Version 0.35.0 adds optional nodeType to runBranchFieldCheck / check branch-fields, allowing explicit selection of direct comparisons in callbacks or object properties. Existing six-field If requests remain compatible. Exact unique positions and the existing direct-field and string-comparison grammar remain bounded. Results distinguish findings from insufficient checks without executing targets or establishing domain success or exhaustive branch coverage. Public-surface binding behavior is unchanged.

### Upgrade Notes

Adopt all four units at 0.35.0. Set nodeType explicitly for the new comparison selection; existing callers need no forced migration. A candidate, local tests or a static exit code of zero do not establish publication, installation, loading or business success. The existing four-unit release contract still applies.
<!-- release-skill:changelog:end version=0.35.0 locale=en -->


<!-- release-skill:changelog:start version=0.34.0 locale=en baseline=sha256:1f996a81832b75581b6b6fbbd1a8f8703ca004a00cab2f6e14b0a013553c75ca -->
## [0.34.0] - 2026-11-02

foundation-engineering-check adds the selected public-surface binding scope alongside the selected branch-field scope. It must invoke the actual Kit public API or CLI, retain the original professional-conclusion and interpret it with readProfessionalProof or check proof. Hand-filled codes or semantic judgments cannot replace the mechanical invocation. Each selected scope retains its own original result; local CLEAR does not establish full METHOD003, installation or business execution.

### Changed

- foundation-engineering-check adds the selected public-surface binding scope alongside the selected branch-field scope.

### Upgrade Notes

Use Engineering Kit and foundation-adoption-review 0.34.0 for the new scopes. Existing entrypoints remain compatible, with no mandatory migration for old consumers. Contracts and Harness have no new mechanism behavior and move only in lockstep version and necessary derivations. Version 0.33.0 remains an unpublished source candidate; 0.34.0 combines both capabilities. Local candidates do not establish remote publication or authorization; the four units require formal verification before overall publication is claimed.
<!-- release-skill:changelog:end version=0.34.0 locale=en -->


<!-- release-skill:changelog:start version=0.33.0 locale=en baseline=sha256:68ca4337e2e4577702c3ac7d687c0141a48dc96475b5440d188d163501549e29 -->
## [0.33.0] - 2026-11-01

foundation-engineering-check adds an optional selected-branch field/Schema scope. It must invoke the public API or CLI with actual inputs, retain the original professional conclusion and use the existing proof reader; semantic review and hand-filled results cannot replace the mechanical check. Engineering Kit 0.33.0 adds runBranchFieldCheck and check branch-fields to compare explicitly selected if-condition fields and string literals with direct properties and enum/const declarations. It reads complete ESM and Schema files without importing or executing target code. Unsupported syntax, references or constraints remain insufficient; a field without enum/const contributes field location only. Only the documented closed sibling conditional-required shape can be excluded; those conditions, whole-object validity and business success remain unchecked. Strict reads and the resource closure bind observed bytes and invalidate affected observations on drift.

### Changed

- foundation-engineering-check adds an optional selected-branch field/Schema scope.

### Upgrade Notes

The new API requires Engineering Kit 0.33.0; the corresponding optional Skill scope requires foundation-adoption-review 0.33.0. Existing entrypoints and compatible contracts remain available. Local candidate versions do not establish remote publication or authorize external actions.
<!-- release-skill:changelog:end version=0.33.0 locale=en -->


<!-- release-skill:changelog:start version=0.32.0 locale=en baseline=sha256:3734926beb3a9f0f8a9024f802daebca1722d91ac1ae27878539d757584d14c3 -->
## [0.32.0] - 2026-11-01

The `foundation-engineering-check` in `foundation-adoption-review` now supports an independent selection scope that invokes public APIs or CLI with real inputs. It preserves the original professional conclusion, including request, location, conflicts, deficiencies, and actual byte-level source. The result remains local: semantic review, projection receipts, and hand-filled proofs cannot replace the mechanical comparison. The check does not prove full Foundation review, SFA-ARTIFACT-030@2 compliance, reverse dependencies, generation outcomes, or release eligibility. The calling party retains responsibility for declaration authority, actual adoption, and full scope interpretation.

### Changed

- The `foundation-engineering-check` in `foundation-adoption-review` now supports an independent selection scope that invokes public APIs or CLI with real inputs

### Upgrade Notes

It operates within the same local result boundaries as the existing reader. The new selection requires Engineering Kit 0.32.0 and foundation-adoption-review 0.32.0; existing capabilities remain subject to their compatible contracts. No external upgrade gate is enforced.
<!-- release-skill:changelog:end version=0.32.0 locale=en -->


<!-- release-skill:changelog:start version=0.31.0 locale=en baseline=sha256:c68927f46d6b6ffc67b809fa4fa9e34535d96c912104c5b413eb22e92b089432 -->
## [0.31.0] - 2026-11-01

foundation-engineering-check now verifies schema adoption, baseline trust, and artifact set integrity before invoking public API/CLI. Real sub-checks and origins are preserved; proof-create cannot substitute for actual checks. When selected alone, real professional conclusion is retained. Combined semantic review follows original flow. Existing proofs are read-only; no re-running or forgery detection. No requirement to adopt machine schema for unadopted objects.

### Changed

- foundation-engineering-check performs pre-validation of schema adoption, baseline trust, and artifact set before public API/CLI invocation. Real sub-checks and origins are preserved.

### Upgrade Notes

All four units must upgrade to exactly 0.31.0. No expansion of initialization, other Skills, or existing host boundaries. Local CLEAR does not imply complete Foundation review, host installation/update/enable, or business operation success.
<!-- release-skill:changelog:end version=0.31.0 locale=en -->


<!-- release-skill:changelog:start version=0.30.0 locale=en baseline=sha256:9a29e51320bfa6acd5e8cf73172f7565e829eb21bb69b94a7e82aab813221a26 -->
## [0.30.0] - 2026-10-31

foundation-engineering-check integrates runStaticReferenceCheck within selected public call relationships or native runtime closures.

### Added

- Read the source to confirm actual calls, resolution bases, and selection coverage before checking source and adapter references separately.

### Changed

- Mechanical results remain separate from semantic judgment. Incomplete applicable checks retain insufficient; a local CLEAR cannot substitute for full semantic and coverage review.

### Upgrade Notes

Pin all four release units to exactly 0.30.0. Interfaces that have not adopted a machine Schema are not required to add one. Existing initialization, other Skills, and host boundaries remain unchanged.
<!-- release-skill:changelog:end version=0.30.0 locale=en -->


<!-- release-skill:changelog:start version=0.29.0 locale=en baseline=sha256:ed9a157e9f8ab6dd8534874b17b551285df49ba29422eab5c49555466faaaf08 -->
## [0.29.0] - 2026-10-26

Foundation Adoption Review 0.29.0 adds default TEST and project method selection wiring to step 7 of foundation-initialize using the exact agent-method-registry 0.2.0 v1 public API.

### Added

- Default TEST selection can be explicitly replaced by project entries/overrides or a user-selected external Plugin. Reentry preserves a valid existing choice.
- Disabled defaults, invalid overrides, missing entries or roots, and ambiguity stop the dependent call without fallback. Design/development and release consume the same original selection and verify their own business results.

### Upgrade Notes

Pin all four release units to exactly 0.29.0. P1 wiring covers codex and claude-code only. Evidence covers step-7 existing-project reentry and five failure classes; 12 verified plan/run entry combinations do not imply 12 business runs, complete engineering initialization, or host installation/loading.
<!-- release-skill:changelog:end version=0.29.0 locale=en -->


<!-- release-skill:changelog:start version=0.28.0 locale=en baseline=sha256:195d37dfb12de08a7a402198ea41f1a3afa16166777676aa8d1a195e96e521dd -->
## [0.28.0] - 2026-10-24

Foundation Adoption Review 0.28.0 maintains three Skill entrypoints and advances in lockstep with the Windows-capable Foundation packages.

### Changed

- The existing initialization wiring reference now includes explicit Windows projection arguments and v3 documentation. The Skill business instructions and fixed responsibilities remain unchanged.

### Upgrade Notes

Install the Plugin at exactly 0.28.0 alongside the three npm packages. Selected manual WorkBuddy evidence does not imply automatic host building, nor does it cover every model or supported host. Installation, actual loading, setup, and business completion are distinct phases; this note does not substitute for post-publish verification.
<!-- release-skill:changelog:end version=0.28.0 locale=en -->


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
