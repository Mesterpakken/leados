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
};

export const leadershipRhythmToday = [
  ['09:00', 'Morgenmøde · Nysalg', 'Drive', null],
  ['10:30', '1:1 · Camilla Holm', 'Coach', 'camilla-holm'],
  ['13:00', 'Storordre-review · Gensalg', 'Drive', null],
  ['15:30', 'Rabatter til godkendelse', 'Decide', null],
];

export const commissionRulesCopy =
  'Kun sendte ordrer tæller. Returneringer og annulleringer trækkes fra. Standardsats gælder hele den kvalificerende omsætning: 5% under 200.000 kr., 10% fra 200.000 kr. og 15% fra 300.000 kr. Specialsatser kræver ledergodkendelse.';

export const decisionRepeats = [
  {
    topic: 'Rabat over 18% på storordrer',
    detail: 'Kevin og Sofie har spurgt 5 gange på 6 uger — mangler stadig én godkendt regel.',
    count: 5,
  },
  {
    topic: 'Specialindkøb over 25.000 kr.',
    detail: 'Gentaget mønster. Regel foreslået — afventer endelig godkendelse.',
    count: 3,
  },
  {
    topic: 'Afvigende provision på projektordrer',
    detail: 'Kommer næsten hver måned. Delvist dokumenteret.',
    count: 4,
  },
];

export const decisionBottlenecks = [
  {
    area: 'Rabatter over 22%',
    detail: 'Stadig 100% afhængig af beslutningsejeren',
    level: 'Høj',
  },
  {
    area: 'Kundeansvar på gensalg',
    detail: 'Ingen delegeret mandat — alle sager eskaleres',
    level: 'Høj',
  },
];

export const decisionReadyToDelegate = [
  {
    area: 'Specialordrer med skriftlig accept',
    detail: 'Godkendt regel findes — salgsleder kan beslutte selv',
  },
  {
    area: 'Kampagneavance ≥ 12%',
    detail: 'Regel godkendt — AI kan foreslå svar med høj sikkerhed',
  },
];

