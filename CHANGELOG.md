# Changelog

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
