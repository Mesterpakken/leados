import { getEmployeeById, getMeetingMocks } from '../data';

export default function MoteOpsummering({ employeeId, onGenerateFokusark, onBackToBrief }) {
  const employee = getEmployeeById(employeeId);
  const mocks = getMeetingMocks(employeeId);
  const summary = mocks?.summary;

  return (
    <div className="content summary-page">
      <div className="summary-head">
        <div>
          <span className="kicker">SAMTALEN ER AFKODET</span>
          <h2>Fra samtale til vedvarende indsigt</h2>
          <p>Gennemgå før Lead OS opdaterer {employee?.name?.split(' ')[0] || 'medarbejderens'} billede.</p>
        </div>
        <span className="summary-check">✓</span>
      </div>

      <div className="summary-grid">
        <article className="card">
          <span className="kicker">KORT FORTALT</span>
          <h3>{employee?.name?.split(' ')[0] || 'Medarbejderen'} vil fremad — men har mistet tillid til opfølgningen</h3>
          <p>
            {summary?.aiSummary ||
              'Samtalen bekræfter, at udviklingsambitionen stadig er aktiv. Faldet i motivation handler om manglende opfølgning på aftaler.'}
          </p>
          <div className="source-note">Baseret på transskription · lederens noter · tidligere forløb</div>
        </article>
        <article className="card">
          <span className="kicker">SIGNALER OPDATERET</span>
          {[
            ['Motivation', '5,2 → 6,1'],
            ['Engagement', 'Stiger ved ejerskab'],
            ['Risiko', 'Mellem → Lav'],
            ['Tema', 'Tillid til opfølgning'],
          ].map((x) => (
            <div className="summary-row" key={x[0]}>
              <span>{x[0]}</span>
              <b>{x[1]}</b>
            </div>
          ))}
        </article>
        <article className="card">
          <span className="kicker">AFTALER & LØFTER</span>
          {(summary?.commitments || []).map((c) => (
            <div className="extracted" key={c.text}>
              <i>✓</i>
              <div>
                <small>
                  {c.who} · {c.deadline}
                </small>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </article>
        <article className="card">
          <span className="kicker">LEDERLÆRING</span>
          <h3>Det systemet har lært</h3>
          <p>
            Fremtidige samtalebriefs bør prioritere status på tidligere løfter før nye udviklingsmål. AI-fortolkning — kræver din godkendelse.
          </p>
          <button type="button" className="text-button">
            Redigér formulering
          </button>
        </article>
      </div>

      <div className="summary-actions">
        <button type="button" className="secondary" onClick={onBackToBrief}>
          Tilbage til brief
        </button>
        <button type="button" className="primary" onClick={onGenerateFokusark}>
          Generér Fokusark
        </button>
      </div>
    </div>
  );
}
