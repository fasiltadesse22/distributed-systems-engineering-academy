import {useState} from 'react';
import {predictionChoices,scenarioChoices,simulateIdentity} from './model';
import type {IdentityScenario,Prediction} from './model';
import './lesson.css';

const nodes=[
 {code:'CUSTOMER',title:'CustomerId',identity:'Claimed UUID',owner:'Customer reference in intake',kind:'implemented',detail:'Not authentication of the HTTP caller'},
 {code:'ORDER',title:'OrderId',identity:'Generated UUID',owner:'Platform intake owner',kind:'implemented',detail:'One immutable Order snapshot; repository create-only'},
 {code:'RESTAURANT',title:'RestaurantId',identity:'Fixture code',owner:'Server-owned demo catalog',kind:'implemented',detail:'Not real merchant decision or live inventory'},
 {code:'ATTEMPT',title:'PaymentAttemptId',identity:'Conceptual future ID',owner:'Future approved payment model',kind:'future',detail:'Multiple attempts may refer to one OrderId'},
 {code:'PROVIDER',title:'Provider operation ID',identity:'External-scoped reference',owner:'Future authenticated provider',kind:'future',detail:'Authority for its actual financial operation'},
 {code:'PROJECTION',title:'Customer-facing status',identity:'Derived read model',owner:'UI / projection reader',kind:'derived',detail:'A displayed label does not establish a new business fact'}
] as const;
export function IdentityAuthorityMap(){
 return <figure className="l114-map" data-testid="identity-authority-map" aria-label="Identity and authority ownership map">
  <figcaption><span className="l114-kicker">IDENTITY GRAPH · ACTUAL VS CONCEPTUAL</span>
   <strong>Which identifier refers to what, and who may assert each fact?</strong>
   <p>Follow the relationships from the local intake to potential external attempts. The map does not depict live integrations or six deployed services.</p>
  </figcaption>
  <div className="l114-legend" aria-label="Evidence categories">
   <span><i className="l114-dot implemented"/> Implemented in Java</span>
   <span><i className="l114-dot future"/> Future/external concept</span>
   <span><i className="l114-dot derived"/> Projection only</span>
  </div>
  <ol className="l114-map-list">{nodes.map((node,i)=><li key={node.code} className={'l114-map-node '+node.kind}>
   <span className="l114-branch" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
   <div className="l114-map-content">
    <span className="l114-node-kind">{node.kind==='implemented'?'IN JAVA':node.kind==='future'?'NOT IMPLEMENTED':'NOT AUTHORITATIVE'}</span>
    <h4>{node.title}</h4>
    <p>{node.identity} · {node.owner}</p>
    <small>{node.detail}</small>
   </div>
  </li>)}</ol>
  <div className="l114-relations" aria-label="Identity relationships">
   <p><b>OrderId</b> → references one CustomerId and one RestaurantId in the recorded intake.</p>
   <p><b>OrderId</b> ⇢ could relate to multiple future PaymentAttemptIds ⇢ independently scoped provider operations.</p>
   <p><b>UI projection</b> ← reads observed facts; it cannot promote a request, unknown result, or stale label to authoritative capture.</p>
  </div>
  <p className="l114-scope"><strong>Evidence:</strong> the first three identities exist in the pinned Java source. Payment, callbacks and derived financial status are conceptual; the current API returns PENDING / NOT_STARTED.</p>
 </figure>;
}
const layers=[
 {name:'Provider operation',tag:'EXTERNAL AUTHORITY',detail:'Only a verified provider operation could establish its actual authorization/capture result.'},
 {name:'Platform observation',tag:'RECEIVED CLAIM',detail:'Receipt, callback or provider query would need authenticated identity/namespace mapping.'},
 {name:'Read-model projection',tag:'DERIVED REPRESENTATION',detail:'A local summary might be stale, mis-correlated or incomplete; its timestamp is not source authority.'},
 {name:'Customer UI',tag:'DISPLAY ONLY',detail:'An attractive Paid label cannot create a provider fact. Unknown must remain unknown.'}
];
export function ProjectionAuthorityFlow(){
 return <figure className="l114-projection" data-testid="authority-projection-flow">
  <figcaption><span className="l114-kicker">CONCEPTUAL FUTURE MECHANISM · NOT INTEGRATED</span>
   <strong>Authority remains at its source as information travels to the screen</strong></figcaption>
  <ol>{layers.map((layer,i)=><li key={layer.name}>
   <span className="l114-layer-index">{String(i+1).padStart(2,'0')}</span>
   <div><small>{layer.tag}</small><h4>{layer.name}</h4><p>{layer.detail}</p></div>
  </li>)}</ol>
  <p className="l114-scope"><strong>Boundary:</strong> our Java application has no provider, payment-attempt record, callback handler or payment read model. This shows the authority contract a future integration would have to respect.</p>
 </figure>;
}
export function IdentityAuthorityLab(){
 const [scenario,setScenario]=useState<IdentityScenario>('rename');
 const [prediction,setPrediction]=useState<Prediction|''>('');
 const [revealed,setRevealed]=useState(false);
 const outcome=simulateIdentity(scenario);
 const info=scenarioChoices.find(x=>x.id===scenario)!;
 return <section className="l114-lab" data-testid="identity-authority-lab">
  <header>
   <span className="l114-kicker">PREDICT → TEST MODEL → EXPLAIN AUTHORITY</span>
   <h3>Identity & Authority Explorer</h3>
   <p>Choose an identity or observation change, predict what it means, then inspect which ID remains stable and whose evidence establishes the disputed fact. This is a deterministic teaching model, not live Java or a provider API.</p>
  </header>
  <div className="l114-controls">
   <fieldset><legend>1 · Change the business situation</legend>
    <select data-testid="identity-scenario" aria-label="Identity change scenario" value={scenario}
      onChange={e=>{setScenario(e.target.value as IdentityScenario);setPrediction('');setRevealed(false)}}>
      {scenarioChoices.map(choice=><option value={choice.id} key={choice.id}>{choice.label}</option>)}
    </select>
    <p className="l114-description">{info.description}</p>
   </fieldset>
   <fieldset><legend>2 · Predict the result</legend>
    <div className="l114-predictions">{predictionChoices.map(choice=><label key={choice.id} className="l114-prediction">
      <input name="identity-prediction" type="radio" value={choice.id} checked={prediction===choice.id}
        onChange={()=>{setPrediction(choice.id);setRevealed(false)}}/>
      <span>{choice.label}</span>
     </label>)}</div>
   </fieldset>
  </div>
  <button className="l114-run" type="button" disabled={!prediction} onClick={()=>setRevealed(true)}>Run model and inspect evidence</button>
  {revealed&&<div className="l114-result" data-testid="identity-model-result" role="status" aria-live="polite">
   <span className={prediction===outcome.expected?'l114-correct':'l114-review'}>{prediction===outcome.expected?'Prediction matches the model':'Compare your prediction with the explanation'}</span>
   <h4>{outcome.heading}</h4>
   <span className={outcome.evidence.startsWith('IMPLEMENTED')?'l114-evidence actual':'l114-evidence conceptual'}>{outcome.evidence}</span>
   <dl className="l114-answer">
    <div><dt>Stable reference</dt><dd data-testid="stable-identity">{outcome.stableId}</dd></div>
    <div><dt>Changed reference or attribute</dt><dd data-testid="changed-identity">{outcome.changedId}</dd></div>
    <div><dt>Entitled authority</dt><dd data-testid="result-authority">{outcome.authority}</dd></div>
    <div><dt>Truthful customer presentation</dt><dd>{outcome.presentation}</dd></div>
   </dl>
   <p>{outcome.meaning}</p>
   <ol className="l114-model-steps" aria-label="Identity and evidence sequence">{outcome.steps.map((step,i)=><li key={i}>
    <b>{String(i+1).padStart(2,'0')} · {step.stage}</b>
    <div><strong>{step.identity}</strong><p>{step.assertion}</p><small>Authority: {step.authority}</small></div>
   </li>)}</ol>
   <p className="l114-scope"><strong>Limit:</strong> {outcome.limitation} The scenario output is not a real HTTP trace or payment-provider observation.</p>
  </div>}
 </section>;
}
