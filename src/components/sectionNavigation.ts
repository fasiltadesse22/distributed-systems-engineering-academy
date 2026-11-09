/** Deliberately concise, topic-first menu labels for the authored manuscripts.
 * The learning stage remains in the body, but does not dominate every nav item.
 * Ordered to match the canonical ## sections (tested against the manuscripts).
 */
export const lessonNavigationTitles:Record<'1.1.1'|'1.1.2'|'1.1.3',readonly string[]>={
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
 ]
};
export function sectionMenuTitle(lessonId:string,index:number,fallback:string):string{
 if(lessonId==='1.1.1'||lessonId==='1.1.2'||lessonId==='1.1.3'){
  return lessonNavigationTitles[lessonId][index]??fallback;
 }
 return fallback;
}
