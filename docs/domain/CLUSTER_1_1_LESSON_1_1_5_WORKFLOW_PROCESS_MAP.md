# Cluster 1.1 · Lesson 1.1.5 — Complete Food Ordering Business Process Map (V1)

**Status:** Analytical model; **not** an approved operational workflow.  
**Authority:** Master Roadmap V1 → Cluster 1.1 blueprint, Lesson 1.1.5 [C].  
**Engineering question:** How do responsibilities compose into a customer-visible business outcome?  
**Prior evidence:** [Java 1.1.4 immutable revision](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/ea17135cdc1974d89d78ce78931bb63cc5e9544e) and [30-test Java CI](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42782082917).

## 1. Evidence legend — never collapse these categories

- **I (implemented / verified):** Actual Java 21/Spring Boot one-process request intake at the pinned revision, with real tests and HTTP responses. An eligible PlaceOrder receives 201 and a resource URL, a local Order snapshot is saved, and a local OrderRequestRecorded fact is constructed after save returns. Rejected fixture requests return 422. Restaurant decision is PENDING and payment status NOT_STARTED. Storage is volatile; callers are not authenticated; repeated eligible POSTs create distinct OrderIds.
- **C (conceptual scenario):** A possible future merchant/payment/kitchen/delivery operation modeled for teaching. Its command, state or message is **not** implemented. An illustrative case may assume a legitimate actor has established a fact for the purpose of analyzing downstream effects.
- **P (policy-dependent):** A business rule, decision owner, timing, amount, liability or permitted transition is not yet approved; the story must carry the fork rather than silently resolve it. Policy IDs POL-01–POL-10 refer to the separate [decision backlog](CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md).
- **U (unknown outcome):** We do not have authoritative evidence of a business outcome. A submitted request, a send attempt or a missing acknowledgement is not evidence that the remote effect failed—or succeeded.

**Authority is fact-specific.** The platform may establish local intake. A restaurant decides its own commercial acceptance. A payment provider or relevant financial ledger establishes its actual financial operation. Kitchen and delivery participants establish their physical-work and custody milestones. The UI can only present a *derived observation*. These distinctions do not imply multiple deployed microservices.

## 2. Actor / responsibility / authority register

| Actor or role | Intent / commands | Decision or fact authority | Observable but nonauthoritative data | Obligations and uncertainty |
|---|---|---|---|---|
| Customer | Select items, request order, request cancellation, report delivery dispute | Own intent and personal receipt, **not** authenticated by present demo | Platform status, advertised menu, provider notifications | Cannot declare merchant acceptance or capture by clicking |
| Platform intake application **I** | Validate synthetic catalog, handle PlaceOrder, store intake, return 201/422 | Locally recorded intake only, conditional on normal process-local save | Claimed customer UUID; synthetic restaurant code | Process restart loses data, no duplicate-intent protection |
| Restaurant/merchant **C** | Accept/reject request, acknowledge cancellation, report fulfillment commitment | Authorized acceptance, rejection, merchant commitment | Customer/payment projections | Define response windows, ownership and exception policies |
| Kitchen **C** | Start, pause, complete preparation | Actual preparation/ingredient consumption facts | Order/payment status | Physical effort may be irreversible; cancellation policy varies |
| Payment provider/ledger **C** | Receive attempted authorization/capture/refund | Actual scoped provider operation results | Platform submission/acknowledgement | Authorization ≠ capture ≠ settlement; timeout may be U |
| Delivery / pickup participant **C** | Accept assignment, collect, hand off, record delivery | Custody/pickup/handoff evidence for its own operations | Merchant ready-for-pickup and UI projection | Ready ≠ picked up ≠ delivered; proof and dispute rules required |
| Customer support/operations **C** | Investigate partial or conflicting outcomes, communicate, escalate | Own case conclusions; cannot invent financial or physical facts | Multiple observed systems | Preserve references and audit trail; route corrections to real owners |
| Customer-facing read model/UI **C** | Present correlated observations | Display/refresh time only | Claims from every upstream authority | Can lag, join wrong identities, or display a false single “confirmed” |

## 3. Stable identity and correlation map

