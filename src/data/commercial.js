export const compassSignals = {
  Coach: {
    score: 82,
    reasons: ['Camillas motivation er faldet', 'Rasmus mangler 1:1', 'Anders mangler anerkendelse'],
  },
  Drive: {
    score: 64,
    reasons: ['Nysalg er 2 kunder efter dagsmål', 'Gennemsnitsordre i gensalg er faldet 8%'],
  },
  Decide: {
    score: 48,
    reasons: ['3 rabatter afventer godkendelse', '2 specialprovisioner kræver Michael'],
  },
  Operate: {
    score: 31,
    reasons: ['Kvartalssamtaler er 4 dage bag planen'],
  },
};

export const compassAngles = {
  Coach: -55,
  Drive: 35,
  Decide: 125,
  Operate: 215,
};

export const leadershipSignals = [
  {
    id: 'sig-camilla-motivation',
    person: 'Camilla Holm',
    employeeId: 'camilla-holm',
    title: 'Faldende motivation nævnt i to samtaler',
    basis: 'Check-in 7. jul (5,2) og check-in 30. jun (5,8). AI-fortolkning: mønster over tid — ikke en objektiv diagnose.',
    when: 'Seneste 14 dage',
    sourceLabel: 'Åbn check-ins',
    sourceType: 'CHECK-IN',
    aiInterpreted: true,
  },
  {
    id: 'sig-rasmus-11',
    person: 'Rasmus Toft',
    employeeId: 'rasmus-toft',
    title: 'Manglende 1:1 i 31 dage',
    basis: 'Kadence er 14 dage. Sidste samtale registreret 2. jul.',
    when: '31 dage siden',
    sourceLabel: 'Åbn rytme',
    sourceType: 'KALENDER',
    aiInterpreted: false,
  },
  {
    id: 'sig-camilla-lofte',
    person: 'Camilla Holm',
    employeeId: 'camilla-holm',
    title: 'Overskredet lederløfte om udviklingsplan',
    basis: 'Løfte fra kvartalssamtale 16. jun — deadline 1. jul. Ingen opfølgning registreret.',
    when: '9 dage forsinket',
    sourceLabel: 'Åbn løfte',
    sourceType: 'LØFTE',
    aiInterpreted: false,
  },
  {
    id: 'sig-provision-uklar',
    person: 'Christian',
    employeeId: null,
    title: 'Uklarhed om provision nævnt i morgenmøde',
    basis: 'Leder note 1. aug: “Flere spørger om specialsats på storordre.” Signal — ikke faktum om fejl i beregning.',
    when: 'Denne uge',
    sourceLabel: 'Åbn provision',
    sourceType: 'LEDERNOTE',
    aiInterpreted: true,
  },
  {
    id: 'sig-anders-anerkendelse',
    person: 'Anders Møller',
    employeeId: 'anders-moller',
    title: 'Manglende anerkendelse i 21 dage',
    basis: '126% af mål. Ingen anerkendelsesnote siden 12. jul.',
    when: '21 dage',
    sourceLabel: 'Åbn medarbejder',
    sourceType: 'CRM + LEDERNOTE',
    aiInterpreted: false,
  },
  {
    id: 'sig-louise-onboarding',
    person: 'Louise Eriksen',
    employeeId: 'louise-eriksen',
    title: 'Onboardingrisiko — sidemandsoplæring mangler',
    basis: 'Uge 3. Produktsikkerhed 5/10. Ingen læringsaftale booket.',
    when: 'Uge 3',
    sourceLabel: 'Åbn onboarding',
    sourceType: 'CHECK-IN',
    aiInterpreted: false,
  },
];

export const commercialSales = [
  { name: 'Jørgen', amount: 150000, orders: 8, target: 125000, status: 'Stærk uge', dept: 'Nysalg', week: 42000, day: 12400 },
  { name: 'Christian', amount: 184500, orders: 19, target: 300000, status: 'På vej', dept: 'Nysalg', week: 87400, day: 23000 },
  { name: 'Sofie', amount: 112500, orders: 14, target: 110000, status: 'I mål', dept: 'Gensalg', week: 38100, day: 18300 },
  { name: 'Martin', amount: 68200, orders: 9, target: 100000, status: 'Kræver fokus', dept: 'Gensalg', week: 21400, day: 8900 },
  { name: 'Emil', amount: 94100, orders: 12, target: 100000, status: 'På vej', dept: 'Gensalg', week: 29600, day: 15200 },
  { name: 'Camilla', amount: 230000, orders: 8, target: 245000, status: 'Stabil', dept: 'Gensalg', week: 41000, day: 16800 },
];

