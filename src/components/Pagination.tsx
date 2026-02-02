import { Box, Button, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface PaginationProps {
  total: number;
  skip: number;
  limit: number;
  onPageChange: (skip: number) => void;
}

const Pagination = ({ total, skip, limit, onPageChange }: PaginationProps) => {
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePrevious = () => {
    if (skip > 0) {
      onPageChange(skip - limit);
    }
  };

  const handleNext = () => {
    if (skip + limit < total) {
      onPageChange(skip + limit);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: 4,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<NavigateBeforeIcon />}
        onClick={handlePrevious}
        disabled={skip === 0}
      >
        Previous
      </Button>

      <Typography>
        Page {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="outlined"
        endIcon={<NavigateNextIcon />}
        onClick={handleNext}
        disabled={skip + limit >= total}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
