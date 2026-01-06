import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  Alert,
  Grid,
  Divider,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { userService } from '../api/services/userService';
import { setUser, logout } from '../store/slices/authSlice';
import ConfirmDialog from '../components/ConfirmDialog';
import type { UserUpdateRequest } from '../types/user';
import { authService } from '../api/services/authService';

const MyProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserUpdateRequest>({
    username: user?.username || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    bio: user?.bio || '',
    avatar_url: user?.avatar_url || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(!user);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);


  useEffect(() => {
    const loadUser = async () => {
      if (!user && isAuthenticated) {
        setUserLoading(true);
        try {
          const userData = await authService.getCurrentUser();
          dispatch(
            setUser({
              id: userData.id,
              username: userData.username,
              email: userData.email,
              first_name: userData.first_name,
              last_name: userData.last_name,
              bio: userData.bio,
              avatar_url: userData.avatar_url,
              phone: userData.phone,
            })
          );
        } catch (err) {
          console.error('Failed to load user:', err);
          dispatch(logout());
          navigate('/login');
        } finally {
          setUserLoading(false);
        }
      }
    };

    loadUser();
  }, [user, isAuthenticated, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        bio: user.bio || '',
        avatar_url: user.avatar_url || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await userService.updateOwnProfile(formData);
      dispatch(
        setUser({
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          bio: updatedUser.bio,
          avatar_url: updatedUser.avatar_url,
          phone: updatedUser.phone,
        })
      );
      setSuccess(t('profile.updateSuccess'));
      setEditMode(false);
    } catch (err: any) {
      console.error('Update profile error:', err);
      setError(err.response?.data?.detail || t('profile.updateError'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      bio: user?.bio || '',
      avatar_url: user?.avatar_url || '',
      phone: user?.phone || '',
    });
    setEditMode(false);
    setError('');
    setSuccess('');
  };

  const handleDeleteProfile = async () => {
    setDeleteLoading(true);
    try {
      await userService.deleteOwnProfile();
      dispatch(logout());
      navigate('/login');
    } catch (err: any) {
      console.error('Delete profile error:', err);
      setError(err.response?.data?.detail || t('profile.deleteError'));
      setDeleteDialogOpen(false);
    } finally {
      setDeleteLoading(false);
    }
  };


  if (userLoading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {t('profile.userNotFound')}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('profile.title')}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={user.avatar_url || undefined}
            sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}
          >
            {!user.avatar_url && <PersonIcon sx={{ fontSize: 50 }} />}
          </Avatar>
          <Box>
            <Typography variant="h5">{user.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('profile.username')}
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('profile.phone')}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('profile.firstName')}
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('profile.lastName')}
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('profile.bio')}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!editMode}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('profile.avatarUrl')}
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          {!editMode ? (
            <>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
              >
                {t('profile.editButton')}
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteDialogOpen(true)}
              >
                {t('profile.deleteButton')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? t('profile.saving') : t('profile.saveButton')}
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                disabled={loading}
              >
                {t('profile.cancelButton')}
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            {t('profile.created')} {new Date(user.created_at).toLocaleDateString()}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            {t('profile.updated')} {new Date(user.updated_at).toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>

      <ConfirmDialog
        open={deleteDialogOpen}
        title={t('profile.deleteDialogTitle')}
        message={t('profile.deleteDialogMessage')}
        onConfirm={handleDeleteProfile}
        onCancel={() => setDeleteDialogOpen(false)}
        confirmText={t('profile.deleteConfirm')}
        cancelText={t('profile.deleteCancel')}
        loading={deleteLoading}
      />
    </Container>
  );
};

export default MyProfilePage;