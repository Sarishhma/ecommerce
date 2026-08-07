import { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import type { LoginFormData } from '../schema/login.schema';
import { authService } from '../services/auth.service';
import { useLocation, useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';

  const login = async (data: LoginFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(data);

      authService.setTokens(response.access, response.refresh);

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.access,
          refreshToken: response.refresh,
        })
      );

      navigate(from, { replace: true });
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message;
        setError(serverMessage || 'Invalid username or password');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};