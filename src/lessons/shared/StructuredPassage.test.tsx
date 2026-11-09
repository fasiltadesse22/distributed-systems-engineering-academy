import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import source111 from '../../../content/lessons/1.1.1.md?raw';
import source112 from '../../../content/lessons/1.1.2.md?raw';
import {readingBlocks,ReadingArticle} from './ReadingArticle';
import {parseStructuredParagraph} from './StructuredPassage';
import {structuredVisuals,visualsFor} from './structuredVisuals';
import type {LessonKey} from './structuredVisuals';

const sections=(source:string)=>source.split(/(?=^## )/m).filter(x=>x.startsWith('## ')).map(x=>readingBlocks(x.slice(x.indexOf('\n')+1).trim()));

describe('structurally redesigned deep explanations',()=>{
 const sources:Record<LessonKey,string>={'1.1.1':source111,'1.1.2':source112};
 it('audits every curated structural transformation against the actual complete manuscript',()=>{
  let transformed=0;
  for(const lesson of ['1.1.1','1.1.2'] as const){
   const blocks=sections(sources[lesson]);
   for(const [sectionText,specs] of Object.entries(structuredVisuals[lesson])){
    const section=Number(sectionText);
    expect(section).toBeLessThan(blocks.length);
    for(const spec of specs){
     expect(spec.block).toBeLessThan(blocks[section].length);
     const parsed=parseStructuredParagraph(blocks[section][spec.block],spec);
     expect(parsed,lesson+'/'+section+'/'+spec.block+'/'+spec.type).not.toBeNull();
     expect(parsed!.items).toHaveLength(spec.labels?.length??spec.insights!.length);
     expect(parsed!.items.every(item=>item.source.length>3&&item.insight.length>20&&item.label.length>4)).toBe(true);
     expect(new Set(parsed!.items.map(item=>item.label)).size).toBe(parsed!.items.length);
     const html=renderToStaticMarkup(<ReadingArticle markdown={blocks[section][spec.block]} offset={spec.block} visuals={[spec]}/>);
     expect(html).toContain('data-testid="visual-'+spec.type+'"');
     expect(html).not.toContain('visual-fallback');
     expect(html).toContain('Show original paragraph');
     for(const item of parsed!.items)expect(html).toContain(item.label);
     transformed++;
    }
   }
  }
  expect(transformed).toBeGreaterThanOrEqual(10);
 });
 it('turns UC-001 normal flow into eight distinct numbered visible stages',()=>{
  const spec=visualsFor('1.1.2',2)[0];
  const source=sections(source112)[2][1];
  const parsed=parseStructuredParagraph(source,spec);
  expect(parsed).not.toBeNull();
  expect(parsed!.items).toHaveLength(8);
  expect(parsed!.items[0].source).toContain('OrderController parses JSON');
  expect(parsed!.items[7].source).toContain('201 Created');
  const html=renderToStaticMarkup(<ReadingArticle markdown={source} offset={1} visuals={[spec]}/>);
  expect((html.match(/class="structured-step"/g)||[])).toHaveLength(8);
  expect(html).toContain('Explain step 8: Return an honest response');
  expect(html).toContain('Why this matters');
 });
 it('makes criteria, authority and reasoning chains independently scannable',()=>{
  const ac=visualsFor('1.1.2',8)[0];
  const acSource=sections(source112)[8][1];
  const parsed=parseStructuredParagraph(acSource,ac)!;
  expect(parsed.items).toHaveLength(7);
  expect(parsed.items[4].source).toContain('distinct order IDs');
  const authority=parseStructuredParagraph(sections(source111)[4][0],visualsFor('1.1.1',4)[0])!;
  expect(authority.items).toHaveLength(4);
  expect(authority.items[3].source).toContain('whose evidence');
  const chain=parseStructuredParagraph(sections(source112)[12][4],visualsFor('1.1.2',12)[0])!;
  expect(chain.items).toHaveLength(9);
  expect(chain.items[8].source).toBe('next forces');
 });
 it('preserves the exact original source in disclosure including punctuation',()=>{
  const original=sections(source112)[2][1];
  const parsed=parseStructuredParagraph(original,visualsFor('1.1.2',2)[0])!;
  expect(parsed.source).toBe(original);
  const html=renderToStaticMarkup(<ReadingArticle markdown={original} offset={1} visuals={visualsFor('1.1.2',2)}/>);
  expect(html).toContain('Show original paragraph');
  expect(html).toContain('data-source-block="preserved"');
  expect(original).toContain('(8) The controller returns');
 });
});