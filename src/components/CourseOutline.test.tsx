import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import CourseOutline from './CourseOutline';

describe('expandable primary learning outline',()=>{
 it('shows all four chapters and makes the selected lesson sections addressable',()=>{
  const html=renderToStaticMarkup(<MemoryRouter initialEntries={['/lesson/1.1.2?section=8']}><CourseOutline onNavigate={()=>{}}/></MemoryRouter>);
  expect(html).toContain('Lesson outline');
  expect(html).toContain('Expand chapter 2');
  expect(html).toContain('Business scenarios and use-case discovery');
  expect(html).toContain('outline-section-1.1.2-8');
  expect(html).toContain('href="/lesson/1.1.2?section=8"');
  expect(html).toContain('aria-current="location"');
 });
 it('does not duplicate an entire study rail in the reader canvas',()=>{
  const html=renderToStaticMarkup(<MemoryRouter initialEntries={['/lesson/1.1.1']}><CourseOutline onNavigate={()=>{}}/></MemoryRouter>);
  expect(html).toContain('outline-section-1.1.1-13');
  expect(html).toContain('Actors, goals, responsibilities and capabilities');
  expect(html).toContain('aria-expanded="true"');
 });
});
