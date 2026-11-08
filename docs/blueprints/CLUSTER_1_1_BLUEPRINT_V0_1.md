# Cluster 1.1 — Deep-Learning Blueprint V0.1

**Status:** frozen scope contract for future lessons; not implemented lessons or verified Java tests.
**Authoritative roadmap:** [`MASTER_ROADMAP_V1.md`](../roadmap/MASTER_ROADMAP_V1.md)
**Blueprint JSON:** [`blueprint.json`](../../content/cluster-1.1/blueprint.json)
**Food Ordering Platform:** https://github.com/fasiltadesse22/food-ordering-platform-new

## Engineering question

What must remain correct regardless of the eventual architecture?

Correctness must be specified before deployment topology. The first implementation begins as one real, testable Spring Boot deployable; diagrams and simulators are explanatory models, not implementation evidence.

## Learning and reasoning dependencies

- **prerequisites:** Actors → capabilities → use cases → commands → facts → identities → lifecycles → guards → invariants → conflicts → tests
- **causality:** Customer intent → authorized command → decision/guard → state mutation → authoritative fact → observed outcome
- **failures:** Two read PLACED → both pass guard → interleaving writes → contradictory success → repair by atomic guard and verified evidence
- **project:** Requirements → minimal Spring Boot vertical slice → expanded local lifecycle → race experiment → verified invariant tests → ADR
- **evidence:** Prediction → controlled variables → executed test → observed transition / invariant result → interpretation / uncertainty → design decision

## Domain actors and disputed business policies

**Actors:** Customer; Restaurant operator; Food Ordering Platform; Payment provider (controlled simulator in first implementation); Kitchen staff; Delivery coordinator; Support operator

**Facts:** OrderPlaced; OrderAccepted; OrderRejected; OrderCancelled; PaymentAttemptStarted; PaymentSucceeded; PaymentFailed; RefundRequested; RefundCompleted; PreparationStarted; OrderCompleted

- May a customer cancel after Restaurant accepts? Initially assume no, then compare alternative window policies.
- Does payment occur before or after restaurant acceptance? Model both and choose one for the first implementation.
- Can a restaurant partially accept order items? Defer until core lifecycle established.
- When is a refund economically final? Only an actual provider confirmation may establish it.
- Who handles delivery failure after preparation? Record as open later workflow dependency.

## Derived chapter and lesson structure

### C1 — Business reality, responsibility and authority

Discover who is allowed to decide what, why each actor acts, and how a business request becomes an authoritative fact without assuming a service boundary.

#### 1.1.1 — Actors, goals, responsibilities and capabilities [C]

**Engineering question:** Who participates in an order and whose goal does each operation serve?

**Learning outcomes:** Construct a role/capability matrix for Customer, Restaurant, Payment Provider, Operations and Delivery.; Identify commercial decisions versus software responsibilities and external authorities.

**Prerequisites:** General application APIs and HTTP are assumed; no DDD vocabulary required.

**Technical scope:** Actors and stakeholders; incentives; customer experience; restaurant capacity; payment settlement exposure; responsibilities; business goals; authorization decisions; human versus automated actors.

**Mechanism trace:** Walk through one customer purchase, restaurant rejection and provider reversal; identify who may initiate, approve and observe each decision.

**Visual/interactive learning:** Editable actor-capability map with authority edges and contradictory-control warnings.; Timeline of a single order from menu selection through fulfillment.

**Practical examples:** Customer cancels after restaurant accepts; merchant refuses out-of-stock item; provider does not confirm card authorization.

**Real-project evolution:** C: document actors, responsibility boundaries, business scenarios; no Java changes before commands and use cases are understood.

**Experiments and evidence:** Scenario-based role mapping and counterexample review; baseline evidence is a written requirements model.

**Production diagnosis transfer:** Symptom: two parties believe they own cancellation; distinguish missing business policy from a network fault.

**Mastery standard:** Derive roles from an unfamiliar workflow, recognize ambiguous authority, and explain to nontechnical stakeholders.

**Interview/audience transfer:** 60-second actor explanation; Staff review challenges whether Restaurant or Payment owns an order's payment status.

#### 1.1.2 — Business scenarios and use-case discovery [A]

**Engineering question:** Which end-to-end user outcomes must a runnable platform support first?

**Learning outcomes:** Write precise success, rejection and exceptional paths for place, accept, reject, cancel, pay, refund, prepare and complete.; Choose one real vertical slice with explicit acceptance criteria and minimal dependencies.

**Prerequisites:** 1.1.1

**Technical scope:** Business capabilities; use-case boundaries; input intent; actor permissions; preconditions; postconditions; negative outcomes; bounded MVP scope; observation vs authority.

**Mechanism trace:** Trace customer place-order intent into application decision and visible result; compare restaurant acceptance/rejection and payment result as separate concerns.

**Visual/interactive learning:** Choose-an-actor use-case journey with alternate branches.; Sequence lanes: Customer → Platform → Restaurant → Payment Provider.

**Practical examples:** Place then restaurant rejects; restaurant accepts but payment fails; customer cancels while kitchen begins preparation.

