import {useState} from 'react';
import {
 casebook,evaluateCase,evaluateMerchant,evaluatePreparation,merchantDefault,preparationDefault,
 merchantMatrix,preparationMatrix,
 type Decision,type MerchantInput,type PreparationInput,type MerchantState,type MerchantAction,
 type MerchantRole,type TeachingPolicy,type PrepStage,type PrepAction,type PrepActor,type Prediction
} from './model';
import './lesson.css';

function GuardOutcomes({result}:{result:Decision}){
 const failed=result.guards.filter(x=>!x.passed);
 return <div className="l117-outcome" data-testid="guard-evaluation-result" aria-live="polite">
   <div className="l117-result-header"><span className="l117-kicker">DETERMINISTIC PURE EVALUATION · NOT BUSINESS EXECUTION</span>
    <strong>{result.accepted?'Eligible illustrative candidate':'Rejected — no transition'}</strong>
    <p>{result.reason}</p>
   </div>
   <div className="l117-before-after" data-testid="guard-before-after">
    <div><small>BEFORE STATE</small><b>{result.before}</b></div>
    <span aria-hidden="true">→</span>
    <div><small>AFTER PURE DECISION</small><b>{result.next}</b><em>{result.accepted?'candidate only':'same original; unchanged'}</em></div>
   </div>
   <div className="l117-fact" data-testid="guard-success-fact">
    <b>{result.accepted?'Candidate label':'Success fact = None'}</b>
    <span>{result.candidateFact??'No fact, no state mutation, no external effect'}</span>
   </div>
   <div className="l117-guard-list">
    <div className="l117-guard-list-head"><strong>Evaluated guards</strong><small>{result.guards.filter(x=>x.passed).length} passed · {failed.length} failed</small></div>
    <ol>{result.guards.map((check,i)=><li key={check.code} className={!check.passed?'l117-failed':''}>
      <span className="l117-guard-index">{String(i+1).padStart(2,'0')}</span>
      <div><b>{check.code.replaceAll('_',' ')}</b><p>{check.explanation}</p></div>
      <span className="l117-guard-status">{check.passed?'PASS':'FAIL'}</span>
    </li>)}</ol>
   </div>
   <p className="l117-note">{result.authorityNotice}. All inputs involving external actors are controlled classroom assumptions.</p>
 </div>;
}
function Flag({checked,onChange,label}:{checked:boolean;onChange:(value:boolean)=>void;label:string}){
 return <label className="l117-flag"><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)}/>{label}</label>;
}
function Choice<T extends string>({value,onChange,label,values}:{value:T;onChange:(v:T)=>void;label:string;values:readonly T[]}){
 return <label className="l117-choice"><span>{label}</span><select aria-label={label} value={value} onChange={e=>onChange(e.target.value as T)}>
  {values.map(v=><option key={v} value={v}>{v.replaceAll('_',' ')}</option>)}
 </select></label>;
}
export function GuardStudio(){
 const [mode,setMode]=useState<'merchant'|'preparation'>('merchant');
 const [merchant,setMerchant]=useState<MerchantInput>({...merchantDefault});
 const [prep,setPrep]=useState<PreparationInput>({...preparationDefault});
 const mm=<K extends keyof MerchantInput>(field:K,value:MerchantInput[K])=>setMerchant(v=>({...v,[field]:value}));
 const pp=<K extends keyof PreparationInput>(field:K,value:PreparationInput[K])=>setPrep(v=>({...v,[field]:value}));
 const result=mode==='merchant'?evaluateMerchant(merchant):evaluatePreparation(prep);
 return <figure className="l117-studio" data-testid="guarded-transition-studio">
  <figcaption><span className="l117-kicker">GUARDED TRANSITION INSPECTOR</span><strong>Change one prerequisite. See precisely why the decision changes.</strong>
   <p>All eleven merchant guards or six kitchen-preparation guards are evaluated, with explicit actor authority, source assumptions and no-op rejection.</p></figcaption>
  <div className="l117-switch" role="group" aria-label="Choose guarded model">
   <button type="button" aria-pressed={mode==='merchant'} onClick={()=>setMode('merchant')}>Merchant decision</button>
   <button type="button" aria-pressed={mode==='preparation'} onClick={()=>setMode('preparation')}>Preparation guard probe</button>
  </div>
  {mode==='merchant'?<div className="l117-config" data-testid="merchant-guard-controls">
   <div className="l117-field-grid">
    <Choice label="Current merchant decision state" value={merchant.state} onChange={v=>mm('state',v)} values={['PENDING','ACCEPTED','REJECTED'] as MerchantState[]}/>
    <Choice label="Requested merchant action" value={merchant.action} onChange={v=>mm('action',v)} values={['ACCEPT','REJECT'] as MerchantAction[]}/>
    <Choice label="Locally expected state" value={merchant.expectedState} onChange={v=>mm('expectedState',v)} values={['PENDING','ACCEPTED','REJECTED'] as MerchantState[]}/>
    <Choice label="Actor role" value={merchant.role} onChange={v=>mm('role',v)} values={['CUSTOMER','PLATFORM','MERCHANT_OPERATOR'] as MerchantRole[]}/>
    <Choice label="POL-02 teaching policy" value={merchant.policy} onChange={v=>mm('policy',v)} values={['UNRESOLVED','EDUCATIONAL_ONE_SHOT'] as TeachingPolicy[]}/>
   </div>
   <div className="l117-flags">
    <Flag checked={merchant.requestOrderMatches} onChange={v=>mm('requestOrderMatches',v)} label="Same OrderId"/>
    <Flag checked={merchant.requestRestaurantMatches} onChange={v=>mm('requestRestaurantMatches',v)} label="Same target RestaurantId"/>
    <Flag checked={merchant.actorRestaurantMatches} onChange={v=>mm('actorRestaurantMatches',v)} label="Actor belongs to target merchant"/>
    <Flag checked={merchant.technicallyAuthenticatedAssumed} onChange={v=>mm('technicallyAuthenticatedAssumed',v)} label="Authentication assumed"/>
    <Flag checked={merchant.businessAuthorizedAssumed} onChange={v=>mm('businessAuthorizedAssumed',v)} label="Business authorization assumed"/>
    <Flag checked={merchant.basketTermsMatchAssumed} onChange={v=>mm('basketTermsMatchAssumed',v)} label="Basket/price terms match assumed"/>
    <Flag checked={merchant.sourceEvidenceAssumed} onChange={v=>mm('sourceEvidenceAssumed',v)} label="Merchant source evidence assumed"/>
   </div>
  </div>:<div className="l117-config" data-testid="preparation-guard-controls">
   <div className="l117-field-grid">
    <Choice label="Current preparation stage" value={prep.stage} onChange={v=>pp('stage',v)} values={['NOT_STARTED','PREPARING','READY'] as PrepStage[]}/>
    <Choice label="Preparation command" value={prep.action} onChange={v=>pp('action',v)} values={['START_PREPARING','COMPLETE_PREPARATION'] as PrepAction[]}/>
    <Choice label="Merchant decision state" value={prep.merchantState} onChange={v=>pp('merchantState',v)} values={['PENDING','ACCEPTED','REJECTED'] as MerchantState[]}/>
    <Choice label="Actor role for preparation" value={prep.actor} onChange={v=>pp('actor',v)} values={['CUSTOMER','PLATFORM','KITCHEN_OPERATOR'] as PrepActor[]}/>
   </div>
   <div className="l117-flags">
    <Flag checked={prep.orderMatches} onChange={v=>pp('orderMatches',v)} label="Matching OrderId"/>
    <Flag checked={prep.merchantEvidenceAssumed} onChange={v=>pp('merchantEvidenceAssumed',v)} label="Merchant acceptance evidence assumed"/>
    <Flag checked={prep.policyAssumed} onChange={v=>pp('policyAssumed',v)} label="Hypothetical POL-04 enabled"/>
   </div>
  </div>}
  <div className="l117-actions"><button type="button" onClick={()=>{setMerchant({...merchantDefault});setPrep({...preparationDefault})}}>Reset assumptions</button><span>Change any control to reevaluate deterministically; nothing is persisted.</span></div>
  <GuardOutcomes result={result}/>
 </figure>;
}

