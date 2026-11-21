import {describe,it,expect} from 'vitest';
import {blueprint} from '../data/roadmap';
import {authoredLessonRegistry,authoredLessonIds,getAuthoredLesson,getLessonTopics,topicForQuery,type AuthoredEntry} from './registry';
import {validateAuthoredEntries} from './registryValidation';
import {getLessonComponent,registeredComponentPaths} from './lessonComponents';

const planned=blueprint.chapters.flatMap(c=>c.lessons.map(l=>l.id));
const entries=authoredLessonIds.map(id=>authoredLessonRegistry[id]);

describe('academy registry / canonical reading architecture',()=>{
 it('preserves nine authored lessons and separates eleven blueprint-only lessons',()=>{
  expect(authoredLessonIds).toEqual(['1.1.1','1.1.2','1.1.3','1.1.4','1.1.5','1.1.6','1.1.7','1.1.8','1.1.9']);
  expect(planned).toHaveLength(20);
  expect(planned.filter(id=>!getAuthoredLesson(id))).toHaveLength(11);
  expect(getAuthoredLesson('1.1.10')).toBeUndefined();
  expect(validateAuthoredEntries(entries,planned)).toEqual([]);
  expect(registeredComponentPaths()).toHaveLength(9);
  for(const e of entries)expect(getLessonComponent(e.id),e.id).toBeDefined();
 });
 it('contains 183 complete uniquely anchored source topics and 37 contextual labs',()=>{
  expect(entries.reduce((n,x)=>n+x.topics.length,0)).toBe(183);
  expect(entries.reduce((n,x)=>n+x.labs.length,0)).toBe(37);
  for(const e of entries){
   const parsed=getLessonTopics(e.id);
   expect(parsed.length).toBe(e.topics.length);
   for(const [i,t] of parsed.entries()){
    expect(t.id).toBe(e.topics[i].id);
    expect(t.body.length).toBeGreaterThan(20);
    expect(t.nav).toBeTruthy();
    expect(t.heading).toBe(e.topics[i].heading);
   }
  }
 });
 it('preserves frozen numerical deep links and adds stable identifier links',()=>{
  for(const e of entries)for(const topic of e.topics){
   const stable=topicForQuery(e.id,new URLSearchParams('topic='+topic.id));
   expect(stable?.id).toBe(topic.id);
   const legacy=topicForQuery(e.id,new URLSearchParams('section='+topic.legacySection));
   expect(legacy?.id).toBe(topic.id);
  }
 });
 it('detects an unregistered/unknown lesson, duplicate IDs and missing manuscript',()=>{
  const source=entries[0];
  const fake={...source,id:'1.1.21'} as AuthoredEntry;
  expect(validateAuthoredEntries([source,fake],planned).join(' ')).toContain('missing blueprint');
  expect(validateAuthoredEntries([source,source],planned).join(' ')).toContain('Duplicate authored lesson');
  expect(validateAuthoredEntries([{...source,manuscript:''}],planned).join(' ')).toContain('Missing manuscript');
 });
 it('detects stale editorial/source metadata and broken lab placement anchors',()=>{
  const source=entries[0];
  const wrongHeading={...source,topics:[{...source.topics[0],heading:'Wrong heading'},...source.topics.slice(1)]};
  expect(validateAuthoredEntries([wrongHeading],planned).join(' ')).toContain('source heading mismatch');
  const wrongLab={...source,labs:[{...source.labs[0],marker:'NO SUCH MARKER'},...source.labs.slice(1)]};
  expect(validateAuthoredEntries([wrongLab],planned).join(' ')).toContain('Lab source anchor absent');
  const duplicateTopic={...source,topics:[source.topics[0],source.topics[0],...source.topics.slice(2)]};
  expect(validateAuthoredEntries([duplicateTopic],planned).join(' ')).toContain('Duplicate topic ID');
 });
});
