# Food Ordering Platform — Lesson 1.1.1 Domain Discovery Contract

**Classification:** Type C, domain exploration; no application changes or verified external effects.
**Source:** [Academy Lesson 1.1.1](../../content/lessons/1.1.1.md).  
**Companion repository:** https://github.com/fasiltadesse22/food-ordering-platform-new at planning SHA `2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb`.

## 1. Actor and stakeholder inventory

| Participant or role | Desired outcome | Accountability / real-world authority | What it must not claim |
|---|---|---|---|
| Customer | Receive agreed food for agreed price/time; fair cancellation | Initiate purchase, request modification/cancellation, confirm delivery experience | Merchant acceptance or provider settlement |
| Restaurant owner / operator | Fulfill feasible orders profitably | Merchant policy, availability, capacity, order acceptance/rejection | Provider charge outcome |
| Kitchen staff | Prepare accepted meals accurately | Food preparation and readiness reporting, under restaurant policy | A payment authorization or financial refund |
| Payment provider (external) | Process contracted financial operations securely | Attest to its actual authorization/capture/refund outcomes | Merchant kitchen readiness |
| Platform business operations | Orchestrate customer journey; resolve disputes | Published platform policies, support escalation and remediation initiation within authorization limits | Create provider-owned money facts |
| Support agent | Resolve customer issue with controlled overrides | Initiate approved exception/review; communicate uncertain outcomes | Declare refunded without evidence |
| Delivery participant / coordinator | Reliable pickup and proof-of-handoff | Pickup/delivery steps within assigned delivery obligations | Override restaurant fulfillment or provider facts |
| Finance/risk/compliance stakeholder | Correct, auditable financial and dispute handling | Policy constraints, review gates, reconciliation requirements | Automatic proof of payment from a UI flag |

**Terminology:** A Restaurant data entity is not a merchant human actor; a Payment module is not the external provider. Some roles may be combined in one company, which does not erase distinct decision rights.

## 2. Business capabilities and ownership

| Capability | Business outcome | Accountable role | Initiator | Decision / external fact authority | Observers |
|---|---|---|---|---|---|
| Request order | Record a clear customer purchase intent | Platform operations | Customer | Platform determines intake eligibility under policy | Customer, merchant |
| Decide fulfillment | Accept/reject an order based on availability/capacity | Restaurant operator | Restaurant operator, sometimes automated merchant rule | Restaurant operator/merchant policy | Platform, customer, kitchen |
| Manage merchant availability | Make feasible offer visible | Restaurant operator | Merchant staff | Merchant facts, with staleness/refresh caveats | Platform, customer |
| Process payment operation | Obtain a provider result for a specific attempt | Platform finance/operations | Platform under customer authorization | **Provider** confirms provider operation outcome | Platform, customer, merchant (limited view) |
| Prepare meal | Create food against accepted work | Restaurant operator | Kitchen lead | Kitchen/restaurant staff for readiness | Platform, courier |
| Coordinate delivery | Assign and complete handoff | Delivery operations | Dispatcher/courier | Delivery workflow/valid proof rules, with dispute handling | Platform, merchant, customer |
| Request cancellation | Communicate customer intent to stop work | Platform experience | Customer | Eligibility decided by published policy and phase, exceptions by delegated merchant/platform role | Restaurant, customer, support |
| Initiate refund | Submit financial remediation request when permitted | Platform finance/support | Authorized support or finance | Policy decides eligibility; provider later confirms actual refund | Customer, merchant |
| Resolve dispute | Reach documented fair outcome | Support/operations with risk escalation | Customer or merchant | Policy and authorized reviewers, subject to provider financial facts | Customer, merchant, finance |

The ownership is an **illustrative product-policy proposal** awaiting stakeholder approval. Separating business ownership, request permission and external fact source is mandatory.

## 3. Decision authority matrix and ambiguity

