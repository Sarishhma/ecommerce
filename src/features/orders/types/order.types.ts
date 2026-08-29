export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: number;
  product: number;
  product_title: string;
  quantity: number;
  price: string;
  subtotal: string;
}

export interface Order {
  id: number;
  order_date: string;
  status: OrderStatus;
  total_amount: string;
  shipping_address: string;
  phone_number: string;
  items: OrderItem[];
}

export interface CreateOrderItem {
  product: number;
  quantity: number;
}

export interface CreateOrderRequest {
  shipping_address: string;
  phone_number: string;
  items: CreateOrderItem[];
}

export interface DeleteOrderResponse {
  message?: string;
  id?: number;
}

export type UpdateOrderRequest = {
  status: OrderStatus;
};

export interface UpdateOrderResponse {
  id: number;
  order_date: string;
  status: OrderStatus;
  total_amount: string;
  shipping_address: string;
  phone_number: string;
  items: OrderItem[];
}