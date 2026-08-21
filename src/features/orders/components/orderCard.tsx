import {
  CalendarDays,
  ChevronRight,
  XCircle,
} from "lucide-react";

import type { Order } from "../types/order.types";
import { OrderStatusBadge } from "./orderStatusBadge";

interface OrderCardProps {
  order: Order;
  selected?: boolean;
  onClick?: () => void;
  onCancelOrder?: (orderId: number) => void;
}

export const OrderCard = ({
  order,
  selected = false,
  onClick,
  onCancelOrder,
}: OrderCardProps) => {
  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div
      className={`w-full text-left bg-white rounded-2xl border p-5 transition-all duration-200 ${
        selected
          ? "border-charcoal shadow-md"
          : "border-stone-200 hover:border-stone-300 hover:shadow-sm"
      }`}
    >
      {/* Clickable Order Information */}
      <div
        onClick={onClick}
        className="cursor-pointer"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-stone-400">
              Order
            </p>

            <h3 className="text-lg font-semibold text-charcoal mt-1">
              #{order.id}
            </h3>
          </div>

          <ChevronRight
            className={`w-5 h-5 flex-shrink-0 transition-transform ${
              selected
                ? "text-charcoal translate-x-1"
                : "text-stone-400"
            }`}
          />
        </div>

        {/* Date + Items */}
        <div className="flex items-center gap-2 mt-4 text-sm text-stone-500">
          <CalendarDays className="w-4 h-4" />

          <span>
            {new Date(order.order_date).toLocaleDateString()}
          </span>

          <span>•</span>

          <span>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Status + Total */}
        <div className="flex items-center justify-between mt-5">
          <OrderStatusBadge status={order.status} />

          <span className="font-semibold text-charcoal">
            ${Number(order.total_amount).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Cancel Order */}
      {order.status === "pending" && onCancelOrder && (
        <div className="mt-5 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCancelOrder(order.id);
            }}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-lg
              text-sm
              font-medium
              text-red-600
              bg-red-50
              hover:bg-red-100
              transition
            "
          >
            <XCircle className="w-4 h-4" />
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
};