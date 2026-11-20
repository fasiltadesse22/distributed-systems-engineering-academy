import test from 'node:test';
import assert from 'node:assert/strict';
import {validateProgress} from './check-progress-governance.mjs';

const complete=['1.1.1','1.1.2','1.1.3','1.1.4','1.1.5','1.1.6','1.1.7','1.1.8'];
const fixture=()=>{
 const rows=complete.map(id=>'| Lesson '+id+': topic | **Merged and verified** | [checkpoint](../../checkpoints/LESSON_'+id.replaceAll('.','_')+'.md) | Source |');
 return [
  '# Academy Progress', '**Current status authority:** table below is active.',
  '## Verified checkpoints','| Scope | Status | Evidence | Java |',
  '|---|---|---|---|',...rows,
  '| Lessons 1.1.9–1.1.20 | Not started | Blueprint only | Deferred |',
  '## HISTORICAL Lesson 1.1.6 candidate — 2026-11-17',
  'A past snapshot said merge pending. It is now historical.'
 ].join('\n');
};

test('one active verified row and a clearly labeled historical pending note passes',()=>{
 assert.deepEqual(validateProgress(fixture()),[]);
});
test('duplicate active lesson row fails',()=>{
 const text=fixture().replace('| Lessons 1.1.9', '| Lesson 1.1.6: duplicate | **Verified** | evidence | Java |\n| Lessons 1.1.9');
 assert.match(validateProgress(text).join(' '),/exactly one.*1\.1\.6/);
});
test('stale active status is rejected',()=>{
 const text=fixture().replace('Lesson 1.1.6: topic | **Merged and verified**',
   'Lesson 1.1.6: topic | **merge pending**');
 assert.match(validateProgress(text).join(' '),/1\.1\.6/);
});
test('historical candidate without historical label is rejected',()=>{
 const text=fixture().replace('## HISTORICAL Lesson 1.1.6 candidate',
   '## Lesson 1.1.6 candidate');
 assert.match(validateProgress(text).join(' '),/HISTORICAL/);
});
test('future lesson wrongly marked complete is rejected',()=>{
 const text=fixture().replace('Lessons 1.1.9–1.1.20 | Not started','Lessons 1.1.9–1.1.20 | Complete');
 assert.match(validateProgress(text).join(' '),/Not started/);
});

test('eighth lesson cannot retain implementation-pending status after evidence freeze',()=>{
 const text=fixture().replace('Lesson 1.1.8: topic | **Merged and verified**','Lesson 1.1.8: topic | **Implementation in feature branch; CI pending**');
 assert.match(validateProgress(text).join(' '),/1\.1\.8/);
});
