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
export async function connect() {
  // Client socket initialization
  Socket.connect();
}

export function setHandlers(handlers) {
  // removes old handlers
  Socket.off("error");
  Socket.off("online");
  Socket.off("new message");
  Socket.off("new chat");

  // handles connection error
  Socket.on("error", (err) => {
    handlers.onError(err);
  });
  // handles online user list
  Socket.on("online", (users) => {
    handlers.onOnline(users);
  });
  // handles receive message
  Socket.on("new message", (msg) => {
    handlers.onMessage(msg);
  });
  // handles receive new conversation
  Socket.on("new chat", (chat) => {
    handlers.onChat(chat);
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
 export async function startNewConversation(msg) {
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
  return res;
}

/**
 * @name newMessage
 * @description calls post message api for adding a message
 * @returns message ID
 */
 export async function newMessage(msg) {
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
  return res;
}

/**
 * @name newChatSocket
 * @description emits a new conversation to socket
 */
 export async function newChatSocket(msg) {
  Socket.emit("new chat", msg);
}

/**
 * @name newMessage
 * @description calls post message api for adding a message
 */
 export async function newMessageSocket(msg) {
  Socket.emit("new message", msg);
}
