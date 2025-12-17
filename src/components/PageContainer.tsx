import { Container, Box } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const PageContainer = ({ children, maxWidth = 'lg' }: PageContainerProps) => {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ py: 4 }}>{children}</Box>
    </Container>
  );
};

export default PageContainer;
