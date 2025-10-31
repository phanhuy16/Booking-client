// EmptyState.jsx
import { Card, CardContent, Typography, Button } from "@mui/material";

const EmptyState = ({ handleClearFilters }) => (
  <Card sx={{ textAlign: "center", py: 8 }}>
    <CardContent>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        No doctors found
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Try adjusting your filters or search criteria
      </Typography>
      <Button variant="outlined" onClick={handleClearFilters} sx={{ mt: 2 }}>
        Clear Filters
      </Button>
    </CardContent>
  </Card>
);

export default EmptyState;
