import { getEmployeeById } from '../data';

export default function Samtalebrief({ employeeId, onBack, onBackToCockpit, onStartMeeting }) {
  const employee = getEmployeeById(employeeId);

  if (!employee?.meetingBrief) {
    return (
      <div className="content">
        <button type="button" className="back-button" onClick={onBack}>
          ← Tilbage
        </button>
        <p className="muted">Ingen samtalebrief tilgængelig for denne medarbejder endnu.</p>
        <button type="button" className="primary" style={{ marginTop: 12 }} onClick={() => onStartMeeting(employeeId || 'camilla-holm')}>
          Start demo med Camilla-flow
        </button>
      </div>
    );
  }

  const brief = employee.meetingBrief;
  const initials = employee.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="content">
      <button type="button" className="back-button" onClick={onBack}>
        ← Tilbage
      </button>

      <div className="meeting-context">
        <span className="large-avatar">{initials}</span>
        <div>
          <span className="kicker">AI-FORBEREDELSE · 18 KILDER</span>
          <h2>1:1 med {employee.name}</h2>
          <p>
            {brief.duration || '25 minutter'} · {brief.tone || 'direkte, støttende og konkret'}
          </p>
        </div>
        <span className="signal-tag attention">{employee.signal}</span>
      </div>

      <div className="meeting-layout">
        <article className="card agenda">
          <span className="kicker">FORESLÅET DAGSORDEN</span>
          <h3>Det vigtigste at få talt om</h3>
          {(brief.agenda || []).map((x, i) => (
            <div className="agenda-item" key={x}>
              <span>0{i + 1}</span>
              <b>{x}</b>
              <i>⠿</i>
            </div>
          ))}
          <button type="button" className="primary wide" onClick={() => onStartMeeting(employee.id)}>
            ● Start og optag møde
          </button>
          <button type="button" className="text-button" style={{ marginTop: 10 }} onClick={onBackToCockpit}>
            Tilbage til overblik
          </button>
        </article>

        <article className="card question-card">
          <span className="kicker">FORESLÅEDE SPØRGSMÅL</span>
          <h3>Åbn med nysgerrighed</h3>
          {(brief.questions || []).map((q, i) => (
            <div className="question" key={q}>
              <span>0{i + 1}</span>
              <p>{q}</p>
            </div>
          ))}
          <div className="meeting-promises">
            <b>Løfter at gennemgå</b>
            {(employee.openCommitments || []).slice(0, 3).map((c) => (
              <p key={c.text}>
                {c.who}: {c.text} <em>{c.status}</em>
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
