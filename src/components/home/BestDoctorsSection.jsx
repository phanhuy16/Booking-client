import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Rating,
  IconButton,
  Button,
} from "@mui/material";
import { LocationOn, Schedule, FavoriteBorder } from "@mui/icons-material";
import SectionHeader from "./SectionHeader";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const BestDoctorsSection = ({ doctors }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBooking = (doctorId) => {
    if (!user) {
      navigate("/login", { state: { from: `/booking/${doctorId}` } });
    } else {
      navigate(`/booking/${doctorId}`);
    }
  };

  return (
    <section className="doctors-section" style={{ padding: "3rem 0" }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Book Our Best Doctor"
          subtitle="Meet our experts & book online"
        />

        <Grid container spacing={2}>
          {doctors.map((doctor) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={doctor.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                {/* Hình ảnh nhỏ hơn */}
                <Box
                  sx={{ position: "relative", height: 160, overflow: "hidden" }}
                >
                  <Box
                    component="img"
                    src={doctor.avatarUrl}
                    alt={doctor.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                  <Chip
                    label={doctor.price}
                    size="small"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "background.paper",
                      "&:hover": { bgcolor: "grey.200" },
                    }}
                  >
                    <FavoriteBorder fontSize="small" />
                  </IconButton>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  {/* Rating nhỏ gọn */}
                  <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                    <Rating value={doctor.rating} readOnly size="small" />
                    <Chip
                      label={doctor.rating}
                      size="small"
                      color="success"
                      sx={{ height: 20, fontSize: "0.7rem" }}
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize="1rem"
                    noWrap
                  >
                    {doctor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="0.85rem"
                    noWrap
                  >
                    {doctor.specialty}
                  </Typography>
                  {doctor.experience && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {doctor.experience}
                    </Typography>
                  )}

                  {/* Meta nhỏ gọn */}
                  <Box display="flex" flexDirection="column" gap={0.5} my={1.5}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="caption">
                        San Francisco, CA
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="caption">
                        {doctor.available ? "Available" : "Not Available"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Nút nhỏ hơn, xếp dọc */}
                  <Box display="flex" flexDirection="column" gap={1} mt={2}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/doctors/${doctor.id}/details`}
                      size="small"
                      fullWidth
                      sx={{ fontSize: "0.8rem", py: 0.8 }}
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      onClick={() => handleBooking(doctor.id)}
                      sx={{ fontSize: "0.8rem", py: 0.8 }}
                    >
                      Book Now
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

export default BestDoctorsSection;
