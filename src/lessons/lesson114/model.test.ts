import {describe,it,expect} from 'vitest';
import {scenarioChoices,predictionChoices,simulateIdentity} from './model';

describe('Lesson 1.1.4 identity and authority teaching model',()=>{
 it('offers seven deterministic scenarios and mutually exclusive predictions',()=>{
  expect(scenarioChoices).toHaveLength(7);
  expect(predictionChoices).toHaveLength(7);
  expect(new Set(scenarioChoices.map(x=>x.id)).size).toBe(7);
  for(const scenario of scenarioChoices){
   const first=simulateIdentity(scenario.id);
   expect(simulateIdentity(scenario.id)).toEqual(first);
   expect(first.steps.length).toBeGreaterThanOrEqual(3);
   expect(first.steps.every(x=>x.identity&&x.authority&&x.assertion)).toBe(true);
   expect(first.limitation.length).toBeGreaterThan(45);
  }
 });
 it('keeps one OrderId stable across conceptual payment attempts',()=>{
  const out=simulateIdentity('two-attempts');
  expect(out.stableId).toContain('O-17');
  expect(out.changedId).toContain('P-101');
  expect(out.changedId).toContain('P-102');
  expect(out.evidence).toBe('CONCEPTUAL FUTURE DOMAIN');
  expect(out.presentation).toContain('Pending');
 });
 it('does not merge same-name merchants or infer duplicate charges',()=>{
  const same=simulateIdentity('same-name');
  expect(same.stableId).toContain('R-17 and R-62');
  expect(same.meaning).toContain('wrong');
  const callback=simulateIdentity('repeat-callback');
  expect(callback.expected).toBe('one-operation');
  expect(callback.stableId).toContain('OP-501');
  expect(callback.limitation).toContain('No provider callback');
 });
 it('distinguishes a stale projection from provider capture authority',()=>{
  const result=simulateIdentity('stale-projection');
  expect(result.expected).toBe('not-confirmed');
  expect(result.presentation).toContain('not Payment completed');
  expect(result.evidence).toBe('CONCEPTUAL FUTURE DOMAIN');
 });
 it('keeps actual duplicate-create and repeated POST semantics distinct',()=>{
  const blocked=simulateIdentity('duplicate-id');
  expect(blocked.expected).toBe('create-rejected');
  expect(blocked.stableId).toBe('OrderId O-17');
  expect(blocked.evidence).toBe('IMPLEMENTED LOCAL JAVA CONTRACT');
  const repeat=simulateIdentity('duplicate-post');
  expect(repeat.expected).toBe('two-orders');
  expect(repeat.changedId).toContain('O-2');
  expect(repeat.evidence).toBe('IMPLEMENTED LOCAL JAVA CONTRACT');
 });
 it('does not confuse request/callback identity with external business authority',()=>{
  for(const s of scenarioChoices){
   const out=simulateIdentity(s.id);
   expect(out.authority.length).toBeGreaterThan(18);
   expect(out.steps.some(step=>step.authority.length>6)).toBe(true);
   expect(out.heading).not.toContain('Payment completed confirmed');
  }
 });
});
