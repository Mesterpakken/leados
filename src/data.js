export const currentUser = {
  name: 'Mathias Nitzsch',
  role: 'Head of Sales',
  initials: 'MN',
  team: 'Danmark Salg',
};

export const currentDate = 'Fredag · 10. juli 2026';

/** Canonical nav — kept for reference; App.jsx owns the live shell nav. */
export const navItems = [
  { id: 'overview', label: 'Overblik', group: 'primary' },
  { id: 'sales', label: 'Salg', group: 'primary' },
  { id: 'team', label: 'Medarbejdere', group: 'primary' },
  { id: 'meetings', label: 'Samtaler', group: 'primary' },
  { id: 'decisions', label: 'Beslutninger', group: 'primary' },
  { id: 'calendar', label: 'Ledelsesrytme', group: 'primary' },
  { id: 'compensation', label: 'Løn & provision', group: 'primary' },
  { id: 'seller', label: 'Mit sælgercockpit', group: 'view' },
  { id: 'tv', label: 'TV-tavle', group: 'view' },
];

export const employees = [
  {
    id: 'camilla-holm',
    name: 'Camilla Holm',
    role: 'Senior salgskonsulent',
    team: 'Danmark Salg',
    status: 'Kræver opmærksomhed',
    signal: 'Motivation falder + forsinket opfølgning',
    attentionSignal: 'Opfølgning forsinket',
    motivation: 5.2,
    motivationTrend: 'down',
    previousMotivation: 8.1,
    energy: 6,
    performance: 94,
    lastOneOnOne: '23 dage siden',
    lastOneOnOneDays: 23,
    nextMeeting: 'Ikke booket',
    openPromises: 2,
    recognitionDays: 21,
    filterTags: ['attention', 'risk', 'delayed-1-1', 'low-motivation'],
    action: 'Forbered 1:1',
    actionType: 'prepare-1-1',
    context: 'motivation falder, opfølgning forsinket',
    tenure: '3 år 2 mdr',
    leadershipHeadline: 'Giv hende ejerskab over konkrete opgaver, følg op på det du lover, og anerkend stabil performance — før du beder om mere.',
    reading:
      'Camilla er en stærk performer, der responderer godt på ansvar og direkte anerkendelse. Den seneste måned er hendes motivation faldet fra 8,1 til 5,2, mens målopfyldelse er forblevet stabil på 94%. Du lovede at vende tilbage til hendes udviklingsplan efter kvartalssamtalen 16. juni — ingen opfølgning er registreret, og det er sandsynligvis den primære årsag til faldet.',
    signals: [
      { label: 'Motivation', value: '5,2', sub: 'ned fra 8,1', source: 'KILDE: CHECK-IN' },
      { label: 'Energi', value: '6/10', source: 'KILDE: CHECK-IN' },
      { label: 'Målopfyldelse', value: '94%', source: 'KILDE: CRM' },
    ],
    journey: [
      { date: '7. jul 2025', type: 'Check-in', fromEmployee: true, summary: 'Motivation 5,2 — "Jeg mangler tydelighed på næste skridt efter vores kvartalssamtale"', status: null },
      { date: '30. jun 2025', type: 'Check-in', fromEmployee: true, summary: 'Motivation 5,8 — nævner at teamlead-samtalen føltes uafsluttet', status: null },
      { date: '16. jun 2025', type: 'Kvartalssamtale', summary: 'Drøftede teamlead-ambitioner og udviklingsplan — du lovede opfølgning inden 1. juli', status: 'Løfte: leder' },
      { date: '9. jun 2025', type: 'Løfte', summary: 'Camilla lovede at forberede 3 coaching-eksempler til næste 1:1', status: 'Afventer' },
      { date: '23. maj 2025', type: '1:1', summary: 'Gennemgik Q2-performance (92%) og pipeline — positiv energi', status: null },
      { date: '19. maj 2025', type: 'Check-in', fromEmployee: true, summary: 'Motivation 7,8 — stabil uge, nævner interesse for mere ansvar', status: null },
      { date: '9. maj 2025', type: 'Coaching', summary: 'Lukningsteknik på større deals — Camilla tog noter og lovede at teste framework', status: null },
      { date: '25. apr 2025', type: 'Anerkendelse', summary: 'Anerkendt for stærk Q1-afslutning (108% af mål) — synlig effekt på motivation', status: 'Holdt' },
      { date: '11. apr 2025', type: '1:1', summary: 'Ugentlig status — aftalte fokus på enterprise-pipeline', status: null },
      { date: '2. apr 2025', type: 'Løfte', summary: 'Du lovede at booke produkttræning til større kunder — stadig ikke booket', status: 'Forsinket' },
      { date: '14. mar 2025', type: 'Coaching-notat', summary: 'Responderer positivt på ejerskab — mister energi når samtaler ikke fører til handling', status: null },
      { date: '28. feb 2025', type: 'Kvartalssamtale', summary: 'Q1-gennemgang — satte mål om teamlead-kandidatur inden Q3', status: null },
    ],
    ramp: {
      startDate: '7. maj 2022',
      status: 'on-track',
      milestones: [
        {
          id: 'onboarding',
          label: 'Onboarding gennemført',
          status: 'reached',
          day: 11,
          date: '18. maj 2022',
          teamAvgDays: 14,
          comparison: 'ahead',
        },
        {
          id: 'first-sale',
          label: 'Første salg',
          status: 'reached',
          day: 18,
          date: '25. maj 2022',
          teamAvgDays: 21,
          comparison: 'ahead',
        },
        {
          id: 'first-100k',
          label: 'Første 100k',
          status: 'reached',
          day: 41,
          date: '17. jun 2022',
          teamAvgDays: 52,
          comparison: 'ahead',
        },
        {
          id: 'next',
          label: 'Første 200k',
          status: 'upcoming',
          projectedLabel: 'Typisk dag 78 · teamgns.',
          teamAvgDays: 78,
        },
      ],
    },
    targets: {
      monthlyLabel: 'Juli 2025',
      monthlyValue: 94,
      monthlyTarget: 100,
      sparkline: [88, 91, 92, 95, 93, 94],
      sparklineMonths: ['Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul'],
      personalGoals: [
        { goal: 'Enterprise-pipeline', progress: 78, target: '3 aktive deals > 200k' },
        { goal: 'Lukkerate større kunder', progress: 62, target: '25% → 35%' },
      ],
    },
    howToLead: {
      workingStyle: 'Camilla arbejder bedst med klare deadlines og synlige milepæle. Hun forbereder sig grundigt og forventer, at du gør det samme i udviklingssamtaler.',
      energizes: [
        'Konkret ansvar over et defineret område (fx mandagens warmup)',
        'Direkte anerkendelse af specifikke resultater — ikke generel ros',
        'At se sin udviklingsplan føre til handling inden for 14 dage',
      ],
      drains: [
        'Uafsluttede samtaler uden aftalt næste skridt',
        'Generelle "vi tager den senere"-løfter uden dato',
        'At performance anerkendes, men udvikling ignoreres',
      ],
      feedback: 'Vær specifik og kort. Start med én konkret observation, spørg hvad hun tænker, og aftal ét næste skridt. Undgå lange opremsninger.',
      difficult: 'Åbn med anerkendelse af noget konkret. Navngiv det du ikke har fulgt op på. Spørg: "Hvad ville gøre de næste to uger meningsfulde for dig?"',
    },
    employeeVisibleNote: 'Camilla kan se sine mål og sin udviklingsplan.',
    motivationHistory: [
      { date: '5. maj', value: 8.1 },
      { date: '19. maj', value: 7.8 },
      { date: '2. jun', value: 7.2 },
      { date: '16. jun', value: 6.5 },
      { date: '30. jun', value: 5.8 },
      { date: '7. jul', value: 5.2 },
    ],
    aiSummary:
      'Camilla er en stærk performer, der responderer godt på ansvar og direkte anerkendelse. Den seneste måned er hendes motivation faldet, mens performance er forblevet stabil. Du lovede at vende tilbage til hendes udviklingsplan efter den seneste kvartalssamtale, men ingen opfølgning er registreret.',
    openCommitments: [
      { who: 'Leder', text: 'Følg op på udviklingsplan efter kvartalssamtale', due: '1. jul 2025', status: 'forsinket', daysOverdue: 9 },
      { who: 'Leder', text: 'Booke produkttræning til større kunder', due: '15. apr 2025', status: 'forsinket', daysOverdue: 85 },
      { who: 'Camilla', text: 'Forberede 3 coaching-eksempler', due: '16. jul 2025', status: 'afventer', daysOverdue: null },
    ],
    developmentGoals: [
      { goal: 'Blive teamlead-kandidat', status: 'I gang', nextStep: 'Drøft ansvar og tidslinje' },
      { goal: 'Forbedre lukning på større kunder', status: 'I gang', nextStep: 'Book produkttræning' },
      { goal: 'Køre mandagens team-warmup', status: 'Afventer', nextStep: 'Aftal startdato' },
    ],
    promises: [
      { who: 'Leder', text: 'Drøfte teamlead-vej', status: 'forsinket' },
      { who: 'Medarbejder', text: 'Forberede 3 coaching-eksempler', status: 'afventer' },
      { who: 'Leder', text: 'Booke produkttræning', status: 'forsinket' },
    ],
    coachingNotes:
      'Responderer positivt, når hun får ejerskab over konkrete opgaver. Mister energi, når udviklingssamtaler ikke fører til synlige næste skridt.',
    meetingHistory: [
      { date: '16. jun', type: 'Kvartalssamtale', summary: 'Drøftede teamlead-ambitioner og udviklingsplan' },
      { date: '23. maj', type: '1:1', summary: 'Gennemgik Q2-performance og pipeline' },
      { date: '9. maj', type: 'Coaching', summary: 'Lukningsteknik på større deals' },
      { date: '25. apr', type: 'Anerkendelse', summary: 'Anerkendt for stærk Q1-afslutning' },
      { date: '11. apr', type: '1:1', summary: 'Ugentlig status og prioriteter' },
    ],
    aiSuggestions: [
      'Book 25-minutters opfølgning denne uge',
      'Start med anerkendelse af stærk Q2-performance',
      'Adressér den manglende udviklingsopfølgning direkte',
      'Spørg, om teamlead-ambitionen stadig er aktiv',
      'Aftal ét konkret ansvar for de næste 14 dage',
    ],
    meetingBrief: {
      duration: '25 minutter',
      tone: 'direkte, støttende, konkret',
      context: [
        'Motivation faldet fra 8,1 til 5,2',
        'Seneste 1:1 var for 23 dage siden',
        'Udviklingsopfølgning forsinket',
        'Performance stabil på 94%',
        'Ingen anerkendelse i 21 dage',
      ],
      agenda: [
        'Start med anerkendelse af stabil performance',
        'Adressér den manglende opfølgning åbent',
        'Spørg ind til den aktuelle motivation',
        'Vend tilbage til udviklingsmålet',
        'Aftal ét konkret næste skridt',
        'Fastsæt opfølgningsdato',
      ],
      questions: [
        'Sidst talte vi om din interesse for mere ansvar. Er det stadig noget, du ønsker?',
        'Din motivation er faldet på det seneste — hvad har ændret sig?',
        'Hvor synes du, jeg ikke har fulgt godt nok op?',
        'Hvad ville få de næste to uger til at føles som fremskridt?',
      ],
      promisesToReview: [
        { who: 'Leder', text: 'Booke produkttræning', status: 'forsinket' },
        { who: 'Medarbejder', text: 'Beskrive teamlead-ansvar', status: 'afventer' },
      ],
      outcome: 'Aftal ét synligt ansvar for Camilla inden for 14 dage.',
    },
  },
  {
    id: 'anders-moller',
    name: 'Anders Møller',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Stabil',
    signal: 'Topperformer, mangler anerkendelse',
    attentionSignal: 'Ingen anerkendelse i 21 dage',
    motivation: 8.4,
    motivationTrend: 'up',
    previousMotivation: 7.9,
    energy: 8,
    performance: 126,
    lastOneOnOne: '12 dage siden',
    lastOneOnOneDays: 12,
    nextMeeting: '18. jul',
    openPromises: 0,
    recognitionDays: 21,
    filterTags: ['top', 'attention'],
    action: 'Opret anerkendelse',
    actionType: 'recognition',
    context: 'topperformer, mangler anerkendelse',
  },
  {
    id: 'jonas-berg',
    name: 'Jonas Berg',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Stabil',
    signal: 'Klar til mere ansvar',
    attentionSignal: 'Teamlead-kandidat',
    motivation: 7.8,
    motivationTrend: 'up',
    previousMotivation: 7.2,
    energy: 8,
    performance: 108,
    lastOneOnOne: '8 dage siden',
    lastOneOnOneDays: 8,
    nextMeeting: '15. jul',
    openPromises: 1,
    recognitionDays: 5,
    filterTags: ['top'],
    action: 'Drøft ansvar',
    actionType: 'discuss',
    context: 'klar til mere ansvar',
  },
  {
    id: 'louise-eriksen',
    name: 'Louise Eriksen',
    role: 'Nyansat',
    team: 'Danmark Salg',
    status: 'Kræver opmærksomhed',
    signal: 'Onboarding uge 3, lav produktsikkerhed',
    attentionSignal: 'Onboarding-risiko',
    motivation: 6.5,
    motivationTrend: 'down',
    previousMotivation: 7.8,
    energy: 7,
    performance: 62,
    lastOneOnOne: '5 dage siden',
    lastOneOnOneDays: 5,
    nextMeeting: '11. jul',
    openPromises: 1,
    recognitionDays: null,
    filterTags: ['new', 'risk', 'attention'],
    action: 'Åbn onboarding',
    actionType: 'onboarding',
    context: 'onboarding uge 3, lav produktsikkerhed',
    tenure: '3 uger',
    ramp: {
      startDate: '17. jun 2025',
      currentDay: 24,
      status: 'behind',
      milestones: [
        {
          id: 'onboarding',
          label: 'Onboarding gennemført',
          status: 'reached',
          day: 10,
          date: '27. jun 2025',
          teamAvgDays: 14,
          comparison: 'ahead',
        },
        {
          id: 'first-sale',
          label: 'Første salg',
          status: 'pending',
          teamAvgDays: 21,
          comparison: 'behind',
          currentDay: 24,
        },
        {
          id: 'first-100k',
          label: 'Første 100k',
          status: 'upcoming',
          projectedLabel: 'Typisk dag 52 · teamgns.',
          teamAvgDays: 52,
        },
        {
          id: 'next',
          label: 'Produktsikkerhed 7/10',
          status: 'upcoming',
          note: 'Næste milepæl i onboarding',
        },
      ],
    },
    reading:
      'Louise er i uge 3 og har gennemført onboarding hurtigere end teamgennemsnittet — men hun har endnu ikke lukket sit første salg, og hun er nu 3 dage bag det typiske tempo. Produktsikkerheden er 5/10, og sidemandsoplæring er ikke booket.',
    signals: [
      { label: 'Produktsikkerhed', value: '5/10', source: 'KILDE: CHECK-IN' },
      { label: 'Onboarding', value: 'Uge 3', source: 'KILDE: CRM' },
      { label: 'Målopfyldelse', value: '62%', source: 'KILDE: CRM' },
    ],
  },
  {
    id: 'mikkel-sorensen',
    name: 'Mikkel Sørensen',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Stabil',
    signal: 'Høj aktivitet, lav konvertering',
    attentionSignal: 'Lav konvertering',
    motivation: 6.8,
    motivationTrend: 'down',
    previousMotivation: 7.4,
    energy: 7,
    performance: 78,
    lastOneOnOne: '3 dage siden',
    lastOneOnOneDays: 3,
    nextMeeting: '9. jul kl. 10:00',
    openPromises: 0,
    recognitionDays: 14,
    filterTags: ['attention'],
    action: 'Forbered 1:1',
    actionType: 'prepare-1-1',
    context: 'høj aktivitet, lav konvertering',
  },
  {
    id: 'emma-lund',
    name: 'Emma Lund',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Stabil',
    signal: 'Stabil, stille, muligvis overset',
    attentionSignal: 'Ingen anerkendelse i 28 dage',
    motivation: 7.2,
    motivationTrend: 'stable',
    previousMotivation: 7.1,
    energy: 7,
    performance: 96,
    lastOneOnOne: '14 dage siden',
    lastOneOnOneDays: 14,
    nextMeeting: '20. jul',
    openPromises: 0,
    recognitionDays: 28,
    filterTags: [],
    action: 'Tilføj note',
    actionType: 'note',
    context: 'stabil, stille, muligvis overset',
  },
  {
    id: 'frederik-noer',
    name: 'Frederik Noer',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Stabil',
    signal: 'Konkurrencemindet, motiveres af konkurrencer',
    attentionSignal: 'Stabil performer',
    motivation: 8.1,
    motivationTrend: 'up',
    previousMotivation: 7.6,
    energy: 9,
    performance: 112,
    lastOneOnOne: '10 dage siden',
    lastOneOnOneDays: 10,
    nextMeeting: '17. jul',
    openPromises: 0,
    recognitionDays: 7,
    filterTags: ['top'],
    action: 'Tilføj note',
    actionType: 'note',
    context: 'konkurrencemindet, motiveres af konkurrencer',
  },
  {
    id: 'sara-vinther',
    name: 'Sara Vinther',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Stabil',
    signal: 'Stærk empati, lav lukkesikkerhed',
    attentionSignal: 'Løfte forfalder i morgen',
    motivation: 7.0,
    motivationTrend: 'stable',
    previousMotivation: 7.1,
    energy: 7,
    performance: 88,
    lastOneOnOne: '11 dage siden',
    lastOneOnOneDays: 11,
    nextMeeting: '9. jul kl. 13:30',
    openPromises: 1,
    recognitionDays: 10,
    filterTags: ['attention'],
    action: 'Forbered coaching',
    actionType: 'coaching',
    context: 'stærk empati, lav lukkesikkerhed',
  },
  {
    id: 'daniel-kragh',
    name: 'Daniel Kragh',
    role: 'Senior salgskonsulent',
    team: 'Danmark Salg',
    status: 'Kræver opmærksomhed',
    signal: 'Topperformer, muligt burnout-signal',
    attentionSignal: 'Muligt burnout-signal',
    motivation: 6.2,
    motivationTrend: 'down',
    previousMotivation: 8.0,
    energy: 5,
    performance: 118,
    lastOneOnOne: '9 dage siden',
    lastOneOnOneDays: 9,
    nextMeeting: '16. jul',
    openPromises: 0,
    recognitionDays: 3,
    filterTags: ['top', 'risk', 'attention', 'low-motivation'],
    action: 'Check ind',
    actionType: 'check-in',
    context: 'topperformer, muligt burnout-signal',
  },
  {
    id: 'nadia-ali',
    name: 'Nadia Ali',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Stabil',
    signal: 'Stærk kollegastøtte, teamlead-kandidat',
    attentionSignal: 'Teamlead-kandidat',
    motivation: 8.0,
    motivationTrend: 'up',
    previousMotivation: 7.5,
    energy: 8,
    performance: 102,
    lastOneOnOne: '7 dage siden',
    lastOneOnOneDays: 7,
    nextMeeting: '14. jul',
    openPromises: 0,
    recognitionDays: 12,
    filterTags: ['top'],
    action: 'Drøft udvikling',
    actionType: 'discuss',
    context: 'stærk kollegastøtte, teamlead-kandidat',
    tenure: '2 år 8 mdr',
    leadershipHeadline: 'Giv Nadia platform til at vokse — hun motiveres af at løfte andre og er klar til gradvist ansvar.',
    reading:
      'Nadia er en stabil performer med stærk kollegastøtte og naturlig ledelsesinteresse. Hun overperformer på team-dimensioner og er den stærkeste teamlead-kandidat i gruppen. Næste skridt er at formalisere hendes mentorrolle og drøfte en tidslinje.',
    signals: [
      { label: 'Motivation', value: '8,0', sub: 'stigende', source: 'Kilde: Check-in' },
      { label: 'Energi', value: '8/10', source: 'Kilde: Check-in' },
      { label: 'Målopfyldelse', value: '102%', source: 'Kilde: CRM' },
    ],
    careerPath: {
      stages: [
        { title: 'Salgskonsulent', period: 'nu', milestone: '102% af mål · mentor for Louise', status: 'current' },
        { title: 'Senior salgskonsulent', period: 'Q4 2025', milestone: 'Formaliseret mentorforløb + enterprise-deals', required: 'Gennemfør onboarding-mentorforløb og luk 2 enterprise-deals' },
        { title: 'Teamlead', period: 'næste', milestone: 'Ledelse af 4–6 konsulenter', required: 'Konsistent målopfyldelse, stærk kollegastøtte, bekræftet ledelsesinteresse' },
      ],
      readiness: {
        summary: 'Klar til teamlead-ansvar: 2 af 4 signaler opfyldt',
        signals: [
          { label: 'Konsistent målopfyldelse (3 kvartaler > 95%)', met: true },
          { label: 'Stærk kollegastøtte (peer-score > 4/5)', met: true },
          { label: 'Gennemført onboarding-mentorforløb', met: false },
          { label: 'Ledelsesinteresse bekræftet i kvartalssamtale', met: false },
        ],
      },
    },
  },
  {
    id: 'rasmus-toft',
    name: 'Rasmus Toft',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Kræver opmærksomhed',
    signal: 'Lav motivation, misset mål',
    attentionSignal: 'Lav motivation',
    motivation: 4.8,
    motivationTrend: 'down',
    previousMotivation: 5.5,
    energy: 5,
    performance: 68,
    lastOneOnOne: '31 dage siden',
    lastOneOnOneDays: 31,
    nextMeeting: 'Ikke booket',
    openPromises: 1,
    recognitionDays: 35,
    filterTags: ['risk', 'attention', 'delayed-1-1', 'low-motivation'],
    action: 'Book 1:1',
    actionType: 'book-1-1',
    context: 'lav motivation, misset mål',
  },
  {
    id: 'julie-hartmann',
    name: 'Julie Hartmann',
    role: 'Salgskonsulent',
    team: 'Danmark Salg',
    status: 'Stabil',
    signal: 'Tilbage fra ferie, skal reaktiveres',
    attentionSignal: 'Reaktivering efter ferie',
    motivation: 6.8,
    motivationTrend: 'up',
    previousMotivation: 6.2,
    energy: 7,
    performance: 72,
    lastOneOnOne: '4 dage siden',
    lastOneOnOneDays: 4,
    nextMeeting: '12. jul',
    openPromises: 0,
    recognitionDays: null,
    filterTags: ['attention'],
    action: 'Reaktiver',
    actionType: 'reactivate',
    context: 'tilbage fra ferie, skal reaktiveres',
  },
];

