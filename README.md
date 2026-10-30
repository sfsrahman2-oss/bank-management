# Bank Management System

A simple, frontend-only Bank Management System built with **React** and **Vite**. Users can view account information, deposit money, withdraw money, and review their transaction history. The account balance is simulated: there is no backend, database, or real money.

## Features

- **Dashboard**: bank name, app title, account holder, account number, current balance, total deposited, and total withdrawn
- **Deposit**: validated form (no empty, zero, or negative amounts) with instant balance update and a success message
- **Withdraw**: blocks zero, negative, and over-balance amounts; shows success or error messages; asks for confirmation before withdrawing
- **Transaction History**: type, amount, and date for each transaction, with different styling for deposits and withdrawals and an empty-state message
- **Navigation**: React Router DOM with `NavLink`, consistent across all pages
- **Bonus**: `useRef` focuses the amount input, Context API shares account state, and `localStorage` keeps data after a refresh
- Responsive CSS layout

## Tech Stack

React 18, Vite, React Router DOM 6, plain CSS

## Installation

```bash
git clone <your-repo-url>
cd bank-management
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

To create a production build: `npm run build`, then `npm run preview`.

## Project Structure

```
src/
├── components/   Navbar, BalanceCard, DepositForm, WithdrawForm,
│                 TransactionList, TransactionItem, Message
├── pages/        Dashboard, Deposit, Withdraw, Transactions
├── context/      BankContext.jsx (balance, transactions, deposit/withdraw logic)
├── App.jsx       Routes
├── main.jsx      Entry point
└── index.css     Styles
```

## Notes

The starting balance is $1,000. Use "Reset demo data" on the Transaction History page to start over.
