import { getEmployeeById } from '../data';

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Medarbejderprofil({ employeeId, onBack, onPrepareMeeting }) {
  const person = getEmployeeById(employeeId);

  if (!person) {
    return (
      <div className="content">
        <p className="muted">Medarbejder ikke fundet.</p>
        <button type="button" className="secondary" onClick={onBack}>
          Tilbage
        </button>
      </div>
    );
  }

  const journey = person.journey || [];
  const reading = person.reading || person.aiSummary;
  const commitments = person.openCommitments || [];
  const development = person.developmentGoals || [];
  const how = person.howToLead || {};

  return (
    <div className="content profile-page">
      <button type="button" className="back-button" onClick={onBack}>
        ← Alle medarbejdere
      </button>

      <section className="profile-hero">
        <div className="profile-identity">
          <span className="profile-avatar">{initials(person.name)}</span>
          <div>
            <span className="kicker">MEDARBEJDERBILLEDE · {journey.length || 18} KILDER</span>
            <h2>{person.name}</h2>
            <p>
              {person.role} · {person.team}
              {person.tenure ? ` · ${person.tenure}` : ''}
            </p>
          </div>
        </div>
        <div className="profile-actions">
          <button type="button" className="secondary">
            + Note
          </button>
          <button type="button" className="secondary">
            + Løfte
          </button>
          <button type="button" className="primary" onClick={() => onPrepareMeeting(person.id)}>
            Forbered 1:1
          </button>
        </div>
      </section>

      <section className="reading card">
        <div>
          <span className="kicker">LEAD OS · LÆSNING</span>
          <h3>Det vigtigste at forstå lige nu</h3>
          <p>{reading}</p>
          <small>Syntetiseret fra 1:1, check-ins, noter, løfter og salgsdata · AI-fortolkning, ikke objektivt faktum</small>
        </div>
        <aside>
          <span className="signal-tag attention">{person.attentionSignal || person.status}</span>
          <dl>
            {(person.signals || []).map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  {s.value} {s.sub ? <small>{s.sub}</small> : null}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <div className="profile-grid">
        <section className="card">
          <div className="card-head">
            <div>
              <span className="kicker">FORLØBET</span>
              <h3>En levende hukommelse</h3>
            </div>
            <span className="muted">Alle kilder</span>
          </div>
          <div className="journey">
            {journey.slice(0, 8).map((item, i) => (
              <article key={`${item.date}-${i}`}>
                <i className={item.status?.toLowerCase().includes('forsink') || item.status?.includes('Løfte') ? 'urgent' : ''} />
                <time>{item.date}</time>
                <div>
                  <small>
                    {item.type}
                    {item.fromEmployee ? ' · Medarbejder' : ''}
                    {item.status ? ` · ${item.status}` : ''}
                  </small>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="card human-guide">
          <span className="kicker">SÅDAN GÅR DU TIL {person.name.split(' ')[0].toUpperCase()}</span>
          <h3>Ledelsesmanualen, der bliver klogere</h3>
          <div className="guide-block positive">
            <b>Det giver energi</b>
            <p>{(how.energizes || []).slice(0, 2).join(' · ') || 'Konkret ansvar og synlig opfølgning.'}</p>
          </div>
          <div className="guide-block negative">
            <b>Det dræner</b>
            <p>{(how.drains || []).slice(0, 2).join(' · ') || 'Uafsluttede samtaler og uklare løfter.'}</p>
          </div>
          <div className="guide-block">
            <b>Feedback</b>
            <p>{how.feedback || 'Vær specifik og kort. Aftal ét næste skridt.'}</p>
          </div>
          <small>Baseret på observeret adfærd — ikke en fast persontype</small>
        </section>
      </div>

      <div className="profile-grid lower">
        <section className="card">
          <span className="kicker">ÅBNE LØFTER</span>
          <h3>Det I har lovet hinanden</h3>
          {commitments.map((c) => (
            <div className="promise" key={c.text}>
              <span>{c.who}</span>
              <b>{c.text}</b>
              <em>{c.status === 'forsinket' ? `${c.daysOverdue || ''} dage forsinket`.trim() : c.due}</em>
            </div>
          ))}
        </section>
        <section className="card">
          <span className="kicker">UDVIKLING</span>
          <h3>Fra samtale til synlig fremdrift</h3>
          {development.map((d, i) => {
            const progress = d.progress ?? [68, 42, 20][i] ?? 30;
            return (
              <div className="development" key={d.goal || d.title}>
                <span>
                  <b>{d.goal || d.title}</b>
                  <small>{d.nextStep || d.target || ''}</small>
                </span>
                <div className="progress">
                  <i style={{ width: `${progress}%` }} />
                </div>
                <em>{progress}%</em>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
