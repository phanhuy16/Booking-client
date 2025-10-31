import {
  Container,
  Grid,
  Card,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import SectionHeader from "./SectionHeader";

const ClinicFeaturesSection = ({ features }) => {
  return (
    <section className="features-section" style={{ padding: "3rem 0" }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Available Features In Our Clinic"
          subtitle="Meet our experts & book online"
        />
        <Grid container spacing={2}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.id}>
              <Card
                sx={{
                  position: "relative",
                  height: 200,
                  overflow: "hidden",
                  borderRadius: 2,
                  "&:hover .overlay": {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${feature.image})`,
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    p: 2,
                    textAlign: "center",
                    transition: "0.3s",
                    opacity: 0.9,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    fontSize="1rem"
                  >
                    {feature.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default ClinicFeaturesSection;
