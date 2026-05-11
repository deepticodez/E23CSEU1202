import axiosInstance from "./axios";
import type {
  NotificationResponse,
  NotificationFilters,
  NotificationPagination,
} from "../types/notification";
import { NOTIFICATIONS_ENDPOINT } from "../utils/constants";
import { log } from "../middleware/logger";

let apiDisabled = sessionStorage.getItem("apiDisabled") === "true";

export const fetchNotifications = async (
  pagination: NotificationPagination,
  filters?: NotificationFilters,
): Promise<NotificationResponse> => {
  if (apiDisabled) {
    throw new Error("API is disabled due to previous 401 error. Falling back to mock data.");
  }

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
  } catch (error: any) {
    if (error?.response?.status === 401) {
      apiDisabled = true;
      sessionStorage.setItem("apiDisabled", "true");
    }
    // The hook will handle logging the error and falling back to mock data
    throw error;
  }
};
