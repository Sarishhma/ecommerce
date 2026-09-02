import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/user.service';

export const useUsers = (params?: { page?: number; search?: string }) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });
};