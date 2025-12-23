import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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
    const response = await axiosInstance.get<UserResponse>(API_ENDPOINTS.AUTH.ME);
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
