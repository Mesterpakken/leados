import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  BarChart3,
  Table2,
  Sparkles,
  Settings,
  Search,
  Plus,
  CalendarPlus,
  UserPlus,
  Bot,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowLeft,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Sunrise,
} from 'lucide-react';

export const iconMap = {
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  BarChart3,
  Table2,
  Sparkles,
  Settings,
  Search,
  Plus,
  CalendarPlus,
  UserPlus,
  Bot,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowLeft,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Sunrise,
};

export function Icon({ name, className = 'w-4 h-4', ...props }) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component className={className} {...props} />;
}

export function SectionHeading({ children, className = '', as: Tag = 'h2' }) {
  const sizeClass = Tag === 'h3' ? 'display-h3' : 'section-heading';
  return (
    <Tag className={`${sizeClass} ${className}`}>
      {children}
    </Tag>
  );
}

export function SectionSubtitle({ children, className = '' }) {
  return (
    <p className={`section-subtitle ${className}`}>
      {children}
    </p>
  );
}

export function ContentLabel({ children, className = '' }) {
  return (
    <span className={`content-label ${className}`}>
      {children}
    </span>
  );
}

export function MonoLabel({ children, className = '' }) {
  return (
    <span className={`section-label ${className}`}>
      {children}
    </span>
  );
}

export function Field({ label, children, className = '', valueClassName = '', numeric = false, align = 'left' }) {
  const alignClass = align === 'right' ? 'field-block--right' : align === 'center' ? 'field-block--center' : '';
  const valueClasses = [
    'field-value',
    numeric ? 'field-value--numeric' : '',
    valueClassName,
  ].filter(Boolean).join(' ');

  return (
    <div className={`field-block ${alignClass} ${className}`}>
      <span className="field-label">{label}</span>
      <div className={valueClasses}>{children}</div>
    </div>
  );
}

export function HelperText({ children, className = '' }) {
  return (
    <p className={`helper-text ${className}`}>
      {children}
    </p>
  );
}

export function BodyText({ children, as: Tag = 'p', className = '' }) {
  return (
    <Tag className={`body-text ${className}`}>
      {children}
    </Tag>
  );
}

export function PageSubtitle({ children, className = '' }) {
  return (
    <p className={`page-subtitle mt-2 ${className}`}>
      {children}
    </p>
  );
}

export function Eyebrow({ children, className = '' }) {
  return <div className={`eyebrow ${className}`}>{children}</div>;
}

export function Subhead({ children, className = '' }) {
  return <p className={`subhead ${className}`}>{children}</p>;
}

export function SourceTag({ children, className = '' }) {
  return <span className={`source-tag ${className}`}>{children}</span>;
}

export function MonoTag({ children, className = '' }) {
  return <span className={`mono-tag ${className}`}>{children}</span>;
}

export function Panel({ children, className = '', padded = true }) {
  return (
    <div className={`panel ${padded ? 'panel--padded' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function PriorityCard({
  title,
  role,
  description,
  signalVariant = 'blue',
  sources = [],
  action,
  onClick,
  onAction,
  className = '',
}) {
  return (
    <article
      className={`priority-card priority-card--${signalVariant} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    >
      <div className="priority-card__body">
        <div className="priority-title">{title}</div>
        {role && <div className="priority-role">{role}</div>}
        {description && <div className="priority-signal">{description}</div>}
        {sources.length > 0 && (
          <div className="priority-meta">
            {sources.map((source) => (
              <SourceTag key={source}>{source}</SourceTag>
            ))}
          </div>
        )}
      </div>
      {action && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAction?.(e);
          }}
        >
          {action}
        </Button>
      )}
    </article>
  );
}

export function ScheduleItem({ time, title, subtitle, status = 'primary' }) {
  return (
    <div className="schedule-item">
      <span className="schedule-time">{time}</span>
      <div>
        <div className="timeline-title">{title}</div>
        {subtitle && <div className="timeline-text">{subtitle}</div>}
      </div>
      <span className={`status-dot status-dot--${status === 'primary' ? 'blue' : status}`} />
    </div>
  );
}

export function CommitmentItem({ text, meta, status = 'primary' }) {
  return (
    <div className="commitment-item">
      <span className="schedule-time" />
      <div>
        <div className="timeline-title">{text}</div>
        {meta && <div className="timeline-text">{meta}</div>}
      </div>
      <span className={`status-dot status-dot--${status === 'primary' ? 'blue' : status}`} />
    </div>
  );
}

export function PageTitle({ children, className = '' }) {
  return (
    <h1 className={`page-title ${className}`}>
      {children}
    </h1>
  );
}

export function DisplayName({ children, as: Tag = 'span', className = '' }) {
  return (
    <Tag className={`font-display text-ink tracking-[-0.02em] ${className}`}>
      {children}
    </Tag>
  );
}

export function StatNumeral({ children, className = '' }) {
  return (
    <span className={`font-display tabular-nums text-ink tracking-[-0.02em] ${className}`}>
      {children}
    </span>
  );
}

export function LeadOSSuggestionTag({ className = '' }) {
  return (
    <span className={`section-label ${className}`}>
      LeadOS · Forslag
    </span>
  );
}

