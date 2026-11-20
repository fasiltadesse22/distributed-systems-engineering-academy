/** Deliberately concise, topic-first menu labels for the authored manuscripts.
 * The learning stage remains in the body, but does not dominate every nav item.
 * Ordered to match the canonical ## sections (tested against the manuscripts).
 */
export const lessonNavigationTitles:Record<'1.1.1'|'1.1.2'|'1.1.3'|'1.1.4'|'1.1.5'|'1.1.6'|'1.1.7',readonly string[]>={
 '1.1.1':[
  'Why the business comes first',
  'Actors, stakeholders & roles',
  'Goals & competing incentives',
  'Capabilities & ownership',
  'Who has decision authority?',
  'Build the authority map',
  'Follow an order decision',
  'Assign the right decision owner',
  'Investigate cancellation dispute',
  'Domain artifacts before Java',
  'What counts as evidence?',
  'Defend the architecture',
  'Transfer & mastery check'
 ],
 '1.1.2':[
  'What does HTTP 201 mean?',
  'Capability vs use case vs API',
  'UC-001: Eight-step request flow',
  'Validation, guards & outcomes',
  'Error paths & unknown results',
  'IDs, pricing & durability',
  'Find the real use-case boundary',
  'Compare business alternatives',
  'Acceptance criteria AC-01–07',
  'Trace the Java implementation',
  'Tests & evidence hierarchy',
  'Investigate unconfirmed orders',
  'Defend design trade-offs',
  'Transfer to booking & inventory'
 ] ,
 '1.1.3':[
  'From request to historical fact',
  'What commands actually mean',
  'Designing command contracts',
  'Decisions and rejection semantics',
  'Domain facts vs event messages',
  'Acknowledgements and scope',
  'Failure windows and ambiguity',
  'Repeated commands and identity',
  'Restaurant and payment authority',
  'Classify commands and facts',
  'Predict five execution outcomes',
  'Trace the new Java handler',
  'Tests and evidence boundaries',
  'Diagnose a missing intake',
  'Defend architectural choices',
  'Transfer and mastery gate'
 ],
 '1.1.4':[
  'Why identity and authority matter',
  'Identity vs state and history',
  'Order, customer and attempt IDs',
  'Natural keys, aliases and scopes',
  'Versions and legitimate updates',
  'Authority vs UI projections',
  'Two attempts, one order',
  'Merchant aliases and callbacks',
  'Predict identity changes',
  'Trace the typed Java IDs',
  'Design trade-offs and triggers',
  'Tests and identity evidence',
  'Diagnose a disputed Paid status',
  'Defend ownership and continuity',
  'Explain to four audiences',
  'Transfer and mastery gate'
 ],
 '1.1.5':[
 'One customer journey, many authorities','Workflow vs calls and state','Actors and business obligations','Verified Java intake boundary','Follow the actor swimlane','Payment and merchant ordering','Illustrative successful journey','Captured payment, rejected merchant','Accepted order, cancellation requested','Preparation as irreversible effect','Refund not yet confirmed','Contradictory observations','Time, messages and unknowns','Receipts and customer promises','Delivery and custody evidence','Milestone authority overlay','Predict workflow branches','Trace the real Java boundary','What counts as evidence?','Diagnose conflicting screens','Defend the engineering choices','Transfer and mastery gate'
 ]
, '1.1.6':[
  'One journey, several independent truths',
  'The state-transition decision',
  'Workflow versus lifecycle',
  'Identity across transitions',
  'Platform Order intake lifecycle',
  'RestaurantDecision lifecycle',
  'PaymentAttempt and uncertain results',
  'Inspect three state graphs',
  'Cross-lifecycle predicates',
  'Why global states explode',
  'Predict partial workflow progress',
  'Illegal transitions preserve state',
  'Ordering and competing histories',
  'Unresolved POL-01–POL-10 rules',
  'Trace actual Java domain code',
  'Exhaustive verification and limits',
  'Diagnose a false Refunded status',
  'Defend lifecycle boundaries',
  'Transfer and mastery gate'
 ],
 '1.1.7':[
  'A valid but business-illegal command',
  'Six boundaries of validity',
  'Input validation versus state guards',
  'Authentication and business authority',
  'Preconditions, postconditions, invariants',
  'Total and explicit decision results',
  'Identity and actor-scope rules',
  'State-only versus contextual guards',
  'Mapping PLACED to actual Java states',
  'Trace eleven merchant guards',
  'Accept after rejection is illegal',
  'Preparation before acceptance',
  'Completion before preparation',
  'Total decision tables',
  'Guard ordering and error disclosure',
  'No mutation, no success fact',
  'Passing guard versus persistence commit',
  'Stale states and TOCTOU races',
  'Cross-lifecycle evidence and policy',
  'Manipulate the guard inspector',
  'Predict legality and fact scope',
  'Trace actual Java implementation',
  'Table-derived Java and browser tests',
  'Diagnose illegal acceptance',
  'Revise an exception policy',
  'Transfer and mastery gate'
 ]
};
export function sectionMenuTitle(lessonId:string,index:number,fallback:string):string{
 if(lessonId==='1.1.1'||lessonId==='1.1.2'||lessonId==='1.1.3'||lessonId==='1.1.4'||lessonId==='1.1.5'||lessonId==='1.1.6'||lessonId==='1.1.7'){
  return lessonNavigationTitles[lessonId][index]??fallback;
 }
 return fallback;
}
