import {useState} from 'react';
import {transitions,scenarios,scenarioTraces,interpretScenario,type Domain,type ScenarioId} from './model';
import './lesson.css';

const graph={
 order:{label:'Platform-owned Order intake',nodes:['NEW','REQUESTED'],links:[['NEW','REQUESTED','RECORD_INTAKE']]},
 restaurant:{label:'Illustrative merchant decision',nodes:['PENDING','ACCEPTED','REJECTED'],links:[['PENDING','ACCEPTED','ACCEPT'],['PENDING','REJECTED','REJECT']]},
 payment:{label:'Illustrative PaymentAttempt',nodes:['NOT_STARTED','SUBMITTED_UNKNOWN','AUTHORIZED','DECLINED','CAPTURED','REFUND_PENDING','REFUNDED'],links:[['NOT_STARTED','SUBMITTED_UNKNOWN','SUBMIT'],['SUBMITTED_UNKNOWN','AUTHORIZED','CONFIRM_AUTHORIZED'],['SUBMITTED_UNKNOWN','DECLINED','CONFIRM_DECLINED'],['SUBMITTED_UNKNOWN','CAPTURED','CONFIRM_CAPTURED'],['AUTHORIZED','CAPTURED','CONFIRM_CAPTURED'],['CAPTURED','REFUND_PENDING','REQUEST_REFUND'],['REFUND_PENDING','REFUNDED','CONFIRM_REFUNDED']]}
} as const;
const scope=(domain:Domain)=>domain==='order'?'LOCAL INTAKE IMPLEMENTED':'CONCEPTUAL LOCAL STATE ONLY';
export function StateMachineExplorer(){
 const [selected,setSelected]=useState(0);
 const edge=transitions[selected];
 return <figure className="l116-visual" data-testid="lifecycle-graphs">
  <figcaption><span className="l116-kicker">THREE DOMAINS · ONE DEPLOYABLE · NO EXTERNAL EFFECT</span><strong>Independent state graphs; select a transition to inspect its authority</strong>
   <p>Graphs encode isolated transition decisions, not an atomic workflow. Select an edge below to inspect its actor, rule and fact.</p></figcaption>
  <div className="l116-graphs">{(Object.keys(graph) as Domain[]).map(domain=><section key={domain} className="l116-machine" aria-label={graph[domain].label}>
    <small>{scope(domain)}</small><h4>{graph[domain].label}</h4>
    <ol>{graph[domain].nodes.map((node,i)=><li key={node}><span>{String(i+1).padStart(2,'0')}</span><b>{node}</b></li>)}</ol>
    <p className="l116-graph-caption">Legal transitions (illustrative for external actors)</p>
    <div className="l116-edge-grid">{graph[domain].links.map(([from,to,action])=>{
      const idx=transitions.findIndex(t=>t.domain===domain&&t.from===from&&t.to===to&&t.action===action);
      return <button key={from+action} type="button" aria-pressed={selected===idx} className={'l116-edge '+(selected===idx?'is-selected':'')} onClick={()=>setSelected(idx)}>{from} <span aria-hidden="true">→</span> {to}<small>{action}</small></button>;
    })}</div>
  </section>)}</div>
  <div className="l116-inspector" data-testid="transition-inspector" aria-live="polite">
   <span className="l116-kicker">SELECTED TRANSITION · {edge.evidence}</span><h4>{edge.from} — {edge.action} → {edge.to}</h4>
   <dl><div><dt>Entity / state owner</dt><dd>{edge.domain}</dd></div><div><dt>Responsible authority</dt><dd>{edge.authority}</dd></div><div><dt>Guard / evidence prerequisite</dt><dd>{edge.guard}</dd></div><div><dt>Fact or rejected action</dt><dd>{edge.fact??'No fact — unchanged state'}</dd></div></dl>
   <p>{edge.meaning}</p>
  </div>
  <p className="l116-caveat">The real Java Order intake remains the only implemented business effect. A pure transition label is not a merchant signature, a bank callback, or payment execution. Model terminality and sequencing assumptions are not approved policies.</p>
 </figure>;
}

