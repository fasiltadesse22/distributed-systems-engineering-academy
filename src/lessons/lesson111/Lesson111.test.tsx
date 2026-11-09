import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import Lesson111,{teachingSections,parseTeachingSections} from './Lesson111';

describe('Lesson 1.1.1 · continuous visual textbook',()=>{
 it('preserves all 13 authored sections and nine distinct pedagogical stages',()=>{
  expect(teachingSections).toHaveLength(13);
  expect(new Set(teachingSections.map(s=>s.stage)).size).toBe(9);
  expect(teachingSections[0].stage).toBe('Orient');
  expect(teachingSections[12].stage).toBe('Retain');
  expect(teachingSections.every(s=>s.body.length>100)).toBe(true);
  expect(parseTeachingSections('## Orient — Start\nContent.')).toHaveLength(1);
 });
 it('renders all original topics at once, with contextual domain simulations and provenance',()=>{
  const html=renderToStaticMarkup(<MemoryRouter><Lesson111/></MemoryRouter>);
  expect((html.match(/data-testid="textbook-topic-\d+"/g)||[])).toHaveLength(13);
  expect(html).toContain('Why the business comes first');
  expect(html).toContain('Actors, stakeholders');
  expect(html).toContain('authority-atlas');
  expect(html).toContain('journey-outcome');
  expect(html).toContain('Domain discovery source contract');
  expect(html).toContain('Conceptual domain contract');
  expect(html).toContain('textbook-definition-list');
  expect(html).not.toContain('Guided steps');
  expect(html).not.toContain('story-map');
 });
});
