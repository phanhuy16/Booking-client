import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Paper,
} from "@mui/material";
import { Search, LocationOn } from "@mui/icons-material";

const HeroSection = ({
  searchLocation,
  setSearchLocation,
  searchDoctor,
  setSearchDoctor,
  handleSearch,
  images,
}) => {
  return (
    <section className="hero-section" style={{ padding: "2rem 0" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          {/* Văn bản */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                pr: { md: 4 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                fontWeight={700}
                lineHeight={1.2}
                mb={2}
                sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
              >
                Search Doctor,
                <br />
                <Box component="span" color="primary.main">
                  Make an Appointment
                </Box>
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                mb={4}
                sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
              >
                Access to expert physicians and surgeons, advanced technologies
                and top-quality surgery facilities right here.
              </Typography>

              {/* FORM TÌM KIẾM - BO TRÒN PILL */}
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "50px", // Bo tròn hoàn toàn
                  overflow: "hidden",
                  bgcolor: "white",
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "580px" },
                  mx: { xs: "auto", md: 0 },
                  boxShadow: "0 8px 30px rgba(0, 153, 255, 0.15)",
                  p: 0.5, // Padding nhỏ bao quanh
                }}
              >
                {/* Input Location */}
                <Box sx={{ display: "flex", alignItems: "center", flex: 1, pl: 2 }}>
                  <LocationOn sx={{ color: "action.active", mr: 1 }} />
                  <TextField
                    placeholder="Location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    variant="standard"
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        py: 1.5,
                        fontSize: "0.95rem",
                      },
                    }}
                  />
                </Box>

                {/* Divider dọc */}
                <Box
                  sx={{
                    width: 1,
                    height: 32,
                    bgcolor: "divider",
                    mx: 1,
                  }}
                />

                {/* Input Search Doctor/Specialty */}
                <Box sx={{ display: "flex", alignItems: "center", flex: 2 }}>
                  <TextField
                    placeholder="Search Doctor, Specialty..."
                    value={searchDoctor}
                    onChange={(e) => setSearchDoctor(e.target.value)}
                    variant="standard"
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        py: 1.5,
                        fontSize: "0.95rem",
                      },
                    }}
                  />
                </Box>

                {/* Nút Search */}
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  startIcon={<Search />}
                  sx={{
                    borderRadius: "50px",
                    height: 48,
                    px: 4,
                    fontWeight: 600,
                    textTransform: "none",
                    background: "linear-gradient(135deg, #0099ff 0%, #0066cc 100%)",
                    boxShadow: "none",
                    minWidth: "120px",
                    "&:hover": {
                      background: "linear-gradient(135deg, #0088ee 0%, #0055bb 100%)",
                      boxShadow: "0 4px 12px rgba(0, 153, 255, 0.3)",
                    },
                  }}
                >
                  Search
                </Button>
              </Paper>
            </Box>
          </Grid>

          {/* Hình ảnh */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={images.hero.doctor}
                alt="Doctor"
                sx={{
                  width: { xs: "80%", sm: "70%", md: "90%" },
                  maxWidth: "450px",
                  height: "auto",
                  borderRadius: 3,
                  boxShadow: 3,
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HeroSection;