/** Academy-authored lesson registry, topics and contextual lab anchors.
 * Canonical manuscripts remain content/lessons/*.md. These frozen topic IDs
 * and legacySection values are stable links even if prose or section order changes.
 * The React components load lazily; sidebar metadata never imports a lesson UI.
 * New authored lessons require ONE registry entry with reviewed topic/lab metadata.
 */
import {lazy} from 'react';
import type {ComponentType,LazyExoticComponent} from 'react';
import manuscript1 from '../../content/lessons/1.1.1.md?raw';
import manuscript2 from '../../content/lessons/1.1.2.md?raw';
import manuscript3 from '../../content/lessons/1.1.3.md?raw';
import manuscript4 from '../../content/lessons/1.1.4.md?raw';
import manuscript5 from '../../content/lessons/1.1.5.md?raw';
import manuscript6 from '../../content/lessons/1.1.6.md?raw';
import manuscript7 from '../../content/lessons/1.1.7.md?raw';

export type TopicAnchor = {readonly id:string;readonly heading:string;readonly nav:string;readonly legacySection?:number};
export type LabAnchor = {readonly id:string;readonly topicId:string;readonly marker:string;readonly label:string;readonly legacyAfterBlock:number};
export type AuthoredEntry = {
 readonly id:string;readonly chapter:string;readonly manuscript:string;
 readonly topics:readonly TopicAnchor[];readonly labs:readonly LabAnchor[];
 readonly component:LazyExoticComponent<ComponentType<object>>;
};
export function parseCanonicalSections(markdown:string){
 return markdown.split(/(?=^## )/m).filter(part=>part.startsWith('## ')).map((part,index)=>{
   const newline=part.indexOf('\n'),heading=part.slice(3,newline).trim(),separator=heading.indexOf(' — ');
   return {index,stage:separator<0?'Study':heading.slice(0,separator),
     title:separator<0?heading:heading.slice(separator+3),body:part.slice(newline+1).trim(),heading};
 });
}
export const authoredLessonRegistry = {
 '1.1.1': {
  id:'1.1.1',chapter:'C1',manuscript:manuscript1,
  component:lazy(()=>import('./lesson111/Lesson111')),
  topics:[
   {
    "id": "start-with-the-business-not-the-architecture",
    "heading": "Orient — Start with the business, not the architecture",
    "nav": "Why the business comes first",
    "legacySection": 1
   },
   {
    "id": "actor-stakeholder-role-entity-and-service-are-not-synonyms",
    "heading": "Understand — Actor, stakeholder, role, entity, and service are not synonyms",
    "nav": "Actors, stakeholders & roles",
    "legacySection": 2
   },
   {
    "id": "goals-incentives-and-opposing-forces",
    "heading": "Understand — Goals, incentives, and opposing forces",
    "nav": "Goals & competing incentives",
    "legacySection": 3
   },
   {
    "id": "capabilities-use-cases-and-responsibility-boundaries",
    "heading": "Understand — Capabilities, use cases, and responsibility boundaries",
    "nav": "Capabilities & ownership",
    "legacySection": 4
   },
   {
    "id": "decision-rights-source-of-truth-and-observable-claims",
    "heading": "Understand — Decision rights, source of truth, and observable claims",
    "nav": "Who has decision authority?",
    "legacySection": 5
   },
   {
    "id": "build-and-challenge-the-authority-map",
    "heading": "Explore — Build and challenge the authority map",
    "nav": "Build the authority map",
    "legacySection": 6
   },
   {
    "id": "follow-a-complete-order-decision-journey",
    "heading": "Explore — Follow a complete order decision journey",
    "nav": "Follow an order decision",
    "legacySection": 7
   },
   {
    "id": "give-ownership-to-the-right-party",
    "heading": "Predict — Give ownership to the right party",
    "nav": "Assign the right decision owner",
    "legacySection": 8
   },
   {
    "id": "two-parties-claim-control-of-cancellation",
    "heading": "Diagnose — Two parties claim control of cancellation",
    "nav": "Investigate cancellation dispute",
    "legacySection": 9
   },
   {
    "id": "domain-discovery-artifacts-before-java",
    "heading": "Engineer — Domain discovery artifacts before Java",
    "nav": "Domain artifacts before Java",
    "legacySection": 10
   },
   {
    "id": "evidence-you-can-and-cannot-claim",
    "heading": "Verify — Evidence you can and cannot claim",
    "nav": "What counts as evidence?",
    "legacySection": 11
   },
   {
    "id": "communicate-at-multiple-engineering-levels",
    "heading": "Defend — Communicate at multiple engineering levels",
    "nav": "Defend the architecture",
    "legacySection": 12
   },
   {
    "id": "transfer-retrieval-and-mastery-gate",
    "heading": "Retain — Transfer, retrieval, and mastery gate",
    "nav": "Transfer & mastery check",
    "legacySection": 13
   }
  ],
  labs:[
   {
    "id": "lab-build-and-challenge-the-authority-map-1",
    "topicId": "build-and-challenge-the-authority-map",
    "marker": "The atlas compares your proposal with an **explicit illustrative baseline**, not with an eternal product rule.",
    "label": "Actor authority model",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-follow-a-complete-order-decision-journey-1",
    "topicId": "follow-a-complete-order-decision-journey",
    "marker": "Choose whether the restaurant accepts or rejects. Then choose whether the provider authorizes, declines, or le",
    "label": "Business workflow branches",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-give-ownership-to-the-right-party-1",
    "topicId": "give-ownership-to-the-right-party",
    "marker": "You should confidently distinguish: the customer placing a request; the restaurant accepting or rejecting fulf",
    "label": "Authority decision challenge",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-two-parties-claim-control-of-cancellation-3",
    "topicId": "two-parties-claim-control-of-cancellation",
    "marker": "In the interactive **Incident Caseboard**, choose which evidence to inspect and compare how it changes the pla",
    "label": "Cancellation evidence investigation",
    "legacyAfterBlock": 3
   },
   {
    "id": "lab-domain-discovery-artifacts-before-java-1",
    "topicId": "domain-discovery-artifacts-before-java",
    "marker": "The companion domain artifacts describe: actors and incentives; capability ownership; an actor/decision/fact a",
    "label": "Domain discovery source contract",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-evidence-you-can-and-cannot-claim-1",
    "topicId": "evidence-you-can-and-cannot-claim",
    "marker": "The authority table is a hypothesis that requires stakeholder review. A **consistent table** is not necessaril",
    "label": "Domain evidence limitations",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-communicate-at-multiple-engineering-levels-2",
    "topicId": "communicate-at-multiple-engineering-levels",
    "marker": "**Staff/Principal design challenge:** “Why not let Payment Service own the payment status?” Answer with scoped",
    "label": "Engineering communication practice",
    "legacyAfterBlock": 2
   },
   {
    "id": "lab-transfer-retrieval-and-mastery-gate-1",
    "topicId": "transfer-retrieval-and-mastery-gate",
    "marker": "Next, transfer the same reasoning to a **hotel reservation**. Guest requests a room; property inventory determ",
    "label": "Transfer reasoning exercise",
    "legacyAfterBlock": 1
   }
  ]
 },
 '1.1.2': {
  id:'1.1.2',chapter:'C1',manuscript:manuscript2,
  component:lazy(()=>import('./lesson112/Lesson112')),
  topics:[
   {
    "id": "the-business-question-behind-post-orders",
    "heading": "Orient — The business question behind POST /orders",
    "nav": "What does HTTP 201 mean?",
    "legacySection": 1
   },
   {
    "id": "capabilities-use-cases-user-stories-and-endpoints",
    "heading": "Understand — Capabilities, use cases, user stories and endpoints",
    "nav": "Capability vs use case vs API",
    "legacySection": 2
   },
   {
    "id": "formal-uc-001-structure-and-its-main-flow",
    "heading": "Understand — Formal UC-001 structure and its main flow",
    "nav": "UC-001: Eight-step request flow",
    "legacySection": 3
   },
   {
    "id": "preconditions-policy-guards-and-postconditions",
    "heading": "Understand — Preconditions, policy guards and postconditions",
    "nav": "Validation, guards & outcomes",
    "legacySection": 4
   },
   {
    "id": "alternative-flows-errors-and-ambiguous-outcomes",
    "heading": "Understand — Alternative flows, errors and ambiguous outcomes",
    "nav": "Error paths & unknown results",
    "legacySection": 5
   },
   {
    "id": "identity-price-provenance-and-durability-boundaries",
    "heading": "Understand — Identity, price provenance and durability boundaries",
    "nav": "IDs, pricing & durability",
    "legacySection": 6
   },
   {
    "id": "derive-a-use-case-from-actor-and-outcome",
    "heading": "Explore — Derive a use case from actor and outcome",
    "nav": "Find the real use-case boundary",
    "legacySection": 7
   },
   {
    "id": "branch-the-business-journey-without-fabricating-java-features",
    "heading": "Explore — Branch the business journey without fabricating Java features",
    "nav": "Compare business alternatives",
    "legacySection": 8
   },
   {
    "id": "derive-acceptance-criteria-and-tests",
    "heading": "Predict — Derive acceptance criteria and tests",
    "nav": "Acceptance criteria AC-01–07",
    "legacySection": 9
   },
   {
    "id": "source-linked-execution-and-architecture-decisions",
    "heading": "Engineer — Source-linked execution and architecture decisions",
    "nav": "Trace the Java implementation",
    "legacySection": 10
   },
   {
    "id": "evidence-hierarchy-and-actual-tests",
    "heading": "Verify — Evidence hierarchy and actual tests",
    "nav": "Tests & evidence hierarchy",
    "legacySection": 11
   },
   {
    "id": "201-but-the-restaurant-never-accepted",
    "heading": "Diagnose — 201 but the restaurant never accepted",
    "nav": "Investigate unconfirmed orders",
    "legacySection": 12
   },
   {
    "id": "staff-review-and-audience-adaptation",
    "heading": "Defend — Staff review and audience adaptation",
    "nav": "Defend design trade-offs",
    "legacySection": 13
   },
   {
    "id": "transfer-to-hotel-booking-and-inventory-reservation",
    "heading": "Retain — Transfer to hotel booking and inventory reservation",
    "nav": "Transfer to booking & inventory",
    "legacySection": 14
   }
  ],
  labs:[
   {
    "id": "lab-derive-a-use-case-from-actor-and-outcome-1",
    "topicId": "derive-a-use-case-from-actor-and-outcome",
    "marker": "When an actor's goal changes, the system boundary changes. A restaurant has authority to decide feasibility; t",
    "label": "Explore actor use cases",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-branch-the-business-journey-without-fabricating-java-features-1",
    "topicId": "branch-the-business-journey-without-fabricating-java-features",
    "marker": "The real Java test suite covers these distinct success and rejection paths, but the browser simulator does not",
    "label": "Predict real and conceptual outcomes",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-derive-acceptance-criteria-and-tests-2",
    "topicId": "derive-acceptance-criteria-and-tests",
    "marker": "In the Acceptance Explorer select a case, predict the status or business outcome, then reveal the Given/When/T",
    "label": "Explore acceptance criteria",
    "legacyAfterBlock": 2
   },
   {
    "id": "lab-source-linked-execution-and-architecture-decisions-3",
    "topicId": "source-linked-execution-and-architecture-decisions",
    "marker": "The interactive Execution Trace links each visible step to the **exact Java source at an immutable commit**. I",
    "label": "Trace the implemented Java source",
    "legacyAfterBlock": 3
   },
   {
    "id": "lab-evidence-hierarchy-and-actual-tests-1",
    "topicId": "evidence-hierarchy-and-actual-tests",
    "marker": "Compare evidence types. A deterministic React scenario engine makes a *prediction under declared assumptions*.",
    "label": "Verification evidence",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-201-but-the-restaurant-never-accepted-2",
    "topicId": "201-but-the-restaurant-never-accepted",
    "marker": "The Diagnosis Room lets you select evidence and a provisional hypothesis. Its clues are synthetic exercises; t",
    "label": "Incident diagnosis exercise",
    "legacyAfterBlock": 2
   },
   {
    "id": "lab-staff-review-and-audience-adaptation-3",
    "topicId": "staff-review-and-audience-adaptation",
    "marker": "Adversarial questions: Does HTTP 201 guarantee full business success? No. Is an X-Request-ID a deduplication k",
    "label": "Architecture review exercise",
    "legacyAfterBlock": 3
   },
   {
    "id": "lab-transfer-to-hotel-booking-and-inventory-reservation-1",
    "topicId": "transfer-to-hotel-booking-and-inventory-reservation",
    "marker": "Repeat for inventory reservation. “A customer submitted a request” is weaker than “the warehouse atomically re",
    "label": "Transfer and retain",
    "legacyAfterBlock": 1
   }
  ]
 },
 '1.1.3': {
  id:'1.1.3',chapter:'C1',manuscript:manuscript3,
  component:lazy(()=>import('./lesson113/Lesson113')),
  topics:[
   {
    "id": "a-customer-request-is-not-a-historical-fact",
    "heading": "Orient — A customer request is not a historical fact",
    "nav": "From request to historical fact",
    "legacySection": 1
   },
   {
    "id": "commands-express-intention-not-completed-state",
    "heading": "Understand — Commands express intention, not completed state",
    "nav": "What commands actually mean",
    "legacySection": 2
   },
   {
    "id": "design-command-contracts-around-business-ownership",
    "heading": "Understand — Design command contracts around business ownership",
    "nav": "Designing command contracts",
    "legacySection": 3
   },
   {
    "id": "a-decision-is-an-outcome-including-a-principled-rejection",
    "heading": "Understand — A decision is an outcome, including a principled rejection",
    "nav": "Decisions and rejection semantics",
    "legacySection": 4
   },
   {
    "id": "domain-facts-events-logs-and-messages-are-distinct",
    "heading": "Understand — Domain facts, events, logs and messages are distinct",
    "nav": "Domain facts vs event messages",
    "legacySection": 5
   },
   {
    "id": "acknowledgement-is-a-separate-claim-about-execution",
    "heading": "Understand — Acknowledgement is a separate claim about execution",
    "nav": "Acknowledgements and scope",
    "legacySection": 6
   },
   {
    "id": "failure-windows-and-the-uncertainty-timeline",
    "heading": "Understand — Failure windows and the uncertainty timeline",
    "nav": "Failure windows and ambiguity",
    "legacySection": 7
   },
   {
    "id": "duplicate-requests-correlation-and-idempotency",
    "heading": "Understand — Duplicate requests, correlation and idempotency",
    "nav": "Repeated commands and identity",
    "legacySection": 8
   },
   {
    "id": "different-actors-own-different-facts",
    "heading": "Understand — Different actors own different facts",
    "nav": "Restaurant and payment authority",
    "legacySection": 9
   },
   {
    "id": "classify-a-timeline-before-accepting-its-wording",
    "heading": "Explore — Classify a timeline before accepting its wording",
    "nav": "Classify commands and facts",
    "legacySection": 10
   },
   {
    "id": "four-branches-from-the-same-command-intention",
    "heading": "Predict — Four branches from the same command intention",
    "nav": "Predict five execution outcomes",
    "legacySection": 11
   },
   {
    "id": "trace-the-verified-java-implementation-line-by-line",
    "heading": "Engineer — Trace the verified Java implementation line by line",
    "nav": "Trace the new Java handler",
    "legacySection": 12
   },
   {
    "id": "which-results-were-actually-executed",
    "heading": "Verify — Which results were actually executed?",
    "nav": "Tests and evidence boundaries",
    "legacySection": 13
   },
   {
    "id": "success-appeared-but-no-corresponding-fact-can-be-found",
    "heading": "Diagnose — “Success” appeared but no corresponding fact can be found",
    "nav": "Diagnose a missing intake",
    "legacySection": 14
   },
   {
    "id": "explain-the-decision-at-four-levels",
    "heading": "Defend — Explain the decision at four levels",
    "nav": "Defend architectural choices",
    "legacySection": 15
   },
   {
    "id": "reconstruct-the-model-and-transfer-it",
    "heading": "Retain — Reconstruct the model and transfer it",
    "nav": "Transfer and mastery gate",
    "legacySection": 16
   }
  ],
  labs:[
   {
    "id": "lab-a-customer-request-is-not-a-historical-fact-2",
    "topicId": "a-customer-request-is-not-a-historical-fact",
    "marker": "The crucial direction of implication is **not reversible**. A valid PlaceOrder command does not imply an Order",
    "label": "Command, decision and fact boundaries",
    "legacyAfterBlock": 2
   },
   {
    "id": "lab-four-branches-from-the-same-command-intention-13",
    "topicId": "four-branches-from-the-same-command-intention",
    "marker": "The interactive **Command → Decision → Fact Explorer** below models these branches deterministically. It is no",
    "label": "Predict the command and local fact outcome",
    "legacyAfterBlock": 13
   }
  ]
 },
 '1.1.4': {
  id:'1.1.4',chapter:'C1',manuscript:manuscript4,
  component:lazy(()=>import('./lesson114/Lesson114')),
  topics:[
   {
    "id": "the-order-that-appeared-paid-without-a-payment",
    "heading": "Orient — The order that appeared paid without a payment",
    "nav": "Why identity and authority matter",
    "legacySection": 1
   },
   {
    "id": "identity-attributes-state-version-and-history-are-different-dimensions",
    "heading": "Understand — Identity, attributes, state, version and history are different dimensions",
    "nav": "Identity vs state and history",
    "legacySection": 2
   },
   {
    "id": "the-identity-vocabulary-order-customer-restaurant-attempt-and-observation",
    "heading": "Understand — The identity vocabulary: order, customer, restaurant, attempt and observation",
    "nav": "Order, customer and attempt IDs",
    "legacySection": 3
   },
   {
    "id": "natural-keys-surrogate-keys-namespaces-and-aliases",
    "heading": "Understand — Natural keys, surrogate keys, namespaces and aliases",
    "nav": "Natural keys, aliases and scopes",
    "legacySection": 4
   },
   {
    "id": "state-revision-immutable-history-and-the-cost-of-pretending-an-update-exists",
    "heading": "Understand — State revision, immutable history and the cost of pretending an update exists",
    "nav": "Versions and legitimate updates",
    "legacySection": 5
   },
   {
    "id": "authority-is-a-business-contract-not-a-database-location",
    "heading": "Understand — Authority is a business contract, not a database location",
    "nav": "Authority vs UI projections",
    "legacySection": 6
   },
   {
    "id": "one-orderid-multiple-payment-attempt-identities",
    "heading": "Explore — One OrderId, multiple payment-attempt identities",
    "nav": "Two attempts, one order",
    "legacySection": 7
   },
   {
    "id": "restaurant-aliases-repeated-callbacks-and-incorrect-identity-joins",
    "heading": "Explore — Restaurant aliases, repeated callbacks and incorrect identity joins",
    "nav": "Merchant aliases and callbacks",
    "legacySection": 8
   },
   {
    "id": "identity-changes-that-should-and-should-not-create-new-entities",
    "heading": "Predict — Identity changes that should and should not create new entities",
    "nav": "Predict identity changes",
    "legacySection": 9
   },
   {
    "id": "read-the-real-java-identity-boundary-from-http-to-local-fact",
    "heading": "Engineer — Read the real Java identity boundary from HTTP to local fact",
    "nav": "Trace the typed Java IDs",
    "legacySection": 10
   },
   {
    "id": "explain-the-architecture-choices-rejected-alternatives-and-next-forces",
    "heading": "Engineer — Explain the architecture choices, rejected alternatives and next forces",
    "nav": "Design trade-offs and triggers",
    "legacySection": 11
   },
   {
    "id": "identity-continuity-evidence-and-the-exact-limits-of-a-green-build",
    "heading": "Verify — Identity-continuity evidence and the exact limits of a green build",
    "nav": "Tests and identity evidence",
    "legacySection": 12
   },
   {
    "id": "customer-ui-says-paid-provider-receipt-says-otherwise",
    "heading": "Diagnose — Customer UI says paid, provider receipt says otherwise",
    "nav": "Diagnose a disputed Paid status",
    "legacySection": 13
   },
   {
    "id": "staff-level-design-review-identity-and-authority-without-premature-distribution",
    "heading": "Defend — Staff-level design review: identity and authority without premature distribution",
    "nav": "Defend ownership and continuity",
    "legacySection": 14
   },
   {
    "id": "explain-the-design-to-four-audiences",
    "heading": "Defend — Explain the design to four audiences",
    "nav": "Explain to four audiences",
    "legacySection": 15
   },
   {
    "id": "independent-transfer-retrieval-and-entry-gate-for-the-next-lesson",
    "heading": "Retain — Independent transfer, retrieval and entry gate for the next lesson",
    "nav": "Transfer and mastery gate",
    "legacySection": 16
   }
  ],
  labs:[
   {
    "id": "lab-the-order-that-appeared-paid-without-a-payment-3",
    "topicId": "the-order-that-appeared-paid-without-a-payment",
    "marker": "Our running example uses one order intake. A successful local \\`PlaceOrderCommand\\` produces a new \\`OrderId\\`",
    "label": "Identity and authority ownership",
    "legacyAfterBlock": 3
   },
   {
    "id": "lab-authority-is-a-business-contract-not-a-database-location-8",
    "topicId": "authority-is-a-business-contract-not-a-database-location",
    "marker": "These layers can disagree because an observation is delayed, a projection is stale, an identifier was joined i",
    "label": "Provider authority versus UI projection",
    "legacyAfterBlock": 8
   },
   {
    "id": "lab-identity-changes-that-should-and-should-not-create-new-entities-15",
    "topicId": "identity-changes-that-should-and-should-not-create-new-entities",
    "marker": "The current system treats two eligible POST executions as two creates and generates two different OrderIds. Th",
    "label": "Predict identity and authority consequences",
    "legacyAfterBlock": 15
   }
  ]
 },
 '1.1.5': {
  id:'1.1.5',chapter:'C1',manuscript:manuscript5,
  component:lazy(()=>import('./lesson115/Lesson115')),
  topics:[
   {
    "id": "the-customer-sees-one-journey-the-business-has-many-authorities",
    "heading": "Orient — The customer sees one journey; the business has many authorities",
    "nav": "One customer journey, many authorities",
    "legacySection": 1
   },
   {
    "id": "a-business-workflow-is-a-composition-not-a-call-chain",
    "heading": "Understand — A business workflow is a composition, not a call chain",
    "nav": "Workflow vs calls and state",
    "legacySection": 2
   },
   {
    "id": "actors-incentives-decision-rights-and-obligations",
    "heading": "Understand — Actors, incentives, decision rights and obligations",
    "nav": "Actors and business obligations",
    "legacySection": 3
   },
   {
    "id": "the-verified-java-boundary-and-an-illustrative-full-journey",
    "heading": "Understand — The verified Java boundary and an illustrative full journey",
    "nav": "Verified Java intake boundary",
    "legacySection": 4
   },
   {
    "id": "follow-the-connected-journey-across-swimlanes",
    "heading": "Explore — Follow the connected journey across swimlanes",
    "nav": "Follow the actor swimlane",
    "legacySection": 5
   },
   {
    "id": "compare-payment-first-and-acceptance-first-policies",
    "heading": "Understand — Compare payment-first and acceptance-first policies",
    "nav": "Payment and merchant ordering",
    "legacySection": 6
   },
   {
    "id": "scenario-a-a-successful-but-not-atomic-customer-journey",
    "heading": "Understand — Scenario A: a successful but not atomic customer journey",
    "nav": "Illustrative successful journey",
    "legacySection": 7
   },
   {
    "id": "scenario-b-paid-but-restaurant-rejected",
    "heading": "Understand — Scenario B: paid but restaurant rejected",
    "nav": "Captured payment, rejected merchant",
    "legacySection": 8
   },
   {
    "id": "scenario-c-accepted-then-cancellation-requested",
    "heading": "Understand — Scenario C: accepted then cancellation requested",
    "nav": "Accepted order, cancellation requested",
    "legacySection": 9
   },
   {
    "id": "scenario-d-preparation-already-started",
    "heading": "Understand — Scenario D: preparation already started",
    "nav": "Preparation as irreversible effect",
    "legacySection": 10
   },
   {
    "id": "scenario-e-refund-requested-without-confirmation",
    "heading": "Understand — Scenario E: refund requested without confirmation",
    "nav": "Refund not yet confirmed",
    "legacySection": 11
   },
   {
    "id": "scenario-f-partial-completion-and-conflicting-screens",
    "heading": "Understand — Scenario F: partial completion and conflicting screens",
    "nav": "Contradictory observations",
    "legacySection": 12
   },
   {
    "id": "timing-partial-completion-and-ambiguous-remote-results",
    "heading": "Understand — Timing, partial completion and ambiguous remote results",
    "nav": "Time, messages and unknowns",
    "legacySection": 13
   },
   {
    "id": "receipts-and-promises-what-exactly-was-acknowledged",
    "heading": "Understand — Receipts and promises: what exactly was acknowledged?",
    "nav": "Receipts and customer promises",
    "legacySection": 14
   },
   {
    "id": "delivery-handoff-is-not-the-end-of-preparation",
    "heading": "Understand — Delivery handoff is not the end of preparation",
    "nav": "Delivery and custody evidence",
    "legacySection": 15
   },
   {
    "id": "state-and-authority-overlay-independent-facts-one-customer-projection",
    "heading": "Explore — State and authority overlay: independent facts, one customer projection",
    "nav": "Milestone authority overlay",
    "legacySection": 16
   },
   {
    "id": "branching-scenario-studio-and-uncertain-outcomes",
    "heading": "Predict — Branching scenario studio and uncertain outcomes",
    "nav": "Predict workflow branches",
    "legacySection": 17
   },
   {
    "id": "link-the-complete-conceptual-story-to-actual-java-source",
    "heading": "Engineer — Link the complete conceptual story to actual Java source",
    "nav": "Trace the real Java boundary",
    "legacySection": 18
   },
   {
    "id": "evidence-hierarchy-and-falsifiable-narrative-review",
    "heading": "Verify — Evidence hierarchy and falsifiable narrative review",
    "nav": "What counts as evidence?",
    "legacySection": 19
   },
   {
    "id": "customer-confirmed-merchant-rejected-payment-receipt-present",
    "heading": "Diagnose — Customer confirmed, merchant rejected, payment receipt present",
    "nav": "Diagnose conflicting screens",
    "legacySection": 20
   },
   {
    "id": "explain-the-design-to-five-audiences",
    "heading": "Defend — Explain the design to five audiences",
    "nav": "Defend the engineering choices",
    "legacySection": 21
   },
   {
    "id": "independent-transfer-and-mastery-gate",
    "heading": "Retain — Independent transfer and mastery gate",
    "nav": "Transfer and mastery gate",
    "legacySection": 22
   }
  ],
  labs:[
   {
    "id": "lab-follow-the-connected-journey-across-swimlanes-1",
    "topicId": "follow-the-connected-journey-across-swimlanes",
    "marker": "A useful reading test is to freeze the journey after any arrow. Can you list exactly what is known, what remai",
    "label": "Connected actor workflow and branching authority",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-state-and-authority-overlay-independent-facts-one-customer-projection-1",
    "topicId": "state-and-authority-overlay-independent-facts-one-customer-projection",
    "marker": "For every milestone, record: actor; fact; stable identity; scope of authority; when the platform last observed",
    "label": "Milestone authority and customer projections",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-branching-scenario-studio-and-uncertain-outcomes-1",
    "topicId": "branching-scenario-studio-and-uncertain-outcomes",
    "marker": "A model-generated answer is not a real provider observation. It must be deterministic under its assumptions. I",
    "label": "Predict partial workflow outcomes",
    "legacyAfterBlock": 1
   }
  ]
 },
 '1.1.6': {
  id:'1.1.6',chapter:'C2',manuscript:manuscript6,
  component:lazy(()=>import('./lesson116/Lesson116')),
  topics:[
   {
    "id": "one-dinner-several-independent-answers",
    "heading": "Orient — One dinner, several independent answers",
    "nav": "One journey, several independent truths",
    "legacySection": 1
   },
   {
    "id": "a-state-machine-is-a-precise-transition-system",
    "heading": "Understand — A state machine is a precise transition system",
    "nav": "The state-transition decision",
    "legacySection": 2
   },
   {
    "id": "business-workflow-lifecycle-and-orchestration-are-different-objects",
    "heading": "Understand — Business workflow, lifecycle and orchestration are different objects",
    "nav": "Workflow versus lifecycle",
    "legacySection": 3
   },
   {
    "id": "identity-makes-state-transitions-belong-to-the-same-entity",
    "heading": "Understand — Identity makes state transitions belong to the same entity",
    "nav": "Identity across transitions",
    "legacySection": 4
   },
   {
    "id": "model-the-platform-owned-order-intake-lifecycle-first",
    "heading": "Understand — Model the platform-owned Order intake lifecycle first",
    "nav": "Platform Order intake lifecycle",
    "legacySection": 5
   },
   {
    "id": "model-the-independent-restaurantdecision-lifecycle",
    "heading": "Understand — Model the independent RestaurantDecision lifecycle",
    "nav": "RestaurantDecision lifecycle",
    "legacySection": 6
   },
   {
    "id": "model-one-paymentattempt-not-the-payment-status-of-the-order",
    "heading": "Understand — Model one PaymentAttempt, not \"the payment status of the order\"",
    "nav": "PaymentAttempt and uncertain results",
    "legacySection": 7
   },
   {
    "id": "side-by-side-state-machines-and-transition-provenance",
    "heading": "Explore — Side-by-side state machines and transition provenance",
    "nav": "Inspect three state graphs",
    "legacySection": 8
   },
   {
    "id": "cross-lifecycle-predicates-are-observations-not-shared-authority",
    "heading": "Understand — Cross-lifecycle predicates are observations, not shared authority",
    "nav": "Cross-lifecycle predicates",
    "legacySection": 9
   },
   {
    "id": "state-explosion-the-price-of-collapsing-independent-lives",
    "heading": "Understand — State explosion: the price of collapsing independent lives",
    "nav": "Why global states explode",
    "legacySection": 10
   },
   {
    "id": "independent-progress-without-imaginary-global-commit",
    "heading": "Predict — Independent progress without imaginary global commit",
    "nav": "Predict partial workflow progress",
    "legacySection": 11
   },
   {
    "id": "illegal-transitions-and-the-unchanged-state-contract",
    "heading": "Understand — Illegal transitions and the unchanged-state contract",
    "nav": "Illegal transitions preserve state",
    "legacySection": 12
   },
   {
    "id": "ordering-observation-times-and-competing-histories",
    "heading": "Understand — Ordering, observation times and competing histories",
    "nav": "Ordering and competing histories",
    "legacySection": 13
   },
   {
    "id": "the-unresolved-business-policy-register-constrains-model-claims",
    "heading": "Understand — The unresolved business policy register constrains model claims",
    "nav": "Unresolved POL-01–POL-10 rules",
    "legacySection": 14
   },
   {
    "id": "trace-the-real-single-deployable-java-evolution",
    "heading": "Engineer — Trace the real single-deployable Java evolution",
    "nav": "Trace actual Java domain code",
    "legacySection": 15
   },
   {
    "id": "a-table-of-assertions-not-vague-confidence",
    "heading": "Verify — A table of assertions, not vague confidence",
    "nav": "Exhaustive verification and limits",
    "legacySection": 16
   },
   {
    "id": "why-the-order-says-refunded-but-the-merchant-says-rejected",
    "heading": "Diagnose — Why the order says REFUNDED but the merchant says REJECTED",
    "nav": "Diagnose a false Refunded status",
    "legacySection": 17
   },
   {
    "id": "communicate-boundaries-at-senior-and-staff-levels",
    "heading": "Defend — Communicate boundaries at Senior and Staff levels",
    "nav": "Defend lifecycle boundaries",
    "legacySection": 18
   },
   {
    "id": "rebuild-the-model-and-transfer-it-to-another-domain",
    "heading": "Retain — Rebuild the model and transfer it to another domain",
    "nav": "Transfer and mastery gate",
    "legacySection": 19
   }
  ],
  labs:[
   {
    "id": "lab-side-by-side-state-machines-and-transition-provenance-1",
    "topicId": "side-by-side-state-machines-and-transition-provenance",
    "marker": "Select any edge. The inspector should reveal its **source state, requested action, necessary evidence, respons",
    "label": "Side-by-side independent lifecycle graphs and authority inspector",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-cross-lifecycle-predicates-are-observations-not-shared-authority-1",
    "topicId": "cross-lifecycle-predicates-are-observations-not-shared-authority",
    "marker": "Suppose the first predicate is true. The workflow may have progressed financially but not operationally. Wheth",
    "label": "Workflow overlay across Order, RestaurantDecision and PaymentAttempt",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-independent-progress-without-imaginary-global-commit-1",
    "topicId": "independent-progress-without-imaginary-global-commit",
    "marker": "Now change only the merchant decision to REJECTED and payment to REFUND_PENDING after a hypothetical capture. ",
    "label": "Predict independent state progress and unresolved effects",
    "legacyAfterBlock": 1
   }
  ]
 },
 '1.1.7': {
  id:'1.1.7',chapter:'C2',manuscript:manuscript7,
  component:lazy(()=>import('./lesson117/Lesson117')),
  topics:[
   {
    "id": "a-syntactically-valid-command-that-is-business-illegal",
    "heading": "Orient — A syntactically valid command that is business-illegal",
    "nav": "A valid but business-illegal command",
    "legacySection": 1
   },
   {
    "id": "six-boundaries-hidden-inside-the-word-valid",
    "heading": "Understand — Six boundaries hidden inside the word “valid”",
    "nav": "Six boundaries of validity",
    "legacySection": 2
   },
   {
    "id": "input-validation-is-not-a-transition-guard",
    "heading": "Understand — Input validation is not a transition guard",
    "nav": "Input validation versus state guards",
    "legacySection": 3
   },
   {
    "id": "authentication-authorization-and-business-fact-authority",
    "heading": "Understand — Authentication, authorization and business fact authority",
    "nav": "Authentication and business authority",
    "legacySection": 4
   },
   {
    "id": "preconditions-postconditions-and-invariants-have-different-scopes",
    "heading": "Understand — Preconditions, postconditions and invariants have different scopes",
    "nav": "Preconditions, postconditions, invariants",
    "legacySection": 5
   },
   {
    "id": "build-a-total-transition-decision-function",
    "heading": "Understand — Build a total transition decision function",
    "nav": "Total and explicit decision results",
    "legacySection": 6
   },
   {
    "id": "preserve-identity-and-actor-scope-through-every-result",
    "heading": "Understand — Preserve identity and actor scope through every result",
    "nav": "Identity and actor-scope rules",
    "legacySection": 7
   },
   {
    "id": "state-only-guards-versus-context-dependent-guards",
    "heading": "Understand — State-only guards versus context-dependent guards",
    "nav": "State-only versus contextual guards",
    "legacySection": 8
   },
   {
    "id": "reconcile-blueprint-placed-with-actual-java-requested-and-pending",
    "heading": "Understand — Reconcile blueprint PLACED with actual Java REQUESTED and PENDING",
    "nav": "Mapping PLACED to actual Java states",
    "legacySection": 9
   },
   {
    "id": "trace-the-illustrative-accept-command-across-eleven-guards",
    "heading": "Explore — Trace the illustrative ACCEPT command across eleven guards",
    "nav": "Trace eleven merchant guards",
    "legacySection": 10
   },
   {
    "id": "accepting-an-already-rejected-decision-must-remain-rejected",
    "heading": "Understand — Accepting an already rejected decision must remain rejected",
    "nav": "Accept after rejection is illegal",
    "legacySection": 11
   },
   {
    "id": "trying-to-prepare-food-before-merchant-acceptance",
    "heading": "Understand — Trying to prepare food before merchant acceptance",
    "nav": "Preparation before acceptance",
    "legacySection": 12
   },
   {
    "id": "attempting-completion-before-preparation",
    "heading": "Understand — Attempting completion before preparation",
    "nav": "Completion before preparation",
    "legacySection": 13
   },
   {
    "id": "derive-total-decision-tables-rather-than-ad-hoc-if-statements",
    "heading": "Explore — Derive total decision tables rather than ad hoc if statements",
    "nav": "Total decision tables",
    "legacySection": 14
   },
   {
    "id": "guard-ordering-first-failure-and-information-disclosure",
    "heading": "Understand — Guard ordering, first failure and information disclosure",
    "nav": "Guard ordering and error disclosure",
    "legacySection": 15
   },
   {
    "id": "side-effect-free-rejection-and-legitimate-fact-emission",
    "heading": "Understand — Side-effect-free rejection and legitimate fact emission",
    "nav": "No mutation, no success fact",
    "legacySection": 16
   },
   {
    "id": "a-passing-pure-guard-is-not-a-persistence-commit",
    "heading": "Understand — A passing pure guard is not a persistence commit",
    "nav": "Passing guard versus persistence commit",
    "legacySection": 17
   },
   {
    "id": "stale-states-conflicting-observations-and-commit-time-checks",
    "heading": "Understand — Stale states, conflicting observations and commit-time checks",
    "nav": "Stale states and TOCTOU races",
    "legacySection": 18
   },
   {
    "id": "cross-lifecycle-guards-require-independent-evidence",
    "heading": "Understand — Cross-lifecycle guards require independent evidence",
    "nav": "Cross-lifecycle evidence and policy",
    "legacySection": 19
   },
   {
    "id": "change-inputs-in-the-live-guard-inspector",
    "heading": "Explore — Change inputs in the live guard inspector",
    "nav": "Manipulate the guard inspector",
    "legacySection": 20
   },
   {
    "id": "before-after-fact-no-fact-and-the-counterexample-discipline",
    "heading": "Predict — Before/after, fact/no-fact and the counterexample discipline",
    "nav": "Predict legality and fact scope",
    "legacySection": 21
   },
   {
    "id": "trace-the-real-java-evaluator-and-application-outcomes",
    "heading": "Engineer — Trace the real Java evaluator and application outcomes",
    "nav": "Trace actual Java implementation",
    "legacySection": 22
   },
   {
    "id": "derive-executable-tests-from-rules-not-controller-responses",
    "heading": "Verify — Derive executable tests from rules, not controller responses",
    "nav": "Table-derived Java and browser tests",
    "legacySection": 23
   },
   {
    "id": "illegal-acceptance-missing-guard-stale-state-or-adapter-mapping",
    "heading": "Diagnose — Illegal acceptance: missing guard, stale state or adapter mapping?",
    "nav": "Diagnose illegal acceptance",
    "legacySection": 24
   },
   {
    "id": "a-staff-reviewer-proposes-an-exception-policy",
    "heading": "Defend — A Staff reviewer proposes an exception policy",
    "nav": "Revise an exception policy",
    "legacySection": 25
   },
   {
    "id": "rebuild-the-table-and-transfer-the-mechanism",
    "heading": "Retain — Rebuild the table and transfer the mechanism",
    "nav": "Transfer and mastery gate",
    "legacySection": 26
   }
  ],
  labs:[
   {
    "id": "lab-trace-the-illustrative-accept-command-across-eleven-guards-1",
    "topicId": "trace-the-illustrative-accept-command-across-eleven-guards",
    "marker": "The sequence begins with **IDENTITY_ORDER**: does the target command refer to the same OrderId as the decision",
    "label": "Guarded merchant and preparation transitions with actor and evidence controls",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-derive-total-decision-tables-rather-than-ad-hoc-if-statements-1",
    "topicId": "derive-total-decision-tables-rather-than-ad-hoc-if-statements",
    "marker": "| State before | ACCEPT | REJECT | Meaning | |---|---|---|---| | PENDING | Candidate ACCEPTED | Candidate REJE",
    "label": "Total state-and-action decision tables",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-a-passing-pure-guard-is-not-a-persistence-commit-1",
    "topicId": "a-passing-pure-guard-is-not-a-persistence-commit",
    "marker": "The exact commit point depends on storage semantics. For a local database aggregate, a typical approach would ",
    "label": "Pure decision, persistence commit and authoritative fact boundary",
    "legacyAfterBlock": 1
   },
   {
    "id": "lab-before-after-fact-no-fact-and-the-counterexample-discipline-1",
    "topicId": "before-after-fact-no-fact-and-the-counterexample-discipline",
    "marker": "Consider an authenticated merchant operator for the correct restaurant whose source evidence assumption is fal",
    "label": "Predict before reveal business legality",
    "legacyAfterBlock": 1
   }
  ]
 },
} satisfies Record<string,AuthoredEntry>;
export type AuthoredLessonId = keyof typeof authoredLessonRegistry;
export const authoredLessonIds = Object.keys(authoredLessonRegistry) as AuthoredLessonId[];
export function getAuthoredLesson(id:string):AuthoredEntry|undefined{
 return Object.prototype.hasOwnProperty.call(authoredLessonRegistry,id)
   ?authoredLessonRegistry[id as AuthoredLessonId] : undefined;
}
export function getLessonTopics(id:string){
 const lesson=getAuthoredLesson(id);
 if(!lesson)return [];
 const sections=parseCanonicalSections(lesson.manuscript);
 return sections.map((section,index)=>({
   ...section,...lesson.topics[index],
   // Validate one-to-one mapping in CI; no silent fallback of editorial metadata.
 }));
}
export function topicForQuery(id:string,params:URLSearchParams){
 const entry=getAuthoredLesson(id);
 if(!entry)return undefined;
 const stable=params.get('topic');
 if(stable)return entry.topics.find(t=>t.id===stable);
 const numeric=params.get('section');
 if(numeric!==null&&/^\d+$/.test(numeric))
   return entry.topics.find(t=>t.legacySection===Number(numeric));
 return entry.topics[0];
}
export function getLabAnchor(id:string,topicId:string,label:string):LabAnchor|undefined{
 return getAuthoredLesson(id)?.labs.find(l=>l.topicId===topicId&&l.label===label);
}
export function sectionMenuTitle(lessonId:string,index:number,fallback:string):string{
 return getAuthoredLesson(lessonId)?.topics[index]?.nav??fallback;
}
