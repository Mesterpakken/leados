export const knowledgeExperts = [
  { id: 'kevin', name: 'Kevin', role: 'Salgsleder' },
  { id: 'michael', name: 'Michael', role: 'Beslutningsejer' },
  { id: 'mathias', name: 'Mathias', role: 'Rådgiver' },
  { id: 'produkt', name: 'Produktansvarlig', role: 'Produkt' },
];

/** Demo seller identity — filters private questions */
export const DEMO_SELLER_NAME = 'Christian';

export const SOURCE_LABELS = {
  approved: 'Godkendt intern viden',
  product: 'Produktdata',
  customer: 'Kundedata',
  decision: 'Tidligere beslutning',
  web: 'Fundet på nettet',
  ai: 'AI-forslag',
  expert: 'Ekspertsvar',
  none: 'Intet sikkert svar',
};

export const recentQuestions = [
  'Hvad betyder INOX?',
  'Hvad kan jeg sælge til Alexis?',
  'Kan denne maskine anvendes på rustfrit stål?',
  'Hvad er forskellen på de to slibeskiver?',
  'Hvad skal jeg fremhæve over for en kunde, der synes, produktet er for dyrt?',
];

export const difficultyTypes = [
  { id: 'product', label: 'Produktspørgsmål' },
  { id: 'objection', label: 'Kundeindvending' },
  { id: 'hard-product', label: 'Produkt svært at forklare' },
  { id: 'competitor', label: 'Konkurrent nævnt' },
  { id: 'market', label: 'Markedsobservation' },
  { id: 'experience', label: 'Erfaring, der virkede' },
  { id: 'other', label: 'Andet' },
];

export const queueStatusLabels = {
  new: 'Nyt',
  open: 'Afventer svar',
  answered: 'Besvaret',
  ready: 'Klar til godkendelse',
  saved: 'Tilføjet til vidensbanken',
};

/** Hardcoded web result for INOX demo — not a real search */
export const webSearchDemo = {
  id: 'web-inox',
  match: /inox|rustfrit|stainless/i,
  question: 'Hvad betyder INOX?',
  shortAnswer:
    'INOX er en forkortelse for inoxydable (fransk for “rustfrit”). Det bruges om rustfrit stål og produkter beregnet til arbejde i rustfrit uden at forurene overfladen.',
  sourceTitle: 'World Steel Association — Stainless steel overview',
  sourceDomain: 'worldsteel.org',
  sourceUrl: 'https://worldsteel.org/',
  lookedUpAt: '2. aug 2026',
  safetyLevel: 'Lav risiko · generel definition · ikke produktspecifik',
  priorityNote: 'Officiel branchesource prioriteret frem for fora.',
};

/** Customer-specific assistant — never routed to web search */
export const customerAssistDemo = {
  id: 'cust-alexis',
  match: /alexis/i,
  question: 'Hvad kan jeg sælge til Alexis?',
  customer: {
    name: 'Alexis Maskinfabrik A/S',
    type: 'Industri · metalbearbejdning',
    contact: 'Alexis · indkøb',
  },
  previousPurchases: [
    'NT-Angle 125 (2 stk)',
    'Slibeskiver A36 · 50-pak',
    'Sikkerhedsbriller NT-Vision',
  ],
  categories: ['Vinkelslibere', 'Slibeskiver', 'PPE'],
  notBought: ['Kemikaliehandsker', 'Målebånd / precisionsværktøj', 'Batteriplatform NT-Pro 18V'],
  campaigns: [
    { name: 'Inox-skiver Q3', detail: 'A60S 10+2 gratis ved køb før 15. aug' },
    { name: 'Bonusvare', detail: 'NT-ChemGuard prøvepakke ved ordrer over 8.000 kr.' },
  ],
  recommendations: [
    {
      product: 'Slibeskiver A60S (Inox)',
      why: 'Alexis køber allerede A36 til grovslibning — A60S matcher rustfrit-finish på samme maskiner.',
    },
    {
      product: 'NT-ChemGuard handsker',
      why: 'Ikke købt før. Kundetype metalbearbejdning bruger ofte kemisk rengøring — kampagne gør det let at prøve.',
    },
    {
      product: 'NT-Pro 18V startpakke',
      why: 'De kører primært ledning. Batteriplatform åbner mersalg på tilbehør de ikke har i sortimentet endnu.',
    },
  ],
  sourceKind: 'customer',
  sourceLabel: 'Baseret på Nordic Tools’ kundedata',
};

