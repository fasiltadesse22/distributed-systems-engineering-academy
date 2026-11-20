import source from '../../../content/lessons/1.1.7.md?raw';
import TextbookReader,{type EmbeddedLab} from '../shared/TextbookReader';
import {GuardStudio,TransitionTableExplorer,CommitBoundaryTimeline,GuardPredictionLab} from './Mechanisms';
import './lesson.css';

export function parseGuardSections(markdown:string){
 return markdown.split(/(?=^## )/m).filter(part=>part.startsWith('## ')).map((part,index)=>{
  const newline=part.indexOf('\n');
  const heading=part.slice(3,newline).trim();
  const dash=heading.indexOf(' — ');
  return {index,stage:dash<0?'Study':heading.slice(0,dash),
   title:dash<0?heading:heading.slice(dash+3),body:part.slice(newline+1).trim()};
 });
}
export const lessonSections=parseGuardSections(source);
export const javaCommit='8c5e5144b40adbd8679f4fe3f8046020b0279d2b';
const javaBase='https://github.com/fasiltadesse22/food-ordering-platform-new/blob/'+javaCommit+'/';
export default function Lesson117(){
 const labs:Record<string,EmbeddedLab>={
  "trace-the-illustrative-accept-command-across-eleven-guards":{afterText:"The sequence begins with **IDENTITY_ORDER**: does the target command ref",label:'Guarded merchant and preparation transitions with actor and evidence controls',content:<GuardStudio/>},
  "derive-total-decision-tables-rather-than-ad-hoc-if-statements":{afterText:"| State before | ACCEPT | REJECT | Meaning |\n|---|---|---|---|\n| PENDING",label:'Total state-and-action decision tables',kind:'illustration',content:<TransitionTableExplorer/>},
  "a-passing-pure-guard-is-not-a-persistence-commit":{afterText:"The exact commit point depends on storage semantics. For a local databas",label:'Pure decision, persistence commit and authoritative fact boundary',kind:'illustration',content:<CommitBoundaryTimeline/>},
  "before-after-fact-no-fact-and-the-counterexample-discipline":{afterText:"Consider an authenticated merchant operator for the correct restaurant w",label:'Predict before reveal business legality',content:<GuardPredictionLab/>}
 };
 return <TextbookReader meta={{
  id:'1.1.7',
  chapterLabel:'02',
  title:<>Guards, Preconditions <em>& Postconditions</em></>,
  subtitle:'Prove when a state transition is legal: actor authority, identity and evidence guards, unchanged-state rejection, candidate-versus-commit boundaries, and table-derived executable tests.',
  provenance:'Java 21/Spring Boot · 59 post-merge JUnit tests · external merchant and kitchen operations conceptual',
  sections:lessonSections,labs,
  repoUrl:'https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.7.md',
  footer:<div className="textbook-end-links">
   <a href="https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071" target="_blank" rel="noreferrer">Java post-merge CI: 59 JUnit + packaged HTTP smoke ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/domain/GuardedRestaurantDecision.java'} target="_blank" rel="noreferrer">Eleven guarded merchant checks in Java ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/domain/PreparationGuardProbe.java'} target="_blank" rel="noreferrer">Illustrative kitchen preparation guard ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/application/PreviewRestaurantDecisionService.java'} target="_blank" rel="noreferrer">Side-effect-free application outcomes ↗</a>
   <a href={javaBase+'src/test/java/com/academy/foodordering/domain/GuardedTransitionsTest.java'} target="_blank" rel="noreferrer">Table-derived JUnit guard tests ↗</a>
   <a href={javaBase+'docs/engineering/LESSON_1_1_7_GUARDED_TRANSITION_CONTRACT.md'} target="_blank" rel="noreferrer">Engineering guard contract ↗</a>
  </div>
 }}/>;
}
