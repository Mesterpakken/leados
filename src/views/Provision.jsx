import { useState } from 'react';
import CommercialMetric from '../components/CommercialMetric';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';
import { commercialSales, commissionRulesCopy, demoOrders } from '../data/commercial';
import { commissionFor, commissionTiers, money, nextTierFor } from '../lib/commission';

export default function Provision() {
  const [orders, setOrders] = useState(demoOrders);
  const { toast, notify } = useToast();

  return (
    <div className="los-commercial">
      <div className="content">
        <div className="notice">
          <b>Konfigurerbart provisionsgrundlag — endelig løn afstemmes</b>
          <p>{commissionRulesCopy}</p>
        </div>

        <div className="tier-grid">
          {commissionTiers.map((t, i) => (
            <article className="tier-card" key={t.threshold}>
              <small>{i === 0 ? 'GRUNDTRIN' : `FRA ${money(t.threshold)}`}</small>
              <strong>{t.rate * 100}%</strong>
              <span>af hele den sendte omsætning</span>
            </article>
          ))}
        </div>

        <div className="metric-grid">
          <CommercialMetric label="FORVENTET PROVISION" value="184.250 kr." delta="15 sælgere" note="denne måned" />
          <CommercialMetric label="SENDT OMSÆTNING" value="3.582.000 kr." delta="286 ordrer" note="i grundlaget" />
          <CommercialMetric label="SPECIALSATSAFTALER" value="2" delta="afventer Michael" note="kræver godkendelse" warning />
          <CommercialMetric label="RETURNERINGER" value="−42.800 kr." delta="7 ordrer" note="fratrukket" warning />
        </div>

        <article className="card table-card">
          <div className="card-head">
            <div>
              <span className="kicker">MÅNED · FORELØBIG BEREGNING</span>
              <h3>Godkendelsesoversigt</h3>
            </div>
            <button type="button" className="secondary" onClick={() => notify('Afstemningsrapport klargjort')}>
              Klargør rapport
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sælger</th>
                <th>Sendt omsætning</th>
                <th>Sats</th>
                <th>Estimeret provision</th>
                <th>Til næste trin</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {commercialSales.map((s, i) => {
                const revenue = s.amount + i * 34000;
                const c = commissionFor(revenue);
                const next = nextTierFor(revenue);
                return (
                  <tr key={s.name}>
                    <td>
                      <b>{s.name}</b>
                    </td>
                    <td>{money(revenue)}</td>
                    <td>{c.rate * 100}%</td>
                    <td>{money(Math.round(c.amount))}</td>
                    <td>{next ? money(next.threshold - revenue) : 'Toptrin'}</td>
                    <td>
                      <span className={`pill ${i === 1 ? 'amber' : ''}`}>{i === 1 ? 'Specialsats' : 'Afstemt'}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>

        <article className="card order-ledger">
          <div className="card-head">
            <div>
              <span className="kicker">ORDREGRUNDLAG</span>
              <h3>Sendt, returneret og specialaftalt</h3>
            </div>
            <span className="muted">Fuld ændringslog i driftssystemet</span>
          </div>
          {orders.map((o) => (
            <div className="ledger-row" key={o.id}>
              <span>
                <b>{o.id}</b>
                <small>{o.seller}</small>
              </span>
              <strong className={o.amount < 0 ? 'negative' : ''}>{money(o.amount)}</strong>
              <span className={`pill ${o.status !== 'Sendt' ? 'amber' : ''}`}>{o.status}</span>
              {o.special ? (
                <button type="button" onClick={() => notify(`Specialsats på ${o.special}% sendt til godkendelse`)}>
                  Godkend {o.special}%
                </button>
              ) : (
                <span />
              )}
              <button type="button" className="remove-order" onClick={() => setOrders((v) => v.filter((x) => x.id !== o.id))}>
                Fjern
              </button>
            </div>
          ))}
        </article>
      </div>
      <Toast message={toast} />
    </div>
  );
}
