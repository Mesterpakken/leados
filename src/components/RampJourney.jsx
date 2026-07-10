import { BodyText, HelperText, MonoLabel, SourceTag } from './ui';

function comparisonLabel(milestone) {
  if (!milestone.teamAvgDays || milestone.comparison === 'neutral') return null;

  if (milestone.status === 'pending' && milestone.comparison === 'behind') {
    return (
      <span className="ramp-compare ramp-compare--behind">
        endnu ikke · teamgns. {milestone.teamAvgDays} dage
        {milestone.currentDay != null && <> · dag {milestone.currentDay}</>}
      </span>
    );
  }

  if (milestone.status === 'reached' && milestone.day != null) {
    const delta = milestone.teamAvgDays - milestone.day;
    if (delta > 0) {
      return (
        <span className="ramp-compare ramp-compare--ahead">
          {milestone.day} dage · teamgns. {milestone.teamAvgDays} dage · {delta} dage foran
        </span>
      );
    }
    if (delta < 0) {
      return (
        <span className="ramp-compare ramp-compare--behind">
          {milestone.day} dage · teamgns. {milestone.teamAvgDays} dage · {Math.abs(delta)} dage bag
        </span>
      );
    }
    return (
      <span className="ramp-compare ramp-compare--neutral">
        {milestone.day} dage · teamgns. {milestone.teamAvgDays} dage
      </span>
    );
  }

  return null;
}

export default function RampJourney({ ramp }) {
  if (!ramp) return null;

  return (
    <div className="ramp-journey">
      <div className="ramp-track" role="list">
        {ramp.milestones.map((milestone, i) => {
          const isLast = i === ramp.milestones.length - 1;
          const stateClass = milestone.status === 'reached'
            ? 'ramp-milestone--reached'
            : milestone.status === 'pending'
              ? 'ramp-milestone--pending'
              : 'ramp-milestone--upcoming';

          return (
            <div
              key={milestone.id}
              className={`ramp-milestone ${stateClass} ${milestone.comparison === 'behind' ? 'ramp-milestone--behind' : ''}`}
              role="listitem"
            >
              <div className="ramp-milestone__marker" aria-hidden="true">
                <span className="ramp-milestone__dot" />
                {!isLast && <span className="ramp-milestone__line" />}
              </div>
              <div className="ramp-milestone__body">
                <BodyText as="div" className="ramp-milestone__label">{milestone.label}</BodyText>
                {milestone.status === 'reached' && milestone.day != null && (
                  <MonoLabel className="ramp-milestone__day block mt-1">
                    dag {milestone.day}
                  </MonoLabel>
                )}
                {milestone.status === 'pending' && ramp.currentDay != null && (
                  <MonoLabel className="ramp-milestone__day block mt-1 text-caution">
                    dag {ramp.currentDay} · endnu ikke
                  </MonoLabel>
                )}
                {milestone.status === 'upcoming' && (
                  <HelperText className="mt-1 block">
                    {milestone.projectedLabel || milestone.note || 'Kommende'}
                  </HelperText>
                )}
                {milestone.date && (
                  <HelperText className="mt-1 block">{milestone.date}</HelperText>
                )}
                {comparisonLabel(milestone) && (
                  <div className="mt-2">{comparisonLabel(milestone)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
        {ramp.startDate && (
          <HelperText>Start {ramp.startDate}{ramp.currentDay != null && ` · dag ${ramp.currentDay}`}</HelperText>
        )}
        <SourceTag>KILDE: CRM</SourceTag>
      </div>
    </div>
  );
}
