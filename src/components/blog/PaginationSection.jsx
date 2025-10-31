// src/pages/blog/components/PaginationSection.jsx
import { Box, Pagination } from "@mui/material";

const PaginationSection = ({ count, page, onChange }) => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      size="medium"
      sx={{
        "& .MuiPaginationItem-root": {
          borderRadius: 1,
          fontSize: "0.875rem",
        },
      }}
    />
  </Box>
);

export default PaginationSection;