export function CrossLifecycleOverlay(){
 const [index,setIndex]=useState<ScenarioId>('authorized-pending');
 const selected=interpretScenario(index);
 return <figure className="l116-visual" data-testid="cross-lifecycle-overlay">
  <figcaption><span className="l116-kicker">WORKFLOW COMPOSITION · NO SHARED COMMIT</span><strong>One OrderId; three different lifecycle questions</strong><p>Changing one lifecycle's observed condition must not rewrite the other two. The overall customer journey is derived, not stored as a magic order state.</p></figcaption>
  <label className="l116-selection">Choose a cross-lifecycle history<select aria-label="Composite workflow state" value={index} onChange={e=>setIndex(e.target.value as ScenarioId)}>{scenarios.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select></label>
  <div className="l116-overlay-lanes">
   <div><small>PLATFORM / REAL INTAKE</small><b>Order</b><strong>{selected.order}</strong><p>Stable OrderId</p></div>
   <div><small>MERCHANT / CONCEPTUAL</small><b>RestaurantDecision</b><strong>{selected.merchant}</strong><p>OrderId + RestaurantId</p></div>
   <div><small>PROVIDER / CONCEPTUAL</small><b>PaymentAttempt</b><strong>{selected.payment}</strong><p>PaymentAttemptId + OrderId</p></div>
  </div>
  <div className="l116-swimlane-scroll" aria-label="Cross-lifecycle journey over successive moments">
   <table className="l116-swimlane" data-testid="lifecycle-swimlane">
    <thead><tr><th>Business moment</th><th>Order (platform)</th><th>Restaurant (illustrative)</th><th>Payment (illustrative)</th><th>What the moment teaches</th></tr></thead>
    <tbody>{scenarioTraces[index].map((frame,i)=><tr key={i}>
     <th scope="row">{frame.moment}</th><td>{frame.order}</td><td>{frame.merchant}</td><td>{frame.payment}</td><td>{frame.meaning}</td>
    </tr>)}</tbody>
   </table>
  </div>
  <p className="l116-caveat">Read each row as a conceptual observation cut, not an atomic external transaction. Later columns can progress while the platform Order intake state remains REQUESTED.</p>
  {selected.otherAttempt&&<p className="l116-compare">Multiple independent attempt histories: {selected.otherAttempt}</p>}
  <p className="l116-resultline"><b>Derived customer projection:</b> {selected.customer}</p>
  <p className="l116-resultline"><b>Unresolved obligation:</b> {selected.obligation}</p>
  <p className="l116-caveat">The overlay displays three correlated model snapshots, not one atomic database read. No external payment or restaurant evidence exists in this exercise.</p>
 </figure>;
}

export function LifecyclePredictionLab(){
 const [scenarioId,setScenarioId]=useState<ScenarioId>('rejected-refund');
 const [choice,setChoice]=useState('');
 const [revealed,setRevealed]=useState(false);
 const s=interpretScenario(scenarioId);
 return <section className="l116-lab" data-testid="lifecycle-prediction-lab">
  <header><span className="l116-kicker">PREDICT → REVEAL → DEFEND</span><h3>Which business fact is actually established?</h3><p>Change the scenario, choose an interpretation, then reveal the independent states, missing evidence and remaining obligation. This is deterministic conceptual reasoning, not the execution of external services.</p></header>
  <label className="l116-selection">Scenario<select aria-label="Lifecycle scenario" data-testid="lifecycle-scenario" value={scenarioId} onChange={e=>{setScenarioId(e.target.value as ScenarioId);setChoice('');setRevealed(false)}}>{scenarios.map(s=><option value={s.id} key={s.id}>{s.label}</option>)}</select></label>
  <fieldset><legend>What should the platform conclude?</legend>
   {[['complete','The overall customer order is complete'],['partial','Independent states have progressed but obligations remain'],['uncertain','An external outcome is unknown and must be reconciled']].map(([v,label])=><label key={v} className="l116-choice"><input name="lifecycle-prediction" type="radio" value={v} checked={choice===v} onChange={()=>{setChoice(v);setRevealed(false)}}/>{label}</label>)}
  </fieldset>
  <button className="l116-reveal" type="button" disabled={!choice} onClick={()=>setRevealed(true)}>Reveal state and evidence</button>
  {revealed&&<div className="l116-feedback" data-testid="lifecycle-prediction-result" role="status" aria-live="polite">
    <strong>{choice===s.prediction?'Prediction matches the model':'Revisit the model and authority distinction'}</strong>
    <div className="l116-overlay-lanes"><div><small>ORDER</small><strong>{s.order}</strong></div><div><small>MERCHANT</small><strong>{s.merchant}</strong></div><div><small>PAYMENT</small><strong>{s.payment}</strong></div></div>
    <dl><div><dt>Why</dt><dd>{s.reason}</dd></div><div><dt>Authority boundary</dt><dd>{s.authority}</dd></div><div><dt>Customer-safe message</dt><dd>{s.customer}</dd></div><div><dt>Next obligation</dt><dd>{s.obligation}</dd></div></dl>
    <p className="l116-caveat">No provider, merchant decision or refund was actually executed by this academy lab.</p>
   </div>}
 </section>;
}
