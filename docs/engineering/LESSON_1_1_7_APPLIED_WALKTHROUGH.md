# Lesson 1.1.7 — Applied Java Guarded-Transition Engineering Walkthrough

**Roadmap:** Master Roadmap V1 · Cluster 1.1 · Chapter 2 · Lesson 1.1.7 (Type A + Type D).  
**Application merged revision:** [8c5e5144b40adbd8679f4fe3f8046020b0279d2b](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/8c5e5144b40adbd8679f4fe3f8046020b0279d2b).  
**Java post-merge CI:** [GitHub Actions run 44745491071](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071) — 59/59 JUnit tests, Maven package, runnable-jar check, HTTP 201 order intake and HTTP 422 business rejection passed.  
**Truth boundary:** These are **pure local candidate decisions**, not real merchant acceptance, real kitchen preparation, or payment provider operations.

## Starting point: Lesson 1.1.6

The Java baseline at `79024c3c36fe1a8cc6f71b79505601894d927507` contains three independent lifecycle models. The real Spring Boot application still exposes POST/GET order intake and one synthetic restaurant menu fixture, saving immutable Order snapshots in process-local in-memory storage. It returns an OrderRequestRecorded local post-save fact, and continues to say restaurant decision PENDING and payment status NOT_STARTED. The source `OrderLifecycle` has real typed OrderId identity but no commercial merchant acceptance operation. The source `RestaurantDecisionLifecycle` and `PaymentAttemptLifecycle` are deliberately hypothetical local models; their output labels are illustrative.

Read [OrderLifecycle.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/8c5e5144b40adbd8679f4fe3f8046020b0279d2b/src/main/java/com/academy/foodordering/domain/OrderLifecycle.java) and [RestaurantDecisionLifecycle.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/8c5e5144b40adbd8679f4fe3f8046020b0279d2b/src/main/java/com/academy/foodordering/domain/RestaurantDecisionLifecycle.java) to establish what actually existed before adding guards. This lesson does **not** rename REQUESTED to PLACED. The blueprint's AcceptOrder(current=PLACED) example maps to the real Order REQUESTED intake and the separate illustrative RestaurantDecision PENDING state; only the latter is the relevant lifecycle state for a proposed merchant ACCEPT.

## Source change 1: named guard results

[GuardCheck.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/8c5e5144b40adbd8679f4fe3f8046020b0279d2b/src/main/java/com/academy/foodordering/domain/GuardCheck.java) is an immutable result with `code`, `passed` and `explanation`. This is intentionally simple: it lets a domain evaluator expose the preconditions that determined whether a candidate is legal. A false result is not automatically an exception. A normal business rejection must be explainable without mutating state or creating an accepted fact.

The new evaluator checks all applicable predicates and selects the first failing rule in documented order for its explanation. Production authorization and public error disclosure might use a different ordering or redact reasons. The model does not expose an HTTP endpoint and cannot verify real credentials, so the demonstration is about *logical guard independence*, not secure authorization infrastructure.

## Source change 2: guarded merchant decision

[GuardedRestaurantDecision.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/8c5e5144b40adbd8679f4fe3f8046020b0279d2b/src/main/java/com/academy/foodordering/domain/GuardedRestaurantDecision.java) wraps one previously defined illustrative lifecycle transition in eleven explicit prerequisite checks:

| Rule | Meaning | Negative example |
|---|---|---|
| IDENTITY_ORDER | Command targets same OrderId | O-8 request presented for O-7 |
| IDENTITY_RESTAURANT | Requested restaurant is same decision owner | M-99 request for M-42 decision |
| ACTOR_ROLE | Merchant-operator action required | Customer attempts ACCEPT |
| ACTOR_SCOPE | Actor's merchant matches decision owner | M-99 operator for M-42 |
| AUTHENTICATED_ASSUMED | Model assumes verified technical principal | Identity claim without trusted authentication |
| BUSINESS_AUTHORITY_ASSUMED | Model assumes the principal has merchant decision rights | Authenticated staff without binding authority |
| EXPECTED_STATE | Caller expected state matches immutable observed snapshot | Caller expects PENDING but snapshot is REJECTED |
| STATE_PENDING | One-shot merchant decision must still be PENDING | Attempt ACCEPT after prior REJECT |
| BASKET_TERMS_ASSUMED | Same offered basket and quoted terms | Attempt concerns stale basket |
| MERCHANT_EVIDENCE_ASSUMED | Classroom assumes attributable source observation | No real merchant evidence available |
| POL_02_EDUCATIONAL_ONLY | Explicit hypothetical policy selected | POL-02 remains UNRESOLVED |

The context's boolean assumption fields are not cryptographic facts or authorizing business approvals. They are deliberately marked as assumptions. The class is a **pure evaluator**, and the result's accepted branch is labeled `CandidateIllustrativeRestaurantAccepted` or `CandidateIllustrativeRestaurantRejected`, never a real `RestaurantAccepted` event.

### Eligible branch postconditions

Given PENDING, the same typed OrderId/RestaurantId, a MERCHANT_OPERATOR for the decision-owning merchant, and all educational assumptions explicitly enabled, the evaluator returns a new immutable candidate state. It retains the exact identity pair, reports all eleven guards as passing, and emits a **candidate label** only. There is no repository write, remote decision or event publication, and therefore no application commit point in this evaluator.

### Rejected branch postconditions

Every failed rule yields `accepted=false`, `next == before` by object identity, a reason tied to a named guard, and a null candidate fact. The constructor rejects logically inconsistent outcomes, including a rejection paired with a non-null success label or an accepted result containing a failed guard. This prevents a downstream developer from accidentally packaging an illegal transition as success.

