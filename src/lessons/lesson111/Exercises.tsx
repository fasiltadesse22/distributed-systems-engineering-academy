import { useState } from 'react';
import { authorityOptions,challenges,diagnosticEvidence } from './model';
import type {AuthorityId} from './model';
export function AuthorityChallenge(){
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState<Record<string,AuthorityId>>({});
  const [revealed,setRevealed]=useState<Record<string,boolean>>({});
  const current=challenges[index];
  const response=answers[current.id]??'';
  const isRevealed=Boolean(revealed[current.id]);
  const answered=Object.keys(revealed).filter(id=>revealed[id]).length;
  const correct=challenges.filter(c=>revealed[c.id]&&answers[c.id]===c.answer).length;
  return <section className="l111-tool" aria-labelledby="challenge-head" data-testid="authority-challenge">
    <div className="l111-tool-head"><div><span className="eyebrow">PREDICT · AUTHORITY CHALLENGE</span><h3 id="challenge-head">Assign the decision, not the UI</h3><p>Each case asks about a precise verb. Answer first, reveal the reasoning, and compare against your assumptions.</p></div><span className="l111-pill">{index+1} / {challenges.length}</span></div>
    <div className="l111-case">
      <div className="l111-case-progress" aria-label="Exercise selection">{challenges.map((q,i)=><button type="button" aria-label={'Question '+(i+1)} aria-pressed={index===i} className={index===i?'active':''} key={q.id} onClick={()=>setIndex(i)}>{i+1}</button>)}</div>
      <p className="l111-case-context">{current.scenario}</p><h4>{current.question}</h4>
      <div className="l111-field-row"><label>Choose business authority
        <select data-testid="challenge-answer" value={response} disabled={isRevealed} onChange={e=>setAnswers(x=>({...x,[current.id]:e.target.value as AuthorityId}))}>
          <option value="">Choose an answer…</option>{authorityOptions.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
      </label></div>
      {!isRevealed?<button type="button" className="button primary" disabled={!response} onClick={()=>setRevealed(x=>({...x,[current.id]:true}))}>Reveal reasoning</button>:<div className={'l111-feedback '+(response===current.answer?'pass':'warn')} role="status" data-testid="challenge-feedback">
        <b>{response===current.answer?'Correct under the stated policy':'Compare the authority distinction'}</b><p>{current.explanation}</p><p><b>Common trap:</b> {current.temptation}</p></div>}
      <div className="l111-case-footer"><span>{answered} answered · {correct} aligned with the stated model</span><button type="button" className="l111-subtle" onClick={()=>setIndex((index+1)%challenges.length)}>Next case →</button></div>
    </div>
    <p className="l111-boundary">Assessment feedback is about the example authority contract, not a stakeholder-approved policy or a claim that another business could not choose a different allocation.</p>
  </section>;
}
const hypotheses=[
  {title:'Policy disagreement',detail:'Customer and restaurant terms specify incompatible cancellation windows. A missing business decision exists before the event chronology.'},
  {title:'Enforcement defect',detail:'A single policy exists, but the software acknowledged cancellation after the merchant already accepted. The guard or acknowledgement may be wrong.'},
  {title:'Read-model or message confusion',detail:'Screens label different events using the same word, or the customer screen is stale. Reconstruct precise fact provenance.'},
];
export function IncidentCaseboard(){
  const [evidence,setEvidence]=useState<string[]>([]);
  const [hypothesis,setHypothesis]=useState(0);
  const [showConclusion,setShowConclusion]=useState(false);
  const selected=diagnosticEvidence.filter(x=>evidence.includes(x.id));
  return <section className="l111-tool" aria-labelledby="incident-head" data-testid="incident-caseboard">
    <div className="l111-tool-head"><div><span className="eyebrow">DIAGNOSE · FICTIONAL PRODUCTION INCIDENT</span><h3 id="incident-head">“Cancelled” on one screen, “Accepted” on another</h3><p>Investigate evidence that differentiates unclear policy, incorrect enforcement, and stale presentation. Do not jump to “add retries”.</p></div><span className="l111-pill">Evidence reasoning</span></div>
    <div className="l111-inc-grid">
      <div><h4>Competing hypotheses</h4><div className="l111-hypotheses">{hypotheses.map((h,i)=><button type="button" key={h.title} className={hypothesis===i?'active':''} aria-pressed={hypothesis===i} onClick={()=>setHypothesis(i)}><b>{h.title}</b><span>{h.detail}</span></button>)}</div><h4>Choose evidence to inspect</h4><div className="l111-evidence-options">{diagnosticEvidence.map(item=><label key={item.id}><input type="checkbox" checked={evidence.includes(item.id)} onChange={e=>{setEvidence(xs=>e.target.checked?[...xs,item.id]:xs.filter(x=>x!==item.id));setShowConclusion(false)}}/><span>{item.title}</span></label>)}</div></div>
      <div className="l111-evidence-results"><span className="eyebrow">OBSERVATIONS FOR THIS SYNTHETIC CASE</span><h4>{selected.length?selected.length+' evidence source(s) revealed':'Evidence is still hidden'}</h4>
        {selected.length?selected.map(item=><div className="l111-evidence-card" key={item.id}><b>{item.title}</b><p>{item.detail}</p><p><b>Meaning:</b> {item.implication}</p><p><b>Next test:</b> {item.next}</p></div>):<p>Select a source of evidence. Each one changes which explanation is plausible, without mathematically proving a root cause.</p>}
      </div>
    </div>
    <div className="l111-case-footer"><span>{selected.length}/4 synthetic evidence items considered</span><button type="button" className="button primary" disabled={selected.length<2} onClick={()=>setShowConclusion(true)}>Form a provisional diagnosis</button></div>
    {showConclusion&&<div className="l111-feedback pass" role="status"><b>Provisional: {hypotheses[hypothesis].title}</b><p>{hypotheses[hypothesis].detail}</p><p>Evidence does not conclusively identify implementation fault. Record the policy version, acknowledged decision, merchant acceptance provenance, provider financial fact and remaining unknowns. Your selected hypothesis must be challenged against the alternatives.</p></div>}
    <p className="l111-boundary">All caseboard observations are fabricated training evidence. No real incident, merchant contract, charge, or platform telemetry was consulted.</p>
  </section>;
}
export function CommunicationDrill(){
  const [audience,setAudience]=useState<'colleague'|'staff'|'stakeholder'>('staff');
  const [draft,setDraft]=useState('');
  const [rubric,setRubric]=useState(false);
  const prompts={
    colleague:'In 60 seconds, distinguish customer intent, restaurant acceptance, provider evidence and platform communication.',
    staff:'A reviewer asks: “Why not let PaymentService be the single source of truth for everything that is paid?” Defend scoped authority without assuming a service split.',
    stakeholder:'Explain to the restaurant owner and a customer what “refund requested but not confirmed” means, including who must respond next.'
  };
  return <section className="l111-tool" aria-label="Audience-adapted design defense">
    <span className="eyebrow">DEFEND · AUDIENCE ADAPTATION</span><h3>Make the same decision intelligible at three levels</h3>
    <div className="l111-answer-row">{(['colleague','staff','stakeholder'] as const).map(a=><button type="button" key={a} aria-pressed={audience===a} className={audience===a?'selected':''} onClick={()=>{setAudience(a);setRubric(false)}}>{a==='staff'?'Staff reviewer':a==='colleague'?'Engineering colleague':'Business stakeholder'}</button>)}</div>
    <p>{prompts[audience]}</p>
    <label className="l111-free-response">Your explanation (stored only in current page state)<textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={5} placeholder="Explain what is known, what is policy, and what evidence would resolve uncertainty." /></label>
    <button type="button" className="button secondary" onClick={()=>setRubric(!rubric)}>{rubric?'Hide self-review rubric':'Show self-review rubric'}</button>
    {rubric&&<div className="l111-feedback pass"><b>Evaluate your explanation</b><p>Did you distinguish (1) request versus approval, (2) platform-composed status versus external fact, (3) organizational capability versus deployable, (4) unresolved policy versus verified evidence, and (5) next action in the audience's language?</p><p>There is no automated score here: the self-assessment is a prompt for independent defense and delayed recall.</p></div>}
  </section>;
}
