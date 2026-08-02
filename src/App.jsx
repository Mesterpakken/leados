import { useState } from 'react';
import Toast from './components/Toast';
import AiDrawer from './components/AiDrawer';
import useToast from './hooks/useToast';
import Overview from './views/Overview';
import Salg from './views/Salg';
import Medarbejdere from './views/Medarbejdere';
import Medarbejderprofil from './views/Medarbejderprofil';
import Samtaler from './views/Samtaler';
import Samtalebrief from './views/Samtalebrief';
import MoteModus from './views/MoteModus';
import MoteOpsummering from './views/MoteOpsummering';
import Fokusark from './views/Fokusark';
import Beslutninger from './views/Beslutninger';
import Ledelsesrytme from './views/Ledelsesrytme';
import Provision from './views/Provision';
import SaelgerCockpit from './views/SaelgerCockpit';
import TvTavle from './views/TvTavle';

const PRIMARY_NAV = [
  { id: 'overview', label: 'Overblik', icon: '⌁' },
  { id: 'sales', label: 'Salg', icon: '↗' },
  { id: 'team', label: 'Medarbejdere', icon: '◎' },
  { id: 'meetings', label: 'Samtaler', icon: '◫' },
  { id: 'decisions', label: 'Beslutninger', icon: '◇' },
  { id: 'calendar', label: 'Ledelsesrytme', icon: '□' },
  { id: 'compensation', label: 'Løn & provision', icon: '≈' },
];

const VIEW_NAV = [
  { id: 'seller', label: 'Mit sælgercockpit', icon: '◉' },
  { id: 'tv', label: 'TV-tavle', icon: '▣' },
];

const MEETING_FLOW = ['mote-live', 'mote-summary', 'fokusark'];

const TITLES = {
  overview: 'God eftermiddag, Mathias',
  sales: 'Salg og performance',
  team: 'Medarbejdere',
  profil: 'Medarbejderbillede',
  meetings: 'Samtalecenter',
  'mote-brief': '1:1-forberedelse',
  'mote-live': 'Møde i gang',
  'mote-summary': 'Samtaleopsummering',
  fokusark: 'Fokusark',
  decisions: 'Beslutninger',
  calendar: 'Ledelsesrytme',
  compensation: 'Løn og provision',
  seller: 'Mit cockpit',
  tv: 'Live salgstavle',
};

