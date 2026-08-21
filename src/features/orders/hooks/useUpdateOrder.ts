
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../services/order.service";

import type {
  UpdateOrderRequest,
} from "../types/order.types";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      data,
    }: {
      orderId: number;
      data: UpdateOrderRequest;
    }) => orderService.updateOrder(orderId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};