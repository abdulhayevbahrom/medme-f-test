import io from "socket.io-client";

const SOCKET_URL = `http://localhost:8040`;
const headers = { transports: ["websocket"] };
const socket = io(SOCKET_URL, headers);

export default socket;
