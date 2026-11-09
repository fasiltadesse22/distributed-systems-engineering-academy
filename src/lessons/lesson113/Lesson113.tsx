import source from '../../../content/lessons/1.1.3.md?raw';
import TextbookReader,{type EmbeddedLab} from '../shared/TextbookReader';
import {CommandFactFlow,CommandFactLab} from './Mechanisms';
import './lesson.css';

export function parseCommandSections(markdown:string){
 return markdown.split(/(?=^## )/m).filter(part=>part.startsWith('## ')).map((part,index)=>{
  const newline=part.indexOf('\n');
  const heading=part.slice(3,newline).trim();
  const dash=heading.indexOf(' — ');
  return {index,stage:dash<0?'Study':heading.slice(0,dash),
   title:dash<0?heading:heading.slice(dash+3),body:part.slice(newline+1).trim()};
 });
}
export const lessonSections=parseCommandSections(source);
export const javaCommit='225db684a24080f2c4ad1ae6e2f5e259edf0aa7d';
export const javaBase='https://github.com/fasiltadesse22/food-ordering-platform-new/blob/'+javaCommit+'/';
export const javaVerify='https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42590153411';

export default function Lesson113(){
 const labs:Record<number,EmbeddedLab>={
  0:{afterBlock:2,label:'Command, decision and fact boundaries',kind:'illustration',content:<CommandFactFlow/>},
  10:{afterBlock:13,label:'Predict the command and local fact outcome',content:<CommandFactLab/>}
 };
 return <TextbookReader meta={{
  id:'1.1.3',
  title:<>Commands, Decisions, <em>Facts & Events</em></>,
  subtitle:'Trace the boundary between requested work, the business decision, a recorded local effect and a truthful acknowledgement. Includes real Java command outcomes, source-backed evidence and an explanatory failure model.',
  provenance:'Java 21 / Spring Boot · 18 verified tests',
  repoUrl:'https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.3.md',
  sections:lessonSections,labs,
  footer:<div className="textbook-end-links">
   <a href={javaVerify} target="_blank" rel="noreferrer">Verified Java CI · 18 tests ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/application/PlaceOrderService.java'} target="_blank" rel="noreferrer">Actual Java decision handler ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/domain/OrderRequestRecorded.java'} target="_blank" rel="noreferrer">Post-save local fact ↗</a>
   <a href={javaBase+'checkpoints/LESSON_1_1_3.md'} target="_blank" rel="noreferrer">Java checkpoint ↗</a>
  </div>
 }}/>;
}
