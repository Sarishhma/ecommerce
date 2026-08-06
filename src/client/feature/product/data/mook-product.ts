import { products } from '@/config/data'
import type { Product } from '../types/product.types'

// Re-exported from your existing config for now — this is the only file
// that changes shape once real product data comes from elsewhere.
export const mockProducts: Product[] = products