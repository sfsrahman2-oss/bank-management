import { createContext, useContext, useEffect, useState } from "react";

const BankContext = createContext(null);

const ACCOUNT = {
  bankName: "Horizon National Bank",
  appTitle: "Bank Management System",
  holder: "Sanjana Rahaman",
  number: "1002-3456-7890",
};

const STORAGE_KEY = "bank-management-data";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.balance === "number" && Array.isArray(parsed.transactions)) {
        return parsed;
      }
    }
  } catch {
    /* ignore corrupted storage */
  }
  return { balance: 1000, transactions: [] };
}

export function BankProvider({ children }) {
  const [initial] = useState(loadInitial);
  const [balance, setBalance] = useState(initial.balance);
  const [transactions, setTransactions] = useState(initial.transactions);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ balance, transactions }));
    } catch {
      /* storage unavailable */
    }
  }, [balance, transactions]);

  const totalDeposited = transactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawn = transactions
    .filter((t) => t.type === "Withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const addTransaction = (type, amount) => {
    setTransactions((prev) => [
      { id: Date.now() + Math.random(), type, amount, date: new Date().toISOString() },
      ...prev,
    ]);
  };

  // Each returns { ok, message }
  const deposit = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, message: "Enter an amount greater than zero." };
    }
    setBalance((b) => b + amount);
    addTransaction("Deposit", amount);
    return { ok: true, message: `Successfully deposited $${amount.toFixed(2)}.` };
  };

  const withdraw = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, message: "Enter an amount greater than zero." };
    }
    if (amount > balance) {
      return { ok: false, message: "Insufficient balance for this withdrawal." };
    }
    setBalance((b) => b - amount);
    addTransaction("Withdrawal", amount);
    return { ok: true, message: `Successfully withdrew $${amount.toFixed(2)}.` };
  };

  const resetData = () => {
    setBalance(1000);
    setTransactions([]);
  };

  const value = {
    account: ACCOUNT,
    balance,
    transactions,
    totalDeposited,
    totalWithdrawn,
    deposit,
    withdraw,
    resetData,
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
}

export function useBank() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error("useBank must be used inside BankProvider");
  return ctx;
}
