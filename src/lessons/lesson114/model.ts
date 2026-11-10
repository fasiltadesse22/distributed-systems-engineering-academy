/**
 * Lesson 1.1.4 deterministic conceptual model.
 * No HTTP calls, no merchant/provider integration, no production authority.
 * Scenario labels distinguish actual Java semantics from future hypotheticals.
 */
export type IdentityScenario='rename'|'two-attempts'|'same-name'|'repeat-callback'|'stale-projection'|'duplicate-id'|'duplicate-post';
export type Prediction='stable'|'two-attempts'|'separate-merchants'|'one-operation'|'not-confirmed'|'create-rejected'|'two-orders';
export interface IdentityStep {stage:string;identity:string;assertion:string;authority:string}
export interface IdentityResult {
 scenario:IdentityScenario;
 expected:Prediction;
 heading:string;
 evidence:'IMPLEMENTED LOCAL JAVA CONTRACT'|'CONCEPTUAL FUTURE DOMAIN';
 stableId:string;
 changedId:string;
 authority:string;
 presentation:string;
 meaning:string;
 limitation:string;
 steps:IdentityStep[];
}
export const scenarioChoices:{id:IdentityScenario;label:string;description:string}[]=[
 {id:'rename',label:'Restaurant changes its display name',description:'An authorized rename changes one attribute, not the continuing restaurant identity.'},
 {id:'two-attempts',label:'Two payment attempts under one order',description:'Two provider operations; the OrderId remains one stable parent identity.'},
 {id:'same-name',label:'Two merchants share a display name',description:'Different merchant references are not merged by a name-based join.'},
 {id:'repeat-callback',label:'Same provider callback delivered twice',description:'Two technical deliveries about one provider operation are not two payments.'},
 {id:'stale-projection',label:'UI says Paid but provider has not confirmed capture',description:'A presentation cannot upgrade authorization/unknown into captured.'},
 {id:'duplicate-id',label:'Attempt to create a second Order under the existing OrderId',description:'An actual local repository contract rejects overwrite of the same identity.'},
 {id:'duplicate-post',label:'Two identical eligible PlaceOrder POSTs',description:'The current endpoint is non-idempotent: the service generates new IDs.'}
];
export const predictionChoices:{id:Prediction;label:string}[]=[
 {id:'stable',label:'Existing restaurant identity stays stable'},
 {id:'two-attempts',label:'Same OrderId, distinct attempt identities'},
 {id:'separate-merchants',label:'Different merchants despite same display name'},
 {id:'one-operation',label:'One provider operation observed twice'},
 {id:'not-confirmed',label:'Payment capture is not verified'},
 {id:'create-rejected',label:'Duplicate create rejected; original snapshot unchanged'},
 {id:'two-orders',label:'Two new OrderIds are generated'}
];
const step=(stage:string,identity:string,assertion:string,authority:string):IdentityStep=>({stage,identity,assertion,authority});
export function simulateIdentity(id:IdentityScenario):IdentityResult {
 switch(id){
 case 'rename':return{
  scenario:id,expected:'stable',heading:'A name change does not create a new restaurant',
  evidence:'CONCEPTUAL FUTURE DOMAIN',stableId:'RestaurantId R-17',changedId:'Display name: Cedar Kitchen → Cedar Table',
  authority:'A legitimate restaurant identity registry / authorized merchant policy',
  presentation:'UI may display the new name while retaining the same entity reference.',
  meaning:'Restaurant identity and mutable display name are independent dimensions. A name alias must be approved by its legitimate owner.',
  limitation:'The current Java fixture does not support a rename operation; this is a conceptual business model.',
  steps:[step('Original entity','R-17','Public name Cedar Kitchen','Restaurant identity registry'),
   step('Proposed rename','R-17','Authorized change to Cedar Table','Merchant/approved catalog policy'),
   step('Derived view','R-17','Updated name is shown, not a new merchant ID','UI projection')]
 };
 case 'two-attempts':return{
  scenario:id,expected:'two-attempts',heading:'One order can own two separate payment attempts',
  evidence:'CONCEPTUAL FUTURE DOMAIN',stableId:'OrderId O-17',changedId:'PaymentAttemptId P-101 → P-102',
  authority:'The relevant provider confirms each provider operation; app may own attempt creation.',
  presentation:'Pending or unknown until the correct attempt/provider operation is verified.',
  meaning:'The second attempt is not a second Order. Provider operation IDs must be correlated to the correct attempt; authorization is not capture.',
  limitation:'PaymentAttemptId and provider calls do not exist in the Java application.',
  steps:[step('Order identity','O-17','One continuing order','Platform for intake'),
   step('First attempt','P-101','ProviderA/OP-501 result unknown','Future provider'),
   step('Second attempt','P-102','ProviderA/OP-509 may be authorized, not captured','Future provider')]
 };
 case 'same-name':return{
  scenario:id,expected:'separate-merchants',heading:'A shared name is not proof of a shared merchant identity',
  evidence:'CONCEPTUAL FUTURE DOMAIN',stableId:'RestaurantId R-17 and R-62',changedId:'Same label: Cedar Kitchen',
  authority:'An approved merchant registry and scoped partner mapping',
  presentation:'Show separately resolved merchant/branch identity; do not merge by display name.',
  meaning:'A join on a name can attach acceptance or price to the wrong legal or operational merchant. Namespace and mapping evidence matter.',
  limitation:'There is only one fictional restaurant in the current Java catalog; second merchant is conceptual.',
  steps:[step('Merchant A','R-17','PartnerX/M-07; name Cedar Kitchen','Approved identity mapping'),
   step('Merchant B','R-62','PartnerX/M-28; same name','Approved identity mapping'),
   step('No alias','R-17 ≠ R-62','A display name does not establish identity equality','Mapping policy')]
 };
 case 'repeat-callback':return{
  scenario:id,expected:'one-operation',heading:'Repeated callback delivery does not imply repeated financial effect',
  evidence:'CONCEPTUAL FUTURE DOMAIN',stableId:'ProviderA/OP-501',changedId:'Delivery attempts D-1 and D-2',
  authority:'Provider operation evidence, not callback delivery count',
  presentation:'Do not display two payments based only on two observations.',
  meaning:'Two messages can both describe one operation. The real provider operation, event reference and authentication must be examined.',
  limitation:'No provider callback endpoint or deduplication logic exists in the Java application.',
  steps:[step('Provider operation','OP-501','One operation identity under Provider A','Provider authority'),
   step('First delivery','D-1','Callback describes OP-501','Platform observation'),
   step('Redelivery','D-2','Same operation, not a new charge','Platform observation')]
 };
 case 'stale-projection':return{
  scenario:id,expected:'not-confirmed',heading:'A green Paid label is not provider capture evidence',
  evidence:'CONCEPTUAL FUTURE DOMAIN',stableId:'OrderId O-17 / attempt P-101',changedId:'UI says Paid; provider capture unconfirmed',
  authority:'Authenticated provider result for the exact provider operation',
  presentation:'Payment status being confirmed; not Payment completed.',
  meaning:'Projection freshness, operation identity and authority are distinct. Authorization or an optimistic client state cannot prove capture.',
  limitation:'The current Java intake always reports paymentStatus NOT_STARTED; future payment projection is illustrative.',
  steps:[step('External source','ProviderA/OP-501','Authorized, capture not established','Provider evidence'),
   step('Local projection','O-17/P-101','UI may be stale or mis-correlated','Read model, derived'),
   step('Truthful UI','O-17','Do not assert successful capture','Presentation only')]
 };
 case 'duplicate-id':return{
  scenario:id,expected:'create-rejected',heading:'Local create-only repository protects the existing OrderId',
  evidence:'IMPLEMENTED LOCAL JAVA CONTRACT',stableId:'OrderId O-17',changedId:'Attempted replacement of O-17 with new amount',
  authority:'InMemoryOrderRepository keyed by typed OrderId (within one process)',
  presentation:'Existing original Order snapshot remains; duplicate-create error.',
  meaning:'Atomic putIfAbsent refuses silent overwrites for an exact existing identity. It is not a versioned update or an idempotency protocol.',
  limitation:'The Java concurrency test proves only an in-process same-key create; no durable DB or authorized order updates exist.',
  steps:[step('First create','O-17','Original immutable intake stored','Local repository'),
   step('Second create','O-17','putIfAbsent detects occupied identity','Local repository'),
   step('After rejection','O-17','Original snapshot is retained','Local process state')]
 };
 case 'duplicate-post':return{
  scenario:id,expected:'two-orders',heading:'Two eligible POSTs create distinct intake identities',
  evidence:'IMPLEMENTED LOCAL JAVA CONTRACT',stableId:'CustomerId C-1 / RestaurantId R-17',changedId:'OrderId O-1 then new O-2',
  authority:'PlaceOrderService generates OrderId for each eligible create',
  presentation:'Two 201 replies are possible; this does not prove merchant or payment completion.',
  meaning:'The API is currently non-idempotent. A repeated identical payload is not mapped back to the existing entity.',
  limitation:'Safe retry semantics would require a separate enforced operation key and storage protocol; not implemented.',
  steps:[step('First request','O-1','New OrderId generated; local intake recorded','Platform'),
   step('Repeated request','O-2','Another new OrderId generated under same input','Platform'),
   step('Compare','O-1 ≠ O-2','No duplicate-key overwrite occurred','Create-only repository')]
 };
 }
}
