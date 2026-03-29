const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");

router.post("/profile", userAuth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