export const teamPulse = 'Teamtrivsel 78/100 · 8 forsinkede opfølgninger';

export const cockpitOverduePromises = [
  { employeeId: 'camilla-holm', name: 'Camilla', text: 'Følg op på udviklingsplan', overdue: '9 dage forsinket' },
  { employeeId: 'jonas-berg', name: 'Jonas', text: 'Drøft teamlead-ansvar', overdue: 'forfalder i dag' },
  { employeeId: 'sara-vinther', name: 'Sara', text: 'Send lukketeknik', overdue: 'forfalder i morgen' },
];

export const leadershipPriorities = [
  {
    id: 'camilla-holm',
    employeeId: 'camilla-holm',
    name: 'Camilla Holm',
    role: 'Senior salgskonsulent',
    title: 'Motivation falder',
    description: 'Stabil performer · men den lovede udviklingsopfølgning fra juni er ikke fulgt op. Motivationen er faldet til 5,2 og energien er høj ved ejerskab.',
    signalVariant: 'risk',
    sources: ['KILDE: CHECK-IN', 'KILDE: SIDSTE 1:1'],
    action: 'Åbn Camilla',
    actionType: 'prepare-1-1',
    urgency: 'high',
  },
  {
    id: 'anders-moller',
    employeeId: 'anders-moller',
    name: 'Anders Møller',
    role: 'Salgskonsulent',
    title: 'Anerkendelse anbefales',
    description: '126% af målet denne måned. Ingen anerkendelse registreret i 21 dage.',
    signalVariant: 'warm',
    sources: ['KILDE: CRM', 'KILDE: LEDERNOTE'],
    action: 'Åbn Anders',
    actionType: 'recognition',
    urgency: 'medium',
  },
  {
    id: 'louise-eriksen',
    employeeId: 'louise-eriksen',
    name: 'Louise Eriksen',
    role: 'Nyansat',
    title: 'Onboarding-risiko',
    description: 'Uge 3. Produktsikkerhed 5/10. Ingen sidemandsoplæring booket.',
    signalVariant: 'caution',
    sources: ['KILDE: CHECK-IN'],
    action: 'Åbn Louise',
    actionType: 'onboarding',
    urgency: 'high',
  },
  {
    id: 'quarterly',
    employeeId: null,
    name: 'Kvartalssamtaler',
    role: 'Q3 cyklus',
    title: 'Bagud i tempo',
    description: '5 af 12 gennemført. I nuværende tempo slutter cyklussen 13 dage for sent.',
    signalVariant: 'caution',
    sources: ['KILDE: CRM'],
    action: 'Planlæg samtaler',
    actionType: 'plan-quarterly',
    urgency: 'medium',
  },
];

