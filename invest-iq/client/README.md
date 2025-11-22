# InvestIQ Trade Logger – Client

This folder contains the **React + Vite** front-end for the InvestIQ Trade
Logger.

The client talks to the Express/MongoDB backend in `invest-iq/server` and
lets a user:

- Register / log in
- Create a stock trade (symbol, side, quantity, price)
- View saved trades loaded from MongoDB

Together with the server, this satisfies the Assignment 4 requirement for a
web app that writes to and reads from a database.

---

## 1. Tech Stack

- **Frontend:** React 18 + Vite
- **Backend (used by this client):** Node.js / Express (`invest-iq/server`)
- **Database:** MongoDB Atlas (accessed through the backend API)

---

## 2. Prerequisites

Before running the client, make sure you have:

1. **Node.js v18+** installed.
2. The **backend server** set up and running (see `invest-iq/server/README.md`):
   - `MONGO_URL`, `SESSION_SECRET`, `PORT=3001` defined in `server/.env`.
   - Server listening on `http://localhost:3001` with “Mongo connected” in logs.

---

## 3. Environment Setup (Client)

In this folder (`invest-iq/client`), create a file named **`.env`** with:

```env
VITE_API_URL=http://localhost:3001
This tells the React app where to find the Express API.

4. Install & Run

From the invest-iq/client directory:
npm install
npm run dev


Vite will print a URL such as:
http://localhost:5173/
Open that URL in your browser.
At the same time, in another terminal, make sure the backend is running:

cd ../server
npm run dev
You should see logs like:
Mongo connected
API running on: 3001

5. How to Use the App

5.1 Register / Login
In the Register / Login section at the top:
Enter an email and password.
Click Register to create a new account.
If the account already exists, click Login instead.
When authentication succeeds, the status text changes to:
Status: Logged in

5.2 Add a Transaction
In the Add Transaction section, fill in:
Symbol (e.g. AAPL)
Buy/Sell (dropdown)
Quantity
**Price`
Click Save Transaction.

A message will appear:
Transaction saved.
This means the trade was sent to the backend and written to MongoDB.

5.3 View Recent Transactions
In the Recent Transactions section, click Refresh.
The list shows all trades saved for the currently logged-in user,
loaded from the transactions collection in MongoDB.
Each item displays:
Side (BUY / SELL)
Quantity
Symbol
Price
Timestamp (when it was saved)

6. How It Works (Short Explanation)
Auth:
The client calls POST /auth/register or POST /auth/login on the backend.
The backend hashes passwords, manages sessions, and sets a cookie.
Saving trades:
The client sends POST /transactions with symbol, side, quantity, and price.
The backend validates the request and stores a document in MongoDB tied to the user.

Loading trades:
The client calls GET /transactions.
The backend returns all trades for the logged-in user, which the client renders.
This gives a complete round-trip:
React client -> Express API -> MongoDB -> back to client.