## Source change 3: explicit application outcome

[PreviewRestaurantDecisionService.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/8c5e5144b40adbd8679f4fe3f8046020b0279d2b/src/main/java/com/academy/foodordering/application/PreviewRestaurantDecisionService.java) exposes a sealed local `Eligible` / `Rejected` distinction. Its method is named `evaluate`, not `acceptOrder` or `executeDecision`, because it does **not** commit anything. It has no Spring controller, repository port, network gateway, message publisher or payment coupling. Its only job is to preserve the domain evaluator's truth into an explicit application decision result.

A future actual use case may need authenticated source evidence, current persisted state, versioned/transactional commit, audit records, and carefully scoped external fact production. None of those guarantees are supplied here. The existing real [PlaceOrderService.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/8c5e5144b40adbd8679f4fe3f8046020b0279d2b/src/main/java/com/academy/foodordering/application/PlaceOrderService.java) is intentionally unchanged; it already has a distinct local post-save fact boundary for platform intake.

## Source change 4: scoped preparation guard probe

[PreparationGuardProbe.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/8c5e5144b40adbd8679f4fe3f8046020b0279d2b/src/main/java/com/academy/foodordering/domain/PreparationGuardProbe.java) is not a new kitchen service or fulfillment aggregate. It models exactly the required illegal-transition teaching cases:

| Stage | Command | Structural result under all educational assumptions |
|---|---|---|
| NOT_STARTED | START_PREPARING | Candidate PREPARING, only with merchant ACCEPTED assumption |
| NOT_STARTED | COMPLETE_PREPARATION | Rejected / NOT_STARTED, no fact |
| PREPARING | START_PREPARING | Rejected / PREPARING, no fact |
| PREPARING | COMPLETE_PREPARATION | Candidate READY, under assumptions |
| READY | START_PREPARING | Rejected / READY, no fact |
| READY | COMPLETE_PREPARATION | Rejected / READY, no fact |

Six named guards check shared OrderId, KITCHEN_OPERATOR role, merchant ACCEPTED assumption, source-evidence assumption, current preparation stage, and explicit educational POL-04. If merchant state is PENDING, START_PREPARING fails. If stage is NOT_STARTED, COMPLETE_PREPARATION fails. On rejection no stage changes and no candidate success label appears. Even the positive branch is labeled a **CandidateIllustrative** outcome; no real food is prepared and no kitchen state is persisted.

## Testing: derive assertions from the decision tables

[GuardedTransitionsTest.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/8c5e5144b40adbd8679f4fe3f8046020b0279d2b/src/test/java/com/academy/foodordering/domain/GuardedTransitionsTest.java) uses JUnit 5 parameterized tests to exercise independent guard failures, permitted merchant ACCEPT and REJECT candidate paths, terminal-state illegal attempts, invalid preparation stage/action pairs, actor/policy evidence blocks, identity preservation and defensive result consistency. It also exercises the application's sealed Eligible/Rejected outcome without introducing a public endpoint.

The new test class contributes **25 JUnit test invocations**, and the full Java feature revision completed **59/59 total JUnit tests**. Existing controller integration tests and live HTTP smoke prove that legacy intake APIs still work. They do not establish that any externally authorized merchant action occurred; the reader must distinguish actual Java branch coverage from the scope of the business fact.

The CI test command is Maven verification and packaging under the repository's GitHub Actions workflow, followed by a packaged HTTP intake smoke that expects 201 and an invalid business request that expects 422. Exact run and commit links are provided above. These checks validate local domain guard algorithms and old API regression, not concurrency, merchant source authentication, persistent update writes or distributed execution.

## The three required diagnostic alternatives

**Missing guard:** If a true REJECTED snapshot is passed to the evaluator, STATE_PENDING must fail. If an application bypasses the evaluator and writes ACCEPTED anyway, the issue is missing enforcement at its effect boundary.

**Stale-state race:** Two evaluators may both pass on the same PENDING input. Without an atomic version comparison at commit, two mutually incompatible effects could still be written. EXPECTED_STATE is only a local check against supplied data; it is not compare-and-swap or a distributed consistency guarantee.

**Adapter mapping error:** An input can be translated into the wrong Action or OrderId before guard evaluation. The evaluator can behave correctly for an incorrect mapped request. Real integration testing must trace transport input through the command adapter into the domain action and back.

The isolated Java application currently has no merchant endpoint, so these are engineering diagnosis models, not claims of observed production incidents.

## Architecture decision and scope

Continue the **single-deployable, progressively modular monolith**. Pure domain decision evaluation belongs inside the business module; an application service expresses outcomes; infrastructure is introduced only for real needed effects. Do not add distributed messaging, payment integrations, merchant HTTP APIs, Saga, a generic rules engine, simulated bank charges or separate services. Unresolved POL-01–POL-10 are not turned into approved guards. The next lesson on effect reversibility and subsequent lifecycle composition remain untouched.

## Checkpoint and acceptance

Merged Java main and post-merge CI are confirmed for `8c5e5144b40adbd8679f4fe3f8046020b0279d2b` at [run 44745491071](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071). **The merged Java SHA and post-merge CI were verified.** Academy merge and post-merge results remain a separate gate. The academy must separately verify the full manuscript, guard inspector, decision table, before/after view, commit boundary timeline, prediction exercise and desktop Chromium regressions. Keep the two repositories and their histories independent.
