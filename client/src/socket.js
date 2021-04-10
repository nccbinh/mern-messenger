import { io } from "socket.io-client";

const socket = io("/", { autoConnect: false });
console.log("Requesting socket connect");

export default socket;
