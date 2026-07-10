import { useEffect, useState } from 'react';
import {
  Button, EmployeeAvatar, PromiseStatusBadge, SectionHeader,
  BodyText, ContentLabel, MonoLabel, PageTitle, HelperText,
} from '../components/ui';
import { getEmployeeById, getMeetingMocks } from '../data';

function formatElapsed(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function MoteModus({ employeeId, onStopMeeting }) {
  const employee = getEmployeeById(employeeId);
  const mocks = getMeetingMocks(employeeId);
  const brief = employee?.meetingBrief;

  const [elapsed, setElapsed] = useState(0);
  const [checkedItems, setCheckedItems] = useState(() => brief?.agenda.map(() => false) ?? []);
  const [visibleNotes, setVisibleNotes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mocks?.transcription.length) return undefined;
    if (visibleNotes >= mocks.transcription.length) return undefined;

    const delay = visibleNotes === 0 ? 2000 : 3500;
    const timeout = setTimeout(() => setVisibleNotes((n) => n + 1), delay);
    return () => clearTimeout(timeout);
  }, [visibleNotes, mocks]);

  if (!employee || !brief || !mocks) {
    return (
      <div className="max-w-[840px]">
        <BodyText>Mødemodus er ikke tilgængelig for denne medarbejder.</BodyText>
      </div>
    );
  }

  const toggleAgenda = (index) => {
    setCheckedItems((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <header className="flex items-center justify-between pb-6 mb-8 border-b border-border">
        <div className="flex items-center gap-4">
          <EmployeeAvatar name={employee.name} size="md" />
          <div>
            <PageTitle className="text-[1.5rem]">Mødemodus — {employee.name}</PageTitle>
            <HelperText className="mt-1">{brief.duration} · {brief.tone}</HelperText>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5 px-4 py-2 border border-border rounded-[8px] bg-surface">
            <span className="recording-dot" aria-hidden="true" />
            <span className="font-mono text-[13px] text-ink tabular-nums">
              Optager · {formatElapsed(elapsed)}
            </span>
          </div>
          <Button variant="secondary" onClick={onStopMeeting}>
            Stop møde
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="space-y-10">
          <section>
            <SectionHeader
              title="Dagsorden"
              subtitle="Tick af undervejs i samtalen"
            />
            <ul className="space-y-1">
              {brief.agenda.map((item, i) => (
                <li key={i}>
                  <label className="flex items-start gap-3 py-3 border-b border-border cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checkedItems[i]}
                      onChange={() => toggleAgenda(i)}
                      className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                    />
                    <span className={`body-text transition-colors ${checkedItems[i] ? 'text-subtle line-through' : ''}`}>
                      {item}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeader title="Foreslåede spørgsmål" />
            <div className="space-y-3">
              {brief.questions.map((q, i) => (
                <div key={i} className="py-3 border-l-2 border-border pl-4">
                  <ContentLabel className="block mb-1">Spørgsmål {i + 1}</ContentLabel>
                  <BodyText>{q}</BodyText>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Løfter at gennemgå" />
            <div className="divide-y divide-border">
              {brief.promisesToReview.map((promise, i) => (
                <div key={i} className="flex items-center justify-between py-3.5 first:pt-0">
                  <BodyText as="div">
                    {promise.who} — {promise.text}
                  </BodyText>
                  <PromiseStatusBadge status={promise.status} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="lg:sticky lg:top-8 lg:self-start">
          <div className="border border-border rounded-[8px] bg-surface min-h-[420px] flex flex-col">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <SectionHeader title="Noter" subtitle="Live fra samtalen" />
              <MonoLabel className="text-[10px] text-subtle">TRANSSKRIBERES</MonoLabel>
            </div>
            <div className="flex-1 px-5 py-5 space-y-4">
              {mocks.transcription.slice(0, visibleNotes).map((note, i) => (
                <div
                  key={i}
                  className="transcription-bullet flex items-start gap-3"
                  style={{ animationDelay: '0ms' }}
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 mt-2.5 shrink-0" />
                  <BodyText as="span">{note}</BodyText>
                </div>
              ))}
              {visibleNotes < mocks.transcription.length && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="typing-indicator">
                    <span /><span /><span />
                  </span>
                  <HelperText>Lytter…</HelperText>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
