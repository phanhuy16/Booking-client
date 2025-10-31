// src/pages/doctors/components/BreadcrumbSection.jsx
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BreadcrumbSection = ({ isDetail = false, doctorName = '' }) => {
  return (
    <Box
      sx={{
        bgcolor: "grey.50",
        py: 2,
        borderBottom: 1,
        borderColor: "grey.300",
      }}
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
          <Link
            to="/doctors"
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Doctors
          </Link>
          {isDetail && (
            <Typography color="primary" fontWeight={500}>
              Doctor Detail <span style={{ fontWeight: 400 }}> - {doctorName}</span>
            </Typography>
          )}
          {!isDetail && (
            <Typography color="primary" fontWeight={500}>
              Doctor List
            </Typography>
          )}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default BreadcrumbSection;
