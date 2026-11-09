# Lesson 1.1.3 — Commands, Decisions, Facts and Events · Final Academy Checkpoint

**Date:** 2026-11-09  
**Scope:** Master Roadmap V1, Cluster 1.1, Chapter 1, Lesson 1.1.3  
**Mode:** A — real platform evolution; D — React academy evolution  
**Engineering question:** What separates an intention to change state from proof that it changed?

## Immutable cross-repository continuity

| Resource | Version / evidence |
|---|---|
| Prior verified academy Visual Textbook V2 main | [2e6e514dacfa50ed66c34ad6388142af59cd77f7](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/2e6e514dacfa50ed66c34ad6388142af59cd77f7) |
| Academy verified lesson implementation (before this documentation checkpoint) | [ef6b443487b866c8bb434f1b999fe36d747bf146](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/tree/ef6b443487b866c8bb434f1b999fe36d747bf146) |
| Academy standard test/build run | [42592608082](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608082) — success |
| Academy Chromium browser run | [42592608081](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/42592608081) — success |
| Java Lesson 1.1.2 baseline | [08b33714431a53f6b1cb1e1e09718b0281da1ce8](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/08b33714431a53f6b1cb1e1e09718b0281da1ce8) |
| Java Lesson 1.1.3 main checkpoint | [225db684a24080f2c4ad1ae6e2f5e259edf0aa7d](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d) |
| Java post-merge CI | [42590153411](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42590153411) — success |

This checkpoint is a documentation follow-up to the verified academy source SHA; verify the updated commit separately before merging. The two repositories have independent commit histories.

## Lesson content and assessment

The full [16-topic, approximately 8,000-word manuscript](../content/lessons/1.1.3.md) teaches nine stages—Orient, Understand, Explore, Predict, Engineer, Verify, Diagnose, Defend and Retain. Topics cover command intention, command/actor/target contracts, typed decisions and business rejection, historical facts and event naming, local versus external authority, error and ambiguity windows, retry and identity, Java implementation, exact test evidence, incident investigation, Staff review and hotel/banking transfer.

The lesson fulfills the Cluster 1.1 blueprint without rewriting Lessons 1.1.1/1.1.2 or changing the accepted Visual Textbook V2 system. The chapter/lesson/topic sidebar exposes all 16 meaningful titles through bookmarkable `/#/lesson/1.1.3?section=N` links.

Two complementary visuals occur in context:
- [CommandFactFlow](../src/lessons/lesson113/Mechanisms.tsx) is a **static, source-derived six-boundary sequence** from customer intent to acknowledgement. It visibly distinguishes successful local recording, known rejection and uncertain effects.
- [CommandFactLab](../src/lessons/lesson113/Mechanisms.tsx) is a **deterministic TypeScript prediction exercise**. Five scenarios: normal intake, unavailable fixture item, identical-repeat non-idempotency, lost HTTP response, and write-then-throw failure injection. Input changes produce prediction feedback, a causal timeline, modeled facts/intakes, observed client behavior, and evidence limits.

The lesson also provides a ten-entry command/rejection/fact/acknowledgement classification table, multi-actor authority matrix, source-linked Java code, comparison of 201/422/unknown conditions, evidence table, diagnostic process, adversarial engineering interview discussion and cross-domain transfer.

## Real Java implementation

The Java platform remains **one Spring Boot deployable** with the same HTTP controller contract. See [Java applied engineering contract](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/docs/engineering/LESSON_1_1_3_COMMAND_FACT_CONTRACT.md) and [Java checkpoint](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/checkpoints/LESSON_1_1_3.md).

- `PlaceOrderService.handle(PlaceOrderCommand)` returns `PlaceOrderOutcome.Recorded(Order, OrderRequestRecorded)` only **after** the in-process `OrderRepository.save` returns normally; predictable business rejections return `PlaceOrderOutcome.Rejected(code,message)`.
- `OrderRequestRecorded` identifies local intake and the observation-after-save time, **not** a durable event commit, broker message, merchant acceptance or payment.
- The existing `place()` method adapts the new typed outcome to the previous `Order` / `BusinessRejection` API, preserving HTTP 201 + Location, 422 rejections and explicit `restaurantDecision: PENDING` / `paymentStatus: NOT_STARTED`.
- A save-then-throw injected adapter demonstrates **unknown effect**. An error after a possible write must not be relabeled business rejection or absence.
- Repeated POST remains non-idempotent; correlation is not de-duplication.

No AcceptOrder endpoint, payment provider, refund operation, Kafka, transactional Outbox, Event Sourcing, CQRS, durable database, event journal, or authentication protocol has been added. These are intentionally deferred pending future approved domain and quality-attribute contracts.

## Executed verification

**Java**: 18/18 Maven JUnit tests passed: five MVC integration, seven existing PlaceOrder application, five new decision/fact, one repository. Maven package and real packaged Spring Boot process smoke ran: valid fixture POST produced 201 Created with pending/no-payment fields; unavailable fixture POST produced 422 ITEM_UNAVAILABLE. This establishes only the tested environment and narrow business contract.

**Academy**: 45/45 Vitest tests in 11 files passed, covering existing lessons, pure models and new UI; roadmap/blueprint/lesson-content audit passed with 19 phases, 93 clusters, 4 Cluster 1.1 chapters, 20 lesson specs and all 16 new lesson topics. TypeScript typecheck and Vite production build succeeded. 30/30 Playwright Chromium browser tests passed, including deep navigation, desktop/mobile dark/light layout, no page errors, new command/fact lab branches and regressions for the previous lessons.

The source-derived timeline is **not** captured distributed tracing. Browser tests prove UI/model behavior, not Java payments, merchant effects or production durability. Spring tests do not prove crash survival or provider operations.

## Project files and evidence

- [Deep manuscript](../content/lessons/1.1.3.md)
- [Applied walkthrough](../docs/engineering/LESSON_1_1_3_APPLIED_WALKTHROUGH.md)
- [React lesson](../src/lessons/lesson113/Lesson113.tsx)
- [Visuals and lab](../src/lessons/lesson113/Mechanisms.tsx)
- [Deterministic simulation model](../src/lessons/lesson113/model.ts)
- [Academy unit tests](../src/lessons/lesson113/model.test.ts)
- [Academy browser tests](../e2e/lesson113.spec.ts)
- [Java typed decision](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/main/java/com/academy/foodordering/application/PlaceOrderOutcome.java)
- [Java local fact](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/main/java/com/academy/foodordering/domain/OrderRequestRecorded.java)
- [Java tests](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/225db684a24080f2c4ad1ae6e2f5e259edf0aa7d/src/test/java/com/academy/foodordering/application/PlaceOrderDecisionTest.java)

## Architecture rationale and exit gate

The simplest truthful mechanism is a local typed decision and a post-save fact representation inside one application. That makes successful intake, rejection and unknown storage effect distinguishable without claiming the system has a durable event history. A second mutable event journal would add an uncoordinated write without providing transactional durability. Revisit durable storage, provider integration, safe retry protocol and event publication only when their actual business or reliability requirements justify them.

Lesson 1.1.4 — Business Identity and Authoritative State may start after the final academy document commit is verified. It must distinguish OrderId, customer, restaurant, correlation/request and external payment identities, but is not in scope for this checkpoint.