**Real-project evolution:** A: initialize Java 21 root Maven and single Spring Boot deployable with initial place-order HTTP vertical slice, domain/application separation, in-memory adapter, unit tests and CI. No future microservices.

**Experiments and evidence:** Execute Maven root verify; positive/negative order placement, duplicate request test design; capture exact toolchain and commit SHA.

**Production diagnosis transfer:** A 2xx HTTP response is not automatically a completed business transaction; inspect use-case postcondition.

**Mastery standard:** Explain runnable slice, source/test paths and why not to introduce Kafka or PostgreSQL in this lesson.

**Interview/audience transfer:** Defend MVP scope and why a single deployable is the simpler architecture.

#### 1.1.3 — Commands, decisions, facts and events [A]

**Engineering question:** What separates an intention to change state from proof that it changed?

**Learning outcomes:** Classify commands, rejected decisions and committed business facts without confusing emitted messages with authority.; Design command contracts that identify actor, target, expected state and business meaning.

**Prerequisites:** 1.1.2

**Technical scope:** Commands vs facts/events; decision outcomes; negative facts; events as historical claims; side-effect intentions; acknowledgement; idempotency key concepts without distributed protocol yet.

**Mechanism trace:** Trace PlaceOrder → decision → OrderPlaced; AcceptOrder → decision → OrderAccepted; rejected attempts do not imply a successful domain fact.

**Visual/interactive learning:** Command/event sorting board; execution sequence from HTTP request to decision and persisted fact.; Alternative timeline distinguishing intent from actual effect.

**Practical examples:** Repeated PlaceOrder with same user intent; refund requested but not yet confirmed; merchant rejection before payment capture.

**Real-project evolution:** A: add application commands and explicit outcomes/events for validated first workflows; tests verify rejected commands cannot emit success facts.

**Experiments and evidence:** Unit tests for legal command outcomes, event ordering within local execution and rejection semantics.

**Production diagnosis transfer:** Customer sees 'success' but no persisted fact; discriminate API interpretation from application failure.

**Mastery standard:** Given a log of messages, identify which facts are authoritative and which are only requests.

**Interview/audience transfer:** Explain command/event distinction at junior, Senior and Staff depth without claiming events imply event sourcing.

#### 1.1.4 — Business identity and authoritative state [A]

**Engineering question:** Which identities are stable and which component is entitled to determine a fact?

**Learning outcomes:** Distinguish OrderId, PaymentAttemptId, RestaurantId, CustomerId and correlation/request IDs.; Specify authoritative versus derived state and identify cross-model references without forcing contexts or services prematurely.

**Prerequisites:** 1.1.3

**Technical scope:** Identity continuity; natural/surrogate references; generated identifiers; authority; state version; immutable history; aliasing; request/trace/business identifiers; ownership mapping.

**Mechanism trace:** Compare changing order status with recording payment provider outcome; a UI read model does not become authoritative by showing a status.

**Visual/interactive learning:** Identity/ownership graph highlighting authoritative source and projection readers.; Change-an-identity exercise showing duplicate/alias impacts.

**Practical examples:** Two payment attempts for one order; same restaurant name under different merchant IDs; repeated callbacks.

**Real-project evolution:** A: introduce typed stable business IDs and clearly owned mutable state to the single application; local verification for identity continuity.

**Experiments and evidence:** Entity identity tests across updates; repeated request does not silently create new OrderId when semantic rules prohibit it.

**Production diagnosis transfer:** A status read disagrees with a provider receipt; list alternate hypotheses before selecting the source of truth.

**Mastery standard:** Defend authority and identity map; recognize ambiguous derived views.

**Interview/audience transfer:** Staff challenge: who may assert 'payment completed' if provider response is delayed?

#### 1.1.5 — A complete Food Ordering workflow story [C]

**Engineering question:** How do responsibilities compose into a customer-visible business outcome?

**Learning outcomes:** Trace Order, Restaurant and Payment participation including rejection, cancellation, refund, preparation and completion.; Identify business outcomes, policies and unsettled assumptions before implementation.

**Prerequisites:** 1.1.1; 1.1.2; 1.1.3; 1.1.4

**Technical scope:** End-to-end scenario storyboarding; business collaboration; state vs observed messages; partial completion; receipt and refund implications; delivery handoff boundaries.

**Mechanism trace:** Build success and failure narrative; highlight where an unimplemented external provider must be simulated and where irreversible kitchen or financial effects begin.

**Visual/interactive learning:** Swimlane journey with branching paths and actor-controlled choices.; State/authority overlay for every milestone.

**Practical examples:** Paid and rejected; accepted then cancelled; preparation already started; refund requested but not confirmed.

**Real-project evolution:** C: establish process map and decision backlog; no additional code required for narrative work.

**Experiments and evidence:** Narrative walkthrough evidence + unanswered policy register.

**Production diagnosis transfer:** Diagnose conflicting customer and merchant screens with authority and timeline evidence.

**Mastery standard:** Trace every business fact to an actor and policy; identify at least three unresolved constraints.

**Interview/audience transfer:** Explain a partial customer journey to an engineering manager and a nontechnical stakeholder.

