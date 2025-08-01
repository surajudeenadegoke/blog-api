const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const comparePassword = require("../utils/comparePassword");
const { hashPassword } = require("../utils/hashPassword");

//Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "New user created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(403).json({ message: "Invalid email or password" });
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(403).json({ message: "Invalid email or password" });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

module.exports = { getUsers, registerUser, loginUser };
