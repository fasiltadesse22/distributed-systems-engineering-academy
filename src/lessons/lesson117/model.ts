/** Deterministic READ-ONLY educational mirror of Java Lesson 1.1.7 guards.
 * No source authentication, commit, merchant or kitchen integration exists. */
export type MerchantState='PENDING'|'ACCEPTED'|'REJECTED';
export type MerchantAction='ACCEPT'|'REJECT';
export type MerchantRole='CUSTOMER'|'PLATFORM'|'MERCHANT_OPERATOR';
export type TeachingPolicy='UNRESOLVED'|'EDUCATIONAL_ONE_SHOT';
export type PrepStage='NOT_STARTED'|'PREPARING'|'READY';
export type PrepAction='START_PREPARING'|'COMPLETE_PREPARATION';
export type PrepActor='CUSTOMER'|'PLATFORM'|'KITCHEN_OPERATOR';
export type Guard={code:string;passed:boolean;explanation:string};
export type Decision={before:string;next:string;accepted:boolean;guards:Guard[];reason:string;candidateFact:string|null;authorityNotice:string};
export interface MerchantInput {
  state:MerchantState;action:MerchantAction;expectedState:MerchantState;
  requestOrderMatches:boolean;requestRestaurantMatches:boolean;actorRestaurantMatches:boolean;
  role:MerchantRole;technicallyAuthenticatedAssumed:boolean;businessAuthorizedAssumed:boolean;
  basketTermsMatchAssumed:boolean;sourceEvidenceAssumed:boolean;policy:TeachingPolicy;
}
export interface PreparationInput {
  stage:PrepStage;action:PrepAction;merchantState:MerchantState;
  orderMatches:boolean;actor:PrepActor;merchantEvidenceAssumed:boolean;policyAssumed:boolean;
}
const g=(code:string,passed:boolean,explanation:string):Guard=>({code,passed,explanation});
export const merchantDefault:MerchantInput={
 state:'PENDING',action:'ACCEPT',expectedState:'PENDING',requestOrderMatches:true,
 requestRestaurantMatches:true,actorRestaurantMatches:true,role:'MERCHANT_OPERATOR',
 technicallyAuthenticatedAssumed:true,businessAuthorizedAssumed:true,
 basketTermsMatchAssumed:true,sourceEvidenceAssumed:true,policy:'EDUCATIONAL_ONE_SHOT'
};
export const preparationDefault:PreparationInput={
 stage:'NOT_STARTED',action:'START_PREPARING',merchantState:'ACCEPTED',orderMatches:true,
 actor:'KITCHEN_OPERATOR',merchantEvidenceAssumed:true,policyAssumed:true
};
export function evaluateMerchant(input:MerchantInput):Decision{
 const checks:Guard[]=[
  g('IDENTITY_ORDER',input.requestOrderMatches,'Request must reference the identical OrderId'),
  g('IDENTITY_RESTAURANT',input.requestRestaurantMatches,"Request must reference the decision's RestaurantId"),
  g('ACTOR_ROLE',input.role==='MERCHANT_OPERATOR','Only an illustrative merchant operator role may propose merchant decisions'),
  g('ACTOR_SCOPE',input.actorRestaurantMatches,"Actor's asserted merchant identity must match the decision owner"),
  g('AUTHENTICATED_ASSUMED',input.technicallyAuthenticatedAssumed,'An identity claim alone is not technical authentication'),
  g('BUSINESS_AUTHORITY_ASSUMED',input.businessAuthorizedAssumed,'Authentication does not grant merchant decision authority'),
  g('EXPECTED_STATE',input.state===input.expectedState,'Locally observed expected state must match; this is not compare-and-swap'),
  g('STATE_PENDING',input.state==='PENDING','The illustrative one-shot decision can be made only from PENDING'),
  g('BASKET_TERMS_ASSUMED',input.basketTermsMatchAssumed,'An acceptance/rejection must concern the identical offered basket/price terms'),
  g('MERCHANT_EVIDENCE_ASSUMED',input.sourceEvidenceAssumed,'Real merchant evidence is unavailable; a classroom assumption is required'),
  g('POL_02_EDUCATIONAL_ONLY',input.policy==='EDUCATIONAL_ONE_SHOT','POL-02 is UNRESOLVED; only explicit classroom policy permits simulation')
 ];
 const failed=checks.find(x=>!x.passed);
 return failed?{
  before:input.state,next:input.state,accepted:false,guards:checks,
  reason:failed.code+': '+failed.explanation,candidateFact:null,
  authorityNotice:'No state write, real merchant decision or business fact is produced'
 }:{
  before:input.state,next:input.action==='ACCEPT'?'ACCEPTED':'REJECTED',
  accepted:true,guards:checks,reason:'Eligible for an ILLUSTRATIVE one-shot merchant transition only; NO COMMIT',
  candidateFact:'CandidateIllustrativeRestaurant'+(input.action==='ACCEPT'?'Accepted':'Rejected'),
  authorityNotice:'Pure candidate only; neither merchant authentication nor persistence executed'
 };
}
export function evaluatePreparation(input:PreparationInput):Decision{
 const expected=input.action==='START_PREPARING'?'NOT_STARTED':'PREPARING';
 const checks:Guard[]=[
  g('ORDER_MATCH',input.orderMatches,"Kitchen milestone must refer to this merchant decision's OrderId"),
  g('KITCHEN_AUTHORITY',input.actor==='KITCHEN_OPERATOR','Only an illustrative kitchen operator may propose work progress'),
  g('MERCHANT_ACCEPTED',input.merchantState==='ACCEPTED','Restaurant must have accepted before preparation may proceed in this illustrative policy'),
  g('MERCHANT_EVIDENCE_ASSUMED',input.merchantEvidenceAssumed,'A modelled ACCEPTED state is not proof of real merchant acceptance'),
  g('CURRENT_STAGE',input.stage===expected,'Required current preparation stage is '+expected),
  g('POL_04_EDUCATIONAL_ONLY',input.policyAssumed,'Preparation timing and compensation POL-04 are unresolved')
 ];
 const failed=checks.find(x=>!x.passed);
 return failed?{
  before:input.stage,next:input.stage,accepted:false,guards:checks,
  reason:failed.code+': '+failed.explanation,candidateFact:null,
  authorityNotice:'No kitchen state write or external preparation fact is established'
 }:{
  before:input.stage,next:input.action==='START_PREPARING'?'PREPARING':'READY',
  accepted:true,guards:checks,reason:'Only an eligible classroom probe; NO kitchen command, state write or success fact',
  candidateFact:input.action==='START_PREPARING'?'CandidateIllustrativePreparationStarted':'CandidateIllustrativePreparationCompleted',
  authorityNotice:'Structural eligibility under assumptions only; physical preparation has not occurred'
 };
}
export const merchantMatrix:{state:MerchantState;action:MerchantAction;eligibleUnderAssumptions:boolean}[]=
 (['PENDING','ACCEPTED','REJECTED'] as MerchantState[]).flatMap(state=>
  (['ACCEPT','REJECT'] as MerchantAction[]).map(action=>({state,action,eligibleUnderAssumptions:state==='PENDING'})));
