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

export const AdminOrders = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useOrders();

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
      <div className="min-h-full bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">

          {/* Header skeleton */}
          <div>
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />

            <div className="h-9 w-40 bg-gray-200 rounded mt-3 animate-pulse" />

            <div className="h-4 w-64 bg-gray-100 rounded mt-3 animate-pulse" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  h-28
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  animate-pulse
                "
              />
            ))}
          </div>

          {/* Table skeleton */}
          <div
            className="
              h-96
              bg-white
              rounded-2xl
              border
              border-gray-100
              animate-pulse
            "
          />
        </div>
      </div>
    );
  }

  /* ===============================
     ERROR
  =============================== */

  if (isError) {
    return (
      <div className="min-h-full bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">

            <ShoppingBag
              className="w-10 h-10 text-red-400 mx-auto"
            />

            <h2 className="text-lg font-semibold text-red-800 mt-4">
              Unable to load orders
            </h2>

            <p className="text-sm text-red-600 mt-1">
              Something went wrong while loading orders.
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

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
                Administration
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
                Orders
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Manage and monitor customer orders.
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShoppingBag className="w-4 h-4" />

              {orders.length} total orders
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