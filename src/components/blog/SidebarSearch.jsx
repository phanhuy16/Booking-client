// src/pages/blog/components/SidebarSearch.jsx
import { Paper, Typography, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const SidebarSearch = ({ value, onChange }) => (
  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
    <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
      Search
    </Typography>
    <TextField
      fullWidth
      size="small"
      placeholder="Search keyword..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <Search fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </Paper>
);

export default SidebarSearch;
