import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
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
          © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME || 'Quiz Platform'}. All
          rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Built with React, TypeScript, and Material UI |{' '}
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
