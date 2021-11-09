const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  passwordHash: String,
  address: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;