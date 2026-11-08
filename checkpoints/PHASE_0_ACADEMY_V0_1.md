# Phase 0 / Academy V0.1 — Evidence and Handoff Manifest

**Checkpoint identity:** PHASE0-ACADEMY-V0.1  
**Recorded:** 2026-11-08  
**Authoritative roadmap:** [Master Roadmap V1.0](../docs/roadmap/MASTER_ROADMAP_V1.md)  
**Contract:** [Dual-repository execution contract](../docs/contracts/DUAL_REPOSITORY_EXECUTION_CONTRACT_V1.md)

## Repositories and immutable baselines

- **Academy baseline at task start:** `7a32fb3345e85c26ad9bb34c9ffa57aa0d8a6e71`.
- **Verified academy source commit:** [`ef00c7a17e0b5e29d295f583ade01094497e0182`](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/commit/ef00c7a17e0b5e29d295f583ade01094497e0182).
- **Verification run:** [Academy V0.1 verification #42507505100](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42507505100) — **success**.
- **Food Ordering Platform planning-only baseline:** [`2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb`](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb). **No Java source, tests, CI or deployment has been created by Phase 0.**

This manifest is a record of the **verified source commit**. It does not imply that its own documentation-only commit is part of the previously executed build; inspect the follow-up workflow before declaring the then-current HEAD verified.

## Engineering question

How can one coherent React learning platform expose **all** the authoritative roadmap scope, a complete Cluster 1.1 blueprint, and at least one meaningful, testable interactive mechanism **without** inventing implemented Java behavior?

## Predicted vs observed outcomes

| Question | Prediction | Observed evidence | Classification |
|---|---|---|---|
| Source coverage | 19 phases and 93 cluster definitions remain indexed | `node scripts/check-content.mjs` passed on the verified commit | Observed in CI |
| Cluster 1.1 blueprint coverage | 4 chapters / 20 planned lessons and required failure types mapped | Content integrity script passed | Observed static scope check, not proof of pedagogical completeness |
| TypeScript | React academy and simulator typecheck | `npm run typecheck` succeeded | Observed in CI |
| Simulator unit cases | Unsafe overlapping reads can yield two successful incompatible outcomes; atomic strategy rejects second stale commit | `npm run test` passed, **11 tests across 3 test files** | Observed deterministic model tests only |
| React components | Blueprint lesson, dependency explorer and lab control surface render | Server-side component markup assertions passed in Vitest | Observed component rendering; not a real browser UI run |
| Vite production output | Application builds into distributable assets | `npm run build` succeeded; Vite v7.3.7 emitted `dist/` assets | Observed in CI, not proof of deployment or browser runtime |

## Commands actually executed on GitHub Actions (Ubuntu runner, Node 22)

1. `node scripts/check-content.mjs`
2. `npm install --no-audit --no-fund`
3. `npm run typecheck` (`tsc --noEmit`)
4. `npm run test` (`vitest run`)
5. `npm run build` (`tsc --noEmit && vite build`)

**Actual results for run #42507505100:** all five listed checks completed successfully. **11/11 tests passed**. Production artifacts were created. No Java/Maven commands were executed.

## Files and architecture

**Authoritative content:** `docs/roadmap/MASTER_ROADMAP_V1.md`, `docs/contracts/DUAL_REPOSITORY_EXECUTION_CONTRACT_V1.md`, `content/cluster-1.1/blueprint.json`, `docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md`.

**React app:** `src/main.tsx`, `src/App.tsx`, `src/styles.css`, `src/data/roadmap.ts`, component readers/visual primitives, and `src/simulation/race.ts`.

**Verification:** `scripts/check-content.mjs`, Vitest pure-model/component/roadmap tests, `.github/workflows/academy-verify.yml`.

## What works at this checkpoint

- Responsive academy navigation, light/dark theme and keyboard-usable links and controls.
- Full phase/cluster explorer and source Markdown reader from authoritative roadmap; search over cluster and planned-lesson names.
- Complete Cluster 1.1 blueprint reader with chapters, dependencies, project-evolution stages, roadmap coverage and laboratory briefs.
- Planned-lesson specification pages. They do **not** masquerade as authored deep-learning manuscripts.
- LAB-11-01: choose sequential versus overlapping Cancel/Accept reads; unsafe blind write versus atomic modeled guard; optional repeated cancellation; predict outcome and reveal state diagram, execution timeline and invariant interpretation.
- Simulator is deterministic and separated from UI so it can be tested without claiming actual Spring Boot or database enforcement.

## Known fragilities, limitations and deferred mechanisms

- **No browser automation run** yet; only SSR component rendering and build verification. Accessibility and responsive appearance should receive browser-level visual/keyboard QA before public launch.
- **No hosted deployment URL**. A successful Vite build is not equivalent to a deployed site.
- npm currently uses a semver dependency manifest and `npm install`, **not a committed lockfile**. Pin a lockfile and switch to `npm ci` in the next foundation hardening pass for stronger dependency reproducibility.
- Vite emitted a large JS chunk warning; optimize lazy route/source rendering as the academy grows.
- Other four blueprint lab designs are **not implemented**; actual Lesson 1.1.1 full manuscript is **not authored**.
- Race simulations are illustrative; local in-memory synchronization is not proof of DB or cross-process atomicity.
- No external payment processing, Kafka, Redis, Saga, outbox/inbox, microservices, or Kubernetes.
- No claims of tests or performance results from the Food Ordering Platform.

## Forward handoff

1. First complete a deep **Lesson 1.1.1 — Actors, goals, responsibilities and capabilities** in React, including practical actor-authority interaction and communication/mastery challenges.
2. At Lesson 1.1.2, create the first real Java/Spring Boot Food Ordering vertical slice; run Maven verification and CI; link immutable application commit and executed evidence.
3. Preserve the dual-repo contract and evolve React visuals only when they substantively explain mechanisms.
4. Revisit the concurrency model in Lesson 1.1.13 with actual Java runtime evidence, distinguishing model assumptions from DB guarantees.
