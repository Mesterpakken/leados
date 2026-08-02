import Toast from '../components/Toast';
import useToast from '../hooks/useToast';
import { decisions } from '../data/commercial';

export default function Beslutninger() {
  const { toast, notify } = useToast();

  return (
    <div className="los-commercial">
      <div className="content">
        <div className="decision-grid">
          <article className="card">
            <span className="kicker">AFVENTER MICHAEL</span>
            <h2>4 beslutninger blokerer driften</h2>
            <p>Gør ejerafhængighed synlig, og flyt det der kan flyttes med en regel.</p>
            <button type="button" className="primary" onClick={() => notify('Ny beslutning kan nu registreres')}>
              + Registrér beslutning
            </button>
          </article>
          {decisions.map((d, i) => (
            <article className="card decision" key={d[0]}>
              <span className="number">0{i + 1}</span>
              <div>
                <small>{d[1]}</small>
                <h3>{d[0]}</h3>
                <p>
                  Nuværende ejer: <b>{d[2]}</b>
                </p>
              </div>
              <span className={`risk ${d[3]}`}>{d[3]}</span>
              <button type="button">Se regel ›</button>
            </article>
          ))}
        </div>
      </div>
      <Toast message={toast} />
    </div>
  );
}
