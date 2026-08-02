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

export const attentionSignals = [
  {
    id: 'camilla-holm',
    initials: 'CH',
    tags: 'MOTIVATION · LØFTE',
    title: 'Camilla venter stadig på dig',
    body: 'Motivation faldet fra 8,1 til 5,2 efter en udviklingsopfølgning, du lovede.',
    sources: '3 kilder samlet',
  },
  {
    id: 'anders-moller',
    initials: 'AM',
    tags: 'PERFORMANCE · ANERKENDELSE',
    title: 'Anders leverer — men bliver ikke set',
    body: '126% af målet. Ingen registreret anerkendelse i 21 dage.',
    sources: '2 kilder samlet',
  },
  {
    id: 'louise-eriksen',
    initials: 'LE',
    tags: 'ONBOARDING',
    title: 'Louise mangler sidemandsoplæring',
    body: 'Uge 3. Produktsikkerhed 5/10. Ingen læringsaftale booket.',
    sources: '2 kilder samlet',
  },
];

export const commercialSales = [
  { name: 'Jørgen', amount: 150000, orders: 8, target: 125000, status: 'Stærk uge', dept: 'Nysalg' },
  { name: 'Christian', amount: 87000, orders: 11, target: 100000, status: 'På vej', dept: 'Nysalg' },
  { name: 'Sofie', amount: 112500, orders: 14, target: 110000, status: 'I mål', dept: 'Gensalg' },
  { name: 'Martin', amount: 68200, orders: 9, target: 100000, status: 'Kræver fokus', dept: 'Gensalg' },
  { name: 'Emil', amount: 94100, orders: 12, target: 100000, status: 'På vej', dept: 'Gensalg' },
];

export const demoOrders = [
  { id: 'NT-2841', seller: 'Christian', amount: 23000, status: 'Sendt', special: null },
  { id: 'NT-2844', seller: 'Jørgen', amount: 41800, status: 'Sendt', special: 7.5 },
  { id: 'NT-2846', seller: 'Sofie', amount: 12900, status: 'Afventer lager', special: null },
  { id: 'NT-2849', seller: 'Martin', amount: -4800, status: 'Returnering', special: null },
];

export const decisions = [
  ['Kundeansvar på gensalg', 'Strategi', 'Michael', 'Høj'],
  ['Rabat over 22%', 'Salg', 'Kevin', 'Mellem'],
  ['Specialindkøb over 25.000', 'Indkøb', 'Michael', 'Høj'],
  ['Godkendelse af provisionsafvigelser', 'Administration', 'Kevin', 'Lav'],
];

export const leadershipRhythmToday = [
  ['09:00', 'Morgenmøde · Nysalg', 'Drive'],
  ['10:30', '1:1 · Camilla Holm', 'Coach', 'camilla-holm'],
  ['13:00', 'Storordre-review · Gensalg', 'Drive'],
  ['15:30', 'Rabatter til godkendelse', 'Decide'],
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

export const commissionRulesCopy =
  'Kun sendte ordrer tæller. Returneringer og annulleringer trækkes fra. Standardsats gælder hele den kvalificerende omsætning: 5% under 200.000 kr., 10% fra 200.000 kr. og 15% fra 300.000 kr. Specialsatser kræver ledergodkendelse.';
