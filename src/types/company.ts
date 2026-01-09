export interface Company {
  id: string;
  name: string;
  description: string | null;
  is_visible: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyRequest {
  name: string;
  description?: string | null;
  is_visible?: boolean;
}

export interface UpdateCompanyRequest {
  name?: string;
  description?: string | null;
  is_visible?: boolean;
}

export interface CompanyMember {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  joined_at: string;
}

export interface CompaniesListResponse {
  companies: Company[];
  total: number;
}

export interface AddMemberRequest {
  user_id: string;
}
