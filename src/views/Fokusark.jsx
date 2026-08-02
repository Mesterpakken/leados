import { useState } from 'react';
import { getEmployeeById, getMeetingMocks } from '../data';

export default function Fokusark({ employeeId, onBack }) {
  const employee = getEmployeeById(employeeId);
  const fokusark = getMeetingMocks(employeeId)?.fokusark;
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState(null);

  if (!employee || !fokusark) {
    return (
      <div className="content">
        <p className="muted">Fokusark er ikke tilgængeligt for denne medarbejder.</p>
        {onBack && (
          <button type="button" className="secondary" style={{ marginTop: 12 }} onClick={onBack}>
            Tilbage
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="content" style={{ maxWidth: 720 }}>
      {toast && <div className="toast">{toast}</div>}

      <div className="summary-head">
        <div>
          <span className="kicker">FOKUSARK · {fokusark.meetingType?.toUpperCase()}</span>
          <h2>{employee.name}</h2>
          <p>
            {fokusark.meetingDate} · udarbejdet af {fokusark.preparedBy}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="secondary" onClick={onBack}>
            Tilbage
          </button>
          <button type="button" className="secondary" onClick={() => setEditing((v) => !v)}>
            {editing ? 'Færdig' : 'Redigér'}
          </button>
          <button
            type="button"
            className="primary"
            onClick={() => {
              setToast(`Fokusark sendt til ${employee.name}`);
              window.setTimeout(() => setToast(null), 2200);
            }}
          >
            Send til medarbejder
          </button>
        </div>
      </div>

      <article className="card" style={{ marginBottom: 14 }}>
        <span className="kicker">KORT OPSUMMERING</span>
        <p
          contentEditable={editing}
          suppressContentEditableWarning
          style={{ fontFamily: 'Georgia, serif', fontSize: 15, lineHeight: 1.55 }}
        >
          {fokusark.kortOpsummering}
        </p>
      </article>

      <article className="card" style={{ marginBottom: 14 }}>
        <span className="kicker">DET GØR DU GODT</span>
        <ul style={{ margin: '10px 0 0', paddingLeft: 18 }}>
          {fokusark.strengths.map((s) => (
            <li key={s} style={{ marginBottom: 6, fontSize: 13 }}>
              {s}
            </li>
          ))}
        </ul>
      </article>

      {fokusark.fokuspunkter.map((f, i) => (
        <article className="card" key={f.title} style={{ marginBottom: 14 }}>
          <span className="kicker">FOKUSPUNKT {i + 1}</span>
          <h3 style={{ marginTop: 6 }}>{f.title}</h3>
          <p style={{ fontSize: 12, color: '#555e57' }}>{f.meaning}</p>
          <div className="notice" style={{ marginTop: 10, marginBottom: 0 }}>
            <b>Øvelse</b>
            <p>{f.exercise}</p>
          </div>
        </article>
      ))}

      <article className="card">
        <span className="kicker">AFTALER · NÆSTE OPFØLGNING</span>
        {fokusark.aftaler.map((a) => (
          <div className="summary-row" key={a}>
            <span>{a}</span>
          </div>
        ))}
        <p style={{ fontSize: 12, marginTop: 12 }}>
          <b>{fokusark.naesteOpfoelgning.date}</b> — {fokusark.naesteOpfoelgning.focus}
        </p>
      </article>
    </div>
  );
}