### C2 — Lifecycle semantics and decision mechanisms

Turn the business narrative into explicit states, legal decisions and before/after conditions, while preserving the distinction between a workflow and its participating state machines.

#### 1.1.6 — Workflows versus state machines [A]

**Engineering question:** Why is a workflow not a single state diagram?

**Learning outcomes:** Model independent lifecycles for Order, PaymentAttempt and RestaurantDecision.; Derive how a multi-actor workflow coordinates those lifecycles without claiming atomicity across them.

**Prerequisites:** 1.1.3; 1.1.4; 1.1.5

**Technical scope:** Workflow phases; explicit states; transition functions; separate state authority; state explosion; cross-lifecycle predicates.

**Mechanism trace:** Step through distinct order, payment and restaurant lifecycle states; demonstrate a workflow can progress while one participant remains pending.

**Visual/interactive learning:** Side-by-side lifecycle graphs; click a transition to reveal actor, guard and fact.; Workflow swimlane overlay.

**Practical examples:** Payment authorized while merchant decision pending; restaurant rejects while refund pending.

**Real-project evolution:** A: introduce explicit lifecycle types/transitions in domain modules of the single deployable; no cross-service calls.

**Experiments and evidence:** Transition table-driven tests with valid and invalid paths for each lifecycle.

**Production diagnosis transfer:** Incorrectly model 'REFUNDED' as an Order status and lose independent payment history; show diagnosis.

**Mastery standard:** Explain why Order aggregate state cannot represent every participant's state; identify missing context without creating services.

**Interview/audience transfer:** Defend a model split without confusing module with deployable.

#### 1.1.7 — Guards, preconditions and postconditions [A]

**Engineering question:** What makes a requested transition legal in a particular state?

**Learning outcomes:** Write total transition decision tables including guard failures and expected effects.; Separate required preconditions from side effects and ensure illegal commands leave state unchanged.

**Prerequisites:** 1.1.6

**Technical scope:** Transition guard; business authorization; precondition; postcondition; state preservation; failure result; side-effect-free rejection; illegal transitions.

**Mechanism trace:** Trace AcceptOrder: current=PLACED and eligible restaurant actor; mark checks, commit point and resulting fact.

**Visual/interactive learning:** Transition-table inspector with selectable current state/actor/command.; Rule explanation panel showing checked guards and no-op rejection.

**Practical examples:** Accept already rejected order; mark preparing before acceptance; complete before preparation.

**Real-project evolution:** A: implement guarded transition methods and application outcomes; preserve state on forbidden operations.

**Experiments and evidence:** Parameterized positive/negative transition tests; assert no success fact and no mutation on rejection.

**Production diagnosis transfer:** Suspected illegal transition: compare business guard, stale state and adapter mapping mistakes.

**Mastery standard:** Derive tests from model rather than from controller behavior alone.

**Interview/audience transfer:** Staff reviewer adds one exception policy mid-explanation; revise guards coherently.

#### 1.1.8 — Terminal, reversible and irreversible business effects [C]

**Engineering question:** When does 'undo' mean reversal, and when is compensation required?

**Learning outcomes:** Classify terminal states and reversible operations in Order, Restaurant and Payment flows.; Explain why provider refund and kitchen preparation cannot be undone by restoring old fields.

**Prerequisites:** 1.1.6; 1.1.7

**Technical scope:** Terminal state; correction; reversal; compensation; irreversible external effect; lifecycle closure; audit trail; human intervention.

**Mechanism trace:** Contrast canceling an unpaid draft with refunding a completed charge; compare kitchen preparation with metadata rollback.

**Visual/interactive learning:** Undo-versus-compensate decision tree; before/after business facts timeline.

**Practical examples:** Refund after successful capture; cancelled order after ingredients consumed; notification already sent.

**Real-project evolution:** C: document policy and missing provider API assumptions; do not claim real refunds without provider integration.

**Experiments and evidence:** Policy examples and counterexamples; trace attempted reversal and required compensating action.

**Production diagnosis transfer:** A previous order state is restored in DB but provider still charged: identify irreversibility and recovery work.

**Mastery standard:** Independently decide reversal versus compensation in a foreign domain.

**Interview/audience transfer:** Explain financial compensation carefully without introducing Saga prematurely.

#### 1.1.9 — Ordering, payment and restaurant lifecycle composition [A]

**Engineering question:** How do independent decisions constrain a shared business journey?

**Learning outcomes:** Define concrete ordering/payment/accept/reject/cancel/refund/prep/complete policies and exceptions.; Distinguish confirmed payment facts from requested or simulated provider outcomes.

**Prerequisites:** 1.1.6; 1.1.7; 1.1.8

**Technical scope:** Cross-lifecycle guards; payment attempt state; restaurant acceptance authority; cancellation window; preparation and completion; partial completion; refund initiation/outcome.

**Mechanism trace:** Walk an accepted-but-unpaid case and rejected-but-paid case without hiding unresolved money state.

**Visual/interactive learning:** Three synchronized state machines with highlighted guard dependencies.; Sequence view switching happy path and failure path.

