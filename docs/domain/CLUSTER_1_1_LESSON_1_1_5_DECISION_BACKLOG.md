# Cluster 1.1 · Lesson 1.1.5 — Unresolved Business Policy & Decision Backlog (V1)

**Status:** Analysis, NOT business approval.  
**Roadmap:** Master Roadmap V1, Cluster 1.1, Chapter 1 Lesson 1.1.5 [C].  
**Connection:** [Complete Food Ordering Workflow Process Map](CLUSTER_1_1_LESSON_1_1_5_WORKFLOW_PROCESS_MAP.md).  
**Source boundary:** The [Java 1.1.4 checkpoint](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/ea17135cdc1974d89d78ce78931bb63cc5e9544e) implements only synthetic-menu order-request intake, typed IDs, local post-save fact and HTTP 201/422. It has no merchant, provider, kitchen, carrier, customer authentication or durable storage integrations. **All POL entries remain UNRESOLVED.**

## Governance: how a decision actually becomes authoritative

A candidate policy is a proposed rule, not an application invariant until a legitimate business authority reviews and approves it. For each decision, resolve the business objective, jurisdiction/partner constraints, exceptions, customer promise, responsible actor, technical observability and testable acceptance conditions. After authorization, version the rule with effective dates and exceptions; only then derive formal state transitions, guards and persistence requirements. An academy scenario may select a hypothetical option *for teaching* but must label it “illustrative policy assumption,” not “implemented” or “approved.”

