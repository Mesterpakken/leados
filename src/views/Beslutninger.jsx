import { useEffect, useMemo, useState } from 'react';
import {
  decisionBottlenecks,
  decisionCases,
  decisionReadyToDelegate,
  decisionRepeats,
} from '../data/commercial';

const statusClass = {
  awaiting: 'awaiting',
  answered: 'answered',
  proposed: 'proposed',
  approved: 'approved',
  onetime: 'answered',
};

const OWNER_LABEL = 'Michael'; // Nordic Tools demo owner — not a product lock

export default function Beslutninger({ notify, focusId, onAskAi }) {
  const [cases, setCases] = useState(decisionCases);
  const [activeId, setActiveId] = useState(focusId || 'dec-demo');
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState('Alle');

  useEffect(() => {
    if (focusId) setActiveId(focusId);
  }, [focusId]);

  const filtered = useMemo(() => {
    if (filter === 'Alle') return cases;
    if (filter === 'Afventer') return cases.filter((c) => c.status === 'awaiting');
    if (filter === 'Tråde') return cases.filter((c) => c.status === 'answered' || c.status === 'proposed');
    if (filter === 'Regler') return cases.filter((c) => c.ruleSuggestion?.approved || c.status === 'approved');
    if (filter === 'Enkelte') return cases.filter((c) => c.status === 'onetime');
    return cases;
  }, [cases, filter]);

  const active = cases.find((c) => c.id === activeId) || cases[0];

  const counts = useMemo(
    () => ({
      awaiting: cases.filter((c) => c.status === 'awaiting').length,
      threads: cases.filter((c) => ['answered', 'proposed', 'awaiting'].includes(c.status)).length,
      proposed: cases.filter((c) => c.status === 'proposed' && c.ruleSuggestion && !c.ruleSuggestion.approved).length,
      approved: cases.filter((c) => c.ruleSuggestion?.approved || c.status === 'approved').length,
      onetime: cases.filter((c) => c.status === 'onetime').length,
      repeats: decisionRepeats.length,
    }),
    [cases],
  );

  const appendOwnerReply = (text, { proposeRule = true } = {}) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== active.id) return c;
        const next = {
          ...c,
          messages: [...c.messages, { who: 'michael', name: OWNER_LABEL, text, at: 'Nu' }],
        };
        if (proposeRule && (c.pendingRuleText || c.ruleSuggestion)) {
          next.status = 'proposed';
          next.statusLabel = 'AI-forslag til regel';
          next.ruleSuggestion = c.ruleSuggestion || {
            text: c.pendingRuleText,
            confidence: 'Medium',
            basedOn: ['Denne samtale'],
            approved: false,
          };
        } else {
          next.status = 'answered';
          next.statusLabel = 'Besvaret';
        }
        return next;
      }),
    );
    setDraft('');
    notify('Svar registreret — Lead OS kan udlede en regel');
  };

  const appendAskerMessage = (text) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              messages: [...c.messages, { who: 'kevin', name: 'Kevin', text, at: 'Nu' }],
            }
          : c,
      ),
    );
    setDraft('');
    notify('Spørgsmål sendt til beslutningsejeren');
  };

  const simulateVoice = (role) => {
    if (role === 'ask') {
      setDraft(
        'Indtalt: Kunden beder om en særlig pris på en stor ordre. Avancen ser fornuftig ud — må vi gå med?',
      );
      notify('Indtaling simuleret — tekst klar til afsendelse');
    } else {
      appendOwnerReply(
        active.demoOwnerReply ||
          'Ja, hvis avancen holder, kunden er kendt, og det ikke bliver en skjult standard. Ellers skal jeg se den.',
      );
    }
  };

  const approveRule = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === active.id && c.ruleSuggestion
          ? {
              ...c,
              status: 'approved',
              statusLabel: 'Regel godkendt',
              ruleSuggestion: { ...c.ruleSuggestion, approved: true },
            }
          : c,
      ),
    );
    notify('Reglen er gemt i beslutningshukommelsen med kilde til samtalen');
  };

  const oneTimeOnly = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              status: 'onetime',
              statusLabel: 'Kun denne ene gang',
              ruleSuggestion: c.ruleSuggestion
                ? { ...c.ruleSuggestion, approved: false, oneTime: true }
                : c.ruleSuggestion,
            }
          : c,
      ),
    );
    notify('Registreret som enkeltstående undtagelse — ingen generel regel');
  };

  return (
    <div className="content">
      <div className="people-intro">
        <div>
          <span className="kicker">BESLUTNINGSHUKOMMELSE</span>
          <h2>Fra personafhængighed til dokumenterede regler</h2>
          <p>
            Lead OS omsætter beslutningsejerens løbende svar til virksomhedens hukommelse — så gentagne spørgsmål
            kan besvares med kilde, sikkerhed og mandat, uden at alt skal forbi den samme person.
          </p>
          <p className="owner-note">
            I Nordic Tools-demoen er {OWNER_LABEL} nuværende beslutningsejer. Systemet er ikke låst til én person.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button type="button" className="secondary" onClick={onAskAi}>
            Spørg AI om lignende sag
          </button>
          <button
            type="button"
            className="primary"
            onClick={() => {
              setActiveId('dec-demo');
              setFilter('Alle');
              notify('Demotråd: Kevin spørger om særlig pris');
            }}
          >
            Åbn demotråd
          </button>
        </div>
      </div>

      <div className="decision-memory-grid">
        <article>
          <small>AFVENTER SVAR</small>
          <strong>{counts.awaiting}</strong>
          <p>Spørgsmål der stadig kræver beslutningsejeren</p>
        </article>
        <article>
          <small>AKTIVE TRÅDE</small>
          <strong>{counts.threads}</strong>
          <p>Samtaler med kontekst om kunde, pris og avance</p>
        </article>
        <article>
          <small>AI-FORSLAG TIL REGLER</small>
          <strong>{counts.proposed}</strong>
          <p>Udledt logik der mangler menneskelig godkendelse</p>
        </article>
        <article>
          <small>GODKENDTE REGLER</small>
          <strong>{counts.approved}</strong>
          <p>Dokumenteret mandat med kilde til oprindelig samtale</p>
        </article>
      </div>

      <div className="decision-panels">
        <article className="card">
          <span className="kicker">GENTAGNE SPØRGSMÅL</span>
          <h3 style={{ fontSize: 17, margin: '6px 0 4px' }}>Det samme bliver spurgt igen</h3>
          {decisionRepeats.map((r) => (
            <div className="list-row" key={r.topic}>
              <div>
                <b>{r.topic}</b>
                <p>{r.detail}</p>
              </div>
              <span className="status-pill awaiting">{r.count}×</span>
            </div>
          ))}
        </article>
        <article className="card">
          <span className="kicker">FLASKEHALS VS. KLAR TIL DELEGERING</span>
          <h3 style={{ fontSize: 17, margin: '6px 0 4px' }}>Hvor mandat stadig sidder fast</h3>
          {decisionBottlenecks.map((b) => (
            <div className="list-row" key={b.area}>
              <div>
                <b>{b.area}</b>
                <p>{b.detail}</p>
              </div>
              <span className={`risk ${b.level}`}>{b.level}</span>
            </div>
          ))}
          {decisionReadyToDelegate.map((b) => (
            <div className="list-row" key={b.area}>
              <div>
                <b>{b.area}</b>
                <p>{b.detail}</p>
              </div>
              <span className="status-pill approved">Klar</span>
            </div>
          ))}
        </article>
      </div>

      <div className="toolbar">
        <div className="tabs">
          {['Alle', 'Afventer', 'Tråde', 'Regler', 'Enkelte'].map((x) => (
            <button key={x} type="button" className={filter === x ? 'active' : ''} onClick={() => setFilter(x)}>
              {x}
            </button>
          ))}
        </div>
        <span className="muted">
          {counts.awaiting} afventer · {counts.onetime} enkeltbeslutninger · {counts.repeats} gentagne mønstre
        </span>
      </div>

      <div className="decision-layout">
        <aside className="decision-inbox">
          <div className="inbox-head">
            <span className="kicker">INDBAKKE</span>
            <h3 style={{ fontSize: 18, marginTop: 6 }}>Spørgsmål & tråde</h3>
          </div>
          <div className="inbox-list">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`inbox-item ${c.id === active.id ? 'active' : ''}`}
                onClick={() => setActiveId(c.id)}
              >
                <small>
                  {c.category} · {c.asker}
                </small>
                <b>{c.title}</b>
                <p>{c.summary}</p>
                <span className={`status-pill ${statusClass[c.status] || ''}`} style={{ marginTop: 8, display: 'inline-block' }}>
                  {c.statusLabel}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="decision-thread">
          <div className="thread-head">
            <div className="card-head">
              <div>
                <span className="kicker">{active.category.toUpperCase()}</span>
                <h3 style={{ fontSize: 22, marginTop: 6 }}>{active.title}</h3>
              </div>
              <span className={`status-pill ${statusClass[active.status] || ''}`}>{active.statusLabel}</span>
            </div>
            <div className="context-grid">
              {Object.entries(active.context).map(([k, v]) => (
                <div key={k}>
                  <small>{k}</small>
                  <b>{v}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="thread-messages">
            {active.messages.map((m, i) => (
              <div key={`${m.at}-${i}`} className={`bubble ${m.who}`}>
                <small>
                  {m.name} · {m.at}
                </small>
                {m.text}
              </div>
            ))}
          </div>

          {active.aiSuggestedAnswer && (
            <div className="ai-answer-card">
              <span className="ai-mark">LEAD OS FORSLÅR SVAR · {active.aiSuggestedAnswer.confidence.toUpperCase()} SIKKERHED</span>
              <p>{active.aiSuggestedAnswer.text}</p>
              <p className="muted" style={{ fontSize: 10, margin: 0 }}>
                Bygger på:
              </p>
              <ul className="source-list">
                {(active.aiSuggestedAnswer.basedOn || []).map((ref) => (
                  <li key={ref.id}>
                    <button type="button" className="text-button" onClick={() => setActiveId(ref.id)}>
                      {ref.label}
                    </button>
                  </li>
                ))}
              </ul>
              {active.aiSuggestedAnswer.confidence === 'Lav' && (
                <p className="owner-note">Lav sikkerhed — spørgsmålet bør fortsat eskaleres til beslutningsejeren.</p>
              )}
              {active.aiSuggestedAnswer.confidence !== 'Lav' && (
                <div className="rule-actions">
                  <button type="button" className="secondary" onClick={() => notify('Forslag sendt til spørger (demo)')}>
                    Del forslag med spørger
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => notify('Eskaleret til beslutningsejeren')}
                  >
                    Eskalér alligevel
                  </button>
                </div>
              )}
            </div>
          )}

          {active.ruleSuggestion && !active.ruleSuggestion.oneTime && (
            <div className="rule-card">
              <span className="ai-mark">
                {active.ruleSuggestion.approved
                  ? 'GODKENDT REGEL · GEMT MED KILDE'
                  : 'AI-FORSLAG TIL REGEL · AFVENTER GODKENDELSE'}
              </span>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 14, lineHeight: 1.5, margin: '8px 0' }}>
                {active.ruleSuggestion.text}
              </p>
              <p className="muted" style={{ fontSize: 10 }}>
                Sikkerhed: {active.ruleSuggestion.confidence} · Kilde:{' '}
                {(active.ruleSuggestion.basedOn || []).join(' · ')}
              </p>
              {!active.ruleSuggestion.approved && (
                <div className="rule-actions">
                  <button type="button" className="primary" onClick={approveRule}>
                    Godkend som regel
                  </button>
                  <button type="button" className="secondary" onClick={() => notify('Regel åbnet til redigering (demo)')}>
                    Ret regel
                  </button>
                  <button type="button" className="secondary" onClick={oneTimeOnly}>
                    Kun denne ene gang
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="similar-list">
            <span className="kicker">LIGNENDE / TIDLIGERE BESLUTNINGER</span>
            {(active.similar || []).map((id) => {
              const s = cases.find((c) => c.id === id);
              if (!s) return null;
              return (
                <article key={id}>
                  <button type="button" className="text-button" onClick={() => setActiveId(id)}>
                    {s.title}
                  </button>
                  <div className="muted">
                    {s.statusLabel} · {s.category}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="composer">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Skriv spørgsmål, eller svar som ${OWNER_LABEL}…`}
              aria-label="Besked"
            />
            <div className="composer-actions">
              <button
                type="button"
                className="primary"
                onClick={() => draft.trim() && appendAskerMessage(draft.trim())}
              >
                Send spørgsmål
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => draft.trim() && appendOwnerReply(draft.trim())}
              >
                Svar som {OWNER_LABEL}
              </button>
              <button type="button" className="voice-btn" onClick={() => simulateVoice('ask')}>
                ● Indtal spørgsmål
              </button>
              <button type="button" className="voice-btn" onClick={() => simulateVoice('answer')}>
                ● Indtal svar
              </button>
            </div>
          </div>
        </section>
      </div>

      <article className="card" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div>
            <span className="kicker">TIDLIGERE ENKELTBESLUTNINGER & REGLER</span>
            <h3>Komplet beslutningslog</h3>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sag</th>
              <th>Kategori</th>
              <th>Spørger</th>
              <th>Status</th>
              <th>Hukommelse</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td>
                  <button type="button" className="text-button" onClick={() => setActiveId(c.id)}>
                    {c.title}
                  </button>
                </td>
                <td>{c.category}</td>
                <td>{c.asker}</td>
                <td>
                  <span className={`status-pill ${statusClass[c.status] || ''}`}>{c.statusLabel}</span>
                </td>
                <td>
                  {c.ruleSuggestion?.approved
                    ? 'Godkendt regel'
                    : c.status === 'onetime'
                      ? 'Enkeltundtagelse'
                      : c.ruleSuggestion
                        ? 'AI-forslag'
                        : c.aiSuggestedAnswer
                          ? 'AI-svar foreslået'
                          : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </div>
  );
}
