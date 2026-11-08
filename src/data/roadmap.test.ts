import { describe, expect, it } from 'vitest';
import { blueprint, chapterForLesson, lessons, parseRoadmap, phases, roadmapText } from './roadmap';

describe('authoritative roadmap navigation', () => {
  it('indexes 19 phases and 93 clusters from the source without losing scope', () => {
    expect(phases).toHaveLength(19);
    expect(phases.flatMap(p => p.clusters)).toHaveLength(93);
    expect(phases[0].clusters[0].id).toBe('1.1');
    expect(phases.every(p => p.clusters.every(c => c.markdown.includes('**Engineering question:**')))).toBe(true);
  });
  it('finds exactly 20 unique lesson specifications and parent chapters', () => {
    expect(blueprint.chapters).toHaveLength(4);
    expect(lessons).toHaveLength(20);
    expect(new Set(lessons.map(l => l.id)).size).toBe(20);
    expect(lessons.every(l => chapterForLesson(l.id)?.lessons.some(x => x.id === l.id))).toBe(true);
    expect(chapterForLesson('does-not-exist')).toBeUndefined();
  });
  it('handles a phase-specific extract in the same grammar as the complete source', () => {
    const one = roadmapText.slice(roadmapText.indexOf('## Phase I —'), roadmapText.indexOf('## Phase II —'));
    const parsed = parseRoadmap(one);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].clusters.map(c => c.id)).toEqual(['1.1','1.2','1.3','1.4']);
  });
});
