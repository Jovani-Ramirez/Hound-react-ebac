import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#091e3f", // azul noche
    },
    secondary: {
      main: "#6ac6de", // azul claro
    },
    background: {
      default: "#f0f0f0",
    },
  },
  typography: {
    fontFamily: "Open Sans, Roboto, Arial, sans-serif",
  },
});
