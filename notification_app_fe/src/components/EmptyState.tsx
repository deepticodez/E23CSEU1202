import React, { useEffect } from "react";
import { Typography, Paper } from "@mui/material";
import { log } from "../middleware/logger";

const EmptyState: React.FC = () => {
  useEffect(() => {
    log("frontend", "info", "component", "EmptyState component mounted");
  }, []);

  return (
    <Paper sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        No notifications found
      </Typography>
      <Typography variant="body2" color="text.secondary">
        There are no notifications matching your criteria.
      </Typography>
    </Paper>
  );
};

export default EmptyState;
