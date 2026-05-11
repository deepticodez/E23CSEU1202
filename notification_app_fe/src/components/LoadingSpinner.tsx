import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { log } from "../middleware/logger";

const LoadingSpinner: React.FC = () => {
  useEffect(() => {
    log("frontend", "info", "component", "LoadingSpinner component mounted");
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
      }}
    >
      <CircularProgress />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Loading notifications...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
