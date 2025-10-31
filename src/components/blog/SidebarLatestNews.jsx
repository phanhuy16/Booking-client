// src/pages/blog/components/SidebarLatestNews.jsx
import { Paper, Typography, Box } from "@mui/material";

const SidebarLatestNews = ({ news }) => (
  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
    <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
      Latest News
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {news.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            gap: 1.5,
            cursor: "pointer",
            "&:hover .news-title": { color: "primary.main" },
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 1.5,
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              {item.date}
            </Typography>
            <Typography
              variant="body2"
              className="news-title"
              sx={{ fontSize: "0.875rem", lineHeight: 1.3, mt: 0.5 }}
            >
              {item.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Paper>
);

export default SidebarLatestNews;
