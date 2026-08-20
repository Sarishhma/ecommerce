import type { Order } from "../types/order.types";
import { OrderCard } from "./orderCard";


interface OrderListProps {
  orders: Order[];
  selectedOrderId: number | null;
  onSelect: (id: number) => void;
}

export const OrderList = ({
  orders,
  selectedOrderId,
  onSelect,
}: OrderListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-charcoal">
            Order History
          </h2>

          <p className="text-xs text-stone-400 mt-1">
            {orders.length}{" "}
            {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            selected={selectedOrderId === order.id}
            onClick={() => onSelect(order.id)}
          />
        ))}
      </div>
    </div>
  );
};