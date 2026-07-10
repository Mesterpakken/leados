import {
  Button, Eyebrow, Subhead, PageTitle, SectionHeading, LeadOSSuggestionTag,
  PriorityCard, Panel, ScheduleItem, CommitmentItem, MonoTag,
} from '../components/ui';
import {
  leadershipPriorities, todaySchedule, cockpitOverduePromises, currentDate,
} from '../data';

export default function Cockpit({ onNavigateToProfile, onNavigateToMeeting }) {
  const topPriorities = leadershipPriorities.slice(0, 4);

  const handlePriorityClick = (priority) => {
    if (priority.employeeId) {
      onNavigateToProfile(priority.employeeId);
    }
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
            Dit team har 4 ledelsesprioriteter i dag. Start med menneskene — administrationen kommer bagefter.
          </Subhead>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="ghost" size="sm">Tilføj note</Button>
          <Button size="sm">Planlæg dag</Button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-[18px]">
        <div className="col-span-7">
          <div className="panel-title">
            <SectionHeading as="h2">Hvem kræver din opmærksomhed?</SectionHeading>
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
        </div>
      </div>
    </div>
  );
}