export const todaySchedule = [
  { time: '10:00', title: '1:1 med Mikkel', type: '1:1', employeeId: 'mikkel-sorensen', status: 'primary' },
  { time: '13:30', title: 'Coaching med Sara', type: 'Coaching', employeeId: 'sara-vinther', status: 'caution' },
  { time: '15:00', title: 'Teamets performancegennemgang', type: 'Team', employeeId: null, status: 'positive' },
];

export const suggestedActions = [
  'Book Camilla-opfølgning inden fredag',
  'Book Louise onboarding-check-in',
  'Ryk Rasmus\' kvartalssamtale frem',
];

export const overduePromises = [
  { employeeId: 'camilla-holm', name: 'Camilla', text: 'Følg op på udviklingsplan', overdue: '9 dage forsinket' },
  { employeeId: 'jonas-berg', name: 'Jonas', text: 'Drøft teamlead-ansvar', overdue: 'forfalder i dag' },
  { employeeId: 'sara-vinther', name: 'Sara', text: 'Send lukketeknik', overdue: 'forfalder i morgen' },
  { employeeId: 'rasmus-toft', name: 'Rasmus', text: 'Gennemgå aktivitetsplan', overdue: '3 dage forsinket' },
];

export const teamWellbeing = [
  { label: 'Gennemsnitlig motivation', value: '7,1/10', trend: 'down', trendValue: '−0,3', trendGood: false },
  { label: 'Gennemførte 1:1\'er denne måned', value: '68%', trend: 'down', trendValue: '−7%', trendGood: false },
  { label: 'Anerkendelser denne måned', value: '14', trend: 'up', trendValue: '+3', trendGood: true },
  { label: 'Forsinkede opfølgninger', value: '8', trend: 'up', trendValue: '+2', trendGood: false },
  { label: 'Kvartalssamtaler', value: '5/12', trend: 'neutral', trendValue: '−2', trendGood: false },
  { label: 'Onboarding-risiko', value: '1 person', trend: 'neutral', trendValue: null, trendGood: null },
];

