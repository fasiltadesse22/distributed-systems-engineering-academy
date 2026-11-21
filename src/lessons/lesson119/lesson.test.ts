import {describe,it,expect} from 'vitest';
import source from '../../../content/lessons/1.1.9.md?raw';
import {lessonSections} from './Lesson119';
import {casebook,decide,either,financialExposure,initial,questions,trace,unresolved} from './model';
describe('Lesson 1.1.9 canonical coverage and model evidence',()=>{
 it('keeps full 31-topic source with deep causal teaching independent from visual tools',()=>{
  expect(lessonSections).toHaveLength(31);
  expect(source.split(/\s+/).length).toBeGreaterThan(5800);
  for(const term of ['accepted-but-unpaid','rejected-but-paid','POL-01','POL-10','SUBMITTED_UNKNOWN','refund','cancellation','preparation','Java','payment provider','ConcurrentHashMap','merchant','Staff','unknown','hotel'])
   expect(source.toLowerCase()).toContain(term.toLowerCase());
 });
 it('demonstrates independent accepted-but-unpaid and rejected-but-paid partial states',()=>{
  const accepted=trace(casebook.find(c=>c.id==='accepted-unpaid')!).at(-1)!.state;
  expect(accepted.merchant).toBe('ACCEPTED');expect(accepted.payment).toBe('NOT_STARTED');
  const paid=trace(casebook.find(c=>c.id==='rejected-paid')!)[3].state;
  expect(paid.merchant).toBe('REJECTED');expect(paid.payment).toBe('CAPTURED');
  expect(financialExposure(paid)).toBe(true);
 });
 it('blocks policy-unresolved transitions and preserves exact previous object',()=>{
  const s=initial(),d=decide(s,'MERCHANT_ACCEPT',unresolved);
  expect(d.accepted).toBe(false);expect(d.next).toBe(s);expect(d.observation).toBeNull();
  expect(d.guard).toContain('POL_01_UNRESOLVED');
 });
 it('tracks financial obligation throughout simulated refund uncertainty',()=>{
  const t=trace(casebook.find(c=>c.id==='rejected-paid')!);
  expect(t[4].state.payment).toBe('REFUND_PENDING');
  expect(t[5].state.payment).toBe('REFUND_PENDING');
  expect(financialExposure(t[5].state)).toBe(true);
  expect(t[6].state.payment).toBe('REFUNDED');
  expect(financialExposure(t[6].state)).toBe(false);
  expect(t[6].state.history).toContain('SimulatedCaptureConfirmedNotReal');
 });
 it('blocks payment-after-cancellation and prep-start cancellation race without editing history',()=>{
  const cancel=trace(casebook.find(c=>c.id==='payment-after-cancel')!);
  expect(cancel[2].decision?.accepted).toBe(false);expect(cancel[2].state).toBe(cancel[1].state);
  expect(cancel[2].decision?.guard).toBe('CANCEL_RACE');
  const kitchen=trace(casebook.find(c=>c.id==='kitchen-race')!);
  expect(kitchen[6].decision?.guard).toBe('POL_04_CUTOFF');
  expect(kitchen[6].state).toBe(kitchen[5].state);
 });
 it('models response lost without turning unknown into captured or eligible refund',()=>{
  const t=trace(casebook.find(c=>c.id==='capture-unknown')!);
  expect(t[2].state.payment).toBe('SUBMITTED_UNKNOWN');
  expect(t[4].decision?.guard).toBe('PAYMENT_STATE');
  expect(t[4].state.history).toHaveLength(3);
 });
 it('requires all independent guards for simulated completion',()=>{
  const t=trace(casebook.find(c=>c.id==='happy')!);
  expect(t.at(-1)!.state.journey).toBe('COMPLETED_SIMULATED');
  expect(t.at(-1)!.decision?.observation).toContain('NotDelivered');
  expect(decide(initial(),'COMPLETE_JOURNEY',either).next).toEqual(initial());
 });
 it('all seven prediction questions target an existing traced state',()=>{
  expect(questions).toHaveLength(7);expect(casebook).toHaveLength(7);
  for(const q of questions){const s=casebook.find(c=>c.id===q.caseId)!;
   expect(trace(s)[q.stepIndex]?.decision).toBeDefined();
   expect(q.answers).toContain(q.correct);
  }
 });
});
