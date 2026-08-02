import { useEffect, useMemo, useState } from 'react';
import {
  CLARIFICATION_CATEGORIES,
  clarificationGuidelines,
  decisionCases,
} from '../data/commercial';

const OPEN_STATUSES = new Set(['awaiting-michael', 'awaiting-kevin', 'leados']);

const STATUS_CLASS = {
  'awaiting-michael': 'awaiting',
  'awaiting-kevin': 'proposed',
  answered: 'answered',
  leados: 'approved',
};

const BYGPARTNER_QUESTION =
  'BygPartner vil købe hele pakken, hvis vi går fra 164.000 til 151.000 kr. Det er en stor ordrekunde. Må jeg godkende det?';

const BYGPARTNER_CONTEXT = {
  Kunde: 'BygPartner A/S',
  Ordreværdi: '151.000 kr.',
  Standardpris: '164.000 kr.',
  Rabat: '7,9 %',
  'Estimeret avance': '16 % efter fragt',
  'Tidligere køb': '4 ordrer · 612.000 kr. i år',
};

const MICHAEL_DEMO_REPLY =
  'Ja, den må Kevin tage. Kunden køber stort og ofte, og vi holder stadig den nødvendige avance. Fremover må Kevin selv godkende den type rabat op til 8 %, hvis ordren er over 100.000 kr.';

function suggestCategory(text) {
  const t = text.toLowerCase();
  if (/rabat|pris|151|164|%|særpris/.test(t)) return 'Pris og rabat';
  if (/kredit|kunde|ramme/.test(t)) return 'Kunde og kredit';
  if (/levering|lager|fragt/.test(t)) return 'Levering og lager';
  if (/skaffe|specialprodukt|specialordre/.test(t)) return 'Skaffevare eller specialprodukt';
  if (/provision/.test(t)) return 'Provision';
  if (/produkt|værktøj|pakke/.test(t)) return 'Produkt';
  return 'Andet';
}

function detectLinks(text) {
  const t = text.toLowerCase();
  if (t.includes('bygpartner') || t.includes('151') || t.includes('164')) {
    return {
      customer: 'BygPartner A/S',
      order: 'NT-2910',
      product: 'Elværktøj · professionel serie',
      context: BYGPARTNER_CONTEXT,
      category: 'Pris og rabat',
      title: 'BygPartner vil have pakken til 151.000 kr.',
      isDemo: true,
    };
  }
  return {
    customer: '',
    order: '',
    product: '',
    context: {},
    category: suggestCategory(text),
    title: text.trim().slice(0, 72) || 'Ny afklaring',
    isDemo: false,
  };
}

function shortQuestion(c) {
  const raw = c.messages?.find((m) => m.who === 'kevin')?.text || c.title;
  return raw.length > 90 ? `${raw.slice(0, 87)}…` : raw;
}

