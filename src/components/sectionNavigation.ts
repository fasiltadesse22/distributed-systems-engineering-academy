/** Deliberately concise, topic-first menu labels for the authored manuscripts.
 * The learning stage remains in the body, but does not dominate every nav item.
 * Ordered to match the canonical ## sections (tested against the manuscripts).
 */
export const lessonNavigationTitles:Record<'1.1.1'|'1.1.2',readonly string[]>={
 '1.1.1':[
  'Why the business comes first',
  'Actors, stakeholders & roles',
  'Goals & competing incentives',
  'Capabilities & ownership',
  'Who has decision authority?',
  'Build the authority map',
  'Follow an order decision',
  'Assign the right decision owner',
  'Diagnose a cancellation dispute',
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
  'Explore business alternatives',
  'Acceptance criteria AC-01–07',
  'Trace the Java implementation',
  'Tests & evidence hierarchy',
  'Diagnose an unconfirmed order',
  'Defend design trade-offs',
  'Transfer to booking & inventory'
 ]
};
export function sectionMenuTitle(lessonId:string,index:number,fallback:string):string{
 if(lessonId==='1.1.1'||lessonId==='1.1.2'){
  return lessonNavigationTitles[lessonId][index]??fallback;
 }
 return fallback;
}
