import axiosInstance from "./axios";
import {
  NotificationResponse,
  NotificationFilters,
  NotificationPagination,
} from "../types/notification";
import { NOTIFICATIONS_ENDPOINT } from "../utils/constants";
import { log } from "../middleware/logger";

export const fetchNotifications = async (
  pagination: NotificationPagination,
  filters?: NotificationFilters,
): Promise<NotificationResponse> => {
  try {
    const params: Record<string, string | number> = {
      limit: pagination.limit,
      page: pagination.page,
    };

    if (filters?.notification_type) {
      params.notification_type = filters.notification_type;
    }

    const response = await axiosInstance.get<NotificationResponse>(
      NOTIFICATIONS_ENDPOINT,
      {
        params,
      },
    );

    log(
      "frontend",
      "info",
      "api",
      `Fetched ${response.data.notifications.length} notifications`,
    );

    return response.data;
  } catch (error) {
    log("frontend", "error", "api", `Failed to fetch notifications: ${error}`);
    throw error;
  }
};
