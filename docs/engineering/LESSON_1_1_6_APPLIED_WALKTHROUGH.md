# Lesson 1.1.6 — Applied Java Lifecycle Walkthrough

**Implementation revision:** [Java `main` at `79024c3c36fe1a8cc6f71b79505601894d927507`](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/79024c3c36fe1a8cc6f71b79505601894d927507). **Evidence:** [post-merge CI 44054521893](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44054521893), **34 JUnit tests**, runnable jar, real local HTTP intake 201 and rejection 422. The verified effect is **platform-local intake and pure local model decisions**, not genuine merchant or financial operations.

## Existing baseline: why state modeling starts small

The actual [Order.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/main/java/com/academy/foodordering/domain/Order.java) remains an immutable typed snapshot with OrderId, CustomerId, RestaurantId, lines and quotation. [PlaceOrderService.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/main/java/com/academy/foodordering/application/PlaceOrderService.java) validates the command, writes the process-local repository, then constructs OrderRequestRecorded after save returns normally. Repeated eligible HTTP POST can still create distinct OrderIds. No durable history, idempotency, merchant API, payment provider, cancellation endpoint or provider callback exists. The unchanged [OrderController.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/main/java/com/academy/foodordering/api/OrderController.java) continues to return REQUESTED_AWAITING_RESTAURANT, PENDING and NOT_STARTED.

## Model 1 — Platform Order intake

[OrderLifecycle.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/main/java/com/academy/foodordering/domain/OrderLifecycle.java) defines NEW and REQUESTED, and models the pure decision NEW + RECORD_INTAKE → REQUESTED with stable OrderId. It refuses duplicate RECORD_INTAKE and always refuses CLOSE_UNFULFILLABLE while the real merchant/policy evidence needed for closure is unavailable. An existing Order exposes `intakeLifecycle()` as a truthful REQUESTED view. The pure transition's illustrative fact does not substitute for the real post-save OrderRequestRecorded. This separates **reasoning about the transition** from **actually persisting the intake**.

## Model 2 — Restaurant decision

[RestaurantDecisionLifecycle.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/main/java/com/academy/foodordering/domain/RestaurantDecisionLifecycle.java) identifies one decision by OrderId and RestaurantId and defines PENDING → ACCEPTED or REJECTED under a deliberately simplified one-shot educational rule. Attempts to decide twice leave the same immutable record, return rejected and emit no success label. Accepted outputs are named IllustrativeRestaurantAccepted / IllustrativeRestaurantRejected. There is no merchant command endpoint, source authentication, real restaurant decision or approved merchant policy. Terminality is a local teaching assumption, not a universal business rule.

## Model 3 — Payment attempt

[PaymentAttemptId.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/main/java/com/academy/foodordering/domain/PaymentAttemptId.java) defines a stable typed identity distinct from OrderId. [PaymentAttemptLifecycle.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/main/java/com/academy/foodordering/domain/PaymentAttemptLifecycle.java) defines NOT_STARTED, SUBMITTED_UNKNOWN, AUTHORIZED, DECLINED, CAPTURED, REFUND_PENDING and REFUNDED. Only seven state/action pairs are allowed under the teaching model. The other thirty-five reject without state mutation or fact emission.

### Explicit allowed transition matrix

| From | Action | To | Evidence limitation |
|---|---|---|---|
| NOT_STARTED | SUBMIT | SUBMITTED_UNKNOWN | A local action is not real provider submission |
| SUBMITTED_UNKNOWN | CONFIRM_AUTHORIZED | AUTHORIZED | Provider evidence **assumed**, not received |
| SUBMITTED_UNKNOWN | CONFIRM_DECLINED | DECLINED | Provider decline **assumed**, not received |
| SUBMITTED_UNKNOWN | CONFIRM_CAPTURED | CAPTURED | Capture evidence **assumed**, no money moved |
| AUTHORIZED | CONFIRM_CAPTURED | CAPTURED | Capture remains separate from authorization |
| CAPTURED | REQUEST_REFUND | REFUND_PENDING | Eligibility POL-05 unresolved; **no provider request** |
| REFUND_PENDING | CONFIRM_REFUNDED | REFUNDED | Refund confirmation **assumed**, no money moved |

The machine is not a provider-specific contract. It does not model authorization expiry, voids, partial captures/refunds, settlement or chargebacks. It is deliberately unsuitable for production payment operations without evidence handling, policy approval and authenticated provider integration.

## Composition — one business request, three separately owned truths

[LifecycleSnapshot.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/main/java/com/academy/foodordering/domain/LifecycleSnapshot.java) checks that the OrderId is equal across the order, merchant and payment snapshots. It exposes two **observational predicates**: payment AUTHORIZED while merchant PENDING, and merchant REJECTED while refund REFUND_PENDING. Neither performs a transition, changes the Order record, or claims an atomic read or distributed transaction.

[LifecycleModelsTest.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/79024c3c36fe1a8cc6f71b79505601894d927507/src/test/java/com/academy/foodordering/domain/LifecycleModelsTest.java) proves the local transition matrix, no-op rejection, identity continuity, and composition cases. Its four JUnit test methods include exhaustive internal iteration across all 42 payment state/action combinations: exactly 7 accepted and 35 rejected. The full Java suite passed 34/34 on the merged revision.

## Why no microservices, Saga or external provider

Decomposition follows **authority and identity**, not a need for network deployment. The current single deployable remains sufficient to teach independent state semantics. External merchant/payment integration would add latency, unknown results, retries, callback authentication, idempotency, consistency and financial liabilities that are **not** addressed by this lesson. The unresolved policy decisions POL-01–POL-10 are intentionally not transformed into business guards. The precise next dependency is Lesson 1.1.7, which will formalize legal guards and postconditions; this execution does not implement it.

## What this evidence does and does not prove

The recorded CI establishes the Maven build and test outputs, plus packaged-jar HTTP 201/422 behavior. The tests establish pure model behavior under constructed inputs. The Java code does not demonstrate provider authorization, capture, refund, real merchant acceptance, actual kitchen preparation, state persistence beyond process lifetime, multi-actor atomicity, or concurrent updates protected by version checks. Any React diagram showing those participants remains an educational representation with explicit assumed evidence.
