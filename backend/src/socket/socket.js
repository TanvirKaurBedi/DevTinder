const { Server } = require("socket.io");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("sendMessage", async ({ fromUserId, toUserId, message }) => {
      try {
        // 1. find conversation
        let conversation = await Conversation.findOne({
          participants: { $all: [fromUserId, toUserId] },
        });

        // 2. create if not exist
        if (!conversation) {
          conversation = await Conversation.create({
            participants: [fromUserId, toUserId],
          });
        }

        // 3. save message in DB
        const newMessage = await Message.create({
          conversationId: conversation._id,
          senderId: fromUserId,
          receiverId: toUserId,
          message,
        });

        // 4. update last message
        conversation.lastMessage = message;
        await conversation.save();

        // 5. send to receiver
        io.to(toUserId).emit("receiveMessage", newMessage);

        // 6. also send back to sender (optional but good)
        socket.emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Error in sendMessage:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = initSocket;