export const decisionCases = [
  {
    id: 'dec-demo',
    title: 'Særlig pris på storordre · BygPartner A/S',
    asker: 'Kevin',
    status: 'proposed',
    statusLabel: 'AI-forslag til regel',
    category: 'Særpris',
    summary: 'Demotråd: Kevin spørger → Michael svarer → Lead OS udleder regel.',
    context: {
      kunde: 'BygPartner A/S',
      ordre: 'NT-2910 · 186.000 kr.',
      produkt: 'Elværktøj · professionel serie',
      ønsketPris: '151.000 kr. (−18,8%)',
      avance: '14% efter fragt',
      provision: 'Standard 10%',
      sporger: 'Kevin',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'BygPartner vil lukke hele pakken nu, hvis vi kan give 151.000 i stedet for 186.000. Det er en stor ordre, kunden er kendt, og avancen lander på ca. 14% efter fragt. Må vi gå med den særlige pris?',
        at: 'I dag · 09:12',
      },
      {
        who: 'michael',
        name: 'Michael',
        text: 'Ja — men kun fordi kunden er kendt, ordren er stor nok til at bære rabatten, og avancen holder sig over 12% efter fragt. Gør det ikke til en standardpris. Hvis avancen daler under 12%, eller kunden er ny, skal jeg se den.',
        at: 'I dag · 09:41',
      },
    ],
    demoOwnerReply:
      'Ja — men kun fordi kunden er kendt, ordren er stor nok til at bære rabatten, og avancen holder sig over 12% efter fragt.',
    pendingRuleText:
      'Særpris på storordrer (≥ 150.000 kr.) må godkendes af salgsleder, når kunden er eksisterende, og forventet avance efter fragt er ≥ 12%. Ellers eskaleres til beslutningsejeren. Særpris må ikke bruges som ny standardlistepris.',
    ruleSuggestion: {
      text: 'Særpris på storordrer (≥ 150.000 kr.) må godkendes af salgsleder, når kunden er eksisterende, og forventet avance efter fragt er ≥ 12%. Ellers eskaleres til beslutningsejeren. Særpris må ikke bruges som ny standardlistepris.',
      confidence: 'Høj',
      basedOn: ['Denne samtale · BygPartner NT-2910'],
      approved: false,
    },
    similar: ['dec-followup', 'dec-5'],
  },
  {
    id: 'dec-followup',
    title: 'Lignende særpris · TeknikPartner ApS',
    asker: 'Sofie',
    status: 'answered',
    statusLabel: 'AI kan foreslå svar',
    category: 'Særpris',
    summary: 'Nyt, lignende spørgsmål — Lead OS foreslår svar ud fra tidligere godkendt beslutning.',
    context: {
      kunde: 'TeknikPartner ApS',
      ordre: 'NT-2922 · 172.000 kr.',
      produkt: 'Elværktøj · professionel serie',
      ønsketPris: '142.000 kr. (−17,4%)',
      avance: '13,5% efter fragt',
      provision: 'Standard 10%',
      sporger: 'Sofie',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Sofie',
        text: 'TeknikPartner beder om 142.000 på en 172.000-ordre. Kunden er eksisterende, avance ca. 13,5%. Minder om BygPartner-sagen — må vi køre?',
        at: 'I dag · 11:40',
      },
    ],
    aiSuggestedAnswer: {
      confidence: 'Høj',
      text: 'Ja — salgsleder kan godkende, fordi kunden er eksisterende, ordren er over 150.000 kr., og avancen efter fragt er over 12%. Markér det som særpris, ikke ny standard.',
      basedOn: [
        { id: 'dec-5', label: 'Minimumsavance på kampagneordre (godkendt regel)' },
        { id: 'dec-demo', label: 'BygPartner-særpris (demotråd / kilde)' },
      ],
    },
    ruleSuggestion: null,
    similar: ['dec-demo', 'dec-5'],
  },
  {
    id: 'dec-1',
    title: 'Rabat 24% på storordre · under minimumsavance',
    asker: 'Kevin',
    status: 'awaiting',
    statusLabel: 'Afventer svar',
    category: 'Rabat',
    summary: '24% rabat lander på 11% avance — under godkendt minimum. Lav AI-sikkerhed.',
    context: {
      kunde: 'CityBuild Express',
      ordre: 'NT-2918',
      produkt: 'Gensalgspakke',
      standardpris: '96.000 kr.',
      onsketPris: '72.960 kr. (−24%)',
      avance: '11% (under normal 18%)',
      provision: 'Standard 10%',
      sporger: 'Kevin',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'CityBuild Express vil have 24%. Avancen lander på ca. 11%. Det bryder vores 12%-gulv — må vi alligevel?',
        at: 'I dag · 10:18',
      },
    ],
    aiSuggestedAnswer: {
      confidence: 'Lav',
      text: 'Eksisterende regel siger nej under 12% avance. Der er ingen godkendt undtagelse for nye kunder på dette niveau — eskalér til beslutningsejeren.',
      basedOn: [{ id: 'dec-5', label: 'Minimumsavance på kampagneordre (godkendt regel)' }],
    },
    ruleSuggestion: null,
    similar: ['dec-5', 'dec-demo'],
  },
  {
    id: 'dec-2',
    title: 'Skaffevare — specialindkøb over 25.000 kr.',
    asker: 'Sofie',
    status: 'answered',
    statusLabel: 'Besvaret',
    category: 'Skaffevare',
    summary: 'Kunde vil have et ikke-lagerført boreværktøj. Indkøb 27.400 kr.',
    context: {
      kunde: 'Nordisk Montage',
      ordre: 'NT-2902',
      produkt: 'Skaffevare · industribor',
      standardpris: 'Ikke listet',
      onsketPris: '34.900 kr.',
      avance: 'ca. 21% efter fragt',
      provision: 'Standard',
      sporger: 'Sofie',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Sofie via Kevin',
        text: 'Skaffevare til 27.400 i indkøb. Kunden betaler 34.900. Må vi bestille uden dit OK når indkøb > 25k?',
        at: 'I går · 14:40',
      },
      {
        who: 'michael',
        name: 'Michael',
        text: 'Ja — hvis avance er over 18% efter fragt og kunden er eksisterende med god betalingshistorik. Ellers skal jeg se den.',
        at: 'I går · 16:05',
      },
    ],
    ruleSuggestion: {
      text: 'Skaffevarer med indkøb over 25.000 kr. må godkendes af salgsleder, hvis forventet avance efter fragt er ≥ 18% og kunden er eksisterende med god betalingshistorik. Ellers kræves Michaels godkendelse.',
      confidence: 'Medium',
      basedOn: ['Denne samtale', 'dec-6'],
    },
    similar: ['dec-6'],
  },
  {
    id: 'dec-3',
    title: 'Specialprodukt med afvigende provision 7,5%',
    asker: 'Jørgen',
    status: 'proposed',
    statusLabel: 'Regel foreslået',
    category: 'Provision',
    summary: 'Projektordre hvor standardprovision ikke spejler indsats.',
    context: {
      kunde: 'Haven & Park ApS',
      ordre: 'NT-2844',
      produkt: 'Specialkonfigureret maskinpakke',
      standardpris: '41.800 kr.',
      onsketPris: '41.800 kr.',
      avance: '16%',
      provision: '7,5% (afvigelse)',
      sporger: 'Jørgen',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'Jørgen har brugt tre uger på konfiguration. Han beder om 7,5% i stedet for trin-satsen. Avance 16%.',
        at: '30. jul · 11:20',
      },
      {
        who: 'michael',
        name: 'Michael',
        text: 'OK denne gang, men kun når avance er mindst 15% og ordren er projektbaseret. Notér det — jeg vil ikke have det som skjult standard.',
        at: '30. jul · 15:48',
      },
    ],
    ruleSuggestion: {
      text: 'Afvigende provision under standardsats kræver ledergodkendelse. Specialsats ned til 7,5% kan godkendes på projektordrer, når avance er ≥ 15%. Hver afvigelse logges.',
      confidence: 'Høj',
      basedOn: ['Denne samtale', 'NT-2844'],
    },
    similar: ['dec-1'],
  },
  {
    id: 'dec-4',
    title: 'Kunde ønsker særlig rammeaftale',
    asker: 'Camilla',
    status: 'awaiting',
    statusLabel: 'Afventer svar',
    category: 'Kundeaaftale',
    summary: 'Enterprise-kunde vil have fast 15% rabat i 12 måneder.',
    context: {
      kunde: 'CityBuild Group',
      ordre: 'Ramme · foreslået',
      produkt: 'Tværgående sortiment',
      standardpris: 'Listepris',
      onsketPris: '−15% fast',
      avance: 'Estimat 14–17%',
      provision: 'Uændret',
      sporger: 'Camilla',
    },
    messages: [
      {
        who: 'kevin',
        name: 'Kevin',
        text: 'CityBuild vil have 15% i 12 måneder mod estimeret 2,1 mio. Volumen er realistisk, men avancen svinger. Må Camilla love det?',
        at: 'I dag · 10:03',
      },
    ],
    ruleSuggestion: null,
    similar: ['dec-5'],
  },
  {
    id: 'dec-5',
    title: 'Minimumsavance på kampagneordre',
    asker: 'Kevin',
    status: 'approved',
    statusLabel: 'Regel godkendt',
    category: 'Minimumsavance',
    summary: 'Kampagne må ikke gå under 12% avance.',
    context: {
      kunde: 'Flere · kampagne',
      ordre: 'Kampagne aug',
      produkt: 'Udvalgte gensalgsvarer',
      standardpris: 'Liste',
      onsketPris: 'Op til −20%',
      avance: 'Min. 12%',
      provision: 'Standard',
      sporger: 'Kevin',
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
        text: 'Ikke under 12% avance. Punktum. Hellere færre ordrer end dårlige.',
        at: '28. jul · 09:40',
      },
    ],
    ruleSuggestion: {
      text: 'Kampagne- og volumenrabatter må ikke bringe forventet avance under 12%, medmindre Michael godkender den konkrete ordre.',
      confidence: 'Høj',
      basedOn: ['Denne samtale'],
      approved: true,
    },
    similar: ['dec-1'],
  },
  {
    id: 'dec-6',
    title: 'Specialordre med leverandørbinding',
    asker: 'Emil',
    status: 'approved',
    statusLabel: 'Regel godkendt',
    category: 'Specialordre',
    summary: 'Ikke-returnerbar specialordre — kunden skal acceptere vilkår skriftligt.',
    context: {
      kunde: 'Teknik & Drift',
      ordre: 'NT-2788',
      produkt: 'Specialfremstillet beslag',
      standardpris: '19.200 kr.',
      onsketPris: '19.200 kr.',
      avance: '22%',
      provision: 'Standard',
      sporger: 'Emil',
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
        text: 'Ja, hvis kunden skriver under på ikke-returnerbar og avance er over 18%.',
        at: '20. jul · 15:02',
      },
    ],
    ruleSuggestion: {
      text: 'Specialordrer der ikke kan returneres må gennemføres uden Michael, når kunden har accepteret vilkår skriftligt og avance er ≥ 18%.',
      confidence: 'Høj',
      basedOn: ['Denne samtale'],
      approved: true,
    },
    similar: ['dec-2'],
  },
];

export const aiAssistantDemo = {
  recommendation:
    'På TeknikPartner-ordren kan salgsleder godkende særpris, hvis avance efter fragt er ≥ 12% og kunden er eksisterende. Under 12% eller ny kunde: eskalér til beslutningsejeren.',
  confidence: 'Høj',
  basedOn: [
    { id: 'dec-5', label: 'Minimumsavance på kampagneordre (godkendt regel)' },
    { id: 'dec-demo', label: 'BygPartner-særpris (demotråd)' },
  ],
  isApprovedRule: false,
};
