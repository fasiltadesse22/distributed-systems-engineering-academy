import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { blueprint } from '../data/roadmap';
import RaceLab from './RaceLab';
import ConceptMap from './ConceptMap';
import LessonReader from './LessonReader';
import { StateDiagram, SequenceView } from './MechanismVisual';
import { runRace } from '../simulation/race';

describe('renderable academy components', () => {
  it('renders an actual prediction control surface, not a decorative diagram', () => {
    const html = renderToStaticMarkup(<RaceLab />);
    expect(html).toContain('Run modeled execution');
    expect(html).toContain('Both actors read PLACED first');
    expect(html).toContain('Unsafe: check once, then blind write');
    expect(html).toContain('Predict before reveal');
    expect(html).toContain('Simulation');
  });
  it('renders a state diagram and timeline with the selected simulated outcome', () => {
    const result = runRace({ strategy: 'unguarded', sequence: 'overlap', repeatCancel: false });
    const diagram = renderToStaticMarkup(<StateDiagram finalStatus={result.finalStatus}/>);
    const timeline = renderToStaticMarkup(<SequenceView result={result}/>);
    expect(diagram).toContain('CANCELLED');
    expect(diagram).toContain('ACCEPTED');
    expect(diagram).toContain('Final state ACCEPTED');
    expect(timeline).toContain('Committed CANCELLED');
    expect(timeline).toContain('Committed ACCEPTED');
  });
  it('renders the concept dependency explorer and a full planned lesson specification', () => {
    const map = renderToStaticMarkup(<ConceptMap />);
    const lesson = blueprint.chapters[0].lessons[0];
    const spec = renderToStaticMarkup(<MemoryRouter><LessonReader lesson={lesson}/></MemoryRouter>);
    expect(map).toContain('Actors and authority');
    expect(map).toContain('Selected mechanism');
    expect(spec).toContain('Learning outcomes');
    expect(spec).toContain('Experiments and evidence');
    expect(spec).toContain('Blueprint specification, not an authored lesson.');
  });
});
