# Applied Engineering Walkthrough — Lesson 1.1.2 / UC-001

**Purpose:** Connect business-use-case discovery to the first verified Java/Spring Boot workflow, including precise evidence and limitations.  
**Verified Food Ordering Platform commit:** [08b33714431a53f6b1cb1e1e09718b0281da1ce8](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/08b33714431a53f6b1cb1e1e09718b0281da1ce8).  
**Java CI verification:** [42514283048](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42514283048).  
**Business authority source:** [Lesson 1.1.1 domain discovery contract](../domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md).  
**This note:** Source-derived execution walkthrough with CI-observed tests; **not** a production distributed trace.

## 1. Engineering question and scope

The customer wants a meal prepared, but the initial platform is only authorized and capable of **recording the request**. How do we provide genuine, testable functionality without implying an external business decision occurred? The answer is a narrow acceptance contract: a valid intake resource, a generated ID, a synthetic price snapshot and explicit pending semantics.

| Proposition | Business authority | First Java checkpoint |
|---|---|---|
| Customer wants a particular basket | Customer intent | Supplied in request (not authenticated) |
| Platform recorded a valid request | Platform intake rules | **Implemented** in process-local volatile storage |
| Restaurant accepts/rejects fulfillment | Merchant / authorized restaurant decision | **Not implemented** |
| Provider authorized/captured/refunded money | External payment provider | **Not implemented** |
| Kitchen began preparation | Kitchen/restaurant policy | **Not implemented** |
| Courier completed handoff | Delivery authority and proof standard | **Not implemented** |

This scope avoids the classic error of turning a controller's HTTP success into a customer promise that the merchant and payment provider never made.

## 2. Real request and expected contract

The catalog is fictional Cedar Kitchen. Its demonstration items are Lentil Bowl (1250 USD minor units), Injera Combo (1800), and Seasonal Special (2100 but unavailable). These values are **not commercial menu data** and should not be interpreted as live merchant pricing.

~~~http
POST /api/orders HTTP/1.1
Content-Type: application/json
X-Request-ID: walkthrough-001

{
  "customerId": "6f1595f8-02bc-4484-9800-810a98b611ee",
  "restaurantId": "cedar-kitchen",
  "items": [{"menuItemCode":"lentil-bowl","quantity":2}]
}
~~~

Example of the response *shape* (orderId and createdAt are generated per call, so this is not a verbatim captured CI response):

~~~json
{
  "orderId": "<generated UUID>",
  "customerId": "6f1595f8-02bc-4484-9800-810a98b611ee",
  "restaurantId": "cedar-kitchen",
  "items": [{"menuItemCode":"lentil-bowl","name":"Lentil Bowl","quantity":2,"unitPriceCents":1250,"lineTotalCents":2500}],
  "quotedTotalCents": 2500,
  "currency": "USD",
  "intakeStatus": "REQUESTED_AWAITING_RESTAURANT",
  "restaurantDecision": "PENDING",
  "paymentStatus": "NOT_STARTED",
  "createdAt": "<server timestamp>",
  "meaning": "Platform recorded request; restaurant has not accepted and no payment was initiated"
}
~~~

The response has HTTP 201 Created and Location /api/orders/{orderId}. This means a new addressable intake record was created. It does not imply food was accepted for preparation or that money moved.

A rejected request (with seasonal-special) returns 422 with code ITEM_UNAVAILABLE. Quantity zero or malformed JSON yields 400 INVALID_REQUEST. These are distinct classes of failure, reflected by the HTTP adapter and business use case.

## 3. Implemented execution architecture

~~~mermaid
flowchart TD
  C[Customer-intent JSON request] --> H[OrderController: parse and validate]
  H --> U[PlaceOrderService: business decision]
  U --> M[MenuCatalog port]
  M --> MF[InMemoryMenuCatalog: synthetic fixture]
  U --> O[Order: immutable intake record]
  U --> R[OrderRepository port]
  R --> RM[InMemoryOrderRepository: volatile map]
  RM --> H
  H --> X[201 Created: request recorded; merchant PENDING; payment NOT_STARTED]
  H -. not implemented .-> MER[Merchant acceptance]
  H -. not implemented .-> PAY[Payment provider]
~~~

**Important:** the diagram is a source-derived conceptual representation, not an observed distributed trace or promise of communication to the dashed participants.

The HTTP adapter uses Jakarta Bean Validation. A structural invalidity is returned as 400 before the application can claim success. The application service uses a server-controlled demo catalog rather than accepting a client price. It converts the request into a fresh immutable Order, and a small OrderRepository port writes that resource to the in-memory adapter.

