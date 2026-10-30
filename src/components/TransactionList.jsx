import TransactionItem from "./TransactionItem.jsx";

export default function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return <p className="empty">No transactions yet. Make a deposit or withdrawal to get started.</p>;
  }
  return (
    <ul className="transaction-list">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} />
      ))}
    </ul>
  );
}