**Practical examples:** Payment after cancellation; merchant reject after capture; customer cancel while preparation starts.

**Real-project evolution:** A: add deterministic local payment-provider simulation interface and restaurant decisions to real application workflow; record that provider is simulated.

**Experiments and evidence:** Integrated application tests for payment/restaurant/order transitions and recorded business outcomes; no fake external payment claim.

**Production diagnosis transfer:** Customer reports charge but merchant sees rejection; reconstruct state and provider-simulation assumptions.

**Mastery standard:** Specify policy choices and identify which require later strong persistence or distributed consistency.

**Interview/audience transfer:** Explain to Staff how failures will change once these calls become remote.

#### 1.1.10 — Workflow boundaries and collaboration without microservices [C]

**Engineering question:** Which interactions belong in one deployable now, and why?

**Learning outcomes:** Design in-process boundaries between Order, Restaurant and Payment responsibilities.; Identify potential future ownership seams without creating microservices and their network uncertainty.

**Prerequisites:** 1.1.5; 1.1.9

**Technical scope:** Business collaboration; application service orchestration; semantic modules; in-process calls; local atomicity assumptions; future remote boundary candidates.

**Mechanism trace:** Compare single-process call sequence with proposed remote calls; enumerate latency, failure and duplicated effects as hypothetical new forces.

**Visual/interactive learning:** Architecture dependency explorer, single-app baseline versus future extraction as a hypothesis.; In-process sequence diagram with commit boundaries.

**Practical examples:** A restaurant decision API is called twice; compare local handling with conceptual remote duplicate.

**Real-project evolution:** C: record modular architecture rationale/ADR; make only changes required to enforce already-discovered source responsibilities.

**Experiments and evidence:** Architectural dependency tests if code structure warrants; evidence-backed no-split decision.

**Production diagnosis transfer:** A shared model creates coupling; distinguish package/design smell from a need for a network boundary.

**Mastery standard:** Defend non-distribution as an active choice and list measurement triggers for reconsideration.

**Interview/audience transfer:** Staff interview: why not launch OrderService and PaymentService on day one?

### C3 — Invariants, concurrency, duplicates and consistency windows

Make correctness claims falsifiable by constructing stale, duplicated and competing decision sequences and separating fragile teaching models from verified runtime guarantees.

#### 1.1.11 — Invariant versus validation versus database constraint [A]

**Engineering question:** What must remain true even when input validation passes?

**Learning outcomes:** Derive domain invariants across order/payment/restaurant facts.; Distinguish request validation, domain invariants and local persistence constraints with counterexamples.

**Prerequisites:** 1.1.7; 1.1.9

**Technical scope:** Validation; domain invariant; database constraint; immutable business rule; concurrent write risk; atomicity; scope of enforcement.

**Mechanism trace:** Show 'valid JSON' and valid amount yet illegal payment-after-cancel; compare app guard and database unique constraint.

**Visual/interactive learning:** Invariant builder with scope and enforcement-layer toggles.; Three-column rule-to-evidence matrix.

**Practical examples:** Two accepted cancellations; negative amount caught by validation; duplicate payment success despite valid schema.

**Real-project evolution:** A: assert critical business invariants in domain/application logic and tests; defer PostgreSQL constraints until Cluster 1.2 when DB-backed guarantees can be observed.

**Experiments and evidence:** Counterexample-based tests and documented non-guarantees; simulated validation is never called DB protection.

**Production diagnosis transfer:** Unexpected duplicate payment: distinguish input validation bug from missing state/commit guard.

**Mastery standard:** State each invariant formally, its enforcement boundary and unsolved concurrency assumptions.

**Interview/audience transfer:** Defend why @NotNull alone does not protect payment correctness.

#### 1.1.12 — Repeated commands and duplicate business effects [A]

**Engineering question:** Why can a command be received twice and what should remain unchanged?

**Learning outcomes:** Define duplicate-request semantics separately for place, accept, pay, cancel and refund.; Identify when repeating a command should return previous result, reject, or create a new attempt.

**Prerequisites:** 1.1.3; 1.1.11

**Technical scope:** Command identity; duplicate intent; business effect; repeated HTTP request; idempotency as semantic property; same key/different payload; incomplete outcome.

**Mechanism trace:** Replay one request before/after state update and classify effects; distinguish an additional PaymentAttempt from accidental duplicate capture.

**Visual/interactive learning:** Duplicate-command ledger and before/after effect counters.; Retry timeline with command-ID and business-ID labels.

**Practical examples:** Customer double-click; provider callback repeated; repeated refund initiation.

**Real-project evolution:** A: implement locally deterministic repeat-command handling for selected workflows and unit tests; state that this does not prove distributed exactly-once semantics.

**Experiments and evidence:** Repeat-command tests, conflict payload tests and reset/replay evidence.

**Production diagnosis transfer:** Two receipts appear: determine whether two commands, two successful state changes or duplicated view/event were observed.

**Mastery standard:** Document replay outcome and safeguards for each command type.

**Interview/audience transfer:** Staff challenges idempotency key lifetime and payload mismatch; name what remains undecided until Phase IV.

