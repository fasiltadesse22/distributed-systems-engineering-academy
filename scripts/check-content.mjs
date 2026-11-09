import fs from 'node:fs';
import assert from 'node:assert/strict';

const markdown = fs.readFileSync('docs/roadmap/MASTER_ROADMAP_V1.md', 'utf8');
const blueprint = JSON.parse(fs.readFileSync('content/cluster-1.1/blueprint.json', 'utf8'));
const phaseMatches = [...markdown.matchAll(/^## Phase ([IVXLCDM]+) — (.+)$/gm)];
const clusterMatches = [...markdown.matchAll(/^### Cluster (\d+\.\d+) — (.+)$/gm)];
assert.equal(phaseMatches.length, 19, 'Expected 19 phases in authoritative roadmap');
assert.equal(clusterMatches.length, 93, 'Expected 93 clusters in authoritative roadmap');
assert.ok(clusterMatches.some(m => m[1] === '1.1'), 'Cluster 1.1 missing in source');
const chapters = blueprint.chapters;
assert.ok(chapters.length >= 3, 'Blueprint needs coherent chapters');
const lessons = chapters.flatMap(c => c.lessons);
assert.equal(lessons.length, 20, 'Planned lesson inventory is unexpected');
assert.equal(new Set(lessons.map(l => l.id)).size, lessons.length, 'Duplicate lesson identifiers');
const expectedFields = ['id','title','question','outcomes','prerequisites','scope','mechanisms','visuals','examples','project','experiments','diagnosis','mastery','transfer','mode'];
for (const lesson of lessons) {
  for (const field of expectedFields) {
    assert.ok(Object.hasOwn(lesson, field), 'Missing lesson field ' + field + ' in ' + lesson.id);
    assert.ok(Array.isArray(lesson[field]) ? lesson[field].length > 0 : String(lesson[field]).length > 0, 'Empty ' + field + ' in ' + lesson.id);
  }
}
assert.ok(blueprint.labs.length >= 5, 'Expected multi-lab interactive design briefs');
assert.ok(blueprint.applicationPlan.length > 0, 'Missing real-project evolution plan');
assert.ok(blueprint.forwardDependencies.length > 0, 'Missing forward dependency transfer');
const spec = fs.readFileSync('docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md','utf8');
for (const lesson of lessons) assert.ok(spec.includes('#### ' + lesson.id + ' — ' + lesson.title), 'Markdown/JSON divergence ' + lesson.id);
const critical = ['duplicate payment','cancellation/acceptance race','modification after payment','payment after cancellation','illegal transition','repeated command','stale-state decision'];
for (const item of critical) assert.ok(spec.includes(item), 'Unmapped failure requirement ' + item);
const authored = fs.readFileSync('content/lessons/1.1.1.md','utf8');
const sections = [...authored.matchAll(/^## (Orient|Understand|Explore|Predict|Diagnose|Engineer|Verify|Defend|Retain) — .+$/gm)];
assert.equal(sections.length, 13, 'Lesson 1.1.1 must retain its 13 substantive teaching sections');
for(const stage of ['Orient','Understand','Explore','Predict','Diagnose','Engineer','Verify','Defend','Retain']) {
  assert.ok(sections.some(m => m[1]===stage), 'Missing lesson stage '+stage);
}
const domain = fs.readFileSync('docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md','utf8');
for(const required of ['Actor and stakeholder inventory','Business capabilities and ownership','Decision authority matrix','Worked business scenarios','Questions to validate with stakeholders','Lesson 1.1.2 entry requirements']) {
  assert.ok(domain.includes(required), 'Missing domain discovery obligation '+required);
}
const lesson112 = fs.readFileSync('content/lessons/1.1.2.md','utf8');
const sections112 = [...lesson112.matchAll(/^## (Orient|Understand|Explore|Predict|Engineer|Verify|Diagnose|Defend|Retain) — .+$/gm)];
assert.equal(sections112.length, 14, 'Lesson 1.1.2 must preserve all 14 authored learning sections');
for (const stage of ['Orient','Understand','Explore','Predict','Engineer','Verify','Diagnose','Defend','Retain']) {
  assert.ok(sections112.some(m=>m[1]===stage), 'Lesson 1.1.2 missing learning stage '+stage);
}
for (const term of ['HTTP 201','422','PENDING','NOT_STARTED','Restaurant','Payment','Acceptance','diagnosis','Java']) {
  assert.ok(lesson112.toLowerCase().includes(term.toLowerCase()),'Missing use-case learning obligation '+term);
}

const lesson113 = fs.readFileSync('content/lessons/1.1.3.md','utf8');
const sections113 = [...lesson113.matchAll(/^## (Orient|Understand|Explore|Predict|Engineer|Verify|Diagnose|Defend|Retain) — .+$/gm)];
assert.equal(sections113.length,16,'Lesson 1.1.3 must preserve all 16 deep technical sections');
for (const stage of ['Orient','Understand','Explore','Predict','Engineer','Verify','Diagnose','Defend','Retain']){
  assert.ok(sections113.some(s=>s[1]===stage),'Lesson 1.1.3 missing learning stage '+stage);
}
assert.ok(lesson113.trim().split(/\s+/).length>7000,'Lesson 1.1.3 depth must not be summarized away');
for (const term of ['PlaceOrderCommand','PlaceOrderOutcome','OrderRequestRecorded',
  'BusinessRejection','idempotency','acknowledgement','unknown outcome',
  'Payment','Restaurant','refund','diagnose','18 Maven tests','225db684a24080f2c4ad1ae6e2f5e259edf0aa7d']){
  assert.ok(lesson113.toLowerCase().includes(term.toLowerCase()),'Missing command/fact learning obligation '+term);
}
console.log('Lesson 1.1.3 content audit passed: 16 deep sections, nine stages, real Java command/fact evidence.');

console.log('Lesson 1.1.2 content audit passed: 14 sections, nine learning stages, use-case semantics and boundaries.');
console.log('Lesson 1.1.1 content audit passed: 13 sections, all nine learning stages, reviewed domain artifact requirements.');
console.log('Content audit passed: 19 phases, 93 clusters, 4 chapters, 20 lesson specs, 7 required failure types, 5 lab briefs.');
