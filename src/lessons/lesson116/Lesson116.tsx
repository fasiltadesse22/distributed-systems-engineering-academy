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
export const javaCommit='7c89a3e9ece643b486d6132613d12e1424312cb6';
const javaBase='https://github.com/fasiltadesse22/food-ordering-platform-new/blob/'+javaCommit+'/';
export default function Lesson116(){
 const labs:Record<number,EmbeddedLab>={
   7:{afterBlock:1,label:'Side-by-side independent lifecycle graphs and authority inspector',kind:'illustration',content:<StateMachineExplorer/>},
   8:{afterBlock:1,label:'Workflow overlay across Order, RestaurantDecision and PaymentAttempt',kind:'illustration',content:<CrossLifecycleOverlay/>},
   10:{afterBlock:1,label:'Predict independent state progress and unresolved effects',content:<LifecyclePredictionLab/>}
 };
 return <TextbookReader meta={{
   id:'1.1.6',
   title:<>Workflows versus <em>State Machines</em></>,
   subtitle:'Trace three independently owned lifecycles without inventing one global state: precise pure transitions, business authority, partial progress, unknown outcomes, and a grounded Java domain-model evolution.',
   provenance:'Java 21 / Spring Boot · 34 CI-verified tests · external actors conceptual',
   sections:lessonSections,labs,
   repoUrl:'https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.6.md',
   footer:<div className="textbook-end-links">
    <a href="https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44052994889" target="_blank" rel="noreferrer">Java CI: 34 JUnit + live HTTP smoke ↗</a>
    <a href={javaBase+'src/main/java/com/academy/foodordering/domain/OrderLifecycle.java'} target="_blank" rel="noreferrer">Platform Order lifecycle ↗</a>
    <a href={javaBase+'src/main/java/com/academy/foodordering/domain/RestaurantDecisionLifecycle.java'} target="_blank" rel="noreferrer">Illustrative merchant lifecycle ↗</a>
    <a href={javaBase+'src/main/java/com/academy/foodordering/domain/PaymentAttemptLifecycle.java'} target="_blank" rel="noreferrer">Illustrative payment lifecycle ↗</a>
    <a href={javaBase+'src/main/java/com/academy/foodordering/domain/LifecycleSnapshot.java'} target="_blank" rel="noreferrer">Independent state composition ↗</a>
    <a href={javaBase+'docs/engineering/LESSON_1_1_6_LIFECYCLE_CONTRACT.md'} target="_blank" rel="noreferrer">Authority and transition contract ↗</a>
   </div>
 }}/>;
}
