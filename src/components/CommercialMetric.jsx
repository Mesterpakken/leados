export default function CommercialMetric({ label, value, delta, note, warning }) {
  return (
    <article className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <p className={warning ? 'warning' : ''}>
        {delta} {note ? <small>{note}</small> : null}
      </p>
    </article>
  );
}
