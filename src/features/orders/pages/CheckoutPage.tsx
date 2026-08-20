import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppSelector } from "@/redux";
import { selectUser } from "@/redux/slices/authSlice";
import { CheckoutSummary } from "../components/CheckOutSummery";
import { useCreateOrder } from "../hooks/useCreate.hook";



export const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const { mutate: createOrder, isPending } = useCreateOrder();

  // Product passed from ProductCard → Buy Now
  const buyNow = location.state?.buyNow;

  const [shippingAddress, setShippingAddress] = useState(
    user?.address ?? ""
  );

  const [phoneNumber, setPhoneNumber] = useState(
    user?.phone_number ?? ""
  );

  // No product was passed
  if (!buyNow) {
    return (
      <div className="min-h-screen pt-[calc(var(--nav-height)+4rem)] px-4 text-center">
        <h2 className="text-2xl font-semibold text-charcoal">
          No product selected
        </h2>

        <p className="text-gray-500 mt-2">
          Please select a product before going to checkout.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-[#1A1A1A] text-white rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const { product, quantity } = buyNow;

  const handlePlaceOrder = () => {
    if (!shippingAddress.trim()) {
      alert("Please enter your shipping address.");
      return;
    }

    if (!phoneNumber.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    createOrder(
      {
        shipping_address: shippingAddress,
        phone_number: phoneNumber,
        items: [
          {
            product: Number(product.id),
            quantity,
          },
        ],
      },
      {
       onSuccess: (order) => {
  navigate("/order-success", {
    state: {
      order,
    },
    replace: true,
  });
},

        onError: (error) => {
          console.error("Failed to place order:", error);
          alert("Failed to place order. Please try again.");
        },
      }
    );
  };

  return (
    <div className="pt-[calc(var(--nav-height)+2rem)] pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
          Checkout
        </h1>

        <p className="text-gray-500 mt-2">
          Review your order and enter your delivery information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Delivery Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-6 lg:p-8">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            Delivery Information
          </h2>

          <div className="space-y-6">
            {/* Shipping Address */}
            <div>
              <label
                htmlFor="shippingAddress"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                Shipping Address
              </label>

              <textarea
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) =>
                  setShippingAddress(e.target.value)
                }
                rows={4}
                placeholder="Enter your shipping address"
                className="w-full border border-sand rounded-lg px-4 py-3 text-sm outline-none focus:border-terracotta resize-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                Phone Number
              </label>

              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
                placeholder="Enter your phone number"
                className="w-full border border-sand rounded-lg px-4 py-3 text-sm outline-none focus:border-terracotta"
              />
            </div>

            {/* Default address information */}
            {user?.address && (
              <p className="text-xs text-gray-500">
                Your saved profile address has been added automatically.
                You can change it for this order.
              </p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <CheckoutSummary
            product={product}
            quantity={quantity}
          />

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            disabled={isPending}
            className="w-full mt-6 py-3.5 bg-[#1A1A1A] text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Placing Order..." : "Place Order"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By placing your order, you confirm that your delivery
            information is correct.
          </p>
        </div>
      </div>
    </div>
  );
};