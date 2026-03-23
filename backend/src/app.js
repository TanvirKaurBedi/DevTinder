const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const user = new User(userObj);
  try {
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
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

//  Feed Api - GET /feed - returns a list of user profiles (excluding the logged-in user) that the user can swipe on.
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(400).send("No User");
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete API - DELETE /user - deletes the logged-in user's account.
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).send(deletedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Data Of  User
app.put("/user/:id", async (req, res) => {
  try {
    const allowedUpdates = ["photoUrl", "age", "gender", "about", "skills"];
    const userData = req.body;
    const userId = req.params?.id;
    console.log("userData", userData);
    const isUpdateAllowed = Object.keys(userData).every((k) =>
      allowedUpdates.includes(k),
    );
    console.log("isUpdateAllowed", isUpdateAllowed);
    if (!isUpdateAllowed) {
      console.log("Throwing error now");
      throw new Error("Update Not Allowed");
    }
    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      userData,
      {
        runValidators: true,
      },
    );
    res.status(200).send(updatedUser);
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