#### 1.1.13 — Cancellation-versus-acceptance interleaving [B]

**Engineering question:** Can two separately valid decisions both succeed incorrectly?

**Learning outcomes:** Predict concurrent command outcomes given identical observed state.; Demonstrate why check-then-write without atomic guard can violate exclusive business outcomes.

**Prerequisites:** 1.1.7; 1.1.11; 1.1.12

**Technical scope:** Racing reads; stale snapshot; linearization/commit point intuition; lost updates; guard-and-write atomicity; synchronization limitations.

**Mechanism trace:** Interleave Customer.Cancel and Restaurant.Accept at read/check/write stages; compare unsafe blind write with single atomic compare-and-update.

**Visual/interactive learning:** Required simulator: actor lanes, interleaving mode, safe/unsafe toggle, step-by-step timeline, both-success invariant alarm.

**Practical examples:** Cancellation and acceptance both observe PLACED, both claim success; last-write-wins DB state conceals business contradiction.

**Real-project evolution:** B: preserve fragile race as reproducible test/experiment; introduce local concurrency control only where a measurable reproduced violation requires it.

**Experiments and evidence:** Concurrent deterministic tests/barriers, model counterexample, observed vs assumed notes; no cross-process correctness claim.

**Production diagnosis transfer:** One customer sees cancellation, restaurant sees accepted: construct competing causal hypotheses and a discriminating test.

**Mastery standard:** Independently identify race window, specify minimal guard, explain why local synchronization alone may not solve multi-process writes.

**Interview/audience transfer:** Staff interviewer introduces two instances and asks what guarantee changes.

#### 1.1.14 — Payment-after-cancellation and modification-after-payment [B]

**Engineering question:** What changes when a delayed financial outcome arrives after business state moved?

**Learning outcomes:** Distinguish payment initiation, authorization, capture and recorded confirmation in a simulated provider.; Design policy for order mutation once financial commitment or merchant acceptance changes.

**Prerequisites:** 1.1.8; 1.1.9; 1.1.11; 1.1.13

**Technical scope:** Delayed outcomes; order modification guards; payment-after-cancel policy; refund-needed state; external side-effect uncertainty.

**Mechanism trace:** Record attempt, mark order cancelled, then deliver success outcome; trace unresolved financial obligation without reverting cancellation.

**Visual/interactive learning:** Delayed payment outcome timeline with business versus provider state.; Modification guard matrix by order/payment state.

**Practical examples:** Pay succeeds after cancel; amount changes after authorization; refund requested but pending.

**Real-project evolution:** B: implement controlled provider-simulator delay scenarios and tests, not real payment integration or Saga/Outbox.

**Experiments and evidence:** Tests for immutable confirmed amounts, refund obligation, late outcome, state/history consistency.

**Production diagnosis transfer:** Customer 'charged after cancel': inspect provider outcome, system fact, callback time and missing evidence.

**Mastery standard:** State what is guaranteed locally and what will need asynchronous coordination later.

**Interview/audience transfer:** Explain to nontechnical stakeholder why cancellation does not imply immediate financial reversal.

#### 1.1.15 — Stale decisions and versioned state [B]

**Engineering question:** How can valid business checks become invalid before they commit?

**Learning outcomes:** Describe TOCTOU decision windows and distinguish stale read from stale authority.; Derive version-based guards and show where a version check must be atomic with mutation.

**Prerequisites:** 1.1.4; 1.1.13

**Technical scope:** Time-of-check/time-of-use; snapshot; version; compare-and-set; lost update; transaction isolation intuition; auditability.

**Mechanism trace:** Two clients use Order version 4; one commits version 5, the other tries version 4; contrast optimistic conflict with blind overwrite.

**Visual/interactive learning:** Versioned state timeline with two concurrent readers and conflict result.; Concurrency warning overlay.

**Practical examples:** Accepted order later cancelled from stale snapshot; repeated payment attempt with stale amount.

**Real-project evolution:** B: show reproducible stale-state test and architecture note; DB-level optimistic locking deferred until Cluster 1.2 real PostgreSQL integration.

**Experiments and evidence:** Barrier-driven conflict tests and explicit 'simulated vs locally observed vs database-guaranteed' classification.

**Production diagnosis transfer:** Lost update observed: isolate stale reads, commit ordering and read-model freshness as alternate causes.

**Mastery standard:** Specify exact required atomic comparison for a promised guarantee.

**Interview/audience transfer:** Staff challenge asks whether an in-memory version field suffices across replicas.

#### 1.1.16 — Atomicity, consistency boundaries and unknown commit outcomes [C]

**Engineering question:** What state changes must succeed or fail together, and what cannot be made atomic by one in-memory method?

**Learning outcomes:** Identify locally coherent transitions and cross-participant decisions that cannot be presumed atomic.; State guarantees, assumptions and non-guarantees around persistence, concurrency and external provider effects.

**Prerequisites:** 1.1.11; 1.1.13; 1.1.14; 1.1.15

**Technical scope:** Atomic transition; all-or-nothing local update; external effects; consistency boundary; crash window; durable versus transient state; uncertainty after timeout.

