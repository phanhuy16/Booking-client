// src/pages/blog/BlogDetail.jsx
import { useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import images from "../../config/images";
import { BlogAuthorBox, BlogDetailContent, BlogTagsSection, BreadcrumbSection, SidebarCategories, SidebarLatestNews, SidebarSearch } from "../../components/blog";

const BlogDetail = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Health Care", count: 2 },
    { name: "Health Tips", count: 5 },
    { name: "Medical Research", count: 4 },
    { name: "Health Treatment", count: 6 },
    { name: "Nutrition", count: 8 },
  ];

  const latestNews = [
    {
      id: 1,
      title: "Managing Chronic Conditions...",
      date: "08 Nov 2024",
      image: images.blogs.blog2,
    },
    {
      id: 2,
      title: "Understanding Common Symptoms...",
      date: "15 Nov 2024",
      image: images.blogs.blog1,
    },
    {
      id: 3,
      title: "Nutrition and Wellness...",
      date: "08 Dec 2024",
      image: images.blogs.blog3,
    },
  ];

  const tags = ["Health Tips", "Awareness", "Health", "Wellness"];

  const blogPost = {
    title: "10 Tips for Maintaining a Healthy Lifestyle Year-Round",
    category: "Health Tips",
    author: "Arthur Hetzel",
    date: "03 Apr 2024",
    views: 25,
    comments: 80,
    image: images.blogs.blog1,
    content: `
      <p>Maintaining a healthy lifestyle year-round is achievable with consistent habits that support your physical and mental well-being. One of the most important aspects of health is hydration. Aim to drink at least eight glasses of water daily, adjusting for factors like weather and physical activity.</p>

      <p>Regular physical activity is another cornerstone of a healthy lifestyle. Engaging in at least 150 minutes of moderate exercise per week, such as walking or cycling, can boost your cardiovascular health, strengthen muscles, and improve mood.</p>

      <blockquote class="blog-quote">
        <p>Consistency is key. Small, sustainable changes in your daily habits will have a more lasting impact than short-term, extreme efforts.</p>
      </blockquote>

      <h3>About Author</h3>
    `,
    authorBio: {
      name: "Arthur Hetzel",
      avatar: images.doctors.doctor1,
      description:
        "Certified nutritionist and wellness coach passionate about helping others achieve a balanced lifestyle through small, sustainable changes.",
    },
  };

  return (
    <div className="blogdetail-page">
      <BreadcrumbSection isDetail />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Blog Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <BlogDetailContent post={blogPost} />
            <BlogAuthorBox author={blogPost.authorBio} />
            <BlogTagsSection tags={tags} />
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                position: { md: "sticky" },
                top: 20,
              }}
            >
              <SidebarSearch value={searchQuery} onChange={setSearchQuery} />
              <SidebarCategories categories={categories} />
              <SidebarLatestNews news={latestNews} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BlogDetail;
