# Lesson 1.1.5 — Workflow Story · Implementation Candidate Checkpoint

**Status:** Implementation and desktop acceptance verified on immutable academy code revision `09589ccabf703ce648b7775e9ef1bb113021f646`. Documentation update and final merge verification are subsequent gates; do not conflate them.

## Source contract
- Roadmap: `docs/roadmap/MASTER_ROADMAP_V1.md`; blueprint: `docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md`, Lesson 1.1.5.
- Classification: Type C conceptual analysis + Type D React academy evolution.
- Academy pre-change `main` baseline: `bb254f35d2f74b090b034052fc816ab317b0e3e0`. Prior verified Lesson 1.1.4 evidence is separate.
- Java baseline: `ea17135cdc1974d89d78ce78931bb63cc5e9544e`; [previous CI evidence, 30 tests and 201/422 HTTP smoke](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42782082917).
- No Java production-code changes are part of this lesson.

## Authored assets
- Deep-learning manuscript: `content/lessons/1.1.5.md`, with 22 connected instructional topics.
- Process map: `docs/domain/CLUSTER_1_1_LESSON_1_1_5_WORKFLOW_PROCESS_MAP.md` (existing artifact retained).
- Open business policy register: `docs/domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md` (POL-01–POL-10; all remain unresolved).
- Visual Textbook V2 integration: `src/lessons/lesson115/Lesson115.tsx` and `Mechanisms.tsx`, integrated in the same `TextbookReader`, `CourseOutline` and `App` route.
- Model: `src/lessons/lesson115/model.ts` — six deterministic illustrative outcomes.
- UI: swimlane of business authorities, milestone/authority ledger, and predict-before-reveal scenario explorer.
- Tests: `src/lessons/lesson115/lesson.test.ts` and extended `scripts/check-content.mjs`.

## Business and evidence boundaries
- Only process-local intake is implemented in the pinned Java app; 201 proves neither merchant acceptance nor payment.
- The swimlane's merchant, provider, kitchen and delivery participants are conceptual actors, **not deployed microservices**.
- The scenario explorer is deterministic educational reasoning, not a Java runtime test or a measured financial outcome.
- Cancellation requested ≠ cancellation approved; provider acceptance-for-processing ≠ refund confirmed; pickup ≠ delivery.
- All unresolved business policy outcomes must remain labeled policy-dependent.

## Verification ledger (to be completed with real output)
| Gate | Command or procedure | Status |
|---|---|---|
| Source and roadmap consistency | `npm run check:content` | **Passed**, CI 44050308806, 22 teaching topics and business documents |
| TS compile | `npm run typecheck` | **Passed**, CI 44050308806 |
| Unit / component | `npm run test` | **Passed**, 59/59 tests, 14 files, CI 44050308806 |
| Production | `npm run build` | **Passed**, CI 44050308806 |
| Desktop Chromium | `npm run test:e2e` with desktop target | **Passed**, 39/39 tests, CI 44050308781 |
| CI | inspect actual immutable GitHub Actions run | **Passed** on 09589cc; [standard](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44050308806), [browser](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44050308781) |
| Prior lesson regression | verify routes 1.1.1–1.1.4 | **Passed** in browser test suite |
| Browser UX | route, continuous reading, dark/light, sidebar, back/forward, keyboard | **Desktop suite passed** for included assertions; not an independent manual visual assessment |

The cited code checkpoint passed actual automated CI. This documentation commit, PR merge and any post-merge verification require their own recorded results; do not infer them from the prior commit.

## Dependency
Only after verification and a successful merge may Lesson 1.1.6 begin formal Order, PaymentAttempt and RestaurantDecision state-machine derivation. Do not infer that this narrative approved POL-01–POL-10.
