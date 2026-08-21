import { useEffect, useState } from "react";
import {
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  useOrder,
  useOrders,
} from "../hooks/useOrders.hook";

import { OrderCard } from "../components/orderCard";
import { OrderStatusBadge } from "../components/orderStatusBadge";
import { OrderTimeline } from "../components/orderTime";
import { OrderItem } from "../components/orderItem";
import { OrderSummary } from "../components/OrderSummery";
import { useDeleteOrder } from "../hooks/useDeleteOrder";
import { CancelOrderModal } from "../components/cancleOrderModal";

export const TrackOrderPage = () => {
  const {
    data: orders = [],
    isLoading: ordersLoading,
    isError: ordersError,
      refetch: refetchOrders,
  } = useOrders();
const [cancelOrderId, setCancelOrderId] =
  useState<number | null>(null);

const {
  mutate: cancelOrder,
  isPending: isCancelling,
} = useDeleteOrder();
  const [selectedOrderId, setSelectedOrderId] =
    useState<number | undefined>();

  useEffect(() => {
    if (
      orders.length > 0 &&
      selectedOrderId === undefined
    ) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders, selectedOrderId]);

  const {
    data: selectedOrder,
    isLoading: orderLoading,
    isError: orderError,
  } = useOrder(selectedOrderId);

  /*
   * Loading orders
   */
  if (ordersLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-stone-300 border-t-charcoal rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-stone-500">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error loading orders
   */
  if (ordersError) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <PackageSearch className="w-7 h-7 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-charcoal mt-5">
            Unable to load orders
          </h1>

          <p className="text-stone-500 mt-2">
            Something went wrong while loading your orders.
          </p>
        </div>
      </div>
    );
  }

  /*
   * No orders
   */
  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 text-stone-400" />
          </div>

          <h1 className="text-3xl font-bold text-charcoal mt-6">
            No orders yet
          </h1>

          <p className="text-stone-500 mt-2">
            You haven't placed an order yet.
          </p>

          <Link
            to="/shop"
            className="inline-flex mt-6 px-6 py-3 rounded-xl bg-charcoal text-white font-medium hover:bg-stone-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-[calc(var(--nav-height)+2rem)] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-charcoal text-white flex items-center justify-center">
              <PackageSearch className="w-5 h-5" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Account
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-charcoal">
                Your Orders
              </h1>
            </div>
          </div>

          <p className="text-stone-500 mt-3">
            View your order history and track your purchases.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Order history */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-charcoal">
                Order History
              </h2>

              <span className="text-xs text-stone-400">
                {orders.length}{" "}
                {orders.length === 1
                  ? "order"
                  : "orders"}
              </span>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  selected={
                    selectedOrderId === order.id
                  }
                  onClick={() =>
                    setSelectedOrderId(order.id)
                  }
                />
              ))}
            </div>
          </div>

          {/* Selected order */}
          <div className="lg:col-span-2">

            {orderLoading && (
              <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center">
                <div className="w-8 h-8 border-2 border-stone-300 border-t-charcoal rounded-full animate-spin mx-auto" />

                <p className="text-sm text-stone-500 mt-4">
                  Loading order details...
                </p>
              </div>
            )}

            {orderError && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <h3 className="font-semibold text-red-800">
                  Unable to load order
                </h3>

                <p className="text-sm text-red-600 mt-1">
                  Please try selecting the order again.
                </p>
              </div>
            )}

            {selectedOrder &&
              !orderLoading &&
              !orderError && (
                <div className="space-y-6">

                  {/* Order header */}
                  <div className="bg-white border border-stone-200 rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <div>
                        <p className="text-xs uppercase tracking-widest text-stone-400">
                          Order Number
                        </p>

                        <h2 className="text-2xl font-bold text-charcoal mt-1">
                          #{selectedOrder.id}
                        </h2>

                        <p className="text-sm text-stone-500 mt-2">
                          Placed on{" "}
                          {new Date(
                            selectedOrder.order_date
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <OrderStatusBadge
                        status={selectedOrder.status}
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <OrderTimeline
                    status={selectedOrder.status}
                  />

                  {/* Ordered products */}
                  <div className="bg-white border border-stone-200 rounded-2xl p-6">

                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-lg font-semibold text-charcoal">
                          What you ordered
                        </h3>

                        <p className="text-sm text-stone-500 mt-1">
                          {selectedOrder.items.reduce(
                            (total, item) =>
                              total + item.quantity,
                            0
                          )}{" "}
                          items
                        </p>
                      </div>
                    </div>

                    <div>
                      {selectedOrder.items.map(
                        (item) => (
                          <OrderItem
                            key={item.id}
                            item={item}
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Summary */}
 {/* Summary */}
<OrderSummary order={selectedOrder} />

{/* Cancel Order */}
{selectedOrder.status === "pending" && (
  <div className="bg-white border border-stone-200 rounded-2xl p-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
      <div>
        <h3 className="font-semibold text-charcoal">
          Need to cancel this order?
        </h3>

        <p className="text-sm text-stone-500 mt-1">
          You can cancel this order while it is still pending.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setCancelOrderId(selectedOrder.id)}
        className="
          inline-flex
          items-center
          justify-center
          px-5
          py-2.5
          rounded-xl
          text-sm
          font-medium
          text-red-600
          bg-red-50
          border
          border-red-100
          hover:bg-red-100
          transition
          whitespace-nowrap
        "
      >
        Cancel Order
      </button>

    </div>
  </div>
)}

{/* Cancel Confirmation Modal */}
<CancelOrderModal
  open={cancelOrderId !== null}
  orderId={cancelOrderId}
  isCancelling={isCancelling}
  onCancel={() => setCancelOrderId(null)}
  onConfirm={() => {
    if (cancelOrderId === null) return;

    cancelOrder(cancelOrderId, {
      onSuccess:async () => {
        setCancelOrderId(null);
         await refetchOrders();
      },
      onError: (error) => {
        console.error("Failed to cancel order:", error);
        alert("Failed to cancel order. Please try again.");
      },
    });
  }}
/>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};