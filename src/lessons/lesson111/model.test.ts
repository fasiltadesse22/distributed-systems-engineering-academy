import {describe,it,expect} from 'vitest';
import {actors,decisions,assessAuthority,runJourney,challenges} from './model';
describe('Lesson 1.1.1 domain authority',()=>{
 it('keeps actors, decisions and challenges uniquely identified',()=>{
   expect(new Set(actors.map(a=>a.id)).size).toBe(actors.length);
   expect(new Set(decisions.map(d=>d.id)).size).toBe(decisions.length);
   expect(new Set(challenges.map(c=>c.id)).size).toBe(challenges.length);
 });
 it('distinguishes provider fact from platform recording',()=>{
   const d=decisions.find(x=>x.id==='payment')!;
   expect(assessAuthority(d,'provider').match).toBe(true);
   const bad=assessAuthority(d,'operations');
   expect(bad.level).toBe('conflict');
   expect(bad.message).toMatch(/provider/i);
 });
 it('preserves unresolved post-accept policy rather than inventing owner',()=>{
   const d=decisions.find(x=>x.id==='late-cancel')!;
   expect(assessAuthority(d,'policy').level).toBe('unresolved');
   expect(assessAuthority(d,'restaurant').message).toMatch(/intentionally undecided/i);
 });
});
describe('Lesson 1.1.1 decision journey',()=>{
 const base={restaurant:'accept',provider:'approved',cancellation:'none',policy:'strict',refund:'pending'} as const;
 it('rejects before payment under pay-after-accept example',()=>{
   const result=runJourney({...base,restaurant:'reject'});
   expect(result.paymentOutcome).toBe('No payment attempt');
   expect(result.steps.some(s=>s.actor==='Provider')).toBe(false);
 });
 it('does not claim declined when provider outcome is unknown',()=>{
   const result=runJourney({...base,provider:'unknown'});
   expect(result.paymentOutcome).toMatch(/Unknown/);
   expect(result.customerMessage).toMatch(/cannot yet say paid or declined/);
 });
 it('does not prepare after provider decline',()=>{
   const result=runJourney({...base,provider:'declined'});
   expect(result.steps.some(s=>s.actor==='Kitchen')).toBe(false);
 });
 it('keeps cancellation request separate from grant under strict policy',()=>{
   const result=runJourney({...base,cancellation:'after-accept'});
   expect(result.orderOutcome).toMatch(/denied/);
   expect(result.steps.some(s=>s.fact==='Late cancellation requested')).toBe(true);
 });
 it('does not turn a refund request into completion',()=>{
   const result=runJourney({...base,cancellation:'after-accept',policy:'exception',refund:'pending'});
   expect(result.orderOutcome).toMatch(/Cancelled/);
   expect(result.paymentOutcome).toBe('Refund pending');
   expect(result.steps.some(s=>s.fact==='Refund requested')).toBe(true);
 });
 it('separates a declined refund from a successful provider operation',()=>{
   const result=runJourney({...base,cancellation:'after-accept',policy:'exception',refund:'rejected'});
   expect(result.paymentOutcome).toBe('Refund declined');
   expect(result.warning).toMatch(/outstanding/);
 });
 it('allows documented provider confirmation without claiming bank posting',()=>{
   const result=runJourney({...base,cancellation:'after-accept',policy:'exception',refund:'confirmed'});
   expect(result.paymentOutcome).toBe('Provider refund confirmed');
   expect(result.warning).toMatch(/not the same as observed bank posting/);
 });
 it('shows kitchen and delivery only on permitted paid fulfillment path',()=>{
   const result=runJourney(base);
   expect(result.steps.map(s=>s.actor)).toEqual(['Customer','Platform','Restaurant','Provider','Kitchen','Delivery']);
 });
});