export const rhythmCheck =
  '2 kvartalssamtaler bagud i tempo · 2 forsinkede 1:1\'er · Louise mangler ugentlig onboarding-check-in';

export const overdueOneOnOnes = [
  {
    id: 'rasmus-toft',
    name: 'Rasmus Toft',
    role: 'Salgskonsulent',
    days: 31,
    signal: 'Lav motivation, misset mål',
    action: 'Book 1:1',
  },
  {
    id: 'camilla-holm',
    name: 'Camilla Holm',
    role: 'Senior salgskonsulent',
    days: 23,
    signal: 'Motivation falder, opfølgning forsinket',
    action: 'Forbered 1:1',
  },
];

export const timeAllocation = [
  { label: 'Personaleledelse', hours: 8, color: '#2549E0' },
  { label: 'Administration', hours: 11, color: '#6B7280' },
  { label: 'Rapportering', hours: 4, color: '#9CA3AF' },
  { label: 'Møder', hours: 14, color: '#374151' },
  { label: 'Fordybet arbejde', hours: 3, color: '#D1D5DB' },
];

export const timeInsight =
  'Du har 6,5 timers ledelsestid til rådighed denne uge. De nuværende forsinkede personalehandlinger kræver ca. 3,2 timer.';

export const employeeFilters = [
  { id: 'all', label: 'Alle' },
  { id: 'attention', label: 'Kræver opmærksomhed' },
  { id: 'top', label: 'Topperformere' },
  { id: 'new', label: 'Nyansatte' },
  { id: 'risk', label: 'I risiko' },
  { id: 'delayed-1-1', label: 'Forsinket 1:1' },
  { id: 'low-motivation', label: 'Lav motivation' },
];