export const preparationMatrix:{stage:PrepStage;action:PrepAction;eligibleUnderAssumptions:boolean}[]=
 (['NOT_STARTED','PREPARING','READY'] as PrepStage[]).flatMap(stage=>
  (['START_PREPARING','COMPLETE_PREPARATION'] as PrepAction[]).map(action=>({
   stage,action,eligibleUnderAssumptions:
    action==='START_PREPARING'?stage==='NOT_STARTED':stage==='PREPARING'
  })));
export type Prediction='eligible'|'rejected';
export const casebook=[
 {id:'merchant-happy',label:'Correct merchant ACCEPT from PENDING',mode:'merchant' as const,
  merchant:{...merchantDefault},answer:'eligible' as Prediction,teaching:'All eleven classroom assumptions pass. The result is only an illustrative candidate.'},
 {id:'already-rejected',label:'Attempt ACCEPT after merchant REJECTED',mode:'merchant' as const,
  merchant:{...merchantDefault,state:'REJECTED' as MerchantState,expectedState:'REJECTED' as MerchantState},
  answer:'rejected' as Prediction,teaching:'STATE_PENDING rejects the second decision even with a matching expected state.'},
 {id:'customer-accepts',label:'Customer tries to accept for restaurant',mode:'merchant' as const,
  merchant:{...merchantDefault,role:'CUSTOMER' as MerchantRole},
  answer:'rejected' as Prediction,teaching:'ACTOR_ROLE fails. Valid syntax and correct OrderId do not grant authority.'},
 {id:'stale-expected',label:'Merchant has REJECTED; caller still expects PENDING',mode:'merchant' as const,
  merchant:{...merchantDefault,state:'REJECTED' as MerchantState},
  answer:'rejected' as Prediction,teaching:'EXPECTED_STATE and STATE_PENDING fail; no atomic version check is performed.'},
 {id:'policy-unknown',label:'Policy POL-02 remains unresolved',mode:'merchant' as const,
  merchant:{...merchantDefault,policy:'UNRESOLVED' as TeachingPolicy},
  answer:'rejected' as Prediction,teaching:'Educational eligibility cannot be inferred from unapproved business policy.'},
 {id:'prep-before-accept',label:'Kitchen starts while restaurant PENDING',mode:'preparation' as const,
  preparation:{...preparationDefault,merchantState:'PENDING' as MerchantState},
  answer:'rejected' as Prediction,teaching:'MERCHANT_ACCEPTED fails; no preparation begins.'},
 {id:'complete-before-start',label:'Kitchen completes at NOT_STARTED',mode:'preparation' as const,
  preparation:{...preparationDefault,action:'COMPLETE_PREPARATION' as PrepAction},
  answer:'rejected' as Prediction,teaching:'CURRENT_STAGE fails even with a merchant acceptance assumption.'},
 {id:'prep-happy',label:'Hypothetical kitchen start after acceptance',mode:'preparation' as const,
  preparation:{...preparationDefault},answer:'eligible' as Prediction,
  teaching:'Local structure permits a candidate; no real kitchen effect is executed.'}
];
export type CasebookCase=typeof casebook[number];
export function evaluateCase(entry:CasebookCase):Decision{
 return entry.mode==='merchant'?evaluateMerchant(entry.merchant??merchantDefault):evaluatePreparation(entry.preparation??preparationDefault);
}
