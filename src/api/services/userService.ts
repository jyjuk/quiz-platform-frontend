import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import type {
  User,
  UserUpdateRequest,
  UsersListResponse,
  PaginationParams,
} from '../../types/user';

export const userService = {
  getAllUsers: async (params?: PaginationParams): Promise<UsersListResponse> => {
    const response = await axiosInstance.get<{ users: User[]; total: number }>(
      API_ENDPOINTS.USERS.LIST,
      {
        params: {
          skip: params?.skip || 0,
          limit: params?.limit || 10,
        },
      }
    );
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get<User>(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<User>(API_ENDPOINTS.USERS.ME);
    return response.data;
  },

  updateOwnProfile: async (data: UserUpdateRequest): Promise<User> => {
    const response = await axiosInstance.put<User>(API_ENDPOINTS.USERS.ME, data);
    return response.data;
  },

  deleteOwnProfile: async (): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.USERS.ME);
  },
};
