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
export async function connect(errorHandler, onlineHandler, messageHandler) {
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
  Socket.on("message", (message) => {
    messageHandler(message);
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
 * @name search
 * @description calls search api for searching users
 * @returns list of matching users
 */
export async function search(keyword) {
  const res = await fetch(`api/user/search?keyword=${keyword}`).then(resHandler);
  return res;
}
