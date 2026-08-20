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
    <div className="bg-white border border-gray-100 rounded-2xl p-4">

      <div className="flex flex-col lg:flex-row gap-4">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              w-4
              h-4
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search by order ID, address or phone..."
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            className="
              w-full
              pl-10
              pr-4
              py-3
              text-sm
              border
              border-gray-200
              rounded-xl
              outline-none
              focus:border-gray-400
              transition
            "
          />

        </div>


        {/* Status filters */}

        <div className="flex flex-wrap gap-2">

          {statuses.map((status) => (

            <button
              key={status}
              onClick={() =>
                onStatusChange(status)
              }
              className={`
                px-4
                py-2.5
                rounded-xl
                text-xs
                font-medium
                capitalize
                transition
                ${
                  statusFilter === status
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {status}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
};