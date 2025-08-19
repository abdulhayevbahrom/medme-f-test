import axios from "axios";

const mainURL = axios.create({
  // baseURL: "http://localhost:8040/api",
  baseURL: "http://167.86.96.232:8040/api",
});

export default mainURL;