export const demoOrders = [
  { id: 'NT-2841', seller: 'Christian', amount: 23000, status: 'Sendt', special: null },
  { id: 'NT-2844', seller: 'Jørgen', amount: 41800, status: 'Sendt', special: 7.5 },
  { id: 'NT-2846', seller: 'Sofie', amount: 12900, status: 'Afventer lager', special: null },
  { id: 'NT-2849', seller: 'Martin', amount: -4800, status: 'Returnering', special: null },
  { id: 'NT-2851', seller: 'Camilla', amount: -12000, status: 'Annullering', special: null },
];

/** Seller-facing order ledger — demo only. Only status "Sendt" counts for commission. */
export const sellerOrders = [
  {
    id: 'NT-2858',
    seller: 'Christian',
    customer: 'Alexis Maskinfabrik A/S',
    registeredAt: '2. aug 2026',
    amount: 18400,
    special: null,
    status: 'Registreret',
    countsForCommission: false,
    reason: 'Afventer intern godkendelse før den kan tælle.',
  },
  {
    id: 'NT-2854',
    seller: 'Christian',
    customer: 'Nordisk Montage',
    registeredAt: '1. aug 2026',
    amount: 27200,
    special: '7,5% specialsats',
    status: 'Afventer godkendelse',
    countsForCommission: false,
    reason: 'Specialaftale mangler ledergodkendelse.',
  },
  {
    id: 'NT-2852',
    seller: 'Christian',
    customer: 'Havnemøller A/S',
    registeredAt: '31. jul 2026',
    amount: 15600,
    special: null,
    status: 'Godkendt',
    countsForCommission: false,
    reason: 'Godkendt, men endnu ikke sendt.',
  },
  {
    id: 'NT-2848',
    seller: 'Christian',
    customer: 'SteelForm ApS',
    registeredAt: '30. jul 2026',
    amount: 9800,
    special: null,
    status: 'Afventer afsendelse',
    countsForCommission: false,
    reason: 'Afventer lager / afsendelse.',
  },
  {
    id: 'NT-2841',
    seller: 'Christian',
    customer: 'Byg & Metal Vest',
    registeredAt: '29. jul 2026',
    amount: 23000,
    special: null,
    status: 'Sendt',
    countsForCommission: true,
    reason: null,
  },
  {
    id: 'NT-2833',
    seller: 'Christian',
    customer: 'IndustriPartner',
    registeredAt: '22. jul 2026',
    amount: 31200,
    special: null,
    status: 'Sendt',
    countsForCommission: true,
    reason: null,
  },
  {
    id: 'NT-2820',
    seller: 'Christian',
    customer: 'Kystværkstedet',
    registeredAt: '14. jul 2026',
    amount: -4800,
    special: null,
    status: 'Returneret',
    countsForCommission: false,
    reason: 'Returnering trækkes fra provisionsgivende omsætning.',
  },
  {
    id: 'NT-2811',
    seller: 'Christian',
    customer: 'ProCut Nordic',
    registeredAt: '8. jul 2026',
    amount: -12000,
    special: null,
    status: 'Annulleret',
    countsForCommission: false,
    reason: 'Annulleret — tæller ikke med.',
  },
];

export const sellerDemo = {
  name: 'Christian',
  revenue: 184500,
  today: 23000,
  todayOrders: 3,
  week: 87400,
  avgOrder: 9711,
  monthTarget: 300000,
  monthOrders: 19,
  bestDay: 41800,
  rank: '#4 af 16',
  pendingRevenue: 71000,
  returns: 16800,
};

export const leadershipRhythmToday = [
  ['09:00', 'Morgenmøde · Nysalg', 'Drive', null],
  ['10:30', '1:1 · Camilla Holm', 'Coach', 'camilla-holm'],
  ['13:00', 'Storordre-review · Gensalg', 'Drive', null],
  ['15:30', 'Rabatter til godkendelse', 'Decide', null],
];

export const commissionRulesCopy =
  'Kun sendte ordrer tæller. Returneringer og annulleringer trækkes fra. Standardsats gælder hele den kvalificerende omsætning: 5% under 200.000 kr., 10% fra 200.000 kr. og 15% fra 300.000 kr. Specialsatser kræver ledergodkendelse.';

export const CLARIFICATION_CATEGORIES = [
  'Pris og rabat',
  'Kunde og kredit',
  'Levering og lager',
  'Skaffevare eller specialprodukt',
  'Provision',
  'Produkt',
  'Andet',
];

