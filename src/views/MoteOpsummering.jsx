import {
  Button, EmployeeAvatar, SectionHeader, LeadOSSuggestionTag,
  PageTitle, Hairline, BodyText, HelperText, MonoLabel,
} from '../components/ui';
import { getEmployeeById, getMeetingMocks } from '../data';

export default function MoteOpsummering({ employeeId, onGenerateFokusark, onBackToBrief }) {
  const employee = getEmployeeById(employeeId);
  const mocks = getMeetingMocks(employeeId);
  const summary = mocks?.summary;

  if (!employee || !summary) {
    return (
      <div className="max-w-[840px]">
        <BodyText>Opsummering er ikke tilgængelig for denne medarbejder.</BodyText>
        {onBackToBrief && (
          <Button variant="secondary" className="mt-4" onClick={onBackToBrief}>
            Tilbage
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[840px] mx-auto">
      <header className="mb-10 pb-8 border-b border-border">
        <LeadOSSuggestionTag className="block mb-4" />
        <div className="flex items-start gap-5">
          <EmployeeAvatar name={employee.name} size="lg" />
          <div>
            <PageTitle className="text-[1.75rem]">
              Møde afsluttet — {employee.name}
            </PageTitle>
            <HelperText className="mt-2">
              LeadOS har udtrukket nøglepunkter fra samtalen
            </HelperText>
          </div>
        </div>
      </header>

      <div className="section-stack">
        <section className="border-l-2 border-primary/40 pl-5 py-1">
          <SectionHeader
            title="Opsummering"
            subtitle="AI-genereret ud fra mødet"
            action={<LeadOSSuggestionTag />}
          />
          <BodyText className="text-[1.05rem]">{summary.aiSummary}</BodyText>
        </section>

        <Hairline />

        <section>
          <SectionHeader
            title="Udtrukne aftaler"
            subtitle="Ejerskab og deadline"
            action={<LeadOSSuggestionTag />}
          />
          <div className="divide-y divide-border">
            {summary.commitments.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-4 py-4 first:pt-0">
                <BodyText as="div">
                  <span className="font-medium">{item.who}</span>
                  {' — '}
                  {item.text}
                </BodyText>
                <MonoLabel className="shrink-0 text-[10px] text-subtle">
                  {item.deadline}
                </MonoLabel>
              </div>
            ))}
          </div>
        </section>

        <Hairline />

        <section>
          <SectionHeader
            title="Tilføjes til Forløbet"
            subtitle="Noter der gemmes på medarbejderprofilen"
          />
          <ul className="space-y-3">
            {summary.journeyNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-ink/30 mt-2.5 shrink-0" />
                <BodyText as="span">{note}</BodyText>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex items-center gap-3 pt-6 pb-8">
          <Button onClick={onGenerateFokusark}>Generér Fokusark</Button>
          {onBackToBrief && (
            <Button variant="ghost" onClick={onBackToBrief}>
              Tilbage til brief
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