export const initialKnowledgeEntries = [
  {
    id: 'kb-1',
    question: 'Kan denne maskine anvendes på rustfrit stål?',
    status: 'approved',
    sourceKind: 'approved',
    shortAnswer:
      'Ja — NT-Angle 125 er godkendt til rustfrit stål, når du bruger den rigtige skive og holder lav varmebelastning.',
    sayToCustomer:
      'Den her model er beregnet til rustfrit. Vi kører den med den rigtige skive, så du undgår misfarvning og holder finishen.',
    detail:
      'Brug Inox-skive (A60S eller tilsvarende). Undgå at skære i kulstofstål med samme skive. Anbefalet omdrejningstal: hold dig inden for skivens max RPM. Køl med afbrudte snit ved tykke emner.',
    source: 'Produktblad NT-Angle 125 · Leverandør: Bosch Professional · Godkendt af Produktansvarlig',
    checkedAt: '28. jul 2026',
    checkedBy: 'Produktansvarlig',
    product: 'NT-Angle 125',
    askedBy: 'Christian',
    askedAt: 'I går · 14:20',
    visibility: 'shared',
  },
  {
    id: 'kb-2',
    question: 'Hvad er forskellen på de to slibeskiver?',
    status: 'approved',
    sourceKind: 'approved',
    shortAnswer:
      'A36 er til grov afslibning og materialefjernelse. A60S er finere — til finish og rustfrit, hvor du vil undgå ridser.',
    sayToCustomer:
      'Hvis du skal fjerne meget materiale hurtigt, er det A36. Skal overfladen være pæn — især på rustfrit — så er A60S det rigtige valg.',
    detail:
      'A36: aggressiv, kortere levetid på hårde legeringer. A60S: Inox-egnet, lavere varme, bedre finish. De må ikke bruges om hinanden på samme emne, hvis kunden kræver dokumenteret overfladekvalitet.',
    source: 'Produktblad Norton A36 / A60S · Godkendt svar 18. jul',
    checkedAt: '18. jul 2026',
    checkedBy: 'Kevin',
    product: 'Slibeskiver A36 / A60S',
    askedBy: 'Sofie',
    askedAt: 'I dag · 09:05',
    visibility: 'shared',
  },
  {
    id: 'kb-3',
    question: 'Er denne handske godkendt til arbejde med kemikalier?',
    status: 'ai',
    sourceKind: 'ai',
    shortAnswer:
      'AI-forslag: NT-ChemGuard ser ud til at dække en række kemikalier — men det er ikke et godkendt svar endnu.',
    sayToCustomer: null,
    detail:
      'Der findes en EN ISO 374-markering på emballagen i kataloget, men den præcise kemikalieliste er ikke verificeret i Lead OS. Må ikke fremsættes som faktum over for kunden.',
    source: 'Katalognote · ikke verificeret',
    checkedAt: '—',
    checkedBy: '—',
    product: 'NT-ChemGuard',
    askedBy: 'Emil',
    askedAt: 'I dag · 10:40',
    visibility: 'private',
  },
  {
    id: 'kb-4',
    question: 'Hvad er leveringstiden på denne skaffevare?',
    status: 'none',
    sourceKind: 'none',
    shortAnswer: null,
    sayToCustomer: null,
    detail: null,
    source: null,
    checkedAt: null,
    checkedBy: null,
    product: 'Skaffevare · industribor',
    askedBy: 'Martin',
    askedAt: 'I dag · 11:12',
    expertId: null,
    expertQueue: false,
    visibility: 'private',
  },
  {
    id: 'kb-5',
    question: 'Hvad skal jeg fremhæve over for en kunde, der synes, produktet er for dyrt?',
    status: 'approved',
    sourceKind: 'approved',
    shortAnswer:
      'Flyt samtalen fra pris til totaløkonomi: levetid, færre skift og mindre spildtid — ikke rabat først.',
    sayToCustomer:
      'Jeg forstår prisen. Det de fleste af vores kunder vælger den på, er at den holder længere i daglig brug — så den reelle timepris ofte bliver lavere.',
    detail:
      'Brug ét konkret eksempel fra lignende kunde. Undgå at åbne med rabat. Hvis kunden stadig presser: foreslå prøvepakke eller sammenligning på forbrug pr. uge.',
    source: 'Godkendt salgsargument · Kevin · 22. jul 2026',
    checkedAt: '22. jul 2026',
    checkedBy: 'Kevin',
    product: 'Generelt · værktøj',
    askedBy: 'Jørgen',
    askedAt: '30. jul · 16:10',
    visibility: 'shared',
  },
  {
    id: 'kb-6',
    question: 'Hvilken model skal jeg anbefale til daglig professionel brug?',
    status: 'approved',
    sourceKind: 'product',
    shortAnswer:
      'Til daglig professionel brug anbefaler vi NT-Pro 18V som standard — medmindre kunden primært skærer i rustfrit, så er NT-Angle 125 stærkere.',
    sayToCustomer:
      'Til daglig brug på byggeplads er Pro 18V det sikre valg. Arbejder I meget i rustfrit, så kigger vi hellere på Angle 125.',
    detail:
      'NT-Pro 18V: batteriplatform, bredt tilbehør, god til blandet brug. NT-Angle 125: mere kraft og bedre til metal. Spørg altid ind til materialetype og snitfrekvens før anbefaling.',
    source: 'Sortimentsguide Q3 · Godkendt af Produktansvarlig',
    checkedAt: '2. aug 2026',
    checkedBy: 'Produktansvarlig',
    product: 'NT-Pro 18V / NT-Angle 125',
    askedBy: 'Camilla',
    askedAt: 'I dag · 08:50',
    visibility: 'shared',
  },
  {
    id: 'kb-7',
    question: 'Må jeg love 5 dages levering på specialbor?',
    status: 'none',
    sourceKind: 'none',
    shortAnswer: null,
    sayToCustomer: null,
    detail: null,
    source: null,
    checkedAt: null,
    checkedBy: null,
    product: 'Specialbor',
    askedBy: 'Christian',
    askedAt: 'I dag · 12:05',
    expertQueue: true,
    visibility: 'private',
  },
  {
    id: 'kb-8',
    question: 'Hvad er den rigtige skive til rustfrit finish?',
    status: 'approved',
    sourceKind: 'expert',
    shortAnswer: 'Brug A60S Inox-skive. Hold lavt tryk og skift skive hvis den har rørt kulstofstål.',
    sayToCustomer:
      'Til finish på rustfrit bruger vi A60S — den er lavet til at undgå forurening og give en ren overflade.',
    detail: 'Svar fra Kevin efter Christians spørgsmål i butikken.',
    source: 'Ekspertsvar · Kevin · 1. aug 2026',
    checkedAt: '1. aug 2026',
    checkedBy: 'Kevin',
    product: 'Slibeskiver A60S',
    askedBy: 'Christian',
    askedAt: '1. aug · 11:40',
    visibility: 'private',
  },
];

