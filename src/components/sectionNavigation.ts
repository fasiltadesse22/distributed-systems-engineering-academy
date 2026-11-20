/** Backward-compatible navigation exports. The only authored topic metadata
 * is now in src/lessons/registry.tsx; this module must never maintain another list.
 */
import {authoredLessonIds,getAuthoredLesson,sectionMenuTitle} from '../lessons/registry';
export const lessonNavigationTitles:Record<string,readonly string[]>=
 Object.fromEntries(authoredLessonIds.map(id=>[id,getAuthoredLesson(id)!.topics.map(topic=>topic.nav)]));
export {sectionMenuTitle};