export const meetingOverview = {
  planned: 9,
  prepared: 3,
  overdue: 2,
  quarterlyRemaining: 5,
  openActions: 11,
};

export const meetingTypes = ['1:1', 'Kvartal', 'Onboarding', 'Coaching', 'Performance', 'Anerkendelse'];

export const quarterlyCycle = {
  title: 'Q3 ledelsessamtaler',
  completed: 5,
  booked: 3,
  notBooked: 4,
  estimatedTime: '6t 40m',
  paceNote: 'Nuværende tempo: cyklussen slutter 9 dage for sent',
  aiRecommendation:
    'For at nå det inden 24. juli, book 2 samtaler denne uge og 2 næste uge. Foreslåede tider: tirsdag 11:00, onsdag 14:30, fredag 09:00.',
  employees: [
    { id: 'camilla-holm', name: 'Camilla Holm', status: 'gennemført' },
    { id: 'anders-moller', name: 'Anders Møller', status: 'gennemført' },
    { id: 'jonas-berg', name: 'Jonas Berg', status: 'booket' },
    { id: 'louise-eriksen', name: 'Louise Eriksen', status: 'booket' },
    { id: 'mikkel-sorensen', name: 'Mikkel Sørensen', status: 'gennemført' },
    { id: 'emma-lund', name: 'Emma Lund', status: 'gennemført' },
    { id: 'frederik-noer', name: 'Frederik Noer', status: 'booket' },
    { id: 'sara-vinther', name: 'Sara Vinther', status: 'gennemført' },
    { id: 'daniel-kragh', name: 'Daniel Kragh', status: 'ikke booket' },
    { id: 'nadia-ali', name: 'Nadia Ali', status: 'ikke booket' },
    { id: 'rasmus-toft', name: 'Rasmus Toft', status: 'forsinket' },
    { id: 'julie-hartmann', name: 'Julie Hartmann', status: 'ikke booket' },
  ],
};

