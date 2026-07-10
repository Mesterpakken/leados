import { currentUser } from '../data';
import { Button } from './ui';

const viewLabels = {
  cockpit: 'Cockpit',
  morgenmoede: 'Morgenmøde',
  medarbejdere: 'Medarbejdere',
  profil: 'Medarbejdere',
  moter: 'Møder',
  'mote-brief': 'Møder',
  kalender: 'Kalender',
  indsigt: 'Indsigt',
  resultater: 'Resultater',
  ai: 'AI-assistent',
  indstillinger: 'Indstillinger',
};

export default function TopBar({ activeView, onAskAi }) {
  const crumb = viewLabels[activeView] || 'Cockpit';

  return (
    <header className="app-topbar">
      <div className="breadcrumbs" aria-label="Brødkrummesti">
        <span>LeadOS</span>
        <span aria-hidden="true">·</span>
        <span className="breadcrumbs__current">{crumb}</span>
      </div>

      <div className="topbar-actions">
        <input
          type="text"
          className="topbar-search"
          placeholder="Søg medarbejder, løfte eller møde…"
          aria-label="Søg"
          readOnly
        />
        <Button variant="ghost" size="sm" onClick={onAskAi}>
          Spørg AI
        </Button>
        <div className="topbar-avatar" aria-hidden="true">
          {currentUser.initials}
        </div>
      </div>
    </header>
  );
}
