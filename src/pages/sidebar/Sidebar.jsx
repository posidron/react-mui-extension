import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import theme from "../../theme";

function Sidebar() {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h6">Sidebar View</Typography>
    </Box>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar />
    </ThemeProvider>
  </React.StrictMode>
);
