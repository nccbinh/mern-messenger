/**
 * Socket Util
 * @author Binh Nguyen
 * @since 0.0.1
 */
const authHelper = require("../helpers/authHelper");
const io = require("socket.io")();
const validator = require("../middlewares/validator");

// tracks online users
let online = [];

/**
 * Socket on connection implementation
 */
io.on("connection", (socket) => {
  // gets payload from cookie
  const payload = authHelper.getPayload(socket.request.headers.cookie);
  console.log(`User '${payload.username}' is connected with ID '${socket.id}'`);
  // adds user to online list
  online.push(payload.username);
  // sends a broadcast to notify all users
  socket.emit

  socket.on("disconnect", () => {
      // removes user from online list
    online.splice(online.indexOf(payload.username), 1);
    console.log(
      `User '${payload.username}' with ID '${socket.id}' disconnected.`
    );
  });
});

/**
 * Socket validator
 */
io.use(validator.connection);

module.exports = io;
