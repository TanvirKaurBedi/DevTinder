const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "accepted", "interested", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);
connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.toString() === this.toUserId.toString()) {
    return next(new Error("fromUserId and toUserId cannot be the same"));
  }
  next();
});

connectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);
module.exports = connectionRequestModel;
