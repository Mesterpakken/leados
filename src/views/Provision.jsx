import { useState } from 'react';
import CommercialMetric from '../components/CommercialMetric';
import { commercialSales, commissionRulesCopy, demoOrders } from '../data/commercial';
import { commissionFor, commissionTiers, money, nextTierFor } from '../lib/commission';

export default function Provision({ notify }) {
  const [orders, setOrders] = useState(demoOrders);

  const qualifying = commercialSales.reduce((sum, s) => sum + s.amount, 0) - 42800;

  return (
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
        <CommercialMetric label="PROVISIONSGIVENDE OMSÆTNING" value={money(qualifying)} delta="efter retur/annullering" note="sendt fra lager" />
        <CommercialMetric label="FORVENTET PROVISION" value="184.250 kr." delta="foreløbigt løngrundlag" note="denne måned" />
        <CommercialMetric label="SPECIALSATSER" value="2" delta="afventer godkendelse" note="kræver leder" warning />
        <CommercialMetric label="RETURNERINGER / ANNULLERINGER" value="−42.800 kr." delta="8 ordrer" note="fratrukket" warning />
      </div>

      <article className="card table-card">
        <div className="card-head">
          <div>
            <span className="kicker">FORELØBIGT LØNGRUNDLAG</span>
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
              <th>Afsendte ordrer · omsætning</th>
              <th>Sats</th>
              <th>Estimeret provision</th>
              <th>Til næste trin</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {commercialSales.map((s, i) => {
              const c = commissionFor(s.amount);
              const next = nextTierFor(s.amount);
              return (
                <tr key={s.name}>
                  <td>
                    <b>{s.name}</b>
                  </td>
                  <td>{money(s.amount)}</td>
                  <td>{c.rate * 100}%</td>
                  <td>{money(Math.round(c.amount))}</td>
                  <td>{next ? money(next.threshold - s.amount) : 'Toptrin'}</td>
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
            <h3>Sendt, returneret, annulleret og specialaftalt</h3>
          </div>
          <span className="muted">Kun sendte ordrer tæller · ændringer sletter ikke historik</span>
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
  );
}
