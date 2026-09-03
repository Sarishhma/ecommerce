import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$24,567',
      change: '+12.5%',
    },
    {
      label: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
    },
    {
      label: 'Products',
      value: '156',
      change: '+2',
    },
    {
      label: 'Customers',
      value: '3,456',
      change: '+15.3%',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: '$89.99', status: 'Delivered' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$156.50', status: 'Processing' },
    { id: 'ORD-003', customer: 'Bob Johnson', amount: '$234.00', status: 'Shipped' },
    { id: 'ORD-004', customer: 'Alice Williams', amount: '$67.25', status: 'Pending' },
  ];

  const topProducts = [
    { name: 'Handcrafted Ceramic Bowl', sales: 234, revenue: '$2,106' },
    { name: 'Artisan Textiles Set', sales: 189, revenue: '$1,701' },
    { name: 'Premium Collection Box', sales: 145, revenue: '$2,320' },
    { name: 'Seasonal Limited Edition', sales: 98, revenue: '$1,568' },
  ];

  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone font-semibold mb-1">Overview</p>
          <h1 className="text-3xl font-display text-charcoal">Dashboard</h1>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-stone">{stat.label}</h3>
            </div>
            <p className="text-3xl font-display text-charcoal mb-2">{stat.value}</p>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{stat.change} from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display text-charcoal">Recent Orders</h2>
            <button className="text-xs font-medium text-terracotta hover:text-copper transition-colors tracking-wide">
              View All
            </button>
          </div>
          <div className="overflow-x-auto custom-scrollbar -mx-6 px-6">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 text-[10px] uppercase tracking-wider text-stone font-semibold">Order ID</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-wider text-stone font-semibold">Customer</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-wider text-stone font-semibold">Amount</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-wider text-stone font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-sand/20 transition-colors group">
                    <td className="py-4 text-charcoal font-medium text-sm group-hover:text-terracotta transition-colors">{order.id}</td>
                    <td className="py-4 text-charcoal/80">{order.customer}</td>
                    <td className="py-4 text-charcoal font-medium">{order.amount}</td>
                    <td className="py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border",
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : order.status === 'Shipped'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : order.status === 'Processing'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-xl font-display text-charcoal mb-6">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3.5 bg-sand/30 hover:bg-sand/50 rounded-xl transition-colors border border-transparent hover:border-border/50">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-sm font-medium text-charcoal truncate">{product.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone mt-1">{product.sales} sales</p>
                </div>
                <p className="text-sm font-semibold text-charcoal shrink-0">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-xl font-display text-charcoal mb-6">Sales Activity</h2>
        <div className="h-72 bg-gradient-to-br from-sand/30 to-sand/10 border border-dashed border-border rounded-xl flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-10 h-10 text-stone mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium text-stone uppercase tracking-widest">Sales chart integration pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};
