// src/pages/specialties/Specialties.jsx
import {
  Box,
  CircularProgress,
  Container
} from "@mui/material";
import { useEffect, useState } from "react";
import { specialtyService } from "../../apis/services";
import "./Specialties.css";
import { BreadcrumbSection, LoadMoreButton, SpecialtiesGrid, SpecialtiesSearch, SpecialtiesTabs } from "../../components/specialties";

const Specialties = () => {
  const [tabValue, setTabValue] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch doctors and specialties in parallel
        const [specialtiesData] = await Promise.all([
          specialtyService.getAll(),
        ]);

        // Transform specialties for clinic section (take first 6)
        const clinicSpecialties = specialtiesData
          .map((specialty) => ({
            id: specialty.id,
            name: specialty.name,
            icon: specialty.iconUrl,
            count: specialty.doctorCount
          }));

        setSpecialties({
          clinic: clinicSpecialties,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  console.log(specialties.length);

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

  return (
    <div className="specialties-page">
      <BreadcrumbSection />

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <SpecialtiesTabs value={tabValue} onChange={setTabValue} />
      </Container>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <SpecialtiesSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          specialties={specialties.clinic}
        />
        <SpecialtiesGrid data={specialties.clinic} />
        <LoadMoreButton />
      </Container>
    </div>
  );
};

export default Specialties;
