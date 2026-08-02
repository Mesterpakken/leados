import { useState } from 'react';
import CommercialMetric from '../components/CommercialMetric';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';
import { commercialSales } from '../data/commercial';
import { money, nextTierFor } from '../lib/commission';

const metricSets = {
  Nysalg: [
    ['NYE KUNDER · I DAG', '7', '2 under dagsmål', ''],
    ['NYE KUNDER · MÅNED', '84', '+11% mod juli', ''],
    ['GNS. FØRSTE ORDRE', '7.840 kr.', '−640 kr. denne uge', 'warn'],
    ['KONVERTERING', '18,6%', '+2,1 procentpoint', ''],
  ],
  Gensalg: [
    ['OMSÆTNING · I DAG', '184.600 kr.', '+8% mod dagsmål', ''],
    ['OMSÆTNING · MÅNED', '2.948.400 kr.', '62% af månedsmål', ''],
    ['GNS. ORDRE', '9.420 kr.', '−8% mod sidste uge', 'warn'],
    ['STORORDRE-PIPELINE', '412.000 kr.', '6 aktive muligheder', ''],
  ],
  Samlet: [
    ['OMSÆTNING · I DAG', '247.800 kr.', '+4,8% mod dagsmål', ''],
    ['OMSÆTNING · MÅNED', '3.582.000 kr.', '64% af månedsmål', ''],
    ['NYSALG · GNS. ORDRE', '7.840 kr.', '7 nye kunder i dag', ''],
    ['GENSALG · GNS. ORDRE', '9.420 kr.', '−8% mod sidste uge', 'warn'],
  ],
};

const insights = {
  Nysalg: {
    title: 'Nye kunder kommer ind — men for billigt',
    copy: 'Aktiviteten er tilstrækkelig. Fokus bør ligge på behovsafdækning og større første ordrer — ikke flere opkald.',
  },
  Gensalg: {
    title: 'Tempoet holder, ordrestørrelsen falder',
    copy: 'Tre sælgere står for hovedparten af faldet i gennemsnitsordre. Storordre-reviewet bør prioriteres før mere generel træning.',
  },
  Samlet: {
    title: 'Dagen er på mål, men kvaliteten er ujævn',
    copy: 'Nysalg mangler to kunder, mens gensalg ligger over dagsmålet. Kompasset vægter derfor Drive som sekundær retning.',
  },
};

export default function Salg({ onOpenTv }) {
  const [view, setView] = useState('Samlet');
  const { toast, notify } = useToast();
  const metrics = metricSets[view];
  const insight = insights[view];

  return (
    <div className="los-commercial">
      <div className="content">
        <div className="toolbar">
          <div className="tabs">
            {['Samlet', 'Nysalg', 'Gensalg'].map((x) => (
              <button key={x} type="button" className={view === x ? 'active' : ''} onClick={() => setView(x)}>
                {x}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              notify('TV-tavlen er opdateret');
              onOpenTv?.();
            }}
          >
            Opdatér TV-tavle
          </button>
        </div>

        <div className="metric-grid">
          {metrics.map((m) => (
            <CommercialMetric key={m[0]} label={m[0]} value={m[1]} delta={m[2]} note="" warning={m[3] === 'warn'} />
          ))}
        </div>

        <div className="sales-split">
          <article className="card">
            <div className="card-head">
              <div>
                <span className="kicker">LEDERENS LÆSNING</span>
                <h3>{insight.title}</h3>
              </div>
              <span className="live">LIVE</span>
            </div>
            <p className="insight-copy">{insight.copy}</p>
          </article>
          <article className="card">
            <span className="kicker">AFDELINGSTEMPO</span>
            <div className="dept-row">
              <span>
                <b>Nysalg</b>
                <small>7 / 9 nye kunder</small>
              </span>
              <div className="progress">
                <i style={{ width: '78%' }} />
              </div>
              <em>78%</em>
            </div>
            <div className="dept-row">
              <span>
                <b>Gensalg</b>
                <small>184.600 / 171.000 kr.</small>
              </span>
              <div className="progress">
                <i style={{ width: '100%' }} />
              </div>
              <em>108%</em>
            </div>
          </article>
        </div>

        <article className="card table-card">
          <div className="card-head">
            <div>
              <span className="kicker">PERFORMANCE · {view.toUpperCase()}</span>
              <h3>Det lederen skal reagere på</h3>
            </div>
            <span className="muted">Dagens tal · sælgerregistreret · ledergodkendt</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sælger</th>
                <th>Afdeling</th>
                <th>I dag</th>
                <th>Måned</th>
                <th>Gns. ordre</th>
                <th>Næste provisionstrin</th>
              </tr>
            </thead>
            <tbody>
              {commercialSales.map((s, i) => {
                const month = s.amount + i * 28000;
                const next = nextTierFor(month);
                return (
                  <tr key={s.name}>
                    <td>
                      <span className="person-dot">{s.name[0]}</span>
                      <b>{s.name}</b>
                    </td>
                    <td>{s.dept}</td>
                    <td>{money(12400 + i * 5900)}</td>
                    <td>{money(month)}</td>
                    <td>{money(Math.round((s.amount + i * 8000) / (s.orders + 5)))}</td>
                    <td>{next ? money(next.threshold - month) : 'Toptrin nået'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
      </div>
      <Toast message={toast} />
    </div>
  );
}
