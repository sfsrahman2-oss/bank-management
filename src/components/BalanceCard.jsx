export default function BalanceCard({ title, value, variant = "default", isMoney = true }) {
  const display = isMoney
    ? `$${Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : value;
  return (
    <div className={`card info-card ${variant}`}>
      <span className="card-title">{title}</span>
      <span className="card-value">{display}</span>
    </div>
  );
}
