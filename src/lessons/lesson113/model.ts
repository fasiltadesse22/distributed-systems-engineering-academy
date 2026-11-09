/** Educational deterministic model, NOT an HTTP client or executed Java test.
 * Mirrors the narrow UC-001 semantics at a source-pinned Java checkpoint.
 */
export type ScenarioId='valid'|'unavailable'|'repeat'|'lost-ack'|'write-then-throw';
export type Prediction='recorded'|'rejected'|'duplicate'|'unseen'|'uncertain';
export interface TimelineStep {phase:string;detail:string;authority:string}
export interface ModelOutcome {
 scenario:ScenarioId;
 prediction:Prediction;
 headline:string;
 meaning:string;
 observedIntakes:number;
 returnedSuccessFacts:number;
 clientObservation:string;
 limitation:string;
 steps:TimelineStep[];
}
export const scenarioChoices:{id:ScenarioId;label:string;description:string}[]=[
 {id:'valid',label:'Valid order request',description:'Available fixture item; normal process-local save and 201.'},
 {id:'unavailable',label:'Unavailable menu item',description:'Business rules reject a syntactically valid request.'},
 {id:'repeat',label:'Repeated identical POST',description:'Two requests; no enforced idempotency.'},
 {id:'lost-ack',label:'Response lost after save',description:'Local success, but caller never receives HTTP 201.'},
 {id:'write-then-throw',label:'Adapter wrote, then threw',description:'Injected failure with uncertain returned outcome.'}
];
export const predictionChoices:{id:Prediction;label:string}[]=[
 {id:'recorded',label:'One intake recorded and 201 delivered'},
 {id:'rejected',label:'Business rejection, no intake fact'},
 {id:'duplicate',label:'Two different intake records'},
 {id:'unseen',label:'One intake recorded, acknowledgement unseen'},
 {id:'uncertain',label:'Storage effect may exist, no success result returned'}
];
const step=(phase:string,detail:string,authority:string):TimelineStep=>({phase,detail,authority});
export function simulateCommand(id:ScenarioId):ModelOutcome{
 const receive=step('Intention','The customer submits a PlaceOrder command.','Customer intention, not authenticated authority');
 const evaluate=step('Decision','A single application handler evaluates the synthetic menu guards.','Platform local fixture rules');
 if(id==='unavailable')return{
  scenario:id,prediction:'rejected',headline:'Expected business rejection · ITEM_UNAVAILABLE',
  meaning:'Application recognizes a known negative business outcome; no OrderRequestRecorded success fact is constructed.',
  observedIntakes:0,returnedSuccessFacts:0,clientObservation:'HTTP 422 with ITEM_UNAVAILABLE',
  limitation:'Fixture rejection is not a real merchant refusal.',
  steps:[receive,evaluate,step('Rejection','An unavailable fixture item causes Rejected(code, message).','Local application decision'),
   step('No success fact','Handler does not save an intake or return OrderRequestRecorded.','Local rule-before-write behavior'),
   step('Acknowledgement','Compatibility HTTP path maps rejection to 422.','Platform response')]
 }
 if(id==='repeat')return{
  scenario:id,prediction:'duplicate',headline:'Two requests · two distinct intake identities',
  meaning:'No idempotency protocol exists. Each execution saves a different Order and returns its own local fact.',
  observedIntakes:2,returnedSuccessFacts:2,clientObservation:'Two independent 201 replies (if both delivered)',
  limitation:'These are duplicate intake resources, NOT duplicate merchant acceptances or payments.',
  steps:[receive,evaluate,step('First save','First Order is written to the process-local repository.','Local storage'),
   step('First fact','OrderRequestRecorded refers to first OrderId.','Local fact after normal save'),
   step('Second POST','Identical payload is treated as a new command; new OrderId saved.','No idempotency guarantee'),
   step('Second fact','Another local fact refers to the new OrderId.','Local fact after normal save')]
 }
 if(id==='lost-ack')return{
  scenario:id,prediction:'unseen',headline:'Local fact exists · client has no acknowledgement',
  meaning:'Normal save and fact creation occurred. The server attempts a 201, but the reply does not reach the customer.',
  observedIntakes:1,returnedSuccessFacts:1,clientObservation:'Timeout / no delivered HTTP response',
  limitation:'A timeout cannot prove that the first intent was rejected or safely retried.',
  steps:[receive,evaluate,step('Save','One process-local Order intake is stored.','Local storage'),
   step('Fact','Recorded(Order, OrderRequestRecorded) is returned internally.','Local program observation'),
   step('Lost response','The response is lost before the client sees 201.','Transport observation')]
 }
 if(id==='write-then-throw')return{
  scenario:id,prediction:'uncertain',headline:'A write occurred in the model, but no successful result returned',
  meaning:'The injected adapter writes then throws. The handler propagates an infrastructure error rather than claiming either a business rejection or successful fact.',
  observedIntakes:1,returnedSuccessFacts:0,clientObservation:'Exception / unknown effect',
  limitation:'This models a possible failure window; it does not claim the normal ConcurrentHashMap adapter always behaves this way.',
  steps:[receive,evaluate,step('Attempted save','Failure-injection adapter stores Order then throws.','Simulated storage adapter'),
   step('No returned fact','No Recorded outcome is returned by the handler.','Application exception path'),
   step('Unknown acknowledgement','Caller cannot conclude that the record is absent.','Client perspective')]
 }
 return{
  scenario:'valid',prediction:'recorded',headline:'One local intake recorded · 201 Created',
  meaning:'The business decision permits the fixture order; the storage adapter returns normally; only then does the handler construct OrderRequestRecorded.',
  observedIntakes:1,returnedSuccessFacts:1,clientObservation:'201 Created + Location, PENDING / NOT_STARTED',
  limitation:'Not crash-durable; not merchant acceptance; no payment provider was called.',
  steps:[receive,evaluate,step('Save','A new immutable Order intake is stored locally.','Process-local repository'),
   step('Fact','OrderRequestRecorded is created after normal save return.','Local handler observation'),
   step('Acknowledgement','The HTTP controller returns 201 Created for intake only.','Platform response')]
 }
}
