import axios, { AxiosInstance, AxiosError } from "axios";
import { API_BASE_URL, TOKEN_KEY } from "../utils/constants";
import { log } from "../middleware/logger";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    log(
      "frontend",
      "error",
      "api",
      `Request interceptor error: ${error.message}`,
    );
    return Promise.reject(error);
  },
);

// Response interceptor for centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.message || "Unknown error";

    let logMessage = `API Error: ${message}`;
    if (status) {
      logMessage += ` (Status: ${status})`;
    }

    log("frontend", "error", "api", logMessage);

    return Promise.reject(error);
  },
);

export default axiosInstance;
