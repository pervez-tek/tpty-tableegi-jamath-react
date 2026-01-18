// src/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for logging or auth
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default Api;
