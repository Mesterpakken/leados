import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Cockpit from './views/Cockpit';
import Morgenmoede from './views/Morgenmoede';
import Medarbejdere from './views/Medarbejdere';
import Medarbejderprofil from './views/Medarbejderprofil';
import Moter from './views/Moter';
import Samtalebrief from './views/Samtalebrief';
import MoteModus from './views/MoteModus';
import MoteOpsummering from './views/MoteOpsummering';
import Fokusark from './views/Fokusark';
import Kalender from './views/Kalender';
import Indsigt from './views/Indsigt';
import Resultater from './views/Resultater';
import AIAssistent from './views/AIAssistent';
import Indstillinger from './views/Indstillinger';

const MEETING_FLOW_VIEWS = ['mote-live', 'mote-summary', 'fokusark'];

export default function App() {
  const [view, setView] = useState('cockpit');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [profileOrigin, setProfileOrigin] = useState('cockpit');
  const [briefOrigin, setBriefOrigin] = useState('profil');

  const isMeetingFlow = MEETING_FLOW_VIEWS.includes(view);

  const handleSidebarNavigate = (navId) => {
    setView(navId);
    setSelectedEmployeeId(null);
  };

  const handleNavigateToProfile = (employeeId) => {
    setProfileOrigin(view);
    setSelectedEmployeeId(employeeId);
    setView('profil');
  };

  const handleNavigateToMeeting = (employeeId) => {
    setBriefOrigin(view);
    setSelectedEmployeeId(employeeId);
    setView('mote-brief');
  };

  const handleStartMeeting = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setView('mote-live');
  };

  const handleStopMeeting = () => {
    setView('mote-summary');
  };

  const handleGenerateFokusark = () => {
    setView('fokusark');
  };

  const handleBack = () => {
    if (view === 'mote-brief') {
      setView(briefOrigin === 'mote-brief' ? 'moter' : briefOrigin);
    } else if (view === 'profil') {
      setView(profileOrigin);
    } else {
      setView('cockpit');
    }
  };

  const handleBackToCockpit = () => {
    setView('cockpit');
    setSelectedEmployeeId(null);
  };

  const renderView = () => {
    switch (view) {
      case 'cockpit':
        return (
          <Cockpit
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToMeeting={handleNavigateToMeeting}
          />
        );
      case 'morgenmoede':
        return <Morgenmoede />;
      case 'medarbejdere':
        return (
          <Medarbejdere
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToMeeting={handleNavigateToMeeting}
          />
        );
      case 'profil':
        return (
          <Medarbejderprofil
            employeeId={selectedEmployeeId}
            onBack={handleBack}
            onPrepareMeeting={handleNavigateToMeeting}
          />
        );
      case 'moter':
        return (
          <Moter onNavigateToBrief={handleNavigateToMeeting} />
        );
      case 'mote-brief':
        return (
          <Samtalebrief
            employeeId={selectedEmployeeId}
            onBack={handleBack}
            onBackToCockpit={handleBackToCockpit}
            onStartMeeting={handleStartMeeting}
          />
        );
      case 'mote-live':
        return (
          <MoteModus
            employeeId={selectedEmployeeId}
            onStopMeeting={handleStopMeeting}
          />
        );
      case 'mote-summary':
        return (
          <MoteOpsummering
            employeeId={selectedEmployeeId}
            onGenerateFokusark={handleGenerateFokusark}
            onBackToBrief={() => setView('mote-brief')}
          />
        );
      case 'fokusark':
        return (
          <Fokusark
            employeeId={selectedEmployeeId}
            onBack={() => setView('mote-summary')}
          />
        );
      case 'kalender':
        return <Kalender onNavigateToBrief={handleNavigateToMeeting} />;
      case 'indsigt':
        return <Indsigt />;
      case 'resultater':
        return <Resultater />;
      case 'ai':
        return <AIAssistent />;
      case 'indstillinger':
        return <Indstillinger />;
      default:
        return <Cockpit onNavigateToProfile={handleNavigateToProfile} onNavigateToMeeting={handleNavigateToMeeting} />;
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {!isMeetingFlow && (
        <Sidebar activeView={view} onNavigate={handleSidebarNavigate} />
      )}
      <div
        className="min-h-screen flex flex-col"
        style={{ marginLeft: isMeetingFlow ? 0 : 'var(--sidebar-width)' }}
      >
        {!isMeetingFlow && (
          <TopBar activeView={view} onAskAi={() => setView('ai')} />
        )}
        <main className={`app-content ${view === 'profil' || view === 'mote-brief' ? 'app-content--narrow' : ''}`}>
          {renderView()}
        </main>
      </div>
    </div>
  );
}
