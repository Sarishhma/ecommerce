import type { OrderItem as OrderItemType } from "../types/order.types";

interface OrderItemProps {
  item: OrderItemType;
}

export const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-stone-100 last:border-0">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-stone-500">
            {item.quantity}
          </span>
        </div>

        <div className="min-w-0">
          <h4 className="font-medium text-charcoal truncate">
            {item.product_title}
          </h4>

          <p className="text-sm text-stone-500 mt-1">
            ${Number(item.price).toFixed(2)} × {item.quantity}
          </p>
        </div>
      </div>

      <p className="font-semibold text-charcoal flex-shrink-0">
        ${Number(item.subtotal).toFixed(2)}
      </p>
    </div>
  );
};