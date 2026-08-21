import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useAppSelector,
} from "@/redux";

import {
  selectUser,
} from "@/redux/slices/authSlice";






import type {
  CheckoutData,
} from "../types/checkout.types";

import type {
  CartItem,
} from "@/types";
import { useCreateOrder } from "@/features/orders/hooks/useCreate.hook";
import { DeliveryInformation } from "../components/DelieveryInformation";
import { CheckoutSummary } from "../components/checkoutSummery";


export const CheckoutPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const {
    mutate: createOrder,
    isPending,
  } = useCreateOrder();


  // ========================================
  // CHECKOUT DATA
  // ========================================

  const checkoutData =
    location.state?.checkoutData as
      | CheckoutData
      | undefined;


  // ========================================
  // DELIVERY STATE
  // ========================================

  const [shippingAddress, setShippingAddress] =
    useState(user?.address ?? "");

  const [phoneNumber, setPhoneNumber] =
    useState(user?.phone_number ?? "");


  // ========================================
  // CONVERT CHECKOUT DATA TO ITEMS
  // ========================================

  let checkoutItems: CartItem[] = [];


  // BUY NOW
  if (
    checkoutData?.type === "buyNow" &&
    checkoutData.product
  ) {

    const product =
      checkoutData.product;

    checkoutItems = [
      {
        id: crypto.randomUUID(),

        productId: String(
          product.id
        ),

        slug: product.slug ?? "",

        name:
          product.title ??
          product.name ??
          "Product",

        image:
          product.image ?? "",

        price:
          typeof product.price === "number"
            ? product.price
            : 0,

        quantity:
          checkoutData.quantity ?? 1,

        maxQuantity:
          product.opening_count ??
          product.maxQuantity ??
          99,
      },
    ];
  }


  // CART CHECKOUT
  if (
    checkoutData?.type === "cart" &&
    checkoutData.items
  ) {

    checkoutItems =
      checkoutData.items;
  }


  // ========================================
  // NO CHECKOUT DATA
  // ========================================

  if (
    !checkoutData ||
    checkoutItems.length === 0
  ) {

    return (
      <div className="min-h-screen pt-[calc(var(--nav-height)+4rem)] px-4 flex flex-col items-center text-center">

        <h2 className="text-2xl font-semibold text-charcoal">
          No product selected
        </h2>

        <p className="text-stone mt-2">
          Please select a product before going
          to checkout.
        </p>

        <button
          onClick={() =>
            navigate("/shop")
          }
          className="mt-6 px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-terracotta transition-colors"
        >
          Continue Shopping
        </button>

      </div>
    );
  }


  // ========================================
  // PLACE ORDER
  // ========================================

  const handlePlaceOrder = () => {

    if (!shippingAddress.trim()) {

      alert(
        "Please enter your shipping address."
      );

      return;
    }


    if (!phoneNumber.trim()) {

      alert(
        "Please enter your phone number."
      );

      return;
    }


    createOrder(
      {
        shipping_address:
          shippingAddress,

        phone_number:
          phoneNumber,

        items:
          checkoutItems.map((item) => ({
            product: Number(
              item.productId
            ),

            quantity:
              item.quantity,
          })),
      },

      {
        onSuccess: (order) => {

          navigate(
            "/order-success",
            {
              state: {
                order,
              },

              replace: true,
            }
          );
        },

        onError: (error) => {

          console.error(
            "Failed to place order:",
            error
          );

          alert(
            "Failed to place order. Please try again."
          );
        },
      }
    );
  };


  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="pt-[calc(var(--nav-height)+2rem)] pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
          Checkout
        </h1>

        <p className="text-stone mt-2">
          Review your order and enter your
          delivery information.
        </p>

      </div>


      {/* CONTENT */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* DELIVERY */}

        <DeliveryInformation
          user={user}
          shippingAddress={
            shippingAddress
          }
          phoneNumber={
            phoneNumber
          }
          onShippingAddressChange={
            setShippingAddress
          }
          onPhoneNumberChange={
            setPhoneNumber
          }
        />


        {/* SUMMARY */}

        <div>

          <CheckoutSummary
            items={checkoutItems}
          />


          {/* PLACE ORDER */}

          <button
            onClick={
              handlePlaceOrder
            }
            disabled={isPending}
            className="w-full mt-6 py-3.5 bg-charcoal text-white rounded-lg font-medium hover:bg-terracotta transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {isPending
              ? "Placing Order..."
              : "Place Order"}

          </button>


          <p className="text-xs text-stone text-center mt-3">
            By placing your order, you
            confirm that your delivery
            information is correct.
          </p>

        </div>

      </div>

    </div>
  );
};