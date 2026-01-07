import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAppDispatch } from '../store/hooks';
import { setCredentials, setUser } from '../store/slices/authSlice';
import { authService } from '../api/services/authService';
import { useState } from 'react';

const registerSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError('');

    try {
      await authService.register({
        email: data.email,
        username: data.username,
        password: data.password,
      });
      const authResponse = await authService.login({
        email: data.email,
        password: data.password,
      });
      localStorage.setItem('token', authResponse.access_token);
      localStorage.setItem('refreshToken', authResponse.refresh_token);
      const userData = await authService.getCurrentUser();
      dispatch(
        setCredentials({
          token: authResponse.access_token,
          refreshToken: authResponse.refresh_token,
          user: {
            id: userData.id,
            username: userData.username,
            email: userData.email,
          },
        })
      );

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
      navigate('/');
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response?.data?.detail || 'User already exists');
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setError(`${provider} login coming soon!`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 450,
          width: '100%',
          mx: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="primary">
          Create Account
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
          Sign up to get started
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            autoComplete="username"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register('username')}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            margin="normal"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography component="span" color="primary" sx={{ fontWeight: 600 }}>
                  Sign In
                </Typography>
              </Link>
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialLogin('Google')}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={() => handleSocialLogin('GitHub')}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
