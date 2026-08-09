import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { clearCredentials } from '@/redux/slices/authSlice';
import { authService } from '../services/auth.service';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    authService.clearTokens();
    dispatch(clearCredentials());
    navigate('/');
  };
};