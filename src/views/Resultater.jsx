import {
  PageTitle, StatNumeral, ProgressBar, Field, SectionHeader, PageSubtitle, BodyText, HelperText,
} from '../components/ui';
import { salesResults, formatKr } from '../data';

const summaryMetrics = [
  { label: 'Samlet omsætning', value: formatKr(salesResults.summary.totalRevenue) },
  { label: 'Antal salg', value: salesResults.summary.totalSales },
  { label: 'Gns. salg', value: formatKr(salesResults.summary.avgSale) },
  { label: 'Teamets målopfyldelse', value: `${salesResults.summary.teamTargetFulfillment}%` },
];

const tableColumns = 'grid grid-cols-[minmax(140px,1.4fr)_88px_128px_112px_minmax(120px,1fr)_52px] gap-x-8';

export default function Resultater() {
  return (
    <div className="max-w-[1000px]">
      <header className="page-header">
        <PageTitle>Resultater</PageTitle>
        <PageSubtitle>
          {salesResults.period} · {salesResults.periodNote}
        </PageSubtitle>
      </header>

      <div className="section-group">
        <section>
          <div className="grid grid-cols-4 gap-x-12 gap-y-6">
            {summaryMetrics.map((metric) => (
              <Field key={metric.label} label={metric.label} numeric valueClassName="field-value--large">
                {metric.value}
              </Field>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Sælgere" subtitle="Registrerede salg i perioden" />
          <div className={`${tableColumns} pb-3 border-b border-border`}>
            <span className="field-label">Navn</span>
            <span className="field-label text-right block">Antal salg</span>
            <span className="field-label text-right block">Omsætning</span>
            <span className="field-label text-right block">Provision</span>
            <span className="field-label block">Målopfyldelse</span>
            <span />
          </div>

          <div className="divide-y divide-border">
            {salesResults.reps.map((rep) => (
              <div key={rep.employeeId} className={`${tableColumns} items-center py-5`}>
                <BodyText as="span" className="truncate block">
                  {rep.name}
                </BodyText>
                <StatNumeral className="field-value field-value--numeric text-sm text-right block">
                  {rep.salesCount}
                </StatNumeral>
                <StatNumeral className="field-value field-value--numeric text-sm text-right block">
                  {formatKr(rep.revenue)}
                </StatNumeral>
                <StatNumeral className="field-value field-value--numeric text-sm text-right block">
                  {formatKr(rep.commission)}
                </StatNumeral>
                <div className="flex items-center gap-3 min-w-0">
                  <ProgressBar
                    value={Math.min(rep.targetFulfillment, 100)}
                    color="#17171A"
                    className="flex-1"
                  />
                </div>
                <StatNumeral className="field-value field-value--numeric text-sm text-right text-muted block">
                  {rep.targetFulfillment}%
                </StatNumeral>
              </div>
            ))}
          </div>

          <HelperText className="mt-4">
            Sælgere registrerer egne salg — tal opdateres i realtid.
          </HelperText>
        </section>
      </div>
    </div>
  );
}
