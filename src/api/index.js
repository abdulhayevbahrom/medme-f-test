import axios from "axios";

const mainURL = axios.create({
  baseURL: "http://localhost:8040/api",
});

export default mainURL;
