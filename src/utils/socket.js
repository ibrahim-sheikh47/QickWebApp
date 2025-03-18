import io from "socket.io-client";
import { CONNECTION, DISCONNECT } from "./events";

// Your backend socket server URL (replace with your actual server URL)
// const SOCKET_SERVER_URL = "https://api.qick.app";
// const SOCKET_SERVER_URL = "http://localhost:8000";
const SOCKET_SERVER_URL = import.meta.env.VITE_API_BASE_URL;

let socket = null;

export const connectSocket = (user) => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, {
      query: {
        user: JSON.stringify({
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          // deviceToken: user.deviceToken,
        }),
      },
      transports: ["websocket"],
    });

    socket.on(CONNECTION, () => {
      console.log("Connected to socket server:", socket.id);
    });

    socket.on(DISCONNECT, () => {
      console.log("Disconnected from socket server");
    });
  }

  return socket;
};

export const getSocket = () => socket; // Retrieve existing socket instance

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Reset socket instance
  }
};
