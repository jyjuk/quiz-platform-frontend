import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
  phone?: string;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        user: { id: string; username: string; email: string };
      }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },

    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        username: string;
        email: string;
        first_name?: string;
        last_name?: string;
        bio?: string;
        avatar_url?: string;
        phone?: string;
      }>
    ) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
