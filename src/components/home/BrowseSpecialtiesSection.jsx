import {
  Container,
  Grid,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BrowseSpecialtiesSection = ({ specialties }) => {
  return (
    <section className="browse-section" style={{ padding: "3rem 0" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={1}
          sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
        >
          Browse By Specialties
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={4}
          sx={{ fontSize: "0.95rem" }}
        >
          Find experienced doctors across all specialties
        </Typography>

        <Grid container spacing={2}>
          {specialties.map((specialty) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={specialty.id}>
              <Box
                component={Link}
                to={`/specialties/${specialty.id}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                  },
                  textDecoration: "none",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.light",
                    color: "primary.main",
                    width: 44,
                    height: 44,
                    mr: 1.5,
                    fontSize: "1.2rem",
                  }}
                  src={specialty.icon}
                />
                <Box flexGrow={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    fontSize="0.95rem"
                    color="text.primary"
                  >
                    {specialty.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {specialty.doctorCount} Doctors
                  </Typography>
                </Box>
                  <IconButton size="small" color="primary">
                    <ArrowForward fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={"all"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 1,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 4,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.main",
                  width: 44,
                  height: 44,
                  mr: 1.5,
                  fontSize: "1.2rem",
                }}
              ></Avatar>
              <Box flexGrow={1} to={`/specialties`} component={Link} sx={{
                textDecoration: "none",
                color: "text.primary",
                "&:hover": {
                  color: "primary.main",
                },
              }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  fontSize="0.95rem"
                  color="text.primary"
                >
                  All
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  All
                </Typography>
              </Box>
                <IconButton size="small" color="primary">
                  <ArrowForward fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default BrowseSpecialtiesSection;
