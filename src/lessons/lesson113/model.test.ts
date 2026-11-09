import {describe,it,expect} from 'vitest';
import {simulateCommand,scenarioChoices,predictionChoices} from './model';

describe('Lesson 1.1.3 deterministic command and fact model',()=>{
 it('covers five deliberate, distinct teaching cases without random effects',()=>{
  expect(scenarioChoices.map(x=>x.id)).toEqual(['valid','unavailable','repeat','lost-ack','write-then-throw']);
  expect(new Set(predictionChoices.map(x=>x.id)).size).toBe(5);
  for(const item of scenarioChoices){
   const first=simulateCommand(item.id);
   expect(simulateCommand(item.id)).toEqual(first);
   expect(first.steps.length).toBeGreaterThanOrEqual(4);
   expect(first.steps.every(s=>s.phase&&s.detail&&s.authority)).toBe(true);
   expect(first.limitation.length).toBeGreaterThan(25);
  }
 });
 it('creates a local intake fact only for normally returned successful model flows',()=>{
  const success=simulateCommand('valid');
  expect(success.prediction).toBe('recorded');
  expect(success.observedIntakes).toBe(1);
  expect(success.returnedSuccessFacts).toBe(1);
  expect(success.clientObservation).toContain('201 Created');
  expect(success.limitation).toContain('Not crash-durable');
 });
 it('business rejection does not create a success fact or saved intake',()=>{
  const rejected=simulateCommand('unavailable');
  expect(rejected.prediction).toBe('rejected');
  expect(rejected.observedIntakes).toBe(0);
  expect(rejected.returnedSuccessFacts).toBe(0);
  expect(rejected.clientObservation).toContain('422');
  expect(rejected.meaning).toContain('no OrderRequestRecorded');
 });
 it('repeated intent remains non-idempotent and does not invent a payment',()=>{
  const repeated=simulateCommand('repeat');
  expect(repeated.prediction).toBe('duplicate');
  expect(repeated.observedIntakes).toBe(2);
  expect(repeated.returnedSuccessFacts).toBe(2);
  expect(repeated.limitation).toContain('NOT duplicate merchant');
 });
 it('distinguishes lost client acknowledgement from an unknown repository effect',()=>{
  const lost=simulateCommand('lost-ack'),unknown=simulateCommand('write-then-throw');
  expect(lost.prediction).toBe('unseen');
  expect(lost.returnedSuccessFacts).toBe(1);
  expect(lost.clientObservation).toContain('Timeout');
  expect(unknown.prediction).toBe('uncertain');
  expect(unknown.observedIntakes).toBe(1);
  expect(unknown.returnedSuccessFacts).toBe(0);
  expect(unknown.clientObservation).toContain('unknown');
 });
});
