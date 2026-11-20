import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const defaultRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const fields=['outcomes','prerequisites','scope','mechanisms','visuals','examples','project','experiments','diagnosis','mastery','transfer'];
const sourceSections=source=>[...source.matchAll(/^## (.+)$/gm)].map(m=>m[1]);
export function stableTopicIds(headings){
 const seen=new Set();
 return headings.map((h,i)=>{
  let id=(h.split(' — ').slice(1).join(' — ')||h).toLowerCase().normalize('NFKD')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)||'topic-'+(i+1);
  const base=id;let n=2;while(seen.has(id))id=base+'-'+n++;
  seen.add(id);return id;
 });
}
export function checkAcademyGovernance(root=defaultRoot){
 const problems=[];
 const readJSON=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
 let baseline,coverage,blueprint;
 try {
  baseline=readJSON('content/coverage/manuscript-baselines.json');
  coverage=readJSON('content/coverage/cluster-1.1-authored.json');
  blueprint=readJSON('content/cluster-1.1/blueprint.json');
 }catch(e){return ['Cannot read canonical coverage/manuscript/blueprint manifest: '+e.message];}
 const planned=new Map(blueprint.chapters.flatMap(c=>c.lessons).map(l=>[l.id,l]));
 const records=coverage.lessons??[];
 if(records.length!==Object.keys(baseline.manuscripts??{}).length)
  problems.push('Coverage records and manuscript baselines count differ');
 for(const [id,reference] of Object.entries(baseline.manuscripts??{})){
  const full=path.join(root,reference.path);
  if(!fs.existsSync(full)){problems.push('Missing canonical manuscript '+reference.path);continue}
  const text=fs.readFileSync(full);
  const sha=crypto.createHash('sha1').update('blob '+text.length+'\0').update(text).digest('hex');
  if(sha!==reference.gitBlobSha)problems.push('Manuscript content changed since frozen baseline: '+id);
  const headings=sourceSections(text.toString('utf8'));
  if(headings.length!==reference.sectionCount)problems.push('Manuscript section count changed for '+id);
 }
 for(const record of records){
  const id=record.lessonId,p=planned.get(id),baselineDoc=baseline.manuscripts[id];
  if(!p){problems.push('Coverage for unknown blueprint lesson '+id);continue}
  if(!baselineDoc){problems.push('No manuscript checksum for '+id);continue}
  if(record.blueprintMode!==p.mode)problems.push('Blueprint mode mismatch '+id);
  if(record.manuscript!==baselineDoc.path)problems.push('Wrong manuscript reference '+id);
  if(!fs.existsSync(path.join(root,record.browserTest)))problems.push('Missing browser evidence path '+id);
  if(record.reviewStatus!=='expert_content_review_required')problems.push('Unfounded auto-approval of instructional depth '+id);
  const ids=new Set(stableTopicIds(sourceSections(fs.readFileSync(path.join(root,record.manuscript),'utf8'))));
  const byField=new Map();
  for(const entry of record.requirements??[]){
   if(byField.has(entry.blueprintField))problems.push('Duplicate blueprint coverage field '+id+':'+entry.blueprintField);
   byField.set(entry.blueprintField,entry);
   if(!entry.structuralOnly)problems.push('Coverage entry overclaims expert verification '+id);
   if(!entry.topicIds?.length)problems.push('No coverage source anchors '+id+':'+entry.blueprintField);
   for(const topic of entry.topicIds??[])if(!ids.has(topic))problems.push('Missing topic coverage anchor '+id+':'+topic);
   if(!fs.existsSync(path.join(root,entry.verification??'')))problems.push('Missing referenced test '+id+':'+entry.verification);
  }
  for(const f of fields)if(!byField.has(f))problems.push('Missing blueprint coverage field '+id+':'+f);
 }
 const seen=new Set();
 for(const rec of records){if(seen.has(rec.lessonId))problems.push('Duplicate authored coverage '+rec.lessonId);seen.add(rec.lessonId)}
 const localFiles=[
  'README.md','docs/design/VISUAL_TEXTBOOK_V2.md','docs/progress/LEARNING_PROGRESS.md',
  ...Object.values(baseline.manuscripts).map(x=>x.path)
 ];
 for(const rel of localFiles){
  const absolute=path.join(root,rel);
  if(!fs.existsSync(absolute))continue;
  const lines=fs.readFileSync(absolute,'utf8').split('\n');let fenced=false;
  lines.forEach((line,i)=>{
   if(/^\s*(?:```|~~~)/.test(line)){fenced=!fenced;return}
   if(fenced)return;
   for(const m of line.matchAll(/(?<!!)\[[^\]]+\]\(([^\s)]+)(?:\s+["'][^"']+["'])?\)/g)){
    const link=m[1];if(/^(?:https?:|mailto:|data:|#)/.test(link))continue;
    const sub=decodeURIComponent(link.split('#')[0].split('?')[0]);
    if(!sub)continue;
    const target=path.resolve(path.dirname(absolute),sub);
    if(!fs.existsSync(target))problems.push(rel+':'+(i+1)+' broken local Markdown link '+link);
   }
  });
 }
 return problems;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const errors=checkAcademyGovernance(process.argv[2]?path.resolve(process.argv[2]):defaultRoot);
 if(errors.length){console.error('Academy governance FAILED:\n'+errors.map(x=>' - '+x).join('\n'));process.exit(1)}
 console.log('Academy governance PASSED: immutable source fidelity, blueprint structural pointers, local references and explicit review limitations.');
}
