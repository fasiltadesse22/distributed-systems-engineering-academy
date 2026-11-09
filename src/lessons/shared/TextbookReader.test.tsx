import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import raw111 from '../../../content/lessons/1.1.1.md?raw';
import raw112 from '../../../content/lessons/1.1.2.md?raw';
import {sourceBlocks,structureSource,structuralSpec,readingThoughts} from './TextbookReader';
import Lesson111,{teachingSections} from '../lesson111/Lesson111';
import Lesson112,{lessonSections} from '../lesson112/Lesson112';

describe('source-fidelity and visual architecture contract',()=>{
 it('preserves every authored paragraph and heading in source order',()=>{
  const docs=[{raw:raw111,sections:teachingSections},{raw:raw112,sections:lessonSections}];
  for(const {raw,sections} of docs){
   const parsed=raw.split(/(?=^## )/m).filter(x=>x.startsWith('## '));
   expect(parsed.length).toBe(sections.length);
   parsed.forEach((part,i)=>{
     expect(part.slice(part.indexOf('\n')+1).trim()).toBe(sections[i].body);
     expect(sourceBlocks(sections[i].body).join('\n\n')).toBe(sections[i].body);
   });
  }
 });
 it('separates meaningful concepts only at explicitly anchored source boundaries',()=>{
  const cases=[['1.1.1',teachingSections],['1.1.2',lessonSections]] as const;
  let valid=0;
  for(const [id,sections] of cases)for(let i=0;i<sections.length;i++){
    sourceBlocks(sections[i].body).forEach((block,j)=>{
      const spec=structuralSpec(id,i,j);
      if(!spec)return;
      const result=structureSource(block,spec);
      expect(result,id+' section '+i+' block '+j).not.toBeNull();
      expect(result!.parts.length).toBe(result!.labels.length);
      expect([result!.lead,...result!.parts,result!.tail].filter(Boolean).join(' ').replace(/\s+/g,' ')).toBe(block.replace(/\s+/g,' '));
      valid++;
    });
  }
  expect(valid).toBeGreaterThanOrEqual(10);
 });
 it('never divides a Markdown emphasis span across separately rendered fragments',()=>{
  const source='A system explanation asks: **Which actors decide? How do we prove the fact?** The next step tests the claim against real evidence.';
  const segments=readingThoughts(source);
  expect(segments.join(' ')).toBe(source);
  expect(segments.every(s=>(s.match(/\*\*/g)||[]).length%2===0)).toBe(true);
 });
 it('does not require a switch to expose the full lessons or their labs',()=>{
  for(const component of [<Lesson111/>,<Lesson112/>]){
   const html=renderToStaticMarkup(<MemoryRouter>{component}</MemoryRouter>);
   expect(html).toContain('textbook-reading-unit');
   expect(html).toContain('textbook-lab');
   expect(html).not.toContain('story-map');
   expect(html).not.toContain('Three moments worth understanding');
   expect(html).not.toContain('Guided steps');
  }
 });
});
