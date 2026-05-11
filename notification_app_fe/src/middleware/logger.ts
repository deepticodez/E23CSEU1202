import type { LogRequest, LogLevel, LogPackage } from "../types/notification";
import {
  API_BASE_URL,
  LOG_ENDPOINT,
  TOKEN_KEY,
  ALLOWED_STACKS,
  ALLOWED_LEVELS,
  ALLOWED_PACKAGES,
} from "../utils/constants";

let isLoggingDisabled = sessionStorage.getItem("loggingDisabled") === "true";
let activeLogRequest: Promise<any> | null = null;

export const log = async (
  stack: "frontend",
  level: LogLevel,
  packageName: LogPackage,
  message: string,
): Promise<void> => {
  if (isLoggingDisabled) return;

  if (activeLogRequest) {
    try {
      await activeLogRequest;
    } catch {
      // ignore
    }
  }

  if (isLoggingDisabled) return;

  // Validate inputs
  if (!ALLOWED_STACKS.includes(stack)) {
    return;
  }
  if (!ALLOWED_LEVELS.includes(level)) {
    return;
  }
  if (!ALLOWED_PACKAGES.includes(packageName)) {
    return;
  }

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }

  const trimmedToken = token.trim();
  const logData: LogRequest = {
    stack,
    level,
    packageName,
    message,
  };

  const logUrl = `${API_BASE_URL}${LOG_ENDPOINT}`;

  try {
    const fetchPromise = fetch(logUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${trimmedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logData),
    });

    activeLogRequest = fetchPromise;

    const response = await fetchPromise;
    if (response.status === 401) {
      isLoggingDisabled = true;
      sessionStorage.setItem("loggingDisabled", "true");
    }
  } catch (error) {
    isLoggingDisabled = true;
    sessionStorage.setItem("loggingDisabled", "true");
  } finally {
    activeLogRequest = null;
  }
};
