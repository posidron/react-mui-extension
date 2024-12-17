import { Box, Container, Typography } from "@mui/material";
import React from "react";

function App() {
  return (
    <Container maxWidth="sm" sx={{ width: 350, height: 500, p: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" component="h1">
          Chrome Extension
        </Typography>
        <Typography variant="body1">
          This is your Chrome extension popup!
        </Typography>
      </Box>
    </Container>
  );
}
export default App;
