import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import "./assets/styles/auth.css";
import "./assets/styles/global.css";

// Custom Material-UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0099ff",
      light: "#33adff",
      dark: "#0066cc",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#764ba2",
      light: "#9168b8",
      dark: "#5a3881",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00b894",
      light: "#33c9a9",
      dark: "#008c73",
    },
    error: {
      main: "#ff4444",
      light: "#ff6969",
      dark: "#cc3636",
    },
    warning: {
      main: "#ff9f43",
      light: "#ffb269",
      dark: "#cc7f36",
    },
    info: {
      main: "#0099ff",
      light: "#33adff",
      dark: "#0066cc",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
      disabled: "#999999",
    },
  },
  typography: {
    fontFamily:
      "'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "48px",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "40px",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: "32px",
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "16px",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "14px",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 2px 4px rgba(0,0,0,0.05)",
    "0 4px 8px rgba(0,0,0,0.08)",
    "0 6px 12px rgba(0,0,0,0.1)",
    "0 8px 16px rgba(0,0,0,0.12)",
    "0 12px 24px rgba(0,0,0,0.15)",
    "0 16px 32px rgba(0,0,0,0.18)",
    "0 20px 40px rgba(0,0,0,0.2)",
    ...Array(17).fill("0 24px 48px rgba(0,0,0,0.25)"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "16px",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #0099ff 0%, #0066cc 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #0088ee 0%, #0055bb 100%)",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover fieldset": {
              borderColor: "#0099ff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0099ff",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