**Mechanism trace:** Mark business state plus local fact and explore crash before/after each step; compare conceptual external provider uncertainty.

**Visual/interactive learning:** Commit-window storyboard with application, adapter and provider states.; Guarantee ledger: observed/assumed/not guaranteed.

**Practical examples:** Crash after provider success but before local record; timeout with unknown provider status; partial in-memory update.

**Real-project evolution:** C: document consistency boundary and minimal application test gaps; no premature transaction framework, Saga or outbox.

**Experiments and evidence:** Thought experiment and tests only where runtime conditions can be controlled; unknown outcomes labeled not guaranteed.

**Production diagnosis transfer:** Distinguish process crash, partial business failure and HTTP loss; choose evidence for each.

**Mastery standard:** Draw scope of local atomic guarantee accurately and list unresolved distributed windows.

**Interview/audience transfer:** Defend why a local @Transactional annotation cannot atomically commit a remote provider effect.

### C4 — Verification, diagnosis, architectural defense and transfer

Turn requirements and fragile-state examples into testable evidence, incident reasoning and independent Staff-level design communication.

#### 1.1.17 — Correctness test design and evidence hierarchy [A]

**Engineering question:** Which tests would falsify a proposed business invariant?

**Learning outcomes:** Construct transition, command, property, negative, concurrency and integration test matrices.; Keep claims limited to executed environments and distinguish tests from database or production guarantees.

**Prerequisites:** 1.1.7; 1.1.11; 1.1.12; 1.1.13; 1.1.15; 1.1.16

**Technical scope:** Test pyramid; state-based and transition tests; invariants; concurrency barriers; reproducibility; evidence labels; experiment controls; CI gates.

**Mechanism trace:** Derive tests for legal/illegal decisions, repeated commands and races; align observed outcomes with precise invariant claims.

**Visual/interactive learning:** Interactive test matrix coverage grid; one-click counterexample explanation.; Evidence badge toggles distinguishing observed and hypothetical.

**Practical examples:** Unit tests pass but same API request race fails; CI green for unit suite but integration not run.

**Real-project evolution:** A: ensure Maven root verify and relevant application tests execute; add any missing tests only where justified and capture real outputs.

**Experiments and evidence:** Test command manifest, exit codes, environment, evidence links and negative cases; no claim of PASS if not executed.

**Production diagnosis transfer:** A green test badge masks missing failure scenario: identify scope hole rather than declaring full correctness.

**Mastery standard:** Create verification plan and accurately label strength/limitations of evidence.

**Interview/audience transfer:** Staff challenge: which test is discriminating and which is merely a happy-path example?

#### 1.1.18 — Production-oriented failure diagnosis [B]

**Engineering question:** How can a failure report be translated into competing hypotheses and discriminating evidence?

**Learning outcomes:** Reconstruct symptom, scope, chronology and likely causal windows.; Avoid treating one timeout/log/event as proof of root cause.

**Prerequisites:** 1.1.12; 1.1.13; 1.1.14; 1.1.17

**Technical scope:** Incident symptom; affected users; timeline; logs/identifiers; competing hypotheses; discriminating test; causal chain; mitigation; validation.

**Mechanism trace:** Investigate duplicate payment and conflicting order status as separate incidents; choose what telemetry would disambiguate them.

**Visual/interactive learning:** Interactive diagnostic evidence board: choose among hypotheses and reveal clues.; Timeline builder with uncertain ordering.

**Practical examples:** Customer cancelled but restaurant prepared; duplicate provider charge versus duplicated display fact.

**Real-project evolution:** B: isolate reproducible failure scenarios and capture logs/tests locally; advanced distributed traces deferred.

**Experiments and evidence:** Observed reproduction record, log correlation limits and explicit next-step diagnostic tests.

**Production diagnosis transfer:** Hypothesis: event delivered twice; alternate: command processed twice; choose evidence distinguishing them.

**Mastery standard:** Explain a credible causal chain and a safe mitigation, including what remains unproven.

**Interview/audience transfer:** Adapt incident briefing for engineer, manager and nontechnical stakeholder.

#### 1.1.19 — Simpler alternatives, architectural decisions and deferment [C]

**Engineering question:** When is doing less the better architecture?

**Learning outcomes:** Compare minimal guarded local workflow with imagined microservice/Kafka/Saga alternatives.; Write evidence-based ADRs with trade-offs, risks and reconsideration triggers.

**Prerequisites:** 1.1.10; 1.1.16; 1.1.17; 1.1.18

**Technical scope:** Simplicity vs distributed complexity; quality attributes; migration cost; decision reversibility; ADR; removal trigger; known fragility.

**Mechanism trace:** Compare synchronous in-process decisions to remote ownership; enumerate new failure windows, operational burden and legitimate future split forces.

**Visual/interactive learning:** Architecture alternatives slider: same business need, cost/failure/ownership tradeoffs.; ADR evidence decision tree.

**Practical examples:** Overengineered Kafka for a local state update; insufficient ownership clarity; harmful shared database.

**Real-project evolution:** C: record topology ADR; any project code change must have an existing demonstrated force rather than being a decoration.

