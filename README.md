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
│       ├── healthService.ts     # Health check API service
│       └── authService.ts       # Authentication API service
├── components/                  # Reusable UI components
│   ├── AppBar.tsx               # Navigation bar with auth state and user menu
│   ├── Footer.tsx               # Application footer
│   ├── Layout.tsx               # Page layout wrapper
│   ├── Modal.tsx                # Universal modal dialog
│   ├── PageContainer.tsx        # Consistent page container
│   ├── UserCard.tsx             # User display card
│   ├── CompanyCard.tsx          # Company display card
│   ├── LanguageSwitcher.tsx     # Language selector component
│   └── ProtectedRoute.tsx       # Route guard for authenticated routes
├── constants/                   # Application constants
├── hooks/                       # Custom React hooks
│   └── useTokenExpiry.ts        # Token expiry monitoring hook
├── i18n/                        # Internationalization
│   ├── config.ts                # i18n configuration
│   └── locales/
│       ├── en/
│       │   └── translation.json # English translations
│       └── uk/
│           └── translation.json # Ukrainian translations
├── pages/                       # Page components
│   ├── HomePage.tsx             # Landing page with quick links
│   ├── AboutPage.tsx            # Platform information
│   ├── LoginPage.tsx            # User login page
│   ├── RegisterPage.tsx         # User registration page
│   ├── UsersListPage.tsx        # Users list with search
│   ├── UserProfilePage.tsx      # User details and owned companies
│   ├── CompaniesListPage.tsx    # Companies list with filters
│   ├── CompanyProfilePage.tsx   # Company details
│   ├── ReduxTestPage.tsx        # Redux Toolkit test demonstration
│   ├── HealthCheckPage.tsx      # Backend health check page
│   └── NotFoundPage.tsx         # 404 error page
├── store/                       # Redux Toolkit state management
│   ├── index.ts                 # Store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── slices/
│       ├── testSlice.ts         # Test slice (demonstration)
│       └── authSlice.ts         # Authentication state slice
├── types/                       # TypeScript type definitions
│   └── index.ts                 # User, Company, Auth types
├── utils/                       # Helper functions
│   └── mockData.ts              # Mock data matching backend structure
└── theme.ts                     # Material UI theme configuration
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client (ready for API integration)
- **i18next** - Internationalization framework
- **react-i18next** - React integration for i18n
- **Redux Toolkit** - State management
- **react-redux** - React bindings for Redux

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
  "i18next": "^23.17.4",
  "react-i18next": "^15.2.0",
  "i18next-browser-languagedetector": "^8.0.2",
  "@reduxjs/toolkit": "^2.11.2",
  "react-redux": "^9.2.0"
}
```

### Development
```json
{
  "typescript": "~5.6.2",
  "vite": "^6.0.3",
  "@vitejs/plugin-react": "^4.3.4",
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

## 📱 Application Features

### Pages

#### Home Page
- Welcome screen with quick navigation
- Three main sections: Users, Companies, About
- Material UI cards with hover effects
- Responsive layout
- Multi-language support

#### About Page
- Platform overview and mission
- Key features showcase (4 feature cards)
- Technology stack information
- Modern grid layout with icons

#### Users Management
- **Users List**: 
  - Search by username or email
  - User cards with avatar, status badge
  - Click to view detailed profile
  - Shows 8 mock users
- **User Profile**: 
  - Detailed user information
  - Active/Inactive status badge
  - List of owned companies
  - Account actions (delete demo with modal)

#### Companies Management
- **Companies List**: 
  - Search by name or description
  - Grid/List view toggle
  - Public/Private visibility badges
  - Shows 8 mock companies
- **Company Profile**: 
  - Company details and description
  - Owner information with navigation
  - Created/Updated timestamps
  - Quick action buttons (coming soon)

#### Error Handling
- **404 Page**: User-friendly error message with navigation options

### Components

#### Reusable Components

**Layout Components:**
- `Layout` - Main layout wrapper with header, content, footer
- `AppBar` - Responsive navigation with mobile drawer menu and language switcher
- `Footer` - Application footer with copyright and links
- `PageContainer` - Consistent page wrapper with max-width

**UI Components:**
- `Modal` - Universal dialog component with customizable:
  - Title, content, actions
  - Configurable max-width
  - Close button
  - Used in User Profile for delete confirmation
- `UserCard` - User display card with:
  - Avatar with username initial
  - Email and status badge
  - Click navigation to profile
  - Hover effects
- `CompanyCard` - Company display card with:
  - Company icon and name
  - Owner name
  - Visibility badge
  - Description preview
  - Created date
  - Click navigation to profile
- `LanguageSwitcher` - Language selector with:
  - Flag icons for languages (🇬🇧 EN / 🇺🇦 UA)
  - Dropdown select interface
  - Integrated in AppBar and mobile drawer

### Mock Data

Application uses mock data matching exact backend API structure for development:

**Users (8 total):**
```typescript
{
  id: string;              // UUID format
  username: string;
  email: string;
  is_active: boolean;      // Active/Inactive status
  created_at: string;      // ISO datetime
  updated_at: string;      // ISO datetime
}
```

**Companies (8 total):**
```typescript
{
  id: string;              // UUID format
  name: string;
  description: string | null;
  is_visible: boolean;     // Public/Private
  owner_id: string;        // UUID reference to user
  created_at: string;      // ISO datetime
  updated_at: string;      // ISO datetime
}
```

**Helper Functions:**
- `getUserById(id)` - Get user by UUID
- `getCompanyById(id)` - Get company by UUID
- `getCompaniesByOwner(ownerId)` - Get user's companies
- `getVisibleCompanies()` - Get public companies
- `searchUsers(query)` - Search users by name/email
- `searchCompanies(query)` - Search companies by name/description
- `getCompanyOwnerName(ownerId)` - Get owner username for company

**Easy API Integration:**
Mock data uses exact backend structure (UUIDs, snake_case) for seamless API migration.

### Routing

Application uses React Router v6 with nested routes:
```
/ (Layout)
├── / (Home)
├── /about (About)
├── /users (Users List)
├── /users/:id (User Profile)
├── /companies (Companies List)
├── /companies/:id (Company Profile)
└── /* (404 Not Found)
```

### UI/UX Features

- **Material UI Design System** - Consistent theming and components
- **Responsive Design** - Mobile-first approach with breakpoints
- **Mobile Navigation** - Drawer menu for small screens
- **Search Functionality** - Real-time filtering on list pages
- **View Toggle** - Grid/List view for companies
- **Hover Effects** - Card animations on hover
- **Loading States** - Ready for async data loading
- **Error Handling** - 404 page with navigation
- **Accessibility** - Semantic HTML and ARIA labels
- **Internationalization** - Multi-language support (EN/UK)

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
src/i18n/
├── config.ts                    # i18n configuration
└── locales/
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
  "companies": {},   // Companies-related pages
  "notFound": {},    // 404 error page
  "footer": {}       // Footer content
}
```

### Usage in Components
```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <button>{t('common.save')}</button>
    </div>
  );
};
```

### Adding New Languages

1. Create new translation file: `src/i18n/locales/{lang}/translation.json`
2. Copy structure from `en/translation.json`
3. Translate all values
4. Add language to resources in `src/i18n/config.ts`:
```typescript
   const resources = {
     en: { translation: enTranslation },
     uk: { translation: ukTranslation },
     de: { translation: deTranslation }, // New language
   };
