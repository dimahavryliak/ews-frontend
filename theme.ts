// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1", // Blue
    },
    secondary: {
      main: "#f50057", // Pink/Red
    },
    success: {
      main: "#4caf50", // Green
    },
    error: {
      main: "#f44336", // Red
    },
    background: {
      default: "#f9f9f9", // Light gray background
      paper: "#ffffff", // White for cards and modals
    },
    text: {
      primary: "#171717", // Dark text
      secondary: "#757575", // Gray text
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 700,
      marginBottom: "1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      color: "#757575",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          padding: "0.5rem 1rem",
        },
        containedPrimary: {
          backgroundColor: "#0d47a1",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#0b3c91",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          color: "#fff",
        },
      },
    },
  },
});

export default theme;
