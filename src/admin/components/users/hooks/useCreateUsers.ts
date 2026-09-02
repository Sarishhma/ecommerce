import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../services/user.service';
import type { UserCreateFormValues } from '../schema/user.schema';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      idempotencyKey,
    }: {
      payload: UserCreateFormValues;
      idempotencyKey: string;
    }) => createUser(payload, idempotencyKey),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};