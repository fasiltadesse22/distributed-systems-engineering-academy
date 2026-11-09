import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {kindNames} from './readingEditorial';
import type {ReadingAnnotation,ReadingEditorial,ReadingKind} from './readingEditorial';
import './reader.css';
import StructuredPassage from './StructuredPassage';
import type {VisualSpec} from './structuredVisuals';

export const readingBlocks=(markdown:string)=>markdown.trim().split(/\n\s*\n/).filter(Boolean);
export interface ReadingRange {start:number;end:number}
export function buildReadingRanges(beats:{markdown:string}[]):ReadingRange[]{
 let next=0;
 return beats.map(beat=>{
  const start=next;
  next+=readingBlocks(beat.markdown).length;
  return {start,end:next};
 });
}
export function beatForBlock(ranges:ReadingRange[],block:number){
 const i=ranges.findIndex(range=>block>=range.start&&block<range.end);
 return Math.max(0,i);
}

const description:Record<ReadingKind,string>={
 concept:'The definition or distinction on which later reasoning depends.',
 mechanism:'Follow the decisions and cause-and-effect relationship.',
 example:'Connect the abstract idea to the concrete business scenario.',
 boundary:'Do not extend the claim beyond the mechanism or evidence.',
 evidence:'Identify what is observed, assumed and still unverified.',
 practice:'Predict or explain the result before moving on.'
};

function ReadingPassage({block,annotation,cues,visual}:{block:string;annotation?:ReadingAnnotation;cues:boolean;visual?:VisualSpec}){
 const heading=/^#{2,6}\s/.test(block);
 const kind=cues?annotation?.kind:undefined;
 return <div className={'reader-passage'+(heading?' is-heading':'')+(kind?' is-annotated kind-'+kind:'')+(visual?' is-structured':'')}
   data-source-block={block ? 'preserved' : undefined} data-kind={kind??'narrative'}>
   <div className="reader-passage-main">
    {visual?<StructuredPassage source={block} spec={visual}/>:<div className="reader-prose markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{strong:({children})=>
        <strong className={'reader-strong'+(kind?' reader-strong-'+kind:'')}>{children}</strong>
      }}>{block}</ReactMarkdown>
    </div>}
   </div>
   {annotation&&cues&&!visual&&<aside className="reader-margin-cue" aria-label={kindNames[annotation.kind]+' reading guidance'}>
     <span className="reader-cue-label"><span className="reader-cue-dot" aria-hidden="true"/>{kindNames[annotation.kind]}</span>
     <strong>{annotation.title}</strong>
     <p>{annotation.why}</p>
     <span className="reader-cue-intent">{description[annotation.kind]}</span>
   </aside>}
 </div>;
}

/** Keeps raw Markdown blocks in their exact order and contents, while curated
 * annotations supply meaningful typography and contextual guidance. */
export function ReadingArticle({
 markdown,offset,editorial,cues=true,textSize=0,wide=false,visuals=[]
}:{markdown:string;offset:number;editorial?:ReadingEditorial;cues?:boolean;textSize?:number;wide?:boolean;visuals?:VisualSpec[]}){
 const passages=readingBlocks(markdown);
 const notes=new Map((editorial?.annotations??[]).map(note=>[note.block,note]));
 const visualsByBlock=new Map(visuals.map(visual=>[visual.block,visual]));
 return <div className={'reader-article'+(cues?'':' no-cues')+(wide?' reader-wide':'')} data-text-size={textSize}>
  {passages.map((block,i)=><ReadingPassage key={offset+i}
    block={block} annotation={notes.get(offset+i)} cues={cues} visual={visualsByBlock.get(offset+i)}/>)}
 </div>;
}
