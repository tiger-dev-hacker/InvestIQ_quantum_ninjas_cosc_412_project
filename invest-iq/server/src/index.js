require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const txRoutes = require("./routes/transactions");

const app = express();
app.use(express.json());
app.use(cookieParser());

// allow your Vite dev server to talk to the API
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax" }
}));

app.get("/health", (_, res) => res.json({ ok: true }));
app.use("/auth", authRoutes);
app.use("/transactions", txRoutes);

(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(" Mongo connected");
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(` API running on :${port}`));
})();
