import { FormControl, Select, MenuItem, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LanguageIcon sx={{ color: 'inherit' }} />
      <FormControl size="small" sx={{ minWidth: 80 }}>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          sx={{
            color: 'inherit',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '.MuiSvgIcon-root': {
              color: 'inherit',
            },
          }}
        >
          <MenuItem value="en">🇬🇧 EN</MenuItem>
          <MenuItem value="uk">🇺🇦 UA</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
