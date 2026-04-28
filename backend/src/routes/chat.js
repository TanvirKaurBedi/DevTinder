const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

// When you click a user get chat history with that user
router.get("/history/:userId", userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [loggedInUserId, userId] },
    });
    if (!conversation) {
      return res.json([]);
    }
    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
