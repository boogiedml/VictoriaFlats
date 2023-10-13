import axios from "axios";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = "http://localhost:8080/api/v1";
// const backendUrl = "https://victoriaflats-backend.onrender.com/api/v1";

export default axios.create({
  baseURL: backendUrl,
});