export const oneOnOneRhythm = [
  'Rasmus har ikke haft en 1:1 i 31 dage',
  'Louise (onboarding) bør have ugentlige check-ins',
  'Anders har haft 3 performancesamtaler, men ingen udviklingssamtale',
];

export const calendarTimeReadout =
  'Du brugte 5t 20m på direkte personaleledelse i sidste uge. Anbefalet minimum for denne teamstørrelse: 9t.';

export const weekEvents = [
  { day: 'Man', date: '7', events: [{ time: '09:00', title: 'Teamstandup', type: 'Team' }] },
  { day: 'Tir', date: '8', events: [{ time: '11:00', title: '1:1 Jonas', type: '1:1' }, { time: '14:00', title: 'Kvartal Emma', type: 'Kvartal' }] },
  { day: 'Ons', date: '9', events: [{ time: '10:00', title: '1:1 Mikkel', type: '1:1' }, { time: '13:30', title: 'Coaching Sara', type: 'Coaching' }, { time: '15:00', title: 'Performancegennemgang', type: 'Team' }] },
  { day: 'Tor', date: '10', events: [{ time: '09:30', title: 'Onboarding Louise', type: 'Onboarding' }] },
  { day: 'Fre', date: '11', events: [{ time: '09:00', title: 'Kvartal Rasmus', type: 'Kvartal' }, { time: '11:00', title: '1:1 Daniel', type: '1:1' }] },
];

export const teamInsight = {
  score: 78,
  label: 'Retningsgivende ledelsessignal — ikke objektiv sandhed.',
  status: 'Stabil, med 3 opmærksomhedsområder.',
  breakdown: [
    { label: 'Motivation', value: 72, color: '#2549E0' },
    { label: 'Coaching-kadence', value: 68, color: '#2549E0' },
    { label: 'Anerkendelse', value: 81, color: '#3F7D5B' },
    { label: 'Opfølgningsdisciplin', value: 61, color: '#D6642F' },
    { label: 'Onboarding', value: 74, color: '#2549E0' },
    { label: 'Performance-kontekst', value: 84, color: '#3F7D5B' },
  ],
  motivation: {
    trend: 'Faldende hos 3 medarbejdere over de seneste 30 dage',
    falling: ['Camilla Holm', 'Rasmus Toft', 'Mikkel Sørensen'],
    rising: ['Anders Møller', 'Jonas Berg', 'Julie Hartmann'],
  },
  recognition: {
    note: '4 medarbejdere uden anerkendelse i 21+ dage',
    people: ['Anders Møller', 'Emma Lund', 'Rasmus Toft', 'Camilla Holm'],
  },
  coachingCadence: '68% af teamet har haft coaching inden for 30 dage. Sara og Mikkel mangler struktureret coaching.',
  followUpDiscipline: '8 forsinkede opfølgninger. Mest kritiske: Camilla (udviklingsplan), Rasmus (aktivitetsplan).',
  onboardingRisk: 'Louise Eriksen — uge 3, produktsikkerhed 5/10, ingen sidemandsoplæring booket.',
  anonymousMailbox: {
    count: 7,
    themes: [
      '3 nævner uklare forventninger',
      '2 nævner manglende feedback',
      '1 nævner produkttræning',
      '1 nævner strukturen på teammøder',
    ],
    recommendation:
      'Adressér forventninger på næste mandagsmøde og gennemgå feedback-kadencen med teamleads.',
  },
};

