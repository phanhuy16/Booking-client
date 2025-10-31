// src/pages/blog/components/BreadcrumbSection.jsx
import { Breadcrumbs, Container, Typography, Box } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BreadcrumbSection = ({ isDetail = false }) => (
  <Box
    sx={{ bgcolor: "grey.50", py: 2, borderBottom: 1, borderColor: "grey.300" }}
  >
    <Container maxWidth="lg">
      <Breadcrumbs separator="›" sx={{ fontSize: "0.875rem", mb: 1 }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Home fontSize="small" sx={{ mr: 0.5 }} />
          Home
        </Link>
        <Link to="/blogs" style={{ color: "inherit", textDecoration: "none" }}>
          Blogs
        </Link>
        {isDetail && (
          <Typography color="primary" fontWeight={500}>
            Blog Detail
          </Typography>
        )}
        {!isDetail && (
          <Typography color="primary" fontWeight={500}>
            Blog List
          </Typography>
        )}
      </Breadcrumbs>
    </Container>
  </Box>
);

export default BreadcrumbSection;
