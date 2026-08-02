import { money, nextTierFor } from '../lib/commission';
import useSalesOrders from '../hooks/useSalesOrders';
import { boardLeaderboard, latestBoardSale } from '../lib/salesOrders';

export default function TvTavle({ onExit }) {
  useSalesOrders(); // re-render when orders change
  const leaders = boardLeaderboard();
  const latest = latestBoardSale();
  const dayBump = leaders.reduce((s, r) => s + (r.amount || 0), 0) > 0 ? 0 : 0;
  const christian = leaders.find((l) => l.name === 'Christian');
  const toNext = christian ? nextTierFor(christian.amount) : null;

  return (
    <div className="tv-board">
      <div className="tv-head">
        <div>
          <img src="/leados-lockup-reversed.svg" alt="LeadOS" className="brand-logo tv-brand-logo" />
          <b>NORDIC TOOLS · LIVE</b>
        </div>
        <div className="tv-clock">SØNDAG · 14:42</div>
        <button type="button" onClick={onExit}>
          Luk tavle ×
        </button>
      </div>

      <div className="tv-kpis">
        <div>
          <span>DAGENS OMSÆTNING</span>
          <strong>
            247.800 <small>kr.</small>
          </strong>
          <p>105% af dagsmål · godkendte ordrer</p>
        </div>
        <div>
          <span>MÅNEDENS OMSÆTNING</span>
          <strong>
            {money(3582000 + dayBump).replace(' kr.', '')} <small>kr.</small>
          </strong>
          <p>64% af mål · kun godkendte / sendte</p>
        </div>
      </div>

      <div className="tv-main">
        <section>
          <div className="tv-section-title">
            <span>LEADERBOARD · MÅNED</span>
            <small>Godkendt og sendt omsætning</small>
          </div>
          {leaders.map((s, i) => {
            const n = nextTierFor(s.amount);
            return (
              <div className="leader-row" key={s.name}>
                <b>#{i + 1}</b>
                <span className="person-dot">{s.name[0]}</span>
                <div>
                  <strong>{s.name}</strong>
                  <small>{n ? `${money(n.threshold - s.amount)} til ${n.rate * 100}% provision` : 'Toptrin · 15%'}</small>
                </div>
                <em>{money(s.amount)}</em>
                <div className="leader-progress">
                  <i style={{ width: `${Math.min(100, (s.amount / 300000) * 100)}%` }} />
                </div>
              </div>
            );
          })}
        </section>
        <aside>
          <span className="kicker">PROVISIONSTRIN</span>
          <h3>To sælgere er tæt på et nyt niveau</h3>
          <div className="threshold-callout">
            <span>Christian</span>
            <strong>{toNext ? money(toNext.threshold - (christian?.amount || 0)) : '—'}</strong>
            <small>{toNext ? `til ${toNext.threshold.toLocaleString('da-DK')} · ${toNext.rate * 100}%` : 'Toptrin'}</small>
          </div>
          <div className="threshold-callout">
            <span>Jørgen</span>
            <strong>50.000 kr.</strong>
            <small>til 200.000 · 10%</small>
          </div>
          <div className="latest-feed">
            <span>SENESTE SALG</span>
            {latest ? (
              <>
                <strong>
                  {latest.seller} · {money(latest.amount)}
                </strong>
                <small>
                  {latest.status === 'Sendt' ? 'Sendt fra lageret' : latest.status} ·{' '}
                  {typeof latest.customer === 'string' ? latest.customer : latest.customer?.company}
                </small>
              </>
            ) : (
              <>
                <strong>Christian · 23.000 kr.</strong>
                <small>Sendt fra lageret · for 3 min. siden</small>
              </>
            )}
          </div>
        </aside>
      </div>

      <div className="ticker">
        <span>I DAG</span>
        <b>Kun godkendte ordrer vises her · Afventer godkendelse er skjult · Provision først ved Sendt</b>
        <i>Opdateret nu</i>
      </div>
    </div>
  );
}
