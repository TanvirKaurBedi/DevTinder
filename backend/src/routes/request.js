const express = require("express");
const User = require("../models/user");
const router = express.Router();
// get user by emailId
router.get("/user", async (req, res) => {
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

module.exports = router;
