// src/pages/doctors/DoctorList.jsx
import { Alert, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import "./DoctorList.css";
import { doctorService, specialtyService } from "../../apis/services";
import { BreadcrumbSection, DoctorCard, DoctorListToolbar, EmptyState, FilterSidebar, LoadingState, PaginationSection, SearchBar } from "../../components/doctors";

const DoctorList = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Id");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  // API states
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 6;

  // Fetch specialties
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await specialtyService.getAll();
        setSpecialties(data);
      } catch (err) {
        console.error("Error fetching specialties:", err);
      }
    };

    fetchSpecialties();
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const params = {
          specialty: selectedSpecialty,
          _start: start,
          _end: end,
          _sort: sortBy,
          _order: sortOrder,
        };

        const data = await doctorService.getAll(params);

        // Transform data to match component format
        const transformedDoctors = data.map((doctor) => ({
          id: doctor.id,
          name: doctor.fullName,
          specialty: doctor.specialtyName,
          degree: doctor.description || "MBBS",
          rating: doctor.rating || 4.5,
          reviews: doctor.reviewCount || 0,
          votes: doctor.voteCount || 0,
          experience: doctor.experienceYears,
          location: doctor.workplace || "Location not specified",
          consultationFee: doctor.consultationFee,
          nextAvailable: "Available for booking",
          availability: "Available",
          languages: ["English"],
          image: doctor.avatarUrl,
        }));

        setDoctors(transformedDoctors);
        // Note: You'll need to update backend to return totalCount
        // For now, estimate based on data length
        setTotalCount(
          data.length >= itemsPerPage
            ? currentPage * itemsPerPage + 1
            : start + data.length
        );

        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [currentPage, sortBy, sortOrder, selectedSpecialty]);

  const clinics = [
    "Bright Smiles Dental Clinic",
    "Family Care Clinic",
    "Express Health Clinic",
    "Restore Physical Therapy",
    "Blossom Women's Health Clinic",
  ];

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    switch (value) {
      case "price-low":
        setSortBy("ConsultationFee");
        setSortOrder("ASC");
        break;
      case "price-high":
        setSortBy("ConsultationFee");
        setSortOrder("DESC");
        break;
      case "rating":
        setSortBy("Rating");
        setSortOrder("DESC");
        break;
      case "experience":
        setSortBy("ExperienceYears");
        setSortOrder("DESC");
        break;
      default:
        setSortBy("Id");
        setSortOrder("ASC");
    }
  };

  const handleSpecialtyFilter = (specialtyName) => {
    setSelectedSpecialty(
      specialtyName === selectedSpecialty ? null : specialtyName
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedSpecialty(null);
    setPriceRange([0, 10000]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = async () => {
    // Implement search logic
    setCurrentPage(1);
    // You can add search parameter to the API call
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="doctorlist-page">
      <BreadcrumbSection />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSpecialty={selectedSpecialty}
        handleSpecialtyFilter={handleSpecialtyFilter}
        specialties={specialties}
        handleSearch={handleSearch}
      />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              specialties={specialties}
              selectedSpecialty={selectedSpecialty}
              handleSpecialtyFilter={handleSpecialtyFilter}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleClearFilters={handleClearFilters}
              clinics={clinics}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <DoctorListToolbar
              viewMode={viewMode}
              handleViewModeChange={handleViewModeChange}
              sortBy={sortBy}
              handleSortChange={handleSortChange}
              doctors={doctors}
              selectedSpecialty={selectedSpecialty}
            />

            {loading && <LoadingState />}
            {!loading && doctors.length === 0 && (
              <EmptyState handleClearFilters={handleClearFilters} />
            )}
            {!loading && doctors.length > 0 && (
              <Grid container spacing={3} className="doctors-grid">
                {doctors.map((doctor) => (
                  <Grid
                    size={{
                      xs: 12,
                      sm: viewMode === "grid" ? 6 : 12,
                      md: viewMode === "grid" ? 4 : 12,
                    }}
                    key={doctor.id}
                  >
                    <DoctorCard doctor={doctor} viewMode={viewMode} />
                  </Grid>
                ))}
              </Grid>
            )}

            <PaginationSection
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DoctorList;
