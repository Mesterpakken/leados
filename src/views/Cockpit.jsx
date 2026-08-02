import {
  Button, Eyebrow, Subhead, PageTitle, SectionHeading, LeadOSSuggestionTag,
  PriorityCard, Panel, ScheduleItem, CommitmentItem, MonoTag,
} from '../components/ui';
import {
  leadershipPriorities, todaySchedule, cockpitOverduePromises, currentDate,
} from '../data';
import {
  attentionSignals, compassAngles, compassSignals, commercialSales,
} from '../data/commercial';

function currentFocusKey() {
  return Object.entries(compassSignals).sort((a, b) => b[1].score - a[1].score)[0][0];
}

export default function Cockpit({ onNavigateToProfile, onNavigateToMeeting, onNavigate }) {
  const topPriorities = leadershipPriorities.slice(0, 4);
  const currentFocus = currentFocusKey();
  const angle = compassAngles[currentFocus] ?? -55;

  const handlePriorityClick = (priority) => {
    if (priority.employeeId) onNavigateToProfile(priority.employeeId);
  };

  const handlePriorityAction = (priority) => {
    if (priority.actionType === 'prepare-1-1' && priority.employeeId) {
      onNavigateToMeeting(priority.employeeId);
    } else if (priority.employeeId) {
      onNavigateToProfile(priority.employeeId);
    }
  };

  return (
    <div className="page-shell">
      <header className="page-header-row">
        <div>
          <Eyebrow>{currentDate}</Eyebrow>
          <PageTitle>Godmorgen, Mathias.</PageTitle>
          <Subhead>
            Dit kompas peger mod {currentFocus.toLowerCase()}. Start med menneskene — salg og administration kommer bagefter.
          </Subhead>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="ghost" size="sm">Tilføj note</Button>
          <Button size="sm" onClick={() => onNavigate?.('salg')}>Åbn salgsoverblik</Button>
        </div>
      </header>

      <div className="los-commercial mb-6">
        <section className="intro-row" style={{ marginBottom: 18 }}>
          <div>
            <h2>
              Dit kompas peger mod <em>{currentFocus.toLowerCase()}</em>
            </h2>
            <p>
              Se mennesket bag tallene. Lead OS husker samtaler, signaler, løfter og udvikling — og viser dig, hvor din ledelse gør størst forskel.
            </p>
          </div>
          <span className="health">
            <i /> 3 menneskelige signaler kræver opmærksomhed
          </span>
        </section>

        <div className="overview-grid">
          <article className="card compass-card">
            <div className="card-head">
              <div>
                <span className="kicker">LEDERKOMPAS</span>
                <h3>Hvor skal du lægge dit fokus?</h3>
              </div>
              <span className="live">LIVE</span>
            </div>
            <div className="compass-wrap">
              <div className="compass">
                <span className="north">COACH</span>
                <span className="east">DRIVE</span>
                <span className="south">DECIDE</span>
                <span className="west">OPERATE</span>
                <div className="rings" />
                <div className="needle" style={{ transform: `rotate(${angle}deg)` }}>
                  <i />
                </div>
                <b>LOS</b>
              </div>
              <div className="focus-bars">
                {Object.entries(compassSignals).map(([name, data]) => (
                  <div key={name}>
                    <span>
                      {name}
                      <b>{data.score}</b>
                    </span>
                    <i>
                      <u style={{ width: `${data.score}%` }} />
                    </i>
                  </div>
                ))}
                <p>
                  <b>Hvorfor {currentFocus}?</b>
                  <br />
                  {compassSignals[currentFocus].reasons.slice(0, 2).join(' · ')}
                </p>
              </div>
            </div>
          </article>

          <article className="card attention-card">
            <div className="card-head">
              <div>
                <span className="kicker">MENNESKELIG INTELLIGENS</span>
                <h3>Hvem kræver din opmærksomhed?</h3>
              </div>
              <b>3</b>
            </div>
            <div className="signal-stack">
              {attentionSignals.map((signal) => (
                <button key={signal.id} type="button" onClick={() => onNavigateToProfile(signal.id)}>
                  <span className="signal-avatar">{signal.initials}</span>
                  <div>
                    <small>{signal.tags}</small>
                    <strong>{signal.title}</strong>
                    <p>{signal.body}</p>
                    <em>{signal.sources}</em>
                  </div>
                  <b>›</b>
                </button>
              ))}
            </div>
          </article>
        </div>

        <div className="metric-grid">
          <article className="metric">
            <span>OMSÆTNING · UGE</span>
            <strong>511.800 kr.</strong>
            <p>
              +18,4% <small>mod sidste uge</small>
            </p>
          </article>
          <article className="metric">
            <span>GENNEMSNITSORDRE</span>
            <strong>9.145 kr.</strong>
            <p>
              +1.260 <small>over 30 dage</small>
            </p>
          </article>
          <article className="metric">
            <span>AKTIVE MULIGHEDER</span>
            <strong>14</strong>
            <p>
              412.000 kr. <small>samlet potentiale</small>
            </p>
          </article>
          <article className="metric">
            <span>1:1 STATUS</span>
            <strong>12 / 16</strong>
            <p className="warning">
              4 mangler <small>denne cyklus</small>
            </p>
          </article>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[18px]">
        <div className="col-span-7">
          <div className="panel-title">
            <SectionHeading as="h2">Ledelsesprioriteter</SectionHeading>
            <LeadOSSuggestionTag />
          </div>
          <div className="priority-list">
            {topPriorities.map((priority) => (
              <PriorityCard
                key={priority.id}
                title={priority.name}
                role={priority.role}
                description={priority.description}
                signalVariant={priority.signalVariant || 'blue'}
                sources={priority.sources || []}
                action={priority.action}
                onClick={() => handlePriorityClick(priority)}
                onAction={() => handlePriorityAction(priority)}
              />
            ))}
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-[18px]">
          <Panel>
            <div className="panel-title">
              <SectionHeading as="h3">I dag</SectionHeading>
              <MonoTag>10. juli</MonoTag>
            </div>
            {todaySchedule.map((event, i) => (
              <ScheduleItem
                key={i}
                time={event.time}
                title={event.title}
                subtitle={event.type}
                status={event.status || 'primary'}
              />
            ))}
          </Panel>

          <Panel>
            <div className="panel-title">
              <SectionHeading as="h3">Åbne løfter</SectionHeading>
              <MonoTag>8 åbne</MonoTag>
            </div>
            {cockpitOverduePromises.map((promise) => (
              <CommitmentItem
                key={promise.employeeId}
                text={`${promise.name} — ${promise.text}`}
                meta={promise.overdue}
                status={promise.overdue.includes('forsinket') ? 'risk' : 'caution'}
              />
            ))}
          </Panel>

          <div className="los-commercial">
            <article className="card">
              <div className="card-head">
                <div>
                  <span className="kicker">TEAMETS PULS</span>
                  <h3>Salgstempo</h3>
                </div>
                <button type="button" className="text-button" onClick={() => onNavigate?.('salg')}>
                  Se salg ›
                </button>
              </div>
              {commercialSales.slice(0, 4).map((s, i) => (
                <div className="people-row" key={s.name}>
                  <span className="person-dot">{s.name[0]}</span>
                  <div>
                    <b>{s.name}</b>
                    <small>{i === 3 ? 'Faldende aktivitet' : 'Stabil udvikling'}</small>
                  </div>
                  <div className="mini-progress">
                    <i style={{ width: `${Math.min(100, (s.amount / s.target) * 100)}%` }} />
                  </div>
                  <strong>{Math.round((s.amount / s.target) * 100)}%</strong>
                </div>
              ))}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
