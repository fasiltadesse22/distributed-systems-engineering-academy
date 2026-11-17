import {useState} from 'react';
import {cases, evaluateWorkflow, type ScenarioId, type Prediction} from './model';
import './lesson.css';

const milestones=[
 {actor:'Customer',action:'Submits basket',fact:'Customer purchase intent',evidence:'Conceptual intent'},
 {actor:'Platform',action:'Validates and saves intake',fact:'OrderRequestRecorded',evidence:'Implemented locally in Java'},
 {actor:'Restaurant',action:'Accepts or rejects request',fact:'Merchant decision',evidence:'Conceptual; policy-dependent'},
 {actor:'Provider',action:'Authorizes or captures money',fact:'Financial operation outcome',evidence:'Conceptual external authority'},
 {actor:'Kitchen',action:'Prepares food',fact:'Preparation started / ready',evidence:'Conceptual physical effects'},
 {actor:'Delivery',action:'Receives custody and delivers',fact:'Handoff / delivery evidence',evidence:'Conceptual external authority'},
 {actor:'Platform',action:'Reconciles observed facts',fact:'Derived customer projection',evidence:'Observation, not fact authority'}
];
export function WorkflowSwimlane(){
 return <figure className="l115-figure" data-testid="workflow-swimlane">
  <figcaption><span className="l115-kicker">ACTOR SWIMLANE · EXPLANATORY, NOT A DEPLOYMENT DIAGRAM</span><strong>One journey across seven responsibilities</strong><p>Follow the normal path from top to bottom. Each lane establishes only its own fact; the merchant and financial operations may be ordered differently under POL-01.</p></figcaption>
  <ol className="l115-lanes">{milestones.map((m,i)=><li key={m.actor+i} className={i===1?'actual':''}>
    <span className="l115-step">{String(i+1).padStart(2,'0')}</span><span className="l115-actor">{m.actor}</span>
    <div><strong>{m.action}</strong><p>{m.fact}</p><small>{m.evidence}</small></div>
   </li>)}</ol>
  <div className="l115-branches"><div><strong>Restaurant rejects after capture</strong><p>Fulfillment is rejected; the financial effect remains and may require refund/reconciliation under unresolved policy.</p></div><div><strong>Customer cancels after preparation</strong><p>Cancellation is a request; kitchen work cannot be undone by a status update.</p></div><div><strong>Provider outcome unknown</strong><p>Missing acknowledgement cannot be converted into “paid” or “not paid.”</p></div></div>
  <p className="l115-note">The single implemented business milestone is local order-request intake. No merchant, provider, kitchen or carrier integration is present in the pinned Java checkpoint.</p>
 </figure>;
}
const authority=[
 // Milestone, identity, authority, observer / projection, evidence, unknown, external effect
 ['Basket selected','Customer intention / basket','Customer','Platform may observe selection','Conceptual only','Basket or price may be stale','None'],
 ['Purchase requested','Request/correlation ID','Customer initiates; platform receives','Platform can display submitting','Conceptual intent; current POST exists','Response may be lost','None'],
 ['Eligibility decision','Proposed basket + RestaurantId','Platform intake rules','Client receives permitted/rejected decision','Implemented locally','Timeout may obscure decision','None'],
 ['Intake recorded','OrderId + CustomerId + RestaurantId','Platform process-local repository','Customer: “Request received”','Implemented locally','Acknowledgement may be lost','Volatile local storage write'],
 ['Merchant invitation submitted','OrderId + merchant reference','Platform for submission only','Customer: “Awaiting restaurant”','Conceptual only','Delivery/response unknown','None'],
 ['Merchant accepts / rejects','OrderId + merchant decision reference','Restaurant','Customer: “Accepted” only if observed','Conceptual; POL-02','Decision may be unknown','Commercial commitment'],
 ['Payment operation confirmed','PaymentAttemptId + provider operation','Payment provider / financial ledger','Customer: “Authorized” or “Captured” precisely','Conceptual; POL-01','Provider outcome may be unknown','Financial authorization or capture'],
 ['Preparation started','OrderId + kitchen milestone','Kitchen/merchant','Customer: “Preparing” on evidence','Conceptual; POL-04','Late/missing start observation','Ingredients and labor consumed'],
 ['Preparation completed','OrderId + ready milestone','Kitchen/merchant','Customer: “Ready”','Conceptual','Readiness may be stale','Perishable prepared goods'],
 ['Custody transferred','OrderId + courier/handoff reference','Restaurant + carrier under custody policy','Customer: “Collected”','Conceptual; POL-09','Wrong package or unconfirmed pickup','Possession transfers'],
 ['Delivery completed','Fulfillment reference + delivery proof','Delivery/recipient under policy','Customer: “Delivered” with stated scope','Conceptual; POL-09','Disputed or missing delivery proof','Physical delivery effect'],
 ['Customer outcome projected','OrderId + correlated observations','Platform for projection, NOT external facts','Customer sees qualified summary','Derived presentation only','Missing, stale or disputed facts','No new merchant or provider effect'],
 ['Refund confirmed (conditional branch)','Refund operation + provider reference','Payment provider','Customer: “Refund confirmed” only on proof','Conceptual; POL-05–POL-07','Requested/processing is not confirmed','Financial refund effect']
];
export function AuthorityLedger(){
 return <figure className="l115-figure" data-testid="workflow-authority-ledger"><figcaption><span className="l115-kicker">FACT AUTHORITY OVERLAY</span><strong>Each milestone retains its own identity, observer and evidence boundary</strong><p>Read across a row: an observed message never gains authority over the underlying source. The refund milestone is a conditional remediation branch, not part of every successful delivery.</p></figcaption>
  <div className="l115-table-scroll"><table className="l115-ledger"><thead><tr><th>Milestone / fact</th><th>Identity</th><th>Authority</th><th>Observer / customer wording</th><th>Evidence status</th><th>Possible unknown</th><th>External effect</th></tr></thead><tbody>{authority.map(r=><tr key={r[0]}>{r.map((x,i)=><td key={i}>{x}</td>)}</tr>)}</tbody></table></div>
  <p className="l115-note">Only intake validation and local recording are implemented in the pinned Java baseline. Real restaurant, payment, kitchen, courier and refund claims need independently verified future evidence.</p>
 </figure>;
}
export function WorkflowScenarioExplorer(){
 const [id,setId]=useState<ScenarioId>('paid-rejected');
 const [prediction,setPrediction]=useState<Prediction|''>('');
 const [reveal,setReveal]=useState(false);
 const scenario=cases.find(x=>x.id===id)!;
 const outcome=evaluateWorkflow(id);
 return <section className="l115-lab" data-testid="workflow-scenario-explorer">
  <header><span className="l115-kicker">PREDICT → REVEAL → RECONCILE</span><h3>Partial Outcome Studio</h3><p>Change the business facts, commit to an interpretation, then inspect established authority and unresolved obligations. Deterministic conceptual model only.</p></header>
  <div className="l115-controls"><label>Business situation<select value={id} aria-label="Workflow scenario" data-testid="workflow-scenario" onChange={e=>{setId(e.target.value as ScenarioId);setPrediction('');setReveal(false)}}>{cases.map(x=><option key={x.id} value={x.id}>{x.label}</option>)}</select></label>
   <p>{scenario.prompt}</p>
   <fieldset><legend>What can the platform safely claim?</legend>{[
    ['complete','The full business journey is complete'],
    ['refund-complete','Any necessary refund is already complete'],
    ['partial','Some facts are known, but completion or remediation remains unresolved']
   ].map(([v,label])=><label className="l115-choice" key={v}><input type="radio" name="workflow-prediction" value={v} checked={prediction===v} onChange={()=>{setPrediction(v as Prediction);setReveal(false)}}/>{label}</label>)}</fieldset>
   <button type="button" disabled={!prediction} className="l115-run" onClick={()=>setReveal(true)}>Reveal authority and obligations</button>
   {reveal&&<div className="l115-result" role="status" data-testid="workflow-scenario-result">
    <strong>{prediction===outcome.expected?'Your prediction matches the model':'Compare your prediction with the model'}</strong>
    <p>{outcome.explanation}</p>
    <dl><div><dt>Established facts</dt><dd>{outcome.facts}</dd></div><div><dt>Authorities</dt><dd>{outcome.authorities}</dd></div><div><dt>Outstanding obligation</dt><dd>{outcome.obligation}</dd></div><div><dt>Customer-safe wording</dt><dd>{outcome.customer}</dd></div><div><dt>Policy dependency</dt><dd>{outcome.policy}</dd></div></dl>
    <p className="l115-note">Not evidence of actual merchant, provider or fulfillment functionality.</p>
   </div>}
  </div>
 </section>;
}
