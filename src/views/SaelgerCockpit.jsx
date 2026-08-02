import CommercialMetric from '../components/CommercialMetric';
import { demoOrders, sellerDemo } from '../data/commercial';
import { commissionFor, money, nextTierFor } from '../lib/commission';

export default function SaelgerCockpit() {
  const { revenue } = sellerDemo;
  const c = commissionFor(revenue);
  const next = nextTierFor(revenue);

  return (
    <div className="content seller-view">
      <div className="seller-hero">
        <div>
          <span className="kicker">{sellerDemo.name.toUpperCase()} · MIT COCKPIT</span>
          <h2>Du er {next ? money(next.threshold - revenue) : 'på toptrinnet'} fra næste provisionstrin</h2>
          <p>Kun sendte og godkendte ordrer er medregnet.</p>
        </div>
        <div className="seller-rate">
          <small>NUVÆRENDE SATS</small>
          <strong>{c.rate * 100}%</strong>
        </div>
      </div>

      <div className="metric-grid">
        <CommercialMetric label="I DAG" value={money(sellerDemo.today)} delta={`${sellerDemo.todayOrders} ordrer`} note="sendt" />
        <CommercialMetric label="DENNE UGE" value={money(sellerDemo.week)} delta={money(sellerDemo.avgOrder)} note="gns. ordre" />
        <CommercialMetric
          label="DENNE MÅNED"
          value={money(revenue)}
          delta={`${((revenue / sellerDemo.monthTarget) * 100).toFixed(1).replace('.', ',')}% af mål`}
          note={money(sellerDemo.monthTarget)}
        />
        <CommercialMetric
          label="ESTIMERET PROVISION"
          value={money(Math.round(c.amount))}
          delta={next ? `${money(next.threshold - revenue)} til ${next.rate * 100}%` : 'Toptrin'}
          note=""
        />
      </div>

      <article className="card tier-journey">
        <div className="card-head">
          <div>
            <span className="kicker">DIN PROVISIONSTRAPPE</span>
            <h3>Jagten på næste niveau</h3>
          </div>
          <span className="pill">Live estimat</span>
        </div>
        <div className="tier-track">
          <i style={{ width: `${Math.min(100, (revenue / 300000) * 100)}%` }} />
          <span style={{ left: '25%' }}>75k</span>
          <span style={{ left: '66.6%' }}>200k · 10%</span>
          <span style={{ left: '100%' }}>300k · 15%</span>
        </div>
        <p>Når 200.000 kr. er passeret, beregnes 10% af hele den kvalificerende omsætning.</p>
      </article>

      <div className="sales-split">
        <article className="card">
          <span className="kicker">SENESTE SALG</span>
          {demoOrders.slice(0, 3).map((o) => (
            <div className="my-sale" key={o.id}>
              <span>
                <b>{o.id}</b>
                <small>{o.status}</small>
              </span>
              <strong>{money(Math.abs(o.amount))}</strong>
            </div>
          ))}
        </article>
        <article className="card">
          <span className="kicker">MINE TAL</span>
          <div className="summary-row">
            <span>Gennemsnitsordre · måned</span>
            <b>{money(sellerDemo.avgOrder)}</b>
          </div>
          <div className="summary-row">
            <span>Ordrer · måned</span>
            <b>{sellerDemo.monthOrders}</b>
          </div>
          <div className="summary-row">
            <span>Bedste dag</span>
            <b>{money(sellerDemo.bestDay)}</b>
          </div>
          <div className="summary-row">
            <span>Placering</span>
            <b>{sellerDemo.rank}</b>
          </div>
        </article>
      </div>
    </div>
  );
}
