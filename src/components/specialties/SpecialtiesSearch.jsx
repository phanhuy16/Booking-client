// src/pages/specialties/components/SpecialtiesSearch.jsx
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SpecialtiesSearch = ({ searchQuery, setSearchQuery, specialties }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 2,
      mb: 3,
    }}
  >
    <Typography variant="h6" fontWeight={600} color="text.primary">
      Showing{" "}
      <Box component="span" color="primary.main" fontWeight={700}>
        {specialties.length}
      </Box>{" "}
      Specialities
    </Typography>
    <TextField
      size="small"
      placeholder="Search Specialities..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{ width: { xs: "100%", sm: 280 } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

export default SpecialtiesSearch;