export default function Beslutninger({ notify, focusId }) {
  const [cases, setCases] = useState(decisionCases);
  const [view, setView] = useState('home'); // home | thread | guidelines
  const [activeId, setActiveId] = useState(null);
  const [listTab, setListTab] = useState('open');
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('Andet');
  const [customer, setCustomer] = useState('');
  const [order, setOrder] = useState('');
  const [product, setProduct] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [suggestedContext, setSuggestedContext] = useState(null);
  const [existingHit, setExistingHit] = useState(null);
  const [draft, setDraft] = useState('');
  const [showLimits, setShowLimits] = useState(false);
  const [limits, setLimits] = useState({
    maxDiscount: '8 %',
    minOrder: '100.000 kr.',
    minMargin: '',
    categories: '',
    customerTypes: 'Store ordrekunder',
    reviewDate: '',
  });

  useEffect(() => {
    if (focusId) {
      setActiveId(focusId);
      setView('thread');
    }
  }, [focusId]);

  useEffect(() => {
    if (!question.trim()) {
      setSuggestedContext(null);
      setExistingHit(null);
      return;
    }
    const detected = detectLinks(question);
    setCategory(detected.category);
    if (detected.customer) setCustomer(detected.customer);
    if (detected.order) setOrder(detected.order);
    if (detected.product) setProduct(detected.product);
    setSuggestedContext(Object.keys(detected.context).length ? detected.context : null);

    if (detected.isDemo) {
      setExistingHit({
        type: 'similar',
        title: 'Ingen sikker godkendt grænse endnu',
        detail: 'Kevin har ikke mandat til 7,9 % på denne ordrestørrelse. Send til Michael.',
      });
    } else if (/kampagne|12\s*%|avance/.test(question.toLowerCase())) {
      setExistingHit({
        type: 'answer',
        title: 'Godkendt svar findes',
        detail: 'Kampagne må ikke gå under 12 % avance — medmindre Michael godkender.',
        caseId: 'dec-5',
      });
    } else {
      setExistingHit(null);
    }
  }, [question]);

  const active = cases.find((c) => c.id === activeId) || null;

  const openCases = useMemo(
    () => cases.filter((c) => OPEN_STATUSES.has(c.status)),
    [cases],
  );
  const answeredCases = useMemo(
    () => cases.filter((c) => c.status === 'answered'),
    [cases],
  );
  const listCases = listTab === 'open' ? openCases : answeredCases;

  const resetComposer = () => {
    setQuestion('');
    setCategory('Andet');
    setCustomer('');
    setOrder('');
    setProduct('');
    setAttachment(null);
    setSuggestedContext(null);
    setExistingHit(null);
  };

  const simulateVoiceQuestion = () => {
    setQuestion(BYGPARTNER_QUESTION);
    notify('Indtaling simuleret — spørgsmål klar');
  };

  const sendClarification = () => {
    const text = question.trim();
    if (!text) {
      notify('Skriv eller indtal et spørgsmål først');
      return;
    }

    if (existingHit?.type === 'answer' && existingHit.caseId) {
      setActiveId(existingHit.caseId);
      setView('thread');
      notify('LeadOS fandt et godkendt svar — Michael behøves ikke');
      return;
    }

    const detected = detectLinks(text);
    const id = detected.isDemo ? 'dec-demo' : `dec-new-${Date.now()}`;

    if (detected.isDemo) {
      setCases((prev) =>
        prev.map((c) =>
          c.id === 'dec-demo'
            ? {
                ...c,
                status: 'awaiting-michael',
                statusLabel: 'Afventer Michael',
                waited: 'Nu',
                customer: customer || detected.customer,
                order: order || detected.order,
                product: product || detected.product,
                category,
                context: suggestedContext || detected.context,
                messages: [
                  {
                    who: 'kevin',
                    name: 'Kevin',
                    text,
                    at: 'Nu',
                  },
                ],
                finalAnswer: null,
                learning: null,
              }
            : c,
        ),
      );
    } else {
      const created = {
        id,
        title: detected.title,
        asker: 'Kevin',
        assignee: 'Michael',
        status: 'awaiting-michael',
        statusLabel: 'Afventer Michael',
        category,
        customer: customer || null,
        order: order || null,
        product: product || null,
        waited: 'Nu',
        context: {
          ...(customer ? { Kunde: customer } : {}),
          ...(order ? { Ordre: order } : {}),
          ...(product ? { Produkt: product } : {}),
          ...(attachment ? { Bilag: attachment } : {}),
        },
        messages: [{ who: 'kevin', name: 'Kevin', text, at: 'Nu' }],
        finalAnswer: null,
        learning: null,
        hasMandate: false,
        demoOwnerReply: 'Sendt til Michael — svar kommer snart.',
      };
      setCases((prev) => [created, ...prev]);
    }

    resetComposer();
    setActiveId(id);
    setView('thread');
    setListTab('open');
    notify('Sendt til afklaring');
  };

  const openCase = (id) => {
    setActiveId(id);
    setView('thread');
    setDraft('');
    setShowLimits(false);
  };

  const replyAsMichael = (text) => {
    if (!active) return;
    const answer = text.trim();
    if (!answer) return;

    setCases((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              status: 'answered',
              statusLabel: 'Besvaret',
              waited: '—',
              messages: [...c.messages, { who: 'michael', name: 'Michael', text: answer, at: 'Nu' }],
              finalAnswer: answer,
              learning: null,
            }
          : c,
      ),
    );
    setDraft('');
    notify('Svar sendt til Kevin');
  };

  const simulateMichaelVoice = () => {
    replyAsMichael(active?.demoOwnerReply || MICHAEL_DEMO_REPLY);
  };

  const useLeadOsAnswer = () => {
    if (!active?.similarAnswer) return;
    setCases((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              status: 'answered',
              statusLabel: 'Besvaret',
              waited: '—',
              finalAnswer: c.similarAnswer.text,
              messages: [
                ...c.messages,
                {
                  who: 'leados',
                  name: 'LeadOS',
                  text: c.similarAnswer.text,
                  at: 'Nu',
                },
              ],
              learning: 'baseline',
            }
          : c,
      ),
    );
    notify('Svar brugt — Michael blev ikke forstyrret');
  };

  const setLearning = (learning) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              learning,
              hasMandate: learning === 'delegate',
            }
          : c,
      ),
    );
    if (learning === 'delegate') {
      setShowLimits(true);
      notify('Kevin må beslutte fremover — valgfrie grænser nedenfor');
    } else if (learning === 'baseline') {
      setShowLimits(false);
      notify('Gemt som udgangspunkt til næste gang');
    } else {
      setShowLimits(false);
      notify('Gælder kun denne sag');
    }
  };

  const saveLimits = () => {
    setShowLimits(false);
    notify('Grænser gemt — Kevin kan bruge dem næste gang');
  };

  /* ─── Guidelines (secondary) ─── */
  if (view === 'guidelines') {
    const g = clarificationGuidelines;
    return (
      <div className="content afklaringer">
        <button type="button" className="back-button" onClick={() => setView('home')}>
          ← Tilbage til Afklaringer
        </button>
        <div className="people-intro">
          <div>
            <span className="kicker">SEKUNDÆRT · LEDERE</span>
            <h2>Retningslinjer og ansvar</h2>
            <p>
              Tidligere afklaringer, genbrugelige svar og områder Kevin må beslutte — systemets langsigtede
              hukommelse, ikke det daglige arbejdsflow.
            </p>
          </div>
        </div>

        <div className="afkl-guide-grid">
          <section className="card">
            <span className="kicker">GENBRUGELIGE SVAR</span>
            {g.reusable.map((r) => (
              <div className="list-row" key={r.topic}>
                <div>
                  <b>{r.topic}</b>
                  <p>{r.detail}</p>
                </div>
                <span className="muted">{r.source}</span>
              </div>
            ))}
          </section>
          <section className="card">
            <span className="kicker">KEVIN MÅ BESLUTTE</span>
            {g.kevinMayDecide.map((r) => (
              <div className="list-row" key={r.area}>
                <div>
                  <b>{r.area}</b>
                  <p>{r.detail}</p>
                </div>
              </div>
            ))}
          </section>
          <section className="card">
            <span className="kicker">MICHAEL GODKENDER STADIG</span>
            {g.michaelStillOwns.map((r) => (
              <div className="list-row" key={r.area}>
                <div>
                  <b>{r.area}</b>
                  <p>{r.detail}</p>
                </div>
              </div>
            ))}
          </section>
          <section className="card">
            <span className="kicker">GENTAGNE SPØRGSMÅL</span>
            {g.repeats.map((r) => (
              <div className="list-row" key={r.topic}>
                <div>
                  <b>{r.topic}</b>
                  <p>{r.detail}</p>
                </div>
                <span className="status-pill awaiting">{r.count}×</span>
              </div>
            ))}
          </section>
        </div>

        <p className="muted" style={{ marginTop: 20, maxWidth: 640 }}>
          Afklaringer er spørgsmål, undtagelser og godkendelser, der ellers kræver en bestemt person. Generel
          produkt- og markedsviden hører hjemme i Vidensbank.
        </p>
      </div>
    );
  }

  /* ─── Thread ─── */
  if (view === 'thread' && active) {
    const kevinMsg = active.messages?.find((m) => m.who === 'kevin');
    const hasMichael = active.messages?.some((m) => m.who === 'michael');
    const isOpen = OPEN_STATUSES.has(active.status);

    return (
      <div className="content afklaringer">
        <button type="button" className="back-button" onClick={() => setView('home')}>
          ← Alle afklaringer
        </button>

        <div className="afkl-thread card">
          {active.finalAnswer && (
            <div className="afkl-final">
              <span className="kicker">ENDELIGT SVAR</span>
              <p>{active.finalAnswer}</p>
            </div>
          )}

          <div className="afkl-thread-head">
            <div>
              <span className="kicker">{active.category?.toUpperCase()}</span>
              <h2>{active.title}</h2>
              <p className="muted">
                {active.asker} · svar fra {active.assignee}
                {active.customer ? ` · ${active.customer}` : ''}
                {active.order ? ` · ${active.order}` : ''}
              </p>
            </div>
            <span className={`status-pill ${STATUS_CLASS[active.status] || ''}`}>{active.statusLabel}</span>
          </div>

          <div className="memory-step">
            <small>1 · SPØRGSMÅL</small>
            <p>{kevinMsg?.text || active.title}</p>
          </div>

          {active.context && Object.keys(active.context).length > 0 && (
            <div className="memory-step">
              <small>2 · KONTEKST · LEADOS</small>
              <div className="context-grid">
                {Object.entries(active.context).map(([k, v]) => (
                  <div key={k}>
                    <small>{k}</small>
                    <b>{v}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active.status === 'leados' && active.similarAnswer && !active.finalAnswer && (
            <div className="memory-step">
              <small>LEADOS HAR ET SVAR</small>
              <p className="memory-conclusion">{active.similarAnswer.text}</p>
              <p className="muted" style={{ fontSize: 11, marginTop: 8 }}>
                Baseret på: {active.similarAnswer.basedOn}
              </p>
              <div className="rule-actions" style={{ marginTop: 12 }}>
                <button type="button" className="primary" onClick={useLeadOsAnswer}>
                  Brug svaret
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    setCases((prev) =>
                      prev.map((c) =>
                        c.id === active.id
                          ? {
                              ...c,
                              status: 'awaiting-michael',
                              statusLabel: 'Afventer Michael',
                              assignee: 'Michael',
                            }
                          : c,
                      ),
                    );
                    notify('Sendt videre til Michael');
                  }}
                >
                  Spørg Michael alligevel
                </button>
              </div>
            </div>
          )}

          {active.messages
            ?.filter((m) => m.who === 'michael' || m.who === 'leados')
            .map((m, i) => (
              <div className="memory-step" key={`${m.at}-${i}`}>
                <small>{m.who === 'leados' ? 'LEADOS' : '3 · MICHAELS SVAR'}</small>
                <div className={`bubble ${m.who === 'leados' ? 'kevin' : 'michael'}`} style={{ margin: 0 }}>
                  <small>
                    {m.name} · {m.at}
                  </small>
                  {m.text}
                </div>
              </div>
            ))}

          {active.finalAnswer && !active.learning && hasMichael && (
            <div className="memory-step afkl-learn">
              <small>HVORDAN SKAL SVARET BRUGES NÆSTE GANG?</small>
              <p className="muted" style={{ fontSize: 12, marginBottom: 12 }}>
                Skal Kevin kunne gøre det samme næste gang?
              </p>
              <div className="rule-actions">
                <button type="button" className="secondary" onClick={() => setLearning('once')}>
                  Kun denne sag
                </button>
                <button type="button" className="secondary" onClick={() => setLearning('baseline')}>
                  Brug som udgangspunkt
                </button>
                <button type="button" className="primary" onClick={() => setLearning('delegate')}>
                  Kevin må beslutte fremover
                </button>
              </div>
            </div>
          )}

          {active.learning && (
            <div className="memory-step">
              <small>GEMT</small>
              <p>
                {active.learning === 'once' && 'Gælder kun denne sag.'}
                {active.learning === 'baseline' && 'Bruges som udgangspunkt næste gang.'}
                {active.learning === 'delegate' && 'Kevin må beslutte fremover inden for de satte grænser.'}
              </p>
            </div>
          )}

          {showLimits && active.learning === 'delegate' && (
            <div className="memory-step afkl-limits">
              <small>VALGFRIE GRÆNSER</small>
              <div className="afkl-limits-grid">
                <label>
                  Op til hvilken rabat
                  <input
                    value={limits.maxDiscount}
                    onChange={(e) => setLimits({ ...limits, maxDiscount: e.target.value })}
                  />
                </label>
                <label>
                  Over hvilken ordrestørrelse
                  <input
                    value={limits.minOrder}
                    onChange={(e) => setLimits({ ...limits, minOrder: e.target.value })}
                  />
                </label>
                <label>
                  Minimumsavance
                  <input
                    value={limits.minMargin}
                    onChange={(e) => setLimits({ ...limits, minMargin: e.target.value })}
                    placeholder="Valgfrit"
                  />
                </label>
                <label>
                  Produktkategorier
                  <input
                    value={limits.categories}
                    onChange={(e) => setLimits({ ...limits, categories: e.target.value })}
                    placeholder="Valgfrit"
                  />
                </label>
                <label>
                  Kundetyper
                  <input
                    value={limits.customerTypes}
                    onChange={(e) => setLimits({ ...limits, customerTypes: e.target.value })}
                  />
                </label>
                <label>
                  Revurderingsdato
                  <input
                    value={limits.reviewDate}
                    onChange={(e) => setLimits({ ...limits, reviewDate: e.target.value })}
                    placeholder="Valgfrit"
                  />
                </label>
              </div>
              <div className="rule-actions">
                <button type="button" className="primary" onClick={saveLimits}>
                  Gem grænser
                </button>
                <button type="button" className="secondary" onClick={() => setShowLimits(false)}>
                  Spring over
                </button>
              </div>
            </div>
          )}

          {isOpen && active.status !== 'leados' && (
            <div className="composer afkl-mobile-composer">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Skriv et kort svar som Michael…"
                aria-label="Svar"
              />
              <div className="composer-actions">
                <button
                  type="button"
                  className="primary"
                  onClick={() => draft.trim() && replyAsMichael(draft)}
                >
                  Send svar
                </button>
                <button type="button" className="voice-btn" onClick={simulateMichaelVoice}>
                  ● Indtal svar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─── Home ─── */
  return (
    <div className="content afklaringer">
      <div className="people-intro">
        <div>
          <h2>Afklaringer</h2>
          <p>Få svar på det, der ellers ender hos Michael.</p>
        </div>
      </div>

      <section className="afkl-composer card">
        <label className="afkl-question-label" htmlFor="afkl-question">
          Hvad skal du have afklaret?
        </label>
        <textarea
          id="afkl-question"
          className="afkl-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Skriv eller indtal spørgsmålet — kunde, ordre og produkt er valgfrit."
          rows={4}
        />

        <div className="afkl-composer-tools">
          <button type="button" className="voice-btn" onClick={simulateVoiceQuestion}>
            ● Indtal
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setAttachment(attachment ? null : 'foto-bygpartner.jpg');
              notify(attachment ? 'Bilag fjernet' : 'Billede tilføjet (simuleret)');
            }}
          >
            {attachment ? '✓ Bilag tilføjet' : '+ Billede eller dokument'}
          </button>
        </div>

        <div className="afkl-optional">
          <label>
            Kunde
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Valgfrit"
            />
          </label>
          <label>
            Ordre
            <input value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Valgfrit" />
          </label>
          <label>
            Produkt
            <input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Valgfrit"
            />
          </label>
          <label>
            Kategori
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CLARIFICATION_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        {suggestedContext && (
          <div className="afkl-suggest">
            <span className="kicker">LEADOS FORESLÅR KONTEKST</span>
            <div className="context-grid">
              {Object.entries(suggestedContext).map(([k, v]) => (
                <div key={k}>
                  <small>{k}</small>
                  <b>{v}</b>
                </div>
              ))}
            </div>
          </div>
        )}

        {existingHit && (
          <div className={`afkl-hit ${existingHit.type}`}>
            <b>{existingHit.title}</b>
            <p>{existingHit.detail}</p>
            {existingHit.type === 'answer' && (
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setActiveId(existingHit.caseId);
                  setView('thread');
                }}
              >
                Se godkendt svar →
              </button>
            )}
          </div>
        )}

        <div className="afkl-send-row">
          <button type="button" className="primary" onClick={sendClarification}>
            Send til afklaring
          </button>
        </div>
      </section>

      <div className="afkl-list-head">
        <div className="tabs">
          <button
            type="button"
            className={listTab === 'open' ? 'active' : ''}
            onClick={() => setListTab('open')}
          >
            Åbne ({openCases.length})
          </button>
          <button
            type="button"
            className={listTab === 'answered' ? 'active' : ''}
            onClick={() => setListTab('answered')}
          >
            Besvarede ({answeredCases.length})
          </button>
        </div>
        <button type="button" className="text-button afkl-guide-link" onClick={() => setView('guidelines')}>
          Se retningslinjer og ansvar
        </button>
      </div>

      <div className="afkl-rows card">
        {listCases.length === 0 && (
          <p className="muted" style={{ padding: 16 }}>
            Ingen afklaringer i denne fane.
          </p>
        )}
        {listCases.map((c) => (
          <button key={c.id} type="button" className="afkl-row" onClick={() => openCase(c.id)}>
            <div className="afkl-row-main">
              <b>{shortQuestion(c)}</b>
              <span>
                {c.asker}
                {c.customer ? ` · ${c.customer}` : ''}
                {c.order && !c.customer ? ` · ${c.order}` : c.order && c.customer ? ` · ${c.order}` : ''}
              </span>
            </div>
            <span className="afkl-row-cat">{c.category}</span>
            <span className="afkl-row-who">{c.assignee}</span>
            <span className="afkl-row-wait">{c.waited}</span>
            <span className={`status-pill ${STATUS_CLASS[c.status] || ''}`}>{c.statusLabel}</span>
          </button>
        ))}
      </div>

      <p className="muted" style={{ marginTop: 18, fontSize: 10, maxWidth: 640 }}>
        Kun for godkendte ledere. Sælgere ser ikke interne vurderinger, kreditgrænser eller ansvarsområder —
        generel produktviden hører hjemme i Vidensbank.
      </p>
    </div>
  );
}
