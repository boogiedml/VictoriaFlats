import axios from "axios";

const backendUrl = "https://victoriaflats-backend.onrender.com/api/v1";

export default axios.create({
  baseURL: backendUrl,
});
