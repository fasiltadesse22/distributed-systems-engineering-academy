/**
 * Lesson 1.1.1 domain discovery model.
 * This is an explicit teaching policy, NOT verified production authority.
 */
export type ActorId = 'customer' | 'restaurant' | 'provider' | 'operations' | 'kitchen' | 'delivery' | 'support';
export type AuthorityId = ActorId | 'policy';
export type ActorKind = 'human-role' | 'organization' | 'external-system';
export interface Actor {
  id: ActorId;
  label: string;
  kind: ActorKind;
  goal: string;
  incentives: string[];
  responsibilities: string[];
  authoritativeFacts: string[];
  observes: string[];
  dependsOn: ActorId[];
  risk: string;
}
export interface AuthorityDecision {
  id: string;
  name: string;
  question: string;
  baseline: AuthorityId;
  requester: string;
  factSource: string;
  accountable: string;
  explanation: string;
  conflict: string;
  policy: 'teaching-assumption' | 'unresolved';
}
export const actors: Actor[] = [
  { id:'customer', label:'Customer', kind:'human-role', goal:'Obtain the agreed meal, price and delivery experience without unfair loss.', incentives:['Fast fulfillment','Transparent total and cancellation rules','Correct financial outcome'],responsibilities:['Specify purchase intent and contact details','Request changes or cancellation under policy','Report delivery disputes'],authoritativeFacts:['Own request to buy or cancel','Customer-reported receipt/dispute'],observes:['Merchant acceptance','Provider-result summary','Order/delivery status'],dependsOn:['restaurant','provider','operations','delivery'],risk:'A customer can request cancellation but cannot unilaterally certify merchant acceptance or bank refund.' },
  { id:'restaurant', label:'Restaurant operator', kind:'human-role', goal:'Fulfill feasible orders profitably, controlling stock, capacity and exceptions.',incentives:['Predictable prep load','Avoid uncompensated cancellation','Accurate menu availability'],responsibilities:['Maintain feasible menu and capacity','Accept or reject fulfillment','Define/approve merchant exception policy'],authoritativeFacts:['Merchant acceptance/rejection','Merchant availability and capacity','Merchant-approved cancellation exception'],observes:['Order request','Payment confirmation summary','Delivery pickup'],dependsOn:['customer','operations','kitchen','provider'],risk:'Merchant status cannot substitute for provider evidence that funds were returned.' },
  { id:'provider', label:'Payment provider', kind:'external-system', goal:'Process financial operations under its actual provider contract.',incentives:['Correct authorization and refund outcomes','Risk and settlement compliance','Auditable transaction results'],responsibilities:['Process authorization/capture/refund requests','Provide status lookup or reconciliation supported by contract','Report actual transaction outcome'],authoritativeFacts:['Provider authorization/capture result','Provider refund status (not necessarily bank posting)'],observes:['Contracted payment requests'],dependsOn:['operations'],risk:'A timeout or pending response is not proof that a charge failed.' },
  { id:'operations', label:'Platform operations', kind:'organization', goal:'Coordinate a reliable customer-facing marketplace and enforce published policies.',incentives:['Customer trust','Fair merchant economics','Manageable support and fraud cost'],responsibilities:['Define and enforce platform policy with stakeholders','Record accepted/rejected order intake','Coordinate communications and escalation'],authoritativeFacts:['Platform intake acknowledgement','Applied platform policy outcome','Platform-composed view with provenance'],observes:['Merchant decisions','Provider financial evidence','Delivery reports'],dependsOn:['restaurant','provider','customer','delivery','support'],risk:'Operating a UI or database does not confer authority to invent a provider-owned fact.' },
  { id:'kitchen', label:'Kitchen staff', kind:'human-role', goal:'Prepare the correct food against legitimately accepted work.',incentives:['Predictable tickets','Avoid waste','Accurate readiness estimates'],responsibilities:['Prepare only authorized work','Report readiness and substitutions','Signal irreversibility once prep begins'],authoritativeFacts:['Preparation started','Food ready for pickup'],observes:['Accepted order ticket','Restaurant decisions','Pickup instructions'],dependsOn:['restaurant','delivery'],risk:'Kitchen readiness does not imply that customer payment completed.' },
  { id:'delivery', label:'Delivery participant', kind:'human-role', goal:'Coordinate pickup and customer handoff safely and reliably.',incentives:['Efficient routes','Accurate readiness','Credible handoff evidence'],responsibilities:['Confirm pickup and handoff steps','Record delivery issues','Supply proof under delivery policy'],authoritativeFacts:['Delivery-side pickup/handoff report (disputable)'],observes:['Restaurant readiness','Customer drop-off instructions'],dependsOn:['kitchen','restaurant','customer','operations'],risk:'A courier-reported handoff may still be disputed; proof rules require explicit policy.' },
  { id:'support', label:'Support agent', kind:'human-role', goal:'Resolve exceptions without promising unverified outcomes.',incentives:['Customer resolution','Auditable overrides','Low repeat complaints'],responsibilities:['Investigate complaints and log rationale','Initiate authorized remedy requests','Escalate beyond permission limits'],authoritativeFacts:['Support case and authorized escalation decision'],observes:['Order state','Merchant decision','Provider-reported financial outcomes'],dependsOn:['customer','restaurant','operations','provider'],risk:'Initiating a refund does not mean the provider has completed one.' },
];
export const actorById = Object.fromEntries(actors.map(a => [a.id, a])) as Record<ActorId, Actor>;
export const authorityOptions: {id: AuthorityId; label: string}[] = [
  ...actors.map(a=>({id:a.id,label:a.label})),{id:'policy',label:'Unresolved cross-actor policy'}
];
export const decisions: AuthorityDecision[] = [
  {id:'purchase-intent',name:'Submit purchase intent',question:'Who can initiate a purchase for their own account?',baseline:'customer',requester:'Customer',factSource:'Customer request received by platform',accountable:'Platform for intake',explanation:'The customer owns the purchase intent; the platform decides intake eligibility, which is a separate question.',conflict:'A merchant-initiated purchase without customer consent can produce unauthorized orders.',policy:'teaching-assumption'},
  {id:'fulfillment',name:'Accept/reject fulfillment',question:'Who decides whether Cedar Kitchen can prepare the basket?',baseline:'restaurant',requester:'Merchant staff or delegated merchant rules',factSource:'Merchant fulfillment decision',accountable:'Restaurant',explanation:'Only the merchant has operational authority for its capacity and availability; the platform may validate and record the answer.',conflict:'The platform may promise food a restaurant cannot make, causing contradictory customer commitments.',policy:'teaching-assumption'},
  {id:'payment',name:'Confirm provider authorization',question:'Whose evidence confirms a provider-approved authorization?',baseline:'provider',requester:'Platform financial adapter under customer consent',factSource:'Provider authorization response or verified lookup',accountable:'Platform for truthful customer messaging',explanation:'A provider decides its financial operation; platform recording is derivative, not independently authoritative.',conflict:'Treating a local success flag as financial truth can create false paid/declined messages.',policy:'teaching-assumption'},
  {id:'preparation',name:'Declare kitchen readiness',question:'Who can attest that an accepted meal is ready?',baseline:'kitchen',requester:'Kitchen role under restaurant policy',factSource:'Kitchen readiness report',accountable:'Restaurant',explanation:'The kitchen reports preparation progress and readiness; accepting the order and reporting paid status are different decisions.',conflict:'Premature dispatch and false readiness promises waste courier time.',policy:'teaching-assumption'},
  {id:'handoff',name:'Report delivery handoff',question:'Who reports actual courier handoff (subject to dispute)?',baseline:'delivery',requester:'Assigned courier/dispatcher',factSource:'Delivery handoff evidence, subject to proof policy',accountable:'Delivery operations',explanation:'The delivery participant reports its part of the workflow; the customer may dispute receipt.',conflict:'The platform could declare delivery completed based on an unproven signal.',policy:'teaching-assumption'},
  {id:'cancel-request',name:'Request customer cancellation',question:'Who originates the customer cancellation request?',baseline:'customer',requester:'Customer',factSource:'Authenticated customer intent',accountable:'Platform for policy response',explanation:'Requesting cancellation is not the same as granting it. Eligibility belongs to the defined cancellation policy.',conflict:'Conflating request and approval permits inappropriate unilateral cancellation.',policy:'teaching-assumption'},
  {id:'late-cancel',name:'Approve post-acceptance cancellation',question:'Who may approve an exception after merchant acceptance?',baseline:'policy',requester:'Customer through platform',factSource:'Explicit merchant/platform policy and approval record',accountable:'Commercial policy owners',explanation:'The contract intentionally leaves this as a policy decision needing merchant/platform agreement and cost allocation.',conflict:'Guessing a single owner can promise refunds or force kitchen waste without authorization.',policy:'unresolved'},
  {id:'refund-approval',name:'Authorize refund request',question:'Under the illustrative delegated support policy, who can approve starting a refund request?',baseline:'operations',requester:'Support or finance reviewer',factSource:'Platform authorized remediation decision',accountable:'Platform operations/finance',explanation:'Platform operations approves a remedy within limits; sending the request does not prove provider completion.',conflict:'Support or merchant might falsely promise money returned without confirming a provider response.',policy:'teaching-assumption'},
  {id:'refund-confirm',name:'Confirm provider refund',question:'Whose fact establishes that the provider completed a refund operation?',baseline:'provider',requester:'Platform after approved remediation',factSource:'Provider refund result',accountable:'Platform for customer communication',explanation:'The external provider reports the status of its own refund operation, which is distinct from customer bank posting.',conflict:'A local status marked REFUNDED can conceal an unprocessed or declined provider request.',policy:'teaching-assumption'},
  {id:'case',name:'Investigate customer dispute',question:'Who owns the customer-facing investigation and escalation?',baseline:'support',requester:'Customer, merchant or monitoring signal',factSource:'Audited support case, with external evidence collected',accountable:'Platform operations',explanation:'Support investigates and escalates; it cannot rewrite the merchant or provider facts it observes.',conflict:'No responsible coordinator leaves customers caught between two systems and unresolved contradictory claims.',policy:'teaching-assumption'},
];

