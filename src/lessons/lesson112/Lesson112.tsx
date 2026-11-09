import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import lessonSource from '../../../content/lessons/1.1.2.md?raw';
import { StoryCanvas } from '../shared/StoryCanvas';
import { useCaseScenes } from './scenes';
import {useCases, evaluateScenario,defaultScenario, acceptanceCases,traceSteps,diagnosticEvidence,platformBase,platformCommit,platformRun} from './model';
import type {ScenarioInput} from './model';
import './lesson.css';

export function parseSections(text:string){
 return text.split(/(?=^## )/m).filter(x=>x.startsWith('## ')).map((body,index)=>{
  const e=body.indexOf('\n'),heading=body.slice(3,e),separator=heading.indexOf(' — ');
  return {index,stage:separator>=0?heading.slice(0,separator):'Study',title:separator>=0?heading.slice(separator+3):heading,body:body.slice(e+1).trim()};
 });
}
export const lessonSections=parseSections(lessonSource);

function Note({title,children}:{title:string;children:React.ReactNode}){
 return <aside className="l112-note"><b>{title}</b><div>{children}</div></aside>;
}
function Label({children}:{children:React.ReactNode}){return <span className="l112-label">{children}</span>}
function UseCaseExplorer(){
 const [id,setId]=useState('UC-001'),[requiresConfirmation,setRequiresConfirmation]=useState(false);
 const found=useCases.find(x=>x.id===id)??useCases[0];
 return <div className="l112-widget" data-testid="use-case-explorer">
  <div className="l112-widget-head"><Label>01 · INTERACTIVE USE-CASE EXPLORER</Label><h3>Choose the actor's business goal</h3><p>Follow the ownership, trigger, preconditions and postconditions. Only UC-001 is implemented in the Java checkpoint.</p></div>
  <div className="l112-case-tabs" role="group" aria-label="Select a business use case">
   {useCases.map(c=><button type="button" aria-pressed={id===c.id} className={id===c.id?'active':''} onClick={()=>setId(c.id)} key={c.id}><small>{c.id} · {c.state.toUpperCase()}</small><b>{c.actor}</b><span>{c.title}</span></button>)}
  </div>
  <div className="l112-case-detail">
   <div className="l112-case-title"><div><Label>{found.id} · {found.state.toUpperCase()}</Label><h4>{found.title}</h4><p>{found.objective}</p></div><span className={'l112-status '+found.state}>{found.state==='implemented'?'Implemented in Java':found.state==='conceptual'?'Future conceptual':'Policy unresolved'}</span></div>
   <div className="l112-info-grid">
    <section><h5>Trigger</h5><p>{found.trigger}</p><h5>Business authority</h5><p>{found.authority}</p><h5>Source of evidence</h5><p>{found.evidence}</p></section>
    <section><h5>Preconditions</h5><ol>{found.preconditions.map(x=><li key={x}>{x}</li>)}</ol><h5>Resulting postcondition</h5><p>{found.postcondition}</p></section>
   </div>
   <div className="l112-info-grid">
    <section><h5>Normal execution path</h5><ol>{found.mainFlow.map(x=><li key={x}>{x}</li>)}</ol></section>
    <section><h5>Alternatives and rejections</h5><ul>{found.alternatives.map(x=><li key={x}>{x}</li>)}</ul></section>
   </div>
   <Note title="Assumption and non-guarantee"><p>{found.assumption}</p></Note>
   <label className="l112-check"><input type="checkbox" checked={requiresConfirmation} onChange={e=>setRequiresConfirmation(e.target.checked)}/>Change customer promise: only call the order “confirmed” after merchant acceptance</label>
   {requiresConfirmation&&<div className="l112-warning" role="status" data-testid="confirmation-warning"><b>Requirement change detected</b><p>UC-001 alone no longer fulfills that new promise. The current response remains merchant PENDING. A real merchant decision use case and evidence are required; changing a label or HTTP status cannot create that authority.</p></div>}
  </div>
 </div>;
}
function ScenarioStudio(){
 const [input,setInput]=useState<ScenarioInput>(defaultScenario),[prediction,setPrediction]=useState(''),[revealed,setRevealed]=useState(false);
 const result=useMemo(()=>evaluateScenario(input),[input]);
 function setField<K extends keyof ScenarioInput>(key:K,value:ScenarioInput[K]){setInput(x=>({...x,[key]:value}));setPrediction('');setRevealed(false)}
 return <div className="l112-widget" data-testid="scenario-studio">
  <div className="l112-widget-head"><Label>02 · BUSINESS SCENARIO STUDIO</Label><h3>Change the request. Predict the outcome.</h3><p>Deterministic TypeScript interpretation of the verified Java contract — no live HTTP request is sent by this exercise.</p></div>
  <div className="l112-form">
    <label>Restaurant fixture<select data-testid="scenario-restaurant" value={input.restaurant} onChange={e=>setField('restaurant',e.target.value as ScenarioInput['restaurant'])}><option value="cedar-kitchen">Cedar Kitchen (fictional fixture)</option><option value="other-restaurant">Unknown restaurant</option></select></label>
    <label>Requested menu item<select data-testid="scenario-item" value={input.item} onChange={e=>setField('item',e.target.value as ScenarioInput['item'])}><option value="lentil-bowl">Lentil Bowl (available)</option><option value="injera-combo">Injera Combo (available)</option><option value="seasonal-special">Seasonal Special (unavailable)</option><option value="unknown-item">Unknown item code</option></select></label>
    <label>Quantity<select data-testid="scenario-quantity" value={String(input.quantity)} onChange={e=>setField('quantity',Number(e.target.value))}><option value="0">0 (invalid)</option><option value="1">1</option><option value="2">2</option><option value="20">20 (maximum)</option><option value="21">21 (invalid)</option></select></label>
    <label>Future downstream case<select data-testid="scenario-future" value={input.future} onChange={e=>setField('future',e.target.value as ScenarioInput['future'])}><option value="none">No downstream case</option><option value="merchant-reject">Restaurant rejects later (not implemented)</option><option value="payment-decline">Provider declines later (not implemented)</option><option value="late-cancel">Late cancellation (policy unresolved)</option></select></label>
  </div>
  <label className="l112-check"><input type="checkbox" checked={input.duplicate} onChange={e=>setField('duplicate',e.target.checked)}/>Include a duplicate basket line</label>
  <div className="l112-predict"><h4>Predict the HTTP result for the intake operation</h4><div className="l112-prediction-buttons">{['201','400','422'].map(n=><button key={n} type="button" aria-pressed={prediction===n} className={prediction===n?'active':''} onClick={()=>setPrediction(n)}>{n}</button>)}</div><button type="button" className="button primary" disabled={!prediction} onClick={()=>setRevealed(true)}>Run modeled scenario</button></div>
  {revealed?<div className="l112-result" data-testid="scenario-result">
    <div className="l112-result-header"><span className="l112-big-status">{result.http}</span><div><Label>{prediction===String(result.http)?'PREDICTION MATCHED':'PREDICTION REVISED'} · {result.code}</Label><h4>{result.message}</h4></div></div>
    <div className="l112-facts"><div><b>Intake</b><span>{result.intake}</span></div><div><b>Restaurant</b><span>{result.restaurant}</span></div><div><b>Payment</b><span>{result.payment}</span></div><div><b>Demo quote</b><span>{result.quote===null?'Not created':result.quote+' USD minor units'}</span></div></div>
    <ol className="l112-sequence">{result.steps.map((step,i)=><li key={step}><span>{i+1}</span><p>{step}</p></li>)}</ol>
    <div className="l112-warning"><b>Separate future business scenario</b><p>{result.futureMessage}</p></div>
    <button className="l112-linkbutton" type="button" onClick={()=>{setRevealed(false);setPrediction('')}}>Hide result and predict again</button>
   </div>:<div className="l112-hidden">Choose an outcome before revealing the model's decision path.</div>}
  <p className="l112-disclaimer">This browser model does not create a real order or contact a restaurant/provider. See the Java tests and source checkpoint for actual executed evidence.</p>
 </div>;
}
function AcceptanceExplorer(){
 const [id,setId]=useState('AC-01'),[guess,setGuess]=useState(''),[show,setShow]=useState(false);
 const item=acceptanceCases.find(x=>x.id===id)??acceptanceCases[0];
 return <div className="l112-widget" data-testid="acceptance-explorer">
  <div className="l112-widget-head"><Label>03 · ACCEPTANCE-CRITERIA EXPLORER</Label><h3>Turn each business expectation into a test</h3><p>Read the Given/When/Then contract and compare a specific Java source test. The named test ran in the pinned successful Maven CI workflow.</p></div>
  <div className="l112-form"><label>Scenario<select data-testid="acceptance-case" value={id} onChange={e=>{setId(e.target.value);setShow(false);setGuess('')}}>{acceptanceCases.map(c=><option key={c.id} value={c.id}>{c.id} · {c.title}</option>)}</select></label></div>
  <div className="l112-contract"><div><Label>GIVEN</Label><p>{item.given}</p></div><div><Label>WHEN</Label><p>{item.when}</p></div><div><Label>THEN</Label><p>Predict before reveal</p></div></div>
  <div className="l112-predict"><h4>Which status represents the expected result?</h4><div className="l112-prediction-buttons">{['201','200','400','404','422'].map(n=><button key={n} type="button" aria-pressed={guess===n} className={guess===n?'active':''} onClick={()=>setGuess(n)}>{n}</button>)}</div><button type="button" className="button primary" disabled={!guess} onClick={()=>setShow(true)}>Reveal acceptance contract</button></div>
  {show&&<div className="l112-result" data-testid="acceptance-result"><div className="l112-result-header"><span className="l112-big-status">{item.predicted}</span><div><Label>{guess===String(item.predicted)?'YOUR PREDICTION MATCHED':'REVIEW THE CONTRACT'}</Label><h4>{item.then}</h4></div></div><div className="l112-json-cols"><div><h5>Example request</h5><pre>{item.request}</pre></div><div><h5>Expected response excerpt</h5><pre>{item.response}</pre></div></div><p><b>What the test does not prove:</b> {item.scope}</p><div className="l112-links"><a href={platformBase+item.path} target="_blank" rel="noreferrer">{item.test} · immutable source ↗</a><a href={platformRun} target="_blank" rel="noreferrer">Java Maven CI evidence ↗</a></div></div>}
 </div>;
}
function ExecutionTrace(){
 const [selected,setSelected]=useState(0);
 const current=traceSteps[selected];
 return <div className="l112-widget" data-testid="execution-trace">
  <div className="l112-widget-head"><Label>04 · REAL APPLICATION EXECUTION TRACE</Label><h3>From HTTP intent to honest resource creation</h3><p>Each stage links to the Java source at the verified commit. Sequence is reconstructed from source and tests; it is not recorded distributed tracing telemetry.</p></div>
  <div className="l112-trace-grid"><div className="l112-trace-nav" aria-label="Choose Java execution stage">{traceSteps.map((step,i)=><button type="button" aria-pressed={selected===i} className={selected===i?'active':''} key={step.id} onClick={()=>setSelected(i)}><span>{String(i+1).padStart(2,'0')}</span><div><b>{step.title}</b><small>{step.layer}</small></div></button>)}</div>
  <div className="l112-trace-detail"><Label>STAGE {selected+1} / {traceSteps.length} · {current.layer}</Label><h4>{current.title}</h4><p><b>Engineering responsibility:</b> {current.role}</p><p><b>Transformation:</b> {current.changes}</p><p><b>Rejection or failure window:</b> {current.failure}</p><Note title="Evidence classification"><p>{current.claim}</p></Note><a className="l112-src-link" href={platformBase+current.file} target="_blank" rel="noreferrer">Inspect {current.file.split('/').at(-1)} at {platformCommit.slice(0,12)} ↗</a></div></div>
  <div className="l112-future"><Label>NO IMPLEMENTED NETWORK BOUNDARY</Label><p>Future Restaurant / Payment Provider / Kitchen / Delivery interactions are not called from this Java flow. They are separate authority-owned use cases and have no current executable route.</p></div>
 </div>;
}
function VerificationPanel(){
 return <div className="l112-widget" data-testid="verification-panel">
  <div className="l112-widget-head"><Label>05 · EVIDENCE AND TEST TRACEABILITY</Label><h3>Three evidence levels, different claims</h3><p>Do not treat a simulation as a Java observation or a Maven build as real-world payment completion.</p></div>
  <div className="l112-cards"><div><Label>ILLUSTRATIVE</Label><h4>React scenario model</h4><p>Predictions follow declared teaching rules. Changes in user choices change modeled outcomes, not backend state.</p></div><div><Label>EXECUTED IN JAVA CI</Label><h4>13 Maven tests</h4><p>7 service, 1 repository and 5 Spring MVC integration tests executed on the pinned Java commit.</p></div><div><Label>NOT VERIFIED</Label><h4>Real marketplace guarantees</h4><p>No live merchant decisions, real card payments, customer identity security, durable storage or multi-instance correctness.</p></div></div>
  <div className="l112-links"><a href={platformBase+'docs/usecases/UC-001-place-order.md'} target="_blank" rel="noreferrer">Read formal use-case and AC matrix ↗</a><a href={platformBase+'docs/adr/0001-single-deployable-intake.md'} target="_blank" rel="noreferrer">Read ADR 0001 ↗</a><a href={platformRun} target="_blank" rel="noreferrer">View actual successful Java CI run ↗</a></div>
 </div>;
}
function DiagnosisRoom(){
 const [chosen,setChosen]=useState<string[]>([]),[hyp,setHyp]=useState('semantics'),[reveal,setReveal]=useState(false);
 const hypotheses=[['semantics','The API recorded intake; the user incorrectly assumed merchant acceptance.'],['ui','Customer interface replaced pending intake with “merchant confirmed”.'],['restart','The volatile repository lost intake on process restart.'],['missing','Product requires merchant integration that has not been implemented.'],['retry','Ambiguous retry created multiple intake IDs.']];
 return <div className="l112-widget" data-testid="diagnosis-room">
  <div className="l112-widget-head"><Label>06 · DIAGNOSIS ROOM</Label><h3>“API succeeded, but restaurant never accepted”</h3><p>Do not jump to a retry queue. First identify the promised business proposition and inspect discriminating evidence.</p></div>
  <div className="l112-diagnosis"><div><h4>Hypothesis under investigation</h4><div className="l112-hypotheses">{hypotheses.map(([id,label])=><button type="button" aria-pressed={hyp===id} className={hyp===id?'active':''} key={id} onClick={()=>{setHyp(id);setReveal(false)}}>{label}</button>)}</div><h4>Choose at least two evidence sources</h4><div className="l112-evidence-list">{diagnosticEvidence.map(e=><label key={e.id}><input type="checkbox" checked={chosen.includes(e.id)} onChange={v=>{setChosen(xs=>v.target.checked?[...xs,e.id]:xs.filter(id=>id!==e.id));setReveal(false)}}/>{e.label}</label>)}</div></div><div><h4>Synthetic evidence revealed</h4>{chosen.length?diagnosticEvidence.filter(e=>chosen.includes(e.id)).map(e=><div className="l112-evidence-card" key={e.id}><b>{e.label}</b><p>{e.detail}</p><p><b>Interpretation:</b> {e.reveals}</p></div>):<p className="l112-muted">No evidence selected. Do not diagnose by pattern name alone.</p>}</div></div>
  <button type="button" className="button primary" disabled={chosen.length<2} onClick={()=>setReveal(true)}>Form provisional diagnosis</button>
  {reveal&&<div className="l112-warning" role="status" data-testid="diagnosis-result"><b>Provisional hypothesis: {hypotheses.find(x=>x[0]===hyp)?.[1]}</b><p>Check this explanation against the other possibilities. A 201 for intake does not mean a merchant endpoint was called. Your selected evidence is fictional teaching material, not an observed live incident. State which additional log, policy or implementation check would discriminate remaining hypotheses.</p></div>}
  <p className="l112-disclaimer">Case evidence is synthetic. No customer, restaurant or payment data was consulted.</p>
 </div>;
}
function DefenseStudio(){
 const [audience,setAudience]=useState('staff'),[draft,setDraft]=useState(''),[rubric,setRubric]=useState(false);
 const prompts:{[key:string]:string}={engineer:'Explain why controller validation and business catalog guards belong at different boundaries, and what 201 guarantees.',staff:'Defend one deployable against a proposal for Order/Restaurant/Payment microservices and Kafka. Name measurable revisit triggers.',stakeholder:'Explain to a customer and restaurant what the platform has and has not promised when it returns 201.'};
 return <div className="l112-widget"><Label>07 · STAFF-LEVEL DEFENSE</Label><h3>One architecture, three audiences</h3><div className="l112-prediction-buttons">{Object.keys(prompts).map(id=><button key={id} aria-pressed={audience===id} className={audience===id?'active':''} onClick={()=>{setAudience(id);setRubric(false)}}>{id==='staff'?'Staff reviewer':id==='engineer'?'Backend engineer':'Stakeholder'}</button>)}</div><p>{prompts[audience]}</p><label className="l112-write">Your own explanation (not saved)<textarea rows={5} value={draft} onChange={e=>setDraft(e.target.value)} placeholder="State the real business outcome, evidence, alternatives and unimplemented guarantees."/></label><button type="button" className="button secondary" onClick={()=>setRubric(!rubric)}>{rubric?'Hide rubric':'Show reasoning rubric'}</button>{rubric&&<Note title="Self-review standard"><p>Distinguish intent, intake, merchant acceptance and payment outcome. Name executed test evidence, the volatile adapter, alternative topology and its cost, and a concrete requirement that could force the next revision. Adapt vocabulary to the chosen audience.</p></Note>}</div>;
}
function Retain(){
 const [show,setShow]=useState(false);
 return <div className="l112-widget"><Label>08 · TRANSFER AND RETENTION</Label><h3>Hotel booking and inventory reservation</h3><p>A booking platform records a guest's room request, but the hotel has not confirmed inventory. Write primary actor, trigger, input and business preconditions, one success postcondition, two negative outcomes and a test that distinguishes intake from guaranteed accommodation. Repeat for inventory reservation.</p><button className="button secondary" onClick={()=>setShow(!show)}>{show?'Hide sample reasoning':'Reveal transfer checklist after your answer'}</button>{show&&<Note title="Model reasoning"><p>Guest owns intent; property owns availability and confirmation; payment provider owns its operation. Intake can be a created resource without guaranteeing a room. Inventory reservation is a stronger business postcondition than request intake and may motivate atomic persistence and concurrency guards. Both need independent tests for the actual promised fact.</p></Note>}</div>;
}

export default function Lesson112(){
 const [searchParams,setSearchParams]=useSearchParams();
 const requested=Number(searchParams.get('section')??'1');
 const index=Number.isInteger(requested)&&requested>=1&&requested<=lessonSections.length?requested-1:0;
 const [glossary,setGlossary]=useState(false);
 const current=lessonSections[index]??lessonSections[0];
 const nav=(i:number)=>setSearchParams({section:String(Math.max(1,Math.min(lessonSections.length,i+1)))});
 return <article className="l112-page" data-testid="lesson-1.1.2">
  <header className="l112-hero">
    <div>
      <Label>CLUSTER 1.1 · CHAPTER 1 · COMPLETE LESSON 1.1.2</Label>
      <h1>Business scenarios <em>& use-case discovery</em></h1>
      <p>Explore what a customer requests, what the Java application can prove, and why restaurant acceptance and payment remain separate.</p>
      <div className="l112-hero-tags"><span>Verified Java + React</span><span>{lessonSections.length} sections</span><span>13 Java tests · immutable source evidence</span></div>
    </div>
    <button type="button" className="l112-glossary-button" aria-expanded={glossary} onClick={()=>setGlossary(!glossary)}>{glossary?'Hide terminology':'Key terminology'} ↗</button>
  </header>
  <div className="l112-progress"><div><span style={{width:(100*(index+1)/lessonSections.length)+'%'}}/></div><small>Section {index+1} / {lessonSections.length}</small></div>
  <div className="l112-reading">
      {glossary&&<Note title="Precision vocabulary"><p><b>Capability:</b> durable business ability. <b>Use case:</b> actor-triggered goal with observable outcome. <b>Postcondition:</b> proposition true after a successful operation. <b>Rejection:</b> validly denied business request. <b>Intake:</b> request recorded, not necessarily approved. <b>Evidence:</b> result observed under a specific test/environment.</p></Note>}
      <div className="l112-heading"><Label>{current.stage.toUpperCase()} · {String(index+1).padStart(2,'0')} / {lessonSections.length}</Label><h2>{current.title}</h2></div>
      <StoryCanvas key={index} markdown={current.body} scene={useCaseScenes[index]}>
        {index===6?<UseCaseExplorer/>
          :index===7?<ScenarioStudio/>
          :index===8?<AcceptanceExplorer/>
          :index===9?<ExecutionTrace/>
          :index===10?<VerificationPanel/>
          :index===11?<DiagnosisRoom/>
          :index===12?<DefenseStudio/>
          :index===13?<Retain/>
          :null}
      </StoryCanvas>
      <div className="l112-navigation"><button type="button" className="button secondary" disabled={index===0} onClick={()=>nav(index-1)}>← Previous section</button>{index<lessonSections.length-1?<button type="button" className="button primary" onClick={()=>nav(index+1)}>Continue: {lessonSections[index+1]?.stage} →</button>:<Link className="button primary" to="/blueprint">Return to blueprint ↗</Link>}</div>
      <div className="l112-footer"><a href="https://github.com/fasiltadesse22/distributed-systems-engineering-academy/blob/main/content/lessons/1.1.2.md" target="_blank" rel="noreferrer">Complete manuscript ↗</a><a href={platformRun} target="_blank" rel="noreferrer">Verified Java CI ↗</a><a href={platformBase+'docs/usecases/UC-001-place-order.md'} target="_blank" rel="noreferrer">Formal UC-001 contract ↗</a></div>
  </div>
 </article>;
}
