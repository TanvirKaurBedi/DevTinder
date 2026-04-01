const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validations");
const User = require("../models/user");

router.get("/profile/view", userAuth, async (req, res) => {
  res.send(req.user);
});

router.patch("/profile/status/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      res.status(400).send("Invalid Request");
      throw new Error("Invalid edit request");
    } else {
      const loggedInuser = req.user;
      Object.keys(req.body).forEach((key) => {
        loggedInuser[key] = req.body[key];
      });
      await loggedInuser.save();
      res.send("Profile updated successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
