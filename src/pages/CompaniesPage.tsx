import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Fab,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCompanies, setLoading } from '../store/slices/companiesSlice';
import { companyService } from '../api/services/companyService';
import Pagination from '../components/Pagination';
import CreateCompanyModal from '../components/CreateCompanyModal';
import { useTranslation } from 'react-i18next';

const CompaniesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { companies, total, loading } = useAppSelector((state) => state.companies);
  const { user } = useAppSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchCompanies();
  }, [currentPage]);

  const fetchCompanies = async () => {
    dispatch(setLoading(true));
    setError(null);

    try {
      const skip = (currentPage - 1) * rowsPerPage;
      const data = await companyService.getAllCompanies({
        skip,
        limit: rowsPerPage,
      });
      dispatch(setCompanies(data));
    } catch (err: any) {
      console.error('❌ Failed to load companies:', err);
      setError(err.response?.data?.detail || 'Failed to load companies');
    }
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCompany = (id: string) => {
    navigate(`/companies/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('companies.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('companies.subtitle')}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder={t('companies.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredCompanies.length === 0 ? (
            <Box sx={{ textAlign: 'center', my: 8 }}>
              <BusinessIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {t('companies.noCompanies')}
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {filteredCompanies.map((company) => (
                  <Grid item xs={12} sm={6} md={4} key={company.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {company.name}
                          </Typography>
                        </Box>

                        <Chip
                          label={
                            company.is_visible ? t('companies.public') : t('companies.private')
                          }
                          size="small"
                          color={company.is_visible ? 'success' : 'default'}
                          sx={{ mb: 2 }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            minHeight: '3.6em',
                          }}
                        >
                          {company.description || t('companies.noDescription')}
                        </Typography>
                      </CardContent>

                      <CardActions>
                        <Button size="small" onClick={() => handleViewCompany(company.id)}>
                          {t('companies.viewDetails')}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {total > rowsPerPage && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    total={total}
                    page={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                  />
                </Box>
              )}
            </>
          )}
        </>
      )}

      {user && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={() => setCreateModalOpen(true)}
        >
          <AddIcon />
        </Fab>
      )}

      <CreateCompanyModal
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          fetchCompanies();
        }}
      />
    </Container>
  );
};

export default CompaniesPage;
