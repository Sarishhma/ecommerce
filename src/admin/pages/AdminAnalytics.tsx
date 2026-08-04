import { TrendingUp, Calendar } from 'lucide-react';

export const AdminAnalytics = () => {
  const analyticsData = [
    { month: 'January', revenue: '$12,500', orders: 145, customers: 245 },
    { month: 'February', revenue: '$14,300', orders: 167, customers: 287 },
    { month: 'March', revenue: '$15,800', orders: 189, customers: 312 },
    { month: 'April', revenue: '$18,200', orders: 203, customers: 345 },
    { month: 'May', revenue: '$20,500', orders: 228, customers: 378 },
    { month: 'June', revenue: '$24,567', orders: 267, customers: 412 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics</h1>

      {/* Date Range Picker */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>Showing data for the last 6 months</span>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Month</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Revenue</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Orders</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">New Customers</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Trend</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map((data, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-4 px-4 text-gray-800 font-medium">{data.month}</td>
                <td className="py-4 px-4 text-gray-800 font-medium">{data.revenue}</td>
                <td className="py-4 px-4 text-gray-600">{data.orders}</td>
                <td className="py-4 px-4 text-gray-600">{data.customers}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+{index + 1}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue Trend</h2>
          <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization placeholder</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Distribution</h2>
          <div className="h-48 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};
