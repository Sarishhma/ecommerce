import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomer } from '../services/customer.service';
import type { CustomerFormValues } from '../schema/customer.schema';

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      idempotencyKey,
    }: {
      payload: CustomerFormValues;
      idempotencyKey: string;
    }) => createCustomer(payload, idempotencyKey),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};