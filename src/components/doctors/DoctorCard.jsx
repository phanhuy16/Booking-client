// src/pages/doctors/components/DoctorCard.jsx
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Rating,
  IconButton,
  Button,
} from "@mui/material";
import { FavoriteBorder, LocationOn, Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor, viewMode }) => {
  return (
    <Card className={`doctor-card ${viewMode}-view`}>
      {viewMode === "grid" ? (
        // Grid View
        <>
          <Box className="doctor-image-section" sx={{ position: "relative" }}>
            <Box
              className="doctor-image"
              sx={{
                height: 250,
                backgroundImage: `url(${doctor.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Chip
                label={`${doctor.consultationFee.toLocaleString()}₫`}
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "white",
                }}
                size="small"
              >
                <FavoriteBorder fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Rating
                value={doctor.rating}
                readOnly
                size="small"
                precision={0.5}
              />
              <Chip
                label={doctor.rating}
                size="small"
                icon={<Star fontSize="small" />}
                sx={{ height: 24, fontSize: "12px" }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
              <Chip
                label={doctor.specialty}
                size="small"
                color="primary"
                sx={{ height: 24, fontSize: "11px" }}
              />
              {doctor.availability && (
                <Chip
                  label={doctor.availability}
                  size="small"
                  color="success"
                  sx={{ height: 24, fontSize: "11px" }}
                />
              )}
            </Box>

            <Typography
              variant="h6"
              sx={{ fontSize: "16px", fontWeight: 600, mb: 0.5 }}
            >
              {doctor.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "13px", mb: 1.5 }}
            >
              {doctor.degree}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                mb: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {doctor.location}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {doctor.experience} Years Experience
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                component={Link}
                to={`/doctors/${doctor.id}/details`}
                sx={{
                  flex: 1,
                  fontSize: "13px",
                  py: 0.75,
                  textTransform: "none",
                }}
              >
                View
              </Button>
              <Button
                variant="contained"
                size="small"
                component={Link}
                to={`/booking/${doctor.id}`}
                sx={{
                  flex: 1,
                  fontSize: "13px",
                  py: 0.75,
                  textTransform: "none",
                }}
              >
                Book Now
              </Button>
            </Box>
          </CardContent>
        </>
      ) : (
        // List View
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            <Box
              sx={{
                width: 180,
                height: 180,
                backgroundImage: `url(${doctor.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                position: "relative",
              }}
            >
              <Chip
                  label={`${doctor.consultationFee.toLocaleString()}₫`}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "13px",
                  height: 26,
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "white",
                  width: 32,
                  height: 32,
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <FavoriteBorder sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Rating
                value={doctor.rating}
                readOnly
                size="small"
                precision={0.5}
              />
              <Chip
                label={doctor.rating}
                size="small"
                icon={<Star fontSize="small" />}
                sx={{ height: 22, fontSize: "11px" }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
              <Chip
                label={doctor.specialty}
                size="small"
                color="primary"
                sx={{ height: 22, fontSize: "11px" }}
              />
              {doctor.availability && (
                <Chip
                  label={doctor.availability}
                  size="small"
                  color="success"
                  sx={{ height: 22, fontSize: "11px" }}
                />
              )}
            </Box>

            <Typography
              variant="h6"
              sx={{ fontSize: "18px", fontWeight: 600, mb: 0.5 }}
            >
              {doctor.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "13px", mb: 1 }}
            >
              {doctor.degree}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 1.5, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {doctor.location}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {doctor.experience} Years Experience
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {doctor.reviews} Reviews
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
              <Button
                variant="outlined"
                size="small"
                component={Link}
                to={`/doctors/${doctor.id}`}
                sx={{
                  minWidth: 100,
                  fontSize: "13px",
                  py: 0.75,
                  textTransform: "none",
                }}
              >
                View Profile
              </Button>
              <Button
                variant="contained"
                size="small"
                component={Link}
                to={`/booking/${doctor.id}`}
                sx={{
                  minWidth: 120,
                  fontSize: "13px",
                  py: 0.75,
                  textTransform: "none",
                }}
              >
                Book Appointment
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default DoctorCard;
