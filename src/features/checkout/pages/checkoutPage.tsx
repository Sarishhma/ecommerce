import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux";
import { selectUser } from "@/redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import type { CheckoutData } from "../types/checkout.types";
import type { CartItem } from "@/types";
import { useCreateOrder } from "@/features/orders/hooks/useCreate.hook";
import { DeliveryInformation } from "../components/DelieveryInformation";
import { CheckoutSummary } from "../components/checkoutSummery";
import { ArrowLeft, ShoppingBag, Shield, Truck, Clock } from "lucide-react";

export const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { mutate: createOrder, isPending } = useCreateOrder();

  const checkoutData = location.state?.checkoutData as CheckoutData | undefined;

  const [shippingAddress, setShippingAddress] = useState(user?.address ?? "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number ?? "");

  let checkoutItems: CartItem[] = [];

  if (checkoutData?.type === "buyNow" && checkoutData.product) {
    const product = checkoutData.product;
    checkoutItems = [
      {
        id: crypto.randomUUID(),
        productId: String(product.id),
        slug: product.slug ?? "",
        name: product.title ?? product.name ?? "Product",
        image: product.image ?? "",
        price: typeof product.price === "number" ? product.price : 0,
        quantity: checkoutData.quantity ?? 1,
        maxQuantity: product.opening_count ?? product.maxQuantity ?? 99,
      },
    ];
  }

  if (checkoutData?.type === "cart" && checkoutData.items) {
    checkoutItems = checkoutData.items;
  }

  if (!checkoutData || checkoutItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-[calc(var(--nav-height)+2rem)] pb-20">
        <div className="w-24 h-24 bg-sand/30 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-stone" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-3">
          No product selected
        </h2>
        <p className="text-stone mb-8 text-center max-w-md">
          Please select a product before going to checkout.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="px-8 py-3 bg-charcoal text-ivory rounded-full font-medium hover:bg-terracotta transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

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
        items: checkoutItems.map((item) => ({
          product: Number(item.productId),
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: (order) => {
          // Clear the cart only if it was a cart checkout
          if (checkoutData?.type === "cart") {
            dispatch(clearCart());
          }
          
          navigate("/order-success", { 
            state: { order }, 
            replace: true 
          });
        },
        onError: (error) => {
          console.error("Failed to place order:", error);
          alert("Failed to place order. Please try again.");
        },
      }
    );
  };

  const subtotal = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-ivory/50 pb-20 lg:pb-32">
      {/* Header - Full Width */}
      <div className="bg-white border-b border-sand/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone hover:text-charcoal transition-colors text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
            Checkout
          </h1>
          <p className="text-stone mt-1">Review your order and enter delivery information</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Delivery - Takes 2/5 */}
          <div className="lg:col-span-2">
            <DeliveryInformation
              user={user}
              shippingAddress={shippingAddress}
              phoneNumber={phoneNumber}
              onShippingAddressChange={setShippingAddress}
              onPhoneNumberChange={setPhoneNumber}
            />
          </div>

          {/* Summary - Takes 3/5 */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <CheckoutSummary items={checkoutItems} />

              {/* Place Order Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-stone">Total Amount</p>
                    <p className="font-display text-3xl font-bold text-terracotta">
                      Rs{subtotal.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPending}
                    className="px-8 py-3.5 bg-charcoal text-ivory rounded-xl font-medium hover:bg-terracotta transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-sand/50">
                  <p className="text-xs text-stone">
                    By placing your order, you confirm your delivery information is correct
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-stone">
                      <Shield className="w-4 h-4 text-terracotta" />
                      Secure
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-stone">
                      <Truck className="w-4 h-4 text-terracotta" />
                      Free Shipping
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-stone">
                      <Clock className="w-4 h-4 text-terracotta" />
                      Fast Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};