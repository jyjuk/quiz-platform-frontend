export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  description: string | null;
  is_visible: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyWithOwner extends Company {
  owner?: User;
  members_count?: number;
  quizzes_count?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
