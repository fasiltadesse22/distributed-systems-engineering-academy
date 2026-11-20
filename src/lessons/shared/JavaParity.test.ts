import {describe,it,expect} from 'vitest';
import reviewed from '../../../content/evidence/java-model-parity.json';
import {transitions} from '../lesson116/model';
import {evaluateMerchant,evaluatePreparation,merchantDefault,preparationDefault,
 type MerchantInput,type PreparationInput} from '../lesson117/model';

/**
 * Reviewed immutable Java-source expectation snapshots.
 * NO Java JVM is executed here; these are independent TS model parity fixtures,
 * NOT authenticated merchant/payment facts or distributed failure testing.
 */
describe('Reviewed Java pure-model to React scenario correspondence',()=>{
 it('pins real full commit SHAs, Java source, test and CI references',()=>{
  for(const m of reviewed.models){
   expect(m.javaCommit).toMatch(/^[0-9a-f]{40}$/);
   expect(m.javaRun).toMatch(/^https:\/\/github.com\/fasiltadesse22\/food-ordering-platform-new\/actions\/runs\/\d+$/);
   expect(m.sourcePaths.length).toBeGreaterThan(0);
   expect(m.tests.length).toBeGreaterThan(0);
   expect(m.classification).toBe('java-backed-pure-local-model');
   expect(m.limitations.join(' ').toLowerCase()).toMatch(/no |not |assum/);
  }
 });
 it('Lesson 1.1.6 state/action and illustrative outcome fixtures remain aligned',()=>{
  const m=reviewed.models.find(x=>x.lesson==='1.1.6');
  expect(m).toBeDefined();
  for(const c of m!.cases){
   if(!('domain' in c))continue;
   const actual=transitions.find(x=>x.domain===c.domain&&x.from===c.from&&x.action===c.action);
   expect(actual,JSON.stringify(c)).toBeDefined();
   expect(actual!.to).toBe(c.to);
   expect(actual!.fact).toBe(c.modelFact);
   expect(actual!.evidence).not.toEqual('EXTERNAL FACT');
  }
 });
 it('Lesson 1.1.7 merchant/prepare fixtures preserve no-op and no-success-fact contracts',()=>{
  const m=reviewed.models.find(x=>x.lesson==='1.1.7');
  expect(m).toBeDefined();
  for(const c of m!.cases){
   if(!('kind' in c))continue;
   const actual=c.kind==='merchant'
     ?evaluateMerchant({...merchantDefault,...c.overrides} as MerchantInput)
     :evaluatePreparation({...preparationDefault,...c.overrides} as PreparationInput);
   expect(actual.accepted).toBe(c.accepted);
   expect(actual.before).toBe(c.before);
   expect(actual.next).toBe(c.next);
   expect(actual.candidateFact).toBe(c.candidateFact);
   if('failingGuard' in c)expect(actual.guards.find(x=>!x.passed)?.code).toBe(c.failingGuard);
   if(!actual.accepted){expect(actual.before).toBe(actual.next);expect(actual.candidateFact).toBeNull()}
  }
 });
});
