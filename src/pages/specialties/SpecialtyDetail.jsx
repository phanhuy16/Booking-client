// src/pages/specialtyDetail/SpecialtyDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  IconButton,
  Rating,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import {
  NavigateNext,
  FavoriteBorder,
  Favorite,
  LocationOn,
  School,
  Star,
  Search,
  FilterList,
  Schedule,
} from "@mui/icons-material";
import specialtyService from "../../apis/services/specialtyService";
import "./SpecialtyDetail.css";
import useAuth from "../../hooks/useAuth";

const SpecialtyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [specialty, setSpecialty] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters and pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("rating");
  const [order, setOrder] = useState("desc");
  const [minRating, setMinRating] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSpecialtyData();
  }, [id, page, sortBy, order, minRating, minExperience]);

  const fetchSpecialtyData = async () => {
    try {
      setLoading(true);

      // Fetch specialty info and doctors
      const [specialtyData, doctorsData] = await Promise.all([
        specialtyService.getById(id),
        specialtyService.getDoctorsBySpecialty(id, {
          page,
          pageSize: 9,
          sortBy,
          order,
          minRating: minRating || null,
          minExperience: minExperience || null,
        }),
      ]);

      setSpecialty(specialtyData);
      setDoctors(doctorsData.items || []);
      setTotalPages(doctorsData.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching specialty data:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSortBy("rating");
    setOrder("desc");
    setMinRating("");
    setMinExperience("");
    setSearchQuery("");
    setPage(1);
  };

  const handleBooking = (doctorId) => {
    if (!user) {
      navigate("/login", { state: { from: `/booking/${doctorId}` } });
    } else {
      navigate(`/booking/${doctorId}`);
    }
  };

  // Filter doctors by search query
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!specialty) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Specialty not found</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/specialties")}
          sx={{ mt: 2 }}
        >
          Back to Specialties
        </Button>
      </Container>
    );
  }

  return (
    <div className="specialty-detail-page">
      {/* Breadcrumb */}
      <Box sx={{ bgcolor: "#f8f9fa", py: 2, mb: 4 }}>
        <Container maxWidth="lg">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              sx={{ cursor: "pointer" }}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate("/specialties")}
              sx={{ cursor: "pointer" }}
            >
              Specialties
            </Link>
            <Typography color="primary.main" fontWeight={600}>
              {specialty.name}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Header Section */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
          <Avatar
            src={specialty.iconUrl}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "primary.light",
              fontSize: "2rem",
            }}
          >
            {specialty.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {specialty.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {specialty.description || "Find the best doctors in this specialty"}
            </Typography>
            <Chip
              label={`${filteredDoctors.length} Doctors Available`}
              color="primary"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Divider />
      </Container>

      {/* Filters and Search */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
          {/* Search */}
          <TextField
            size="small"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Sort By */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="experience">Experience</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>

          {/* Order */}
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={order}
              label="Order"
              onChange={(e) => setOrder(e.target.value)}
            >
              <MenuItem value="desc">Descending</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
            </Select>
          </FormControl>

          {/* Min Rating */}
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Min Rating</InputLabel>
            <Select
              value={minRating}
              label="Min Rating"
              onChange={(e) => setMinRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="4">4+ Stars</MenuItem>
              <MenuItem value="4.5">4.5+ Stars</MenuItem>
              <MenuItem value="4.8">4.8+ Stars</MenuItem>
            </Select>
          </FormControl>

          {/* Min Experience */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Min Experience</InputLabel>
            <Select
              value={minExperience}
              label="Min Experience"
              onChange={(e) => setMinExperience(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="5">5+ Years</MenuItem>
              <MenuItem value="10">10+ Years</MenuItem>
              <MenuItem value="15">15+ Years</MenuItem>
            </Select>
          </FormControl>

          {/* Reset Button */}
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={handleResetFilters}
            size="small"
          >
            Reset
          </Button>
        </Box>
      </Container>

      {/* Doctors Grid */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        {filteredDoctors.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No doctors found matching your criteria
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {filteredDoctors.map((doctor) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={doctor.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.3s",
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    {/* Hình ảnh nhỏ hơn */}
                    <Box
                      sx={{ position: "relative", height: 160, overflow: "hidden" }}
                    >
                      <Box
                        component="img"
                        src={doctor.avatarUrl}
                        alt={doctor.fullName}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "0.3s",
                          "&:hover": { transform: "scale(1.05)" },
                        }}
                      />
                      <Chip
                        label={`${doctor.consultationFee.toLocaleString()}₫`}
                        size="small"
                        color="primary"
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "background.paper",
                          "&:hover": { bgcolor: "grey.200" },
                        }}
                      >
                        <FavoriteBorder fontSize="small" />
                      </IconButton>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      {/* Rating nhỏ gọn */}
                      <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                        <Rating value={doctor.averageRating} readOnly size="small" />
                        <Chip
                          label={doctor.averageRating?.toFixed(1) ?? 0}
                          size="small"
                          color="success"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        fontWeight={600}
                        fontSize="1rem"
                        noWrap
                      >
                        {doctor.fullName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize="0.85rem"
                        noWrap
                      >
                        {doctor.specialtyName}
                      </Typography>
                      {doctor.experience && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {doctor.experienceYears} năm kinh nghiệm
                        </Typography>
                      )}

                      {/* Meta nhỏ gọn */}
                      <Box display="flex" flexDirection="column" gap={0.5} my={1.5}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <LocationOn fontSize="small" color="action" />
                          <Typography variant="caption">{doctor.workplace}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <School fontSize="small" color="action" />
                          <Typography variant="caption">{doctor.email}</Typography>
                        </Box>
                      </Box>

                      {/* Nút nhỏ hơn, xếp dọc */}
                      <Box display="flex" flexDirection="column" gap={1} mt={2}>
                        <Button
                          variant="outlined"
                          component={Link}
                          to={`/doctors/${doctor.id}/details`}
                          size="small"
                          fullWidth
                          sx={{ fontSize: "0.8rem", py: 0.8 }}
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          fullWidth
                          onClick={() => handleBooking(doctor.id)}
                          sx={{ fontSize: "0.8rem", py: 0.8 }}
                        >
                          Book Now
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default SpecialtyDetail;