export function TransitionTableExplorer(){
 const [kind,setKind]=useState<'merchant'|'preparation'>('merchant');
 const [selected,setSelected]=useState(0);
 const merchant=merchantMatrix[Math.min(selected,merchantMatrix.length-1)];
 const prep=preparationMatrix[Math.min(selected,preparationMatrix.length-1)];
 const result=kind==='merchant'
  ?evaluateMerchant({...merchantDefault,state:merchant.state,action:merchant.action,expectedState:merchant.state})
  :evaluatePreparation({...preparationDefault,stage:prep.stage,action:prep.action});
 return <figure className="l117-table-figure" data-testid="guard-decision-table">
  <figcaption><span className="l117-kicker">TOTAL DECISION TABLE · STATE TOPOLOGY</span><strong>Six state/action pairs per model, plus independent contextual guards</strong>
   <p>Choose a row to inspect its pure result under all other educational assumptions being satisfied. Production legality may still be blocked by unresolved business policy.</p></figcaption>
  <div className="l117-switch" role="group" aria-label="Choose decision matrix">
   <button type="button" aria-pressed={kind==='merchant'} onClick={()=>{setKind('merchant');setSelected(0)}}>Merchant: 3 × 2</button>
   <button type="button" aria-pressed={kind==='preparation'} onClick={()=>{setKind('preparation');setSelected(0)}}>Preparation: 3 × 2</button>
  </div>
  <table className="l117-matrix"><thead><tr><th>Current state</th><th>Action</th><th>Eligible?</th><th>Inspect</th></tr></thead><tbody>
   {kind==='merchant'?merchantMatrix.map((r,i)=><tr key={r.state+r.action}>
    <td>{r.state}</td><td>{r.action}</td><td>{r.eligibleUnderAssumptions?'Candidate':'Rejected'}</td><td><button type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)}>Inspect row {i+1}</button></td>
   </tr>):preparationMatrix.map((r,i)=><tr key={r.stage+r.action}>
    <td>{r.stage}</td><td>{r.action}</td><td>{r.eligibleUnderAssumptions?'Candidate':'Rejected'}</td><td><button type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)}>Inspect row {i+1}</button></td>
   </tr>)}
  </tbody></table>
  <div className="l117-matrix-result" data-testid="decision-table-result">
   <b>Selected rule: {result.before} → {result.next}</b>
   <p>{result.accepted?'Eligible candidate under explicit classroom assumptions.':'Rejected; unchanged prior state and no success fact.'} {result.reason}</p>
   <p><strong>Candidate label:</strong> {result.candidateFact??'None'}</p>
  </div>
 </figure>;
}

