import {
  CheckCircle,
  Truck,
  Package,
  Clock,
  AlertCircle,
} from "lucide-react";

import type { OrderStatus } from "../types/order.types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    icon: typeof Clock;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-gray-50 text-gray-700",
  },

  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    className: "bg-purple-50 text-purple-700",
  },

  processing: {
    label: "Processing",
    icon: Package,
    className: "bg-amber-50 text-amber-700",
  },

  shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-blue-50 text-blue-700",
  },

  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    className: "bg-green-50 text-green-700",
  },

  cancelled: {
    label: "Cancelled",
    icon: AlertCircle,
    className: "bg-red-50 text-red-700",
  },
};

export const OrderStatusBadge = ({
  status,
  size = "md",
}: OrderStatusBadgeProps) => {
  const current = statusConfig[status];

  const Icon = current.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${
        size === "sm"
          ? "px-2.5 py-1 text-xs"
          : "px-3 py-1.5 text-sm"
      } ${current.className}`}
    >
      <Icon
        className={
          size === "sm"
            ? "w-3.5 h-3.5"
            : "w-4 h-4"
        }
      />

      <span>{current.label}</span>
    </div>
  );
};