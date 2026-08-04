import axios from "axios";

/**
 * Shared Axios instance for all API requests.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — add auth token when available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
