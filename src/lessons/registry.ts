/** Single authored-lesson inventory. Add an editorial navigation entry in
 * sectionNavigation.ts and the canonical manuscript/component: the glob
 * discovery below fails validation if either is missing. No second manual
 * lesson-ID switch or authored-status list is necessary.
 *
 * Existing imports were eager in App and CourseOutline; keep equivalent
 * bundle semantics for this stabilization. Optimize laziness separately
 * only if measured and covered by tests.
 */
import type {ComponentType} from 'react';
import {lessonNavigationTitles, type AuthoredLessonId} from '../components/sectionNavigation';
import {chapterForLesson, lessons} from '../data/roadmap';
import {parseAuthoredTopics, type AuthoredTopic} from './source';
import historicSlugs from './legacy-section-aliases.json';

const manuscripts=import.meta.glob('../../content/lessons/*.md',{query:'?raw',import:'default',eager:true}) as Record<string,string>;
const modules=import.meta.glob('./lesson*/Lesson*.tsx',{eager:true}) as Record<string,{default:ComponentType}>;
export interface AuthoredLessonRecord {
  id:AuthoredLessonId;
  chapterId:string;
  component:ComponentType;
  manuscript:string;
  topics:AuthoredTopic[];
  navigationTitles:readonly string[];
  /** Immutable mapping of pre-stabilization ?section=N links to semantic topic IDs. */
  originalSectionSlugs:readonly string[];
}
function buildRegistry():Record<AuthoredLessonId,AuthoredLessonRecord>{
 const result:Record<string,AuthoredLessonRecord>={};
 for(const [id,titles] of Object.entries(lessonNavigationTitles) as [AuthoredLessonId,readonly string[]][]){
  const directory=id.replaceAll('.','');
  const source=manuscripts['../../content/lessons/'+id+'.md'];
  const component=modules['./lesson'+directory+'/Lesson'+directory+'.tsx']?.default;
  const chapter=chapterForLesson(id)?.id;
  const historical=(historicSlugs as Record<string,readonly string[]>)[id];
  const topics=source?parseAuthoredTopics(source):[];
  if(!source||!component||!chapter||!lessons.some(l=>l.id===id))
    throw new Error('Incomplete authored lesson registration '+id+' (component/manuscript/blueprint)');
  if(topics.length!==titles.length||!historical||historical.length!==topics.length)
    throw new Error('Authored topic titles or legacy anchors out of sync: '+id);
  if(new Set(titles).size!==titles.length)throw new Error('Duplicate editorial topic labels: '+id);
  result[id]={id,chapterId:chapter,component,manuscript:source,
    topics,navigationTitles:titles,originalSectionSlugs:historical};
 }
 for(const id of Object.keys(historicSlugs))
  if(!result[id])throw new Error('Unregistered historical authored lesson '+id);
 return result as Record<AuthoredLessonId,AuthoredLessonRecord>;
}
export const authoredLessons=buildRegistry();
export const authoredLessonIds=Object.keys(authoredLessons) as AuthoredLessonId[];
export function authoredLesson(id:string):AuthoredLessonRecord|undefined {
 return (authoredLessons as Record<string,AuthoredLessonRecord>)[id];
}
/** Old numerical links freeze to their original topic, even if later
 * manuscript sections are inserted before the target. */
export function resolveSectionIndex(lessonId:string,query:URLSearchParams):number{
 const lesson=authoredLesson(lessonId);
 if(!lesson)return 0;
 const slug=query.get('topic');
 if(slug){
  const index=lesson.topics.findIndex(t=>t.slug===slug);
  return index<0?0:index;
 }
 const legacy=Number(query.get('section')??'1');
 const oldSlug=Number.isInteger(legacy)&&legacy>0
  ?lesson.originalSectionSlugs[legacy-1]:undefined;
 const index=oldSlug?lesson.topics.findIndex(t=>t.slug===oldSlug):-1;
 return index<0?0:index;
}
