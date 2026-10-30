import { NavLink } from "react-router-dom";
import { useBank } from "../context/BankContext.jsx";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/deposit", label: "Deposit" },
  { to: "/withdraw", label: "Withdraw" },
  { to: "/transactions", label: "Transaction History" },
];

export default function Navbar() {
  const { account } = useBank();
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span className="brand-name">{account.bankName}</span>
          <span className="brand-sub">{account.appTitle}</span>
        </div>
        <nav className="nav-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
