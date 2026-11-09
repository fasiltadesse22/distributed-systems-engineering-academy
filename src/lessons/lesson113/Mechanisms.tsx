import {useState} from 'react';
import {predictionChoices,scenarioChoices,simulateCommand} from './model';
import type {Prediction,ScenarioId} from './model';
import './lesson.css';

const path=[
 {name:'Customer intent',detail:'What someone wants; not an established result.'},
 {name:'Application command',detail:'PlaceOrderCommand carries claimed actor and basket.'},
 {name:'Business decision',detail:'Valid and eligible, or rejected under local fixture rules.'},
 {name:'Local effect',detail:'OrderRepository.save returns normally, or the effect is uncertain.'},
 {name:'Fact representation',detail:'OrderRequestRecorded is formed after normal local save.'},
 {name:'Acknowledgement',detail:'201 only for intake; 422 for known business rejection.'}
];
export function CommandFactFlow(){
 return <figure className="l113-flow" data-testid="command-fact-flow" aria-label="Source-derived request-to-fact sequence">
  <figcaption><span className="l113-kicker">SOURCE-DERIVED MECHANISM · ONE SPRING BOOT PROCESS</span>
    <strong>Six boundaries between wanting an operation and proving one local result</strong>
  </figcaption>
  <ol>{path.map(p=><li key={p.name}><div><strong>{p.name}</strong><p>{p.detail}</p></div></li>)}</ol>
  <div className="l113-branches">
   <p><strong>Business rejection:</strong> known invalid commands stop before storage and never establish a successful intake fact.</p>
   <p><strong>Uncertain effect:</strong> a save or response can fail after a local side effect. Timeout does not prove absence.</p>
  </div>
  <p className="l113-evidence">A static explanation of the linked Java control flow, not recorded distributed tracing. No merchant or payment-provider integration exists.</p>
 </figure>;
}

export function CommandFactLab(){
 const [scenario,setScenario]=useState<ScenarioId>('valid');
 const [prediction,setPrediction]=useState<Prediction|''>('');
 const [revealed,setRevealed]=useState(false);
 const outcome=simulateCommand(scenario);
 const info=scenarioChoices.find(x=>x.id===scenario)??scenarioChoices[0];
 return <section className="l113-lab" data-testid="command-fact-lab">
  <header><span className="l113-kicker">DETERMINISTIC EDUCATIONAL LAB · NOT LIVE JAVA</span>
    <h3>Predict the command, decision and observable fact</h3>
    <p>Change a condition, commit to the likely result, then inspect the authority and causality of each stage. The implemented Java checkpoint supports the normal/rejection cases; lost replies and adapter failures are explicitly modeled failure windows.</p>
  </header>
  <div className="l113-controls">
   <fieldset><legend>1 · Select an input/failure condition</legend>
    <label htmlFor="l113-scenario" className="sr-only">Scenario</label>
    <select id="l113-scenario" data-testid="command-scenario" value={scenario}
      onChange={e=>{setScenario(e.target.value as ScenarioId);setPrediction('');setRevealed(false)}}>
      {scenarioChoices.map(choice=><option value={choice.id} key={choice.id}>{choice.label}</option>)}
    </select>
    <small>{info.description}</small>
   </fieldset>
   <fieldset><legend>2 · Predict before reveal</legend>
    <div className="l113-predictions">{predictionChoices.map(choice=><label className="l113-prediction" key={choice.id}>
      <input type="radio" name="command-fact-prediction" value={choice.id}
       checked={prediction===choice.id} onChange={()=>{setPrediction(choice.id);setRevealed(false)}}/>
      {choice.label}
    </label>)}</div>
   </fieldset>
  </div>
  <button type="button" className="l113-run" disabled={!prediction} onClick={()=>setRevealed(true)}>
    Run the model and inspect the evidence
  </button>
  {revealed&&<div className="l113-result" role="status" aria-live="polite" data-testid="command-model-result">
    <span className={'l113-judge '+(prediction===outcome.prediction?'correct':'revise')}>
      {prediction===outcome.prediction?'Prediction matches model':'Compare your prediction with the actual model'}
    </span>
    <h4>{outcome.headline}</h4>
    <p>{outcome.meaning}</p>
    <dl className="l113-facts">
     <div><dt>Intakes in modeled local store</dt><dd data-testid="modeled-intakes">{outcome.observedIntakes}</dd></div>
     <div><dt>Successful facts returned</dt><dd data-testid="modeled-facts">{outcome.returnedSuccessFacts}</dd></div>
     <div><dt>Client observation</dt><dd>{outcome.clientObservation}</dd></div>
    </dl>
    <ol className="l113-trace" aria-label="Modeled execution timeline">
     {outcome.steps.map((step,i)=><li key={i}><b>{String(i+1).padStart(2,'0')} · {step.phase}</b>
       <div><p>{step.detail}</p><small>Authority: {step.authority}</small></div>
      </li>)}
    </ol>
    <p className="l113-scope"><strong>Evidence limit:</strong> {outcome.limitation} This is a TypeScript teaching model, not the output of a live HTTP call. Consult the pinned Java source and CI for the executed subset.</p>
  </div>}
 </section>;
}
