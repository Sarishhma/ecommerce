import type { Product } from "@/types";
import type { CartItem } from "@/types";

export type BuyNowCheckout = {
  type: "buyNow";
  product: Product;
  quantity: number;
};

export type CartCheckout = {
  type: "cart";
  items: CartItem[];
};

export type CheckoutData =
  | BuyNowCheckout
  | CartCheckout;