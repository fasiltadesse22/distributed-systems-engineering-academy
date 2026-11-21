import source from '../../../content/lessons/1.1.9.md?raw';
import TextbookReader,{type EmbeddedLab} from '../shared/TextbookReader';
import {SynchronizedLifecycleInspector,CompositionSequenceExplorer,CompositionPredictionLab} from './Mechanisms';
import './lesson.css';
export const lessonSections=source.split(/(?=^## )/m).filter(s=>s.startsWith('## ')).map((s,index)=>{
 const newline=s.indexOf('\n'),heading=s.slice(3,newline).trim(),dash=heading.indexOf(' — ');
 return {index,stage:dash<0?'Study':heading.slice(0,dash),title:dash<0?heading:heading.slice(dash+3),body:s.slice(newline+1).trim()};
});
const javaSha='c7d3e2d741883b1aba5fcd1e51f4275ef48344ea';
const javaBase='https://github.com/fasiltadesse22/food-ordering-platform-new/blob/'+javaSha+'/';
export default function Lesson119(){
 const labs:Record<number,EmbeddedLab>={
  16:{afterBlock:0,label:'Three synchronized lifecycle states and cross-guard inspector',content:<SynchronizedLifecycleInspector/>},
  18:{afterBlock:1,label:'Happy and exceptional sequence with source-fact history',kind:'illustration',content:<CompositionSequenceExplorer/>},
  21:{afterBlock:1,label:'Predict cross-lifecycle legal decisions before reveal',content:<CompositionPredictionLab/>}
 };
 return <TextbookReader meta={{
  id:'1.1.9',chapterLabel:'02',
  title:<>Ordering, Payment <em>& Restaurant Lifecycle Composition</em></>,
  subtitle:'Reason across independent sources of truth: accepted-but-unpaid, rejected-but-paid, cancellation/preparation races, refund uncertainty, local Java execution, and future remote failure boundaries.',
  provenance:'Type A local Java application simulation · 72 JUnit tests at PR baseline · no real merchant, payment or kitchen effects',
  sections:lessonSections,labs,
  repoUrl:'https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.9.md',
  footer:<div className="textbook-end-links">
   <a href={javaBase+'src/main/java/com/academy/foodordering/application/simulation/LocalCompositionSimulation.java'} target="_blank" rel="noreferrer">Java local orchestration implementation ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/application/simulation/SimulatedPaymentPort.java'} target="_blank" rel="noreferrer">Explicitly simulated provider port ↗</a>
   <a href={javaBase+'src/test/java/com/academy/foodordering/application/simulation/LocalCompositionIntegrationTest.java'} target="_blank" rel="noreferrer">Executable Spring integration and negative tests ↗</a>
   <a href={javaBase+'docs/engineering/LESSON_1_1_9_LOCAL_COMPOSITION_CONTRACT.md'} target="_blank" rel="noreferrer">Application mechanism and authority contract ↗</a>
   <a href="https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/docs/domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md" target="_blank" rel="noreferrer">POL-01–POL-10 remain unresolved ↗</a>
  </div>
 }}/>;
}
