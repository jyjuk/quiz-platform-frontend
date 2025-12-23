import { Typography, Box, Paper, Button, Chip, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { healthService } from '../api/services/healthService';
import type { HealthCheckResponse } from '../api/services/healthService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';

const HealthCheckPage = () => {
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleHealthCheck = async () => {
    setLoading(true);
    setError(null);
    setHealthData(null);

    try {
      const data = await healthService.checkHealth();
      setHealthData(data);
    } catch (err: any) {
      if (err.response) {
        setError(`Server Error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        setError(
          'Network Error: Cannot reach backend server. Make sure backend is running on http://localhost:8000'
        );
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Backend Health Check
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Test connection to backend API using Axios
        </Typography>
      </Box>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="h6">API Endpoint:</Typography>
          <Chip
            label={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/`}
            color="primary"
            variant="outlined"
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
          onClick={handleHealthCheck}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Backend Health'}
        </Button>
      </Paper>

      {healthData && (
        <Paper sx={{ p: 4, mb: 3, bgcolor: 'success.light' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 40, color: 'success.dark' }} />
            <Typography variant="h5" color="success.dark">
              Backend is Healthy! ✅
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Status:</strong> {healthData.status}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Timestamp:</strong> {new Date(healthData.timestamp).toLocaleString()}
            </Typography>
            {healthData.version && (
              <Typography variant="body1" gutterBottom>
                <strong>Version:</strong> {healthData.version}
              </Typography>
            )}
            {healthData.database && (
              <Typography variant="body1" gutterBottom>
                <strong>Database:</strong> {healthData.database}
              </Typography>
            )}
            {healthData.redis && (
              <Typography variant="body1" gutterBottom>
                <strong>Redis:</strong> {healthData.redis}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'white', borderRadius: 1 }}>
            <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(healthData, null, 2)}
            </Typography>
          </Box>
        </Paper>
      )}

      {error && (
        <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Health Check Failed ❌
          </Typography>
          <Typography variant="body2">{error}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" display="block">
              <strong>Troubleshooting:</strong>
            </Typography>
            <Typography variant="caption" display="block">
              1. Make sure backend server is running
            </Typography>
            <Typography variant="caption" display="block">
              2. Check VITE_API_BASE_URL in .env file
            </Typography>
            <Typography variant="caption" display="block">
              3. Verify backend is accessible at http://localhost:8000
            </Typography>
          </Box>
        </Alert>
      )}

      <Paper sx={{ p: 3, bgcolor: 'info.light' }}>
        <Typography variant="h6" gutterBottom>
          How it works:
        </Typography>
        <Typography variant="body2" paragraph>
          This page demonstrates Axios HTTP client integration:
        </Typography>
        <Typography variant="body2" component="div">
          <strong>1. Centralized Axios Instance:</strong> Configured with base URL, timeout, and
          interceptors
        </Typography>
        <Typography variant="body2" component="div">
          <strong>2. Request Interceptor:</strong> Logs outgoing requests (can add auth tokens)
        </Typography>
        <Typography variant="body2" component="div">
          <strong>3. Response Interceptor:</strong> Handles errors globally (401, 403, 500, etc.)
        </Typography>
        <Typography variant="body2" component="div">
          <strong>4. Health Check Service:</strong> Organized API calls in service layer
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Note:</strong> Make sure your backend is running on port 8000 for this to work!
        </Typography>
      </Paper>
    </PageContainer>
  );
};

export default HealthCheckPage;
