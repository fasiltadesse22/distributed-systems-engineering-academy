import {describe,it,expect} from 'vitest';
import {acceptanceCases,defaultScenario,evaluateScenario,platformCommit,traceSteps,useCases} from './model';
describe('Lesson 1.1.2 realistic contract model',()=>{
 it('pins one immutable Java commit and separates implemented/conceptual use cases',()=>{
   expect(platformCommit).toMatch(/^[0-9a-f]{40}$/);
   expect(useCases.filter(u=>u.state==='implemented').map(u=>u.id)).toEqual(['UC-001']);
   expect(useCases.some(u=>u.state==='unresolved')).toBe(true);
 });
 it('preserves honest 201 intake fields and fixture price',()=>{
   const r=evaluateScenario(defaultScenario);
   expect(r.http).toBe(201);
   expect(r.intake).toBe('REQUESTED_AWAITING_RESTAURANT');
   expect(r.restaurant).toBe('PENDING');
   expect(r.payment).toBe('NOT_STARTED');
   expect(r.quote).toBe(2500);
 });
 it('models structural and business rejections separately',()=>{
   expect(evaluateScenario({...defaultScenario,quantity:0}).http).toBe(400);
   expect(evaluateScenario({...defaultScenario,restaurant:'other-restaurant'}).code).toBe('RESTAURANT_NOT_FOUND');
   expect(evaluateScenario({...defaultScenario,item:'seasonal-special'}).code).toBe('ITEM_UNAVAILABLE');
   expect(evaluateScenario({...defaultScenario,item:'unknown-item'}).code).toBe('ITEM_NOT_FOUND');
   expect(evaluateScenario({...defaultScenario,duplicate:true}).code).toBe('DUPLICATE_ITEM');
 });
 it('future branches never masquerade as implemented Java behavior',()=>{
   const r=evaluateScenario({...defaultScenario,future:'payment-decline'});
   expect(r.payment).toBe('NOT_STARTED');
   expect(r.futureMessage).toMatch(/FUTURE ONLY/);
 });
 it('maps every acceptance criterion and traced layer to real source filenames',()=>{
   expect(acceptanceCases).toHaveLength(7);
   expect(acceptanceCases.every(c=>c.path.endsWith('.java')&&c.test.length>4)).toBe(true);
   expect(traceSteps).toHaveLength(6);
   expect(traceSteps.every(t=>t.file.endsWith('.java'))).toBe(true);
 });
});
