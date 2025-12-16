import { Container, Typography, Button, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom color="primary">
          {import.meta.env.VITE_APP_NAME || 'Quiz Platform'}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
          Welcome to the Quiz Management System
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: '600px' }}>
          Manage your quizzes, companies, and track progress all in one place. Get started by
          logging in or exploring our features.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" size="large">
            Get Started
          </Button>
          <Button variant="outlined" size="large">
            Learn More
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
