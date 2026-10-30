import { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";

export default function DepositForm({ onDeposit }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount.trim() === "") {
      setMessage({ ok: false, text: "Amount cannot be empty." });
      inputRef.current?.focus();
      return;
    }
    const result = onDeposit(Number(amount));
    setMessage({ ok: result.ok, text: result.message });
    if (result.ok) setAmount("");
    inputRef.current?.focus();
  };

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>Deposit Money</h2>
      <label htmlFor="deposit-amount">Amount ($)</label>
      <input
        id="deposit-amount"
        ref={inputRef}
        type="number"
        step="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" className="btn btn-deposit">
        Deposit
      </button>
      <Message message={message} />
    </form>
  );
}
