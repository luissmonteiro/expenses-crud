const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { expressjwt } = require("express-jwt");
const JWT_SECRET = process.env.JWT_SECRET;
const { notValidUser } = require("../utils/authUtils");
require("dotenv/config");

const signup = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (notValidUser(password, email)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.create({ password: hashedPassword, email });
    return res.status(201).json({ message: "New user created!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ message: "Please enter your email and password" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ user, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isSignedIn = expressjwt({
  secret: JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

module.exports = {
  signup,
  login,
  isSignedIn,
};
