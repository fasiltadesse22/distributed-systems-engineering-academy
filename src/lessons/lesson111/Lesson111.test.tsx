import { describe,it,expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import Lesson111, { teachingSections, parseTeachingSections } from './Lesson111';
import { ActorAuthorityAtlas } from './ActorAuthorityAtlas';
import { WorkflowStudio } from './WorkflowStudio';
import { AuthorityChallenge, IncidentCaseboard, CommunicationDrill } from './Exercises';
describe('authored Lesson 1.1.1',()=>{
  it('loads all 13 substantive teaching sections and 9 learning stages',()=>{
    expect(teachingSections).toHaveLength(13);
    expect(new Set(teachingSections.map(s=>s.stage)).size).toBe(9);
    expect(teachingSections[0].stage).toBe('Orient');
    expect(teachingSections[12].stage).toBe('Retain');
    expect(teachingSections.every(x=>x.body.length>100)).toBe(true);
    expect(parseTeachingSections('## Orient — Start\nA long detailed section.')).toHaveLength(1);
  });
  it('renders authored lesson with navigation and provenance not placeholder',()=>{
    const html=renderToStaticMarkup(<MemoryRouter><Lesson111/></MemoryRouter>);
    expect(html).toContain('FULL LESSON 1.1.1');
    expect(html).toContain('Start with the business, not the architecture');
    expect(html).toContain('ENGINEERING QUESTION');
    expect(html).toContain('Guided steps');
    expect(html).not.toContain('Lesson study sections');
    expect(html).toContain('Part 1 of 13');
    expect(html).toContain('Food Ordering');
    expect(html).not.toContain('Blueprint specification, not an authored lesson.');
  });
  it('renders real choices and warnings for all interactive exercises',()=>{
    const atlas=renderToStaticMarkup(<ActorAuthorityAtlas/>);
    expect(atlas).toContain('Choose actor');
    expect(atlas).toContain('Assign decision authority');
    expect(atlas).toContain('Unresolved cross-actor policy');
    const flow=renderToStaticMarkup(<WorkflowStudio/>);
    expect(flow).toContain('Provider result');
    expect(flow).toContain('Run illustrated business journey');
    const challenge=renderToStaticMarkup(<AuthorityChallenge/>);
    expect(challenge).toContain('Reveal reasoning');
    const incident=renderToStaticMarkup(<IncidentCaseboard/>);
    expect(incident).toContain('Choose evidence to inspect');
    const communication=renderToStaticMarkup(<CommunicationDrill/>);
    expect(communication).toContain('Show self-review rubric');
  });
});
