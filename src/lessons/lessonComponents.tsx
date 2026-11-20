import type {ComponentType} from 'react';
import {getAuthoredLesson} from './registry';

/**
 * Eager build-time component resolution preserves the synchronous topic DOM
 * expected by existing bookmark/history navigation and its Chromium tests.
 * Sidebar uses registry metadata ONLY, never this module or any lesson UI.
 * Add a lesson component at the path recorded in the one registry entry.
 */
const modules=import.meta.glob<{default:ComponentType}>(['./lesson11*/Lesson11*.tsx','!./lesson11*/*.test.tsx'],{eager:true});

export function getLessonComponent(id:string):ComponentType|undefined{
 const entry=getAuthoredLesson(id);
 return entry?modules[entry.componentPath]?.default:undefined;
}
export function registeredComponentPaths(){return Object.keys(modules)}
