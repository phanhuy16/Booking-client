// src/pages/error/NotFound.jsx
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { Home } from "@mui/icons-material";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <Container maxWidth="md">
        <Box className="notfound-content">
          {/* 404 Illustration */}
          <Box className="notfound-illustration">
            <svg
              viewBox="0 0 1000 600"
              className="notfound-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circles */}
              <circle cx="200" cy="150" r="60" fill="#e0e0e0" opacity="0.5" />
              <circle cx="800" cy="180" r="50" fill="#e0e0e0" opacity="0.5" />
              <circle cx="150" cy="400" r="40" fill="#e0e0e0" opacity="0.5" />
              <circle cx="850" cy="450" r="70" fill="#e0e0e0" opacity="0.5" />

              {/* Person falling */}
              <g transform="translate(150, 200)">
                {/* Head */}
                <circle cx="0" cy="0" r="25" fill="#FFD4A3" />
                {/* Hair */}
                <path
                  d="M -20,-10 Q -25,-25 -15,-30 Q 0,-35 15,-30 Q 25,-25 20,-10"
                  fill="#2C3E50"
                />
                {/* Body */}
                <rect
                  x="-15"
                  y="25"
                  width="30"
                  height="40"
                  rx="5"
                  fill="#0099ff"
                />
                {/* Arms */}
                <rect
                  x="-40"
                  y="30"
                  width="25"
                  height="15"
                  rx="7"
                  fill="#0099ff"
                  transform="rotate(-30 -27.5 37.5)"
                />
                <rect
                  x="15"
                  y="30"
                  width="25"
                  height="15"
                  rx="7"
                  fill="#0099ff"
                  transform="rotate(30 27.5 37.5)"
                />
                {/* Hand waving */}
                <circle cx="-40" cy="25" r="8" fill="#FFD4A3" />
              </g>

              {/* 404 Text */}
              <text
                x="300"
                y="350"
                fontSize="200"
                fontWeight="bold"
                fill="#0099ff"
              >
                404
              </text>

              {/* Person legs */}
              <g transform="translate(750, 280)">
                <rect
                  x="-15"
                  y="0"
                  width="15"
                  height="50"
                  rx="7"
                  fill="#2C3E50"
                  transform="rotate(-20 -7.5 25)"
                />
                <rect
                  x="0"
                  y="0"
                  width="15"
                  height="50"
                  rx="7"
                  fill="#2C3E50"
                  transform="rotate(30 7.5 25)"
                />
                {/* Shoes */}
                <ellipse cx="-20" cy="50" rx="12" ry="8" fill="#34495E" />
                <ellipse cx="15" cy="55" rx="12" ry="8" fill="#34495E" />
              </g>

              {/* Plant */}
              <g transform="translate(550, 220)">
                <ellipse cx="0" cy="30" rx="40" ry="15" fill="#2C3E50" />
                <path
                  d="M 0,30 Q -10,15 -15,5 Q -10,-5 0,0 Q 10,-5 15,5 Q 10,15 0,30"
                  fill="#00D4AA"
                />
                <ellipse
                  cx="0"
                  cy="0"
                  rx="20"
                  ry="25"
                  fill="#00D4AA"
                  opacity="0.7"
                />
              </g>

              {/* Acorn */}
              <g transform="translate(200, 450)">
                <ellipse cx="0" cy="10" rx="15" ry="20" fill="#0099ff" />
                <path d="M -15,5 Q 0,-5 15,5" fill="#2C3E50" />
              </g>

              {/* Small circles */}
              <circle cx="350" cy="150" r="8" fill="#e0e0e0" />
              <circle cx="650" cy="180" r="6" fill="#e0e0e0" />
              <circle cx="250" cy="500" r="10" fill="#e0e0e0" />
              <circle cx="750" cy="120" r="7" fill="#e0e0e0" />

              {/* Stars */}
              <text x="400" y="180" fontSize="20" fill="#0099ff">
                ✨
              </text>
              <text x="700" y="250" fontSize="15" fill="#0099ff">
                ✨
              </text>
              <text x="300" y="480" fontSize="18" fill="#0099ff">
                ✨
              </text>
            </svg>
          </Box>

          {/* Text Content */}
          <Typography variant="h4" className="notfound-title">
            Oops! That Page Can't Be Found.
          </Typography>
          <Typography variant="body1" className="notfound-subtitle">
            The page you are looking for was never existed.
          </Typography>

          {/* Back to Home Button */}
          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            className="back-home-btn"
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default NotFound;
