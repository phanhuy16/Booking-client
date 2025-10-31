// src/pages/specialties/components/SpecialtiesGrid.jsx
import { Grid } from "@mui/material";
import SpecialtyCard from "./SpecialtyCard";

const SpecialtiesGrid = ({ data }) => (
  <Grid container spacing={2}>
    {data.map((specialty) => (
      <Grid size={{ sx: 6, sm: 4, md: 3 }} key={specialty.id}>
        <SpecialtyCard specialty={specialty} />
      </Grid>
    ))}
  </Grid>
);

export default SpecialtiesGrid;
