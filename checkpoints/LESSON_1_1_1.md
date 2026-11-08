# Lesson 1.1.1 — Authoritative Delivery and Verification Checkpoint

**Scope:** Cluster 1.1 / Chapter 1 / Lesson 1.1.1 — Actors, Goals, Responsibilities and Capabilities  
**Recorded:** 2026-11-08  
**Classification:** Type C conceptual domain-discovery + Type D academy implementation  
**Roadmap:** [Master Roadmap V1.0](../docs/roadmap/MASTER_ROADMAP_V1.md)  
**Blueprint:** [Cluster 1.1 Blueprint V0.1](../docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md)  
**Lesson manuscript:** [1.1.1.md](../content/lessons/1.1.1.md)  
**Domain artifact:** [Domain Discovery Contract](../docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md)

## Immutable baselines and evidence

- **Academy baseline before execution:** `694d6d8bbe0b70384ede6ba7ad813e985847e1de` (Phase 0 browser-tested fix).
- **Academy verified lesson source SHA:** [`5ff2f3109e726f8b64253f28cc4bd732ff4eda82`](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/commit/5ff2f3109e726f8b64253f28cc4bd732ff4eda82).
- **Standard CI run:** [#42510817371](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42510817371) — success.
- **Chromium browser run:** [#42510817344](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42510817344) — success.
- **Food Ordering Platform baseline and unchanged HEAD:** [`2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb`](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb).

This checkpoint document is added *after* the referenced source-verification SHA. Its future documentation-only commit should not be represented as having been included in the earlier CI source revision; inspect its own run if required.

## Actual source deliverables

### Teaching content

- `content/lessons/1.1.1.md` — **13 sections, approximately 4,500 words**, all nine learning stages (Orient, Understand, Explore, Predict, Engineer, Verify, Diagnose, Defend, Retain).
- Covers actor vs stakeholder vs role vs domain entity vs software service; actors' goals, incentives and opposing forces; capabilities, use cases, responsibilities and organizational accountability; scoped authority for requests, policy, decisions and externally confirmed facts; model ambiguity and alternatives; merchant rejection, payment-provider uncertainty, cancellation/refund outcomes; incident diagnosis; communication and unfamiliar-domain transfer.
- `docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md` — detailed actor/stakeholder inventory, capability and RACI-like responsibility map, decision authority matrix, six worked scenarios, open conflicts and stakeholder questions, Lesson 1.1.2 entry conditions.

### React academy changes

- `src/lessons/lesson111/Lesson111.tsx` — full deep-learning lesson reader with 13 navigable sections, embedded visual models, glossary, section progress, and evidence boundary.
- `src/lessons/lesson111/ActorAuthorityAtlas.tsx` — select one of seven actors, view incentives, responsibilities, authoritative facts, observed facts and dependencies; change authority allocations across ten decision types and receive policy-conflict feedback.
- `src/lessons/lesson111/WorkflowStudio.tsx` — alter restaurant acceptance/rejection, provider approved/declined/unknown outcomes, late cancellation exception and refund pending/confirmed/rejected results; predict before reveal and see a causal timeline and defensible customer messages.
- `src/lessons/lesson111/Exercises.tsx` — six progressive ownership questions, synthetic incident evidence caseboard with competing hypotheses, and audience-adapted Staff/stakeholder communication exercise.
- `src/lessons/lesson111/model.ts` — pure domain modeling data and deterministic outcomes; all examples explicitly labeled illustrative.
- `src/lessons/lesson111/lesson.css` — responsive lesson-specific styling with keyboard-accessible form controls and reduced-motion accommodation.
- `src/App.tsx` — routes `/#/lesson/1.1.1` to the authored lesson while preserving blueprint-only readers for future lessons; updates discoverability/copy.
- `scripts/check-content.mjs` — audits all 13 authored sections, nine learning stages and domain-discovery contents.

### New verification assets

- `src/lessons/lesson111/model.test.ts` — domain policy, authority and workflow model tests.
- `src/lessons/lesson111/Lesson111.test.tsx` — authored lesson/interactive markup tests.
- `e2e/lesson111.spec.ts` — actual Chromium navigation, blank-root regression, authority reassignment, branching outcomes, assessment/diagnosis, plus existing lab regression.

## Executed verification (source SHA 5ff2f310)

| Verification | Observed result | Limit |
|---|---|---|
| `node scripts/check-content.mjs` | **Passed**; 19 phases, 93 clusters, 4 chapters, 20 specs, 13 authored sections | Coverage checks, not proof of business approval |
| `npm install --no-audit --no-fund` | **Passed** | No pinned lockfile in current repo |
| `npm run typecheck` | **Passed** | Compile-time checks only |
| `npm run test` | **25/25 passed, 5 test files** | Deterministic toy model and server-rendered components |
| `npm run build` | **Passed**; Vite 7.3.7 | Build is not a hosted deployment |
| `npm run test:e2e` (Chromium) | **7/7 passed**; includes 5 lesson browser tests + 2 original smoke tests | Chromium only, not cross-browser/accessibility audit |

Both pipelines completed successfully. The previously observed blank React root was covered by actual Chromium tests. No new Java or Maven tests were performed.

## Learning experiment boundaries

The atlas flags policy disagreements relative to an explicit teaching baseline. The branching journey is a **deterministic product-policy model** with selected pay-after-accept semantics. The caseboard supplies **synthetic evidence only**; it cannot establish the real root cause of a live outage. The authority quiz demonstrates a learner's comparison against declared policy, not business consensus.

### Open policies and risks

- Payment timing; authorization vs capture vs settlement; provider callback semantics.
- Post-accept cancellation, cost allocation, partial item rejection, override authority and refund-approval limits.
- Refund status versus bank posting and customer promise wording; delayed/unknown outcomes and dispute resolution.
- Later concurrency enforcement, authoritative transactional persistence, duplicate effects and payment reconciliation remain unimplemented.
- Browser tests verify selected routes/interactions, but a manual accessibility audit, mobile visual QA, production hosting and learner progress persistence have **not** been executed or implemented.
- npm uses semver ranges with npm install; commit and enforce a lockfile before claiming reproducible dependency resolution.

## Lesson exit and handoff

The necessary domain-discovery artifacts, visual teaching path, model counterexamples, understanding checks and Staff-level defense prompts have been delivered, and the specific academy code paths above are verified. The business authority choices remain **provisional until stakeholder approval**.

**Next:** Lesson 1.1.2 — derive a runnable, narrow, meaningful PlaceOrder/business scenario vertical slice in the separate Java repo, with real Maven verify and CI evidence. Do not assume payment processing, remote services or stronger guarantees than were actually implemented.
