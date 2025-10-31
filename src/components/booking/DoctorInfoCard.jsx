import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { LocationOn, CheckCircle } from "@mui/icons-material";

const DoctorInfoCard = ({ doctor }) => (
  <Card className="doctor-info-card">
    <CardContent>
      <Box className="doctor-info-content">
        <Avatar
          src={doctor.avatarUrl}
          className="doctor-avatar-large"
        />
        <Box className="doctor-details">
          <Box className="doctor-name-rating">
            <Typography variant="h6">{doctor.fullName}</Typography>
            <Chip
              icon={<CheckCircle />}
              label={doctor.rating || 5.0}
              size="small"
              className="rating-chip-booking"
            />
          </Box>
          <Typography variant="body2" className="doctor-specialty">
            {doctor.specialtyName}
          </Typography>
          <Box className="doctor-location">
            <LocationOn fontSize="small" />
            <Typography variant="body2">
              {doctor.workplace || "Location not specified"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default DoctorInfoCard;
