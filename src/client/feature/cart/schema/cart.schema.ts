import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  quantity: z.number().int().positive(),
  maxQuantity: z.number().int().positive(),
  variant: z.object({ id: z.string(), label: z.string() }).optional(),
});
export type CartItemInput = z.infer<typeof cartItemSchema>;

export const addToCartSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  quantity: z.number().int().positive().default(1),
});
export type AddToCartInput = z.infer<typeof addToCartSchema>;

export const updateCartItemSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive(),
});
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;

export const cartSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema),
  subtotal: z.number().nonnegative(),
  shippingEstimate: z.number().nonnegative(),
  total: z.number().nonnegative(),
  currency: z.enum(['NPR', 'USD']),
  updatedAt: z.string(),
});
export type CartResponse = z.infer<typeof cartSchema>;