import React, { useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { NotificationFilters } from "../types/notification";
import { log } from "../middleware/logger";

interface FilterBarProps {
  filters: NotificationFilters;
  onFiltersChange: (filters: NotificationFilters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  useEffect(() => {
    log("frontend", "info", "component", "FilterBar component mounted");
  }, []);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as "placement" | "result" | "event" | "";
    const newFilters: NotificationFilters = {
      ...filters,
      notification_type: value || undefined,
    };
    onFiltersChange(newFilters);
    log("frontend", "info", "component", `Filter changed to ${value || "all"}`);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={filters.notification_type || ""}
          onChange={handleTypeChange}
          label="Filter by Type"
        >
          <MenuItem value="">
            <em>All Types</em>
          </MenuItem>
          <MenuItem value="placement">Placement</MenuItem>
          <MenuItem value="result">Result</MenuItem>
          <MenuItem value="event">Event</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
