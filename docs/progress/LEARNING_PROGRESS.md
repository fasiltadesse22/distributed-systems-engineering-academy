# Academy Learning Progress — Authoritative Ledger

**Updated:** 2026-11-08  
**Roadmap:** [Master Roadmap V1.0](../roadmap/MASTER_ROADMAP_V1.md) · 19 phases / 93 clusters  
**Academy:** https://github.com/fasiltadesse22/distributed-systems-engineering-academy  
**Application:** https://github.com/fasiltadesse22/food-ordering-platform-new

## Verified checkpoints

| Scope | Status | Evidence | Java platform |
|---|---|---|---|
| Phase 0 — Academy V0.1 foundation, roadmap, blueprint and race lab | Verified | [Phase 0 checkpoint](../../checkpoints/PHASE_0_ACADEMY_V0_1.md) | Planning-only |
| Cluster 1.1 → Chapter 1 → Lesson 1.1.1: actors, goals, responsibilities and capabilities | **Authored, interactive, browser-verified** | [Lesson checkpoint](../../checkpoints/LESSON_1_1_1.md) | **Unchanged** |
| Lesson 1.1.2: business scenarios and use-case discovery | **Complete, 14 authored sections and interactive lab, browser verified** | [Lesson checkpoint](../../checkpoints/LESSON_1_1_2.md); [Java runtime CI](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42514283048) | **Running Java 21 / Spring Boot intake checkpoint** |
| Lessons 1.1.3–1.1.20 | Not started | Blueprint only | Deferred |

## Current learning assets

- [Full Lesson 1.1.1 manuscript](../../content/lessons/1.1.1.md).
- [Full Lesson 1.1.2 manuscript](../../content/lessons/1.1.2.md).
- [Applied Java execution walkthrough](../engineering/LESSON_1_1_2_APPLIED_WALKTHROUGH.md) with pinned Java source and test links.
- React route: /#/lesson/1.1.2; interactive Use-Case Explorer, Scenario Studio, Acceptance Explorer, source trace, evidence room, diagnosis and defense.
- [Domain discovery contract](../domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md).
- React route: `/#/lesson/1.1.1`, with 13 deep-learning sections and working pedagogical interactions.
- [Cluster 1.1 blueprint](../blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md) remains the full remaining scope contract.

## Evidence language

A working academy simulator is educational modeling; it is **not** a verified Java business workflow. The discovery contract is an explicit business model, not an externally approved merchant policy. The separate Java repository now implements only order-request intake, pinned at [08b33714431a53f6b1cb1e1e09718b0281da1ce8](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/08b33714431a53f6b1cb1e1e09718b0281da1ce8). Java CI passed 13 tests, packaged the jar and executed actual 201/422 HTTP smoke. There is no merchant acceptance, payment provider, durable data or authenticated customer. CI verifies source code in specific immutable academy commits, not future runtime guarantees.

## Next execution

**Lesson 1.1.3 — Commands, decisions, facts and events**, only when requested. Build from the verified Java PlaceOrder request-intake fact and distinguish customer command intention from business outcome, without prematurely introducing Kafka, service extraction or event sourcing.


## Visual Textbook V2 presentation rebuild — 2026-11-09

The authored Lessons 1.1.1 and 1.1.2 now use a source-preserving continuous technical reading canvas with contextual labs and minimal card nesting. The authoritative manuscripts and Java project remain unchanged. See [V2 design contract](../design/VISUAL_TEXTBOOK_V2.md) and [V2 verification checkpoint](../../checkpoints/VISUAL_TEXTBOOK_V2.md). Verified academy implementation commit `3ae5bd33e6d65c644c13756d8a525d9ccd48ac64` passed [37 unit/component tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42587354710) and [24 Chromium browser tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42587354632). Visual presentation is new; Java production capabilities are unchanged.
