import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';

const HomePage = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'Browse Users',
      description: 'View and manage all platform users',
      icon: <PeopleIcon sx={{ fontSize: 60 }} />,
      path: '/users',
      color: '#1976d2',
    },
    {
      title: 'Explore Companies',
      description: 'Discover companies and their quizzes',
      icon: <BusinessIcon sx={{ fontSize: 60 }} />,
      path: '/companies',
      color: '#9c27b0',
    },
    {
      title: 'About Platform',
      description: 'Learn more about our features',
      icon: <InfoIcon sx={{ fontSize: 60 }} />,
      path: '/about',
      color: '#2e7d32',
    },
  ];

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ fontWeight: 'bold' }}
        >
          {import.meta.env.VITE_APP_NAME || 'Quiz Platform'}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
          Welcome to the Quiz Management System
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: '600px' }}>
          Manage your quizzes, companies, and track progress all in one place. Get started by
          exploring our features below.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {quickLinks.map((link, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => navigate(link.path)}
              >
                <Box sx={{ color: link.color, mb: 2 }}>{link.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {link.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {link.description}
                </Typography>
                <Button variant="contained" sx={{ mt: 'auto' }}>
                  Explore
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