| Decision proposition | Requester/initiator | Proposed decision authority | Authoritative fact source | Ambiguity to resolve |
|---|---|---|---|---|
| Customer requests order | Customer | Platform intake policy | Platform order-intake fact | Who may submit for another customer? |
| Restaurant can fulfill requested basket | Restaurant operator | Restaurant | Merchant acceptance/rejection fact | Partial acceptance allowed? |
| Payment operation succeeded | Platform requests | External payment provider | Provider response/verification | Authorization vs capture vs settlement? |
| Customer requests pre-accept cancellation | Customer | Platform executes published policy | Validated platform cancellation decision + merchant timing | What if acceptance is nearly simultaneous? |
| Customer requests post-accept cancellation | Customer | **Undecided policy**: merchant exception and platform responsibility | Explicit exception decision + provider facts if money involved | Fee, preparation stage, consumer rights? |
| Refund should be requested | Support/finance under policy | Platform/merchant-approved policy | Approved refund-request fact | Threshold and separation of duties? |
| Refund actually completed | Provider response | External provider | Provider refund outcome | Settlement and bank posting timing? |
| Preparation complete | Kitchen | Restaurant/kitchen authority | Restaurant readiness fact | What if customer disputes readiness? |
| Delivery complete | Courier / authorized operations | Delivery handoff process | Delivery handoff evidence (disputable) | Proof standard and dispute reversal? |

**Conflicts requiring explicit decision:** post-accept cancellation; customer-facing payment label; who absorbs merchant cost after preparation; partial merchant rejection; delayed/unknown provider response; refund authorization limits; delivery proof dispute.

## 4. Worked business scenarios

**S1 — Normal order:** customer requests basket; restaurant accepts; provider returns confirmed success for *specified operation*; kitchen prepares; delivery agent hands over. This is an illustrative sequencing policy, not an implemented saga or an unqualified guarantee.

**S2 — Merchant rejects unavailable item:** restaurant decides it cannot fulfill; platform records rejection and explains. Under the selected *pay-after-accept* teaching policy, no payment attempt is created. Any observed charge is a separate incident requiring evidence.

**S3 — Provider result unknown:** restaurant accepts; provider request times out; order must not be displayed as definitively paid or declined without provider-supported evidence. Define a pending/reconciliation policy later.

**S4 — Customer cancels after acceptance:** strict policy denies except authorized override; merchant-approved policy may grant cancellation but cannot guarantee refund completion. Document fee liability and customer expectation.

**S5 — Provider refund requested:** authorized support initiates request; “requested” is not “completed”; provider confirms, rejects or remains unknown. Do not assert returned money until the right fact is evidenced.

**S6 — Disputed delivery:** courier reports completed handoff; customer disputes receipt. Platform investigates proof under policy; neither one screen nor one timestamp resolves liability by itself.

## 5. Questions to validate with stakeholders

1. In the first runnable order slice, is payment after acceptance, before acceptance, or separately authorized then captured? Describe cost/rejection implications.
2. Who may cancel before/after acceptance, after preparation starts, or after pickup? Who absorbs cost?
3. Are partial item acceptance/substitution supported? If not, reject the entire basket or seek reauthorization?
4. Does a payment provider callback mean **authorized**, **captured**, **settled**, or simply accepted for processing?
5. Which support roles may request or approve refunds, and what audit trail is mandatory?
6. What customer wording is allowed for **pending**, **requested**, **confirmed**, or **unknown** outcomes?
7. Who is responsible for delivery disputes and what constitutes accepted proof of handoff?
8. Which merchant inventory facts can be cached, and what freshness promise is acceptable?
9. What records are needed for consumer-protection, risk and financial audit?
10. Who approves the final capability/authority matrix? Until then label it provisional.

## 6. Traceability and Lesson 1.1.2 entry requirements

Lesson 1.1.2 must convert a reviewed, narrow use case to **one runnable Java/Spring Boot deployable** with tests and CI. The initial candidate is customer order intake / PlaceOrder with a defined restaurant participation boundary and an in-memory persistence adapter. It must explicitly say what payment work is simulated or deferred; it must not create microservices, Kafka, Redis, Saga, Outbox, CQRS or live card processing to satisfy the lesson.

Trace future checks: customer request / input → application decision → authoritative fact → response; merchant capacity rejection; duplicate request semantics; proposed cancellation policy guard. The detailed state machine and concurrency guarantees are earned in later lessons, not presumed from this contract.

**Evidence label:** analytical domain design and synthetic scenario results. This file is not a merchant-approved policy, not a verified platform implementation, and not actual provider evidence.
