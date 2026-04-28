const http = require("http");
const { app, connectDb } = require("./app");
const initSocket = require("./socket/socket");

const server = http.createServer(app);

// initialize socket
initSocket(server);

connectDb()
  .then(() => {
    server.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error starting server", err);
  });
