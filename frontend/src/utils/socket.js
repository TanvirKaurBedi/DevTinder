import { io } from "socket.io-client";

const socket = io("http://32.192.7.124", {
  withCredentials: true,
});

export default socket;
