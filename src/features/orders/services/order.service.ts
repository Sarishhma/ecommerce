import api from "@/lib/api";

import type {
  Order,
  CreateOrderRequest,
  DeleteOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "../types/order.types";

export const orderService = {
  // Create new order
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await api.post<Order>("/orders/create/", data);

    return response.data;
  },

  // Get user's orders
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/orders/");

    return response.data;
  },

  // Get single order
  getOrderById: async (id: number): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}/`);

    return response.data;
  },

  // Delete an order
  deleteOrder: async (orderId: number): Promise<DeleteOrderResponse> => {
    const response = await api.delete(`/orders/${orderId}/`);

    return response.data;
  },


  updateOrder: async (
    orderId: number,
    data: UpdateOrderRequest
  ): Promise<UpdateOrderResponse> => {
    const response = await api.put<UpdateOrderResponse>(
      `/orders/${orderId}/`,
      data
    );

    return response.data;
  }
};
