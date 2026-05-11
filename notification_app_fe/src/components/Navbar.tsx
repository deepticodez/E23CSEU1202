import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { log } from "../middleware/logger";

const Navbar: React.FC = () => {
  useEffect(() => {
    log("frontend", "info", "component", "Navbar component mounted");
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notification Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
