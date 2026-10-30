import DepositForm from "../components/DepositForm.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import { useBank } from "../context/BankContext.jsx";

export default function Deposit() {
  const { balance, deposit } = useBank();
  return (
    <section>
      <h1>Deposit</h1>
      <BalanceCard title="Current Balance" value={balance} variant="primary" />
      <DepositForm onDeposit={deposit} />
    </section>
  );
}
