import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {checkAcademyGovernance} from './check-academy-governance.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function fixture(){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'academy-governance-'));
 const baselines=JSON.parse(fs.readFileSync(path.join(root,'content/coverage/manuscript-baselines.json'),'utf8'));
 const paths=['content/cluster-1.1/blueprint.json','content/coverage/manuscript-baselines.json',
  'content/coverage/cluster-1.1-authored.json','README.md',
  'docs/design/VISUAL_TEXTBOOK_V2.md','docs/progress/LEARNING_PROGRESS.md',
  ...Object.values(baselines.manuscripts).map(x=>x.path)];
 const coverage=JSON.parse(fs.readFileSync(path.join(root,'content/coverage/cluster-1.1-authored.json'),'utf8'));
 for(const c of coverage.lessons) {
  paths.push(c.browserTest);
  for(const req of c.requirements)paths.push(req.verification);
 }
 for(const rel of new Set(paths)){
  const target=path.join(dir,rel);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.copyFileSync(path.join(root,rel),target);
 }
 return dir;
}
const withFixture=(fn)=>()=>{
 const dir=fixture();
 try{fn(dir)}finally{fs.rmSync(dir,{recursive:true,force:true})}
};
test('valid current academy manifests and seven manuscript blobs are intact',()=>{
 assert.deepEqual(checkAcademyGovernance(root),[]);
});
test('a changed canonical manuscript is detected',withFixture(dir=>{
 const p=path.join(dir,'content/lessons/1.1.7.md');
 fs.appendFileSync(p,'\nUnreviewed mutation.\n');
 assert.match(checkAcademyGovernance(dir).join(' '),/Manuscript content changed/);
}));
test('missing blueprint coverage reference fails',withFixture(dir=>{
 const p=path.join(dir,'content/coverage/cluster-1.1-authored.json');
 const j=JSON.parse(fs.readFileSync(p,'utf8'));
 j.lessons[0].requirements=j.lessons[0].requirements.filter(x=>x.blueprintField!=='diagnosis');
 fs.writeFileSync(p,JSON.stringify(j));
 assert.match(checkAcademyGovernance(dir).join(' '),/Missing blueprint coverage field/);
}));
test('invalid topic source anchor fails',withFixture(dir=>{
 const p=path.join(dir,'content/coverage/cluster-1.1-authored.json');
 const j=JSON.parse(fs.readFileSync(p,'utf8'));
 j.lessons[0].requirements[0].topicIds=['nonexistent-topic'];
 fs.writeFileSync(p,JSON.stringify(j));
 assert.match(checkAcademyGovernance(dir).join(' '),/Missing topic coverage anchor/);
}));
test('broken local Markdown link fails',withFixture(dir=>{
 const p=path.join(dir,'README.md');
 fs.appendFileSync(p,'\n[Broken](docs/missing-proof.md)\n');
 assert.match(checkAcademyGovernance(dir).join(' '),/broken local Markdown link/);
}));
