import {useState} from 'react';
import {cases,classify,labels,predictions,type Branch,type ScenarioId,type Classification} from './model';
import './lesson.css';

const allBranches=Object.entries(labels) as [Branch,string][];
function FactLedger({result}:{result:Classification}){
 return <div className="l118-ledger" data-testid="compensation-ledger">
  <div><h4>Original history (never deleted)</h4>
   {result.original.length? <ol>{result.original.map(x=><li key={x.identity}>
    <b>{x.identity}</b><span>{x.source} · {x.statement}</span><small>{x.certainty.replaceAll('-',' ')}</small>
   </li>)}</ol>:<p>No committed original fact in this classroom scenario.</p>}</div>
  <div><h4>Forward remedy candidate (never claimed executed)</h4>
   {result.proposed.length?<ol>{result.proposed.map(x=><li key={x.identity}><b>{x.identity}</b><span>{x.statement}</span><small>{x.certainty}</small></li>)}</ol>:<p>No automatic remedy: approval or source evidence is missing.</p>}</div>
 </div>;
}
export function UndoDecisionInspector(){
 const [scenario,setScenario]=useState<ScenarioId>('capture');
 const [evidence,setEvidence]=useState(true);
 const [approved,setApproved]=useState(false);
 const result=classify(scenario,evidence,approved);
 const c=cases.find(x=>x.id===scenario)!;
 return <figure className="l118-lab" data-testid="undo-decision-inspector">
  <figcaption><span className="l118-eyebrow">CAUSAL CLASSIFIER · CLASSROOM ASSUMPTIONS</span><h3>What can actually be undone?</h3>
   <p>Change an effect and its evidence. The outcome is a teaching classification, not a real transaction.</p></figcaption>
  <div className="l118-controls">
   <label>Effect scenario<select aria-label="Effect scenario" value={scenario} onChange={e=>setScenario(e.target.value as ScenarioId)}>
    {cases.map(x=><option key={x.id} value={x.id}>{x.label}</option>)}</select></label>
   <label className="l118-check"><input aria-label="Source fact confirmed for classroom example" type="checkbox" checked={evidence} onChange={e=>setEvidence(e.target.checked)}/>Assume source effect is confirmed</label>
   <label className="l118-check"><input aria-label="Remedy policy approved for classroom example" type="checkbox" checked={approved} onChange={e=>setApproved(e.target.checked)}/>Assume remedy is policy-approved</label>
  </div>
  <p className="l118-question">{c.question} <small>Owner: {c.owner}</small></p>
  <ol className="l118-steps">
   <li><b>1 · Identify effect</b><span>Draft/local-only versus external financial, physical or informational effect</span></li>
   <li><b>2 · Source evidence</b><span>Unknown result demands reconciliation before any apparent inverse</span></li>
   <li><b>3 · True inverse?</b><span>Only if no committed external effect and within an enforceable local boundary</span></li>
   <li><b>4 · New remedy?</b><span>Confirmed external effect plus explicit approved remedy yields a candidate compensation</span></li>
   <li><b>5 · Residual obligation</b><span>Never claim a candidate was executed; preserve original historical fact</span></li>
  </ol>
  <div className="l118-verdict" data-testid="compensation-decision" aria-live="polite"><small>CONCEPTUAL BRANCH</small><strong>{result.headline}</strong><p>{result.reason}</p></div>
  <FactLedger result={result}/>
  <h4>What is still unresolved?</h4><ul className="l118-obligations">{result.remaining.map(x=><li key={x}>{x}</li>)}</ul>
  <p className="l118-warning">{result.warning}</p>
 </figure>;
}
export function EffectHistoryTimeline(){
 const [mode,setMode]=useState<'capture'|'kitchen'|'notification'>('capture');
 const rows={
  capture:[
   ['T1','Provider','Capture C-81 confirmed; 800 charged','ORIGINAL'],
   ['T2','Merchant','Restaurant rejects O-41','ORIGINAL'],
   ['T3','Platform','POL-05 remedy approval required','OBLIGATION'],
   ['T4','Platform','Refund F-19 requested only if authorized','CANDIDATE'],
   ['T5','Provider','Refund completion unknown until confirmed','UNKNOWN']
  ],
  kitchen:[
   ['T1','Kitchen','Ingredients consumed; labor spent','ORIGINAL'],
   ['T2','Customer','Cancellation requested','REQUEST'],
   ['T3','Merchant','Cancellation/loss policy still unresolved','OBLIGATION'],
   ['T4','Operations','Human loss-allocation review proposed','CANDIDATE'],
   ['T5','Kitchen','Consumed ingredients remain consumed','ORIGINAL']
  ],
  notification:[
   ['T1','Channel','Incorrect acceptance email delivered','ORIGINAL'],
   ['T2','Merchant','Authoritative rejection established','ORIGINAL'],
   ['T3','Platform','Audit discrepancy; remedy review','OBLIGATION'],
   ['T4','Channel','Corrective message proposed','CANDIDATE'],
   ['T5','Recipient','Original delivery cannot be erased','ORIGINAL']
  ]
 } as const;
 return <figure className="l118-lab" data-testid="effects-fact-timeline">
  <figcaption><span className="l118-eyebrow">BEFORE / AFTER · TWO TRUTH LEVELS</span><h3>History persists; remedies move forward</h3>
   <p>The left lane shows original effects. Later rows are separate obligations or proposed remedies, not time reversal.</p></figcaption>
  <div className="l118-tabs" role="group" aria-label="Effect timeline">
   {(['capture','kitchen','notification'] as const).map(id=><button type="button" key={id} aria-pressed={mode===id} onClick={()=>setMode(id)}>{id==='capture'?'Payment':id==='kitchen'?'Kitchen':'Notification'}</button>)}
  </div>
  <ol className="l118-timeline">{rows[mode].map(([time,owner,description,kind])=><li key={time}>
   <span>{time}</span><div><b>{owner}</b><p>{description}</p></div><small>{kind}</small></li>)}</ol>
  <p className="l118-warning">Hypothetical source facts. The actual Java Food Ordering Platform implements none of these external effects.</p>
 </figure>;
}
export function UndoPredictionExercise(){
 const [index,setIndex]=useState(0);
 const [choice,setChoice]=useState<Branch|null>(null);
 const [reveal,setReveal]=useState(false);
 const scenario=predictions[index];
 const item=cases.find(x=>x.id===scenario.id)!;
 const verdict=classify(scenario.id,scenario.sourceEvidence,scenario.approved);
 return <figure className="l118-lab" data-testid="undo-prediction-exercise">
  <figcaption><span className="l118-eyebrow">PREDICT BEFORE REVEAL</span><h3>Classify the next legitimate response</h3>
   <p>Eight policy/evidence counterexamples. Do not confuse a proposed remedy with a completed financial effect.</p></figcaption>
  <label className="l118-choice">Scenario<select aria-label="Prediction scenario" value={index} onChange={e=>{setIndex(Number(e.target.value));setChoice(null);setReveal(false)}}>
   {predictions.map((p,i)=><option key={i} value={i}>{i+1}. {cases.find(c=>c.id===p.id)!.label}{i>=6?' · evidence variation':''}</option>)}
  </select></label>
  <p>{item.question}</p>
  <p>Assumptions: source evidence {scenario.sourceEvidence?'available':'unavailable'}; remedy approval {scenario.approved?'assumed':'not granted'}.</p>
  <fieldset className="l118-predictions"><legend>Which branch is correct under these assumptions?</legend>
   {allBranches.map(([id,label])=><label key={id}><input type="radio" name="undo-prediction" value={id} checked={choice===id} onChange={()=>{setChoice(id);setReveal(false)}}/>{label}</label>)}
  </fieldset>
  <button type="button" disabled={!choice} onClick={()=>setReveal(true)}>Reveal causal reasoning</button>
  {reveal&&<div data-testid="undo-prediction-result" className="l118-verdict" role="status"><strong>{choice===scenario.answer?'Prediction matches the model':'Revise the prediction'}</strong>
   <p>Expected: {labels[scenario.answer]}. {scenario.teaching}</p><p>{verdict.reason}</p></div>}
  <p className="l118-warning">All scenarios are deterministic educational assumptions; no refund, cancellation, kitchen work or notification is executed.</p>
 </figure>;
}
