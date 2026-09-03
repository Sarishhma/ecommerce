import {
  Eye,
  Package,
  ShoppingBag,
  Trash2,
  Pencil,
} from "lucide-react";

import { AdminOrderStatus } from "./AdminOrderStatus";
import type { Order } from "@/features/orders/types/order.types";

interface AdminOrderTableProps {
  orders: Order[];
  onViewOrder: (orderId: number) => void;
  onDeleteOrder: (orderId: number) => void;
  onEditOrder: (orderId: number) => void;
}

export const AdminOrderTable = ({
  orders,
  onViewOrder,
  onDeleteOrder,
  onEditOrder,
}: AdminOrderTableProps) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border/60 bg-sand/10 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg text-charcoal">
            Recent Orders
          </h2>
          <p className="text-xs text-stone mt-0.5">
            Showing {orders.length}{" "}
            {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="py-20 text-center">
          <ShoppingBag className="w-10 h-10 text-stone/40 mx-auto" />
          <h3 className="font-display text-lg text-charcoal mt-4">
            No orders found
          </h3>
          <p className="text-sm text-stone mt-1">
            There are currently no orders matching your criteria.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm min-w-[750px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-border/60 bg-sand/30">
                <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
                  Delivery
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-border/40">
              {orders.map((order) => {
                const itemCount = order.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                );

                const date = new Date(order.order_date);

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-sand/20 transition-colors group"
                  >
                    {/* Order */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                        #{order.id}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-stone mt-0.5">
                        Order ID
                      </p>
                    </td>

                    {/* Delivery */}
                    <td className="px-6 py-4">
                      <div className="max-w-[220px]">
                        <p className="text-sm text-charcoal font-medium truncate">
                          {order.shipping_address}
                        </p>
                        <p className="text-xs text-stone mt-0.5">
                          {order.phone_number}
                        </p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-charcoal">
                        {date.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-stone mt-0.5">
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>

                    {/* Items */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-sand/50 flex items-center justify-center text-charcoal">
                          <Package className="w-4 h-4 text-stone" />
                        </div>
                        <span className="text-sm text-charcoal">
                          {itemCount}{" "}
                          {itemCount === 1 ? "item" : "items"}
                        </span>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-charcoal font-display text-base">
                        ${Number(order.total_amount).toFixed(2)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <AdminOrderStatus status={order.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View */}
                        <button
                          type="button"
                          onClick={() => onViewOrder(order.id)}
                          title="View order"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-stone hover:text-charcoal hover:bg-sand/60 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => onEditOrder(order.id)}
                          title="Update order"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-stone hover:text-terracotta hover:bg-terracotta/10 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => onDeleteOrder(order.id)}
                          title="Delete order"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-stone hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};