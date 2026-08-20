import {
  X,
  Package,
  MapPin,
  Phone,
  Calendar,
  ShoppingBag,
  CreditCard,
  Loader2,
} from "lucide-react";

import { useOrder } from "@/features/orders/hooks/useOrders.hook";
import { OrderStatusBadge } from "@/features/orders/components/orderStatusBadge";
import { AdminOrderItem } from "./AdminOrderItem";


interface AdminOrderDetailsModalProps {
  orderId: number | null;
  onClose: () => void;
}

export const AdminOrderDetailsModal = ({
  orderId,
  onClose,
}: AdminOrderDetailsModalProps) => {
  const {
    data: order,
    isLoading,
    isError,
  } = useOrder(orderId ?? undefined);

  if (orderId === null) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-4 sm:p-6
      "
    >
      {/* Backdrop */}

      <div
        className="
          absolute inset-0
          bg-black/40
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      {/* Modal */}

      <div
        className="
          relative
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-hidden
          bg-white
          rounded-3xl
          shadow-2xl
          flex
          flex-col
        "
      >

        {/* Header */}

        <div
          className="
            px-6 py-5
            sm:px-8 sm:py-6
            border-b border-gray-100
            flex items-start justify-between
            gap-4
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-gray-900
                text-white
                flex items-center justify-center
                shrink-0
              "
            >
              <Package className="w-6 h-6" />
            </div>

            <div>

              <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                Order Details
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                #{orderId}
              </h2>

              {order && (
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(order.order_date).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              )}

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              w-9 h-9
              rounded-xl
              flex items-center justify-center
              text-gray-400
              hover:text-gray-900
              hover:bg-gray-100
              transition
            "
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Content */}

        <div className="overflow-y-auto flex-1">

          {/* Loading */}

          {isLoading && (

            <div className="py-24 flex flex-col items-center justify-center">

              <div
                className="
                  w-12 h-12
                  rounded-full
                  bg-gray-100
                  flex items-center justify-center
                "
              >
                <Loader2
                  className="
                    w-6 h-6
                    text-gray-700
                    animate-spin
                  "
                />
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Loading order details...
              </p>

            </div>

          )}

          {/* Error */}

          {isError && (

            <div className="py-24 text-center px-6">

              <div
                className="
                  w-14 h-14
                  mx-auto
                  rounded-full
                  bg-red-50
                  text-red-500
                  flex items-center justify-center
                "
              >
                <Package className="w-6 h-6" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Unable to load order
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Something went wrong while loading this order.
              </p>

              <button
                onClick={onClose}
                className="
                  mt-6
                  px-5 py-2.5
                  rounded-xl
                  bg-gray-900
                  text-white
                  text-sm
                  font-medium
                  hover:bg-gray-800
                  transition
                "
              >
                Close
              </button>

            </div>

          )}

          {/* Order */}

          {order && !isLoading && !isError && (

            <div className="p-6 sm:p-8 space-y-6">

              {/* Overview */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Date */}

                <div
                  className="
                    rounded-2xl
                    bg-gray-50
                    border border-gray-100
                    p-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-white
                        border border-gray-100
                        flex items-center justify-center
                      "
                    >
                      <Calendar className="w-5 h-5 text-gray-500" />
                    </div>

                    <div>

                      <p className="text-xs text-gray-400">
                        Order Date
                      </p>

                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {new Date(
                          order.order_date
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Items */}

                <div
                  className="
                    rounded-2xl
                    bg-gray-50
                    border border-gray-100
                    p-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-white
                        border border-gray-100
                        flex items-center justify-center
                      "
                    >
                      <ShoppingBag className="w-5 h-5 text-gray-500" />
                    </div>

                    <div>

                      <p className="text-xs text-gray-400">
                        Items
                      </p>

                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {order.items.reduce(
                          (total, item) =>
                            total + item.quantity,
                          0
                        )}{" "}
                        items
                      </p>

                    </div>

                  </div>

                </div>

                {/* Total */}

                <div
                  className="
                    rounded-2xl
                    bg-gray-50
                    border border-gray-100
                    p-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-white
                        border border-gray-100
                        flex items-center justify-center
                      "
                    >
                      <CreditCard className="w-5 h-5 text-gray-500" />
                    </div>

                    <div>

                      <p className="text-xs text-gray-400">
                        Total
                      </p>

                      <p className="text-sm font-bold text-gray-900 mt-1">
                        ${Number(order.total_amount).toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Customer / Delivery */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Delivery */}

                <div
                  className="
                    border border-gray-100
                    rounded-2xl
                    p-6
                  "
                >

                  <div className="flex items-center gap-3 mb-5">

                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-gray-100
                        flex items-center justify-center
                      "
                    >
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        Delivery Information
                      </h3>

                      <p className="text-xs text-gray-400">
                        Customer delivery details
                      </p>

                    </div>

                  </div>

                  <div className="space-y-4">

                    <div>

                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Shipping Address
                      </p>

                      <p className="text-sm text-gray-800 mt-1">
                        {order.shipping_address}
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <Phone className="w-4 h-4 text-gray-400" />

                      <div>

                        <p className="text-xs text-gray-400">
                          Phone
                        </p>

                        <p className="text-sm font-medium text-gray-800">
                          {order.phone_number}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Status */}

                <div
                  className="
                    border border-gray-100
                    rounded-2xl
                    p-6
                  "
                >

                  <div className="flex items-center gap-3 mb-5">

                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-gray-100
                        flex items-center justify-center
                      "
                    >
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        Order Status
                      </h3>

                      <p className="text-xs text-gray-400">
                        Current order status
                      </p>

                    </div>

                  </div>

                  <OrderStatusBadge
                    status={order.status}
                  />

                </div>

              </div>

              {/* Products */}

              <div
                className="
                  border border-gray-100
                  rounded-2xl
                  overflow-hidden
                "
              >

                <div className="px-6 py-5 border-b border-gray-100">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        Ordered Products
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        Products included in this order
                      </p>

                    </div>

                    <span className="text-xs font-medium text-gray-500">
                      {order.items.length}{" "}
                      {order.items.length === 1
                        ? "product"
                        : "products"}
                    </span>

                  </div>

                </div>

                <div className="divide-y divide-gray-100">

                  {order.items.map((item) => (
                    <AdminOrderItem
                      key={item.id}
                      item={item}
                    />
                  ))}

                </div>

                {/* Total */}

                <div
                  className="
                    px-6 py-5
                    bg-gray-50
                    border-t border-gray-100
                  "
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-gray-500">
                      Order Total
                    </span>

                    <span className="text-2xl font-bold text-gray-900">
                      ${Number(order.total_amount).toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

        {/* Footer */}

        <div
          className="
            px-6 py-4
            sm:px-8
            border-t border-gray-100
            bg-gray-50/80
            flex justify-end
          "
        >

          <button
            onClick={onClose}
            className="
              px-5 py-2.5
              rounded-xl
              bg-gray-900
              text-white
              text-sm
              font-medium
              hover:bg-gray-800
              transition
            "
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};