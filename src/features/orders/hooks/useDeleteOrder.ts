import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { orderService } from "../services/order.service";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: number) =>
      orderService.deleteOrder(orderId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};