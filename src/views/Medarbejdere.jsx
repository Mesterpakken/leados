import { useState } from 'react';
import {
  Card, Button, FilterButton, EmployeeAvatar, TrendIcon, StatusBadge, PageTitle, BodyText,
  Field, PageSubtitle, HelperText,
} from '../components/ui';
import { employees, employeeFilters } from '../data';
import { Search } from 'lucide-react';

export default function Medarbejdere({ onNavigateToProfile, onNavigateToMeeting }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = employees.filter((emp) => {
    const matchesFilter = filter === 'all' || emp.filterTags.includes(filter);
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (e, emp) => {
    e.stopPropagation();
    if (emp.actionType === 'prepare-1-1') {
      onNavigateToMeeting(emp.id);
    } else {
      onNavigateToProfile(emp.id);
    }
  };

  return (
    <div className="max-w-[1280px]">
      <header className="page-header">
        <PageTitle>Medarbejdere</PageTitle>
        <PageSubtitle>Dit menneskelige CRM — hvem kræver din opmærksomhed?</PageSubtitle>
      </header>

      <div className="flex flex-col gap-4 mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Søg medarbejdere..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {employeeFilters.map((f) => (
            <FilterButton
              key={f.id}
              active={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((emp) => (
          <Card
            key={emp.id}
            hover
            onClick={() => onNavigateToProfile(emp.id)}
          >
            <div className="employee-row">
              <div className="employee-row__identity flex items-start gap-3 min-w-0">
                <EmployeeAvatar name={emp.name} />
                <div className="min-w-0 flex-1">
                  <BodyText as="span" className="block truncate">{emp.name}</BodyText>
                  <HelperText className="mt-1 truncate">{emp.role}</HelperText>
                </div>
              </div>
              <div className="employee-row__stats">
                <Field label="Motivation" numeric valueClassName="field-value--inline">
                  <span className="flex items-center gap-1">
                    {emp.motivation}
                    <TrendIcon trend={emp.motivationTrend} />
                  </span>
                </Field>
                <Field label="Performance">
                  {emp.performance}% af mål
                </Field>
                <Field
                  label="Seneste 1:1"
                  valueClassName={emp.lastOneOnOneDays > 21 ? 'field-value--danger' : ''}
                >
                  {emp.lastOneOnOne}
                </Field>
                <Field label="Åbne løfter" numeric>
                  {emp.openPromises}
                </Field>
                <Field label="Signal" valueClassName="field-value--stacked w-full">
                  <StatusBadge
                    variant={
                      emp.filterTags.includes('attention') || emp.filterTags.includes('risk') ? 'warning' : 'default'
                    }
                    className="employee-signal-badge"
                  >
                    {emp.attentionSignal}
                  </StatusBadge>
                </Field>
              </div>
              <div className="employee-row__action">
                <Button
                  size="sm"
                  rowAction
                  onClick={(e) => handleAction(e, emp)}
                >
                  {emp.action}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted">Ingen medarbejdere matcher dit filter.</div>
      )}
    </div>
  );
}
