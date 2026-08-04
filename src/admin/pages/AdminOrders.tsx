import { Eye, Printer } from 'lucide-react';

const orders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', amount: '$89.99', status: 'Delivered', items: 2 },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-16', amount: '$156.50', status: 'Shipped', items: 1 },
  { id: 'ORD-003', customer: 'Bob Johnson', date: '2024-01-17', amount: '$234.00', status: 'Processing', items: 3 },
  { id: 'ORD-004', customer: 'Alice Williams', date: '2024-01-18', amount: '$67.25', status: 'Pending', items: 1 },
  { id: 'ORD-005', customer: 'Charlie Brown', date: '2024-01-19', amount: '$345.75', status: 'Delivered', items: 4 },
];

export const AdminOrders = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Orders</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Order ID</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Customer</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Items</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Amount</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
              <th className="text-center py-3 px-4 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-4 px-4 text-gray-800 font-medium">{order.id}</td>
                <td className="py-4 px-4 text-gray-600">{order.customer}</td>
                <td className="py-4 px-4 text-gray-600">{order.date}</td>
                <td className="py-4 px-4 text-gray-600">{order.items}</td>
                <td className="py-4 px-4 text-gray-800 font-medium">{order.amount}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 flex items-center justify-center gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="Print">
                    <Printer className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
