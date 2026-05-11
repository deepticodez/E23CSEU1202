import axios from "axios";
import { LogRequest, LogLevel, LogPackage } from "../types/notification";
import {
  API_BASE_URL,
  LOG_ENDPOINT,
  TOKEN_KEY,
  ALLOWED_STACKS,
  ALLOWED_LEVELS,
  ALLOWED_PACKAGES,
} from "../utils/constants";

export const log = async (
  stack: "frontend",
  level: LogLevel,
  packageName: LogPackage,
  message: string,
): Promise<void> => {
  try {
    // Validate inputs
    if (!ALLOWED_STACKS.includes(stack)) {
      throw new Error(`Invalid stack: ${stack}`);
    }
    if (!ALLOWED_LEVELS.includes(level)) {
      throw new Error(`Invalid level: ${level}`);
    }
    if (!ALLOWED_PACKAGES.includes(packageName)) {
      throw new Error(`Invalid package: ${packageName}`);
    }

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const logData: LogRequest = {
      stack,
      level,
      packageName,
      message,
    };

    await axios.post(`${API_BASE_URL}${LOG_ENDPOINT}`, logData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Safe error handling - do not throw, just silently fail
    // Since no console.log allowed, we can't log errors here
  }
};
