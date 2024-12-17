import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Dynamically pulled from environment
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
