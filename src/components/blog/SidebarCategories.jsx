// src/pages/blog/components/SidebarCategories.jsx
import { Paper, Typography, Box, Chip } from "@mui/material";

const SidebarCategories = ({ categories }) => (
  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
    <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
      Categories
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {categories.map((cat, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 0.5,
            "&:hover": { color: "primary.main" },
            cursor: "pointer",
          }}
        >
          <Typography variant="body2">{cat.name}</Typography>
          <Chip
            label={cat.count}
            size="small"
            sx={{ fontSize: "0.7rem", height: 20 }}
          />
        </Box>
      ))}
    </Box>
  </Paper>
);

export default SidebarCategories;
