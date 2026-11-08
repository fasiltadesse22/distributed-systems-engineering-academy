import rawRoadmap from '../../docs/roadmap/MASTER_ROADMAP_V1.md?raw';
import blueprintData from '../../content/cluster-1.1/blueprint.json';

export type Lesson = (typeof blueprintData)['chapters'][number]['lessons'][number];
export type Chapter = (typeof blueprintData)['chapters'][number];
export const blueprint = blueprintData;
export const roadmapText = rawRoadmap;

export interface Cluster {
  id: string;
  title: string;
  markdown: string;
}
export interface Phase {
  roman: string;
  title: string;
  intro: string;
  clusters: Cluster[];
}

export function parseRoadmap(markdown: string): Phase[] {
  const lines = markdown.split(/\r?\n/);
  const phases: Phase[] = [];
  let phase: Phase | undefined;
  let cluster: Cluster | undefined;
  for (const line of lines) {
    // The curriculum catalog ends before the cross-cutting contract sections.
    if (phase && /^## (11|12|13)\. /.test(line)) break;
    const phaseMatch = line.match(/^## Phase ([IVXLCDM]+) — (.+)$/);
    if (phaseMatch) {
      phase = { roman: phaseMatch[1], title: phaseMatch[2], intro: '', clusters: [] };
      phases.push(phase);
      cluster = undefined;
      continue;
    }
    const clusterMatch = line.match(/^### Cluster (\d+\.\d+) — (.+)$/);
    if (clusterMatch && phase) {
      cluster = { id: clusterMatch[1], title: clusterMatch[2], markdown: '' };
      phase.clusters.push(cluster);
      continue;
    }
    if (phase && cluster) cluster.markdown += line + '\n';
    else if (phase) phase.intro += line + '\n';
  }
  return phases;
}
export const phases = parseRoadmap(rawRoadmap);

export const chapters: Chapter[] = blueprint.chapters;
export const lessons: Lesson[] = chapters.flatMap((chapter) => chapter.lessons);
export const chapterForLesson = (lessonId: string) =>
  chapters.find((chapter) => chapter.lessons.some((lesson) => lesson.id === lessonId));

export const platformRepo = 'https://github.com/fasiltadesse22/food-ordering-platform-new';
export const academyRepo = 'https://github.com/fasiltadesse22/distributed-systems-engineering-academy';
export const platformPlanningSha = '2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb';
