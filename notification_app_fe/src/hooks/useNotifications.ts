import { useState, useEffect, useCallback } from "react";
import {
  Notification,
  NotificationFilters,
  NotificationPagination,
  NotificationResponse,
} from "../types/notification";
import { fetchNotifications } from "../api/notifications";
import { sortNotificationsByPriority } from "../utils/priority";
import { log } from "../middleware/logger";

interface UseNotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

interface UseNotificationsActions {
  fetchMore: () => void;
  refetch: () => void;
  setFilters: (filters: NotificationFilters) => void;
  markAsViewed: (id: string) => void;
  markAllAsViewed: () => void;
}

export const useNotifications = (
  initialLimit: number = 10,
): UseNotificationsState & UseNotificationsActions => {
  const [state, setState] = useState<UseNotificationsState>({
    notifications: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: initialLimit,
  });

  const [filters, setFilters] = useState<NotificationFilters>({});

  const fetchData = useCallback(
    async (page: number = 1, append: boolean = false) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const pagination: NotificationPagination = { limit: state.limit, page };
        const response: NotificationResponse = await fetchNotifications(
          pagination,
          filters,
        );

        setState((prev) => ({
          ...prev,
          notifications: append
            ? sortNotificationsByPriority([
                ...prev.notifications,
                ...response.notifications,
              ])
            : sortNotificationsByPriority(response.notifications),
          total: response.total,
          page: response.page,
          loading: false,
        }));

        log("frontend", "info", "hook", `Loaded notifications page ${page}`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
        log(
          "frontend",
          "error",
          "hook",
          `Failed to load notifications: ${errorMessage}`,
        );
      }
    },
    [state.limit, filters],
  );

  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  const fetchMore = useCallback(() => {
    if (!state.loading && state.notifications.length < state.total) {
      fetchData(state.page + 1, true);
    }
  }, [
    state.loading,
    state.notifications.length,
    state.total,
    state.page,
    fetchData,
  ]);

  const refetch = useCallback(() => {
    fetchData(1, false);
  }, [fetchData]);

  const setFiltersCallback = useCallback((newFilters: NotificationFilters) => {
    setFilters(newFilters);
  }, []);

  const markAsViewed = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, viewed: true }
          : notification,
      ),
    }));
    log("frontend", "info", "hook", `Marked notification ${id} as viewed`);
  }, []);

  const markAllAsViewed = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notification) => ({
        ...notification,
        viewed: true,
      })),
    }));
    log("frontend", "info", "hook", "Marked all notifications as viewed");
  }, []);

  return {
    ...state,
    fetchMore,
    refetch,
    setFilters: setFiltersCallback,
    markAsViewed,
    markAllAsViewed,
  };
};