A customer reference (**CustomerId**) is not the authenticated caller; a **RestaurantId** is a synthetic catalog identity, not an external merchant registration. **OrderId** identifies the platform's one intake entity. \`GET /api/orders/{id}\` reads that entity within the running process. One *future* order may relate to many **PaymentAttemptIds**, each of which might relate to distinct provider operation IDs scoped by provider and merchant account. Callback/delivery IDs identify messages or observations, not new charges. A request ID or trace ID correlates technical activity, not a customer order; an idempotency key needs an independently defined server protocol.

\`\`\`text
Customer C-7 ──creates─────> Order O-17 (I: local intake)
                             │
                             ├── merchant decision R-17/decision-? (C/P)
                             ├── attempt P-101 (C) ── provider A / operation X-501 (C/U)
                             ├── attempt P-102 (C) ── provider A / operation X-509 (C/U)
                             ├── kitchen work K-4 (C/P)
                             └── pickup/delivery D-8 (C/P)
HTTP RQ-1, RQ-2 and trace TR-3 are **observations**, not OrderId or PaymentAttemptId.
UI state U-12 is a derived projection, not authoritative completion.
\`\`\`

The IDs above are diagram labels, not real persisted values. An alias between merchant or provider IDs requires an approved issuer-scoped mapping, not a matching display name.

## 4. Milestone contract and authority overlay

The following 12-stage process is one **illustrative candidate journey**. The relative order of merchant acceptance and payment handling is open under POL-01. The table describes the common responsibilities and possible branches, *not* one approved sequence. For each milestone, a reader should be able to trace who requested it, who can establish a fact, what the UI may say, and what happens when evidence is missing.

| # / classification | Trigger and decision / responsibility | Fact, actor authority and identity | Acknowledgement / projection | Rejection, uncertainty and effect |
|---|---|---|---|---|
| M1 **I, partially** | Customer chooses a fixture restaurant and available items | Customer intent, claimed CustomerId; synthetic MenuCatalog not a real merchant | Client may show selections | Menu fixture may be stale; real stock is not verified |
| M2 **I** | POST PlaceOrderCommand with restaurant code and basket | No successful business fact until validated and locally stored; request ID is not OrderId | HTTP call can time out | Repeated eligible POST produces new OrderIds; no deduplication |
| M3 **I** | Server validates customer ref, fixture restaurant, item availability, price and basket guards | Platform decision; \`PlaceOrderOutcome.Rejected\` or eligible intake | 422 business rejection for known invalid fixture inputs | Rejection does **not** establish OrderRequestRecorded |
| M4 **I** | Create typed IDs, save immutable Order to process-local repository, then create local fact | Platform-local OrderRequestRecorded associated with OrderId, CustomerId, RestaurantId | 201 Created + Location + REQUESTED_AWAITING_RESTAURANT | PENDING merchant / NOT_STARTED payment; crash loses stored data; response loss can be ambiguous |
| M5 **C/P** | Candidate handoff to authorized merchant for review | Submission/receipt is not merchant acceptance; RestaurantId needs authentic partner mapping | “Sent for review” only if actually observed | Unknown receipt, late response, wrong merchant, timeout (POL-02) |
| M6 **C/P** | Restaurant accepts or rejects according to verified policy | Merchant establishes MerchantAccepted or MerchantRejected for correct OrderId and merchant namespace | “Accepted” or “Rejected” only from valid evidence | Decision timing vs provider operation is open (POL-01, POL-02) |
| M7 **C/P** | Payment attempt(s) initiated under accepted sequencing policy | Provider authority for auth/capture/settlement; PaymentAttemptId distinct from OrderId | “Authorizing”, “Authorized”, “Captured” require different evidence | Rejection, timeout, double attempt, captured-then-rejected (POL-01,05,07,08) |
| M8 **C/P** | Kitchen begins preparation only after policy preconditions | Kitchen/merchant establishes work-started and materials consumed | “Preparing” only from authorized evidence | Physical irreversibility and cancellation liability (POL-03,04) |
| M9 **C/P** | Kitchen finishes and confirms readiness | Kitchen/merchant establishes ready-for-pickup | “Ready” is **not** pickup or delivery | Loss, quality issue, late prep, missing handoff |
| M10 **C/P** | Courier/pickup participant takes custody | Verified pickup/handoff record with actor and order reference | “Collected by courier” only after proof | Carrier assignment failure, missing pickup, wrong actor (POL-09) |
| M11 **C/P** | Delivery or pickup completion evidence received | Delivery actor and potentially customer establish distinct custody/completion claims | “Delivered” requires policy-defined completion evidence | Failed delivery, wrong recipient, dispute, return (POL-09) |
| M12 **C/P** | Present composed customer outcome or exceptional closure | Derived projection aggregates verified facts; UI never authors financial/physical truth | Precisely scoped “Completed”, “Refund pending”, etc. | Projection lag, conflicting screens, missing policy or provider evidence (POL-10) |

An illustrative success story selects policy assumptions explicitly: a restaurant accepts; the selected payment sequence has verified capture; authorized kitchen work completes; custody is handed off; delivery completion evidence is received; all obligations are reconciled. **Only M2–M4 are currently implemented in Java.** The current 201 response is not an M6, M7 or M12 completion.

## 5. Success narrative and alternate policy ordering

A customer chooses the fictional Cedar Kitchen menu and submits an eligible basket. The platform's validated PlaceOrder handler records an intake O-17 and replies 201 with a Location. In the real application, the journey stops at **REQUESTED_AWAITING_RESTAURANT**, restaurant **PENDING**, payment **NOT_STARTED**.

Now switch to a **conceptual future** continuation. Under candidate **acceptance-first**, merchant M-17 receives a correctly correlated request and explicitly accepts. A payment attempt P-101 is submitted, and authenticated provider evidence establishes capture under operation X-501. Authorized kitchen staff start work and later confirm ready-for-pickup. A courier records actual pickup and then delivery evidence. The customer UI can assemble these sourced facts into a fulfillment-complete projection, while separately preserving the exact financial stage.

Under candidate **payment-first**, an authorization or capture may occur before merchant confirmation. If merchant rejection follows capture, the product now has a money obligation without a fulfillment commitment. Payment-first can offer commercial advantages or risk controls in some arrangements, but it also exposes paid-and-rejected handling, refund timing, liability and customer trust; none is approved for this course demo. Record the alternatives under POL-01 and POL-05.

**The workflow is not one cross-actor atomic transaction.** Each participant may advance its own responsibility independently. This is a process narrative with authority boundaries, not one aggregate-level state machine or a distributed transaction proof.

## 6. Branch register — expected and unexpected partial completion

| Branch | Causal narrative | Required authoritative conclusion | What remains unsettled |
|---|---|---|---|
| B1 — paid then rejected | Provider reports captured for P-101, merchant subsequently rejects O-17 | Captured is a provider fact; rejected is a merchant fact; **both can be true** | Refund eligibility, amount, responsibility and timing (POL-01,05,06) |
| B2 — accepted then cancellation requested | Merchant accepted O-17; customer asks to cancel before preparation | Cancellation request is an intention, **not** OrderCancelled | Approval authority, response cutoff, provider implications (POL-03) |
| B3 — cancellation while preparing | Kitchen has consumed ingredients; customer requests cancellation | Work-started physical fact persists even if a logical order state later changes | Waste, compensation, liability and exception handling (POL-03,04) |
| B4 — refund pending | Refund submitted; provider acknowledges receipt but outcome not confirmed | Submission/acknowledgement ≠ completed financial reversal | Query/reconciliation and truthful customer messaging (POL-06,07) |
| B5 — provider result unknown | Capture request sent; HTTP reply lost | Neither success nor failure established from lost reply alone | Provider lookup and safe retry/duplicate effect policy (POL-07,08) |
| B6 — rejected fixture item | Java validates synthetic basket and rejects unavailable code | Verified 422 ITEM_UNAVAILABLE; no OrderRequestRecorded | Nothing external occurred; this is an **implemented** rejection |
| B7 — intake recorded, response lost | Repository may save, HTTP 201 not observed by caller | Caller uncertainty; do not repeat blindly as current POST is non-idempotent | Recover by correlation/operation ID only when supported (POL-08) |
| B8 — ready but not collected | Kitchen completed; delivery participant did not pick up | Ready ≠ collected; external custody not established | Timeliness, replacement, merchant liability and carrier assignment (POL-09) |
| B9 — conflicting customer/merchant screens | UI displays Confirmed based on intake; merchant view shows rejection | Screens are observations; validate merchant source and exact OrderId | Projection freshness, wrong identity join and corrective display (POL-02,10) |
| B10 — completion disputed | Courier reports handed off but customer disputes receipt | Actor claims must be separately attributable | Evidence threshold, dispute resolution, commercial remedy (POL-09,10) |

## 7. Financial, physical and operational side-effect boundaries

**Financial effect:** \`PaymentRequested\`, \`AuthorizationAttempted\`, provider acknowledgement, authorization confirmed, capture confirmed, settlement and refund confirmed are different propositions. Refund request and provider acceptance-for-processing do not reverse funds. A refund might be partial, fail or take time; the relevant provider/ledger authority must establish the actual effect. A captured-then-rejected branch creates an obligation to decide a remedy; it does not prove one already occurred.

**Physical effect:** Preparation-started may mean ingredients consumed, labor committed and food prepared. Changing a local status field or processing a cancellation does not reverse consumption. After pickup, the courier may have custody even though the merchant no longer has the order. A ready-for-pickup label is not evidence of custody transfer, and a courier's dropoff claim may not be the same as verified customer receipt.

**Communication effect:** A notification already sent cannot be unsent by rolling back a database field. The next action may be correction, compensation or human intervention rather than literal reversal. The policy register must identify when those actions are allowed and who owns them; neither a Saga implementation nor a generic "undo" button resolves policy by itself.

## 8. Temporal reasoning and ambiguity windows

One conceptual trace: T1 intake O-17 saved, T2 capture submitted P-101, T3 merchant rejects, T4 provider response still unknown, T5 UI says “Order cancelled.” At T5 we have *at most* the known local intake, confirmed merchant rejection if sourced, and an unknown provider operation. A rejection screen cannot imply money is uncharged; a lost reply cannot imply capture succeeded. If the provider subsequently reports capture at T6, the platform must route the newly established fact into a policy-defined refund/reconciliation process without retroactively pretending T5 had that knowledge.

Change only one ordering: suppose merchant rejection arrives *before* payment submission. A policy could prevent capture entirely, if it is approved and enforced. Change it again: a payment effect completes at T2 but the restaurant response is delayed. UI state must reflect separate sources rather than infer acceptance from paid. Message arrival time, business-effective time and observed UI refresh time are distinct quantities.

A request to cancel at T7 while kitchen prep starts at T8 is a race of business authorities. An eventual implementation needs an approved precedence/cutoff rule, atomic decision boundaries or reconciliation, and tests. This lesson **records the business problem**, while Lesson 1.1.6 and later lessons derive formal independent lifecycles and transition guards.

## 9. Diagnostics: customer Confirmed, merchant Rejected, payment receipt present

The incident's title combines three ambiguous observations. Start by identifying exactly what "Confirmed" means in the client, what the merchant's "Rejected" claim was based on, and what the "receipt" represents (intake, authorization, capture, settlement or a different operation). Recover OrderId, RestaurantId, provider/merchant namespace, payment-attempt ID, provider operation ID, request/correlation references, event/observation time and read-model freshness.

Competing hypotheses: UI mislabeled the 201 intake as confirmation; restaurant rejected after the UI refreshed; receipt is merely authorization; receipt relates to a different payment attempt; merchant alias joins wrong restaurant; callback delivery is repeated; the platform never received the authoritative rejection; a newer local observation overwrote an older but still relevant source fact. Each hypothesis needs distinct evidence. A screen is not authority to override a provider record or restaurant decision.

Communicate the narrow known facts to the customer and flag the uncertain part: “We recorded the request, the restaurant outcome appears disputed, and we cannot yet confirm the financial result. We are verifying the specific restaurant decision and provider operation before giving a final status.” In the real Java demo, the more precise statement is *intake recorded, restaurant pending, payment not started*. Do not imply a real support case or payment system exists.

## 10. Decision backlog as executable precondition for next designs

Read [POL-01–POL-10](CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md) before defining a state machine, deciding financial integration sequencing or writing transition code. Each open rule needs a legitimate business owner, options and evidence to settle it. A deterministic academy learning model may choose a clearly labeled *scenario assumption*, but it must never convert an unresolved policy into a verified platform guarantee.

**Acceptance for this Type C artifact:** The complete story traces every milestone to an actor and authority, represents multiple failure/uncertain paths, distinguishes irreversible effects from field updates, identifies delivery handoff, records substantive policy alternatives, and does not alter the real Java platform. The [Lesson 1.1.5 manuscript](../../content/lessons/1.1.5.md) and corresponding in-context Visual Textbook V2 swimlane must teach the same model. Lesson 1.1.6 is the next **separate** task.
