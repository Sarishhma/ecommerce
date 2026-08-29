import type { Order } from "@/features/orders/types/order.types";
import {
  ShoppingBag,
  Clock,
  Package,
  CheckCircle,
} from "lucide-react";



interface OrderStatsProps {
  orders: Order[];
}

export const OrderStats = ({
  orders,
}: OrderStatsProps) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      order.status === "processing" ||
      order.status === "confirmed"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

      <StatCard
        title="Total Orders"
        value={totalOrders}
        icon={ShoppingBag}
        iconClass="bg-gray-100 text-gray-700"
      />

      <StatCard
        title="Pending"
        value={pendingOrders}
        icon={Clock}
        iconClass="bg-amber-100 text-amber-700"
      />

      <StatCard
        title="Processing"
        value={processingOrders}
        icon={Package}
        iconClass="bg-purple-100 text-purple-700"
      />

      <StatCard
        title="Delivered"
        value={deliveredOrders}
        icon={CheckCircle}
        iconClass="bg-green-100 text-green-700"
      />

    </div>
  );
};


interface StatCardProps {
  title: string;
  value: number;
  icon: typeof ShoppingBag;
  iconClass: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconClass,
}: StatCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {value}
          </p>
        </div>

        <div
          className={`
            w-11
            h-11
            rounded-xl
            flex
            items-center
            justify-center
            ${iconClass}
          `}
        >
          <Icon className="w-5 h-5" />
        </div>

      </div>

    </div>
  );
};