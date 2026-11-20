import {parseCanonicalSections, type AuthoredEntry} from './registry';

const sourceBlocks=(s:string)=>s.trim().split(/\n\s*\n/).filter(Boolean);
const normalize=(s:string)=>s.replace(/\s+/g,' ');
/** Structural integrity only. Depth/accuracy requires expert review. */
export function validateAuthoredEntries(entries:readonly AuthoredEntry[],plannedIds:readonly string[]):string[]{
 const failures:string[]=[],seen=new Set<string>();
 for(const entry of entries){
  if(seen.has(entry.id))failures.push('Duplicate authored lesson '+entry.id);
  seen.add(entry.id);
  if(!plannedIds.includes(entry.id))failures.push('Authored lesson missing blueprint '+entry.id);
  if(!entry.manuscript.trim())failures.push('Missing manuscript '+entry.id);
  const sections=parseCanonicalSections(entry.manuscript);
  if(sections.length!==entry.topics.length)failures.push('Topic count mismatch '+entry.id);
  const ids=new Set<string>(),legacy=new Set<number>();
  for(const [i,topic] of entry.topics.entries()){
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id))failures.push('Invalid topic ID '+entry.id+':'+topic.id);
    if(ids.has(topic.id))failures.push('Duplicate topic ID '+entry.id+':'+topic.id);
    ids.add(topic.id);
    if(sections[i]&&sections[i].heading!==topic.heading)failures.push('Topic source heading mismatch '+entry.id+':'+topic.id);
    if(!topic.nav.trim())failures.push('Missing editorial title '+entry.id+':'+topic.id);
    if(topic.legacySection!==undefined){
      if(!Number.isInteger(topic.legacySection)||topic.legacySection<=0||legacy.has(topic.legacySection))
        failures.push('Duplicate or invalid numerical legacy link '+entry.id+':'+topic.id);
      legacy.add(topic.legacySection);
    }
  }
  const labIds=new Set<string>();
  for(const lab of entry.labs){
    if(labIds.has(lab.id))failures.push('Duplicate lab anchor '+entry.id+':'+lab.id);
    labIds.add(lab.id);
    const i=entry.topics.findIndex(t=>t.id===lab.topicId);
    if(i<0){failures.push('Lab target topic absent '+entry.id+':'+lab.id);continue}
    const matches=sourceBlocks(sections[i]?.body??'').filter(b=>normalize(b).includes(lab.marker));
    if(matches.length!==1)failures.push('Lab source anchor absent or ambiguous '+entry.id+':'+lab.id);
    if(!lab.label.trim())failures.push('Missing lab label '+entry.id+':'+lab.id);
  }
 }
 return failures;
}
