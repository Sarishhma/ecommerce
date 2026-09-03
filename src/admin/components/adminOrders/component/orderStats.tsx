import type { Order } from "@/features/orders/types/order.types";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      <StatCard
        title="Total Orders"
        value={totalOrders}
      />
      <StatCard
        title="Pending"
        value={pendingOrders}
      />
      <StatCard
        title="Processing"
        value={processingOrders}
      />
      <StatCard
        title="Delivered"
        value={deliveredOrders}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({
  title,
  value,
}: StatCardProps) => {
  return (
    <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs uppercase tracking-wider font-semibold text-stone">
          {title}
        </h3>
      </div>
      <p className="text-3xl font-display text-charcoal mb-2">
        {value}
      </p>
    </div>
  );
};