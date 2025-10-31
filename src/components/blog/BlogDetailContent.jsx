// src/pages/blog/components/BlogDetailContent.jsx
import { Card, CardContent, Box, Typography, Chip } from "@mui/material";
import {
  Schedule,
  Person,
  RemoveRedEye,
  ChatBubbleOutline,
} from "@mui/icons-material";

const BlogDetailContent = ({ post }) => (
  <Card sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 1, mb: 2 }}>
    {/* Featured Image */}
    <Box
      sx={{
        height: { xs: 200, sm: 280, md: 320 },
        backgroundImage: `url(${post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        borderRadius: "8px 8px 0 0",
      }}
    >
      <Chip
        label={post.category}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          bgcolor: "primary.main",
          color: "white",
          fontWeight: 600,
          fontSize: "0.75rem",
        }}
      />
    </Box>

    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
      {/* Meta */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mb: 2,
          color: "text.secondary",
          fontSize: "0.875rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Schedule sx={{ fontSize: 16 }} />
          {post.date}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Person sx={{ fontSize: 16 }} />
          {post.author}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <RemoveRedEye sx={{ fontSize: 16 }} />
          {post.views}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ChatBubbleOutline sx={{ fontSize: 16 }} />
          {post.comments}
        </Box>
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          lineHeight: 1.3,
        }}
      >
        {post.title}
      </Typography>

      {/* Content */}
      <Box
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
        sx={{
          "& p": {
            mb: 2,
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "text.secondary",
          },
          "& h3": { mt: 3, mb: 1.5, fontWeight: 600, fontSize: "1.25rem" },
          "& blockquote": {
            borderLeft: "4px solid",
            borderColor: "primary.main",
            pl: 2,
            py: 1.5,
            my: 3,
            bgcolor: "grey.50",
            fontStyle: "italic",
            color: "text.primary",
            "& p": { m: 0, fontSize: "1rem" },
          },
        }}
      />
    </CardContent>
  </Card>
);

export default BlogDetailContent;
