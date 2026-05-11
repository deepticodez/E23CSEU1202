import React, { useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import type { Notification } from "../types/notification";
import NotificationCard from "./NotificationCard";
import { log } from "../middleware/logger";

interface PrioritySectionProps {
  notifications: Notification[];
  onView: (id: string) => void;
}

const PrioritySection: React.FC<PrioritySectionProps> = ({
  notifications,
  onView,
}) => {
  useEffect(() => {
    log("frontend", "info", "component", "PrioritySection component mounted");
  }, []);

  // Show top 5 priority notifications (assuming sorted by priority)
  const priorityNotifications = notifications.slice(0, 5);

  if (priorityNotifications.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Priority Notifications
      </Typography>
      <Box>
        {priorityNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onView={onView}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default PrioritySection;