export const aiQuickPrompts = [
  'Hvem kræver min opmærksomhed i dag?',
  'Forbered min 1:1 med Camilla',
  'Hvilke opfølgninger er jeg bagud med?',
  'Hjælp mig med at planlægge kvartalssamtaler',
  'Hvem bør jeg anerkende i denne uge?',
  'Hvilke sælgere er i risiko?',
  'Hvordan bør jeg coache Rasmus?',
  'Lav en plan for Louises onboarding',
];

export const aiSampleExchange = {
  user: 'Hvem kræver min opmærksomhed i dag?',
  assistant:
    'Tre personer skiller sig ud i dag: Camilla — motivationen er faldet gennem fem check-ins, og din udviklingsopfølgning er forsinket. Louise — onboarding-sikkerheden er lav, og sidemandsoplæring er ikke booket. Anders — stærk performance, men ingen anerkendelse i 21 dage. Foreslået plan: 25 min med Camilla · 15 min onboarding-check-in med Louise · 5 min anerkendelse til Anders. Samlet tid: 45 minutter.',
};

export const settingsSections = {
  team: {
    title: 'Team-opsætning',
    fields: [
      { label: 'Teamnavn', value: 'Danmark Salg' },
      { label: 'Leder', value: 'Mathias Nitzsch' },
      { label: 'Medarbejdere', value: '12' },
      { label: 'Roller', value: '2 senior, 9 konsulent, 1 nyansat' },
    ],
  },
  cadence: {
    title: 'Ledelseskadence',
    toggles: [
      { label: '1:1-frekvens', value: 'Hver 2. uge', enabled: true },
      { label: 'Kvartalscyklus', value: 'Q3 2025', enabled: true },
      { label: 'Onboarding-plan', value: '8 uger', enabled: true },
      { label: 'Anerkendelsespåmindelser', value: 'Efter 14 dage', enabled: true },
      { label: 'Check-in-frekvens', value: 'Ugentlig', enabled: false },
    ],
  },
  metrics: {
    title: 'Målinger',
    toggles: [
      { label: 'Måltype', value: 'Kvartalsmål', enabled: true },
      { label: 'Salgs-KPI', value: 'Omsætning + pipeline', enabled: true },
      { label: 'Aktivitets-KPI', value: 'Opkald + møder', enabled: true },
      { label: 'Motivations-/energiscore', value: 'Check-in baseret', enabled: true },
    ],
  },
  integrations: {
    title: 'Integrationer',
    toggles: [
      { label: 'Google Calendar', enabled: true },
      { label: 'Outlook', enabled: false },
      { label: 'HubSpot', enabled: true },
      { label: 'Salesforce', enabled: false },
      { label: 'Pipedrive', enabled: false },
      { label: 'Adversus', enabled: true },
      { label: 'Teams', enabled: true },
      { label: 'Slack', enabled: false },
    ],
  },
  aiRules: {
    title: 'AI-regler',
    toggles: [
      { label: 'Coaching-tone', value: 'Direkte og støttende', enabled: true },
      { label: 'Mødestil', value: 'Struktureret med fleksibilitet', enabled: true },
      { label: 'Standardvarigheder', value: '1:1 25 min · Kvartal 45 min', enabled: true },
      { label: 'Risikofølsomhed', value: 'Medium', enabled: true },
      { label: 'Sprog', value: 'Dansk', enabled: true },
    ],
  },
};

export const morgenmoedeData = {
  talkingPoints: [
    { id: '1', text: 'Gårsdagens tal — omsætning, antal salg, og hvem der toppede' },
    { id: '2', text: 'Refleksion fra gårsdagens 1:1 med Mikkel — pipeline-føringen føles tung for ham lige nu' },
    { id: '3', text: 'Camilla delte i check-in at hun mangler tydelighed på teamlead-sporet' },
    { id: '4', text: 'Kundeeksempel: Nordic Supply lukkede 340k efter tredje opfølgning — vis mønsteret for teamet' },
    { id: '5', text: 'Motivationsvinkel: Anders er 26% over mål uden anerkendelse i 3 uger' },
  ],
  yesterdayStats: {
    revenue: 487000,
    salesCount: 12,
    topSeller: 'Anders Møller',
  },
  durationHint: 'typisk 5–20 min',
  patterns: [
    {
      id: 'warm-leads',
      text: 'Du har taget \'opfølgning på varme leads\' op 9 gange på 3 uger — enten lander budskabet ikke, eller også er det et struktur-problem, ikke et påmindelses-problem.',
    },
    {
      id: 'customer-example',
      text: 'Morgenmøder hvor du delte et konkret kundeeksempel blev oftere fulgt af en god salgsdag end dem hvor du kun gennemgik tal.',
    },
    {
      id: 'time-mix',
      text: 'De sidste 2 uger har du brugt mest tid på tal (58%) og mindst på anerkendelse (6%).',
    },
  ],
  patternsFootnote: 'baseret på dine morgenmøde-noter over tid',
};