**Experiments and evidence:** Decision record cites observed/assumed evidence and contains explicit revisit conditions.

**Production diagnosis transfer:** A design change is suggested because of a transient error; separate signal from architectural force.

**Mastery standard:** Defend retaining one deployable in Phase I and explain when the decision should change.

**Interview/audience transfer:** Staff interview: 10× load, team halved, payment provider unstable; revise recommendation without dogma.

#### 1.1.20 — Communication, unfamiliar-domain transfer and cluster exit gate [C]

**Engineering question:** Can you independently derive, validate and defend correctness constraints in a different business domain?

**Learning outcomes:** Explain business rule, mechanism and trade-off at increasing abstraction levels.; Transfer invariants/authority/reversal reasoning to reservations, inventory or ledger-like operations.

**Prerequisites:** 1.1.1–1.1.19

**Technical scope:** Synthesis of actors, intents, facts, authority, lifecycle, guards, terminality, invariants, concurrency, duplicate/stale operations, atomicity, evidence and defense.

**Mechanism trace:** New scenario arrives with missing facts; reconstruct lifecycle, write invariants, predict race, choose tests and defend simple design.

**Visual/interactive learning:** Timed design canvas with revealing constraints; competency rubric; dependency/retrieval links to 1.2, 1.3, 1.4 and Phases III–IX.

**Practical examples:** Hotel room booked twice; inventory oversold; payment reversal requested after ledger posting.

**Real-project evolution:** C: freeze verified Cluster 1.1 checkpoint state and handoff; app build remains meaningful only if tests actually executed.

**Experiments and evidence:** Mastery gate: explain/implement/test/diagnose/defend; evidence-index with actual SHAs, limits and deferred mechanisms.

**Production diagnosis transfer:** Interviewer supplies ambiguous duplicate booking; enumerate hypotheses and specify evidence plan.

**Mastery standard:** Independently produce invariant table, trade-off analysis and readable Staff-level explanation.

**Interview/audience transfer:** Adapt explanations for backend engineer, Staff/Principal reviewer, engineering manager and stakeholder; assess English clarity separately.

## Roadmap-to-lesson traceability (explicit coverage)

| Authoritative obligation | Lesson IDs |
|---|---|
| actors; goals; responsibilities; use cases | 1.1.1, 1.1.2, 1.1.5 |
| commands; domain facts/events; identity; authoritative state | 1.1.3, 1.1.4, 1.1.6 |
| state machines; legal/illegal transitions; guards; preconditions; postconditions | 1.1.6, 1.1.7, 1.1.9 |
| terminal/reversible/irreversible states; reversal vs compensation | 1.1.8, 1.1.9, 1.1.14 |
| validation rules; invariants; database constraints | 1.1.11, 1.1.16, 1.1.17 |
| conflicting/concurrent operations; duplicate commands; stale decisions | 1.1.12, 1.1.13, 1.1.15 |
| atomicity; consistency implications; durable/transient effects | 1.1.16, 1.1.17 |
| business vs technical failures; observable evidence; diagnosis | 1.1.14, 1.1.17, 1.1.18 |
| simpler alternative; over-engineering failure; project architecture trade-off | 1.1.10, 1.1.19 |
| communication; Staff interviews; unfamiliar-domain transfer; delayed retrieval | 1.1.18, 1.1.19, 1.1.20 |
| duplicate payment | 1.1.12, 1.1.14, 1.1.18 |
| cancellation/acceptance race | 1.1.13, 1.1.15, 1.1.17 |
| modification after payment | 1.1.9, 1.1.14 |
| payment after cancellation | 1.1.9, 1.1.14, 1.1.16 |
| illegal transition | 1.1.7, 1.1.17 |
| repeated command | 1.1.12, 1.1.17 |
| stale-state decision | 1.1.13, 1.1.15, 1.1.16 |

## Real application evolution plan

- **1.1.1 [C]** Produce actors, scenario matrix and authority map without making a Java repo commit.
- **1.1.2 [A]** Initialize Java 21 Maven root, single Spring Boot deployable, minimal PlaceOrder HTTP flow, in-memory repository, unit tests, CI; first verification checkpoint.
- **1.1.3–1.1.4 [A]** Explicit command/fact/outcome types and stable business IDs; preserve simple structure and unit tests.
- **1.1.5 [C]** Scenario inventory, unresolved business-policy register and complete actor journey.
- **1.1.6–1.1.7 [A]** Lifecycle and transition guards for Order, PaymentAttempt and RestaurantDecision; table-driven tests.
- **1.1.8 [C]** Document reversibility and external compensation limitations; no fake provider effects.
- **1.1.9 [A]** Add local, explicitly simulated payment provider and restaurant decisions with testable policies.
- **1.1.10 [C]** Record no-premature-split ADR with measured/revisit criteria.
- **1.1.11–1.1.12 [A]** Enforce invariants, repeat-command handling for selected operations, negative tests.
- **1.1.13–1.1.15 [B]** Reproducible concurrency, duplicate and late-payment experiments; preserve fragile baseline, no unjustified infrastructure.
- **1.1.16 [C]** Document atomicity boundaries and unresolved durable/remote uncertainty; defer DB-backed guarantees to 1.2.
- **1.1.17 [A]** Close specific test gaps, run root Maven verification and inspect CI evidence.
- **1.1.18 [B]** Incident hypothesis evidence exercises linked to executed failure harnesses where available.
- **1.1.19–1.1.20 [C]** ADR, design defense, cross-domain mastery and handoff; freeze verified checkpoint SHAs.

