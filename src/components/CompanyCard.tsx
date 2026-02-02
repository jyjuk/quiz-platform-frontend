import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import type { Company } from '../types';
import { useNavigate } from 'react-router-dom';
import { getCompanyOwnerName } from '../utils/mockData';
import { useTranslation } from 'react-i18next';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const navigate = useNavigate();
  const ownerName = getCompanyOwnerName(company.owner_id);
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/companies/${company.id}`);
  };

  return (
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
          <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{company.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {t('companies.by')} {ownerName}
            </Typography>
          </Box>
          <Chip
            icon={company.is_visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            label={company.is_visible ? t('companies.public') : t('companies.private')}
            color={company.is_visible ? 'success' : 'default'}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
          {company.description || t('companies.noDescription')}
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          {t('companies.created')}: {new Date(company.created_at).toLocaleDateString()}
        </Typography>

        <Button variant="contained" fullWidth onClick={handleClick}>
          {t('companies.viewDetails')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
