// src/pages/home/Home.jsx
import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import images from "../../config/images";
import "./Home.css";

// Import services
import { doctorService, specialtyService } from "../../apis/services";
import { BestDoctorsSection, BlogsSection, BrowseSpecialtiesSection, ClinicFeaturesSection, ClinicSpecialtiesSection, HeroSection } from "../../components/home";

const Home = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");

  // State for API data
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clinicFeatures = [
    {
      id: 1,
      title: "Operation",
      description: "Expert surgical procedures",
      image: images.features.operation,
    },
    {
      id: 2,
      title: "Medical",
      description: "Comprehensive medical care",
      image: images.features.medical,
    },
    {
      id: 3,
      title: "Patient Ward",
      description: "Comfortable patient rooms",
      image: images.features.ward,
    },
    {
      id: 4,
      title: "Test Room",
      description: "Advanced diagnostic testing",
      image: images.features.testroom,
    },
  ];

  const blogs = [
    {
      id: 1,
      title: "Revolutionizing Healthcare: The Rise of Online Doctor Booking",
      category: "Urology",
      author: "Lynette Williams",
      date: "13 Apr 2024",
      image: images.blogs.blog1,
      excerpt:
        "Explore how online doctor booking platforms are transforming healthcare delivery...",
    },
    {
      id: 2,
      title: "Neurology and Technology: A New Frontier in Brain Health",
      category: "Neurology",
      author: "Lynette Williams",
      date: "15 Apr 2024",
      image: images.blogs.blog2,
      excerpt:
        "Discover the intersection of technology and neuroscience in modern medicine...",
    },
    {
      id: 3,
      title: "Beating Strong: The Digital Revolution in Cardiac Care",
      category: "Cardiology",
      author: "Lynette Williams",
      date: "16 Apr 2024",
      image: images.blogs.blog3,
      excerpt:
        "Explore new digital advancements in cardiovascular diagnosis and treatment...",
    },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch doctors and specialties in parallel
        const [doctorsData, specialtiesData] = await Promise.all([
          doctorService.getAll({ _start: 0, _end: 8 }),
          specialtyService.getAll(),
        ]);

        // Transform doctors data to match component format
        const transformedDoctors = doctorsData.map((doctor) => ({
          id: doctor.id,
          name: doctor.fullName || `Dr. ${doctor.firstName} ${doctor.lastName}`,
          specialty: doctor.specialtyName || doctor.specialty,
          experience: doctor.experienceYears
            ? `${doctor.experienceYears}+ Years Experience`
            : null,
          rating: doctor.averageRating,
          reviews: doctor.reviewCount || 0,
          price: `${doctor.consultationFee.toLocaleString()}₫`,
          avatarUrl: doctor.avatarUrl || "",
          available: doctor.isAvailable !== false,
          workplace: doctor.workplace,
        }));

        // Transform specialties for clinic section (take first 6)
        const clinicSpecialties = specialtiesData
          .slice(0, 6)
          .map((specialty) => ({
            id: specialty.id,
            name: specialty.name,
            icon: specialty.iconUrl
          }));

        // Transform specialties for browse section
        const browseSpecialties = specialtiesData.map((specialty) => ({
          id: specialty.id,
          name: specialty.name,
          icon: specialty.iconUrl,
          doctorCount: specialty.doctorCount || 0,
        }));

        setDoctors(transformedDoctors);
        setSpecialties({
          clinic: clinicSpecialties,
          browse: browseSpecialties,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    console.log("Searching:", { searchLocation, searchDoctor });
  };

  // Show loading state
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

  // Show error state
  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        searchDoctor={searchDoctor}
        setSearchDoctor={setSearchDoctor}
        handleSearch={handleSearch}
        images={images}
      />

      {/* Clinic & Specialties Section */}
      <ClinicSpecialtiesSection specialties={specialties.clinic} />

      {/* Browse By Specialties Section */}
      <BrowseSpecialtiesSection specialties={specialties.browse} />

      {/* Best Doctors Section */}
      <BestDoctorsSection doctors={doctors} />
      {/* Clinic Features Section */}
      <ClinicFeaturesSection features={clinicFeatures} />

      {/* Blogs & News Section */}
      <BlogsSection blogs={blogs} />
    </div>
  );
};

export default Home;
