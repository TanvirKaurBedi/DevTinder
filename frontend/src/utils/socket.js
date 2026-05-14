import { io } from "socket.io-client";

const socket = io("http://devlinkup.in", {
  withCredentials: true,
});

export default socket;
