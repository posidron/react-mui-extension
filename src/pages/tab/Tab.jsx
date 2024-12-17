// src/pages/tab/Tab.jsx
import { CircularProgress, Container, Paper, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import theme from "../../theme";

function Tab() {
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await fetch("https://ifconfig.co/json");
        if (!response.ok) throw new Error("Failed to fetch IP info");
        const data = await response.json();
        setIpInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Your IP Information
      </Typography>
      <Paper sx={{ p: 3 }}>
        {ipInfo && (
          <>
            <Typography variant="h6" gutterBottom>
              IP: {ipInfo.ip}
            </Typography>
            <Typography>Country: {ipInfo.country}</Typography>
            <Typography>City: {ipInfo.city}</Typography>
            <Typography>Hostname: {ipInfo.hostname}</Typography>
            <Typography>ASN: {ipInfo.asn}</Typography>
            <Typography>ASN Org: {ipInfo.asn_org}</Typography>
          </>
        )}
      </Paper>
    </Container>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Tab />
    </ThemeProvider>
  </React.StrictMode>
);
