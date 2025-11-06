// src/components/doctors/AboutTab.jsx
import { Typography, Divider, Chip, Box } from '@mui/material';
import { School, LocationOn, Phone, Email } from '@mui/icons-material';

const AboutTab = ({ doctor }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Giới thiệu về bác sĩ {doctor.fullName}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ minHeight: 60 }}>
        {doctor.description || 'Chưa có thông tin chi tiết.'}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" fontWeight={600} gutterBottom>
        Chuyên môn
      </Typography>
      <Chip
        icon={<School fontSize="small" />}
        label={doctor.specialtyName}
        color="primary"
        size="small"
        sx={{ mb: 3, fontWeight: 600, height: 32 }}
      />

      <Typography variant="h6" fontWeight={600} gutterBottom>
        Nơi làm việc
      </Typography>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <LocationOn color="action" />
        <Typography variant="body1">{doctor.workplace}</Typography>
      </Box>

      <Typography variant="h6" fontWeight={600} gutterBottom>
        Liên hệ
      </Typography>
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Box display="flex" alignItems="center" gap={1}>
          <Phone color="action" fontSize="small" />
          <Typography variant="body1">{doctor.phone}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Email color="action" fontSize="small" />
          <Typography variant="body1">{doctor.email}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutTab;