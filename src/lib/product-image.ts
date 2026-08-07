import type { Product } from "@/client/feature/product"

export const PLACEHOLDER_IMAGE = '/images/placeholder-product.png'

export const getProductImage = (product: Pick<Product, 'image'>): string =>
  product.image ?? PLACEHOLDER_IMAGE