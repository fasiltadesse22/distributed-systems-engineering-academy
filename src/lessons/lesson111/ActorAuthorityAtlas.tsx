import { useState } from 'react';
import { actors,actorById,decisions,assessAuthority,authorityOptions } from './model';
import type {ActorId, AuthorityId} from './model';

function SummaryPill({children,kind}:{children:React.ReactNode,kind?:string}){return <span className={'l111-pill '+(kind??'')}>{children}</span>;}
export function ActorAuthorityAtlas(){
  const [actor,setActor]=useState<ActorId>('restaurant');
  const [selectedDecision,setSelectedDecision]=useState('fulfillment');
  const [assigned,setAssigned]=useState<Record<string,AuthorityId>>({});
  const [explain,setExplain]=useState(true);
  const current=actorById[actor];
  const decision=decisions.find(d=>d.id===selectedDecision)??decisions[0];
  const proposed=assigned[decision.id]??decision.baseline;
  const assessment=assessAuthority(decision,proposed);
  const discrepancies=decisions.filter(d=>assessAuthority(d,assigned[d.id]??d.baseline).match===false);
  const actorDecisions=decisions.filter(d=>(assigned[d.id]??d.baseline)===actor);
  return <section className="l111-tool" aria-labelledby="atlas-head" data-testid="authority-atlas">
    <div className="l111-tool-head"><div><span className="eyebrow">INTERACTIVE · ACTOR-CAPABILITY ATLAS</span><h3 id="atlas-head">Who has the authority to decide?</h3><p>Inspect business participants, then change who controls a decision. The warning evaluates a documented example policy, not the correctness of every possible business model.</p></div><SummaryPill>Editable model · Type C</SummaryPill></div>
    <div className="l111-actor-grid" role="group" aria-label="Choose actor">
      {actors.map(a=><button type="button" key={a.id} aria-pressed={actor===a.id} onClick={()=>setActor(a.id)} className={'l111-actor '+(actor===a.id?'active':'')}>
        <span className="l111-actor-avatar">{a.label.slice(0,2).toUpperCase()}</span><span>{a.label}</span>
      </button>)}
    </div>
    <div className="l111-actor-inspector">
      <div><span className="eyebrow">SELECTED ACTOR · {current.kind.replace('-',' ')}</span><h3>{current.label}</h3><p className="l111-goal"><b>Goal:</b> {current.goal}</p><h4>Incentives</h4><ul>{current.incentives.map(x=><li key={x}>{x}</li>)}</ul><h4>Responsibilities</h4><ul>{current.responsibilities.map(x=><li key={x}>{x}</li>)}</ul></div>
      <div className="l111-atlas-relations">
        <h4>Can attest to these facts</h4><ul>{current.authoritativeFacts.map(x=><li key={x}>{x}</li>)}</ul>
        <h4>Reads or observes</h4><ul>{current.observes.map(x=><li key={x}>{x}</li>)}</ul>
        <h4>Current authority edges</h4>{actorDecisions.length?<div className="l111-chiprow">{actorDecisions.map(d=><button key={d.id} className="l111-edge" onClick={()=>{setSelectedDecision(d.id);setExplain(true)}} type="button">{current.label} → {d.name}</button>)}</div>:<p>No direct decision rights in the currently assigned model.</p>}
        <p className="l111-small">Dependencies: {current.dependsOn.map(x=>actorById[x].label).join(' · ')}</p>
        <p className="l111-risk"><b>Modeling hazard:</b> {current.risk}</p>
      </div>
    </div>
    <div className="l111-decision-builder">
      <div className="l111-builder-head"><div><span className="eyebrow">EDIT THE AUTHORITY EDGE</span><h4>Challenge the proposed business decision rights</h4></div><button type="button" className="l111-subtle" onClick={()=>{setAssigned({});setExplain(true)}}>Reset ownership model</button></div>
      <div className="l111-field-row"><label>Business decision
        <select data-testid="authority-decision" value={selectedDecision} onChange={e=>{setSelectedDecision(e.target.value);setExplain(true)}}>
          {decisions.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </label>
      <label>Assign decision authority
        <select data-testid="authority-owner" value={proposed} onChange={e=>{setAssigned(x=>({...x,[decision.id]:e.target.value as AuthorityId}));setExplain(true)}}>
          {authorityOptions.map(x=><option key={x.id} value={x.id}>{x.label}</option>)}
        </select>
      </label></div>
      <div className="l111-decision-context"><p><b>Decision question:</b> {decision.question}</p><p><b>Requester:</b> {decision.requester} · <b>Evidence source:</b> {decision.factSource} · <b>Accountable:</b> {decision.accountable}</p></div>
      {explain && <div className={'l111-feedback '+(assessment.match?'pass':'warn')} role="status" data-testid="authority-feedback"><b>{assessment.level==='unresolved'?'Policy question retained':assessment.match?'Consistent with the example policy':'Ownership conflict flagged'}</b><p>{assessment.message}</p></div>}
      <div className="l111-summary-row"><SummaryPill kind={discrepancies.length?'warning':'calm'}>{discrepancies.length} proposed decision conflicts</SummaryPill><span className="l111-small">Changing an assignment changes the modeled authority edge; no backend record is modified.</span></div>
      <details><summary>Inspect all decisions and current authority assignments</summary><div className="l111-table-wrap"><table><thead><tr><th>Decision</th><th>Assigned authority</th><th>Baseline status</th></tr></thead><tbody>{decisions.map(d=>{const a=assigned[d.id]??d.baseline;const result=assessAuthority(d,a);return <tr key={d.id}><td><button className="l111-linkbutton" onClick={()=>setSelectedDecision(d.id)}>{d.name}</button></td><td>{authorityOptions.find(o=>o.id===a)?.label}</td><td>{result.match?(d.policy==='unresolved'?'Unresolved explicitly':'Aligned'):'Needs review'}</td></tr>})}</tbody></table></div></details>
    </div>
  </section>;
}
