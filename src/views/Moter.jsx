import {
  Button, FilterButton, SectionHeader, EmployeeAvatar, StatusBadge, PageTitle, BodyText, PageSubtitle, HelperText,
} from '../components/ui';
import { meetingOverview, meetingTypes, employees } from '../data';

export default function Moter({ onNavigateToBrief }) {
  const employeesWithMeetings = employees.filter((e) => e.actionType === 'prepare-1-1' || e.lastOneOnOneDays > 14);

  return (
    <div className="max-w-[1100px]">
      <header className="page-header">
        <PageTitle>Møder</PageTitle>
        <PageSubtitle>1:1-center og samtaleforberedelse</PageSubtitle>
      </header>

      <BodyText className="mb-8 pb-6 border-b border-border">
        Denne uge:{' '}
        {meetingOverview.planned} planlagte samtaler · {meetingOverview.prepared} forberedt ·{' '}
        <span className="text-danger">{meetingOverview.overdue} forsinket</span> ·{' '}
        {meetingOverview.quarterlyRemaining} kvartalssamtaler tilbage ·{' '}
        {meetingOverview.openActions} åbne handlinger
      </BodyText>

      <div className="flex items-center gap-1.5 mb-8 flex-wrap">
        {meetingTypes.map((type) => (
          <FilterButton key={type} active={type === '1:1'}>
            {type}
          </FilterButton>
        ))}
      </div>

      <SectionHeader title="Kommende samtaler" subtitle="Klik 'Forbered 1:1' for at åbne den fulde samtalebrief" />

      <div className="divide-y divide-border">
        {employeesWithMeetings.map((emp) => (
          <div key={emp.id} className="flex items-center justify-between gap-4 py-4 first:pt-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <EmployeeAvatar name={emp.name} />
              <div className="min-w-0">
                <BodyText as="span" className="block">{emp.name}</BodyText>
                <HelperText className="mt-1">{emp.role} · Seneste 1:1: {emp.lastOneOnOne}</HelperText>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <StatusBadge variant={emp.lastOneOnOneDays > 21 ? 'danger' : 'default'}>
                {emp.attentionSignal}
              </StatusBadge>
              <Button size="sm" rowAction onClick={() => onNavigateToBrief(emp.id)}>
                Forbered 1:1
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
