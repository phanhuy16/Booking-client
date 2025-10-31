// src/pages/bookings/BookingList.jsx
import { CalendarToday } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookingService from "../../apis/services/bookingService";

const BookingList = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getAll();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "warning";
      case "Confirmed": return "info";
      case "Completed": return "success";
      case "Cancelled": return "error";
      default: return "default";
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await bookingService.delete(bookingId);
      const data = await bookingService.getAll();
      setBookings(data);
      alert("Booking cancelled successfully");
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const formatVND = (value) => {
    if (value === null || value === undefined) return "0 ₫";
    return new Intl.NumberFormat("vi-VN").format(value) + " ₫";
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          My Bookings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and manage your appointments
        </Typography>
      </Box>

      {bookings.length === 0 ? (
        <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No bookings found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              You haven't made any appointments yet
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate("/")}
              sx={{ minWidth: 140 }}
            >
              Find a Doctor
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} lg={4} key={booking.id}>
              <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      #{booking.id}
                    </Typography>
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      size="small"
                      sx={{ fontSize: "0.65rem", height: 20 }}
                    />
                  </Stack>

                  <Box mb={1.5}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Service
                    </Typography>
                    <Typography variant="body2" fontWeight={500} noWrap>
                      {booking.serviceTitle}
                    </Typography>
                  </Box>

                  <Box mb={1.5}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Amount
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight={600}>
                      {formatVND(booking.servicePrice)}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Created At
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <CalendarToday sx={{ fontSize: 14, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={() => navigate(`/booking/${booking.id}`)}
                      sx={{ fontSize: "0.75rem" }}
                    >
                      View
                    </Button>
                    {booking.status === "Pending" && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        fullWidth
                        onClick={() => handleCancelBooking(booking.id)}
                        sx={{ fontSize: "0.75rem" }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BookingList;