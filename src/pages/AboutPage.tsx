import { Typography, Box, Paper, Grid } from '@mui/material';
import PageContainer from '../components/PageContainer';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const AboutPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: t('about.modernStack'),
      description: t('about.modernStackDesc'),
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: t('about.secure'),
      description: t('about.secureDesc'),
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: t('about.fast'),
      description: t('about.fastDesc'),
    },
    {
      icon: <InfoIcon sx={{ fontSize: 40 }} />,
      title: t('about.comprehensive'),
      description: t('about.comprehensiveDesc'),
    },
  ];

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          {t('about.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          {t('about.subtitle')}
        </Typography>
      </Box>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {t('about.whatIs')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about.description1')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about.description2')}
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        {t('about.keyFeatures')}
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
          {t('about.techStack')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t('about.frontend')}
            </Typography>
            <Typography variant="body2">• React 18 with TypeScript</Typography>
            <Typography variant="body2">• Material UI for components</Typography>
            <Typography variant="body2">• Vite for fast development</Typography>
            <Typography variant="body2">• React Router for navigation</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t('about.backend')}
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
