/**
 * Messaging Service
 * @author Binh Nguyen
 * @since 0.1.0
 */
import Socket from "../socket";

/**
 * @name connect
 * @description intializes socket connection
 */
export function connect(errorHandler) {
  // Client socket initialization
  Socket.connect();
  Socket.on("connect_error", (err) => {
    errorHandler(err);
  });
}

/**
 * @name disconnect
 * @description disconnect socket connection
 */
export function disconnect() {
  Socket.disconnect();
}

/**
 * @name register
 * @description calls register api for registering a new user
 * @returns register information
 */
export async function register(username, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: { username: username, email: email, password: password },
    }),
  };
  const res = await fetch(`api/user/register`, requestOptions).then((res) =>
    res.json()
  );
  return res;
}
