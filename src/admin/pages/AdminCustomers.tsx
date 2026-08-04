import { Mail, Phone } from 'lucide-react';

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-555-0101', orders: 5, spent: '$456.75' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-555-0102', orders: 3, spent: '$234.50' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1-555-0103', orders: 8, spent: '$678.90' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '+1-555-0104', orders: 2, spent: '$145.25' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1-555-0105', orders: 6, spent: '$567.80' },
];

export const AdminCustomers = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Customers</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Name</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Email</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Phone</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Orders</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-4 px-4 text-gray-800 font-medium">{customer.name}</td>
                <td className="py-4 px-4 text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {customer.email}
                </td>
                <td className="py-4 px-4 text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {customer.phone}
                </td>
                <td className="py-4 px-4 text-gray-600">{customer.orders}</td>
                <td className="py-4 px-4 text-gray-800 font-medium">{customer.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
