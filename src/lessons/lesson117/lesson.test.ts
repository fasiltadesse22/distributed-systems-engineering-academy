import {describe,it,expect} from 'vitest';
import source from '../../../content/lessons/1.1.7.md?raw';
import {lessonSections} from './Lesson117';
import {lessonNavigationTitles} from '../../components/sectionNavigation';
import {
 merchantDefault,preparationDefault,evaluateMerchant,evaluatePreparation,
 merchantMatrix,preparationMatrix,casebook,evaluateCase
} from './model';

describe('Lesson 1.1.7 textbook scope and guard model',()=>{
 it('retains a deep and independently readable 26-topic manuscript',()=>{
  expect(lessonSections).toHaveLength(26);
  expect(lessonNavigationTitles['1.1.7']).toHaveLength(26);
  expect(source.trim().split(/\s+/).length).toBeGreaterThan(7600);
  for(const term of ['precondition','postcondition','invariant','AUTHENTICATED_ASSUMED',
    'BUSINESS_AUTHORITY_ASSUMED','EXPECTED_STATE','STATE_PENDING',
    'POL-02','POL-04','PLACED','REQUESTED','PENDING','time-of-check',
    'no candidate fact','Staff','hotel booking','Maven']){
    expect(source.toLowerCase()).toContain(term.toLowerCase());
  }
 });
 it('allows only explicitly assumed merchant candidate and retains source identity',()=>{
  const result=evaluateMerchant(merchantDefault);
  expect(result.accepted).toBe(true);
  expect(result.before).toBe('PENDING');
  expect(result.next).toBe('ACCEPTED');
  expect(result.guards).toHaveLength(11);
  expect(result.guards.every(x=>x.passed)).toBe(true);
  expect(result.candidateFact).toBe('CandidateIllustrativeRestaurantAccepted');
  expect(result.authorityNotice).toMatch(/neither merchant authentication nor persistence/);
 });
 it('rejects every single independently failed merchant guard with no fact',()=>{
  const changes={
   requestOrderMatches:false,requestRestaurantMatches:false,actorRestaurantMatches:false,
   technicallyAuthenticatedAssumed:false,businessAuthorizedAssumed:false,
   basketTermsMatchAssumed:false,sourceEvidenceAssumed:false
  };
  for(const [field,value] of Object.entries(changes)){
   const result=evaluateMerchant({...merchantDefault,[field]:value});
   expect(result.accepted).toBe(false);
   expect(result.before).toBe(result.next);
   expect(result.candidateFact).toBeNull();
   expect(result.guards.some(x=>!x.passed)).toBe(true);
  }
  for(const next of [
    {...merchantDefault,role:'CUSTOMER' as const},
    {...merchantDefault,state:'REJECTED' as const,expectedState:'REJECTED' as const},
    {...merchantDefault,state:'REJECTED' as const},
    {...merchantDefault,policy:'UNRESOLVED' as const}
  ]){
   const result=evaluateMerchant(next);
   expect(result.accepted).toBe(false);
   expect(result.next).toBe(result.before);
   expect(result.candidateFact).toBeNull();
  }
 });
 it('preparation requires accepted merchant, correct stage, actor and hypothetical policy',()=>{
  const okay=evaluatePreparation(preparationDefault);
  expect(okay.accepted).toBe(true);
  expect(okay.next).toBe('PREPARING');
  expect(okay.guards).toHaveLength(6);
  for(const invalid of [
    {...preparationDefault,merchantState:'PENDING' as const},
    {...preparationDefault,action:'COMPLETE_PREPARATION' as const},
    {...preparationDefault,actor:'CUSTOMER' as const},
    {...preparationDefault,policyAssumed:false},
    {...preparationDefault,merchantEvidenceAssumed:false}
  ]){
   const decision=evaluatePreparation(invalid);
   expect(decision.accepted).toBe(false);
   expect(decision.before).toBe(decision.next);
   expect(decision.candidateFact).toBeNull();
  }
 });
 it('decision tables are total over three states and two actions',()=>{
  expect(merchantMatrix).toHaveLength(6);
  expect(preparationMatrix).toHaveLength(6);
  expect(merchantMatrix.filter(x=>x.eligibleUnderAssumptions)).toHaveLength(2);
  expect(preparationMatrix.filter(x=>x.eligibleUnderAssumptions)).toHaveLength(2);
  for(const row of merchantMatrix)expect(evaluateMerchant({
    ...merchantDefault,state:row.state,action:row.action,expectedState:row.state
  }).accepted).toBe(row.eligibleUnderAssumptions);
  for(const row of preparationMatrix)expect(evaluatePreparation({
    ...preparationDefault,stage:row.stage,action:row.action
  }).accepted).toBe(row.eligibleUnderAssumptions);
 });
 it('all eight predict/reveal cases are deterministic and disclose candidate limits',()=>{
  expect(casebook).toHaveLength(8);
  expect(new Set(casebook.map(x=>x.id)).size).toBe(8);
  for(const c of casebook){
   const r=evaluateCase(c);
   expect(r.accepted?'eligible':'rejected').toBe(c.answer);
   if(!r.accepted){expect(r.before).toBe(r.next);expect(r.candidateFact).toBeNull()}
   else expect(r.candidateFact).toMatch(/^CandidateIllustrative/);
  }
 });
});
