const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const connectionRequest = require("../models/connectionRequest");
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

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const toUserIdExists = await User.findById(toUserId);
    if (!toUserIdExists) {
      return res.status(400).json({
        message: "User to whom you want to send the request not found",
      });
    }
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status value :- " + status });
    }

    const conectionRequestExists = await connectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });
    if (conectionRequestExists) {
      return res
        .status(400)
        .json({ message: "Connection request already exists" });
    }

    const connectionRequestInstance = new connectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequestInstance.save();
    res.json({ message: "Connection request sent successfully", data });
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // firt write all the test cases that u need to fullfill or check
      //  loggedIn User = toUserId
      // status should not be equal to ignored
      // once accepted shld not be able to accept again
      //requested Id should be valid it shld be  in database it shld not be random

      const allowedStatus = ["accepted", "rejected"];
      const { status, requestId } = req.params;
      const loggedInUser = req.user;
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "status not allowed" });
      }
      let connection = await connectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested", // only pending requests can be reviewed
      });
      if (!connection) {
        return res.status(404).json({
          message: "Connection request not found or already reviewed",
        });
      }

      connection.status = status;
      const updatedData = await connection.save();
      res.json({
        message: "Connection request " + status,
        data: updatedData,
      });
    } catch (err) {
      console.log("review error", err.message);
      res.status(400).send(err);
    }
  },
);

module.exports = router;
