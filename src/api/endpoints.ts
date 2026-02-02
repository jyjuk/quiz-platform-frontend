export const API_ENDPOINTS = {
  HEALTH: '/',

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  USERS: {
    LIST: '/users',
    ME: '/users/me',
    BY_ID: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    COMPANIES: (id: string) => `/users/${id}/companies`,
  },

  COMPANIES: {
    LIST: '/companies',
    BY_ID: (id: string) => `/companies/${id}`,
    CREATE: '/companies',
    UPDATE: (id: string) => `/companies/${id}`,
    DELETE: (id: string) => `/companies/${id}`,
    MEMBERS: (id: string) => `/companies/${id}/members`,
    ADD_MEMBER: (id: string) => `/companies/${id}/members`,
    REMOVE_MEMBER: (companyId: string, userId: string) =>
      `/companies/${companyId}/members/${userId}`,
  },
} as const;
