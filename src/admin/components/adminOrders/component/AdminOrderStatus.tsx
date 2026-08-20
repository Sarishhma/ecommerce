import type { OrderStatus } from "@/features/orders/types/order.types";
import {
  CheckCircle,
  Truck,
  Package,
  Clock,
  XCircle,
} from "lucide-react";



interface AdminOrderStatusProps {
  status: OrderStatus;
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock;
  }
> = {
  pending: {
    label: "Pending",
    className: "bg-gray-100 text-gray-700",
    icon: Clock,
  },

  confirmed: {
    label: "Confirmed",
    className: "bg-purple-100 text-purple-700",
    icon: CheckCircle,
  },

  processing: {
    label: "Processing",
    className: "bg-amber-100 text-amber-700",
    icon: Package,
  },

  shipped: {
    label: "Shipped",
    className: "bg-blue-100 text-blue-700",
    icon: Truck,
  },

  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },

  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

export const AdminOrderStatus = ({
  status,
}: AdminOrderStatusProps) => {
  const config = statusConfig[status];

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-3
        py-1.5
        rounded-full
        text-xs
        font-medium
        ${config.className}
      `}
    >
      <Icon className="w-3.5 h-3.5" />

      {config.label}
    </span>
  );
};