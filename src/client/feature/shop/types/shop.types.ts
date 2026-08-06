import type { Product } from '@/types'

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating'

export interface ProductQuery {
  category: string | null
  sortBy: SortOption
}

export type { Product }