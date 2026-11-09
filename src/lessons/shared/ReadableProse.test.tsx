import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import source111 from '../../../content/lessons/1.1.1.md?raw';
import source112 from '../../../content/lessons/1.1.2.md?raw';
import {readingBlocks,ReadingArticle} from './ReadingArticle';
import {parseStructuredParagraph} from './StructuredPassage';
import {visualsFor} from './structuredVisuals';
import {identifyLeadDefinition,segmentNarrative} from './ReadableProse';
import {lessonNavigationTitles,sectionMenuTitle} from '../../components/sectionNavigation';

const sections=(source:string)=>source.split(/(?=^## )/m).filter(x=>x.startsWith('## ')).map(x=>readingBlocks(x.slice(x.indexOf('\n')+1).trim()));
const first=sections(source111),second=sections(source112);

describe('structural concept reading and meaningful navigation',()=>{
 it('exposes four complete concepts as separate readable source-backed cards',()=>{
  const [concepts,anatomy]=[visualsFor('1.1.2',1).find(x=>x.type==='definitions')!,visualsFor('1.1.2',3).find(x=>x.type==='definitions')!];
  const c=parseStructuredParagraph(second[1][0],concepts)!;
  expect(c.items.map(x=>x.label)).toEqual(['Business capability','Use case','User story','Endpoint']);
  expect(c.items[0].source).toContain('stable ability an organization must provide');
  expect(c.items[1].source).toContain('observable outcome');
  expect(c.items[2].source).toContain('desired value');
  expect(c.items[3].source).toContain('technical entry mechanism');
  const html=renderToStaticMarkup(<ReadingArticle markdown={second[1][0]} offset={0} visuals={[concepts]}/>);
  expect(html).toContain('data-testid="visual-definitions"');
  expect((html.match(/class="structured-tile"/g)||[])).toHaveLength(4);
  expect(html).toContain('Show original paragraph');
  const a=parseStructuredParagraph(second[3][1],anatomy)!;
  expect(a.items.map(x=>x.label)).toEqual(['Trigger','Precondition','Guard','Postcondition']);
  expect(a.tail).toContain('In this lesson');
 });
 it('distinguishes goals from incentives and diagnoses with source-backed cards',()=>{
  const goals=parseStructuredParagraph(first[2][0],visualsFor('1.1.1',2)[0])!;
  expect(goals.items.map(x=>x.label)).toEqual(['Goal','Incentive','Responsibility','Capability']);
  expect(goals.tail).toContain('not an API');
  const incident=parseStructuredParagraph(second[11][0],visualsFor('1.1.2',11)[0])!;
  expect(incident.items).toHaveLength(5);
  expect(incident.items[4].source).toContain('two POSTs');
  const q=parseStructuredParagraph(second[12][3],visualsFor('1.1.2',12).find(x=>x.type==='qa')!)!;
  expect(q.items).toHaveLength(5);
  expect(q.items[0].source).toContain('No.');
  expect(q.items[4].source).toContain('Yes,');
 });
 it('provides 27 descriptive topic-first section labels instead of repeating learning stages',()=>{
  expect(lessonNavigationTitles['1.1.1']).toHaveLength(first.length);
  expect(lessonNavigationTitles['1.1.2']).toHaveLength(second.length);
  const names=[...lessonNavigationTitles['1.1.1'],...lessonNavigationTitles['1.1.2']];
  expect(new Set(names).size).toBe(27);
  for(const name of names){
   expect(name.length).toBeGreaterThan(10);
   expect(/^(Understand|Explore|Predict|Diagnose|Retain)\b/i.test(name)).toBe(false);
  }
  expect(sectionMenuTitle('1.1.2',1,'')).toBe('Capability vs use case vs API');
 });
 it('preserves all original source blocks while breaking up dense narratives',()=>{
  let segmented=0,termed=0,total=0;
  for(const section of [...first,...second]){
   for(const block of section){
    total++;
    const pieces=segmentNarrative(block);
    expect(pieces.join(' ')).toBe(block.replace(/\s+/g,' ').trim());
    if(pieces.length>1)segmented++;
    if(identifyLeadDefinition(block))termed++;
   }
  }
  expect(total).toBeGreaterThan(140);
  expect(segmented).toBeGreaterThanOrEqual(25);
  expect(termed).toBeGreaterThanOrEqual(5);
  const conceptHtml=renderToStaticMarkup(<ReadingArticle markdown={first[1][0]} offset={0}/>);
  expect(conceptHtml).toContain('TERM &amp; MEANING');
  expect(conceptHtml).toContain('actor');
  const narrativeHtml=renderToStaticMarkup(<ReadingArticle markdown={second[0][0]} offset={0}/>);
  expect(narrativeHtml).toContain('reader-narrative');
 });
});
