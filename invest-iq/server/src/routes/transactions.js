const express = require("express");
const Transaction = require("../models/Transaction");
const authGuard = require("../middleware/authGuard");
const router = express.Router();

// write
router.post("/", authGuard, async (req, res) => {
  const { symbol, side, qty, price } = req.body || {};
  if (!symbol || !["buy","sell"].includes(side) || !(qty > 0) || !(price >= 0))
    return res.status(400).json({ error: "Invalid input" });

  const newTx = await Transaction.create({ 
    userId: req.session.user._id, 
    symbol, 
    side, 
    qty, 
    price 
  });
  res.status(201).json(newTx); // Changed from { ok: true }
});

// read
router.get("/", authGuard, async (req, res) => {
  const items = await Transaction.find({ userId: req.session.user._id })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(items);
});

module.exports = router;