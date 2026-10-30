import { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";

export default function WithdrawForm({ onWithdraw, balance }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [pending, setPending] = useState(null); // amount awaiting confirmation
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (amount.trim() === "" || !Number.isFinite(value) || value <= 0) {
      setMessage({ ok: false, text: "Enter an amount greater than zero." });
      return;
    }
    if (value > balance) {
      setMessage({ ok: false, text: "Insufficient balance for this withdrawal." });
      return;
    }
    setMessage(null);
    setPending(value); // ask for confirmation first
  };

  const confirm = () => {
    const result = onWithdraw(pending);
    setMessage({ ok: result.ok, text: result.message });
    if (result.ok) setAmount("");
    setPending(null);
    inputRef.current?.focus();
  };

  const cancel = () => {
    setPending(null);
    inputRef.current?.focus();
  };

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>Withdraw Money</h2>
      <label htmlFor="withdraw-amount">Amount ($)</label>
      <input
        id="withdraw-amount"
        ref={inputRef}
        type="number"
        step="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={pending !== null}
      />
      {pending === null ? (
        <button type="submit" className="btn btn-withdraw">
          Withdraw
        </button>
      ) : (
        <div className="confirm-box">
          <p>
            Withdraw <strong>${pending.toFixed(2)}</strong>? This cannot be undone.
          </p>
          <div className="confirm-actions">
            <button type="button" className="btn btn-withdraw" onClick={confirm}>
              Confirm
            </button>
            <button type="button" className="btn btn-secondary" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <Message message={message} />
    </form>
  );
}