## Interactive lab specifications

### LAB-11-01 — Interleaving Race Explorer

**First introduced:** 1.1.13

**Mechanism:** Single-order, two-actor deterministic state machine: Cancel and Accept; choose atomic check/update vs unsafe check-then-write; vary arrival order; show both-success contradiction.

**Controls:** Execution order; Guarding strategy; Second repeated command

**Warnings:** Success fact contradiction; Last-write-wins lost update

**Limitations:** Educational deterministic model; does not reproduce JPA, network or multi-process transactions.

**Validation:** Pure transition unit tests + later Java concurrency harness

### LAB-11-02 — Lifecycle Composer

**First introduced:** 1.1.6

**Mechanism:** Separate Order, PaymentAttempt, RestaurantDecision lifecycles with cross-state predicates.

**Controls:** Actor; Command; Current state; Payment outcome

**Warnings:** Illegal transitions; Unknown provider outcome

**Limitations:** Lifecycle policy is provisional until business validation.

**Validation:** undefined

### LAB-11-03 — Authority Map

**First introduced:** 1.1.1

**Mechanism:** Actors and source-of-truth graph for critical business facts.

**Controls:** Select fact; Change responsible actor; Show competing owner

**Warnings:** Two authorities; Missing accountability

**Limitations:** Organizational choices are business requirements, not code guarantees.

**Validation:** undefined

### LAB-11-04 — Duplicate Command Ledger

**First introduced:** 1.1.12

**Mechanism:** Replay command identities over order/payment attempts and classify duplicate effect policy.

**Controls:** Command ID; Payload version; Replay count

**Warnings:** Double business effect; Payload conflict

**Limitations:** Local semantic demo, not distributed exactly-once delivery.

**Validation:** undefined

### LAB-11-05 — Diagnosis Caseboard

**First introduced:** 1.1.18

**Mechanism:** Competing hypotheses for late payment, duplicate provider receipt or conflicting acceptance.

**Controls:** Evidence request; Hypothesis selection

**Warnings:** Overconfident root cause

**Limitations:** Synthetic case; observed project evidence linked separately after experiments.

**Validation:** undefined

## Evidence and checkpoint contract

- **testKinds:** unit/domain transition table; application use-case positive/negative; HTTP integration for selected flows; duplicate-request behavior; deterministic concurrency interleaving; controlled fault/late-outcome tests
- **labels:** observed; measured; structurally demonstrated; inferred; assumed; hypothetical; guaranteed under stated model; not guaranteed
- **commands:** mvn -B verify (when Maven project exists); npm run check:content (academy); npm run typecheck (academy); npm run test (academy); npm run build (academy)
- **caveats:** No actual Java tests are run in Phase 0 because the platform is intentionally not yet implemented.; Simulation results are not runtime observations.

## Cluster exit mastery gate

1. Derive business actor/authority and use cases independently.
2. Provide a falsifiable lifecycle and invariant table for Order, Restaurant and Payment.
3. Predict outcomes under duplicate, cancellation race, late payment and stale-state cases.
4. Reproduce a relevant test or explain precisely why execution evidence is unavailable.
5. Distinguish documented rule, implemented guard, observed result and environment-bound guarantee.
6. Diagnose at least one failure using multiple hypotheses and a discriminating test.
7. Defend one simpler alternative and one overengineering failure to a Staff reviewer.
8. Transfer correctness reasoning to a different domain, without copying solution shapes.

## Forward-dependency retrieval

- **1.2:** Aggregate and transaction boundaries from invariants; real PostgreSQL and optimistic concurrency.
- **1.3:** Separate semantic ownership and translate ambiguous models.
- **1.4:** Evidence-based deployment decision.
- **3.x:** Remote execution creates uncertainty around previously local decisions.
- **4.x:** Retries, duplicate effects and ambiguous outcomes become distributed.
- **8.x:** Distributed data ownership, consistency and freshness.
- **9.x:** Multi-authority workflows, compensation and reliable propagation.

## Deferred mechanisms

- Multiple Spring Boot services by default
- Kafka, Redis, Outbox, Saga, CQRS, Event Sourcing
- Real-money payment processing
- Production-wide concurrency claims from in-memory tests
- Kubernetes/cloud platform setup

## Current state and non-guarantees

- These specifications were derived from the published roadmap and are not evidence of a running Java service or successful HTTP/DB experiment.
- The first React interleaving simulator is deterministic pedagogical modeling. It is not evidence of successful Java concurrency enforcement.
- Phase 0 intentionally leaves `food-ordering-platform-new` application source untouched; the first actual engineering checkpoint is tied to Lesson 1.1.2.
