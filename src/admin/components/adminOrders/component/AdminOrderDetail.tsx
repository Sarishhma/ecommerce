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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-ivory border border-border rounded-3xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-border/60 bg-sand/20 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-terracotta to-copper text-ivory flex items-center justify-center shrink-0 shadow-sm">
              <Package className="w-6 h-6" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone font-semibold">
                Order Details
              </p>
              <h2 className="text-2xl font-display text-charcoal mt-0.5">
                #{orderId}
              </h2>

              {order && (
                <p className="text-xs text-stone mt-0.5">
                  {new Date(order.order_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-stone hover:text-charcoal hover:bg-sand/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Loading */}
          {isLoading && (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-sand/40 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-terracotta animate-spin" />
              </div>
              <p className="mt-4 text-sm text-stone">
                Loading order details...
              </p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="py-24 text-center px-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-lg font-display text-charcoal">
                Unable to load order
              </h3>
              <p className="mt-1 text-sm text-stone">
                Something went wrong while loading this order.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 rounded-xl bg-charcoal text-ivory text-sm font-semibold hover:bg-charcoal/90 transition-colors"
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
                <div className="rounded-2xl bg-white/60 border border-border/70 p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sand/40 border border-border/50 flex items-center justify-center text-stone">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone font-semibold">
                        Order Date
                      </p>
                      <p className="text-sm font-semibold text-charcoal mt-0.5">
                        {new Date(order.order_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="rounded-2xl bg-white/60 border border-border/70 p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sand/40 border border-border/50 flex items-center justify-center text-stone">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone font-semibold">
                        Items
                      </p>
                      <p className="text-sm font-semibold text-charcoal mt-0.5">
                        {order.items.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}{" "}
                        items
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="rounded-2xl bg-white/60 border border-border/70 p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sand/40 border border-border/50 flex items-center justify-center text-stone">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone font-semibold">
                        Total
                      </p>
                      <p className="text-base font-display font-semibold text-charcoal mt-0.5">
                        Rs{Number(order.total_amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer / Delivery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Delivery */}
                <div className="border border-border/70 bg-white/60 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-sand/50 flex items-center justify-center text-stone">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base text-charcoal">
                        Delivery Information
                      </h3>
                      <p className="text-xs text-stone mt-0.5">
                        Customer delivery details
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone font-semibold">
                        Shipping Address
                      </p>
                      <p className="text-sm text-charcoal font-medium mt-1">
                        {order.shipping_address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-stone" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-stone font-semibold">
                          Phone
                        </p>
                        <p className="text-sm font-medium text-charcoal">
                          {order.phone_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="border border-border/70 bg-white/60 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-sand/50 flex items-center justify-center text-stone">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base text-charcoal">
                        Order Status
                      </h3>
                      <p className="text-xs text-stone mt-0.5">
                        Current fulfillment stage
                      </p>
                    </div>
                  </div>

                  <OrderStatusBadge status={order.status} />
                </div>
              </div>

              {/* Products */}
              <div className="border border-border/70 bg-white/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-border/60 bg-sand/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-base text-charcoal">
                        Ordered Products
                      </h3>
                      <p className="text-xs text-stone mt-0.5">
                        Products included in this order
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-stone uppercase tracking-wider">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "product" : "products"}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-border/40">
                  {order.items.map((item) => (
                    <AdminOrderItem key={item.id} item={item} />
                  ))}
                </div>

                {/* Total */}
                <div className="px-6 py-5 bg-sand/20 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone uppercase tracking-wider">
                      Order Total
                    </span>
                    <span className="text-2xl font-display font-semibold text-charcoal">
                      Rs{Number(order.total_amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 sm:px-8 border-t border-border/60 bg-sand/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-charcoal text-ivory text-sm font-semibold hover:bg-charcoal/90 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};