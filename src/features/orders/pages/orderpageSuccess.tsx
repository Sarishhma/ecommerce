import { Check, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div className="min-h-screen pt-[calc(var(--nav-height)+2rem)] pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl border border-sand/50 shadow-sm p-8 sm:p-12 text-center">

          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-7">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" strokeWidth={2.5} />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
            Order Placed!
          </h1>

          <p className="text-gray-500 mt-4 text-base sm:text-lg">
            Thank you for your order. We've received your order and
            will start processing it shortly.
          </p>

          {/* Order Number */}
          {order?.id && (
            <div className="mt-8 inline-flex flex-col items-center px-6 py-4 rounded-xl bg-sand/20">
              <span className="text-xs uppercase tracking-widest text-gray-400">
                Order Number
              </span>

              <span className="mt-1 text-lg font-semibold text-charcoal">
                #{order.id}
              </span>
            </div>
          )}

          {/* Order Status */}
          {order?.status && (
            <p className="mt-4 text-sm text-gray-500">
              Status:{" "}
              <span className="font-medium text-yellow-600 capitalize">
                {order.status}
              </span>
            </p>
          )}

          {/* Divider */}
          <div className="border-t border-sand my-8" />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1A1A1A] text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/track-order")}
              className="px-7 py-3.5 border border-[#1A1A1A] text-[#1A1A1A] rounded-lg font-medium hover:bg-neutral-50 transition-colors"
            >
              View My Orders
            </button>
          </div>

          {/* Bottom message */}
          <p className="text-xs text-gray-400 mt-8">
            A confirmation of your order details will be available
            in your orders.
          </p>
        </div>
      </div>
    </div>
  );
};