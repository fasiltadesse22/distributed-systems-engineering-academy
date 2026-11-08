import { useMemo, useState } from 'react';
import { StateDiagram, SequenceView, EvidenceLegend } from './MechanismVisual';
import { runRace } from '../simulation/race';
import type { Sequence, Strategy } from '../simulation/race';

const question = 'Can Customer.Cancel and Restaurant.Accept both report success after reading PLACED?';
export default function RaceLab() {
  const [sequence, setSequence] = useState<Sequence>('overlap');
  const [strategy, setStrategy] = useState<Strategy>('unguarded');
  const [repeatCancel, setRepeatCancel] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [revealed, setRevealed] = useState(false);
  const outcome = useMemo(() => runRace({ sequence, strategy, repeatCancel }), [sequence, strategy, repeatCancel]);
  const configure = (fn: () => void) => { fn(); setRevealed(false); setPrediction(''); };
  const predictedCorrect = prediction === (outcome.contradiction ? 'yes' : 'no');
  return (
    <article className="lab-panel">
      <div className="eyebrow">Interactive Laboratory · LAB-11-01 · deterministic model</div>
      <h2>Cancellation vs restaurant acceptance</h2>
      <p className="lead">{question} Vary execution order and compare a fragile check-then-write implementation with an atomic expected-version guard.</p>
      <div className="lab-settings">
        <label>Execution ordering
          <select value={sequence} onChange={e => configure(() => setSequence(e.target.value as Sequence))}>
            <option value="overlap">Both actors read PLACED first</option>
            <option value="cancel-first">Cancel completes before Accept reads</option>
            <option value="accept-first">Accept completes before Cancel reads</option>
          </select>
        </label>
        <label>Write strategy
          <select value={strategy} onChange={e => configure(() => setStrategy(e.target.value as Strategy))}>
            <option value="unguarded">Unsafe: check once, then blind write</option>
            <option value="atomic">Guarded: compare state and version atomically</option>
          </select>
        </label>
        <label className="checkbox-line">
          <input type="checkbox" checked={repeatCancel} onChange={e => configure(() => setRepeatCancel(e.target.checked))}/>
          Repeat cancellation after both commands
        </label>
      </div>
      <div className="predict-block">
        <strong>Predict before reveal</strong>
        <p>Will both incompatible business outcomes be reported as successful?</p>
        <div className="segmented" role="group" aria-label="Predict a business contradiction">
          <button className={prediction === 'yes' ? 'active' : ''} type="button" onClick={() => setPrediction('yes')}>Yes, both succeed</button>
          <button className={prediction === 'no' ? 'active' : ''} type="button" onClick={() => setPrediction('no')}>No, one must fail</button>
        </div>
        <button className="primary" type="button" disabled={!prediction} onClick={() => setRevealed(true)}>Run modeled execution</button>
      </div>
      {revealed ? <>
        <div className={'result-banner ' + (outcome.contradiction ? 'danger' : 'success')}>
          <div><span className="eyebrow">Result · {predictedCorrect ? 'prediction matched' : 'prediction revised'}</span><h3>{outcome.contradiction ? 'Invariant violated' : 'Exclusive outcome preserved'}</h3></div>
          <div className="result-values"><span>Final: <b>{outcome.finalStatus}</b></span><span>Version: <b>{outcome.version}</b></span></div>
        </div>
        <p>{outcome.summary}</p>
        <p className="emphasis">{outcome.safety}</p>
        <StateDiagram finalStatus={outcome.finalStatus}/>
        <h3>Step-by-step event timeline</h3>
        <SequenceView result={outcome}/>
        <div className="question-card"><strong>Why did the second command behave this way?</strong><p>{strategy === 'atomic' ? 'The guard re-evaluates the authoritative current state/version at commit. Only the first request can commit from that snapshot.' : 'The unsafe branch trusts its original snapshot. With overlapping reads, the later write can overwrite state without reversing the fact that the earlier operation already reported success.'}</p></div>
        <button type="button" className="quiet-button" onClick={() => { setRevealed(false); setPrediction(''); }}>Hide outcome and predict again</button>
      </> : <div className="empty-visual"><span>Execution result is hidden until you make a prediction.</span><small>Choose controls, predict, then run the model to inspect every transition.</small></div>}
      <EvidenceLegend/>
    </article>
  );
}
