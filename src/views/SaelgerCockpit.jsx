import { useEffect, useMemo, useState } from 'react';
import CommercialMetric from '../components/CommercialMetric';
import { sellerDemo } from '../data/commercial';
import {
  DEMO_SELLER_NAME,
  SOURCE_LABELS,
  customerAssistDemo,
  difficultyTypes,
  initialExpertQueue,
  initialHardMoments,
  initialKnowledgeEntries,
  knowledgeExperts,
  leaderKnowledgeInsights,
  queueStatusLabels,
  recentQuestions,
  resolveAsk,
  sellerVisibleEntries,
  sourceLabelFor,
  webSearchDemo,
} from '../data/knowledge';
import { commissionFor, money, nextTierFor } from '../lib/commission';
import useSalesOrders from '../hooks/useSalesOrders';
import {
  DEMO_SELLER,
  commissionableRevenue,
  pendingRevenue,
  resetSalesOrdersDemo,
  returnsTotal,
  statusPillClass,
} from '../lib/salesOrders';

const statusMeta = {
  approved: { label: 'Godkendt svar', className: 'kb-status approved' },
  ai: { label: 'AI-forslag – ikke godkendt', className: 'kb-status ai' },
  none: { label: 'Intet sikkert svar', className: 'kb-status none' },
  web: { label: 'Fundet på nettet – ikke godkendt', className: 'kb-status web' },
  customer: { label: 'Baseret på kundedata', className: 'kb-status customer' },
};

let sharedEntries = initialKnowledgeEntries;
let sharedQueue = initialExpertQueue;
let sharedHard = initialHardMoments;
const listeners = new Set();

