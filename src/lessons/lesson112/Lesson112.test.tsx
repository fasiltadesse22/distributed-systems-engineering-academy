import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import Lesson112,{lessonSections,parseSections} from './Lesson112';

describe('authored lesson 1.1.2',()=>{
 it('loads 14 substantive sections across all nine learning stages',()=>{
  expect(lessonSections).toHaveLength(14);
  expect(new Set(lessonSections.map(s=>s.stage))).toEqual(new Set(['Orient','Understand','Explore','Predict','Engineer','Verify','Diagnose','Defend','Retain']));
  expect(lessonSections.every(s=>s.body.length>200)).toBe(true);
  expect(parseSections('## Orient — Start\nClear description')).toHaveLength(1);
 });
 it('renders an actual authored lesson rather than blueprint placeholder',()=>{
  const text=renderToStaticMarkup(<MemoryRouter><Lesson112/></MemoryRouter>);
  expect(text).toContain('COMPLETE LESSON 1.1.2');
  expect(text).toContain('The business question behind POST /orders');
  expect(text).toContain('Section 1 / 14');
  expect(text).toContain('Verified Java');
  expect(text).not.toContain('Blueprint specification, not an authored lesson.');
 });
});
