export interface StageWaypoint{index:number;stage:string;title:string;}
const stageMeaning:Record<string,string>={
 Orient:'Frame the problem',Understand:'Build the mechanism',Explore:'Manipulate the model',
 Predict:'Commit to an outcome',Diagnose:'Investigate failure',Engineer:'Follow actual code',
 Verify:'Inspect evidence',Defend:'Reason about trade-offs',Retain:'Transfer the skill'
};

/** Wide-angle orientation: chronological first occurrences, not artificial curriculum stages. */
export function StageJourney({sections,current,onNavigate}:{sections:StageWaypoint[];current:number;onNavigate:(index:number)=>void}){
 const stages=sections.filter((s,i)=>sections.findIndex(x=>x.stage===s.stage)===i);
 const currentStage=sections[current]?.stage;
 return <div className="stage-journey" data-testid="stage-journey" aria-label="Learning stage overview">
  <div className="stage-journey-header"><span className="story-eyebrow">LEARNING ROUTE · SELECT A STAGE</span><span>{stages.length} connected learning stages</span></div>
  <div className="stage-journey-scroll" role="group" aria-label="Jump between learning stages">
   {stages.map((s,i)=><button type="button" key={s.stage} aria-pressed={currentStage===s.stage} className={currentStage===s.stage?'active':''} onClick={()=>onNavigate(s.index)}>
     <span className="stage-order">{String(i+1).padStart(2,'0')}</span>
     <span className="stage-details"><strong>{s.stage}</strong><small>{stageMeaning[s.stage]??'Learn the topic'}</small></span>
     <span className="stage-route-dot" aria-hidden="true"/>
    </button>)}
  </div>
 </div>;
}