```
5. Add language option to `LanguageSwitcher.tsx`:
```typescript
   <MenuItem value="de">🇩🇪 DE</MenuItem>
```

### Language Persistence

Selected language is automatically saved to **LocalStorage**:
- Key: `i18nextLng`
- Value: `en`, `uk`, etc.
- Persists across browser sessions
- Applied automatically on app load

### i18n Configuration

**Key settings in `src/i18n/config.ts`:**
```typescript
{
  fallbackLng: 'en',              // Default language
  lng: localStorage.getItem('i18nextLng') || 'en',
  debug: false,                   // Set to true for debugging
  interpolation: {
    escapeValue: false            // React already escapes
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
  }
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

### Redux Toolkit Setup

**Store configuration:**
```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    // Add more slices here
  },
});
```

**Provider integration:**
```typescript
// src/main.tsx
import { Provider } from 'react-redux';
import { store } from './store';

<Provider store={store}>
  <App />
</Provider>
```

### Slices

Redux Toolkit uses **slices** to organize state logic:

**Test Slice** (demonstration):
- Location: `src/store/slices/testSlice.ts`
- State: Test string value
- Actions: Set, append, and reset string
- Purpose: Demonstrates Redux Toolkit functionality

**Slice structure:**
```typescript
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'test',
  initialState: { testString: 'Hello from Redux Toolkit!' },
  reducers: {
    setTestString: (state, action: PayloadAction<string>) => {
      state.testString = action.payload;
    },
    resetTestString: (state) => {
      state.testString = initialState.testString;
    },
  },
});

export const { setTestString, resetTestString } = testSlice.actions;
export default testSlice.reducer;
```

### Typed Hooks

Custom typed hooks for better TypeScript support:
```typescript
// src/store/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

**Usage in components:**
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTestString } from '../store/slices/testSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const testString = useAppSelector((state) => state.test.testString);

  const handleClick = () => {
    dispatch(setTestString('New value'));
  };

  return <div>{testString}</div>;
};
```

### Redux DevTools

Install browser extension for debugging:
- **Chrome**: [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- **Firefox**: [Redux DevTools Add-on](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

**Features:**
- View all dispatched actions
- Inspect state changes
- Time-travel debugging (undo/redo actions)
- Export/import state snapshots

### Test Page

Access Redux test demonstration:
- URL: `/redux-test`
- Features:
  - Display current Redux state
  - Set new string value
  - Append to existing value
  - Reset to default value
- Purpose: Demonstrates Redux Toolkit integration and functionality

### Adding New Slices

1. Create slice file: `src/store/slices/mySlice.ts`
2. Define state interface and initial state
3. Create slice with reducers
4. Export actions and reducer
5. Add reducer to store configuration

**Example:**
```typescript
// 1. Create slice
const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', email: '' },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

// 2. Add to store
export const store = configureStore({
  reducer: {
    test: testReducer,
    user: userReducer, // New slice
  },
});
```

### Benefits of Redux Toolkit

- ✅ **Less boilerplate** compared to traditional Redux
- ✅ **Built-in Immer** for immutable state updates
- ✅ **DevTools integration** out of the box
- ✅ **TypeScript friendly** with excellent type inference
- ✅ **Best practices** included by default
- ✅ **Async logic** support with createAsyncThunk
- ✅ **RTK Query** available for API calls

### Future Usage

Redux state will be used for:
- User authentication state
- Current user information
- Application-wide settings
- Shopping cart (if applicable)
- UI state (modals, notifications)
- Cached API data

## 🔐 Authentication & Authorization

### Overview

Complete JWT-based authentication system with token management, route protection, and automatic token expiry handling.

### Features

- **JWT Authentication** - Email/password login with access and refresh tokens
- **User Registration** - Form validation and account creation
- **Protected Routes** - Route guards for authenticated-only pages
- **Token Management** - Automatic token storage and refresh
- **Token Expiry** - Auto logout when token expires
- **Persistent Auth** - State preserved across browser sessions
- **Social Login UI** - Google and GitHub buttons (backend integration pending)

### Authentication Flow
```
User Registration
    ↓
POST /users/ (username, email, password)
    ↓
Redirect to Login
    ↓
User Login (email, password)
    ↓
POST /auth/login → access_token + refresh_token
    ↓
GET /auth/me → user data
    ↓
Redux: setCredentials(tokens + user)
    ↓
localStorage: save tokens
    ↓
Navigate to protected route
    ↓
ProtectedRoute: check isAuthenticated
    ↓
Axios: add Bearer token to requests
    ↓
useTokenExpiry: monitor token expiration
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
    email: string
  } | null
}
```

**Actions:**
- `setCredentials(tokens, user)` - Store auth data after login
- `logout()` - Clear auth state and localStorage
- `setUser(user)` - Update user information

### Protected Routes

**Component:** `src/components/ProtectedRoute.tsx`

Wraps routes that require authentication. Redirects to `/login` if not authenticated.

**Usage:**
```typescript
<Route
  path="/users"
  element={
    <ProtectedRoute>
      <UsersListPage />
    </ProtectedRoute>
  }
/>
```

**Protected Routes:**
- `/users` - Users list
- `/users/:id` - User profile
- `/companies` - Companies list
- `/companies/:id` - Company profile
- `/redux-test` - Redux test page
- `/health-check` - Health check page

**Public Routes:**
- `/` - Home page
- `/about` - About page
- `/login` - Login page
- `/register` - Registration page

### Authentication Pages

#### Login Page

**URL:** `/login`

**Features:**
- Email and password fields
- Show/hide password toggle
- Form validation
- Error messages
- Loading state
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
- Show/hide password toggles
- Form validation:
  - Username: min 3 characters
  - Email: valid format
  - Password: min 6 characters
  - Passwords must match
- Error messages
- Loading state
- Link to login
- Social registration buttons (UI only)

**API Integration:**
```typescript
POST /users/
Body: { username, email, password }
Response: User object
```

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

#### Token Expiry Hook

**Location:** `src/hooks/useTokenExpiry.ts`

**Features:**
- Decodes JWT token
- Checks expiration timestamp
- Runs check every 60 seconds
- Auto logout when expired
- Handles invalid tokens

**Usage:**
```typescript
function App() {
  useTokenExpiry(); // Add to App.tsx
  // ...
}
```

### AppBar Integration

AppBar adapts based on authentication state:

**Not Authenticated:**
- Shows: Home, About
- Buttons: Login, Register

**Authenticated:**
- Shows: Home, About, Users, Companies, Redux Test, Health Check
- User Avatar with dropdown menu:
  - Username display
  - Logout button

**Avatar:**
- Shows first letter of username
- Opens dropdown menu on click

### Logout Functionality

**Trigger:** Click Avatar → Logout

**Process:**
1. Dispatch `logout()` action
2. Clear Redux state
3. Clear localStorage
4. Close dropdown menu
5. Navigate to `/login`

**Result:**
- User logged out
- Protected routes hidden
- Tokens removed
- Redirect to login

### API Service

**Location:** `src/api/services/authService.ts`

**Methods:**
```typescript
// Login
authService.login({ email, password })
  → AuthResponse { access_token, refresh_token, token_type }

// Register
authService.register({ username, email, password })
  → UserResponse { id, username, email, is_active, created_at, updated_at }

// Get current user
authService.getCurrentUser()
  → UserResponse (requires Bearer token)

// Logout
authService.logout()
  → void (backend endpoint)

// Refresh token
authService.refreshToken(refreshToken)
  → AuthResponse { access_token, refresh_token, token_type }
```

### Security Features

- ✅ **Password Hashing** - Backend uses bcrypt
- ✅ **JWT Tokens** - Secure token-based auth
- ✅ **Token Expiry** - Automatic session timeout
- ✅ **Bearer Authentication** - Standard Authorization header
- ✅ **Protected Routes** - Client-side route guards
- ✅ **Persistent Sessions** - localStorage for convenience
- ✅ **Auto Logout** - On token expiry or 401 errors
- ✅ **Error Handling** - User-friendly error messages

### Testing Authentication

**Test Registration:**
```bash
1. Navigate to http://localhost:3000/register
2. Fill form:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - Confirm: password123
3. Click "Sign Up"
4. Should redirect to /login with success message
```

**Test Login:**
```bash
1. Navigate to http://localhost:3000/login
2. Fill form:
   - Email: test@example.com
   - Password: password123
3. Click "Sign In"
4. Should redirect to home page
5. AppBar shows all routes and avatar
6. localStorage contains tokens
7. Redux state shows isAuthenticated: true
```

**Test Protected Routes:**
```bash
# When not logged in:
1. Navigate to http://localhost:3000/users
2. Should auto-redirect to /login

# When logged in:
1. Navigate to http://localhost:3000/users
2. Should display Users page
```

**Test Logout:**
```bash
1. Click Avatar in AppBar
2. Click "Logout"
3. Should redirect to /login
4. Protected routes hidden
5. localStorage cleared
6. Redux state shows isAuthenticated: false
```

**Test Token Expiry:**
```bash
# Simulate expired token:
1. Login successfully
2. Open DevTools Console
3. Run: localStorage.setItem('token', 'invalid.token.here')
4. Wait 60 seconds or refresh page
5. Should auto logout and redirect to /login
```

### Troubleshooting

**Login fails with 422:**
- Check email format (must be valid email)
- Check password is not empty
- Verify backend is running on port 8000

**Protected routes accessible without login:**
- Check Redux state: `auth.isAuthenticated`
- Check localStorage for token
- Verify ProtectedRoute wraps the route

**Token expiry not working:**
- Check useTokenExpiry hook is called in App.tsx
- Check browser console for errors
- Verify token has valid JWT format

**401 errors on API calls:**
- Token expired (backend: 30 min)
- Token invalid or malformed
- Backend not receiving Authorization header
- Check axios interceptor is adding token

### Backend Integration

**Required Backend Endpoints:**
- `POST /auth/login` - User login
- `POST /users/` - User registration
- `GET /auth/me` - Get current user (requires auth)
- `POST /auth/logout` - Logout (optional)
- `POST /auth/refresh` - Refresh access token

**Backend Configuration:**
- JWT access token: 30 minutes expiration
- JWT refresh token: 7 days expiration
- CORS enabled for frontend origin
- Bearer token authentication

### Future Enhancements

- [ ] Refresh token rotation
- [ ] Remember me checkbox
- [ ] Forgot password flow
- [ ] Email verification
- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Multiple device support
- [ ] Password strength indicator
- [ ] Rate limiting on login attempts

## 🌐 HTTP Client (Axios)

### API Communication

The application uses **Axios** for HTTP requests to the backend API:

- **Centralized configuration** with base URL and timeout
- **Request/Response interceptors** for logging and error handling
- **Automatic JSON parsing** - no need for `.json()`
- **Global error handling** for common HTTP errors (401, 403, 500)
- **TypeScript types** for all API responses
- **Service layer architecture** for organized API calls

### Axios Instance Configuration

**Location:** `src/api/axios.ts`

**Features:**
```typescript
const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**Request Interceptor:**
- Logs all outgoing requests
- Can add authentication tokens automatically
- Useful for debugging

**Response Interceptor:**
- Logs successful responses
- Handles errors globally:
  - 401 Unauthorized → Can redirect to login
  - 403 Forbidden → Access denied
  - 500+ Server Error → Server issues
  - Network errors → Backend unavailable

### API Endpoints

**Location:** `src/api/endpoints.ts`

Centralized constants for all API endpoints:
```typescript
export const API_ENDPOINTS = {
  HEALTH: '/health',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    // ...
  },
  USERS: {
    LIST: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    // ...
  },
  // ...
};
```

### Service Layer

**Location:** `src/api/services/`

Organized API calls in service modules:

**Health Service:**
```typescript
// src/api/services/healthService.ts
export const healthService = {
  checkHealth: async (): Promise<HealthCheckResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.HEALTH);
    return response.data;
  },
};
```

**Usage in components:**
```typescript
import { healthService } from '../api/services/healthService';

