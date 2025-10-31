// src/pages/blog/components/SidebarTags.jsx
import { Paper, Typography, Box, Chip } from "@mui/material";

const SidebarTags = ({ tags }) => (
  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
    <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
      Tags
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {tags.map((tag, i) => (
        <Chip
          key={i}
          label={tag}
          size="small"
          clickable
          sx={{
            fontSize: "0.75rem",
            height: 26,
            bgcolor: "grey.100",
            "&:hover": { bgcolor: "primary.main", color: "white" },
          }}
        />
      ))}
    </Box>
  </Paper>
);

export default SidebarTags;
