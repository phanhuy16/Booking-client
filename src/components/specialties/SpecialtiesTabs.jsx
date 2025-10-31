// src/pages/specialties/components/SpecialtiesTabs.jsx
import { Paper, Tabs, Tab } from "@mui/material";
import { Business, MedicalServices, LocalHospital } from "@mui/icons-material";

const SpecialtiesTabs = ({ value, onChange }) => (
  <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
    <Tabs
      value={value}
      onChange={onChange}
      variant="fullWidth"
      sx={{
        minHeight: 48,
        "& .MuiTab-root": {
          minHeight: 48,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          py: 1.5,
        },
        "& .MuiTabs-indicator": { bgcolor: "primary.main", height: 3 },
      }}
    >
      <Tab icon={<Business fontSize="small" />} label="Hospitals" />
      <Tab icon={<MedicalServices fontSize="small" />} label="Specialities" />
      <Tab icon={<LocalHospital fontSize="small" />} label="Clinics" />
    </Tabs>
  </Paper>
);

export default SpecialtiesTabs;
