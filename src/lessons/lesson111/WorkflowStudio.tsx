import { useMemo, useState } from 'react';
import { runJourney } from './model';
import type { JourneyInput } from './model';
const initial:JourneyInput={restaurant:'accept',provider:'approved',cancellation:'none',policy:'strict',refund:'pending'};
export function WorkflowStudio(){
  const [input,setInput]=useState<JourneyInput>(initial);
  const [prediction,setPrediction]=useState('');
  const [show,setShow]=useState(false);
  const result=useMemo(()=>runJourney(input),[input]);
  const prepares=result.steps.some(s=>s.actor==='Kitchen');
  function update<Key extends keyof JourneyInput>(key:Key,value:JourneyInput[Key]){setInput(x=>({...x,[key]:value}));setPrediction('');setShow(false)}
  return <section className="l111-tool" aria-labelledby="journey-title" data-testid="workflow-studio">
    <div className="l111-tool-head"><div><span className="eyebrow">INTERACTIVE · WORKFLOW STUDIO</span><h3 id="journey-title">An order is a collaboration of authorities</h3><p>Choose restaurant, provider, and cancellation decisions. This example deliberately requests payment after restaurant acceptance.</p></div><span className="l111-pill">Deterministic scenario</span></div>
    <div className="l111-field-grid">
      <label>Restaurant decision<select data-testid="journey-restaurant" value={input.restaurant} onChange={e=>update('restaurant',e.target.value as JourneyInput['restaurant'])}><option value="accept">Accept feasible basket</option><option value="reject">Reject unavailable basket</option></select></label>
      <label>Provider result<select data-testid="journey-provider" disabled={input.restaurant==='reject'} value={input.provider} onChange={e=>update('provider',e.target.value as JourneyInput['provider'])}><option value="approved">Approved operation</option><option value="declined">Declined operation</option><option value="unknown">Unknown / pending</option></select></label>
      <label>Customer cancellation<select value={input.cancellation} disabled={input.restaurant==='reject'} onChange={e=>update('cancellation',e.target.value as JourneyInput['cancellation'])}><option value="none">No late cancellation</option><option value="after-accept">Request after merchant acceptance</option></select></label>
      <label>Example exception policy<select value={input.policy} disabled={input.restaurant==='reject'||input.cancellation==='none'} onChange={e=>update('policy',e.target.value as JourneyInput['policy'])}><option value="strict">Strict: deny after acceptance</option><option value="exception">Merchant/platform exception approved</option></select></label>
      <label>Provider refund result<select value={input.refund} disabled={input.restaurant==='reject'||input.provider!=='approved'||input.cancellation==='none'||input.policy==='strict'} onChange={e=>update('refund',e.target.value as JourneyInput['refund'])}><option value="pending">Refund pending</option><option value="confirmed">Provider refund confirmed</option><option value="rejected">Provider refund rejected</option></select></label>
    </div>
    <div className="l111-predict"><h4>Predict before revealing the timeline</h4><p>In this scenario, will the kitchen begin preparation?</p><div className="l111-answer-row"><button type="button" aria-pressed={prediction==='yes'} className={prediction==='yes'?'selected':''} onClick={()=>setPrediction('yes')}>Yes, preparation begins</button><button type="button" aria-pressed={prediction==='no'} className={prediction==='no'?'selected':''} onClick={()=>setPrediction('no')}>No, preparation does not begin</button></div><button type="button" className="button primary" disabled={!prediction} onClick={()=>setShow(true)}>Run illustrated business journey</button></div>
    {show?<div className="l111-flow-output" data-testid="journey-outcome">
      <div className="l111-outcome"><span className="eyebrow">{prediction===(prepares?'yes':'no')?'Prediction matched':'Prediction revised'}</span><h4>{result.orderOutcome}</h4><p><b>Financial state:</b> {result.paymentOutcome}</p><p><b>Customer message:</b> {result.customerMessage}</p><div className="l111-feedback warn"><b>Do not infer more than the model says</b><p>{result.warning}</p></div></div>
      <ol className="l111-event-list" aria-label="Workflow event timeline">{result.steps.map(s=><li key={s.id}><div className="l111-event-marker">{String(s.id).padStart(2,'0')}</div><div className="l111-event-card"><span className="eyebrow">{s.actor} · AUTHORITY: {s.authority}</span><h4>{s.action}</h4><p><b>Business fact / observation:</b> {s.fact}</p><p>{s.analysis}</p></div></li>)}</ol>
      <button className="l111-subtle" onClick={()=>{setShow(false);setPrediction('')}}>Hide result and try a different policy</button>
    </div>:<div className="l111-await">Timeline withheld. Choose controls, make a prediction, then reveal the modeled decision chain.</div>}
    <p className="l111-boundary">Illustration only. It does not authorize card payments, post refunds, execute Java code, or show production observations.</p>
  </section>;
}
