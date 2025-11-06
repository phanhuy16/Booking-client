// src/components/doctors/FeedbackSection.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Rating,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Pagination,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import {
  Edit,
  Delete,
  MoreVert,
  Star,
} from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import feedbackService from '../../apis/services/feedbackService';
import bookingService from '../../apis/services/bookingService';

const FeedbackSection = ({ doctorId, doctorName }) => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingFeedbackId, setEditingFeedbackId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [ratingStats, setRatingStats] = useState(null);

  // New states for booking selection
  const [completedBookings, setCompletedBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [loadingBookings, setLoadingBookings] = useState(false);

  const pageSize = 5;

  useEffect(() => {
    fetchFeedbacks();
  }, [doctorId, currentPage]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await feedbackService.getByDoctor(doctorId, currentPage, pageSize);
      setFeedbacks(response.items || []);
      setTotalPages(response.totalPages || 1);
      calculateRatingStats(response.items || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedBookings = async () => {
    try {
      setLoadingBookings(true);
      const bookings = await bookingService.getCompletedForFeedback();
      // Filter only bookings for this doctor
      const doctorBookings = bookings.filter(b => b.doctorId === doctorId);
      setCompletedBookings(doctorBookings);
    } catch (err) {
      console.error('Error fetching completed bookings:', err);
      setError('Failed to load your bookings');
    } finally {
      setLoadingBookings(false);
    }
  };

  const calculateRatingStats = (feedbackList) => {
    if (!feedbackList.length) {
      setRatingStats(null);
      return;
    }

    const stats = {
      average: 0,
      total: feedbackList.length,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };

    feedbackList.forEach(fb => {
      stats.distribution[fb.rating]++;
    });

    const totalRating = feedbackList.reduce((sum, fb) => sum + fb.rating, 0);
    stats.average = (totalRating / feedbackList.length).toFixed(1);

    setRatingStats(stats);
  };

  const handleOpenDialog = async (feedback = null) => {
    const isEditMode = feedback && feedback.id;

    if (isEditMode) {
      setEditMode(true);
      setEditingFeedbackId(feedback.id);
      setRating(feedback.rating);
      setComment(feedback.comment || '');
    } else {
      setEditMode(false);
      setEditingFeedbackId(null);
      setRating(5);
      setComment('');
      setSelectedBookingId('');
      // Fetch completed bookings for selection
      await fetchCompletedBookings();
    }
    setOpenDialog(true);
    setError(null);
    setSuccess(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setEditingFeedbackId(null);
    setRating(5);
    setComment('');
    setSelectedBookingId('');
    setCompletedBookings([]);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Please login to submit feedback');
      return;
    }

    if (!editMode && !selectedBookingId) {
      setError('Please select a booking to review');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (editMode) {
        await feedbackService.update(editingFeedbackId, {
          rating,
          comment: comment.trim() || null
        });
        setSuccess('Feedback updated successfully!');
      } else {
        await feedbackService.create({
          bookingId: parseInt(selectedBookingId),
          rating,
          comment: comment.trim() || null
        });
        setSuccess('Feedback submitted successfully!');
      }

      setTimeout(() => {
        handleCloseDialog();
        fetchFeedbacks();
        setSuccess(null);
      }, 1500);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      await feedbackService.delete(feedbackId);
      setSuccess('Feedback deleted successfully!');
      fetchFeedbacks();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error deleting feedback:', err);
      setError(err.response?.data?.message || 'Failed to delete feedback');
      setTimeout(() => setError(null), 3000);
    }
    handleMenuClose();
  };

  const handleMenuOpen = (event, feedback) => {
    setAnchorEl(event.currentTarget);
    setSelectedFeedback(feedback);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFeedback(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading && currentPage === 1) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Rating Statistics */}
      {ratingStats && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }} textAlign="center">
                <Typography variant="h2" fontWeight={700} color="primary">
                  {ratingStats.average}
                </Typography>
                <Rating
                  value={parseFloat(ratingStats.average)}
                  readOnly
                  precision={0.1}
                  size="large"
                />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Based on {ratingStats.total} reviews
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 8 }}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <Box key={star} display="flex" alignItems="center" gap={2} mb={1}>
                    <Typography variant="body2" sx={{ minWidth: 60 }}>
                      {star} <Star fontSize="small" sx={{ verticalAlign: 'middle' }} />
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(ratingStats.distribution[star] / ratingStats.total) * 100}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
                      {ratingStats.distribution[star]}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Patient Reviews ({feedbacks.length > 0 ? ratingStats?.total || 0 : 0})
        </Typography>
        {user?.roles?.includes('Patient') && (
          <Button
            variant="contained"
            size="small"
            onClick={handleOpenDialog}
            sx={{
              textTransform: 'none',
              fontSize: '0.8125rem',
              py: 0.8
            }}
          >
            Write a Review
          </Button>
        )}

      </Box>

      {/* Success/Error Messages */}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Feedback List */}
      {feedbacks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No reviews yet. Be the first to review Dr. {doctorName}!
          </Typography>
        </Paper>
      ) : (
        <Box>
          {feedbacks.map((feedback) => (
            <Paper key={feedback.id} sx={{ p: 3, mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" gap={2} flex={1}>
                  <Avatar
                    src={feedback.patientAvatarUrl}
                    alt={feedback.patientName}
                    sx={{ width: 42, height: 42 }}
                  />
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {feedback.patientName}
                      </Typography>
                      {feedback.canEdit && (
                        <Typography
                          variant="caption"
                          sx={{
                            bgcolor: 'primary.lighter',
                            color: 'primary.main',
                            px: 1,
                            py: 0.3,
                            borderRadius: 1,
                          }}
                        >
                          You
                        </Typography>
                      )}
                    </Box>
                    <Rating value={feedback.rating} readOnly size="small" sx={{ mb: 1 }} />
                    {feedback.comment && (
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {feedback.comment}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(feedback.createdAt)}
                    </Typography>
                  </Box>
                </Box>

                {feedback.canEdit && (
                  <Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, feedback)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Paper>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                size="small"                    // thêm
                color="primary"
                sx={{ '& .MuiPaginationItem-root': { fontSize: '0.8125rem' } }}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleOpenDialog(selectedFeedback);
            handleMenuClose();
          }}
          sx={{ fontSize: '0.875rem' }}
        >
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => handleDelete(selectedFeedback?.id)}
          sx={{ color: 'error.main', fontSize: '0.875rem' }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Create/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            m: { xs: 2, sm: 3 },           // margin nhỏ hơn trên mobile
            maxHeight: 'calc(100% - 32px)',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            {editMode ? 'Edit Your Review' : `Review Dr. ${doctorName}`}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box sx={{ mt: 1 }}>
            {/* Booking Selection */}
            {!editMode && (
              <FormControl fullWidth sx={{ mb: 2.5 }} size="small">
                <InputLabel>Select Appointment *</InputLabel>
                <Select
                  value={selectedBookingId}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  label="Select Appointment *"
                  disabled={loadingBookings}
                >
                  <MenuItem value="" disabled>
                    -- Choose an appointment --
                  </MenuItem>
                  {completedBookings.map((booking) => (
                    <MenuItem
                      key={booking.id}
                      value={booking.id}
                      disabled={booking.hasFeedback}
                    >
                      {booking.serviceName} - {formatDate(booking.scheduleDate)}{' '}
                      {formatTime(booking.scheduleTime)}
                      {booking.hasFeedback && ' (Reviewed)'}
                    </MenuItem>
                  ))}
                </Select>
                {completedBookings.length === 0 && !loadingBookings && (
                  <FormHelperText>
                    No completed appointments. You can only review after the appointment.
                  </FormHelperText>
                )}
                {loadingBookings && (
                  <FormHelperText>
                    <CircularProgress size={14} sx={{ mr: 0.5 }} /> Loading…
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {/* Rating */}
            <Typography variant="subtitle2" gutterBottom>
              Rating <span style={{ color: '#d32f2f' }}>*</span>
            </Typography>
            <Rating
              value={rating || 0}
              onChange={(e, newValue) => setRating(newValue || 1)}
              size="large"                 // giữ large để dễ bấm trên mobile
              sx={{ mb: 2.5 }}
            />

            {/* Comment */}
            <Typography variant="subtitle2" gutterBottom>
              Your Review (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              inputProps={{ maxLength: 1000 }}
              helperText={`${comment.length}/1000`}
              size="small"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </DialogContent>

        {/* Buttons */}
        <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            disabled={submitting}
            size="medium"
            sx={{ minWidth: 90 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={handleSubmit}
            disabled={submitting || !rating || (!editMode && !selectedBookingId)}
            sx={{
              minWidth: 110,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {submitting ? (
              <>
                <CircularProgress size={18} sx={{ mr: 1 }} />
                Saving…
              </>
            ) : editMode ? (
              'Update'
            ) : (
              'Submit'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedbackSection;