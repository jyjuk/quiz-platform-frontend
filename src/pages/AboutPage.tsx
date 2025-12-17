import { Typography, Box, Paper, Grid } from '@mui/material';
import PageContainer from '../components/PageContainer';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const AboutPage = () => {
  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Modern Stack',
      description: 'Built with React, TypeScript, Material UI, and Vite',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure',
      description: 'JWT authentication with Auth0 integration',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Fast',
      description: 'Optimized performance with Docker and Nginx',
    },
    {
      icon: <InfoIcon sx={{ fontSize: 40 }} />,
      title: 'Comprehensive',
      description: 'Quiz management, analytics, and real-time notifications',
    },
  ];

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          About Quiz Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          A comprehensive quiz management system for companies and teams
        </Typography>
      </Box>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          What is Quiz Platform?
        </Typography>
        <Typography variant="body1" paragraph>
          Quiz Platform is a modern web application designed to help companies create, manage, and
          track quizzes for their teams. Built with cutting-edge technologies, it provides a
          seamless experience for both administrators and users.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether you're conducting employee training, knowledge assessments, or team building
          activities, Quiz Platform offers all the tools you need to create engaging and effective
          quizzes.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Key Features
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          Technology Stack
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Frontend:
            </Typography>
            <Typography variant="body2">• React 18 with TypeScript</Typography>
            <Typography variant="body2">• Material UI for components</Typography>
            <Typography variant="body2">• Vite for fast development</Typography>
            <Typography variant="body2">• React Router for navigation</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Backend:
            </Typography>
            <Typography variant="body2">• FastAPI (Python)</Typography>
            <Typography variant="body2">• PostgreSQL database</Typography>
            <Typography variant="body2">• Redis for caching</Typography>
            <Typography variant="body2">• Docker containerization</Typography>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
};

export default AboutPage;
