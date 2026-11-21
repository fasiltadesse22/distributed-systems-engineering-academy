/** Lesson 1.1.9 — independent lifecycle composition. React classroom state, not Java execution. */
export type Merchant='PENDING'|'ACCEPTED'|'REJECTED';
export type Payment='NOT_STARTED'|'SUBMITTED_UNKNOWN'|'CAPTURED'|'DECLINED'|'REFUND_PENDING'|'REFUNDED';
export type Kitchen='NOT_STARTED'|'PREPARING'|'READY';
export type Journey='ACTIVE'|'CANCELLATION_REQUESTED'|'CANCELLED_SIMULATED'|'COMPLETED_SIMULATED';
export type Policy='UNRESOLVED'|'PAYMENT_FIRST'|'MERCHANT_FIRST'|'EITHER_FOR_EXPERIMENT';
export type Window='UNRESOLVED'|'BEFORE_ACCEPTANCE'|'BEFORE_PREPARATION';
export type Action='SUBMIT_PAYMENT'|'OBSERVE_CAPTURE'|'OBSERVE_DECLINE'|'OBSERVE_UNKNOWN'|
 'MERCHANT_ACCEPT'|'MERCHANT_REJECT'|'REQUEST_CANCELLATION'|'APPROVE_CANCELLATION'|'DENY_CANCELLATION'|
 'START_PREPARATION'|'FINISH_PREPARATION'|'REQUEST_REFUND'|'OBSERVE_REFUND'|'REFUND_LOST'|'COMPLETE_JOURNEY';
