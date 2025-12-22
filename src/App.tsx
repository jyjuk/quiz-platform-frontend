import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UsersListPage from './pages/UsersListPage';
import UserProfilePage from './pages/UserProfilePage';
import CompaniesListPage from './pages/CompaniesListPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ReduxTestPage from './pages/ReduxTestPage';
import './i18n/config';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="users" element={<UsersListPage />} />
            <Route path="users/:id" element={<UserProfilePage />} />
            <Route path="companies" element={<CompaniesListPage />} />
            <Route path="companies/:id" element={<CompanyProfilePage />} />
            <Route path="redux-test" element={<ReduxTestPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