/** Secondary memory — not the primary workflow. */
export const clarificationGuidelines = {
  reusable: [
    {
      topic: 'Minimumsavance på kampagne',
      detail: 'Ikke under 12 % avance uden Michaels OK.',
      source: 'Besvaret · 28. jul',
    },
    {
      topic: 'Specialordre uden returnering',
      detail: 'Kevin må køre, når kunden har accepteret skriftligt og avance ≥ 18 %.',
      source: 'Besvaret · 20. jul',
    },
  ],
  kevinMayDecide: [
    {
      area: 'Specialordrer med skriftlig accept',
      detail: 'Avance ≥ 18 % · eksisterende kunde',
    },
    {
      area: 'Kampagneavance ≥ 12 %',
      detail: 'LeadOS kan pege på godkendt svar',
    },
  ],
  michaelStillOwns: [
    {
      area: 'Rabatter over 8 % under 100.000 kr.',
      detail: 'Kræver stadig Michael',
    },
    {
      area: 'Kredit over kundens ramme',
      detail: 'Ingen delegation',
    },
  ],
  repeats: [
    {
      topic: 'Rabat på storordrer',
      detail: 'Kevin og Sofie har spurgt flere gange — grænser mangler stadig.',
      count: 5,
    },
    {
      topic: 'Skaffevare over 25.000 kr.',
      detail: 'Gentaget mønster.',
      count: 3,
    },
  ],
};