export interface State {merchant:Merchant;payment:Payment;kitchen:Kitchen;journey:Journey;history:string[]}
export interface Assumptions {paymentSequence:Policy;cancelWindow:Window;refundApproved:boolean;captureBeforePreparation:boolean}
export interface Step {action:Action;intent:string}
export interface Decision {accepted:boolean;before:State;next:State;guard:string;observation:string|null;assumed:boolean}
export const initial=():State=>({merchant:'PENDING',payment:'NOT_STARTED',kitchen:'NOT_STARTED',journey:'ACTIVE',history:[]});
export const unresolved:Assumptions={paymentSequence:'UNRESOLVED',cancelWindow:'UNRESOLVED',refundApproved:false,captureBeforePreparation:true};
export const either:Assumptions={paymentSequence:'EITHER_FOR_EXPERIMENT',cancelWindow:'BEFORE_PREPARATION',refundApproved:true,captureBeforePreparation:true};
export function decide(s:State,a:Action,p:Assumptions):Decision {
 const denied=(guard:string):Decision=>({accepted:false,before:s,next:s,guard,observation:null,assumed:true});
 const accepted=(patch:Partial<State>,event:string):Decision=>{
  const next:State={...s,...patch,history:[...s.history,event]};
  return {accepted:true,before:s,next,guard:'ALL CLASSROOM GUARDS PASSED',observation:event,assumed:true};
 };
 if(s.journey==='COMPLETED_SIMULATED'||s.journey==='CANCELLED_SIMULATED'){
  if(a!=='REQUEST_REFUND'&&a!=='OBSERVE_REFUND'&&a!=='REFUND_LOST')return denied('TERMINAL_JOURNEY');
 }
 switch(a){
  case 'SUBMIT_PAYMENT':
   if(s.journey!=='ACTIVE')return denied('CANCEL_RACE');
   if(p.paymentSequence==='UNRESOLVED')return denied('POL_01_UNRESOLVED');
   if(p.paymentSequence==='MERCHANT_FIRST'&&s.merchant!=='ACCEPTED')return denied('SEQUENCE');
   if(s.payment!=='NOT_STARTED')return denied('PAYMENT_STATE');
   return accepted({payment:'SUBMITTED_UNKNOWN'},'SimulatedPaymentSubmittedUnknown');
  case 'OBSERVE_CAPTURE':case 'OBSERVE_DECLINE':case 'OBSERVE_UNKNOWN':
   if(s.payment!=='SUBMITTED_UNKNOWN')return denied('PAYMENT_STATE');
   if(a==='OBSERVE_UNKNOWN')return accepted({},'SimulatedCaptureResponseLostUnknown');
   return accepted({payment:a==='OBSERVE_CAPTURE'?'CAPTURED':'DECLINED'},
     a==='OBSERVE_CAPTURE'?'SimulatedCaptureConfirmedNotReal':'SimulatedPaymentDeclinedNotReal');
  case 'MERCHANT_ACCEPT':case 'MERCHANT_REJECT':
   if(s.journey!=='ACTIVE')return denied('CANCEL_RACE');
   if(p.paymentSequence==='UNRESOLVED')return denied('POL_01_UNRESOLVED');
   if(a==='MERCHANT_ACCEPT'&&p.paymentSequence==='PAYMENT_FIRST'&&s.payment!=='CAPTURED')return denied('SEQUENCE');
   if(s.merchant!=='PENDING')return denied('MERCHANT_STATE');
   return accepted({merchant:a==='MERCHANT_ACCEPT'?'ACCEPTED':'REJECTED'},
    a==='MERCHANT_ACCEPT'?'SimulatedMerchantAcceptedNotReal':'SimulatedMerchantRejectedNotReal');
  case 'REQUEST_CANCELLATION':
   if(s.journey!=='ACTIVE')return denied('CANCELLATION_STATE');
   return accepted({journey:'CANCELLATION_REQUESTED'},'SimulatedCancellationRequestedNotApproved');
  case 'APPROVE_CANCELLATION':
   if(s.journey!=='CANCELLATION_REQUESTED')return denied('CANCELLATION_STATE');
   if(p.cancelWindow==='UNRESOLVED')return denied('POL_03_UNRESOLVED');
   if(p.cancelWindow==='BEFORE_ACCEPTANCE'&&s.merchant==='ACCEPTED')return denied('POL_03_CUTOFF');
   if(p.cancelWindow==='BEFORE_PREPARATION'&&s.kitchen!=='NOT_STARTED')return denied('POL_04_CUTOFF');
   return accepted({journey:'CANCELLED_SIMULATED'},'SimulatedCancellationApprovedNotReal');
  case 'DENY_CANCELLATION':
   if(s.journey!=='CANCELLATION_REQUESTED')return denied('CANCELLATION_STATE');
   return accepted({journey:'ACTIVE'},'SimulatedCancellationDeniedNotReal');
  case 'START_PREPARATION':case 'FINISH_PREPARATION':
   if(s.journey!=='ACTIVE')return denied('CANCEL_RACE');
   if(p.captureBeforePreparation&&s.payment!=='CAPTURED')return denied('CAPTURE_BEFORE_PREP');
   if(s.merchant!=='ACCEPTED'||s.kitchen!==(a==='START_PREPARATION'?'NOT_STARTED':'PREPARING'))
     return denied('PREPARATION_GUARD');
   return accepted({kitchen:a==='START_PREPARATION'?'PREPARING':'READY'},
     a==='START_PREPARATION'?'SimulatedKitchenWorkStartedNotReal':'SimulatedKitchenReadyNotReal');
  case 'REQUEST_REFUND':
   if(!p.refundApproved)return denied('POL_05_UNRESOLVED');
   if(s.merchant!=='REJECTED'&&s.journey!=='CANCELLED_SIMULATED')return denied('NO_REMEDIATION_CAUSE');
   if(s.payment!=='CAPTURED')return denied('PAYMENT_STATE');
   return accepted({payment:'REFUND_PENDING'},'SimulatedRefundRequestedNotCompleted');
  case 'OBSERVE_REFUND':case 'REFUND_LOST':
   if(s.payment!=='REFUND_PENDING')return denied('REFUND_STATE');
   if(a==='REFUND_LOST')return accepted({},'SimulatedRefundResponseLostUnknown');
   return accepted({payment:'REFUNDED'},'SimulatedRefundConfirmedNotBankSettlement');
  case 'COMPLETE_JOURNEY':
   if(s.journey!=='ACTIVE'||s.merchant!=='ACCEPTED'||s.payment!=='CAPTURED'||s.kitchen!=='READY')
     return denied('COMPLETION_GUARD');
   return accepted({journey:'COMPLETED_SIMULATED'},'SimulatedJourneyCompleteNotDelivered');
 }
}
export const financialExposure=(s:State)=>
 (s.merchant==='REJECTED'||s.journey==='CANCELLED_SIMULATED')
 &&(s.payment==='CAPTURED'||s.payment==='REFUND_PENDING');
