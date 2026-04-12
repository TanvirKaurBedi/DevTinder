const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { signupValidatior } = require("../utils/validations");

router.post("/signup", async (req, res) => {
  try {
    signupValidatior(req.body);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJwt();
      res.cookie("token", token);
      res.status(200).json({ message: "Login Successful", data: user });
    } else {
      throw new Error("Invalid Password");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.send("Logged out successfully");
});

module.exports = router;
