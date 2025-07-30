const User = require("../models/user.model");
const JWT = require("../utils/jsonwebtoken");

const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  try {
    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.status(409).json({ message: "User already exists" });

    // Hash password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      username,
      password: hashPassword,
    });
    await newUser.save();

    // Generate a token
    const token = JWT.createToken(newUser._id);

    // Set cookie with secure options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User dosen't exists" });

    // Hash password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate a token
    const token = JWT.createToken(user._id);

    // Set cookie with secure options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Logged In successfully",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out successfully." });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
