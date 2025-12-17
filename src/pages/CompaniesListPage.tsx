import {
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import PageContainer from '../components/PageContainer';
import CompanyCard from '../components/CompanyCard';
import { mockCompanies } from '../utils/mockData';
import { useState } from 'react';

const CompaniesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCompanies = mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Companies
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore companies and their quiz programs
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Search companies..."
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
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="grid">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Total Companies: {filteredCompanies.length}
      </Typography>

      <Grid container spacing={3}>
        {filteredCompanies.map((company) => (
          <Grid
            item
            xs={12}
            sm={viewMode === 'grid' ? 6 : 12}
            md={viewMode === 'grid' ? 4 : 12}
            key={company.id}
          >
            <CompanyCard company={company} />
          </Grid>
        ))}
      </Grid>

      {filteredCompanies.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No companies found matching your search
          </Typography>
        </Box>
      )}
    </PageContainer>
  );
};

export default CompaniesListPage;
