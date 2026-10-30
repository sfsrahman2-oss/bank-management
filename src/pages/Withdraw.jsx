import WithdrawForm from "../components/WithdrawForm.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import { useBank } from "../context/BankContext.jsx";

export default function Withdraw() {
  const { balance, withdraw } = useBank();
  return (
    <section>
      <h1>Withdraw</h1>
      <BalanceCard title="Available Balance" value={balance} variant="primary" />
      <WithdrawForm onWithdraw={withdraw} balance={balance} />
    </section>
  );
}
