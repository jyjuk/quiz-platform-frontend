import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  ExitToApp,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentCompany, removeCompany, setLoading } from '../store/slices/companiesSlice';
import { companyService } from '../api/services/companyService';
import EditCompanyModal from '../components/EditCompanyModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { useTranslation } from 'react-i18next';

const CompanyDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentCompany, loading } = useAppSelector((state) => state.companies);
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);

  const isOwner = currentUser && currentCompany && currentUser.id === currentCompany.owner_id;

  useEffect(() => {
    if (id) {
      fetchCompanyDetails(id);
    }
  }, [id]);

  const fetchCompanyDetails = async (companyId: string) => {
    dispatch(setLoading(true));
    setError(null);

    try {
      const company = await companyService.getCompanyById(companyId);
      dispatch(setCurrentCompany(company));
    } catch (err: any) {
      console.error('Failed to load company:', err);
      setError(err.response?.data?.detail || 'Failed to load company details');
    }
  };

  const handleDelete = async () => {
    if (!currentCompany) return;

    setDeleteLoading(true);
    try {
      await companyService.deleteCompany(currentCompany.id);
      dispatch(removeCompany(currentCompany.id));
      navigate('/companies');
    } catch (err: any) {
      console.error('Failed to delete company:', err);
      setError(err.response?.data?.detail || 'Failed to delete company');
      setDeleteDialogOpen(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!currentCompany || !currentUser) return;

    setLeaveLoading(true);
    try {
      await companyService.removeMember(currentCompany.id, currentUser.id);
      navigate('/companies');
    } catch (err: any) {
      console.error('Failed to leave company:', err);
      setError(err.response?.data?.detail || 'Failed to leave company');
      setLeaveDialogOpen(false);
    } finally {
      setLeaveLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !currentCompany) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Company not found'}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/companies')}>
          {t('common.goBack')}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/companies')} sx={{ mb: 3 }}>
        {t('common.goBack')}
      </Button>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <BusinessIcon sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {currentCompany.name}
            </Typography>
            <Chip
              label={currentCompany.is_visible ? t('companies.public') : t('companies.private')}
              color={currentCompany.is_visible ? 'success' : 'default'}
              sx={{ mr: 1 }}
            />
            {isOwner && (
              <Chip label={t('companies.youAreOwner')} color="primary" variant="outlined" />
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('companies.description')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentCompany.description || t('companies.noDescription')}
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {t('companies.createdAt')}
                </Typography>
                <Typography variant="body1">
                  {new Date(currentCompany.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {t('companies.updatedAt')}
                </Typography>
                <Typography variant="body1">
                  {new Date(currentCompany.updated_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {isOwner && (
            <>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditModalOpen(true)}
              >
                {t('common.edit')}
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteDialogOpen(true)}
              >
                {t('common.delete')}
              </Button>
            </>
          )}

          {currentUser && !isOwner && (
            <Button
              variant="outlined"
              color="warning"
              startIcon={<ExitToApp />}
              onClick={() => setLeaveDialogOpen(true)}
            >
              {t('companies.leaveCompany')}
            </Button>
          )}
        </Box>
      </Paper>

      {isOwner && currentCompany && (
        <EditCompanyModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            if (id) fetchCompanyDetails(id);
          }}
          company={currentCompany}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title={t('companies.deleteCompany')}
        message={t('companies.confirmDelete')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        loading={deleteLoading}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
      />

      <ConfirmDialog
        open={leaveDialogOpen}
        title={t('companies.leaveCompany')}
        message={t('companies.confirmLeave')}
        onConfirm={handleLeave}
        onCancel={() => setLeaveDialogOpen(false)}
        loading={leaveLoading}
        confirmText={t('companies.leaveCompany')}
        cancelText={t('common.cancel')}
      />
    </Container>
  );
};

export default CompanyDetailsPage;
