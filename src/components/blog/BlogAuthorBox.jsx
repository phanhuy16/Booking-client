// src/pages/blog/components/BlogAuthorBox.jsx
import { Box, Avatar, Typography } from "@mui/material";

const BlogAuthorBox = ({ author }) => (
  <Box
    sx={{
      display: "flex",
      gap: 2,
      mt: 4,
      p: 2,
      bgcolor: "grey.50",
      borderRadius: 2,
    }}
  >
    <Avatar src={author.avatar} sx={{ width: 56, height: 56 }} />
    <Box>
      <Typography variant="subtitle1" fontWeight={600}>
        {author.name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "0.875rem" }}
      >
        {author.description}
      </Typography>
    </Box>
  </Box>
);

export default BlogAuthorBox;
