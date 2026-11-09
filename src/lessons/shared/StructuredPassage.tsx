import {useMemo,useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type {VisualSpec} from './structuredVisuals';
import './structured.css';

export interface VisualItem {label:string;source:string;insight:string}
export interface ParsedVisual {lead:string;items:VisualItem[];tail:string;source:string}

function stripOuterMarkdown(value:string){return value.replace(/^\*\*/,'').replace(/\*\*$/,'').trim()}
function itemsByMarkers(source:string,regex:RegExp){
 const matches=[...source.matchAll(regex)];
 if(!matches.length)return null;
 return {lead:source.slice(0,matches[0].index).trim(),matches,
  parts:matches.map((m,i)=>source.slice((m.index??0)+m[0].length,i+1<matches.length?matches[i+1].index:source.length).trim())};
}

/** Parses only specifically curated structures. If a manuscript changes and its
 * anchor is no longer valid the integrity tests fail instead of rendering guesses. */
export function parseStructuredParagraph(source:string,spec:VisualSpec):ParsedVisual|null{
 let lead='',tail='',parts:string[]=[];
 if(spec.type==='numbered'){
  const data=itemsByMarkers(source,/\((\d+)\)\s*/g);
  if(!data||!data.matches.every((m,i)=>Number(m[1])===i+1))return null;
  lead=data.lead;
  parts=data.parts;
  if(spec.suffixMarker){
   const last=parts.length-1;
   const at=parts[last]?.indexOf(spec.suffixMarker)??-1;
   if(at<0)return null;
   tail=parts[last].slice(at).trim();
   parts[last]=parts[last].slice(0,at).trim();
  }
 }else if(spec.type==='criteria'){
  const data=itemsByMarkers(source,/AC-(\d{2}):\s*/g);
  if(!data||!data.matches.every((m,i)=>Number(m[1])===i+1))return null;
  lead=data.lead;parts=data.parts;
 }else if(spec.type==='chain'){
  if(!spec.chainStart||!spec.chainEnd)return null;
  const a=source.indexOf(spec.chainStart);
  const b=source.indexOf(spec.chainEnd,a);
  if(a<0||b<a)return null;
  lead=source.slice(0,a).replace(/\*\*$/,'').trim();
  tail=source.slice(b+spec.chainEnd.length).replace(/^\*\*/,'').trim();
  parts=source.slice(a,b+spec.chainEnd.length).split(/\s*→\s*/).map(stripOuterMarkdown);
 }else if(spec.type==='authorities'){
  const data=itemsByMarkers(source,/\*\*(Request authority|Policy authority|Decision authority|Fact authority)\*\*\s*/g);
  if(!data)return null;
  lead=data.lead;
  parts=data.parts;
  const marker='These layers often belong to different actors.';
  const last=parts.length-1;
  const i=parts[last]?.indexOf(marker)??-1;
  if(i<0)return null;
  tail=parts[last].slice(i).trim();
  parts[last]=parts[last].slice(0,i).trim();
 }else if(spec.type==='propositions'){
  const start=source.indexOf(': ');
  const boundary='. Each has different authority and evidence.';
  const end=source.indexOf(boundary,start);
  if(start<0||end<0)return null;
  lead=source.slice(0,start+1).trim();
  parts=source.slice(start+2,end).split(';').map(x=>x.trim()).filter(Boolean);
  tail=source.slice(end+2).trim();
 }else if(spec.type==='checklist'){
  const startMarker='five entries per capability:';
  const endMarker='. Without those entries,';
  const start=source.indexOf(startMarker);
  const end=source.indexOf(endMarker,start);
  if(start<0||end<0)return null;
  lead=source.slice(0,start+startMarker.length).trim();
  parts=source.slice(start+startMarker.length,end).split(';').map(x=>x.trim()).filter(Boolean);
  tail=source.slice(end+2).trim();
 }else if(spec.type==='evidence'){
  const markers=['A deterministic React scenario engine','A TypeScript unit test','A Java service test','A Spring MVC integration test','A packaged jar'];
  const indices=markers.map(m=>source.indexOf(m));
  const closing='None proves live payment settlement';
  const end=source.indexOf(closing);
  if(indices.some(n=>n<0)||end<0||end<=indices[4]||indices.some((n,i)=>i>0&&n<=indices[i-1]))return null;
  lead=source.slice(0,indices[0]).trim();
  parts=indices.map((start,i)=>source.slice(start,i+1<indices.length?indices[i+1]:end).trim());
  tail=source.slice(end).trim();
 }else if(spec.type==='status'){
  const markers=['The first category is rejected','The remaining business rejections','GET of a missing intake'];
  const indices=markers.map(m=>source.indexOf(m));
  if(indices.some(n=>n<0)||indices.some((n,i)=>i>0&&n<=indices[i-1]))return null;
  lead=source.slice(0,indices[0]).trim();
  parts=indices.map((start,i)=>source.slice(start,i+1<indices.length?indices[i+1]:source.length).trim());
 }
 if(parts.length===0||parts.some(p=>!p))return null;
 const labels=spec.labels??(spec.type==='chain'?parts.map(stripOuterMarkdown):[]);
 if(labels.length!==parts.length||spec.insights?.length!==parts.length)return null;
 return {lead,items:parts.map((part,i)=>({label:labels[i],source:part,insight:spec.insights![i]})),tail,source};
}

function MarkdownSegment({text}:{text:string}){
 return <div className="structured-prose markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown></div>;
}

const typeDescription:Record<VisualSpec['type'],string>={
 numbered:'STEP-BY-STEP EXECUTION',criteria:'TESTABLE ACCEPTANCE MATRIX',chain:'REASONING SEQUENCE',
 authorities:'DECISION RIGHTS',propositions:'DISTINCT BUSINESS FACTS',status:'REJECTION PATHS',
 checklist:'CAPABILITY CONTRACT',evidence:'EVIDENCE HIERARCHY'
};
const typeQuestion:Record<VisualSpec['type'],string>={
 numbered:'Select a step to explain its responsibility and limit.',
 criteria:'Select a criterion to understand what its result can and cannot prove.',
 chain:'Trace each dependency before treating the final outcome as established.',
 authorities:'Who owns each right, and what does not follow from it?',
 propositions:'These facts need different authorities and evidence.',
 status:'Do not handle every negative HTTP status as the same kind of failure.',
 checklist:'Each entry answers a different business-ownership question.',
 evidence:'Select an evidence level to inspect the exact claim it supports.'
};

export default function StructuredPassage({source,spec}:{source:string;spec:VisualSpec}){
 const parsed=useMemo(()=>parseStructuredParagraph(source,spec),[source,spec]);
 const [active,setActive]=useState(0);
 if(!parsed)return <div className="structured-parse-fallback" data-testid="visual-fallback">
   <MarkdownSegment text={source}/>
   <p>Original source retained. Structured rendering requires review of the changed manuscript.</p>
 </div>;
 const isFlow=spec.type==='numbered'||spec.type==='chain';
 return <section className={'structured-visual visual-'+spec.type}
   aria-label={spec.title} data-testid={'visual-'+spec.type}>
   <header className="structured-head">
     <div><span className="structured-eyebrow">{typeDescription[spec.type]}</span>
       <h4>{spec.title}</h4><p>{spec.subtitle}</p></div>
     <span className="structured-count">{parsed.items.length} {isFlow?'stages':'parts'}</span>
   </header>
   {parsed.lead&&<div className="structured-opening"><MarkdownSegment text={parsed.lead}/></div>}
   {spec.phases&&<div className="structured-phase-map" aria-label="Business execution layers" data-testid="execution-layers">
      <div className="structured-phase-heading"><strong>From intent to a truthful local fact</strong><small>Choose a layer to inspect its first step · one Java process</small></div>
      <div className="structured-phases">{spec.phases.map((phase,i)=><button type="button" key={phase.label}
         aria-label={'Inspect layer '+phase.label}
         aria-pressed={active>=phase.from&&active<=phase.to}
         className={active>=phase.from&&active<=phase.to?'active':''} onClick={()=>setActive(phase.from)}>
         <span className="structured-phase-index">0{i+1}</span>
         <strong>{phase.label}</strong>
         <small>{phase.detail}</small>
         <span className="structured-phase-range">Steps {phase.from+1}{phase.from!==phase.to?'–'+(phase.to+1):''}</span>
       </button>)}</div>
      <p className="structured-phase-boundary">Restaurant acceptance and a payment-provider result are <strong>not</strong> part of this executed path.</p>
   </div>}
   {isFlow?<ol className="structured-timeline" aria-label={spec.title+' steps'}>
     {parsed.items.map((item,i)=><li key={i} className={active===i?'selected':''}>
       <div className="structured-rail" aria-hidden="true"><span>{String(i+1).padStart(2,'0')}</span></div>
       <div className="structured-step">
         <button type="button" className="structured-step-trigger" aria-pressed={active===i}
           aria-label={'Explain step '+(i+1)+': '+item.label} onClick={()=>setActive(i)}>
           <strong>{item.label}</strong><span>{active===i?'Selected':'Explain this stage'} <span aria-hidden="true">↗</span></span>
         </button>
         <MarkdownSegment text={item.source}/>
         {active===i&&<aside className="structured-inline-insight" role="status" aria-label="Why this step matters">
           <strong>Why this matters</strong><p>{item.insight}</p>
         </aside>}
       </div>
     </li>)}
   </ol>:<div className={'structured-grid'+(parsed.items.length>=5?' large':'')} role="group" aria-label={spec.title+' items'}>
     {parsed.items.map((item,i)=><div key={i} className={'structured-tile'+(active===i?' selected':'')}>
       <button type="button" className="structured-tile-trigger" aria-pressed={active===i}
         aria-label={'Inspect '+item.label} onClick={()=>setActive(i)}>
         <span className="structured-tile-index">{spec.type==='criteria'?'AC-'+String(i+1).padStart(2,'0'):String(i+1).padStart(2,'0')}</span>
         <strong>{item.label}</strong>
       </button>
       <div className="structured-tile-copy"><MarkdownSegment text={item.source}/></div>
     </div>)}
   </div>}
   {!isFlow&&<aside className="structured-why" aria-live="polite" aria-label="Selected item explanation">
     <div className="structured-why-mark" aria-hidden="true">{String(active+1).padStart(2,'0')}</div>
     <div><span className="structured-eyebrow">WHY IT MATTERS · {parsed.items[active].label}</span><p>{parsed.items[active].insight}</p></div>
   </aside>}
   {parsed.tail&&<div className="structured-conclusion"><MarkdownSegment text={parsed.tail}/></div>}
   <div className="structured-footer">
     <span>{typeQuestion[spec.type]}</span>
     <details className="structured-source">
       <summary>Show original paragraph</summary>
       <div className="structured-source-text"><MarkdownSegment text={source}/></div>
     </details>
   </div>
 </section>;
}
