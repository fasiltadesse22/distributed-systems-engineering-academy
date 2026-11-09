import {useMemo,useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {ReadingArticle,buildReadingRanges,beatForBlock} from './ReadingArticle';
import {kindNames} from './readingEditorial';
import type {ReadingEditorial} from './readingEditorial';
import './story.css';

export interface StoryNode {
  title:string;
  caption:string;
  explanation:string;
  status?:'modeled'|'implemented'|'future'|'uncertain';
}
export interface StoryScene {
  eyebrow:string;
  question:string;
  outcome:string;
  nodes:StoryNode[];
  shiftTitle:string;
  shiftExplanation:string;
  practiceQuestion:string;
}
export interface ReadingBeat {
  heading:string;
  markdown:string;
  count:number;
}

const summarize=(content:string)=>{
 const clean=content.replace(/^#{3,}\s+/gm,'').replace(/[*_~]/g,'').replace(/[\[\]<>]/g,'').replace(/^\d+\.\s*/gm,'').replace(/\s+/g,' ').trim();
 return clean.length>66?clean.slice(0,63).trimEnd()+'…':clean;
};

/** Present the full authored manuscript without summarizing or deleting a paragraph.
 * Blocks are re-grouped for progressive disclosure; View all exposes every block. */
export function splitIntoReadingBeats(markdown:string):ReadingBeat[]{
 const blocks=markdown.trim().split(/\n\s*\n/).filter(Boolean);
 const result:ReadingBeat[]=[];
 let active:string[]=[],count=0;
 const save=()=>{
  if(!active.length)return;
  const text=active.join('\n\n');
  const heading=active.find(x=>/^###\s+/.test(x))?.replace(/^###\s+/,'').trim()??summarize(active[0]);
  result.push({heading,markdown:text,count:text.trim().split(/\s+/).length});
  active=[];count=0;
 };
 for(const block of blocks){
  const words=block.trim().split(/\s+/).length;
  if(/^###\s+/.test(block) && active.length)save();
  if(count>=145 && active.length && !/^###\s+/.test(active[0]) )save();
  active.push(block);
  count+=words;
  if(count>=245)save();
 }
 save();
 return result;
}

function StoryMap({scene}:{scene:StoryScene}){
 const [selected,setSelected]=useState(0),[showShift,setShowShift]=useState(false);
 const item=scene.nodes[selected]??scene.nodes[0];
 return <div className="story-map" data-testid="story-map">
   <div className="story-map-header"><div><span className="story-eyebrow">{scene.eyebrow}</span><h3>Explore the mechanism</h3></div><span className="story-map-hint">Select any step to explain it <span aria-hidden="true">↗</span></span></div>
   <div className="story-model" role="group" aria-label="Interactive concept and causal model">
     {scene.nodes.map((node,i)=><div className="story-node-wrap" key={node.title}>
       <button type="button" aria-pressed={selected===i} aria-label={'Inspect '+node.title} onClick={()=>{setSelected(i);setShowShift(false)}} className={'story-node '+(selected===i?'selected ':'')+(node.status??'modeled')}>
         <span className="story-node-top"><span>{String(i+1).padStart(2,'0')}</span><span className="story-status">{node.status==='implemented'?'IN CODE':node.status==='future'?'FUTURE':node.status==='uncertain'?'OPEN':'MODEL'}</span></span>
         <strong>{node.title}</strong><small>{node.caption}</small>
       </button>
       {i!==scene.nodes.length-1&&<span className="story-connector" aria-hidden="true">›</span>}
     </div>)}
   </div>
   <div className="story-inspector" role="region" aria-live="polite" aria-label="Selected step explanation">
      <div className="story-inspector-icon" aria-hidden="true">{String(selected+1).padStart(2,'0')}</div>
      <div><span className="story-eyebrow">WHY THIS STEP MATTERS</span><h4>{item.title}</h4><p>{item.explanation}</p></div>
   </div>
   <div className="story-model-footer">
     <p>{scene.outcome}</p>
     <button type="button" className="story-what-if" aria-expanded={showShift} onClick={()=>setShowShift(!showShift)}>{showShift?'Hide the counterexample':'What changes if…?'} <span aria-hidden="true">↗</span></button>
   </div>
   {showShift&&<aside className="story-shift" role="status"><strong>{scene.shiftTitle}</strong><p>{scene.shiftExplanation}</p></aside>}
 </div>;
}

export function StoryCanvas({markdown,scene,children,editorial}:{markdown:string;scene:StoryScene;children?:React.ReactNode;editorial?:ReadingEditorial}){
 const beats=useMemo(()=>splitIntoReadingBeats(markdown),[markdown]);
 const ranges=useMemo(()=>buildReadingRanges(beats),[beats]);
 const [beatIndex,setBeatIndex]=useState(0);
 const [mode,setMode]=useState<'guided'|'all'>('guided');
 const [revealed,setRevealed]=useState(false);
 const [textSize,setTextSize]=useState(0);
 const [wide,setWide]=useState(false);
 const [cues,setCues]=useState(true);
 const selected=beats[beatIndex]??beats[0];
 const momentNotes=editorial?.annotations??[];
 const jumpTo=(block:number)=>{setBeatIndex(beatForBlock(ranges,block));setMode('guided')};
 return <div className="story-canvas" data-testid="guided-story">
   <div className="story-question"><div className="story-question-kicker"><span className="story-question-dot"/> ENGINEERING QUESTION</div><h3>{scene.question}</h3><p>Start with the model. Explore a decision. Then study the complete explanation in manageable steps.</p></div>
   <StoryMap scene={scene}/>
   {children&&<section className="story-lab-slot" aria-label="Interactive practice">
     <div className="story-lab-label"><span className="story-eyebrow">HANDS-ON EXPLORATION</span><span>Test the model before reading the answer</span></div>{children}
   </section>}
   <section className="story-reading" aria-label="Deep technical explanation">
    <div className="story-reading-head">
      <div><span className="story-eyebrow">DEEP EXPLANATION · CURATED READING EDITION</span><h3>Read for the reasoning—not just the words</h3><p>The complete manuscript is preserved. Color has a specific meaning: concept, mechanism, example, limit, evidence, or practice.</p></div>
      <div className="story-view-switch" role="group" aria-label="Reading mode">
        <button type="button" aria-pressed={mode==='guided'} className={mode==='guided'?'current':''} onClick={()=>setMode('guided')}>Guided steps</button>
        <button type="button" aria-pressed={mode==='all'} className={mode==='all'?'current':''} onClick={()=>setMode('all')}>Read all</button>
      </div>
    </div>
    {editorial&&<div className="reader-reading-path" data-testid="reading-highlights">
      <div className="reader-reading-path-heading"><h4>Three moments worth understanding</h4><small>{editorial.lens}</small></div>
      <div className="reader-moments">{momentNotes.map(note=><button type="button" key={note.block} data-kind={note.kind} className="reader-moment"
        aria-label={'Jump to '+note.title} aria-current={mode==='guided'&&beatIndex===beatForBlock(ranges,note.block)?'step':undefined}
        onClick={()=>jumpTo(note.block)}>
        <span className="reader-cue-label">{kindNames[note.kind]}</span><strong>{note.title}</strong><small>{note.why}</small>
      </button>)}</div>
    </div>}
    <div className="reader-reading-tools" aria-label="Reader preferences">
      <span>Reading preferences</span>
      <div className="reader-lens-controls">
        <div className="reader-adjust-buttons" role="group" aria-label="Text size">
          <button type="button" aria-label="Decrease text size" disabled={textSize===0} onClick={()=>setTextSize(size=>Math.max(0,size-1))}>A−</button>
          <button type="button" aria-label="Increase text size" disabled={textSize===2} onClick={()=>setTextSize(size=>Math.min(2,size+1))}>A+</button>
        </div>
        <button type="button" className="reader-lens-button" aria-pressed={wide} onClick={()=>setWide(!wide)}>{wide?'Comfort width':'Wider text'}</button>
        <button type="button" className="reader-lens-button" aria-pressed={cues} onClick={()=>setCues(!cues)}>{cues?'Highlights on':'Highlights off'}</button>
      </div>
    </div>
    {mode==='guided'?<>
      <div className="story-step-rail" role="group" aria-label="Reading step navigation">{beats.map((beat,i)=><button type="button" key={i} aria-label={'Read step '+(i+1)+': '+beat.heading} aria-current={beatIndex===i?'step':undefined} className={beatIndex===i?'current':''} onClick={()=>setBeatIndex(i)}><span>{String(i+1).padStart(2,'0')}</span><small>{beat.heading}</small></button>)}</div>
      <article className="story-prose-card" data-testid="reading-step">
        <div className="story-prose-top"><span className="story-eyebrow">READING STEP {String(beatIndex+1).padStart(2,'0')} / {String(beats.length).padStart(2,'0')}</span><span>{selected.count} words · full source</span></div>
        <ReadingArticle markdown={selected.markdown} offset={ranges[beatIndex]?.start??0} editorial={editorial} cues={cues} textSize={textSize} wide={wide}/>
      </article>
      <div className="story-reading-actions"><span className="story-reading-note">Your reading position is kept as you inspect the diagram.</span><div><button type="button" disabled={beatIndex===0} onClick={()=>setBeatIndex(i=>Math.max(0,i-1))}>← Previous idea</button>{beatIndex<beats.length-1?<button type="button" className="next" onClick={()=>setBeatIndex(i=>Math.min(beats.length-1,i+1))}>Next idea →</button>:<button type="button" className="next" onClick={()=>setMode('all')}>Review complete explanation ↗</button>}</div></div>
    </>:<div className="story-all-reading" data-testid="full-reading">{beats.map((beat,i)=><article className="story-prose-card" key={i}><div className="story-prose-top"><span className="story-eyebrow">IDEA {String(i+1).padStart(2,'0')} / {String(beats.length).padStart(2,'0')}</span><span>{beat.count} words · complete text</span></div><ReadingArticle markdown={beat.markdown} offset={ranges[i]?.start??0} editorial={editorial} cues={cues} textSize={textSize} wide={wide}/></article>)}</div>}
   </section>
   <div className="story-reflection"><div><span className="story-eyebrow">CHECK YOUR UNDERSTANDING</span><h3>{scene.practiceQuestion}</h3><p>Explain your reasoning aloud before comparing it to the lesson's central distinction.</p></div><button type="button" aria-expanded={revealed} onClick={()=>setRevealed(!revealed)}>{revealed?'Hide key distinction':'Reveal key distinction'}</button>{revealed&&<div className="story-reflection-answer" role="status"><b>Key distinction</b><p>{scene.outcome}</p></div>}</div>
 </div>;
}
