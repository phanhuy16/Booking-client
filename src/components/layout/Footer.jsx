// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { Container, Typography, Box, IconButton, Divider } from "@mui/material";
import {
  LocalHospital,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const forPatientsLinks = [
    { label: "Search for Doctors", path: "/doctors" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Booking", path: "/booking" },
    { label: "Patient Dashboard", path: "/patient/dashboard" },
  ];

  const forDoctorsLinks = [
    { label: "Appointments", path: "/doctor/appointments" },
    { label: "Chat", path: "/doctor/chat" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Doctor Dashboard", path: "/doctor/dashboard" },
  ];

  const socialLinks = [
    { icon: <Facebook />, url: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <LinkedIn />, url: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        padding: "3rem 0 1.5rem",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer - 1 HÀNG */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: { xs: 3, md: 4 },
            mb: 3,
          }}
        >
          {/* Logo + About */}
          <Box sx={{ flex: "1 1 300px", minWidth: 250 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 1 }}
            >
              <LocalHospital sx={{ fontSize: 28, color: "#3b82f6" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  letterSpacing: 0.5,
                }}
              >
                DOCCURE
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "#94a3b8",
                mb: 2,
              }}
            >
              Transform your vision into a healthcare appointment booking
              platform. Provide support with a great set of useful features. Our
              system is designed for both patients and doctors.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: "#94a3b8",
                    bgcolor: "#1e293b",
                    "&:hover": { bgcolor: "#3b82f6", color: "white" },
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* For Patients */}
          <Box sx={{ flex: "1 1 180px" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1.5, color: "white" }}
            >
              For Patients
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {forPatientsLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Box>

          {/* For Doctors */}
          <Box sx={{ flex: "1 1 180px" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1.5, color: "white" }}
            >
              For Doctors
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {forDoctorsLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Our Location */}
          <Box sx={{ flex: "1 1 250px" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1.5, color: "white" }}
            >
              Our Location
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOn sx={{ fontSize: 18, color: "#3b82f6", mt: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.875rem", color: "#94a3b8" }}
                >
                  367 Hillcrest Street, San Francisco, California, 94108
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone sx={{ fontSize: 18, color: "#3b82f6" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.875rem", color: "#94a3b8" }}
                >
                  +1 315 369 5943
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email sx={{ fontSize: 18, color: "#3b82f6" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.875rem", color: "#94a3b8" }}
                >
                  doccure@example.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ bgcolor: "#1e293b", my: 2 }} />

        {/* Footer Bottom */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            fontSize: "0.8rem",
            color: "#64748b",
          }}
        >
          <Typography variant="caption">
            Copyright © {currentYear} Doccure. All Rights Reserved
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link
              to="/terms"
              style={{ color: "#64748b", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
              onMouseLeave={(e) => (e.target.style.color = "#64748b")}
            >
              Terms and Conditions
            </Link>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              |
            </Typography>
            <Link
              to="/policy"
              style={{ color: "#64748b", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
              onMouseLeave={(e) => (e.target.style.color = "#64748b")}
            >
              Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
