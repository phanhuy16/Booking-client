import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import { Schedule } from "@mui/icons-material";
import SectionHeader from "./SectionHeader";

const BlogsSection = ({ blogs }) => {
  return (
    <section className="blogs-section" style={{ padding: "3rem 0" }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Blogs & News"
          subtitle="Expert perspectives and latest articles"
        />
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid size={{ xs: 12, md: 4 }} key={blog.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box sx={{ position: "relative", height: 180 }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: "100%",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${blog.image})`,
                    }}
                  />
                  <Avatar
                    sx={{
                      position: "absolute",
                      bottom: -16,
                      left: 16,
                      border: "3px solid white",
                      width: 32,
                      height: 32,
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    {blog.author.charAt(0)}
                  </Avatar>
                </Box>

                <CardContent sx={{ flexGrow: 1, pt: 4, pb: 2, px: 2 }}>
                  <Chip
                    label={blog.category}
                    size="small"
                    color="primary"
                    sx={{ mb: 1, fontSize: "0.7rem", height: 22 }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize="1rem"
                    lineHeight={1.3}
                    noWrap
                    gutterBottom
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="0.85rem"
                    lineHeight={1.4}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.excerpt}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                      fontSize="0.8rem"
                    >
                      <Schedule fontSize="small" /> {blog.date}
                    </Typography>
                    <Button
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      Read More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default BlogsSection;
