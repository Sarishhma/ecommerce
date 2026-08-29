import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  CreateOrderRequest,
} from "../types/order.types";
import { orderService } from "../services/order.service";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) =>
      orderService.createOrder(data),

    onSuccess: () => {
      // Refresh order history after creating an order
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};