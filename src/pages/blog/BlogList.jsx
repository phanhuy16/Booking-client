// src/pages/blog/BlogList.jsx
import { useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import images from "../../config/images";
import { BlogPostCard, BreadcrumbSection, PaginationSection, SidebarCategories, SidebarLatestNews, SidebarSearch, SidebarTags } from "../../components/blog";

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { name: "Health Care", count: 2 },
    { name: "Health Tips", count: 5 },
    { name: "Medical Research", count: 4 },
    { name: "Health Treatment", count: 6 },
    { name: "Nutrition", count: 8 },
  ];

  const tags = [
    "Health Tips",
    "Awareness",
    "Health",
    "Wellness",
    "Treatments",
    "Checkup",
    "Prevention",
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
    {
      id: 4,
      title: "Top Preventive Health Measures...",
      date: "17 Dec 2024",
      image: images.blogs.blog1,
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Maintaining a Healthy Lifestyle Year-Round",
      excerpt:
        "Discover practical, everyday tips to help you stay healthy throughout the year.",
      category: "Health Tips",
      author: "Arthur Hetzel",
      date: "03 Apr 2024",
      image: images.blogs.blog1,
    },
    {
      id: 2,
      title: "Managing Chronic Conditions: Expert Advice for Better Living",
      excerpt:
        "Living with a chronic condition can be challenging, but the right strategies can make life easier.",
      category: "Technology",
      author: "Teresa Baxter",
      date: "22 Jun 2024",
      image: images.blogs.blog2,
    },
    {
      id: 3,
      title: "Understanding Common Symptoms: When to See a Doctor",
      excerpt:
        "Learn how to identify common symptoms and when it's important to seek medical attention.",
      category: "Pediatrics",
      author: "Robin Frost",
      date: "14 Apr 2024",
      image: images.blogs.blog3,
    },
  ];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bloglist-page">
      <BreadcrumbSection />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Blog Posts */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </Box>
            <PaginationSection
              count={5}
              page={currentPage}
              onChange={handlePageChange}
            />
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
              <SidebarTags tags={tags} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BlogList;
