# Academy Learning Progress — Authoritative Ledger

**Updated:** 2026-11-09  
**Roadmap:** [Master Roadmap V1.0](../roadmap/MASTER_ROADMAP_V1.md) · 19 phases / 93 clusters  
**Academy:** https://github.com/fasiltadesse22/distributed-systems-engineering-academy  
**Application:** https://github.com/fasiltadesse22/food-ordering-platform-new

## Verified checkpoints

| Scope | Status | Evidence | Java platform |
|---|---|---|---|
| Phase 0 — Academy V0.1 foundation, roadmap, blueprint and race lab | Verified | [Phase 0 checkpoint](../../checkpoints/PHASE_0_ACADEMY_V0_1.md) | Planning-only |
| Cluster 1.1 → Chapter 1 → Lesson 1.1.1: actors, goals, responsibilities and capabilities | **Authored, interactive, browser-verified** | [Lesson checkpoint](../../checkpoints/LESSON_1_1_1.md) | **Unchanged** |
| Lesson 1.1.2: business scenarios and use-case discovery | **Complete, 14 authored sections and interactive lab, browser verified** | [Lesson checkpoint](../../checkpoints/LESSON_1_1_2.md); [Java runtime CI](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42514283048) | **Running Java 21 / Spring Boot intake checkpoint** |
| Lesson 1.1.3: commands, decisions, facts and events | **Complete; academy and Java verified** | [Lesson checkpoint](../../checkpoints/LESSON_1_1_3.md), [deep manuscript](../../content/lessons/1.1.3.md), [applied Java walkthrough](../engineering/LESSON_1_1_3_APPLIED_WALKTHROUGH.md), [academy CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608082), [browser CI](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608081) | [Verified Java 18-test checkpoint](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42590153411) |
| Lessons 1.1.4–1.1.20 | Not started | Blueprint only | Deferred |

## Current learning assets

- [Full Lesson 1.1.1 manuscript](../../content/lessons/1.1.1.md).
- [Full Lesson 1.1.2 manuscript](../../content/lessons/1.1.2.md).
- [Full Lesson 1.1.3 manuscript](../../content/lessons/1.1.3.md), 16 topics with a command/fact visual and deterministic predictive lab.
- [Applied Java execution walkthrough](../engineering/LESSON_1_1_2_APPLIED_WALKTHROUGH.md) with pinned Java source and test links.
- React route: /#/lesson/1.1.2; interactive Use-Case Explorer, Scenario Studio, Acceptance Explorer, source trace, evidence room, diagnosis and defense.
- [Domain discovery contract](../domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md).
- React route: `/#/lesson/1.1.1`, with 13 deep-learning sections and working pedagogical interactions.
- [Cluster 1.1 blueprint](../blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md) remains the full remaining scope contract.

## Evidence language

A working academy simulator is educational modeling; it is **not** a verified Java business workflow. The discovery contract is an explicit business model, not an externally approved merchant policy. The separate Java repository implements order-request intake with explicit typed decisions and a post-save local fact, pinned at [225db684a24080f2c4ad1ae6e2f5e259edf0aa7d](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d). Java CI passed 18 tests, packaged the jar and executed actual 201/422 HTTP smoke. There is no merchant acceptance, payment provider, durable data or authenticated customer. CI verifies source code in specific immutable academy commits, not future runtime guarantees.

## Next execution

**Lesson 1.1.4 — Business identity and authoritative state** follows after final academy verification of Lesson 1.1.3. Build from the stable OrderId, customer, restaurant and request/correlation identities and the typed local fact. Do not prematurely introduce external merchant or provider authority.


## Visual Textbook V2 presentation rebuild — 2026-11-09

The authored Lessons 1.1.1 and 1.1.2 now use a source-preserving continuous technical reading canvas with contextual labs and minimal card nesting. The authoritative manuscripts and Java project remain unchanged. See [V2 design contract](../design/VISUAL_TEXTBOOK_V2.md) and [V2 verification checkpoint](../../checkpoints/VISUAL_TEXTBOOK_V2.md). Verified academy implementation commit `3ae5bd33e6d65c644c13756d8a525d9ccd48ac64` passed [37 unit/component tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42587354710) and [24 Chromium browser tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42587354632). Visual presentation is new; Java production capabilities are unchanged.


## Lesson 1.1.3 applied evolution — 2026-11-09

The [Java project](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d) now returns explicit typed PlaceOrder decisions and a local OrderRequestRecorded fact only after normal repository save. [Post-merge CI 42590153411](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42590153411) passed 18 Maven tests and real packaged-app HTTP 201/422 smoke. The academy adds 16 deep-learning topics, a static causal-flow illustration and a deterministic browser simulation. The academy's verified lesson revision [ef6b443487b866c8bb434f1b999fe36d747bf146](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/ef6b443487b866c8bb434f1b999fe36d747bf146) passed [45 unit/component tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608082) and [30 Chromium browser tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608081), plus TypeScript, source audit and production build. The checkpoint documentation commit is subsequent and requires its own green CI for final integration.
