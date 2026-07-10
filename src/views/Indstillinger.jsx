import { useState } from 'react';
import { SectionHeader, PageTitle, PageSubtitle, Field, HelperText, BodyText } from '../components/ui';
import { settingsSections } from '../data';

function Toggle({ enabled: initial, label, value }) {
  const [enabled, setEnabled] = useState(initial);

  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div>
        <BodyText as="div">{label}</BodyText>
        {value && <HelperText className="mt-1">{value}</HelperText>}
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
          enabled ? 'bg-primary' : 'bg-border'
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-surface transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export default function Indstillinger() {
  const { team, cadence, metrics, integrations, aiRules } = settingsSections;

  return (
    <div className="max-w-[800px]">
      <header className="page-header">
        <PageTitle>Indstillinger</PageTitle>
        <PageSubtitle>Team-opsætning, kadence og integrationer</PageSubtitle>
      </header>

      <div className="section-group">
        <section>
          <SectionHeader title={team.title} />
          <div className="grid grid-cols-2 gap-6">
            {team.fields.map((field) => (
              <Field key={field.label} label={field.label}>
                {field.value}
              </Field>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title={cadence.title} />
          {cadence.toggles.map((toggle) => (
            <Toggle key={toggle.label} {...toggle} />
          ))}
        </section>

        <section>
          <SectionHeader title={metrics.title} />
          {metrics.toggles.map((toggle) => (
            <Toggle key={toggle.label} {...toggle} />
          ))}
        </section>

        <section>
          <SectionHeader title={integrations.title} />
          {integrations.toggles.map((toggle) => (
            <Toggle key={toggle.label} label={toggle.label} enabled={toggle.enabled} />
          ))}
        </section>

        <section>
          <SectionHeader title={aiRules.title} />
          {aiRules.toggles.map((toggle) => (
            <Toggle key={toggle.label} {...toggle} />
          ))}
        </section>
      </div>
    </div>
  );
}
