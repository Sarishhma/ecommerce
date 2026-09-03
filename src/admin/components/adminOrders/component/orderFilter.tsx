import type { OrderStatus } from "@/features/orders/types/order.types";
import { Search } from "lucide-react";



export type FilterStatus = "all" | OrderStatus;

interface OrderFiltersProps {
  search: string;
  statusFilter: FilterStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: FilterStatus) => void;
}

export const OrderFilters = ({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: OrderFiltersProps) => {

  const statuses: FilterStatus[] = [
    "all",
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <div className="bg-ivory/80 backdrop-blur-md border border-border rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
          <input
            type="text"
            placeholder="Search by order ID, address or phone..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/60 border border-border rounded-xl text-charcoal placeholder:text-stone outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 transition-all"
          />
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  isActive
                    ? "bg-terracotta text-ivory shadow-sm"
                    : "bg-sand/30 text-charcoal hover:bg-sand/70 border border-border/50"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};