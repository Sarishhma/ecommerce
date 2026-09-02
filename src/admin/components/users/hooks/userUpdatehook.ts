import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../services/user.service';
import type { UpdateUserPayload } from '../types/user.types';

interface UpdateUserArgs {
  id: number;
  payload: UpdateUserPayload;
  idempotencyKey: string;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: UpdateUserArgs) =>
      updateUser(id, payload, idempotencyKey),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};