// src/components/doctors/SchedulesTab.jsx
import {
  Typography, Button, Alert, Table, TableHead, TableBody, TableRow, TableCell,
  TableContainer, Chip, Box
} from '@mui/material';
import { Schedule, AccessTime, CalendarToday } from '@mui/icons-material';

const SchedulesTab = ({ schedules, onBook }) => {
  const formatTime = (t) => new Date(`2000-01-01T${t}`).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>Lịch trống</Typography>
        <Button size="small"
          variant="contained"
          startIcon={<Schedule fontSize="small" />}
          onClick={onBook}
          sx={{ fontSize: '0.8125rem' }}
        >
          Đặt lịch
        </Button>
      </Box>

      {schedules.length === 0 ? (
        <Alert severity="info">Hiện chưa có lịch trống.</Alert>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Bắt đầu</TableCell>
                <TableCell>Kết thúc</TableCell>
                <TableCell>Thời lượng</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((s, i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <CalendarToday fontSize="small" />
                      <Typography variant="body2">
                        {s.dayOfWeek || new Date(s.date).toLocaleDateString('vi-VN')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={formatTime(s.startTime)} size="small" sx={{ height: 24, fontSize: '0.75rem' }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={formatTime(s.endTime)} size="small" sx={{ height: 24, fontSize: '0.75rem' }} />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <AccessTime fontSize="small" />
                      {s.slotDuration} phút
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={s.isAvailable ? 'Còn trống' : 'Đã đặt'}
                      size="small"
                      color={s.isAvailable ? 'success' : 'default'}
                      sx={{ height: 24, fontSize: '0.75rem' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SchedulesTab;