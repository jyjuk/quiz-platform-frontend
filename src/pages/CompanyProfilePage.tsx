import { Typography, Box, Paper, Grid, Chip, Button, Divider } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import PageContainer from '../components/PageContainer';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById, getUserById, getCompanyOwnerName } from '../utils/mockData';

const CompanyProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const company = id ? getCompanyById(id) : undefined;
  const owner = company ? getUserById(company.owner_id) : undefined;
  const ownerName = company ? getCompanyOwnerName(company.owner_id) : 'Unknown';

  if (!company) {
    return (
      <PageContainer>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Company Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The company you're looking for doesn't exist.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/companies')}>
            Back to Companies
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Button variant="outlined" onClick={() => navigate('/companies')} sx={{ mb: 3 }}>
        ← Back to Companies
      </Button>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BusinessIcon sx={{ fontSize: 60, color: 'primary.main', mr: 3 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {company.name}
            </Typography>
            <Chip
              icon={company.is_visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              label={company.is_visible ? 'Public' : 'Private'}
              color={company.is_visible ? 'success' : 'default'}
            />
          </Box>
        </Box>

        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          {company.description || 'No description available'}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <CalendarTodayIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Created
              </Typography>
              <Typography variant="body1">
                {new Date(company.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <PersonIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Owner
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate(`/users/${company.owner_id}`)}
                sx={{ textTransform: 'none' }}
              >
                {ownerName}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Company Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Company ID
                </Typography>
                <Typography variant="body1">{company.id}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Visibility
                </Typography>
                <Typography variant="body1">
                  {company.is_visible ? 'Public - Visible to everyone' : 'Private - Members only'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Owner Email
                </Typography>
                <Typography variant="body1">{owner?.email || 'N/A'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Created At
                </Typography>
                <Typography variant="body1">
                  {new Date(company.created_at).toLocaleString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body1">
                  {new Date(company.updated_at).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" fullWidth disabled>
                View Quizzes (Coming Soon)
              </Button>
              <Button variant="outlined" fullWidth disabled>
                View Members (Coming Soon)
              </Button>
              <Button variant="outlined" fullWidth disabled>
                Join Company (Coming Soon)
              </Button>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Note: These features will be available in future updates
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CompanyProfilePage;
