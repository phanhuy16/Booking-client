// src/pages/doctors/DoctorDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, CircularProgress, Alert, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import doctorService from '../../apis/services/doctorService';
import scheduleService from '../../apis/services/scheduleService';
import useAuth from '../../hooks/useAuth';
import { BreadcrumbSection, DoctorInfoCard, DoctorTabs } from '../../components/doctors';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorData, schedulesData] = await Promise.all([
          doctorService.getDetails(id),
          scheduleService.getAvailableByDoctor(id).catch(() => []),
        ]);
        setDoctor(doctorData);
        setSchedules(schedulesData);
      } catch (err) {
        console.log(err)
        setError('Không tải được thông tin bác sĩ.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleBooking = () => {
    if (!user) navigate('/login', { state: { from: `/booking/${id}` } });
    else navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error || !doctor) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Không tìm thấy bác sĩ'}</Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/doctors')} sx={{ mt: 2 }}>
          Quay lại danh sách
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <BreadcrumbSection isDetail doctorName={doctor.fullName} />

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Left - Info Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <DoctorInfoCard doctor={doctor} onBook={handleBooking} />
          </Grid>

          {/* Right - Tabs */}
          <Grid size={{ xs: 12, md: 8 }}>
            <DoctorTabs
              doctor={doctor}
              schedules={schedules}
              onBook={handleBooking}
              doctorId={parseInt(id)}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DoctorDetail;