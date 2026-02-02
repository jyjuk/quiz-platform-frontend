import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

export const useTokenExpiry = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;
    const checkTokenExpiry = () => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          console.log('Token expired, logging out...');
          dispatch(logout());
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
        dispatch(logout());
        navigate('/login');
      }
    };
    checkTokenExpiry();

    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [token, dispatch, navigate]);
};
