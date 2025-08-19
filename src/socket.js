import io from "socket.io-client";

// const SOCKET_URL = `http://localhost:8040`;
const SOCKET_URL = `http://167.86.96.232:8040/`;
const headers = { transports: ["websocket"] };
const socket = io(SOCKET_URL, headers);

export default socket;
