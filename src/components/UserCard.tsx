import { Card, CardContent, Typography, Avatar, Chip, Box } from '@mui/material';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
          <Chip
            label={user.is_active ? t('users.active') : t('users.inactive')}
            color={user.is_active ? 'success' : 'default'}
            size="small"
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          {t('users.joined')} {new Date(user.created_at).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
