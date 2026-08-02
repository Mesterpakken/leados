import { aiAssistantDemo } from '../data/commercial';

export default function AiDrawer({ open, onClose, onSendToMichael, onOpenDecision }) {
  if (!open) return null;

  return (
    <>
      <button type="button" className="ai-drawer-backdrop" aria-label="Luk AI" onClick={onClose} />
      <aside className="ai-drawer" aria-label="Lead OS AI-assistent">
        <header>
          <div>
            <span className="kicker">GLOBAL AI · STABSCHEF</span>
            <h2>Forslag — ikke afgørelse</h2>
            <p className="muted" style={{ margin: '6px 0 0', fontSize: 11 }}>
              AI må aldrig fremstille et forslag som en godkendt beslutning.
            </p>
          </div>
          <button type="button" className="secondary" onClick={onClose}>
            Luk
          </button>
        </header>
        <div className="ai-body">
          <div className="ai-proposal">
            <span className="badge-forslag">FORSLAG · IKKE GODKENDT REGEL</span>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 14, lineHeight: 1.55, margin: 0 }}>
              {aiAssistantDemo.recommendation}
            </p>
            <p className="confidence">
              Sikkerhedsniveau: <b>{aiAssistantDemo.confidence}</b>
            </p>
            <p className="muted" style={{ fontSize: 10, margin: 0 }}>
              Bygger på tidligere afklaringer:
            </p>
            <ul className="source-list">
              {aiAssistantDemo.basedOn.map((s) => (
                <li key={s.id}>
                  <button type="button" className="text-button" onClick={() => onOpenDecision?.(s.id)}>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <article className="card" style={{ marginTop: 12 }}>
            <span className="kicker">HVAD AI MÅ</span>
            <p style={{ fontSize: 11, lineHeight: 1.5, color: '#555e57' }}>
              Foreslå svar ud fra godkendte afgørelser, pege på lignende sager, og hjælpe dig med at formulere spørgsmål til beslutningsejeren.
              Endelig regel kræver menneskelig godkendelse.
            </p>
          </article>
        </div>
        <footer>
          <button type="button" className="primary" onClick={onSendToMichael}>
            Send til afklaring
          </button>
          <button type="button" className="secondary" onClick={onClose}>
            Behold som forslag
          </button>
        </footer>
      </aside>
    </>
  );
}
