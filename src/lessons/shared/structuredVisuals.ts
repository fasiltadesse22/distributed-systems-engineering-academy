/** Curated structural transformations for paragraphs whose meaning is obscured
 * by dense inline lists. These are SOURCE-ANCHORED: the source stays immutable,
 * and the visual renderer segments the same text into legible parts.
 *
 * Section/block numbers refer to canonical Markdown paragraph blocks after ##,
 * excluding the section heading. Do not use a heuristic to embellish every paragraph.
 */
export type VisualType='numbered'|'criteria'|'chain'|'authorities'|'propositions'|'status'|'checklist'|'evidence'|'definitions';
export interface VisualPhase {label:string;from:number;to:number;detail:string}
export interface VisualSpec{
 block:number;
 type:VisualType;
 title:string;
 subtitle:string;
 labels?:string[];
 insights?:string[];
 phases?:VisualPhase[];
 chainStart?:string;
 chainEnd?:string;
 suffixMarker?:string;
 markers?:string[];
 tailStart?:string;
}
export type LessonKey='1.1.1'|'1.1.2';
const v=(block:number,type:VisualType,title:string,subtitle:string,extra:Partial<VisualSpec>={}):VisualSpec=>({block,type,title,subtitle,...extra});
export const structuredVisuals:Record<LessonKey,Record<number,VisualSpec[]>>={
 '1.1.1':{
  2:[v(0,'definitions','Goal, incentive, responsibility, capability','Four different management concepts that should not be confused with technical interfaces.',{
    markers:['A goal','An incentive','A responsibility','A capability'],
    tailStart:'These four are related',
    labels:['Goal','Incentive','Responsibility','Capability'],
    insights:[
      'A goal is an actor-visible outcome, not an API endpoint or an architecture choice.',
      'An incentive explains motivation and potential conflicting preferences; it is not an authorization rule.',
      'A responsibility establishes accountable behavior, not necessarily a dedicated runtime process.',
      'A capability is an enduring business ability that survives changes in deployment and teams.'
    ]
  })],
  3:[v(3,'checklist','Five entries for every capability','Transform discovery into a reviewable ownership contract, not just a capability name.',{
    labels:['Desired outcome','Accountable role','Initiating actors','Decision / fact authority','Observers / consumers'],
    insights:[
      'Define what value the enterprise must produce, independently of technology.',
      'Accountability names who answers for the outcome even when execution is delegated.',
      'Requesters and initiators must be distinguished from decision and fact owners.',
      'Name who may accept/reject the request and whose evidence establishes the external outcome.',
      'Identify which customers, services and operations roles must see a truthful representation.'
    ]
  })],
  4:[v(0,'authorities','Four separate layers of authority','Select each authority to understand why one actor rarely owns every proposition.',{
    labels:['Request authority','Policy authority','Decision authority','Fact authority'],
    insights:[
      'Permission to initiate is not permission to approve. The customer can request an action without controlling its outcome.',
      'The actor that sets the rule may differ from the actor applying it to one concrete request.',
      'Deciding a particular acceptance or rejection requires authorized context and the applicable business rule.',
      'Only appropriate evidence can establish that the resulting business operation actually occurred.'
    ]
  })],
  8:[
   v(1,'numbered','Three competing cancellation hypotheses','Examine each explanation before diagnosing a seemingly contradictory cancellation.',{
     labels:['Policy disagreement','Missing guard or timing rule','Stale or misleading presentation'],
     insights:[
       'Inspect the published policy and the rules applied in each interface before blaming request ordering.',
       'A technically received command may have bypassed an important guard, making the resulting business decision invalid.',
       'Two legitimate changes can coexist while one screen presents an outdated or ambiguous interpretation.'
     ],
     suffixMarker:'These hypotheses require different evidence.'
   }),
   v(7,'chain','Build a causal incident report','Move from observation to evidence-based, explicitly provisional conclusion.',{
     chainStart:'symptom',chainEnd:'what remains unknown',
     insights:['Describe what was actually observed.','Identify the actors whose business promises are affected.','Generate alternative mechanisms rather than assuming one cause.','Name the minimum evidence needed to discriminate.','State what is currently supported and what is still unknown.','Prescribe a corrective action scoped to the cause.','Explicitly report which facts and causal links remain unknown rather than overstating confidence.']
   })
  ],
  10:[v(2,'numbered','Three different verification questions','Keep domain review, UI-model testing and Java correctness claims separate.',{
    labels:['Domain contract','Learning model','Real backend'],
    insights:[
      'Does the domain artifact name actors, authority, permitted actions, evidence and remaining unresolved questions?',
      'Does the browser model produce truthful and reproducible outcomes when a learner changes inputs?',
      'Does implemented code hold the promised business invariants under concurrency and failure? Not yet addressed in Lesson 1.1.1.'
    ],
    suffixMarker:'In this lesson,'
  })]
 },
 '1.1.2':{
  1:[
    v(0,'definitions','Four different levels of specification','Compare the definitions and notice what each one adds. These are not interchangeable names for an API.',{
      markers:['A **business capability**','A **use case**','A **user story**','An **endpoint**'],
      labels:['Business capability','Use case','User story','Endpoint'],
      insights:[
        'A durable enterprise ability: managing customer intent or coordinating fulfillment exists independently of who builds it or how it is deployed.',
        'A testable interaction contract: actor, trigger, preconditions, rejections and observable postconditions make success precise.',
        'A planning statement about desired value. A story motivates discovery; by itself it does not decide what HTTP 201 means.',
        'A transport entry point for executing part of a use case. A URL does not authorize restaurant acceptance or money movement.'
      ]
    }),
    v(2,'propositions','Four separate business propositions','Observe the difference between intention, a local fact and decisions owned by others.',{
      labels:['Customer intent','Platform intake','Restaurant acceptance','Provider financial result'],
      insights:[
        'A customer expresses what they want; the supplied UUID is not authenticated by this teaching API.',
        'The platform can assert that it recorded an intake resource within its own process. This is the only implemented local fact.',
        'A merchant must decide whether it can fulfill an order. A static fixture cannot establish that decision.',
        'The financial provider is authoritative for operations it actually performs. No provider operation happens here.'
      ]
    })
  ],
  3:[v(1,'definitions','The anatomy of an executable use case','A trigger, precondition, guard and postcondition each answer a different question.',{
    markers:['A **trigger**','A **precondition**','A **guard**','A **postcondition**'],
    tailStart:'In this lesson',
    labels:['Trigger','Precondition','Guard','Postcondition'],
    insights:[
      'What starts the interaction? This is not the same as permission to succeed.',
      'What must already be true before a successful business action is possible?',
      'Which business rule checks whether a transition or action is legal right now?',
      'What observable fact is established after successful execution, and who can legitimately assert it?'
    ]
  })],
  2:[v(1,'numbered','UC-001 · Normal flow','Trace one real request through the Spring Boot application. Select a step to inspect its responsibility and limitation.',{
    phases:[
      {label:'HTTP boundary',from:0,to:1,detail:'Parse and translate customer intent'},
      {label:'Application rules',from:2,to:4,detail:'Use catalog facts, guard, calculate'},
      {label:'Domain + storage',from:5,to:6,detail:'Create and store local intake'},
      {label:'Resource response',from:7,to:7,detail:'201 Created · merchant PENDING · payment NOT_STARTED'}
    ],
    labels:['Parse the request','Create the command','Read the demo catalog','Apply business guards','Calculate the quote','Create the domain fact','Persist the intake','Return an honest response'],
    insights:[
      'OrderController owns the HTTP boundary and structural checks. No business acceptance should be inferred from parsing JSON.',
      'The PlaceOrderCommand contains intent, not a browser-supplied commercial price. It is a use-case input, not payment evidence.',
      'PlaceOrderService reads a synthetic, server-owned MenuCatalog. This is not a live merchant integration.',
      'Reject unsupported or unavailable items with a business outcome. A 422 is not an infrastructure failure.',
      'Prices are integer synthetic minor units from the fixture; the quotation does not represent a charge or a binding merchant offer.',
      'Create a unique immutable Order intake record. No restaurant acceptance or payment confirmation is created here.',
      'OrderRepository uses an in-process ConcurrentHashMap. It can serve a GET while the instance runs but loses records on restart.',
      'HTTP 201 and Location identify a created resource; restaurantDecision remains PENDING and paymentStatus NOT_STARTED.'
    ]
  })],
  4:[
    v(0,'status','Understand the rejection paths','Different error categories require different client decisions and investigation.',{
      labels:['400 · Request shape','422 · Business policy','404 · Missing local record'],
      insights:[
        'Structural invalidity is detected at the HTTP boundary before the use case can record intake.',
        'The application can reject a syntactically valid request because fixture business rules disallow it.',
        'A missing resource in volatile memory does not distinguish never created from lost after restart.'
      ]
    })
  ],
  8:[v(1,'criteria','UC-001 · Acceptance criteria','Each criterion must name a falsifiable observable result and its explicitly limited guarantee.',{
    labels:['Create intake','Retrieve intake','Reject malformed input','Reject business intent','Expose retry limitation','Price provenance','Missing resource'],
    insights:[
      '201 Created is expected only for eligible intake. Merchant PENDING and payment NOT_STARTED remain honest.',
      'The resource can be retrieved while the same process is running. This does not prove restart durability.',
      'Reject malformed JSON or zero quantity as an invalid request, not a merchant decision.',
      'An unavailable item or unknown restaurant is a business rejection, not a server outage.',
      'Repeated identical POST currently produces different IDs. This documents missing idempotency rather than safe retries.',
      'The synthetic quote derives from server fixture prices; real merchant pricing remains outside scope.',
      'An unknown order ID gives 404 in the current process; no broader persistence claim follows.'
    ]
  })],
  10:[v(1,'evidence','Five evidence levels · five different claims','Select an evidence type to distinguish what was genuinely executed from what remains unproven.',{
    labels:['React prediction','TypeScript model unit test','Java application unit test','Spring MVC integration test','Packaged executable'],
    insights:[
      'A deterministic browser scenario states what the model predicts under chosen assumptions, not what a payment system performed.',
      'A TypeScript test checks the educational engine, not an actual Java use case.',
      'A service test directly executes Java application behavior under isolated test dependencies.',
      'An MVC integration test exercises JSON mapping and Spring context wiring for a particular request.',
      'A successful packaged-jar build proves packaging; separate running-jar HTTP smoke provides evidence of startup and a representative request.'
    ]
  })],
  12:[v(4,'chain','Staff-level reasoning chain','Follow a defensible architectural argument from business need to reconsideration forces.',{
    chainStart:'business capability',chainEnd:'next forces',
    insights:[
      'Start from the durable enterprise ability to provide value.',
      'Specify whose observable goal triggers the work.',
      'Define preconditions, alternatives, guards and truthful postconditions.',
      'Enumerate accepted and rejected paths before optimizing technology.',
      'Identify falsifiable checks for the exact contract.',
      'Trace the responsible source code and its real mechanisms.',
      'Distinguish actual observations from illustrative modeling.',
      'State everything the tests and design do not guarantee.',
      'Name the requirement or failure evidence that will justify the next architecture step.'
    ]
  })],
  13:[v(2,'chain','Reconstruct the implemented execution path','Walk the source-derived local path and identify which steps never contact a merchant or provider.',{
    chainStart:'HTTP request',chainEnd:'truthful 201 response',
    insights:[
      'A customer request arrives at the HTTP adapter.',
      'OrderController performs transport validation and mapping.',
      'PlaceOrderService evaluates use-case business conditions.',
      'The server-owned fixture catalog supplies demo price and availability.',
      'An immutable Order represents the accepted local intake fact.',
      'The volatile adapter stores and reads records within one process.',
      'The API responds with a retrievable intake reference and explicit pending statuses.'
    ]
  })]
 }
};

export const visualsFor=(lesson:LessonKey,section:number)=>structuredVisuals[lesson][section]??[];
