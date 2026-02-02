import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import type { LoginRequest, RegisterRequest, AuthResponse, UserResponse } from '../../types/auth';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<UserResponse> => {
    const response = await axiosInstance.post<UserResponse>(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  },

  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await axiosInstance.get<UserResponse>(API_ENDPOINTS.USERS.ME);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken,
    });
    return response.data;
  },
};
