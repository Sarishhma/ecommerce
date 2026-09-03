import { useEffect, useState } from "react";
import { X, Loader2, ShoppingCart } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-ivory border border-border shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-terracotta" />
            </div>
            <div>
              <h2 className="font-display text-xl text-charcoal">Update Order</h2>
              <p className="text-xs text-stone mt-0.5">Order #{orderId}</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isUpdating}
            className="p-1.5 rounded-lg text-stone hover:bg-sand/60 hover:text-charcoal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone mb-2">
            Order Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            disabled={isUpdating}
            className="w-full px-4 py-3 rounded-xl border border-border bg-white/60 text-sm text-charcoal outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-sand">
          <button
            onClick={onCancel}
            disabled={isUpdating}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-charcoal border border-border hover:bg-sand/60 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(status)}
            disabled={isUpdating}
            className="px-5 py-2.5 rounded-xl bg-terracotta text-ivory text-sm font-semibold hover:bg-copper transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            {isUpdating ? "Updating..." : "Update Order"}
          </button>
        </div>
      </div>
    </div>
  );
};
