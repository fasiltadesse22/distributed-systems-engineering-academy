import source from '../../../content/lessons/1.1.5.md?raw';
import TextbookReader, {type EmbeddedLab} from '../shared/TextbookReader';
import {WorkflowSwimlane, AuthorityLedger, WorkflowScenarioExplorer} from './Mechanisms';
import './lesson.css';

export function parseWorkflowSections(markdown:string) {
 return markdown.split(/(?=^## )/m).filter(part=>part.startsWith('## ')).map((part,index)=>{
  const newline=part.indexOf('\n');
  const heading=part.slice(3,newline).trim();
  const dash=heading.indexOf(' — ');
  return {index,stage:dash<0?'Study':heading.slice(0,dash),title:dash<0?heading:heading.slice(dash+3),body:part.slice(newline+1).trim()};
 });
}
export const lessonSections=parseWorkflowSections(source);
export default function Lesson115(){
 const labs:Record<number,EmbeddedLab>={
  4:{afterBlock:1,label:'Connected actor workflow and branching authority',kind:'illustration',content:<WorkflowSwimlane/>},
  15:{afterBlock:1,label:'Milestone authority and customer projections',kind:'illustration',content:<AuthorityLedger/>},
  16:{afterBlock:1,label:'Predict partial workflow outcomes',content:<WorkflowScenarioExplorer/>}
 };
 return <TextbookReader meta={{
  id:'1.1.5',
  title:<>A Complete Food Ordering <em>Workflow Story</em></>,
  subtitle:'Trace the customer journey across independent merchant, payment, kitchen and delivery responsibilities, inspect partial completion, and determine what the customer can safely be told.',
  provenance:'Type C conceptual analysis · Java intake evidence pinned',
  repoUrl:'https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.5.md',
  sections:lessonSections,labs,
  footer:<div className="textbook-end-links">
   <a href="https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/docs/domain/CLUSTER_1_1_LESSON_1_1_5_WORKFLOW_PROCESS_MAP.md" target="_blank" rel="noreferrer">Business process map ↗</a>
   <a href="https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/docs/domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md" target="_blank" rel="noreferrer">Unresolved policies POL-01–POL-10 ↗</a>
   <a href="https://github.com/fasiltadesse22/food-ordering-platform-new/tree/ea17135cdc1974d89d78ce78931bb63cc5e9544e" target="_blank" rel="noreferrer">Verified Java intake checkpoint ↗</a>
  </div>
 }}/>;
}
