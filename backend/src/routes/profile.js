const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validations");
const User = require("../models/user");

router.get("/profile/view", userAuth, async (req, res) => {
  res.send(req.user);
});

router.patch("/profile/edit", userAuth, async (req, res) => {
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
      res
        .status(200)
        .json({ message: "Profile updated successfully", data: loggedInuser });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to update profile",
    });
  }
});

module.exports = router;
