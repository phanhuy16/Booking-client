// src/pages/doctors/components/PaginationSection.jsx
import { Box, Pagination } from "@mui/material";

const PaginationSection = ({ totalPages, currentPage, handlePageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <Box className="pagination-wrapper">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default PaginationSection;
