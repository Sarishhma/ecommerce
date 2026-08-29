import type { Order } from "../types/order.types";

interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary = ({
  order,
}: OrderSummaryProps) => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-charcoal mb-5">
        Order Summary
      </h3>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-stone-500">
            Order number
          </span>

          <span className="font-medium text-charcoal">
            #{order.id}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-stone-500">
            Delivery address
          </span>

          <span className="font-medium text-charcoal text-right max-w-[60%]">
            {order.shipping_address}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-stone-500">
            Phone
          </span>

          <span className="font-medium text-charcoal">
            {order.phone_number}
          </span>
        </div>
      </div>

      <div className="border-t border-stone-200 mt-5 pt-5 flex justify-between items-center">
        <span className="font-semibold text-charcoal">
          Total
        </span>

        <span className="text-xl font-bold text-charcoal">
          ${Number(order.total_amount).toFixed(2)}
        </span>
      </div>
    </div>
  );
};