export interface Casebook {id:string;name:string;purpose:string;policy:Assumptions;steps:Step[];expected:string}
const steps=(...pairs:[Action,string][]):Step[]=>pairs.map(([action,intent])=>({action,intent}));
export const casebook:Casebook[]=[
 {id:'accepted-unpaid',name:'Accepted but unpaid',purpose:'Merchant-first acceptance is independent from payment and order intake',
  policy:{...either,paymentSequence:'MERCHANT_FIRST'},steps:steps(['MERCHANT_ACCEPT','Assume merchant acceptance before submitting payment']),
  expected:'Merchant ACCEPTED; payment NOT_STARTED; order intake unchanged'},
 {id:'rejected-paid',name:'Rejected but captured',purpose:'Keep a captured attempt and rejected merchant state simultaneously; track refund uncertainty',
  policy:either,steps:steps(
   ['SUBMIT_PAYMENT','Record a simulated payment submission'],
   ['OBSERVE_CAPTURE','Observe local simulated capture'],
   ['MERCHANT_REJECT','Record a hypothetical merchant rejection'],
   ['REQUEST_REFUND','Request a hypothetical refund after approved teaching policy'],
   ['REFUND_LOST','Lose the simulated refund response'],
   ['OBSERVE_REFUND','Observe a later simulator-only refund confirmation']),
  expected:'Both rejection and capture remain in the local history; refund outcome separate'},
 {id:'payment-after-cancel',name:'Payment after cancellation request',purpose:'A cancellation request blocks a *new* payment in this local teaching hypothesis',
  policy:either,steps:steps(
   ['REQUEST_CANCELLATION','Record customer intent without approval'],
   ['SUBMIT_PAYMENT','Try to initiate payment while cancellation pending'],
   ['APPROVE_CANCELLATION','Hypothetically approve under a selected cutoff']),
  expected:'Payment submission rejected, original attempt NOT_STARTED'},
 {id:'kitchen-race',name:'Kitchen and cancellation race',purpose:'Preparation start changes cancellation eligibility without erasing money',
  policy:either,steps:steps(
   ['SUBMIT_PAYMENT','Submit simulated payment'],['OBSERVE_CAPTURE','Simulator observes capture'],
   ['MERCHANT_ACCEPT','Assume merchant acceptance'],['START_PREPARATION','Assume kitchen started work'],
   ['REQUEST_CANCELLATION','Customer requests cancellation'],
   ['APPROVE_CANCELLATION','Try to approve after work start'],
   ['DENY_CANCELLATION','Record an illustrative denial']),
  expected:'POL_04_CUTOFF rejects automatic cancellation; kitchen PREPARING remains true'},
 {id:'capture-unknown',name:'Unknown provider outcome',purpose:'Response loss is not proof of successful or failed capture',
  policy:either,steps:steps(
   ['SUBMIT_PAYMENT','Send simulated payment submission'],
   ['OBSERVE_UNKNOWN','Lose local simulator response'],
   ['MERCHANT_REJECT','Merchant rejects while provider response unknown'],
   ['REQUEST_REFUND','Try refund without a confirmed capture']),
  expected:'Payment SUBMITTED_UNKNOWN; refund request rejected'},
 {id:'happy',name:'Full teaching happy path',purpose:'Four separate guards must be satisfied; completion still does not prove delivery',
  policy:either,steps:steps(
   ['SUBMIT_PAYMENT','Submit payment'],['OBSERVE_CAPTURE','Observe local simulated capture'],
   ['MERCHANT_ACCEPT','Assume merchant decision'],['START_PREPARATION','Assume kitchen starts'],
   ['FINISH_PREPARATION','Assume kitchen ready'],['COMPLETE_JOURNEY','Simulated completion, not delivery']),
  expected:'COMPLETED_SIMULATED is an educational milestone, not courier receipt'},
 {id:'policy-unresolved',name:'Policy unresolved: fail closed',purpose:'Do not turn a teaching choice into accepted commercial policy',
  policy:unresolved,steps:steps(
   ['MERCHANT_ACCEPT','Attempt to assume merchant acceptance without sequencing policy'],
   ['SUBMIT_PAYMENT','Try payment without POL-01 hypothesis'],
   ['REQUEST_CANCELLATION','Customer may still request consideration'],
   ['APPROVE_CANCELLATION','Try approval with POL-03 unresolved']),
  expected:'Unresolved policy blocks simulated approvals; request is not acceptance'}
];
export function trace(c:Casebook){const states:{step:Step|null;decision:Decision|null;state:State}[]=[{step:null,decision:null,state:initial()}];
 for(const step of c.steps){const before=states[states.length-1].state,d=decide(before,step.action,c.policy);states.push({step,decision:d,state:d.next});}
 return states;
}
export const questions:{id:string;caseId:string;stepIndex:number;answers:string[];correct:string;why:string}[]=[
 {id:'accepted',caseId:'accepted-unpaid',stepIndex:1,answers:['Merchant accepted, payment NOT_STARTED','Payment captured and ready','Rejected because every policy is payment-first'],correct:'Merchant accepted, payment NOT_STARTED',why:'The merchant-first teaching policy allows a hypothetical merchant acceptance without payment.'},
 {id:'paid-reject',caseId:'rejected-paid',stepIndex:3,answers:['Reset payment to NOT_STARTED','Merchant REJECTED, payment CAPTURED','Automatically mark refund completed'],correct:'Merchant REJECTED, payment CAPTURED',why:'Independent facts coexist; compensating operations need separate approval and evidence.'},
 {id:'refund-lost',caseId:'rejected-paid',stepIndex:5,answers:['REFUNDED','REFUND_PENDING','NOT_STARTED'],correct:'REFUND_PENDING',why:'Lost response is not a confirmed refund. History remains intact.'},
 {id:'cancel',caseId:'payment-after-cancel',stepIndex:2,answers:['New payment submission blocked','Merchant automatically rejects','Provider captured actual money'],correct:'New payment submission blocked',why:'The active teaching session refuses a NEW submission while cancellation request remains pending.'},
 {id:'kitchen',caseId:'kitchen-race',stepIndex:6,answers:['Kitchen resources restored','Cancellation approved','POL_04_CUTOFF, request still pending'],correct:'POL_04_CUTOFF, request still pending',why:'PREPARING blocks automatic approval under the specified hypothetical cutoff.'},
 {id:'unknown',caseId:'capture-unknown',stepIndex:2,answers:['CAPTURED','DECLINED','SUBMITTED_UNKNOWN'],correct:'SUBMITTED_UNKNOWN',why:'A response-loss preset cannot establish the financial result.'},
 {id:'unresolved',caseId:'policy-unresolved',stepIndex:1,answers:['POL_01_UNRESOLVED rejection','Binding acceptance','Payment captured'],correct:'POL_01_UNRESOLVED rejection',why:'No commercial policy was approved; the simulator fails closed.'}
];
