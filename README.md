# Quiz Platform - Frontend

React + TypeScript + Material UI application for Quiz Management System.

## 🚀 Getting Started

### Prerequisites

- Node.js 22.12+ (or 20.19+)
- npm 10+
- Docker Desktop (for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone git@github.com:jyjuk/quiz-platform-frontend.git
cd quiz-platform-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.sample`:
```bash
cp .env.sample .env
```

4. Fill in the `.env` file with your configuration values.

### Running the Application

**Development mode:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

**Production build:**
```bash
npm run build
npm run preview
```

### Code Formatting
```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## 📁 Project Structure
```
src/
├── api/                         # API services and HTTP clients
│   ├── axios.ts                 # Configured Axios instance with interceptors
│   ├── endpoints.ts             # API endpoint constants
│   └── services/
│       ├── authService.ts       # Authentication API service
│       ├── userService.ts       # User CRUD API service
│       └── companyService.ts    # Company CRUD API service
├── components/                  # Reusable UI components
│   ├── AppBar.tsx               # Navigation bar with auth state and user avatar
│   ├── ConfirmDialog.tsx        # Reusable confirmation dialog
│   ├── LanguageSwitcher.tsx     # Language selector component
│   ├── Pagination.tsx           # Universal pagination component
│   ├── ProtectedRoute.tsx       # Route guard for authenticated routes
│   ├── CreateCompanyModal.tsx   # Modal for creating new company
│   └── EditCompanyModal.tsx     # Modal for editing company
├── i18n/                        # Internationalization
│   └── locales/
│       ├── en/
│       │   └── translation.json # English translations
│       └── uk/
│           └── translation.json # Ukrainian translations
├── pages/                       # Page components
│   ├── HomePage.tsx             # Landing page with quick links
│   ├── AboutPage.tsx            # Platform information
│   ├── LoginPage.tsx            # User login with React Hook Form + Yup
│   ├── RegisterPage.tsx         # User registration with RHF + Yup
│   ├── MyProfilePage.tsx        # Edit/delete own profile with RHF
│   ├── UserProfilePage.tsx      # View user profiles with companies list
│   ├── UsersPage.tsx            # User list with pagination and search
│   ├── CompaniesPage.tsx        # Companies list with pagination
│   ├── CompanyDetailsPage.tsx   # View/edit/delete company
│   ├── ReduxTestPage.tsx        # Redux Toolkit test demonstration
│   ├── HealthCheckPage.tsx      # Backend health check page
│   └── NotFoundPage.tsx         # 404 error page
├── store/                       # Redux Toolkit state management
│   ├── index.ts                 # Store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── slices/
│       ├── testSlice.ts         # Test slice (demonstration)
│       ├── authSlice.ts         # Authentication state slice
│       ├── usersSlice.ts        # Users state management
│       └── companiesSlice.ts    # Companies state management
├── types/                       # TypeScript type definitions
│   ├── auth.ts                  # Auth types
│   ├── user.ts                  # User types with extended fields
│   └── company.ts               # Company and member type
├── utils/                       # Helper functions
│   └── i18n.ts                  # i18next configuration
└── theme.ts                     # Material UI theme configuration
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material UI** - Component library
- **React Router** - Client-side routing
- **React Hook Form** - Form management with validation
- **Yup** - Schema-based form validation
- **Axios** - HTTP client
- **Redux Toolkit** - State management
- **React i18next** - Internationalization framework

## 📦 Key Dependencies

### Production
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "@mui/material": "^6.3.0",
  "@mui/icons-material": "^6.3.0",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "axios": "^1.7.9",
  "react-hook-form": "^7.54.2",
  "yup": "^1.6.1",
  "@hookform/resolvers": "^3.9.1",
  "i18next": "^24.2.0",
  "react-i18next": "^15.2.0",
  "@reduxjs/toolkit": "^2.5.0",
  "react-redux": "^9.2.0"
}
```

### Development
```json
{
  "typescript": "~5.6.2",
  "vite": "^7.3.0",
  "@vitejs/plugin-react": "^5.1.2",
  "prettier": "^3.4.2"
}
```

## 📝 Environment Variables

See `.env.sample` for required environment variables.

**Example `.env` file:**
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
VITE_APP_NAME=Quiz Platform
VITE_APP_VERSION=1.0.0
```

## 🔗 Backend API

Backend repository: [Quiz Platform Backend](https://github.com/jyjuk/backend-internship)

**Local Backend:**
- API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- OpenAPI Schema: `http://localhost:8000/openapi.json`

## 📝 Form Validation (React Hook Form + Yup)

### Overview

All forms use **React Hook Form** with **Yup** validation for:
- Type-safe form handling
- Schema-based validation
- Optimal performance (minimal re-renders)
- Better UX with real-time validation
- Easy error handling

### Validation Schemas

**LoginPage:**
```typescript
const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
```

**RegisterPage:**
```typescript
const registerSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().min(3, 'Username must be at least 3 characters').max(50, 'Username must not exceed 50 characters').required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});
```

**MyProfilePage:**
```typescript
const profileSchema = yup.object({
  username: yup.string().min(3).max(50).required('Username is required'),
  first_name: yup.string().max(50).nullable(),
  last_name: yup.string().max(50).nullable(),
  bio: yup.string().max(500).nullable(),
  avatar_url: yup.string().url('Must be a valid URL').nullable(),
  phone: yup.string().matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number').nullable(),
});
```

### Usage Example
```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(mySchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('fieldName')}
        error={!!errors.fieldName}
        helperText={errors.fieldName?.message}
      />
    </form>
  );
};
```

### Validation Modes

- `onBlur` - Validates when field loses focus (used in forms)
- `onChange` - Real-time validation on every change
- `onSubmit` - Only validates on form submission

### Benefits

- **Type-safe** - Full TypeScript support
- **Performance** - Minimal re-renders
- **DX** - Clean and simple API
- **Schema-based** - Reusable validation logic
- **Error handling** - Built-in error messages
- **Integration** - Works seamlessly with Material UI

## 🔐 Authentication & Authorization

### Overview

Complete JWT-based authentication system with token management, route protection, and automatic token expiry handling.

### Features

- **JWT Authentication** - Email/password login with access and refresh tokens
- **User Registration** - Form validation with React Hook Form + Yup
- **Protected Routes** - Route guards for authenticated-only pages
- **Token Management** - Automatic token storage and refresh
- **Token Expiry** - Auto logout when token expires
- **Persistent Auth** - State preserved across browser sessions

### Authentication Flow
```
User Registration
    ↓
POST /users/ (username, email, password)
    ↓
Auto-login → POST /auth/login → tokens
    ↓
GET /users/me → user data
    ↓
Redux: setCredentials(tokens + user)
    ↓
localStorage: save tokens
    ↓
Navigate to home page
```

### Authentication State (Redux)

**Location:** `src/store/slices/authSlice.ts`

**State Structure:**
```typescript
{
  token: string | null,           // JWT access token
  refreshToken: string | null,    // JWT refresh token
  isAuthenticated: boolean,       // Auth status
  user: {
    id: string,
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
    bio?: string,
    avatar_url?: string,
    phone?: string
  } | null
}
```

**Actions:**
- `setCredentials(tokens, user)` - Store auth data after login
- `setUser(user)` - Update user information
- `logout()` - Clear auth state and localStorage

### Authentication Pages

#### Login Page

**URL:** `/login`

**Features:**
- Email and password fields with React Hook Form
- Yup validation (email format, password min 6 chars)
- Show/hide password toggle
- Real-time error messages
- Loading state
- Auto-login after successful authentication
- Link to registration
- Social login buttons (UI only)

**API Integration:**
```typescript
POST /auth/login
Body: { email, password }
Response: { access_token, refresh_token, token_type }
```

#### Registration Page

**URL:** `/register`

**Features:**
- Username, email, password, confirm password fields
- React Hook Form + Yup validation:
  - Username: 3-50 characters
  - Email: valid email format
  - Password: minimum 6 characters
  - Passwords must match
- Show/hide password toggles
- Real-time error messages
- Loading state
- Auto-login after successful registration
- Link to login
- Social registration buttons (UI only)

**API Integration:**
```typescript
POST /users/
Body: { username, email, password }
Response: User object
```

#### My Profile Page

**URL:** `/profile`

**Features:**
- View own profile information
- Edit profile with React Hook Form:
  - Username (3-50 chars, required)
  - First name (max 50 chars)
  - Last name (max 50 chars)
  - Bio (max 500 chars)
  - Phone (international format)
  - Avatar URL (valid URL)
- Yup validation for all fields
- Real-time error messages
- Delete own account with confirmation dialog
- Loading states
- Success/error feedback

**API Integration:**
```typescript
GET /users/me - Get current user
PUT /users/me - Update own profile
DELETE /users/me - Delete own account
```

#### Users List Page

**URL:** `/users`

**Features:**
- Paginated user list (10 per page)
- Search by username or email
- User cards with:
  - Avatar (first letter of username)
  - Username and email
  - Active/Inactive status
- Click to view detailed profile
- Universal pagination component

**API Integration:**
```typescript
GET /users?skip=0&limit=10 - Get paginated users
```

#### User Profile Page

**URL:** `/users/:id`

**Features:**
- View any user's profile
- User information display:
  - Username, email
  - First name, last name
  - Bio
  - Phone number
  - Avatar URL
  - Active status
  - Created/Updated timestamps
- Read-only view for other users
- "Edit Profile" button for own profile

**API Integration:**
```typescript
GET /users/:id - Get user by ID
```

### Company Management

**Features:**
-  View all public companies with pagination
-  Create new company (authenticated users)
-  Edit company details (owner only)
-  Delete company (owner only)
-  View company details page
-  Company visibility control (public/private)
-  Display user's companies on profile page with privacy controls

**Privacy Rules:**
- **Own profile**: Shows ALL companies (public + private)
- **Other user's profile**: Shows ONLY public companies
- **Unauthenticated access**: Shows ONLY public companies

**Pages:**

#### Companies List Page
**URL:** `/companies`

**Features:**
- Grid view of all public companies
- Pagination (12 companies per page)
- Company cards with:
  - Company name and description
  - Public/Private visibility badge
  - Owner badge (if viewing own company)
  - View Details button
- Create Company button (authenticated users)
- Responsive grid layout

**API Integration:**
```typescript
GET /companies?skip=0&limit=12 - Get paginated public companies
```

#### Company Details Page
**URL:** `/companies/:id`

**Features:**
- View company information:
  - Name, description
  - Visibility status (Public/Private)
  - Owner information with link to profile
  - Created/Updated timestamps
- Edit button (owner only)
- Delete button with confirmation (owner only)
- Back to Companies button
- Loading and error states

**API Integration:**
```typescript
GET /companies/:id - Get company by ID
PUT /companies/:id - Update company (owner only)
DELETE /companies/:id - Delete company (owner only)
```

#### User Profile Companies Section
**URL:** `/users/:id` (companies section)

**Features:**
- Display user's companies on their profile
- Grid view of companies (3 columns)
- Company cards show:
  - Name and description
  - Public/Private badge
  - Owner/Member badge
  - View Details button
  - Leave Company button (members only, not owner)
- Privacy-aware display:
  - Own profile: ALL companies visible
  - Other profiles: ONLY public companies
- Leave company with confirmation dialog

**API Integration:**
```typescript
GET /users/:id/companies - Get user's companies with privacy rules
DELETE /companies/:id/members/:userId - Leave company
```

#### Create Company Modal

**Features:**
- Modal dialog form
- Fields:
  - Company name (3-100 characters, required)
  - Description (max 500 characters, required)
  - Visibility toggle (public by default)
- React Hook Form + Yup validation
- Real-time error messages
- Loading state during creation
- Auto-refresh companies list on success

**Validation:**
```typescript
const companySchema = yup.object({
  name: yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters')
    .required('Company name is required'),
  description: yup.string()
    .max(500, 'Description must not exceed 500 characters')
    .required('Description is required'),
  is_visible: yup.boolean().required(),
});
```

**API Integration:**
```typescript
POST /companies/ - Create new company
Body: { name, description, is_visible }
```

#### Edit Company Modal

**Features:**
- Pre-filled form with current company data
- Same validation as Create modal
- Visibility toggle to make company public/private
- Save and Cancel buttons
- Loading state during update
- Owner-only access (403 for non-owners)

**API Integration:**
```typescript
PUT /companies/:id - Update company details
Body: { name?, description?, is_visible? }
```

**Components:**

**CreateCompanyModal** (`src/components/CreateCompanyModal.tsx`):
- Reusable modal for creating companies
- Form validation with React Hook Form + Yup
- Material UI styled components
- Props:
  - `open` - Modal visibility state
  - `onClose` - Close handler
  - `onSuccess` - Success callback after creation

**EditCompanyModal** (`src/components/EditCompanyModal.tsx`):
- Reusable modal for editing companies
- Pre-filled with existing company data
- Same validation as Create modal
- Props:
  - `open` - Modal visibility state
  - `company` - Current company data
  - `onClose` - Close handler
  - `onSuccess` - Success callback after update

**State Management:**

**Companies Slice** (`src/store/slices/companiesSlice.ts`):
```typescript
{
  companies: Company[],
  currentCompany: Company | null,
  loading: boolean,
  error: string | null,
  total: number
}
```

**Actions:**
- `setCompanies(companies, total)` - Set companies list
- `setCurrentCompany(company)` - Set selected company
- `addCompany(company)` - Add new company to list
- `updateCompany(company)` - Update company in list
- `removeCompany(id)` - Remove company from list
- `setLoading(boolean)` - Set loading state
- `setError(message)` - Set error message
- `clearError()` - Clear error message

**Types:**

**Company Types** (`src/types/company.ts`):
```typescript
interface Company {
  id: string;
  name: string;
  description: string;
  is_visible: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

interface CompanyMember {
  id: string;
  user_id: string;
  company_id: string;
  is_admin: boolean;
  created_at: string;
}
```

**API Service:**

**Company Service** (`src/api/services/companyService.ts`):
```typescript
companyService.getAllCompanies({ skip, limit })
companyService.getCompanyById(id)
companyService.createCompany({ name, description, is_visible })
companyService.updateCompany(id, { name, description, is_visible })
companyService.deleteCompany(id)
companyService.getUserCompanies(userId) // With privacy rules
companyService.getCompanyMembers(id)
companyService.removeMember(companyId, userId)
```

**Endpoints:**
```typescript
COMPANIES: {
  LIST: '/companies',
  BY_ID: (id: string) => `/companies/${id}`,
  CREATE: '/companies',
  UPDATE: (id: string) => `/companies/${id}`,
  DELETE: (id: string) => `/companies/${id}`,
  MEMBERS: (id: string) => `/companies/${id}/members`,
  REMOVE_MEMBER: (companyId: string, userId: string) => 
    `/companies/${companyId}/members/${userId}`,
},
USERS: {
  // ... existing endpoints
  COMPANIES: (userId: string) => `/users/${userId}/companies`,
}
```

### Components

#### Pagination Component

**Location:** `src/components/Pagination.tsx`

**Features:**
- Universal and reusable across the app
- Props:
  - `total` - Total items count
  - `page` - Current page (1-indexed)
  - `rowsPerPage` - Items per page
  - `onPageChange` - Page change handler
- UI elements:
  - First/Last page buttons
  - Previous/Next page buttons
  - Page number display
  - Disabled states for boundaries
  - Responsive design

**Usage:**
```typescript
<Pagination
  total={50}
  page={1}
  rowsPerPage={10}
  onPageChange={(newPage) => setPage(newPage)}
/>
```

#### ConfirmDialog Component

**Location:** `src/components/ConfirmDialog.tsx`

**Features:**
- Reusable confirmation dialog
- Props:
  - `open` - Dialog visibility
  - `title` - Dialog title
  - `message` - Confirmation message
  - `onConfirm` - Confirm action handler
  - `onCancel` - Cancel action handler
  - `confirmText` - Confirm button text (default: "Confirm")
  - `cancelText` - Cancel button text (default: "Cancel")
  - `loading` - Loading state for async operations
- Used in profile deletion confirmation

**Usage:**
```typescript
<ConfirmDialog
  open={dialogOpen}
  title="Delete Account"
  message="Are you sure you want to delete your account?"
  onConfirm={handleDelete}
  onCancel={() => setDialogOpen(false)}
  loading={deleteLoading}
/>
```

### Protected Routes

**Component:** `src/components/ProtectedRoute.tsx`

Wraps routes that require authentication. Redirects to `/login` if not authenticated.

**Protected Routes:**
- `/users` - Users list
- `/users/:id` - User profile
- `/profile` - My profile
- `/companies` - Companies list
- `/companies/:id` - Company profile
- `/redux-test` - Redux test page
- `/health-check` - Health check page

**Public Routes:**
- `/` - Home page
- `/about` - About page
- `/login` - Login page
- `/register` - Registration page

### Token Management

#### Storage

Tokens stored in:
- **Redux State** - For application use
- **localStorage** - For persistence across sessions

**Keys:**
- `token` - Access token (30 min expiration)
- `refreshToken` - Refresh token (7 days expiration)

#### Axios Interceptor

**Request Interceptor:**
```typescript
// Automatically adds Bearer token to all requests
config.headers.Authorization = `Bearer ${token}`;
```

**Response Interceptor:**
```typescript
// Auto logout on 401 Unauthorized
if (error.response.status === 401) {
  localStorage.clear();
  window.location.href = '/login';
}
```

### AppBar Integration

AppBar adapts based on authentication state:

**Not Authenticated:**
- Shows: Home, About
- Buttons: Login, Register

**Authenticated:**
- Shows: Home, About, Profile, Users, Companies, Redux Test, Health Check
- User Avatar with dropdown menu:
  - Username display
  - Logout button

### API Service

**Location:** `src/api/services/authService.ts`

**Methods:**
```typescript
authService.login({ email, password })
authService.register({ username, email, password })
authService.getCurrentUser()
authService.logout()
authService.refreshToken(refreshToken)
```

**Location:** `src/api/services/userService.ts`

**Methods:**
```typescript
userService.getAllUsers({ skip, limit })
userService.getUserById(id)
userService.getCurrentUser()
userService.updateOwnProfile(data)
userService.deleteOwnProfile()
```

## 🌍 Internationalization (i18n)

### Supported Languages

- **English (EN)** - Default language 🇬🇧
- **Ukrainian (UK)** - Full translation 🇺🇦

### Translation System

The application uses **react-i18next** for internationalization:

- **Automatic language detection** from LocalStorage
- **Language persistence** across browser sessions
- **Instant switching** without page reload
- **100+ translation keys** covering all UI elements
- **Easy to extend** with new languages

### Language Switcher

Located in the AppBar (top navigation):
- **Desktop**: Dropdown selector with flag icons (🇬🇧 EN / 🇺🇦 UA)
- **Mobile**: Available in drawer menu
- **Visual indicator**: Language icon for clarity
- **Persistent selection**: Choice saved in LocalStorage

### Translation Files Structure
```
src/locales/
├── en/
│   └── translation.json     # English translations
└── uk/
    └── translation.json     # Ukrainian translations
```

### Translation Keys Organization
```json
{
  "common": {},      // Buttons, actions, common UI elements
  "nav": {},         // Navigation menu items
  "home": {},        // Home page content
  "about": {},       // About page content
  "users": {},       // Users-related pages
  "profile": {},     // Profile page content
  "companies": {},   // Companies-related pages
  "notFound": {},    // 404 error page
  "footer": {}       // Footer content
}
```

## 🔄 State Management (Redux Toolkit)

### Global State Management

The application uses **Redux Toolkit** for centralized state management:

- **Predictable state updates** through actions and reducers
- **Type-safe** with TypeScript integration
- **DevTools support** for debugging and time-travel
- **Efficient** with built-in performance optimizations
- **Easy to test** with isolated state logic

### Slices

**Auth Slice** (`src/store/slices/authSlice.ts`):
- User authentication state
- Token management
- User profile data

**Users Slice** (`src/store/slices/usersSlice.ts`):
- Users list state
- Pagination state
- Loading states

**Test Slice** (`src/store/slices/testSlice.ts`):
- Demonstration slice
- Test Redux functionality

### Typed Hooks

Custom typed hooks for better TypeScript support:
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
```

## 🌐 HTTP Client (Axios)

### API Communication

The application uses **Axios** for HTTP requests to the backend API:

- **Centralized configuration** with base URL and timeout
- **Request/Response interceptors** for logging and token management
- **Automatic JSON parsing**
- **Global error handling** for common HTTP errors (401, 403, 500)
- **TypeScript types** for all API responses
- **Service layer architecture** for organized API calls

### Axios Instance Configuration

**Location:** `src/api/axios.ts`

**Features:**
```typescript
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 30000, // 30 seconds for bcrypt operations
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**Request Interceptor:**
- Adds Bearer token to all authenticated requests
- Logs all outgoing requests

**Response Interceptor:**
- Logs successful responses
- Handles errors globally (401 → logout, 403 → forbidden, 500+ → server error)

### API Endpoints

**Location:** `src/api/endpoints.ts`

Centralized constants for all API endpoints:
```typescript
export const API_ENDPOINTS = {
  HEALTH: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    LIST: '/users',
    ME: '/users/me',
    BY_ID: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  COMPANIES: {
    LIST: '/companies',
    BY_ID: (id: string) => `/companies/${id}`,
    CREATE: '/companies',
    UPDATE: (id: string) => `/companies/${id}`,
    DELETE: (id: string) => `/companies/${id}`,
  },
};
```

## 🐳 Docker

### Prerequisites

- Docker Desktop installed
- Docker Compose installed

### Building Docker Image

Build the production Docker image:
```bash
docker build -t quiz-platform-frontend .
```

### Running with Docker

#### Option 1: Frontend Only

Run only the frontend container:
```bash
docker run -d -p 3000:80 --name quiz-platform-frontend quiz-platform-frontend
```

The application will be available at `http://localhost:3000`

#### Option 2: Full Stack (Frontend + Backend + PostgreSQL + Redis)

Run the complete application stack:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

This will start:
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs`
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

**Stop all services:**
```bash
docker-compose -f docker-compose.dev.yml down
```

### Docker Commands Reference

#### Basic Commands
```bash
# Build image
docker build -t quiz-platform-frontend .

# Run container
docker run -d -p 3000:80 --name quiz-platform-frontend quiz-platform-frontend

# View logs
docker logs -f quiz-platform-frontend

# Stop container
docker stop quiz-platform-frontend

# Remove container
docker rm quiz-platform-frontend
```

#### Docker Compose Commands
```bash
# Start full stack
docker-compose -f docker-compose.dev.yml up -d

# Start with build
docker-compose -f docker-compose.dev.yml up -d --build

# View all logs
docker-compose -f docker-compose.dev.yml logs -f

# Rebuild frontend without cache
docker-compose -f docker-compose.dev.yml build --no-cache frontend

# Restart frontend only
docker-compose -f docker-compose.dev.yml restart frontend

# Stop all services
docker-compose -f docker-compose.dev.yml down
```

### Multi-stage Build

The Dockerfile uses a multi-stage build approach for optimal production deployment:

**Stage 1: Builder (Node.js)**
- Installs dependencies with `npm ci`
- Builds production bundle with `npm run build`
- Optimizes assets for production

**Stage 2: Production (Nginx)**
- Base image: `nginx:alpine` (~25MB)
- Copies built static files from builder stage
- Configured with custom nginx.conf
- Serves optimized static content

**Benefits:**
- Minimal image size (~25MB vs ~1GB with Node.js)
- No development dependencies in production
- Fast container startup time
- Optimized for serving static files
- Production-ready with caching and compression

### Environment Variables in Docker

**For Frontend Development:**
Environment variables are loaded from `.env` file during build time.

**For Full Stack Development (`docker-compose.dev.yml`):**

1. Create `.env.docker` from template:
```bash
cp .env.docker.sample .env.docker
```

2. Fill in the values or use defaults for local development

3. Start the full stack:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

**Security Notes:**
- ✅ `.env.docker.sample` is committed to Git (template)
- ❌ `.env.docker` is in `.gitignore` (contains credentials)
- ⚠️ Never commit files with real passwords or secrets

## 🧪 Testing
```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Building for Production
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview

# The build output will be in the `dist/` directory
```

## 🎨 Code Style

- **Prettier**: Automatic code formatting
- **ESLint**: Code linting (configured by Vite)
- **TypeScript**: Strict type checking

**Format before commit:**
```bash
npm run format
```

## 🔧 Development Workflow

1. Create a new branch from `main`:
```bash
git checkout main
git pull origin main
git checkout -b FE-X-feature-name
```

2. Make your changes and commit:
```bash
npm run format
git add .
git commit -m "FE-X: Description of changes"
```

3. Push your branch:
```bash
git push -u origin FE-X-feature-name
```

4. Create Pull Request on GitHub:
   - Base: `main`
   - Compare: `FE-X-feature-name`
   - Add reviewers (mentors)
   - Set yourself as assignee

5. Wait for code review and approval

6. After approval, mentor will merge the PR

**Important:** Never merge your own PRs. Always wait for mentor approval.

## 📚 Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🤝 Contributing

1. Follow the Git workflow described above
2. Use conventional commit messages
3. Format code before committing
4. Write tests for new features
5. Update documentation as needed
6. Follow React Hook Form + Yup pattern for all forms

## 📄 License

This project is part of an internship program.

## 👥 Authors

- [@jyjuk](https://github.com/jyjuk) - Іван (Frontend Developer Intern)

## 👨‍🏫 Mentors

- tkach-v
- FUZIR
- Ilia-puzdranovskuy

## 🔗 Related Repositories

- [Backend Repository](https://github.com/jyjuk/backend-internship)

## 📞 Support

For questions or issues, please contact your mentors or create an issue in the repository.