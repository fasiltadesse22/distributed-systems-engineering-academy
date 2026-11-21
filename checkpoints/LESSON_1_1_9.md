# Lesson 1.1.9 — Ordering, Payment and Restaurant Lifecycle Composition

**Status:** Academy and Java implementations independently MERGED and POST-MERGE VERIFIED. This is a historical evidence checkpoint, not a second engineering contract.

**Scope:** Master Roadmap V1, Cluster 1.1 blueprint V0.1 and structured blueprint, Chapter 2, Part 1.1.9, Type A application evolution plus academy integration.

**Engineering question:** How do independent decisions constrain a shared business journey?

## Source revisions and independent merges

| Repo | Starting main | Implementation merge | Verified evidence |
|---|---|---|---|
| Academy | 05ab302d1e2059d07c0f7585f0fd30e73211fce6 | 0fc00063082a3069a8393e514b78f3c64b680362 | [PR #14](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/14) |
| Java | 081d1f1a877772e41d7a30ce0052e9609c71f6b5 | c7d3e2d741883b1aba5fcd1e51f4275ef48344ea | [Java PR #7](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/7) |
| Java documentary finalization | same Java implementation | 71a5172d04f11b26d01f5ba23e1067f0d80e524c | [PR #8](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/8) |

Java [implementation post-merge CI 44915338911](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44915338911) passed against c7d3e2d741883b1aba5fcd1e51f4275ef48344ea, and [final documentary post-merge CI 44915868366](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44915868366) passed against 71a5172d04f11b26d01f5ba23e1067f0d80e524c.

Academy [PR #14 feature standard CI 44916005394](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44916005394) and [feature browser CI 44916005399](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44916005399) passed. **Exact implementation-merge post-merge** [standard CI 44916161679](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44916161679) passed **91/91 Vitest across 20 test files**, immutable manuscript and coverage governance, TypeScript and production build. [Desktop Chromium 44916161678](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44916161678) **passed all 60 Playwright tests**. Both runs tested exact academy implementation merge 0fc00063082a3069a8393e514b78f3c64b680362.

## Canonical curriculum and interactive integration

The [full 31-topic independent Markdown manuscript](../content/lessons/1.1.9.md), approximately 6,155 words, retains precise explanation beyond visuals. Git source blob: 29abcf8a8ad2268d4bc14c52c9714f4b4b43824a. Coverage includes separate lifecycle products, authority and source evidence, merchant-first/payment-first policy hypotheses, accepted-but-unpaid, rejected-but-paid, cancellation and preparation races, unknown provider results, refund obligations, terminality, actual Java execution boundaries, incident diagnosis, Staff-level defense, active recall and cross-domain transfer.

Purpose-built academy sources:
- src/lessons/lesson119/model.ts: seven deterministic casebook paths and seven predict-before-reveal problems.
- src/lessons/lesson119/Mechanisms.tsx: synchronized merchant/payment/preparation/journey inspector with cross-guard dependencies, switchable happy/failure sequence with historical simulated observations, prediction exercise with reset.
- src/lessons/lesson119/Lesson119.tsx and lesson.css: continuous Visual Textbook V2 reader, one sidebar and three source-anchored contextual labs.
- src/lessons/lesson119/lesson.test.ts and e2e/lesson119.spec.ts: local model and desktop browser regression; extended registry/governance/browser tests check prior lessons too.
- One typed registry record, 31 stable topic IDs, exactly three validated lab marker anchors, all 11 blueprint fields mapped structurally and canonical Git checksum frozen. Earlier eight manuscripts and numeric/stable deep links preserved. Current academy corpus: **nine authored manuscripts, 183 topics and 37 contextual labs**.

The source and coverage checks establish structural/content integrity, not an expert attestation of teaching quality. Expert human content review remains appropriate.

## Applied Java mechanism and exact evidence class

The Java project now includes application/simulation/LocalCompositionSimulation.java plus SimulatedPaymentPort and DeterministicLocalPaymentSimulator. A distinct opt-in Spring session is anchored to an actually recorded local OrderId, retains independent RestaurantDecision/PaymentAttempt/preparation/journey states with typed identities, and requires explicit frozen classroom policies and source-evidence assumptions. It does **not** mutate the canonical Order intake, create a public financial API, authenticate an external merchant, or move funds. Rejected commands return the same prior snapshot and append no success observation. A one-JVM ConcurrentHashMap.compute handles an illustrative competing terminal merchant decision under limited local atomicity. Lost simulator responses remain SUBMITTED_UNKNOWN or REFUND_PENDING rather than proven successes.

Read the [Java engineering contract](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/c7d3e2d741883b1aba5fcd1e51f4275ef48344ea/docs/engineering/LESSON_1_1_9_LOCAL_COMPOSITION_CONTRACT.md) and [Java historical checkpoint](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/71a5172d04f11b26d01f5ba23e1067f0d80e524c/checkpoints/LESSON_1_1_9.md) rather than duplicating their mechanism specification.

Java [CI 44915338911](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44915338911) ran the governance fixtures, code/import checks, Maven verify with **72/72 JUnit tests** (including 13 new Spring application-composition tests), packaged executable jar, and live HTTP request intake 201/Location plus unavailable-menu-item HTTP 422; all passed. Real intake POST/GET semantics, quoted server-owned fixture pricing and local post-save fact behavior remain unchanged. No real merchant/provider/kitchen outcome was exercised.

## Negative cases, encountered failures and corrections

- Java initial [feature CI 44915009919](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44915009919) failed two new test assertions on **cross-guard precedence**: the capture-before-preparation guard fired before the preparation guard. Corrected the test to verify BOTH guards in sequence without weakening either. The corrected [feature CI 44915270300](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44915270300) passed and both subsequent Java merges passed.
- Academy first [browser CI 44915686434](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44915686434) failed from a nine-lesson test syntax typo. After fixing the syntax, [browser CI 44915787602](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44915787602) passed 59/60, with one stale Java evidence-banner expectation. Updating the assertion to the real latest Java SHA produced green feature and post-merge runs.
- Negative regression verifies unresolved POL-01/POL-03/POL-05 alternatives fail closed; no fake successful merchant/refund fact on rejection; cancellation blocks new payment in local teaching policy; preparation affects cancellation cutoff; unknown provider preset stays unknown; duplicate/competing local merchant decisions have one winner for one map key. These do not prove external idempotency, resilience, merchant authenticity or bank settlement.
- **Not implemented or tested:** real merchant/provider connectivity, authenticated business authority, external partial failure or retry/callback reordering, durable persistence and crash recovery, multi-JVM linearization, payment idempotency, actual refund execution, real kitchen work, delivery or distributed transaction guarantees.

## Business authority, architecture and next dependency

ADR 0001 remains accepted: one Spring Boot deployable and volatile request intake, with a separate teaching composition. No change to actual customer intake API or source-owned business effects. POL-01–POL-10 remain **UNRESOLVED**, especially ordering, binding merchant authority, cancellation cutoff, financial remedy and evidence. The [policy decision register](../docs/domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md) is authoritative. No teaching policy alternative may be claimed as commercial approval.

**Immutable implementation freeze:** academy 0fc00063082a3069a8393e514b78f3c64b680362; Java c7d3e2d741883b1aba5fcd1e51f4275ef48344ea; Java documentary 71a5172d04f11b26d01f5ba23e1067f0d80e524c. Separate academy documentary finalization PR will carry its own independently verified merged SHA and CI. **Lesson 1.1.10 is NOT started.**
