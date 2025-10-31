// src/pages/specialties/components/LoadMoreButton.jsx
import { Box, IconButton } from "@mui/material";
import { MedicalServices } from "@mui/icons-material";

const LoadMoreButton = () => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
    <IconButton
      size="large"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        "&:hover": { bgcolor: "primary.dark" },
        width: 56,
        height: 56,
        boxShadow: 2,
      }}
    >
      <MedicalServices />
    </IconButton>
  </Box>
);

export default LoadMoreButton;
