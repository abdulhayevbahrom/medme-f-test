import io from "socket.io-client";

// const SOCKET_URL = `http://localhost:8040`;
const SOCKET_URL = `https://medme-b-test.vercel.app/`;
const headers = { transports: ["websocket"] };
const socket = io(SOCKET_URL, headers);

export default socket;
