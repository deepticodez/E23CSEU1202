import React, { useEffect } from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import type { Notification } from "../types/notification";
import { formatDate } from "../utils/date";
import { log } from "../middleware/logger";

interface NotificationCardProps {
  notification: Notification;
  onView: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onView,
}) => {
  useEffect(() => {
    log(
      "frontend",
      "info",
      "component",
      `NotificationCard rendered for ${notification.id}`,
    );
  }, [notification.id]);

  const handleClick = () => {
    if (!notification.viewed) {
      onView(notification.id);
      log(
        "frontend",
        "info",
        "component",
        `Notification ${notification.id} marked as viewed`,
      );
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        cursor: !notification.viewed ? "pointer" : "default",
        backgroundColor: !notification.viewed ? "#e3f2fd" : "white",
        border: !notification.viewed
          ? "1px solid #2196f3"
          : "1px solid #e0e0e0",
        "&:hover": {
          boxShadow: 3,
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip
            label={notification.type.toUpperCase()}
            color={
              notification.type === "placement"
                ? "primary"
                : notification.type === "result"
                  ? "secondary"
                  : "default"
            }
            size="small"
          />
          {!notification.viewed && (
            <Chip label="New" color="error" size="small" />
          )}
        </Box>
        {notification.title && (
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
            {notification.title}
          </Typography>
        )}
        <Typography variant="body1" gutterBottom>
          {notification.message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatDate(notification.timestamp)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
