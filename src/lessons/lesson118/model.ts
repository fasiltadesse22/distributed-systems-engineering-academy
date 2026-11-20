/** Lesson 1.1.8: deterministic conceptual classifier, not Java or provider execution. */
export type ScenarioId='draft'|'local-write'|'capture'|'kitchen'|'notification'|'refund-timeout';
export type Branch='reverse'|'compensate'|'reconcile'|'escalate';
export interface HistoryFact {identity:string;source:string;statement:string;certainty:'hypothetical-confirmed'|'unknown'|'candidate';}
export interface TeachingCase {
 id:ScenarioId;label:string;owner:string;question:string;
 original:HistoryFact[];exampleRemedy:string;explanation:string;
}
export interface Classification {
 branch:Branch;headline:string;reason:string;original:HistoryFact[];
 proposed:HistoryFact[];remaining:string[];warning:string;
}
const fact=(identity:string,source:string,statement:string,certainty:HistoryFact['certainty']='hypothetical-confirmed'):HistoryFact=>({identity,source,statement,certainty});
export const cases:TeachingCase[]=[
 {id:'draft',label:'Abandon an uncommitted draft',owner:'Customer UI only',
  question:'A draft has never been submitted or written. Can it be discarded?',
  original:[],exampleRemedy:'Discard draft fields',
  explanation:'With no committed business or external effect in this assumed example, there is nothing to compensate.'},
 {id:'local-write',label:'Roll back uncommitted local write',owner:'One local transaction',
  question:'A database-only write has not committed, and no external call occurred.',
  original:[],exampleRemedy:'Roll back the local transaction',
  explanation:'An uncommitted local write can be rolled back only inside its proven local transaction boundary.'},
 {id:'capture',label:'Captured payment, merchant rejected',owner:'External payment provider',
  question:'Assume a charge exists and the restaurant rejected. What must the app preserve?',
  original:[fact('C-81','provider','Capture 800: original historical charge'),fact('M-6','merchant','Restaurant rejected order')],
  exampleRemedy:'Separate provider refund F-19, only if policy approves',
  explanation:'A captured payment cannot be deleted by changing a local status. A refund is a distinct operation with independent confirmation.'},
 {id:'kitchen',label:'Ingredients consumed before cancellation',owner:'Merchant kitchen',
  question:'Assume work began and ingredients were consumed before cancellation.',
  original:[fact('K-11','merchant kitchen','Preparation consumed ingredients')],
  exampleRemedy:'Contractual reimbursement / exception decision',
  explanation:'Physical work cannot be unperformed. Any compensation or loss allocation depends on approved POL-03/04.'},
 {id:'notification',label:'Acceptance notification already delivered',owner:'Notification channel / recipient',
  question:'Assume an incorrect acceptance message was delivered.',
  original:[fact('N-4','notification channel','Acceptance message delivered')],
  exampleRemedy:'Send corrective communication',
  explanation:'Deleting the app notification row cannot unsend a delivered message or erase recipient reliance.'},
 {id:'refund-timeout',label:'Refund submission timed out',owner:'External payment provider',
  question:'A refund request was submitted, but the result was not observed.',
  original:[fact('F-19','provider','Refund final outcome unobserved','unknown')],
  exampleRemedy:'Reconcile F-19 identity and status with provider',
  explanation:'Lost response proves neither success nor failure. Blind reissue may duplicate compensation.'}
];
export const exampleCases:ScenarioId[]=cases.map(c=>c.id);
export const labels:Record<Branch,string>={
 reverse:'Local reversal / discard',compensate:'Propose separate compensation',
 reconcile:'Reconcile authoritative source',escalate:'Escalate for policy or human review'
};
/** All "confirmed" records are hypothetical facts supplied to a classroom case, never runtime proof. */
export function classify(id:ScenarioId,sourceEvidence:boolean,approvedRemedy:boolean):Classification{
 const item=cases.find(c=>c.id===id);
 if(!item)throw new Error('Unknown conceptual scenario '+id);
 const warning='CLASSROOM ONLY: no real merchant, payment, kitchen or notification effect. POL-01–POL-10 unresolved in the platform.';
 const original=item.original.map(x=>(sourceEvidence||x.certainty==='unknown')?x:{...x,certainty:'unknown' as const,statement:'Source not confirmed: '+x.statement});
 if(id==='draft'||id==='local-write')return {
  branch:'reverse',headline:labels.reverse,reason:item.explanation,
  original:[],proposed:[fact('LOCAL','Classroom','Proposed: '+item.exampleRemedy,'candidate')],
  remaining:['Verify that no external effect occurred before applying the real inverse.'],warning
 };
 if(id==='refund-timeout'||!sourceEvidence)return{
  branch:'reconcile',headline:labels.reconcile,
  reason:'The effect is unknown at its authority boundary. '+item.explanation,
  original,proposed:[fact('QUERY','Classroom','Proposed: source-specific status lookup, not duplicate action','candidate')],
  remaining:['Resolve source outcome and operation identity before any retry.'],warning
 };
 if(!approvedRemedy)return{
  branch:'escalate',headline:labels.escalate,
  reason:'An effect is assumed source-confirmed, but business authorization to remediate is not approved. '+item.explanation,
  original,proposed:[],remaining:['Policy owner must approve entitlement, amount, method and evidence requirements.','Never erase the original effect.'],warning
 };
 return{
  branch:'compensate',headline:labels.compensate,
  reason:'The original remains true. Under an EXPLICIT teaching assumption of approved policy, the next step is a new candidate remedy — NOT a completed external effect. '+item.explanation,
  original,proposed:[fact('REMEDY-CANDIDATE','Classroom','Proposed: '+item.exampleRemedy,'candidate')],
  remaining:['Actual authoritative execution and outcome not performed or verified.','Any partial or failed remedy leaves a residual obligation.'],warning
 };
}
export const predictions:{id:ScenarioId;approved:boolean;sourceEvidence:boolean;answer:Branch;teaching:string}[]=[
 {id:'draft',approved:false,sourceEvidence:false,answer:'reverse',teaching:'No committed effect: discard draft, not refund.'},
 {id:'local-write',approved:false,sourceEvidence:false,answer:'reverse',teaching:'Local rollback is bounded by the actual transaction; external calls excluded.'},
 {id:'capture',approved:true,sourceEvidence:true,answer:'compensate',teaching:'Capture remains true; only candidate separate refund under assumed policy.'},
 {id:'kitchen',approved:false,sourceEvidence:true,answer:'escalate',teaching:'Consumed ingredients remain consumed; POL-03/04 unresolved.'},
 {id:'notification',approved:true,sourceEvidence:true,answer:'compensate',teaching:'A correction is a new communication, never an unsend.'},
 {id:'refund-timeout',approved:true,sourceEvidence:false,answer:'reconcile',teaching:'Timeout does not prove refund failed or succeeded; reconcile F-19.'},
 {id:'capture',approved:true,sourceEvidence:false,answer:'reconcile',teaching:'Unconfirmed capture requires provider source lookup before refund decision.'},
 {id:'capture',approved:false,sourceEvidence:true,answer:'escalate',teaching:'Even known capture cannot authorize an unapproved financial remedy.'}
];
