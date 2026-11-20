import {describe,it,expect} from 'vitest';
import source from '../../../content/lessons/1.1.8.md?raw';
import {lessonSections} from './Lesson118';
import {cases,classify,predictions} from './model';
describe('Lesson 1.1.8 concept scope and evidence boundaries',()=>{
 it('retains 26 substantive independent manuscript topics and required concepts',()=>{
  expect(lessonSections).toHaveLength(26);
  expect(source.trim().split(/\s+/).length).toBeGreaterThan(5500);
  for(const term of ['terminal','correction','reversal','compensation','irreversible','audit trail','human','POL-03','POL-04','POL-05','POL-06','refund','notification','kitchen','provider','Staff','banking','rollback'])
   expect(source.toLowerCase()).toContain(term.toLowerCase());
 });
 it('preserves original provider capture when policy allows candidate compensation',()=>{
  const r=classify('capture',true,true);
  expect(r.branch).toBe('compensate');
  expect(r.original.map(x=>x.identity)).toContain('C-81');
  expect(r.proposed).toHaveLength(1);
  expect(r.proposed[0].certainty).toBe('candidate');
  expect(r.warning).toContain('CLASSROOM ONLY');
 });
 it('does not assume an unapproved refund or evidence-free success',()=>{
  expect(classify('capture',true,false).branch).toBe('escalate');
  expect(classify('capture',false,true).branch).toBe('reconcile');
  expect(classify('refund-timeout',false,true).branch).toBe('reconcile');
  expect(classify('capture',false,true).proposed.every(x=>x.certainty!=='hypothetical-confirmed')).toBe(true);
 });
 it('classifies physically/informationally irreversible effects and retains source facts',()=>{
  for(const id of ['kitchen','notification'] as const){
   const r=classify(id,true,true);
   expect(r.branch).toBe('compensate');
   expect(r.original).toHaveLength(1);
   expect(r.proposed.every(x=>x.certainty==='candidate')).toBe(true);
  }
  expect(classify('kitchen',true,false).branch).toBe('escalate');
 });
 it('only allows genuine local reversal with no committed external effects',()=>{
  for(const id of ['draft','local-write'] as const){
   const r=classify(id,false,false);expect(r.branch).toBe('reverse');expect(r.original).toHaveLength(0);
   expect(r.remaining[0]).toContain('no external effect');
  }
 });
 it('eight prediction cases are deterministic and require justified branch selection',()=>{
  expect(predictions).toHaveLength(8);
  expect(cases).toHaveLength(6);
  for(const p of predictions)expect(classify(p.id,p.sourceEvidence,p.approved).branch).toBe(p.answer);
 });
});
