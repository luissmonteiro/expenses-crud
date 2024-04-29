const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  description: { type: String, maxLength: 191, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  value: { type: Number, required: true },
  deleted: { type: Boolean, default: false },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
