import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const SpecialtyStep = ({
  specialties,
  services,
  bookingData,
  handleInputChange,
}) => {
  const formatVND = (value) => {
    if (value === null || value === undefined) return "0 ₫";
    return new Intl.NumberFormat("vi-VN").format(value) + " ₫";
  };
  return (
    <Box className="booking-step">
      <FormControl fullWidth className="mb-3">
        <InputLabel>Select Speciality</InputLabel>
        <Select
          value={bookingData.specialtyId || ""}
          onChange={(e) => handleInputChange("specialtyId", e.target.value)}
        >
          {specialties.map((specialty) => (
            <MenuItem key={specialty.id} value={specialty.id}>
              {specialty.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" className="section-title">
        Services
      </Typography>
      <Grid container spacing={2}>
        {services && services.length > 0 ? (
          services.map((service) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
              <Card
                className={`service-card ${bookingData.serviceId === service.id ? "selected" : ""
                  }`}
                onClick={() => handleInputChange("serviceId", service.id)}
              >
                <CardContent>
                  <Box className="service-header">
                    <Typography variant="h6">{service.title}</Typography>
                    <Checkbox
                      checked={bookingData.serviceId === service.id}
                      color="primary"
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mb-2"
                  >
                    {service.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Duration: {service.durationInMinutes} mins
                  </Typography>
                  <Typography variant="h5" className="service-price">
                    {formatVND(service.price)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography color="textSecondary">No services available</Typography>
        )}
      </Grid>
    </Box>
  )
};

export default SpecialtyStep;
