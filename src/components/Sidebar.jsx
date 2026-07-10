import { navItems } from '../data';

export default function Sidebar({ activeView, onNavigate }) {
  const viewToNav = {
    cockpit: 'cockpit',
    morgenmoede: 'morgenmoede',
    medarbejdere: 'medarbejdere',
    profil: 'medarbejdere',
    moter: 'moter',
    'mote-brief': 'moter',
    kalender: 'kalender',
    indsigt: 'indsigt',
    resultater: 'resultater',
    ai: 'ai',
    indstillinger: 'indstillinger',
  };

  const activeNav = viewToNav[activeView] || activeView;

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo-frame">
          <img src="/logo.png" alt="LeadOS" className="brand-logo" />
        </div>
        <p className="brand-tagline">Styrker ledere. Løfter sælgere.</p>
      </div>

      <nav className="sidebar-nav" aria-label="LeadOS navigation">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
            >
              <span className="nav-item__label">
                <span className="nav-dot" aria-hidden="true" />
                {item.label}
              </span>
              {item.count && <span className="nav-count">{item.count}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer__credit">Et system af Nitzsch &amp; Co.</span>
        <span className="sidebar-footer__tagline">Lederens eksterne hukommelse</span>
      </div>
    </aside>
  );
}