const data = await healthService.checkHealth();
```

### Health Check Page

**URL:** `/health-check`

**Features:**
- Test connection to backend API
- Display backend status and information
- Show detailed error messages if connection fails
- Troubleshooting tips for common issues

**Use case:**
- Verify backend is running
- Test API connectivity
- Debug connection issues
- View backend health information

### Advantages of Axios over fetch

**Axios:**
```typescript
// ✅ Cleaner and shorter
const { data } = await axios.get('/users');
```

**fetch:**
```typescript
// ❌ More verbose
const response = await fetch('/users');
if (!response.ok) throw new Error('Failed');
const data = await response.json();
```

**Benefits:**
- ✅ Automatic JSON transformation
- ✅ Request/Response interceptors
- ✅ Timeout support
- ✅ Progress tracking (for uploads/downloads)
- ✅ Request cancellation
- ✅ Better error handling
- ✅ CSRF protection
- ✅ Works in older browsers

### Future API Integration

The Axios setup is ready for:
- User authentication (login, register, logout)
- CRUD operations for users and companies
- Quiz management
- Real-time notifications (with WebSocket upgrade)
- File uploads (with progress tracking)

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

**Note:** You need to have the backend running separately on `http://localhost:8000`

#### Option 2: Frontend with Docker Compose

