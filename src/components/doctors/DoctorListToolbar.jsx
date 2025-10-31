// src/pages/doctors/components/DoctorListToolbar.jsx
import {
  Box,
  Typography,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Chip,
} from "@mui/material";
import { GridView, ViewList, Sort } from "@mui/icons-material";

const DoctorListToolbar = ({
  viewMode,
  handleViewModeChange,
  sortBy,
  handleSortChange,
  doctors,
  selectedSpecialty,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        p: 2.5,
        mb: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}
      >
        <Typography variant="body1" color="text.primary">
          <strong>{doctors.length}</strong> doctor{doctors.length !== 1 && "s"}{" "}
          found
        </Typography>

        {selectedSpecialty && (
          <Chip
            label={selectedSpecialty}
            color="primary"
            size="small"
            sx={{ fontWeight: 500 }}
          />
        )}
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Sort sx={{ color: "text.secondary", fontSize: 20 }} />
          <Select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            size="small"
            sx={{
              minWidth: 180,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
            }}
          >
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Highest Rating</MenuItem>
            <MenuItem value="experience">Most Experienced</MenuItem>
          </Select>
        </Box>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              px: 2,
              py: 0.75,
              border: "1px solid",
              borderColor: "divider",
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            },
          }}
        >
          <ToggleButton value="grid">
            <GridView sx={{ mr: 0.5 }} />
            Grid
          </ToggleButton>
          <ToggleButton value="list">
            <ViewList sx={{ mr: 0.5 }} />
            List
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
};

export default DoctorListToolbar;
