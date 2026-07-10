import { useState } from 'react';
import {
  PageTitle, Eyebrow, SectionHeading, Hairline, Button, BodyText,
  HelperText, MonoTag, Panel, Field, StatNumeral,
} from '../components/ui';
import { currentDate, morgenmoedeData, formatKr } from '../data';

function TalkingPointRow({ point, onChange, onRemove }) {
  return (
    <div className="morgenmoede-point">
      <span className="morgenmoede-point__bullet" aria-hidden="true" />
      <div
        className="morgenmoede-point__text body-text"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange(point.id, e.currentTarget.textContent || '')}
        role="textbox"
        aria-label="Dagsordenspunkt"
      >
        {point.text}
      </div>
      <button
        type="button"
        className="morgenmoede-point__remove"
        onClick={() => onRemove(point.id)}
        aria-label="Fjern punkt"
      >
        ×
      </button>
    </div>
  );
}

export default function Morgenmoede() {
  const [talkingPoints, setTalkingPoints] = useState(morgenmoedeData.talkingPoints);
  const [meetingStarted, setMeetingStarted] = useState(false);
  const { yesterdayStats, durationHint, patterns, patternsFootnote } = morgenmoedeData;

  const handlePointChange = (id, text) => {
    setTalkingPoints((prev) => prev.map((p) => (p.id === id ? { ...p, text } : p)));
  };

  const handleRemovePoint = (id) => {
    setTalkingPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddPoint = () => {
    setTalkingPoints((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, text: 'Nyt punkt…' },
    ]);
  };

  return (
    <div className="page-shell max-w-[840px]">
      <header className="page-header-row mb-2">
        <div>
          <Eyebrow>{currentDate}</Eyebrow>
          <PageTitle>Morgenmøde</PageTitle>
          <HelperText className="mt-2 block">
            Forbered dagens korte team-møde — og se mønstre i hvad du faktisk tager op over tid.
          </HelperText>
        </div>
      </header>

      <div className="section-stack">
        <section>
          <SectionHeading as="h2">Forberedelse</SectionHeading>
          <HelperText className="mt-2 block">
            Rediger punkterne — de er klar til dagens møde.
          </HelperText>

          <Panel className="mt-5">
            <div className="panel-title">
              <SectionHeading as="h3">Dagens punkter</SectionHeading>
              <Button variant="ghost" size="sm" onClick={handleAddPoint}>
                + Tilføj punkt
              </Button>
            </div>
            <div className="morgenmoede-points">
              {talkingPoints.map((point) => (
                <TalkingPointRow
                  key={point.id}
                  point={point}
                  onChange={handlePointChange}
                  onRemove={handleRemovePoint}
                />
              ))}
            </div>
          </Panel>

          <div className="morgenmoede-yesterday mt-5">
            <MonoTag className="block mb-3">Gårsdagens tal</MonoTag>
            <div className="morgenmoede-yesterday__grid">
              <Field label="Omsætning i går" numeric>
                <StatNumeral className="text-[1.5rem]">{formatKr(yesterdayStats.revenue)}</StatNumeral>
              </Field>
              <Field label="Antal salg" numeric>
                <StatNumeral className="text-[1.5rem]">{yesterdayStats.salesCount}</StatNumeral>
              </Field>
              <Field label="Bedste sælger">
                <BodyText as="span">{yesterdayStats.topSeller}</BodyText>
              </Field>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <Button onClick={() => setMeetingStarted(true)}>
              {meetingStarted ? 'Morgenmøde i gang…' : 'Start morgenmøde'}
            </Button>
            <HelperText>{durationHint}</HelperText>
          </div>
        </section>

        <Hairline />

        <section className="pb-16">
          <div className="section-header">
            <div>
              <SectionHeading as="h2">Mønstre i dine morgenmøder</SectionHeading>
              <HelperText className="mt-2 block">
                Retningsgivende signaler — ikke hårde konklusioner.
              </HelperText>
            </div>
            <MonoTag>LEADOS · ANALYSE</MonoTag>
          </div>

          <div className="morgenmoede-patterns">
            {patterns.map((pattern, i) => (
              <div key={pattern.id} className="morgenmoede-pattern">
                {i > 0 && <hr className="card-divider" />}
                <BodyText>{pattern.text}</BodyText>
              </div>
            ))}
          </div>

          <HelperText className="mt-6 italic">{patternsFootnote}</HelperText>
        </section>
      </div>
    </div>
  );
}
