/** Editorial reading cues for canonical manuscripts. These intentionally anchor to a
 * block index in its actual section, never to guessed keywords. Manuscript text is
 * neither rewritten nor removed. Update each map when the source section changes. */
export type ReadingKind = 'concept' | 'mechanism' | 'example' | 'boundary' | 'evidence' | 'practice';
export interface ReadingAnnotation {
  block:number;
  kind:ReadingKind;
  title:string;
  why:string;
}
export interface ReadingEditorial {
  lens:string;
  annotations:ReadingAnnotation[];
}
const a=(block:number,kind:ReadingKind,title:string,why:string):ReadingAnnotation=>({block,kind,title,why});
const e=(lens:string,...annotations:ReadingAnnotation[]):ReadingEditorial=>({lens,annotations});

/** Each list is ordered exactly like the ## manuscript sections. Paragraph numbers
 * refer to individual Markdown blocks, including ### subheadings. */
export const readingEditorial:Record<'1.1.1'|'1.1.2',ReadingEditorial[]>={
'1.1.1':[
 e('Start from the failed customer promise, not from boxes on an architecture diagram.',
  a(0,'example','One order, several conflicting facts','The incident creates several distinct obligations. A service topology cannot determine who was authorized to decide.'),
  a(3,'mechanism','Follow authority through the journey','Track the requester, decision-maker and fact owner separately; none is automatically the same runtime component.'),
  a(4,'boundary','Intent is not a confirmed outcome','An actor may request something without having authority to approve it or attest that it actually happened.')),
 e('Separate business participants and identities from software packaging.',
  a(0,'concept','Actor: a participant with a goal','An actor participates in a business interaction; it is not synonymous with a microservice.'),
  a(3,'concept','Entity: the identity of a business thing','Order and PaymentAttempt represent facts and identity; they do not automatically decide policy.'),
  a(5,'boundary','A database does not own the decision','Storing a status change is not evidence that a valid business authority made the decision.')),
 e('An operational trade-off can be correct for one actor and harmful to another.',
  a(0,'concept','Goal versus incentive','A goal describes a desired result; incentives explain why actors favor competing rules.'),
  a(6,'example','Competing cancellation promises','A customer-friendly policy can conflict with restaurant preparation costs; clarify trade-offs before coding.'),
  a(8,'boundary','A policy must make its costs explicit','Do not disguise an unresolved stakeholder trade-off as a technical implementation detail.')),
 e('First establish the business ability, then its accountable decisions and possible implementation.',
  a(0,'concept','Capability persists across topology','A business capability exists whether the platform is a monolith or several services.'),
  a(4,'mechanism','Accountability is not execution','One organization can remain accountable while another component carries out part of the task.'),
  a(7,'boundary','Do not infer service boundaries','A capability catalog gives decomposition inputs, not permission to preselect microservices.')),
 e('Separate permission to ask, permission to decide and proof of the resulting fact.',
  a(0,'concept','Four layers of authority','A request, valid decision, accepted fact and customer-facing claim require different evidence.'),
  a(3,'boundary','A copy is not the source of truth','Reading a provider result does not give a local operator permission to fabricate a refund result.'),
  a(6,'evidence','Policy needs runtime enforcement later','Even a valid business rule still requires real authentication and authorization when implemented.')),
 e('Use the atlas to challenge ownership rather than memorizing an org chart.',
  a(0,'practice','Change one authority assignment','Use the interactive atlas to form and test an explicit ownership hypothesis.'),
  a(1,'boundary','The mapping is illustrative','A coherent teaching baseline still needs genuine stakeholder approval.'),
  a(3,'example','Apply the rule to restaurant acceptance','An example becomes useful when you can name who requests, who decides and who reports the outcome.')),
 e('A branching business journey contains multiple possible truthful outcomes.',
  a(0,'evidence','Modeled, not a Java payment trace','The simulator expresses declared business assumptions, not an executed external integration.'),
  a(2,'example','Merchant rejection branch','When the merchant rejects, the right outcome depends on the specified policy and payment timing.'),
  a(4,'boundary','Unknown is not declined','A provider timeout must not be converted to a definitive money outcome without evidence.')),
 e('Do not choose an owner by the name of a code component.',
  a(0,'practice','Predict before reveal','State the decision verb and choose an actor with the relevant authority.'),
  a(2,'mechanism','Different verbs mean different rights','Initiating a refund and confirming its completion are not the same authorization.'),
  a(4,'evidence','Use a full ownership sentence','A claim is defensible when it identifies requester, decision owner, rule and authoritative fact.')),
 e('Investigate the authority and timing dispute, not merely its visible symptom.',
  a(0,'example','A cancellation incident with conflicting screens','The report gives observations from different actors; neither alone establishes the authorized result.'),
  a(2,'mechanism','Compare policy, requests and acknowledgments','A causal timeline can distinguish policy mismatch from delivery, state or interface errors.'),
  a(5,'boundary','Technical timeout is not a financial fact','The absence of a response does not establish that the provider did not charge the customer.')),
 e('A meaningful project checkpoint can establish a domain contract before code.',
  a(0,'boundary','This checkpoint is deliberately conceptual','No Java implementation is claimed for Lesson 1.1.1; authority discovery is the actual engineering output.'),
  a(1,'evidence','Preserve an auditable domain artifact','Record decisions, scenarios, open questions and accepted assumptions for future implementation.'),
  a(3,'mechanism','Define the first vertical slice','Choose a truthful, bounded result before selecting frameworks, controllers or persistence.')),
 e('Know exactly what analytical and runtime evidence can establish.',
  a(0,'evidence','No Lesson 1.1.1 Java behavior executed','Structural review and interactive model checks establish different things from backend tests.'),
  a(1,'boundary','Coherence does not equal business approval','An internally consistent actor map can still be rejected by the real stakeholders.'),
  a(5,'boundary','Green UI tests do not prove business outcomes','A browser route or model passing does not establish merchant acceptance, payment or operational reliability.')),
 e('Adapt vocabulary to your audience without changing what is true.',
  a(0,'example','Explain authority in one minute','Connect role, decision and resulting business claim before discussing infrastructure.'),
  a(2,'mechanism','Staff-level reasoning has scope','Distinguish who records a fact from who authoritatively produces it when defending architecture.'),
  a(5,'practice','Answer an adversarial payment question','A disagreement requires source-specific evidence, not a confident but unsupported conclusion.')),
 e('Transfer the same authority questions to a new domain.',
  a(0,'practice','Reconstruct the map without the page','Retrieval tests whether you can use the model rather than recognize its words.'),
  a(1,'example','Hotel booking has independent decision owners','A guest request, property confirmation and payment-provider fact need independent authority.'),
  a(3,'evidence','Use a mastery gate','Be able to defend decisions, conflicts and evidence limitations before proceeding.'))
],
'1.1.2':[
 e('Distinguish creation of an intake resource from completion of an order.',
  a(0,'example','201 Created—but what was created?','A valid HTTP response cannot promise an unperformed merchant or financial operation.'),
  a(1,'concept','Define the business success proposition','The observable postcondition must describe what happened, not an optimistic product interpretation.'),
  a(3,'boundary','A later merchant rejection is compatible with intake','Pending merchant authority must remain visible even after the platform records a request.')),
 e('A capability, story, use case and endpoint solve different modeling problems.',
  a(0,'concept','Four levels of description','Avoid asking an HTTP endpoint to define the business promise on its own.'),
  a(2,'mechanism','Separate four distinct propositions','Customer intent, platform intake, merchant acceptance and provider result require separate evidence.'),
  a(4,'example','The demo menu is not merchant capacity','Synthetic catalog availability cannot establish that a real kitchen agreed to prepare dinner.')),
 e('UC-001 is a narrow but executable vertical slice.',
  a(0,'concept','The use-case contract','Name primary actor, trigger, technical/business preconditions and honest result before implementation.'),
  a(1,'mechanism','Follow the end-to-end request flow','HTTP → application guards → domain record → volatile storage → truthful resource response.'),
  a(2,'boundary','Specify what is not a postcondition','Restaurant acceptance, payment and restart durability are absent even when a record was created.')),
 e('Validate syntax and business eligibility at the correct boundaries.',
  a(0,'mechanism','Structural versus business rejection','Invalid quantity and unavailable menu item are different failures and should report different outcomes.'),
  a(2,'concept','Use the precise postcondition','A local intake fact is narrower than completed restaurant fulfillment.'),
  a(3,'example','Seasonal Special is unavailable','A syntactically valid basket can still be rejected by a fixture business guard.')),
 e('Rejected requests and unknown outcomes must be described explicitly.',
  a(0,'mechanism','Classify rejection before retrying','400, 422, 404 and infrastructure errors lead to different corrective actions.'),
  a(2,'boundary','Timeout can make the result ambiguous','Repeated POST can create a second intake; X-Request-ID is not idempotency.'),
  a(3,'example','Future rejections are not implemented endpoints','Merchant, payment and cancellation branches are conceptual dependencies, not current Java behavior.')),
 e('A server fixture narrows price input trust; it does not secure commerce.',
  a(0,'concept','Different IDs have different meanings','A caller-provided UUID is not authentication; an intake UUID does not deduplicate intent.'),
  a(1,'mechanism','Server-owned synthetic quotation','The fixture prevents trusting browser-provided prices but does not establish live merchant terms.'),
  a(2,'boundary','A concurrent map is not durable storage','Restart loss and multi-instance consistency are outside the current mechanism.')),
 e('Follow the actor’s business goal before choosing a service boundary.',
  a(0,'practice','Inspect the four use cases','Changing actors changes authority and postconditions; only customer intake is implemented.'),
  a(1,'concept','The merchant owns its fulfillment decision','A platform basket check is not external approval.'),
  a(2,'boundary','Changing a product promise changes required work','A confirmation promise requires a real merchant decision, not a renamed endpoint.')),
 e('Manipulate the scenario before inspecting the contract explanation.',
  a(0,'example','Available, unavailable and malformed requests','Different inputs must produce distinguishable, truthful Java intake outcomes.'),
  a(1,'evidence','Model is not a live HTTP request','The browser simulation makes predictions; Java CI is the execution evidence.'),
  a(2,'boundary','Future branches are hypothetical','A declined payment or later cancellation requires a real operation and approved policy.')),
 e('Every acceptance criterion should identify what would falsify the promise.',
  a(0,'concept','Given/When/Then for observable facts','Specify the business outcome, actual effect, and limited evidence scope.'),
  a(1,'evidence','UC-001 acceptance matrix','A real test can assert pending merchant status and exact quoted demo amount.'),
  a(3,'boundary','A passing test may miss the actual goal','Ask which business expectation could still be false after the asserted fields pass.')),
 e('Read the real Spring Boot execution path without imagining services.',
  a(0,'mechanism','Source-derived Java execution chain','A controller, application service, domain record and in-memory adapter run inside one deployable.'),
  a(2,'boundary','Microservices are not yet justified','Remote calls introduce failure windows without resolving missing authority or policy.'),
  a(3,'evidence','Source diagram versus executed trace','A source-linked conceptual path is not captured production telemetry.')),
 e('Different evidence levels support different claims.',
  a(0,'evidence','Actual Java unit and MVC tests','The tests verify selected request/response behavior under a specified environment.'),
  a(1,'mechanism','Compare modeled and executed observations','A TypeScript simulator, Java integration test and packaged-jar smoke do not prove the same thing.'),
  a(3,'boundary','Do not overstate green CI','No payment, durable commerce or customer authentication is established by these tests.')),
 e('Diagnose the exact claim that was violated—or never promised.',
  a(0,'example','201 received, merchant never accepts','The symptom alone is not evidence that local intake failed.'),
  a(1,'mechanism','Check the postcondition and targeted evidence','Pending response fields, GET and logs distinguish semantic errors from missing records and retries.'),
  a(3,'boundary','Changing 201 to 202 does not create a feature','HTTP status changes cannot manufacture merchant approval or missing business policy.')),
 e('Defend an architecture with pressures, alternatives and observable guarantees.',
  a(0,'example','Backend colleague explanation','Connect transport, business guard, local record and explicit pending outcome.'),
  a(1,'mechanism','Staff-level decision rationale','Explain why one deployable is justified by current forces and which evidence could change it.'),
  a(3,'practice','Handle adversarial questions precisely','Status codes, retry headers, demo prices and provider outcomes each have distinct guarantees.')),
 e('Apply the distinction between request intake and authoritative reservation.',
  a(0,'example','Hotel request is not guaranteed accommodation','The property retains authority over real availability and confirmation.'),
  a(1,'mechanism','Stock request versus atomic reservation','A stronger postcondition may later justify durable concurrency guards.'),
  a(3,'evidence','Lesson exit is a falsifiable standard','Mastery means explaining contracts, alternatives, Java source and limits without overstating the outcome.'))
]};
export const editorialFor=(lesson:'1.1.1'|'1.1.2',section:number)=>readingEditorial[lesson][section];
export const kindNames:Record<ReadingKind,string>={
 concept:'Core concept',mechanism:'How it works',example:'Worked example',
 boundary:'Important limit',evidence:'Evidence & scope',practice:'Try this'
};
