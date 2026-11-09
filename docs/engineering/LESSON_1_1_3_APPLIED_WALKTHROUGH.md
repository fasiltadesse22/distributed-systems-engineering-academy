# Lesson 1.1.3 — Applied Engineering Walkthrough

**Cluster 1.1 / Chapter 1 / Lesson 1.1.3:** Commands, Decisions, Facts and Events
**Type:** A — actual Java platform evolution; D — React academy lesson
**Question:** What separates an intention to change state from proof that it changed?

## Immutable Java baselines

| Source | SHA / evidence |
|---|---|
| Previous verified UC-001 intake | [08b33714431a53f6b1cb1e1e09718b0281da1ce8](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/08b33714431a53f6b1cb1e1e09718b0281da1ce8) |
| Lesson 1.1.3 verified Java implementation | [225db684a24080f2c4ad1ae6e2f5e259edf0aa7d](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d) |
| New Java source/test PR | [Java pull request #1](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/1), merged |
| Verified post-merge Java CI | [Run 42590153411](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42590153411) — SUCCESS, 18 Maven tests plus runnable-jar HTTP smoke |

## Application source map

**[PlaceOrderCommand](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/main/java/com/academy/foodordering/application/PlaceOrderCommand.java):** customer-supplied intent and fixture basket. The customer UUID is not authenticated; command creation does not establish success. It has no client-controlled price.

**[OrderController](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/main/java/com/academy/foodordering/api/OrderController.java):** HTTP validation/mapping and legacy PlaceOrderService.place call. A 201 Created plus Location represents local intake only. No merchant acceptance or provider operation occurs.

**[PlaceOrderService](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/main/java/com/academy/foodordering/application/PlaceOrderService.java):** applies business rules, creates the Order, saves via OrderRepository. Its new handle method constructs the local fact after normal save return; only expected BusinessRejection is translated into a typed Rejected outcome. Other exceptions propagate because effect can be unknown.

**[PlaceOrderOutcome](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/main/java/com/academy/foodordering/application/PlaceOrderOutcome.java):** sealed application outcome: Recorded(Order, OrderRequestRecorded) or Rejected(code, message). The Recorded constructor ensures fact/order identity consistency. An application-level typed outcome is not external message publication.

**[OrderRequestRecorded](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/main/java/com/academy/foodordering/domain/OrderRequestRecorded.java):** an immutable local historical claim after a normal process-local save. Its observation timestamp is not a durable commit timestamp. It is not a merchant acceptance or a payment result.

**[OrderRepository and volatile adapter](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/main/java/com/academy/foodordering/infrastructure/InMemoryOrderRepository.java):** ConcurrentHashMap in one process. Saving does not imply crash durability, multi-instance visibility, or transactional event recording.

**[PlaceOrderDecisionTest](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/test/java/com/academy/foodordering/application/PlaceOrderDecisionTest.java):** five executable tests for fact/order identity, six business rejection cases, duplicate intent, adapter-write-then-throw uncertainty and legacy compatibility.

## Normal source execution trace

1. Customer POST reaches HTTP adapter. Structural validation is separate from identity authentication and business permission.
2. Controller produces a PlaceOrderCommand with supplied customer reference and synthetic menu lines.
3. Application resolves the server-owned restaurant fixture and applies business guards.
4. Valid command produces an immutable Order with a newly generated OrderId and pre-save createdAt. No fact has been established by constructing this object alone.
5. Application invokes the local repository save. A normal return is the observation boundary for the added fact.
6. The handler constructs OrderRequestRecorded with the same OrderId and an observedAfterSaveAt timestamp, returning Recorded. In the original place compatibility method, this is converted back to the Order.
7. Controller returns 201 Created, Location and the exact original local intake response. Restaurant decision remains PENDING and payment remains NOT_STARTED.

## Alternative paths and unknown conditions

**Invalid fixture item:** local business rule rejects with ITEM_UNAVAILABLE before the handler creates a success fact. The compatibility controller still returns 422.

**Duplicate menu line:** the existing business rules reject with DUPLICATE_ITEM. No successful intake fact is returned for that attempt.

**Repeated identical command:** two invocations construct two distinct OrderId values, two saved intake records and two local success facts. X-Request-ID is a correlation value and does not deduplicate these operations.

**Injected save-then-throw adapter:** the repository writes an Order and throws. The handler propagates infrastructure failure, returns no typed success outcome, yet the test adapter contains the saved record. This is an intentionally modeled uncertainty window; it does not establish the normal adapter's exact failure probabilities.

**Lost HTTP acknowledgement:** the client sees a timeout despite an earlier local save. Response absence is not evidence of state absence. Without an authoritative result lookup or properly enforced idempotency, a retry can create a second intake.

## What is actually verified

The [post-merge Java workflow](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42590153411) ran Maven verify successfully, with 18 passing tests. It packaged the runnable jar, started the Spring application and observed a successful real HTTP 201 request plus an unavailable-item HTTP 422 rejection. The tests verify the specific code and environment under run conditions, not a production system.

The React [Command → Decision → Fact learning lab](../../src/lessons/lesson113/Mechanisms.tsx) is a deterministic TypeScript teaching model. The diagram is source-derived. Neither is an OpenTelemetry trace, broker record, provider receipt or proof of external operations. The academy's verified [source revision ef6b443487](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/ef6b443487b866c8bb434f1b999fe36d747bf146) passed [45 TypeScript unit/component tests and the production build](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608082), plus [30 Chromium browser tests](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608081). The lesson checkpoint records this source-tested evidence without confusing the deterministic lab with Java runtime tests.

## Architectural decision and simpler alternatives

**Chosen:** typed outcomes and a post-save local fact within the existing single Spring Boot deployable; preserve backward-compatible UC-001 HTTP contract. This introduces explicit domain meaning without introducing a second non-atomic in-memory event journal.

**Not chosen:** generic command bus, Kafka, Outbox/Inbox, CQRS, Event Sourcing, durable PostgreSQL, merchant acceptance, payment/refund processing, authenticated checkout or idempotency protocol. Each requires business, state, performance or failure forces not yet established here.

**Reconsideration triggers:** a requirement to survive restart, maintain auditable immutable history, retry safely under concurrency, coordinate external provider state, or deliver facts to independently deployed consumers. Those changes require new invariants and executed evidence rather than assuming a named event is durable.

## Readiness for Lesson 1.1.4

The new command/fact boundary establishes a useful prerequisite: a created OrderId identifies a specific intake, while customer/restaurant references and correlation IDs mean different things. Next, model stable business identity, authoritative state, aliases, version continuity, and owned provider/merchant facts without treating UI projection as source of truth.
