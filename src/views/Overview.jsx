import {
  compassAngles,
  compassSignals,
  commercialSales,
  leadershipSignals,
} from '../data/commercial';

function currentFocusKey() {
  return Object.entries(compassSignals).sort((a, b) => b[1].score - a[1].score)[0][0];
}

export default function Overview({ onOpenProfile, onNavigate, onOpenBrief }) {
  const currentFocus = currentFocusKey();
  const angle = compassAngles[currentFocus] ?? -55;

  const handleSignal = (signal) => {
    if (signal.sourceType === 'KALENDER') onNavigate('calendar');
    else if (signal.sourceType === 'LEDERNOTE' || signal.id.includes('provision')) onNavigate('compensation');
    else if (signal.employeeId) onOpenProfile(signal.employeeId);
    else onNavigate('team');
  };

  return (
    <div className="content">
      <section className="intro-row">
        <div>
          <h2>
            Dit kompas peger mod <em>{currentFocus.toLowerCase()}</em>
          </h2>
          <p>
            Se mennesket bag tallene. Lead OS husker samtaler, signaler, løfter og udvikling — og viser dig, hvor din ledelse gør størst forskel.
          </p>
        </div>
        <span className="health">
          <i /> {leadershipSignals.length} ledelsessignaler kræver opmærksomhed
        </span>
      </section>

      <div className="overview-grid">
        <article className="card compass-card">
          <div className="card-head">
            <div>
              <span className="kicker">LEDERKOMPAS</span>
              <h3>Hvor skal du lægge dit fokus?</h3>
            </div>
            <span className="live">LIVE</span>
          </div>
          <div className="compass-wrap">
            <div className="compass">
              <span className="north">COACH</span>
              <span className="east">DRIVE</span>
              <span className="south">DECIDE</span>
              <span className="west">OPERATE</span>
              <div className="rings" />
              <div className="needle" style={{ transform: `rotate(${angle}deg)` }}>
                <i />
              </div>
              <b>LOS</b>
            </div>
            <div className="focus-bars">
              {Object.entries(compassSignals).map(([name, data]) => (
                <div key={name}>
                  <span>
                    {name}
                    <b>{data.score}</b>
                  </span>
                  <i>
                    <u style={{ width: `${data.score}%` }} />
                  </i>
                </div>
              ))}
              <p>
                <b>Hvorfor {currentFocus}?</b>
                <br />
                {compassSignals[currentFocus].reasons.slice(0, 2).join(' · ')}
              </p>
            </div>
          </div>
        </article>

        <article className="card attention-card">
          <div className="card-head">
            <div>
              <span className="kicker">LEDELSESSIGNALER</span>
              <h3>Konkrete, kildebaserede signaler</h3>
            </div>
            <b>{leadershipSignals.length}</b>
          </div>
          <div className="signal-list">
            {leadershipSignals.slice(0, 4).map((signal) => (
              <button key={signal.id} type="button" className="signal-item" onClick={() => handleSignal(signal)}>
                <div>
                  <small>
                    {signal.person} · {signal.sourceType}
                  </small>
                  <strong>{signal.title}</strong>
                  <p>{signal.basis}</p>
                  <div className="signal-meta">
                    {signal.when}
                    {signal.aiInterpreted ? (
                      <>
                        {' · '}
                        <em className="ai-mark">AI-signal — ikke objektivt faktum</em>
                      </>
                    ) : null}
                  </div>
                </div>
                <span className="text-button">{signal.sourceLabel} ›</span>
              </button>
            ))}
          </div>
        </article>
      </div>

      <div className="metric-grid">
        <article className="metric">
          <span>OMSÆTNING · I DAG</span>
          <strong>247.800 kr.</strong>
          <p>
            +4,8% <small>mod dagsmål</small>
          </p>
        </article>
        <article className="metric">
          <span>OMSÆTNING · UGE</span>
          <strong>511.800 kr.</strong>
          <p>
            +18,4% <small>mod sidste uge</small>
          </p>
        </article>
        <article className="metric">
          <span>GENNEMSNITSORDRE</span>
          <strong>9.145 kr.</strong>
          <p>
            +1.260 <small>over 30 dage</small>
          </p>
        </article>
        <article className="metric">
          <span>1:1 STATUS</span>
          <strong>12 / 16</strong>
          <p className="warning">
            4 mangler <small>denne cyklus</small>
          </p>
        </article>
      </div>

      <div className="split-grid">
        <article className="card">
          <div className="card-head">
            <div>
              <span className="kicker">TEAMETS PULS</span>
              <h3>Hvem kræver din opmærksomhed?</h3>
            </div>
            <button type="button" className="text-button" onClick={() => onNavigate('team')}>
              Se alle ›
            </button>
          </div>
          {commercialSales.slice(0, 4).map((s, i) => (
            <div className="people-row" key={s.name}>
              <span className="person-dot">{s.name[0]}</span>
              <div>
                <b>{s.name}</b>
                <small>{i === 3 ? 'Faldende aktivitet' : s.status}</small>
              </div>
              <div className="mini-progress">
                <i style={{ width: `${Math.min(100, (s.amount / s.target) * 100)}%` }} />
              </div>
              <strong>{Math.round((s.amount / s.target) * 100)}%</strong>
            </div>
          ))}
        </article>
        <article className="card">
          <div className="card-head">
            <div>
              <span className="kicker">KOMMENDE</span>
              <h3>Næste syv dage</h3>
            </div>
            <button type="button" className="text-button" onClick={() => onNavigate('calendar')}>
              Åbn rytme ›
            </button>
          </div>
          <div className="timeline">
            {[
              ['MAN 3', '09:30', '1:1 med Camilla', true],
              ['TIR 4', '13:00', 'Storordre-review', false],
              ['ONS 5', '10:00', 'Ledelsesmøde med Kevin', false],
              ['FRE 7', '14:30', 'Ugestatus · salg', false],
            ].map((x) => (
              <div key={x[2]}>
                <span>{x[0]}</span>
                <i />
                <small>{x[1]}</small>
                <b>{x[2]}</b>
                {x[3] ? <em>VIGTIG</em> : null}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="secondary"
            style={{ marginTop: 14 }}
            onClick={() => onOpenBrief('camilla-holm')}
          >
            Forbered 1:1 med Camilla
          </button>
        </article>
      </div>
    </div>
  );
}
