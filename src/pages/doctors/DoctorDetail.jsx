// src/pages/doctors/DoctorDetail.jsx - Enhanced Version
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Rating,
  Button,
  Divider,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  LocationOn,
  Work,
  School,
  Phone,
  Email,
  AttachMoney,
  CalendarToday,
  CheckCircle,
  Star,
  Schedule,
  BusinessCenter,
  AccessTime,
} from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import doctorService from '../../apis/services/doctorService';
import BreadcrumbSection from '../../components/doctors/BreadcrumbSection';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both doctor details and schedules
        const [doctorData, schedulesData] = await Promise.all([
          doctorService.getById(id),
          doctorService.getAvailableSchedules(id).catch(() => []),
        ]);

        setDoctor(doctorData);
        setSchedules(schedulesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctor data:', err);
        setError('Failed to load doctor information. Please try again.');
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctorData();
    }
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      navigate('/login', { state: { from: `/booking/${id}` } });
    } else {
      navigate(`/booking/${id}`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !doctor) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Doctor not found'}</Alert>
        <Button onClick={() => navigate('/doctors')} sx={{ mt: 2 }}>
          Back to Doctors List
        </Button>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <BreadcrumbSection isDetail doctorName={doctor.fullName} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column - Doctor Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center', position: 'sticky', top: 20 }}>
              <Avatar
                src={doctor.avatarUrl}
                alt={doctor.fullName}
                sx={{
                  width: 200,
                  height: 200,
                  mx: 'auto',
                  mb: 2,
                  border: '4px solid',
                  borderColor: 'primary.main',
                }}
              />

              <Typography variant="h5" fontWeight={700} gutterBottom>
                {doctor.fullName}
              </Typography>

              <Chip
                label={doctor.specialtyName}
                color="primary"
                sx={{ mb: 2, fontWeight: 600 }}
              />

              <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
                <Rating value={doctor.rating || 4.5} readOnly precision={0.5} />
                <Typography variant="body2" color="text.secondary">
                  ({doctor.reviewCount || 0})
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: 'primary.lighter',
                  py: 2,
                  px: 3,
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <Typography variant="h4" color="primary" fontWeight={700}>
                  {doctor.consultationFee.toLocaleString()}₫
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Consultation Fee
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleBooking}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  mb: 2,
                }}
              >
                Book Appointment
              </Button>

              <Divider sx={{ my: 2 }} />

              {/* Quick Info */}
              <List dense sx={{ textAlign: 'left' }}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Work color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Experience"
                    secondary={`${doctor.experienceYears} years`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={doctor.workplace}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={doctor.phone}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={doctor.email}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CalendarToday color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Joined"
                    secondary={formatDate(doctor.joinedAt)}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Right Column - Detailed Info */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  bgcolor: 'grey.50',
                }}
              >
                <Tab label="Overview" />
                <Tab label="About" />
                <Tab label={`Schedules (${schedules.length})`} />
              </Tabs>

              <Box sx={{ p: 3 }}>
                {/* Overview Tab */}
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Professional Overview
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {doctor.description || 'No description available.'}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                          <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 2,
                                  bgcolor: 'primary.lighter',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <BusinessCenter color="primary" />
                              </Box>
                              <Box>
                                <Typography variant="h5" fontWeight={700}>
                                  {doctor.experienceYears}+
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Years Experience
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                          <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 2,
                                  bgcolor: 'success.lighter',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Star sx={{ color: 'success.main' }} />
                              </Box>
                              <Box>
                                <Typography variant="h5" fontWeight={700}>
                                  {(doctor.rating || 4.5).toFixed(1)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Average Rating
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                          <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 2,
                                  bgcolor: 'warning.lighter',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <AttachMoney sx={{ color: 'warning.main' }} />
                              </Box>
                              <Box>
                                <Typography variant="h5" fontWeight={700}>
                                  {doctor.consultationFee.toLocaleString()}₫
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Consultation Fee
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                          <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 2,
                                  bgcolor: 'info.lighter',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <CheckCircle sx={{ color: 'info.main' }} />
                              </Box>
                              <Box>
                                <Typography variant="h5" fontWeight={700}>
                                  {doctor.reviewCount || 0}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Patient Reviews
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Why Choose Dr. {doctor.fullName.split(' ').pop()}?
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Experienced Professional"
                          secondary={`${doctor.experienceYears}+ years of medical practice`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Specialized Expertise"
                          secondary={`Expert in ${doctor.specialtyName}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Highly Rated"
                          secondary={`${(doctor.rating || 4.5).toFixed(1)} average rating from ${doctor.reviewCount || 0} patients`}
                        />
                      </ListItem>
                    </List>
                  </Box>
                )}

                {/* About Tab */}
                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      About Dr. {doctor.fullName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {doctor.description || 'No additional information available.'}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Specialization
                    </Typography>
                    <Chip
                      label={doctor.specialtyName}
                      color="primary"
                      icon={<School />}
                      sx={{ mb: 3 }}
                    />

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Workplace
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={3}>
                      <LocationOn color="action" />
                      <Typography variant="body1">{doctor.workplace}</Typography>
                    </Box>

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Contact Information
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1.5}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Phone color="action" />
                        <Typography variant="body1">{doctor.phone}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Email color="action" />
                        <Typography variant="body1">{doctor.email}</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Schedules Tab */}
                {activeTab === 2 && (
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                      <Typography variant="h6" fontWeight={600}>
                        Available Schedules
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleBooking}
                        startIcon={<Schedule />}
                        sx={{ textTransform: 'none' }}
                      >
                        Book Now
                      </Button>
                    </Box>

                    {schedules.length === 0 ? (
                      <Alert severity="info">
                        No schedules available at the moment. Please check back later or contact the doctor directly.
                      </Alert>
                    ) : (
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Day</strong></TableCell>
                              <TableCell><strong>Start Time</strong></TableCell>
                              <TableCell><strong>End Time</strong></TableCell>
                              <TableCell><strong>Duration</strong></TableCell>
                              <TableCell><strong>Status</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {schedules.map((schedule, index) => (
                              <TableRow key={index} hover>
                                <TableCell>
                                  <Box display="flex" alignItems="center" gap={1}>
                                    <CalendarToday fontSize="small" color="primary" />
                                    {schedule.dayOfWeek || formatDate(schedule.date)}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={formatTime(schedule.startTime)}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={formatTime(schedule.endTime)}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <AccessTime fontSize="small" color="action" />
                                    <Typography variant="body2">
                                      {schedule.slotDuration || 30} min
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={schedule.isAvailable ? 'Available' : 'Booked'}
                                    size="small"
                                    color={schedule.isAvailable ? 'success' : 'default'}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}

                    {schedules.length > 0 && (
                      <Alert severity="success" sx={{ mt: 3 }}>
                        Click "Book Now" to select a time slot and schedule your appointment
                      </Alert>
                    )}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DoctorDetail;