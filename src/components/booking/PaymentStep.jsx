import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CreditCard } from "@mui/icons-material";

const PaymentStep = ({ services, bookingData, doctor }) => {
  const selectedService = services.find((s) => s.id === bookingData.serviceId);
  const servicePrice = selectedService?.price || 0;

  return (
    <Box className="booking-step">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h6" className="section-title">
            Payment Method
          </Typography>
          <Alert severity="info" className="mb-3">
            Payment will be processed at the clinic. Please bring the exact
            amount or your payment card.
          </Alert>
          <Box className="payment-methods">
            <Card className="payment-method-card selected">
              <CardContent>
                <CreditCard />
                <Typography>Pay at Clinic</Typography>
                <Typography variant="caption" color="textSecondary">
                  Cash or Card accepted
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card className="payment-summary-card">
            <CardContent>
              <Typography variant="h6" className="summary-title">
                Booking Summary
              </Typography>
              <Box className="summary-item">
                <Typography variant="body2">Doctor</Typography>
                <Typography variant="body1" className="summary-value">
                  {doctor?.fullName}
                </Typography>
              </Box>
              <Box className="summary-item">
                <Typography variant="body2">Service</Typography>
                <Typography variant="body1" className="summary-value">
                  {selectedService?.title}
                </Typography>
              </Box>
              <Box className="summary-item">
                <Typography variant="body2">Date & Time</Typography>
                <Typography variant="body1" className="summary-value">
                  {bookingData.selectedTime}, {bookingData.selectedDate}
                </Typography>
              </Box>
              <Box className="payment-total">
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h6" className="total-amount">
                  ${servicePrice}
                </Typography>
              </Box>
              <Typography variant="caption" color="textSecondary">
                Payment to be made at the clinic
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentStep;
