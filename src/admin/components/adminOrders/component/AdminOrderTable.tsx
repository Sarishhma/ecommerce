import {
  Eye,
  Package,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

import { AdminOrderStatus } from "./AdminOrderStatus";
import type { Order } from "@/features/orders/types/order.types";

interface AdminOrderTableProps {
  orders: Order[];
  onViewOrder: (orderId: number) => void;
}

export const AdminOrderTable = ({
  orders,
  onViewOrder,
}: AdminOrderTableProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

      {/* Header */}

      <div className="px-6 py-5 border-b border-gray-100">

        <h2 className="font-semibold text-gray-900">
          Recent Orders
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          Showing {orders.length}{" "}
          {orders.length === 1 ? "order" : "orders"}
        </p>

      </div>

      {/* Empty */}

      {orders.length === 0 ? (

        <div className="py-20 text-center">

          <ShoppingBag
            className="w-10 h-10 text-gray-300 mx-auto"
          />

          <h3 className="font-semibold text-gray-800 mt-4">
            No orders found
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            There are currently no orders.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-gray-100 bg-gray-50/70">

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Order
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Delivery
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Items
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Total
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => {

                const itemCount = order.items.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                );

                const date = new Date(order.order_date);

                return (

                  <tr
                    key={order.id}
                    className="
                      border-b
                      border-gray-50
                      last:border-0
                      hover:bg-gray-50/70
                      transition
                    "
                  >

                    {/* Order */}

                    <td className="px-6 py-5">

                      <p className="font-semibold text-gray-900">
                        #{order.id}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Order ID
                      </p>

                    </td>

                    {/* Delivery */}

                    <td className="px-6 py-5">

                      <div className="max-w-[220px]">

                        <p className="text-sm text-gray-800 truncate">
                          {order.shipping_address}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {order.phone_number}
                        </p>

                      </div>

                    </td>

                    {/* Date */}

                    <td className="px-6 py-5">

                      <p className="text-sm text-gray-700">
                        {date.toLocaleDateString()}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                    </td>

                    {/* Items */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">

                          <Package className="w-4 h-4 text-gray-500" />

                        </div>

                        <span className="text-sm text-gray-700">
                          {itemCount}{" "}
                          {itemCount === 1
                            ? "item"
                            : "items"}
                        </span>

                      </div>

                    </td>

                    {/* Total */}

                    <td className="px-6 py-5">

                      <p className="font-semibold text-gray-900">
                        ${Number(order.total_amount).toFixed(2)}
                      </p>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                      <AdminOrderStatus
                        status={order.status}
                      />

                    </td>

                    {/* Action */}

                    <td className="px-6 py-5 text-right">

                      <button
                        onClick={() => onViewOrder(order.id)}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-2
                          rounded-lg
                          text-sm
                          font-medium
                          text-gray-700
                          hover:bg-gray-100
                          transition
                        "
                      >

                        <Eye className="w-4 h-4" />

                       

                      

                      </button>

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
