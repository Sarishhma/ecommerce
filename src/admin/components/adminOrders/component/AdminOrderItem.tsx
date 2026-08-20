import { Package } from "lucide-react";

import type { OrderItem } from "@/features/orders/types/order.types";

interface AdminOrderItemProps {
  item: OrderItem;
}

export const AdminOrderItem = ({
  item,
}: AdminOrderItemProps) => {
  return (
    <div className="px-6 py-5 flex items-center gap-4">

      {/* Product Icon */}

      <div
        className="
          w-14 h-14
          rounded-xl
          bg-gray-100
          flex items-center justify-center
          shrink-0
        "
      >
        <Package className="w-6 h-6 text-gray-400" />
      </div>

      {/* Product */}

      <div className="flex-1 min-w-0">

        <h4 className="font-medium text-gray-900 truncate">
          {item.product_title}
        </h4>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">

          <p className="text-xs text-gray-400">
            Qty: {item.quantity}
          </p>

          <p className="text-xs text-gray-400">
            Unit price: ${Number(item.price).toFixed(2)}
          </p>

        </div>

      </div>

      {/* Subtotal */}

      <div className="text-right shrink-0">

        <p className="font-semibold text-gray-900">
          ${Number(item.subtotal).toFixed(2)}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Subtotal
        </p>

      </div>

    </div>
  );
};