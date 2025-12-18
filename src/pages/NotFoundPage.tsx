import { Typography, Box, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PageContainer from '../components/PageContainer';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Go to Home
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default NotFoundPage;