export function assessAuthority(decision: AuthorityDecision, assigned: AuthorityId) {
  const match = decision.baseline === assigned;
  return {
    match,
    level: decision.policy === 'unresolved' ? 'unresolved' as const : match ? 'aligned' as const : 'conflict' as const,
    message: match
      ? decision.policy === 'unresolved' ? 'Correctly preserved an unresolved business decision rather than inventing an owner.' : decision.explanation
      : decision.policy === 'unresolved'
        ? 'You selected a single authority for a policy that is intentionally undecided. Obtain merchant/platform agreement first. ' + decision.conflict
        : 'This differs from the illustrative baseline: ' + decision.explanation + ' Risk: ' + decision.conflict
  };
}
export type RestaurantDecision = 'accept'|'reject';
export type ProviderDecision = 'approved'|'declined'|'unknown';
export type Cancellation = 'none'|'after-accept';
export type CancellationPolicy = 'strict'|'exception';
export type RefundResult = 'pending'|'confirmed'|'rejected';
export interface JourneyInput {
  restaurant: RestaurantDecision;
  provider: ProviderDecision;
  cancellation: Cancellation;
  policy: CancellationPolicy;
  refund: RefundResult;
}
export interface JourneyStep {
  id: number;actor: string;action:string;authority:string;fact:string;analysis:string;
}
export interface JourneyResult {
  steps:JourneyStep[];
  orderOutcome:string;
  paymentOutcome:string;
  customerMessage:string;
  warning:string;
}
export function runJourney(input: JourneyInput): JourneyResult {
  const steps: JourneyStep[]=[];
  const add=(actor:string,action:string,authority:string,fact:string,analysis:string)=>{
    steps.push({id:steps.length+1,actor,action,authority,fact,analysis});
  };
  add('Customer','Requests an order','Customer owns intent','Purchase requested','A purchase request does not yet mean the restaurant accepted or the payment succeeded.');
  add('Platform','Validates order intake','Published platform intake policy','Order request recorded','The platform is accountable for truthful intake communication, not merchant capacity.');
  if(input.restaurant==='reject'){
    add('Restaurant','Rejects unavailable item/order','Restaurant controls fulfillment','Merchant rejection','No payment attempt is created under this illustrative pay-after-accept policy.');
    add('Platform','Notifies customer','Platform communication responsibility','Order rejected','The restaurant decision is not interchangeable with a provider reversal.');
    return {steps,orderOutcome:'Rejected by merchant',paymentOutcome:'No payment attempt',customerMessage:'The restaurant cannot fulfill this order; no charge was requested in this modeled sequence.',warning:'If a real charge is later observed, investigate it independently; order rejection is not proof of a refund.'};
  }
  add('Restaurant','Accepts feasible basket','Restaurant decides feasibility','Merchant accepted','Acceptance authorizes merchant work but is not a payment fact.');
  if(input.provider==='declined'){
    add('Provider','Declines payment operation','Provider controls provider outcome','Payment declined','Merchant acceptance does not override provider rejection.');
    if(input.cancellation==='after-accept') add('Customer','Requests cancellation','Customer initiates','Cancellation request','The illustrative policy records this request, but payment has already failed; no refund is justified.');
    return {steps,orderOutcome:'Accepted, payment unresolved operationally',paymentOutcome:'Provider declined',customerMessage:'Your payment was declined. Food preparation is not authorized under this teaching policy.',warning:'Do not claim preparation or a captured payment on the basis of merchant acceptance alone.'};
  }
  if(input.provider==='unknown'){
    add('Provider','No conclusive outcome available','Provider is authoritative for result','Payment outcome unknown','Timeout/pending is an observation, not a financial decision.');
    if(input.cancellation==='after-accept') add('Customer','Requests late cancellation','Customer initiates','Cancellation requested','Any financial remediation needs authoritative provider evidence and an applicable policy.');
    return {steps,orderOutcome:'Accepted, awaiting financial resolution',paymentOutcome:'Unknown / requires evidence',customerMessage:'The payment outcome is being verified; the platform cannot yet say paid or declined.',warning:'Do not automatically retry or claim funds returned. Provider verification/reconciliation is deferred.'};
  }
  add('Provider','Approves specified payment operation','Provider confirms its operation','Provider approval','The exact meaning (authorization vs capture) depends on the provider contract; this model treats it as a confirmed payment gate, not proof of settlement.');
  if(input.cancellation==='after-accept'){
    add('Customer','Requests cancellation after acceptance','Customer owns intent','Late cancellation requested','A request alone does not repeal merchant acceptance or a provider outcome.');
    if(input.policy==='strict'){
      add('Platform','Applies strict policy','Published merchant/platform cancellation rule','Late cancellation denied','Merchant preparation obligation remains; customer needs explicit explanation and dispute path.');
      add('Kitchen','Prepares accepted, cleared order','Kitchen confirms preparation','Food preparation started','Late cancellation was denied under the selected teaching assumption.');
      return {steps,orderOutcome:'Accepted; cancellation denied',paymentOutcome:'Approved operation',customerMessage:'Cancellation is not available after restaurant acceptance under this example policy. Contact support for exceptions.',warning:'Business owners must approve this policy and communicate its financial consequences.'};
    }
    add('Restaurant / Platform','Approve exception','Explicit merchant/platform override policy','Cancellation exception approved','Commercial accountability and cost allocation must be specified.');
    add('Platform','Requests refund','Platform initiates authorized remediation','Refund requested','Requesting a refund is not confirming it.');
    if(input.refund==='pending'){
      add('Provider','Refund pending / not yet confirmed','Provider controls refund outcome','Refund pending','Do not tell the customer money was returned.');
      return {steps,orderOutcome:'Cancelled by approved exception',paymentOutcome:'Refund pending',customerMessage:'Cancellation was approved and the refund has been requested; completion is not yet confirmed.',warning:'This creates a follow-up obligation; pending is not refunded.'};
    }
    if(input.refund==='rejected'){
      add('Provider','Declines refund request','Provider controls refund outcome','Refund not completed','Platform must escalate/reconcile the failed remediation.');
      return {steps,orderOutcome:'Cancelled by approved exception',paymentOutcome:'Refund declined',customerMessage:'Cancellation was approved but the refund could not be completed; support must investigate.',warning:'A cancelled order may still have an outstanding customer financial obligation.'};
    }
    add('Provider','Confirms provider refund operation','Provider controls refund outcome','Provider refund confirmed','Customer bank posting may still take time and is not evidenced by this toy model.');
    return {steps,orderOutcome:'Cancelled by approved exception',paymentOutcome:'Provider refund confirmed',customerMessage:'The provider confirmed the refund operation; bank posting may follow its own timing.',warning:'Provider confirmation is not the same as observed bank posting or real-world payment settlement.'};
  }
  add('Kitchen','Prepares accepted order','Kitchen confirms preparation','Food ready','A kitchen fact is separate from merchant approval and provider approval.');
  add('Delivery','Reports pickup and handoff','Delivery participant reports handoff','Delivery reported','A customer dispute may still require proof-of-delivery review.');
  return {steps,orderOutcome:'Fulfilled in illustrative flow',paymentOutcome:'Provider approved operation',customerMessage:'Merchant accepted, provider approved, kitchen prepared, and delivery reported handoff.',warning:'This modeled journey does not demonstrate real payment settlement, delivery proof or runtime guarantees.'};
}

