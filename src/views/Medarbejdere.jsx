import { useMemo, useState } from 'react';
import { employees } from '../data';

const filters = [
  { id: 'Alle', test: () => true },
  { id: 'Opmærksomhed', test: (e) => e.filterTags?.includes('attention') || e.status?.includes('opmærksomhed') },
  { id: 'Topperformere', test: (e) => e.performance >= 100 },
  { id: 'Forsinket 1:1', test: (e) => (e.lastOneOnOneDays || 0) > 20 },
];

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Medarbejdere({ onNavigateToProfile, onNavigateToMeeting }) {
  const [filter, setFilter] = useState('Alle');

  const list = useMemo(() => {
    const rule = filters.find((f) => f.id === filter)?.test || (() => true);
    return employees.filter(rule);
  }, [filter]);

  return (
    <div className="content people-page">
      <div className="people-intro">
        <div>
          <span className="kicker">DIT MENNESKELIGE CRM</span>
          <h2>Forstå hele mennesket — over tid</h2>
          <p>Én sammenhængende hukommelse på tværs af samtaler, noter, resultater, løfter og daglige signaler.</p>
        </div>
        <button type="button" className="primary">
          + Tilføj medarbejder
        </button>
      </div>

      <div className="toolbar">
        <div className="tabs">
          {filters.map((f) => (
            <button key={f.id} type="button" className={filter === f.id ? 'active' : ''} onClick={() => setFilter(f.id)}>
              {f.id}
            </button>
          ))}
        </div>
        <span className="muted">{list.length} medarbejdere</span>
      </div>

      <div className="people-cards">
        {list.map((p) => {
          const tone = p.filterTags?.includes('attention') || p.filterTags?.includes('risk') ? 'attention' : p.performance >= 100 ? 'growth' : 'neutral';
          return (
            <button key={p.id} type="button" className="person-insight-card" onClick={() => onNavigateToProfile(p.id)}>
              <div className="person-top">
                <span className="large-avatar">{initials(p.name)}</span>
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.role}</p>
                </div>
                <span className={`signal-tag ${tone}`}>{p.attentionSignal || p.signal || p.status}</span>
              </div>
              <div className="person-signals">
                <div>
                  <small>Motivation</small>
                  <b>{String(p.motivation).replace('.', ',')}</b>
                </div>
                <div>
                  <small>Performance</small>
                  <b>{p.performance}%</b>
                </div>
                <div>
                  <small>Seneste 1:1</small>
                  <b>{p.lastOneOnOneDays ? `${p.lastOneOnOneDays} dage` : p.lastOneOnOne}</b>
                </div>
                <div>
                  <small>Åbne løfter</small>
                  <b>{p.openPromises ?? p.openCommitments?.length ?? 0}</b>
                </div>
              </div>
              <div className="person-action">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToMeeting(p.id);
                  }}
                >
                  Forbered 1:1
                </span>
                <b>›</b>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
