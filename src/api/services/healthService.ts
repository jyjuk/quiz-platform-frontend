import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  version?: string;
  database?: string;
  redis?: string;
}

export const healthService = {
  checkHealth: async (): Promise<HealthCheckResponse> => {
    try {
      const response = await axiosInstance.get<HealthCheckResponse>(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },
};
