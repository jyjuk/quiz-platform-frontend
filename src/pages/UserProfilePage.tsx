import { useState } from 'react';
import { Typography, Box, Paper, Grid, Chip, Avatar, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from '../components/PageContainer';
import Modal from '../components/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, getCompaniesByOwner } from '../utils/mockData';
import CompanyCard from '../components/CompanyCard';

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = id ? getUserById(id) : undefined;
  const userCompanies = id ? getCompaniesByOwner(id) : [];
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (!user) {
    return (
      <PageContainer>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            User Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The user you're looking for doesn't exist.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/users')}>
            Back to Users
          </Button>
        </Box>
      </PageContainer>
    );
  }

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
    alert(`Account "${user.username}" deleted (demo only)`);
    navigate('/users');
  };

  return (
    <PageContainer>
      <Button variant="outlined" onClick={() => navigate('/users')} sx={{ mb: 3 }}>
        ← Back to Users
      </Button>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 100, height: 100, fontSize: 40, mr: 3 }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
            <Chip
              icon={user.is_active ? <CheckCircleIcon /> : <CancelIcon />}
              label={user.is_active ? 'Active' : 'Inactive'}
              color={user.is_active ? 'success' : 'default'}
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Member Since
                </Typography>
                <Typography variant="body1">
                  {new Date(user.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>
            Account Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" disabled>
              Edit Profile (Coming Soon)
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete Account (Demo)
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <BusinessIcon color="primary" />
        <Typography variant="h5">Companies Owned ({userCompanies.length})</Typography>
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
            This user hasn't created any companies yet.
          </Typography>
        </Paper>
      )}

      {/* Delete Account Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account"
        maxWidth="sm"
        actions={
          <>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </>
        }
      >
        <Box>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete the account <strong>{user.username}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This action cannot be undone. All associated data will be permanently deleted.
          </Typography>
          <Box
            sx={{
              p: 2,
              mt: 2,
              bgcolor: 'error.light',
              color: 'error.contrastText',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">
              <strong>Warning:</strong> This is a demo only. No actual deletion will occur.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default UserProfilePage;
