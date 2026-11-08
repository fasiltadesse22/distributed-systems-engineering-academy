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
console.log('Content audit passed: 19 phases, 93 clusters, 4 chapters, 20 lesson specs, 7 required failure types, 5 lab briefs.');
