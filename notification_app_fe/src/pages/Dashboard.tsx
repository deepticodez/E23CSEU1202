import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNotifications } from "../hooks/useNotifications";
import type { NotificationFilters } from "../types/notification";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import PrioritySection from "../components/PrioritySection";
import NotificationCard from "../components/NotificationCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { log } from "../middleware/logger";

const Dashboard: React.FC = () => {
  const {
    notifications,
    loading,
    error,
    total,
    page,
    limit,
    refetch,
    setFilters,
    markAsViewed,
  } = useNotifications();

  const [filters, setFiltersState] = useState<NotificationFilters>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    log("frontend", "info", "page", "Dashboard page mounted");
  }, []);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarOpen(true);
      log("frontend", "error", "page", `Dashboard error: ${error}`);
    }
  }, [error]);

  const handleFiltersChange = (newFilters: NotificationFilters) => {
    setFiltersState(newFilters);
    setFilters(newFilters);
    log("frontend", "info", "page", "Filters applied");
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    // For simplicity, refetch with new page
    // In a real app, might need to adjust the hook
    log("frontend", "info", "page", `Page changed to ${value}`);
    // Since the hook is designed for append, for pagination we might need to adjust
    // For now, refetch
    refetch();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Notification Dashboard
            </Typography>
          </Box>
          <Box>
            <FilterBar
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </Box>
          <Box>
            <PrioritySection
              notifications={notifications}
              onView={markAsViewed}
            />
          </Box>
          <Box>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                All Notifications
              </Typography>
              {loading && notifications.length === 0 ? (
                <LoadingSpinner />
              ) : notifications.length === 0 ? (
                <EmptyState />
              ) : (
                <Box>
                  {notifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onView={markAsViewed}
                    />
                  ))}
                  {loading && <LoadingSpinner />}
                </Box>
              )}
              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
