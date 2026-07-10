import {
  Button, SectionHeader, EmployeeAvatar, StatusBadge, PromiseStatusBadge,
  LeadOSSuggestionTag, Icon, PageTitle, Hairline, BodyText, HelperText, Field, ContentLabel,
} from '../components/ui';
import { getEmployeeById } from '../data';

export default function Samtalebrief({ employeeId, onBack, onBackToCockpit, onStartMeeting }) {
  const employee = getEmployeeById(employeeId);

  if (!employee?.meetingBrief) {
    return (
      <div className="max-w-[840px]">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 section-label hover:text-ink mb-8 transition-colors cursor-pointer"
        >
          <Icon name="ArrowLeft" className="w-3.5 h-3.5" />
          Tilbage
        </button>
        <p className="text-muted text-sm">Ingen samtalebrief tilgængelig for denne medarbejder.</p>
        <Button variant="secondary" className="mt-4" onClick={onBack}>Tilbage</Button>
      </div>
    );
  }

  const brief = employee.meetingBrief;

  return (
    <div className="max-w-[840px]">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 section-label hover:text-ink mb-10 transition-colors cursor-pointer"
      >
        <Icon name="ArrowLeft" className="w-3.5 h-3.5" />
        Tilbage
      </button>

      <header className="mb-12 pb-8 border-b border-border">
        <LeadOSSuggestionTag className="block mb-4" />
        <div className="flex items-start gap-5">
          <EmployeeAvatar name={employee.name} size="lg" />
          <div className="flex-1">
            <PageTitle className="text-[1.85rem]">
              Forbered 1:1 — {employee.name}
            </PageTitle>
            <HelperText className="mt-2">{employee.role} · {employee.team}</HelperText>
            <div className="flex items-start gap-10 mt-4">
              <Field label="Varighed">{brief.duration}</Field>
              <Field label="Tone">{brief.tone}</Field>
            </div>
          </div>
          <StatusBadge variant="warning">{employee.signal}</StatusBadge>
        </div>
      </header>

      <div className="section-stack">
        <section>
          <SectionHeader
            title="Kontekst"
            subtitle="Det vigtigste at vide inden samtalen"
            action={<LeadOSSuggestionTag />}
          />
          <ul className="space-y-3">
            {brief.context.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-ink/30 mt-2.5 shrink-0" />
                <BodyText as="span">{item}</BodyText>
              </li>
            ))}
          </ul>
        </section>

        <Hairline />

        <section>
          <SectionHeader
            title="Foreslået dagsorden"
            subtitle="6 punkter · ca. 25 minutter"
            action={<LeadOSSuggestionTag />}
          />
          <ol className="space-y-4">
            {brief.agenda.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="font-mono text-[11px] text-subtle w-5 shrink-0 mt-0.5 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <BodyText as="span">{item}</BodyText>
              </li>
            ))}
          </ol>
        </section>

        <Hairline />

        <section>
          <SectionHeader
            title="Foreslåede spørgsmål"
            subtitle="Åbn samtalen med nysgerrighed, ikke konfrontation"
            action={<LeadOSSuggestionTag />}
          />
          <div className="space-y-3">
            {brief.questions.map((q, i) => (
              <div
                key={i}
                className="py-3.5 border-l-2 border-border pl-4"
              >
                <ContentLabel className="block mb-1.5">Spørgsmål {i + 1}</ContentLabel>
                <BodyText>{q}</BodyText>
              </div>
            ))}
          </div>
        </section>

        <Hairline />

        <section>
          <SectionHeader
            title="Løfter, der skal gennemgås"
            subtitle="Hold dem synlige i samtalen"
          />
          <div className="divide-y divide-border">
            {brief.promisesToReview.map((promise, i) => (
              <div key={i} className="flex items-center justify-between py-4 first:pt-0">
                <BodyText as="div">
                  {promise.who} — {promise.text}
                </BodyText>
                <PromiseStatusBadge status={promise.status} />
              </div>
            ))}
          </div>
        </section>

        <Hairline />

        <section className="border-l-2 border-primary/40 pl-5 py-1">
          <SectionHeader
            title="Foreslået udfald"
            subtitle="Ét konkret resultat at forlade samtalen med"
            action={<LeadOSSuggestionTag />}
          />
          <BodyText className="text-[1.05rem]">{brief.outcome}</BodyText>
        </section>

        <div className="flex items-center gap-3 pt-4 pb-8">
          <Button onClick={() => onStartMeeting?.(employeeId)}>Start møde</Button>
          <Button variant="secondary">Redigér dagsorden</Button>
          <Button variant="secondary">Book opfølgning</Button>
          {onBackToCockpit && (
            <Button variant="ghost" onClick={onBackToCockpit}>
              Tilbage til Cockpit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
