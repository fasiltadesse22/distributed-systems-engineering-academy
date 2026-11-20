import source from '../../../content/lessons/1.1.6.md?raw';
import TextbookReader,{type EmbeddedLab} from '../shared/TextbookReader';
import {StateMachineExplorer,CrossLifecycleOverlay,LifecyclePredictionLab} from './Mechanisms';
import './lesson.css';

export function parseLifecycleSections(markdown:string){
 return markdown.split(/(?=^## )/m).filter(part=>part.startsWith('## ')).map((part,index)=>{
  const newline=part.indexOf('\n');
  const heading=part.slice(3,newline).trim();
  const dash=heading.indexOf(' — ');
  return {index,stage:dash<0?'Study':heading.slice(0,dash),
   title:dash<0?heading:heading.slice(dash+3),body:part.slice(newline+1).trim()};
 });
}
export const lessonSections=parseLifecycleSections(source);
export const javaCommit='79024c3c36fe1a8cc6f71b79505601894d927507';
const javaBase='https://github.com/fasiltadesse22/food-ordering-platform-new/blob/'+javaCommit+'/';
export default function Lesson116(){
 const labs:Record<string,EmbeddedLab>={
   "side-by-side-state-machines-and-transition-provenance":{afterText:"Select any edge. The inspector should reveal its **source state, request",label:'Side-by-side independent lifecycle graphs and authority inspector',kind:'illustration',content:<StateMachineExplorer/>},
   "cross-lifecycle-predicates-are-observations-not-shared-authority":{afterText:"Suppose the first predicate is true. The workflow may have progressed fi",label:'Workflow overlay across Order, RestaurantDecision and PaymentAttempt',kind:'illustration',content:<CrossLifecycleOverlay/>},
   "independent-progress-without-imaginary-global-commit":{afterText:"Now change only the merchant decision to REJECTED and payment to REFUND_",label:'Predict independent state progress and unresolved effects',content:<LifecyclePredictionLab/>}
 };
 return <TextbookReader meta={{
   id:'1.1.6',
   chapterLabel:'02',
   title:<>Workflows versus <em>State Machines</em></>,
   subtitle:'Trace three independently owned lifecycles without inventing one global state: precise pure transitions, business authority, partial progress, unknown outcomes, and a grounded Java domain-model evolution.',
   provenance:'Java 21 / Spring Boot · 34 CI-verified tests · external actors conceptual',
   sections:lessonSections,labs,
   repoUrl:'https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.6.md',
   footer:<div className="textbook-end-links">
    <a href="https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44054521893" target="_blank" rel="noreferrer">Java CI: 34 JUnit + live HTTP smoke ↗</a>
    <a href={javaBase+'src/main/java/com/academy/foodordering/domain/OrderLifecycle.java'} target="_blank" rel="noreferrer">Platform Order lifecycle ↗</a>
    <a href={javaBase+'src/main/java/com/academy/foodordering/domain/RestaurantDecisionLifecycle.java'} target="_blank" rel="noreferrer">Illustrative merchant lifecycle ↗</a>
    <a href={javaBase+'src/main/java/com/academy/foodordering/domain/PaymentAttemptLifecycle.java'} target="_blank" rel="noreferrer">Illustrative payment lifecycle ↗</a>
    <a href={javaBase+'src/main/java/com/academy/foodordering/domain/LifecycleSnapshot.java'} target="_blank" rel="noreferrer">Independent state composition ↗</a>
    <a href={javaBase+'docs/engineering/LESSON_1_1_6_LIFECYCLE_CONTRACT.md'} target="_blank" rel="noreferrer">Authority and transition contract ↗</a>
   </div>
 }}/>;
}
