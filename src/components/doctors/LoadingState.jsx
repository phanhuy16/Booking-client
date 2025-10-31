// LoadingState.jsx
import { Box, CircularProgress } from "@mui/material";

const LoadingState = () => (
  <Box display="flex" justifyContent="center" py={8}>
    <CircularProgress size={60} />
  </Box>
);

export default LoadingState;
