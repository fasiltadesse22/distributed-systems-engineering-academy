# Lesson 1.1.2 — Interactive Academy + Real Java Evolution Checkpoint

**Date:** 2026-11-08  
**Scope:** Cluster 1.1, Chapter 1, Lesson 1.1.2 — Business Scenarios and Use-Case Discovery  
**Classification:** Type A (genuine persistent Java project evolution) + Type D (React interactive academy).  
**Authoritative roadmap:** [Master Roadmap V1.0](../docs/roadmap/MASTER_ROADMAP_V1.md)  
**Derived blueprint:** [Cluster 1.1 Blueprint V0.1](../docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md)  
**Prior domain authority contract:** [Lesson 1.1.1](../docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md)

## 1. Cross-repository immutable baselines

- **Academy baseline before Lesson 1.1.2:** [71decaa39ba8351e250a08be1f32cc5debf22a39](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/71decaa39ba8351e250a08be1f32cc5debf22a39).
- **Academy verified lesson source SHA before documentation checkpoint:** [35f2c9b02f6e9dd27df3b834377cb4825549d781](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/35f2c9b02f6e9dd27df3b834377cb4825549d781).
- **Academy standard CI:** [42514728442](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42514728442) — **success**.
- **Academy Chromium CI:** [42514728540](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42514728540) — **success**.
- **Java planning baseline:** [2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb).
- **Verified Java checkpoint SHA:** [08b33714431a53f6b1cb1e1e09718b0281da1ce8](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/08b33714431a53f6b1cb1e1e09718b0281da1ce8).
- **Java CI:** [42514283048](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42514283048) — **success**, 13 Maven tests and actual HTTP running-jar smoke.

This document is a later documentation checkpoint; the earlier verified academy source SHA does not include this additional Markdown. A subsequent GitHub Actions run must be inspected before claiming the new documentation commit was separately verified.

## 2. Engineering and learning outcome

**Engineering question:** Which end-to-end business outcomes must the platform support, and what can the first runnable use case actually promise?

Business model differentiates Customer intent, Platform intake, Restaurant fulfillment authority, and Payment Provider financial authority. The first implemented Java use case is **UC-001 Submit an Order Request**, not merchant acceptance or payment.

**Java success contract:** HTTP 201 Created + Location to a process-local order-request intake, intakeStatus REQUESTED_AWAITING_RESTAURANT, restaurantDecision PENDING, paymentStatus NOT_STARTED. All pricing and available-item decisions are based on a clearly fictional server-side fixture. Duplicate POSTs are explicitly non-idempotent.

## 3. Academy lesson deliverables

- [Complete authored manuscript](../content/lessons/1.1.2.md) — 14 detailed sections covering Orient, Understand, Explore, Predict, Engineer, Verify, Diagnose, Defend and Retain.
- [Applied engineering walkthrough](../docs/engineering/LESSON_1_1_2_APPLIED_WALKTHROUGH.md) — exact code paths, examples, constraints and verification.
- React route: /#/lesson/1.1.2 — responsive full-learning navigation and progressive sections.
- Use-Case Explorer — primary/supporting actors, triggers, preconditions, authority, main/alternate flows, postconditions and **implemented/conceptual/unresolved** status.
- Business Scenario Studio — change restaurant, item, quantity, duplicate-line policy and conceptual future path; predict 201/400/422 and inspect differences.
- Acceptance Explorer — Given/When/Then, expected request/response, source-linked Java test, scope limitation and actual CI evidence.
- Execution Trace — choose a Java component/decision and open the exact source at a pinned commit; **source-derived illustration**, not recorded OpenTelemetry spans.
- Evidence Panel — separate React modeling, executed Java tests and unverified commercial guarantees.
- Diagnosis Room — distinguish a semantic 201 misunderstanding, missing merchant feature, ephemeral storage, ambiguous retry and customer UI mislabeling.
- Staff communication exercise — defend choices to engineer, Staff reviewer and product stakeholder.
- Transfer exercise — hotel booking and inventory reservation.

