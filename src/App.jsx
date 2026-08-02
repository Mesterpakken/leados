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
import RegistrerSalg from './views/RegistrerSalg';

const LEADER_NAV = [
  { id: 'overview', label: 'Overblik', icon: '⌁' },
  { id: 'sales', label: 'Salg', icon: '↗' },
  { id: 'team', label: 'Medarbejdere', icon: '◎' },
  { id: 'meetings', label: 'Samtaler', icon: '◫' },
  { id: 'decisions', label: 'Afklaringer', icon: '⟲' },
  { id: 'calendar', label: 'Ledelsesrytme', icon: '□' },
  { id: 'compensation', label: 'Løn & provision', icon: '≈' },
];

const LEADER_VIEW_NAV = [
  { id: 'knowledge-bank', label: 'Vidensbank', icon: '◉' },
  { id: 'tv', label: 'TV-tavle', icon: '▣' },
];

const SELLER_NAV = [
  { id: 'seller-cockpit', label: 'Mit cockpit', icon: '⌁' },
  { id: 'seller-sales', label: 'Mine salg', icon: '↗' },
  { id: 'seller-ask', label: 'Spørg LeadOS', icon: '◉' },
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
  decisions: 'Afklaringer',
  calendar: 'Ledelsesrytme',
  compensation: 'Løn og provision',
  'knowledge-bank': 'Vidensbank',
  'seller-cockpit': 'Mit cockpit',
  'seller-sales': 'Mine salg',
  'seller-ask': 'Spørg LeadOS',
  'register-sale': 'Registrér salg',
  tv: 'Live salgstavle',
};

const SELLER_SECTIONS = new Set(['seller-cockpit', 'seller-sales', 'seller-ask']);

export default function App() {
  const [demoRole, setDemoRole] = useState('leader');
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
  const isSellerRole = demoRole === 'seller';

  const go = (id) => {
    setSection(id);
    if (id !== 'profil' && id !== 'mote-brief' && !MEETING_FLOW.includes(id)) {
      setDecisionFocusId(null);
    }
  };

  const switchRole = (role) => {
    setDemoRole(role);
    setAiOpen(false);
    if (role === 'seller') {
      setSection('seller-cockpit');
    } else {
      setSection('overview');
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
    'knowledge-bank': 'knowledge-bank',
    'seller-cockpit': 'seller-cockpit',
    'seller-sales': 'seller-sales',
    'seller-ask': 'seller-ask',
    'register-sale': 'seller-sales',
    tv: 'tv',
  }[section];

  const renderMain = () => {
    if (section === 'register-sale') {
      return (
        <RegistrerSalg
          notify={notify}
          onCancel={(next = 'seller-cockpit') => go(next)}
          onSubmitted={() => {}}
        />
      );
    }

    if (SELLER_SECTIONS.has(section) || section === 'knowledge-bank') {
      return (
        <SaelgerCockpit
          notify={notify}
          section={section}
          role={section === 'knowledge-bank' ? 'leader' : 'seller'}
          onRegisterSale={() => go('register-sale')}
        />
      );
    }

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
          />
        );
      case 'calendar':
        return <Ledelsesrytme onNavigateToBrief={(id) => openBrief(id, 'calendar')} />;
      case 'compensation':
        return <Provision notify={notify} />;
      case 'tv':
        return <TvTavle onExit={() => go(isSellerRole ? 'seller-sales' : 'sales')} />;
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
          <img
            src="/leados-lockup-reversed.svg"
            alt="LeadOS"
            className="brand-logo"
          />
          <div className="brand-copy">
            <p className="brand-tagline">Commercial Operating System</p>
            <p className="brand-byline">by Nitzsch &amp; Co.</p>
          </div>
        </div>

        <div className="demo-role" aria-label="Demovisning">
          <span className="demo-role-label">Demovisning</span>
          <div className="demo-role-toggle" role="group" aria-label="Skift rolle">
            <button
              type="button"
              className={demoRole === 'leader' ? 'active' : ''}
              onClick={() => switchRole('leader')}
            >
              Leder
            </button>
            <button
              type="button"
              className={demoRole === 'seller' ? 'active' : ''}
              onClick={() => switchRole('seller')}
            >
              Sælger
            </button>
          </div>
        </div>

        <div className="workspace">
          <span>{isSellerRole ? 'CH' : 'NT'}</span>
          <div>
            <b>{isSellerRole ? 'Christian' : 'Nordic Tools'}</b>
            <small>{isSellerRole ? 'Sælger · demo' : 'Demo workspace'}</small>
          </div>
          <i>⌄</i>
        </div>

        <nav>
          {isSellerRole ? (
            <>
              <p>SÆLGER</p>
              {SELLER_NAV.map((item) => (
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
            </>
          ) : (
            <>
              <p>ARBEJDSRUM</p>
              {LEADER_NAV.map((item) => (
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
              {LEADER_VIEW_NAV.map((item) => (
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
            </>
          )}
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">{isSellerRole ? 'CH' : 'MN'}</div>
          <div>
            <b>{isSellerRole ? 'Christian' : 'Mathias Nitzsch'}</b>
            <small>{isSellerRole ? 'Sælger · Nordic Tools' : 'Rådgiver · administrator'}</small>
          </div>
          <button type="button" aria-label="Mere">•••</button>
        </div>
      </aside>

      <main className="main">
        {!hideChrome && (
          <header>
            <div>
              <p className="eyebrow">
                {isSellerRole ? 'SÆLGER · DEMO' : 'SØNDAG · 2. AUGUST'}
              </p>
              <h1>{TITLES[section] || 'Lead OS'}</h1>
            </div>
            <div className="header-actions">
              {!isSellerRole && (
                <select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Periode">
                  <option>Denne uge</option>
                  <option>Denne måned</option>
                  <option>Dette kvartal</option>
                </select>
              )}
              {!isSellerRole && (
                <button type="button" className="secondary" onClick={() => setAiOpen(true)}>
                  Spørg AI
                </button>
              )}
              {!isSellerRole && (
                <button
                  type="button"
                  className="primary"
                  onClick={() => notify('Ny aktivitet er klar til registrering')}
                >
                  + Registrér aktivitet
                </button>
              )}
              {isSellerRole && section !== 'register-sale' && (
                <button type="button" className="primary" onClick={() => go('register-sale')}>
                  + Registrér salg
                </button>
              )}
            </div>
          </header>
        )}
        {renderMain()}
      </main>

      <Toast message={toast} />
      {!isSellerRole && (
        <AiDrawer
          open={aiOpen}
          onClose={() => setAiOpen(false)}
          onSendToMichael={() => openDecisions('dec-demo')}
          onOpenDecision={openDecisions}
        />
      )}
    </div>
  );
}
