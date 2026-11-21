import {useState} from 'react';
import {
 casebook,decide,either,financialExposure,initial,questions,trace,
 type Assumptions,type Casebook,type Policy,type State,type Decision
} from './model';
import './lesson.css';

const policies:Policy[]=['UNRESOLVED','PAYMENT_FIRST','MERCHANT_FIRST','EITHER_FOR_EXPERIMENT'];
const lanes: {key:keyof Pick<State,'merchant'|'payment'|'kitchen'|'journey'>;label:string;owner:string;states:string[]}[]=[
 {key:'merchant',label:'Restaurant decision',owner:'Merchant / assumed source',states:['PENDING','ACCEPTED','REJECTED']},
 {key:'payment',label:'Payment attempt',owner:'Provider / deterministic double',states:['NOT_STARTED','SUBMITTED_UNKNOWN','CAPTURED','DECLINED','REFUND_PENDING','REFUNDED']},
 {key:'kitchen',label:'Preparation',owner:'Kitchen / assumed source',states:['NOT_STARTED','PREPARING','READY']},
 {key:'journey',label:'Order journey',owner:'Platform / policy scenario',states:['ACTIVE','CANCELLATION_REQUESTED','CANCELLED_SIMULATED','COMPLETED_SIMULATED']}
];
function Truth({state}:{state:State}) {
 return <div className="l119-truth" data-testid="composition-truth">
  <strong>{financialExposure(state)?'Unresolved simulated financial position':'No captured/rejected exposure proven by this local model'}</strong>
  <p>Intake: REQUESTED_AWAITING_RESTAURANT (unchanged real Java resource). All other states are classroom assumptions, not actual merchant/provider/kitchen facts.</p>
 </div>;
}
function Lanes({state,previous}:{state:State;previous:State}){
 return <div className="l119-lanes" data-testid="composition-lanes">
 {lanes.map(l=><div key={l.key} className={'l119-lane'+(state[l.key]!==previous[l.key]?' changed':'')} data-lane={l.key}>
  <div className="l119-lane-title"><strong>{l.label}</strong><small>{l.owner}</small></div>
  <div className="l119-lane-states">{l.states.map(s=><span key={s} className={state[l.key]===s?'active':''}
     aria-current={state[l.key]===s?'step':undefined}>{s.replaceAll('_',' ')}</span>)}</div>
  <div className="l119-lane-current">Now: <b>{state[l.key]}</b></div>
 </div>)}</div>;
}
const prerequisites=[
 ['PAYMENT', 'Sequence policy and journey ACTIVE must permit a simulated submission'],
 ['MERCHANT','Source identity, operator, pending decision and selected sequencing'],
 ['PREPARATION','Merchant acceptance, kitchen evidence, assumed work policy, optional capture'],
 ['CANCELLATION','Customer request != approval; approval checks cutoff and source authority'],
 ['REFUND','Confirmed *simulated* capture, a cause and explicitly assumed entitlement'],
 ['COMPLETION','Merchant accepted, payment captured, kitchen ready; NO delivery proof']
];
export function SynchronizedLifecycleInspector(){
 const [scenario,setScenario]=useState('accepted-unpaid');
 const [policy,setPolicy]=useState<Policy>('MERCHANT_FIRST');
 const [step,setStep]=useState(1);
 const found=casebook.find(c=>c.id===scenario)!;
 const rules:Assumptions={...found.policy,paymentSequence:policy};
 const results=[{step:null as null|Casebook['steps'][number],decision:null as null|Decision,state:initial()}];
 for(const command of found.steps){
   const prior=results[results.length-1].state;
   const d=decide(prior,command.action,rules);
   results.push({step:command,decision:d,state:d.next});
 }
 const index=Math.min(step,results.length-1),view=results[index],before=results[Math.max(0,index-1)].state;
 const choose=(id:string)=>{
   setScenario(id);
   const next=casebook.find(c=>c.id===id)!;setPolicy(next.policy.paymentSequence);
   setStep(1);
 };
 return <figure className="l119-figure" data-testid="composition-state-inspector">
  <figcaption><span className="l119-eyebrow">SYNCHRONIZED STATE MACHINES · CLASSROOM ONLY</span>
   <h3>Which independent lifecycle is allowed to move?</h3>
   <p>Select a scenario and change sequencing. An attempted transition may be rejected without modifying any lane.</p></figcaption>
  <div className="l119-controls">
   <label>Scenario<select aria-label="Composition scenario" value={scenario} onChange={e=>choose(e.target.value)}>
    {casebook.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
   <label>POL-01 teaching hypothesis<select aria-label="Payment sequence policy" value={policy}
     onChange={e=>{setPolicy(e.target.value as Policy);setStep(1)}}>
     {policies.map(p=><option key={p} value={p}>{p.replaceAll('_',' ')}</option>)}</select></label>
  </div>
  <div className="l119-stepper"><button type="button" onClick={()=>setStep(x=>Math.max(0,x-1))} disabled={index===0}>Previous</button>
   <span>Step {index} / {found.steps.length}</span>
   <button type="button" onClick={()=>setStep(x=>Math.min(found.steps.length,x+1))} disabled={index===found.steps.length}>Next</button></div>
  <Lanes state={view.state} previous={before}/>
  {view.decision?<div className={'l119-decision '+(view.decision.accepted?'allowed':'denied')} data-testid="composition-transition" role="status">
   <b>{view.decision.accepted?'LOCAL TEACHING TRANSITION':'REJECTED · SNAPSHOT UNCHANGED'}</b>
   <span>{view.step?.action} · {view.step?.intent}</span><p>Guard: {view.decision.guard}</p>
   <small>{view.decision.observation??'No simulated success fact emitted'}</small>
  </div>:<p>Initial state: no new simulated action has executed.</p>}
  <Truth state={view.state}/>
  <h4>Cross-lifecycle guard dependencies</h4>
  <ul className="l119-prerequisites">{prerequisites.map(([name,desc])=><li key={name}><b>{name}</b><span>{desc}</span></li>)}</ul>
  <p className="l119-warning">Unresolved policy is not an approved business rule; simulated actor and provider evidence is not real. Previous canonical intake stays unchanged.</p>
 </figure>;
}
export function CompositionSequenceExplorer(){
 const [scenario,setScenario]=useState('rejected-paid');
 const [selected,setSelected]=useState(3);
 const c=casebook.find(s=>s.id===scenario)!;
 const story=trace(c),index=Math.min(selected,story.length-1),v=story[index];
 const prev=story[Math.max(0,index-1)].state;
 return <figure className="l119-figure" data-testid="composition-sequence-explorer">
  <figcaption><span className="l119-eyebrow">SWITCH THE TIMELINE · NORMAL AND EXCEPTION PATHS</span>
   <h3>One order story, several independent facts</h3>
   <p>Choose the happy path, rejected-but-paid, unknown result or a cancellation race. Select any event to examine a before/after projection.</p></figcaption>
  <label className="l119-select">Sequence view<select aria-label="Sequence view" value={scenario} onChange={e=>{setScenario(e.target.value);setSelected(0)}}>
   {casebook.filter(x=>['rejected-paid','happy','kitchen-race','capture-unknown','payment-after-cancel'].includes(x.id))
      .map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
  <ol className="l119-timeline">{story.map((t,i)=><li key={i}>
   <button type="button" aria-current={index===i?'step':undefined} onClick={()=>setSelected(i)}>
    <small>{String(i).padStart(2,'0')}</small>
    <span>{i===0?'Original recorded intake':t.step!.action.replaceAll('_',' ')}</span>
    <em>{t.decision?(t.decision.accepted?'assumed observation':'guard rejection'):'initial'}</em>
   </button></li>)}</ol>
  <div className="l119-before-after" data-testid="composition-before-after">
    <div><small>BEFORE</small><p>Merchant <b>{prev.merchant}</b></p><p>Payment <b>{prev.payment}</b></p><p>Kitchen <b>{prev.kitchen}</b></p><p>Journey <b>{prev.journey}</b></p></div>
    <div><small>AFTER</small><p>Merchant <b>{v.state.merchant}</b></p><p>Payment <b>{v.state.payment}</b></p><p>Kitchen <b>{v.state.kitchen}</b></p><p>Journey <b>{v.state.journey}</b></p></div>
  </div>
  <div className="l119-decision" data-testid="sequence-outcome">
   <b>{v.decision?(v.decision.accepted?'Accepted in the classroom model':'Rejected; original state retained'):'Start with order intake only'}</b>
   <p>{v.decision?'Guard: '+v.decision.guard:'Choose a step in the sequence.'}</p>
   <p>{c.expected}</p>
  </div>
  <div className="l119-observations"><h4>Appended teaching observations</h4>
   {v.state.history.length?<ol>{v.state.history.map((label,i)=><li key={i}>{String(i+1).padStart(2,'0')} · {label}</li>)}</ol>:<p>None yet; original local intake only.</p>}</div>
  <Truth state={v.state}/>
  <p className="l119-warning">This is a TypeScript mechanism aligned to Java design; only separately executed Java CI establishes local application behavior. No real provider results.</p>
 </figure>;
}
export function CompositionPredictionLab(){
 const [question,setQuestion]=useState(0),[answer,setAnswer]=useState<string|null>(null),[reveal,setReveal]=useState(false);
 const q=questions[question],c=casebook.find(c=>c.id===q.caseId)!;
 const step=trace(c)[q.stepIndex],d=step.decision!;
 return <figure className="l119-figure" data-testid="composition-prediction-lab">
  <figcaption><span className="l119-eyebrow">PREDICTION BEFORE REVEAL · SEVEN CASES</span>
   <h3>Predict the partial-state outcome</h3>
   <p>Decide before seeing the guard and resulting independent states. Changing a question resets your prediction.</p></figcaption>
  <label className="l119-select">Problem<select aria-label="Prediction problem" value={question} onChange={e=>{setQuestion(Number(e.target.value));setAnswer(null);setReveal(false)}}>
   {questions.map((x,i)=><option key={x.id} value={i}>{String(i+1).padStart(2,'0')} · {casebook.find(c=>c.id===x.caseId)?.name}</option>)}</select></label>
  <p><strong>Action:</strong> {step.step?.action}. <strong>POL-01 assumption:</strong> {c.policy.paymentSequence}.</p>
  <fieldset className="l119-answers"><legend>What is true immediately after this command?</legend>
   {q.answers.map(option=><label key={option}><input type="radio" name="composition-answer" checked={answer===option} onChange={()=>{setAnswer(option);setReveal(false)}}/>{option}</label>)}
  </fieldset>
  <button type="button" disabled={!answer} onClick={()=>setReveal(true)}>Reveal causal reasoning</button>
  {reveal&&<div className="l119-decision" data-testid="composition-prediction-result" role="status">
   <b>{answer===q.correct?'Prediction matches the model':'Review the missing guard or evidence'}</b>
   <p><strong>Expected:</strong> {q.correct}. {q.why}</p>
   <p>Guard: {d.guard}; {d.accepted?'new simulated observation only':'unchanged snapshot and no success fact'}.</p>
  </div>}
  <p className="l119-warning">All source evidence and commercial rules are hypothetical. A model prediction does not authorize a merchant, refund, or delivery action.</p>
 </figure>;
}
