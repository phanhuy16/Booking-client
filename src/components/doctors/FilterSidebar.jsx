// src/pages/doctors/components/FilterSidebar.jsx
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Slider,
  InputAdornment,
  TextField,
  Divider,
} from "@mui/material";
import { ExpandMore, Search, FilterList } from "@mui/icons-material";

const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  specialties,
  selectedSpecialty,
  handleSpecialtyFilter,
  priceRange,
  setPriceRange,
  handleClearFilters,
}) => {
  const formatVND = (value) => {
    if (value === null || value === undefined) return "0 ₫";
    return new Intl.NumberFormat("vi-VN").format(value) + " ₫";
  };
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
        height: "fit-content",
        position: { md: "sticky" },
        top: 20,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2.5,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterList />
          <Typography variant="h6" fontWeight={600}>
            Filters
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={handleClearFilters}
          sx={{
            color: "white",
            textTransform: "none",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Clear All
        </Button>
      </Box>

      {/* Search Box */}
      <Box sx={{ p: 2.5 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search filters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Divider />

      {/* Specialties */}
      <Accordion
        defaultExpanded
        elevation={0}
        disableGutters
        sx={{
          bgcolor: "transparent",
          "&:before": { display: "none" },
          "& .MuiAccordionSummary-root": {
            minHeight: 48,
            px: 2.5,
            "&:hover": {
              bgcolor: "action.hover",
            },
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            "& .MuiAccordionSummary-content": {
              my: 1,
            },
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Specialties
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0, pb: 2, px: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {specialties.slice(0, 6).map((s) => (
              <FormControlLabel
                key={s.id}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedSpecialty === s.name}
                    onChange={() => handleSpecialtyFilter(s.name)}
                    sx={{
                      "&.Mui-checked": {
                        color: "primary.main",
                      },
                    }}
                  />
                }
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                      fontSize: "0.875rem",
                    }}
                  >
                    <span>{s.name}</span>
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        bgcolor: "action.hover",
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        ml: 1,
                      }}
                    >
                      {s.doctorCount || 0}
                    </Typography>
                  </Box>
                }
                sx={{
                  m: 0,
                  py: 0.75,
                  px: 1,
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              />
            ))}
          </Box>
          {specialties.length > 6 && (
            <Button
              size="small"
              sx={{
                mt: 1,
                textTransform: "none",
                fontSize: "0.813rem",
              }}
            >
              Show more
            </Button>
          )}
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Price Range */}
      <Accordion
        defaultExpanded
        elevation={0}
        disableGutters
        sx={{
          bgcolor: "transparent",
          "&:before": { display: "none" },
          "& .MuiAccordionSummary-root": {
            minHeight: 48,
            px: 2.5,
            "&:hover": {
              bgcolor: "action.hover",
            },
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            "& .MuiAccordionSummary-content": {
              my: 1,
            },
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
          <Slider
            value={priceRange}
            onChange={(e, v) => setPriceRange(v)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${formatVND(value)}`}
            min={0}
            max={1000000}
            step={100}
            sx={{
              mt: 1,
              mb: 2,
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.lighter",
                px: 2,
                py: 1,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography variant="body2" fontWeight={600} color="primary">
                {formatVND(priceRange[0])}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              to
            </Typography>
            <Box
              sx={{
                bgcolor: "primary.lighter",
                px: 2,
                py: 1,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography variant="body2" fontWeight={600} color="primary">
                {formatVND(priceRange[1])}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterSidebar;