export function formatKr(amount) {
  return `${amount.toLocaleString('da-DK')} kr.`;
}

export const salesResults = {
  period: 'Juli 2025',
  periodNote: 'opdateret løbende',
  summary: {
    totalRevenue: 2847000,
    totalSales: 95,
    avgSale: 29968,
    teamTargetFulfillment: 94,
  },
  reps: [
    { employeeId: 'anders-moller', name: 'Anders Møller', salesCount: 14, revenue: 372000, commission: 33480, targetFulfillment: 126 },
    { employeeId: 'daniel-kragh', name: 'Daniel Kragh', salesCount: 11, revenue: 349000, commission: 31410, targetFulfillment: 118 },
    { employeeId: 'frederik-noer', name: 'Frederik Noer', salesCount: 10, revenue: 318000, commission: 28620, targetFulfillment: 112 },
    { employeeId: 'jonas-berg', name: 'Jonas Berg', salesCount: 9, revenue: 297000, commission: 26730, targetFulfillment: 108 },
    { employeeId: 'nadia-ali', name: 'Nadia Ali', salesCount: 9, revenue: 270000, commission: 24300, targetFulfillment: 102 },
    { employeeId: 'emma-lund', name: 'Emma Lund', salesCount: 8, revenue: 250000, commission: 22500, targetFulfillment: 96 },
    { employeeId: 'camilla-holm', name: 'Camilla Holm', salesCount: 8, revenue: 230000, commission: 20700, targetFulfillment: 94 },
    { employeeId: 'sara-vinther', name: 'Sara Vinther', salesCount: 7, revenue: 206000, commission: 18540, targetFulfillment: 88 },
    { employeeId: 'mikkel-sorensen', name: 'Mikkel Sørensen', salesCount: 6, revenue: 179000, commission: 16110, targetFulfillment: 78 },
    { employeeId: 'julie-hartmann', name: 'Julie Hartmann', salesCount: 5, revenue: 152000, commission: 13680, targetFulfillment: 72 },
    { employeeId: 'rasmus-toft', name: 'Rasmus Toft', salesCount: 4, revenue: 128000, commission: 11520, targetFulfillment: 68 },
    { employeeId: 'louise-eriksen', name: 'Louise Eriksen', salesCount: 4, revenue: 96000, commission: 8640, targetFulfillment: 62 },
  ],
};

export const meetingMocks = {
  'camilla-holm': {
    transcription: [
      'Camilla nævner frustration over store kunder',
      'Bekræfter fortsat interesse i teamlead',
      'Enig i produkttræning inden fredag',
      'Motivation faldet siden sidste kvartalssamtale',
      'Ønsker mere ejerskab i pipeline-arbejdet',
      'Aftalt opfølgning om to uger',
    ],
    summary: {
      aiSummary:
        'Camilla er stadig engageret og performer stabilt, men oplever at udviklingssamtaler ikke altid fører til handling. Hun bekræfter interessen for teamlead og er enig i, at produkttræning skal bookes inden fredag. Samtalen endte med ét konkret ansvar og en fast opfølgningsdato.',
      commitments: [
        { who: 'Leder', text: 'Book produkttræning', deadline: 'inden fredag' },
        { who: 'Camilla', text: 'Beskriv ønsket teamlead-ansvar skriftligt', deadline: 'inden 17. juli' },
        { who: 'Leder', text: 'Giv ejerskab over to større deals i pipeline', deadline: 'inden 14. juli' },
      ],
      journeyNotes: [
        'Motivation faldet — årsag drøftet åbent',
        'Teamlead-ambition stadig aktiv',
        'Produkttræning aftalt som næste skridt',
        'Opfølgning booket om 14 dage',
      ],
    },
    fokusark: {
      meetingType: 'Coachingmøde',
      meetingDate: '10. juli 2026',
      preparedBy: 'Mathias Nitzsch',
      kortOpsummering:
        'Du performer stabilt og viser modenhed i samarbejdet med kunder. Vi har aftalt at styrke din closing med mere ro, give dig mere ejerskab i pipeline, og få produkttræning på plads inden fredag.',
      strengths: [
        'Stærk relationsskaber — kunderne stoler på dig',
        'Høj målopfyldelse (94%) trods faldende motivation',
        'Klar på udvikling og åben i feedback-samtaler',
      ],
      fokuspunkter: [
        {
          title: 'Closing med mere ro og tydelighed',
          meaning: 'Du har styr på produktet, men springer nogle gange for hurtigt til afslutningen på større deals.',
          exercise: 'Øv "pause-og-bekræft"-teknikken på de næste to pipeline-møder.',
        },
        {
          title: 'Ejerskab i pipeline',
          meaning: 'Mere ansvar giver dig energi — vi vil give dig to deals, du driver selv.',
          exercise: 'Vælg to deals og lav en ugeplan for næste skridt i hver.',
        },
        {
          title: 'Synlige næste skridt',
          meaning: 'Udviklingssamtaler skal altid ende med noget konkret du kan mærke.',
          exercise: 'Efter hvert kundemøde: notér ét læringspunkt og del det med mig.',
        },
      ],
      aftaler: [
        'Mathias booker produkttræning — inden fredag',
        'Camilla beskriver ønsket teamlead-ansvar — inden 17. juli',
        'Camilla får ejerskab over to større deals — inden 14. juli',
        'Opfølgning bookes om 14 dage',
      ],
      naesteOpfoelgning: {
        date: '24. juli 2026',
        focus: 'Gennemgang af produkttræning og pipeline-ejerskab',
      },
    },
  },
};

export function getEmployeeById(id) {
  return employees.find((e) => e.id === id);
}

export function getMeetingMocks(employeeId) {
  return meetingMocks[employeeId] || null;
}
