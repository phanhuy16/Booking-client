// src/pages/blog/components/BlogPostCard.jsx
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { Schedule, ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BlogPostCard = ({ post }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: 1,
      transition: "0.3s",
      "&:hover": { boxShadow: 3, transform: "translateY(-2px)" },
    }}
  >
    <Box
      sx={{
        width: { xs: "100%", sm: 180 },
        height: { xs: 180, sm: "100%" },
        bgcolor: "grey.200",
        backgroundImage: `url(${post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <Chip
        label={post.category}
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          bgcolor: "primary.main",
          color: "white",
          fontWeight: 600,
          fontSize: "0.7rem",
        }}
      />
    </Box>

    <CardContent
      sx={{
        flex: 1,
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 1,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: "0.75rem",
              bgcolor: "primary.main",
            }}
          >
            {post.author[0]}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            {post.author}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Schedule sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {post.date}
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 1,
          fontSize: { xs: "1rem", sm: "1.1rem" },
          lineHeight: 1.4,
          "&:hover": { color: "primary.main" },
          cursor: "pointer",
        }}
      >
        {post.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 1.5,
          fontSize: "0.875rem",
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.excerpt}
      </Typography>

      <Box sx={{ mt: "auto" }}>
        <Link
          to={`/blogs/${post.id}`}
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            color: "primary.main",
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          Read More
          <ArrowForward sx={{ fontSize: 16 }} />
        </Link>
      </Box>
    </CardContent>
  </Card>
);

export default BlogPostCard;
