import { Package } from "lucide-react";

import type { OrderItem } from "@/features/orders/types/order.types";

interface AdminOrderItemProps {
  item: OrderItem;
}

export const AdminOrderItem = ({
  item,
}: AdminOrderItemProps) => {
  return (
    <div className="px-6 py-4 flex items-center gap-4 hover:bg-sand/15 transition-colors">
      {/* Product Icon */}
      <div className="w-12 h-12 rounded-xl bg-sand/40 border border-border/50 text-terracotta flex items-center justify-center shrink-0">
        <Package className="w-5 h-5 text-stone" />
      </div>

      {/* Product */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-charcoal truncate">
          {item.product_title}
        </h4>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
          <p className="text-xs text-stone">
            Qty: <span className="text-charcoal font-medium">{item.quantity}</span>
          </p>

          <p className="text-xs text-stone">
            Unit price: <span className="text-charcoal font-medium">Rs{Number(item.price).toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right shrink-0">
        <p className="font-semibold text-charcoal font-display text-base">
          Rs{Number(item.subtotal).toFixed(2)}
        </p>

        <p className="text-[10px] uppercase tracking-wider text-stone mt-0.5">
          Subtotal
        </p>
      </div>
    </div>
  );
};