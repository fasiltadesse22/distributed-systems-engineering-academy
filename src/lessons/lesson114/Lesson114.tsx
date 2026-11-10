import source from '../../../content/lessons/1.1.4.md?raw';
import TextbookReader,{type EmbeddedLab} from '../shared/TextbookReader';
import {IdentityAuthorityMap,ProjectionAuthorityFlow,IdentityAuthorityLab} from './Mechanisms';
import './lesson.css';

export function parseIdentitySections(markdown:string){
 return markdown.split(/(?=^## )/m).filter(part=>part.startsWith('## ')).map((part,index)=>{
  const newline=part.indexOf('\n');
  const heading=part.slice(3,newline).trim();
  const dash=heading.indexOf(' — ');
  return {index,stage:dash<0?'Study':heading.slice(0,dash),
   title:dash<0?heading:heading.slice(dash+3),body:part.slice(newline+1).trim()};
 });
}
export const lessonSections=parseIdentitySections(source);
export const javaCommit='ea17135cdc1974d89d78ce78931bb63cc5e9544e';
export const javaBase='https://github.com/fasiltadesse22/food-ordering-platform-new/blob/'+javaCommit+'/';
export const javaVerify='https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42782082917';
export default function Lesson114(){
 const labs:Record<number,EmbeddedLab>={
  0:{afterBlock:3,label:'Identity and authority ownership',kind:'illustration',content:<IdentityAuthorityMap/>},
  5:{afterBlock:8,label:'Provider authority versus UI projection',kind:'illustration',content:<ProjectionAuthorityFlow/>},
  8:{afterBlock:15,label:'Predict identity and authority consequences',content:<IdentityAuthorityLab/>}
 };
 return <TextbookReader meta={{
  id:'1.1.4',
  title:<>Business Identity & <em>Authoritative State</em></>,
  subtitle:'Keep entity identity stable while separating application-owned facts, external authority, mutable local state and derived UI projections. Trace the real typed Java IDs and test your reasoning against aliasing, retries and hypothetical provider outcomes.',
  provenance:'Java 21 / Spring Boot · 30 verified tests',
  repoUrl:'https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.4.md',
  sections:lessonSections,labs,
  footer:<div className="textbook-end-links">
   <a href={javaVerify} target="_blank" rel="noreferrer">Verified Java CI · 30 tests ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/domain/Order.java'} target="_blank" rel="noreferrer">Strongly typed Order model ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/infrastructure/InMemoryOrderRepository.java'} target="_blank" rel="noreferrer">Create-only state owner ↗</a>
   <a href={javaBase+'src/main/java/com/academy/foodordering/domain/OrderRequestRecorded.java'} target="_blank" rel="noreferrer">Typed post-save fact ↗</a>
   <a href={javaBase+'checkpoints/LESSON_1_1_4.md'} target="_blank" rel="noreferrer">Java identity checkpoint ↗</a>
  </div>
 }}/>;
}