Run frontend with docker-compose:
```bash
docker-compose up -d
```

This starts only the frontend container on port 3000.

**View logs:**
```bash
docker-compose logs -f frontend
```

**Stop services:**
```bash
docker-compose down
```

**Rebuild and restart:**
```bash
docker-compose up -d --build
```

#### Option 3: Full Stack (Frontend + Backend + PostgreSQL + Redis)

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

**Prerequisites for Full Stack:**
- Backend project must be in `../../backend_internship/` directory
- Backend Dockerfile must exist
- `.env.docker` file configured (see below)

**View all logs:**
```bash
docker-compose -f docker-compose.dev.yml logs -f
```

**Stop all services:**
```bash
docker-compose -f docker-compose.dev.yml down
```

**Stop and remove volumes:**
```bash
docker-compose -f docker-compose.dev.yml down -v
```

### Docker Commands Reference

#### Basic Commands
```bash
# Build image
docker build -t quiz-platform-frontend .

# Run container
docker run -d -p 3000:80 --name quiz-platform-frontend quiz-platform-frontend

# Stop container
docker stop quiz-platform-frontend

# Remove container
docker rm quiz-platform-frontend

# View logs
docker logs quiz-platform-frontend

# Follow logs in real-time
docker logs -f quiz-platform-frontend

# Access container shell
docker exec -it quiz-platform-frontend sh

# Inspect container
docker inspect quiz-platform-frontend
```

