import {useEffect,useState} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
import {chapters,chapterForLesson} from '../data/roadmap';
import {teachingSections} from '../lessons/lesson111/Lesson111';
import {lessonSections} from '../lessons/lesson112/Lesson112';

type SectionItem={index:number;stage:string;title:string};
const authoredSections:Record<string,SectionItem[]>={'1.1.1':teachingSections,'1.1.2':lessonSections};

function currentLessonId(pathname:string):string|null {
  const match=pathname.match(/^\/lesson\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}
function currentChapterId(pathname:string):string|null {
  const lessonId=currentLessonId(pathname);
  if(lessonId)return chapterForLesson(lessonId)?.id??null;
  const match=pathname.match(/^\/chapter\/([^/]+)$/);
  return match?decodeURIComponent(match[1]):null;
}

/** Expandable chapter → lesson → authored section tree in the application's SINGLE primary sidebar.
 * Navigation is URL-addressable (e.g. #/lesson/1.1.2?section=8), so browser
 * history and direct links resolve without a second in-content navigation rail. */
export default function CourseOutline({onNavigate}:{onNavigate:()=>void}){
  const location=useLocation();
  const activeLesson=currentLessonId(location.pathname);
  const activeChapter=currentChapterId(location.pathname);
  const activeSection=Math.max(1,Number(new URLSearchParams(location.search).get('section')??'1')||1);
  const [openChapter,setOpenChapter]=useState<string|null>(()=>activeChapter??'C1');
  const [openLesson,setOpenLesson]=useState<string|null>(()=>activeLesson);
  useEffect(()=>{
    if(activeChapter)setOpenChapter(activeChapter);
    setOpenLesson(activeLesson && authoredSections[activeLesson]?activeLesson:null);
  },[location.pathname,activeChapter,activeLesson]);
  return <nav className="course-outline" aria-label="Lesson outline" data-testid="course-outline">
    <div className="course-outline-intro">
      <span className="nav-heading">CLUSTER 1.1 · LEARNING PATH</span>
      <p>Open a chapter, choose a lesson, or expand its study sections.</p>
    </div>
    {chapters.map((chapter,i)=>{
      const chapterOpen=openChapter===chapter.id;
      return <div className={'outline-chapter '+(chapterOpen?'is-open':'')} key={chapter.id}>
        <div className="outline-chapter-row">
          <button type="button" className="outline-chapter-toggle"
            aria-label={(chapterOpen?'Collapse':'Expand')+' chapter '+(i+1)+': '+chapter.title}
            aria-expanded={chapterOpen}
            aria-controls={'outline-chapter-'+chapter.id}
            onClick={()=>setOpenChapter(chapterOpen?null:chapter.id)}>
            <span className="outline-caret" aria-hidden="true">{chapterOpen?'▾':'▸'}</span>
            <span className="outline-chapter-text"><small>CHAPTER {String(i+1).padStart(2,'0')} · {chapter.lessons.length} LESSONS</small><strong>{chapter.title}</strong></span>
          </button>
          <Link className="outline-overview" to={'/chapter/'+chapter.id}
            aria-label={'Open chapter '+(i+1)+' overview'} onClick={onNavigate}>↗</Link>
        </div>
        {chapterOpen&&<div className="outline-chapter-body" id={'outline-chapter-'+chapter.id}>
          {chapter.lessons.map(lesson=>{
            const sections=authoredSections[lesson.id]??[];
            const selected=lesson.id===activeLesson;
            const expanded=lesson.id===openLesson&&sections.length>0;
            return <div className={'outline-lesson '+(selected?'selected':'')} key={lesson.id}>
              <div className="outline-lesson-row">
                <NavLink to={'/lesson/'+lesson.id} onClick={onNavigate} end
                  className={'outline-lesson-link '+(selected?'active':'')}>
                  <span className="outline-lesson-id">{lesson.id}</span>
                  <span className="outline-lesson-title">{lesson.title}</span>
                  {sections.length>0&&<span className="outline-authored" aria-label="Fully authored lesson" title="Interactive lesson available">●</span>}
                </NavLink>
                {sections.length>0&&<button type="button"
                    className="outline-lesson-toggle"
                    aria-label={(expanded?'Collapse':'Expand')+' sections for Lesson '+lesson.id}
                    aria-controls={'outline-sections-'+lesson.id}
                    aria-expanded={expanded}
                    onClick={()=>setOpenLesson(expanded?null:lesson.id)}>
                  <span aria-hidden="true">{expanded?'⌃':'⌄'}</span>
                </button>}
              </div>
              {expanded&&<div className="outline-sections" id={'outline-sections-'+lesson.id}>
                {sections.map((section,index)=><Link
                  key={section.index}
                  to={'/lesson/'+lesson.id+'?section='+(index+1)}
                  onClick={onNavigate}
                  data-testid={'outline-section-'+lesson.id+'-'+(index+1)}
                  className={'outline-section-link '+(selected&&activeSection===index+1?'active':'')}
                  aria-current={selected&&activeSection===index+1?'location':undefined}>
                    <span className="outline-section-index">{String(index+1).padStart(2,'0')}</span>
                    <span><b>{section.stage}</b><small>{section.title}</small></span>
                </Link>)}
              </div>}
            </div>;
          })}
        </div>}
      </div>;
    })}
  </nav>;
}
