import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { companyService } from '../api/services/companyService';
import { useAppDispatch } from '../store/hooks';
import { addCompany } from '../store/slices/companiesSlice';
import { useTranslation } from 'react-i18next';

interface CreateCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

interface CreateCompanyFormData {
  name: string;
  description: string;
  is_visible: boolean;
}

const createCompanySchema = yup.object({
  name: yup
    .string()
    .min(3, 'Company name must be at least 3 characters')
    .max(100, 'Company name must not exceed 100 characters')
    .required('Company name is required'),
  description: yup.string().max(500, 'Description must not exceed 500 characters'),
  is_visible: yup.boolean(),
});

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCompanyFormData>({
    resolver: yupResolver(createCompanySchema),
    defaultValues: {
      name: '',
      description: '',
      is_visible: true,
    },
  });

  const onSubmit = async (data: CreateCompanyFormData) => {
    setLoading(true);
    setError(null);

    try {
      const newCompany = await companyService.createCompany({
        name: data.name,
        description: data.description || null,
        is_visible: data.is_visible,
      });

      dispatch(addCompany(newCompany));
      reset();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      reset();
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('companies.createCompany')}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            {...register('name')}
            label={t('companies.companyName')}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={loading}
            required
            autoFocus
          />

          <TextField
            {...register('description')}
            label={t('companies.description')}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={loading}
            placeholder={t('companies.descriptionPlaceholder')}
          />

          <Box sx={{ mt: 2 }}>
            <Controller
              name="is_visible"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled={loading}
                    />
                  }
                  label={t('companies.visibleToPublic')}
                />
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? t('common.creating') : t('common.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCompanyModal;
