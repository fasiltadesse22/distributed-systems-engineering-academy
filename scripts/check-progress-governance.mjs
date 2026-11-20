import fs from 'node:fs';
import {pathToFileURL} from 'node:url';

const LESSONS = ['1.1.1','1.1.2','1.1.3','1.1.4','1.1.5','1.1.6','1.1.7','1.1.8'];

/**
 * Check only the authoritative ACTIVE progress table. Historical candidate
 * paragraphs stay historically true; only unlabeled candidate headings are
 * flagged as misleading live status. This deliberately does not inspect
 * Java's separate repository or infer a GitHub run's conclusion.
 */
export function validateProgress(text) {
 const errors = [];
 const match = text.match(/## Verified checkpoints\s*\n([\s\S]*?)(?=\n## )/);
 if (!match) return ['Missing authoritative ## Verified checkpoints table'];
 const rows = match[1].split('\n').filter(line => /^\|[^-]/.test(line));
 for (const id of LESSONS) {
  const hits = rows.filter(line => new RegExp('\\bLesson\\s+'+id.replaceAll('.','\\.')+'\\b').test(line));
  if (hits.length !== 1) {
   errors.push('Active status must have exactly one table row for Lesson '+id+': found '+hits.length);
   continue;
  }
  const cols = hits[0].split('|').map(x=>x.trim()).filter(Boolean);
  const status = cols[1]?.replaceAll('*','')??'';
  if (!/\b(complete|verified|merged)\b/i.test(status)) {
   errors.push('Lesson '+id+' active status not complete/verified: '+status);
  }
  if (/merge pending|ci pending|in progress|not started|under implementation/i.test(status)) {
   errors.push('Lesson '+id+' contradictory active status: '+status);
  }
 }
 const future=rows.filter(line=>/Lessons 1\.1\.9[–-]1\.1\.20/.test(line));
 if (future.length !== 1 || !/\|\s*Not started\s*\|/.test(future[0]))
  errors.push('Lessons 1.1.9–1.1.20 must remain exactly one Not started active row');
 const headings=[...text.matchAll(/^## (.*(?:candidate|execution note).*)$/gmi)];
 for (const [,heading] of headings) {
  if (!/HISTORICAL/i.test(heading))
   errors.push('Old candidate/next-execution heading must be labeled HISTORICAL: '+heading);
 }
 if (!text.includes('**Current status authority:**'))
  errors.push('Active status table must be declared the sole authority');
 return errors;
}

const invoked = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invoked) {
 const path = process.argv[2] || 'docs/progress/LEARNING_PROGRESS.md';
 const errors = validateProgress(fs.readFileSync(path,'utf8'));
 if (errors.length) {
  console.error('Academy progress governance FAILED:\n'+errors.map(s=>' - '+s).join('\n'));
  process.exit(1);
 }
 console.log('Academy progress governance PASSED: one active row per authored lesson, not-started future, historical candidates labeled.');
}
