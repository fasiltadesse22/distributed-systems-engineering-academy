# Academy Learning Progress — Authoritative Ledger

**Updated:** 2026-11-20 (academy stabilization implementation merged; Lesson 1.1.8 not started)  
**Roadmap:** [Master Roadmap V1.0](../roadmap/MASTER_ROADMAP_V1.md) · 19 phases / 93 clusters  
**Academy:** https://github.com/fasiltadesse22/distributed-systems-engineering-academy  
**Application:** https://github.com/fasiltadesse22/food-ordering-platform-new

**Current status authority:** the table below is the *only active* lesson-status register. Later dated paragraphs are retained as **HISTORICAL execution snapshots** and must not be interpreted as live branch/merge state. A new lesson update must reconcile the row rather than append only a later paragraph.

## Verified checkpoints

| Scope | Status | Evidence | Java platform |
|---|---|---|---|
| Phase 0 — Academy V0.1 foundation, roadmap, blueprint and race lab | Verified | [Phase 0 checkpoint](../../checkpoints/PHASE_0_ACADEMY_V0_1.md) | Planning-only |
| Pre-1.1.8 academy architecture/governance stabilization (NOT a lesson) | **Implementation merged; 77 unit + 52 Chromium feature tests passed; post-merge browser verification pending** | [Governance checkpoint](../../checkpoints/PRE_1_1_8_ACADEMY_ARCHITECTURE_STABILIZATION.md); [PR #10](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/10) | Java read-only, unchanged |
| Cluster 1.1 → Chapter 1 → Lesson 1.1.1: actors, goals, responsibilities and capabilities | **Authored, interactive, browser-verified** | [Lesson checkpoint](../../checkpoints/LESSON_1_1_1.md) | **Unchanged** |
| Lesson 1.1.2: business scenarios and use-case discovery | **Complete, 14 authored sections and interactive lab, browser verified** | [Lesson checkpoint](../../checkpoints/LESSON_1_1_2.md); [Java runtime CI](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42514283048) | **Running Java 21 / Spring Boot intake checkpoint** |
| Lesson 1.1.3: commands, decisions, facts and events | **Complete; academy and Java verified** | [Lesson checkpoint](../../checkpoints/LESSON_1_1_3.md), [deep manuscript](../../content/lessons/1.1.3.md), [applied Java walkthrough](../engineering/LESSON_1_1_3_APPLIED_WALKTHROUGH.md), [academy CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608082), [browser CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608081) | [Verified Java 18-test checkpoint](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42590153411) |
| Lesson 1.1.4: business identity and authoritative state | **Complete; Java and desktop academy verified** | [Checkpoint](../../checkpoints/LESSON_1_1_4.md), [deep manuscript](../../content/lessons/1.1.4.md), [Java walkthrough](../engineering/LESSON_1_1_4_APPLIED_WALKTHROUGH.md), [55-test academy CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42792595968), [36-test desktop Chromium CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42792596406) | [Typed IDs and create-only repository; 30 Java tests and HTTP smoke](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42782082917) |
| Lesson 1.1.5: complete workflow story | **Academy implementation and desktop CI verified** | [Manuscript](../../content/lessons/1.1.5.md), [process map](../domain/CLUSTER_1_1_LESSON_1_1_5_WORKFLOW_PROCESS_MAP.md), [decision register](../domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md), [checkpoint](../../checkpoints/LESSON_1_1_5.md), [59-test standard CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44050308806), [39-test desktop Chromium CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44050308781) | **Unchanged; pinned 1.1.4 intake evidence** |
| Lesson 1.1.6: workflows versus state machines | **Merged and post-merge verified: 63 unit + 43 desktop tests** | [Manuscript](../../content/lessons/1.1.6.md), [checkpoint](../../checkpoints/LESSON_1_1_6.md), three independent graphs, transition inspector and scenario lab | [Merged Java PR #3](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/3) · [post-merge 34-test runtime CI](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44054521893) |
| Lesson 1.1.7 — Guards, preconditions, postconditions | **Merged and post-merge verified: 69 unit + 48 desktop tests passed** | [Complete 26-topic manuscript](../../content/lessons/1.1.7.md), [checkpoint](../../checkpoints/LESSON_1_1_7.md), [applied Java walkthrough](../engineering/LESSON_1_1_7_APPLIED_WALKTHROUGH.md), guard inspector, decision tables and prediction lab | [Merged Java PR #4](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/4); [post-merge 59-test runtime CI](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071) |
| Lessons 1.1.8–1.1.20 | Not started | Blueprint only | Deferred |

**Next lesson:** 1.1.8 is **not started**. Pre-1.1.8 governance stabilization is a non-lesson repository-maintenance task, not a completed lesson or a change to roadmap scope.

## Current learning assets

- [Full Lesson 1.1.1 manuscript](../../content/lessons/1.1.1.md).
- [Full Lesson 1.1.2 manuscript](../../content/lessons/1.1.2.md).
- [Full Lesson 1.1.3 manuscript](../../content/lessons/1.1.3.md), 16 topics with a command/fact visual and deterministic predictive lab.
- [Full Lesson 1.1.4 manuscript](../../content/lessons/1.1.4.md), 16 topics, identity/authority map, projection flow and seven-scenario prediction lab (desktop-first).
- [Applied Java execution walkthrough](../engineering/LESSON_1_1_2_APPLIED_WALKTHROUGH.md) with pinned Java source and test links.
- React route: /#/lesson/1.1.2; interactive Use-Case Explorer, Scenario Studio, Acceptance Explorer, source trace, evidence room, diagnosis and defense.
- [Domain discovery contract](../domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md).
- React route: `/#/lesson/1.1.1`, with 13 deep-learning sections and working pedagogical interactions.
- [Cluster 1.1 blueprint](../blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md) remains the full remaining scope contract.

## Evidence language

A working academy simulator is educational modeling; it is **not** a verified Java business workflow. The discovery contract is an explicit business model, not an externally approved merchant policy. The separate Java repository implements order-request intake with typed OrderId/CustomerId/RestaurantId, explicit typed decisions and a matching post-save local fact, pinned at [ea17135cdc1974d89d78ce78931bb63cc5e9544e](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/ea17135cdc1974d89d78ce78931bb63cc5e9544e). Java CI passed 30 tests, packaged the jar and executed actual 201/422 HTTP smoke. There is no merchant acceptance, payment provider, durable data or authenticated customer. CI verifies source code in specific immutable academy commits, not future runtime guarantees.

## HISTORICAL execution note — written before Lesson 1.1.6 merged

**Lesson 1.1.5 implementation** is verified at academy commit `09589ccabf703ce648b7775e9ef1bb113021f646`: 59 unit/component tests and 39 desktop Chromium tests passed with content audit, TypeScript and build. The documentation/merge checkpoint is subsequent and must be checked separately. Lesson 1.1.6 is under implementation in independent academy and Java branches. Java transition models are pure and only locally verified; merchant, payment and fulfillment effects remain conceptual.


## HISTORICAL Visual Textbook V2 presentation rebuild — 2026-11-09

The authored Lessons 1.1.1 and 1.1.2 now use a source-preserving continuous technical reading canvas with contextual labs and minimal card nesting. The authoritative manuscripts and Java project remain unchanged. See [V2 design contract](../design/VISUAL_TEXTBOOK_V2.md) and [V2 verification checkpoint](../../checkpoints/VISUAL_TEXTBOOK_V2.md). Verified academy implementation commit `3ae5bd33e6d65c644c13756d8a525d9ccd48ac64` passed [37 unit/component tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42587354710) and [24 Chromium browser tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42587354632). Visual presentation is new; Java production capabilities are unchanged.


## HISTORICAL Lesson 1.1.3 applied evolution — 2026-11-09

The [Java project](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d) now returns explicit typed PlaceOrder decisions and a local OrderRequestRecorded fact only after normal repository save. [Post-merge CI 42590153411](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42590153411) passed 18 Maven tests and real packaged-app HTTP 201/422 smoke. The academy adds 16 deep-learning topics, a static causal-flow illustration and a deterministic browser simulation. The academy's verified lesson revision [ef6b443487b866c8bb434f1b999fe36d747bf146](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/ef6b443487b866c8bb434f1b999fe36d747bf146) passed [45 unit/component tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608082) and [30 Chromium browser tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608081), plus TypeScript, source audit and production build. The checkpoint documentation commit is subsequent and requires its own green CI for final integration.


## Lesson 1.1.4 desktop-first checkpoint — 2026-11-10

The verified academy code [`2d502b79670ad058596448c55b61706d88283712`](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/2d502b79670ad058596448c55b61706d88283712) passed [55 unit/component tests, content audit, TypeScript and build](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42792595968) and [36 Chromium browser tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42792596406). Two new-lesson mobile-only E2E checks were deliberately removed because the user studies on desktop; future lessons should require desktop browser verification rather than mobile acceptance. The Java repo's [post-merge run](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42782082917) passed 30 tests plus HTTP smoke. The academy checkpoint-documentation commit follows these verified implementation runs and must itself be checked before merge.


## HISTORICAL Lesson 1.1.5 verification snapshot — 2026-11-17

At [academy revision `09589ccabf703ce648b7775e9ef1bb113021f646`](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/09589ccabf703ce648b7775e9ef1bb113021f646), [standard run 44050308806](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44050308806) passed source audit, TypeScript, 59/59 Vitest tests, and production build. [Chromium run 44050308781](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44050308781) passed 39/39 desktop browser tests. The lesson has 22 topics, a branching actor journey, milestone authority overlay, six-case prediction lab, retained process map, ten unresolved policy decisions, and a truthful Java evidence boundary. There is no Java repository change. Documentation and merge are separate later commits whose CI must be inspected before final integration claims.


## HISTORICAL Lesson 1.1.6 candidate snapshot — 2026-11-17

Java feature revision `7c89a3e9ece643b486d6132613d12e1424312cb6` passed [34-test Maven and live HTTP CI](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44052994889). The academy's 19-topic manuscript, side-by-side state graphs, authority inspector, independent workflow overlay and prediction lab have been authored; the academy [63-test standard CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44055454529) and [43-test desktop Chromium CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44055454305) passed at code revision `7627f7a88556f000410d635ca6d76a45629e1bf6`. Post-documentation/merge checks must still be recorded. The unresolved business-policy register remains authoritative. No production merchant/provider effect or cross-service orchestration is implemented.


## HISTORICAL Lesson 1.1.7 execution candidate snapshot — 2026-11-20

Latest original main baselines: academy `bf9f335eeada413b71433d394fab2e730ce7bc27`; Java `79024c3c36fe1a8cc6f71b79505601894d927507`. Java feature revision `048b2322456951e6fc01b54889e851f96b8820d9` passed [59-test Maven, packaging and HTTP 201/422 run 44743299092](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44743299092). The academy's 26-section manuscript, eleven/six-rule inspectors, total transition tables, before/after no-op display, commit timeline and eight-case prediction lab are authored. Academy CI/desktop/browser verification and separate PR merges must be recorded later from real results. No real merchant/kitchen/provider effects; no policy approval; no Lesson 1.1.8 implementation.


**Verified Lesson 1.1.7 pre-merge acceptance:** academy revision `e6e3b35c3d98ed90a32cf4341d918a3a67e8ba71` passed [69/69 Vitest](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44745213798), content audit, TypeScript and production build, and [48/48 desktop Chromium tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44745213877). Java merged SHA `8c5e5144b40adbd8679f4fe3f8046020b0279d2b` passed [59/59 JUnit, package and live HTTP smoke](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071). Academy documentation-finalization commit and eventual merge must still be checked independently.


## HISTORICAL Lesson 1.1.7 verified finalization — 2026-11-20

**Both repositories independently merged and verified.** Java [PR #4](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/4) merged SHA `8c5e5144b40adbd8679f4fe3f8046020b0279d2b`, [CI 44745491071](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071) (59 JUnit tests, packaged Spring Boot and real HTTP 201/422). Academy [PR #7](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/7) merged SHA `1708a94cf4a78c05b582cab9d86d1948ca62571f`, [CI 44746432638](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44746432638) (26-topic content audit, TS, 69/69 tests, build) and [desktop Chromium 44746432701](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44746432701) (48/48 tests). [Full frozen checkpoint](../../checkpoints/LESSON_1_1_7.md). No new external merchant/kitchen/payment authority or approved POL-01–POL-10. Lesson 1.1.8 not started.


## HISTORICAL Academy pre-1.1.8 architecture stabilization — 2026-11-20

This was a **non-lesson governance milestone**, not progress on Lesson 1.1.8. Academy [PR #10](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/10) merged implementation `9b79168d1efa2f37adf1aec72f0d9cf5a9b280ee`; feature [standard CI 44777764798](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44777764798) (77/77 Vitest, 18 test files, governance, TypeScript and production build) and [Chromium 44777764661](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44777764661) (52/52 tests) passed. Merged implementation [standard CI 44778169985](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44778169985) also passed; merged-implementation Chromium [run 44778170055](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44778170055) was pending when this text was first drafted. [Frozen governance checkpoint](../../checkpoints/PRE_1_1_8_ACADEMY_ARCHITECTURE_STABILIZATION.md) owns the final evidence. Java remained read-only at `081d1f1a877772e41d7a30ce0052e9609c71f6b5`; no unresolved business policy was approved.