export interface Challenge {
  id:string;scenario:string;question:string;answer:AuthorityId;explanation:string;temptation:string;
}
export const challenges:Challenge[]=[
  {id:'q1',scenario:'Cedar Kitchen is out of an ingredient while a customer is ordering.',question:'Who decides whether the restaurant can fulfill the requested basket?',answer:'restaurant',explanation:'The merchant is authoritative for its kitchen capacity and fulfillment commitment; the platform may route and record its decision.',temptation:'A platform pricing/availability cache can be stale and cannot make an unavailable ingredient appear.'},
  {id:'q2',scenario:'An external payment request returns a verified authorization success.',question:'Whose evidence makes this provider authorization fact true?',answer:'provider',explanation:'The provider controls the outcome of its financial operation. The platform may record and display the result.',temptation:'A Payment module or green badge is not itself external financial authority.'},
  {id:'q3',scenario:'The customer presses “Cancel” before the restaurant has answered.',question:'Who initiates this customer cancellation intent?',answer:'customer',explanation:'The customer owns the request; the published policy separately decides whether it is granted.',temptation:'Requesting cancellation and approving it are different business decisions.'},
  {id:'q4',scenario:'A restaurant accepted; the customer wants a discretionary late cancellation.',question:'Who can approve an exception if no merchant/platform policy has yet been agreed?',answer:'policy',explanation:'The correct modeling answer is unresolved cross-actor policy; owners must negotiate financial cost and exception authority.',temptation:'Silently granting restaurant or platform absolute control would hard-code a policy never agreed.'},
  {id:'q5',scenario:'Support approved and sent a refund request. The customer wants to know whether the provider completed it.',question:'Who confirms the provider refund result?',answer:'provider',explanation:'The provider is authoritative for the refund operation. A request is not a completion fact.',temptation:'Support approval can authorize initiation, not external fund transfer.'},
  {id:'q6',scenario:'A driver completed a handoff, but the customer disputes receiving the meal.',question:'Who can report the delivery-side handoff observation?',answer:'delivery',explanation:'The delivery participant supplies the delivery-side report; it remains disputable under proof-of-handoff policy.',temptation:'The platform should investigate, not rewrite a delivery observation into unquestionable fact.'},
];
export const diagnosticEvidence=[
 {id:'policy',title:'Read the effective cancellation policy',detail:'Merchant contract says cancellation closes at acceptance; customer screen promises cancellation until preparation. The texts disagree.',implication:'Supports a policy/communication inconsistency. It does not by itself prove a race or data corruption.',next:'Reconcile approved wording, policy version and exception authority with commercial owners.'},
 {id:'timeline',title:'Compare decision acknowledgements',detail:'Customer saw “cancelled” at T1; merchant acceptance was recorded at T0. The displayed cancellation was never approved as an exception.',implication:'Supports an invalid success message or missing guard. Timing alone does not prove which layer failed.',next:'Inspect the application policy check and transition evidence for the exact order/version.'},
 {id:'provider',title:'Inspect provider-side financial evidence',detail:'Provider reports authorization approved, refund status not requested, and no captured settlement evidence in the synthetic case.',implication:'Distinguishes financial facts from the customer-facing order label. “Cancelled” does not establish “refunded”.',next:'Obtain provider contract semantics, capture history and authorized remediation policy.'},
 {id:'screens',title:'Compare each screen’s data source',detail:'Customer UI reads a cached composed status while merchant UI reads a direct merchant decision; neither labels its provenance.',implication:'Stale/read-model disagreement is plausible. It cannot excuse a policy-defying confirmed cancellation.',next:'Record sources, versions, cache age and precise claims represented by each badge.'},
] as const;
