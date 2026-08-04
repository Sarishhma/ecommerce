export interface CartItem {
  id: Number; // cart line-item id
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  maxQuantity: number; // stock cap, used to clamp quantity changes
  variant?: {
    id: string;
    label: string; // e.g. "8mm / 108 beads"
  };
}

export interface Cart {
  id: Number;
  items: CartItem[];
  subtotal: number;
  shippingEstimate: number;
  total: number;
  currency: 'NPR' | 'USD';
  updatedAt: string;
}