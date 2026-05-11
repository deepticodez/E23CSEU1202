export const API_BASE_URL = "http://4.224.186.213/evaluation-service";

export const LOG_ENDPOINT = "/logs";

export const NOTIFICATIONS_ENDPOINT = "/notifications";

export const TOKEN_KEY = "token";

export const PRIORITY_WEIGHTS = {
  placement: 3,
  result: 2,
  event: 1,
} as const;

export const ALLOWED_STACKS = ["frontend"] as const;

export const ALLOWED_LEVELS: readonly string[] = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
];

export const ALLOWED_PACKAGES: readonly string[] = [
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils",
];
