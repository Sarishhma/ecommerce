import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

import type { OrderStatus } from "@/features/orders/types/order.types";

interface AdminUpdateOrderModalProps {
  open: boolean;
  orderId: number | null;
  currentStatus?: OrderStatus;
  isUpdating: boolean;
  onCancel: () => void;
  onConfirm: (status: OrderStatus) => void;
}

const statuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export const AdminUpdateOrderModal = ({
  open,
  orderId,
  currentStatus,
  isUpdating,
  onCancel,
  onConfirm,
}: AdminUpdateOrderModalProps) => {
  const [status, setStatus] = useState<OrderStatus>(
    currentStatus ?? "pending"
  );

  useEffect(() => {
    if (currentStatus) {
      setStatus(currentStatus);
    }
  }, [currentStatus]);

  if (!open || orderId === null) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Update Order
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Order #{orderId}
            </p>
          </div>

          <button
            onClick={onCancel}
            disabled={isUpdating}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as OrderStatus)
            }
            disabled={isUpdating}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              text-gray-800
              outline-none
              focus:border-gray-400
            "
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-100">

          <button
            onClick={onCancel}
            disabled={isUpdating}
            className="
              px-4
              py-2.5
              rounded-lg
              text-sm
              font-medium
              text-gray-600
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(status)}
            disabled={isUpdating}
            className="
              px-5
              py-2.5
              rounded-lg
              bg-gray-900
              text-white
              text-sm
              font-medium
              hover:bg-gray-800
              transition
              disabled:opacity-50
              flex
              items-center
              gap-2
            "
          >
            {isUpdating && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}

            {isUpdating ? "Updating..." : "Update Order"}
          </button>

        </div>
      </div>
    </div>
  );
};