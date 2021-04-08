/**
 * Messaging Service
 * @author Binh Nguyen
 * @since 0.1.0
 */
import Socket from "../socket";
import resHandler from "../helpers/apiHelper";

/**
 * @name connect
 * @description intializes socket connection
 */
export async function connect(errorHandler, onlineHandler, messageHandler, chatHandler) {
  // Client socket initialization
  Socket.connect();
  // handles connection error
  Socket.on("error", (err) => {
    errorHandler(err);
  });
  // handles online user list
  Socket.on("online", (users) => {
    onlineHandler(users);
  });
  // handles receive message
  Socket.on("new message", (id) => {
    messageHandler(id);
  });
  // handles receive new conversation
  Socket.on("new chat", () => {
    chatHandler();
  });
}

/**
 * @name disconnect
 * @description disconnects socket connection
 */
export async function disconnect() {
  Socket.disconnect();
}

/**
 * @name sendMessage
 * @description sends message via socker
 */
export async function sendMessage(message) {
  Socket.emit("message", message);
}

/**
 * @name getConversations
 * @description calls get conversations api
 * @returns conversation list
 */
export async function getConversations() {
  const res = await fetch(`api/conversation/`).then(resHandler);
  return res;
}

/**
 * @name getConversation
 * @description calls get conversation api
 * @returns conversation list
 */
 export async function getConversation(id) {
  const res = await fetch(`api/conversation/${id}`).then(resHandler);
  return res;
}

/**
 * @name search
 * @description calls search api for searching users
 * @returns list of matching users
 */
export async function search(keyword) {
  const res = await fetch(`api/user/search?keyword=${keyword}`).then(resHandler);
  return res;
}

/**
 * @name startNewConversation
 * @description calls start conversation api for starting a new conversation
 * @returns new conversation's ID
 */
 export async function startNewConversation(msg, socketId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conversation: { to: msg.to, message: msg.message },
    }),
  };
  const res = await fetch(`api/conversation/`, requestOptions).then((res) =>
    res.json()
  );
  Socket.emit("new chat", socketId);
  return res;
}

/**
 * @name newMessage
 * @description calls post message api for adding a message
 * @returns message ID
 */
 export async function newMessage(msg, socketId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: msg.message,
    }),
  };
  const res = await fetch(`api/conversation/${msg.id}`, requestOptions).then((res) =>
    res.json()
  );
  Socket.emit("new message", socketId, msg.id);
  return res;
}
