export interface Notification {
  id: string;
  type: "placement" | "result" | "event";
  message: string;
  timestamp: string; // ISO date string
  viewed: boolean;
}

export interface NotificationFilters {
  notification_type?: "placement" | "result" | "event";
}

export interface NotificationPagination {
  limit: number;
  page: number;
}

export interface NotificationResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
}

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export type LogPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export interface LogRequest {
  stack: "frontend";
  level: LogLevel;
  packageName: LogPackage;
  message: string;
}
