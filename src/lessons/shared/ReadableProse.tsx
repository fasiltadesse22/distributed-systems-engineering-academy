import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './narrative.css';

/** Segment long prose at sentence boundaries, never by arbitrary character counts.
 * This preserves every source word and word order; the transformation changes
 * visual grouping and introduces no new domain assertions.
 */
export function segmentNarrative(source:string):string[]{
 const wordCount=source.trim().split(/\s+/).length;
 if(wordCount<48||source.includes('\n')||/^(?:[-*] |\d+\. |#{1,6} |\x60{3}|> |\|)/.test(source))return [source];
 const raw=source.split(/(?<=[.!?])\s+(?=(?:[“"(']?[A-Z]|\*\*[A-Z]))/g);
 if(raw.length<2)return [source];
 const sentences:string[]=[];
 for(const sentence of raw){
  const previous=sentences.at(-1);
  if(previous&&/(?:\be\.g\.|\bi\.e\.|\bvs\.|\bDr\.)$/.test(previous)){
   sentences[sentences.length-1]+=' '+sentence;
  }else sentences.push(sentence);
 }
 if(sentences.length<2)return [source];
 const result:string[]=[];
 let current='';
 for(const sentence of sentences){
  if(!current){current=sentence;continue}
  const words=current.split(/\s+/).length;
  const next=sentence.split(/\s+/).length;
  if(words+next>35&&words>=13){
   result.push(current);
   current=sentence;
  }else current+=' '+sentence;
 }
 if(current)result.push(current);
 return result.length<2?[source]:result;
}

const leadDefinition=/^(?:An?|The)\s+\*\*([^*]{2,65})\*\*\s+(?:is|are|means|represents|describes|expresses|has|can)\b/i;
export function identifyLeadDefinition(source:string):string|null{
 return source.match(leadDefinition)?.[1]??null;
}
function TextSource({source}:{source:string}){
 return <div className="reader-prose markdown">
   <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
     strong:({children})=><strong className="reader-strong">{children}</strong>
   }}>{source}</ReactMarkdown>
 </div>;
}
/** A definition becomes a headline + explanation. Dense narrative gains
 * readable paragraph breaks and a quiet reading rail, not dozens of cards.
 */
export default function ReadableProse({source}:{source:string}){
 const pieces=segmentNarrative(source);
 const term=identifyLeadDefinition(source);
 if(term){
  const first=pieces[0];
  const remaining=pieces.slice(1);
  return <section className="reader-term-spotlight" data-testid="reader-term-spotlight">
   <header><span className="reader-term-eyebrow">TERM & MEANING</span><h4>{term}</h4></header>
   <div className="reader-term-definition"><TextSource source={first}/></div>
   {remaining.length>0&&<div className="reader-term-context">
     <span className="reader-term-context-label">IN CONTEXT · WHY THE DISTINCTION MATTERS</span>
     {remaining.map((piece,i)=><TextSource source={piece} key={i}/>)}
   </div>}
  </section>;
 }
 if(pieces.length>1)return <div className="reader-narrative" data-testid="reader-narrative">
    {pieces.map((piece,i)=><div key={i} className="reader-narrative-thought">
      <span className="reader-narrative-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
      <TextSource source={piece}/>
    </div>)}
   </div>;
 return <TextSource source={source}/>;
}
