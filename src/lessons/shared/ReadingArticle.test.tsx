import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import source111 from '../../../content/lessons/1.1.1.md?raw';
import source112 from '../../../content/lessons/1.1.2.md?raw';
import {editorialFor,readingEditorial,kindNames} from './readingEditorial';
import {ReadingArticle,readingBlocks,buildReadingRanges,beatForBlock} from './ReadingArticle';
import {splitIntoReadingBeats} from './StoryCanvas';

function sectionBodies(source:string){
 return source.split(/(?=^## )/m).filter(x=>x.startsWith('## ')).map(x=>x.slice(x.indexOf('\n')+1).trim());
}
describe('curated editorial deep-reading system',()=>{
 it('has exactly three valid, nonduplicate editorial source anchors in every section',()=>{
  for(const [id,source] of [['1.1.1',source111],['1.1.2',source112]] as const){
   const sections=sectionBodies(source);
   expect(readingEditorial[id]).toHaveLength(sections.length);
   sections.forEach((body,index)=>{
    const guide=editorialFor(id,index);
    expect(guide.lens.length).toBeGreaterThan(35);
    expect(guide.annotations).toHaveLength(3);
    const blocks=readingBlocks(body);
    expect(new Set(guide.annotations.map(note=>note.block)).size).toBe(3);
    guide.annotations.forEach(note=>{
      expect(note.block).toBeGreaterThanOrEqual(0);
      expect(note.block).toBeLessThan(blocks.length);
      expect(note.title.length).toBeGreaterThan(9);
      expect(note.why.length).toBeGreaterThan(35);
      expect(kindNames[note.kind].length).toBeGreaterThan(4);
      expect(blocks[note.block].startsWith('###')).toBe(false);
    });
   });
  }
 });
 it('reconstructs every source block in order with guided and full-reading ranges',()=>{
  for(const source of [source111,source112]){
   for(const body of sectionBodies(source)){
    const beats=splitIntoReadingBeats(body);
    const ranges=buildReadingRanges(beats);
    expect(ranges.length).toBe(beats.length);
    expect(ranges[0].start).toBe(0);
    expect(ranges.at(-1)?.end).toBe(readingBlocks(body).length);
    expect(beats.flatMap(beat=>readingBlocks(beat.markdown))).toEqual(readingBlocks(body));
    for(let index=0;index<readingBlocks(body).length;index++){
      const beat=beatForBlock(ranges,index);
      expect(ranges[beat].start).toBeLessThanOrEqual(index);
      expect(ranges[beat].end).toBeGreaterThan(index);
    }
   }
  }
 });
 it('adds a distinct meaningful note without losing the original paragraph',()=>{
  const first=readingBlocks(sectionBodies(source112)[0])[0];
  const guide=editorialFor('1.1.2',0);
  const html=renderToStaticMarkup(<ReadingArticle markdown={first} offset={0} editorial={guide} textSize={2}/>);
  expect(html).toContain('data-kind="example"');
  expect(html).toContain('Worked example');
  expect(html).toContain('201 Created');
  expect(html).toContain('data-text-size="2"');
  expect(html).toContain(guide.annotations[0].title);
  const without=renderToStaticMarkup(<ReadingArticle markdown={first} offset={0} editorial={guide} cues={false}/>);
  expect(without).toContain('201 Created');
  expect(without).not.toContain('Worked example');
  expect(without).toContain('data-kind="narrative"');
 });
});