**Changed/created React and content files:** content/lessons/1.1.2.md; src/lessons/lesson112/model.ts; src/lessons/lesson112/Lesson112.tsx; src/lessons/lesson112/lesson.css; model.test.ts; Lesson112.test.tsx; e2e/lesson112.spec.ts; src/App.tsx; src/components/LessonReader.tsx; src/data/roadmap.ts; scripts/check-content.mjs; README, progress ledger, walkthrough, this checkpoint.

## 4. Verified academy evidence

On the academy verified source SHA:

- Content audit: **passed**; 19 phases, 93 clusters, four Cluster 1.1 chapters, 20 blueprint lesson specifications; all 14 authored Lesson 1.1.2 sections and nine learning stages.
- npm install — **succeeded** in standard and browser GitHub workflows.
- npm run typecheck — **passed**.
- npm run test — **32 tests passed across 7 files** (includes previous lessons and new models/component rendering).
- npm run build — **passed** (Vite production assets).
- npm run test:e2e — **13 Chromium tests passed**, including six Lesson 1.1.2 scenarios and prior Lesson 1.1.1/race lab/navigation regressions.

A previous browser test attempt found **test-selector ambiguity**, which was corrected and re-executed successfully. A temporary TypeScript unused-import issue after changing the platform source link was also corrected. Failed prior runs remain part of the transparent CI history; only the successful run IDs above are cited as completion evidence.

## 5. Verified Java evidence

On the companion Java checkpoint SHA:

- Java 21 + Spring Boot 4.1.2, one deployable, Maven build.
- Domain/application, HTTP adapter, synthetic menu catalog, volatile repository and correlation logs.
- 7 application unit tests, 1 repository test, 5 Spring MVC integration tests — **13/13 passed**.
- Maven verify and runnable jar packaging — **success**.
- GitHub Actions started the packaged jar on port 18080. Real HTTP POST for an available item returned **201** and the correct pending/no-payment fields. A separate real POST of unavailable item returned **422 ITEM_UNAVAILABLE**. The CI log contains LIVE_HTTP_INTAKE_OK and LIVE_HTTP_BUSINESS_REJECTION_OK.
- [UC-001 specification](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/docs/usecases/UC-001-place-order.md) and [ADR 0001](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/docs/adr/0001-single-deployable-intake.md) record the scope and topology choice.

## 6. Architecture decision and alternatives

**Chosen:** one Spring Boot deployable, minimal in-process application/domain/HTTP/adapter responsibilities, immutable intake record, volatile repository, explicit truthful response.

**Rejected for this milestone:** pre-split Order/Restaurant/Payment microservices; Kafka/Saga/Outbox; unverified provider-payment simulation disguised as real payment; client-provided commercial pricing; unexplained infrastructure.

**Reconsideration triggers:** true merchant decision needs, process-restart durability, authenticated customer requirements, reliable retries, concurrent inventory or payment invariants, independently measured service scaling/release needs. Those forces require later experiments, tests and potentially different architecture.

## 7. Non-guarantees and limitations

- Client customer UUID is unauthenticated; no authorization or safe deployment with real users.
- Static fictional catalog; no merchant-owned live inventory or valid production quotations.
- No restaurant acceptance, payment provider, card authorization/capture/refund, delivery or support.
- Process-local storage is not restart durable; no multi-instance state; no distributed consistency or ordering guarantee.
- Repeated POSTs create distinct IDs; X-Request-ID is diagnostic only, not idempotency.
- React scenario/diagnosis labs are deterministic or synthetic. They do not execute the Java server in the browser.
- Browser CI is Chromium-only; no independent full manual accessibility/visual QA and no hosted academy URL are claimed.
- npm still uses semver manifest installation without a committed lockfile; follow-up foundation hardening should pin npm ci and improve reproducibility.
- No production monitoring, load tests, real payment tests or operation incident evidence.

## 8. Next dependency

**Lesson 1.1.3 — Commands, Decisions, Facts and Events.** Continue from the verified intake code: customer PlaceOrder request is an intention; application checks yield acceptance/rejection; stored Order resource is a local business fact. Do not conflate that fact with merchant acceptance, payment completion, event publication, Kafka or event sourcing. Future changes require justified forces and executed evidence.

**Checkpoint conclusion:** complete for the exact Lesson 1.1.2 scope, with independently verified academy and Java code. Not a claim of a production-ready marketplace.
