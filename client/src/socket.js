import { io } from "socket.io-client";

const socket = io("/", { autoConnect: false });
console.log("Requesting socket connect");

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
