import { employees } from '../data';

export default function Samtaler({ onOpenBrief }) {
  const upcoming = employees
    .filter((e) => e.meetingBrief || e.id === 'camilla-holm')
    .slice(0, 6);

  return (
    <div className="content">
      <div className="people-intro">
        <div>
          <span className="kicker">SAMTALECENTER</span>
          <h2>Forberedelse, optagelse og hukommelse</h2>
          <p>Start med den samtale der betyder mest. Lead OS har allerede samlet konteksten.</p>
        </div>
        <button type="button" className="primary" onClick={() => onOpenBrief('camilla-holm')}>
          Forbered 1:1 · Camilla
        </button>
      </div>

      <div className="team-grid">
        {upcoming.map((e) => (
          <article className="card person-card" key={e.id}>
            <span className="large-avatar">
              {e.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </span>
            <div>
              <h3>{e.name}</h3>
              <p>{e.role}</p>
            </div>
            <dl>
              <div>
                <dt>Signal</dt>
                <dd>{e.attentionSignal || e.signal || '—'}</dd>
              </div>
              <div>
                <dt>Seneste 1:1</dt>
                <dd>{e.lastOneOnOne}</dd>
              </div>
            </dl>
            <button type="button" className="secondary" onClick={() => onOpenBrief(e.id)}>
              Forbered 1:1
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
