# Changelog

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