function useSharedKnowledge() {
  const [, bump] = useState(0);
  useEffect(() => {
    const fn = () => bump((n) => n + 1);
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, []);
  const publish = (nextEntries, nextQueue, nextHard) => {
    if (nextEntries) sharedEntries = nextEntries;
    if (nextQueue) sharedQueue = nextQueue;
    if (nextHard) sharedHard = nextHard;
    listeners.forEach((fn) => fn());
  };
  return {
    entries: sharedEntries,
    queue: sharedQueue,
    hardMoments: sharedHard,
    setEntries: (updater) => {
      const next = typeof updater === 'function' ? updater(sharedEntries) : updater;
      publish(next, null, null);
    },
    setQueue: (updater) => {
      const next = typeof updater === 'function' ? updater(sharedQueue) : updater;
      publish(null, next, null);
    },
    setHardMoments: (updater) => {
      const next = typeof updater === 'function' ? updater(sharedHard) : updater;
      publish(null, null, next);
    },
  };
}

function queueLabel(status) {
  return queueStatusLabels[status] || status;
}

export default function SaelgerCockpit({
  notify,
  section = 'seller-cockpit',
  role = 'seller',
  onRegisterSale,
}) {
  const { entries, queue, hardMoments, setEntries, setQueue, setHardMoments } = useSharedKnowledge();
  const salesOrders = useSalesOrders();
  const [askTab, setAskTab] = useState('ask');
  const [leaderTab, setLeaderTab] = useState('questions');
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState('kb-1');
  const [queueId, setQueueId] = useState(queue[0]?.id || null);
  const [replyDraft, setReplyDraft] = useState('');
  const [proposeSave, setProposeSave] = useState(null);
  const [hardType, setHardType] = useState('product');
  const [hardNote, setHardNote] = useState('');
  const [pendingAsk, setPendingAsk] = useState(null);
  const [customerCard, setCustomerCard] = useState(null);
  const [webCard, setWebCard] = useState(null);
  const [searchingWeb, setSearchingWeb] = useState(false);
  const [experiencePending, setExperiencePending] = useState(null);

  const myOrders = useMemo(
    () => salesOrders.filter((o) => o.seller === DEMO_SELLER),
    [salesOrders],
  );
  // Keep demo baseline (184.500) while reflecting newly sent / returned demo orders.
  const seedCommissionable = 23000 + 31200;
  const liveCommissionable = commissionableRevenue(DEMO_SELLER);
  const revenue = Math.max(0, sellerDemo.revenue - seedCommissionable + liveCommissionable);
  const pendingAmt = pendingRevenue(DEMO_SELLER);
  const returnsAmt = returnsTotal(DEMO_SELLER);
  const c = commissionFor(revenue);
  const next = nextTierFor(revenue);

  const visibleHistory = useMemo(() => {
    const list = role === 'seller' ? sellerVisibleEntries(entries, DEMO_SELLER_NAME) : entries;
    return [...list].sort((a, b) => (a.askedAt < b.askedAt ? 1 : -1));
  }, [entries, role]);

  const myQuestions = useMemo(
    () => entries.filter((e) => e.askedBy === DEMO_SELLER_NAME).sort((a, b) => (a.askedAt < b.askedAt ? 1 : -1)),
    [entries],
  );

  const approvedShared = useMemo(
    () => entries.filter((e) => e.status === 'approved' || e.sourceKind === 'approved' || e.sourceKind === 'product'),
    [entries],
  );

  const active = entries.find((e) => e.id === activeId) || visibleHistory[0];
  const queueItem = queue.find((q) => q.id === queueId) || queue[0];

  const ask = (text) => {
    const q = (text || query).trim();
    if (!q) return;
    setWebCard(null);
    setCustomerCard(null);
    setPendingAsk(null);
    setSearchingWeb(false);
    setAskTab('ask');

    const resolved = resolveAsk(q, entries);

    if (resolved.type === 'customer') {
      const id = `kb-cust-${Date.now()}`;
      const entry = {
        id,
        question: q,
        status: 'approved',
        sourceKind: 'customer',
        shortAnswer: `Anbefalinger til ${resolved.demo.customer.name} ud fra tidligere køb og aktuelle kampagner.`,
        sayToCustomer: null,
        detail: null,
        source: resolved.demo.sourceLabel,
        checkedAt: 'Live · kundedata',
        checkedBy: 'Nordic Tools CRM (demo)',
        product: 'Kundeassistent',
        askedBy: DEMO_SELLER_NAME,
        askedAt: 'Nu',
        visibility: 'private',
        customerDemo: resolved.demo,
      };
      setEntries((prev) => [entry, ...prev]);
      setActiveId(id);
      setCustomerCard(resolved.demo);
      setQuery(q);
      notify('Svar baseret på kundedata — ikke websøgning');
      return;
    }

    if (resolved.type === 'entry') {
      setActiveId(resolved.entry.id);
      setQuery(q);
      if (resolved.entry.customerDemo) setCustomerCard(resolved.entry.customerDemo);
      if (resolved.entry.webMeta) setWebCard(resolved.entry.webMeta);
      notify(
        resolved.entry.sourceKind === 'approved' || resolved.entry.status === 'approved'
          ? 'Godkendt intern viden fundet'
          : 'Svar fundet — tjek kildetype',
      );
      return;
    }

    const id = `kb-${Date.now()}`;
    const entry = {
      id,
      question: q,
      status: 'none',
      sourceKind: 'none',
      shortAnswer: null,
      sayToCustomer: null,
      detail: null,
      source: null,
      checkedAt: null,
      checkedBy: null,
      product: 'Ikke knyttet',
      askedBy: DEMO_SELLER_NAME,
      askedAt: 'Nu',
      expertQueue: false,
      visibility: 'private',
      allowWeb: resolved.allowWeb,
      webDemo: resolved.webDemo,
    };
    setEntries((prev) => [entry, ...prev]);
    setActiveId(id);
    setPendingAsk(entry);
    setQuery(q);
    notify(resolved.allowWeb ? 'Ingen intern viden — du kan søge på nettet' : 'Intet godkendt svar — send til Kevin');
  };

  const runWebSearch = (entry) => {
    const demo = entry?.webDemo || (webSearchDemo.match.test(entry?.question || query) ? webSearchDemo : null);
    if (!demo) {
      notify('Ingen prioriteret webkilde i denne demo');
      return;
    }
    setSearchingWeb(true);
    setPendingAsk(entry);
    window.setTimeout(() => {
      const webMeta = {
        ...demo,
        banner: 'Fundet på nettet – ikke godkendt af Nordic Tools',
      };
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entry.id
            ? {
                ...e,
                status: 'web',
                sourceKind: 'web',
                shortAnswer: demo.shortAnswer,
                sayToCustomer: null,
                detail: demo.priorityNote,
                source: `${demo.sourceTitle} · ${demo.sourceDomain}`,
                checkedAt: demo.lookedUpAt,
                checkedBy: 'Ekstern kilde',
                product: 'Generel viden',
                webMeta,
              }
            : e,
        ),
      );
      setWebCard(webMeta);
      setSearchingWeb(false);
      setPendingAsk(null);
      setActiveId(entry.id);
      notify('Websvar klar — ikke godkendt internt');
    }, 700);
  };

  const simulateVoiceAsk = () => {
    const sample = 'Hvad betyder INOX?';
    setQuery(sample);
    notify('Indtaling simuleret');
    ask(sample);
  };

  const sendToLeader = (entry, assignee = 'kevin') => {
    if (!entry) return;
    const existing = queue.find((q) => q.knowledgeId === entry.id && (q.status === 'open' || q.status === 'new'));
    if (existing) {
      notify('Spørgsmålet er allerede sendt');
      return;
    }
    const id = `eq-${Date.now()}`;
    const item = {
      id,
      question: entry.question,
      product: entry.product,
      asker: entry.askedBy || DEMO_SELLER_NAME,
      askedAt: 'Nu',
      assignee,
      status: 'new',
      context:
        entry.sourceKind === 'web'
          ? 'Sendt med eksternt websvar til godkendelse'
          : 'Sendt fra Spørg LeadOS',
      answerDraft: entry.sourceKind === 'web' ? entry.shortAnswer || '' : '',
      knowledgeId: entry.id,
      leaderNote: null,
      webMeta: entry.webMeta || null,
    };
    setQueue((prev) => [item, ...prev]);
    setEntries((prev) => prev.map((e) => (e.id === entry.id ? { ...e, expertQueue: true } : e)));
    notify(`Sendt til ${knowledgeExperts.find((x) => x.id === assignee)?.name || 'Kevin'}`);
  };

  const submitQueueAnswer = () => {
    if (!queueItem || !replyDraft.trim()) return;
    const text = replyDraft.trim();
    const name = knowledgeExperts.find((x) => x.id === queueItem.assignee)?.name || 'Kevin';
    setProposeSave({
      queueId: queueItem.id,
      knowledgeId: queueItem.knowledgeId,
      question: queueItem.question,
      product: queueItem.product,
      answer: text,
      expertName: name,
    });
    setQueue((prev) =>
      prev.map((q) =>
        q.id === queueItem.id ? { ...q, status: 'ready', answerDraft: text } : q,
      ),
    );
    setReplyDraft('');
    notify('Svar klar til godkendelse');
  };

  const simulateVoiceReply = () => {
    setReplyDraft(
      'Leveringstid på den skaffevare er typisk 8–12 arbejdsdage fra bestilling, forudsat leverandøren har dækning. Bekræft altid med indkøb før du lover kunden en dato.',
    );
    notify('Indtaling simuleret');
  };

  const approveToBank = () => {
    if (!proposeSave) return;
    const { knowledgeId, product, answer, expertName, queueId: qid } = proposeSave;
    setEntries((prev) =>
      prev.map((e) =>
        e.id === knowledgeId
          ? {
              ...e,
              status: 'approved',
              sourceKind: 'approved',
              shortAnswer: answer,
              sayToCustomer: answer,
              detail: 'Godkendt svar. Nu fælles intern viden.',
              source: `Godkendt svar · ${expertName}`,
              checkedAt: '2. aug 2026',
              checkedBy: expertName,
              product,
              expertQueue: false,
              visibility: 'shared',
              webMeta: undefined,
            }
          : e,
      ),
    );
    if (qid) {
      setQueue((prev) => prev.map((q) => (q.id === qid ? { ...q, status: 'saved' } : q)));
    }
    setActiveId(knowledgeId);
    setProposeSave(null);
    setWebCard(null);
    notify('Tilføjet til vidensbanken');
  };

  const approveWebToBank = (entry) => {
    if (!entry?.webMeta) return;
    setProposeSave({
      queueId: null,
      knowledgeId: entry.id,
      question: entry.question,
      product: entry.product || 'Generel viden',
      answer: entry.shortAnswer,
      expertName: 'Kevin',
    });
    sendToLeader(entry, 'kevin');
    notify('Websvar sendt til Kevin til godkendelse');
  };

  const saveHardMoment = () => {
    if (!hardNote.trim()) return;
    const type = difficultyTypes.find((d) => d.id === hardType);
    const item = {
      id: `hm-${Date.now()}`,
      type: hardType,
      label: type?.label || 'Note',
      note: hardNote.trim(),
      product: active?.product || 'Ukendt',
      at: 'Nu',
    };
    setHardMoments((prev) => [item, ...prev]);

    if (hardType === 'experience') {
      setExperiencePending(item);
      setHardNote('');
      notify('Erfaring gemt — kan sendes til Kevin');
      return;
    }

    if (hardType === 'product' || hardType === 'hard-product') {
      const id = `kb-${Date.now()}`;
      const entry = {
        id,
        question: hardNote.trim(),
        status: 'none',
        sourceKind: 'none',
        shortAnswer: null,
        product: 'Efter samtale',
        askedBy: DEMO_SELLER_NAME,
        askedAt: 'Nu',
        visibility: 'private',
      };
      setEntries((prev) => [entry, ...prev]);
      sendToLeader(entry, 'kevin');
    }

    setHardNote('');
    notify('Gemt — du får hjælp til næste gang');
  };

  const sendExperienceToKevin = () => {
    if (!experiencePending) return;
    notify('Sendt til Kevin — klar til “Godkend som fælles erfaring”');
    setExperiencePending(null);
  };

  const selectHistory = (e) => {
    setActiveId(e.id);
    setCustomerCard(e.customerDemo || null);
    setWebCard(e.webMeta || null);
    setPendingAsk(e.status === 'none' ? e : null);
    setAskTab('ask');
  };

  /* ─── Leader: Vidensbank ─── */
  if (section === 'knowledge-bank' && role === 'leader') {
    return (
      <div className="content seller-view">
        <div className="people-intro" style={{ marginBottom: 18 }}>
          <div>
            <span className="kicker">VIDENSBANK</span>
            <h2 style={{ fontSize: 26, margin: '6px 0' }}>Spørgsmål fra sælgerne</h2>
            <p>
              Besvar det, sælgerne mangler i samtalen – og gør de bedste svar til fælles viden.
            </p>
          </div>
        </div>

        <div className="toolbar">
          <div className="tabs">
            {[
              ['questions', 'Spørgsmål fra sælgerne'],
              ['approved', 'Godkendte svar'],
              ['gaps', 'Videnshuller'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={leaderTab === id ? 'active' : ''}
                onClick={() => setLeaderTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="muted">
            {queue.filter((q) => q.status === 'open' || q.status === 'new').length} afventer svar
          </span>
        </div>

        {leaderTab === 'questions' && (
          <div className="kb-layout">
            <aside className="kb-history card">
              <span className="kicker">SPØRGSMÅL FRA SÆLGERNE</span>
              <div className="kb-history-list">
                {queue.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    className={`kb-history-item ${q.id === queueItem?.id ? 'active' : ''}`}
                    onClick={() => {
                      setQueueId(q.id);
                      setProposeSave(null);
                    }}
                  >
                    <small>
                      {q.asker} · til {knowledgeExperts.find((x) => x.id === q.assignee)?.name}
                    </small>
                    <b>{q.question}</b>
                    <span className={`kb-status ${q.status === 'saved' ? 'approved' : q.status === 'ready' ? 'ai' : 'none'}`}>
                      {queueLabel(q.status)}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <section className="card kb-answer">
              {queueItem ? (
                <>
                  <span className="kicker">BESVAR SPØRGSMÅL</span>
                  <h3 style={{ fontSize: 22, margin: '6px 0 8px' }}>{queueItem.question}</h3>
                  <div className="context-grid" style={{ marginBottom: 12 }}>
                    <div>
                      <small>Produkt</small>
                      <b>{queueItem.product}</b>
                    </div>
                    <div>
                      <small>Sælger</small>
                      <b>{queueItem.asker}</b>
                    </div>
                    <div>
                      <small>Besvares af</small>
                      <b>{knowledgeExperts.find((x) => x.id === queueItem.assignee)?.name}</b>
                    </div>
                    <div>
                      <small>Status</small>
                      <b>{queueLabel(queueItem.status)}</b>
                    </div>
                  </div>
                  <p className="muted" style={{ fontSize: 11 }}>
                    {queueItem.context}
                  </p>
                  {queueItem.leaderNote && (
                    <div className="kb-leader-note">
                      <small>INTERN KOMMENTAR</small>
                      <p>{queueItem.leaderNote}</p>
                    </div>
                  )}
                  {queueItem.webMeta && (
                    <div className="kb-web-banner" style={{ marginTop: 12 }}>
                      {queueItem.webMeta.banner}
                    </div>
                  )}

                  {(queueItem.status === 'open' || queueItem.status === 'new') && (
                    <div className="composer" style={{ border: 0, padding: '14px 0 0' }}>
                      <textarea
                        value={replyDraft}
                        onChange={(e) => setReplyDraft(e.target.value)}
                        placeholder="Skriv et kort, sikkert svar — eller indtal…"
                        aria-label="Svar til sælger"
                      />
                      <div className="composer-actions">
                        <button type="button" className="primary" onClick={submitQueueAnswer}>
                          Send svar
                        </button>
                        <button type="button" className="voice-btn" onClick={simulateVoiceReply}>
                          ● Indtal svar
                        </button>
                        <select
                          value={queueItem.assignee}
                          onChange={(e) =>
                            setQueue((prev) =>
                              prev.map((q) => (q.id === queueItem.id ? { ...q, assignee: e.target.value } : q)),
                            )
                          }
                          aria-label="Besvares af"
                        >
                          {knowledgeExperts.map((x) => (
                            <option key={x.id} value={x.id}>
                              {x.name} · {x.role}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {proposeSave && proposeSave.queueId === queueItem.id && (
                    <div className="kb-propose">
                      <span className="kicker">LEAD OS FORSLÅR</span>
                      <h3 style={{ fontSize: 18, margin: '6px 0' }}>Tilføj dette til vidensbanken?</h3>
                      <p className="insight-copy" style={{ marginBottom: 12 }}>
                        {proposeSave.answer}
                      </p>
                      <div className="rule-actions">
                        <button type="button" className="primary" onClick={approveToBank}>
                          Godkend og gem
                        </button>
                        <button type="button" className="secondary" onClick={() => setProposeSave(null)}>
                          Ikke nu
                        </button>
                      </div>
                    </div>
                  )}

                  {queueItem.status === 'saved' && (
                    <p className="muted" style={{ marginTop: 14, fontSize: 11 }}>
                      Svaret er tilføjet til vidensbanken og synligt for relevante sælgere.
                    </p>
                  )}
                </>
              ) : (
                <p className="muted">Ingen åbne spørgsmål.</p>
              )}
            </section>
          </div>
        )}

        {leaderTab === 'approved' && (
          <div className="kb-layout">
            <aside className="kb-history card">
              <span className="kicker">GODKENDTE SVAR</span>
              <div className="kb-history-list">
                {approvedShared.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    className={`kb-history-item ${e.id === active?.id ? 'active' : ''}`}
                    onClick={() => selectHistory(e)}
                  >
                    <small>{sourceLabelFor(e)}</small>
                    <b>{e.question}</b>
                    <span className="kb-status approved">Tilføjet til vidensbanken</span>
                  </button>
                ))}
              </div>
            </aside>
            <section className="kb-answer card">
              {active && (
                <AnswerCard
                  entry={active}
                  customerCard={active.customerDemo}
                  webCard={active.webMeta}
                  searchingWeb={false}
                  pendingAsk={null}
                  onSendToLeader={sendToLeader}
                  onWebSearch={runWebSearch}
                  onApproveWeb={approveWebToBank}
                />
              )}
            </section>
          </div>
        )}

        {leaderTab === 'gaps' && (
          <article className="card">
            <span className="kicker">VIDENSHULLER</span>
            <h3 style={{ fontSize: 20, margin: '8px 0 14px' }}>Hvor sælgere mangler sikre svar</h3>
            <div className="kb-leader-signal">
              <p>{leaderKnowledgeInsights.trainingSuggestion.signal}</p>
              <small>Foreslået handling: {leaderKnowledgeInsights.trainingSuggestion.action}</small>
            </div>
            <div className="decision-panels" style={{ marginBottom: 0 }}>
              <div>
                <span className="kicker">HYPPIGSTE SPØRGSMÅL</span>
                {leaderKnowledgeInsights.topQuestions.map((q) => (
                  <div className="list-row" key={q.question}>
                    <div>
                      <b>{q.question}</b>
                      <p>
                        {q.count} gange · seneste {q.days} dage
                      </p>
                    </div>
                    <span className="status-pill awaiting">{q.count}×</span>
                  </div>
                ))}
              </div>
              <div>
                <span className="kicker">HULLER · INDVENDINGER</span>
                {leaderKnowledgeInsights.productGaps.map((g) => (
                  <div className="list-row" key={g.product}>
                    <div>
                      <b>{g.product}</b>
                      <p>Flest videnshuller</p>
                    </div>
                    <span className="muted">{g.gaps}</span>
                  </div>
                ))}
                {leaderKnowledgeInsights.objections.map((o) => (
                  <div className="list-row" key={o.text}>
                    <div>
                      <b>{o.text}</b>
                      <p>Gentagen kundeindvending</p>
                    </div>
                    <span className="muted">{o.count}×</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}
      </div>
    );
  }

  /* ─── Seller: Mit cockpit ─── */
  if (section === 'seller-cockpit') {
    return (
      <div className="content seller-view">
        <div className="seller-hero">
          <div>
            <span className="kicker">{sellerDemo.name.toUpperCase()} · MIT COCKPIT</span>
            <h2>Du er {next ? money(next.threshold - revenue) : 'på toptrinnet'} fra næste provisionstrin</h2>
            <p>Kun ordrer med status Sendt tæller i provisionsgivende omsætning.</p>
            <button
              type="button"
              className="primary"
              style={{ marginTop: 14, background: '#e7eadf', color: '#263a30', borderColor: '#e7eadf' }}
              onClick={onRegisterSale}
            >
              + Registrér salg
            </button>
          </div>
          <div className="seller-rate">
            <small>NUVÆRENDE SATS</small>
            <strong>{c.rate * 100}%</strong>
          </div>
        </div>

        <div className="metric-grid">
          <CommercialMetric
            label="ESTIMERET PROVISION"
            value={money(Math.round(c.amount))}
            delta={`${c.rate * 100}% sats`}
            note="Live estimat"
          />
          <CommercialMetric
            label="PROVISIONSGIVENDE OMSÆTNING"
            value={money(revenue)}
            delta={next ? `${money(next.threshold - revenue)} til næste trin` : 'Toptrin'}
            note="Kun sendte ordrer"
          />
          <CommercialMetric
            label="AFVENTENDE OMSÆTNING"
            value={money(pendingAmt || sellerDemo.pendingRevenue)}
            delta="Ikke sendt endnu"
            note="Tæller ikke endnu"
          />
          <CommercialMetric
            label="RETURNERINGER / KORREKTIONER"
            value={money(returnsAmt || sellerDemo.returns)}
            delta="Trukket fra"
            note="Returneret / annulleret"
          />
        </div>

        <article className="card tier-journey">
          <div className="card-head">
            <div>
              <span className="kicker">DIN PROVISIONSTRAPPE</span>
              <h3>Beløb til næste trin</h3>
            </div>
            <span className="pill">
              {next ? `${money(next.threshold - revenue)} til ${next.rate * 100}%` : 'Toptrin'}
            </span>
          </div>
          <div className="tier-track">
            <i style={{ width: `${Math.min(100, (revenue / 300000) * 100)}%` }} />
            <span style={{ left: '25%' }}>75k</span>
            <span style={{ left: '66.6%' }}>200k · 10%</span>
            <span style={{ left: '100%' }}>300k · 15%</span>
          </div>
          <p>Når 200.000 kr. er passeret, beregnes 10% af hele den kvalificerende omsætning.</p>
        </article>

        <div className="metric-grid">
          <CommercialMetric label="I DAG" value={money(sellerDemo.today)} delta={`${sellerDemo.todayOrders} ordrer`} note="sendt" />
          <CommercialMetric label="DENNE UGE" value={money(sellerDemo.week)} delta={money(sellerDemo.avgOrder)} note="gns. ordre" />
          <CommercialMetric
            label="DENNE MÅNED"
            value={money(revenue)}
            delta={`${((revenue / sellerDemo.monthTarget) * 100).toFixed(1).replace('.', ',')}% af mål`}
            note={money(sellerDemo.monthTarget)}
          />
          <CommercialMetric label="PLACERING" value={sellerDemo.rank} delta="Team" note="" />
        </div>
      </div>
    );
  }

  /* ─── Seller: Mine salg ─── */
  if (section === 'seller-sales') {
    const registered = myOrders.reduce((s, o) => s + (o.amount > 0 ? o.amount : 0), 0);
    const approved = myOrders
      .filter(
        (o) =>
          ['Godkendt', 'Klar til lager', 'Afventer afsendelse', 'Sendt'].includes(o.status) && o.amount > 0,
      )
      .reduce((s, o) => s + o.amount, 0);
    const commissionable = myOrders.filter((o) => o.countsForCommission).reduce((s, o) => s + o.amount, 0);

    return (
      <div className="content seller-view">
        <div className="toolbar" style={{ alignItems: 'center' }}>
          <div>
            <span className="kicker">MINE SALG</span>
            <h2 style={{ fontSize: 24, marginTop: 6 }}>Dine registrerede ordrer</h2>
          </div>
          <button type="button" className="primary" onClick={onRegisterSale}>
            + Registrér salg
          </button>
        </div>

        <div className="metric-grid">
          <CommercialMetric label="REGISTRERET SALG" value={money(registered)} delta="Alle positive ordrer" note="" />
          <CommercialMetric label="GODKENDT SALG" value={money(approved)} delta="Godkendt eller længere" note="" />
          <CommercialMetric label="PROVISIONSGIVENDE" value={money(commissionable)} delta="Kun status Sendt" note="" />
        </div>

        <article className="card table-card">
          <p className="muted" style={{ fontSize: 11, margin: '0 0 14px' }}>
            Kun status <b>Sendt</b> tæller med i den provisionsgivende omsætning.
          </p>
          <table>
            <thead>
              <tr>
                <th>ORDRE</th>
                <th>KUNDE</th>
                <th>SALGSTYPE</th>
                <th>DATO</th>
                <th>BELØB</th>
                <th>STATUS</th>
                <th>PROVISION</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o) => {
                const company = typeof o.customer === 'string' ? o.customer : o.customer?.company;
                const salesType =
                  (typeof o.customer === 'object' && o.customer?.salesType) || 'Gensalg';
                return (
                  <tr key={o.id}>
                    <td>
                      <b>{o.id}</b>
                    </td>
                    <td>{company}</td>
                    <td>{salesType}</td>
                    <td>{o.registeredAt}</td>
                    <td className={o.amount < 0 ? 'negative' : ''}>{money(o.amount)}</td>
                    <td>
                      <span className={`pill ${statusPillClass(o.status)}`}>{o.status}</span>
                    </td>
                    <td>
                      {o.countsForCommission ? (
                        <span className="pill">Tæller med</span>
                      ) : (
                        <span className="muted" style={{ fontSize: 10 }}>
                          {o.reason || 'Tæller ikke'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {myOrders.some((o) => o.status === 'Skal rettes' && o.leaderMessage) && (
            <div className="reg-flag" style={{ marginTop: 16 }}>
              <b>Besked fra Michael</b>
              {myOrders
                .filter((o) => o.status === 'Skal rettes' && o.leaderMessage)
                .map((o) => (
                  <p key={o.id}>
                    <b>{o.id}:</b> {o.leaderMessage}
                  </p>
                ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 12 }}>
            <p className="muted" style={{ fontSize: 10, margin: 0 }}>
              Ordrestatus kan senere synkroniseres med Nordic Tools’ ordre- eller økonomisystem.
            </p>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                resetSalesOrdersDemo();
                notify('Demoens salgsdata er nulstillet');
              }}
            >
              Nulstil demodata
            </button>
          </div>
        </article>
      </div>
    );
  }

  /* ─── Seller: Spørg LeadOS ─── */
  return (
    <div className="content seller-view">
      <div className="toolbar">
        <div className="tabs">
          {[
            ['ask', 'Spørg nu'],
            ['mine', 'Mine spørgsmål'],
            ['after', 'Efter samtalen'],
          ].map(([id, label]) => (
            <button key={id} type="button" className={askTab === id ? 'active' : ''} onClick={() => setAskTab(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {askTab === 'ask' && (
        <>
          <section className="kb-ask card">
            <span className="kicker">SPØRG LEADOS · MENS KUNDEN ER I RØRET</span>
            <h2>Spørg nu</h2>
            <p className="muted" style={{ margin: '6px 0 14px', fontSize: 12 }}>
              Få et hurtigt, kildebaseret svar, mens du taler med kunden.
            </p>
            <div className="kb-ask-row">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && ask()}
                placeholder="Hvad vil du vide?"
                aria-label="Hvad vil du vide?"
              />
              <button type="button" className="primary" onClick={() => ask()}>
                Spørg
              </button>
              <button type="button" className="voice-btn" onClick={simulateVoiceAsk}>
                ● Indtal
              </button>
            </div>
            <div className="kb-chips">
              {recentQuestions.map((q) => (
                <button key={q} type="button" className="kb-chip" onClick={() => ask(q)}>
                  {q}
                </button>
              ))}
            </div>
          </section>

          <div className="kb-layout">
            <aside className="kb-history card">
              <span className="kicker">SENESTE · SYNLIGE FOR DIG</span>
              <div className="kb-history-list">
                {visibleHistory.slice(0, 8).map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    className={`kb-history-item ${e.id === active?.id ? 'active' : ''}`}
                    onClick={() => selectHistory(e)}
                  >
                    <small>{sourceLabelFor(e)}</small>
                    <b>{e.question}</b>
                    <span className={(statusMeta[e.status] || statusMeta.none).className}>
                      {(statusMeta[e.status] || statusMeta.none).label}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <section className="kb-answer card">
              {active && (
                <AnswerCard
                  entry={active}
                  customerCard={active.customerDemo || customerCard}
                  webCard={active.webMeta || webCard}
                  searchingWeb={searchingWeb && pendingAsk?.id === active.id}
                  pendingAsk={pendingAsk?.id === active.id ? pendingAsk : active.status === 'none' ? active : null}
                  onSendToLeader={sendToLeader}
                  onWebSearch={runWebSearch}
                  onApproveWeb={approveWebToBank}
                />
              )}
            </section>
          </div>
        </>
      )}

      {askTab === 'mine' && (
        <div className="kb-layout">
          <aside className="kb-history card">
            <span className="kicker">MINE SPØRGSMÅL</span>
            <div className="kb-history-list">
              {myQuestions.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  className={`kb-history-item ${e.id === active?.id ? 'active' : ''}`}
                  onClick={() => selectHistory(e)}
                >
                  <small>{e.product}</small>
                  <b>{e.question}</b>
                  <span className={(statusMeta[e.status] || statusMeta.none).className}>
                    {(statusMeta[e.status] || statusMeta.none).label}
                  </span>
                </button>
              ))}
            </div>
            <span className="kicker" style={{ display: 'block', marginTop: 18 }}>
              FÆLLES GODKENDTE
            </span>
            <div className="kb-history-list">
              {visibleHistory
                .filter((e) => e.status === 'approved' && e.askedBy !== DEMO_SELLER_NAME)
                .map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    className={`kb-history-item ${e.id === active?.id ? 'active' : ''}`}
                    onClick={() => selectHistory(e)}
                  >
                    <small>{e.product}</small>
                    <b>{e.question}</b>
                    <span className="kb-status approved">Godkendt intern viden</span>
                  </button>
                ))}
            </div>
          </aside>
          <section className="kb-answer card">
            {active && (
              <AnswerCard
                entry={active}
                customerCard={active.customerDemo || customerCard}
                webCard={active.webMeta || webCard}
                searchingWeb={false}
                pendingAsk={null}
                onSendToLeader={sendToLeader}
                onWebSearch={runWebSearch}
                onApproveWeb={approveWebToBank}
              />
            )}
          </section>
        </div>
      )}

      {askTab === 'after' && (
        <article className="card kb-hard">
          <div className="card-head">
            <div>
              <span className="kicker">EFTER SAMTALEN</span>
              <h3>Gem det, du manglede et svar på</h3>
            </div>
          </div>
          <p className="muted" style={{ fontSize: 12, margin: '0 0 14px', lineHeight: 1.5 }}>
            Notér spørgsmålet, indvendingen eller erfaringen fra samtalen. Du får hjælp til næste gang, og et
            godkendt svar kan bagefter deles med hele teamet.
          </p>
          <div className="kb-hard-form">
            <select value={hardType} onChange={(e) => setHardType(e.target.value)} aria-label="Hvad handlede det om?">
              {difficultyTypes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
            <input
              value={hardNote}
              onChange={(e) => setHardNote(e.target.value)}
              placeholder="Hvad spurgte kunden om – eller hvad ville du gerne have svaret bedre på?"
              aria-label="Note fra samtalen"
            />
            <button type="button" className="primary" onClick={saveHardMoment}>
              Gem og få hjælp
            </button>
          </div>

          {experiencePending && (
            <div className="kb-propose" style={{ marginTop: 14 }}>
              <span className="kicker">ERFARING, DER VIRKEDE</span>
              <p className="insight-copy" style={{ margin: '8px 0 12px' }}>
                {experiencePending.note}
              </p>
              <div className="rule-actions">
                <button type="button" className="primary" onClick={sendExperienceToKevin}>
                  Send til Kevin
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    sendExperienceToKevin();
                    notify('Kevin kan godkende som fælles erfaring');
                  }}
                >
                  Godkend som fælles erfaring
                </button>
                <button type="button" className="secondary" onClick={() => setExperiencePending(null)}>
                  Ikke nu
                </button>
              </div>
            </div>
          )}

          <div className="kb-hard-list">
            {hardMoments.map((h) => (
              <div className="kb-hard-row" key={h.id}>
                <span>
                  <b>{h.label}</b>
                  <small>
                    {h.product} · {h.at}
                  </small>
                </span>
                <p>{h.note}</p>
              </div>
            ))}
          </div>
        </article>
      )}
    </div>
  );
}

function SourceBadge({ kind, label }) {
  return <span className={`kb-source-badge kind-${kind || 'none'}`}>{label || SOURCE_LABELS.none}</span>;
}

function AnswerCard({
  entry,
  customerCard,
  webCard,
  searchingWeb,
  pendingAsk,
  onSendToLeader,
  onWebSearch,
  onApproveWeb,
}) {
  if (customerCard || entry.customerDemo) {
    const demo = customerCard || entry.customerDemo || customerAssistDemo;
    return (
      <>
        <div className="card-head">
          <div>
            <span className="kicker">{demo.customer.name}</span>
            <h3 style={{ fontSize: 22, marginTop: 6 }}>{entry.question}</h3>
          </div>
          <SourceBadge kind="customer" label={SOURCE_LABELS.customer} />
        </div>
        <div className="kb-source-banner customer">{demo.sourceLabel}</div>
        <div className="kb-block">
          <small>KUNDETYPE</small>
          <p>
            {demo.customer.type} · {demo.customer.contact}
          </p>
        </div>
        <div className="kb-block">
          <small>TIDLIGERE KØB</small>
          <ul className="kb-bullets">
            {demo.previousPurchases.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="kb-block">
          <small>ANBEFALEDE PRODUKTER · HVORFOR</small>
          {demo.recommendations.map((r) => (
            <div className="kb-reco" key={r.product}>
              <b>{r.product}</b>
              <p>{r.why}</p>
            </div>
          ))}
        </div>
        <div className="kb-block">
          <small>KAMPAGNER / BONUS</small>
          {demo.campaigns.map((c) => (
            <p key={c.name} style={{ marginBottom: 6 }}>
              <b>{c.name}</b> — {c.detail}
            </p>
          ))}
        </div>
        <div className="kb-block">
          <small>IKKE KØBT FØR</small>
          <p>{demo.notBought.join(' · ')}</p>
        </div>
        <p className="muted" style={{ fontSize: 10, marginTop: 12 }}>
          Kundespørgsmål sendes ikke til almindelig websøgning.
        </p>
      </>
    );
  }

  if (searchingWeb) {
    return (
      <>
        <span className="kicker">SØGER UDEN FOR VIRKSOMHEDENS VIDENSBANK</span>
        <h3 style={{ fontSize: 22, margin: '6px 0 10px' }}>{entry.question}</h3>
        <div className="kb-web-searching">
          <p>Lead OS leder på nettet efter officielle kilder…</p>
          <small>Producent · datablade · myndigheder — ikke tilfældige fora</small>
        </div>
      </>
    );
  }

  if (webCard || entry.sourceKind === 'web') {
    const web = webCard || entry.webMeta || webSearchDemo;
    return (
      <>
        <div className="card-head">
          <div>
            <span className="kicker">EKSTERN KILDE</span>
            <h3 style={{ fontSize: 22, marginTop: 6 }}>{entry.question}</h3>
          </div>
          <SourceBadge kind="web" label={SOURCE_LABELS.web} />
        </div>
        <div className="kb-web-banner">{web.banner || 'Fundet på nettet – ikke godkendt af Nordic Tools'}</div>
        <div className="kb-block">
          <small>KORT SVAR</small>
          <p className="kb-short">{entry.shortAnswer || web.shortAnswer}</p>
        </div>
        <div className="kb-meta">
          <div>
            <small>KILDE</small>
            <b>{web.sourceTitle}</b>
          </div>
          <div>
            <small>DOMÆNE</small>
            <b>{web.sourceDomain}</b>
          </div>
          <div>
            <small>OPSLAG</small>
            <b>{web.lookedUpAt}</b>
          </div>
        </div>
        <div className="kb-meta" style={{ borderTop: 0, paddingTop: 0 }}>
          <div>
            <small>SIKKERHEDSNIVEAU</small>
            <b>{web.safetyLevel}</b>
          </div>
          <div>
            <small>GRUNDLAG</small>
            <b>{SOURCE_LABELS.web}</b>
          </div>
          <div>
            <small>ÅBN KILDE</small>
            <a className="kb-source-link" href={web.sourceUrl} target="_blank" rel="noreferrer">
              {web.sourceDomain} ↗
            </a>
          </div>
        </div>
        <div className="rule-actions" style={{ marginTop: 16 }}>
          <button type="button" className="primary" onClick={() => onSendToLeader(entry, 'kevin')}>
            Send til Kevin
          </button>
          <button type="button" className="secondary" onClick={() => onApproveWeb(entry)}>
            Få godkendt og gem internt
          </button>
        </div>
      </>
    );
  }

  const meta = statusMeta[entry.status] || statusMeta.none;
  const sourceKind =
    entry.sourceKind || (entry.status === 'approved' ? 'approved' : entry.status === 'ai' ? 'ai' : 'none');

  if (entry.status === 'none' || !entry.shortAnswer) {
    const allowWeb = entry.allowWeb || webSearchDemo.match.test(entry.question);
    return (
      <>
        <span className="kicker">{entry.product}</span>
        <h3 style={{ fontSize: 22, margin: '6px 0 10px' }}>{entry.question}</h3>
        <SourceBadge kind="none" label={SOURCE_LABELS.none} />
        <div className="kb-empty">
          <p>Ingen godkendt intern viden, produktdata eller tidligere godkendte svar.</p>
          <small>
            Lead OS gætter ikke. Du kan sende til Kevin
            {allowWeb ? ' — eller søge på nettet med synlig mærkning.' : '.'}
          </small>
          <div className="kb-search-steps">
            <span>1. Intern vidensbank</span>
            <span>2. Produktkatalog</span>
            <span>3. Kundedata</span>
            <span>4. Tidligere godkendte svar</span>
            <span className="miss">Ingen træf</span>
          </div>
          <div className="rule-actions" style={{ marginTop: 12 }}>
            {allowWeb && (
              <button type="button" className="primary" onClick={() => onWebSearch(pendingAsk || entry)}>
                Søg på nettet
              </button>
            )}
            <button type="button" className="secondary" onClick={() => onSendToLeader(entry, 'kevin')}>
              Send til Kevin
            </button>
            <button type="button" className="secondary" onClick={() => onSendToLeader(entry, 'produkt')}>
              Send til produktansvarlig
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="card-head">
        <div>
          <span className="kicker">{entry.product}</span>
          <h3 style={{ fontSize: 22, marginTop: 6 }}>{entry.question}</h3>
        </div>
        <SourceBadge kind={sourceKind} label={sourceLabelFor(entry)} />
      </div>

      <div className="kb-block">
        <small>1 · KORT SVAR</small>
        <p className="kb-short">{entry.shortAnswer}</p>
      </div>

      {entry.sayToCustomer && (
        <div className="kb-block">
          <small>2 · SÅDAN KAN DU SIGE DET TIL KUNDEN</small>
          <p className="kb-say">“{entry.sayToCustomer}”</p>
        </div>
      )}

      {entry.detail && (
        <div className="kb-block">
          <small>3 · UDDYBNING</small>
          <p>{entry.detail}</p>
        </div>
      )}

      <div className="kb-meta">
        <div>
          <small>4 · KILDE</small>
          <b>{entry.source || '—'}</b>
        </div>
        <div>
          <small>5 · GRUNDLAG</small>
          <b>{sourceLabelFor(entry)}</b>
        </div>
        <div>
          <small>6 · SENEST KONTROLLERET</small>
          <b>
            {entry.checkedAt || '—'}
            {entry.checkedBy && entry.checkedBy !== '—' ? ` · ${entry.checkedBy}` : ''}
          </b>
        </div>
      </div>

      {entry.status === 'ai' && (
        <div className="kb-empty" style={{ marginTop: 14 }}>
          <p>Dette er et AI-forslag — ikke godkendt intern viden.</p>
          <small>Brug det ikke som faktum over for kunden, før det er godkendt.</small>
          <div className="rule-actions" style={{ marginTop: 12 }}>
            <button type="button" className="primary" onClick={() => onSendToLeader(entry, 'michael')}>
              Send til Michael
            </button>
          </div>
        </div>
      )}
    </>
  );
}
