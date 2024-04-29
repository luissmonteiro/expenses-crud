const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
