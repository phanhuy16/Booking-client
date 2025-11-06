// src/components/doctors/OverviewTab.jsx
import {
  Typography, Divider, Grid, Card, CardContent, Box, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { BusinessCenter, Star, AttachMoney, CheckCircle } from '@mui/icons-material';

const OverviewTab = ({ doctor }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Tổng quan chuyên môn
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {doctor.description || 'Chưa có mô tả.'}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={2}>
        {[
          { icon: BusinessCenter, color: 'primary', label: 'Kinh nghiệm', value: `${doctor.experienceYears}+`, unit: 'năm' },
          { icon: Star, color: 'success', label: 'Đánh giá', value: doctor.averageRating.toFixed(1), unit: '' },
          { icon: AttachMoney, color: 'warning', label: 'Phí khám', value: doctor.consultationFee.toLocaleString(), unit: '₫' },
          { icon: CheckCircle, color: 'info', label: 'Lượt đánh giá', value: doctor.totalFeedbacks, unit: '' },
        ].map((item, i) => (
          <Grid size={{ xs: 12, sm: 6 }} key={i}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      bgcolor: `${item.color}.lighter`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <item.icon fontSize="small" sx={{ color: `${item.color}.main` }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {item.value}{item.unit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" fontWeight={600} gutterBottom>
        Tại sao chọn bác sĩ {doctor.fullName.split(' ').pop()}?
      </Typography>
      <List>
        {[
          `Hơn ${doctor.experienceYears} năm kinh nghiệm hành nghề`,
          `Chuyên gia ${doctor.specialtyName}`,
          `Được ${doctor.totalFeedbacks} bệnh nhân đánh giá ${doctor.averageRating.toFixed(1)} sao`,
        ].map((text, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OverviewTab;