# Pre-Lesson 1.1.8 — Academy Architecture, Content Integrity & Governance Stabilization

**Classification:** Academy-only architecture/governance maintenance, **not a lesson**.  
**Execution date:** 2026-11-20.  
**Academy baseline:** `7e446b27758bc9f42c737a7fe464155025fc94e2`.  
**Java read-only baseline:** `081d1f1a877772e41d7a30ce0052e9609c71f6b5`.  
**Academy PR:** [#10](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/10).  
**Status:** Implementation candidate; merged SHA, final test counts and post-merge results must be filled **only after executed evidence is read**.

## Confirmed pre-change risks

- Lesson registration duplicated across `App.tsx`, `CourseOutline.tsx`, `sectionNavigation.ts` and reader hard-coded lesson IDs.
- Topic navigation and lab placement depended on numeric paragraph/section indexes, with no stable semantic anchor contract.
- Homepage/blueprint current-tense copy described only 1.1.1–1.1.2 and the first 13-test Java checkpoint while 1.1.7 had been verified.
- Visual Textbook V2 overview carried first-two-lessons historical wording as if it still defined the whole academy.
- No npm lockfile; CI used mutable range resolution with `npm install`.
- Content audit checked topic counts and keywords, not an explicit blueprint-to-topic structural pointer map.
- Java-backed TS models had separately tested behavior but no reviewed, source-pinned expectation/parity fixture.
- `main` was unprotected in GitHub; only manual PR/CI discipline applied.

## Stabilization changes and owner boundaries

1. **One typed authored registry:** `src/lessons/registry.tsx` owns seven lessons' components, canonical source references, 126 reviewed topic IDs, concise navigation labels, frozen original numeric link values and 31 unique source-passage lab anchors. The sidebar and App route consume the registry; the old navigation module is a compatibility view, not another list.
2. **Link and visual stability:** `?topic=stable-id` provides a durable new link; original `?section=N` links map via frozen `legacySection`. Reader lab placement matches a unique source marker; missing anchors are visible rather than silently dropping the interactive component.
3. **Source fidelity:** `content/coverage/manuscript-baselines.json` pins the exact pre-stabilization seven Git blob hashes; manuscripts are not changed. `scripts/check-academy-governance.mjs` verifies checksums, link targets and blueprint structural anchors. Automated checks are *not expert instructional correctness certification*.
4. **Blueprint coverage:** `content/coverage/cluster-1.1-authored.json` provides structural pointers across all eleven blueprint fields and existing lesson/tests, with expert review explicitly pending.
5. **Reviewed model evidence:** `content/evidence/java-model-parity.json` pins pure Java state/guard scenarios to source/test/CI SHAs. Vitest compares selected TypeScript outcomes; it never executes Java, merchant, kitchen, or provider actions.
6. **Reproducibility:** Commit `package-lock.json`, maintain the prior Rollup override, switch both CI workflows to `npm ci` under Node 22. The temporary lockfile-generation workflow is removed before merge.
7. **Docs:** README, homepage/blueprint and Visual Textbook V2 updated to distinguish current seven-lesson progress from historical Java milestones and conceptual diagrams. [Current state](../docs/architecture/ACADEMY_CURRENT_STATE.md), [authoring preflight](../docs/governance/LESSON_AUTHORING.md), [branch-protection owner action](../docs/governance/BRANCH_PROTECTION.md).
8. **Verification:** Regression fixtures for invalid metadata, labs, source edits, coverage and links; all-seven source/reading checks; reviewed parity tests; desktop Chromium stable+legacy links, topic/lab counts, themes and route regressions.

## Preserved behavior and deferred scope

- All complete `content/lessons/1.1.1.md`–`1.1.7.md` manuscripts are byte-identical to the baseline (CI must verify).
- Visual Textbook V2: continuous reading, one left outline, dark/light themes, meaningful diagrams and 31 learning interactions, desktop-first tests, no mandatory guided reading/cards.
- No Java file edits, no microservices, no new merchant/payment/kitchen effects, no business policy approval, no Lesson 1.1.8 implementation.
- Generic app-page extraction, massive CSS/component refactoring, new backend/LMS, automated human-learning certification, full-text search and comprehensive screenshot baseline program deferred until independently justified.
- GitHub branch protection remains unconfigured; the connector cannot mutate repository-admin rules.

## Executed-evidence ledger

| Gate | Result |
|---|---|
| Node 22 clean install using `npm ci` | Pending |
| `node scripts/check-content.mjs` and `node scripts/check-academy-governance.mjs` | Pending |
| `node --test scripts/test-academy-governance.mjs` and progress validator fixtures | Pending |
| `npm run typecheck` | Pending |
| `npm test` | Pending |
| `npm run build` | Pending |
| `npm run test:e2e` desktop Chromium | Pending |
| Academy PR merged SHA and post-merge evidence | Pending |

**These are pending until actual GitHub CI logs are inspected.** Initial failed feature runs, if any, must be reported and corrected; do not relabel failures as passes.

## Mandatory next dependency

Before Lesson 1.1.8, execute [authoring preflight](../docs/governance/LESSON_AUTHORING.md) against fresh academy and Java SHAs and actual CI, establish scope, source topic IDs, blueprint requirements, context-specific labs, evidence authority and test plan. The Java platform continues its own governance contract independently.