export function CommitBoundaryTimeline(){
 const steps=[
  ['1 · Receive command','A requested business action enters an application boundary.','Request ≠ accepted decision'],
  ['2 · Authenticate and authorize','Verify real principal and resource scope at a trusted boundary.','Our current model receives only assumptions'],
  ['3 · Evaluate guards','Compute a candidate next state against an observed snapshot.','Pure candidate ≠ write'],
  ['4 · Enforce at commit','Production design would atomically check the expected version/state before writing.','NOT IMPLEMENTED for merchant/kitchen'],
  ['5 · Establish authoritative fact','Only the owner after actual effect may attest the result; intake has its own local post-save fact.','No merchant/provider fact here'],
  ['6 · Project customer message','Render evidence-qualified status and surface uncertainty.','UI is an observer, not a source authority']
 ];
 return <figure className="l117-boundary" data-testid="guard-commit-boundary"><figcaption><span className="l117-kicker">TIME-OF-CHECK VERSUS TIME-OF-USE</span><strong>A passing guard is not a committed transition</strong></figcaption>
  <ol>{steps.map(([title,description,truth])=><li key={title}><h4>{title}</h4><p>{description}</p><small>{truth}</small></li>)}</ol>
  <p className="l117-note">The existing Java intake service executes a local repository save before OrderRequestRecorded. New merchant and preparation evaluators stop at step 3; they neither implement step 4 nor attest external effects.</p>
 </figure>;
}

export function GuardPredictionLab(){
 const [scenario,setScenario]=useState(casebook[0].id);
 const [prediction,setPrediction]=useState<Prediction|null>(null);
 const [reveal,setReveal]=useState(false);
 const entry=casebook.find(c=>c.id===scenario)!;
 const result=evaluateCase(entry);
 return <section className="l117-predict" data-testid="guard-prediction-lab">
  <header><span className="l117-kicker">PREDICT → REVEAL → EXPLAIN</span><h3>Which guard determines whether the action is legal?</h3><p>Choose a case, predict whether it is eligible under its classroom assumptions, then inspect the decisive rule, unchanged state and candidate-fact boundary.</p></header>
  <label className="l117-choice"><span>Business situation</span><select aria-label="Guard prediction scenario" data-testid="guard-scenario" value={scenario} onChange={e=>{setScenario(e.target.value);setPrediction(null);setReveal(false)}}>
   {casebook.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
  </select></label>
  <fieldset><legend>What will the pure model return?</legend>
   <label><input type="radio" name="guard-prediction" checked={prediction==='eligible'} onChange={()=>{setPrediction('eligible');setReveal(false)}}/> Eligible illustrative candidate</label>
   <label><input type="radio" name="guard-prediction" checked={prediction==='rejected'} onChange={()=>{setPrediction('rejected');setReveal(false)}}/> Rejected — state unchanged, no fact</label>
  </fieldset>
  <button className="l117-reveal" type="button" disabled={!prediction} onClick={()=>setReveal(true)}>Reveal guard reasoning</button>
  {reveal&&<div className="l117-predict-reveal" data-testid="guard-prediction-result" role="status">
   <strong>{prediction===entry.answer?'Prediction matches the model':'Reconsider the guard and its evidence'}</strong>
   <p>{entry.teaching}</p>
   <p><b>Decision:</b> {result.accepted?'Eligible candidate':'Rejected'} · <b>Before/after:</b> {result.before} → {result.next}</p>
   <p><b>Decisive guard:</b> {result.guards.find(x=>!x.passed)?.code??'All guards pass under explicitly selected assumptions'}</p>
   <p><b>Candidate label:</b> {result.candidateFact??'None — no success fact'}</p>
   <p className="l117-note">{result.authorityNotice}</p>
  </div>}
 </section>;
}
