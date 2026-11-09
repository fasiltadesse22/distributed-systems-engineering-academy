import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import Lesson112,{lessonSections,parseSections} from './Lesson112';

describe('Lesson 1.1.2 · continuous Java-linked visual textbook',()=>{
 it('retains 14 substantial authored sections across nine learning stages',()=>{
  expect(lessonSections).toHaveLength(14);
  expect(new Set(lessonSections.map(s=>s.stage))).toEqual(new Set(['Orient','Understand','Explore','Predict','Engineer','Verify','Diagnose','Defend','Retain']));
  expect(lessonSections.every(s=>s.body.length>200)).toBe(true);
  expect(parseSections('## Orient — Start\nDetailed content')).toHaveLength(1);
 });
 it('renders all sections, eight-stage intake, acceptance criteria and real evidence links',()=>{
  const html=renderToStaticMarkup(<MemoryRouter><Lesson112/></MemoryRouter>);
  expect((html.match(/data-testid="textbook-topic-\d+"/g)||[])).toHaveLength(14);
  expect(html).toContain('Business Scenarios');
  expect(html).toContain('UC-001 · From HTTP request to intake');
  expect((html.match(/class="textbook-step-index"/g)||[]).length).toBeGreaterThanOrEqual(8);
  expect(html).toContain('AC-07');
  expect(html).toContain('scenario-studio');
  expect(html).toContain('execution-trace');
  expect(html).toContain('Java 21 / Spring Boot');
  expect(html).toContain('08b33714431a53f6b1cb1e1e09718b0281da1ce8');
  expect(html).not.toContain('Blueprint specification, not an authored lesson.');
 });
});
