import {useState} from 'react';
import rawLesson from '../../../content/lessons/1.1.1.md?raw';
import {academyRepo,platformRepo,platformPlanningSha} from '../../data/roadmap';
import TextbookReader, {type EmbeddedLab} from '../shared/TextbookReader';
import {ActorAuthorityAtlas} from './ActorAuthorityAtlas';
import {WorkflowStudio} from './WorkflowStudio';
import {AuthorityChallenge,CommunicationDrill,IncidentCaseboard} from './Exercises';
import './lesson.css';

export interface TeachingSection{index:number;stage:string;title:string;body:string;slug:string}
export function parseTeachingSections(markdown:string):TeachingSection[]{
 return markdown.split(/(?=^## )/m).filter(s=>s.startsWith('## ')).map((block,index)=>{
  const newline=block.indexOf('\n');
  const heading=block.slice(3,newline).trim();
  const separator=heading.indexOf(' — ');
  return {index,stage:separator<0?'Study':heading.slice(0,separator),
   title:separator<0?heading:heading.slice(separator+3),
   body:block.slice(newline+1).trim(),slug:'section-'+(index+1)};
 });
}
export const teachingSections=parseTeachingSections(rawLesson);

function DomainArtifact(){
 return <div className="l111-reference">
  <span className="eyebrow">SOURCE ARTIFACT · DOMAIN DISCOVERY</span>
  <h3>Decisions worth recording before code</h3>
  <p>The versioned contract names actors, responsibilities, authority boundaries, six review scenarios and open policy questions. It is a business-design checkpoint, not executed Java behavior.</p>
  <a href={academyRepo+'/blob/main/docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md'} target="_blank" rel="noreferrer">Read complete domain discovery ↗</a>
 </div>;
}
function EvidenceBoundary(){
 return <aside className="l111-boundary-panel">
  <span className="eyebrow">EVIDENCE BOUNDARY</span><h3>Conceptual reasoning is not runtime proof</h3>
  <p>Actor maps, fictional decision paths and investigations are teaching models. No Java workflow was changed by Lesson 1.1.1. The later Lesson 1.1.2 verifies request intake only—not real merchant approval, card processing or production telemetry.</p>
  <div className="l111-link-row">
   <a href={academyRepo+'/blob/main/docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md'} target="_blank" rel="noreferrer">Domain authority contract ↗</a>
   <a href={platformRepo+'/tree/'+platformPlanningSha} target="_blank" rel="noreferrer">Original platform planning checkpoint ↗</a>
  </div>
 </aside>;
}
function TransferExercise(){
 const [show,setShow]=useState(false);
 return <section className="l111-retain"><h3>Apply authority reasoning to hotel reservation</h3>
  <p>A guest sees “confirmed,” the property reports no rooms, and a payment provider shows approval. Identify who requested, who owns inventory, who can establish financial facts, and who owes the customer a resolution.</p>
  <button type="button" className="button secondary" onClick={()=>setShow(!show)}>{show?'Hide sample reasoning':'Compare with a sample after your attempt'}</button>
  {show&&<div className="l111-feedback pass"><b>Transfer reasoning</b><p>Guest intent, property availability, provider operation and platform remediation are separate propositions. The property controls real inventory; the provider attests to its financial operation. The platform must explain and resolve conflicting customer promises under an approved policy.</p></div>}
 </section>;
}
export default function Lesson111(){
 const labs:Record<number,EmbeddedLab>={
  5:{afterBlock:1,label:'Actor authority model',content:<ActorAuthorityAtlas/>},
  6:{afterBlock:1,label:'Business workflow branches',content:<WorkflowStudio/>},
  7:{afterBlock:1,label:'Authority decision challenge',content:<AuthorityChallenge/>},
  8:{afterBlock:3,label:'Cancellation evidence investigation',content:<IncidentCaseboard/>},
  9:{afterBlock:1,label:'Domain discovery source contract',content:<DomainArtifact/>},
  10:{afterBlock:1,label:'Domain evidence limitations',content:<EvidenceBoundary/>},
  11:{afterBlock:2,label:'Engineering communication practice',content:<CommunicationDrill/>},
  12:{afterBlock:1,label:'Transfer reasoning exercise',content:<TransferExercise/>}
 };
 return <TextbookReader meta={{
  id:'1.1.1',
  title:<>Actors, Goals & <em>Business Authority</em></>,
  subtitle:'Discover the participants, motivations, ownership boundaries and authoritative business facts that must remain correct regardless of architecture.',
  provenance:'Conceptual domain contract · no Java change',
  repoUrl:academyRepo+'/blob/main/content/lessons/1.1.1.md',
  sections:teachingSections,labs
 }}/>;
}
