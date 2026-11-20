# Lesson 1.1.7 — Guards, Preconditions and Postconditions

**Course:** Master Roadmap V1 · Cluster 1.1 · Chapter 2 · Lesson 1.1.7 (Type A Java + Type D academy).  
**Engineering question:** What makes a requested transition legal in a particular state?  
**Academy baseline:** `bf9f335eeada413b71433d394fab2e730ce7bc27`.  
**Java baseline:** `79024c3c36fe1a8cc6f71b79505601894d927507`.  
**Status:** **MERGED AND POST-MERGE VERIFIED**, academy implementation `1708a94cf4a78c05b582cab9d86d1948ca62571f`, [PR #7](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/7); 69/69 Vitest and 48/48 desktop Chromium after merge.

## Full instructional implementation

- Canonical `content/lessons/1.1.7.md`: **26 in-depth topics** with nine learning stages; detailed business examples, accepted/rejected decision tables, actor/evidence authority, postconditions, guarded transitions, security nuance, time-of-check/time-of-use limits, diagnostic counterexamples, Staff exception-policy challenge and independent hotel/banking transfer.
- Existing Visual Textbook V2 continuous reader, Chapter 02 header, sidebar lesson/topic deep links.
- `src/lessons/lesson117/Mechanisms.tsx`: one selectable merchant and preparation guard inspector; full 11/6 checked-rule explanation; side-by-side before/after and candidate/null-fact display; interactive six-row merchant and preparation decision tables; explicit six-stage commit/evidence timeline; eight-case predict-before-reveal studio.
- `src/lessons/lesson117/model.ts`: deterministic educational mirror of Java guard order and rule messages. Every external actor/policy input is a *classroom assumption*, not an authenticated merchant, kitchen or provider fact.
- `src/lessons/lesson117/lesson.test.ts`, `e2e/lesson117.spec.ts`, and extended `scripts/check-content.mjs`: source integrity, causal model, all negative guard cases, desktop Chromium, reader and prior lesson regressions.
- [Applied Java walkthrough](../docs/engineering/LESSON_1_1_7_APPLIED_WALKTHROUGH.md) with immutable sources and evidence.

## Real Java evolution

- Separate Java PR: [PR #4](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/4).
- Java feature SHA `048b2322456951e6fc01b54889e851f96b8820d9`; **merged main SHA** `8c5e5144b40adbd8679f4fe3f8046020b0279d2b`.
- [Java post-merge CI 44745491071](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071) **passed**: 59/59 JUnit tests, Maven package and live packaged HTTP 201/422 smoke. The 25 newly reported test invocations exercise guarded decision and preparation probe behavior.
- New domain types: GuardCheck, GuardedRestaurantDecision, PreparationGuardProbe.
- New application type: PreviewRestaurantDecisionService with sealed candidate Eligible and Rejected outcomes.
- No changes to OrderController, PlaceOrderService, existing public request/response or local intake storage. No real merchant, provider, kitchen or delivery integration. No new business state persistence.
- **Source boundary:** Java candidate result is a pure local evaluation only; no business commit, external authority or genuine source fact.

## Exact guards and outcome contract

Eleven merchant guards: IDENTITY_ORDER, IDENTITY_RESTAURANT, ACTOR_ROLE, ACTOR_SCOPE, AUTHENTICATED_ASSUMED, BUSINESS_AUTHORITY_ASSUMED, EXPECTED_STATE, STATE_PENDING, BASKET_TERMS_ASSUMED, MERCHANT_EVIDENCE_ASSUMED and POL_02_EDUCATIONAL_ONLY.

Six preparation probes: ORDER_MATCH, KITCHEN_AUTHORITY, MERCHANT_ACCEPTED, MERCHANT_EVIDENCE_ASSUMED, CURRENT_STAGE and POL_04_EDUCATIONAL_ONLY.

Both pure evaluators are deterministic. A failed guard preserves the exact immutable prior object/state and suppresses candidate facts. A positive result is **CandidateIllustrative...**, never a real merchant or kitchen action. The existing platform Order REQUESTED remains distinct from blueprint illustrative PLACED; hypothetical merchant PENDING is the relevant local one-shot decision state.

## Verification ledger

| Gate | Result |
|---|---|
| Java Maven/packaged HTTP smoke | **PASS** [44743299092](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44743299092), 59/59 tests |
| Academy manuscript/content integrity | **Passed**, [standard run 44745213798](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44745213798) |
| Academy TypeScript | **Passed**, standard run 44745213798 |
| Academy Vitest | **Passed**, 69/69 tests across 16 test files; standard run 44745213798 |
| Academy production build | **Passed**, standard run 44745213798 |
| Academy desktop Chromium and previous lessons | **Passed**, 48/48 tests, [browser run 44745213877](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44745213877) |
| Java PR merged and post-merge CI | **Passed**, [Java PR #4](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/4), [post-merge run 44745491071](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071) |
| Academy PR merged and post-merge CI | **Passed**, [PR #7](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/7), SHA `1708a94cf4a78c05b582cab9d86d1948ca62571f`, [standard CI 44746432638](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44746432638), [desktop Chromium 44746432701](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44746432701) |

All stated acceptance gates were checked against immutable CI runs. The separate documentation-only evidence update may have its own subsequent workflow and must not be confused with the implementation merge.

## Boundary, policy and next dependency

POL-01–POL-10 from Lesson 1.1.5 remain unresolved. No customer cancellation/refund policy, real merchant acceptance, real kitchen preparation, distributed coordination, persistence versioning or formal full cross-lifecycle orchestration was added. Actor authentication in the guard evaluator is an *assumed input* and not a security implementation. No new mobile E2E acceptance is required. Lesson 1.1.8 must not begin until this lesson's two-repository acceptance is complete.


## Frozen two-repository post-merge evidence — 2026-11-20

**Java:** base `79024c3c36fe1a8cc6f71b79505601894d927507`; implementation merge `8c5e5144b40adbd8679f4fe3f8046020b0279d2b`, [PR #4](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/4), [post-merge CI 44745491071](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071), 59/59 JUnit tests, Maven build, executable jar, live HTTP 201 intake and 422 business rejection. On GitHub Actions Ubuntu with Java 21 the workflow executes `mvn -B -ntp verify`, checks the packaged jar, runs `java -jar ... --server.port=18080` and verifies HTTP responses using curl.

**Academy:** base `bf9f335eeada413b71433d394fab2e730ce7bc27`; implementation merge `1708a94cf4a78c05b582cab9d86d1948ca62571f`, [PR #7](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/7). On GitHub Actions Ubuntu/Node 22, [post-merge standard run 44746432638](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44746432638) executed `node scripts/check-content.mjs`, `npm install --no-audit --no-fund`, `npm run typecheck`, `npm run test`, and `npm run build`: 26 deep source topics passed integrity audit, 69/69 Vitest cases across 16 files and production Vite build passed. [Post-merge Chromium run 44746432701](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44746432701) executed `npx playwright install --with-deps chromium` followed by `npm run test:e2e`: 48/48 browser tests passed, including new Lesson 1.1.7 navigation, guard interactions, illegal-transition no-op, decision table, prediction, history, theme and prior lesson routes. Desktop-only new lesson acceptance; no new mobile-specific tests.

**Implemented mechanism and evidence scope:** Java adds an 11-guard *pure* merchant decision evaluator, a 6-guard *pure* preparation probe and a sealed application preview outcome, with explicit assumption/policy checks. The actual Spring Boot HTTP intake remains unchanged; no merchant or kitchen operation is executed. Academy adds the 26-topic textbook, interactive inspector, before/after and fact/no-fact view, total decision tables, commit/evidence timeline and eight-case prediction exercise. The JS model is deterministic teaching material, not the Java runtime or external transaction evidence.

**Architecture and open questions:** Separate Git repositories; one modular-monolith-oriented Spring Boot deployable, no microservices, new backend HTTP endpoints, payment service, real merchant authentication, external provider calls, Saga, persistence versioning or concurrency engine. POL-01–POL-10 still unresolved; simulated classroom policies do not grant authority. The next dependency is Lesson 1.1.8; it was not started.
