import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { academyRepo, blueprint, chapters, lessons, phases, platformRepo, platformPlanningSha, roadmapText } from './data/roadmap';
import ConceptMap from './components/ConceptMap';
import LessonReader from './components/LessonReader';
import RaceLab from './components/RaceLab';

function Brand() {
  return <Link className="brand" to="/" aria-label="Academy home"><span className="brand-icon">D/S</span><span>DISTRIBUTED SYSTEMS<small>ENGINEERING ACADEMY</small></span></Link>;
}
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
function Shell() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return localStorage.getItem('academy-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('academy-theme', theme); } catch { /* disabled */ }
  }, [theme]);
  useEffect(() => { setMenu(false); setQuery(''); }, [location.pathname]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const clusterItems = phases.flatMap(p => p.clusters.map(c => ({ id: c.id, title: c.title, href: '/roadmap/' + c.id, kind: 'Cluster' })));
    const lessonItems = lessons.map(l => ({ id: l.id, title: l.title, href: '/lesson/' + l.id, kind: 'Lesson plan' }));
    return [...clusterItems, ...lessonItems].filter(i => (i.id + ' ' + i.title).toLowerCase().includes(q)).slice(0, 8);
  }, [query]);
  return <div className="shell">
    {menu && <button className="shade" aria-label="Close navigation" onClick={() => setMenu(false)}/>}
    <aside className={'sidebar ' + (menu ? 'open' : '')}>
      <Brand/>
      <span className="nav-heading">EXPLORE</span>
      <nav aria-label="Main navigation" className="nav-list">
        {([['/', '◈', 'Overview'], ['/roadmap', '▤', 'Master roadmap'], ['/blueprint', '◇', 'Cluster 1.1 blueprint'], ['/lab', '⟡', 'Interactive lab'], ['/method', '◎', 'Learning method']] as const).map(([url, icon, title]) =>
          <NavLink end={url === '/'} to={url} key={url} className={({isActive}) => 'nav-link ' + (isActive ? 'active' : '')} onClick={() => setMenu(false)}><span className="nav-icon">{icon}</span>{title}</NavLink>
        )}
      </nav>
      <span className="nav-heading bordered">CLUSTER 1.1 · CHAPTERS</span>
      <nav aria-label="Chapter navigation" className="nav-list">
        {chapters.map((ch, i) => <NavLink to={'/chapter/' + ch.id} key={ch.id} className={({isActive}) => 'nav-link chapter-nav ' + (isActive ? 'active' : '')} onClick={() => setMenu(false)}><span className="chapter-index">{String(i+1).padStart(2,'0')}</span>{ch.title}</NavLink>)}
      </nav>
      <div className="sidebar-footer"><span className="dot"/> <span><b>Academy V0.1</b><small>Foundation · Blueprint ready</small></span></div>
    </aside>
    <div className="main">
      <header className="topbar">
        <button className="menu-button" aria-label="Open navigation" onClick={() => setMenu(true)}>☰</button>
        <span className="crumb">ACADEMY <i>/</i> {location.pathname === '/' ? 'OVERVIEW' : location.pathname.slice(1).replaceAll('/',' / ').toUpperCase()}</span>
        <div className="global-search"><label className="search"><span aria-hidden="true">⌕</span><span className="sr-only">Search across roadmap and lesson specifications</span><input placeholder="Search 93 clusters and 20 lesson plans" type="search" value={query} onChange={e => setQuery(e.target.value)}/></label>
        {results.length > 0 && <div className="results" aria-label="Search results">{results.map(item => <Link key={item.kind + item.id} to={item.href}><b>{item.id}</b> {item.title}<small>{item.kind}</small></Link>)}</div>}</div>
        <button aria-label={'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme'} className="theme-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☼' : '☾'}</button>
      </header>
      <main id="main-content" className="content"><Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/roadmap" element={<Roadmap/>}/>
        <Route path="/roadmap/:id" element={<ClusterDetail/>}/>
        <Route path="/blueprint" element={<Blueprint/>}/>
        <Route path="/chapter/:id" element={<ChapterDetail/>}/>
        <Route path="/lesson/:id" element={<LessonDetail/>}/>
        <Route path="/lab" element={<Laboratory/>}/>
        <Route path="/method" element={<Method/>}/>
        <Route path="*" element={<Missing/>}/>
      </Routes></main>
      <footer><span>Distributed Systems Engineering Academy · V0.1</span><span>Simulation ≠ measurement · Evidence before claims</span></footer>
    </div>
    <ScrollTop/>
  </div>;
}
function Heading({ label, title, description }: {label:string;title:string;description?:string}) {
  return <header className="section-heading"><span className="eyebrow">{label}</span><h2>{title}</h2>{description && <p>{description}</p>}</header>;
}
function Home() {
  return <div className="page">
    <section className="hero">
      <div><span className="eyebrow accent">A LIVING ENGINEERING CURRICULUM · V0.1</span><h1>Understand the systems<br/><em>behind the architecture.</em></h1><p>Connect deep explanations, manipulable causal models, and real Java/Spring Boot engineering evidence. Start with business correctness, not fashionable infrastructure.</p><div className="actions"><Link to="/blueprint" className="button primary">Explore Cluster 1.1 ↗</Link><Link to="/lab" className="button secondary">Try the concurrency lab ↗</Link></div><div className="hero-foot"><span className="dot"/> Blueprint complete. Lessons and Java application are not yet implemented.</div></div>
      <div className="hero-flow">
        <div className="flow-top"><span>EXPLAIN THE MECHANISM</span><span>MODEL / 01</span></div>
        <div className="flow-box"><small>01 · BUSINESS INTENT</small><b>Customer requests cancellation</b><span>Command ≠ authoritative fact</span></div>
        <div className="flow-arrow">↓</div>
        <div className="flow-box focused"><small>02 · BUSINESS GUARD</small><b>Is the order still PLACED?</b><span>Check state and version at commit</span></div>
        <div className="flow-arrow">↓</div>
        <div className="flow-branches"><div><small>GUARD PASSES</small><b>OrderCancelled</b></div><div><small>CONFLICT</small><b>No state change</b></div></div>
        <div className="flow-bottom">PREDICT → TRACE → VALIDATE <span>↗</span></div>
      </div>
    </section>
    <div className="stats"><div><strong>19</strong><span>PHASES</span></div><div><strong>93</strong><span>CLUSTERS</span></div><div><strong>04</strong><span>CHAPTERS</span></div><div><strong>20</strong><span>LESSON PLANS</span></div></div>
    <Heading label="HOW THE ACADEMY WORKS" title="Deep learning without the static-document trap" description="Explanations, prediction, simulation and evidence each have a purpose. This application is the foundation for the chapters, not a substitute for studying them."/>
    <div className="feature-grid">
      <Link to="/roadmap" className="feature"><span className="feature-icon">▤</span><span className="eyebrow">01 · DISCOVER</span><h3>Explore the entire roadmap</h3><p>All 19 phases, 93 clusters and source technical requirements available for inspection.</p><b>Open roadmap ↗</b></Link>
      <Link to="/blueprint" className="feature"><span className="feature-icon">◇</span><span className="eyebrow">02 · UNDERSTAND</span><h3>Follow the learning dependencies</h3><p>20 lesson specifications, concept maps, failure inventories and engineering plans.</p><b>Study blueprint ↗</b></Link>
      <Link to="/lab" className="feature"><span className="feature-icon">⟡</span><span className="eyebrow">03 · EXPLORE</span><h3>Make concurrency visible</h3><p>Change input conditions, predict the outcome, reveal every step and examine invariants.</p><b>Open laboratory ↗</b></Link>
    </div>
    <Heading label="CLUSTER 1.1" title="Four chapters in business correctness" description="Each chapter is derived from the roadmap's technical mastery requirements—not an arbitrary fixed page count."/>
    <div className="chapter-grid">{chapters.map((ch,i) => <Link to={'/chapter/' + ch.id} className="chapter-card" key={ch.id}><span className="eyebrow accent">CHAPTER {String(i+1).padStart(2,'0')}</span><h3>{ch.title}</h3><p>{ch.why}</p><small>{ch.lessons.length} planned lessons</small><span className="right">↗</span></Link>)}</div>
    <div className="repo-banner"><div><span className="eyebrow">SEPARATE ENGINEERING TRACK</span><h3>Food Ordering Platform</h3><p>Implementation starts when the next relevant lesson justifies a verified Java/Spring Boot change. Its current commit contains planning documentation only.</p></div><a className="button secondary" href={platformRepo + '/tree/' + platformPlanningSha} target="_blank" rel="noreferrer">Inspect planning baseline ↗</a></div>
  </div>;
}
function Roadmap() {
  const [phaseId, setPhaseId] = useState('I');
  const [query, setQuery] = useState('');
  const [full, setFull] = useState(false);
  const selected = phases.find(p => p.roman === phaseId) ?? phases[0];
  const matches = phases.flatMap(p => p.clusters.filter(c => (c.id + ' ' + c.title + ' ' + p.title).toLowerCase().includes(query.toLowerCase())).map(c => ({...c, phase:p.roman})));
  return <div className="page">
    <div className="page-heading"><span className="eyebrow">AUTHORITATIVE CURRICULUM</span><h1>Master Roadmap <em>V1.0</em></h1><p>Read the full 19-phase, 93-cluster technical mastery boundary. The cluster defines what must be learned and validated—not a fixed number of pages.</p></div>
    <div className="toolbar"><label className="search"><span>⌕</span><span className="sr-only">Search technical clusters</span><input type="search" placeholder="Filter 93 clusters..." value={query} onChange={e=>setQuery(e.target.value)}/></label><button className="button secondary" onClick={() => setFull(!full)}>{full ? 'Hide full master source' : 'Read full master source'} ↗</button><a href={academyRepo + '/blob/main/docs/roadmap/MASTER_ROADMAP_V1.md'} target="_blank" rel="noreferrer" className="button secondary">GitHub ↗</a></div>
    {full && <div className="source"><h3>Complete authoritative Markdown</h3><div className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{roadmapText}</ReactMarkdown></div></div>}
    {query.trim() ? <div className="panel"><h2>{matches.length} matching clusters</h2>{matches.map(c => <Link className="cluster-link" key={c.id} to={'/roadmap/' + c.id}><span className="code">{c.id}</span><span>{c.title}<small>Phase {c.phase}</small></span><span>↗</span></Link>)}</div> : <div className="roadmap-layout">
      <nav className="phase-menu" aria-label="Roadmap phases">{phases.map((p,i) => <button key={p.roman} aria-pressed={phaseId===p.roman} onClick={()=>setPhaseId(p.roman)} className={'phase-choice ' + (phaseId===p.roman?'selected':'')}><span>{String(i+1).padStart(2,'0')}</span><b>{p.title}</b><small>{p.clusters.length}</small></button>)}</nav>
      <div className="panel phase-view"><span className="eyebrow">PHASE {selected.roman} · {selected.clusters.length} CLUSTERS</span><h2>{selected.title}</h2><div className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.intro}</ReactMarkdown></div><h3>Technical clusters</h3>{selected.clusters.map(c => <Link to={'/roadmap/' + c.id} key={c.id} className="cluster-link"><span className="code">{c.id}</span><span>{c.title}</span><span>↗</span></Link>)}</div>
    </div>}
  </div>;
}
function ClusterDetail() {
  const { id } = useParams();
  const phase = phases.find(p => p.clusters.some(c => c.id === id));
  const cluster = phase?.clusters.find(c => c.id === id);
  if (!cluster) return <Missing/>;
  return <article className="reader"><span className="eyebrow">MASTER ROADMAP · PHASE {phase?.roman} · CLUSTER {cluster.id}</span><h1>{cluster.title}</h1><p className="lead">Authoritative scope, not a completed lesson or a runtime verification report.</p>{id==='1.1' && <Link className="button primary" to="/blueprint">See the derived deep-learning blueprint ↗</Link>}<div className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{cluster.markdown}</ReactMarkdown></div><div className="actions"><Link to="/roadmap" className="button secondary">← Return to roadmap</Link></div></article>;
}
type Tab = 'chapters'|'graph'|'project'|'coverage'|'labs';
function Blueprint() {
  const [tab,setTab] = useState<Tab>('chapters');
  const tabs: {id:Tab;name:string}[]=[{id:'chapters',name:'Chapters & lessons'},{id:'graph',name:'Concept graph'},{id:'project',name:'Project evolution'},{id:'coverage',name:'Coverage & mastery'},{id:'labs',name:'Interactive labs'}];
  return <div className="page">
    <div className="page-heading"><span className="eyebrow">CLUSTER 1.1 · COMPLETE BLUEPRINT V0.1</span><h1>Business workflows,<br/><em>state & invariants</em></h1><p>{blueprint.engineeringQuestion} Every lesson is specified in depth; the teaching manuscripts and Java code will be created when the corresponding lessons are executed.</p></div>
    <div className="stats compact"><div><strong>04</strong><span>CHAPTERS</span></div><div><strong>20</strong><span>LESSON PLANS</span></div><div><strong>05</strong><span>LAB BRIEFS</span></div><div><strong>17</strong><span>COVERAGE ITEMS</span></div></div>
    <div role="tablist" aria-label="Blueprint sections" className="tablist">{tabs.map(t=><button key={t.id} role="tab" aria-selected={tab===t.id} className={tab===t.id?'current':''} onClick={()=>setTab(t.id)}>{t.name}</button>)}</div>
    {tab==='chapters' && <div className="stack"><div className="notice"><strong>Blueprint specification ≠ finished lesson</strong> Each planned lesson defines outcomes, prerequisites, causal mechanism, visuals, examples, experiments, diagnosis, engineering changes and Staff-level mastery.</div>{chapters.map((ch,i) => <section className="chapter-group" key={ch.id}><div className="group-head"><span className="eyebrow">CHAPTER {String(i+1).padStart(2,'0')}</span><h2>{ch.title}</h2><p>{ch.why}</p></div>{ch.lessons.map(l => <Link to={'/lesson/'+l.id} key={l.id} className="lesson-link"><span className="code">{l.id}</span><span><b>{l.title}</b><small>{l.question}</small></span><span className="pill">TYPE {l.mode}</span><span>↗</span></Link>)}</section>)}</div>}
    {tab==='graph' && <div className="stack"><Heading label="LEARNING DEPENDENCIES" title="Select a concept to trace its prerequisites" description="This graph encodes conceptual dependencies, not infrastructure or service deployment."/><ConceptMap/><Heading label="REASONING CHAINS" title="Five linked analysis paths"/><div className="stack">{Object.entries(blueprint.graphSets).map(([key,paths]) => <div className="panel" key={key}><h3>{key.replaceAll('_',' ')}</h3><p>{paths.join(' · ')}</p></div>)}</div><Heading label="FORWARD TRANSFER" title="Concepts that later phases build upon"/><div className="feature-grid">{blueprint.forwardDependencies.map(d=><div className="feature" key={d.cluster}><span className="eyebrow">{d.cluster}</span><p>{d.why}</p></div>)}</div></div>}
    {tab==='project' && <div className="stack"><Heading label="REAL ENGINEERING TRACK" title="Changes must be justified" description="A new lesson does not automatically create a backend commit. Type A changes require executed tests and a reproducible checkpoint."/><div className="stack">{blueprint.applicationPlan.map((step,i)=><div className="evolution" key={i}><span>{String(i+1).padStart(2,'0')}</span><div><b>{step.lesson} · TYPE {step.mode}</b><p>{step.change}</p></div></div>)}</div><div className="notice"><strong>Platform is currently planning-only.</strong><a href={platformRepo+'/tree/'+platformPlanningSha} target="_blank" rel="noreferrer">View immutable baseline {platformPlanningSha.slice(0,12)} ↗</a><p>No Java application or executed Maven tests exist yet.</p></div><h3>Deferred mechanisms</h3><div className="tags">{blueprint.deferred.map(d=><span key={d}>{d}</span>)}</div></div>}
    {tab==='coverage' && <div className="stack"><Heading label="AUDITABILITY" title="Source requirements → planned lessons" description="This table is retained in the complete blueprint document. It is a planning map, not a completed evidence report."/><div className="source markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{coverageText}</ReactMarkdown></div><Heading label="CLUSTER EXIT GATE" title="Demonstrable Senior/Staff mastery"/><ol className="mastery">{blueprint.masteryGate.map(m=><li key={m}>{m}</li>)}</ol></div>}
    {tab==='labs' && <div className="stack"><Heading label="INTERACTIVE DESIGN INVENTORY" title="Five mechanisms worth visualizing" description="Only the race explorer is operational in Phase 0. The other entries are design briefs for subsequent full lessons."/><div className="lab-cards">{blueprint.labs.map((lab,i)=><div className="panel" key={lab.id}><div className="lab-head"><span className="eyebrow">{lab.id} · FIRST USED IN {lab.firstSeen}</span><span className="pill">{i===0?'WORKING MODEL':'PLANNED'}</span></div><h3>{lab.title}</h3><p>{lab.model}</p><p><b>Controls:</b> {lab.controls.join(' · ')}</p><p><b>Limitations:</b> {lab.limitations}</p>{i===0&&<Link className="text-link" to="/lab">Use working simulator ↗</Link>}</div>)}</div></div>}
    <div className="source-footer"><a href={academyRepo+'/blob/main/docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md'} target="_blank" rel="noreferrer">Read all 20 detailed specifications in GitHub ↗</a></div>
  </div>;
}
const coverageText = [
  '| Roadmap obligation / failure case | Planned lesson IDs |',
  '|---|---|',
  '| Actors, goals, responsibilities, use cases | 1.1.1, 1.1.2, 1.1.5 |',
  '| Commands, facts/events, identity, authority | 1.1.3, 1.1.4, 1.1.6 |',
  '| State machines, guards, legal decisions | 1.1.6, 1.1.7, 1.1.9 |',
  '| Terminality, reversibility, compensation | 1.1.8, 1.1.9, 1.1.14 |',
  '| Validation, invariants, DB constraints | 1.1.11, 1.1.16, 1.1.17 |',
  '| Concurrency, duplicates, stale decisions | 1.1.12, 1.1.13, 1.1.15 |',
  '| Atomicity and consistency implications | 1.1.16, 1.1.17 |',
  '| Failures and diagnostic evidence | 1.1.14, 1.1.17, 1.1.18 |',
  '| Architecture and overengineering alternatives | 1.1.10, 1.1.19 |',
  '| Communication and transfer | 1.1.18, 1.1.19, 1.1.20 |',
  '| Duplicate payment | 1.1.12, 1.1.14, 1.1.18 |',
  '| Cancellation / acceptance race | 1.1.13, 1.1.15, 1.1.17 |',
  '| Modification after payment | 1.1.9, 1.1.14 |',
  '| Payment after cancellation | 1.1.9, 1.1.14, 1.1.16 |',
  '| Illegal transition | 1.1.7, 1.1.17 |',
  '| Repeated command | 1.1.12, 1.1.17 |',
  '| Stale-state decision | 1.1.13, 1.1.15, 1.1.16 |'
].join('\n');
function ChapterDetail() {
  const {id}=useParams();
  const ch=chapters.find(c=>c.id===id);
  if(!ch)return <Missing/>;
  return <div className="page"><div className="page-heading"><span className="eyebrow">CLUSTER 1.1 · CHAPTER {chapters.indexOf(ch)+1}</span><h1>{ch.title}</h1><p>{ch.why}</p></div><div className="stack">{ch.lessons.map(l=><Link to={'/lesson/'+l.id} key={l.id} className="chapter-card full"><span className="eyebrow">{l.id} · TYPE {l.mode}</span><h3>{l.title}</h3><p>{l.question}</p><small>{l.scope.join('; ')}</small><span className="right">↗</span></Link>)}</div><Link to="/blueprint" className="button secondary">← Complete blueprint</Link></div>;
}
function LessonDetail() {
  const {id}=useParams();
  const lesson=lessons.find(l=>l.id===id);
  return lesson?<LessonReader lesson={lesson}/>:<Missing/>;
}
function Laboratory(){
  return <div className="page"><div className="page-heading"><span className="eyebrow">LABORATORY · 01 OF 05</span><h1>Make a race condition <em>visible.</em></h1><p>Change the business execution, predict the outcome, and inspect a deterministic step-by-step trace. This illustrates concurrency; it does not certify the Java application.</p></div><RaceLab/><div className="notice"><strong>Engineering evidence boundary</strong><p>Lesson 1.1.13 will later compare these outcomes to executed Java concurrency experiments. Until that checkpoint exists, the diagram and timeline are not runtime observations.</p><Link className="text-link" to="/lesson/1.1.13">Read future engineering specification ↗</Link></div></div>;
}
function Method(){
  const names=['Orient','Understand','Explore','Predict','Engineer','Verify','Diagnose','Defend','Retain'];
  const details=['Map the business, prerequisites and causal relationships.','Trace every meaningful state change, assumption, trade-off and failure window.','Manipulate a model and explain why behavior changes.','Commit to an outcome before revealing the state or running an experiment.','Evolve the separate Spring Boot platform when justified by a real engineering force.','Run relevant tests and record reproducible evidence.','Form competing hypotheses and select discriminating tests.','Communicate mechanism, risk and alternatives at Senior/Staff level.','Revisit earlier decisions as later dependencies become clear.'];
  return <div className="page"><div className="page-heading"><span className="eyebrow">THE LEARNING CONTRACT</span><h1>Study the mechanism.<br/><em>Defend the decision.</em></h1><p>Visual interaction and application evolution serve independent learning goals. Neither an attractive diagram nor a green build by itself proves mastery.</p></div><div className="method-rows">{names.map((n,i)=><div key={n}><span>{String(i+1).padStart(2,'0')}</span><h3>{n}</h3><p>{details[i]}</p></div>)}</div><div className="feature-grid"><div className="feature"><h3>Illustrative</h3><p>Pedagogical model with stated assumptions; not proof of real application behavior.</p></div><div className="feature"><h3>Observed</h3><p>Executed test in a specific environment with reproducible input and captured output.</p></div><div className="feature"><h3>Guaranteed</h3><p>Scoped property justified by an enforcement mechanism, not assumed from a single local test.</p></div></div><a className="text-link" href={academyRepo+'/blob/main/docs/contracts/DUAL_REPOSITORY_EXECUTION_CONTRACT_V1.md'} target="_blank" rel="noreferrer">Open repository execution contract ↗</a></div>;
}
function Missing(){return <div className="page page-heading"><span className="eyebrow">404</span><h1>Topic unavailable</h1><p>Return to the roadmap or the Cluster 1.1 blueprint.</p><Link className="button primary" to="/">Academy home ↗</Link></div>;}
export default Shell;
