import BalanceCard from "../components/BalanceCard.jsx";
import { useBank } from "../context/BankContext.jsx";

export default function Dashboard() {
  const { account, balance, totalDeposited, totalWithdrawn } = useBank();
  return (
    <section>
      <h1>{account.appTitle}</h1>
      <p className="subtitle">{account.bankName}</p>

      <div className="card holder">
        <div>
          <span className="card-title">Account Holder</span>
          <span className="holder-value">{account.holder}</span>
        </div>
        <div>
          <span className="card-title">Account Number</span>
          <span className="holder-value">{account.number}</span>
        </div>
      </div>

      <div className="grid">
        <BalanceCard title="Current Balance" value={balance} variant="primary" />
        <BalanceCard title="Total Deposited" value={totalDeposited} variant="deposit" />
        <BalanceCard title="Total Withdrawn" value={totalWithdrawn} variant="withdrawal" />
      </div>
    </section>
  );
}
