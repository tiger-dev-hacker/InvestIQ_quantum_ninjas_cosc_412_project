const mongoose = require("mongoose");
const TxSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  symbol: { type: String, required: true },
  side: { type: String, enum: ["buy","sell"], required: true },
  qty: { type: Number, min: 0.0001, required: true },
  price: { type: Number, min: 0, required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Transaction", TxSchema);
