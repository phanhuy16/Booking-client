import { Box, Typography, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: "0.95rem", mt: 0.5 }}
        >
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          size="small"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SectionHeader;
