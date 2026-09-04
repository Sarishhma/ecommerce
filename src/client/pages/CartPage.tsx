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
  const isAuthenticated = useAppSelector(
    selectIsAuthenticated
  );

  const contentReveal = useScrollReveal();

  // --------------------------------
  // CHECKOUT
  // --------------------------------
 const handleCheckout = () => {
  if (cartItems.length === 0) {
    return;
  }

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
    state: {
      checkoutData,
    },
  });
};
  // --------------------------------
  // EMPTY CART
  // --------------------------------
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-[calc(var(--nav-height)+2rem)] pb-20">
        <div className="w-24 h-24 bg-sand/30 rounded-full flex items-center justify-center mb-6 text-terracotta">
          <ShoppingBag className="w-10 h-10" />
        </div>

        <h2 className="font-display text-4xl text-charcoal mb-4">
          Your Cart is Empty
        </h2>

        <p className="text-stone mb-8 text-center max-w-md">
          Looks like you haven't added any products to your
          cart yet. Discover our premium handcrafted
          collections.
        </p>

        <Link
          to="/shop"
          className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-charcoal transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[calc(var(--nav-height)+2rem)] pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
          Your Cart
        </h1>

        <p className="text-stone text-sm">
          {cartItems.length}{" "}
          {cartItems.length === 1
            ? "product"
            : "products"}{" "}
          in your cart
        </p>
      </div>

      <div
        ref={
          contentReveal.ref as React.RefObject<HTMLDivElement | null>
        }
        className="flex flex-col lg:flex-row gap-12"
      >

        {/* =================================
            CART ITEMS
        ================================= */}
        <div className="lg:w-2/3 flex flex-col">

          {/* HEADER */}
          <div className="border-b border-sand pb-4 hidden sm:grid grid-cols-12 gap-4 text-sm font-medium text-stone">
            <div className="col-span-6">
              Product
            </div>

            <div className="col-span-3 text-center">
              Quantity
            </div>

            <div className="col-span-3 text-right">
              Total
            </div>
          </div>

          {/* ITEMS */}
          <div className="flex flex-col space-y-6 py-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center border-b border-sand pb-6 last:border-0"
              >

                {/* PRODUCT */}
                <div className="col-span-6 flex items-center space-x-4 w-full">

                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-sand/30 flex-shrink-0">
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

                  <div className="flex flex-col flex-grow min-w-0">
                    <Link
                      to={`/product/${item.productId}`}
                      className="font-display text-lg font-bold text-charcoal hover:text-terracotta transition-colors truncate"
                    >
                      {item.name}
                    </Link>

                    <span className="text-stone font-medium">
                      Rs{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* =================================
                    QUANTITY
                ================================= */}
                <div className="col-span-3 flex items-center justify-center w-full sm:w-auto">

                  <div className="flex items-center justify-between border border-sand rounded-xl px-3 py-2 bg-white w-28">

                    {/* MINUS */}
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity:
                              item.quantity - 1,
                          })
                        )
                      }
                      className="text-stone hover:text-terracotta transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    {/* QUANTITY */}
                    <span className="font-medium text-charcoal text-sm">
                      {item.quantity}
                    </span>

                    {/* PLUS */}
                    <button
                      type="button"
                      disabled={
                        item.quantity >=
                        item.maxQuantity
                      }
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity:
                              item.quantity + 1,
                          })
                        )
                      }
                      className="text-stone hover:text-terracotta transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                  </div>
                </div>

                {/* =================================
                    TOTAL / REMOVE
                ================================= */}
                <div className="col-span-3 flex items-center justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 space-x-4">

                  <span className="font-body font-bold text-charcoal sm:mr-4">
                    Rs
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                    className="p-2 text-stone hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* CLEAR */}
          <div className="mt-4 flex justify-start">
            <button
              type="button"
              onClick={() =>
                dispatch(clearCart())
              }
              className="text-sm font-medium text-stone hover:text-charcoal underline transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* =================================
            ORDER SUMMARY
        ================================= */}
        <div className="lg:w-1/3">

          <div className="bg-sand/20 rounded-3xl p-8 sticky top-32">

            <h3 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-sand/50 pb-4">
              Order Summary
            </h3>

            {/* SUBTOTAL */}
            <div className="flex justify-between items-center mb-4 text-stone">
              <span>
                Subtotal (
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "item"
                  : "items"}
                )
              </span>

              <span className="font-medium text-charcoal">
                Rs{cartTotal.toFixed(2)}
              </span>
            </div>

            {/* SHIPPING */}
            <div className="flex justify-between items-center mb-6 text-stone border-b border-sand/50 pb-6">
              <span>Shipping</span>

              <span className="font-medium text-terracotta">
                Free
              </span>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center mb-8">
              <span className="font-display font-bold text-xl text-charcoal">
                Estimated Total
              </span>

              <span className="font-display font-bold text-2xl text-charcoal">
                Rs{cartTotal.toFixed(2)}
              </span>
            </div>

            {/* CHECKOUT */}
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-4 px-6 bg-charcoal text-white rounded-xl font-bold text-lg hover:bg-terracotta transition-colors shadow-lg mb-4"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="block text-center text-sm font-medium text-stone hover:text-charcoal transition-colors"
            >
              Continue Shopping
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
};