#### Docker Compose Commands
```bash
# Start services (frontend only)
docker-compose up -d

# Start with build
docker-compose up -d --build

# Start full stack
docker-compose -f docker-compose.dev.yml up -d

# View logs (frontend only)
docker-compose logs -f frontend

# View all logs (full stack)
docker-compose -f docker-compose.dev.yml logs -f

# View specific service logs
docker-compose -f docker-compose.dev.yml logs -f backend

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild specific service
docker-compose up -d --build frontend

# Check running containers
docker-compose ps

# Restart specific service
docker-compose restart frontend
```

#### Cleanup Commands
```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove all unused data
docker system prune -a

# Remove specific image
docker rmi quiz-platform-frontend

# List images
docker images

# List all containers
docker ps -a
```

### Multi-stage Build

The Dockerfile uses a multi-stage build approach for optimal production deployment:

**Stage 1: Builder (Node.js)**
- Base image: `node:20-alpine`
- Installs dependencies with `npm ci`
- Builds production bundle with `npm run build`
- Optimizes assets for production

**Stage 2: Production (Nginx)**
- Base image: `nginx:alpine` (~25MB)
- Copies built static files from builder stage
- Configured with custom nginx.conf
- Serves optimized static content

**Benefits:**
- ✅ Minimal image size (~25MB vs ~1GB with Node.js)
- ✅ No development dependencies in production
- ✅ Fast container startup time
- ✅ Optimized for serving static files
- ✅ Production-ready with caching and compression
- ✅ Secure - only production code included