export const initialExpertQueue = [
  {
    id: 'eq-1',
    question: 'Hvad er leveringstiden på denne skaffevare?',
    product: 'Skaffevare · industribor',
    asker: 'Martin',
    askedAt: 'I dag · 11:12',
    assignee: 'produkt',
    status: 'open',
    context: 'Kunde Nordisk Montage venter på tilbud. Indkøb ca. 27.400 kr.',
    answerDraft: '',
    knowledgeId: 'kb-4',
    leaderNote: 'Intern: tjek indkøbsaftale før sælger lover noget.',
  },
  {
    id: 'eq-2',
    question: 'Er denne handske godkendt til arbejde med kemikalier?',
    product: 'NT-ChemGuard',
    asker: 'Emil',
    askedAt: 'I dag · 10:40',
    assignee: 'michael',
    status: 'open',
    context: 'Kunde spørger specifikt til syreholdige rengøringsmidler. AI-forslag findes, men må ikke bruges alene.',
    answerDraft: '',
    knowledgeId: 'kb-3',
    leaderNote: 'Fortroligt: afventer leverandørsikkerhedsdatablad.',
  },
  {
    id: 'eq-3',
    question: 'Må jeg love 5 dages levering på specialbor?',
    product: 'Specialbor',
    asker: 'Christian',
    askedAt: 'I dag · 12:05',
    assignee: 'kevin',
    status: 'new',
    context: 'Christian har kunden i røret. Må ikke love uden bekræftelse.',
    answerDraft: '',
    knowledgeId: 'kb-7',
    leaderNote: null,
  },
];

export const initialHardMoments = [
  {
    id: 'hm-1',
    type: 'objection',
    label: 'Kundeindvending',
    note: 'Kunden sagde at Hilti er billigere på samme ydelse.',
    product: 'NT-Pro 18V',
    at: 'I dag · 09:30',
  },
  {
    id: 'hm-2',
    type: 'hard-product',
    label: 'Produkt svært at forklare',
    note: 'Forskellen på A36 og A60S tog for lang tid at forklare.',
    product: 'Slibeskiver',
    at: 'I går · 15:05',
  },
];

