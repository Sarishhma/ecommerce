import { products, categories } from '@/config/data'
import type { Product } from '@/types'

// Re-exported from existing config for now — only file that changes
// shape once product data has a real source.
export const mockProducts: Product[] = products
export const mockCategories: readonly string[] = categories 