// src/pages/doctors/components/SearchBar.jsx
import {
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  Box,
  Container,
  Divider,
} from "@mui/material";
import { Search, LocationOn, CalendarToday } from "@mui/icons-material";
import { useState } from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  handleSpecialtyFilter,
  specialties,
  handleSearch,
}) => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <Box sx={{ bgcolor: "grey.50", py: 4 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "stretch",
            borderRadius: 2,
            overflow: "hidden",
            flexWrap: { xs: "wrap", md: "nowrap" },
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* Tìm kiếm */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: 1 },
              display: "flex",
              alignItems: "center",
              px: 2,
              py: { xs: 1.5, md: 0 },
              minWidth: 0,
            }}
          >
            <Search sx={{ color: "primary.main", mr: 1.5, flexShrink: 0 }} />
            <InputBase
              placeholder="Search doctor, clinic, specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                flex: 1,
                fontSize: "0.95rem",
                minWidth: 0,
              }}
            />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />

          {/* Chuyên khoa */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "auto" },
              display: "flex",
              alignItems: "center",
              borderTop: { xs: "1px solid", md: "none" },
              borderColor: "divider",
            }}
          >
            <Select
              value={selectedSpecialty || ""}
              onChange={(e) => handleSpecialtyFilter(e.target.value)}
              displayEmpty
              variant="standard"
              disableUnderline
              sx={{
                minWidth: { xs: "100%", md: 200 },
                px: 2,
                py: 1.75,
                "& .MuiSelect-select": {
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                },
              }}
              startAdornment={
                <LocationOn
                  sx={{ color: "primary.main", fontSize: 20, mr: 1 }}
                />
              }
            >
              <MenuItem value="">
                <Box sx={{ color: "text.secondary" }}>All Specialties</Box>
              </MenuItem>
              {specialties.map((s) => (
                <MenuItem key={s.id} value={s.name}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />

          {/* Ngày */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "auto" },
              display: "flex",
              alignItems: "center",
              px: 2,
              borderTop: { xs: "1px solid", md: "none" },
              borderColor: "divider",
              minWidth: { xs: "100%", md: 200 },
            }}
          >
            <CalendarToday
              sx={{ color: "primary.main", mr: 1.5, fontSize: 20 }}
            />
            <InputBase
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Select date"
              sx={{
                flex: 1,
                fontSize: "0.95rem",
                "& input": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>

          {/* Nút Search */}
          <IconButton
            onClick={handleSearch}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              px: { xs: 2, md: 4 },
              borderRadius: 0,
              minHeight: { xs: 50, md: 60 },
              flex: { xs: "1 1 100%", md: "auto" },
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <Search sx={{ mr: { xs: 0, sm: 1 } }} />
            <Box
              sx={{ display: { xs: "inline", sm: "inline" }, fontWeight: 500 }}
            >
              Search
            </Box>
          </IconButton>
        </Paper>
      </Container>
    </Box>
  );
};

export default SearchBar;
