# Lesson 1.1.6 — Workflows versus State Machines

**Status:** Implementation candidate, acceptance verification pending. Do not mark merged/completed before actual academy CI and desktop Chromium passes.

## Scope / source authority
- Exact scope contract: `docs/roadmap/MASTER_ROADMAP_V1.md`, `docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md`, Lesson 1.1.6.
- Classification: Type A Java production-project evolution + Type D academy evolution.
- Academy baseline `8f63c81e086b20af94268da4b0a31084d0333227`; Java pre-lesson baseline `ea17135cdc1974d89d78ce78931bb63cc5e9544e`.
- Java feature commit `7c89a3e9ece643b486d6132613d12e1424312cb6`, [verified by GitHub Actions run 44052994889](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44052994889) — **34/34 JUnit tests**, Maven package, runnable-jar check, live HTTP 201/422 smoke.
- Academic manuscript: `content/lessons/1.1.6.md`, 19 in-depth connected topics.

## Independent lifecycle contracts
- `OrderLifecycle`: NEW → REQUESTED; unchanged OrderId, duplicate intake rejection; closure requires unresolved POL-02. The actual immutable Order exposes an already-recorded `intakeLifecycle()` view. Existing public GET/POST responses are unchanged.
- `RestaurantDecisionLifecycle`: PENDING → ACCEPTED or REJECTED with terminal one-shot decision **only inside a pure illustrative teaching model**; no merchant integration, actor authentication, or production approval of revision policy.
- `PaymentAttemptLifecycle`: NOT_STARTED → SUBMITTED_UNKNOWN → AUTHORIZED/DECLINED/CAPTURED → REFUND_PENDING → REFUNDED under *assumed* correlated evidence. No provider interaction, refund submission, financial settlement or genuine provider confirmation.
- `LifecycleSnapshot`: validates shared OrderId and demonstrates authorized-with-merchant-pending and merchant-rejected-with-refund-pending predicates; it is not an atomic read or cross-entity commit.

## Academy Visual Textbook V2
- Same single continuous TextbookReader and expandable chapter→lesson→topic sidebar.
- Three separate lifecycle graphs; clickable transition inspector shows input, guard, actor authority, fact/no-fact and explicit evidence status.
- Cross-lifecycle overlay changes one modeled history without conflating authority; six-case predict/reveal lab covers partial outcomes, unknowns, attempted refunds and multiple attempts.
- Model tests and browser scenarios distinguish conceptual financial operations from the verified local Java intake.
- Existing Lesson 1.1.5 process map and POL-01–POL-10 decision backlog are preserved; no new universal business policy is approved.

## Verification (to be updated from actual immutable outputs)
| Gate | Result |
|---|---|
| Java Maven / packaged runtime | **PASS** 34/34 JUnit, live 201/422, [run 44052994889](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44052994889) |
| Academy source/roadmap audit | Pending |
| TypeScript | Pending |
| Vitest unit/component | Pending |
| Vite production build | Pending |
| Desktop Chromium / regressions / history / theme | Pending |
| Both separate PR merges and post-merge verification | Pending |

**Limits:** No external payment provider, merchant API, coordination layer, distributed transaction or durability evolution. Cross-lifecycle policy and guards (1.1.7 and 1.1.9) are not implemented here. Mobile-specific new-lesson acceptance is intentionally excluded. Do not start Lesson 1.1.7 until both repository acceptance gates are closed.
