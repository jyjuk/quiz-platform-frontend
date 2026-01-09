// src/api/services/companyService.ts

import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import type {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  CompaniesListResponse,
  CompanyMember,
  AddMemberRequest,
} from '../../types/company';

export const companyService = {
  /**
   * Get all companies with pagination
   */
  getAllCompanies: async (params?: {
    skip?: number;
    limit?: number;
  }): Promise<CompaniesListResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.COMPANIES.LIST, {
      params,
    });
    return response.data;
  },

  /**
   * Get company by ID
   */
  getCompanyById: async (id: string): Promise<Company> => {
    const response = await axiosInstance.get(API_ENDPOINTS.COMPANIES.BY_ID(id));
    return response.data;
  },

  /**
   * Create new company (requires authentication)
   */
  createCompany: async (data: CreateCompanyRequest): Promise<Company> => {
    const response = await axiosInstance.post(API_ENDPOINTS.COMPANIES.CREATE, data);
    return response.data;
  },

  /**
   * Update company (owner only)
   */
  updateCompany: async (id: string, data: UpdateCompanyRequest): Promise<Company> => {
    const response = await axiosInstance.put(API_ENDPOINTS.COMPANIES.UPDATE(id), data);
    return response.data;
  },

  /**
   * Delete company (owner only)
   */
  deleteCompany: async (id: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.COMPANIES.DELETE(id));
  },

  /**
   * Get company members
   */
  getCompanyMembers: async (id: string): Promise<CompanyMember[]> => {
    const response = await axiosInstance.get(API_ENDPOINTS.COMPANIES.MEMBERS(id));
    return response.data;
  },

  /**
   * Add member to company (owner only)
   */
  addMember: async (companyId: string, data: AddMemberRequest): Promise<void> => {
    await axiosInstance.post(API_ENDPOINTS.COMPANIES.ADD_MEMBER(companyId), data);
  },

  /**
   * Remove member from company (owner or self)
   */
  removeMember: async (companyId: string, userId: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.COMPANIES.REMOVE_MEMBER(companyId, userId));
  },

  /**
   * Get user's companies (includes private companies if user is owner/member)
   * Uses backend endpoint: GET /users/{user_id}/companies
   */
  getUserCompanies: async (userId: string): Promise<Company[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.USERS.COMPANIES(userId));

      const companies = response.data.companies || [];

      return companies;
    } catch (error: any) {
      return [];
    }
  },
};
