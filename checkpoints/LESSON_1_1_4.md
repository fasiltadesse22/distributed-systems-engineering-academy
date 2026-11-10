# Lesson 1.1.4 — Business Identity and Authoritative State

**Date:** 2026-11-10  
**Classification:** Type A real Java evolution + Type D React academy evolution.  
**Engineering question:** Which identities are stable and which component is entitled to determine a fact?  
**Roadmap:** Master Roadmap V1, Cluster 1.1 / Chapter 1, authoritative Cluster 1.1 blueprint.

## Immutable baselines and Java result

- Academy baseline: [6e701e05b8fdd3b6cc2aed22341d7fb24a699699](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/6e701e05b8fdd3b6cc2aed22341d7fb24a699699) — completed Lesson 1.1.3.
- Java baseline: [225db684a24080f2c4ad1ae6e2f5e259edf0aa7d](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d).
- Verified Java 1.1.4 main commit: [ea17135cdc1974d89d78ce78931bb63cc5e9544e](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/ea17135cdc1974d89d78ce78931bb63cc5e9544e).
- Java implementation [PR #2](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/2) — merged.
- [Java post-merge CI run 42782082917](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42782082917) — **success: 30 JUnit tests, packaged runnable jar, real HTTP 201/422 smoke**.

## Knowledge and Visual Textbook V2 delivery

- Full [Lesson 1.1.4 manuscript](../content/lessons/1.1.4.md): **16 substantive sections**, over **10,000 words** across nine learning stages, from identity/state separation and aliases to authority/projections, typed Java code, actual evidence, diagnosis, Staff-level design review and transfer exercises.
- The same continuous Visual Textbook V2 reader and expandable chapter/lesson/topic navigation; no new redundant study rail or mandatory click-to-reveal prose.
- [Identity/authority illustration](../src/lessons/lesson114/Mechanisms.tsx), displaying implemented ID owners versus conceptual external attempts and derived presentation.
- An integrated static authority→observation→projection→UI sequence, explicitly future/conceptual.
- One deterministic [Identity & Authority Explorer](../src/lessons/lesson114/model.ts) with seven scenarios and predict-before-reveal reasoning. Its cases distinguish tested local Java create-only/non-idempotent behavior from simulated payment/merchant situations.
- [Applied engineering walkthrough](../docs/engineering/LESSON_1_1_4_APPLIED_WALKTHROUGH.md) with immutable Java source/test evidence and critical non-guarantees.

## Real Java state and invariants

The actual Java domain now contains immutable, validated OrderId(UUID), CustomerId(UUID) and RestaurantId(String) records. The Order and post-save OrderRequestRecorded contain typed business references. Application-facing/HTTP raw identifiers remain unchanged for API compatibility, and the returned local fact must refer to the same order, customer and restaurant. The process-local ConcurrentHashMap<OrderId,Order> is the mutable owner of stored snapshots; save uses atomic putIfAbsent to reject silent replacement under an existing ID.

No fake domain mutation, version increment, authenticated customer, actual merchant acceptance, provider attempt/callback, payment capture, durable history or message broker is implemented. Repeated eligible POST is still **non-idempotent** and creates distinct OrderIds. Unknown storage effects remain distinguishable from known business rejection.

## Actual academy verification

The verified academy implementation [`2d502b79670ad058596448c55b61706d88283712`](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/2d502b79670ad058596448c55b61706d88283712) passed:

- [Standard CI run 42792595968](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42792595968): **55/55 Vitest unit/component tests** (13 test files), exact roadmap/blueprint and 16-topic content audit, TypeScript and Vite production build, all successful.
- [Chromium browser run 42792596406](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42792596406): **36/36 Playwright tests** including all six Lesson 1.1.4 desktop tests, the deterministic identity/authority explorer, navigation/deep links and regression checks for prior lessons.
- The two new-lesson 390px mobile-only Playwright tests were intentionally removed by the user's explicit desktop-first request. **Mobile viewport acceptance is not required** for Lesson 1.1.4 and subsequent lessons; responsive CSS remains but is not claimed independently mobile-verified. Historical mobile regression tests for older lessons remain in the suite.

This documentation checkpoint was committed after the verified implementation SHA. The final documentation commit and any merge must receive their own CI before being declared verified on `main`. The [active design contract](../docs/design/VISUAL_TEXTBOOK_V2.md#desktop-first-verification-policy--from-lesson-114-onward) records desktop-first acceptance.

## Why this is the smallest justified evolution

Typed IDs prevent accidental mixing of UUID categories in domain code. A create-only repository ensures state continuity for a specific key in one JVM without inventing a versioned update. The truthful facts remain local; external authorities and projections are taught using clearly identified future conceptual scenarios. Stronger mutable state/versioning, authentication, provider integration, idempotency, durable storage and distributed messaging must be justified by later roadmap contracts and tests.

**Exit gate:** Lesson 1.1.5 (complete Food Ordering workflow story) may begin only after academy verification and checkpoint integration; do not start it in this execution.
