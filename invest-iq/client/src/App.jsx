import { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function App() {
  // auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // transaction form state
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("buy");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  // data + messages
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  async function register() {
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Registration failed");
      }

      setLoggedIn(true);
      setMessage("Registered and logged in.");
      await loadTransactions();
    } catch (err) {
      setMessage(err.message || "Something went wrong.");
    }
  }

  async function login() {
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }

      setLoggedIn(true);
      setMessage("Logged in.");
      await loadTransactions();
    } catch (err) {
      setMessage(err.message || "Something went wrong.");
    }
  }

  async function loadTransactions() {
    try {
      const res = await fetch(`${API_URL}/transactions`, {
        credentials: "include",
      });

      if (!res.ok) return; // if not logged in / unauthorized

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addTransaction() {
    setMessage("");

    if (!symbol || !qty || !price) {
      setMessage("Please fill in symbol, quantity, and price.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          symbol,
          side,
          qty: Number(qty),
          price: Number(price),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save transaction");
      }

      setMessage("Transaction saved.");
      setSymbol("");
      setQty("");
      setPrice("");
      await loadTransactions();
    } catch (err) {
      setMessage(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="app">
      <h1>InvestIQ Trade Logger</h1>

      <section className="card">
        <h2>1. Register / Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="row">
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>

        <p>Status: {loggedIn ? "Logged in" : "Not logged in"}</p>
      </section>

      {loggedIn && (
        <>
          <section className="card">
            <h2>2. Add Transaction</h2>
            <input
              placeholder="Symbol (e.g. AAPL)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
            <select value={side} onChange={(e) => setSide(e.target.value)}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
            <input
              placeholder="Quantity"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={addTransaction}>Save Transaction</button>
          </section>

          <section className="card">
            <h2>3. Recent Transactions</h2>
            <button onClick={loadTransactions}>Refresh</button>
            {transactions.length === 0 && <p>No trades yet.</p>}
            <ul>
              {transactions.map((tx) => (
                <li key={tx._id}>
                  {tx.side.toUpperCase()} {tx.qty} {tx.symbol} @ {tx.price} —{" "}
                  {new Date(tx.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
