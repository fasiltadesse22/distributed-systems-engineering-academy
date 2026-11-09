import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import Lesson113,{lessonSections,javaCommit,parseCommandSections} from './Lesson113';
import source from '../../../content/lessons/1.1.3.md?raw';
import {sourceBlocks} from '../shared/TextbookReader';
import {lessonNavigationTitles} from '../../components/sectionNavigation';

describe('Lesson 1.1.3 complete Visual Textbook V2',()=>{
 it('keeps all 16 substantial sections and the nine required learning stages',()=>{
  expect(lessonSections).toHaveLength(16);
  expect(lessonNavigationTitles['1.1.3']).toHaveLength(16);
  expect(new Set(lessonSections.map(s=>s.stage))).toEqual(new Set([
   'Orient','Understand','Explore','Predict','Engineer','Verify','Diagnose','Defend','Retain'
  ]));
  expect(lessonSections.every(s=>s.body.length>800)).toBe(true);
  expect(source.trim().split(/\s+/).length).toBeGreaterThan(7000);
  expect(parseCommandSections(source)).toEqual(lessonSections);
 });
 it('preserves complete source blocks in order and does not omit technical evidence',()=>{
  const groups=source.split(/(?=^## )/m).filter(s=>s.startsWith('## '));
  expect(groups).toHaveLength(16);
  groups.forEach((group,i)=>{
   const body=group.slice(group.indexOf('\n')+1).trim();
   expect(lessonSections[i].body).toBe(body);
   expect(sourceBlocks(lessonSections[i].body).join('\n\n')).toBe(body);
  });
  for(const term of ['PlaceOrderCommand','PlaceOrderOutcome','OrderRequestRecorded',
   'BusinessRejection','PENDING','NOT_STARTED','idempotency','acknowledgement',
   'Restaurant','Payment','Refund','2026-11-09','18 Maven tests']){
   expect(source.toLowerCase()).toContain(term.toLowerCase());
  }
 });
 it('renders every topic and both contextual visual/lab elements without reader gates',()=>{
  const html=renderToStaticMarkup(<MemoryRouter><Lesson113/></MemoryRouter>);
  expect((html.match(/data-testid="textbook-topic-\d+"/g)||[])).toHaveLength(16);
  expect(html).toContain('data-testid="command-fact-flow"');
  expect(html).toContain('data-testid="command-fact-lab"');
  expect(html).toContain('data-testid="embedded-lab-1"');
  expect(html).toContain('data-testid="embedded-lab-11"');
  expect(html).toContain('OrderRequestRecorded');
  expect(html).toContain('18 verified tests');
  expect(html).toContain(javaCommit);
  expect(html).not.toContain('Guided steps');
  expect(html).not.toContain('Three moments worth understanding');
 });
});
