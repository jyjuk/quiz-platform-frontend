export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;

  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
  phone?: string;
}

export interface UserUpdateRequest {
  username?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
  phone?: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
}
