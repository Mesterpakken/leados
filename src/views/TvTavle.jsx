import { commercialSales } from '../data/commercial';
import { money, nextTierFor } from '../lib/commission';

export default function TvTavle({ onExit }) {
  const leaders = [...commercialSales].sort((a, b) => b.amount - a.amount);

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
          <p>105% af dagsmål · 38 ordrer</p>
        </div>
        <div>
          <span>MÅNEDENS OMSÆTNING</span>
          <strong>
            3.582.000 <small>kr.</small>
          </strong>
          <p>64% af mål · 7 nye kunder i dag</p>
        </div>
      </div>

      <div className="tv-main">
        <section>
          <div className="tv-section-title">
            <span>LEADERBOARD · MÅNED</span>
            <small>Sendt omsætning</small>
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
            <strong>15.500 kr.</strong>
            <small>til 200.000 · 10%</small>
          </div>
          <div className="threshold-callout">
            <span>Jørgen</span>
            <strong>50.000 kr.</strong>
            <small>til 200.000 · 10%</small>
          </div>
          <div className="latest-feed">
            <span>SENESTE SALG</span>
            <strong>Christian · 23.000 kr.</strong>
            <small>Sendt fra lageret · for 3 min. siden</small>
          </div>
        </aside>
      </div>

      <div className="ticker">
        <span>I DAG</span>
        <b>Nysalg: 7 nye kunder · Gensalg: 184.600 kr. · Gennemsnitsordre: 9.420 kr.</b>
        <i>Opdateret nu</i>
      </div>
    </div>
  );
}
