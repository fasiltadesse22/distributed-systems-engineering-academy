import {describe,it,expect} from 'vitest';
import source from '../../../content/lessons/1.1.6.md?raw';
import {lessonSections} from './Lesson116';
import {lessonNavigationTitles} from '../../components/sectionNavigation';
import {transitions,scenarios,interpretScenario} from './model';

describe('Lesson 1.1.6 scope and source integrity',()=>{
 it('retains 19 independently readable topics with matching sidebar titles',()=>{
  expect(lessonSections).toHaveLength(19);
  expect(lessonNavigationTitles['1.1.6']).toHaveLength(19);
  for(const term of ['OrderLifecycle','RestaurantDecisionLifecycle','PaymentAttemptLifecycle',
  'POL-01','POL-10','state explosion','SUBMITTED_UNKNOWN','REFUND_PENDING',
  'OrderRequestRecorded','hotel booking','34','ea17135cdc1974d89d78ce78931bb63cc5e9544e']){
   expect(source.toLowerCase()).toContain(term.toLowerCase());
  }
 });
 it('distinguishes three owners and never promotes illustrative facts to provider execution',()=>{
  expect(new Set(transitions.map(t=>t.domain))).toEqual(new Set(['order','restaurant','payment']));
  for(const edge of transitions.filter(t=>t.domain!=='order')){
   expect(edge.evidence).not.toBe('IMPLEMENTED LOCAL VIEW');
   if(edge.fact)expect(edge.fact).toMatch(/^Illustrative/);
  }
 });
 it('refuses policy blocked closure and rejected transitions without new facts',()=>{
  const closure=transitions.find(t=>t.action==='CLOSE_UNFULFILLABLE');
  expect(closure?.fact).toBeNull();
  expect(closure?.evidence).toBe('POLICY BLOCKED');
  for(const edge of transitions.filter(t=>t.fact===null)){
   expect(edge.from).toBe(edge.to);
  }
 });
 it('preserves partial completion and unknown results as independent projections',()=>{
  expect(scenarios).toHaveLength(6);
  expect(interpretScenario('authorized-pending').payment).toBe('AUTHORIZED');
  expect(interpretScenario('authorized-pending').merchant).toBe('PENDING');
  expect(interpretScenario('rejected-refund').merchant).toBe('REJECTED');
  expect(interpretScenario('rejected-refund').payment).toBe('REFUND_PENDING');
  expect(interpretScenario('unknown-merchant').prediction).toBe('uncertain');
  expect(interpretScenario('rejected-refund').customer).not.toMatch(/refund complete/i);
  expect(new Set(scenarios.map(s=>s.id)).size).toBe(6);
 });
});
