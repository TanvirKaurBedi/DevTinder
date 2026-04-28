const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const requestRoutes = require("./routes/request");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", requestRoutes);
app.use("/", userRoutes);
app.use("/", chatRoutes);

// connectDb()
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("server is running on port 3000");
//     });
//   })
//   .catch((err) => {
//     console.error("error starting server", err);
//   });

module.exports = { app, connectDb };
