import type { Product } from "@/types";

interface CheckoutSummaryProps {
  product: Product;
  quantity: number;
}

export const CheckoutSummary = ({
  product,
  quantity,
}: CheckoutSummaryProps) => {
  const total = Number(product.price) * quantity;

  return (
    <div className="bg-white border border-sand/50 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-charcoal mb-6">
        Order Summary
      </h2>

      <div className="flex gap-4 pb-6 border-b border-sand">
        {/* Product Image */}
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="font-medium text-charcoal">
            {product.title}
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Quantity: {quantity}
          </p>

          <p className="text-sm text-gray-500">
            Price: ${Number(product.price).toFixed(2)}
          </p>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className="font-semibold text-charcoal">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-lg font-semibold text-charcoal">
          Total
        </span>

        <span className="text-xl font-bold text-charcoal">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};