import { useState } from 'react';
import { Package, Truck, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  estimatedDelivery: string;
  currentLocation?: string;
  timeline: Array<{
    step: string;
    date: string;
    status: 'completed' | 'current' | 'pending';
  }>;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      { name: 'Handcrafted Ceramic Bowl', quantity: 1, price: 89.00 },
      { name: 'Artisan Textiles', quantity: 2, price: 45.00 },
    ],
    total: 179.00,
    estimatedDelivery: '2024-01-22',
    currentLocation: 'Delivered to recipient',
    timeline: [
      { step: 'Order Placed', date: '2024-01-15', status: 'completed' },
      { step: 'Processing', date: '2024-01-16', status: 'completed' },
      { step: 'Shipped', date: '2024-01-17', status: 'completed' },
      { step: 'Out for Delivery', date: '2024-01-21', status: 'completed' },
      { step: 'Delivered', date: '2024-01-22', status: 'completed' },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'shipped',
    items: [{ name: 'Premium Artisan Collection', quantity: 1, price: 250.00 }],
    total: 250.00,
    estimatedDelivery: '2024-01-28',
    currentLocation: 'In transit - Chicago Hub',
    timeline: [
      { step: 'Order Placed', date: '2024-01-20', status: 'completed' },
      { step: 'Processing', date: '2024-01-20', status: 'completed' },
      { step: 'Shipped', date: '2024-01-21', status: 'completed' },
      { step: 'Out for Delivery', date: '2024-01-28', status: 'pending' },
      { step: 'Delivered', date: 'TBD', status: 'pending' },
    ],
  },
  {
    id: 'ORD-003',
    date: '2024-01-22',
    status: 'processing',
    items: [{ name: 'Seasonal Collection Box', quantity: 1, price: 199.99 }],
    total: 199.99,
    estimatedDelivery: '2024-01-30',
    timeline: [
      { step: 'Order Placed', date: '2024-01-22', status: 'completed' },
      { step: 'Processing', date: '2024-01-22', status: 'current' },
      { step: 'Shipped', date: 'TBD', status: 'pending' },
      { step: 'Out for Delivery', date: 'TBD', status: 'pending' },
      { step: 'Delivered', date: 'TBD', status: 'pending' },
    ],
  },
];

export const TrackOrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(mockOrders[0]);
  const [trackingNumber, setTrackingNumber] = useState('');

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-amber-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-600" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-50 text-green-700';
      case 'shipped':
        return 'bg-blue-50 text-blue-700';
      case 'processing':
        return 'bg-amber-50 text-amber-700';
      case 'pending':
        return 'bg-gray-50 text-gray-700';
      case 'cancelled':
        return 'bg-red-50 text-red-700';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-charcoal mb-2">Track Your Order</h1>
        <p className="text-stone mb-12">Enter your order number or view your recent orders</p>

        {/* Search Bar */}
        <div className="bg-ivory rounded-lg p-8 mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter order number (e.g., ORD-001)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
            <button className="px-6 py-3 bg-terracotta text-ivory rounded-lg font-medium hover:bg-opacity-90 transition">
              Track
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-charcoal mb-4">Your Orders</h2>
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selectedOrder?.id === order.id
                      ? 'border-terracotta bg-terracotta/5'
                      : 'border-sand hover:border-terracotta/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold text-charcoal">{order.id}</span>
                    {getStatusIcon(order.status)}
                  </div>
                  <p className="text-sm text-stone mb-2">{order.date}</p>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="lg:col-span-2">
              {/* Status Overview */}
              <div className="bg-ivory rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-charcoal">{selectedOrder.id}</h2>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span>{getStatusLabel(selectedOrder.status)}</span>
                  </div>
                </div>

                {selectedOrder.currentLocation && (
                  <div className="flex items-center space-x-2 text-sm text-stone mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedOrder.currentLocation}</span>
                  </div>
                )}

                <p className="text-sm text-stone">
                  Estimated delivery: <span className="font-semibold text-charcoal">{selectedOrder.estimatedDelivery}</span>
                </p>
              </div>

              {/* Timeline */}
              <div className="bg-ivory rounded-lg p-6 mb-8">
                <h3 className="font-bold text-charcoal mb-6">Delivery Timeline</h3>
                <div className="space-y-4">
                  {selectedOrder.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            event.status === 'completed'
                              ? 'bg-terracotta'
                              : event.status === 'current'
                              ? 'bg-amber-500 animate-pulse'
                              : 'bg-sand'
                          }`}
                        />
                        {index < selectedOrder.timeline.length - 1 && (
                          <div className="w-1 h-12 bg-sand mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-semibold text-charcoal">{event.step}</p>
                        <p className="text-sm text-stone">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-ivory rounded-lg p-6">
                <h3 className="font-bold text-charcoal mb-4">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-sand last:border-0">
                      <div>
                        <p className="font-medium text-charcoal">{item.name}</p>
                        <p className="text-sm text-stone">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-charcoal">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-sand flex items-center justify-between">
                  <p className="font-bold text-charcoal">Total:</p>
                  <p className="text-xl font-bold text-terracotta">${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
