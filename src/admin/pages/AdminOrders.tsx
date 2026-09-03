import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { useOrders } from "@/features/orders/hooks/useOrders.hook";

import {
  OrderFilters,
  type FilterStatus,
} from "../components/adminOrders/component/orderFilter";

import { OrderStats } from "../components/adminOrders/component/orderStats";

import { AdminOrderTable } from "../components/adminOrders/component/AdminOrderTable";

import { AdminOrderDetailsModal } from "../components/adminOrders/component/AdminOrderDetail";

import { useDeleteOrder } from "@/features/orders/hooks/useDeleteOrder";
import { DeleteOrderModal } from "../components/adminOrders/component/DeleteOrderModal";
import { useUpdateOrder } from "@/features/orders/hooks/useUpdateOrder";
import { AdminUpdateOrderModal } from "../components/adminOrders/component/AdminUpdateModal";

export const AdminOrders = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useOrders();

 const [updateOrderId, setUpdateOrderId] =
  useState<number | null>(null);
  const {
  mutate: updateOrder,
  isPending: isUpdating,
} = useUpdateOrder();
const orderToUpdate = orders.find(
  (order) => order.id === updateOrderId
);
  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);
   const {
    mutate: deleteOrder,
    isPending: isDeleting,
  } = useDeleteOrder();
  const [selectedOrderId, setSelectedOrderId] =
    useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<FilterStatus>("all");

  /* ===============================
     FILTER ORDERS
  =============================== */

  const filteredOrders = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" ||
        order.status === statusFilter;

      const matchesSearch =
        String(order.id).includes(searchValue) ||
        order.shipping_address
          ?.toLowerCase()
          .includes(searchValue) ||
        order.phone_number
          ?.toLowerCase()
          .includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  /* ===============================
     LOADING
  =============================== */

  if (isLoading) {
    return (
      <div className="min-h-full pb-10 space-y-8 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header skeleton */}
          <div>
            <div className="h-3 w-24 bg-sand/60 rounded animate-pulse" />
            <div className="h-8 w-36 bg-sand/60 rounded mt-2 animate-pulse" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 bg-white/60 rounded-2xl border border-border animate-pulse"
              />
            ))}
          </div>

          {/* Table skeleton */}
          <div className="h-96 bg-white/60 rounded-2xl border border-border animate-pulse" />
        </div>
      </div>
    );
  }

  /* ===============================
     ERROR
  =============================== */

  if (isError) {
    return (
      <div className="min-h-full pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ivory/80 backdrop-blur-md border border-border rounded-2xl p-8 text-center shadow-sm">
            <ShoppingBag className="w-10 h-10 text-stone/40 mx-auto" />
            <h2 className="text-lg font-display text-charcoal mt-4">
              Unable to load orders
            </h2>
            <p className="text-sm text-stone mt-1">
              Something went wrong while loading orders. Please check your connection.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ===============================
     PAGE
  =============================== */

  return (
    <div className="min-h-full ">

      <div className="max-w-7xl mx-auto ">

        <div >

          {/* ===============================
              HEADER
          =============================== */}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone font-semibold mb-1">Management</p>
              <h1 className="text-3xl font-display text-charcoal">Orders</h1>
            </div>
          </div>

          {/* ===============================
              STATS
          =============================== */}

          <OrderStats orders={orders} />

          {/* ===============================
              FILTERS
          =============================== */}

          <OrderFilters
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
          />

          {/* ===============================
              TABLE
          =============================== */}

        <AdminOrderTable
  orders={filteredOrders}
  onViewOrder={(orderId) => {
    setSelectedOrderId(orderId);
  }}

  onEditOrder={(orderId) => {
    setUpdateOrderId(orderId);
  }}

  onDeleteOrder={(orderId) => {
    setDeleteOrderId(orderId);
  }}
/>
           <DeleteOrderModal
        open={deleteOrderId !== null}
        orderId={deleteOrderId}
        isDeleting={isDeleting}
        onCancel={() => setDeleteOrderId(null)}
        onConfirm={() => {
          if (deleteOrderId === null) return;

          deleteOrder(deleteOrderId, {
            onSuccess: () => {
              setDeleteOrderId(null);
            },
          });
        }}
      />
<AdminUpdateOrderModal
  open={updateOrderId !== null}
  orderId={updateOrderId}
  currentStatus={orderToUpdate?.status}
  isUpdating={isUpdating}
  onCancel={() => setUpdateOrderId(null)}
  onConfirm={(status) => {
    if (updateOrderId === null) return;

    updateOrder(
      {
        orderId: updateOrderId,
        data: {
          status,
        },
      },
      {
        onSuccess: () => {
          setUpdateOrderId(null);
        },
      }
    );
  }}
/>

          {/* ===============================
              ORDER DETAILS MODAL
          =============================== */}

          <AdminOrderDetailsModal
            orderId={selectedOrderId}
            onClose={() => setSelectedOrderId(null)}
          />

        </div>

      </div>

    </div>
  );
};