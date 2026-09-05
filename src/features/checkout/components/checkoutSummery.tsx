import type { CartItem } from "@/types";

interface CheckoutSummaryProps {
  items: CartItem[];
}

export const CheckoutSummary = ({ items }: CheckoutSummaryProps) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-6 lg:p-8">
      <h2 className="font-display text-xl font-semibold text-charcoal mb-6 pb-4 border-b border-sand/50">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-lg bg-sand/20 flex-shrink-0 overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-stone">
                  No image
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-charcoal truncate text-sm">
                {item.name}
              </p>
              <p className="text-xs text-stone">Qty: {item.quantity}</p>
              <p className="text-sm font-semibold text-charcoal">
                Rs{item.price.toFixed(2)}
              </p>
            </div>

            <div className="font-semibold text-charcoal text-sm">
              Rs{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-sand/50 mt-6 pt-6 space-y-3">
        <div className="flex justify-between text-sm text-stone">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-medium text-charcoal">
            Rs{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm text-stone">
          <span>Shipping</span>
          <span className="text-terracotta font-medium">Free</span>
        </div>

        <div className="flex justify-between text-sm text-stone border-b border-sand/50 pb-3">
          <span>Tax</span>
          <span className="font-medium text-charcoal">Rs0.00</span>
        </div>

        <div className="flex justify-between pt-2">
          <span className="font-display font-bold text-lg text-charcoal">
            Total
          </span>
          <span className="font-display font-bold text-2xl text-terracotta">
            Rs{subtotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};