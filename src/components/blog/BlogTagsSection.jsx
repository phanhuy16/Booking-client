// src/pages/blog/components/BlogTagsSection.jsx
import { Divider, Box, Typography, Chip } from "@mui/material";

const BlogTagsSection = ({ tags }) => (
  <>
    <Divider sx={{ my: 3 }} />
    <Box>
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Tags
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            size="small"
            sx={{
              fontSize: "0.75rem",
              height: 26,
              bgcolor: "grey.100",
              "&:hover": { bgcolor: "primary.main", color: "white" },
            }}
          />
        ))}
      </Box>
    </Box>
  </>
);

export default BlogTagsSection;
