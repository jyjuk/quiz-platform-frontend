import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Divider,
  CardActions,
  Avatar,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  ExitToApp as ExitIcon,
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';
import { userService } from '../api/services/userService';
import { companyService } from '../api/services/companyService';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from 'react-i18next';
import type { User } from '../types/user';
import type { Company } from '../types/company';
import ConfirmDialog from '../components/ConfirmDialog';

const UserProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [user, setUser] = useState<User | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [leaveLoading, setLeaveLoading] = useState(false);

  const isOwnProfile = currentUser?.id === id;

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await userService.getUserById(userId);
      setUser(userData);

      const userCompanies = await companyService.getUserCompanies(userId);
      setCompanies(userCompanies);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCompany = async () => {
    if (!selectedCompanyId || !currentUser) return;

    setLeaveLoading(true);
    try {
      await companyService.removeMember(selectedCompanyId, currentUser.id);

      setCompanies((prev) => prev.filter((c) => c.id !== selectedCompanyId));

      setLeaveDialogOpen(false);
      setSelectedCompanyId(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to leave company');
    } finally {
      setLeaveLoading(false);
    }
  };

  const openLeaveDialog = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setLeaveDialogOpen(true);
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

  if (error || !user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || t('users.userNotFound')}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/users')}>
          {t('users.backToUsers')}
        </Button>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/users')}>
          {t('users.backToUsers')}
        </Button>
      </Box>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={user.avatar_url || undefined}
            sx={{ width: 100, height: 100, mr: 3, bgcolor: 'primary.main' }}
          >
            {!user.avatar_url && <PersonIcon sx={{ fontSize: 60 }} />}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
            {(user.first_name || user.last_name) && (
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {user.first_name} {user.last_name}
              </Typography>
            )}
            <Chip
              label={user.is_active ? t('users.active') : t('users.inactive')}
              color={user.is_active ? 'success' : 'default'}
              size="small"
            />
          </Box>
          {isOwnProfile && (
            <Button variant="contained" onClick={() => navigate('/profile')}>
              {t('profile.editButton')}
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('users.email')}
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Box>
            </Box>
          </Grid>

          {user.phone && (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {t('profile.phone')}
                  </Typography>
                  <Typography variant="body1">{user.phone}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {user.first_name && (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {t('profile.firstName')}
                  </Typography>
                  <Typography variant="body1">{user.first_name}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {user.last_name && (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {t('profile.lastName')}
                  </Typography>
                  <Typography variant="body1">{user.last_name}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {user.bio && (
            <Grid item xs={12}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('profile.bio')}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                  {user.bio}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarTodayIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('users.memberSince')}
                </Typography>
                <Typography variant="body1">
                  {new Date(user.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">
              {t('profile.created')}
            </Typography>
            <Typography variant="body2">
              {new Date(user.created_at).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">
              {t('profile.updated')}
            </Typography>
            <Typography variant="body2">
              {new Date(user.updated_at).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BusinessIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5">
            {isOwnProfile
              ? t('companies.myCompanies')
              : t('companies.userCompanies', { username: user.username })}
          </Typography>
          <Chip label={companies.length} color="primary" size="small" sx={{ ml: 2 }} />
        </Box>

        {companies.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <BusinessIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              {isOwnProfile
                ? t('users.noCompanies')
                : `${user.username} is not a member of any companies yet.`}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {companies.map((company) => {
              const isOwner = company.owner_id === user.id;
              const canLeave = isOwnProfile && !isOwner;

              return (
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

                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={
                            company.is_visible ? t('companies.public') : t('companies.private')
                          }
                          size="small"
                          color={company.is_visible ? 'success' : 'default'}
                          sx={{ mr: 1 }}
                        />
                        {isOwner && (
                          <Chip
                            label={t('companies.owner')}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '2.4em',
                        }}
                      >
                        {company.description || t('companies.noDescription')}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Button size="small" onClick={() => navigate(`/companies/${company.id}`)}>
                        {t('companies.viewDetails')}
                      </Button>
                      {canLeave && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<ExitIcon />}
                          onClick={() => openLeaveDialog(company.id)}
                        >
                          {t('companies.leaveCompany')}
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Paper>

      <ConfirmDialog
        open={leaveDialogOpen}
        title={t('companies.leaveCompany')}
        message={t('companies.confirmLeave')}
        onConfirm={handleLeaveCompany}
        onCancel={() => {
          setLeaveDialogOpen(false);
          setSelectedCompanyId(null);
        }}
        loading={leaveLoading}
        confirmText={t('companies.leaveCompany')}
        cancelText={t('common.cancel')}
      />
    </Container>
  );
};

export default UserProfilePage;
