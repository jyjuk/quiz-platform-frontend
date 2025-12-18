import { Typography, Grid, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageContainer from '../components/PageContainer';
import UserCard from '../components/UserCard';
import { mockUsers } from '../utils/mockData';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UsersListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    </PageContainer>
  );
};

export default UsersListPage;
