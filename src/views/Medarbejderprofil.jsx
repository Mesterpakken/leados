import {
  Button, StatusBadge, LeadOSSuggestionTag, SourceTag,
  Icon, SectionHeading, Hairline, HelperText, BodyText, Field, ContentLabel, MonoLabel, Panel,
} from '../components/ui';
import Sparkline from '../components/Sparkline';
import RampJourney from '../components/RampJourney';
import { getEmployeeById } from '../data';

const journeyTone = {
  '1:1': '',
  Kvartalssamtale: 'terracotta',
  Coaching: 'caution',
  'Coaching-notat': 'caution',
  Anerkendelse: 'positive',
  Løfte: 'risk',
  'Check-in': 'blue',
};

function DossierSection({ title, subtitle, children }) {
  return (
    <section>
      <SectionHeading as="h2">{title}</SectionHeading>
      {subtitle && <HelperText className="mt-2 block">{subtitle}</HelperText>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function Medarbejderprofil({ employeeId, onBack, onPrepareMeeting }) {
  const employee = getEmployeeById(employeeId);

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">Medarbejder ikke fundet.</p>
        <Button variant="secondary" className="mt-4" onClick={onBack}>Tilbage</Button>
      </div>
    );
  }

  const journey = employee.journey || employee.meetingHistory?.map((m) => ({
    date: m.date,
    type: m.type,
    summary: m.summary,
    fromEmployee: false,
    status: null,
  })) || [];

  const reading = employee.reading || employee.aiSummary;
  const signals = employee.signals || [
    { label: 'Motivation', value: `${employee.motivation}`, source: 'KILDE: CHECK-IN' },
    { label: 'Energi', value: `${employee.energy}/10`, source: 'KILDE: CHECK-IN' },
    { label: 'Målopfyldelse', value: `${employee.performance}%`, source: 'KILDE: CRM' },
  ];

  return (
    <article className="page-shell max-w-[920px]">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 section-label hover:text-ink mb-8 transition-colors cursor-pointer"
      >
        <Icon name="ArrowLeft" className="w-3.5 h-3.5" />
        Tilbage
      </button>

      <header className="profile-band">
        <div>
          <div className="profile-name">{employee.name}</div>
          <HelperText>
            {employee.role}
            {employee.tenure && <> · {employee.tenure}</>}
            {' · '}{employee.team}
          </HelperText>
          {employee.leadershipHeadline && (
            <BodyText className="mt-4 max-w-[640px]">{employee.leadershipHeadline}</BodyText>
          )}
        </div>
        <div className="flex items-start gap-2.5 flex-wrap justify-end">
          <Button onClick={() => onPrepareMeeting(employee.id)}>Forbered 1:1</Button>
          <Button variant="ghost" size="sm">Tilføj note</Button>
          <Button variant="ghost" size="sm">Tilføj løfte</Button>
        </div>
      </header>

      <Panel className="mb-5">
        <div className="panel-title">
          <SectionHeading as="h3">Signaler</SectionHeading>
          <StatusBadge variant={employee.status === 'Kræver opmærksomhed' ? 'warning' : 'primary'}>
            {employee.status}
          </StatusBadge>
        </div>
        <div className={`signal-grid ${signals.length === 3 ? 'signal-grid--3' : ''}`}>
          {signals.map((sig) => (
            <div key={sig.label} className="signal-cell">
              <div className="signal-number">{sig.value}</div>
              <div className="signal-label">{sig.label}</div>
              {sig.sub && <div className="text-risk text-sm mb-2">{sig.sub}</div>}
              <SourceTag>{sig.source}</SourceTag>
            </div>
          ))}
        </div>
      </Panel>

      <div className="section-stack">
        <DossierSection title="Læsningen">
          <BodyText>{reading}</BodyText>
          <HelperText className="mt-4">Syntetiseret fra {employee.name.split(' ')[0]}s forløb</HelperText>
        </DossierSection>

        <Hairline />

        <DossierSection title="Forløbet" subtitle="Kronologisk — nyeste først. Her lever aftaler, løfter og forløb.">
          <div className="timeline">
            {journey.map((entry, i) => (
              <div
                key={i}
                className={`timeline-event ${
                  journeyTone[entry.type] ? `timeline-event--${journeyTone[entry.type]}` : ''
                }`}
              >
                <div className="timeline-date">{entry.date}</div>
                <div className="timeline-title">
                  {entry.type}
                  {entry.fromEmployee && (
                    <span className="text-terracotta font-normal"> · Fra {employee.name.split(' ')[0]}</span>
                  )}
                  {entry.status && (
                    <span className={`ml-2 font-mono text-[10px] uppercase tracking-[0.08em] ${
                      entry.status.toLowerCase().includes('forsinket') ? 'text-risk'
                        : entry.status.toLowerCase().includes('afventer') ? 'text-caution' : 'text-muted'
                    }`}>
                      {entry.status}
                    </span>
                  )}
                </div>
                <div className="timeline-text">{entry.summary}</div>
              </div>
            ))}
          </div>
        </DossierSection>

        {employee.ramp && (
          <>
            <Hairline />
            <DossierSection
              title="Rejsen"
              subtitle="Hvor hurtigt nåede sælgeren nøglemilepæle — sammenlignet med teamets typiske tempo."
            >
              <RampJourney ramp={employee.ramp} />
            </DossierSection>
          </>
        )}

        {(employee.targets || employee.performance) && (
          <>
            <Hairline />
            <DossierSection title="Tal & mål">
              {employee.targets ? (
                <>
                  <div className="flex items-start gap-10 mb-6">
                    <Field label={employee.targets.monthlyLabel} numeric valueClassName="field-value--large">
                      {employee.targets.monthlyValue}% af mål
                    </Field>
                    <Field label="6 måneder">
                      <Sparkline data={employee.targets.sparkline} width={140} height={36} />
                    </Field>
                  </div>
                  <div className="space-y-5">
                    {employee.targets.personalGoals.map((g) => (
                      <div key={g.goal}>
                        <div className="flex justify-between mb-1.5">
                          <BodyText as="span">{g.goal}</BodyText>
                          <span className="signal-number text-[1.25rem]">{g.progress}%</span>
                        </div>
                        <div className="h-1 bg-border rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-blue" style={{ width: `${g.progress}%`, background: 'var(--blue)' }} />
                        </div>
                        <HelperText className="mt-1">{g.target}</HelperText>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="signal-number">{employee.performance}%</div>
              )}
            </DossierSection>
          </>
        )}

        {employee.developmentGoals && (
          <>
            <Hairline />
            <DossierSection title="Udvikling">
              <div className="space-y-5">
                {employee.developmentGoals.map((goal, i) => (
                  <div key={i} className="pb-5 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <BodyText>{goal.goal}</BodyText>
                        <HelperText className="mt-1.5">Næste skridt · {goal.nextStep}</HelperText>
                      </div>
                      <StatusBadge variant={goal.status === 'I gang' ? 'primary' : 'default'}>
                        {goal.status}
                      </StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
              {employee.employeeVisibleNote && (
                <HelperText className="mt-5 italic">{employee.employeeVisibleNote}</HelperText>
              )}
            </DossierSection>
          </>
        )}

        {employee.howToLead && (
          <>
            <Hairline />
            <DossierSection title="Sådan går du til hende">
              <BodyText className="mb-6">{employee.howToLead.workingStyle}</BodyText>
              <div className="space-y-6">
                <div>
                  <ContentLabel className="text-positive block mb-2">Det giver energi</ContentLabel>
                  <ul className="space-y-2">
                    {employee.howToLead.energizes.map((item, i) => (
                      <li key={i} className="pl-3 border-l border-success/30"><BodyText>{item}</BodyText></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ContentLabel className="text-risk block mb-2">Det dræner</ContentLabel>
                  <ul className="space-y-2">
                    {employee.howToLead.drains.map((item, i) => (
                      <li key={i} className="pl-3 border-l border-danger/30"><BodyText>{item}</BodyText></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ContentLabel className="block mb-2">Feedback</ContentLabel>
                  <BodyText>{employee.howToLead.feedback}</BodyText>
                </div>
                <div>
                  <ContentLabel className="block mb-2">Svær samtale</ContentLabel>
                  <BodyText>{employee.howToLead.difficult}</BodyText>
                </div>
              </div>
              <HelperText className="mt-6">Baseret på observeret adfærd — ikke en fast type</HelperText>
            </DossierSection>
          </>
        )}

        {(employee.openCommitments || employee.promises) && (
          <>
            <Hairline />
            <DossierSection title="Åbne løfter">
              <div className="space-y-1">
                {(employee.openCommitments || employee.promises.map((p) => ({
                  who: p.who,
                  text: p.text,
                  due: null,
                  status: p.status,
                }))).map((c, i) => (
                  <div key={i} className="commitment-item">
                    <span className="schedule-time" />
                    <div>
                      <div className="timeline-title">{c.who} — {c.text}</div>
                      {c.due && <div className="timeline-text">Forfald · {c.due}</div>}
                    </div>
                    <span className={`status-dot status-dot--${
                      c.status === 'forsinket' ? 'risk' : c.status === 'afventer' ? 'caution' : 'blue'
                    }`} />
                  </div>
                ))}
              </div>
            </DossierSection>
          </>
        )}

        {employee.aiSuggestions && (
          <>
            <Hairline />
            <section className="pb-16">
              <div className="panel-title">
                <SectionHeading as="h3">Næste skridt</SectionHeading>
                <LeadOSSuggestionTag />
              </div>
              <div className="border-l-2 border-primary/35 pl-4 space-y-3">
                {employee.aiSuggestions.map((suggestion, i) => (
                  <BodyText key={i}>{suggestion}</BodyText>
                ))}
              </div>
              <Button className="mt-6" variant="blue" onClick={() => onPrepareMeeting(employee.id)}>
                Forbered 1:1
              </Button>
            </section>
          </>
        )}
      </div>
    </article>
  );
}
