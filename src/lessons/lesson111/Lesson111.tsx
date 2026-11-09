import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import rawLesson from '../../../content/lessons/1.1.1.md?raw';
import { academyRepo, platformRepo, platformPlanningSha } from '../../data/roadmap';
import { StoryCanvas } from '../shared/StoryCanvas';
import {editorialFor} from '../shared/readingEditorial';
import {visualsFor} from '../shared/structuredVisuals';
import { authorityScenes } from './scenes';
import { ActorAuthorityAtlas } from './ActorAuthorityAtlas';
import { WorkflowStudio } from './WorkflowStudio';
import { AuthorityChallenge, CommunicationDrill, IncidentCaseboard } from './Exercises';
import './lesson.css';

export interface TeachingSection { index:number; stage:string; title:string; body:string; slug:string; }
export function parseTeachingSections(markdown:string):TeachingSection[]{
  const blocks=markdown.split(/(?=^## )/m).filter(s=>s.startsWith('## '));
  return blocks.map((block,index)=>{
    const newline=block.indexOf('\n');
    const heading=block.slice(3,newline).trim();
    const cut=heading.indexOf(' — ');
    const stage=cut<0?'Study':heading.slice(0,cut);
    const title=cut<0?heading:heading.slice(cut+3);
    return {index,stage,title,body:block.slice(newline+1).trim(),slug:'section-'+(index+1)};
  });
}
export const teachingSections=parseTeachingSections(rawLesson);
const glossary=[
  {term:'Actor',definition:'A participant occupying a role with a goal in a business interaction; not a software deployment.'},
  {term:'Stakeholder',definition:'Someone affected by or interested in a system, who may never operate it.'},
  {term:'Role',definition:'The capacity and permissions under which a person or agent acts.'},
  {term:'Entity',definition:'A business object with enduring identity (e.g. Order or PaymentAttempt), not necessarily a participant.'},
  {term:'Capability',definition:'A stable ability the business must offer regardless of implementation topology.'},
  {term:'Use case',definition:'A goal-oriented interaction with trigger and observable result.'},
  {term:'Responsibility',definition:'A party’s obligation to act or account for a result.'},
  {term:'Decision authority',definition:'The party/policy entitled to approve or reject a business proposition.'},
  {term:'Fact authority',definition:'The source whose evidence confirms an actual event or external operation.'},
  {term:'Accountability',definition:'Who answers for a business outcome even when execution is delegated.'},
];
function EvidenceBoundary(){
  return <aside className="l111-boundary-panel"><span className="eyebrow">EVIDENCE AND PROJECT BOUNDARY · TYPE C</span>
    <h3>Domain design is not an implemented runtime guarantee</h3>
    <p>The actor map, branching journey and diagnostic caseboard use clearly labeled training assumptions. This conceptual lesson did not change the Java project. Lesson 1.1.2 later introduced verified order-request intake only; there is still no merchant approval, provider charge or production telemetry proving this model.</p>
    <div className="l111-link-row">
      <a href={academyRepo+'/blob/main/docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md'} target="_blank" rel="noreferrer">Review domain discovery contract ↗</a>
      <a href={platformRepo+'/tree/'+platformPlanningSha} target="_blank" rel="noreferrer">Platform planning SHA {platformPlanningSha.slice(0,12)} ↗</a>
    </div>
  </aside>;
}
function RetentionCard(){
  const [revealed,setRevealed]=useState(false);
  return <div className="l111-retain"><h3>Transfer challenge: hotel reservation</h3><p>A guest books a room, an online platform displays “confirmed,” a property operator reports no availability, and the payment provider shows an approval. From memory, identify who requested, who decides inventory, who is authoritative for financial facts, and who owes the guest a resolution.</p>
    <button type="button" className="button secondary" onClick={()=>setRevealed(!revealed)}>{revealed?'Hide model reasoning':'Show model reasoning after your own attempt'}</button>
    {revealed&&<div className="l111-feedback pass"><b>Transfer model</b><p>Guest owns the booking intent; the property controls inventory/fulfillment authority; provider attests to provider financial operation; platform is accountable for coordinating and explaining contradictory promises. “Confirmed reservation” and “guaranteed physical room access” are distinct business propositions. What cancellation policy applies remains a stakeholder question.</p></div>}
  </div>;
}
export default function Lesson111(){
  const [searchParams,setSearchParams]=useSearchParams();
  const requested=Number(searchParams.get('section')??'1');
  const active=Number.isInteger(requested)&&requested>=1&&requested<=teachingSections.length?requested-1:0;
  const section=teachingSections[active]??teachingSections[0];
  const [showGlossary,setShowGlossary]=useState(false);
  const stageCount=useMemo(()=>new Set(teachingSections.map(s=>s.stage)).size,[]);
  const go=(target:number)=>setSearchParams({section:String(Math.max(1,Math.min(teachingSections.length,target+1)))});
  const next=()=>go(active+1);
  const previous=()=>go(active-1);
  return <div className="l111-page" data-testid="lesson-1.1.1">
    <header className="l111-hero">
      <div>
        <span className="eyebrow">CLUSTER 1.1 · CHAPTER 1 · FULL LESSON 1.1.1</span>
        <h1>Actors, goals, <em>responsibilities & capabilities</em></h1>
        <p>Who participates in a Food Ordering workflow, and who has authority over each business result?</p>
        <div className="l111-meta"><span>Conceptual domain discovery</span><span>{teachingSections.length} sections · {stageCount} learning stages</span></div>
      </div>
      <button type="button" className="l111-glossary-toggle" aria-expanded={showGlossary} onClick={()=>setShowGlossary(!showGlossary)}>{showGlossary?'Hide terminology':'Key terminology'} ↗</button>
    </header>
    <div className="l111-progress" aria-label="Lesson navigation progress"><div className="l111-progress-track"><span style={{width:((active+1)/teachingSections.length*100)+'%'}} /></div><span>Part {active+1} of {teachingSections.length}</span></div>
    <div className="l111-main">
        {showGlossary&&<aside className="l111-glossary" aria-label="Key terminology"><h3>Conceptual vocabulary</h3><div className="l111-glossary-grid">{glossary.map(g=><div key={g.term}><b>{g.term}</b><p>{g.definition}</p></div>)}</div></aside>}
        <div className="l111-section-heading"><span className="eyebrow">{section.stage.toUpperCase()} · SECTION {String(active+1).padStart(2,'0')} / {teachingSections.length}</span><h2>{section.title}</h2></div>
        <StoryCanvas key={active} markdown={section.body} scene={authorityScenes[active]} editorial={editorialFor('1.1.1',active)} visuals={visualsFor('1.1.1',active)}>
          {active===5?<ActorAuthorityAtlas/>
            :active===6?<WorkflowStudio/>
            :active===7?<AuthorityChallenge/>
            :active===8?<IncidentCaseboard/>
            :active===11?<CommunicationDrill/>
            :active===12?<RetentionCard/>
            :active===9?<div className="l111-reference"><span className="eyebrow">REAL PROJECT · DOMAIN ARTIFACT</span><h3>Actor / capability / decision authority baseline</h3><p>The discovery artifact includes stakeholder inventory, accountability matrix, six worked scenarios, conflicts, and next-lesson entry conditions. It is a versioned design artifact, not backend code.</p><a href={academyRepo+'/blob/main/docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md'} target="_blank" rel="noreferrer">Open complete domain discovery document ↗</a></div>
            :active===10?<EvidenceBoundary/>
            :null}
        </StoryCanvas>
        <div className="l111-controls"><button type="button" className="button secondary" onClick={previous} disabled={active===0}>← Previous section</button>{active<teachingSections.length-1?<button type="button" className="button primary" onClick={next}>Continue: {teachingSections[active+1]?.stage} →</button>:<Link to="/blueprint" className="button primary">Return to Cluster 1.1 blueprint ↗</Link>}</div>
        <div className="l111-source"><span>Authoritative lesson text · v1.1.1</span><a href={academyRepo+'/blob/main/content/lessons/1.1.1.md'} target="_blank" rel="noreferrer">Read complete Markdown manuscript ↗</a></div>
    </div>
  </div>;
}
