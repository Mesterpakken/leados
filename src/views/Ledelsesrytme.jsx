import { leadershipRhythmToday } from '../data/commercial';
import { overdueOneOnOnes, quarterlyCycle } from '../data';

export default function Ledelsesrytme({ onNavigateToBrief }) {
  return (
    <div className="content">
      <div className="people-intro">
        <div>
          <span className="kicker">LEDERRYTME · AUGUST</span>
          <h2>Kalenderen viser dit ledelsesarbejde</h2>
          <p>Ikke endnu en mødekalender — men samtaler, løfter, reviews og opfølgninger, der ellers forsvinder i driften.</p>
        </div>
        <span className="signal-tag attention">4 handlinger kræver opmærksomhed</span>
      </div>

      <div className="calendar-grid">
        <article className="card">
          <span className="kicker">I DAG · LEDERENS DAG</span>
          {leadershipRhythmToday.map((x) => (
            <div className="calendar-event" key={x[1]}>
              <time>{x[0]}</time>
              <div>
                <b>{x[1]}</b>
                <small>{x[2]}</small>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (x[3]) onNavigateToBrief?.(x[3]);
                }}
              >
                Åbn ›
              </button>
            </div>
          ))}
        </article>
        <article className="card">
          <span className="kicker">RYTMENS SUNDHED</span>
          <h3>Det er ved at skride</h3>
          <div className="rhythm-stat">
            <span>Kvartalssamtaler</span>
            <b>
              {quarterlyCycle.completed} / 12
            </b>
            <small>{quarterlyCycle.paceNote}</small>
          </div>
          <div className="rhythm-stat">
            <span>1:1 denne cyklus</span>
            <b>12 / 16</b>
            <small>Rasmus er 31 dage forsinket</small>
          </div>
          <div className="rhythm-stat">
            <span>Åbne lederløfter</span>
            <b>8</b>
            <small>2 er forfaldne</small>
          </div>
        </article>
      </div>

      <article className="card" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div>
            <span className="kicker">FORSINKEDE 1:1&apos;ER</span>
            <h3>Hold rytmen — ikke skyld</h3>
          </div>
        </div>
        {overdueOneOnOnes.map((emp) => (
          <div className="calendar-event" key={emp.id}>
            <time>{emp.days}d</time>
            <div>
              <b>{emp.name}</b>
              <small>{emp.signal}</small>
            </div>
            <button type="button" onClick={() => onNavigateToBrief?.(emp.id)}>
              {emp.action} ›
            </button>
          </div>
        ))}
      </article>
    </div>
  );
}
