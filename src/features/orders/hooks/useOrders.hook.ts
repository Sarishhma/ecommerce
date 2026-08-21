import { useQuery } from "@tanstack/react-query";

import { orderService } from "../services/order.service";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
    staleTime: 30 * 1000,
  });
};

export const useOrder = (id: number | undefined) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getOrderById(id as number),
    enabled: id !== undefined,
    staleTime: 30 * 1000,
  });
};