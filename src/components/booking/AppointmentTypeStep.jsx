import {
  Home,
  LocalHospital
} from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const appointmentTypes = [
  { type: "Clinic", icon: <LocalHospital /> },
  { type: "Home Visit", icon: <Home /> },
];

const AppointmentTypeStep = ({ bookingData, handleInputChange }) => (
  <Box className="booking-step">
    <Typography variant="h6" className="section-title">
      Select Appointment Type
    </Typography>
    <Grid container spacing={2} className="mb-4">
      {appointmentTypes.map((item) => (
        <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={item.type}>
          <Card
            className={`appointment-type-card ${
              bookingData.appointmentType === item.type ? "selected" : ""
            }`}
            onClick={() => handleInputChange("appointmentType", item.type)}
          >
            <CardContent>
              <Box className="appointment-icon">{item.icon}</Box>
              <Typography variant="body2">{item.type}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default AppointmentTypeStep;
