# Lesson 1.1.4 — Applied Identity and State-Authority Engineering Walkthrough

**Roadmap:** Master Roadmap V1 → Cluster 1.1 → Chapter 1 → Lesson 1.1.4.  
**Classification:** Type A (real platform evolution), Type D (academy interactive learning).  
**Question:** Which identities are stable and which component is entitled to determine a fact?

## 1. Verified baselines and source evidence

| Role | Immutable reference |
|---|---|
| Prior academy Lesson 1.1.3 main | [6e701e05b8fdd3b6cc2aed22341d7fb24a699699](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/6e701e05b8fdd3b6cc2aed22341d7fb24a699699) |
| Prior Java Lesson 1.1.3 main | [225db684a24080f2c4ad1ae6e2f5e259edf0aa7d](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d) |
| Merged Java Lesson 1.1.4 | [ea17135cdc1974d89d78ce78931bb63cc5e9544e](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/ea17135cdc1974d89d78ce78931bb63cc5e9544e) |
| Java main verification | [Run 42782082917](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42782082917) — **30 tests passed**, packaged jar + real HTTP 201/422 smoke |
| Java PR | [#2](https://github.com/fasiltadesse22/food-ordering-platform-new/pull/2) — merged |

Read the actual Java identity contract in [docs/engineering/LESSON_1_1_4_IDENTITY_AUTHORITY_CONTRACT.md](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/docs/engineering/LESSON_1_1_4_IDENTITY_AUTHORITY_CONTRACT.md) and [checkpoint](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/checkpoints/LESSON_1_1_4.md).

## 2. Typed identifier representation

| Domain value | Source | In-memory meaning | Outside boundary |
|---|---|---|---|
| [OrderId](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/src/main/java/com/academy/foodordering/domain/OrderId.java) | \`OrderId.newId()\` after valid PlaceOrder business checks | Stable key for one intake; record wrapping UUID | Existing JSON \`orderId\` UUID string |
| [CustomerId](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/src/main/java/com/academy/foodordering/domain/CustomerId.java) | Claimed UUID from HTTP command | Customer reference for that intake | Existing JSON \`customerId\` UUID; **not authenticated caller** |
| [RestaurantId](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/src/main/java/com/academy/foodordering/domain/RestaurantId.java) | Resolved server-owned synthetic catalog \`code\` | Fixture restaurant reference distinct from name | Existing JSON \`restaurantId\` String |
| PaymentAttemptId | Not implemented | Conceptual separate attempt under an order | No API, payment records or provider calls |

The [Order](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/src/main/java/com/academy/foodordering/domain/Order.java) record stores domain-typed identities in fields \`orderIdentity\`, \`customerIdentity\`, \`restaurantIdentity\`. Raw compatibility accessors \`id()\`, \`customerId()\` and \`restaurantId()\` deliberately retain the historical Java/client contract for existing controllers and tests. The raw \`PlaceOrderCommand\` values are validated and converted only in the application use case after resolving the fictional restaurant code. This is a controlled conversion boundary, not a claim of authentication.

The [OrderRequestRecorded](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/src/main/java/com/academy/foodordering/domain/OrderRequestRecorded.java) local fact now stores typed order/customer/restaurant identities. The [PlaceOrderOutcome.Recorded](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/src/main/java/com/academy/foodordering/application/PlaceOrderOutcome.java) constructor verifies all three agree with the associated Order. It does not create a published event or independent durable fact ID.

## 3. Actual command-to-record mechanism

\`\`\`text
HTTP client ──(customer UUID + restaurant code + basket)──▶ OrderController
  │  Request/correlation ID belongs to HTTP, not domain business uniqueness
  ▼
PlaceOrderCommand ──▶ PlaceOrderService
  │  Verify fixture restaurant and basket rules (known rejections remain 422)
  ▼
Create OrderId + validated CustomerId and RestaurantId
  │
  ▼
Order(typed immutable snapshot) ──▶ InMemoryOrderRepository.save
  │                                  ConcurrentHashMap<OrderId,Order>.putIfAbsent
  │                                        ├─ occupied ID: reject replacement
  │                                        └─ normal save: local state now recorded
  ▼
OrderRequestRecorded(typed matching ID references) ──▶ PlaceOrderOutcome.Recorded
  │  no durable history, no broker, no merchant or provider authority
  ▼
OrderResponse 201 Created + Location /api/orders/{id}
  │  JSON still UUID/String; restaurant PENDING; payment NOT_STARTED
  ▼
GET /api/orders/{id} ──▶ same OrderId and same snapshot within this process
\`\`\`

The [InMemoryOrderRepository](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/ea17135cdc1974d89d78ce78931bb63cc5e9544e/src/main/java/com/academy/foodordering/infrastructure/InMemoryOrderRepository.java) owns one mutable map. It rejects another create with an occupied ID rather than silently overwriting it. It does not implement a legitimate subsequent state update, revision version, optimistic lock, transaction log or crash-durable history. A process restart loses stored records.

An eligible second POST generates a **new** OrderId; the current endpoint is explicitly non-idempotent. This does not contradict the create-only same-ID invariant. A future *update* targeting one existing order would preserve that OrderId and require separately authorized guard/expected-version semantics. No fake \`updateStatus\` API was added just to show a version change.

## 4. Java tests executed and limits

The Java main build ran \`mvn -B -ntp verify\` with Java 21 on Ubuntu. It reports **30 passing JUnit tests**, including 12 newly added tests for identity values, validation, immutable records, fact reference consistency, create-only lookup, same-ID replacement rejection and concurrent insert. Other existing service and MVC integration tests continue to verify business rejection and HTTP compatibility.

After Maven packaging, the workflow starts the actual runnable jar and sends a valid fixture HTTP POST, confirming 201 Created, an OrderId and the explicit \`PENDING\`/\`NOT_STARTED\` statuses; an unavailable item POST produces 422 \`ITEM_UNAVAILABLE\`. This proves the tested API behavior, not successful settlement, merchant acceptance, restart durability or authenticated ownership.

\`putIfAbsent\` is atomic for one key in one map instance. It does not deduplicate two different generated OrderIds for identical POST payloads. The order's \`createdAt\` and local fact's \`observedAfterSaveAt\` are wall-clock observations, not globally monotonic version numbers. Clocks can be corrected backwards; timestamp order is not proof of state revision or financial effects.

## 5. React academy, explicit evidence labeling

The new [Lesson 1.1.4 manuscript](../../content/lessons/1.1.4.md) teaches identity/state separation, key design, authority, projection, aliasing, two conceptual payment attempts, repeated callbacks, Java implementation, verification, incident diagnosis and Staff communication.

The existing [Visual Textbook V2 reader](../../src/lessons/shared/TextbookReader.tsx) remains the only lesson presentation framework. The chapter→lesson→topic sidebar exposes 16 deep-linked topics. Two illustrations and one meaningful deterministic lab are embedded near their relevant explanations:

- [IdentityAuthorityMap](../../src/lessons/lesson114/Mechanisms.tsx) distinguishes OrderId/CustomerId/RestaurantId in implemented Java from hypothetical PaymentAttemptId/provider references and the UI projection.
- [ProjectionAuthorityFlow](../../src/lessons/lesson114/Mechanisms.tsx) draws the future provider→observation→projection→UI relationship, specifically stating that no provider integration exists today.
- [IdentityAuthorityLab](../../src/lessons/lesson114/Mechanisms.tsx) uses the pure [simulateIdentity](../../src/lessons/lesson114/model.ts) model with seven cases: restaurant rename, two payment attempts, same-name merchants, repeated callbacks, stale projection, same-ID duplicate create, and repeated PlaceOrder POST. The last two mirror tested local Java semantics; the others are clearly future conceptual cases. The learner predicts before revealing the model's reasoning.

The React lab is **not** a live Java or provider session. TypeScript and Chromium tests can establish deterministic educational behavior and reader rendering; they cannot prove external business facts. Source links reference the exact Java main SHA.

## 6. Architecture alternatives and non-guarantees

The platform intentionally remains a single Spring Boot deployable. Avoid premature microservices, payment connectors, authentication, event sourcing, Kafka, CQRS, outbox, synthetic status mutation, revision increment, persistent ID registry or request-idempotency protocol without a justified contract. A typed domain ID helps prevent category confusion; it does not establish the caller's permission to access that ID. An apparently fresh UI status does not become authoritative over a provider's actual operation receipt. No external merchant or payment fact is currently available.

For future design, a versioned update needs legal business transitions, guards, atomic expected-version storage and testing. PaymentAttemptId needs a real provider/attempt lifecycle, scoped external references, callback trust and reconciliation. A durable history needs transactional persistence and recovery evidence. Treat these as explicitly deferred obligations, not hidden implementation.

## 7. Next dependency

Lesson 1.1.5 — a complete Food Ordering workflow story — is Type C (concept/analysis). It may assemble conceptual customer/merchant/payment success and failure branches using this identity/authority map without pretending those branches are implemented in Java. Do not begin that lesson as part of 1.1.4.
