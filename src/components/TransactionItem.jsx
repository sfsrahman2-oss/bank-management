export default function TransactionItem({ transaction }) {
  const isDeposit = transaction.type === "Deposit";
  const date = new Date(transaction.date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <li className={`transaction ${isDeposit ? "deposit" : "withdrawal"}`}>
      <div>
        <span className="tx-type">{transaction.type}</span>
        <span className="tx-date">{date}</span>
      </div>
      <span className="tx-amount">
        {isDeposit ? "+" : "-"}${transaction.amount.toFixed(2)}
      </span>
    </li>
  );
}
