import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UsersListPage from './pages/UsersListPage';
import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './pages/MyProfilePage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ReduxTestPage from './pages/ReduxTestPage';
import HealthCheckPage from './pages/HealthCheckPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useTokenExpiry } from './hooks/useTokenExpiry';
import './i18n/config';

function AppRoutes() {
  useTokenExpiry();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <MyProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute>
              <UsersListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="users/:id"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="companies"
          element={
            <ProtectedRoute>
              <CompaniesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="companies/:id"
          element={
            <ProtectedRoute>
              <CompanyDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="redux-test"
          element={
            <ProtectedRoute>
              <ReduxTestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="health-check"
          element={
            <ProtectedRoute>
              <HealthCheckPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
