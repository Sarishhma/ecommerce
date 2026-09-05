import { Link, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  useAppDispatch,
  useAppSelector,
  selectCartItems,
  selectCartTotal,
} from "@/redux";

import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/slices/cartSlice";

import { useScrollReveal } from "../feature/home/hooks/use-scroll-reveal";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const contentReveal = useScrollReveal();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const checkoutData = {
      type: "cart" as const,
      items: cartItems,
    };

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/checkout",
          checkoutData,
        },
      });
      return;
    }

    navigate("/checkout", {
      state: { checkoutData },
    });
  };

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-[calc(var(--nav-height)+2rem)] pb-20">
        <div className="w-24 h-24 bg-sand/30 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-stone" />
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3">
          Your cart is empty
        </h2>

        <p className="text-stone mb-8 text-center max-w-md">
          Looks like you haven't added any products to your cart yet.
        </p>

        <Link
          to="/shop"
          className="px-8 py-3 bg-charcoal text-ivory rounded-full font-medium hover:bg-terracotta transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory/50">
      {/* HEADER - Full Width */}
      <div className="bg-white border-b border-sand/50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal text-center">
            Shopping Cart
          </h1>
          <p className="text-stone mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
        <div
          ref={contentReveal.ref as React.RefObject<HTMLDivElement | null>}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* CART ITEMS */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-sand/50 overflow-hidden">
              {/* Desktop Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-ivory/50 border-b border-sand/50 text-sm font-medium text-stone">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
            {/* Bottom Actions */}
              <div className="px-4 sm:px-6 py-4 bg-ivory/30 border-t border-sand/50 flex justify-between items-center">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-sm text-stone hover:text-red-500 transition-colors flex items-center gap-2 cursor-pointer "
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
                <Link
                  to="/shop"
                  className="text-sm text-terracotta  transition-colors"
                >
                  Continue Shopping →
                </Link>
              </div>
              {/* Items */}
              <div className="divide-y divide-sand/50">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:grid sm:grid-cols-12 gap-4 px-4 sm:px-6 py-6 hover:bg-ivory/30 transition-colors"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg bg-sand/20 flex-shrink-0 overflow-hidden border border-sand/30">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone text-xs">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.productId}`}
                          className="font-medium text-charcoal hover:text-terracotta transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-stone text-sm mt-0.5">
                          Rs{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="flex items-center gap-3 border border-sand/50 rounded-lg px-3 py-1.5 bg-white">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="cursor-pointer text-stone hover:text-terracotta disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          disabled={item.quantity >= item.maxQuantity}
                          className=" cursor-pointer text-stone hover:text-terracotta disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total & Remove */}
                    <div className="col-span-3 flex items-center justify-between sm:justify-end gap-4">
                      <span className="font-semibold text-charcoal">
                        Rs{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-stone hover:text-red-500 transition-colors p-1 hover:bg-red-50/50 rounded-full cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

  
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-6 sticky top-24">
              <h3 className="font-display text-xl font-semibold text-charcoal mb-6 pb-4 border-b border-sand/50">
                Order Summary
              </h3>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-stone">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium text-charcoal">
                    Rs{cartTotal.toFixed(2)}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex justify-between text-sm">
                  <span className="text-stone">Discount</span>
                  <span className="text-terracotta font-medium">-Rs0.00</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm pb-4 border-b border-sand/50">
                  <span className="text-stone">Shipping</span>
                  <span className="text-terracotta font-medium">Free</span>
                </div>

                {/* Total */}
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-base font-semibold text-charcoal">
                      Total
                    </span>
                    <span className=" text-2xl font-bold text-terracotta">
                      Rs{cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-stone mt-1 text-right">
                    Including VAT
                  </p>
                </div>

                {/* Promo Code */}
                <div className="pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-3 py-2 border border-sand/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta bg-ivory/30 text-charcoal placeholder-stone"
                    />
                    <button className="px-4 py-2 bg-charcoal text-ivory text-sm font-medium rounded-lg hover:bg-terracotta transition-colors whitespace-nowrap">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full mt-4 py-3.5 bg-charcoal text-ivory rounded-xl font-medium hover:bg-terracotta transition-colors shadow-sm"
                >
                  Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="flex justify-center gap-6 pt-4 text-xs text-stone">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    Free Shipping
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    100% Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};