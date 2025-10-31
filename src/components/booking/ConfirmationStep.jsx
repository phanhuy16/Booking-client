import { CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

const ConfirmationStep = ({
  createdBooking,
  bookingData,
  doctor,
  navigate,
}) => (
  <Box className="booking-step confirmation-step">
    <Box className="confirmation-icon">
      <CheckCircle className="success-icon" />
    </Box>
    <Typography variant="h4" className="confirmation-title">
      Booking Confirmed
    </Typography>
    <Box className="confirmation-message">
      <Avatar
        src={doctor?.avatarUrl}
        className="doctor-avatar"
      />
      <Typography variant="body1">
        Your booking has been confirmed with <strong>{doctor?.fullName}</strong>
        . Please arrive 15 minutes before your appointment.
      </Typography>
    </Box>

    <Card className="booking-details-card">
      <CardContent>
        <Typography variant="h6" className="mb-3">
          Booking Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" className="detail-label">
              Booking ID
            </Typography>
            <Typography variant="body1">#{createdBooking?.id}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" className="detail-label">
              Status
            </Typography>
            <Chip
              label={createdBooking?.status || "Pending"}
              color="warning"
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" className="detail-label">
              Date & Time
            </Typography>
            <Typography variant="body1">
              {bookingData.selectedTime}, {bookingData.selectedDate}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" className="detail-label">
              Payment
            </Typography>
            <Typography variant="body1">To be paid at clinic</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

    <Box className="mt-4">
      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate("/")}
        className="mb-2"
      >
        Back to Home
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate("/bookings")}
      >
        View My Bookings
      </Button>
    </Box>
  </Box>
);

export default ConfirmationStep;
