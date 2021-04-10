/**
 * Socket Util
 * @author Binh Nguyen
 * @since 0.0.1
 */
const io = require("socket.io")();
const jwt = require("jsonwebtoken");
const chatUtil = require("./chat");
const cookie = require("cookie");

// tracks online users
let online = {};

/**
 * Socket on connection implementation
 */
io.on("connection", async (socket) => {
  let payload = {};

  // gets payload from cookie
  try {
    const cookies = cookie.parse(socket.request.headers.cookie);
    if (!cookies) {
      socket.emit("error", "Unauthorized");
      return;
    }

    const token = cookies[process.env.JWT_PARAM];

    // decodes token
    payload = jwt.verify(token, process.env.JWT_SECRET);
    // checks if token is expired
    if (!payload || Date.now() > payload.expiration) {
      logout(payload.username);
      io.emit("online", online);
      socket.emit("error", "Unauthorized");
      return;
    }
  } catch (err) {
    socket.emit("error", "Invalid request.");
    return;
  }

  console.log(`User '${payload.username}' is connected with ID '${socket.id}'`);
  // adds user to online list
  online[payload.username] = socket.id;
  // sends a broadcast to notify all users
  io.emit("online", online);

  socket.on("disconnect", () => {
    // removes user from online list
    logout(payload.username);
    io.emit("online", online);
    console.log(
      `User '${payload.username}' with ID '${socket.id}' disconnected.`
    );
  });

  socket.on("new chat", async (chat) => {
    try {
      const conv = {
        startedBy: payload.id,
        participants: [payload.id, chat.to.id],
        messages: [
          {
            author: payload.id,
            content: chat.message,
          },
        ],
      };
      const saved = await chatUtil.addConversation(conv);
      const res = {
        id: saved._id,
        participants: [{
          _id: payload.id,
          username: payload.username
        },{
          _id: chat.to.id,
          username: chat.to.username
        }],
        lastUpdated: saved.lastUpdated,
        // shows only the most recent message for preview
        preview: saved.messages[conv.messages.length - 1]
      };
      // notifies users about a new chat
      if (chat.sid) socket.to(chat.sid).emit("new chat", res);
      socket.emit("new chat", res);
    } catch (err) {
      console.log(err);
      socket.emit("error", "Internal server error. Please try again later.");
    }
  });

  socket.on("new message", (msg) => {
    try {
      chatUtil.addMessage(msg.id, {
        author: payload.id,
        content: msg.message
      });
      // notifies user about a new message
      const message = {
        from: payload.username,
        time: new Date(),
        message: msg.message,
      };
      if (msg.sid) socket.to(msg.sid).emit("new message", message);
      socket.emit("new message", message);
    } catch (err) {
      console.log(err);
      socket.emit("error", "Internal server error. Please try again later.");
    }
  });
});

/**
 * @name logout
 * @description Removes a user from the online list
 * @param {string} username username to be removed from online list
 */
const logout = (username) => {
  delete online[username];
};

module.exports = io;
