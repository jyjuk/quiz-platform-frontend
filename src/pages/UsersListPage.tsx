import {
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageContainer from '../components/PageContainer';
import UserCard from '../components/UserCard';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers, setPage } from '../store/slices/usersSlice';

const UsersListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const { users, total, skip, limit, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ skip, limit }));
  }, [dispatch, skip, limit]);

  const handlePageChange = (newSkip: number) => {
    dispatch(setPage({ skip: newSkip, limit }));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <PageContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          {t('users.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('users.subtitle')}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder={t('users.searchPlaceholder')}
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

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {t('users.totalUsers')} {filteredUsers.length}
      </Typography>

      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>

      {filteredUsers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {t('users.noUsersFound')}
          </Typography>
        </Box>
      )}

      <Pagination total={total} skip={skip} limit={limit} onPageChange={handlePageChange} />
    </PageContainer>
  );
};

export default UsersListPage;
