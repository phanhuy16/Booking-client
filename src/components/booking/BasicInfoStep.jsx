import { Grid, TextField } from "@mui/material";

const BasicInfoStep = ({ bookingData, handleInputChange }) => (
  <Grid container spacing={3}>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        required
        label="First Name"
        value={bookingData.firstName}
        onChange={(e) => handleInputChange("firstName", e.target.value)}
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        required
        label="Last Name"
        value={bookingData.lastName}
        onChange={(e) => handleInputChange("lastName", e.target.value)}
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        required
        label="Phone Number"
        value={bookingData.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        required
        label="Email Address"
        type="email"
        value={bookingData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
    </Grid>
    <Grid size={{ xs: 12 }}>
      <TextField
        fullWidth
        label="Symptoms"
        multiline
        rows={2}
        value={bookingData.symptoms}
        onChange={(e) => handleInputChange("symptoms", e.target.value)}
      />
    </Grid>
    <Grid size={{ xs: 12 }}>
      <TextField
        fullWidth
        label="Reason for Visit"
        multiline
        rows={3}
        value={bookingData.reason}
        onChange={(e) => handleInputChange("reason", e.target.value)}
      />
    </Grid>
  </Grid>
);

export default BasicInfoStep;