export function Hairline({ className = '' }) {
  return <hr className={`section-divider ${className}`} />;
}

export function CardDivider({ className = '' }) {
  return <hr className={`card-divider ${className}`} />;
}

export function TrendIcon({ trend, className = 'w-3.5 h-3.5' }) {
  if (trend === 'up') return <TrendingUp className={`${className} text-success`} />;
  if (trend === 'down') return <TrendingDown className={`${className} text-danger`} />;
  return <Minus className={`${className} text-muted`} />;
}

export function StatusBadge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'text-muted border-border bg-paper',
    primary: 'text-primary border-primary/30 bg-paper',
    warning: 'text-warning border-warning/30 bg-paper',
    danger: 'text-danger border-danger/30 bg-paper',
    success: 'text-success border-success/30 bg-paper',
    accent: 'text-accent border-accent/30 bg-paper',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 section-label rounded-[8px] border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

const buttonSizes = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' };
const buttonVariants = {
  primary: 'btn-primary',
  blue: 'btn-blue',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  accent: 'btn-secondary',
};

export function Button({ children, variant = 'primary', size = 'md', onClick, className = '', rowAction = false }) {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonSizes[size]} ${buttonVariants[variant]} ${rowAction ? 'btn-row-action' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export function FilterButton({ children, active = false, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`filter-chip ${active ? 'filter-chip--active' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '', onClick, hover = false, bordered = true, padded = true }) {
  return (
    <div
      onClick={onClick}
      className={`${bordered ? 'card' : ''} ${padded ? 'card--padded' : ''} ${hover ? 'hover:border-ink/20 transition-colors cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`section-header ${className}`}>
      <div>
        <SectionHeading>{title}</SectionHeading>
        {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
      </div>
      {action}
    </div>
  );
}

export function Avatar({ initials, size = 'md' }) {
  const sizes = { sm: 'w-7 h-7 text-[10px]', md: 'w-9 h-9 text-xs', lg: 'w-11 h-11 text-sm' };
  return (
    <div className={`${sizes[size]} rounded-full bg-ink text-paper flex items-center justify-center font-mono font-medium shrink-0`}>
      {initials}
    </div>
  );
}

const avatarTones = [
  'bg-[#3D4F6F]', 'bg-[#5C4A3A]', 'bg-[#3F5D4A]', 'bg-[#6B5344]',
  'bg-[#4A5568]', 'bg-[#5D4E60]', 'bg-[#3E5C5C]', 'bg-[#6B5B4F]',
];

export function EmployeeAvatar({ name, size = 'md' }) {
  const initials = name.split(' ').map((n) => n[0]).join('');
  const colorIndex = name.charCodeAt(0) % avatarTones.length;
  const sizes = { sm: 'w-8 h-8 text-[10px]', md: 'w-10 h-10 text-xs', lg: 'w-12 h-12 text-sm' };
  return (
    <div className={`${sizes[size]} rounded-full ${avatarTones[colorIndex]} text-paper flex items-center justify-center font-mono font-medium shrink-0`}>
      {initials}
    </div>
  );
}

export function ProgressBar({ value, color = '#2549E0', className = '' }) {
  return (
    <div className={`h-1 bg-border rounded-full overflow-hidden ${className}`}>
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );
}

export function TrendDelta({ trend, trendValue, trendGood }) {
  if (!trendValue) return null;

  const isPositive = trendGood ?? trend === 'up';
  const color = isPositive ? 'text-success' : trend === 'neutral' ? 'text-muted' : 'text-danger';

  return (
    <span className={`font-mono text-[11px] tabular-nums ${color}`}>
      {trendValue}
    </span>
  );
}

export function AiInsight({ children, className = '', showTag = true }) {
  return (
    <div className={`ai-insight ${className}`}>
      {showTag && (
        <div className="ai-insight__tag">
          <LeadOSSuggestionTag />
        </div>
      )}
      <p className="body-text">{children}</p>
    </div>
  );
}

export function PromiseStatusBadge({ status }) {
  const map = {
    forsinket: { label: 'Forsinket', variant: 'danger' },
    afventer: { label: 'Afventer', variant: 'warning' },
    gennemført: { label: 'Gennemført', variant: 'success' },
    booket: { label: 'Booket', variant: 'primary' },
    'ikke booket': { label: 'Ikke booket', variant: 'default' },
  };
  const config = map[status] || map.afventer;
  return <StatusBadge variant={config.variant}>{config.label}</StatusBadge>;
}

export function QuarterlyStatusBadge({ status }) {
  const map = {
    gennemført: { label: 'Gennemført', variant: 'success' },
    booket: { label: 'Booket', variant: 'primary' },
    'ikke booket': { label: 'Ikke booket', variant: 'default' },
    forsinket: { label: 'Forsinket', variant: 'danger' },
  };
  const config = map[status] || map.default;
  return <StatusBadge variant={config.variant}>{config.label}</StatusBadge>;
}

// Backward-compatible alias
export const LeadOSBadge = LeadOSSuggestionTag;