export const leaderKnowledgeInsights = {
  topQuestions: [
    { question: 'Hvad er forskellen på de to slibeskiver?', count: 5, days: 14 },
    { question: 'Kan denne maskine anvendes på rustfrit stål?', count: 4, days: 14 },
    { question: 'Hvilken model til daglig professionel brug?', count: 3, days: 14 },
  ],
  unanswered: 3,
  productGaps: [
    { product: 'Slibeskiver A36 / A60S', gaps: 5 },
    { product: 'NT-ChemGuard', gaps: 3 },
    { product: 'Skaffevarer', gaps: 2 },
  ],
  objections: [
    { text: 'For dyrt ift. Hilti / alternativ', count: 4 },
    { text: 'Usikker på kemikaliegodkendelse', count: 3 },
  ],
  stillNeedsMichael: [
    'Kemikaliegodkendelse på handsker',
    'Særpriser på storordrer (koblet til beslutninger)',
  ],
  trainingSuggestion: {
    signal: 'Fem sælgere har spurgt til forskellen på de samme to produktlinjer inden for 14 dage.',
    action: 'Lav 15 minutters træning og godkend et standardsvar.',
    topic: 'Slibeskiver A36 vs A60S',
  },
};

export function sourceLabelFor(entry) {
  if (!entry) return SOURCE_LABELS.none;
  if (entry.sourceKind && SOURCE_LABELS[entry.sourceKind]) return SOURCE_LABELS[entry.sourceKind];
  if (entry.status === 'approved') return SOURCE_LABELS.approved;
  if (entry.status === 'ai') return SOURCE_LABELS.ai;
  return SOURCE_LABELS.none;
}

/** What a seller may see in “Mine spørgsmål” / answer history */
export function sellerVisibleEntries(entries, sellerName = DEMO_SELLER_NAME) {
  return entries.filter(
    (e) =>
      e.askedBy === sellerName ||
      e.status === 'approved' ||
      e.visibility === 'shared' ||
      e.sourceKind === 'customer' ||
      e.sourceKind === 'web',
  );
}

const STOP_WORDS = new Set([
  'hvad',
  'hvordan',
  'hvilken',
  'hvilke',
  'denne',
  'dette',
  'eller',
  'til',
  'med',
  'som',
  'der',
  'kan',
  'jeg',
  'skal',
  'over',
  'under',
  'fra',
  'har',
  'er',
  'på',
  'af',
  'og',
  'en',
  'et',
  'de',
  'det',
  'for',
  'ved',
  'om',
]);

export function matchKnowledge(question, entries) {
  const q = question.trim().toLowerCase();
  if (!q) return null;
  const scored = entries
    .map((e) => {
      const words = q
        .split(/[^a-zæøå0-9]+/i)
        .map((w) => w.toLowerCase())
        .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
      const hay = `${e.question} ${e.product}`.toLowerCase();
      const hits = words.filter((w) => hay.includes(w)).length;
      const exact = e.question.toLowerCase() === q;
      const strong = words.length > 0 && words.every((w) => hay.includes(w)) && words.length >= 2;
      return { e, score: exact ? 100 : strong ? 20 + hits : hits };
    })
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score);
  return scored[0]?.e || null;
}

/**
 * Demo ask resolver — order:
 * 1 customer-specific → 2 approved bank / product / expert →
 * then offer web (general) or block web (customer-specific).
 */
export function resolveAsk(question, entries) {
  const q = question.trim();
  if (!q) return { type: 'empty' };

  if (customerAssistDemo.match.test(q)) {
    return { type: 'customer', demo: customerAssistDemo };
  }

  /* Dedicated demo: INOX has no approved internal answer yet */
  if (webSearchDemo.match.test(q) && /betyder|hvad er inox|inox\??$/i.test(q)) {
    return {
      type: 'no-internal',
      question: q,
      allowWeb: true,
      webDemo: webSearchDemo,
    };
  }

  const match = matchKnowledge(q, entries);
  if (match && (match.status === 'approved' || match.sourceKind === 'product' || match.sourceKind === 'expert')) {
    return { type: 'entry', entry: match };
  }
  if (match && match.status === 'ai') {
    return { type: 'entry', entry: match };
  }
  if (match && match.askedBy === DEMO_SELLER_NAME) {
    return { type: 'entry', entry: match };
  }

  const allowWeb = webSearchDemo.match.test(q) || /hvad betyder/i.test(q);
  return {
    type: 'no-internal',
    question: q,
    allowWeb: Boolean(allowWeb && !customerAssistDemo.match.test(q)),
    webDemo: webSearchDemo.match.test(q) ? webSearchDemo : null,
  };
}
