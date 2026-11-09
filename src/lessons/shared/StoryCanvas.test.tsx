import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import source111 from '../../../content/lessons/1.1.1.md?raw';
import source112 from '../../../content/lessons/1.1.2.md?raw';
import {splitIntoReadingBeats,StoryCanvas} from './StoryCanvas';
import {authorityScenes} from '../lesson111/scenes';
import {useCaseScenes} from '../lesson112/scenes';

const sections=(source:string)=>source.split(/(?=^## )/m).filter(s=>s.startsWith('## ')).map(s=>s.slice(s.indexOf('\n')+1).trim());
const blocks=(s:string)=>s.trim().split(/\n\s*\n/).filter(Boolean);
describe('visual lesson story preserves depth',()=>{
 it('retains every authored Markdown block across all 27 lesson sections',()=>{
  for(const body of [...sections(source111),...sections(source112)]){
   const beats=splitIntoReadingBeats(body);
   expect(beats.length).toBeGreaterThan(0);
   expect(beats.every(b=>b.markdown.length>0&&b.heading.length>0)).toBe(true);
   expect(beats.flatMap(b=>blocks(b.markdown))).toEqual(blocks(body));
  }
 });
 it('has exactly one authored causal diagram per canonical teaching section',()=>{
  expect(authorityScenes).toHaveLength(13);
  expect(useCaseScenes).toHaveLength(14);
  for(const item of [...authorityScenes,...useCaseScenes]){
    expect(item.question.length).toBeGreaterThan(25);
    expect(item.nodes.length).toBeGreaterThanOrEqual(3);
    expect(item.nodes.every(n=>n.explanation.length>40)).toBe(true);
    expect(item.shiftExplanation.length).toBeGreaterThan(45);
  }
 });
 it('renders accessible diagram selection, guided navigation and full reading option',()=>{
  const html=renderToStaticMarkup(<StoryCanvas markdown={sections(source111)[0]} scene={authorityScenes[0]}/>);
  expect(html).toContain('Interactive concept and causal model');
  expect(html).toContain('Guided steps');
  expect(html).toContain('Read all');
  expect(html).toContain('Read step 1');
  expect(html).toContain('Check your understanding'.toUpperCase());
  expect(html).toContain('What changes if…?');
 });
});