### Nginx Configuration

The included `nginx.conf` provides:

- **SPA Routing Support**: Handles React Router client-side routing with fallback to index.html
- **Gzip Compression**: Reduces file sizes by ~70% for faster load times
- **Static Asset Caching**: 1-year cache headers for JS/CSS/images
- **Security Headers**: 
  - `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
  - `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
  - `X-XSS-Protection: 1; mode=block` - XSS protection

### Network Configuration

Both docker-compose files use the `quiz-network` bridge network:

- Allows secure inter-container communication
- Frontend can reach backend via service name (`http://backend:8000`)
- Backend can reach PostgreSQL via service name (`postgres:5432`)
- Backend can reach Redis via service name (`redis:6379`)
- Isolated from other Docker networks

### Environment Variables in Docker

**For Frontend Development:**
Environment variables are loaded from `.env` file during build time.

**For Full Stack Development (`docker-compose.dev.yml`):**

1. Create `.env.docker` from template:
```bash
cp .env.docker.sample .env.docker
```

2. Fill in the values (or use defaults for local development):
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=internship_db

JWT_SECRET_KEY=your-secret-key-change-in-production
JWT_REFRESH_SECRET_KEY=your-refresh-secret-key-change-in-production
SECRET_KEY=your-general-secret-key
```

3. Start the full stack:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

**Security Notes:**
- ✅ `.env.docker.sample` is committed to Git (template with empty values)
- ❌ `.env.docker` is in `.gitignore` (contains real credentials)
- ⚠️ Never commit files with real passwords or secrets
- 🔒 Use strong, unique passwords for production environments

**For Production:**
Create `.env.production` file for frontend build:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
VITE_APP_NAME=Quiz Platform
VITE_APP_VERSION=1.0.0
```

