import { Link } from 'react-router-dom';
import type { Lesson } from '../data/roadmap';
import { chapterForLesson, platformVerifiedSha, platformRepo } from '../data/roadmap';

function Field({ title, entries }: { title: string; entries: string[] }) {
  return (
    <section className="lesson-field">
      <h3>{title}</h3>
      <ul>{entries.map((entry, i) => <li key={i}>{entry}</li>)}</ul>
    </section>
  );
}
export default function LessonReader({ lesson }: { lesson: Lesson }) {
  const chapter = chapterForLesson(lesson.id);
  return (
    <article className="reading-sheet">
      <div className="eyebrow">Cluster 1.1 · {chapter?.title} · planned lesson {lesson.id}</div>
      <h1>{lesson.title}</h1>
      <p className="lead">{lesson.question}</p>
      <div className="info-strip"><b>Blueprint specification, not an authored lesson.</b> Full technical instruction, diagrams and repository evolution will be implemented when this lesson is executed. Mode: {lesson.mode}.</div>
      <div className="lesson-grid">
        <Field title="01 · Learning outcomes" entries={lesson.outcomes}/>
        <Field title="02 · Prerequisites" entries={lesson.prerequisites}/>
        <Field title="03 · Technical scope" entries={lesson.scope}/>
        <Field title="04 · Mechanism tracing" entries={lesson.mechanisms}/>
        <Field title="05 · Visual and interactive learning" entries={lesson.visuals}/>
        <Field title="06 · Practical examples" entries={lesson.examples}/>
        <Field title="07 · Application evolution" entries={[lesson.project]}/>
        <Field title="08 · Experiments and evidence" entries={lesson.experiments}/>
        <Field title="09 · Diagnosis" entries={lesson.diagnosis}/>
        <Field title="10 · Mastery criteria" entries={lesson.mastery}/>
        <Field title="11 · Communication and transfer" entries={lesson.transfer}/>
      </div>
      <div className="question-card">
        <strong>Engineering reference boundary</strong>
        <p>The companion platform now has a verified Java/Spring Boot intake checkpoint from Lesson 1.1.2. This future lesson itself is not implemented:</p>
        <a href={platformRepo + '/tree/' + platformVerifiedSha} target="_blank" rel="noreferrer">Food Ordering Platform · verified intake commit {platformVerifiedSha.slice(0, 12)}</a>
        <p className="small muted">A future verified application checkpoint must cite its own commit SHA and executed evidence; the planning commit is not an application test result.</p>
      </div>
      <div className="action-row"><Link className="primary link-button" to="/blueprint">Return to blueprint</Link><Link className="secondary link-button" to="/lab">Explore the first lab</Link></div>
    </article>
  );
}
