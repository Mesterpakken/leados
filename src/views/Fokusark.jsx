import { useState } from 'react';
import {
  Button, SectionHeader, PageTitle, Hairline, BodyText, HelperText, MonoLabel, ContentLabel,
} from '../components/ui';
import { getEmployeeById, getMeetingMocks } from '../data';

function EditableBlock({ editing, className = '', children, ...props }) {
  return (
    <div
      contentEditable={editing}
      suppressContentEditableWarning
      className={`${editing ? 'editable-field editable-field--active' : 'editable-field'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default function Fokusark({ employeeId, onBack }) {
  const employee = getEmployeeById(employeeId);
  const fokusark = getMeetingMocks(employeeId)?.fokusark;
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState(null);

  if (!employee || !fokusark) {
    return (
      <div className="max-w-[720px] mx-auto">
        <BodyText>Fokusark er ikke tilgængeligt for denne medarbejder.</BodyText>
        {onBack && (
          <Button variant="secondary" className="mt-4" onClick={onBack}>
            Tilbage
          </Button>
        )}
      </div>
    );
  }

  const handleSend = () => {
    setToast(`Fokusark sendt til ${employee.name}`);
    setTimeout(() => setToast(null), 3200);
  };

  return (
    <div className="max-w-[720px] mx-auto relative">
      {toast && (
        <div className="fokusark-toast" role="status">
          <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <HelperText>
          {editing ? 'Rediger indholdet — godkend før afsendelse' : 'Gennemse og godkend før afsendelse'}
        </HelperText>
        <div className="flex items-center gap-2">
          <Button
            variant={editing ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setEditing((e) => !e)}
          >
            {editing ? 'Færdig' : 'Redigér'}
          </Button>
          <Button size="sm" onClick={handleSend}>
            Send til medarbejder
          </Button>
        </div>
      </div>

      <article className="fokusark-sheet">
        <header className="pb-8 mb-8 border-b border-border">
          <PageTitle className="text-[1.85rem] mb-3">
            Fokusark — {employee.name}
          </PageTitle>
          <MonoLabel className="text-[11px] text-subtle">
            {fokusark.meetingType} · {fokusark.meetingDate} · Udarbejdet af {fokusark.preparedBy}
          </MonoLabel>
        </header>

        <section className="mb-10">
          <SectionHeader title="Kort opsummering" />
          <EditableBlock editing={editing} className="body-text text-[15px] leading-relaxed">
            {fokusark.kortOpsummering}
          </EditableBlock>
        </section>

        <Hairline />

        <section className="mb-10">
          <SectionHeader title="Det gør du godt" />
          <ul className="space-y-2.5">
            {fokusark.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="font-mono text-[11px] text-success mt-0.5 shrink-0">+</span>
                <EditableBlock editing={editing} className="body-text flex-1">
                  {item}
                </EditableBlock>
              </li>
            ))}
          </ul>
        </section>

        <Hairline />

        <section className="mb-10 space-y-8">
          {fokusark.fokuspunkter.map((punkt, i) => (
            <div key={i}>
              <MonoLabel className="block mb-2 text-[10px] text-subtle">
                Fokuspunkt {i + 1}
              </MonoLabel>
              <EditableBlock editing={editing} className="font-display text-[1.1rem] font-medium text-ink mb-2 tracking-[-0.02em]">
                {punkt.title}
              </EditableBlock>
              <div className="space-y-2 pl-0">
                <div>
                  <ContentLabel>Det betyder</ContentLabel>
                  <EditableBlock editing={editing} className="body-text mt-1">
                    {punkt.meaning}
                  </EditableBlock>
                </div>
                <div>
                  <ContentLabel>Øvelse</ContentLabel>
                  <EditableBlock editing={editing} className="body-text mt-1">
                    {punkt.exercise}
                  </EditableBlock>
                </div>
              </div>
            </div>
          ))}
        </section>

        <Hairline />

        <section className="mb-10">
          <SectionHeader title="Aftaler til næste møde" />
          <ul className="space-y-2.5">
            {fokusark.aftaler.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-ink/30 mt-2.5 shrink-0" />
                <EditableBlock editing={editing} className="body-text flex-1">
                  {item}
                </EditableBlock>
              </li>
            ))}
          </ul>
        </section>

        <Hairline />

        <section>
          <SectionHeader title="Næste opfølgning" />
          <EditableBlock editing={editing} className="font-display text-[1.05rem] text-ink mb-1">
            {fokusark.naesteOpfoelgning.date}
          </EditableBlock>
          <EditableBlock editing={editing} className="body-text text-muted">
            {fokusark.naesteOpfoelgning.focus}
          </EditableBlock>
        </section>
      </article>

      {onBack && (
        <div className="mt-8 pb-8">
          <Button variant="ghost" onClick={onBack}>
            Tilbage til opsummering
          </Button>
        </div>
      )}
    </div>
  );
}
