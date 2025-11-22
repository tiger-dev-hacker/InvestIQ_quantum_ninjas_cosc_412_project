# InvestIQ Trade Logger – Server

This folder contains the **Node.js / Express** backend for the InvestIQ
Trade Logger.

The server exposes API endpoints for:

- User **registration** and **login** with hashed passwords
- Storing trade transactions in **MongoDB**
- Retrieving the logged-in user’s transactions

The React client in `invest-iq/client` talks to this API.

---

## 1. Tech Stack

- Node.js + Express
- MongoDB Atlas
- Mongoose
- express-session + connect-mongo for session storage
- bcrypt for password hashing

---

## 2. Environment Setup

Create a file named **`.env`** in this folder (`invest-iq/server`):

```env

MONGO_URL=<your MongoDB connection string>
SESSION_SECRET=<any long random string>
PORT=3001

Example:
MONGO_URL=mongodb+srv://user:password@cluster0.xyz.mongodb.net/investiq?retryWrites=true&w=majority
SESSION_SECRET=supersecret123
PORT=3001

Make sure your MongoDB Atlas cluster:
Is running
Has a database user whose username/password match the connection string
Allows your IP (or 0.0.0.0/0 for testing)

3. Install & Run
From the invest-iq/server directory:

npm install
npm run dev

If everything is configured correctly, you should see logs like:

Mongo connected
API running on: 3001
The server is now available at http://localhost:3001.

4. Main Endpoints
POST /auth/register
Body: { "email": string, "password": string }
Creates a new user (password hashed) and starts a session.
POST /auth/login
Body: { "email": string, "password": string }
Verifies credentials and starts a session.
POST /transactions
Requires a logged-in session.
Body: { "symbol": string, "side": "buy" | "sell", "qty": number, "price": number }
Saves a trade for the current user in MongoDB.
GET /transactions
Requires a logged-in session.
Returns all trades for the current user.
These endpoints are consumed by the React client in invest-iq/client, which demonstrates full database write + read functionality.