export const decisionCases = [
  {
    id: 'dec-demo',
    title: 'BygPartner vil have pakken til 151.000 kr.',
    asker: 'Kevin',
    assignee: 'Michael',
    status: 'awaiting-michael',
    statusLabel: 'Afventer Michael',
    category: 'Pris og rabat',
    customer: 'BygPartner A/S',
    order: 'NT-2910',
    product: 'Elværktøj · professionel serie',
    waited: '18 min',
    context: {
      Kunde: 'BygPartner A/S',
      Ordreværdi: '151.000 kr.',
      Standardpris: '164.000 kr.',
      Rabat: '7,9 %',
      'Estimeret avance': '16 % efter fragt',
      'Tidligere køb': '4 ordrer · 612.000 kr. i år',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'BygPartner vil købe hele pakken, hvis vi går fra 164.000 til 151.000 kr. Det er en stor ordrekunde. Må jeg godkende det?',
        at: 'I dag · 09:12',
      },
    ],
    demoOwnerReply:
      'Ja, den må Kevin tage. Kunden køber stort og ofte, og vi holder stadig den nødvendige avance. Fremover må Kevin selv godkende den type rabat op til 8 %, hvis ordren er over 100.000 kr.',
    finalAnswer: null,
    learning: null,
    similarAnswer: null,
    hasMandate: false,
  },
  {
    id: 'dec-1',
    title: 'CityBuild Express beder om 24 % rabat',
    asker: 'Kevin',
    assignee: 'Michael',
    status: 'awaiting-michael',
    statusLabel: 'Afventer Michael',
    category: 'Pris og rabat',
    customer: 'CityBuild Express',
    order: 'NT-2918',
    product: 'Gensalgspakke',
    waited: '2 t',
    context: {
      Kunde: 'CityBuild Express',
      Ordre: 'NT-2918',
      Standardpris: '96.000 kr.',
      'Ønsket pris': '72.960 kr. (−24 %)',
      'Estimeret avance': '11 %',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'CityBuild Express vil have 24 %. Avancen lander på ca. 11 %. Må vi alligevel?',
        at: 'I dag · 10:18',
      },
    ],
    finalAnswer: null,
    learning: null,
    similarAnswer: null,
    hasMandate: false,
  },
  {
    id: 'dec-followup',
    title: 'TeknikPartner — lignende særpris',
    asker: 'Sofie',
    assignee: 'LeadOS',
    status: 'leados',
    statusLabel: 'Kan besvares af LeadOS',
    category: 'Pris og rabat',
    customer: 'TeknikPartner ApS',
    order: 'NT-2922',
    product: 'Elværktøj · professionel serie',
    waited: '40 min',
    context: {
      Kunde: 'TeknikPartner ApS',
      Ordre: 'NT-2922 · 172.000 kr.',
      'Ønsket pris': '142.000 kr.',
      Avance: '13,5 % efter fragt',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Sofie',
        text: 'TeknikPartner beder om 142.000 på en 172.000-ordre. Kunden er eksisterende. Minder om BygPartner — må vi køre?',
        at: 'I dag · 11:40',
      },
    ],
    similarAnswer: {
      text: 'Ja — salgsleder kan godkende, fordi kunden er eksisterende, ordren er stor, og avancen holder. Markér det som særpris, ikke ny standard.',
      basedOn: 'Tidligere afklaring · minimumsavance kampagne',
    },
    finalAnswer: null,
    learning: null,
    hasMandate: false,
  },
  {
    id: 'dec-4',
    title: 'CityBuild vil have 15 % i 12 måneder',
    asker: 'Kevin',
    assignee: 'Kevin',
    status: 'awaiting-kevin',
    statusLabel: 'Afventer Kevin',
    category: 'Kunde og kredit',
    customer: 'CityBuild Group',
    order: 'Rammeaftale',
    product: 'Tværgående sortiment',
    waited: '1 t',
    context: {
      Kunde: 'CityBuild Group',
      Volumen: 'Est. 2,1 mio.',
      'Ønsket rabat': '−15 % fast i 12 mdr.',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'CityBuild vil have 15 % i 12 måneder. Volumen er realistisk, men avancen svinger. Må Camilla love det?',
        at: 'I dag · 10:03',
      },
      {
        who: 'michael',
        name: 'Michael',
        text: 'Jeg skal se avancematrixen pr. produktlinje før jeg siger ja. Send den, Kevin.',
        at: 'I dag · 10:22',
      },
    ],
    finalAnswer: null,
    learning: null,
    hasMandate: false,
  },
  {
    id: 'dec-2',
    title: 'Skaffevare — indkøb over 25.000 kr.',
    asker: 'Sofie',
    assignee: 'Michael',
    status: 'answered',
    statusLabel: 'Besvaret',
    category: 'Skaffevare eller specialprodukt',
    customer: 'Nordisk Montage',
    order: 'NT-2902',
    product: 'Skaffevare · industribor',
    waited: '—',
    context: {
      Kunde: 'Nordisk Montage',
      Indkøb: '27.400 kr.',
      Salgspris: '34.900 kr.',
      Avance: 'ca. 21 %',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Sofie via Kevin',
        text: 'Skaffevare til 27.400 i indkøb. Kunden betaler 34.900. Må vi bestille uden dit OK?',
        at: 'I går · 14:40',
      },
      {
        who: 'michael',
        name: 'Michael',
        text: 'Ja — hvis avance er over 18 % efter fragt og kunden er eksisterende med god betalingshistorik. Ellers skal jeg se den.',
        at: 'I går · 16:05',
      },
    ],
    finalAnswer:
      'Ja — hvis avance er over 18 % efter fragt og kunden er eksisterende med god betalingshistorik. Ellers skal jeg se den.',
    learning: 'baseline',
    hasMandate: false,
  },
  {
    id: 'dec-5',
    title: 'Hvor lavt må vi gå på august-kampagnen?',
    asker: 'Kevin',
    assignee: 'Michael',
    status: 'answered',
    statusLabel: 'Besvaret',
    category: 'Pris og rabat',
    customer: null,
    order: 'Kampagne aug',
    product: 'Udvalgte gensalgsvarer',
    waited: '—',
    context: {
      Kampagne: 'August',
      'Maks. rabat': 'Op til −20 %',
      'Min. avance': '12 %',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'Hvor lavt må vi gå på august-kampagnen?',
        at: '28. jul · 09:00',
      },
      {
        who: 'michael',
        name: 'Michael',
        text: 'Ikke under 12 % avance. Punktum. Hellere færre ordrer end dårlige.',
        at: '28. jul · 09:40',
      },
    ],
    finalAnswer: 'Ikke under 12 % avance — medmindre Michael godkender den konkrete ordre.',
    learning: 'baseline',
    hasMandate: false,
  },
  {
    id: 'dec-6',
    title: 'Specialordre der ikke kan returneres',
    asker: 'Emil',
    assignee: 'Michael',
    status: 'answered',
    statusLabel: 'Besvaret',
    category: 'Skaffevare eller specialprodukt',
    customer: 'Teknik & Drift',
    order: 'NT-2788',
    product: 'Specialfremstillet beslag',
    waited: '—',
    context: {
      Kunde: 'Teknik & Drift',
      Pris: '19.200 kr.',
      Avance: '22 %',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'Specialordre der ikke kan returneres. Må vi køre uden din signatur?',
        at: '20. jul · 13:10',
      },
      {
        who: 'michael',
        name: 'Michael',
        text: 'Ja, hvis kunden skriver under på ikke-returnerbar og avance er over 18 %.',
        at: '20. jul · 15:02',
      },
    ],
    finalAnswer:
      'Ja, hvis kunden skriver under på ikke-returnerbar og avance er over 18 %.',
    learning: 'delegate',
    hasMandate: true,
  },
];

export const aiAssistantDemo = {
  recommendation:
    'På TeknikPartner-ordren kan salgsleder godkende særpris, hvis avance efter fragt er ≥ 12 % og kunden er eksisterende. Under 12 % eller ny kunde: eskalér til Michael.',
  confidence: 'Høj',
  basedOn: [
    { id: 'dec-5', label: 'Minimumsavance på kampagneordre' },
    { id: 'dec-demo', label: 'BygPartner-særpris' },
  ],
  isApprovedRule: false,
};
