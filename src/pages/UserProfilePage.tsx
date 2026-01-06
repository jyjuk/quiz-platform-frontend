import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserById, clearSelectedUser } from '../store/slices/usersSlice';
import { getCompaniesByOwner } from '../utils/mockData';
import CompanyCard from '../components/CompanyCard';

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { selectedUser, loading, error } = useAppSelector((state) => state.users);
  const userCompanies = id ? getCompaniesByOwner(id) : [];

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }

    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/users')} sx={{ mt: 2 }}>
          {t('users.backToUsers')}
        </Button>
      </Container>
    );
  }

  if (!selectedUser) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 4 }}>
          {t('users.userNotFound')}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/users')} sx={{ mt: 2 }}>
          {t('users.backToUsers')}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/users')}>
          {t('users.backToUsers')}
        </Button>
      </Box>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={selectedUser.avatar_url || undefined}
            sx={{ width: 100, height: 100, mr: 3, bgcolor: 'primary.main' }}
          >
            {!selectedUser.avatar_url && <PersonIcon sx={{ fontSize: 60 }} />}
          </Avatar>
          <Box>
            <Typography variant="h4">{selectedUser.username}</Typography>
            {(selectedUser.first_name || selectedUser.last_name) && (
              <Typography variant="h6" color="text.secondary">
                {selectedUser.first_name} {selectedUser.last_name}
              </Typography>
            )}
            <Box sx={{ mt: 1 }}>
              <Chip
                label={selectedUser.is_active ? t('users.active') : t('users.inactive')}
                color={selectedUser.is_active ? 'success' : 'default'}
                size="small"
                sx={{ mr: 1 }}
              />
              {selectedUser.is_superuser && <Chip label="Admin" color="primary" size="small" />}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {t('users.email')}
                </Typography>
                <Typography variant="body1">{selectedUser.email}</Typography>
              </Box>
            </Box>
          </Grid>

          {selectedUser.phone && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {t('profile.phone')}
                  </Typography>
                  <Typography variant="body1">{selectedUser.phone}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {selectedUser.bio && (
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                {t('profile.bio')}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {selectedUser.bio}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarTodayIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {t('users.memberSince')}
                </Typography>
                <Typography variant="body1">
                  {new Date(selectedUser.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 3, mb: 2 }} />

        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            {t('profile.created')} {new Date(selectedUser.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {t('profile.updated')} {new Date(selectedUser.updated_at).toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <BusinessIcon color="primary" />
        <Typography variant="h5">
          {t('users.companiesOwned')} ({userCompanies.length})
        </Typography>
      </Box>

      {userCompanies.length > 0 ? (
        <Grid container spacing={3}>
          {userCompanies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <CompanyCard company={company} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {t('users.noCompanies')}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default UserProfilePage;