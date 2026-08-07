import type { CartItemInput, CartResponse } from "@/client/feature/cart/schema/cart.schema";

export interface Product {
  id: number
  title: string
  slug: string
  description: string
  image: string | null
  price: number
  is_taxable: boolean
  product_id: number | null
  unit: string
  category: number | null
  barcode: string | null
  reconcile: boolean
  is_billing_item: boolean
  ledger: number | null
  ledger_name: string | null
  opening_count: number
  is_produced: boolean
  cost_price: number
  discount_exempt: boolean
  minimum_stock: number
  excise_duty_applicable: boolean
  importtax_percent: string
}

export interface Collection {
  name: string;
  slug: string;
  count: string;
  image: string;
  blurb: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
  avatar: string;
}

export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  content?: string;
  date: string;
}

export interface CraftStep {
  icon: string;
  step: string;
  title: string;
  text: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  caption: string;
}


export type CartItem = CartItemInput
export type Cart = CartResponse