import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Company } from '../../types/company';

interface CompaniesState {
  companies: Company[];
  currentCompany: Company | null;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  currentCompany: null,
  total: 0,
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<{ companies: Company[]; total: number }>) => {
      state.companies = action.payload.companies;
      state.total = action.payload.total;
      state.loading = false;
      state.error = null;
    },

    setCurrentCompany: (state, action: PayloadAction<Company | null>) => {
      state.currentCompany = action.payload;
      state.loading = false;
      state.error = null;
    },

    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.unshift(action.payload);
      state.total += 1;
    },

    updateCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
      if (state.currentCompany?.id === action.payload.id) {
        state.currentCompany = action.payload;
      }
    },

    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter((c) => c.id !== action.payload);
      state.total -= 1;
      if (state.currentCompany?.id === action.payload) {
        state.currentCompany = null;
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCompanies,
  setCurrentCompany,
  addCompany,
  updateCompany,
  removeCompany,
  setLoading,
  setError,
  clearError,
} = companiesSlice.actions;

export default companiesSlice.reducer;
