const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequests = require("../models/connectionRequest");

// get all the pending connection requests for the loggedIn User
router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequests.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["name", "email"]);
    res.json({ message: "Data Fetched Succesfully", data: connectionRequests });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// get all the connections for the loggedIn User
router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequests.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId toUserId", ["name", "email"]);
    res.json({ message: "Data Fetched Successfully", data: connections });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
