import { Typography, Box, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PageContainer from '../components/PageContainer';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          {t('notFound.title')}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {t('notFound.subtitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          {t('notFound.description')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            {t('common.backToHome')}
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            {t('common.goBack')}
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default NotFoundPage;