export default function App() {
  const [section, setSection] = useState('overview');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('camilla-holm');
  const [profileOrigin, setProfileOrigin] = useState('team');
  const [briefOrigin, setBriefOrigin] = useState('meetings');
  const [range, setRange] = useState('Denne uge');
  const [aiOpen, setAiOpen] = useState(false);
  const [decisionFocusId, setDecisionFocusId] = useState(null);
  const { toast, notify } = useToast();

  const isMeetingFlow = MEETING_FLOW.includes(section);
  const isTv = section === 'tv';
  const hideChrome = isMeetingFlow || isTv;

  const go = (id) => {
    setSection(id);
    if (id !== 'profil' && id !== 'mote-brief' && !MEETING_FLOW.includes(id)) {
      setDecisionFocusId(null);
    }
  };

  const openProfile = (employeeId, from = section) => {
    setProfileOrigin(from);
    setSelectedEmployeeId(employeeId);
    setSection('profil');
  };

  const openBrief = (employeeId, from = section) => {
    setBriefOrigin(from);
    setSelectedEmployeeId(employeeId);
    setSection('mote-brief');
  };

  const openDecisions = (id = null) => {
    setDecisionFocusId(id);
    setSection('decisions');
    setAiOpen(false);
  };

  const activeNav = {
    overview: 'overview',
    sales: 'sales',
    team: 'team',
    profil: 'team',
    meetings: 'meetings',
    'mote-brief': 'meetings',
    'mote-live': 'meetings',
    'mote-summary': 'meetings',
    fokusark: 'meetings',
    decisions: 'decisions',
    calendar: 'calendar',
    compensation: 'compensation',
    seller: 'seller',
    tv: 'tv',
  }[section];

  const renderMain = () => {
    switch (section) {
      case 'overview':
        return (
          <Overview
            onOpenProfile={openProfile}
            onNavigate={go}
            onOpenBrief={openBrief}
          />
        );
      case 'sales':
        return <Salg notify={notify} onOpenTv={() => go('tv')} />;
      case 'team':
        return (
          <Medarbejdere
            onNavigateToProfile={(id) => openProfile(id, 'team')}
            onNavigateToMeeting={(id) => openBrief(id, 'team')}
          />
        );
      case 'profil':
        return (
          <Medarbejderprofil
            employeeId={selectedEmployeeId}
            onBack={() => go(profileOrigin)}
            onPrepareMeeting={(id) => openBrief(id, 'profil')}
          />
        );
      case 'meetings':
        return <Samtaler onOpenBrief={(id) => openBrief(id, 'meetings')} />;
      case 'mote-brief':
        return (
          <Samtalebrief
            employeeId={selectedEmployeeId}
            onBack={() => go(briefOrigin)}
            onBackToCockpit={() => go('overview')}
            onStartMeeting={(id) => {
              setSelectedEmployeeId(id);
              setSection('mote-live');
            }}
          />
        );
      case 'mote-live':
        return (
          <MoteModus
            employeeId={selectedEmployeeId}
            onStopMeeting={() => setSection('mote-summary')}
          />
        );
      case 'mote-summary':
        return (
          <MoteOpsummering
            employeeId={selectedEmployeeId}
            onGenerateFokusark={() => setSection('fokusark')}
            onBackToBrief={() => setSection('mote-brief')}
          />
        );
      case 'fokusark':
        return (
          <Fokusark
            employeeId={selectedEmployeeId}
            onBack={() => setSection('mote-summary')}
          />
        );
      case 'decisions':
        return (
          <Beslutninger
            notify={notify}
            focusId={decisionFocusId}
            onAskAi={() => setAiOpen(true)}
          />
        );
      case 'calendar':
        return <Ledelsesrytme onNavigateToBrief={(id) => openBrief(id, 'calendar')} />;
      case 'compensation':
        return <Provision notify={notify} />;
      case 'seller':
        return <SaelgerCockpit />;
      case 'tv':
        return <TvTavle onExit={() => go('sales')} />;
      default:
        return <Overview onOpenProfile={openProfile} onNavigate={go} onOpenBrief={openBrief} />;
    }
  };

  if (isTv) {
    return (
      <>
        {renderMain()}
        <Toast message={toast} />
      </>
    );
  }

  if (isMeetingFlow) {
    return (
      <>
        {renderMain()}
        <Toast message={toast} />
        <AiDrawer
          open={aiOpen}
          onClose={() => setAiOpen(false)}
          onSendToMichael={() => openDecisions('dec-demo')}
          onOpenDecision={openDecisions}
        />
      </>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">L</span>
          <div>
            <strong>Lead OS</strong>
            <small>Commercial operating system</small>
          </div>
        </div>
        <div className="workspace">
          <span>NT</span>
          <div>
            <b>Nordic Tools</b>
            <small>Demo workspace</small>
          </div>
          <i>⌄</i>
        </div>
        <nav>
          <p>ARBEJDSRUM</p>
          {PRIMARY_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeNav === item.id ? 'active' : ''}
              onClick={() => go(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <p>VISNING</p>
          {VIEW_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeNav === item.id ? 'active' : ''}
              onClick={() => go(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="avatar">MN</div>
          <div>
            <b>Mathias Nitzsch</b>
            <small>Rådgiver · administrator</small>
          </div>
          <button type="button" aria-label="Mere">•••</button>
        </div>
      </aside>

      <main className="main">
        {!hideChrome && (
          <header>
            <div>
              <p className="eyebrow">SØNDAG · 2. AUGUST</p>
              <h1>{TITLES[section] || 'Lead OS'}</h1>
            </div>
            <div className="header-actions">
              <select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Periode">
                <option>Denne uge</option>
                <option>Denne måned</option>
                <option>Dette kvartal</option>
              </select>
              <button type="button" className="secondary" onClick={() => setAiOpen(true)}>
                Spørg AI
              </button>
              <button
                type="button"
                className="primary"
                onClick={() => notify('Ny aktivitet er klar til registrering')}
              >
                + Registrér aktivitet
              </button>
            </div>
          </header>
        )}
        {renderMain()}
      </main>

      <Toast message={toast} />
      <AiDrawer
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onSendToMichael={() => openDecisions('dec-demo')}
        onOpenDecision={openDecisions}
      />
    </div>
  );
}
