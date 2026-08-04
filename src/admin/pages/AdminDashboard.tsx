import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

export const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$24,567',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Products',
      value: '156',
      change: '+2',
      icon: Package,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Customers',
      value: '3,456',
      change: '+15.3%',
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.change} from last month</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-gray-600">Order ID</th>
                  <th className="text-left py-2 px-3 text-gray-600">Customer</th>
                  <th className="text-left py-2 px-3 text-gray-600">Amount</th>
                  <th className="text-left py-2 px-3 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800 font-medium">{order.id}</td>
                    <td className="py-3 px-3 text-gray-600">{order.customer}</td>
                    <td className="py-3 px-3 text-gray-800 font-medium">{order.amount}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
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
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                <p className="text-sm font-bold text-gray-800">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Sales Activity</h2>
        <div className="h-64 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Sales chart placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};
