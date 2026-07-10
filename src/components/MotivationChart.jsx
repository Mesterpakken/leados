export default function MotivationChart({ data, className = '' }) {
  if (!data || data.length === 0) return null;

  const width = 480;
  const height = 160;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) - 0.5;
  const maxVal = Math.max(...values) + 0.5;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartW;
    const y = padding.top + chartH - ((d.value - minVal) / (maxVal - minVal)) * chartH;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full h-auto ${className}`}>
      {[0, 2, 4, 6, 8, 10].filter((v) => v >= minVal && v <= maxVal).map((v) => {
        const y = padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
        return (
          <g key={v}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#E6E2DA" strokeWidth="1" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="#6B6660" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              {v}
            </text>
          </g>
        );
      })}

      <defs>
        <linearGradient id="motivationGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2549E0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2549E0" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill="url(#motivationGradient)" />
      <path d={linePath} fill="none" stroke="#2549E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#F7F5F0" stroke="#2549E0" strokeWidth="1.5" />
          <text x={p.x} y={height - 8} textAnchor="middle" fill="#6B6660" fontSize="9" fontFamily="IBM Plex Mono, monospace">
            {p.date}
          </text>
        </g>
      ))}
    </svg>
  );
}
