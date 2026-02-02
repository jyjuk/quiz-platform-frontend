import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  CircularProgress,
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
import { authService } from '../api/services/authService';

const profileSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .required('Username is required'),
  first_name: yup
    .string()
    .max(50, 'First name must not exceed 50 characters')
    .nullable()
    .transform((value) => value || null),
  last_name: yup
    .string()
    .max(50, 'Last name must not exceed 50 characters')
    .nullable()
    .transform((value) => value || null),
  bio: yup
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .nullable()
    .transform((value) => value || null),
  avatar_url: yup
    .string()
    .url('Must be a valid URL')
    .nullable()
    .transform((value) => value || null)
    .optional(),
  phone: yup
    .string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
      message: 'Invalid phone number',
      excludeEmptyString: true,
    })
    .nullable()
    .transform((value) => value || null)
    .optional(),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;

const MyProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(!user);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      username: user?.username || '',
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      bio: user?.bio || '',
      avatar_url: user?.avatar_url || '',
      phone: user?.phone || '',
    },
  });

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
      reset({
        username: user.username,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        bio: user.bio || '',
        avatar_url: user.avatar_url || '',
        phone: user.phone || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await userService.updateOwnProfile(data);
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
    reset({
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

        {/* ✅ ФОРМА ТІЛЬКИ З ПОЛЯМИ */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('profile.username')}
              disabled={!editMode}
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register('username')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('profile.phone')}
              disabled={!editMode}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register('phone')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('profile.firstName')}
              disabled={!editMode}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              {...register('first_name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('profile.lastName')}
              disabled={!editMode}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
              {...register('last_name')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('profile.bio')}
              disabled={!editMode}
              multiline
              rows={4}
              error={!!errors.bio}
              helperText={errors.bio?.message}
              {...register('bio')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('profile.avatarUrl')}
              disabled={!editMode}
              error={!!errors.avatar_url}
              helperText={errors.avatar_url?.message}
              {...register('avatar_url')}
            />
          </Grid>
        </Grid>

        {/* ✅ КНОПКИ УПРАВЛІННЯ (ЗА МЕЖАМИ ФОРМИ) */}
        <Box sx={{ mt: 4 }}>
          {!editMode ? (
            // VIEW MODE - Edit і Delete кнопки
            <Box sx={{ display: 'flex', gap: 2 }}>
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
            </Box>
          ) : (
            // EDIT MODE - Save і Cancel кнопки в окремій формі
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={loading}
                >
                  {loading ? t('profile.saving') : t('profile.saveButton')}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={loading}
                >
                  {t('profile.cancelButton')}
                </Button>
              </Box>
            </Box>
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
