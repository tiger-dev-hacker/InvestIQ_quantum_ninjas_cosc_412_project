"use client";

import { useState, useEffect } from "react";

type Transaction = {
  _id: string;
  userid: number;
  symbol: string;
  side: "BUY" | "SELL";
  qty: number;
  price: number;
  createdAt: string;
};

export default function TransactionsPage() {
  useEffect(() => {
  async function fetchTransactions() {
    try {
      const response = await fetch("/api/transactions", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  }

  fetchTransactions();
}, []);

  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
  ]);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!symbol || !quantity || !price) {
    setMessage("Please fill in all fields.");
    return;
  }

  const qtyNum = Number(quantity);
  const priceNum = Number(price);

  if (isNaN(qtyNum) || isNaN(priceNum)) {
    setMessage("Quantity and price must be numbers.");
    return;
  }

  try {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        symbol: symbol.toUpperCase(),
        side,
        qty: qtyNum,
        price: priceNum,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add transaction');
    }

    const savedTransaction = await response.json();
    
    // Update local state with the saved transaction from backend
    setTransactions((prev) => [savedTransaction, ...prev]);
    
    // Clear form fields
    setSymbol("");
    setQuantity("");
    setPrice("");
    setMessage("Transaction added successfully!");
  } catch (error) {
    console.error('Error adding transaction:', error);
    const message = error instanceof Error ? error.message : 'Failed to add transaction';
    setMessage(message);
  }
}

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Transactions</h1>
        <p className="text-sm text-neutral-400">
          Add a trade and view your recent activity. This page will connect to
          MongoDB in the backend.
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 md:grid-cols-4 md:items-end"
      >
        <div>
          <label className="block text-xs text-neutral-400 mb-1">
            Symbol
          </label>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="AAPL"
            className="w-full rounded-lg border border-neutral-700 bg-black px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">Side</label>
          <select
            value={side}
            onChange={(e) =>
              setSide(e.target.value === "SELL" ? "SELL" : "BUY")
            }
            className="w-full rounded-lg border border-neutral-700 bg-black px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
          >
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">
            Quantity
          </label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="10"
            className="w-full rounded-lg border border-neutral-700 bg-black px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">
            Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="150"
            className="w-full rounded-lg border border-neutral-700 bg-black px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-4 mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
        >
          Add transaction
        </button>

        {message && (
          <p className="md:col-span-4 text-xs text-emerald-400">{message}</p>
        )}
      </form>

      {/* Recent transactions */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
        <h2 className="mb-3 text-sm font-medium text-neutral-200">
          Recent Transactions (mock)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs text-neutral-400">
            <thead className="border-b border-neutral-800 text-neutral-500">
              <tr>
                <th className="py-2 pr-4">Time</th>
                <th className="py-2 pr-4">Symbol</th>
                <th className="py-2 pr-4">Side</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 pr-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="border-b border-neutral-900">
                  <td className="py-2 pr-4 text-neutral-500">
                    {tx.createdAt}
                  </td>
                  <td className="py-2 pr-4 text-white">{tx.symbol}</td>
                  <td
                    className={
                      "py-2 pr-4 " +
                      (tx.side === "BUY"
                        ? "text-emerald-400"
                        : "text-red-400")
                    }
                  >
                    {tx.side}
                  </td>
                  <td className="py-2 pr-4">{tx.qty}</td>
                  <td className="py-2 pr-4">${tx.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
