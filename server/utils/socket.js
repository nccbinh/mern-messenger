/**
 * Socket Util
 * @author Binh Nguyen
 * @since 0.0.1
 */
const io = require("socket.io")();
const jwt = require("jsonwebtoken");
const validator = require("../middlewares/validator");

// tracks online users
let online = [];

/**
 * Socket on connection implementation
 */
io.on("connection", (socket) => {
  // gets payload from cookie
  const cookie = socket.request.headers.cookie;
  if (!cookie) return (new Error("Unauthorized"));
  // gets token from cookie
  const token = cookie.replace(process.env.JWT_PARAM + "=", "");
  // decodes token
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  // checks if token is expired
  if (!payload || Date.now() > payload.expiration) {
    logout(payload.username);
    return (new Error("Unauthorized"));
  }

  console.log(`User '${payload.username}' is connected with ID '${socket.id}'`);
  // adds user to online list
  online.push(payload.username);
  // sends a broadcast to notify all users
  io.emit("online", online);

  socket.on("disconnect", () => {
    // removes user from online list
    logout(payload.username);
    console.log(
      `User '${payload.username}' with ID '${socket.id}' disconnected.`
    );
  });
});

/**
 * @name logout
 * @description Removed a user from the online list
 * @param {string} username username to be removed from online list
 */
const logout = (username) => {
  online.splice(online.indexOf(username), 1);
};

module.exports = io;
