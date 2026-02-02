import { Box, Container, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} {t('common.appName')}. {t('footer.copyright')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          {t('footer.builtWith')} |{' '}
          <Link
            href="https://github.com/jyjuk/quiz-platform-frontend"
            target="_blank"
            underline="hover"
          >
            GitHub
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
