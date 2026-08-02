import {
  Button, SectionHeader, QuarterlyStatusBadge, AiInsight, ProgressBar,
  EmployeeAvatar, StatusBadge, PageTitle, Card, BodyText, PageSubtitle, Field, HelperText, CardDivider,
} from '../components/ui';
import {
  quarterlyCycle, oneOnOneRhythm, calendarTimeReadout, weekEvents, overdueOneOnOnes,
} from '../data';
import { leadershipRhythmToday } from '../data/commercial';

const eventTypeClass = {
  '1:1': 'week-calendar-event--1-1',
  Kvartal: 'week-calendar-event--kvartal',
  Coaching: 'week-calendar-event--coaching',
  Onboarding: 'week-calendar-event--onboarding',
  Team: 'week-calendar-event--team',
};

export default function Kalender({ onNavigateToBrief }) {
  return (
    <div className="max-w-[1200px]">
      <header className="page-header">
        <PageTitle>Ledelsesrytme</PageTitle>
        <PageSubtitle>Kalenderen viser dit ledelsesarbejde — samtaler, løfter, reviews og opfølgninger</PageSubtitle>
      </header>

      <div className="los-commercial mb-10">
        <div className="people-intro" style={{ marginBottom: 16 }}>
          <div>
            <span className="kicker">LEDERRYTME · AUGUST</span>
            <h2>Kalenderen viser dit ledelsesarbejde</h2>
            <p>Ikke endnu en mødekalender — men samtaler, løfter, reviews og opfølgninger, der ellers forsvinder i driften.</p>
          </div>
          <span className="signal-tag attention">4 handlinger kræver opmærksomhed</span>
        </div>
        <div className="calendar-grid">
          <article className="card">
            <span className="kicker">I DAG · LEDERENS DAG</span>
            {leadershipRhythmToday.map((x) => (
              <div className="calendar-event" key={x[1]}>
                <time>{x[0]}</time>
                <div>
                  <b>{x[1]}</b>
                  <small>{x[2]}</small>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (x[3] && onNavigateToBrief) onNavigateToBrief(x[3]);
                  }}
                >
                  Åbn ›
                </button>
              </div>
            ))}
          </article>
          <article className="card">
            <span className="kicker">RYTMENS SUNDHED</span>
            <h3>Det er ved at skride</h3>
            <div className="rhythm-stat">
              <span>Kvartalssamtaler</span>
              <b>5 / 12</b>
              <small>4 dage bag planen</small>
            </div>
            <div className="rhythm-stat">
              <span>1:1 denne cyklus</span>
              <b>12 / 16</b>
              <small>Rasmus er 31 dage forsinket</small>
            </div>
            <div className="rhythm-stat">
              <span>Åbne lederløfter</span>
              <b>8</b>
              <small>2 er forfaldne</small>
            </div>
          </article>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-12 gap-y-12">
        <div className="col-span-7 section-group">
          <section>
            <SectionHeader title="Ugevisning" subtitle="Uge 28 · 7.–11. juli 2025" />
            <div className="week-calendar">
              {weekEvents.map((day) => {
                const isToday = day.date === '9';
                return (
                  <div
                    key={day.date}
                    className={`week-calendar-day${isToday ? ' week-calendar-day--today' : ''}`}
                  >
                    <div className="week-calendar-day-header">
                      <span className="week-calendar-day-name">{day.day}</span>
                      <span className={`week-calendar-day-date${isToday ? ' week-calendar-day-date--today' : ''}`}>
                        {day.date}
                      </span>
                    </div>
                    <div className="week-calendar-day-body">
                      {day.events.map((event, i) => (
                        <div
                          key={i}
                          className={`week-calendar-event ${eventTypeClass[event.type] || 'week-calendar-event--team'}`}
                        >
                          <span className="week-calendar-event-time">{event.time}</span>
                          <span className="week-calendar-event-title">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <SectionHeader
              title="Forsinkede 1:1'er"
              subtitle={`${overdueOneOnOnes.length} medarbejdere har overskredet 1:1-kadencen`}
            />
            <div className="divide-y divide-border">
              {overdueOneOnOnes.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between gap-4 py-4 first:pt-0">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <EmployeeAvatar name={emp.name} size="sm" />
                    <div className="min-w-0">
                      <BodyText as="span" className="block">{emp.name}</BodyText>
                      <HelperText className="mt-1">{emp.role} · {emp.signal}</HelperText>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge variant="danger">{emp.days} dage siden</StatusBadge>
                    {onNavigateToBrief && emp.id === 'camilla-holm' ? (
                      <Button size="sm" rowAction onClick={() => onNavigateToBrief(emp.id)}>
                        {emp.action}
                      </Button>
                    ) : (
                      <Button size="sm" rowAction variant="secondary">{emp.action}</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="1:1-rytme" subtitle="Hold rytmen — ikke skyld" />
            <div className="space-y-2">
              {oneOnOneRhythm.map((item, i) => (
                <BodyText key={i}>{item}</BodyText>
              ))}
            </div>
          </section>

          <section>
            <AiInsight>{calendarTimeReadout}</AiInsight>
          </section>
        </div>

        <div className="col-span-5">
          <Card>
            <div className="card-block">
              <SectionHeader title="Kvartalssamtale-cyklus" subtitle={quarterlyCycle.title} />
            </div>

            <CardDivider />

            <div className="card-block">
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                <Field label="Gennemført" numeric valueClassName="field-value--large text-success">
                  {quarterlyCycle.completed}
                </Field>
                <Field label="Booket" align="right" numeric valueClassName="field-value--large text-primary">
                  {quarterlyCycle.booked}
                </Field>
                <Field label="Ikke booket" numeric valueClassName="field-value--large">
                  {quarterlyCycle.notBooked}
                </Field>
                <Field label="Resttid" align="right" numeric valueClassName="field-value--large">
                  {quarterlyCycle.estimatedTime}
                </Field>
              </div>
            </div>

            <CardDivider />

            <div className="card-block">
              <ProgressBar value={(quarterlyCycle.completed / 12) * 100} />
              <HelperText className="text-warning mt-3 block">{quarterlyCycle.paceNote}</HelperText>
            </div>

            <CardDivider />

            <div className="card-block">
              <AiInsight showTag>{quarterlyCycle.aiRecommendation}</AiInsight>
            </div>

            <CardDivider />

            <div className="card-block">
              <div className="space-y-1 max-h-[300px] overflow-y-auto divide-y divide-border">
                {quarterlyCycle.employees.map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between py-2.5">
                    <BodyText as="span">{emp.name}</BodyText>
                    <QuarterlyStatusBadge status={emp.status} />
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full mt-6">Planlæg samtaler</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
