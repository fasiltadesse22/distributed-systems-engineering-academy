import {describe,it,expect} from 'vitest';
import source from '../../../content/lessons/1.1.5.md?raw';
import {lessonSections} from './Lesson115';
import {cases,evaluateWorkflow} from './model';
import {lessonNavigationTitles} from '../../components/sectionNavigation';
describe('Lesson 1.1.5 manuscript and policy boundaries',()=>{
 it('retains its complete 22-section source and sidebar navigation',()=>{
  expect(lessonSections).toHaveLength(22);
  expect(lessonNavigationTitles['1.1.5']).toHaveLength(lessonSections.length);
  expect(source).toContain('POL-01');
  expect(source).toContain('POL-09');
  expect(source).toContain('PaymentAttemptId');
  expect(source).toContain('OrderRequestRecorded');
  expect(source).toContain('ea17135cdc1974d89d78ce78931bb63cc5e9544e');
 });
 it('has six distinct conceptual branches',()=>{
  expect(cases).toHaveLength(6);
  expect(new Set(cases.map(x=>x.id)).size).toBe(6);
 });
 it('does not turn rejection, preparation, refund submission or lost acknowledgement into success',()=>{
  for(const id of ['paid-rejected','cancel-after-prep','refund-unknown','merchant-accepted-payment-unknown','merchant-rejected-no-payment'] as const){
   expect(evaluateWorkflow(id).expected).toBe('partial');
   expect(evaluateWorkflow(id).customer.toLowerCase()).not.toContain('refund complete');
  }
 });
 it('marks a completed path hypothetical and conditional on delivery proof',()=>{
  expect(evaluateWorkflow('delivered').expected).toBe('complete');
  expect(evaluateWorkflow('delivered').explanation).toContain('hypothetical');
  expect(evaluateWorkflow('delivered').policy).toContain('POL-09');
 });
});
