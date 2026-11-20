import source from '../../../content/lessons/1.1.8.md?raw';
import TextbookReader,{type EmbeddedLab} from '../shared/TextbookReader';
import {UndoDecisionInspector,EffectHistoryTimeline,UndoPredictionExercise} from './Mechanisms';
import './lesson.css';
export const lessonSections=source.split(/(?=^## )/m).filter(p=>p.startsWith('## ')).map((p,index)=>{
 const newline=p.indexOf('\n'),heading=p.slice(3,newline).trim(),split=heading.indexOf(' — ');
 return {index,stage:split<0?'Study':heading.slice(0,split),title:split<0?heading:heading.slice(split+3),body:p.slice(newline+1).trim()};
});
export default function Lesson118(){
 const labs:Record<number,EmbeddedLab>={
  15:{afterBlock:1,label:'Undo-versus-compensate decision tree and effect inspector',content:<UndoDecisionInspector/>},
  17:{afterBlock:1,label:'Before/after business facts and forward-remedy timeline',kind:'illustration',content:<EffectHistoryTimeline/>},
  18:{afterBlock:1,label:'Predict correction, reversal, compensation, reconciliation or escalation',content:<UndoPredictionExercise/>}
 };
 return <TextbookReader meta={{
  id:'1.1.8',chapterLabel:'02',
  title:<>Terminal, Reversible <em>& Irreversible Effects</em></>,
  subtitle:'Distinguish local rollback from real-world compensation: terminal lifecycles, externally committed money, consumed resources, information, source evidence, audit obligations and incident recovery.',
  provenance:'Conceptual Type C · Java read-only · all external effects hypothetical',
  sections:lessonSections,labs,
  repoUrl:'https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.8.md',
  footer:<div className="textbook-end-links">
   <a href="https://github.com/fasiltadesse22/food-ordering-platform-new/blob/081d1f1a877772e41d7a30ce0052e9609c71f6b5/docs/architecture/CURRENT_STATE.md" target="_blank" rel="noreferrer">Actual Java intake capability and unimplemented effects ↗</a>
   <a href="https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/docs/domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md" target="_blank" rel="noreferrer">Unresolved POL-01–POL-10 authority register ↗</a>
  </div>
 }}/>;
}
