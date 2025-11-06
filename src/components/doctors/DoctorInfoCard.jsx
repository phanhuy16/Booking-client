// src/components/doctors/DoctorInfoCard.jsx
import {
  Paper, Avatar, Typography, Chip, Rating, Button, Divider, List, ListItem, ListItemIcon, ListItemText, Box
} from '@mui/material';
import {
  Work, LocationOn, Phone, Email, CalendarToday
} from '@mui/icons-material';

const DoctorInfoCard = ({ doctor, onBook }) => {
  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN');

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, textAlign: 'center', position: 'sticky', top: 16 }}>
      <Avatar
        src={doctor.avatarUrl}
        alt={doctor.fullName}
        sx={{
          width: { xs: 120, sm: 160, md: 180 },
          height: { xs: 120, sm: 160, md: 180 },
          mx: 'auto',
          mb: 2,
          border: '4px solid',
          borderColor: 'primary.main',
        }}
      />

      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
        {doctor.fullName}
      </Typography>

      <Chip label={doctor.specialtyName}
        color="primary"
        size="small"
        sx={{ mb: 1.5, fontWeight: 600 }} />

      <Box display="flex" justifyContent="center" alignItems="center" gap={0.5} mb={2}>
        <Rating value={doctor.averageRating} readOnly size="small" precision={0.5} />
        <Typography variant="body2" color="text.secondary">
          ({doctor.totalFeedbacks})
        </Typography>
      </Box>

      <Box sx={{ bgcolor: 'primary.50', py: 1.5, px: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="h5" color="primary.main" fontWeight={700}>
          {doctor.consultationFee.toLocaleString()}₫
        </Typography>
        <Typography variant="caption">Phí khám</Typography>
      </Box>

      <Button
        variant="contained"
        size="medium"
        fullWidth
        onClick={onBook}
        sx={{
          borderRadius: 2,
          py: 1,
          fontWeight: 600,
          fontSize: '0.9rem'
        }}
      >
        Đặt lịch ngay
      </Button>

      <Divider sx={{ my: 2 }} />

      <List dense>
        {[
          { icon: <Work />, label: 'Kinh nghiệm', value: `${doctor.experienceYears} năm` },
          { icon: <LocationOn />, label: 'Nơi làm việc', value: doctor.workplace },
          { icon: <Phone />, label: 'Điện thoại', value: doctor.phone },
          { icon: <Email />, label: 'Email', value: doctor.email },
          { icon: <CalendarToday />, label: 'Tham gia', value: formatDate(doctor.joinedAt) },
        ].map((item, i) => (
          <ListItem key={i} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" fontWeight={500}>{item.label}</Typography>}
              secondary={<Typography variant="caption" color="text.secondary">{item.value}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DoctorInfoCard;