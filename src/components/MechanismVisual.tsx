import type { RaceResult } from '../simulation/race';

export function StateDiagram({ finalStatus }: { finalStatus: RaceResult['finalStatus'] }) {
  return (
    <div className="mechanism-stage" role="img" aria-label={'State diagram: PLACED has guarded transitions to CANCELLED and ACCEPTED. Final state ' + finalStatus}>
      <svg viewBox="0 0 660 186" className="diagram-svg" aria-hidden="true">
        <defs><marker id="arrowstate" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#768bb4" /></marker></defs>
        <path d="M218 90 L407 40" stroke="#768bb4" strokeWidth="2" markerEnd="url(#arrowstate)" fill="none" />
        <path d="M218 100 L407 150" stroke="#768bb4" strokeWidth="2" markerEnd="url(#arrowstate)" fill="none" />
        <rect x="24" y="69" width="193" height="62" rx="14" className={'state-node ' + (finalStatus === 'PLACED' ? 'selected' : '')}/>
        <text x="120" y="106" textAnchor="middle" className="state-label">PLACED</text>
        <rect x="414" y="15" width="210" height="62" rx="14" className={'state-node ' + (finalStatus === 'CANCELLED' ? 'selected' : '')}/>
        <text x="519" y="52" textAnchor="middle" className="state-label">CANCELLED</text>
        <rect x="414" y="115" width="210" height="62" rx="14" className={'state-node ' + (finalStatus === 'ACCEPTED' ? 'selected' : '')}/>
        <text x="519" y="152" textAnchor="middle" className="state-label">ACCEPTED</text>
        <text x="320" y="49" className="svg-caption">Cancel</text>
        <text x="320" y="160" className="svg-caption">Accept</text>
      </svg>
      <p className="small muted">Both transitions are legal only from PLACED. The model tests whether competing commands can both report success.</p>
    </div>
  );
}
export function SequenceView({ result }: { result: RaceResult }) {
  const visible = result.steps.slice(0, 10);
  return (
    <div className="timeline-visual" aria-label="Execution timeline">
      <div className="timeline-axis"><span>Customer</span><span>Persisted order</span><span>Restaurant</span></div>
      {visible.map(step => (
        <div className={'timeline-row ' + step.kind} key={step.index}>
          <span className="timeline-count">{String(step.index).padStart(2, '0')}</span>
          <span className="timeline-actor">{step.actor}</span>
          <span className="timeline-message">{step.label}<small>{step.before} → {step.after}</small></span>
        </div>
      ))}
    </div>
  );
}
export function EvidenceLegend() {
  return <aside className="info-strip">
    <strong>Evidence boundary</strong>
    <span>This is an illustrative deterministic simulation. Actual Java concurrency behavior, database atomicity, and production guarantees remain unverified until executed project experiments exist.</span>
  </aside>;
}
