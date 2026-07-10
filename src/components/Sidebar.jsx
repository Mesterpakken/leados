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
        <div className="brand-mark">LeadOS</div>
        <div className="brand-tag">demo</div>
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
        ET NITSCH & COMPANY-SYSTEM
        <br />
        LEDERENS EKSTERNE HUKOMMELSE
      </div>
    </aside>
  );
}
