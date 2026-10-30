import TransactionList from "../components/TransactionList.jsx";
import { useBank } from "../context/BankContext.jsx";

export default function Transactions() {
  const { transactions, resetData } = useBank();

  const handleReset = () => {
    if (window.confirm("Reset balance to $1,000 and clear all transactions?")) {
      resetData();
    }
  };

  return (
    <section>
      <div className="section-head">
        <h1>Transaction History</h1>
        {transactions.length > 0 && (
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset demo data
          </button>
        )}
      </div>
      <div className="card">
        <TransactionList transactions={transactions} />
      </div>
    </section>
  );
}