**Decision status:** \`UNRESOLVED\` in this document. None have been approved, inferred from the synthetic fixture or decided by the assistant. The listed decision owner is a *proposed role to consult*, not evidence of a signed-off person or organization.

## Decision summary / blocking dependencies

| ID | Question | Proposed decision authority | Blocking implementation or subsequent design |
|---|---|---|---|
| POL-01 | Payment-before-merchant or acceptance-before-payment? | Marketplace commercial and risk owner + merchant/provider partners | Sequencing of restaurant/payment lifecycle; Lesson 1.1.9 |
| POL-02 | When is merchant commitment binding, and what counts as proof? | Merchant operations/product owner | MerchantDecision identity, acceptance facts, timing; Lessons 1.1.6–1.1.9 |
| POL-03 | When is customer cancellation allowed and who approves? | Marketplace policy + merchant operations | Cancellation guards, conflict handling, reimbursement |
| POL-04 | What changes at kitchen work-start, and who bears loss? | Merchant/kitchen operations + commercial owner | Preparation and cancellation boundary, compensation |
| POL-05 | Who pays after capture followed by rejection? | Commercial policy + finance/provider partners | Refund liability, fee model, exception handling |
| POL-06 | What evidence establishes refund *completion*? | Finance/compliance + provider owner | Refund lifecycle, customer receipts, reconciliation |
| POL-07 | How do unknown payment results get resolved? | Payment operations/risk + provider integration owner | Safe retry, pending state, reconciliation and timeouts |
| POL-08 | What defines the same logical customer order intent? | Product/commercial owner + API owner | Order deduplication, idempotency key semantics |
| POL-09 | Who owns pickup, delivery and completion evidence? | Fulfillment operations + partner contracts | Custody/handoff/delivery facts, disputes |
| POL-10 | How should conflicting observations and projections be resolved? | Support/operations + source authority owner | Projection refresh, conflict resolution, customer messaging |

## POL-01 — Ordering of merchant commitment and financial operation

**Business question:** Must a provider authorization/capture precede restaurant acceptance, follow it, or be split into authorize-first/capture-later? **Status: UNRESOLVED.**

**Actors/IDs:** Customer, marketplace, merchant, payment provider; OrderId, RestaurantId, conceptual PaymentAttemptId and provider operation ID. **Candidate A:** Merchant accepts before starting payment—reduces captured-but-rejected exposure, but creates accepted-without-payment and capacity reservation risks. **Candidate B:** Authorize or capture before merchant acceptance—may reduce non-paying commitments, but increases paid-and-rejected remediation and holds/expiry risk. **Candidate C:** Authorize before merchant acceptance and capture after a verified commitment—changes timing, expiry and multiple-attempt risk; still needs exception logic.

**Failure/operations:** A timed-out authorization is unknown, not automatically declined. Merchant acceptance can race with provider outcomes. A successful capture cannot be rolled back by flipping the Order state. **Required evidence:** Merchant acceptance SLA, provider auth/capture contract, hold expiry, payment method differences, legal customer disclosure and operational cost data. **Proposed authority:** Marketplace commercial/risk owner jointly with merchant/provider partners. **Blocks:** M5–M8 milestone ordering, accepted-but-unpaid, paid-and-rejected, payment lifecycle implementation (Lesson 1.1.9). **Do not assert an option is the actual production policy.**

## POL-02 — Restaurant acceptance and binding fulfillment commitment

**Question:** Which authorized restaurant actor/system may accept, how late, under what availability terms, and what uniquely identifies an accepted decision? **Status: UNRESOLVED.**

**Actors/IDs:** Merchant owner and operational delegate, marketplace, customer; OrderId, RestaurantId, merchant decision ID/version where applicable. **Candidate A:** Explicit acceptance from an authenticated merchant actor for exact OrderId; strong attribution but introduces response/availability delays. **Candidate B:** Automatic acceptance for pre-agreed inventory/availability ranges; lower latency but needs demonstrable delegated authority, capacity accuracy and exception terms. **Candidate C:** Time-based expiry if unanswered; avoids indefinite pending but must not convert missing acknowledgement into a confirmed rejection when external decision may have occurred.

**Consequences:** An HTTP send to the merchant is not acceptance. A merchant dashboard badge is an observation and may be stale. Duplicate or contradictory decision callbacks require identity and precedence rules. **Evidence to resolve:** Merchant contract, availability responsibility, actor permissions, decision expiry, reversal/correction process and accepted-order obligations. **Proposed owner:** Merchant operations and product policy. **Blocks:** \`AcceptOrder\` validity, expiry handling, restaurant authority, UI "confirmed" meaning, formal lifecycles (Lessons 1.1.6–1.1.7).

## POL-03 — Customer cancellation entitlement and cutoff

**Question:** When does requesting cancellation create a right to cancellation, and who may confirm it? **Status: UNRESOLVED.**

**Actors/IDs:** Customer, platform, merchant, kitchen, payment provider; OrderId, cancellation request ID, merchant decision, PaymentAttemptId. **Candidate A:** Customer cancellation permitted until merchant accepts. **Candidate B:** Permitted until kitchen begins work. **Candidate C:** Conditional entitlement after preparation/handoff with fees, partial refund or manual approval. The options expose different merchant waste, customer fairness and timing/race outcomes.

**Failure/operations:** Customer click proves \`CancellationRequested\`, not \`OrderCancelled\`. A cancel command can race with merchant acceptance or preparation-start evidence. A missing provider refund result remains unknown. **Evidence needed:** Business terms, merchant cutoffs, consumer law, precise preparation-start fact owner, eligible fees, concurrency precedence and customer messages. **Proposed owner:** Commercial/product policy and merchant operations. **Blocks:** cancellation guards, transition precedence, refund obligation and conflict acceptance tests (Lessons 1.1.7–1.1.9).

## POL-04 — Kitchen preparation and irreversible physical commitment

**Question:** What exactly constitutes work-started, who may establish it, and what remedies apply once ingredients, labor or food are committed? **Status: UNRESOLVED.**

**Actors/IDs:** Merchant kitchen, marketplace, customer, support; OrderId, preparation work reference. **Candidate A:** Kitchen start creates an absolute cancellation cutoff. **Candidate B:** Cancel remains possible with an explicit fee/merchant reimbursement. **Candidate C:** Case-by-case exception for incorrect items, safety or merchant delay. Physical reversibility differs by product and point in preparation; no generic time threshold is automatically correct.

**Failure/operations:** A software rollback never unconsumes ingredients or unsends a kitchen instruction. Work can begin before the platform observes it; late events may misrepresent eligibility. **Evidence needed:** Kitchen system capability, merchant contracts, materials cost, evidence timestamp semantics, exception approvals and customer-rights constraints. **Proposed owner:** Merchant operations + commercial owner. **Blocks:** prep lifecycle, irreversible-effect mapping, cancellation decision table, compensation policies.

## POL-05 — Captured payment with rejected fulfillment

**Question:** Who owes whom a refund, what amount, what time frame and what fee liability when capture was confirmed but the restaurant rejected? **Status: UNRESOLVED.**

**Actors/IDs:** Customer, merchant, marketplace, provider, finance/support; OrderId, PaymentAttemptId, provider capture ID, refund operation ID. **Candidate A:** Full automated refund, platform bears merchant/provider fees. **Candidate B:** Full customer refund with merchant liability under agreed rejection policies. **Candidate C:** Partial or alternative remedy where law/terms permit, requiring explicit consent and accounting evidence. Each alternative has commercial, legal and operational consequences.

**Failure/operations:** Merchant rejection is a separate fact from provider capture; both remain true. Refund request, refund accepted-for-processing and refund confirmed are not interchangeable. **Evidence needed:** Partner agreements, consumer protection rules, provider refund capability, fee schedules, capture states, invoice and chargeback policy. **Proposed owner:** Finance/commercial/legal jointly. **Blocks:** paid-rejected flow, refund initiation guards, customer commitments, bookkeeping and exception recovery.

## POL-06 — Refund completion proof and financial receipt semantics

**Question:** What evidence permits the customer-facing statement "Refund completed"? **Status: UNRESOLVED.**

**Actors/IDs:** Provider/financial ledger, marketplace finance, customer; provider charge/capture ID, refund request/operation ID, possibly settlement reference. **Candidate A:** Provider's authenticated terminal refund-success state suffices to say submitted refund completed **at provider**, subject to settlement wording. **Candidate B:** Wait for stronger bank/settlement evidence to say funds returned to customer—potentially slower and provider-dependent. **Candidate C:** Display distinct milestones: refund requested, processing, provider-confirmed, customer account settled where observable.

**Failure/operations:** Accepted request is not confirmation; duplicate callback delivery is not double refund; operation correlation and partner namespaces matter. Refund can partially succeed, reverse, time out or be rejected. **Evidence needed:** Provider-specific contract and statuses, settlement timings, regulatory receipt requirements, auditing and reconciliation procedures. **Proposed owner:** Finance/compliance and payment partner. **Blocks:** refund state machine, receipt text, dispute resolution, notification rules.

## POL-07 — Unknown provider operation and safe recovery

**Question:** What must the platform do when a payment request times out or its acknowledgement is lost? **Status: UNRESOLVED.**

**Actors/IDs:** Payment provider, marketplace payment operations, customer; OrderId, PaymentAttemptId, provider operation ID, idempotency key/correlation ID. **Candidate A:** Query authoritative provider operation status before retry; requires supported lookup, credentials and retention. **Candidate B:** Retry with an explicitly enforced provider idempotency identity where contract guarantees deduplication. **Candidate C:** Hold payment outcome as UNKNOWN and escalate to reconciliation/manual resolution rather than risk a double charge.

**Failure/operations:** A missing response does not prove the provider did nothing. UI must not assert PAID or FAILED prematurely. Different attempts under the same order may each have their own outcomes. **Evidence needed:** Provider retry/reconciliation API, provider idempotency scope/timeouts, financial incident evidence, recovery SLA. **Proposed owner:** Payment operations/risk + provider integration. **Blocks:** payment attempt state, retry protocol, unknown-outcome UI, reconciliation design, Lessons 1.1.9 and later reliability lessons.

## POL-08 — Duplicate customer intent and the meaning of an order operation

**Question:** When are two similar requests the same logical intended order versus two legitimate separate orders? **Status: UNRESOLVED.**

**Actors/IDs:** Customer/product, API owner, marketplace; OrderId, customer ID, request/correlation IDs, potential operation idempotency key. **Candidate A:** Current non-idempotent behavior (each eligible POST creates new OrderId). **Candidate B:** Customer-supplied idempotency key with defined scope, payload equivalence, expiry, and response replay. **Candidate C:** Domain-mediated deduplication with explicit user confirmation and business eligibility constraints rather than equality of baskets alone.

**Failure/operations:** Network timeout after local save invites accidental retry; reusing a generic request ID without enforced semantics does not deduplicate. Automatic equality of payloads could suppress a legitimate second meal order. **Evidence needed:** Product retry contract, customer intent semantics, client behaviors, storage durability, key collision/conflict policy and retention. **Proposed owner:** Product/commercial and API architects. **Blocks:** safe PlaceOrder retry protocol, duplicate-charge prevention, idempotency tests and future consistency models. **Current implementation remains A, not an approved product-level policy.**

## POL-09 — Delivery custody and outcome evidence

**Question:** Who establishes pickup, handoff, delivered and exception outcomes, and what evidence settles a disputed handoff? **Status: UNRESOLVED.**

**Actors/IDs:** Merchant/kitchen, assigned carrier or customer pickup, marketplace, recipient; OrderId, delivery assignment, pickup proof, delivery proof and actor IDs. **Candidate A:** Carrier scan/signature confirms pickup; recipient code/signature verifies delivery. **Candidate B:** Merchant/customer handoff proof for pickup orders. **Candidate C:** Geolocation/photo plus dispute window where legally valid; each carries privacy and evidentiary trade-offs.

**Failure/operations:** Kitchen "ready" is not carrier possession. Carrier "delivered" can conflict with customer's observed nonreceipt. Courier assignment failure or late pickup may create waste/liability. **Evidence needed:** Carrier/merchant contractual SLAs, privacy rules, evidence retention, lost-order policy, dispute procedure, actor identity. **Proposed owner:** Fulfillment operations and merchant/carrier contracts. **Blocks:** delivery completion semantics, customer "Completed" promise, liability handling and later delivery integration.

## POL-10 — Conflicting customer, merchant and provider projections

**Question:** How should the platform explain and reconcile inconsistent screens or stale derived statuses? **Status: UNRESOLVED.**

**Actors/IDs:** Customer, merchant, provider, support/operations; OrderId, RestaurantId, PaymentAttemptId, provider operation ID, read-model version/watermark. **Candidate A:** Display separate fact dimensions with explicit pending/unknown and source freshness. **Candidate B:** Display a summary only when a formally defined predicate across sourced facts holds. **Candidate C:** Conservative conflict screen plus customer-support escalation when identity or authority evidence cannot be reconciled.

**Failure/operations:** The freshest UI timestamp can still carry an old or wrong provider claim. Merchant decision for one identity can be incorrectly joined to another. A receipt may prove authorization rather than capture. **Evidence needed:** Complete source fact taxonomy, authority precedence, projection freshness guarantees, operational incident examples, approved customer language and recovery constraints. **Proposed owner:** Support/operations plus each source-of-truth owner. **Blocks:** read model predicates, customer communication, incident diagnosis and monitoring.

## Priority, dependencies and decision exit gate

Resolve authority and sequencing before coding: POL-01 and POL-02 determine payment/merchant dependencies; POL-03 and POL-04 determine cancellation/work effects; POL-05–07 determine financial remediation and unknown outcomes; POL-08 determines operation retries; POL-09 defines delivery proof; POL-10 defines customer projection. These decisions interact. For example, selecting capture-before-acceptance (POL-01) without an approved paid-and-rejected remedy (POL-05) is incomplete.

**Explicit entry criteria for the next implementation lesson(s):** Capture the approved policy owner and rule version, allowed outcome/unknown states, external authority evidence, transition guard predicates and at least one positive, negative, ambiguous and replay case. The next *conceptual* Lesson 1.1.6 can derive candidate independent lifecycles while keeping these as unresolved assumptions. No policy in this register authorizes Java mutation or external business effect by itself.
