import {useEffect, useMemo, type ReactNode} from 'react';
import {useLocation} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {sectionMenuTitle} from '../../components/sectionNavigation';
import './textbook.css';

export interface TextbookSection {index:number;stage:string;title:string;body:string}
export interface EmbeddedLab {afterBlock:number;content:ReactNode;label:string}
export interface TextbookMeta {
 id:'1.1.1'|'1.1.2'; title:ReactNode;subtitle:string;provenance:string;
 repoUrl:string;sections:TextbookSection[];labs?:Record<number,EmbeddedLab>;footer?:ReactNode;
}
export const sourceBlocks=(s:string)=>s.trim().split(/\n\s*\n/).filter(Boolean);
export interface StructuredSource {lead:string;parts:string[];labels:string[];tail:string;kind:'definitions'|'steps'|'criteria'|'authority'|'questions'|'ownership'}
type Spec={section:number;block:number;kind:StructuredSource['kind'];markers:string[];labels:string[];tail?:string;lead?:string};
const specs:Record<'1.1.1'|'1.1.2',Spec[]>={
 '1.1.1':[
 {section:2,block:0,kind:'definitions',markers:['A goal','An incentive','A responsibility','A capability'],labels:['Goal','Incentive','Responsibility','Capability'],tail:'These four are related'},
 {section:3,block:3,kind:'ownership',markers:['desired business outcome','accountable organization/role','initiating','decision','observers'],labels:['Outcome','Accountability','Initiators','Decision authority','Observers']},
 {section:4,block:0,kind:'authority',markers:['**Request authority**','**Policy authority**','**Decision authority**','**Fact authority**'],labels:['Request','Policy','Decision','Fact'],tail:'These layers often belong to different actors.'},
 {section:8,block:1,kind:'steps',markers:['(1)','(2)','(3)'],labels:['Policy disagreement','Missing guard','Stale presentation']},
 {section:10,block:2,kind:'questions',markers:['(1)','(2)','(3)'],labels:['Domain contract','Learning model','Actual Java']}
 ],
 '1.1.2':[
 {section:1,block:0,kind:'definitions',markers:['A **business capability**','A **use case**','A **user story**','An **endpoint**'],labels:['Business capability','Use case','User story','Endpoint']},
 {section:1,block:2,kind:'definitions',markers:['customer requested purchase','platform recorded the request','restaurant accepted fulfillment','provider confirmed'],labels:['Customer intent','Platform intake','Restaurant acceptance','Provider result']},
 {section:2,block:1,kind:'steps',markers:['(1)','(2)','(3)','(4)','(5)','(6)','(7)','(8)'],labels:['Parse and validate','Translate the command','Resolve demo catalog','Apply business guards','Calculate synthetic quote','Create immutable intake','Store the resource','Return truthful 201']},
 {section:3,block:1,kind:'definitions',markers:['A **trigger**','A **precondition**','A **guard**','A **postcondition**'],labels:['Trigger','Precondition','Guard','Postcondition'],tail:'In this lesson'},
 {section:8,block:1,kind:'criteria',markers:['AC-01:','AC-02:','AC-03:','AC-04:','AC-05:','AC-06:','AC-07:'],labels:['AC-01','AC-02','AC-03','AC-04','AC-05','AC-06','AC-07']},
 {section:10,block:1,kind:'definitions',markers:['A deterministic React scenario engine','A TypeScript unit test','A Java service test','A Spring MVC integration test','A packaged jar'],labels:['Model','TypeScript test','Java unit test','MVC integration','Runnable jar'],tail:'None proves live payment settlement'}
 ]
};
export const structuralSpec=(id:'1.1.1'|'1.1.2',section:number,block:number)=>specs[id].find(s=>s.section===section&&s.block===block);
export function structureSource(source:string,spec:Spec):StructuredSource|null{
 const starts=spec.markers.map(m=>source.indexOf(m));
 if(starts.some(i=>i<0)||starts.some((i,n)=>n>0&&i<=starts[n-1]))return null;
 const end=spec.tail?source.indexOf(spec.tail,starts[starts.length-1]):source.length;
 if(end<0)return null;
 const parts=starts.map((pos,i)=>source.slice(pos,i<starts.length-1?starts[i+1]:end).trim());
 if(parts.some(p=>!p))return null;
 const lead=source.slice(0,starts[0]).trim();
 return {lead:spec.lead??lead,parts,labels:spec.labels,tail:source.slice(end).trim(),kind:spec.kind};
}
function Prose({text}:{text:string}){
 return <div className="textbook-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown></div>;
}
export function readingThoughts(source:string):string[]{
 if(source.split(/\s+/).length<65||source.includes('\n')||/^#{1,5}\s/.test(source))return [source];
 const sentences=source.split(/(?<=[.!?])\s+(?=(?:[“"]?[A-Z]|\*\*[A-Z]))/);
 if(sentences.length<3)return [source];
 const thoughts:string[]=[];let current='';
 for(const sentence of sentences){
  if(current&&current.split(/\s+/).length+sentence.split(/\s+/).length>45){thoughts.push(current);current=sentence}
  else current+=(current?' ':'')+sentence;
 }
 if(current)thoughts.push(current);
 return thoughts;
}
function StructuredFigure({source,meaning}:{source:string;meaning:StructuredSource}){
 const isSteps=meaning.kind==='steps'||meaning.kind==='questions';
 const heading=meaning.kind==='criteria'?'Acceptance criteria · individually testable':
  meaning.kind==='steps'&&meaning.parts.length===8?'UC-001 · From HTTP request to intake':
  meaning.kind==='authority'?'Four distinct sources of authority':
  meaning.kind==='ownership'?'Capability ownership checklist':'Concepts and their boundaries';
 return <figure className={'textbook-figure figure-'+meaning.kind} data-testid={'textbook-'+meaning.kind}>
  <figcaption><span>{meaning.kind.toUpperCase()}</span><strong>{heading}</strong></figcaption>
  {meaning.lead&&<Prose text={meaning.lead}/>}
  {isSteps?<ol className="textbook-timeline">{meaning.parts.map((part,i)=><li key={i}>
   <span className="textbook-step-index">{String(i+1).padStart(2,'0')}</span>
   <div><h4>{meaning.labels[i]}</h4><Prose text={part.replace(/^\(\d+\)\s*/, '')}/></div>
  </li>)}</ol>:<dl className="textbook-definition-list">{meaning.parts.map((part,i)=><div key={i}>
    <dt>{meaning.labels[i]}</dt><dd><Prose text={part}/></dd>
  </div>)}</dl>}
  {meaning.tail&&<div className="textbook-figure-conclusion"><Prose text={meaning.tail}/></div>}
  <details className="textbook-source-check"><summary>Compare with original paragraph</summary><Prose text={source}/></details>
 </figure>;
}
function LessonBlock({id,sectionIndex,blockIndex,source}:{id:'1.1.1'|'1.1.2';sectionIndex:number;blockIndex:number;source:string}){
 const spec=structuralSpec(id,sectionIndex,blockIndex);
 const visual=spec?structureSource(source,spec):null;
 if(visual)return <StructuredFigure source={source} meaning={visual}/>;
 const thoughts=readingThoughts(source);
 return thoughts.length===1?<Prose text={source}/>:<div className="textbook-thoughts">{thoughts.map((x,i)=><Prose text={x} key={i}/>)}</div>;
}
export default function TextbookReader({meta}:{meta:TextbookMeta}){
 const location=useLocation();
 const selected=Number(new URLSearchParams(location.search).get('section')??'1');
 const sections=meta.sections;
 useEffect(()=>{
  if(!location.search.includes('section='))return;
  const target=Number.isInteger(selected)&&selected>=1&&selected<=sections.length?selected:1;
  const id=window.setTimeout(()=>document.getElementById('topic-'+target)?.scrollIntoView({block:'start'}),75);
  return ()=>window.clearTimeout(id);
 },[selected,location.pathname,location.search,sections.length]);
 const count=useMemo(()=>sections.reduce((n,s)=>n+sourceBlocks(s.body).length,0),[sections]);
 return <article className="textbook-lesson" data-testid={'lesson-'+meta.id}>
  <header className="textbook-lesson-head">
   <span className="textbook-kicker">CLUSTER 1.1 / CHAPTER 01 / LESSON {meta.id}</span>
   <h1>{meta.title}</h1><p className="textbook-deck">{meta.subtitle}</p>
   <div className="textbook-context"><span>{sections.length} connected topics</span><span>{count} source passages</span><span>{meta.provenance}</span></div>
   <div className="textbook-opening-rule"/>
   <p className="textbook-reading-intro">Read this lesson continuously, or jump to a topic in the left outline. Diagrams and exercises appear beside the explanations they clarify.</p>
  </header>
  {sections.map((section,i)=>{
    const blocks=sourceBlocks(section.body),lab=meta.labs?.[i];
    return <section className="textbook-topic" key={i} id={'topic-'+(i+1)} data-testid={'textbook-topic-'+(i+1)} aria-labelledby={'topic-title-'+(i+1)}>
     <header className="textbook-topic-head"><span className="textbook-topic-number">{String(i+1).padStart(2,'0')} / {String(sections.length).padStart(2,'0')}</span>
      <div><span className="textbook-topic-stage">{section.stage}</span><h2 id={'topic-title-'+(i+1)}>{sectionMenuTitle(meta.id,i,section.title)}</h2><p className="textbook-topic-subtitle">{section.title}</p></div>
     </header>
     <div className="textbook-topic-body">
      {blocks.map((block,j)=><div className="textbook-reading-unit" data-source-block={j} key={j}>
       <LessonBlock id={meta.id} sectionIndex={i} blockIndex={j} source={block}/>
       {lab?.afterBlock===j&&<div className="textbook-lab" aria-label={lab.label} data-testid={'embedded-lab-'+(i+1)}>
         <div className="textbook-lab-kicker"><span>APPLY THE IDEA</span><span>LAB · {String(i+1).padStart(2,'0')}</span></div>{lab.content}
       </div>}
      </div>)}
     </div>
    </section>;
  })}
  <footer className="textbook-end">
   <span className="textbook-kicker">AUTHORITATIVE SOURCE</span>
   <p>All {sections.length} topics retain their original manuscript content in sequence. Source links and engineering evidence remain available for verification.</p>
   <a href={meta.repoUrl} target="_blank" rel="noreferrer">Open complete manuscript ↗</a>
   {meta.footer}
  </footer>
 </article>;
}