At this point no network boundary exists *within the application* and no external merchant or provider is called. The ports are in-process interfaces with real current value (testability and future adapter replacement). They do not imply independently deployed services.

## 4. Source and test traceability

| Transition / decision | Exact source at pinned commit | Executed evidence |
|---|---|---|
| HTTP request parsing, 201 and GET retrieval | [OrderController.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/src/main/java/com/academy/foodordering/api/OrderController.java) | MVC integration tests |
| Structural/business rejection conversion | [ApiExceptionHandler.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/src/main/java/com/academy/foodordering/api/ApiExceptionHandler.java) | MVC 400 and 422 tests |
| Business acceptance/rejection, quote and identity | [PlaceOrderService.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/src/main/java/com/academy/foodordering/application/PlaceOrderService.java) | 7 application unit tests |
| Synthetic merchant fixture | [InMemoryMenuCatalog.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/src/main/java/com/academy/foodordering/infrastructure/InMemoryMenuCatalog.java) | Unit + MVC test execution |
| Immutable intake fact | [Order.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/src/main/java/com/academy/foodordering/domain/Order.java) | Unit + MVC test execution |
| Volatile repository semantics | [InMemoryOrderRepository.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/src/main/java/com/academy/foodordering/infrastructure/InMemoryOrderRepository.java) | 1 repository unit test, MVC read |
| HTTP integration contract | [OrderControllerIntegrationTest.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/src/test/java/com/academy/foodordering/api/OrderControllerIntegrationTest.java) | 5 integration tests |
| Application policy tests | [PlaceOrderServiceTest.java](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/08b33714431a53f6b1cb1e1e09718b0281da1ce8/src/test/java/com/academy/foodordering/application/PlaceOrderServiceTest.java) | 7 unit tests |

## 5. Reproduction and actual CI run

From a machine with Java 21/Maven installed:

~~~bash
mvn -B -ntp verify
mvn spring-boot:run
~~~

Run the sample POST above in another terminal, then GET the resource using its returned Location. Query the fixture catalog with GET /api/restaurants/cedar-kitchen/menu. Observe that a second identical POST produces a different orderId, because idempotency is **not implemented**.

GitHub Actions at the pinned SHA executed Maven verify and passed **13 Java tests**: 7 service, 1 repository, 5 Spring MVC integration. It packaged a runnable jar, started that jar on CI port 18080, sent a real HTTP POST and asserted the 201 pending-merchant/payment-not-started fields. It also sent a real HTTP request for an unavailable fixture item and asserted 422 ITEM_UNAVAILABLE. See the exact [CI run](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42514283048).

The generated orderId from the live CI run is random; it is *not* a stable example fixture value. No live merchant, card provider, secure user environment or production database participated.

## 6. Alternative designs and their forces

**One process (chosen):** minimum meaningful dependency footprint, testable business decisions without a network, explicit fragile baseline. Trade-off: no independent module deployment, no real external actor, no durable storage.

**Split into multiple microservices (rejected now):** adds remote partial failure, timeouts, deployment coordination and observability cost. No demonstrated independent scale/release/ownership force requires the split yet. This remains a revisitable architecture decision, not a permanent prohibition.

**Introduce PostgreSQL immediately (deferred):** it would strengthen persistence, but before selecting schema/transaction boundaries we want to capture explicit domain invariants and use-case semantics. Current volatile behavior is a transparent baseline for a later durability evolution, not a safe default for customer data.

**Record arbitrary browser prices (rejected):** trusts potentially stale/tampered client values; the static server fixture is safer for the teaching model, though not real merchant price provenance.

**Add automated merchant/payment acceptance in PlaceOrder (rejected):** would conflate independent business authorities and create untested promises. Each future capability needs its own use case, policies, evidence, and implementation.

## 7. Known non-guarantees and next dependencies

No authenticated caller, tenant authorization, real merchant availability or kitchen capacity, external provider operations, commercial price contract, tax/discounts, persistent database, server-restart durability, order-commit idempotency, cross-instance shared state, race correctness across processes, delivery evidence or customer support workflow. Do not expose this educational API to real customer data or treat it as production commerce.

The next lesson is 1.1.3 — commands, decisions and domain facts. Use the real PlaceOrder baseline to separate customer intention, application acceptance/rejection, and resulting intake fact. Later lessons will justify persistence, lifecycle guards, idempotency, and remote collaboration through reproducible business pressures and experiments.