Build with production environment:
```bash
docker build --build-arg NODE_ENV=production -t quiz-platform-frontend:prod .
```

**Important:** 
- Vite bakes frontend environment variables into the build at build time, not runtime
- Backend environment variables are loaded at runtime from `.env.docker`

### Connecting to Backend

Configure backend URL based on your deployment:

**Option 1: Backend on Host Machine**
```env
VITE_API_BASE_URL=http://host.docker.internal:8000
```

**Option 2: Backend in Same Docker Network**
```env
VITE_API_BASE_URL=http://backend:8000
```

**Option 3: Full Stack with docker-compose.dev.yml**
- Frontend automatically connects to `http://backend:8000` within Docker network
- Accessible externally at `http://localhost:8000`

### Directory Structure Note

The `docker-compose.dev.yml` is configured for this directory structure:
```
C:\
├── backend_internship\          # Backend project
└── frontend_internship\
    └── quiz-platform-frontend\  # Frontend project (this repo)
```

If your directory structure is different, update the `context` path in `docker-compose.dev.yml`:
```yaml
backend:
  build:
    context: ../../backend_internship  # Adjust this path
```

### Troubleshooting

**Frontend can't connect to backend:**
```bash
# Check if backend is running
docker ps | findstr backend

# Check network
docker network inspect quiz-platform-frontend_quiz-network

# Test connection from frontend container
docker exec -it quiz-platform-frontend sh
wget -O- http://backend:8000
```

**Build fails:**
```bash
# Clean Docker cache
docker builder prune

# Rebuild without cache
docker build --no-cache -t quiz-platform-frontend .

# Check Docker disk space
docker system df
```

**Port already in use:**
```bash
# Check what's using the port (Windows)
netstat -ano | findstr :3000

# Use different port
docker run -d -p 3001:80 quiz-platform-frontend
```

**Container exits immediately:**
```bash
# Check container logs
docker logs quiz-platform-frontend

# Run container in foreground to see errors
docker run -p 3000:80 quiz-platform-frontend
```

**Changes not reflecting:**
```bash
# Rebuild with --no-cache
docker-compose up -d --build --no-cache

# Or for full stack
docker-compose -f docker-compose.dev.yml up -d --build --no-cache
```

### Verified Working Configuration

**Successfully tested on:**
- Operating System: Windows 11
- Docker Desktop: Latest version
- Node.js: 22.11.0
- npm: 10.9.0
- Python: 3.12 (for backend)

**Container sizes:**
- Frontend: ~25MB (nginx:alpine)
- Backend: ~200MB (python:3.12-slim)
- PostgreSQL: ~250MB (postgres:16-alpine)
- Redis: ~40MB (redis:7-alpine)
- **Total stack**: ~515MB

**Startup time:**
- Full stack (first time): ~30-40 seconds
- Full stack (cached): ~10 seconds
- Frontend only: ~5 seconds

**Build time:**
- Frontend: ~20-30 seconds
- Backend: ~10-15 seconds (cached dependencies)

### Production Deployment

For production deployment:

1. **Build production image:**
```bash
docker build --build-arg NODE_ENV=production -t quiz-platform-frontend:prod .
```

2. **Tag for registry:**
```bash
docker tag quiz-platform-frontend:prod your-registry/quiz-platform-frontend:latest
```

3. **Push to registry:**
```bash
docker push your-registry/quiz-platform-frontend:latest
```

4. **Deploy to orchestration platform:**
   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances
   - Kubernetes
   - Docker Swarm

**Production docker-compose example:**
```yaml
services:
  frontend:
    image: your-registry/quiz-platform-frontend:latest
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: always
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
```

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

1. Create a new branch from `develop`:
```bash
git checkout develop
git pull origin develop
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
   - Base: `develop`
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

## 📄 License

This project is part of an internship program.

## 👥 Authors

- [@jyjuk](https://github.com/jyjuk)

## 👨‍🏫 Mentors

- tkach-v
- FUZIR
- Ilia-puzdranovskuy

## 🔗 Related Repositories

- [Backend Repository](https://github.com/jyjuk/backend-internship)

## 📞 Support

For questions or issues, please contact your mentors or create an issue in the repository.