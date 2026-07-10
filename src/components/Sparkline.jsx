export default function Sparkline({ data, width = 120, height = 32, color = '#2549E0' }) {
  if (!data || data.length < 2) return null;

  const padding = 2;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * chartW;
    const y = padding + chartH - ((v - min) / (max - min)) * chartH;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={padding + chartW}
        cy={padding + chartH - ((data[data.length - 1] - min) / (max - min)) * chartH}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}
