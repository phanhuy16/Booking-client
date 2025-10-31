import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import SectionHeader from "./SectionHeader";

const ClinicSpecialtiesSection = ({ specialties }) => {

  return (
    <section className="specialties-section" style={{ padding: "3rem 0" }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Clinic & Specialties"
          subtitle="Access to expert physicians and surgeons, advanced technologies and top-quality surgery facilities right here."
        />
        <Grid container spacing={2} justifyContent="center">
          {specialties.map((specialty) => (
            <Grid size={{ xs: 4, sm: 3, md: 2 }} key={specialty.id}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 1.5,
                    bgcolor: "primary.light",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                    fontSize: "1.8rem",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.main",
                      width: 44,
                      height: 44,
                      fontSize: "1.2rem",
                    }}
                    src={specialty.icon}
                  />
                </Box>
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    fontSize="0.9rem"
                    noWrap
                  >
                    {specialty.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default ClinicSpecialtiesSection;
