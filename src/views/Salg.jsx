import { useMemo, useState } from 'react';
import CommercialMetric from '../components/CommercialMetric';
import { commercialSales } from '../data/commercial';
import { money, nextTierFor } from '../lib/commission';
import useSalesOrders from '../hooks/useSalesOrders';
import {
  PENDING_APPROVAL,
  approveSalesOrder,
  markSalesOrderReturned,
  markSalesOrderSent,
  returnSalesOrder,
  statusPillClass,
} from '../lib/salesOrders';

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

export default function Salg({ notify, onOpenTv }) {
  const [view, setView] = useState('Samlet');
  const orders = useSalesOrders();
  const [activeId, setActiveId] = useState(null);
  const [leaderNote, setLeaderNote] = useState('');

  const metrics = metricSets[view];
  const insight = insights[view];
  const board = commercialSales;

  const pending = useMemo(
    () => orders.filter((o) => o.status === PENDING_APPROVAL),
    [orders],
  );
  const warehouseReady = useMemo(
    () => orders.filter((o) => o.status === 'Klar til lager' || o.status === 'Afventer afsendelse'),
    [orders],
  );

  const active = orders.find((o) => o.id === activeId) || null;

  const openOrder = (id) => {
    setActiveId(id);
    setLeaderNote('');
  };

  const companyName = (o) => (typeof o.customer === 'string' ? o.customer : o.customer?.company) || '—';
  const salesTypeOf = (o) =>
    (typeof o.customer === 'object' && o.customer?.salesType) || 'Gensalg';

  return (
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

      <article className="card" style={{ marginBottom: 16 }}>
        <div className="card-head">
          <div>
            <span className="kicker">ORDRER TIL GODKENDELSE</span>
            <h3>{pending.length ? `${pending.length} afventer Michael` : 'Ingen ordrer i kø'}</h3>
          </div>
          <span className="muted">Sælgerregistreret · kræver ledergodkendelse før TV og lager</span>
        </div>

        {pending.length === 0 && (
          <p className="muted" style={{ fontSize: 12, margin: '8px 0 0' }}>
            Når en sælger sender en ordre, lander den her.
          </p>
        )}

        <div className="approval-list">
          {pending.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`approval-row ${activeId === o.id ? 'active' : ''}`}
              onClick={() => openOrder(o.id)}
            >
              <div>
                <b>{o.id}</b>
                <p>
                  {o.seller} · {companyName(o)} · {salesTypeOf(o)}
                </p>
              </div>
              <div className="approval-row-meta">
                <strong>{money(o.amount)}</strong>
                <span>{o.registeredAt}</span>
                <span className={`pill ${statusPillClass(o.status)}`}>{o.status}</span>
              </div>
            </button>
          ))}
        </div>

        {active && active.status === PENDING_APPROVAL && (
          <div className="approval-detail">
            <span className="kicker">ORDREDETALJE · {active.id}</span>
            <div className="reg-preview-grid" style={{ marginTop: 10 }}>
              <div>
                <b>{companyName(active)}</b>
                <p>
                  {active.seller} · {salesTypeOf(active)} · {money(active.amount)}
                </p>
                {active.customer?.cvr && <p>CVR {active.customer.cvr}</p>}
                {active.customer?.email && (
                  <p>
                    {active.customer.contact} · {active.customer.phone} · {active.customer.email}
                  </p>
                )}
                {(active.customer?.billingAddress || active.customer?.deliveryAddress) && (
                  <p>
                    {[
                      active.customer.deliveryAddress || active.customer.billingAddress,
                      active.customer.deliveryZip || active.customer.zip,
                      active.customer.deliveryCity || active.customer.city,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
              </div>
              <div>
                <p>
                  <b>Levering:</b>{' '}
                  {active.delivery?.desiredDate
                    ? `Særlig dato ${active.delivery.desiredDate}`
                    : 'Hurtigst muligt'}
                </p>
                {active.delivery?.driverNote && (
                  <p>
                    <b>Til lager/chauffør:</b> {active.delivery.driverNote}
                  </p>
                )}
                {active.delivery?.internalNotes && (
                  <p>
                    <b>Internt:</b> {active.delivery.internalNotes}
                  </p>
                )}
              </div>
            </div>

            {active.lines?.length > 0 && (
              <table style={{ marginTop: 12 }}>
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Antal</th>
                    <th>Samlet pris</th>
                  </tr>
                </thead>
                <tbody>
                  {active.lines.map((l) => (
                    <tr key={l.id}>
                      <td>
                        <b>{l.product}</b>
                        {l.sku ? (
                          <small style={{ display: 'block', color: 'var(--muted)' }}>{l.sku}</small>
                        ) : null}
                      </td>
                      <td>{l.qty}</td>
                      <td>{money(Number(l.lineTotal) || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {active.bonus?.product && (
              <div className="reg-bonus-note" style={{ marginTop: 12 }}>
                <span className="kicker">BONUSVARE / GAVE</span>
                <p>
                  {active.bonus.product} · {active.bonus.qty} stk.
                  {active.bonus.internalValue
                    ? ` · intern værdi ${money(Number(active.bonus.internalValue) || 0)}`
                    : ''}
                </p>
              </div>
            )}

            <p style={{ marginTop: 12, fontSize: 13 }}>
              <b>Samlet ordrebeløb:</b> {money(active.amount)}
            </p>

            <label style={{ display: 'grid', gap: 6, marginTop: 12 }}>
              Kort besked til sælgeren
              <textarea
                value={leaderNote}
                onChange={(e) => setLeaderNote(e.target.value)}
                rows={2}
                placeholder="Valgfrit — synlig for sælgeren ved tilbagesendelse"
              />
            </label>

            <div className="rule-actions" style={{ marginTop: 14 }}>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  approveSalesOrder(active.id, { message: leaderNote });
                  notify(`${active.id} godkendt — klar til lager`);
                  setActiveId(null);
                }}
              >
                Godkend ordre
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  if (!leaderNote.trim()) {
                    notify('Skriv en kort besked, når du sender tilbage');
                    return;
                  }
                  returnSalesOrder(active.id, leaderNote.trim());
                  notify(`${active.id} sendt tilbage til rettelse`);
                  setActiveId(null);
                }}
              >
                Send tilbage til rettelse
              </button>
            </div>
          </div>
        )}
      </article>

      {warehouseReady.length > 0 && (
        <article className="card" style={{ marginBottom: 16 }}>
          <div className="card-head">
            <div>
              <span className="kicker">KLAR TIL LAGER · DEMO</span>
              <h3>Markér afsendelse</h3>
            </div>
            <span className="muted">Senere automatisk fra lager/økonomi</span>
          </div>
          {warehouseReady.map((o) => (
            <div className="list-row" key={o.id} style={{ alignItems: 'center' }}>
              <div>
                <b>
                  {o.id} · {companyName(o)}
                </b>
                <p>
                  {o.seller} · {money(o.amount)} · {o.status}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="primary"
                  onClick={() => {
                    markSalesOrderSent(o.id);
                    notify(`${o.id} markeret som sendt — tæller i provision`);
                  }}
                >
                  Afsendt
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    markSalesOrderReturned(o.id);
                    notify(`${o.id} returneret — provision tilbageføres`);
                  }}
                >
                  Returnér
                </button>
              </div>
            </div>
          ))}
        </article>
      )}

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
            {board.map((s, i) => {
              const month = s.amount + i * 28000;
              const next = nextTierFor(month);
              const avg = Math.round((s.amount + i * 8000) / (s.orders + 5));
              return (
                <tr key={s.name}>
                  <td className="cell-person">
                    <span className="person-dot">{s.name[0]}</span>
                    <b title={s.name}>{s.name}</b>
                  </td>
                  <td>{s.dept || (i < 2 ? 'Nysalg' : 'Gensalg')}</td>
                  <td>{money(12400 + i * 5900)}</td>
                  <td>{money(month)}</td>
                  <td>{money(avg)}</td>
                  <td>{next ? money(next.threshold - month) : 'Toptrin nået'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    </div>
  );
}
