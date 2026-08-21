import type { CartItem } from "@/types";

interface CheckoutSummaryProps {
  items: CartItem[];
}

export const CheckoutSummary = ({
  items,
}: CheckoutSummaryProps) => {
  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-6 lg:p-8">

      <h2 className="text-xl font-semibold text-charcoal mb-6">
        Order Summary
      </h2>

      <div className="space-y-5">

        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4"
          >

            {/* IMAGE */}
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-sand/20 flex-shrink-0">
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

            {/* INFO */}
            <div className="flex-1 min-w-0">

              <h3 className="font-medium text-charcoal truncate">
                {item.name}
              </h3>

              <p className="text-sm text-stone mt-1">
                Quantity: {item.quantity}
              </p>

              <p className="text-sm font-semibold text-charcoal mt-1">
                ${item.price.toFixed(2)}
              </p>

            </div>

            {/* ITEM TOTAL */}
            <div className="font-semibold text-charcoal">
              $
              {(item.price * item.quantity).toFixed(2)}
            </div>

          </div>
        ))}

      </div>

      {/* TOTALS */}
      <div className="border-t border-sand mt-6 pt-6 space-y-3">

        <div className="flex justify-between text-sm text-stone">
          <span>Subtotal</span>

          <span className="text-charcoal font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm text-stone">
          <span>Shipping</span>

          <span className="text-terracotta font-medium">
            Free
          </span>
        </div>

        <div className="border-t border-sand pt-4 flex justify-between">
          <span className="font-display font-bold text-lg text-charcoal">
            Total
          </span>

          <span className="font-display font-bold text-xl text-charcoal">
            ${subtotal.toFixed(2)}
          </span>
        </div>

      </div>

    </div>
  );
};