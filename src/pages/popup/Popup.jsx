import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../theme";
import { chromeUtils } from "../../utils/api";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  LinearProgress,
} from "@mui/material";

function Popup() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [memoryInfo, setMemoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async () => {
    try {
      const [cpu, memory] = await Promise.all([
        chromeUtils.getSystemInfo(),
        chromeUtils.getMemoryInfo(),
      ]);
      setSystemInfo(cpu);
      setMemoryInfo(memory);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: 350,
          height: 500,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const memoryUsage = memoryInfo
    ? ((memoryInfo.capacity - memoryInfo.availableCapacity) /
        memoryInfo.capacity) *
      100
    : 0;

  return (
    <Box sx={{ width: 350, height: 500, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        System Information
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {systemInfo && memoryInfo && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            CPU: {systemInfo.modelName}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Cores: {systemInfo.numOfProcessors}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Architecture: {systemInfo.archName}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Memory Usage
          </Typography>
          <LinearProgress
            variant="determinate"
            value={memoryUsage}
            sx={{ mb: 1, height: 10, borderRadius: 1 }}
          />
          <Typography variant="body2">
            {formatBytes(memoryInfo.capacity - memoryInfo.availableCapacity)}
            {" / "}
            {formatBytes(memoryInfo.capacity)} ({memoryUsage.toFixed(1)}%)
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Popup />
    </ThemeProvider>
  </React.StrictMode>
);
