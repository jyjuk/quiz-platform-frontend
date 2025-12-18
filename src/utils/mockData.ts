import type { User, Company } from '../types';

export const mockUsers: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    username: 'john_doe',
    email: 'john@example.com',
    is_active: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    username: 'jane_smith',
    email: 'jane@example.com',
    is_active: true,
    created_at: '2024-02-20T14:20:00Z',
    updated_at: '2024-02-20T14:20:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    username: 'bob_wilson',
    email: 'bob@example.com',
    is_active: true,
    created_at: '2024-03-10T09:15:00Z',
    updated_at: '2024-03-10T09:15:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    username: 'alice_brown',
    email: 'alice@example.com',
    is_active: true,
    created_at: '2024-01-25T16:45:00Z',
    updated_at: '2024-01-25T16:45:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    username: 'charlie_davis',
    email: 'charlie@example.com',
    is_active: false,
    created_at: '2024-04-05T11:30:00Z',
    updated_at: '2024-04-05T11:30:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    username: 'emma_johnson',
    email: 'emma@example.com',
    is_active: true,
    created_at: '2024-03-18T13:25:00Z',
    updated_at: '2024-03-18T13:25:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    username: 'david_miller',
    email: 'david@example.com',
    is_active: true,
    created_at: '2024-02-12T08:50:00Z',
    updated_at: '2024-02-12T08:50:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    username: 'sophia_garcia',
    email: 'sophia@example.com',
    is_active: true,
    created_at: '2024-04-22T15:10:00Z',
    updated_at: '2024-04-22T15:10:00Z',
  },
];

export const mockCompanies: Company[] = [
  {
    id: '650e8400-e29b-41d4-a716-446655440001',
    name: 'Tech Innovators',
    description: 'Leading technology company focused on AI and machine learning solutions',
    is_visible: true,
    owner_id: '550e8400-e29b-41d4-a716-446655440001',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-01-10T08:00:00Z',
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440002',
    name: 'Digital Solutions Inc',
    description: 'Full-stack development and consulting services for modern businesses',
    is_visible: true,
    owner_id: '550e8400-e29b-41d4-a716-446655440004',
    created_at: '2024-02-01T10:30:00Z',
    updated_at: '2024-02-01T10:30:00Z',
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440003',
    name: 'Cloud Experts',
    description: 'Cloud infrastructure and DevOps specialists helping companies scale',
    is_visible: true,
    owner_id: '550e8400-e29b-41d4-a716-446655440001',
    created_at: '2024-01-20T14:15:00Z',
    updated_at: '2024-01-20T14:15:00Z',
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440004',
    name: 'Data Analytics Pro',
    description: 'Big data analysis and business intelligence solutions for enterprises',
    is_visible: false,
    owner_id: '550e8400-e29b-41d4-a716-446655440002',
    created_at: '2024-03-15T09:45:00Z',
    updated_at: '2024-03-15T09:45:00Z',
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440005',
    name: 'Cyber Security Team',
    description: 'Security audits, penetration testing, and compliance services',
    is_visible: true,
    owner_id: '550e8400-e29b-41d4-a716-446655440004',
    created_at: '2024-02-10T13:20:00Z',
    updated_at: '2024-02-10T13:20:00Z',
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440006',
    name: 'Mobile Dev Studio',
    description: 'iOS and Android application development for startups and enterprises',
    is_visible: true,
    owner_id: '550e8400-e29b-41d4-a716-446655440007',
    created_at: '2024-03-05T11:00:00Z',
    updated_at: '2024-03-05T11:00:00Z',
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440007',
    name: 'UX Design Masters',
    description: 'User experience design and research for digital products',
    is_visible: true,
    owner_id: '550e8400-e29b-41d4-a716-446655440007',
    created_at: '2024-04-01T16:30:00Z',
    updated_at: '2024-04-01T16:30:00Z',
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440008',
    name: 'Blockchain Builders',
    description: null,
    is_visible: false,
    owner_id: '550e8400-e29b-41d4-a716-446655440001',
    created_at: '2024-03-28T10:15:00Z',
    updated_at: '2024-03-28T10:15:00Z',
  },
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const getCompanyById = (id: string): Company | undefined => {
  return mockCompanies.find((company) => company.id === id);
};

export const getCompaniesByOwner = (ownerId: string): Company[] => {
  return mockCompanies.filter((company) => company.owner_id === ownerId);
};

export const getVisibleCompanies = (): Company[] => {
  return mockCompanies.filter((company) => company.is_visible);
};

export const getActiveUsers = (): User[] => {
  return mockUsers.filter((user) => user.is_active);
};

export const searchUsers = (query: string): User[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchCompanies = (query: string): Company[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(lowercaseQuery) ||
      (company.description && company.description.toLowerCase().includes(lowercaseQuery))
  );
};

export const getCompanyOwnerName = (ownerId: string): string => {
  const owner = getUserById(ownerId);
  return owner?.username || 'Unknown';
};
