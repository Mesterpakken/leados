import {
  SectionHeader, ProgressBar, AiInsight, StatusBadge, LeadOSSuggestionTag,
  PageTitle, StatNumeral, Hairline, TrendDelta, HelperText, BodyText, PageSubtitle, Field, ContentLabel,
} from '../components/ui';
import { teamInsight, teamWellbeing, timeAllocation, timeInsight } from '../data';

const barColors = ['#2549E0', '#6B6660', '#B8B2A8', '#17171A', '#E6E2DA'];

export default function Indsigt() {
  const insight = teamInsight;

  return (
    <div className="max-w-[1100px]">
      <header className="page-header">
        <PageTitle>Indsigt</PageTitle>
        <PageSubtitle>Teamtrivsel og retningsgivende ledelsessignaler</PageSubtitle>
      </header>

      <div className="section-stack">
        <section>
          <SectionHeader title="Teamtrivsel" subtitle={insight.label} />
          <div className="flex items-start justify-between mb-8">
            <Field label="Score" numeric valueClassName="field-value--stacked">
              <span className="field-value field-value--numeric field-value--large">{insight.score}</span>
              <span className="font-mono text-sm text-muted tabular-nums">/100</span>
            </Field>
            <StatusBadge variant="primary">{insight.status}</StatusBadge>
          </div>

          <div className="space-y-4">
            {insight.breakdown.map((item) => (
              <Field key={item.label} label={item.label} valueClassName="field-value--stacked w-full">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-1">
                    <ProgressBar value={item.value} color={item.color} className="h-1" />
                  </div>
                  <StatNumeral className="text-sm shrink-0">{item.value}</StatNumeral>
                </div>
              </Field>
            ))}
          </div>
        </section>

        <Hairline />

        <section>
          <SectionHeader
            title="Teamets trivsel"
            subtitle="Retningsgivende signal over de seneste 30 dage."
          />
          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            {teamWellbeing.map((metric) => (
              <Field key={metric.label} label={metric.label} numeric valueClassName="field-value--stacked field-value--large">
                <span className="flex items-baseline gap-2">
                  {metric.value}
                  <TrendDelta
                    trend={metric.trend}
                    trendValue={metric.trendValue}
                    trendGood={metric.trendGood}
                  />
                </span>
              </Field>
            ))}
          </div>
        </section>

        <Hairline />

        <section>
          <SectionHeader title="Tidsforbrug" subtitle="Sidste uge · 40t logget" />
          <div className="space-y-4 mb-6">
            {timeAllocation.map((item, i) => (
              <Field key={item.label} label={item.label} className="flex-1 min-w-0" valueClassName="field-value--stacked w-full">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(item.hours / 40) * 100}%`, backgroundColor: barColors[i] || item.color }}
                    />
                  </div>
                  <StatNumeral className="text-sm shrink-0">{item.hours}t</StatNumeral>
                </div>
              </Field>
            ))}
          </div>
          <AiInsight>{timeInsight}</AiInsight>
        </section>

        <Hairline />

        <div className="grid grid-cols-2 gap-x-10 gap-y-12">
          <section>
            <SectionHeader title="Motivation" subtitle={insight.motivation.trend} />
            <div className="space-y-4">
              <div>
                <ContentLabel className="text-danger block mb-2">Falder</ContentLabel>
                <div className="flex flex-wrap gap-1.5">
                  {insight.motivation.falling.map((name) => (
                    <StatusBadge key={name} variant="danger">{name}</StatusBadge>
                  ))}
                </div>
              </div>
              <div>
                <ContentLabel className="text-success block mb-2">Stiger</ContentLabel>
                <div className="flex flex-wrap gap-1.5">
                  {insight.motivation.rising.map((name) => (
                    <StatusBadge key={name} variant="success">{name}</StatusBadge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <SectionHeader title="Anerkendelse" subtitle={insight.recognition.note} />
            <div className="flex flex-wrap gap-1.5">
              {insight.recognition.people.map((name) => (
                <StatusBadge key={name} variant="warning">{name}</StatusBadge>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Coaching-kadence" />
            <BodyText>{insight.coachingCadence}</BodyText>
          </section>

          <section>
            <SectionHeader title="Opfølgningsdisciplin" />
            <BodyText>{insight.followUpDiscipline}</BodyText>
          </section>
        </div>

        <Hairline />

        <section>
          <SectionHeader title="Onboarding-risiko" />
          <BodyText>{insight.onboardingRisk}</BodyText>
        </section>

        <Hairline />

        <section className="border-l-2 border-accent/30 pl-5">
          <SectionHeader
            title="Anonym postkasse"
            subtitle={`${insight.anonymousMailbox.count} henvendelser denne måned`}
            action={<LeadOSSuggestionTag />}
          />
          <div className="mb-5">
            <ContentLabel className="block mb-2">Temaer</ContentLabel>
            <div className="space-y-2">
              {insight.anonymousMailbox.themes.map((theme, i) => (
                <BodyText key={i}>{theme}</BodyText>
              ))}
            </div>
          </div>
          <AiInsight showTag={false}>{insight.anonymousMailbox.recommendation}</AiInsight>
        </section>
      </div>
    </div>
  );
}
