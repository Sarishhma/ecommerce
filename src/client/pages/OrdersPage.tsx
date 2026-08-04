import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Download, Eye } from 'lucide-react';
import { useScrollReveal } from '@/features/home/hooks/use-scroll-reveal';

// TODO: Replace with real order data from backend
const mockOrders = [
  {
    id: '#CC-2024-001',
    date: 'March 15, 2024',
    total: 287.50,
    status: 'delivered',
    items: 3,
    trackingNumber: 'TRK-123456789',
    estimatedDelivery: 'Delivered on March 18, 2024',
    products: [
      { name: 'Premium Tibetan Incense', price: 45.00, quantity: 2 },
      { name: 'Meditation Cushion', price: 197.50, quantity: 1 },
    ]
  },
  {
    id: '#CC-2024-002',
    date: 'March 8, 2024',
    total: 124.99,
    status: 'shipped',
    items: 1,
    trackingNumber: 'TRK-987654321',
    estimatedDelivery: 'Expected delivery March 22, 2024',
    products: [
      { name: 'Singing Bowl Set', price: 124.99, quantity: 1 },
    ]
  },
  {
    id: '#CC-2024-003',
    date: 'February 28, 2024',
    total: 89.00,
    status: 'processing',
    items: 2,
    trackingNumber: null,
    estimatedDelivery: 'Expected to ship by March 5, 2024',
    products: [
      { name: 'Prayer Flags Bundle', price: 45.00, quantity: 1 },
      { name: 'Mala Beads', price: 44.00, quantity: 1 },
    ]
  },
];

const statusConfig = {
  delivered: { color: 'bg-green-50 border-green-200', label: 'Delivered', icon: 'text-green-600' },
  shipped: { color: 'bg-blue-50 border-blue-200', label: 'Shipped', icon: 'text-blue-600' },
  processing: { color: 'bg-yellow-50 border-yellow-200', label: 'Processing', icon: 'text-yellow-600' },
  cancelled: { color: 'bg-red-50 border-red-200', label: 'Cancelled', icon: 'text-red-600' },
};

export const OrdersPage = () => {
  const contentReveal = useScrollReveal();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (mockOrders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-24 pb-20">
        <div className="w-24 h-24 bg-sand/30 rounded-full flex items-center justify-center mb-6 text-terracotta">
          <Package className="w-10 h-10" />
        </div>
        <h2 className="font-display text-4xl text-charcoal mb-4">No Orders Yet</h2>
        <p className="text-stone mb-8 text-center max-w-md">You haven&apos;t placed any orders. Start shopping and your order history will appear here.</p>
        <Link to="/shop" className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-charcoal transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">Order History</h1>
        <p className="text-stone text-lg">{mockOrders.length} order{mockOrders.length !== 1 ? 's' : ''}</p>
      </div>

      <div ref={contentReveal.ref as React.RefObject<HTMLDivElement | null>} className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-sand/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Order Header - Summary */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-sand/10 transition-colors"
            >
              <div className="flex items-center space-x-6 flex-grow text-left">
                <div className="hidden sm:block">
                  <Package className={`w-8 h-8 ${statusConfig[order.status as keyof typeof statusConfig].icon}`} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-display font-bold text-lg text-charcoal">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[order.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                  <p className="text-sm text-stone">{order.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right hidden sm:block">
                  <p className="font-display font-bold text-lg text-charcoal">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-stone">{order.items} item{order.items !== 1 ? 's' : ''}</p>
                </div>
                <ChevronRight className={`w-5 h-5 text-stone transition-transform ${expandedOrder === order.id ? 'rotate-90' : ''}`} />
              </div>
            </button>

            {/* Expanded Order Details */}
            {expandedOrder === order.id && (
              <div className="border-t border-sand/50 p-6 space-y-6 bg-sand/5">
                {/* Order Status Timeline */}
                <div>
                  <h4 className="font-medium text-charcoal mb-4">Shipping Status</h4>
                  <div className="bg-white border border-sand rounded-lg p-4">
                    <p className="text-sm font-medium text-charcoal">{order.estimatedDelivery}</p>
                    {order.trackingNumber && (
                      <p className="text-sm text-stone mt-2">Tracking: <span className="font-mono text-charcoal">{order.trackingNumber}</span></p>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-medium text-charcoal mb-4">Order Items</h4>
                  <div className="space-y-2">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-sand/30 last:border-0">
                        <div>
                          <p className="text-charcoal font-medium">{product.name}</p>
                          <p className="text-sm text-stone">Quantity: {product.quantity}</p>
                        </div>
                        <p className="text-charcoal font-medium">${product.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white border border-sand rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone">Subtotal</span>
                    <span className="text-charcoal font-medium">${(order.total * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone">Shipping</span>
                    <span className="text-charcoal font-medium">$15.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone">Tax</span>
                    <span className="text-charcoal font-medium">${(order.total * 0.1 - 15).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-sand pt-3 flex justify-between">
                    <span className="font-medium text-charcoal">Total</span>
                    <span className="font-display font-bold text-lg text-charcoal">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-terracotta text-terracotta rounded-lg font-medium hover:bg-terracotta hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-terracotta text-terracotta rounded-lg font-medium hover:bg-terracotta hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Invoice</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
