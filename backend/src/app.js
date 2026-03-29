const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const { signupValidatior } = require("./utils/validations");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    signupValidatior(req.body);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
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

app.post("/login", async (req, res) => {
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
      res.status(200).send("Login Successfull");
    } else {
      throw new Error("Invalid Password");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/profile", userAuth, async (req, res) => {
  res.send(req.user);
});

// get user by emailId
app.get("/user", async (req, res) => {
  const requestedEmail = req.body.email;
  try {
    const users = await User.find({ email: requestedEmail });
    if (users.length === 0) {
      res.status(400).send("User not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

connectDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("error starting server", err);
  });
