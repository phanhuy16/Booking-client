// src/pages/specialties/components/SpecialtyCard.jsx
import { Card, CardContent, Box, Typography, Avatar } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SpecialtyCard = ({ specialty }) => (
  <Card
    component={Link}
    to={`/specialties/${specialty.id}`}
    sx={{
      textDecoration: "none",
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: 1,
      transition: "0.3s",
      "&:hover": { boxShadow: 3, transform: "translateY(-2px)" },
    }}
  >
    <CardContent sx={{ p: 2, textAlign: "center", position: "relative" }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: `${specialty.color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1.5,
          mx: "auto",
          transition: "0.3s",
          "&:hover": { transform: "scale(1.08)" },
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            fontSize: "1.5rem",
            bgcolor: "transparent",
          }}
          src={specialty.icon}
        >
          {specialty.name?.charAt(0)}
        </Avatar>
      </Box>
      <Typography
        variant="subtitle2"
        fontWeight={600}
        sx={{ mb: 0.5, fontSize: "0.875rem" }}
      >
        {specialty.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {specialty.count} Doctors
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          width: 28,
          height: 28,
          borderRadius: "50%",
          bgcolor: "grey.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "primary.main",
          transition: "0.3s",
          "&:hover": { bgcolor: "primary.main", color: "white" },
        }}
      >
        <ArrowForward sx={{ fontSize: 16 }} />
      </Box>
    </CardContent>
  </Card>
);

export default SpecialtyCard;
