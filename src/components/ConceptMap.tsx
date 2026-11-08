import { useState } from 'react';
import { blueprint } from '../data/roadmap';

export default function ConceptMap() {
  const [active, setActive] = useState(0);
  const nodes = blueprint.concepts;
  const selected = nodes[active];
  return (
    <section className="concept-explorer" aria-label="Concept dependencies">
      <div className="concept-grid">
        {nodes.map((node, index) =>
          <button key={node.name} type="button" className={'concept-chip ' + (index === active ? 'active' : '')} aria-pressed={index === active} onClick={() => setActive(index)}>
            <span>{String(index + 1).padStart(2,'0')}</span>{node.name}
          </button>
        )}
      </div>
      <div className="concept-detail">
        <span className="eyebrow">Selected mechanism</span>
        <h3>{selected.name}</h3>
        <div className="concept-links">
          <div><strong>Requires</strong>{selected.dependsOn.length ? selected.dependsOn.map(name => <span className="relation" key={name}>{name}</span>) : <span className="muted">Foundational</span>}</div>
          <div><strong>Enables</strong>{selected.enables.map(name => <span className="relation" key={name}>{name}</span>)}</div>
        </div>
        <p className="small muted">Select a concept to inspect its dependency relationships. These are conceptual learning dependencies, not deployed service connections.</p>
      </div>
    </section>
  );
}
